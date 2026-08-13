import React from 'react';
import { Code2, Heart, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      backgroundColor: 'var(--slate-900)',
      color: 'var(--slate-300)',
      padding: '4rem 0 2rem 0',
      borderTop: '1px solid var(--slate-800)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2.5rem',
          paddingBottom: '3rem',
          borderBottom: '1px solid var(--slate-800)'
        }}>
          {/* Brand & Lab Submission details */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, var(--primary-500), var(--primary-700))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff'
              }}>
                <Code2 size={20} />
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
                WebDev<span style={{ color: 'var(--primary-400)' }}>Portal</span>
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--slate-400)', lineHeight: 1.6, marginBottom: '1rem' }}>
              BCA Web Technologies Lab Submission integrating Tutorials 1 through 4 into a unified React.js application.
            </p>
            <span style={{
              display: 'inline-block',
              padding: '0.3rem 0.75rem',
              backgroundColor: 'var(--slate-800)',
              color: 'var(--primary-400)',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.78rem',
              fontWeight: 700,
              border: '1px solid var(--slate-700)'
            }}>
              React 18 + Vite Architecture
            </span>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>
              Tutorial Modules
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem' }}>
              <li><a href="#http-demo" style={footerLinkStyle}>Tutorial 1: HTTP Fetch API Demo</a></li>
              <li><a href="#layout-demo" style={footerLinkStyle}>Tutorial 2: Flexbox & CSS Grid</a></li>
              <li><a href="#registration" style={footerLinkStyle}>Tutorial 3: Form Validation & State</a></li>
              <li><a href="#concepts" style={footerLinkStyle}>Tutorial 4: Component Summary</a></li>
            </ul>
          </div>

          {/* Core Learning Objectives */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>
              Core Technical Stack
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {['React.js', 'Fetch API', 'CSS Flexbox', 'CSS Grid', 'Form Validation', 'JSX Components', 'State Hooks', 'Vite Bundler'].map(tag => (
                <span key={tag} style={{
                  backgroundColor: 'var(--slate-800)',
                  color: 'var(--slate-300)',
                  padding: '0.25rem 0.6rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.78rem',
                  border: '1px solid var(--slate-700)'
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom copyright & back to top */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', paddingTop: '2rem', fontSize: '0.82rem', color: 'var(--slate-500)' }}>
          <div>
            &copy; {new Date().getFullYear()} Web Development Learning Portal. All Rights Reserved. BCA Web Tech Lab.
          </div>

          <button
            onClick={scrollToTop}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'var(--slate-800)',
              color: 'var(--slate-300)',
              border: '1px solid var(--slate-700)',
              padding: '0.4rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
          >
            Back to Top <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}

const footerLinkStyle = {
  color: 'var(--slate-400)',
  textDecoration: 'none',
  transition: 'color var(--transition-fast)'
};
