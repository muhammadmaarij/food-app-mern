const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const productSchema = new mongoose.Schema({
  pname: {
    type: String,
    required: true,
  },
  ptitle: {
    type: String,
    required: true,
  },
  pdescription: {
    type: String,
    required: true,
  },
  pprice: {
    type: String,
    required: true,
  },
  pcategory: {
    type: String,
    required: true,
  },
  pimage: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0, // You can set a minimum quantity if needed
  },
});

const Product = mongoose.model("PRODUCT", productSchema);
module.exports = Product;
