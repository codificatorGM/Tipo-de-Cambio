// server.js (Express Server)
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors({origin: "http://localhost:3000"})); // Allow requests only from your frontend's URL

app.get('/api/fetch-dollars', async (req, res) => {
    const response = await fetch('https://bncrmovil.bnonline.fi.cr/LoginM/TipoCambio/Index');
    const text = await response.text();
    const regex = /Dólares:\s*(\d+(\.\d+)?)/;
    const match = text.match(regex);
    res.json({conversionUsdCompraBN: match[1]});
});

app.get('/api/fetch-dollars-venta', async (req, res) => {
    const response = await fetch('https://bncrmovil.bnonline.fi.cr/LoginM/TipoCambio/Index');
    const text = await response.text();
    const regex = /Venta\s*([\s\S]*?)Dólares:\s*(\d+(\.\d+)?)/;
    const match = text.match(regex);

    if (match) {
        res.json({ conversionUsdVentaBN: match[2] });
    } else {
        res.status(500).json({ error: 'Failed to extract Venta Dólares' });
    }
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


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
