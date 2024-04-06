import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../store_logo.png'; // Make sure the path to the logo is correct

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Add this line


  const Login = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, password
      })
    });

    const data = await res.json();

    if (res.status === 400 || !data) {
      window.alert("Invalid Credentials");
      console.log("Invalid Credentials");
    } else {
      window.alert("Login Successful");
      console.log("Login Successful");
      navigate('/landingPage'); // Add this line to navigate to LandingPage
    }
  };


  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '350px',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Drop shadow
    backgroundColor: '#007F73', // Card background color
    color: 'white', // Text color
  };

  const inputStyle = {
    padding: '12px 15px',
    margin: '10px 0',
    borderRadius: '7px',
    border: '1px solid #ced4da',
    fontSize: '16px',
    color: 'black', // Input text color
  };

  const buttonStyle = {
    padding: '12px 15px',
    margin: '20px 0',
    borderRadius: '7px',
    border: 'none',
    backgroundColor: 'white',
    color: 'black',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const linkStyle = {
    color: 'white', // Link color
    textDecoration: 'none',
    fontSize: '14px',
  };

  const logoStyle = {
    height: '80px', // Adjust the logo size as needed
    margin: '0 auto 20px', // Center the logo and add margin below
  };

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={Login}> {/* Attach the Login function to the form's onSubmit event */}
        <img src={logo} alt="Kirana Shop Logo" style={logoStyle} />
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Sign In</h2>
        <label htmlFor="email" style={{ marginBottom: '5px', fontSize: '14px' }}>Email:</label>
        <input type="email" id="email" name="email" style={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password" style={{ marginBottom: '5px', fontSize: '14px' }}>Password:</label>
        <input type="password" id="password" name="password" style={inputStyle} value={password} onChange={(e) => setPassword(e.target.value)} />
        <Link to="/forgot-password" style={{ ...linkStyle, marginBottom: '20px', alignSelf: 'flex-end' }}>Forgot Password?</Link>
        <button type="submit" style={buttonStyle} >Sign In</button> {/* Use a button element for form submission */}
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          Don't have an account? <Link to="/signUp" style={linkStyle}>Create Account</Link>
        </div>
      </form>
    </div>
  );
}

export default SignIn;