import React from 'react';

const Footer = () => {
  const scrollTo = (e, id) => {
    e.preventDefault();
    if (id === '#' || !id) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.querySelector(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4">
            <h4>Department of Computer Applications</h4>
            <p>
              Creating future-ready professionals through technology, innovation
              and research.
            </p>

            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-4">
            <h5>Quick Links</h5>
            <ul>
              <li>
                <a href="#about" onClick={(e) => scrollTo(e, '#about')}>
                  About
                </a>
              </li>
              <li>
                <a href="#faculty" onClick={(e) => scrollTo(e, '#faculty')}>
                  Faculty
                </a>
              </li>
              <li>
                <a href="#placements" onClick={(e) => scrollTo(e, '#placements')}>
                  Placements
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => scrollTo(e, '#contact')}>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-4">
            <h5>Policies</h5>
            <ul>
              <li>
                <a href="#privacy" onClick={(e) => e.preventDefault()}>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" onClick={(e) => e.preventDefault()}>
                  Terms &amp; Conditions
                </a>
              </li>
              <li>
                <a href="#accessibility" onClick={(e) => e.preventDefault()}>
                  Accessibility
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr />

        <div className="text-center">
          <p>© 2026 Department of Computer Applications. All Rights Reserved.</p>
          <p className="text-muted small">
            Developed by Department Web Development Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
