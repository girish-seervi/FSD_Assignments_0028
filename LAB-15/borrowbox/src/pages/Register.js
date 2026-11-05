import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  UserPlus,
  User,
  Mail,
  IdCard,
  Building,
  Lock,
  AlertCircle
} from 'lucide-react';
import useAuth from '../hooks/useAuth';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    studentId: '',
    college: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email format (e.g. name@campus.edu).';
    }

    if (!formData.studentId.trim()) {
      newErrors.studentId = 'Student ID number is required.';
    }

    if (!formData.college.trim()) {
      newErrors.college = 'College or department name is required.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setServerError('');

    try {
      await register(formData);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setServerError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ maxWidth: 580 }}>
        <div className="auth-header">
          <div className="auth-logo-badge">
            <UserPlus size={26} />
          </div>
          <h2 className="auth-title">Create Student Account</h2>
          <p className="auth-subtitle">
            Join the campus sharing network with your university credentials
          </p>
        </div>

        {serverError && (
          <div className="alert alert-error">
            <AlertCircle size={18} />
            <span>{serverError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {/* Full Name */}
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
                className={`form-input ${errors.fullName ? 'error' : ''}`}
                placeholder="e.g. Jordan Miller"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            {errors.fullName && <div className="form-error-msg">{errors.fullName}</div>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Campus Email Address
            </label>
            <div className="form-input-wrapper">
              <Mail size={18} className="form-input-icon" />
              <input
                id="email"
                name="email"
                type="email"
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="jordan.m@university.edu"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            {errors.email && <div className="form-error-msg">{errors.email}</div>}
          </div>

          {/* Student ID & College side-by-side */}
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
                  className={`form-input ${errors.studentId ? 'error' : ''}`}
                  placeholder="STU2025099"
                  value={formData.studentId}
                  onChange={handleChange}
                />
              </div>
              {errors.studentId && <div className="form-error-msg">{errors.studentId}</div>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="college">
                College / Faculty
              </label>
              <div className="form-input-wrapper">
                <Building size={18} className="form-input-icon" />
                <input
                  id="college"
                  name="college"
                  type="text"
                  className={`form-input ${errors.college ? 'error' : ''}`}
                  placeholder="School of Computing"
                  value={formData.college}
                  onChange={handleChange}
                />
              </div>
              {errors.college && <div className="form-error-msg">{errors.college}</div>}
            </div>
          </div>

          {/* Password & Confirm Password side-by-side */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password (min 8 chars)
              </label>
              <div className="form-input-wrapper">
                <Lock size={18} className="form-input-icon" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              {errors.password && <div className="form-error-msg">{errors.password}</div>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div className="form-input-wrapper">
                <Lock size={18} className="form-input-icon" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              {errors.confirmPassword && (
                <div className="form-error-msg">{errors.confirmPassword}</div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={loading}
            style={{ width: '100%', marginTop: 8 }}
          >
            {loading ? 'Creating Account...' : 'Register as Campus Member'}
          </button>
        </form>

        <div className="auth-footer">
          Already registered?{' '}
          <Link to="/login" className="auth-link">
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
