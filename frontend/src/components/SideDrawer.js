import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <aside>
      <nav>
        <ul>
          <li><Link to="/">Inventory</Link></li>
          <li><Link to="/product-management">Product Management</Link></li>
          <li><Link to="/sales-management">Sales Management</Link></li>
          <li><Link to="/billing">Billing</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    </aside>
  );
}

export default Navbar;
