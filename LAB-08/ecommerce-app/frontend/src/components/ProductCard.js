import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="category">{product.category}</p>
        <p className="price">₹{product.price}</p>
        <p className="stock-status" style={{color: product.stock > 0 ? '#059669' : '#dc2626', marginBottom: '1rem', fontSize: '0.85rem', fontWeight: 'bold'}}>
          {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
        </p>
        <div className="card-actions">
          <Link to={`/products/${product.id}`} className="btn btn-secondary">View Details</Link>
          <button 
            onClick={() => addToCart(product)} 
            className="btn btn-primary"
            disabled={product.stock === 0}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
