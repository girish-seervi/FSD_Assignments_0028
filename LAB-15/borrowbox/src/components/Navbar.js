import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Package, Menu, X, LogOut, User, PlusCircle } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import NotificationBell from './NotificationBell';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const closeMenu = () => setMobileMenuOpen(false);

  // Get user initials for avatar
  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <header className="navbar">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <div className="brand-icon-wrapper">
            <Package size={22} />
          </div>
          <span>
            Borrow<span className="brand-highlight">Box</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className={`navbar-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <NavLink to="/" className="nav-link" onClick={closeMenu} end>
            Home
          </NavLink>
          <NavLink to="/marketplace" className="nav-link" onClick={closeMenu}>
            Explore Items
          </NavLink>
          <a href="/#how-it-works" className="nav-link" onClick={closeMenu}>
            How It Works
          </a>
          <a href="/#about" className="nav-link" onClick={closeMenu}>
            About
          </a>
          {isAuthenticated && (
            <NavLink to="/dashboard" className="nav-link" onClick={closeMenu}>
              Dashboard
            </NavLink>
          )}

          {/* Mobile Only Actions */}
          {mobileMenuOpen && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12, borderTop: '1px solid #e2e8f0', paddingTop: 12 }}>
              {isAuthenticated ? (
                <>
                  <Link to="/add-item" className="btn btn-primary btn-sm" onClick={closeMenu}>
                    <PlusCircle size={16} /> List an Item
                  </Link>
                  <Link to="/profile" className="btn btn-secondary btn-sm" onClick={closeMenu}>
                    <User size={16} /> Profile ({user?.name})
                  </Link>
                  <button onClick={handleLogout} className="btn btn-danger btn-sm">
                    <LogOut size={16} /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-secondary btn-sm" onClick={closeMenu}>
                    Log In
                  </Link>
                  <Link to="/register" className="btn btn-primary btn-sm" onClick={closeMenu}>
                    Get Started
                  </Link>
                </>
              )}
            </div>
          )}
        </nav>

        {/* Right Actions */}
        <div className="navbar-actions">
          {isAuthenticated ? (
            <>
              <NotificationBell />
              <Link to="/add-item" className="btn btn-primary btn-sm" style={{ display: 'none', md: 'inline-flex' }}>
                <PlusCircle size={16} /> List Item
              </Link>
              <Link to="/profile" className="user-menu-btn" title="View Profile">
                <div className="user-avatar">{getInitials(user?.name)}</div>
                <span style={{ maxWidth: 110, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user?.name?.split(' ')[0]}
                </span>
              </Link>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={handleLogout}
                title="Log out"
                style={{ padding: '6px 8px' }}
              >
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary btn-sm">
                Log In
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Get Started
              </Link>
            </>
          )}

          {/* Mobile hamburger button */}
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
