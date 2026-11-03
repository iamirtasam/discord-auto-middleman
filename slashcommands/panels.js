const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require('discord.js');
const E = require('../functions/emojis');
const UI = require('../functions/ui');
const createPanel = require('../functions/createPanel.js').createPanel
module.exports = {

    data: new SlashCommandBuilder()
        .setName('panels')
        .setDefaultMemberPermissions(PermissionFlagsBits.Admininstrator)
        .setDescription('Create new MM panels'),
    async execute(client, interaction) {
        await createPanel(client, interaction)
        return await interaction.reply(UI.card(UI.COLORS.success)
            .title('New MM Panels Created', E.green_tick)
            .divider()
            .text('The AutoMM panel and admin controls are live in their channels.')
            .msg({ ephemeral: true }))

    },
};