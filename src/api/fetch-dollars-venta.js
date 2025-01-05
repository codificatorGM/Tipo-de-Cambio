const fetch = require('node-fetch');

module.exports = async (req, res) => {

        const response = await fetch('https://bncrmovil.bnonline.fi.cr/LoginM/TipoCambio/Index');
        const text = await response.text();
        const regex = /Venta\s*([\s\S]*?)Dólares:\s*(\d+(\.\d+)?)/;
        const match = text.match(regex);

            const conversionUsdVentaBN = `${match[2]}.00`;
            res.json({ conversionUsdVentaBN });


};
