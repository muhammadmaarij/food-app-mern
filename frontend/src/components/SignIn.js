import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../store_logo.png"; // Make sure the path to the logo is correct
import "../styles/signin.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Add this line

  const Login = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (res.status === 400 || !data) {
      toast.error("Invalid Credentials");
      console.log("Invalid Credentials");
    } else {
      toast.success("Login Successful", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        navigate("/landingPage");
      }, 1000);
      console.log("Login Successful");
      // navigate("/landingPage"); // Add this line to navigate to LandingPage
    }
  };

  return (
    <div className="container">
      <ToastContainer position="top-center" autoClose={5000} />
      <div className="form-container">
        <form onSubmit={Login} className="form-container login-card">
          <p className="image-text">Welcome to Sunrise Mart</p>
          <div className="center-image">
            <img src={logo} alt="Kirana Shop Logo" className="logo-image" />
          </div>
          <h2 className="login-header">Sign In</h2>
          <label htmlFor="email" className="input-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password" className="input-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to="/forgot-password" className="text-2">
            Forgot Password?
          </Link>
          <button type="submit" className="btn-primary">
            Sign In
          </button>
          <div className="last-div">
            Don't have an account?{" "}
            <Link to="/signUp" className="text-2">
              Create Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
