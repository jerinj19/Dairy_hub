import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Milk, Mail, Lock, User, ArrowLeft } from 'lucide-react';
import './Auth.css';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setGeneralError(null);

    if (password !== confirmPassword) {
      setErrors({ confirmPassword: ['Passwords do not match.'] });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
          confirm_password: confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setLoading(false);
        alert('Registration successful! Please login with your new account.');
        navigate('/login');
      } else {
        setLoading(false);
        // Django REST framework returns errors in field key array pairs (e.g. { username: ["A user with that name exists."] })
        // If there's a non-field error, it might be in 'non_field_errors' or direct message
        if (data.non_field_errors) {
          setGeneralError(data.non_field_errors.join(' '));
        } else if (typeof data === 'object') {
          setErrors(data);
        } else {
          setGeneralError('Registration failed. Please check your details and try again.');
        }
      }
    } catch (err) {
      setLoading(false);
      setGeneralError('Failed to connect to the backend server. Make sure the server is running.');
      console.error('Registration error:', err);
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
          <h2>Create Account</h2>
          <p>Register today to get fresh dairy products delivered to your door</p>
        </div>

        {generalError && (
          <div className="auth-error-banner">
            {generalError}
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
            {errors.username && <span className="field-error">{errors.username.join(' ')}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <Mail className="input-icon" />
              <input 
                type="email" 
                id="email" 
                placeholder="you@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                disabled={loading}
              />
            </div>
            {errors.email && <span className="field-error">{errors.email.join(' ')}</span>}
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
            {errors.password && <span className="field-error">{errors.password.join(' ')}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input 
                type="password" 
                id="confirmPassword" 
                placeholder="••••••••" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required 
                disabled={loading}
              />
            </div>
            {errors.confirmPassword && <span className="field-error">{errors.confirmPassword.join(' ')}</span>}
          </div>

          <button type="submit" className="btn-auth" disabled={loading}>
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Login Here</Link></p>
        </div>
      </div>
    </div>
  );
}
