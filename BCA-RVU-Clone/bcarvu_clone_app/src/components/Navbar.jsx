import React, { useState, useEffect } from 'react';

const navItems = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#about' },
  { label: "HOD's Desk", href: '#hod' },
  { label: 'Programs', href: '#programs' },
  { label: 'Faculty', href: '#faculty' },
  { label: 'Laboratories', href: '#labs' },
  { label: 'Research', href: '#research' },
  { label: 'Placements', href: '#placements' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Events', href: '#events' },
  { label: 'Downloads', href: '#downloads' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#');
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Active section calculation
      const scrollPos = window.scrollY + 200;
      const sections = [
        'contact',
        'downloads',
        'events',
        'gallery',
        'placements',
        'research',
        'labs',
        'faculty',
        'programs',
        'hod',
        'about'
      ];

      let current = '#';
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el && el.offsetTop <= scrollPos) {
          current = `#${sectionId}`;
          break;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    if (href === '#' || href === '') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <header>
      <nav
        className={`navbar navbar-expand-lg fixed-top glass-navbar ${
          scrolled ? 'navbar-scrolled' : ''
        }`}
      >
        <div className="container">
          {/* Logo */}
          <a
            className="navbar-brand d-flex align-items-center"
            href="#top"
            onClick={(e) => handleNavClick(e, '#')}
          >
            <img
              src="assets/icons/RVU-logo.svg"
              className="logo"
              alt="University Logo"
            />
            <div className="ms-3">
              <h5 className="mb-0">Department of</h5>
              <small>Computer Applications</small>
            </div>
          </a>

          {/* Mobile Toggle */}
          <button
            className={`navbar-toggler ${mobileOpen ? '' : 'collapsed'}`}
            type="button"
            aria-controls="mainNav"
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation"
            onClick={() => setMobileOpen(prev => !prev)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Menu */}
          <div
            className={`collapse navbar-collapse ${mobileOpen ? 'show' : ''}`}
            id="mainNav"
          >
            <ul className="navbar-nav ms-auto">
              {navItems.map((item) => {
                const isActive = activeSection === item.href;
                return (
                  <li className="nav-item" key={item.label}>
                    <a
                      className={`nav-link ${isActive ? 'active' : ''}`}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Dark Mode Toggle Button */}
            <button
              className="btn btn-warning ms-lg-3 theme-toggle-btn"
              id="themeToggle"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <i className={`fa-solid ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
