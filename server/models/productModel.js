const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
    productName: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be >= 0']
    },
    dimension: {
        type: String,
        required: [true, 'Dimensions are required']
    },
    color: {
        type: String,
        required: [true, 'Please mention color'],
    },
    countryOfOrigin: {
        type: String,
        required: [true, 'Country of Origin Required']
    },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema)