import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">ElectroMart</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li>
          <Link to="/cart" className="cart-link">
            Cart {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </li>
        {user ? (
          <>
            <li><Link to="/orders">Orders</Link></li>
            <li className="welcome-text">Welcome, User</li>
            <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
          </>
        ) : (
          <li><Link to="/login" className="login-link">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
