const {
    EmbedBuilder,
    ButtonStyle,
    ButtonBuilder,
    ActionRowBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    InteractionType
} = require('discord.js');
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

        const embed = new EmbedBuilder()
        .setColor("#1ec42c")
        .setDescription(`
# <:Money:1494053090863612024>  Novex AutoMM
  
<:sv:1494053088691228802>  **What is Auto Middle Man ?**

-  <:8539838:1494053085474062497>  As an intermediary system capable of securely holding cryptocurrency on your behalf, it automates the process, helping you save time and ensuring safer transactions with counterparties.

<:zeldra_nitro:1494053083221590196>  **Features:**
<a:1404805419838472225:1494053104650555505> Supports LTC only.
<a:1404805419838472225:1494053104650555505> Available 24/7.
<a:1404805419838472225:1494053104650555505> Easy, fast, efficient, and secure.

### **<:8539838:1494053085474062497>  Is it safe?**
<:correct:1493286534332416161>  Yes, Only the person who sent the money can send it to the receiver.
<:correct:1493286534332416161>  The receiver can't take the money without the sender's permission.
<:correct:1493286534332416161>  And you can contact support if you have any problems.
<:correct:1493286534332416161>  How the fees work?
<:correct:1493286534332416161>  When you send the money to the address, the bot will detect the amount and will calculate the fees. The fees are 0.25% of the amount of the deal, in addition to blockchain fees, which are not included in the service fees. The fees are deducted from the amount of the deal when releasing the funds to the seller`);

        const panelChannel = await client.channels.fetch(panel_channel_id);
        if (!panelChannel) return console.log("Panel channel not found");

        const message = await panelChannel.send({
            embeds: [embed],
            components: [new ActionRowBuilder().addComponents(autoMMButton)]
        });

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

        const statusMessage = await panelChannel.send({
            embeds: [new EmbedBuilder()
                .setTitle('<:refresh:1494053077450490058>  Status')
                .setColor("#1ec42c")
                .setDescription('**``The AutoMM is currently operational``<:1390952506346963016:1494053058668396735>**')]
        });

        const controlMessage = await controlChannel.send({
            content: "AutoMM Admin Controls:",
            components: [new ActionRowBuilder().addComponents(toggleButton, closeThreadsButton)]
        });

        client.on('interactionCreate', async (interaction) => {
            if (!interaction.isButton()) return;
            if (interaction.channel.id !== control_channel_id) return;

            if (interaction.customId === 'toggle_automm') {
                await requestPassword(interaction, async () => {
                    let isDisabled = autoMMButton.data.disabled;
                    autoMMButton.setDisabled(!isDisabled);
                    toggleButton.setLabel(isDisabled ? 'Disable AutoMM' : 'Enable AutoMM')
                        .setStyle(isDisabled ? ButtonStyle.Danger : ButtonStyle.Success);
                    
                    await message.edit({ components: [new ActionRowBuilder().addComponents(autoMMButton)] });
                    await controlMessage.edit({ components: [new ActionRowBuilder().addComponents(toggleButton, closeThreadsButton)] });
                    await statusMessage.edit({
                        embeds: [new EmbedBuilder()
                            .setTitle('Status')
                            .setDescription(isDisabled ? 'The AutoMM is currently operational ✅' : 'The AutoMM is currently disabled ❌')]
                    });
                    await interaction.reply({ content: 'Successfully changed the Status.'});
                });
            } else if (interaction.customId === 'close_threads') {
                await requestPassword(interaction, async () => {
                    const threads = interaction.channel.threads.cache;
                    threads.forEach(thread => thread.delete().catch(() => null));

                });
                await interaction.reply({ content: 'All threads have been closed.'});
            }
        });
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
            return modalInteraction.reply({ content: 'Incorrect security code.', ephemeral: true });
        }

        await successCallback();
    });
}
