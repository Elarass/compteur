const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const COUNTER_FILE = 'counter.json';

function readCounter() {
    const data = fs.readFileSync(COUNTER_FILE, 'utf8');
    return JSON.parse(data);
}

function saveCounter(data) {
    fs.writeFileSync(COUNTER_FILE, JSON.stringify(data, null, 2));
}

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        const html = fs.readFileSync('index.html', 'utf8');
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(html);
    } else if (req.method === 'GET' && req.url === '/count') {
        const data = readCounter();
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(data));
    } else if (req.method === 'POST' && req.url === '/increment') {
        const data = readCounter();
        data.count++;
        data.lastUpdated = new Date().toISOString();
        saveCounter(data);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(data));
    }
});

server.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
