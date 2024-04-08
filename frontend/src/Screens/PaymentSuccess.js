import React from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const referenceNum = searchParams.get("reference");
  return (
    <div style={styles.pageContainerStyle}>
      <div style={styles.contentWrapStyle}>
        <Header />
        <div style={styles.container}>
          <div style={styles.card}>
            <h1 style={styles.heading}>Order Successful</h1>
            <p style={styles.text}>
              Thank you for your purchase! Your order has been successfully
              placed.
            </p>
            <p style={styles.reference}>
              Reference No:{" "}
              <span style={styles.referenceNum}>{referenceNum}</span>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  pageContainerStyle: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  contentWrapStyle: {
    flex: 1,
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
  },
  card: {
    textAlign: "center",
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
  },
  heading: {
    color: "#4CAF50",
    textTransform: "uppercase",
    marginBottom: "20px",
  },
  text: {
    fontSize: "16px",
    lineHeight: "1.6",
  },
  reference: {
    marginTop: "20px",
    fontSize: "16px",
  },
  referenceNum: {
    fontWeight: "bold",
  },
};

export default PaymentSuccess;
