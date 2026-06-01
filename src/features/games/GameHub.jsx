import React from 'react';
import GameCard from './ui/GameCard';
import Leaderboard from './ui/Leaderboard';
import ScoreBoard from './ui/ScoreBoard';

const gamesList = [
  {
    id: "canvas-jumper",
    title: "Canvas Jumper",
    description: "A fast-paced endless runner. Jump over platforms, grab power-ups, and survive.",
    thumbnail: "/placeholders/jumper-bg.png",
    highScoreKey: "highScore",
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
    title: "Dino Runner",
    description: "The classic pixel dinosaur running and obstacle-jumping game.",
    thumbnail: "/placeholders/dino-bg.png",
    highScoreKey: "dinoHighScore",
  },
  {
    id: "starship",
    title: "StarShip Dodge",
    description: "Dodge falling asteroids in deep space with your custom starship.",
    thumbnail: "/placeholders/space-bg.png",
    highScoreKey: "starshipHighScore",
  },
  {
    id: "multiplayer-chess",
    title: "Multiplayer Chess",
    description: "Real-time online chess matches with custom timer configurations and voice links.",
    thumbnail: "/placeholders/chess-bg.png",
    highScoreKey: "chessHighScore",
    inDevelopment: true
  },
  {
    id: "space-rogue-3d",
    title: "3D Space Rogue",
    description: "Explore procedurally-generated asteroid fields and engage in space tactical battles.",
    thumbnail: "/placeholders/rogue-bg.png",
    highScoreKey: "rogueHighScore",
    inDevelopment: true
  }
];

function GameHub() {
  return (
    <div className="game-hub-page g-section">
      <div className="g-container">
        <header className="game-hub-header" style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h1 className="gradient-text">Arcade Hub</h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>A collection of custom-built canvas HTML5 games. Pure JavaScript, zero dependencies.</p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          <div className="game-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', alignContent: 'start', gridColumn: 'span 2' }}>
            {gamesList.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', gridColumn: 'span 1' }}>
            <ScoreBoard />
            <Leaderboard />
          </div>

        </div>
      </div>
    </div>
  );
}

export default GameHub;
