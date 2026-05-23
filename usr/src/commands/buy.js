const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const { db } = require('../utils/database');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('buy')
        .setDescription('Open the store to buy products.'),
    async execute(interaction) {
        const products = db.prepare('SELECT * FROM products').all();

        if (products.length === 0) {
            return interaction.reply({ content: 'The store is currently empty!', ephemeral: true });
        }

        const options = products.map(p => {
            const stockCount = db.prepare('SELECT COUNT(*) as count FROM stock WHERE product_id = ? AND is_sold = 0').get(p.id).count;
            return {
                label: p.name,
                description: `Price: $${p.price} | Stock: ${stockCount}`,
                value: p.id,
            };
        });

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('select_product')
            .setPlaceholder('Select a product to purchase')
            .addOptions(options);

        const row = new ActionRowBuilder().addComponents(selectMenu);

        const embed = new EmbedBuilder()
            .setTitle('🛒 Welcome to the Store')
            .setDescription('Please select a product from the menu below to start your purchase.')
            .setColor('#0099ff')
            .setFooter({ text: 'Auto Delivery System' });

        await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
    },
};
