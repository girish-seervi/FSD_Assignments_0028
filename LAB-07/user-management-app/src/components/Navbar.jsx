import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css'; // We will add styling here later

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>User App</h2>
      </div>
      <ul className="navbar-links">
        {/* Link component from react-router-dom prevents full page reloads */}
        <li><Link to="/">Home</Link></li>
        <li><Link to="/users">All Users</Link></li>
        <li><Link to="/users/even">Even Users</Link></li>
        <li><Link to="/users/odd">Odd Users</Link></li>
        <li><Link to="/api-users">API Users</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
