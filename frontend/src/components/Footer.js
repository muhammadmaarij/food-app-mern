import React from 'react';

function Footer() {
  const footerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007F73',
    color: 'white',
    textAlign: 'center',
    padding: '20px',
    width: '100%',
  };

  const socialLinksStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '15px',
  };

  return (
    <footer style={footerStyle}>
      <div>
        <p>Email: info@kiranashop.com | Phone: +123 456 7890</p>
        <p>Address: 123 Kirana Street, City, Country</p>
      </div>
      <div style={socialLinksStyle}>
        <a href="https://facebook.com" style={{ color: 'white' }}><i className="fab fa-facebook-f"></i></a>
        <a href="https://twitter.com" style={{ color: 'white' }}><i className="fab fa-twitter"></i></a>
        <a href="https://instagram.com" style={{ color: 'white' }}><i className="fab fa-instagram"></i></a>
      </div>
      <div>
        <p>&copy; {new Date().getFullYear()} Kirana Shop. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
