import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Inventory from "./components/Inventory";
import ProductManagement from "./components/ProductManagement";
import SalesManagement from "./components/SalesManagement";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Billing from "./components/Billing";
import NotFound from "./components/NotFound";
import HomeScreen from "./components/HomeScreen";
import LandingPage from "./Screens/LandingPage";
import CardScreen from "./Screens/CardScreen";
import CartPage from "./Screens/CartPage";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const mainContentStyle = {
    paddingBottom: "80px", // Adjust this value based on the height of your footer
  };

  return (
    <Router>
      <div style={mainContentStyle}>
        <Routes>
          <Route path="/" element={<SignIn />} />{" "}
          {/* Initial screen set as SignIn */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          {/* <Route path="/landingPage" element={<LandingPage />} /> */}
          <Route path="/cardScreen/:productId" element={<CardScreen />} />
          {/* <Route path="/cart" element={<CartPage />} /> */}
          {/* <Header cartItems={cartItems} /> */}
          <Route
            path="/landingPage"
            element={<LandingPage setCartItems={setCartItems} />}
          />
          <Route path="/cart" element={<CartPage />} />
          {/* <Route path="/product-management" element={<ProductManagement />} />
          <Route path="/homescreen" element={<HomeScreen />} />
          <Route path="/sales-management" element={<SalesManagement />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
