const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    MessageFlags
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
        // ack within the 3s interaction window — createPanel's REST work takes longer than that
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
        await createPanel(client, interaction)
        return interaction.editReply(UI.card(UI.COLORS.success)
            .title('New MM Panels Created', E.green_tick)
            .divider()
            .text('The AutoMM panel and admin controls are live in their channels.')
            .msg())

    },
};