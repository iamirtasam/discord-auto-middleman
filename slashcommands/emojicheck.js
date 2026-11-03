const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder
} = require('discord.js');
const E = require('../functions/emojis');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('emojicheck')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDescription('Render every emoji from emojis.txt to verify them'),

    async execute(client, interaction) {
        await interaction.deferReply({ ephemeral: true });

        const keys = E.keys();
        if (keys.length === 0) {
            return interaction.editReply({
                content: `${E.Cancel} No emojis loaded - check emojis.txt`
            });
        }

        const lines = keys.map((key, i) => `${E.get(key)} \`${key}\` (${i + 1}/${keys.length})`);

        const embed = new EmbedBuilder()
            .setTitle(`${E.refresh} Emoji Check - ${keys.length} emojis from emojis.txt`)
            .setColor(0x00BFFF)
            .setTimestamp();

        // Discord limits: 25 fields x 1024 chars - chunk defensively
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

        chunks.slice(0, 25).forEach((chunk, i) => {
            embed.addFields({ name: `Page ${i + 1}`, value: chunk });
        });
        if (chunks.length > 25) {
            embed.setFooter({ text: `${chunks.length - 25} more pages not shown - emojis exceed embed limit` });
        }

        await interaction.editReply({ embeds: [embed] });
    },
};
