const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require('discord.js');
const E = require('../functions/emojis');
const UI = require('../functions/ui');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('key')
        .setDefaultMemberPermissions(PermissionFlagsBits.Admininstrator)
        .setDescription('Send Money To LTC Address'),
    async execute(client, interaction) {
        let thread = await interaction.channel;
        let ID = interaction.channelId;

        await interaction.reply({
            content: `> ${E.faq} Finding Key In Data .  .  .  .`,
            ephemeral: true
        })
        const LTCkey = await getData(ID);
        if (LTCkey) {
            return interaction.editReply(UI.card(UI.COLORS.warn)
                .title('LTC Transfer Key', E.elite_LTC)
                .divider()
                .text('Click the box below to reveal the key:')
                .text(`||\`${LTCkey}\`||`)
                .foot('Ephemeral to you only - never share it')
                .msg({ ephemeral: true, content: null }));
        } else {
            interaction.editReply(UI.card(UI.COLORS.danger)
                .title('Record Not Found', E.Cancel)
                .divider()
                .text(`No escrow record exists for thread \`${ID}\`.`)
                .msg({ ephemeral: true, content: null }));
        }
        async function getData(ID) {
            try {
                const filePath = './trades.json';
                const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                const record = data[ID];
                if (record) {
                    return record.LTCkey;
                } else {
                    return null

                }
            } catch (error) {
                console.error('Error reading or parsing trades.json:', error);
                return null;
            }
        }
    },
};
