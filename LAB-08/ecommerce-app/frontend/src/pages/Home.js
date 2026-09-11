import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const categories = ['Ceiling Fans', 'Switches', 'Electrical Wires', 'LED Lights', 'Extension Boards', 'Circuit Breakers'];

const Home = () => {
  return (
    <div className="home-container">
      <div className="store-banner">
        <h1>Welcome to ElectroMart</h1>
        <h2>Electrical & Lighting Solutions</h2>
        <Link to="/products" className="btn-primary">Shop Now</Link>
      </div>
      
      <div className="welcome-section">
        <h3>Why Choose Us?</h3>
        <p>ElectroMart provides premium electrical supplies for your home and industrial needs. Experience quality and reliability.</p>
      </div>

      <div className="categories-section">
        <h3>Shop by Category</h3>
        <div className="categories-grid">
          {categories.map((cat, idx) => (
            <div key={idx} className="category-card">
              <h4>{cat}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
