const {
    SlashCommandBuilder
} = require('discord.js');
const E = require('../functions/emojis');
const UI = require('../functions/ui');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('changelog')
        .setDescription('Shows the Changelog'),
    async execute(client, interaction) {

        await interaction.reply(UI.card(UI.COLORS.info)
            .title('Changelog', E.loader)
            .divider()
            .bullets([
                'Started working on **Bitcoin** as a currency for the trade',
                'Started working on the function to choose between **Euro or USD** for the trade',
            ])
            .foot('Development roadmap of the AutoMM')
            .msg({ ephemeral: true }))
    }
}