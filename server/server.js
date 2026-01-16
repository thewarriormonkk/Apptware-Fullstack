const express = require('express');
require('dotenv').config();
const productRoutes = require('./routes/products.js');
const connectDB = require('./config/db.js');

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


// connect to db then listen for request
const startServer = async () => {
    try {
        await connectDB();

        // listen for requests
        const port = process.env.PORT || 4000;
        app.listen(port, () => {
            console.log(`Listening for request on port: ${port}`);
        });
    } catch (err) {
        console.log(`Startup failed: ${err.message}`);
        process.exit(1);
    }
}

startServer();