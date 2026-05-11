const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

function getMinutesSinceNewYear() {
    const start = new Date('2026-01-01T00:00:00Z');
    const now = new Date();
    const diff = now - start;
    return Math.floor(diff / 60000);
}

app.get('/count', (req, res) => {
    const count = getMinutesSinceNewYear();
    res.json({ count });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log('Serveur démarré sur le port ' + PORT);
});
