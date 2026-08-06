import React, { useState, useEffect } from 'react';
import './Header.css';

function Header() {
  const [activeTab, setActiveTab] = useState('flights');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`ixigo-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Top Header Bar */}
        <div className="header-top">
          <div className="brand-logo">
            <a href="/" className="logo-link">
              <span className="logo-badge">
                <span className="logo-text">ixigo</span>
                <svg className="logo-plane" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                </svg>
              </span>
            </a>
          </div>

          <div className="top-right-actions">
            <a href="#offers" className="top-action-item">
              <span className="action-icon percent-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="5" x2="5" y2="19"></line>
                  <circle cx="6.5" cy="6.5" r="2.5"></circle>
                  <circle cx="17.5" cy="17.5" r="2.5"></circle>
                </svg>
              </span>
              <span className="action-text">Offers</span>
            </a>

            <a href="#customer-service" className="top-action-item">
              <span className="action-icon service-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  <circle cx="9" cy="10" r="1"></circle>
                  <circle cx="12" cy="10" r="1"></circle>
                  <circle cx="15" cy="10" r="1"></circle>
                </svg>
              </span>
              <span className="action-text">Customer Service</span>
            </a>

            <button className="login-btn">
              <span className="user-avatar">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </span>
              <span className="login-text">Log in/SignUp</span>
            </button>
          </div>
        </div>

        {/* Navigation Categories Row */}
        <div className="header-nav-bar">
          <nav className="nav-tabs">
            <button
              className={`nav-tab ${activeTab === 'flights' ? 'active' : ''}`}
              onClick={() => setActiveTab('flights')}
            >
              <div className="tab-icon-wrapper flight-bg">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                </svg>
              </div>
              <span className="tab-label">Flights</span>
            </button>

            <button
              className={`nav-tab ${activeTab === 'hotels' ? 'active' : ''}`}
              onClick={() => setActiveTab('hotels')}
            >
              <span className="tab-badge">Flat 80% Off</span>
              <div className="tab-icon-wrapper hotel-bg">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z"/>
                </svg>
              </div>
              <span className="tab-label">Hotels</span>
            </button>

            <button
              className={`nav-tab ${activeTab === 'trains' ? 'active' : ''}`}
              onClick={() => setActiveTab('trains')}
            >
              <div className="tab-icon-wrapper train-bg">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h12v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-4-4-8-4zm0 2c3.71 0 5.13.46 5.67 1H6.33c.54-.54 1.96-1 5.67-1zm-6 4h12v3H6V8zm2.5 9c-.83 0-1.5-.67-1.5-1.5S7.67 14 8.5 14s1.5.67 1.5 1.5S9.33 17 8.5 17zm7 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                </svg>
              </div>
              <span className="tab-label">Trains</span>
            </button>

            <button
              className={`nav-tab ${activeTab === 'buses' ? 'active' : ''}`}
              onClick={() => setActiveTab('buses')}
            >
              <div className="tab-icon-wrapper bus-bg">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/>
                </svg>
              </div>
              <span className="tab-label">Buses</span>
            </button>
          </nav>

          <div className="header-nav-right">
            <span className="nav-tagline">Book International and Domestic Flights</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
