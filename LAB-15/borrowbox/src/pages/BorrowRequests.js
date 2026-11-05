import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Inbox,
  Send,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  CheckCircle2,
  Mail,
  User,
  X
} from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import ConfirmDialog from '../components/ConfirmDialog';
import { requestApi } from '../services/api';

const BorrowRequests = () => {
  const [activeTab, setActiveTab] = useState('received'); // 'received' or 'sent'
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Cancel dialog state
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [requestToCancel, setRequestToCancel] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchAllRequests = async () => {
    try {
      setLoading(true);
      setError('');
      const [recRes, sentRes] = await Promise.all([
        requestApi.getReceived(),
        requestApi.getSent()
      ]);

      if (recRes.success) setReceivedRequests(recRes.data || []);
      if (sentRes.success) setSentRequests(sentRes.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load borrowing requests.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllRequests();
  }, []);

  // Accept request handler
  const handleAccept = async (id, itemName, borrowerName) => {
    setActionLoading(true);
    setError('');
    try {
      const res = await requestApi.accept(id);
      if (res.success) {
        setReceivedRequests((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status: 'Accepted' } : r))
        );
        setSuccessMsg(`Accepted request from ${borrowerName} for "${itemName}".`);
      }
    } catch (err) {
      setError(err.message || 'Could not accept request.');
    } finally {
      setActionLoading(false);
    }
  };

  // Reject request handler
  const handleReject = async (id, itemName, borrowerName) => {
    setActionLoading(true);
    setError('');
    try {
      const res = await requestApi.reject(id);
      if (res.success) {
        setReceivedRequests((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status: 'Rejected' } : r))
        );
        setSuccessMsg(`Declined request from ${borrowerName}.`);
      }
    } catch (err) {
      setError(err.message || 'Could not reject request.');
    } finally {
      setActionLoading(false);
    }
  };

  // Cancel sent request
  const handleCancelRequest = async () => {
    if (!requestToCancel) return;
    setActionLoading(true);
    try {
      const res = await requestApi.cancel(requestToCancel.id);
      if (res.success) {
        setSentRequests((prev) =>
          prev.map((r) => (r.id === requestToCancel.id ? { ...r, status: 'Cancelled' } : r))
        );
        setSuccessMsg('Your borrowing request has been cancelled.');
        setCancelDialogOpen(false);
        setRequestToCancel(null);
      }
    } catch (err) {
      setError(err.message || 'Failed to cancel request.');
      setCancelDialogOpen(false);
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Accepted':
        return <span className="badge badge-accepted">Accepted</span>;
      case 'Pending':
        return <span className="badge badge-pending">Pending Review</span>;
      case 'Returned':
        return <span className="badge badge-returned">Returned / Completed</span>;
      case 'Return Requested':
        return <span className="badge badge-pending">Return Requested</span>;
      case 'Rejected':
        return <span className="badge badge-rejected">Declined</span>;
      case 'Cancelled':
        return <span className="badge badge-cancelled">Cancelled</span>;
      default:
        return <span className="badge">{status}</span>;
    }
  };

  const pendingReceivedCount = receivedRequests.filter((r) => r.status === 'Pending').length;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Inbox size={26} color="var(--color-accent)" /> Borrowing Requests
        </h1>
        <p className="page-subtitle">
          Review incoming requests for your items and track requests you sent to other students
        </p>
      </div>

      {successMsg && (
        <div className="alert alert-success">
          <CheckCircle2 size={18} />
          <span>{successMsg}</span>
        </div>
      )}

      {error && (
        <div className="alert alert-error">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* Tabs Header */}
      <div className="tabs-header">
        <button
          type="button"
          className={`tab-btn ${activeTab === 'received' ? 'active' : ''}`}
          onClick={() => setActiveTab('received')}
        >
          <Inbox size={18} />
          Requests Received
          <span className="tab-count-badge">{receivedRequests.length}</span>
          {pendingReceivedCount > 0 && (
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#f59e0b',
                display: 'inline-block'
              }}
            />
          )}
        </button>

        <button
          type="button"
          className={`tab-btn ${activeTab === 'sent' ? 'active' : ''}`}
          onClick={() => setActiveTab('sent')}
        >
          <Send size={18} />
          Requests Sent
          <span className="tab-count-badge">{sentRequests.length}</span>
        </button>
      </div>

      {/* Tab Content */}
      {loading ? (
        <LoadingSpinner label="Fetching request records..." />
      ) : activeTab === 'received' ? (
        /* Tab 1: Requests Received */
        receivedRequests.length === 0 ? (
          <EmptyState
            title="No incoming requests"
            description="You haven't received any borrowing requests from other students yet. Make sure your items are listed and marked Available."
            actionText="View My Listings"
            actionLink="/my-listings"
          />
        ) : (
          <div className="requests-grid">
            {receivedRequests.map((req) => (
              <div key={req.id} className="request-card">
                <img
                  src={req.itemImage}
                  alt={req.itemName}
                  className="request-item-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80';
                  }}
                />

                <div className="request-details">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 4 }}>
                    <h3 className="request-item-title">{req.itemName}</h3>
                    {getStatusBadge(req.status)}
                  </div>

                  <div className="request-parties">
                    <User size={13} style={{ display: 'inline', marginRight: 4 }} />
                    Borrower: <strong>{req.borrowerName}</strong> ({req.borrowerCollege || 'Student'}) •{' '}
                    <Mail size={13} style={{ display: 'inline', marginRight: 2 }} />
                    {req.borrowerEmail}
                  </div>

                  <div className="request-dates">
                    <Calendar size={13} color="var(--color-accent)" />
                    Duration: <strong>{req.startDate}</strong> to <strong>{req.endDate}</strong>
                  </div>

                  {req.message && (
                    <div className="request-message">
                      "{req.message}"
                    </div>
                  )}
                </div>

                {/* Accept / Reject Actions for Pending requests */}
                <div className="request-actions">
                  {req.status === 'Pending' ? (
                    <>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        disabled={actionLoading}
                        onClick={() => handleAccept(req.id, req.itemName, req.borrowerName)}
                      >
                        <CheckCircle size={15} /> Accept Request
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        style={{ color: '#ef4444' }}
                        disabled={actionLoading}
                        onClick={() => handleReject(req.id, req.itemName, req.borrowerName)}
                      >
                        <XCircle size={15} /> Decline
                      </button>
                    </>
                  ) : req.status === 'Accepted' ? (
                    <Link to="/active-borrowings" className="btn btn-secondary btn-sm">
                      <Clock size={14} /> Active Loan
                    </Link>
                  ) : (
                    <span style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>
                      Status: {req.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        /* Tab 2: Requests Sent */
        sentRequests.length === 0 ? (
          <EmptyState
            title="No sent requests"
            description="You haven't requested any items yet. Explore the campus marketplace to find textbooks, calculators, and equipment."
            actionText="Explore Marketplace"
            actionLink="/marketplace"
          />
        ) : (
          <div className="requests-grid">
            {sentRequests.map((req) => (
              <div key={req.id} className="request-card">
                <img
                  src={req.itemImage}
                  alt={req.itemName}
                  className="request-item-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80';
                  }}
                />

                <div className="request-details">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 4 }}>
                    <h3 className="request-item-title">{req.itemName}</h3>
                    {getStatusBadge(req.status)}
                  </div>

                  <div className="request-parties">
                    Owner: <strong>{req.ownerName}</strong> ({req.ownerCollege || 'Campus lender'})
                  </div>

                  <div className="request-dates">
                    <Calendar size={13} color="var(--color-accent)" />
                    Requested: <strong>{req.startDate}</strong> to <strong>{req.endDate}</strong>
                  </div>

                  {req.message && (
                    <div className="request-message">
                      "{req.message}"
                    </div>
                  )}
                </div>

                <div className="request-actions">
                  {req.status === 'Pending' ? (
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      style={{ color: '#ef4444' }}
                      onClick={() => {
                        setRequestToCancel(req);
                        setCancelDialogOpen(true);
                      }}
                    >
                      <X size={15} /> Cancel Request
                    </button>
                  ) : req.status === 'Accepted' ? (
                    <Link to="/active-borrowings" className="btn btn-primary btn-sm">
                      <Clock size={14} /> View in Active
                    </Link>
                  ) : (
                    <Link to={`/items/${req.itemId}`} className="btn btn-secondary btn-sm">
                      View Item
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {/* Cancel Request Dialog */}
      <ConfirmDialog
        isOpen={cancelDialogOpen}
        title="Cancel Borrowing Request"
        message={`Are you sure you want to cancel your request for "${requestToCancel?.itemName}"?`}
        confirmText="Cancel Request"
        isDanger={true}
        loading={actionLoading}
        onConfirm={handleCancelRequest}
        onCancel={() => {
          setCancelDialogOpen(false);
          setRequestToCancel(null);
        }}
      />
    </div>
  );
};

export default BorrowRequests;
