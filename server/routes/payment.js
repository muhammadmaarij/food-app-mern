// const router = require("express").Router();
// const Razorpay = require("razorpay");
// const crypto = require("crypto");

// router.post("/orders", async (req, res) => {
//   try {
//     const instance = new Razorpay({
//       key_id: process.env.KEY_ID,
//       key_secret: process.env.KEY_SECRET,
//     });

//     const options = {
//       amount: req.body.amount * 100, // Convert to the smallest currency unit
//       currency: "INR",
//       receipt: crypto.randomBytes(10).toString("hex"),
//     };

//     // Promise-based pattern using async/await
//     const order = await instance.orders.create(options);
//     res.status(200).json({ data: order });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Internal Server Error", error: error.message });
//     console.log(error);
//   }
// });

// router.post("/verify", async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//       req.body;
//     const sign = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSign = crypto
//       .createHmac("sha256", process.env.KEY_SECRET)
//       .update(sign.toString())
//       .digest("hex");

//     if (razorpay_signature === expectedSign) {
//       res.status(200).json({ message: "Payment verified successfully" });
//     } else {
//       res.status(400).json({ message: "Invalid signature sent!" });
//     }
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Internal Server Error", error: error.message });
//     console.log(error);
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const Razorpay = require("razorpay");
const Payment = require("../models/paymentSchema");
console.log("Razorpay Key:", process.env.RAZORPAY_API_KEY);
console.log("Razorpay Secret:", process.env.RAZORPAY_API_SECRET);
// Accessing the environment variables directly
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

router.post("/checkout", async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount * 100), // amount in the smallest currency unit
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    const order = await razorpayInstance.orders.create(options);
    console.log("first", order);
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

router.post("/paymentverification", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    res.redirect(
      `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
    );
  } else {
    console.log("Order ID: ", razorpay_order_id);
    console.log("Payment ID: ", razorpay_payment_id);
    console.log("Signature: ", razorpay_signature);
    console.log("Expected Signature: ", expectedSignature);

    res.status(400).json({
      success: false,
    });
  }
});

module.exports = router;
