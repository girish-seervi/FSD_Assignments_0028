import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
        setError(null);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError('Product does not exist.');
        } else {
          setError('Failed to fetch product details.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleQuantityChange = (e) => {
    const val = parseInt(e.target.value);
    if (val >= 1 && val <= product.stock) {
      setQuantity(val);
    }
  };

  const handleAddToCart = () => {
    if (quantity > 0 && quantity <= product.stock) {
      addToCart(product, quantity);
    }
  };

  if (loading) return <div className="page-container" style={{textAlign: 'center', marginTop: '3rem'}}>Loading product details...</div>;
  if (error) return (
    <div className="page-container" style={{textAlign: 'center', marginTop: '3rem'}}>
      <div className="error-msg">{error}</div>
      <br />
      <Link to="/products" className="btn-primary" style={{padding: '0.75rem 1.5rem', textDecoration: 'none', borderRadius: '8px'}}>Back to Products</Link>
    </div>
  );

  return (
    <div className="page-container">
      <div className="product-details">
        <div className="product-image-large">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info-panel">
          <div className="details-header">
            <span className="badge">{product.category}</span>
            <h2>{product.name}</h2>
          </div>
          <p className="price-large">₹{product.price}</p>
          <p className="description">{product.description}</p>
          <p className="stock">
            {product.stock > 0 ? (
              <span className="in-stock">● In Stock ({product.stock})</span>
            ) : (
              <span className="out-of-stock">● Out of Stock</span>
            )}
          </p>
          
          {product.stock > 0 && (
            <div style={{marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <label htmlFor="qty" style={{fontWeight: 'bold'}}>Quantity:</label>
              <input 
                id="qty"
                type="number" 
                min="1" 
                max={product.stock} 
                value={quantity} 
                onChange={handleQuantityChange}
                style={{padding: '0.5rem', width: '80px', borderRadius: '6px', border: '1px solid #cbd5e1'}}
              />
            </div>
          )}
          
          <button 
            onClick={handleAddToCart} 
            className="add-btn btn-primary"
            disabled={product.stock === 0}
          >
            {product.stock > 0 ? 'Add to Cart' : 'Sold Out'}
          </button>
          
          <div className="back-link">
            <Link to="/products">← Back to Products</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
