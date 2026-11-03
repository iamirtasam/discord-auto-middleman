const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder
} = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('key')
        .setDefaultMemberPermissions(PermissionFlagsBits.Admininstrator)
        .setDescription('Send Money To LTC Address'),
    async execute(client, interaction) {
        let thread = await interaction.channel;
        let ID = interaction.channelId;

        await interaction.reply({
            content: `> <:faq:1494053061398761472> Finding Key In Data .  .  .  .`,
            ephemeral: true
        })
        const LTCkey = await getData(ID);
        if (LTCkey) {
            return interaction.editReply({
                content: `>  <:elite_LTC:1494053153350357022> : ${LTCkey}`,
                ephemeral: true
            });
        } else {
            interaction.editReply({
                content: `<:Cancel:1494053054922887339> Record  ${ID} was not found.`,
                ephemeral: true
            });
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