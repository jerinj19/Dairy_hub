import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Milk, Lock, User, ArrowLeft } from 'lucide-react';
import './Auth.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Simple JWT returns access & refresh tokens
        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);
        localStorage.setItem('username', username);

        // Notify Navbar of the authentication state change
        window.dispatchEvent(new Event('authChange'));

        setLoading(false);
        navigate('/');
      } else {
        setLoading(false);
        // Show validation error (often 'detail' key contains error message in Simple JWT)
        setErrorMsg(data.detail || 'Invalid username or password. Please try again.');
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg('Failed to connect to the backend server. Make sure the server is running.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="auth-page">
      <Link to="/" className="back-home">
        <ArrowLeft className="icon" /> Back to Home
      </Link>
      
      <div className="auth-card">
        <div className="auth-header">
          <Milk className="auth-logo" />
          <h2>Welcome Back</h2>
          <p>Login to manage your subscriptions and orders</p>
        </div>

        {errorMsg && (
          <div className="auth-error-banner">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="input-wrapper">
              <User className="input-icon" />
              <input 
                type="text" 
                id="username" 
                placeholder="dairylover" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required 
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input 
                type="password" 
                id="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                disabled={loading}
              />
            </div>
          </div>

          <button type="submit" className="btn-auth" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <Link to="/register">Register Here</Link></p>
        </div>
      </div>
    </div>
  );
}
