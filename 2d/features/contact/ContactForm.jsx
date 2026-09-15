import React, { useState } from 'react';

function ContactForm() {
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
        <label style={{ color: 'var(--color-text-secondary)' }}>Name</label>
        <input 
          type="text" 
          required 
          value={formData.name} 
          onChange={e => setFormData({...formData, name: e.target.value})} 
        />
      </div>

      <div className="input-group">
        <label style={{ color: 'var(--color-text-secondary)' }}>Email</label>
        <input 
          type="email" 
          required 
          value={formData.email} 
          onChange={e => setFormData({...formData, email: e.target.value})} 
        />
      </div>

      <div className="input-group">
        <label style={{ color: 'var(--color-text-secondary)' }}>Subject</label>
        <input 
          type="text" 
          required 
          value={formData.subject} 
          onChange={e => setFormData({...formData, subject: e.target.value})} 
        />
      </div>

      <div className="input-group">
        <label style={{ color: 'var(--color-text-secondary)' }}>Message</label>
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
  );
}

export default ContactForm;
