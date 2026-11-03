const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require('discord.js');
const E = require('../functions/emojis');
const UI = require('../functions/ui');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('close')
        .setDefaultMemberPermissions(PermissionFlagsBits.Admininstrator)
        .setDescription('Close a thread (admins only)'),
    async execute(client, interaction) {


	const thread = interaction.thread
	await thread.send(UI.card(UI.COLORS.warn)
            .title('Thread Closing', E.elite_CautionWarning)
            .divider()
            .text('This trade will be **closed and deleted** in 30 seconds.')
            .foot('Admins only action')
            .msg());
        await new Promise(resolve => setTimeout(resolve, 30000));
        await thread.setLocked(true);
        await thread.setName('Closed!');
        await new Promise(resolve => setTimeout(resolve, 5000));
        await thread.delete().catch(error => console.log('Error deleting thread:', error));



        }
    }