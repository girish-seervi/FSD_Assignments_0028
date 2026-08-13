import React, { useState } from 'react';
import { LayoutGrid, Layers, CheckCircle2, Sliders, Smartphone, Monitor, Tablet, Code2 } from 'lucide-react';

export default function LayoutDemo() {
  const [flexJustify, setFlexJustify] = useState('space-between');

  return (
    <section id="layout-demo" className="section-padding" style={{ backgroundColor: '#ffffff' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <LayoutGrid size={14} /> Tutorial 2 Concept
          </div>
          <h2 className="section-title">
            Flexbox & CSS Grid <span className="gradient-text">Layout Showcase</span>
          </h2>
          <p className="section-subtitle">
            Demonstrating fluid, responsive layout designs using 1D CSS Flexbox and 2D CSS Grid systems with modern hover dynamics and device breakpoints.
          </p>
        </div>

        {/* Educational Banner: Why Flexbox and CSS Grid are used */}
        <div style={{
          backgroundColor: 'var(--primary-50)',
          border: '1px solid var(--primary-200)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.75rem',
          marginBottom: '3rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-900)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Layers size={20} color="var(--primary-600)" /> Why Use Flexbox vs. CSS Grid?
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--primary-100)' }}>
              <strong style={{ color: 'var(--primary-700)', display: 'block', marginBottom: '0.4rem', fontSize: '1rem' }}>
                1. CSS Flexbox (One-Dimensional)
              </strong>
              <p style={{ fontSize: '0.88rem', color: 'var(--slate-600)' }}>
                Best suited for aligning items along a single axis (row or column). Perfect for navigation bars, horizontal lists, button groups, and centering elements dynamically.
              </p>
            </div>
            <div style={{ backgroundColor: '#ffffff', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--primary-100)' }}>
              <strong style={{ color: 'var(--primary-700)', display: 'block', marginBottom: '0.4rem', fontSize: '1rem' }}>
                2. CSS Grid (Two-Dimensional)
              </strong>
              <p style={{ fontSize: '0.88rem', color: 'var(--slate-600)' }}>
                Best suited for structured multi-column and multi-row layout systems. Perfect for overall web page structures, dashboard cards, gallery grids, and complex responsive templates.
              </p>
            </div>
          </div>
        </div>

        {/* DEMO 1: FLEXBOX DEMONSTRATION (3 Cards Aligned Horizontally) */}
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary-600)', textTransform: 'uppercase' }}>
                Flexbox Demonstration
              </span>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                Horizontal Alignment (3 Flex Cards)
              </h3>
            </div>

            {/* Interactive Flex Justify Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--slate-100)', padding: '0.35rem 0.6rem', borderRadius: 'var(--radius-md)' }}>
              <Sliders size={16} color="var(--slate-600)" />
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--slate-700)' }}>justify-content:</span>
              <select
                value={flexJustify}
                onChange={(e) => setFlexJustify(e.target.value)}
                style={{
                  padding: '0.3rem 0.6rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--slate-300)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  backgroundColor: '#ffffff',
                  color: 'var(--slate-800)',
                  cursor: 'pointer'
                }}
              >
                <option value="space-between">space-between</option>
                <option value="center">center</option>
                <option value="space-around">space-around</option>
                <option value="flex-start">flex-start</option>
              </select>
            </div>
          </div>

          <div style={{
            padding: '0.75rem 1rem',
            backgroundColor: 'var(--slate-900)',
            color: '#7dd3fc',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.82rem',
            fontFamily: 'var(--font-mono)',
            marginBottom: '1.25rem'
          }}>
            display: flex; flex-direction: row; justify-content: {flexJustify}; gap: 1.5rem; flex-wrap: wrap;
          </div>

          {/* 3 Horizontally Aligned Cards */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: flexJustify,
            gap: '1.5rem',
            flexWrap: 'wrap',
            alignItems: 'stretch'
          }}>
            {flexCardsData.map((card) => (
              <div key={card.id} className="portal-card" style={{ flex: '1 1 280px', minWidth: '260px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: card.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: card.color,
                  marginBottom: '1rem'
                }}>
                  {card.icon}
                </div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--slate-900)' }}>
                  {card.title}
                </h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--slate-600)', marginBottom: '1rem' }}>
                  {card.desc}
                </p>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '0.25rem 0.6rem',
                  backgroundColor: 'var(--slate-100)',
                  color: 'var(--slate-700)',
                  borderRadius: 'var(--radius-full)'
                }}>
                  {card.badge}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* DEMO 2: CSS GRID DEMONSTRATION (6 Cards Responsive Layout) */}
        <div>
          <div style={{ marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary-600)', textTransform: 'uppercase' }}>
              CSS Grid Demonstration
            </span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--slate-900)' }}>
              Responsive 2D Layout (6 Cards Grid)
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', marginTop: '0.25rem' }}>
              Automatically adjusts columns based on viewport size: Desktop (3 columns), Tablet (2 columns), Mobile (1 column).
            </p>
          </div>

          <div style={{
            padding: '0.75rem 1rem',
            backgroundColor: 'var(--slate-900)',
            color: '#86efac',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.82rem',
            fontFamily: 'var(--font-mono)',
            marginBottom: '1.5rem'
          }}>
            display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;
          </div>

          {/* 6 Responsive Grid Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {gridCardsData.map((card) => (
              <div key={card.id} className="portal-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary-100)',
                    color: 'var(--primary-800)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.85rem',
                    fontWeight: 800
                  }}>
                    0{card.id}
                  </span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--slate-500)' }}>
                    {card.category}
                  </span>
                </div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--slate-900)' }}>
                  {card.title}
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', lineHeight: 1.5 }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const flexCardsData = [
  {
    id: 1,
    title: 'Flex Item 01: Alignment',
    desc: 'Align items vertically and horizontally along the primary main axis using justify-content and align-items.',
    icon: <Sliders size={22} />,
    bg: 'var(--primary-50)',
    color: 'var(--primary-600)',
    badge: 'Flexbox Property'
  },
  {
    id: 2,
    title: 'Flex Item 02: Distribution',
    desc: 'Distribute space evenly between or around flex elements using space-between or space-around attributes.',
    icon: <Layers size={22} />,
    bg: '#f0fdf4',
    color: '#16a34a',
    badge: 'Space Distribution'
  },
  {
    id: 3,
    title: 'Flex Item 03: Flexibility',
    desc: 'Allow items to shrink or expand dynamically to fill remaining available space using flex-grow and flex-shrink.',
    icon: <CheckCircle2 size={22} />,
    bg: '#faf5ff',
    color: '#9333ea',
    badge: 'Flex Sizing'
  }
];

const gridCardsData = [
  {
    id: 1,
    title: 'Explicit Columns & Rows',
    desc: 'Grid defines explicit column tracks and row heights, ensuring precise multi-dimensional positioning.',
    category: 'CSS Grid Feature'
  },
  {
    id: 2,
    title: 'Fractional Units (fr)',
    desc: 'Using the fr unit distributes free space proportionally across grid columns without pixel calculations.',
    category: 'Sizing Units'
  },
  {
    id: 3,
    title: 'Auto-Fit & MinMax()',
    desc: 'Combines repeat(auto-fit, minmax(280px, 1fr)) to achieve fluid responsive layout without media query overload.',
    category: 'Responsiveness'
  },
  {
    id: 4,
    title: 'Grid Gap Spacing',
    desc: 'Separates rows and columns cleanly with gap property without margin collapsing issues.',
    category: 'Spacing Control'
  },
  {
    id: 5,
    title: 'Area Mapping',
    desc: 'Named grid-template-areas allow semantic positioning of headers, sidebars, and footers.',
    category: 'Layout Templates'
  },
  {
    id: 6,
    title: '2D Matrix Control',
    desc: 'Controls both horizontal rows and vertical columns simultaneously in a single container structure.',
    category: 'Architecture'
  }
];
