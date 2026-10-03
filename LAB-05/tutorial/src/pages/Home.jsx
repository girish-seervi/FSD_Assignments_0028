import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import { Globe, LayoutGrid, UserPlus, BookOpen, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div>
      <HeroSection />

      <section style={{ padding: '4rem 0', backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '0.75rem' }}>
              Explore Tutorial Modules
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--slate-600)', maxWidth: '600px', margin: '0 auto' }}>
              Select a module below to test interactive live demonstrations and master key web development concepts.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.75rem'
          }}>
            {modules.map((mod) => (
              <div
                key={mod.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--slate-200)',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all var(--transition-normal)'
                }}
              >
                <div>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: mod.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: mod.color,
                    marginBottom: '1.25rem'
                  }}>
                    {mod.icon}
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: mod.color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {mod.badge}
                  </span>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--slate-900)', margin: '0.4rem 0 0.75rem 0' }}>
                    {mod.title}
                  </h3>
                  <p style={{ fontSize: '0.92rem', color: 'var(--slate-600)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    {mod.description}
                  </p>
                </div>

                <Link
                  to={mod.path}
                  className="btn btn-outline"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    width: '100%',
                    padding: '0.7rem 1rem',
                    fontWeight: 600
                  }}
                >
                  Launch Module <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const modules = [
  {
    id: 'http',
    badge: 'Tutorial 1',
    title: 'HTTP Request-Response',
    description: 'Simulate GET, POST, PUT, and DELETE API requests using the native Fetch API with status code visualization.',
    icon: <Globe size={26} />,
    bgColor: 'var(--primary-50)',
    color: 'var(--primary-600)',
    path: '/http-demo'
  },
  {
    id: 'layouts',
    badge: 'Tutorial 2',
    title: 'Flexbox & CSS Grid',
    description: 'Interactive layout generator comparing CSS Flexbox alignment and CSS Grid template areas dynamically.',
    icon: <LayoutGrid size={26} />,
    bgColor: '#f0fdf4',
    color: '#16a34a',
    path: '/layouts'
  },
  {
    id: 'registration',
    badge: 'Tutorial 3',
    title: 'Student Registration',
    description: 'Dynamic React form with instant regex validation, state management, and real-time student ID card rendering.',
    icon: <UserPlus size={26} />,
    bgColor: '#fefce8',
    color: '#ca8a04',
    path: '/registration'
  },
  {
    id: 'concepts',
    badge: 'Tutorial 4',
    title: 'Concepts & Summary',
    description: 'Comprehensive breakdown of architectural concepts, component hierarchy, hooks usage, and learning outcomes.',
    icon: <BookOpen size={26} />,
    bgColor: '#faf5ff',
    color: '#9333ea',
    path: '/concepts'
  }
];
