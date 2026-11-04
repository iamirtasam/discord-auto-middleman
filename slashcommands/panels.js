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
        try {
            await createPanel(client, interaction);
        } catch (err) {
            console.error('panel creation failed:', err);
            return interaction.editReply(UI.card(UI.COLORS.danger)
                .title('Panel creation failed', E.elite_CautionWarning)
                .divider()
                .text(`${E.elite_CautionWarning} ${err.message}`)
                .gap()
                .text('Grant the bot View Channel + Send Messages in both custom channels, or copy the current channel IDs into functions/createPanel.js — then run /panels again.')
                .msg())
        }
        return interaction.editReply(UI.card(UI.COLORS.success)
            .title('New MM Panels Created', E.green_tick)
            .divider()
            .text('The AutoMM panel and admin controls are live in their channels.')
            .msg())

    },
};