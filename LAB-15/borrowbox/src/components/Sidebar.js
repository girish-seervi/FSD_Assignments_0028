import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Store,
  PlusCircle,
  Package,
  Inbox,
  Clock,
  Bell,
  User,
  LogOut
} from 'lucide-react';
import useAuth from '../hooks/useAuth';

const Sidebar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-heading">Campus Sharing</div>
        <nav className="sidebar-nav">
          <NavLink to="/dashboard" className="sidebar-link" end>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/marketplace" className="sidebar-link">
            <Store size={18} />
            <span>Marketplace</span>
          </NavLink>
          <NavLink to="/add-item" className="sidebar-link">
            <PlusCircle size={18} />
            <span>List an Item</span>
          </NavLink>
          <NavLink to="/my-listings" className="sidebar-link">
            <Package size={18} />
            <span>My Listings</span>
          </NavLink>
        </nav>

        <div className="sidebar-heading" style={{ marginTop: 18 }}>
          Transactions
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/requests" className="sidebar-link">
            <Inbox size={18} />
            <span>Borrow Requests</span>
          </NavLink>
          <NavLink to="/active-borrowings" className="sidebar-link">
            <Clock size={18} />
            <span>Active Borrowings</span>
          </NavLink>
          <NavLink to="/notifications" className="sidebar-link">
            <Bell size={18} />
            <span>Notifications</span>
          </NavLink>
        </nav>

        <div className="sidebar-heading" style={{ marginTop: 18 }}>
          Account
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/profile" className="sidebar-link">
            <User size={18} />
            <span>Profile & Settings</span>
          </NavLink>
        </nav>
      </div>

      <div className="sidebar-footer">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, padding: '0 6px' }}>
          <div className="user-avatar" style={{ width: 34, height: 34, fontSize: '0.85rem' }}>
            {user?.name?.[0] || 'U'}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-primary)', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
              {user?.name}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
              {user?.college}
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="btn btn-secondary btn-sm"
          style={{ width: '100%', justifyContent: 'center' }}
        >
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
