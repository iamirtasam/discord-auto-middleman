const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require('discord.js');
const E = require('../functions/emojis');
const UI = require('../functions/ui');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addy')
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .setDescription('Get this thread ltc addy'),
    async execute(client, interaction) {
        let thread = await interaction.channel;
        let ID = interaction.channelId;

        await interaction.reply({
            content: `> ${E.faq} Finding Key In Data .  .  .  .`,
            ephemeral: true
        })
        const LTCaddy = await getData(ID);
        if (LTCaddy) {
            return interaction.editReply(UI.card(UI.COLORS.info)
                .title('Thread LTC Address', E.elite_LTC)
                .divider()
                .field('Address', `\`${LTCaddy}\``)
                .foot("Fetched from this thread's escrow record - keep it private")
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
                    return record.LTCaddy;
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
