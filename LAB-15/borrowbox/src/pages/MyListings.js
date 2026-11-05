import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Package,
  PlusCircle,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Inbox
} from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import ConfirmDialog from '../components/ConfirmDialog';
import { itemApi } from '../services/api';

const MyListings = () => {
  const location = useLocation();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState(location.state?.message || '');

  // Delete confirmation dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Edit Modal State
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [editLoading, setEditLoading] = useState(false);

  const fetchMyListings = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await itemApi.getMyListings();
      if (res.success) {
        setListings(res.data || []);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch your listings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyListings();
  }, []);

  // Toggle availability
  const handleToggleAvailability = async (item) => {
    const nextStatus = item.availability === 'Available' ? 'Unavailable' : 'Available';
    try {
      const res = await itemApi.toggleAvailability(item.id, nextStatus);
      if (res.success) {
        setListings((prev) =>
          prev.map((i) => (i.id === item.id ? { ...i, availability: nextStatus } : i))
        );
        setSuccessMsg(`"${item.name}" marked as ${nextStatus}.`);
      }
    } catch (err) {
      setError(err.message || 'Could not update availability.');
    }
  };

  // Open Delete Dialog
  const confirmDelete = (item) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  // Execute Deletion
  const handleDelete = async () => {
    if (!itemToDelete) return;
    setDeleteLoading(true);
    try {
      const res = await itemApi.delete(itemToDelete.id);
      if (res.success) {
        setListings((prev) => prev.filter((i) => i.id !== itemToDelete.id));
        setSuccessMsg(`"${itemToDelete.name}" was successfully removed.`);
        setDeleteDialogOpen(false);
        setItemToDelete(null);
      }
    } catch (err) {
      setError(err.message || 'Failed to delete listing.');
      setDeleteDialogOpen(false);
    } finally {
      setDeleteLoading(false);
    }
  };

  // Open Edit Modal
  const openEditModal = (item) => {
    setEditingItem(item);
    setEditFormData({
      name: item.name,
      description: item.description,
      category: item.category,
      condition: item.condition,
      location: item.location,
      costType: item.costType,
      price: item.price || 0,
      imageUrl: item.imageUrl,
      availability: item.availability
    });
    setEditModalOpen(true);
  };

  // Execute Edit Save
  const handleEditSave = async (e) => {
    e.preventDefault();
    if (!editingItem) return;

    setEditLoading(true);
    try {
      const res = await itemApi.update(editingItem.id, editFormData);
      if (res.success) {
        setListings((prev) =>
          prev.map((i) => (i.id === editingItem.id ? { ...i, ...res.data } : i))
        );
        setSuccessMsg(`"${editFormData.name}" updated successfully.`);
        setEditModalOpen(false);
      }
    } catch (err) {
      setError(err.message || 'Failed to update item information.');
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <div>
      <div className="flex-between page-header" style={{ flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Package size={26} color="var(--color-accent)" /> My Listed Items
          </h1>
          <p className="page-subtitle">
            Manage your sharing inventory, track loan requests, and update item availability
          </p>
        </div>

        <Link to="/add-item" className="btn btn-primary">
          <PlusCircle size={18} /> List Another Item
        </Link>
      </div>

      {successMsg && (
        <div className="alert alert-success">
          <CheckCircle size={18} />
          <span>{successMsg}</span>
        </div>
      )}

      {error && (
        <div className="alert alert-error">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <LoadingSpinner label="Loading your listings..." />
      ) : listings.length === 0 ? (
        <EmptyState
          title="No items listed yet"
          description="You haven't listed any items for campus sharing yet. Start sharing your textbooks, calculators or lab equipment!"
          actionText="List an Item"
          actionLink="/add-item"
        />
      ) : (
        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  <th style={{ padding: '14px 20px' }}>Item</th>
                  <th style={{ padding: '14px 16px' }}>Category</th>
                  <th style={{ padding: '14px 16px' }}>Condition</th>
                  <th style={{ padding: '14px 16px' }}>Cost</th>
                  <th style={{ padding: '14px 16px' }}>Requests</th>
                  <th style={{ padding: '14px 16px' }}>Status</th>
                  <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((item) => {
                  const isAvailable = item.availability === 'Available';
                  const isFree = item.costType === 'Free' || Number(item.price) === 0;

                  return (
                    <tr
                      key={item.id}
                      style={{ borderBottom: '1px solid #f1f5f9', transition: 'background-color 0.15s ease' }}
                    >
                      {/* Item Image & Title */}
                      <td style={{ padding: '14px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover' }}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80';
                            }}
                          />
                          <div>
                            <div style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: '0.9375rem', maxWidth: 240, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {item.name}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                              {item.location}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td style={{ padding: '14px 16px', fontSize: '0.875rem', color: '#334155' }}>
                        {item.category}
                      </td>

                      {/* Condition */}
                      <td style={{ padding: '14px 16px' }}>
                        <span className="badge badge-accepted">{item.condition}</span>
                      </td>

                      {/* Cost */}
                      <td style={{ padding: '14px 16px', fontWeight: 600, fontSize: '0.875rem' }}>
                        {isFree ? (
                          <span style={{ color: '#059669' }}>Free</span>
                        ) : (
                          `$${Number(item.price).toFixed(2)}`
                        )}
                      </td>

                      {/* Requests Count */}
                      <td style={{ padding: '14px 16px' }}>
                        <Link
                          to="/requests"
                          className="badge"
                          style={{
                            backgroundColor: item.pendingRequestsCount > 0 ? '#fef3c7' : '#f1f5f9',
                            color: item.pendingRequestsCount > 0 ? '#92400e' : '#475569',
                            gap: 4
                          }}
                        >
                          <Inbox size={12} />
                          {item.requestCount || 0} Total
                          {item.pendingRequestsCount > 0 && ` (${item.pendingRequestsCount} new)`}
                        </Link>
                      </td>

                      {/* Availability Toggle */}
                      <td style={{ padding: '14px 16px' }}>
                        <button
                          type="button"
                          onClick={() => handleToggleAvailability(item)}
                          className={`badge ${isAvailable ? 'badge-available' : 'badge-unavailable'}`}
                          style={{ cursor: 'pointer', border: 'none' }}
                          title="Click to toggle status"
                        >
                          {isAvailable ? <CheckCircle size={12} /> : <XCircle size={12} />}
                          {item.availability}
                        </button>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: 6 }}>
                          <Link
                            to={`/items/${item.id}`}
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '5px 8px' }}
                            title="View Public Page"
                          >
                            <Eye size={15} />
                          </Link>
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '5px 8px' }}
                            onClick={() => openEditModal(item)}
                            title="Edit Listing"
                          >
                            <Edit size={15} />
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '5px 8px', color: '#ef4444' }}
                            onClick={() => confirmDelete(item)}
                            title="Delete Item"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        title="Delete Item Listing"
        message={`Are you sure you want to remove "${itemToDelete?.name}" from BorrowBox? This action cannot be undone.`}
        confirmText="Delete Listing"
        isDanger={true}
        loading={deleteLoading}
        onConfirm={handleDelete}
        onCancel={() => {
          setDeleteDialogOpen(false);
          setItemToDelete(null);
        }}
      />

      {/* Edit Listing Modal */}
      {editModalOpen && (
        <div className="modal-overlay" onClick={() => setEditModalOpen(false)}>
          <div
            className="modal-card"
            style={{ maxWidth: 600 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="modal-title" style={{ marginBottom: 16 }}>
              Edit Listing Information
            </h3>

            <form onSubmit={handleEditSave} className="auth-form">
              <div className="form-group">
                <label className="form-label">Item Title</label>
                <input
                  type="text"
                  className="form-input"
                  style={{ paddingLeft: 14 }}
                  value={editFormData.name || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  rows={3}
                  className="form-input"
                  style={{ paddingLeft: 14, resize: 'vertical' }}
                  value={editFormData.description || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">Campus Location</label>
                  <input
                    type="text"
                    className="form-input"
                    style={{ paddingLeft: 14 }}
                    value={editFormData.location || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Condition</label>
                  <select
                    className="filter-select"
                    value={editFormData.condition || 'Good'}
                    onChange={(e) => setEditFormData({ ...editFormData, condition: e.target.value })}
                  >
                    <option value="New">New</option>
                    <option value="Like New">Like New</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">Cost Type</label>
                  <select
                    className="filter-select"
                    value={editFormData.costType || 'Free'}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        costType: e.target.value,
                        price: e.target.value === 'Free' ? 0 : editFormData.price || 5
                      })
                    }
                  >
                    <option value="Free">Free</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>

                {editFormData.costType === 'Paid' && (
                  <div className="form-group">
                    <label className="form-label">Price ($ USD)</label>
                    <input
                      type="number"
                      step="0.5"
                      min="0.5"
                      className="form-input"
                      style={{ paddingLeft: 14 }}
                      value={editFormData.price || 0}
                      onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
                    />
                  </div>
                )}
              </div>

              <div className="modal-actions" style={{ marginTop: 20 }}>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setEditModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                  disabled={editLoading}
                >
                  {editLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListings;
