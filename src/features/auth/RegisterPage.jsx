import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { supabase } from '../../supabaseClient';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await signUp({ email, password });

    if (error) {
      setError(error.message);
    } else {
      alert('Registration successful! Please check your email to confirm your account.');
      navigate('/login');
    }

    setLoading(false);
  };

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
          <h1>Initialize Sandbox</h1>
          <p>Establish your unique Core ID credentials to trace workspace milestones, build custom modules, and record high scores.</p>
        </div>
      </div>

      {/* Right side: The Form */}
      <div className="auth-form-container">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Create Core ID</h2>
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
              minLength="6"
            />
          </div>
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Initializing ID...' : 'Initialize Core ID'}
          </button>
          <p className="auth-switch">
            Already registered? <Link to="/login">Access Uplink</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;