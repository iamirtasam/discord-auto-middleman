/**
 * ui.js - Components V2 design system.
 *
 * Single source of truth for every message this bot renders.
 * Embeds are gone; every message is built as a CV2 `Card`:
 *
 *     const UI = require('./ui');
 *     const card = UI.card({ accent: UI.COLORS.success })
 *         .title('Confirm Deal Details', E.check)
 *         .divider()
 *         .field('Deal Amount', '0.5 LTC')
 *         .foot('Deal Confirmation - Made by Joystoss', { ts: Date.now() / 1000 })
 *         .row(confirmButton, resetButton, cancelButton);
 *
 *     await thread.send(card.msg());                      // normal message
 *     await interaction.reply(card.msg({ ephemeral: true }));
 *     await this.embed.edit(card.msg());                  // edits stay CV2 too
 *
 * CV2 rules enforced here:
 *  - every msg() payload carries MessageFlags.IsComponentsV2 (mandatory)
 *  - content/embeds can never ride alongside CV2 ( payload has no `content` )
 *  - mentions DO NOT ping by default -> allowedMentions: { parse: [] };
 *    pass { allowPing: true } only on messages that intentionally ping
 *  - most relevant limits are tracked: 40 components, 4000 chars of text
 */

const E = require('./emojis');
const {
    ContainerBuilder,
    TextDisplayBuilder,
    SectionBuilder,
    ThumbnailBuilder,
    SeparatorBuilder,
    SeparatorSpacingSize,
    MediaGalleryBuilder,
    MediaGalleryItemBuilder,
    FileBuilder,
    ActionRowBuilder,
    MessageFlags,
} = require('discord.js');

/** Accent colors: same palette the embeds used, by intent. */
const COLORS = {
    brand: 0x1ec42c,     // AutoMM panel green
    success: 0x00b300,   // deals / completions
    warn: 0xFFFF33,      // rescan / insufficient / pending decisions
    danger: 0xED4245,    // cancellations, failures
    info: 0x5865F2,      // neutral informational
};

const MAX_COMPONENTS = 40;
const MAX_TEXT_CHARS = 4000;

class Card {
    constructor(accent) {
        this.container = new ContainerBuilder();
        if (accent !== undefined) this.container.setAccentColor(accent);
        this.components = 1;    // the container itself counts
        this.textChars = 0;
    }

    /* ---------------- text ---------------- */

    /** Big `#` title, optionally prefixed with an emoji. */
    title(text, emoji) {
        return this.heading(text, { emoji, level: 1 });
    }

    /** `##` / `###` heading. */
    heading(text, { emoji, level = 2 } = {}) {
        const hashes = '#'.repeat(Math.min(3, Math.max(1, level)));
        return this.text(`${hashes} ${emoji ? `${emoji} ` : ''}${text}`);
    }

    /** Regular text node (full markdown supported). */
    text(content) {
        const builder = new TextDisplayBuilder().setContent(content);
        this.container.addTextDisplayComponents(builder);
        this._track(builder);
        return this;
    }

    /** "**Label:** value" mini-line (replaces an embed field). */
    field(label, value) {
        return this.text(`**${label}:** ${value}`);
    }

    /** Several "**Label:** value" lines in one compact block. */
    fields(...pairs) {
        return this.text(pairs.map(([label, value]) => `**${label}:** ${value}`).join('\n'));
    }

    /** Blockquote block. */
    quote(content) {
        return this.text(`>>> ${content}`);
    }

    /** Bulleted list rendered as "• item" lines in one text node. */
    bullets(items) {
        return this.text(items.map((item) => `• ${item}`).join('\n'));
    }

    /** Code fence block (addresses, amounts, ids). */
    code(content) {
        return this.text('```\n' + content + '\n```');
    }

    /** Muted footer line; `ts` (unix seconds) renders as a Discord timestamp. */
    foot(text = '', { ts } = {}) {
        const parts = [text && String(text).trim(), ts ? `<t:${Math.floor(ts)}:R>` : null].filter(Boolean);
        if (parts.length === 0) return this;
        const builder = new TextDisplayBuilder().setContent(`-# ${parts.join(' • ')}`);
        this.container.addTextDisplayComponents(builder);
        this._track(builder);
        return this;
    }

    /* ---------------- structure ---------------- */

    /** Divider line, or invisible spacing when `visible: false`. */
    divider({ spacing = SeparatorSpacingSize.Small, visible = true } = {}) {
        this.container.addSeparatorComponents(
            new SeparatorBuilder().setDivider(visible).setSpacing(spacing),
        );
        this.components++;
        return this;
    }

    /** Invisible spacing (no drawn line). */
    gap(size = SeparatorSpacingSize.Small) {
        return this.divider({ spacing: size, visible: false });
    }

    /** Text side-by-side with a thumbnail image (1-3 text nodes). */
    section(texts, { thumb, spoilerThumb } = {}) {
        const node = new SectionBuilder();
        const list = Array.isArray(texts) ? texts : [texts];
        for (const content of list.slice(0, 3)) {
            const builder = new TextDisplayBuilder().setContent(content);
            node.addTextDisplayComponents(builder);
            this._track(builder);
        }
        if (thumb) {
            node.setThumbnailAccessory(
                new ThumbnailBuilder().setURL(thumb).setSpoiler(!!spoilerThumb),
            );
            this.components++;
        }
        this.container.addSectionComponents(node);
        this.components++;
        return this;
    }

    /** One ActionRow of buttons/selects. Acceptsbuilders or a ready ActionRow. */
    row(...items) {
        const flat = items.flat();
        let builder = flat[0] instanceof ActionRowBuilder ? flat[0] : new ActionRowBuilder().addComponents(...flat);
        this.container.addActionRowComponents(builder);
        this.components++;
        return this;
    }

    /** Media gallery. `items`: url string or { url, description, spoiler }. */
    gallery(items) {
        const list = (Array.isArray(items) ? items : [items]).map((item) => {
            const entry = typeof item === 'string' ? { url: item } : item;
            const node = new MediaGalleryItemBuilder().setURL(entry.url);
            if (entry.description) node.setDescription(entry.description);
            if (entry.spoiler) node.setSpoiler(true);
            return node;
        });
        this.container.addMediaGalleryComponents(new MediaGalleryBuilder().addItems(...list));
        this.components += list.length + 1;
        return this;
    }

    /** Inline file. `files: [...]` on msg() must carry the matching attachment. */
    file(name, { spoiler = false } = {}) {
        this.container.addFileComponents(
            new FileBuilder().setURL(`attachment://${name}`).setSpoiler(spoiler),
        );
        this.components++;
        return this;
    }

    /** Blur the whole card until the user clicks it. */
    spoiler(spoiler = true) {
        this.container.setSpoiler(spoiler);
        return this;
    }

    /* ---------------- send ---------------- */

    /** The underlying ContainerBuilder. */
    build() {
        return this.container;
    }

    /**
     * Full send/edit payload:
     *     thread.send(card.msg())
     *     interaction.update(card.msg())
     *     interaction.reply(card.msg({ ephemeral: true }))
     *
     * @param {object}  opts.ephemeral         add the Ephemeral flag
     * @param {object}  opts.files             attachments (required by .file/.gallery attachment://)
     * @param {object}  opts.allowPing         rich mentions actually ping (opt-in)
     * @param {object}  opts.allowedMentions   full explicit override
     * @param {object}  opts.rest              any extra send options pass through
     */
    msg({ ephemeral = false, files, allowPing = false, allowedMentions, ...rest } = {}) {
        const flags = ephemeral
            ? MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
            : MessageFlags.IsComponentsV2;

        const payload = {
            components: [this.container],
            flags,
            allowedMentions: allowedMentions || (allowPing ? { parse: ['users', 'roles'] } : { parse: [] }),
            ...(files ? { files } : {}),
            ...rest,
        };
        return payload;
    }

    /* ---------------- internals ---------------- */

    _track(builder) {
        this.components++;
        this.textChars += (builder.data.content || '').length;
        if (this.components > MAX_COMPONENTS) {
            console.warn(`[ui] card reached ${this.components} components (limit ${MAX_COMPONENTS})`);
        }
        if (this.textChars > MAX_TEXT_CHARS) {
            console.warn(`[ui] card exceeded ${MAX_TEXT_CHARS} characters of text`);
        }
    }
}

/** Start a CV2 card. */
function card(accent) {
    return accent === undefined ? new Card() : new Card(accent);
}

module.exports = { COLORS, Card, card };
