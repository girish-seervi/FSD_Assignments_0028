import React from 'react';
import { useCart } from '../context/CartContext';
import './CartItem.css';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncrease = () => {
    if (item.quantity < item.stock) {
      updateQuantity(item.id, item.quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  return (
    <div className="cart-item">
      <div className="cart-item-img">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="item-details">
        <h4>{item.name}</h4>
        <p>Unit Price: ₹{item.price}</p>
      </div>
      <div className="item-actions">
        <div className="qty-controls">
          <button onClick={handleDecrease} className="qty-btn">-</button>
          <span className="qty-val">{item.quantity}</span>
          <button onClick={handleIncrease} className="qty-btn" disabled={item.quantity >= item.stock}>+</button>
        </div>
        <button onClick={() => removeFromCart(item.id)} className="btn-remove">Remove Item</button>
      </div>
      <div className="item-total">
        <p>₹{item.price * item.quantity}</p>
      </div>
    </div>
  );
};

export default CartItem;
