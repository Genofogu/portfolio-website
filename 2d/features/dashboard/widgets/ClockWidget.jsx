import React from 'react';
import useCurrentTime from '../../../hooks/useCurrentTime';

function ClockWidget() {
  const time = useCurrentTime();
  const hours = String(time.getHours()).padStart(2, '0');
  const minutes = String(time.getMinutes()).padStart(2, '0');
  const seconds = String(time.getSeconds()).padStart(2, '0');

  return (
    <div className="glass-card clock-widget" style={{ padding: '1.5rem', flex: 1, textAlign: 'center' }}>
      <h3 style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.1rem', color: 'var(--color-text-primary)' }}>
        Local Time
        <i className="fa-regular fa-clock" style={{ color: 'var(--color-accent-secondary)' }}></i>
      </h3>
      <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-accent-secondary)', fontFamily: 'JetBrains Mono, monospace' }}>
        {hours}:{minutes}<span style={{ fontSize: '1.5rem', opacity: 0.6, marginLeft: '0.2rem' }}>:{seconds}</span>
      </div>
      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>
        {time.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
      </p>
    </div>
  );
}

export default ClockWidget;
