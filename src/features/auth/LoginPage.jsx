import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { supabase } from '../../supabaseClient'; // Import supabase for social login

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  // Email/Password Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await signIn({ email, password });
    if (error) {
      setError(error.message);
    } else {
      navigate('/'); // Redirect to homepage on successful login
    }
    setLoading(false);
  };

  // Social Login Handler (same as in RegisterPage)
  const handleSocialLogin = async (provider) => {
    setError('');
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) setError(error.message);
  };

  return (
    <div className="auth-container-split">
      {/* Left side: The Welcome Slide */}
      <div className="welcome-slide">
        <div className="welcome-content">
          <h1>Uplink Control</h1>
          <p>Establish connection to compile project datasets, synchronize Vespera productivity metrics, and launch terminal integrations.</p>
        </div>
      </div>

      {/* Right side: The Form */}
      <div className="auth-form-container">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Access Uplink</h2>
          {error && <p className="auth-error">{error}</p>}
          
          <div className="social-logins">
            <button type="button" onClick={() => handleSocialLogin('google')} className="social-button google">
              <i className="fa-brands fa-google"></i> Continue with Google
            </button>
            <button type="button" onClick={() => handleSocialLogin('github')} className="social-button github">
              <i className="fa-brands fa-github"></i> Continue with GitHub
            </button>
          </div>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Logging In...' : 'Log In with Email'}
          </button>
          <p className="auth-switch">
            Need sandbox access? <Link to="/register">Initialize Core ID</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;