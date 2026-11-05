import React, { useState, useEffect } from 'react';
import {
  Clock,
  ArrowRightLeft,
  Calendar,
  AlertCircle,
  CheckCircle2,
  User,
  RotateCcw,
  Check
} from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import ConfirmDialog from '../components/ConfirmDialog';
import { requestApi } from '../services/api';

const ActiveBorrowings = () => {
  const [activeTab, setActiveTab] = useState('borrowing'); // 'borrowing' (items I borrowed) or 'lending' (items I lent)
  const [borrowedItems, setBorrowedItems] = useState([]);
  const [lentItems, setLentItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Confirm dialog state for returns
  const [returnDialogOpen, setReturnDialogOpen] = useState(false);
  const [targetItem, setTargetItem] = useState(null);
  const [dialogType, setDialogType] = useState('return'); // 'return' or 'confirm'
  const [actionLoading, setActionLoading] = useState(false);

  const fetchActiveTransactions = async () => {
    try {
      setLoading(true);
      setError('');
      const [sentRes, recRes] = await Promise.all([
        requestApi.getSent(),
        requestApi.getReceived()
      ]);

      if (sentRes.success) {
        // Items where logged in user is borrower and status is Accepted or Return Requested
        const activeBorrows = sentRes.data.filter(
          (r) => r.status === 'Accepted' || r.status === 'Return Requested'
        );
        setBorrowedItems(activeBorrows);
      }

      if (recRes.success) {
        // Items where logged in user is owner and status is Accepted or Return Requested
        const activeLends = recRes.data.filter(
          (r) => r.status === 'Accepted' || r.status === 'Return Requested'
        );
        setLentItems(activeLends);
      }
    } catch (err) {
      setError(err.message || 'Failed to load active borrowings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveTransactions();
  }, []);

  // Borrower initiates return
  const handleInitiateReturn = async () => {
    if (!targetItem) return;
    setActionLoading(true);
    try {
      const res = await requestApi.requestReturn(targetItem.id);
      if (res.success) {
        setBorrowedItems((prev) =>
          prev.map((i) => (i.id === targetItem.id ? { ...i, status: 'Return Requested' } : i))
        );
        setSuccessMsg(`Return initiated for "${targetItem.itemName}". The owner has been asked to confirm receipt.`);
        setReturnDialogOpen(false);
        setTargetItem(null);
      }
    } catch (err) {
      setError(err.message || 'Failed to initiate return.');
      setReturnDialogOpen(false);
    } finally {
      setActionLoading(false);
    }
  };

  // Owner confirms return
  const handleConfirmReturn = async () => {
    if (!targetItem) return;
    setActionLoading(true);
    try {
      const res = await requestApi.confirmReturn(targetItem.id);
      if (res.success) {
        setLentItems((prev) => prev.filter((i) => i.id !== targetItem.id));
        setSuccessMsg(`Return confirmed for "${targetItem.itemName}"! Item is now marked Available again.`);
        setReturnDialogOpen(false);
        setTargetItem(null);
      }
    } catch (err) {
      setError(err.message || 'Failed to confirm return.');
      setReturnDialogOpen(false);
    } finally {
      setActionLoading(false);
    }
  };

  const currentList = activeTab === 'borrowing' ? borrowedItems : lentItems;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Clock size={26} color="var(--color-accent)" /> Active Campus Loans
        </h1>
        <p className="page-subtitle">
          Manage currently active transactions, coordinate return dates, and confirm item hand-offs
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

      {/* Tabs */}
      <div className="tabs-header">
        <button
          type="button"
          className={`tab-btn ${activeTab === 'borrowing' ? 'active' : ''}`}
          onClick={() => setActiveTab('borrowing')}
        >
          <ArrowRightLeft size={18} />
          Items I'm Borrowing
          <span className="tab-count-badge">{borrowedItems.length}</span>
        </button>

        <button
          type="button"
          className={`tab-btn ${activeTab === 'lending' ? 'active' : ''}`}
          onClick={() => setActiveTab('lending')}
        >
          <Clock size={18} />
          Items I Lent Out
          <span className="tab-count-badge">{lentItems.length}</span>
        </button>
      </div>

      {loading ? (
        <LoadingSpinner label="Fetching active borrowing agreements..." />
      ) : currentList.length === 0 ? (
        <EmptyState
          title={activeTab === 'borrowing' ? 'No items currently borrowed' : 'No items currently on loan'}
          description={
            activeTab === 'borrowing'
              ? "You don't have any items checked out right now. Find what you need in the marketplace!"
              : "None of your listed items are currently with other students. Share items to build your community score."
          }
          actionText={activeTab === 'borrowing' ? 'Explore Marketplace' : 'View My Listings'}
          actionLink={activeTab === 'borrowing' ? '/marketplace' : '/my-listings'}
        />
      ) : (
        <div className="requests-grid">
          {currentList.map((item) => {
            const isReturnRequested = item.status === 'Return Requested';

            return (
              <div key={item.id} className="request-card">
                <img
                  src={item.itemImage}
                  alt={item.itemName}
                  className="request-item-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80';
                  }}
                />

                <div className="request-details">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 6 }}>
                    <h3 className="request-item-title">{item.itemName}</h3>
                    {isReturnRequested ? (
                      <span className="badge badge-pending">Return Pending Confirmation</span>
                    ) : (
                      <span className="badge badge-accepted">Active Loan</span>
                    )}
                  </div>

                  <div className="request-parties">
                    <User size={13} style={{ display: 'inline', marginRight: 4 }} />
                    {activeTab === 'borrowing' ? (
                      <>Lender: <strong>{item.ownerName}</strong> ({item.ownerCollege || 'Campus lender'})</>
                    ) : (
                      <>Borrower: <strong>{item.borrowerName}</strong> ({item.borrowerCollege || 'Student'}) • {item.borrowerEmail}</>
                    )}
                  </div>

                  <div className="request-dates">
                    <Calendar size={13} color="var(--color-accent)" />
                    Borrowed: <strong>{item.startDate}</strong> to <strong>{item.endDate}</strong>
                  </div>

                  {item.message && (
                    <div className="request-message">
                      "{item.message}"
                    </div>
                  )}
                </div>

                {/* Return Action Buttons */}
                <div className="request-actions">
                  {activeTab === 'borrowing' ? (
                    isReturnRequested ? (
                      <div style={{ fontSize: '0.8125rem', color: '#b45309', fontWeight: 600 }}>
                        Awaiting owner confirmation
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          setTargetItem(item);
                          setDialogType('return');
                          setReturnDialogOpen(true);
                        }}
                      >
                        <RotateCcw size={15} /> Return Item
                      </button>
                    )
                  ) : (
                    /* Lending view: owner confirms receipt */
                    <button
                      type="button"
                      className="btn btn-success btn-sm"
                      onClick={() => {
                        setTargetItem(item);
                        setDialogType('confirm');
                        setReturnDialogOpen(true);
                      }}
                    >
                      <Check size={15} /> Confirm Return
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Confirmation Dialog for Return / Confirm */}
      <ConfirmDialog
        isOpen={returnDialogOpen}
        title={dialogType === 'return' ? 'Initiate Item Return' : 'Confirm Item Return'}
        message={
          dialogType === 'return'
            ? `Are you ready to return "${targetItem?.itemName}" to ${targetItem?.ownerName}? Make sure to arrange hand-off at their campus location.`
            : `Have you received "${targetItem?.itemName}" back from ${targetItem?.borrowerName} in good condition? This will mark the transaction as completed and make the item Available again.`
        }
        confirmText={dialogType === 'return' ? 'Mark as Returned' : 'Confirm & Complete'}
        isDanger={false}
        loading={actionLoading}
        onConfirm={dialogType === 'return' ? handleInitiateReturn : handleConfirmReturn}
        onCancel={() => {
          setReturnDialogOpen(false);
          setTargetItem(null);
        }}
      />
    </div>
  );
};

export default ActiveBorrowings;
