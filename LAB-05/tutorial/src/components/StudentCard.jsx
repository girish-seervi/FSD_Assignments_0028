import React from 'react';
import { User, Mail, Phone, BookOpen, Clock, Trash2, CheckCircle2 } from 'lucide-react';

export default function StudentCard({ student, onDelete }) {
  const { id, fullName, email, phone, course, timestamp } = student;

  return (
    <div className="portal-card" style={{
      borderLeft: '5px solid var(--primary-600)',
      position: 'relative',
      backgroundColor: '#ffffff'
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            backgroundColor: 'var(--primary-100)',
            color: 'var(--primary-700)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '1rem'
          }}>
            {fullName ? fullName.charAt(0).toUpperCase() : 'S'}
          </div>
          <div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--slate-900)' }}>
              {fullName}
            </h4>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '0.2rem 0.5rem',
              backgroundColor: 'var(--primary-50)',
              color: 'var(--primary-700)',
              borderRadius: 'var(--radius-full)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              marginTop: '0.2rem'
            }}>
              <BookOpen size={12} /> {course}
            </span>
          </div>
        </div>

        {onDelete && (
          <button
            onClick={() => onDelete(id)}
            title="Remove record"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--slate-400)',
              cursor: 'pointer',
              padding: '0.3rem',
              borderRadius: 'var(--radius-sm)',
              transition: 'color var(--transition-fast)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--error-500)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--slate-400)'}
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '0.75rem',
        padding: '0.85rem',
        backgroundColor: 'var(--slate-50)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--slate-200)',
        fontSize: '0.85rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--slate-700)' }}>
          <Mail size={14} color="var(--primary-600)" />
          <span style={{ wordBreak: 'break-all' }}>{email}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--slate-700)' }}>
          <Phone size={14} color="var(--primary-600)" />
          <span>+91 {phone}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--slate-500)', fontSize: '0.78rem' }}>
          <Clock size={14} />
          <span>Registered: {timestamp}</span>
        </div>
      </div>
    </div>
  );
}
