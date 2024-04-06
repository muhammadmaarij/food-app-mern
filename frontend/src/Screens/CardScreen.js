import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import cart from "../asualogo.png";
import { Link } from "react-router-dom"; // Import Link from React Router
import { useParams } from "react-router-dom"; // Import useParams
import axios from "axios";
import { useLocation } from "react-router-dom";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    width: "100%",
    marginTop: "auto", // Push content to top
    marginBottom: "-80px", // Adjust based on the height of your footer
  },
  card: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #e0e0e0",
    borderRadius: "12px", // Increased border radius
    overflow: "hidden",
    width: "100%",
    minHeight: "500px",
    marginTop: "20px",
    marginBottom: "20px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Added shadow
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
    marginBottom: "15px", // Adjusted spacing
  },
  price: {
    marginBottom: "10px", // Adjusted spacing
  },
  cod: {
    marginBottom: "10px", // Adjusted spacing
  },
  brand: {
    marginBottom: "10px", // Adjusted spacing
  },
  description: {
    marginBottom: "15px", // Adjusted spacing
  },
  addToCartButton: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "12px 24px", // Adjusted padding
    borderRadius: "6px", // Adjusted border radius
    cursor: "pointer",
    transition: "background-color 0.2s ease, transform 0.2s ease",
    ":hover": {
      // Added hover effect
      backgroundColor: "#0056b3",
      transform: "scale(1.05)",
    },
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
    whiteSpace: "nowrap", // Prevents wrapping
    padding: "20px",
  },
  relatedProductCard: {
    minWidth: "200px", // Ensure cards have a minimum width
    width: "200px", // Fixed width for each card
    border: "1px solid #ddd",
    borderRadius: "5px",
    overflow: "hidden",
    textAlign: "center",
    marginRight: "20px", // Add margin between cards
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
  {
    name: "Related Product 1",
    price: "$10",
    image: "https://via.placeholder.com/200x150?text=Related+1",
  },
  {
    name: "Related Product 2",
    price: "$20",
    image: "https://via.placeholder.com/200x150?text=Related+2",
  },
  {
    name: "Related Product 3",
    price: "$30",
    image: "https://via.placeholder.com/200x150?text=Related+3",
  },
  {
    name: "Related Product 4",
    price: "$40",
    image: "https://via.placeholder.com/200x150?text=Related+4",
  },
  {
    name: "Related Product 5",
    price: "$50",
    image: "https://via.placeholder.com/200x150?text=Related+5",
  },
  {
    name: "Related Product 6",
    price: "$60",
    image: "https://via.placeholder.com/200x150?text=Related+6",
  },
  // Add more related products as needed
];

function CardScreen() {
  const { productId } = useParams(); // Get the productId from the URL
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

  if (!product) {
    return <div>Loading...</div>;
  }

  const addToCart = () => {
    console.log("first");
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
          <button onClick={addToCart} style={styles.addToCartButton}>
            Add to Cart
          </button>
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
