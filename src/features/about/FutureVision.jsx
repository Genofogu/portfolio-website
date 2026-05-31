import React from 'react';

function FutureVision() {
  return (
    <div className="future-vision-content glass-card" style={{ padding: '2.5rem', marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'linear-gradient(135deg, color-mix(in srgb, var(--color-accent-primary) 10%, transparent), transparent)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <i className="fa-solid fa-rocket" style={{ fontSize: '3rem', color: 'var(--color-accent-secondary)' }}></i>
        <h3 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--color-text-primary)' }}>Product & Venture Philosophy</h3>
      </div>
      <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: 'var(--color-text-secondary)' }}>
        My ultimate goal is to pioneer Aetheris Labs—a modular ecosystem for next-generation developer tools and agentic applications. I believe the best digital experiences are built at the intersection of powerful AI backend agents, robust cloud automation, and fluid, intuitive user interfaces. I design with scalability in mind, using clean abstraction layers and responsive design principles.
      </p>
    </div>
  );
}

export default FutureVision;
