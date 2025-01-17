const puppeteer = require('puppeteer');

module.exports = async (req, res) => {

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto('https://www.scotiabankcr.com/personas/default.aspx', {
            waitUntil: 'domcontentloaded'
        });

        const compraValue = await page.$eval(
            'div.topFooter__column-text span',
            (span) => {
                const match = span.textContent.match(/Compra:\s*([¢\d,\.]+)/);
                return match[1].replace(/[¢,]/g, '');
            }
        );

        const ventaValue = await page.$eval(
            'div.topFooter__column-text div:nth-child(2) span',
            (span) => {
                const match = span.textContent.match(/Venta:\s*([¢\d,\.]+)/);
                return match[1].replace(/[¢,]/g, '');
            }
        );

        await browser.close();

        res.json({
            conversionSBCompra: compraValue,
            conversionSBVenta: ventaValue
        });
};
