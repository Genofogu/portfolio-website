import React, { useState } from 'react';

function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate send
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 6000); // Hide after 6s
    }, 1500);
  };

  return (
    <div className="contact-page g-section">
      <div className="g-container">
        
        <header className="contact-header">
          <h1 className="gradient-text">Let's Build Something Together.</h1>
          <p>Whether it's an AI breakthrough, a cloud infrastructure overhaul, or building the next big platform, I'm ready for the challenge.</p>
        </header>

        <div className="contact-layout">
          
          <div className="contact-info">
            <div className="glass-card mb-2">
              <h3>Currently Open For</h3>
              <ul className="info-list">
                <li><i className="fa-solid fa-robot"></i> AI / ML Engineering Roles</li>
                <li><i className="fa-solid fa-server"></i> Cloud Platform Architecture</li>
                <li><i className="fa-solid fa-code"></i> Full-Stack App Development</li>
                <li><i className="fa-solid fa-lightbulb"></i> Startup Collaborations</li>
              </ul>
            </div>

            <div className="glass-card mb-2">
              <h3>Current Learning Focus</h3>
              <div className="badge-grid">
                <span className="badge">Advanced RAG</span>
                <span className="badge">AWS Certified</span>
                <span className="badge">GCP Architect</span>
                <span className="badge">Agentic Workflows</span>
                <span className="badge">Next.js 15</span>
              </div>
            </div>

            <div className="glass-card social-links">
              <h3>Connect</h3>
              <div className="social-grid">
                <a href="https://github.com/genofogu" target="_blank" rel="noreferrer"><i className="fa-brands fa-github"></i> GitHub</a>
                <a href="https://linkedin.com/in/genofogu" target="_blank" rel="noreferrer"><i className="fa-brands fa-linkedin"></i> LinkedIn</a>
                <a href="https://instagram.com/genofogu" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram"></i> Instagram</a>
                <a href="mailto:anugaur300@gmail.com"><i className="fa-solid fa-envelope"></i> Email</a>
              </div>
            </div>
          </div>

          <form className="contact-form glass-card" onSubmit={handleSubmit}>
            <h3>Send a Message</h3>
            
            {submitted && (
              <div className="contact-success-banner" style={{
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid #10b981',
                color: '#10b981',
                padding: '0.8rem 1rem',
                borderRadius: '6px',
                marginBottom: '1.5rem',
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                animation: 'fadeInDown 0.3s ease'
              }}>
                <i className="fa-solid fa-circle-check"></i>
                <span>Message sent! I will get back to you soon.</span>
              </div>
            )}
            
            <div className="input-group">
              <label>Name</label>
              <input 
                type="text" 
                required 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input 
                type="email" 
                required 
                value={formData.email} 
                onChange={e => setFormData({...formData, email: e.target.value})} 
              />
            </div>

            <div className="input-group">
              <label>Subject</label>
              <input 
                type="text" 
                required 
                value={formData.subject} 
                onChange={e => setFormData({...formData, subject: e.target.value})} 
              />
            </div>

            <div className="input-group">
              <label>Message</label>
              <textarea 
                required 
                rows="5"
                value={formData.message} 
                onChange={e => setFormData({...formData, message: e.target.value})} 
              ></textarea>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'} <i className="fa-solid fa-paper-plane"></i>
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

export default ContactPage;