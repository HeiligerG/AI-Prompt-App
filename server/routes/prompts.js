const express = require('express');
const router = express.Router();

module.exports = (db) => {
    // Alle Prompts für einen AI-Typ abrufen
    router.get('/:aiType', (req, res) => {
        const { aiType } = req.params;
        db.all('SELECT * FROM prompts WHERE ai_type = ? ORDER BY created_at DESC', [aiType], (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json(rows);
        });
    });

    // Neuen Prompt erstellen
    router.post('/', (req, res) => {
        const { title, content, aiType } = req.body;
        db.run(
            'INSERT INTO prompts (title, content, ai_type) VALUES (?, ?, ?)',
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

    // Prompt aktualisieren
    router.put('/:id', (req, res) => {
        const { id } = req.params;
        const { title, content } = req.body;
        db.run(
            'UPDATE prompts SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
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

    // Prompt löschen
    router.delete('/:id', (req, res) => {
        const { id } = req.params;
        db.run('DELETE FROM prompts WHERE id = ?', [id], (err) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ success: true });
        });
    });

    // AI-Typen abrufen
    router.get('/ai-types/all', (req, res) => {
        db.all('SELECT * FROM ai_types ORDER BY name', [], (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json(rows);
        });
    });

    return router;
};