import React, { useState, useEffect } from 'react';
import { Code2, Globe, LayoutGrid, UserPlus, BookOpen, Layers } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.92)' : '#ffffff',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: '1px solid var(--slate-200)',
        boxShadow: scrolled ? 'var(--shadow-md)' : 'none',
        transition: 'all var(--transition-normal)'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
        {/* Brand Logo */}
        <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, var(--primary-600), var(--primary-800))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 4px 10px rgba(37, 99, 235, 0.25)'
          }}>
            <Code2 size={24} />
          </div>
          <div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)', letterSpacing: '-0.02em' }}>
              WebDev<span style={{ color: 'var(--primary-600)' }}>Portal</span>
            </span>
            <div style={{ fontSize: '0.7rem', color: 'var(--slate-500)', fontWeight: 600, marginTop: '-3px' }}>
              BCA Web Tech Lab
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <a href="#http-demo" style={linkStyle}>
            <Globe size={16} /> HTTP Demo
          </a>
          <a href="#layout-demo" style={linkStyle}>
            <LayoutGrid size={16} /> Layouts (Flex & Grid)
          </a>
          <a href="#registration" style={linkStyle}>
            <UserPlus size={16} /> Student Registration
          </a>
          <a href="#concepts" style={linkStyle}>
            <BookOpen size={16} /> Concepts Summary
          </a>
        </div>

        {/* Lab Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{
            padding: '0.4rem 0.85rem',
            backgroundColor: 'var(--primary-50)',
            color: 'var(--primary-700)',
            border: '1px solid var(--primary-200)',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.8rem',
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}>
            <Layers size={14} /> LAB-05 Unified Portal
          </span>
        </div>
      </div>
    </nav>
  );
}

const linkStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  fontSize: '0.92rem',
  fontWeight: 600,
  color: 'var(--slate-700)',
  textDecoration: 'none',
  transition: 'color var(--transition-fast)'
};
