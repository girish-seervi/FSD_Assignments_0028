import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, User, Heart, ArrowRight } from 'lucide-react';

const ItemCard = ({ item, isFavorited = false, onToggleFavorite }) => {
  const isAvailable = item.availability === 'Available';
  const isFree = item.costType === 'Free' || Number(item.price) === 0;

  return (
    <div className="item-card">
      <div className="item-card-image-wrap">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="item-card-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80';
          }}
        />

        {/* Category Pill */}
        <span className="item-card-category-badge">{item.category}</span>

        {/* Favorite Heart Button */}
        {onToggleFavorite && (
          <button
            type="button"
            className={`item-favorite-btn ${isFavorited ? 'favorited' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleFavorite(item.id);
            }}
            title={isFavorited ? 'Remove from favorites' : 'Save to favorites'}
            aria-label="Favorite item"
          >
            <Heart size={16} fill={isFavorited ? 'currentColor' : 'none'} />
          </button>
        )}
      </div>

      <div className="item-card-body">
        <div className="item-card-header">
          <span
            className={`badge ${isAvailable ? 'badge-available' : 'badge-unavailable'}`}
          >
            {item.availability}
          </span>
          <span className="badge badge-cost" style={{ fontSize: '0.75rem' }}>
            {item.condition}
          </span>
        </div>

        <h3 className="item-card-title" title={item.name}>
          {item.name}
        </h3>

        <p className="item-card-desc">{item.description}</p>

        <div className="item-card-meta">
          <div className="item-card-meta-row">
            <User size={13} color="#64748b" />
            <span style={{ fontWeight: 600 }}>{item.ownerName}</span>
            {item.ownerCollege && (
              <span
                style={{
                  fontSize: '0.75rem',
                  color: '#94a3b8',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: 140
                }}
              >
                • {item.ownerCollege}
              </span>
            )}
          </div>
          <div className="item-card-meta-row">
            <MapPin size={13} color="#64748b" />
            <span
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {item.location}
            </span>
          </div>
        </div>

        <div className="item-card-footer">
          <div>
            <div style={{ fontSize: '0.6875rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
              Borrowing Cost
            </div>
            <div className={`item-price-tag ${isFree ? 'free' : ''}`}>
              {isFree ? 'Free' : `$${Number(item.price).toFixed(2)}`}
            </div>
          </div>

          <Link to={`/items/${item.id}`} className="btn btn-secondary btn-sm">
            View Details <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
