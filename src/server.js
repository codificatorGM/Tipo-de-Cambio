// server.js (Express Server)
const express = require('express');
const fetch = require('node-fetch');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors({origin: "http://localhost:3000"})); // Allow requests only from your frontend's URL

//<editor-fold desc="API BANCO NACIONAL">
app.get('/api/fetch-dollars', async (req, res) => {
    const response = await fetch('https://bncrmovil.bnonline.fi.cr/LoginM/TipoCambio/Index');
    const text = await response.text();
    const regex = /Dólares:\s*(\d+(\.\d+)?)/;
    const match = text.match(regex);
    const conversionUsdCompraBN = `${match[1]}.00`;
    res.json({conversionUsdCompraBN});
});

app.get('/api/fetch-dollars-venta', async (req, res) => {
    const response = await fetch('https://bncrmovil.bnonline.fi.cr/LoginM/TipoCambio/Index');
    const text = await response.text();
    const regex = /Venta\s*([\s\S]*?)Dólares:\s*(\d+(\.\d+)?)/;
    const match = text.match(regex);
    const conversionUsdVentaBN = `${match[2]}.00`;
    res.json({conversionUsdVentaBN});
});

app.get('/api/fetch-eur', async (req, res) => {
    const response = await fetch('https://bncrmovil.bnonline.fi.cr/LoginM/TipoCambio/Index');
    const text = await response.text();
    const regex = /Euros:\s*(\d+(\.\d+)?)/;
    const match = text.match(regex);
    res.json({conversionEurCompraBN: match[1]});
});

app.get('/api/fetch-eur-venta', async (req, res) => {
    const response = await fetch('https://bncrmovil.bnonline.fi.cr/LoginM/TipoCambio/Index');
    const text = await response.text();
    const regex = /Venta[\s\S]*?Euros:\s*(\d+(\.\d+)?)/;
    const match = text.match(regex);
    res.json({conversionEurVentaBN: match[1]});
});
//</editor-fold>

//<editor-fold desc="API SCOTIABANK PUPPEETEER">
app.get('/api/fetch-sb-radios', async (req, res) => {
        // Launch Puppeteer browser
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Go to the Scotiabank page
        await page.goto('https://www.scotiabankcr.com/personas/default.aspx', {
            waitUntil: 'domcontentloaded'
        });

        // Extract Compra value
        const compraValue = await page.$eval(
            'div.topFooter__column-text span', // Select the <span> containing Compra value
            (span) => {
                const match = span.textContent.match(/Compra:\s*([¢\d,\.]+)/); // Extract value using regex
                return match[1].replace(/[¢,]/g, ''); // Remove ¢ and commas
            }
        );

        // Extract Venta value
        const ventaValue = await page.$eval(
            'div.topFooter__column-text div:nth-child(2) span', // Select the <span> inside the second <div>
            (span) => {
                const match = span.textContent.match(/Venta:\s*([¢\d,\.]+)/); // Extract value using regex
                return match[1].replace(/[¢,]/g, ''); // Remove ¢ and commas
            }
        );

        // Close the browser
        await browser.close();

        // Return both values in the response
        res.json({
            conversionSBCompra: compraValue,
            conversionSBVenta: ventaValue
        });
});
//</editor-fold>

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});