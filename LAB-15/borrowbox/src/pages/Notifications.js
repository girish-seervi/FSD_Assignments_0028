import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  CheckCheck,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import { notificationApi } from '../services/api';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all' or 'unread'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await notificationApi.getAll();
      if (res.success) {
        setNotifications(res.data || []);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch notifications.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await notificationApi.markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await notificationApi.markAllAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredNotifications = notifications.filter((n) =>
    filter === 'unread' ? !n.read : true
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div>
      <div className="flex-between page-header" style={{ flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Bell size={26} color="var(--color-accent)" /> Notifications
          </h1>
          <p className="page-subtitle">
            Stay updated with borrowing requests, approvals, and return milestones
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handleMarkAllRead}
          >
            <CheckCheck size={16} /> Mark All as Read
          </button>
        )}
      </div>

      {error && (
        <div className="alert alert-error">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* Filter Chips */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <button
          type="button"
          className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setFilter('all')}
        >
          All Notifications ({notifications.length})
        </button>
        <button
          type="button"
          className={`btn btn-sm ${filter === 'unread' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setFilter('unread')}
        >
          Unread Only ({unreadCount})
        </button>
      </div>

      {loading ? (
        <LoadingSpinner label="Loading notification center..." />
      ) : filteredNotifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title={filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
          description="You're all caught up! New requests and updates will appear here automatically."
          actionText="View Borrow Requests"
          actionLink="/requests"
        />
      ) : (
        <div className="card" style={{ overflow: 'hidden' }}>
          {filteredNotifications.map((n) => (
            <div
              key={n.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 16,
                padding: '18px 24px',
                borderBottom: '1px solid #f1f5f9',
                backgroundColor: !n.read ? '#f8faff' : '#ffffff',
                transition: 'background-color 0.15s ease'
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  backgroundColor: !n.read ? '#e0e7ff' : '#f1f5f9',
                  color: !n.read ? '#4f46e5' : '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Bell size={18} />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                    {n.title}
                  </h4>
                  {!n.read && (
                    <span
                      style={{
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        backgroundColor: 'var(--color-accent)',
                        color: '#ffffff',
                        padding: '1px 6px',
                        borderRadius: 12
                      }}
                    >
                      NEW
                    </span>
                  )}
                </div>

                <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.45, marginBottom: 8 }}>
                  {n.message}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: '0.75rem', color: '#94a3b8' }}>
                  <span>
                    <Clock size={12} style={{ display: 'inline', marginRight: 4 }} />
                    {new Date(n.createdAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>

                  <Link to="/requests" className="auth-link" style={{ fontSize: '0.75rem' }}>
                    View Request Details →
                  </Link>
                </div>
              </div>

              {!n.read && (
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '0.75rem', padding: '4px 8px' }}
                  onClick={() => handleMarkAsRead(n.id)}
                  title="Mark as read"
                >
                  <CheckCircle size={14} /> Read
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
