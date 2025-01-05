const express = require('express');
const cors = require('cors');

// Import API routes
const fetchDollars = require('./api/fetch-dollars');
const fetchDollarsVenta = require('./api/fetch-dollars-venta');
const fetchEur = require('./api/fetch-eur');
const fetchEurVenta = require('./api/fetch-eur-venta');
const fetchSbRadios = require('./api/fetch-sb-radios');

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors({ origin: "https://tipo-de-cambio.vercel.app" })); // Allow requests only from your frontend's URL

// Define API routes using the imported functions
app.get('/api/fetch-dollars', fetchDollars);
app.get('/api/fetch-dollars-venta', fetchDollarsVenta);
app.get('/api/fetch-eur', fetchEur);
app.get('/api/fetch-eur-venta', fetchEurVenta);
app.get('/api/fetch-sb-radios', fetchSbRadios);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
