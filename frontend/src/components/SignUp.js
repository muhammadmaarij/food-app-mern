import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import logo from '../store_logo.png'; // Make sure the path to the logo is correct

function SignUp() {

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: ""
  });

  let name, value;
  const handleInputs = (e) => { 
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });  
  } 


  const PostData = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = user;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        name, email, password, cpassword
      })
    });

    const data = await res.json();

    if (data.status === 422 || !data) {
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
    } else {
      window.alert("Registration Successful");
      console.log("Registration Successful");



    }
  }


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
    padding: '40px',
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
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
      <form style={formStyle}>
        <img src={logo} alt="Kirana Shop Logo" style={logoStyle} />
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Sign Up</h2>
        <label htmlFor="name" style={{ marginBottom: '5px', fontSize: '14px' }}>Name:</label>
        <input type="text" id="name" name="name" style={inputStyle} value={user.name} onChange={handleInputs} />
        <label htmlFor="email" style={{ marginBottom: '5px', fontSize: '14px' }}>Email:</label>
        <input type="email" id="email" name="email" style={inputStyle} value={user.email} onChange={handleInputs} />
        <label htmlFor="password" style={{ marginBottom: '5px', fontSize: '14px' }}>Password:</label>
        <input type="password" id="password" name="password" style={inputStyle} value={user.password} onChange={handleInputs} />
        <label htmlFor="cpassword" style={{ marginBottom: '5px', fontSize: '14px' }}>Confirm Password:</label>
        <input type="password" id="cpassword" name="cpassword" style={inputStyle} value={user.cpassword} onChange={handleInputs} />
        <button type="submit" style={buttonStyle} onClick={PostData}
          >
              <Link to="/landingpage" >Sign Up</Link>

        </button>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          Already have an account? <Link to="/signin" style={linkStyle}>Sign In</Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
