const express = require('express');
const cors = require('cors');
const initDatabase = require('./database/init');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Datenbank initialisieren
const db = initDatabase();

// API Routes
app.get('/api/prompts/:aiType', (req, res) => {
    const { aiType } = req.params;
    db.all(
        'SELECT * FROM prompts WHERE aiType = ? ORDER BY created_at DESC',
        [aiType],
        (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json(rows);
        }
    );
});

app.post('/api/prompts', (req, res) => {
    const { title, content, aiType } = req.body;
    db.run(
        'INSERT INTO prompts (title, content, aiType) VALUES (?, ?, ?)',
        [title, content, aiType],
        function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ id: this.lastID });
        }
    );
});

app.put('/api/prompts/:id', (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    db.run(
        'UPDATE prompts SET title = ?, content = ? WHERE id = ?',
        [title, content, id],
        (err) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ success: true });
        }
    );
});

app.delete('/api/prompts/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM prompts WHERE id = ?', [id], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ success: true });
    });
});

// Health Check Route
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});

// Graceful Shutdown
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Fehler beim Schließen der Datenbank:', err);
        } else {
            console.log('Datenbank erfolgreich geschlossen');
        }
        process.exit(0);
    });
});