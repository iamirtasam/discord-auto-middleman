const {
    ButtonStyle,
    ButtonBuilder,
    ActionRowBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    InteractionType,
    MessageFlags
} = require('discord.js');
const E = require('./emojis');
const UI = require('./ui');
const panelModel = require('../database/panel.js');

const password = "StrongPassword";
const control_channel_id = "1494037674485612706";
const panel_channel_id = "1481585857969262652";

module.exports.createPanel = async (client, interaction) => {
    const Panel = await panelModel.findOne({ guildId: interaction.guildId });

    if (Panel) {
        console.log(`Panel already exists for guild ${interaction.guildId}`);
        let ch = await interaction.guild.channels?.cache.get(`${Panel.channelId}`);
        if (ch) {
            try {
                let message = await ch.messages.fetch(Panel.messageId).catch(() => null);
                if (message) {
                    setTimeout(async () => {
                        await message.delete();
                    }, 1000);
                } else {
                    console.log(`${Panel.messageId} Message does not exist!`);
                }
            } catch (err) {
                console.log(err);
            }
        }
        await Panel.deleteOne();
        await create(interaction);
    } else {
        await create(interaction);
    }

    async function create(interaction) {

        let autoMMButton = new ButtonBuilder()
            .setLabel('Start Auto Middleman')
            .setStyle(ButtonStyle.Secondary)
            .setCustomId(`create_new_deal`)
            .setDisabled(false);

        /**
         * Shared CV2 builders — the panel/control cards are REBUILT on every toggle
         * edit (CV2 edits replace all components, so a bare `components: [row]`
         * edit would visually wipe the whole card down to a lone button strip).
         */
        const panelCard = (row) => UI.card(UI.COLORS.brand)
            .section(
                [`# ${E.Money}  Novex AutoMM`],
                { thumb: client.user.displayAvatarURL({ extension: 'png', size: 256 }) },
            )
            .divider()
            .heading('What is Auto Middle Man ?', { emoji: E.sv, level: 2 })
            .text(`${E.select}  As an intermediary system capable of securely holding cryptocurrency on your behalf, it automates the process, helping you save time and ensuring safer transactions with counterparties.`)
            .gap()
            .heading('Features:', { emoji: E.zeldra_nitro, level: 2 })
            .text(`${E.loader} Supports LTC only.\n${E.loader} Available 24/7.\n${E.loader} Easy, fast, efficient, and secure.`)
            .gap()
            .heading('Is it safe?', { emoji: E.select, level: 3 })
            .text(`${E.correct}  Yes, Only the person who sent the money can send it to the receiver.\n${E.correct}  The receiver can't take the money without the sender's permission.\n${E.correct}  And you can contact support if you have any problems.`)
            .divider()
            .heading('How the fees work?', { emoji: E.correct, level: 3 })
            .text(`When you send the money to the address, the bot will detect the amount and will calculate the fees. The fees are 0.25% of the amount of the deal, in addition to blockchain fees, which are not included in the service fees. The fees are deducted from the amount of the deal when releasing the funds to the seller`)
            .divider()
            .foot('irtasam - AutoMM')
            .row(row);

        const rowWithAutoMM = () => new ActionRowBuilder().addComponents(autoMMButton);

        const panelChannel = await client.channels.fetch(panel_channel_id);
        if (!panelChannel) return console.log("Panel channel not found");

        const message = await panelChannel.send(panelCard(rowWithAutoMM()).msg());

        const controlChannel = await client.channels.fetch(control_channel_id);
        if (!controlChannel) return console.log("Control channel not found");

        let toggleButton = new ButtonBuilder()
            .setLabel('Disable AutoMM')
            .setStyle(ButtonStyle.Danger)
            .setCustomId('toggle_automm');

        let closeThreadsButton = new ButtonBuilder()
            .setLabel('Close all threads')
            .setStyle(ButtonStyle.Secondary)
            .setCustomId('close_threads');

        const controlCard = (row) => UI.card()
            .title('AutoMM Admin Controls:', E.GreenModShield)
            .divider()
            .text('Toggle the AutoMM or manage trade threads from this channel.')
            .row(row)
            .foot('Password protected actions');

        const statusMessage = await panelChannel.send(UI.card(UI.COLORS.brand)
            .title('Status', E.refresh)
            .divider()
            .text(`**\`\`The AutoMM is currently operational\`\`${E.check}**`)
            .msg());

        const controlMessage = await controlChannel.send(controlCard(
            new ActionRowBuilder().addComponents(toggleButton, closeThreadsButton)
        ).msg());

        // One panel-interaction handler per process. Re-registering /panels used to
        // stack handlers (one per rebuild) — every click then fired every copy.
        if (client.autommPanelHandler) {
            client.removeListener('interactionCreate', client.autommPanelHandler);
        }
        const panelHandler = async (interaction) => {
            if (!interaction.isButton()) return;
            if (interaction.channel.id !== control_channel_id) return;

            try {
                if (interaction.customId === 'toggle_automm') {
                    await requestPassword(interaction, async (modalInteraction) => {
                        let isDisabled = autoMMButton.data.disabled;
                        autoMMButton.setDisabled(!isDisabled);
                        toggleButton.setLabel(isDisabled ? 'Disable AutoMM' : 'Enable AutoMM')
                            .setStyle(isDisabled ? ButtonStyle.Danger : ButtonStyle.Success);

                        await message.edit(panelCard(rowWithAutoMM()).msg());
                        await controlMessage.edit(controlCard(
                            new ActionRowBuilder().addComponents(toggleButton, closeThreadsButton)
                        ).msg());
                        await statusMessage.edit(UI.card(UI.COLORS.brand)
                            .title('Status', E.refresh)
                            .divider()
                            .text(isDisabled ? 'The AutoMM is currently operational ✅' : 'The AutoMM is currently disabled ❌')
                            .msg());
                        // the BUTTON interaction was consumed by showModal() — reply on the MODAL submit
                        await modalInteraction.reply({
                            content: 'Successfully changed the Status.',
                            flags: MessageFlags.Ephemeral
                        });
                    });
                } else if (interaction.customId === 'close_threads') {
                    await requestPassword(interaction, async (modalInteraction) => {
                        const threads = interaction.channel.threads.cache;
                        threads.forEach(thread => thread.delete().catch(() => null));
                        await modalInteraction.reply({
                            content: 'All threads have been closed.',
                            flags: MessageFlags.Ephemeral
                        });
                    });
                }
            } catch (err) {
                console.error('AutoMM control panel error:', err);
            }
        };
        client.autommPanelHandler = panelHandler;
        client.on('interactionCreate', panelHandler);
    }
};

async function requestPassword(interaction, successCallback) {
    const modal = new ModalBuilder()
        .setCustomId('password_modal')
        .setTitle('Enter Password');

    const passwordInput = new TextInputBuilder()
        .setCustomId('password_input')
        .setLabel('Enter the security code:')
        .setStyle(TextInputStyle.Short);

    const actionRow = new ActionRowBuilder().addComponents(passwordInput);
    modal.addComponents(actionRow);

    await interaction.showModal(modal);

    interaction.client.once('interactionCreate', async (modalInteraction) => {
        if (!modalInteraction.isModalSubmit()) return;
        if (modalInteraction.customId !== 'password_modal') return;

        const inputPassword = modalInteraction.fields.getTextInputValue('password_input');
        if (inputPassword !== password) {
            return modalInteraction.reply({ content: 'Incorrect security code.', flags: MessageFlags.Ephemeral });
        }

        // successCallback receives the MODAL interaction — the button interaction
        // was consumed by showModal() and cannot be replied to anymore
        await successCallback(modalInteraction);
    });
}
