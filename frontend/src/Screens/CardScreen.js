import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import CustomButton from "../components/CustomButton";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    width: "100%",
    marginTop: "auto",
    marginBottom: "-80px",
  },
  card: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #e0e0e0",
    borderRadius: "12px",
    overflow: "hidden",
    width: "100%",
    minHeight: "500px",
    marginTop: "20px",
    marginBottom: "20px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  imageContainer: {
    flex: "1 1 50%",
    padding: "20px",
  },
  productImage: {
    width: "100%",
    height: "auto",
    objectFit: "contain",
  },
  productDetails: {
    flex: "1 1 50%",
    padding: "20px",
  },
  productName: {
    marginBottom: "15px",
  },
  price: {
    marginBottom: "10px",
  },
  description: {
    marginBottom: "15px",
  },
  relatedProductsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px",
  },
  relatedProductsText: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  relatedProductsList: {
    display: "flex",
    overflowX: "auto",
    whiteSpace: "nowrap",
    padding: "20px",
  },
  relatedProductCard: {
    minWidth: "200px",
    width: "200px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    overflow: "hidden",
    textAlign: "center",
    marginRight: "20px",
  },
  relatedProductImage: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
  },
  relatedProductDetails: {
    padding: "10px",
  },
};

const relatedProductData = [
  // Your related products data...
];

function CardScreen() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const location = useLocation();
  const { setCartItems } = location.state || {};

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/fetchProduct/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [productId]);

  const addToCart = () => {
    const newCartItem = { ...product, quantity: 1 };
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const itemIndex = cartItems.findIndex((item) => item._id === product._id);

    if (itemIndex >= 0) {
      cartItems[itemIndex].quantity += 1;
    } else {
      cartItems.push(newCartItem);
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.card}>
        <div style={styles.imageContainer}>
          <img
            src={`http://localhost:5000/uploads/${encodeURIComponent(
              product.pimage
            )}`}
            alt={product.pname}
            style={styles.productImage}
          />
        </div>
        <div style={styles.productDetails}>
          <h2 style={styles.productName}>{product.pname}</h2>
          <p style={styles.price}>Price: ${product.pprice}</p>
          <p style={styles.description}>Description: {product.pdescription}</p>
          <p style={styles.description}>Product Category: {product.pcategory}</p>
          <CustomButton text="Add to Cart" onClick={addToCart} />
        </div>
      </div>
      <Footer />
      {/* Related Products Section */}
      <div style={styles.relatedProductsContainer}>
        <h2 style={styles.relatedProductsText}>Related Products</h2>
        <div style={styles.relatedProductsList}>
          {relatedProductData.map((product, index) => (
            <div key={index} style={styles.relatedProductCard}>
              <img
                src={product.image}
                alt={product.name}
                style={styles.relatedProductImage}
              />
              <div style={styles.relatedProductDetails}>
                <h3>{product.name}</h3>
                <p>{product.price}</p>
                <Link to="/cardScreen" style={{ textDecoration: "none" }}>
                  <button style={styles.addToCartButton}>View</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CardScreen;
