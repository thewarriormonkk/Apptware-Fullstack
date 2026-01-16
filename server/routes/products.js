const express = require('express');
const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController.js');

const router = express.Router();

// get all
router.get('/', getProducts);

// get single
router.get('/:id', getProduct);

// create
router.post('/', createProduct);

// update
router.patch('/:id', updateProduct);

// delete
router.delete('/:id', deleteProduct);


module.exports = router;