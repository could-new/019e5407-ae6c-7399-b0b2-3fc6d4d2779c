const sqlite = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, '../../data/database.sqlite');

// Ensure directory exists
if (!fs.existsSync(path.dirname(dbPath))) {
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
}

const db = sqlite(dbPath);

const init = () => {
    // Products table
    db.prepare(`
        CREATE TABLE IF NOT EXISTS products (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            description TEXT,
            price REAL NOT NULL
        )
    `).run();

    // Stock table (Encrypted data)
    db.prepare(`
        CREATE TABLE IF NOT EXISTS stock (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id TEXT NOT NULL,
            data TEXT NOT NULL, -- Encrypted credentials
            is_sold INTEGER DEFAULT 0,
            sold_to TEXT,
            sold_at DATETIME,
            FOREIGN KEY (product_id) REFERENCES products(id)
        )
    `).run();

    // Orders table
    db.prepare(`
        CREATE TABLE IF NOT EXISTS orders (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            product_id TEXT NOT NULL,
            amount REAL NOT NULL,
            status TEXT DEFAULT 'pending', -- pending, paid, cancelled
            payment_method TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `).run();

    // Tickets table
    db.prepare(`
        CREATE TABLE IF NOT EXISTS tickets (
            channel_id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            status TEXT DEFAULT 'open',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `).run();
    
    console.log('Database initialized successfully.');
};

module.exports = {
    db,
    init
};
