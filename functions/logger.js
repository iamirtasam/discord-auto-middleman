const {
    WebhookClient
} = require("discord.js");
const E = require('./emojis');
const UI = require('./ui');
const discordTranscripts = require('discord-html-transcripts');

const toml = require('toml');
const fs = require('fs');
const config = toml.parse(fs.readFileSync('./config.toml', 'utf-8'));


module.exports = async (log, content) => {
    let logCard;
    let webhookUrl;


    switch (log) {
        case "transcript":
            logCard = UI.card(UI.COLORS.success)
                .title('Transcript', E.zeldra_terms)
                .divider()
                .fields(
                    ['Sender', `<@${content.sender}>`],
                    ['Receiver', `<@${content.receiver}>`],
                    ['Amount', `\`${content.amount}\``],
                )
                .field('Txid', `[ \`${content.txid}\` ](https://litecoinspace.org/tx/${content.txid})`)
                .foot('Attached below - full thread history', { ts: Math.floor(Date.now() / 1000) });
            webhookUrl = config.transcript_webhook
            break;

        case "logs":
            let amount = parseFloat(content.amount);

            logCard = UI.card(UI.COLORS.success)
                .title('LiteCoin Trade Completed', E.green_tick)
                .divider()
                .fields(
                    ['Sender', `<@${content.sender}>`],
                    ['Receiver', `<@${content.receiver}>`],
                    ['Amount', `\`${amount.toFixed(3)}\``],
                )
                .field('Txid', `[ \`${content.txid}\` ](https://litecoinspace.org/tx/${content.txid})`)
                .foot('Funds safely transferred', { ts: Math.floor(Date.now() / 1000) });

            webhookUrl = config.payment_webhook
            break;

        default:
            return;
    }


    const webhookClient = new WebhookClient({
        url: webhookUrl
    });

    if (log == 'logs') {
        webhookClient.send(logCard.msg());

    } else {

        const attachment = await discordTranscripts.createTranscript(content.channel, {
            poweredBy: false,
            ssr: true
        });

        logCard.file(attachment.name);

        webhookClient.send(logCard.msg({
            files: [attachment],
        }));
    }
};
