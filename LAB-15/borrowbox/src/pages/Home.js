import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Search,
  Calendar,
  Repeat,
  CheckCircle
} from 'lucide-react';
import CategoryCard from '../components/CategoryCard';
import ItemCard from '../components/ItemCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { itemApi, userApi } from '../services/api';
import useAuth from '../hooks/useAuth';

const CATEGORIES = [
  'Books & Notes',
  'Electronics',
  'Stationery',
  'Sports Equipment',
  'Lab Equipment',
  'Accessories',
  'Others'
];

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [featuredItems, setFeaturedItems] = useState([]);
  const [stats, setStats] = useState({
    totalItemsShared: 0,
    activeStudents: 0,
    successfulBorrowings: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [itemsRes, statsRes] = await Promise.all([
          itemApi.getAll({ limit: 4, availability: 'Available' }),
          userApi.getPlatformStats()
        ]);

        if (itemsRes.success) {
          setFeaturedItems(itemsRes.data || []);
        }
        if (statsRes.success) {
          setStats(statsRes.data);
        }
      } catch (err) {
        console.error('Failed to load landing page data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/marketplace?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="landing-page">
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="container hero-grid">
          <div>
            <div className="hero-pill">
              <Sparkles size={16} /> Campus Sharing Economy
            </div>
            <h1 className="hero-heading">
              Everything You Need, <br />
              <span style={{ color: 'var(--color-accent)' }}>Just a Borrow Away.</span>
            </h1>
            <p className="hero-subheading">
              Discover, share and borrow useful items within your campus community.
              Save money, reduce waste and help fellow students succeed together.
            </p>

            <div className="hero-cta-group">
              <Link to="/marketplace" className="btn btn-primary btn-lg">
                Explore Items <ArrowRight size={18} />
              </Link>
              <Link
                to={isAuthenticated ? '/add-item' : '/register'}
                className="btn btn-secondary btn-lg"
              >
                Start Sharing
              </Link>
            </div>
          </div>

          {/* Hero Showcase Illustration */}
          <div className="hero-showcase">
            <div className="showcase-main-card">
              <div className="showcase-floating-badge">Verified Students Only</div>
              <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', height: 210, marginBottom: 16 }}>
                <img
                  src="https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=800&q=80"
                  alt="TI-84 Graphing Calculator"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span className="item-card-category-badge">Electronics</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                  Graphing Calculators & Lab Gear
                </h3>
                <span className="badge badge-free">Free to Borrow</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>
                Skip paying $120+ for exam calculators or $50 for lab goggles you only need for one semester.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS SECTION */}
      <section className="how-it-works-section" id="how-it-works">
        <div className="container">
          <div className="section-intro">
            <span className="section-badge">Simple 3-Step Process</span>
            <h2 className="section-headline">How BorrowBox Works</h2>
            <p style={{ color: 'var(--color-text-muted)' }}>
              A peer-to-peer sharing workflow designed specifically for campus schedules and trust.
            </p>
          </div>

          <div className="steps-grid">
            {/* Step 1 */}
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-icon-wrap">
                <Search size={30} />
              </div>
              <h3 className="step-title">Find an Item</h3>
              <p className="step-desc">
                Discover textbooks, scientific calculators, sports gear, lab coats and tech accessories shared by students around campus.
              </p>
            </div>

            {/* Step 2 */}
            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-icon-wrap">
                <Calendar size={30} />
              </div>
              <h3 className="step-title">Send a Request</h3>
              <p className="step-desc">
                Select your required start and return dates. The lender reviews and accepts your request through their dashboard.
              </p>
            </div>

            {/* Step 3 */}
            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-icon-wrap">
                <Repeat size={30} />
              </div>
              <h3 className="step-title">Borrow & Return</h3>
              <p className="step-desc">
                Meet at designated campus pickup hubs. Use the item, return it on time, and build your trusted campus borrowing reputation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CATEGORIES SECTION */}
      <section style={{ padding: '60px 0', backgroundColor: 'var(--color-bg)' }}>
        <div className="container">
          <div className="section-intro">
            <span className="section-badge">Browse By Needs</span>
            <h2 className="section-headline">Explore Categories</h2>
            <p style={{ color: 'var(--color-text-muted)' }}>
              Everything essential for your academic semesters and student life.
            </p>
          </div>

          <div className="categories-grid">
            {CATEGORIES.map((cat) => (
              <CategoryCard
                key={cat}
                category={cat}
                onClick={handleCategoryClick}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED ITEMS SECTION */}
      <section style={{ padding: '70px 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <span className="section-badge">Available Now</span>
              <h2 className="section-headline" style={{ marginBottom: 0 }}>Featured Campus Listings</h2>
            </div>
            <Link to="/marketplace" className="btn btn-secondary btn-sm">
              View All Marketplace <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <LoadingSpinner label="Loading featured listings..." />
          ) : featuredItems.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#64748b', padding: '30px 0' }}>
              No available items listed at the moment. Be the first to share!
            </p>
          ) : (
            <div className="items-grid">
              {featuredItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. STATISTICS SECTION (DYNAMICALLY CALCULATED FROM BACKEND) */}
      <section className="stats-strip-section">
        <div className="container">
          <div className="stats-strip-grid">
            <div>
              <div className="stat-strip-number">{stats.totalItemsShared || 10}+</div>
              <div className="stat-strip-label">Total Items Shared</div>
            </div>
            <div>
              <div className="stat-strip-number">{stats.activeStudents || 3}+</div>
              <div className="stat-strip-label">Active Campus Students</div>
            </div>
            <div>
              <div className="stat-strip-number">{stats.successfulBorrowings || 1}+</div>
              <div className="stat-strip-label">Successful Borrowings</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CAMPUS TRUST & SAFETY PLEDGE */}
      <section style={{ padding: '70px 0', backgroundColor: 'var(--color-bg)' }}>
        <div className="container">
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-xl)',
              padding: '40px',
              border: '1px solid var(--color-border)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 32,
              alignItems: 'center'
            }}
          >
            <div>
              <span className="section-badge">Trust & Community</span>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: 12 }}>
                Safe, Transparent & University Verified
              </h3>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: 20 }}>
                Every BorrowBox member is registered with their official student credentials and college department. Meet up safely at campus libraries, student unions, and academic study pods.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.9rem', color: 'var(--color-text-main)' }}>
                  <CheckCircle size={18} color="#10b981" /> Verified student IDs and department affiliations
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.9rem', color: 'var(--color-text-main)' }}>
                  <CheckCircle size={18} color="#10b981" /> Transparent item condition grades and pickup locations
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.9rem', color: 'var(--color-text-main)' }}>
                  <CheckCircle size={18} color="#10b981" /> Zero hidden platform fees or transaction markups
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ background: '#f8fafc', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: 700, color: 'var(--color-primary)', marginBottom: 4 }}>
                  "Saved $130 on a graphing calculator"
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                  "I only needed a TI-84 for my semester calculus exams. Borrowing it from a senior engineering student was fast and effortless!"
                </p>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-accent)', marginTop: 8 }}>
                  — Engineering Sophomore
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: 700, color: 'var(--color-primary)', marginBottom: 4 }}>
                  "My unused lab coat helped three classmates"
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                  "My lab coat was just hanging in my dorm closet. BorrowBox made it super easy to lend it out responsibly."
                </p>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-accent)', marginTop: 8 }}>
                  — Chemistry Senior
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
