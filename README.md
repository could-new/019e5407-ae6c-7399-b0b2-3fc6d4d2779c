# Discord Auto Seller Bot

A professional, feature-rich Discord bot for automated account selling built with Node.js and Discord.js v14.

## Features
- **Automated Sales:** Support for VietQR and Crypto (LTC/BTC).
- **Product & Stock Management:** Add products, manage stock securely (encrypted), and prevent duplicates.
- **Ticket System:** Users can open support tickets and staff can manage/close/transcript them.
- **Admin Commands:** Manage your store directly from Discord (`/addstock`, `/stock`, `/setprice`, etc.).
- **Security:** Encrypted stock data, anti-scam prevention, and secure DM delivery of credentials.
- **Logs & Tracking:** Track all orders and revenue.

## Tech Stack
- **Node.js**
- **Discord.js v14**
- **better-sqlite3** (Database)
- **crypto-js** (Encryption)

## Setup Guide

1. **Install Dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

2. **Configure Environment:**
   Copy `.env.example` to `.env` and fill in your Bot Token, Guild ID, Client ID, Payment API keys, and Encryption key.
   \`\`\`bash
   cp .env.example .env
   \`\`\`

3. **Register Slash Commands:**
   Run the deployment script to register slash commands to your Discord server.
   \`\`\`bash
   npm run register
   \`\`\`

4. **Start the Bot:**
   \`\`\`bash
   npm start
   \`\`\`
   *(For development, you can use `npm run dev`)*

---

## About CouldAI
This app was generated with [CouldAI](https://could.ai), an AI app builder for cross-platform apps that turns prompts into real native iOS, Android, Web, and Desktop apps with autonomous AI agents that architect, build, test, deploy, and iterate production-ready applications.
