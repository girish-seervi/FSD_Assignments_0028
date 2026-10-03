import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home as HomeIcon, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div style={{
      padding: '6rem 1rem',
      textAlign: 'center',
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8fafc'
    }}>
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        backgroundColor: '#fef2f2',
        color: '#ef4444',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.5rem',
        border: '1px solid #fee2e2'
      }}>
        <AlertTriangle size={36} />
      </div>

      <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--slate-900)', margin: '0 0 0.5rem 0' }}>
        404
      </h1>

      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--slate-800)', marginBottom: '1rem' }}>
        Page Not Found
      </h2>

      <p style={{ fontSize: '1.05rem', color: 'var(--slate-600)', maxWidth: '480px', marginBottom: '2rem', lineHeight: 1.6 }}>
        The route you are trying to access does not exist or has been moved. Use the options below to navigate back to the tutorial portal.
      </p>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem' }}>
          <HomeIcon size={18} /> Return to Home
        </Link>
        <button onClick={() => window.history.back()} className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem' }}>
          <ArrowLeft size={18} /> Go Back
        </button>
      </div>
    </div>
  );
}
