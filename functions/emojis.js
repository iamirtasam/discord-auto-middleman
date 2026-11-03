/**
 * EmojiStore - single source of truth for every Discord emoji the bot uses.
 *
 * The bot reads ./emojis.txt and exposes each emoji by its key:
 *
 *     const E = require('../functions/emojis');
 *     E.Money          // -> '<:Money:1494053090863612024>'
 *     `${E.elite_LTC}` // -> inside template strings
 *
 * THREE line formats are supported in emojis.txt:
 *
 *     # 1) direct markup (renders with an ID that already exists somewhere)
 *     key = <:Money:1494053090863612024>
 *     key = <a:green_tick:1481611281415798871>
 *     <:orange:1494053127949652030>           (no "key =" -> name is the key)
 *
 *     # 2) bunded image file (relative to the project root)
 *     key = ./assets/emojis/Money.png
 *
 *     # 3) remote image URL (CDN)
 *     key = https://cdn.discordapp.com/emojis/1494053090863612024.png
 *
 * For forms 2) and 3) the bot UPLOADS the image to its Discord application
 * emoji set at startup (functions/emojiSync.js) and the created <:name:id>
 * markup is injected here via E.define() - it survives file reloads.
 *
 * Editing emojis.txt takes effect WITHOUT restarting the bot
 * (the file is hot-reloaded within ~1s of each save).
 *
 * Verify rendering after a move with the /emojicheck slash command.
 */

const fs = require('fs');
const path = require('path');

const EMOJIS_FILE = path.resolve(__dirname, '..', 'emojis.txt');

const EMOJI_LINE = /^(?:([A-Za-z0-9_]+)\s*=\s*)?<(a)?:([A-Za-z0-9_]+):(\d+)>\s*$/;
const SOURCE_LINE = /^([A-Za-z0-9_]+)\s*=\s*(\S+)\s*$/;
const IMAGE_URL = /^https?:\/\/\S+$/i;

class EmojiStore {
    constructor(file = EMOJIS_FILE) {
        this.file = file;
        this.map = new Map();       // key -> active "<:name:id>" markup
        this.nameMap = new Map();   // emoji name -> markup (angle-less fallback)
        this.markupEntries = new Map(); // key -> markup defined IN the file
        this.sources = new Map();  // key -> { kind: 'file'|'url', src, animated }
        this.synced = new Map();   // key -> markup injected by emojiSync (survives reloads)
        this.warned = new Set();   // keys we warned about at runtime
        this.load();

        // Poll the file; persistent:false so the watcher never keeps
        // a short-lived process (e.g. a test) alive on its own.
        fs.watchFile(this.file, { interval: 1000, persistent: false }, () => {
            this.load();
        });
    }

    /** Re-read emojis.txt. Keeps the previous set on errors, so a half-saved file can never empty the store. */
    reload() {
        return this.load();
    }

    load() {
        let text;
        try {
            text = fs.readFileSync(this.file, 'utf-8');
        } catch (err) {
            console.error(`[emojis] cannot read ${this.file}: ${err.message}`);
            return this;
        }

        const markupEntries = new Map(); // key -> markup from this file load
        const nameEntries = new Map();
        const sourceEntries = new Map(); // key -> { kind, src, animated }

        for (const rawLine of text.split(/\r?\n/)) {
            const line = rawLine.trim();
            if (!line || line.startsWith('#')) continue;

            const markupMatch = EMOJI_LINE.exec(line);
            if (markupMatch) {
                const [, key, animated, name, id] = markupMatch;
                const markup = `<${animated ? 'a' : ''}:${name}:${id}>`;
                const finalKey = key || name;
                if (markupEntries.has(finalKey) && markupEntries.get(finalKey) !== markup) {
                    console.warn(`[emojis] duplicate key "${finalKey}" - keeping the last one`);
                }
                markupEntries.set(finalKey, markup);
                nameEntries.set(name, markup);
                continue;
            }

            const sourceMatch = SOURCE_LINE.exec(line);
            if (sourceMatch) {
                const [, key, value] = sourceMatch;
                if (IMAGE_URL.test(value)) {
                    sourceEntries.set(key, { kind: 'url', src: value, animated: value.toLowerCase().endsWith('.gif') });
                } else if (/\.(png|gif|webp|jpe?g)$/i.test(value)) {
                    sourceEntries.set(key, { kind: 'file', src: value, animated: value.toLowerCase().endsWith('.gif') });
                } else {
                    console.warn(`[emojis] unrecognized value for "${key}" (expected <:name:id>, image url or file path): ${value}`);
                }
                continue;
            }

            console.warn(`[emojis] skipping invalid line in ${path.basename(this.file)}: ${line}`);
        }

        if (markupEntries.size === 0 && sourceEntries.size === 0) {
            console.warn(`[emojis] ${path.basename(this.file)} produced no emojis - keeping previous set`);
            return this;
        }

        // Active markups = file markups, plus previously synced markups for
        // file/url sourced keys (re-applied on every reload)
        const active = new Map(markupEntries);
        for (const [key, markup] of this.synced) {
            if (sourceEntries.has(key) && !markupEntries.has(key)) {
                active.set(key, markup);
            }
        }

        const isFirstLoad = this.map.size === 0;
        this.map = active;
        this.nameMap = nameEntries;
        this.markupEntries = markupEntries;
        this.sources = sourceEntries;

        console.log(`[emojis] ${isFirstLoad ? 'loaded' : 'hot-reloaded'} ${active.size} emoji keys ` +
            `(${markupEntries.size} from markup, ${sourceEntries.size} pending upload) from ${path.basename(this.file)}`);
        return this;
    }

    /**
     * Inject an externally created markup for an emoji key (used by
     * functions/emojiSync.js after uploading an application emoji).
     * The value survives later emojis.txt hot-reloads.
     */
    define(key, markup) {
        if (!key || !markup) return false;
        this.synced.set(key, markup);
        if (!this.markupEntries.has(key)) {
            this.map.set(key, markup);
        }
        return true;
    }

    /** Sources that still have no markup after sync (used by emojiSync). */
    pendingSources() {
        const out = new Map();
        for (const [key, source] of this.sources) {
            if (!this.synced.has(key)) out.set(key, source);
        }
        return out;
    }

    /** Raw "<:name:id>" markup for a key ("Money" -> "<:Money:...>"). Unknown keys resolve to '' with a warning. */
    get(key) {
        if (typeof key !== 'string') return '';
        if (this.map.has(key)) return this.map.get(key);
        if (this.nameMap.has(key)) return this.nameMap.get(key);
        this._warn(key);
        return '';
    }

    has(key) {
        return this.map.has(key) || this.nameMap.has(key) || this.sources.has(key);
    }

    keys() {
        const all = new Set([...this.map.keys(), ...this.sources.keys()]);
        return [...all];
    }

    _warn(key) {
        if (this.warned.has(key)) return;
        this.warned.add(key);
        if (this.sources.has(key)) {
            console.warn(`[emojis] "${key}" is still only an image source - it will resolve after emojiSync uploads it (check bot startup logs)`);
        } else {
            console.warn(`[emojis] unknown emoji key "${key}" - add "<key> = ..." to ${path.basename(this.file)}`);
        }
    }
}

const store = new EmojiStore();

/*
 * Proxy so code can simply write:
 *     const E = require('../functions/emojis');
 *     E.Money
 * Module methods (get, has, keys, reload, define, ...) are accessed directly;
 * every other property falls back to an emoji key lookup.
 */
module.exports = new Proxy(store, {
    get(target, prop) {
        if (typeof prop !== 'string') return target[prop];
        if (prop in target) return target[prop];
        return target.get(prop);
    },
});
