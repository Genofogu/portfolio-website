import React from 'react';
import { Link } from 'react-router-dom';

const gamesList = [
  {
    id: "canvas-jumper",
    title: "Canvas Jumper",
    description: "A fast-paced endless runner. Jump over obstacles, grab power-ups, and survive.",
    thumbnail: "/placeholders/jumper-bg.png",
    highScoreKey: "highScore", // Use same key as existing UnityGame logic
  },
  {
    id: "snake",
    title: "Retro Snake",
    description: "Classic Nokia-style snake game. Eat the apples, don't hit the walls.",
    thumbnail: "/placeholders/snake-bg.png",
    highScoreKey: "snakeHighScore",
  },
  {
    id: "space-shooter",
    title: "Space Shooter",
    description: "Defend against the alien invasion in this classic arcade shooter.",
    thumbnail: "/placeholders/space-bg.png",
    highScoreKey: "spaceHighScore",
  },
  {
    id: "dino-runner",
    title: "Dino Clone",
    description: "No internet? No problem. The classic dinosaur running game.",
    thumbnail: "/placeholders/dino-bg.png",
    highScoreKey: "dinoHighScore",
  }
];

function JsGamePage() {
  return (
    <div className="game-hub-page g-section">
      <div className="g-container">
        <header className="game-hub-header">
          <h1>Arcade Hub</h1>
          <p>A collection of custom-built canvas HTML5 games. No iframes, pure JavaScript.</p>
          <small style={{ color: 'var(--color-accent-primary)' }}>
            <i className="fa-solid fa-code-merge"></i> // TODO: Integrate Supabase for global leaderboards
          </small>
        </header>

        <div className="game-grid">
          {gamesList.map((game) => (
            <div key={game.id} className="game-card glass-card">
              <div className="game-thumb" style={{ backgroundImage: `url(${game.thumbnail})` }}>
                <div className="game-play-overlay">
                  <Link to={`/js-game/${game.id}`} className="play-button">
                    <i className="fa-solid fa-play"></i>
                  </Link>
                </div>
              </div>
              <div className="game-info">
                <h3>{game.title}</h3>
                <p>{game.description}</p>
                <div className="game-stats">
                  <span>
                    <i className="fa-solid fa-trophy"></i> Local High Score: 
                    {localStorage.getItem(game.highScoreKey) || 0}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default JsGamePage;