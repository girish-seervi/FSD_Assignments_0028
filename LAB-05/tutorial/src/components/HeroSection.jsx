import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Layout, CheckCircle2, Component, Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="hero" style={{
      background: 'linear-gradient(180deg, #ffffff 0%, var(--primary-50) 100%)',
      padding: '4.5rem 0 4rem 0',
      borderBottom: '1px solid var(--slate-200)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative background glow circle */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        right: '-100px',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, rgba(255,255,255,0) 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        {/* Top Tag */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', background: '#ffffff', border: '1px solid var(--primary-200)', borderRadius: 'var(--radius-full)', boxShadow: 'var(--shadow-sm)', marginBottom: '1.5rem' }}>
          <Sparkles size={16} color="var(--primary-600)" />
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-700)' }}>
            BCA Web Technologies Lab Submission &bull; Combined Tutorials 1 - 4
          </span>
        </div>

        {/* Hero Title */}
        <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--slate-900)', letterSpacing: '-0.03em', maxWidth: '900px', margin: '0 auto 1.25rem auto', lineHeight: 1.15 }}>
          Web Development <span className="gradient-text">Learning Portal</span>
        </h1>

        {/* Subtitle */}
        <p style={{ fontSize: '1.2rem', color: 'var(--slate-600)', maxWidth: '780px', margin: '0 auto 2.25rem auto', lineHeight: 1.6 }}>
          An all-in-one interactive React platform demonstrating asynchronous HTTP request-response cycles, modern CSS Flexbox and Grid layouts, dynamic form validation, and modular React component design.
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
          <Link to="/http-demo" className="btn btn-primary" style={{ padding: '0.85rem 1.8rem', fontSize: '1rem' }}>
            Explore Interactive Demos <ArrowRight size={18} />
          </Link>
          <Link to="/registration" className="btn btn-outline" style={{ padding: '0.85rem 1.8rem', fontSize: '1rem' }}>
            Try Student Registration Form
          </Link>
        </div>

        {/* 4 Core Tutorial Pills / Feature Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem',
          maxWidth: '1100px',
          margin: '0 auto'
        }}>
          {tutorialCards.map((card, idx) => (
            <Link key={idx} to={card.path} style={{
              backgroundColor: '#ffffff',
              padding: '1.25rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--slate-200)',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              textAlign: 'left',
              textDecoration: 'none',
              transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)',
              cursor: 'pointer'
            }}
            className="tutorial-card-hover"
            >
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: card.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: card.color,
                flexShrink: 0
              }}>
                {card.icon}
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-600)', textTransform: 'uppercase' }}>
                  Tutorial {idx + 1}
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--slate-800)' }}>
                  {card.title}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const tutorialCards = [
  {
    title: 'HTTP Request-Response',
    icon: <Globe size={22} />,
    bg: 'var(--primary-50)',
    color: 'var(--primary-600)',
    path: '/http-demo'
  },
  {
    title: 'Flexbox & CSS Grid',
    icon: <Layout size={22} />,
    bg: '#f0fdf4',
    color: '#16a34a',
    path: '/layouts'
  },
  {
    title: 'Form Validation & State',
    icon: <CheckCircle2 size={22} />,
    bg: '#fefce8',
    color: '#ca8a04',
    path: '/registration'
  },
  {
    title: 'React Components',
    icon: <Component size={22} />,
    bg: '#faf5ff',
    color: '#9333ea',
    path: '/concepts'
  }
];
