import React from 'react';
import { useWeatherData } from '../../../hooks/useWeatherData';

function WeatherWidget() {
  const weather = useWeatherData();
  return (
    <div className="glass-card weather-widget" style={{ padding: '1.5rem', flex: 1 }}>
      <h3 style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.1rem', color: 'var(--color-text-primary)' }}>
        Weather Environment
        <i className="fa-solid fa-cloud-sun-rain" style={{ color: 'var(--color-accent-primary)' }}></i>
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{weather.temperature}°C</span>
        <span style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)' }}>{weather.condition} in {weather.city}</span>
        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.3rem' }}>
          <i className="fa-solid fa-moon"></i> Moon Phase: {weather.moonPhase}
        </span>
      </div>
    </div>
  );
}

export default WeatherWidget;
