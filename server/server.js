const express = require('express');
require('dotenv').config();
const productRoutes = require('./routes/products.js');

// epxress app
const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
});

// routes
app.use('/api/products', productRoutes);

// listen for requests
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Listening for request on port: ${port}`);
});