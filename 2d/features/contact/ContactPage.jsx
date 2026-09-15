import React from 'react';
import ContactForm from './ContactForm';
import SocialLinks from './SocialLinks';

function ContactPage() {
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
                <li><i className="fa-solid fa-lightbulb"></i> Venture Collaborations</li>
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

            <SocialLinks />
          </div>

          <ContactForm />

        </div>
      </div>
    </div>
  );
}

export default ContactPage;
