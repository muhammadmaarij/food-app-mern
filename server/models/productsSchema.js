const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const productSchema = new mongoose.Schema({
    pname: {
        type: String,
        required: true
    },  
    ptitle: {
        type: String,
        required: true
    },
    pdescription: {
        type: String,
        required: true
    },
    pprice: {
        type: String,
        required: true
    },
    pimage: {
        type: String,
        required: true
    }
});



const Product = mongoose.model('PRODUCT', productSchema);
module.exports = Product;

