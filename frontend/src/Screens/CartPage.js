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
import { useNavigate } from "react-router-dom";
import { Avatar, ListItemAvatar } from "@mui/material";

const CartPage = () => {
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    address: "",
    contact: "",
  });

  const navigate = useNavigate();

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

    try {
      // Check item availability in the database
      const availabilityResponse = await axios.post("/checkAvailability", {
        items: cartItems,
      });

      if (!availabilityResponse.data.success) {
        console.error("Some items are not available in the required quantity");
        // Handle the case where items are not available
        // e.g., display a message to the user or navigate to an error page
        return;
      }

      const {
        data: { key },
      } = await axios.get("/api/getkey");
      const {
        data: { order },
      } = await axios.post("/api/checkout", { amount });

      const options = {
        key: key,
        amount: order.amount,
        currency: "INR",
        name: "Sunrise Mart",
        description: "Order summary",
        image:
          "https://github.com/muhammadmaarij/food-app-mern/blob/main/frontend/src/store_logo.png",
        order_id: order.id,
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
        handler: async function (response) {
          // Send verification post request to server with additional data
          const verificationResponse = await axios.post(
            "/api/paymentverification",
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              customerInfo: {
                name: customerInfo.name,
                contact: customerInfo.contact,
                address: customerInfo.address,
              },
              orderDetails: cartItems.map((item) => ({
                itemName: item.pname,
                price: item.pprice,
                quantity: item.quantity,
              })),
            }
          );

          // Check the server response and navigate accordingly
          if (verificationResponse.data.success) {
            await axios.post("/updateQuantities", {
              items: cartItems,
            });
            const itemsForSuccessPage = cartItems;
            setCartItems([]);
            localStorage.removeItem("cartItems");
            // navigate(
            //   `/paymentsuccess?reference=${verificationResponse.data.paymentId}`
            // );
            navigate("/orderSuccess", {
              state: {
                orderDetails: {
                  orderId: order.id,
                  amount: order.amount / 100,
                  customerInfo: customerInfo,
                  cartItems: itemsForSuccessPage, // pass the stored items instead
                },
              },
            });
          } else {
            console.error(
              "Payment verification failed",
              verificationResponse.data.message
            );
            navigate(`/landingPage`);
            // Optionally, you could navigate to an error page or display an error message
          }
        },
        modal: {
          ondismiss: function () {
            // Navigate to the home page when the modal is dismissed
            navigate("/landingPage");
          },
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error during checkout", error);
      // Handle errors, such as displaying a message to the user
    }
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
                    <ListItemAvatar>
                      <Avatar
                        alt={item.pname}
                        src={`http://localhost:5000/uploads/${encodeURIComponent(
                          item.pimage
                        )}`} // Use the image URL from your product data
                        variant="square"
                        sx={{ width: 56, height: 56, marginRight: 5 }} // Adjust the size as needed
                      />
                    </ListItemAvatar>
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
