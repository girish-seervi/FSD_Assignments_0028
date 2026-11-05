import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Heart, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer" id="about">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Brand & Tagline */}
          <div>
            <div className="footer-brand-title">
              <Package size={24} color="#6366f1" />
              <span>BorrowBox</span>
            </div>
            <p className="footer-desc">
              Borrow More. Buy Less. Share Better. A student-first campus marketplace designed to reduce expenses, promote sustainability, and empower mutual academic support.
            </p>
            <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8125rem' }}>
              <MapPin size={14} color="#6366f1" />
              <span>Active across Student Unions & University Quads</span>
            </div>
          </div>

          {/* Column 2: Platform Links */}
          <div>
            <h4 className="footer-column-title">Marketplace</h4>
            <ul className="footer-links">
              <li>
                <Link to="/marketplace" className="footer-link">Explore Listings</Link>
              </li>
              <li>
                <Link to="/marketplace?costType=Free" className="footer-link">Free Student Items</Link>
              </li>
              <li>
                <Link to="/marketplace?category=Electronics" className="footer-link">Calculators & Tech</Link>
              </li>
              <li>
                <Link to="/marketplace?category=Books" className="footer-link">Textbooks & Notes</Link>
              </li>
              <li>
                <Link to="/add-item" className="footer-link">List an Item</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Trust & Guidelines */}
          <div>
            <h4 className="footer-column-title">Campus Safety</h4>
            <ul className="footer-links">
              <li>
                <a href="#how-it-works" className="footer-link">How Borrowing Works</a>
              </li>
              <li>
                <span className="footer-link" style={{ cursor: 'pointer' }}>Item Care Pledge</span>
              </li>
              <li>
                <span className="footer-link" style={{ cursor: 'pointer' }}>Safe Campus Hand-offs</span>
              </li>
              <li>
                <span className="footer-link" style={{ cursor: 'pointer' }}>Student Verification</span>
              </li>
              <li>
                <span className="footer-link" style={{ cursor: 'pointer' }}>Community Standards</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Legal */}
          <div>
            <h4 className="footer-column-title">Support & Legal</h4>
            <ul className="footer-links">
              <li>
                <a href="mailto:support@borrowbox.campus.edu" className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Mail size={14} /> support@borrowbox.campus.edu
                </a>
              </li>
              <li>
                <span className="footer-link" style={{ cursor: 'pointer' }}>Privacy Policy</span>
              </li>
              <li>
                <span className="footer-link" style={{ cursor: 'pointer' }}>Terms & Conditions</span>
              </li>
              <li>
                <span className="footer-link" style={{ cursor: 'pointer' }}>Campus Representative Program</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} BorrowBox Platform. All rights reserved.</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            Built with <Heart size={14} color="#ef4444" fill="#ef4444" /> for University Students
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
