const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
  customerDetails: {
    name: String,
    // email: String,
    address: String,
    contactNumber: String,
  },
  orderDetails: [
    {
      itemName: String,
      price: Number,
      quantity: Number,
    },
  ],
  // Add other fields as necessary
});

module.exports = mongoose.model("Payment", paymentSchema);
