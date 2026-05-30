import React from 'react';
import { NavLink, Link } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="scheduler-sidebar" style={{ borderRight: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
      <div className="sidebar-logo" style={{ padding: '2rem 1.5rem', borderBottom: '1px solid var(--color-border)' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-text-primary)' }}>
          <i className="fa-solid fa-arrow-left" style={{ fontSize: '1rem', color: 'var(--color-text-secondary)' }}></i>
          <h2 style={{ fontSize: '1.2rem' }}>Productivity Hub</h2>
        </Link>
      </div>
      
      <nav className="sidebar-nav" style={{ padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <NavLink 
          to="/scheduler" end
          style={({isActive}) => ({
            display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem 1rem', borderRadius: '8px',
            color: isActive ? 'var(--color-accent-primary)' : 'var(--color-text-secondary)',
            backgroundColor: isActive ? 'color-mix(in srgb, var(--color-accent-primary) 10%, transparent)' : 'transparent',
            fontWeight: isActive ? '600' : '400',
            textDecoration: 'none'
          })}
        >
          <i className="fa-solid fa-table-columns"></i>
          <span>Dashboard</span>
        </NavLink>
        <NavLink 
          to="/scheduler/tasks"
          style={({isActive}) => ({
            display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem 1rem', borderRadius: '8px',
            color: isActive ? 'var(--color-accent-primary)' : 'var(--color-text-secondary)',
            backgroundColor: isActive ? 'color-mix(in srgb, var(--color-accent-primary) 10%, transparent)' : 'transparent',
            fontWeight: isActive ? '600' : '400',
            textDecoration: 'none'
          })}
        >
          <i className="fa-solid fa-list-check"></i>
          <span>All Tasks</span>
        </NavLink>
        <NavLink 
          to="/scheduler/stats"
          style={({isActive}) => ({
            display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem 1rem', borderRadius: '8px',
            color: isActive ? 'var(--color-accent-primary)' : 'var(--color-text-secondary)',
            backgroundColor: isActive ? 'color-mix(in srgb, var(--color-accent-primary) 10%, transparent)' : 'transparent',
            fontWeight: isActive ? '600' : '400',
            textDecoration: 'none'
          })}
        >
          <i className="fa-solid fa-chart-line"></i>
          <span>Statistics</span>
        </NavLink>
      </nav>

      <div style={{ padding: '2rem 1.5rem', marginTop: 'auto' }}>
        <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
          <i className="fa-solid fa-bolt" style={{ color: 'var(--color-accent-secondary)', fontSize: '2rem', marginBottom: '1rem' }}></i>
          <h4 style={{ color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>SoulWake Pro</h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Advanced AI Insights</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;