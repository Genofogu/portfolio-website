import React from 'react';
import { Link } from 'react-router-dom';

function GameCard({ game }) {
  return (
    <div className="game-card glass-card" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="game-thumb" style={{ backgroundImage: `url(${game.thumbnail})`, height: '180px', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
        {game.inDevelopment && (
          <span className="dev-badge" style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(234, 88, 12, 0.9)', color: '#fff', fontSize: '0.75rem', padding: '0.25rem 0.6rem', borderRadius: '4px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px', boxShadow: '0 2px 8px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }}>
            Coming Soon
          </span>
        )}
        <div className="game-play-overlay">
          <Link to={game.inDevelopment ? "/coming-soon" : `/js-game/${game.id}`} className="play-button">
            <i className={game.inDevelopment ? "fa-solid fa-wrench" : "fa-solid fa-play"}></i>
          </Link>
        </div>
      </div>
      <div className="game-info" style={{ padding: '1.25rem' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>{game.title}</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '1rem', minHeight: '40px' }}>{game.description}</p>
        <div className="game-stats" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: 'var(--color-text-muted)', borderTop: '1px solid var(--color-border)', paddingTop: '0.8rem' }}>
          <span>
            <i className="fa-solid fa-trophy" style={{ color: 'var(--color-accent-primary)', marginRight: '5px' }}></i> High Score: {localStorage.getItem(game.highScoreKey) || 0}
          </span>
          <div style={{ display: 'flex', gap: '0.8rem', fontSize: '1.05rem', alignItems: 'center' }}>
            <Link to="/github" title="Repository Source" className="game-action-link" style={{ color: 'var(--color-text-muted)', transition: 'color 0.2s' }}>
              <i className="fa-brands fa-github"></i>
            </Link>
            <Link to={game.inDevelopment ? "/coming-soon" : `/js-game/${game.id}`} title={game.inDevelopment ? "Under Development" : "Play Game"} className="game-action-link" style={{ color: 'var(--color-text-muted)', transition: 'color 0.2s' }}>
              <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameCard;
