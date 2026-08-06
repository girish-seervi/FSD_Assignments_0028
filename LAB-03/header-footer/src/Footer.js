import React, { useState } from 'react';
import './Footer.css';

function Footer() {
  const [activeTab, setActiveTab] = useState('popular-flight-routes');

  const routeData = {
    'popular-flight-routes': [
      ['New Delhi to Dubai Flights', 'Mumbai to Varanasi Flights', 'Doha to Gorakhpur Flights', 'Kolkata to Dubai Flights'],
      ['New Delhi to Kolkata Flights', 'Mumbai to Goa Flights', 'Bengaluru to Nagpur Flights', 'Mumbai to Bali Flights'],
      ['New Delhi to Pune Flights', 'Pune to Lucknow Flights', 'Bhubaneswar to Mumbai Flights', 'Doha to Patna Flights'],
      ['Mumbai to Dubai Flights', 'Hyderabad to Purnea Flights', 'Abu Dhabi to Gorakhpur Flights', 'Goa to Hyderabad Flights'],
      ['New Delhi to Hyderabad Flights', 'Darbhanga to Mumbai Flights', 'Pune to Nagpur Flights', 'Mumbai to Ayodhya Flights']
    ],
    'top-flight-routes': [
      ['Delhi to Mumbai Flights', 'Bangalore to Delhi Flights', 'Mumbai to Bangalore Flights', 'Delhi to Bangalore Flights'],
      ['Chennai to Delhi Flights', 'Delhi to Goa Flights', 'Kolkata to Delhi Flights', 'Delhi to Kolkata Flights'],
      ['Hyderabad to Delhi Flights', 'Delhi to Hyderabad Flights', 'Mumbai to Goa Flights', 'Bangalore to Goa Flights'],
      ['Delhi to Pune Flights', 'Pune to Delhi Flights', 'Mumbai to Delhi Flights', 'Bangalore to Mumbai Flights'],
      ['Delhi to Srinagar Flights', 'Srinagar to Delhi Flights', 'Mumbai to Hyderabad Flights', 'Delhi to Ahmedabad Flights']
    ],
    'popular-train-routes': [
      ['Delhi to Patna Trains', 'Mumbai to Goa Trains', 'Delhi to Varanasi Trains', 'Kolkata to Puri Trains'],
      ['Delhi to Howrah Trains', 'Mumbai to Pune Trains', 'Delhi to Jammu Trains', 'Bangalore to Chennai Trains'],
      ['Delhi to Lucknow Trains', 'Mumbai to Ahmedabad Trains', 'Delhi to Jaipur Trains', 'Chennai to Hyderabad Trains'],
      ['Delhi to Ahmedabad Trains', 'Mumbai to Surat Trains', 'Delhi to Amritsar Trains', 'Bangalore to Hyderabad Trains'],
      ['Delhi to Kanpur Trains', 'Mumbai to Vadodara Trains', 'Delhi to Dehradun Trains', 'Hyderabad to Vizag Trains']
    ],
    'top-train-routes': [
      ['Delhi to Bangalore Trains', 'Delhi to Gorakhpur Trains', 'Delhi to Chennai Trains', 'Delhi to Haridwar Trains'],
      ['Mumbai to Nagpur Trains', 'Mumbai to Varanasi Trains', 'Mumbai to Bangalore Trains', 'Mumbai to Indore Trains'],
      ['Kolkata to Delhi Trains', 'Kolkata to Patna Trains', 'Kolkata to Chennai Trains', 'Kolkata to Siliguri Trains'],
      ['Bangalore to Goa Trains', 'Bangalore to Delhi Trains', 'Bangalore to Kochi Trains', 'Bangalore to Pune Trains'],
      ['Chennai to Madurai Trains', 'Chennai to Coimbatore Trains', 'Chennai to Trivandrum Trains', 'Chennai to Delhi Trains']
    ],
    'top-hotel-destinations': [
      ['Hotels in Goa', 'Hotels in Jaipur', 'Hotels in Udaipur', 'Hotels in Shimla'],
      ['Hotels in Manali', 'Hotels in Ooty', 'Hotels in Mumbai', 'Hotels in Delhi'],
      ['Hotels in Bangalore', 'Hotels in Hyderabad', 'Hotels in Chennai', 'Hotels in Kolkata'],
      ['Hotels in Munnar', 'Hotels in Coorg', 'Hotels in Rishikesh', 'Hotels in Varanasi'],
      ['Hotels in Kodaikanal', 'Hotels in Darjeeling', 'Hotels in Agra', 'Hotels in Mussoorie']
    ],
    'plan-your-trip': [
      ['Flights under ₹2000', 'Weekend Getaways', 'Honeymoon Packages', 'Hill Station Tours'],
      ['Beach Destinations', 'Heritage Places', 'Pilgrimage Tours', 'Adventure Trips'],
      ['International Packages', 'Domestic Holidays', 'Group Tour Booking', 'Family Tour Packages'],
      ['Last Minute Flight Deals', 'Budget Hotels', 'Luxury Resorts', 'Homestays & Villas'],
      ['Train Seat Availability', 'Flight Status Tracker', 'PNR Status Check', 'Live Train Status']
    ]
  };

  const importantLinks = [
    'IRCTC Trains', 'Tatkal Railway Reservation', 'PNR Status', 'Train Running Status', 
    'Train Seat Availability', 'Platform Locator', 'Vande Bharat Express', 'IRCTC Cancellation Charges', 
    'Flight Booking', 'International Flights', 'Student Flight Booking', 'Armed Forces Flight Booking', 
    'Senior Citizen Flight Booking', 'Airlines', 'Web Check-in Online', 'Flight Status List', 
    'Airport Cab Booking', 'abhibus', 'ConfirmTkt', 'Trenes', 'Travel Stories', 
    'Visa for Indians', 'ixigo AU Bank Credit Card', 'Responsible Disclosure'
  ];

  return (
    <footer className="ixigo-footer">
      <div className="footer-container">
        {/* Route Category Tabs Header */}
        <div className="footer-tabs-wrapper">
          <div className="footer-tabs">
            <button
              className={`footer-tab ${activeTab === 'popular-flight-routes' ? 'active' : ''}`}
              onClick={() => setActiveTab('popular-flight-routes')}
            >
              Popular Flight Routes
            </button>
            <button
              className={`footer-tab ${activeTab === 'top-flight-routes' ? 'active' : ''}`}
              onClick={() => setActiveTab('top-flight-routes')}
            >
              Top Flight Routes
            </button>
            <button
              className={`footer-tab ${activeTab === 'popular-train-routes' ? 'active' : ''}`}
              onClick={() => setActiveTab('popular-train-routes')}
            >
              Popular Train Routes
            </button>
            <button
              className={`footer-tab ${activeTab === 'top-train-routes' ? 'active' : ''}`}
              onClick={() => setActiveTab('top-train-routes')}
            >
              Top Train Routes
            </button>
            <button
              className={`footer-tab ${activeTab === 'top-hotel-destinations' ? 'active' : ''}`}
              onClick={() => setActiveTab('top-hotel-destinations')}
            >
              Top Hotel Destinations
            </button>
            <button
              className={`footer-tab ${activeTab === 'plan-your-trip' ? 'active' : ''}`}
              onClick={() => setActiveTab('plan-your-trip')}
            >
              Plan Your Trip
            </button>
          </div>
        </div>

        {/* 5 Column Links Content Grid */}
        <div className="route-columns-grid">
          {routeData[activeTab].map((column, colIdx) => (
            <div key={colIdx} className="route-column">
              {column.map((item, rowIdx) => (
                <a key={rowIdx} href={`#${item.toLowerCase().replace(/ /g, '-')}`} className="route-link">
                  {item}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Important Links Section */}
        <div className="important-links-section">
          <h4 className="important-links-title">Important Links</h4>
          <div className="important-links-list">
            {importantLinks.map((link, idx) => (
              <React.Fragment key={idx}>
                <a href={`#${link.toLowerCase().replace(/ /g, '-')}`} className="imp-link">
                  {link}
                </a>
                {idx < importantLinks.length - 1 && <span className="link-dot">•</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* App Download Buttons */}
        <div className="app-download-section">
          <div className="app-buttons-row">
            <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="store-btn google-play-btn">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M3 20.5v-17c0-.8.4-1.5 1.1-1.9l9.6 9.6-9.6 9.6c-.7-.4-1.1-1.1-1.1-1.9zm13.1-7.1l2.4-1.4c.7-.4.7-1.1 0-1.5l-2.4-1.4-2.7 2.7 2.7 1.6zm-12.7 8.3l9.6-9.6 2.7 2.7-10.9 6.3c-.5.3-1 .4-1.4.6zm9.6-19.1l-9.6 9.6c.4.2.9.3 1.4.6l10.9 6.3-2.7-2.7z"/>
              </svg>
              <div className="btn-text">
                <span className="sub">GET IT ON</span>
                <span className="main">Google Play</span>
              </div>
            </a>

            <a href="https://apple.com" target="_blank" rel="noopener noreferrer" className="store-btn app-store-btn">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.66-.8 1.11-1.92.99-3.04-.96.04-2.12.64-2.8 1.44-.61.71-1.14 1.86-1 2.96 1.08.08 2.16-.55 2.81-1.36z"/>
              </svg>
              <div className="btn-text">
                <span className="sub">Download on the</span>
                <span className="main">App Store</span>
              </div>
            </a>
          </div>
        </div>

        {/* Corporate & Legal Footer Links */}
        <div className="company-links-section">
          <div className="company-links-row">
            <a href="#advertise">Advertise with us</a>
            <span className="dot">•</span>
            <a href="#about">About Us</a>
            <span className="dot">•</span>
            <a href="#investors">Investor Relations</a>
            <span className="dot">•</span>
            <a href="#csr">CSR</a>
          </div>
          <div className="company-links-row secondary">
            <a href="#privacy">Privacy</a>
            <span className="dot">•</span>
            <a href="#terms">Terms of Use</a>
            <span className="dot">•</span>
            <a href="#careers">Careers</a>
            <span className="dot">•</span>
            <a href="#support">Customer Service</a>
          </div>
        </div>

        {/* Copyright Notice */}
        <div className="copyright-section">
          <p>© 2026 Le Travenues Technology Ltd. India. All brands are trademarks of their respective owners.</p>
        </div>

        {/* Social Media Icons */}
        <div className="social-links-section">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.5C10 7.01 11.49 5.65 13.75 5.65c1.08 0 2.22.19 2.22.19v2.44h-1.25c-1.23 0-1.62.77-1.62 1.56V12h2.75l-.44 3h-2.31v6.8c4.56-.93 8-4.96 8-9.8z"/>
            </svg>
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="X">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.47 1.47 0 1 0 0 2.94 1.47 1.47 0 0 0 0-2.94z"/>
            </svg>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="YouTube">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
