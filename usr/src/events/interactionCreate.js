const { Events, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { db } = require('../utils/database');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return;

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        } else if (interaction.isStringSelectMenu()) {
            if (interaction.customId === 'select_product') {
                const productId = interaction.values[0];
                const product = db.prepare('SELECT * FROM products WHERE id = ?').get(productId);
                
                const stockCount = db.prepare('SELECT COUNT(*) as count FROM stock WHERE product_id = ? AND is_sold = 0').get(productId).count;
                
                if (stockCount === 0) {
                    return interaction.reply({ content: 'Sorry, this product is out of stock!', ephemeral: true });
                }

                const embed = new EmbedBuilder()
                    .setTitle(`Checkout: ${product.name}`)
                    .setDescription(`Price: $${product.price}\n\nPlease select your payment method.`)
                    .setColor('#f1c40f');

                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`pay_vietqr_${productId}`)
                            .setLabel('Pay with VietQR')
                            .setStyle(ButtonStyle.Primary)
                            .setEmoji('🏦'),
                        new ButtonBuilder()
                            .setCustomId(`pay_crypto_${productId}`)
                            .setLabel('Pay with Crypto')
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji('₿')
                    );

                await interaction.update({ embeds: [embed], components: [row], ephemeral: true });
            }
        }
    },
};
