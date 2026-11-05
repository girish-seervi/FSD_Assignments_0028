import React from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ value, onChange, onClear, placeholder = 'Search by item name, description, or category...' }) => {
  return (
    <div className="search-container">
      <Search size={18} color="#94a3b8" />
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          type="button"
          onClick={onClear}
          className="btn-ghost"
          style={{ padding: '4px', borderRadius: '50%' }}
          title="Clear search"
          aria-label="Clear search"
        >
          <X size={16} color="#94a3b8" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
