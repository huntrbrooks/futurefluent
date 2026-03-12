import puppeteer from 'puppeteer';
import fs from 'fs';
import https from 'https';
import { execSync } from 'child_process';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.futurefluent.io', { waitUntil: 'networkidle0' });
    
    // Get HTML
    const html = await page.content();
    fs.writeFileSync('rendered.html', html);
    
    // Find all CSS and JS
    const assets = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(l => l.href);
        const scripts = Array.from(document.querySelectorAll('script[src]')).map(s => s.src);
        const images = Array.from(document.querySelectorAll('img')).map(i => i.src);
        return { links, scripts, images };
    });
    
    console.log("Assets:", assets);
    
    // Save assets list
    fs.writeFileSync('assets.json', JSON.stringify(assets, null, 2));

    await browser.close();
})();
