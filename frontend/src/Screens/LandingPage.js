import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import grocery from "../grocery.png";
import beauty from "../beauty.png";
import gourment from "../gourment.png";
import wheat from "../wheat.png";
import health from "../health.png";
import bread from "../bread.png";

function LandingPage({ setCartItems }) {
  const [hoveredProductIndex, setHoveredProductIndex] = useState(null);
  const [products, setProducts] = useState([]);
  // const [cartItems, setCartItems] = useState([]);

  const categories = [
    { name: "Grocery", image: grocery },
    { name: "Bakery", image: bread },
    { name: "Gourment", image: gourment },
    { name: "Wheat", image: wheat },
    { name: "Health", image: health },
    { name: "Beauty", image: beauty },

    // Add more categories as needed
  ];

  const callProducts = async () => {
    try {
      const res = await fetch("/fetchProducts", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);

      if (res.status !== 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callProducts();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/fetchProducts");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();

    const storedCartItems = JSON.parse(
      localStorage.getItem("cartItems") || "[]"
    );
    setCartItems(storedCartItems);
  }, []);

  // useEffect(() => {
  //   console.log("Cart items:", cartItems);
  // }, [cartItems]);

  return (
    <div style={pageContainerStyle}>
      <div style={contentWrapStyle}>
        <Header />
        <div style={categoriesContainerStyle}>
          {categories.map((category, index) => (
            <div key={index} style={categoryStyle}>
              <img
                src={category.image}
                alt={category.name}
                style={categoryImageStyle}
              />
              <p style={categoryNameStyle}>{category.name}</p>
            </div>
          ))}
        </div>
        <h2 style={exploreText}>Explore Trending Products</h2>
        <div style={containerStyle}>
          <div style={cardContainerStyle}>
            <div style={cardWrapperStyle}>
              {products.map((product, index) => (
                <Link
                  to={{
                    pathname: `/cardScreen/${product._id}`,
                    state: { setCartItems },
                  }}
                  key={index}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      ...cardStyle,
                      ...(index === hoveredProductIndex ? hoverEffect : {}),
                    }}
                    onMouseEnter={() => setHoveredProductIndex(index)}
                    onMouseLeave={() => setHoveredProductIndex(null)}
                  >
                    <img
                      src={`http://localhost:5000/uploads/${encodeURIComponent(
                        product.pimage
                      )}`}
                      alt={product.pname}
                      style={cardImageStyle}
                    />
                    <div style={cardContentStyle}>
                      <h3>{product.pname}</h3>
                      <p>${product.pprice}</p>
                      <button style={btn}>Add to Cart</button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

const pageContainerStyle = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
};

const contentWrapStyle = {
  flex: 1,
};
const categoriesContainerStyle = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  margin: "20px 0",
};

const categoryStyle = {
  margin: "10px",
  textAlign: "center",
};

const categoryImageStyle = {
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  objectFit: "cover",
};

const categoryNameStyle = {
  marginTop: "5px",
  fontSize: "14px",
};
const containerStyle = {
  margin: "20px",
  width: "100%",
  height: "100%",
};

const cardContainerStyle = {
  overflowY: "auto",
  maxHeight: "100%",
  maxWidth: "100%",
};

const exploreText = {
  textAlign: "center",
  margin: "20px 20px 20px 20px",
  marginBottom: "20px",
  fontSize: "30px",
  fontWeight: "bold",
};

const cardWrapperStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "20px",
};

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "5px",
  transition: "transform 0.3s ease-in-out",
};

const btn = {
  backgroundColor: "#007f73",
  color: "white",
  border: "none",
  height: "30px",
  width: "100px",
  borderRadius: "5px",
};

const cardImageStyle = {
  width: "100%",
  height: "150px",
  objectFit: "cover",
  borderTopLeftRadius: "5px",
  borderTopRightRadius: "5px",
};

const cardContentStyle = {
  padding: "10px",
};

const hoverEffect = {
  transform: "scale(1.05)",
};

export default LandingPage;
