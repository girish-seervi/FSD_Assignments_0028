import React from 'react';
import './CategoryFilter.css';

const categories = ['All', 'Ceiling Fans', 'Switches', 'Electrical Wires', 'LED Lights', 'Extension Boards', 'Circuit Breakers'];

const CategoryFilter = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="category-filter">
      {categories.map(cat => (
        <button 
          key={cat} 
          className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
          onClick={() => setSelectedCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
