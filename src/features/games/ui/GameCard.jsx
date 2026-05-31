import React from 'react';
import { Link } from 'react-router-dom';

function GameCard({ game }) {
  return (
    <div className="game-card glass-card">
      <div className="game-thumb" style={{ backgroundImage: `url(${game.thumbnail})`, height: '180px', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
        <div className="game-play-overlay">
          <Link to={`/js-game/${game.id}`} className="play-button">
            <i className="fa-solid fa-play"></i>
          </Link>
        </div>
      </div>
      <div className="game-info" style={{ padding: '1.25rem' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>{game.title}</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '1rem', minHeight: '40px' }}>{game.description}</p>
        <div className="game-stats" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--color-text-muted)', borderTop: '1px solid var(--color-border)', paddingTop: '0.8rem' }}>
          <span>
            <i className="fa-solid fa-trophy" style={{ color: 'var(--color-accent-primary)', marginRight: '5px' }}></i> Local High Score: {localStorage.getItem(game.highScoreKey) || 0}
          </span>
        </div>
      </div>
    </div>
  );
}

export default GameCard;
