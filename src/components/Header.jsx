import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';

function Header() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/projects', label: 'Projects' },
    { to: '/playground', label: 'Playground' },
    { to: '/js-game', label: 'Games' },
    { to: '/scheduler', label: 'Scheduler' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <header className="site-header">
        <div className="site-header__wrapper">
          <Link to="/" className="site-header__logo">
            <span className="logo-text">Geno</span>
            <span className="logo-dot">.</span>
          </Link>
          
          <div className="site-header__actions">
            <nav className="site-header__nav site-header__nav--desktop">
              {navLinks.map(link => (
                <Link 
                  key={link.to} 
                  to={link.to}
                  className={location.pathname === link.to ? 'active' : ''}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {user ? (
              <button onClick={handleSignOut} className="header-button">Logout</button>
            ) : (
              <Link to="/login" className="header-button">Login</Link>
            )}

            <ThemeToggle />

            {/* Burger Menu Button */}
            <button 
              className={`burger-btn ${isMobileMenuOpen ? 'is-open' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className="burger-line"></span>
              <span className="burger-line"></span>
              <span className="burger-line"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`mobile-overlay ${isMobileMenuOpen ? 'is-visible' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      
      {/* Mobile Slide-in Menu */}
      <nav className={`mobile-nav ${isMobileMenuOpen ? 'is-open' : ''}`}>
        <div className="mobile-nav__header">
          <span className="mobile-nav__title">Menu</span>
          <button 
            className="mobile-nav__close"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="mobile-nav__links">
          {navLinks.map((link, i) => (
            <Link 
              key={link.to} 
              to={link.to}
              className={`mobile-nav__link ${location.pathname === link.to ? 'active' : ''}`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="mobile-nav__footer">
          <p>Built by Geno</p>
        </div>
      </nav>
    </>
  );
}

export default Header;