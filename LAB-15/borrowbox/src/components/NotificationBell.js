import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Bell, Clock, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { notificationApi } from '../services/api';
import useAuth from '../hooks/useAuth';

const NotificationBell = () => {
  const { isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const fetchNotifications = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      const res = await notificationApi.getAll();
      if (res.success) {
        setNotifications(res.data.slice(0, 5)); // show latest 5 in dropdown
        setUnreadCount(res.unreadCount);
      }
    } catch (err) {
      // silently fail in background
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 15000); // refresh every 15s
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, fetchNotifications]);

  // Click outside listener to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMarkAsRead = async (id, e) => {
    e.stopPropagation();
    try {
      await notificationApi.markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await notificationApi.markAllAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error(err);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="notification-bell-container" ref={dropdownRef}>
      <button
        type="button"
        className="notification-bell-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notifications"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="notification-badge-count">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="notification-dropdown">
          <div className="notification-dropdown-header">
            <h4 className="notification-dropdown-title">Notifications</h4>
            {unreadCount > 0 && (
              <button
                type="button"
                className="btn-ghost btn-sm"
                style={{ fontSize: '0.75rem', padding: '2px 6px' }}
                onClick={handleMarkAllRead}
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="notification-list">
            {notifications.length === 0 ? (
              <div style={{ padding: '24px 16px', textAlign: 'center', color: '#64748b', fontSize: '0.875rem' }}>
                No notifications yet.
              </div>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  className={`notification-item ${!item.read ? 'unread' : ''}`}
                  onClick={(e) => !item.read && handleMarkAsRead(item.id, e)}
                >
                  <div style={{ flex: 1 }}>
                    <div className="notification-item-title">{item.title}</div>
                    <div className="notification-item-desc">{item.message}</div>
                    <div className="notification-item-time">
                      <Clock size={11} style={{ display: 'inline', marginRight: 4 }} />
                      {new Date(item.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                  {!item.read && (
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: '#6366f1',
                        marginTop: 6
                      }}
                    />
                  )}
                </div>
              ))
            )}
          </div>

          <div className="notification-dropdown-footer">
            <Link
              to="/notifications"
              className="auth-link"
              style={{ fontSize: '0.8125rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}
              onClick={() => setIsOpen(false)}
            >
              View all notifications <ExternalLink size={13} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
