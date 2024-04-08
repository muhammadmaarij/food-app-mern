import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  Grid,
  Box,
  Paper,
} from "@mui/material";
import CustomButton from "../components/CustomButton";
import axios from "axios";

const CartPage = () => {
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    address: "",
    contact: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(
      localStorage.getItem("cartItems") || "[]"
    );
    setCartItems(storedCartItems);
  }, []);

  const handleDelete = (index) => {
    const newCartItems = cartItems.filter((item, i) => i !== index);
    setCartItems(newCartItems);
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.pprice * item.quantity,
    0
  );

  const checkoutHandler = async (e, amount) => {
    e.preventDefault();
    const {
      data: { key },
    } = await axios.get("http://www.localhost:5000/api/getkey");

    console.log(key);

    const {
      data: { order },
    } = await axios.post("http://localhost:5000/api/checkout", {
      amount,
    });

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "Sunrise Mart",
      description: "Order summary",
      image:
        "https://github.com/muhammadmaarij/food-app-mern/blob/main/frontend/src/store_logo.png",
      order_id: order.id,
      callback_url: "http://localhost:5000/api/paymentverification",
      prefill: {
        name: customerInfo.name,
        email: "gaurav.kumar@example.com",
        contact: customerInfo.contact,
      },
      notes: {
        address: customerInfo.address,
      },
      theme: {
        color: "#007f73",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>
              Your Cart
            </Typography>
            <List>
              {cartItems.map((item, index) => (
                <React.Fragment key={index}>
                  <ListItem
                    secondaryAction={
                      <Button onClick={() => handleDelete(index)} color="error">
                        Delete
                      </Button>
                    }
                  >
                    <ListItemText
                      primary={item.pname}
                      secondary={`Price: $${item.pprice} | Quantity: ${item.quantity}`}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Total Price: ${totalPrice}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom>
              Delivery Details
            </Typography>
            <Box component="form" noValidate autoComplete="off" sx={{ mt: 1 }}>
              <TextField
                label="Name"
                name="name"
                value={customerInfo.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Address"
                name="address"
                value={customerInfo.address}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Contact Number"
                name="contact"
                value={customerInfo.contact}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <CustomButton
                text="Checkout"
                onClick={(e) => checkoutHandler(e, totalPrice)}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage;
