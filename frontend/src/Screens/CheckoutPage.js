import React from "react";
import { useLocation } from "react-router-dom";
import { Container, Typography, Button, Grid, Box, Paper } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { state } = useLocation();
  const { cartItems, totalPrice } = state || { cartItems: [], totalPrice: 0 };
  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      // Create an order on your server
      const orderUrl = "http://localhost:8080/api/payment/orders";
      const { data: orderData } = await axios.post(orderUrl, {
        amount: totalPrice,
      });

      // Initialize Razorpay options
      const options = {
        key: "YOUR_RAZORPAY_KEY",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Your Company Name",
        description: "Test Transaction",
        image: "https://example.com/your_logo.jpg",
        order_id: orderData.id,
        handler: async (response) => {
          // Verify the payment signature on your server
          try {
            const verifyUrl = "http://localhost:8080/api/payment/verify";
            const { data: verifyData } = await axios.post(verifyUrl, response);
            if (verifyData.success) {
              navigate("/success");
            } else {
              // Handle payment verification failure
              console.error("Payment verification failed");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
          }
        },
        theme: {
          color: "#3399cc",
        },
      };

      // Open Razorpay checkout
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment initiation error:", error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ my: 4 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Checkout
        </Typography>
        <Typography variant="h6" gutterBottom>
          Total Price: ${totalPrice}
        </Typography>
        <Button variant="contained" color="primary" onClick={handlePayment}>
          Pay with Razorpay
        </Button>
      </Paper>
    </Container>
  );
};

export default CheckoutPage;
