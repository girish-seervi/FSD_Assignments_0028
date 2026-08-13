import React from 'react';
import { BookOpen, Globe, Layout, LayoutGrid, Code, Zap, RefreshCw, CheckCircle2, Component } from 'lucide-react';

export default function ConceptsSection() {
  return (
    <section id="concepts" className="section-padding" style={{ backgroundColor: '#ffffff' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <BookOpen size={14} /> Tutorial Concepts Covered
          </div>
          <h2 className="section-title">
            Comprehensive <span className="gradient-text">Concept Matrix</span>
          </h2>
          <p className="section-subtitle">
            An overview of all eight web technology and React.js concepts implemented and demonstrated within this lab assignment submission.
          </p>
        </div>

        {/* 8 Concept Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
          gap: '1.5rem'
        }}>
          {conceptsList.map((item) => (
            <div key={item.id} className="portal-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: item.bg,
                    color: item.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {item.icon}
                  </div>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    color: 'var(--slate-400)',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    0{item.id}/08
                  </span>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '0.5rem' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--slate-600)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  {item.description}
                </p>
              </div>

              <div style={{
                backgroundColor: 'var(--slate-50)',
                border: '1px solid var(--slate-200)',
                padding: '0.6rem 0.8rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.78rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--primary-700)',
                wordBreak: 'break-all'
              }}>
                <strong>Implementation:</strong> {item.codeSnippet}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const conceptsList = [
  {
    id: 1,
    title: 'HTTP Request–Response Cycle',
    description: 'The process of a client sending an HTTP GET request to a remote web server and receiving a JSON response payload.',
    codeSnippet: 'fetch(url).then(res => res.json())',
    icon: <Globe size={22} />,
    bg: 'var(--primary-50)',
    color: 'var(--primary-600)'
  },
  {
    id: 2,
    title: 'Flexbox (Flexible Box Layout)',
    description: 'One-dimensional CSS layout model for aligning, distributing, and ordering items in rows or columns.',
    codeSnippet: 'display: flex; justify-content: space-between',
    icon: <Layout size={22} />,
    bg: '#f0fdf4',
    color: '#16a34a'
  },
  {
    id: 3,
    title: 'CSS Grid Layout',
    description: 'Two-dimensional grid system for creating structured responsive columns and rows across viewports.',
    codeSnippet: 'grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))',
    icon: <LayoutGrid size={22} />,
    bg: '#fefce8',
    color: '#ca8a04'
  },
  {
    id: 4,
    title: 'DOM Manipulation',
    description: 'Declaratively updating the Virtual DOM tree in React, reflecting state changes to actual browser UI node trees.',
    codeSnippet: 'React Virtual DOM reconciler',
    icon: <Code size={22} />,
    bg: '#faf5ff',
    color: '#9333ea'
  },
  {
    id: 5,
    title: 'Event Handling',
    description: 'Interacting with user events like input changes, button clicks, and form submissions using synthetic events.',
    codeSnippet: 'onChange={(e) => setFormData(...)}',
    icon: <Zap size={22} />,
    bg: '#fff1f2',
    color: '#e11d48'
  },
  {
    id: 6,
    title: 'Dynamic Updates',
    description: 'Updating application state dynamically to instantly trigger re-renders without full web page refreshes.',
    codeSnippet: 'setStudents(prev => [newStudent, ...prev])',
    icon: <RefreshCw size={22} />,
    bg: '#f0f9ff',
    color: '#0284c7'
  },
  {
    id: 7,
    title: 'Form Validation',
    description: 'Validating form fields against regex rules (required presence, email pattern, exact 10-digit phone number).',
    codeSnippet: '/^\\d{10}$/.test(phone)',
    icon: <CheckCircle2 size={22} />,
    bg: '#fdf2f8',
    color: '#db2777'
  },
  {
    id: 8,
    title: 'React Components',
    description: 'Modular, reusable UI blocks organized in a parent-child component tree passing props down cleanly.',
    codeSnippet: '<StudentCard student={student} />',
    icon: <Component size={22} />,
    bg: '#f5f3ff',
    color: '#7c3aed'
  }
];
