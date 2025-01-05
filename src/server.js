const express = require('express');
const cors = require('cors');

// Import API routes
const fetchUsdCompra = require('./api/fetch-usd-compra');
const fetchUsdVenta = require('./api/fetch-usd-venta');
const fetchEurCompra = require('./api/fetch-eur-compra');
const fetchEurVenta = require('./api/fetch-eur-venta');
const fetchSbRadios = require('./api/fetch-sb-radios');

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors({
    origin: ["https://tipo-de-cambio.vercel.app", "http://localhost:3001", "http://localhost:3000"]
}));

// Define API routes using the imported functions
app.get('/api/fetch-usd-compra', fetchUsdCompra);
app.get('/api/fetch-usd-venta', fetchUsdVenta);
app.get('/api/fetch-eur-compra', fetchEurCompra);
app.get('/api/fetch-eur-venta', fetchEurVenta);
app.get('/api/fetch-sb-radios', fetchSbRadios);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
