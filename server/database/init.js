const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Stelle sicher, dass das Datenbankverzeichnis existiert
const dbDir = path.join(__dirname);
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'database.sqlite');

const initDatabase = () => {
    const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('Fehler beim Erstellen der Datenbank:', err);
            return;
        }
        console.log('Datenbank erfolgreich verbunden');
    });

    db.serialize(() => {
        // Erstelle Prompts Tabelle
        db.run(`
            CREATE TABLE IF NOT EXISTS prompts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                content TEXT NOT NULL,
                aiType TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `, (err) => {
            if (err) {
                console.error('Fehler beim Erstellen der Tabelle:', err);
            } else {
                console.log('Datenbank-Tabellen erfolgreich erstellt');
            }
        });
    });

    return db;
};

module.exports = initDatabase;