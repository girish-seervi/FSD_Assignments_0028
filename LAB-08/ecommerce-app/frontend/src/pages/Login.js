import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Empty fields not allowed');
      return;
    }
    
    // Simple email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Valid email format required');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await api.post('/login', { email, password });
      login(response.data);
      
      const from = location.state?.from || '/products';
      navigate(from, { replace: true });
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container login-container">
      <div className="login-box">
        <h2>Sign In</h2>
        {location.state?.message && <div className="alert-info">{location.state.message}</div>}
        {error && <div className="error-msg alert" style={{marginBottom: '1rem', color: '#dc2626', background: '#fef2f2', padding: '0.75rem', borderRadius: '6px', border: '1px solid #fecaca'}}>{error}</div>}
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="user@electromart.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="123456"
            />
          </div>
          <button type="submit" className="login-btn btn-primary" disabled={loading} style={{width: '100%', padding: '0.85rem', border: 'none', borderRadius: '8px', fontSize: '1.1rem'}}>
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
