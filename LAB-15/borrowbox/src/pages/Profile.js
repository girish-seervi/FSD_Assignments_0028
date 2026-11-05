import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  IdCard,
  Building,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Save,
  Trophy
} from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import { userApi } from '../services/api';
import useAuth from '../hooks/useAuth';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Editable Form Fields
  const [formData, setFormData] = useState({
    fullName: '',
    college: '',
    studentId: ''
  });
  const [saving, setSaving] = useState(false);

  const fetchProfileAndLeaderboard = async () => {
    try {
      setLoading(true);
      setError('');
      const [profRes, leadRes] = await Promise.all([
        userApi.getProfile(),
        userApi.getLeaderboard()
      ]);

      if (profRes.success) {
        setProfileData(profRes.data);
        setFormData({
          fullName: profRes.data.name || '',
          college: profRes.data.college || '',
          studentId: profRes.data.studentId || ''
        });
      }

      if (leadRes.success) {
        setLeaderboard(leadRes.data || []);
      }
    } catch (err) {
      setError(err.message || 'Failed to load profile details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileAndLeaderboard();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSuccessMsg('');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccessMsg('');

    try {
      const res = await userApi.updateProfile(formData);
      if (res.success) {
        updateUser(res.data);
        setProfileData((prev) => ({ ...prev, ...res.data }));
        setSuccessMsg('Your profile information has been saved successfully!');
      }
    } catch (err) {
      setError(err.message || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  if (loading) {
    return <LoadingSpinner label="Loading student profile details..." />;
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <User size={26} color="var(--color-accent)" /> Student Profile
        </h1>
        <p className="page-subtitle">
          Manage your verified campus credentials and view your community sharing record
        </p>
      </div>

      {successMsg && (
        <div className="alert alert-success">
          <CheckCircle2 size={18} />
          <span>{successMsg}</span>
        </div>
      )}

      {error && (
        <div className="alert alert-error">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      <div className="profile-card">
        {/* Profile Avatar & Header */}
        <div className="profile-header-banner">
          <div className="profile-avatar-large">
            {getInitials(profileData?.name)}
          </div>
          <div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-primary)' }}>
              {profileData?.name}
            </h2>
            <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9375rem', marginTop: 2 }}>
              {profileData?.college}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: '0.8125rem', color: '#94a3b8', marginTop: 8 }}>
              <span>ID: {profileData?.studentId}</span>
              <span>•</span>
              <span>
                <Calendar size={13} style={{ display: 'inline', marginRight: 4 }} />
                Member since {new Date(profileData?.createdAt || Date.now()).toLocaleDateString(undefined, {
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Profile Sharing Statistics Counters */}
        <div className="profile-stats-row">
          <div className="profile-stat-box">
            <div className="profile-stat-num">{profileData?.myListingsCount || 0}</div>
            <div className="profile-stat-text">Active Items Listed</div>
          </div>

          <div className="profile-stat-box">
            <div className="profile-stat-num">{profileData?.successfulLendsCount || 0}</div>
            <div className="profile-stat-text">Items Lent to Peers</div>
          </div>

          <div className="profile-stat-box">
            <div className="profile-stat-num">{profileData?.successfulBorrowingsCount || 0}</div>
            <div className="profile-stat-text">Total Successful Loans</div>
          </div>
        </div>

        {/* Edit Profile Form */}
        <form onSubmit={handleSave} className="auth-form">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary)', borderBottom: '1px solid #e2e8f0', paddingBottom: 8, marginBottom: 16 }}>
            Edit Account Information
          </h3>

          <div className="form-group">
            <label className="form-label" htmlFor="fullName">
              Full Legal Name
            </label>
            <div className="form-input-wrapper">
              <User size={18} className="form-input-icon" />
              <input
                id="fullName"
                name="fullName"
                type="text"
                className="form-input"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Campus Email (Verified — Cannot be changed)
            </label>
            <div className="form-input-wrapper">
              <Mail size={18} className="form-input-icon" />
              <input
                id="email"
                type="email"
                className="form-input"
                value={profileData?.email || ''}
                disabled
                style={{ backgroundColor: '#f1f5f9', cursor: 'not-allowed', color: '#64748b' }}
              />
            </div>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
              University policy requires verified academic email domains to protect campus security.
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="form-group">
              <label className="form-label" htmlFor="studentId">
                Student ID
              </label>
              <div className="form-input-wrapper">
                <IdCard size={18} className="form-input-icon" />
                <input
                  id="studentId"
                  name="studentId"
                  type="text"
                  className="form-input"
                  value={formData.studentId}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="college">
                College / Department
              </label>
              <div className="form-input-wrapper">
                <Building size={18} className="form-input-icon" />
                <input
                  id="college"
                  name="college"
                  type="text"
                  className="form-input"
                  value={formData.college}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={saving}
            >
              <Save size={16} /> {saving ? 'Saving...' : 'Save Profile Changes'}
            </button>
          </div>
        </form>

        {/* Bonus Feature C: Campus Leaderboard */}
        <div style={{ marginTop: 40, borderTop: '1px solid #e2e8f0', paddingTop: 24 }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <Trophy size={20} color="#f59e0b" /> Campus Sharing Honor Roll (Leaderboard)
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: 16 }}>
            Top contributors who have shared and returned the most resources for fellow students.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {leaderboard.slice(0, 5).map((entry, index) => (
              <div
                key={entry.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  backgroundColor: entry.id === user?.id ? '#eef2ff' : '#f8fafc',
                  border: entry.id === user?.id ? '1px solid #c7d2fe' : '1px solid #e2e8f0',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: '50%',
                      backgroundColor: index === 0 ? '#fef3c7' : index === 1 ? '#e2e8f0' : '#fed7aa',
                      color: index === 0 ? '#b45309' : index === 1 ? '#475569' : '#9a3412',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    #{index + 1}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-primary)' }}>
                      {entry.name} {entry.id === user?.id && <span style={{ color: '#4f46e5', fontSize: '0.75rem' }}>(You)</span>}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                      {entry.college}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, color: 'var(--color-primary)', fontSize: '0.95rem' }}>
                    {entry.score} pts
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    {entry.itemsCount} items • {entry.successfulLends} completed loans
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
