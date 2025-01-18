const express = require('express');
const cors = require('cors');

// Importar rutas de APIs
const fetchUsdCompra = require('./api/fetch-usd-compra');
const fetchUsdVenta = require('./api/fetch-usd-venta');
const fetchEurCompra = require('./api/fetch-eur-compra');
const fetchEurVenta = require('./api/fetch-eur-venta');
const fetchSbRadios = require('./api/fetch-sb-radios');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS activado para todas las rutas
app.use(cors());

// Definir las rutas de APIs
app.get('/api/fetch-usd-compra', fetchUsdCompra);
app.get('/api/fetch-usd-venta', fetchUsdVenta);
app.get('/api/fetch-eur-compra', fetchEurCompra);
app.get('/api/fetch-eur-venta', fetchEurVenta);
app.get('/api/fetch-sb-radios', fetchSbRadios);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
