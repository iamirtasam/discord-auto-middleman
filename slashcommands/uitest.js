const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    ButtonBuilder,
    ButtonStyle,
    SeparatorSpacingSize,
    MessageFlags,
} = require('discord.js');
const E = require('../functions/emojis');
const UI = require('../functions/ui');
const fs = require('fs');

/**
 * /uitest - admin-only visual lab for the Components V2 design system.
 *
 * Renders every container/node type the bot uses (placeholders instead of
 * real deal data) so accent colors, spacing, sections, galleries, files and
 * button-state toggling can be checked on a live server without triggering
 * a trade. Buttons live on the `uitest_*` customId namespace, which the
 * interactionCreate dispatcher ignores (falls through untouched).
 */

module.exports = {
    data: new SlashCommandBuilder()
        .setName('uitest')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDescription('Render every CV2 container type with placeholder data (admin only)'),

    async execute(client, interaction) {

        // belt-and-suspenders (guild overrides can still hide-gate this)
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return interaction.reply({
                content: `${E.Cancel} Admins only.`,
                ephemeral: true
            });
        }

        await interaction.deferReply({ ephemeral: true });

        const avatar = client.user.displayAvatarURL({ size: 256 });
        const now = Math.floor(Date.now() / 1000);

        /* --------------------------------------------------------- *
         * 1 - Typography & structure tour (brand accent)
         * --------------------------------------------------------- */
        await interaction.editReply(UI.card(UI.COLORS.brand)
            .title('UI Test — Design System', E.faq)
            .text('-# every node below is a placeholder; nothing touches a real deal')
            .divider()
            .heading('This is an H2 heading', { emoji: E.check })
            .heading('This is an H3 heading', { emoji: E.elite_LTC, level: 3 })
            .divider({ spacing: SeparatorSpacingSize.Medium })
            .bullets([
                '**Fields** — *Deal:* `0.5 LTC` inside a private thread',
                '**Markdown** works in every text node: ~~strike~~ ||spoiler|| __underline__',
                '**Bullets** collapse into one compact text node',
            ])
            .field('Escrow Address', `\`LXXX-PLACEHOLDER-XXXX\``)
            .field('Deal Amount', `\`0.5 LTC\``)
            .quote('Quote blocks for the fine print.\nSecond line of the quote.')
            .code('LTUX_PLACEHOLDER_ADDRESS_1a2B3c4D5e')
            .divider({ spacing: SeparatorSpacingSize.Large })
            .section([
                `${E.contract}  **Section + Thumbnail**`,
                'Up to 3 text nodes ride side-by-side with an image.',
            ], { thumb: avatar })
            .row(
                new ButtonBuilder().setCustomId('uitest_inert1').setLabel('Inert Button').setStyle(ButtonStyle.Secondary),
                new ButtonBuilder().setCustomId('uitest_inert2').setLabel('Secondary Too').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('uitest_inert3').setLabel('Danger Style').setStyle(ButtonStyle.Danger),
            )
            .foot('UI Test • you just saw H1/H2/H3, dividers, fields, quote, code, section', { ts: now }));

        /* --------------------------------------------------------- *
         * 1.5 - tiny harness: clicking rows toggles their buttons
         * --------------------------------------------------------- */
        const first = await interaction.fetchReply();
        first.createMessageComponentCollector({
            filter: (i) => i.user.id === interaction.user.id && i.customId.startsWith('uitest_inert'),
            time: 60000,
        }).on('collect', async (i) => {
            await i.reply({
                content: `${E.green_tick} Row received \`${i.customId}\` — same collector path as the trade buttons.`,
                ephemeral: true,
            });
        });

        /* --------------------------------------------------------- *
         * 2 - Media: media gallery + inline file (info accent)
         * --------------------------------------------------------- */
        await interaction.followUp(UI.card(UI.COLORS.info)
            .title('Media Gallery + Inline File', E.contract)
            .divider()
            .text('Galleries show images/videos inline; files render as a download card — this is how the QR preview and transcript work.')
            .divider()
            .gallery([
                avatar,
                { url: avatar, description: 'Placeholder gallery item with alt-text', spoiler: false },
                { url: avatar, description: 'Spoiler gallery item (click to unblur)', spoiler: true },
            ])
            .file('uitest-file.png')
            .foot('Media demo')
        , {
            files: [{ attachment: fs.readFileSync('./assets/emojis/Money.png'), name: 'uitest-file.png' }],
            ephemeral: true,
        });

        /* --------------------------------------------------------- *
         * 3 - Accent palette: 5 containers in ONE CV2 message
         * --------------------------------------------------------- */
        const palette = [
            [UI.COLORS.brand, 'brand', 'The AutoMM panel green'],
            [UI.COLORS.success, 'success', 'Deal confirmed / payment released'],
            [UI.COLORS.warn, 'warn', 'Pending states, rescans, mismatches'],
            [UI.COLORS.danger, 'danger', 'Cancellations, insufficient funds'],
            [UI.COLORS.info, 'info', 'Neutral info (addy/key/changelog)'],
        ];
        const paletteContainers = palette.map(([accent, name, blurb]) =>
            UI.card(accent)
                .heading(`${E.elite_dot} ${name}`, { level: 2 })
                .text(blurb)
                .build());
        await interaction.followUp({
            components: paletteContainers,
            flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral,
            allowedMentions: { parse: [] },
        });

        /* --------------------------------------------------------- *
         * 4 - Button-state harness (warn accent) — production path
         * --------------------------------------------------------- */
        const demo = await interaction.followUp(UI.card(UI.COLORS.warn)
            .title('Button State Harness', E.refresh)
            .divider()
            .text('**Disable All** grays the strip below **without touching any other part of the card** — this is exactly what `disableButtons()` / `enableButtons()` do during live deals.')
            .row(
                new ButtonBuilder().setCustomId('uitest_disable').setLabel('Disable All').setStyle(ButtonStyle.Danger),
                new ButtonBuilder().setCustomId('uitest_enable').setLabel('Enable All').setStyle(ButtonStyle.Success),
            )
            .row(
                new ButtonBuilder().setCustomId('uitest_probe').setLabel('Probe Button').setStyle(ButtonStyle.Secondary),
                new ButtonBuilder().setCustomId('uitest_probe2').setLabel('Second Probe').setStyle(ButtonStyle.Secondary),
            )
        , { ephemeral: true });

        demo.createMessageComponentCollector({
            filter: (i) => i.user.id === interaction.user.id && i.customId.startsWith('uitest_'),
            time: 120000,
        }).on('collect', async (i) => {
            try {
                if (i.customId === 'uitest_enable' || i.customId === 'uitest_disable') {
                    const disabled = i.customId === 'uitest_disable';
                    await i.update({
                        components: UI.withButtonState(i.message.components, disabled),
                    });
                    return;
                }
                await i.reply({
                    content: `${E.check} Probe \`${i.customId}\` collected live on an ephemeral CV2 message.`,
                    ephemeral: true,
                });
            } catch (err) {
                console.error('[uitest] toggle failed:', err);
            }
        });
    },
};
