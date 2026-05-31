import React from 'react';

function ScoreBoard() {
  const gamesList = [
    { title: "Canvas Jumper", key: "highScore" },
    { title: "Retro Snake", key: "snakeHighScore" },
    { title: "Space Shooter", key: "spaceHighScore" },
    { title: "Dino Runner", key: "dinoHighScore" },
    { title: "StarShip Dodge", key: "starshipHighScore" }
  ];

  return (
    <div className="glass-card scoreboard-widget" style={{ padding: '1.5rem', flex: 1 }}>
      <h3 style={{ marginBottom: '1.2rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-text-primary)' }}>
        <i className="fa-solid fa-trophy" style={{ color: 'var(--color-accent-secondary)' }}></i>
        Your High Scores
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        {gamesList.map((g, idx) => (
          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: idx < gamesList.length - 1 ? '1px solid var(--color-border)' : 'none', paddingBottom: '0.5rem' }}>
            <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>{g.title}</span>
            <span style={{ fontWeight: 'bold', color: 'var(--color-accent-secondary)', fontSize: '1.05rem' }}>{localStorage.getItem(g.key) || 0}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScoreBoard;
