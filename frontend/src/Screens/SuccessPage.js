import React from "react";
import { Container, Typography } from "@mui/material";

const SuccessPage = () => {
  return (
    <Container maxWidth="sm" sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom>
        Payment Successful
      </Typography>
      <Typography variant="body1">
        Thank you for your purchase! Your order has been successfully processed.
      </Typography>
    </Container>
  );
};

export default SuccessPage;
