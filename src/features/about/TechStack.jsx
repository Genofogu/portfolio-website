import React from 'react';

function TechStack() {
  const skills = [
    { name: "Python", category: "Languages", icon: "fa-brands fa-python" },
    { name: "React", category: "Frontend", icon: "fa-brands fa-react" },
    { name: "TensorFlow", category: "AI/ML", icon: "fa-solid fa-brain" },
    { name: "AWS / GCP", category: "Cloud", icon: "fa-solid fa-cloud" },
    { name: "SQL & Databases", category: "Data", icon: "fa-solid fa-database" },
    { name: "Docker & CI/CD", category: "DevOps", icon: "fa-solid fa-server" }
  ];

  return (
    <div className="tech-stack-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
      {skills.map((skill, idx) => (
        <div key={idx} className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', padding: '1.5rem', textAlign: 'center' }}>
          <i className={skill.icon} style={{ fontSize: '2.5rem', color: 'var(--color-accent-primary)' }}></i>
          <h4 style={{ margin: '0.5rem 0 0.2rem 0', color: 'var(--color-text-primary)' }}>{skill.name}</h4>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{skill.category}</span>
        </div>
      ))}
    </div>
  );
}

export default TechStack;
