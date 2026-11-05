import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  PlusCircle,
  Image as ImageIcon,
  DollarSign,
  MapPin,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';
import { itemApi } from '../services/api';

const CATEGORIES = [
  'Books & Notes',
  'Electronics',
  'Stationery',
  'Sports Equipment',
  'Lab Equipment',
  'Accessories',
  'Others'
];

const CONDITIONS = ['New', 'Like New', 'Good', 'Fair'];

const CATEGORY_DEFAULT_IMAGES = {
  'Books & Notes': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
  'Electronics': 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=800&q=80',
  'Stationery': 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&w=800&q=80',
  'Sports Equipment': 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=800&q=80',
  'Lab Equipment': 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
  'Accessories': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
  'Others': 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80'
};

const AddItem = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Books & Notes',
    condition: 'Good',
    imageUrl: '',
    location: '',
    costType: 'Free',
    price: 0
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const previewImage = formData.imageUrl || CATEGORY_DEFAULT_IMAGES[formData.category];

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Item name is required.';
    if (!formData.description.trim()) errs.description = 'Item description is required.';
    if (!formData.location.trim()) errs.location = 'Campus pickup location is required.';

    if (formData.costType === 'Paid' && (!formData.price || Number(formData.price) <= 0)) {
      errs.price = 'Please specify a cost greater than $0 for paid items.';
    }

    if (formData.imageUrl && formData.imageUrl.trim()) {
      try {
        new URL(formData.imageUrl.trim());
      } catch (_) {
        errs.imageUrl = 'Please provide a valid image URL (http/https).';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setServerError('');

    try {
      const payload = {
        ...formData,
        imageUrl: formData.imageUrl.trim() || CATEGORY_DEFAULT_IMAGES[formData.category],
        price: formData.costType === 'Paid' ? Number(formData.price) : 0
      };

      const res = await itemApi.create(payload);
      if (res.success) {
        navigate('/my-listings', {
          state: { message: `"${payload.name}" has been successfully listed!` }
        });
      }
    } catch (err) {
      setServerError(err.message || 'Failed to list item. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ padding: '36px 0 60px' }}>
      <div className="container">
        <div style={{ marginBottom: 20, maxWidth: 760, margin: '0 auto 20px' }}>
          <Link
            to="/my-listings"
            className="btn-ghost"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.875rem' }}
          >
            <ArrowLeft size={16} /> Back to My Listings
          </Link>
        </div>

        <div className="add-item-card">
          <div className="auth-header" style={{ textAlign: 'left', marginBottom: 24 }}>
            <div className="auth-logo-badge">
              <PlusCircle size={26} />
            </div>
            <h1 className="auth-title">List an Item for Sharing</h1>
            <p className="auth-subtitle">
              Help fellow students save money by lending your unused academic supplies and gear
            </p>
          </div>

          {serverError && (
            <div className="alert alert-error">
              <AlertCircle size={18} />
              <span>{serverError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            {/* Item Name */}
            <div className="form-group">
              <label className="form-label" htmlFor="name">
                Item Title *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className={`form-input ${errors.name ? 'error' : ''}`}
                placeholder="e.g. Texas Instruments TI-84 Plus CE Graphing Calculator"
                value={formData.name}
                onChange={handleChange}
                style={{ paddingLeft: 14 }}
              />
              {errors.name && <div className="form-error-msg">{errors.name}</div>}
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label" htmlFor="description">
                Description & Inclusions *
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                className={`form-input ${errors.description ? 'error' : ''}`}
                placeholder="Describe condition, model details, included cables/accessories, or recommended courses..."
                value={formData.description}
                onChange={handleChange}
                style={{ paddingLeft: 14, resize: 'vertical' }}
              />
              {errors.description && <div className="form-error-msg">{errors.description}</div>}
            </div>

            {/* Category and Condition */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="form-group">
                <label className="form-label" htmlFor="category">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  className="filter-select"
                  value={formData.category}
                  onChange={handleChange}
                  style={{ width: '100%', height: 46 }}
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="condition">
                  Condition *
                </label>
                <select
                  id="condition"
                  name="condition"
                  className="filter-select"
                  value={formData.condition}
                  onChange={handleChange}
                  style={{ width: '100%', height: 46 }}
                >
                  {CONDITIONS.map((cond) => (
                    <option key={cond} value={cond}>
                      {cond}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Campus Location */}
            <div className="form-group">
              <label className="form-label" htmlFor="location">
                Campus Pickup Location *
              </label>
              <div className="form-input-wrapper">
                <MapPin size={18} className="form-input-icon" />
                <input
                  id="location"
                  name="location"
                  type="text"
                  className={`form-input ${errors.location ? 'error' : ''}`}
                  placeholder="e.g. Science Library Pods, Engineering Hall Room 204"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
              {errors.location && <div className="form-error-msg">{errors.location}</div>}
            </div>

            {/* Borrowing Cost Type & Amount */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="form-group">
                <label className="form-label">Borrowing Cost *</label>
                <div style={{ display: 'flex', gap: 12, height: 46 }}>
                  <button
                    type="button"
                    className={`btn ${formData.costType === 'Free' ? 'btn-success' : 'btn-secondary'}`}
                    style={{ flex: 1 }}
                    onClick={() => setFormData((p) => ({ ...p, costType: 'Free', price: 0 }))}
                  >
                    Free to Borrow
                  </button>
                  <button
                    type="button"
                    className={`btn ${formData.costType === 'Paid' ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ flex: 1 }}
                    onClick={() => setFormData((p) => ({ ...p, costType: 'Paid' }))}
                  >
                    Set Price
                  </button>
                </div>
              </div>

              {formData.costType === 'Paid' && (
                <div className="form-group">
                  <label className="form-label" htmlFor="price">
                    Cost Amount ($ USD) *
                  </label>
                  <div className="form-input-wrapper">
                    <DollarSign size={18} className="form-input-icon" />
                    <input
                      id="price"
                      name="price"
                      type="number"
                      step="0.5"
                      min="0.5"
                      className={`form-input ${errors.price ? 'error' : ''}`}
                      placeholder="e.g. 5.00"
                      value={formData.price}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.price && <div className="form-error-msg">{errors.price}</div>}
                </div>
              )}
            </div>

            {/* Image URL & Live Preview */}
            <div className="form-group">
              <label className="form-label" htmlFor="imageUrl">
                Photo URL (Optional – Leave empty for verified category stock photo)
              </label>
              <div className="form-input-wrapper">
                <ImageIcon size={18} className="form-input-icon" />
                <input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  className={`form-input ${errors.imageUrl ? 'error' : ''}`}
                  placeholder="https://images.unsplash.com/..."
                  value={formData.imageUrl}
                  onChange={handleChange}
                />
              </div>
              {errors.imageUrl && <div className="form-error-msg">{errors.imageUrl}</div>}

              {/* Live Preview Box */}
              <div className="image-preview-box">
                <img
                  src={previewImage}
                  alt="Listing preview"
                  className="preview-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = CATEGORY_DEFAULT_IMAGES['Others'];
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={submitting}
              style={{ width: '100%', marginTop: 12 }}
            >
              {submitting ? 'Publishing Listing...' : 'Publish Campus Listing'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
