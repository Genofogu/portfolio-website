import React from 'react';

function StatsWidget({ tasks, habits }) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="glass-card stats-widget" style={{ padding: '1.5rem', flex: 1 }}>
      <h3 style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.1rem', color: 'var(--color-text-primary)' }}>
        Completion Rate
        <i className="fa-solid fa-chart-line" style={{ color: 'var(--color-accent-tertiary)' }}></i>
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'center', padding: '0.5rem 0' }}>
        <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-accent-tertiary)' }}>{rate}%</span>
        <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
          {completed} of {total} tasks completed
        </span>
      </div>
    </div>
  );
}

export default StatsWidget;
