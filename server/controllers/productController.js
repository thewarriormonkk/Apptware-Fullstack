
// get all
const getProducts = (req, res) => {
    res.status(200).json({ message: 'fetched all products' });
}

// get single
const getProduct = (req, res) => {
    res.status(200).json({ message: 'fetched single product' });
}

// create
const createProduct = (req, res) => {
    res.status(201).json({ message: 'created a product' });
}

// update
const updateProduct = (req, res) => {
    res.status(200).json({ message: 'successfully updated product details' });
}

// delete
const deleteProduct = (req, res) => {
    res.status(200).json({ message: 'removed product' });
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}