const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const productRoutes = require('./routes/products.js');
const connectDB = require('./config/db.js');

// express app
const app = express();

// security middleware
app.use(helmet());

// rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false
});

app.use('/api/', limiter);

// body parsing middleware
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(mongoSanitize());


// loggin middleware
app.use(morgan('dev'));

// api routes
app.use('/api/products', productRoutes);

// 404 handler for undefined routes
app.use((req, res, next) => {
    const error = new Error(`Route not found: ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
});

// global error handling middleware
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    console.error('Error:', err.message);
    const isProd = process.env.NODE_ENV === 'production';

    res.status(err.statusCode).json({
        status: 'error',
        message: isProd ? 'Something went wrong' : err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});


// connect to db then listen for request
let serverInstance;
const startServer = async () => {
    try {
        await connectDB();

        // listen for requests
        const port = process.env.PORT || 4000;
        serverInstance = app.listen(port, () => {
            console.log(`Listening for request on port: ${port}`);
        });
    } catch (err) {
        console.log(`Startup failed: ${err.message}`);
        process.exit(1);
    }
}

startServer();


// graceful shutdown
const gracefulShutdown = (signal) => {
    console.log(`${signal} signal received. Closing HTTP server...`);

    // stop server from accepting new connections
    if (serverInstance) {
        serverInstance.close(() => {
            console.log('HTTP server closed.');
            process.exit(0);
        });
    } else {
        process.exit(0);
    }
};

// trigger it
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));