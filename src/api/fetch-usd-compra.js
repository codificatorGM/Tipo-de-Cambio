const fetch = require('node-fetch');

module.exports = async (req, res) => {
        const response = await fetch('https://bncrmovil.bnonline.fi.cr/LoginM/TipoCambio/Index');
        const text = await response.text();
        const regex = /Dólares:\s*(\d+(\.\d+)?)/;
        const match = text.match(regex);
            const conversionUsdCompraBN = `${match[1]}.00`;
            res.json({ conversionUsdCompraBN });
};
