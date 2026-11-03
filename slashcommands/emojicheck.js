const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require('discord.js');
const E = require('../functions/emojis');
const UI = require('../functions/ui');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('emojicheck')
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .setDescription('Render every emoji from emojis.txt to verify them'),

    async execute(client, interaction) {
        await interaction.deferReply({ ephemeral: true });

        const keys = E.keys();
        if (keys.length === 0) {
            return interaction.editReply({
                content: `${E.Cancel} No emojis loaded - check emojis.txt`
            });
        }

        const lines = keys.map((key, i) => {
        const pending = E.pendingSources().has(key) ? ' (pending upload)' : '';
        return `${E.get(key)} \`${key}\`${pending} (${i + 1}/${keys.length})`;
    });

        const card = UI.card(0x00BFFF)
            .title(`Emoji Check - ${keys.length} emojis`, E.refresh)
            .divider();

        // CV2 text budget: 4000 total - chunk defensively and show the first 3 blocks
        const chunks = [];
        let cur = [];
        let curLen = 0;
        for (const line of lines) {
            const w = line.length + 1;
            if (cur.length > 0 && curLen + w > 1000) {
                chunks.push(cur.join('\n'));
                cur = [];
                curLen = 0;
            }
            cur.push(line);
            curLen += w;
        }
        if (cur.length > 0) chunks.push(cur.join('\n'));

        chunks.slice(0, 3).forEach((chunk) => card.text(chunk));
        if (chunks.length > 3) {
            card.foot(`${chunks.length - 3} more blocks not shown - emojis exceed the display limit`);
        }

        await interaction.editReply(card.msg({ content: null }));
    },
};
