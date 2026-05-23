const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { db } = require('../utils/database');
const CryptoJS = require('crypto-js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addstock')
        .setDescription('Add new stock to a product (Admin only)')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option =>
            option.setName('product_id')
                .setDescription('The ID of the product')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('data')
                .setDescription('The account credentials (Format: user:pass)')
                .setRequired(true)),
    async execute(interaction) {
        const productId = interaction.options.getString('product_id');
        const data = interaction.options.getString('data');

        // Verify product exists
        const product = db.prepare('SELECT * FROM products WHERE id = ?').get(productId);
        if (!product) {
            return interaction.reply({ content: 'Product not found!', ephemeral: true });
        }

        // Encrypt the credentials
        const encryptedData = CryptoJS.AES.encrypt(data, process.env.ENCRYPTION_KEY).toString();

        // Insert into database
        db.prepare('INSERT INTO stock (product_id, data) VALUES (?, ?)').run(productId, encryptedData);

        const embed = new EmbedBuilder()
            .setTitle('✅ Stock Added')
            .setDescription(`Successfully added 1 item to **${product.name}**.`)
            .setColor('#00ff00');

        await interaction.reply({ embeds: [embed], ephemeral: true });
    },
};
