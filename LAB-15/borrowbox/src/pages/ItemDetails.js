import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  MapPin,
  Calendar,
  Send,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  Building
} from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import { itemApi, requestApi } from '../services/api';
import useAuth from '../hooks/useAuth';

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Request form state
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  // Tomorrow's date string YYYY-MM-DD for min date
  const todayStr = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await itemApi.getById(id);
        if (res.success) {
          setItem(res.data);
        }
      } catch (err) {
        setError(err.message || 'Item could not be found.');
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [id]);

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: `/items/${id}` } } });
      return;
    }

    if (!startDate || !endDate) {
      setFormError('Please select both start and expected return dates.');
      return;
    }

    if (new Date(endDate) <= new Date(startDate)) {
      setFormError('Return date must be strictly after the start date.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await requestApi.create({
        itemId: item.id,
        startDate,
        endDate,
        message
      });

      if (res.success) {
        setRequestSuccess(true);
      }
    } catch (err) {
      setFormError(err.message || 'Failed to submit borrowing request.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner label="Loading item specifications..." />;
  }

  if (error || !item) {
    return (
      <div className="container" style={{ padding: '60px 24px', textAlign: 'center' }}>
        <div className="alert alert-error" style={{ maxWidth: 500, margin: '0 auto 20px' }}>
          <AlertCircle size={20} />
          <span>{error || 'Item not found.'}</span>
        </div>
        <Link to="/marketplace" className="btn btn-secondary">
          <ArrowLeft size={16} /> Back to Marketplace
        </Link>
      </div>
    );
  }

  const isOwner = user && user.id === item.ownerId;
  const isAvailable = item.availability === 'Available';
  const isFree = item.costType === 'Free' || Number(item.price) === 0;

  return (
    <div style={{ padding: '36px 0 60px' }}>
      <div className="container">
        {/* Breadcrumb / Back button */}
        <div style={{ marginBottom: 20 }}>
          <Link
            to="/marketplace"
            className="btn-ghost"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.875rem' }}
          >
            <ArrowLeft size={16} /> Back to Marketplace
          </Link>
        </div>

        <div className="item-details-grid">
          {/* Left Column: Image and Active Schedules (Bonus B) */}
          <div>
            <div className="item-details-gallery">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="item-details-main-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80';
                }}
              />
            </div>

            {/* Bonus Feature B: Availability Schedule / Loan Calendar */}
            {item.activeSchedules && item.activeSchedules.length > 0 && (
              <div
                style={{
                  marginTop: 20,
                  padding: 16,
                  backgroundColor: '#f8fafc',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)'
                }}
              >
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                  <Calendar size={14} color="#6366f1" /> Reserved Borrowing Period
                </div>
                {item.activeSchedules.map((sch, i) => (
                  <div key={i} style={{ fontSize: '0.8125rem', color: '#64748b' }}>
                    Currently on loan: <strong>{sch.startDate}</strong> to <strong>{sch.endDate}</strong> ({sch.status})
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Information & Borrow Request Box */}
          <div className="item-details-info">
            <div className="item-details-badges">
              <span className={`badge ${isAvailable ? 'badge-available' : 'badge-unavailable'}`}>
                {item.availability}
              </span>
              <span className="badge badge-cost">{item.category}</span>
              <span className="badge badge-accepted">Condition: {item.condition}</span>
            </div>

            <h1 className="item-details-title">{item.name}</h1>

            <div className="item-details-cost">
              {isFree ? 'Free to Borrow' : `$${Number(item.price).toFixed(2)}`}
              <span className="item-details-cost-sub">
                {isFree ? '• No rental fee' : '• Total loan duration'}
              </span>
            </div>

            {/* Description */}
            <div className="item-details-desc-box">
              <div className="item-details-desc-title">Item Description</div>
              <p className="item-details-desc">{item.description}</p>
            </div>

            {/* Owner & Location Details */}
            <div className="item-owner-card">
              <div className="owner-avatar">
                {item.ownerName ? item.ownerName[0] : 'U'}
              </div>
              <div style={{ flex: 1 }}>
                <div className="owner-meta-name">{item.ownerName}</div>
                <div className="owner-meta-college">
                  <Building size={12} style={{ display: 'inline', marginRight: 4 }} />
                  {item.ownerCollege || 'University Department'}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 2 }}>
                  <MapPin size={12} style={{ display: 'inline', marginRight: 4 }} />
                  Pickup: {item.location}
                </div>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', textAlign: 'right' }}>
                Listed on<br />
                {new Date(item.createdAt).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
            </div>

            {/* Borrowing Request Section */}
            <div className="borrow-request-box">
              <h3 className="borrow-box-title">
                <Send size={18} color="var(--color-accent)" />
                Request to Borrow
              </h3>

              {isOwner ? (
                <div className="alert alert-info" style={{ marginBottom: 0 }}>
                  <CheckCircle2 size={18} />
                  <span>You listed this item. You can manage it in <strong>My Listings</strong>.</span>
                </div>
              ) : !isAvailable ? (
                <div className="alert alert-error" style={{ marginBottom: 0 }}>
                  <AlertCircle size={18} />
                  <span>This item is currently unavailable or actively borrowed by another student.</span>
                </div>
              ) : requestSuccess ? (
                <div className="alert alert-success" style={{ marginBottom: 0, flexDirection: 'column', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700 }}>
                    <CheckCircle2 size={20} />
                    Borrowing request submitted successfully!
                  </div>
                  <p style={{ fontSize: '0.85rem' }}>
                    The owner has been notified. You can track this under <strong>Requests Sent</strong> in your dashboard.
                  </p>
                  <Link to="/requests" className="btn btn-navy btn-sm" style={{ marginTop: 4 }}>
                    View My Sent Requests
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleRequestSubmit}>
                  {formError && (
                    <div className="alert alert-error">
                      <AlertCircle size={16} />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div className="date-inputs-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="startDate">
                        Borrow Start Date
                      </label>
                      <input
                        id="startDate"
                        type="date"
                        className="form-input"
                        min={todayStr}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                        style={{ paddingLeft: 14 }}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="endDate">
                        Expected Return Date
                      </label>
                      <input
                        id="endDate"
                        type="date"
                        className="form-input"
                        min={startDate || todayStr}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                        style={{ paddingLeft: 14 }}
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: 16 }}>
                    <label className="form-label" htmlFor="message">
                      Optional Message to Owner
                    </label>
                    <textarea
                      id="message"
                      rows={2}
                      className="form-input"
                      placeholder="e.g. Need this for midterms review, can meet in Science Library pod 3."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      style={{ paddingLeft: 14, resize: 'vertical' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={submitting}
                    style={{ width: '100%' }}
                  >
                    {submitting ? 'Submitting Request...' : 'Submit Borrowing Request'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
