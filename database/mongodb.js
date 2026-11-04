const mongoose = require('mongoose');

/** Default database name used when config.mongoURL has no /<db> part. */
const DEFAULT_DB = 'automm';

/**
 * Mongoose refuses to query with an empty database name — a config URL like
 * `mongodb://user:pass@host:27017/?…` (no /<db>) makes every query crash with
 *   MongoServerError: Invalid namespace specified: /.panelS
 * This normalizes the URI so a nameless URL falls back to the default db.
 */
function normalizeMongoURI(raw) {
    let parsed;
    try {
        parsed = new URL(raw);
    } catch {
        return { uri: raw, defaulted: false, invalid: true };
    }
    const dbName = parsed.pathname.replace(/\/+$/, '').replace(/^\//, '');
    if (!dbName) {
        parsed.pathname = `/${DEFAULT_DB}`;
        return { uri: parsed.toString(), defaulted: true, invalid: false };
    }
    return { uri: parsed.toString(), defaulted: false, invalid: false };
}

module.exports = (client) => {
    const { uri, defaulted, invalid } = normalizeMongoURI(client.config.mongoURL);

    if (invalid) {
        console.error('\x1b[31m%s\x1b[0m',
            `⚠️ mongoURL is not a valid URI — expected e.g. mongodb://127.0.0.1:27017/${DEFAULT_DB}`);
        return;
    }

    if (defaulted) {
        console.log('[mongodb] config.mongoURL had no database name — falling back to default db:', DEFAULT_DB);
    }

    mongoose.connect(uri).then(() => {
        // Green color — include the actual database name so config mistakes are visible
        console.log(`   ✅  Connected to database (${mongoose.connection.name}).`);
    }).catch((e) => {
        console.log('\x1b[31m%s\x1b[0m', `⚠️ Unable to connect to the database: \n${e}`);
    });
};
