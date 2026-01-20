// const AppError = require('../utils/appError');
const Product = require('../models/productModel');
const mongoose = require('mongoose');
const AppError = require('../utils/appError');

// @desc Get all products
// @route GET /api/products
// @access Public
const getProducts = async (req, res) => {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json(products);
}

// @desc Get a product
// @route GET /api/products/:id
// @access Public
const getProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new AppError('Invalid ID format. Provide valid MongoDB ID', 400);
    }

    const product = await Product.findById(id);

    if (!product) {
        throw new AppError('No product found', 404);
    }
    res.status(200).json(product);
}

// @desc Create a new product
// @route POST /api/products
// @access Public
const createProduct = async (req, res) => {
    try {
        const { productName, price, dimension, color, countryOfOrigin } = req.body;
        const newProduct = {
            productName,
            price,
            dimension,
            color,
            countryOfOrigin
        }
        const product = await Product.create(newProduct);
        res.status(201).json(product);
    } catch (error) {
        // pass raw error to the global handler
        next(error);
    }
}

// @desc Update a product detail
// @route PATCH /api/products/:id
// @access Public
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const payload = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new AppError('Invalid ID format. Provide valid MongoDB ID', 400);
    }
    const product = await Product.findByIdAndUpdate(id, payload, { new: true, runValidators: true });

    if (!product) {
        throw new AppError('No product found', 404);
    }

    res.status(200).json(product);
}

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Public
const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new AppError('Invalid ID format. Provide valid MongoDB ID', 400);
    }
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
        throw new AppError('No product found', 404);
    }

    res.status(200).json(product);
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}