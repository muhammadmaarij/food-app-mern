import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../store_logo.png";
import "../styles/signin.css"; // Make sure the path to the CSS file is correct
import { toast, ToastContainer } from "react-toastify";

function SignUp() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const navigate = useNavigate(); // Add this line for navigation

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = user;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        cpassword,
      }),
    });

    const data = await res.json();

    if (data.status === 422 || !data) {
      toast.error(`Signup Failed: ${data.error}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setUser.name("");
      setUser.email("");
      setUser.password("");
      setUser.cpassword("");
      console.log("Signup failed:", data);
    } else {
      toast.success("Registration Successful", {
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
      console.log("Registration Successful");
    }
  };

  return (
    <div className="container">
      <ToastContainer position="top-center" autoClose={5000} />
      <div className="form-container">
        <form onSubmit={PostData} className="form-container login-card">
          <p className="image-text">Join Sunrise Mart</p>
          <div className="center-image">
            <img src={logo} alt="Kirana Shop Logo" className="logo-image" />
          </div>
          <h2 className="login-header">Sign Up</h2>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            className="input-field"
            value={user.name}
            onChange={handleInputs}
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className="input-field"
            value={user.email}
            onChange={handleInputs}
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="input-field"
            value={user.password}
            onChange={handleInputs}
          />
          <input
            type="password"
            id="cpassword"
            name="cpassword"
            placeholder="Confirm Password"
            className="input-field"
            value={user.cpassword}
            onChange={handleInputs}
          />
          <button type="submit" className="btn-primary">
            Sign Up
          </button>
          <div className="last-div">
            Already have an account?{" "}
            <Link to="/signin" className="text-2">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
