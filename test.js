const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');

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
})();
