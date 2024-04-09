import React, { useState } from "react";
import { FaCartPlus, FaSearch } from "react-icons/fa"; // Importing the cart icon and search icon from react-icons library
import category from "../category.png"; // Make sure the path to the category image is correct
import { useNavigate, Link } from "react-router-dom";
import logo from "../../src/store_logo.png";

const Header = ({ cartItems }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate(); // Add this line

  const logout = async () => {
    try {
      const res = await fetch("/logout", {
        method: "GET",
        credentials: "include", // Needed to include the cookie in the request
      });

      if (res.status === 200) {
        console.log("Logged out successfully");
        navigate("/signin"); // Navigate to the sign-in route after logging out
      } else {
        throw new Error("Failed to log out");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div style={styles.header}>
      <div
        style={styles.categoryContainer}
        onClick={() => navigate("/landingPage")}
      >
        <img src={logo} alt="logo" style={styles.categoryImage} />
      </div>
      <div style={styles.websiteName}>SunRise &nbsp; </div>
      <div style={styles.websiteName1}>Mart</div>

      <div style={styles.searchBar}>
        <div style={styles.searchContainer}>
          <FaSearch style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search Essentials, Groceries and More"
            style={styles.searchInput}
          />
        </div>
      </div>
      <div style={styles.userActions}>
        <button style={styles.button} onClick={logout} className="sign-up">
          Log Out
        </button>

        <Link to={{ pathname: "/cart", state: { cartItems } }}>
          <FaCartPlus style={styles.cartIcon} />
        </Link>
      </div>
    </div>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#007f73", // Changed background color to #007f73
    color: "white",
  },
  categoryContainer: {
    position: "relative",
    cursor: "pointer",
  },
  categoryImage: {
    width: 60,
    height: 60,
    objectFit: "cover", // Ensure the image covers the entire container
    marginRight: 10, // Add margin to the right of the image
  },
  dropdownContent: {
    position: "absolute",
    top: "100%",
    left: 0,
    backgroundColor: "#f9f9f9",
    height: "auto",
    width: "250px",
    padding: "10px",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    zIndex: 1,
    borderWidth: "3px",
  },
  dropdownItem: {
    color: "black", // Set text color to black
    fontSize: "16px",
    padding: "10px 0",
    cursor: "pointer",
    borderRadius: "5px",
    margin: "5px 0",
  },
  separator: {
    width: "100%",
    height: "1px",
    backgroundColor: "#ddd",
    margin: "5px 0",
  },
  websiteName: {
    fontSize: "30px",
    fontWeight: "bold",
    color: "#fbc02d",
    fontBorder: "30px",
  },
  websiteName1: {
    fontSize: "30px",
    fontWeight: "bold",
    color: "#fbc02d",
    fontBorder: "30px",
  },
  searchBar: {
    flex: 1, // Take up remaining space
    display: "flex",
    justifyContent: "center", // Center the search bar horizontally
    alignItems: "center",
    width: "100%", // Adjust the width as needed
  },
  searchContainer: {
    position: "relative",
    width: "50%", // Adjust the width as needed
  },
  searchIcon: {
    position: "absolute",
    left: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#888",
  },
  searchInput: {
    width: "100%",
    padding: "8px 30px", // Adjust padding to accommodate the icon
    borderRadius: "5px",
    border: "1px solid #ddd",
    fontSize: "16px",
  },
  userActions: {
    display: "flex",
    alignItems: "center",
  },
  button: {
    marginLeft: "10px",
    padding: "8px 16px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "white",
    color: "black",
    cursor: "pointer",
  },
  cartIcon: {
    fontSize: "35px",
    marginLeft: "10px", // Adjusting margin for the cart icon
    color: "#fbc02d",
  },
};

export default Header;
