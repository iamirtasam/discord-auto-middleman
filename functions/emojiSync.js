/**
 * emojiSync - makes emojis zero-config on every server.
 *
 * For every emojis.txt entry that is an image (bundled file or CDN url)
 * this uploads the image ONCE to the bot's APPLICATION emoji set:
 *
 *     GET/POST /applications/<app.id>/emojis
 *
 * Application emojis belong to the bot itself, are available in every guild
 * the bot is in (no per-server upload, no "Manage Emojis" permission, no
 * boost-level limits) and can be used by the bot in embeds, contents,
 * buttons, labels and reactions - which is exactly how this bot renders.
 *
 * After ensuring each key exists, the created markup is injected into the
 * EmojiStore via E.define(), so E.<key> instantly resolves everywhere.
 * The upload state survives restarts because existing application emojis
 * are matched by name instead of being re-uploaded.
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const E = require('./emojis');

const API = 'https://discord.com/api/v10';
const MIME = {
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
};

module.exports = async function emojiSync(client) {
    const pending = E.pendingSources();
    if (pending.size === 0) return;

    const appID = client.user.id;
    const headers = { Authorization: `Bot ${client.config.token}` };
    const endpoint = `${API}/applications/${appID}/emojis`;

    try {
        const response = await axios.get(endpoint, { headers });
        const list = Array.isArray(response.data) ? response.data : (response.data.items || []);
        const existingByName = new Map(list.map((em) => [String(em.name).toLowerCase(), em]));

        let created = 0;
        let reused = 0;
        let failed = 0;

        for (const [key, source] of pending) {
            try {
                let emoji = existingByName.get(key.toLowerCase());

                if (!emoji) {
                    const image = await toDataURI(source);
                    const createdResponse = await axios.post(endpoint, { name: key, image }, { headers });
                    emoji = createdResponse.data;
                    created++;
                    console.log(`[emoji-sync] uploaded application emoji "${key}" -> id ${emoji.id}`);
                    await new Promise((r) => setTimeout(r, 250)); // gentle on the rate limit
                } else {
                    reused++;
                }

                E.define(key, `${emoji.animated ? '<a:' : '<:'}${emoji.name}:${emoji.id}>`);
            } catch (err) {
                failed++;
                const detail = err.response
                    ? `${err.response.status} ${err.response.data && err.response.data.message}`
                    : err.message;
                console.error(`[emoji-sync] failed for "${key}" (${source.kind}: ${source.src}): ${detail}`);
            }
        }

        console.log(`[emoji-sync] done - ${created} uploaded, ${reused} reused, ${failed} failed ` +
            `(${existingByName.size} application emojis already present)`);
    } catch (err) {
        const detail = err.response ? `${err.response.status} ${err.response.data && err.response.data.message}` : err.message;
        console.error(`[emoji-sync] could not list application emojis: ${detail}`);
    }
};

/** Bundled file or remote URL -> data URI ready for the Discord image field. */
async function toDataURI(source) {
    if (source.kind === 'file') {
        const file = path.resolve(__dirname, '..', source.src);
        const extension = source.src.split('.').pop().toLowerCase();
        const mime = MIME[extension] || (source.animated ? 'image/gif' : 'image/png');
        const buffer = await fs.promises.readFile(file);
        return `data:${mime};base64,${buffer.toString('base64')}`;
    }

    const response = await axios.get(source.src, { responseType: 'arraybuffer' });
    const mime = response.headers['content-type'] || (source.animated ? 'image/gif' : 'image/png');
    return `data:${mime.split(';')[0]};base64,${Buffer.from(response.data).toString('base64')}`;
}
