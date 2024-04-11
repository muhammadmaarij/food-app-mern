// import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import Inventory from "./components/Inventory";
// import ProductManagement from "./components/ProductManagement";
// import SalesManagement from "./components/SalesManagement";
// import SignIn from "./components/SignIn";
// import SignUp from "./components/SignUp";
// import Billing from "./components/Billing";
// import NotFound from "./components/NotFound";
// import HomeScreen from "./components/HomeScreen";
// import LandingPage from "./Screens/LandingPage";
// import CardScreen from "./Screens/CardScreen";
// import CartPage from "./Screens/CartPage";
// import PaymentSuccess from "./Screens/PaymentSuccess";

// function App() {
//   const [cartItems, setCartItems] = useState([]);
//   const mainContentStyle = {
//     paddingBottom: "80px", // Adjust this value based on the height of your footer
//   };

//   return (
//     <Router>
//       <div style={mainContentStyle}>
//         <Routes>
//           <Route path="/" element={<SignIn />} />{" "}
//           {/* Initial screen set as SignIn */}
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/signin" element={<SignIn />} />
//           {/* <Route path="/landingPage" element={<LandingPage />} /> */}
//           <Route path="/cardScreen/:productId" element={<CardScreen />} />
//           {/* <Route path="/cart" element={<CartPage />} /> */}
//           {/* <Header cartItems={cartItems} /> */}
//           <Route
//             path="/landingPage"
//             element={<LandingPage setCartItems={setCartItems} />}
//           />
//           <Route path="/cart" element={<CartPage />} />
//           <Route path="/paymentsuccess" element={<PaymentSuccess />} />
//           {/* <Route path="/product-management" element={<ProductManagement />} />
//           <Route path="/homescreen" element={<HomeScreen />} />
//           <Route path="/sales-management" element={<SalesManagement />} />
//           <Route path="/billing" element={<Billing />} />
//           <Route path="*" element={<NotFound />} /> */}
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
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
import PaymentSuccess from "./Screens/PaymentSuccess";
import AddProductPage from "./Screens/AddProductPage";
import EditProductPage from "./Screens/EditProductPage";
import ProductListPage from "./Screens/ProductListPage";
import OrderSuccessPage from "./Screens/OrderSuccessPage";

function App() {
  const [userRole, setUserRole] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const mainContentStyle = {
    paddingBottom: "80px", // Adjust this value based on the height of your footer
  };

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const { role } = JSON.parse(userInfo);
      setUserRole(role);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Common routes */}
        <Route path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        <Route path="/orderSuccess" element={<OrderSuccessPage />} />

        {/* Conditional routes based on user role */}
        {userRole === "admin" ? (
          <>
            {/* Admin routes */}
            <Route path="/admin/product-list" element={<ProductListPage />} />
            <Route path="/admin/add-product" element={<AddProductPage />} />
            <Route
              path="/admin/edit-product/:productId"
              element={<EditProductPage />}
            />
            {/* Redirect from root to admin product list */}
            <Route
              path="/"
              element={<Navigate replace to="/admin/product-list" />}
            />
          </>
        ) : (
          <>
            {/* Customer routes */}
            <Route
              path="/landingPage"
              element={<LandingPage setCartItems={setCartItems} />}
            />
            <Route path="/cardScreen/:productId" element={<CardScreen />} />
            {/* Redirect from admin routes to customer landing page */}
            <Route path="/admin/*" element={<Navigate replace to="/" />} />
          </>
        )}

        {/* Fallback route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
