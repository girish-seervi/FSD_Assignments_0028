import React from 'react';
import {
  BookOpen,
  Laptop,
  PenTool,
  Trophy,
  FlaskConical,
  Headphones,
  Boxes
} from 'lucide-react';

const CATEGORY_ICONS = {
  'Books & Notes': BookOpen,
  'Electronics': Laptop,
  'Stationery': PenTool,
  'Sports Equipment': Trophy,
  'Lab Equipment': FlaskConical,
  'Accessories': Headphones,
  'Others': Boxes
};

const CategoryCard = ({ category, isSelected = false, onClick }) => {
  const IconComponent = CATEGORY_ICONS[category] || Boxes;

  return (
    <div
      className={`category-card ${isSelected ? 'active' : ''}`}
      onClick={() => onClick && onClick(category)}
      style={isSelected ? { borderColor: 'var(--color-accent)', boxShadow: 'var(--shadow-card)' } : {}}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick && onClick(category);
        }
      }}
    >
      <div
        className="category-icon-box"
        style={isSelected ? { backgroundColor: 'var(--color-accent)', color: '#ffffff' } : {}}
      >
        <IconComponent size={26} />
      </div>
      <h4 className="category-name">{category}</h4>
    </div>
  );
};

export default CategoryCard;
