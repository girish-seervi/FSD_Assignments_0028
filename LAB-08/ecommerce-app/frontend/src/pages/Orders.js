import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import api from '../services/api';
import './Orders.css';

const Orders = () => {
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await api.get('/orders');
        setOrders(response.data);
      } catch (err) {
        setError('Failed to fetch orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="page-container" style={{textAlign: 'center', marginTop: '3rem'}}>Loading orders...</div>;

  return (
    <div className="page-container">
      <div className="orders-header">
        <h2>Your Orders</h2>
      </div>
      {location.state?.message && <div className="alert-success" style={{color: '#059669', background: '#d1fae5', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem'}}>{location.state.message}</div>}
      {error && <div className="error-msg">{error}</div>}

      {orders.length === 0 ? (
        <div style={{textAlign: 'center', marginTop: '3rem'}}>
          <p style={{fontSize: '1.2rem', color: '#6b7280', marginBottom: '1.5rem'}}>You have no past orders.</p>
          <Link to="/products" className="btn-primary" style={{padding: '0.75rem 1.5rem', textDecoration: 'none', borderRadius: '8px'}}>Start Shopping</Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <h3>Order #{order.id}</h3>
                <span>{new Date(order.date).toLocaleDateString()}</span>
              </div>
              <ul className="order-items">
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    <span className="item-name-qty">{item.quantity}x {item.name}</span>
                    <span className="item-price">₹{item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>
              <div className="order-total">
                <strong>Total Amount: ₹{order.total}</strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
