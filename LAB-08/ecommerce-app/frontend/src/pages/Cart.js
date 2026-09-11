import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CartItem from '../components/CartItem';
import api from '../services/api';
import './Cart.css';

const Cart = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login', { state: { from: '/cart', message: 'Please log in to checkout.' } });
      return;
    }

    if (cart.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await api.post('/orders', { items: cart, token: user.token });
      clearCart();
      navigate('/orders', { state: { message: 'Order placed successfully!' } });
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Failed to place order. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container cart-page">
      <div className="cart-header">
        <h2>Shopping Cart</h2>
      </div>
      
      {error && <div className="error-msg alert">{error}</div>}
      
      {cart.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <p>Your cart is currently empty.</p>
          <Link to="/products" className="btn-primary" style={{display: 'inline-block', textDecoration: 'none', padding: '0.75rem 1.5rem', borderRadius: '6px', marginTop: '1rem'}}>Continue Shopping</Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cart.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{cartTotal}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total">
              <span>Total Price</span>
              <span>₹{cartTotal}</span>
            </div>
            <button 
              className="checkout-btn btn-primary"
              onClick={handleCheckout}
              disabled={loading}
              style={{width: '100%', marginTop: '1.5rem', padding: '1rem', border: 'none', borderRadius: '8px', fontSize: '1.1rem'}}
            >
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
