import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Clock,
  Inbox,
  CheckCircle2,
  PlusCircle,
  Store,
  Bell,
  ArrowRight,
  TrendingUp,
  Activity,
  Calendar,
  AlertCircle
} from 'lucide-react';
import StatisticsCard from '../components/StatisticsCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { userApi } from '../services/api';
import useAuth from '../hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const res = await userApi.getDashboard();
      if (res.success) {
        setDashboardData(res.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to load dashboard metrics.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) {
    return <LoadingSpinner label="Loading your personalized dashboard..." />;
  }

  const stats = dashboardData?.stats || {
    myListingsCount: 0,
    activeBorrowingsCount: 0,
    pendingRequestsCount: 0,
    completedTransactionsCount: 0
  };

  const recentActivity = dashboardData?.recentActivity || [];

  return (
    <div className="dashboard-content">
      {/* Welcome Banner */}
      <div className="dashboard-hero">
        <div className="dashboard-hero-pattern" />
        <div>
          <h1 className="dashboard-welcome-title">
            Welcome back, {user?.name || 'Student'}! 👋
          </h1>
          <p className="dashboard-welcome-sub">
            Track your items, respond to student requests, and borrow the tools you need for this semester.
          </p>
          <div style={{ marginTop: 16, display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.8125rem', color: '#93c5fd' }}>
            <span>{user?.college}</span> • <span>ID: {user?.studentId}</span>
          </div>
        </div>

        <Link
          to="/add-item"
          className="btn btn-primary"
          style={{
            backgroundColor: '#ffffff',
            color: 'var(--color-primary)',
            boxShadow: '0 4px 14px rgba(0,0,0,0.15)'
          }}
        >
          <PlusCircle size={18} /> List New Item
        </Link>
      </div>

      {error && (
        <div className="alert alert-error">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* 4 Statistics Cards */}
      <div className="dashboard-stats-grid">
        <Link to="/my-listings">
          <StatisticsCard
            title="My Listings"
            value={stats.myListingsCount}
            subtext="Items you are sharing"
            icon={Package}
            iconBg="#eff6ff"
            iconColor="#2563eb"
          />
        </Link>

        <Link to="/active-borrowings">
          <StatisticsCard
            title="Active Borrowings"
            value={stats.activeBorrowingsCount}
            subtext="Currently borrowed items"
            icon={Clock}
            iconBg="#ecfdf5"
            iconColor="#059669"
          />
        </Link>

        <Link to="/requests">
          <StatisticsCard
            title="Pending Requests"
            value={stats.pendingRequestsCount}
            subtext="Awaiting response"
            icon={Inbox}
            iconBg="#fffbeb"
            iconColor="#d97706"
          />
        </Link>

        <Link to="/requests">
          <StatisticsCard
            title="Completed Transactions"
            value={stats.completedTransactionsCount}
            subtext="Items safely returned"
            icon={CheckCircle2}
            iconBg="#f5f3ff"
            iconColor="#7c3aed"
          />
        </Link>
      </div>

      {/* Two Column Grid: Recent Activity & Quick Actions */}
      <div className="dashboard-sections-grid">
        {/* Recent Activity */}
        <div className="section-card">
          <div className="section-header">
            <h2 className="section-title">
              <Activity size={20} color="var(--color-accent)" />
              Recent Activity
            </h2>
            <Link to="/notifications" className="btn-ghost btn-sm" style={{ fontSize: '0.8125rem' }}>
              View All <ArrowRight size={14} />
            </Link>
          </div>

          {recentActivity.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '36px 16px', color: '#64748b', fontSize: '0.9rem' }}>
              No recent notifications or activity recorded yet.
            </div>
          ) : (
            <div className="activity-feed">
              {recentActivity.map((act) => (
                <div key={act.id} className="activity-item">
                  <div className="activity-icon">
                    <Bell size={18} />
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">{act.title}</div>
                    <div className="activity-desc">{act.description}</div>
                    <div className="activity-time">
                      <Calendar size={11} style={{ display: 'inline', marginRight: 4 }} />
                      {new Date(act.timestamp).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="section-card">
          <div className="section-header">
            <h2 className="section-title">
              <TrendingUp size={20} color="var(--color-accent)" />
              Quick Actions
            </h2>
          </div>

          <div className="quick-actions-list">
            <Link to="/add-item" className="quick-action-btn">
              <div className="quick-action-icon">
                <PlusCircle size={20} />
              </div>
              <div>
                <div>List an Item</div>
                <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 400 }}>
                  Share textbooks, lab coats or calculators
                </span>
              </div>
            </Link>

            <Link to="/marketplace" className="quick-action-btn">
              <div className="quick-action-icon">
                <Store size={20} />
              </div>
              <div>
                <div>Explore Marketplace</div>
                <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 400 }}>
                  Search and filter campus items
                </span>
              </div>
            </Link>

            <Link to="/requests" className="quick-action-btn">
              <div className="quick-action-icon">
                <Inbox size={20} />
              </div>
              <div>
                <div>View My Requests</div>
                <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 400 }}>
                  Manage incoming and sent loan requests
                </span>
              </div>
            </Link>

            <Link to="/active-borrowings" className="quick-action-btn">
              <div className="quick-action-icon">
                <Clock size={20} />
              </div>
              <div>
                <div>Active Borrowings</div>
                <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 400 }}>
                  Manage returns and due dates
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
