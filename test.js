const puppeteer = require('puppeteer');
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = './public' + req.url;
    if (filePath === './public/') {
        filePath = './public/index.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code == 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('File not found', 'utf-8');
            } else {
                res.writeHead(500);
                res.end(`Sorry, check with the site admin for error: ${error.code} ..\n`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

(async () => {
    // Start temporary server
    await new Promise(resolve => server.listen(3001, resolve));
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3001');
    // Get initial values
    const getVals = await page.evaluate(() => {
        return {
            timeStr: document.querySelectorAll('.border-t.border-white\\/10')[0].querySelector('.font-semibold').textContent,
            costStr: document.querySelectorAll('.border-t.border-white\\/10')[1].querySelector('.font-semibold').textContent,
            savingsStr: document.querySelector('.bg-gradient-to-r.from-\\[\\#8B00FF\\]\\/20').querySelector('.brand-gradient-text').textContent
        };
    });
    console.log("Initial default view:", getVals);

    await browser.close();
    server.close(); // Gracefully exit test server
})();
