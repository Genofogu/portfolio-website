import React from 'react';

function GoalWidget({ activeTasks, toggleTaskCompletion }) {
  return (
    <div className="glass-card goals-widget" style={{ padding: '1.5rem', flex: 1 }}>
      <h3 style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.1rem', color: 'var(--color-text-primary)' }}>
        Active Focus Goals
        <i className="fa-solid fa-bullseye" style={{ color: 'var(--color-accent-primary)' }}></i>
      </h3>
      {activeTasks.length === 0 ? (
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', textAlign: 'center', padding: '1rem 0' }}>
          No active goals. Add some in the Tasks tab!
        </p>
      ) : (
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {activeTasks.map(task => (
            <li key={task.id} style={{ display: 'flex', gap: '0.8rem', color: 'var(--color-text-secondary)', alignItems: 'center' }}>
              <input 
                type="checkbox" 
                checked={task.completed} 
                onChange={() => toggleTaskCompletion(task.id)}
                style={{ width: '16px', height: '16px', accentColor: 'var(--color-accent-primary)', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '0.95rem', color: 'var(--color-text-primary)' }}>{task.title}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GoalWidget;
