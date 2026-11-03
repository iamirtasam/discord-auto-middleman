/**
 * EmojiStore - single source of truth for every Discord emoji the bot uses.
 *
 * The bot reads ./emojis.txt and exposes each emoji by its key:
 *
 *     const E = require('../functions/emojis');
 *     E.Money          // -> '<:Money:1494053090863612024>'
 *     `${E.elite_LTC}` // -> inside template strings
 *
 * Editing emojis.txt takes effect WITHOUT restarting the bot
 * (the file is hot-reloaded within ~1s of each save).
 *
 * emojis.txt format:
 *
 *     # comment lines start with #
 *     key = <:emoji_name:id>        (static emoji)
 *     key = <a:emoji_name:id>       (animated emoji)
 *     <:emoji_name:id>              (no "key =" - emoji name is the key)
 *
 * Moving to a new server: upload the emojis there, paste their new
 * markup into emojis.txt with the SAME keys - no code changes needed.
 */

const fs = require('fs');
const path = require('path');

const EMOJIS_FILE = path.resolve(__dirname, '..', 'emojis.txt');

const EMOJI_LINE = /^(?:([A-Za-z0-9_]+)\s*=\s*)?<(a)?:([A-Za-z0-9_]+):(\d+)>\s*$/;

class EmojiStore {
    constructor(file = EMOJIS_FILE) {
        this.file = file;
        this.map = new Map();     // key       -> raw "<:name:id>" markup
        this.nameMap = new Map(); // emoji name -> raw markup (fallback)
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

        const keys = new Map();
        const names = new Map();

        for (const rawLine of text.split(/\r?\n/)) {
            const line = rawLine.trim();
            if (!line || line.startsWith('#')) continue;

            const match = EMOJI_LINE.exec(line);
            if (!match) {
                console.warn(`[emojis] skipping invalid line in ${path.basename(this.file)}: ${line}`);
                continue;
            }

            const [, key, animated, name, id] = match;
            const markup = `<${animated ? 'a' : ''}:${name}:${id}>`;
            const finalKey = key || name;

            if (keys.has(finalKey) && keys.get(finalKey) !== markup) {
                console.warn(`[emojis] duplicate key "${finalKey}" - keeping the last one`);
            }

            keys.set(finalKey, markup);
            names.set(name, markup);
        }

        if (keys.size === 0) {
            console.warn(`[emojis] ${path.basename(this.file)} produced no emojis - keeping previous set`);
            return this;
        }

        const isFirstLoad = this.map.size === 0;
        this.map = keys;
        this.nameMap = names;

        if (isFirstLoad) {
            console.log(`[emojis] loaded ${keys.size} emoji keys from ${path.basename(this.file)}`);
        } else {
            console.log(`[emojis] hot-reloaded ${keys.size} emoji keys from ${path.basename(this.file)}`);
        }
        return this;
    }

    /** Raw "<:name:id>" markup for a key ("Money" -> "<:Money:...>"). Unknown keys resolve to '' with a warning. */
    get(key) {
        if (typeof key !== 'string') return '';
        if (this.map.has(key)) return this.map.get(key);
        if (this.nameMap.has(key)) return this.nameMap.get(key);
        console.warn(`[emojis] unknown emoji key "${key}" - add "<key> = ..." to ${path.basename(this.file)}`);
        return '';
    }

    has(key) {
        return this.map.has(key) || this.nameMap.has(key);
    }

    keys() {
        return [...this.map.keys()];
    }
}

const store = new EmojiStore();

/*
 * Proxy so code can simply write:
 *     const E = require('../functions/emojis');
 *     E.Money
 * Module methods (get, has, keys, reload) are accessed directly;
 * every other property falls back to an emoji key lookup.
 */
module.exports = new Proxy(store, {
    get(target, prop) {
        if (typeof prop !== 'string') return target[prop];
        if (prop in target) return target[prop];
        return target.get(prop);
    },
});
