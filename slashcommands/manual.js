const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require('discord.js');
const E = require('../functions/emojis');
const UI = require('../functions/ui');
const axios = require('axios');
const toml = require('toml');
const fs = require('fs');
const config = toml.parse(fs.readFileSync('./config.toml', 'utf-8'));
const sdk = require('../.api/apis/tatumdocs')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('manual')
        .setDefaultMemberPermissions(PermissionFlagsBits.Admininstrator)
        .setDescription('release funds in optional ltc address')
        .addStringOption(option =>
            option.setName('addy')
            .setDescription('valid ltc address')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('key')
            .setDescription('valid ltc key')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('amount')
            .setDescription('valid ltc amount')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('sendto')
            .setDescription('valid ltc sendto')
            .setRequired(true)),
    async execute(client, interaction) {
        const addy = await interaction.options.getString('addy');
        const l_key = await interaction.options?.getString('key');
        const l_amount = await interaction.options?.getString('amount');
        const l_sendto = await interaction.options?.getString('sendto');

        let thread = await interaction.channel;


        if (l_key || l_amount) {
            if (l_key && l_amount) {
                let fee = 0.000013;

                this.ltcaddy = addy;
                this.ltckey = l_key;
                this.am = l_amount;

                let LTCbal = await balance(this.ltcaddy);
                // amount is denominated in LTC (matches the option description)
                let check = parseFloat(l_amount);
                let USDbal = await ltcToUsd(check);

                if (!isFinite(check) || check <= 0) {
                    return interaction.reply({
                        content: `> ${E.elite_terms} Invalid amount — enter the LTC amount to release (e.g. 0.0018).`,
                        flags: require('discord.js').MessageFlags.Ephemeral
                    });
                }

                if (check * 1e8 < 5460) {
                    return interaction.reply({
                        content: `> ${E.elite_terms} ${check} LTC is below the network dust threshold (~0.0000546 LTC) and can never broadcast. Request a larger amount.`,
                        flags: require('discord.js').MessageFlags.Ephemeral
                    });
                }

                if (LTCbal <= 0) {
                    fee = 0;
                    return interaction.reply({
                        content: `> ${E.elite_terms} No Balance Found \n> USD: 0 \n> LTC: ${LTCbal}`,
                        ephemeral: true
                    });
                }
                else if (LTCbal >= check) {
                    // If the leftover after send+fee is a dust change output, the
                    // network rejects the tx — sweep it into the send instead.
                    const leftover = LTCbal - check - fee;
                    if (leftover > 0 && leftover * 1e8 < 5460) {
                        console.log(`Dust change (${leftover} LTC) would be rejected — sweeping into the send`);
                        check = LTCbal;
                    }
                    await interaction.reply({
                        content: `> ${E.elite_LTC} Requested Release  . . . `,
                        ephemeral: true
                    });

                    await SENDMONEY(check, this.ltcaddy, this.ltckey, fee, l_sendto);
                }
                else {
                    return interaction.reply({
                        content: `> ${E.elite_terms} Insufficient Balance \n> USD: ${USDbal} \n> LTC: ${LTCbal}`,
                        ephemeral: true
                    });
                }
            } else {
                return interaction.reply({
                    content: `One of the values is invalid or was not provided.`,
                    ephemeral: true
                });
            }
        }




        async function ltcToUsd(amount) {
            try {
                const { data } = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=litecoin&vs_currencies=usd');
                const ltcPrice = data?.litecoin?.usd;
                console.log('LTC/USD price:', ltcPrice, 'amount:', amount);
                if (typeof ltcPrice !== 'number') throw new Error('Invalid data structure in API response');
                const usdBalance = amount * ltcPrice;
                console.log('usdBalance: ', usdBalance);
                return parseFloat(usdBalance);
            } catch (error) {
                console.error(`Error fetching LTC to USD rate: ${error.message}`);
                return null;
            }
        }

        async function SENDMONEY(bal, ltcaddy, ltckey, OP, l_sendto) {



            try {

                try {
                    console.log('LTC we got from balance:', bal);
                } catch (err) {
                    console.error('Error checking balance:', err);
                    throw new Error('Failed to check balance');
                }

                const fee = parseFloat(OP);
                console.log(fee)
                if (isNaN(fee) || fee < 0) {
                    throw new Error("Invalid fee value. Fee should be a non-negative number.");
                }
                console.log('Fee:', fee);


                const finalBalance = bal - fee;
                const formattedFinalBalance = parseFloat(finalBalance).toFixed(8);
                console.log('> LTC after subtracting fee:', finalBalance);

                // Litecoin outputs below the dust threshold are rejected by the network
                if (!(finalBalance > 0) || finalBalance * 1e8 < 5460) {
                    throw new Error(`Release amount too small to broadcast: ${formattedFinalBalance} LTC is dust. Litecoin outputs must exceed the network dust threshold (~0.00005 LTC). Fund the wallet or request a larger amount.`);
                }

                try {
                    await sdk.auth(config.apikey);
                } catch (err) {
                    console.error('Error during SDK authentication:', err);
                    throw new Error('SDK authentication failed');
                }

                let hax;
                try {
                    hax = await sdk.ltcTransferBlockchain({
                        fromAddress: [{
                            address: ltcaddy.toString(),
                            privateKey: ltckey.toString()
                        }],
                        fee: fee.toString(),
                        changeAddress: l_sendto.toString(),
                        to: [{
                            address: l_sendto.toString(),
                            value: parseFloat(formattedFinalBalance)
                        }]
                    });

                    this.txId = hax.data.txId;
                    console.log(this.txId);
                    const releasedCard = () => UI.card(UI.COLORS.success)
                        .title('Funds Released', E.check)
                        .divider()
                        .text('The funds have been released to the following LTC address:\n\n`\n' + l_sendto + '\n`')
                        .divider()
                        .field('Transaction ID', `[${this.txId}](https://litecoinspace.org/tx/${this.txId})`)
                        .field('Timestamp', `<t:${Math.floor(Date.now() / 1000)}:F>`)
                        .foot(`${E.refresh} irtasam - Trade Completed`);
                    console.log('released card built')
                    interaction.editReply(releasedCard().msg({ content: null }))
                    await interaction.channel.send(releasedCard().msg());
                } catch (err) {
                    console.error('Error sending LTC:', err);
                    if (err.response?.data) console.error('Tatum response:', JSON.stringify(err.response.data));
                    throw new Error(`Failed to send LTC: ${err.response?.data?.cause || err.response?.data?.errorCode || err.message}`);
                }
            } catch (err) {
                console.error('Error in sendLTC function:', err);
                const msg = { content: `> ${E.elite_CautionWarning} Error while release: ${err}` };
                if (interaction.deferred || interaction.replied) await interaction.editReply(msg).catch(() => null);
                else await interaction.reply({ ...msg, flags: require('discord.js').MessageFlags.Ephemeral }).catch(() => null);

                await interaction.channel.send({
                    content: `> ${E.elite_CautionWarning} Error: ${err.message} \n > Please Reach Out Support !`
                });
            }
        }

        async function balance(address) {
            try {
                const endpoint = `https://litecoinspace.org/api/address/${address}`;
                const response = await axios.get(endpoint);
                const data = response.data;
                const bal = (data.chain_stats?.funded_txo_sum || 0) - (data.chain_stats?.spent_txo_sum || 0);
                const unbal = (data.mempool_stats?.funded_txo_sum || 0) - (data.mempool_stats?.spent_txo_sum || 0);
                const ltcbal = await satoshisToLtc(bal);
                console.log('LTC in Wallet ,', ltcbal);
                return parseFloat(ltcbal);
            } catch (err) {
                console.error('Error retrieving LTC balance:', err);
                throw err;
            }
        }

        async function satoshisToLtc(satoshis) {
            return satoshis / 100000000;
        }
    }
};