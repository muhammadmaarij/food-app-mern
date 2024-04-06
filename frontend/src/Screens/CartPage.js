import React, { useState } from "react";
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

const CartPage = ({ cartItems }) => {
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

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.pprice * item.quantity,
    0
  );

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
                  <ListItem>
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
              <Button variant="contained" color="primary" sx={{ mt: 3 }}>
                Checkout
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage;
