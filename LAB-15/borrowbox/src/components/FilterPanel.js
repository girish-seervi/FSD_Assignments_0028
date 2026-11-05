import React from 'react';
import { RotateCcw } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Books & Notes',
  'Electronics',
  'Stationery',
  'Sports Equipment',
  'Lab Equipment',
  'Accessories',
  'Others'
];

const CONDITIONS = ['All', 'New', 'Like New', 'Good', 'Fair'];
const AVAILABILITY_OPTIONS = ['All', 'Available', 'Unavailable'];
const COST_OPTIONS = ['All', 'Free', 'Paid'];
const SORT_OPTIONS = [
  { value: 'recently-added', label: 'Recently Added' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'price-asc', label: 'Lowest Price' },
  { value: 'price-desc', label: 'Highest Price' }
];

const FilterPanel = ({ filters, onChange, onReset }) => {
  const handleChange = (key, val) => {
    onChange({ ...filters, [key]: val });
  };

  const hasActiveFilters =
    (filters.category && filters.category !== 'All') ||
    (filters.condition && filters.condition !== 'All') ||
    (filters.availability && filters.availability !== 'All') ||
    (filters.costType && filters.costType !== 'All') ||
    (filters.sort && filters.sort !== 'recently-added') ||
    (filters.search && filters.search !== '');

  return (
    <div className="filter-panel">
      {/* Category */}
      <div className="filter-group">
        <label className="filter-label">Category</label>
        <select
          className="filter-select"
          value={filters.category || 'All'}
          onChange={(e) => handleChange('category', e.target.value)}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Condition */}
      <div className="filter-group">
        <label className="filter-label">Condition</label>
        <select
          className="filter-select"
          value={filters.condition || 'All'}
          onChange={(e) => handleChange('condition', e.target.value)}
        >
          {CONDITIONS.map((cond) => (
            <option key={cond} value={cond}>
              {cond}
            </option>
          ))}
        </select>
      </div>

      {/* Availability */}
      <div className="filter-group">
        <label className="filter-label">Availability</label>
        <select
          className="filter-select"
          value={filters.availability || 'All'}
          onChange={(e) => handleChange('availability', e.target.value)}
        >
          {AVAILABILITY_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Cost Type */}
      <div className="filter-group">
        <label className="filter-label">Borrowing Cost</label>
        <select
          className="filter-select"
          value={filters.costType || 'All'}
          onChange={(e) => handleChange('costType', e.target.value)}
        >
          {COST_OPTIONS.map((cost) => (
            <option key={cost} value={cost}>
              {cost}
            </option>
          ))}
        </select>
      </div>

      {/* Sort By */}
      <div className="filter-group">
        <label className="filter-label">Sort Order</label>
        <select
          className="filter-select"
          value={filters.sort || 'recently-added'}
          onChange={(e) => handleChange('sort', e.target.value)}
        >
          {SORT_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* Reset Button */}
      {hasActiveFilters && (
        <div style={{ alignSelf: 'flex-end', paddingBottom: 2 }}>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={onReset}
            title="Reset filters to default"
          >
            <RotateCcw size={14} /> Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
