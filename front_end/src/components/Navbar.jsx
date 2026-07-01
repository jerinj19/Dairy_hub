import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Milk, ShoppingCart, Menu, X } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  // Load session from localStorage on mount and periodically check
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('username');
      setUsername(storedUser);
    };

    checkAuth();
    // Listen for storage events (if login happens in another tab)
    window.addEventListener('storage', checkAuth);
    // Listen for custom login events triggered on the same tab
    window.addEventListener('authChange', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('authChange', checkAuth);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem('refresh');

    // Instantly wipe tokens from client storage to keep UI response fast
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('username');
    setUsername(null);
    
    // Trigger custom event to notify other components of authentication change
    window.dispatchEvent(new Event('authChange'));
    navigate('/');

    // Send blacklisting call to backend in background
    if (refreshToken) {
      try {
        await fetch('http://localhost:8000/api/logout/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            refresh: refreshToken
          })
        });
      } catch (err) {
        console.error('Failed to blacklist refresh token on server logout:', err);
      }
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="nav-logo" onClick={() => setMobileMenuOpen(false)}>
          <Milk className="logo-icon" />
          <span>Dairy<span className="logo-accent">Hub</span></span>
        </Link>

        {/* Desktop Menu */}
        <div className="nav-menu">
          <Link to="/" className="nav-link">Home</Link>
          <a href="#about" className="nav-link">About Us</a>
          <a href="#sales" className="nav-link">Sales & Offers</a>
          <a href="#products" className="nav-link">Our Products</a>
        </div>

        {/* Action Buttons */}
        <div className="nav-actions">
          <button className="icon-btn" aria-label="Cart">
            <ShoppingCart className="icon" />
            <span className="cart-badge">2</span>
          </button>
          
          {username ? (
            <div className="nav-auth-profile">
              <span className="welcome-msg">Hello, <strong>{username}</strong></span>
              <button onClick={handleLogout} className="btn btn-secondary">
                Logout
              </button>
            </div>
          ) : (
            <div className="nav-auth-buttons">
              <button onClick={() => navigate('/login')} className="btn btn-secondary">
                Login
              </button>
              <button onClick={() => navigate('/register')} className="btn btn-primary">
                Register
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="icon" /> : <Menu className="icon" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <Link to="/" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <a href="#about" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>About Us</a>
          <a href="#sales" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Sales & Offers</a>
          <a href="#products" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Our Products</a>
          <div className="mobile-auth">
            {username ? (
              <>
                <span className="mobile-welcome-msg">Hello, <strong>{username}</strong></span>
                <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="btn btn-secondary w-full">
                  Logout
                </button>
              </>
            ) : (
              <>
                <button onClick={() => { navigate('/login'); setMobileMenuOpen(false); }} className="btn btn-secondary w-full">
                  Login
                </button>
                <button onClick={() => { navigate('/register'); setMobileMenuOpen(false); }} className="btn btn-primary w-full">
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
