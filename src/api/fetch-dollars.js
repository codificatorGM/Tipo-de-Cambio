const fetch = require('node-fetch');

module.exports = async (req, res) => {
    try {
        const response = await fetch('https://bncrmovil.bnonline.fi.cr/LoginM/TipoCambio/Index');
        const text = await response.text();
        const regex = /Dólares:\s*(\d+(\.\d+)?)/;
        const match = text.match(regex);

        if (match && match[1]) {
            const conversionUsdCompraBN = `${match[1]}.00`;
            res.json({ conversionUsdCompraBN });
        } else {
            res.status(404).json({ error: "Dollar value not found" });
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
};
