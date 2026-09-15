import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PlatformRunner from './games/PlatformRunner';
import RetroSnake from './games/RetroSnake';
import SpaceShooter from './games/SpaceShooter';
import DinoRunner from './games/DinoRunner';
import StarShip from './games/StarShip';

function GamePage() {
  const { gameId } = useParams();

  const renderGame = () => {
    switch (gameId) {
      case 'canvas-jumper':
        return <PlatformRunner />;
      case 'snake':
        return <RetroSnake />;
      case 'space-shooter':
        return <SpaceShooter />;
      case 'dino-runner':
        return <DinoRunner />;
      case 'starship':
        return <StarShip />;
      default:
        return <h2>Game not found</h2>;
    }
  };

  return (
    <div className="game-play-page g-section">
      <div className="g-container">
        <div style={{ marginBottom: '2rem' }}>
          <Link to="/js-game" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>
            <i className="fa-solid fa-arrow-left"></i> Back to Arcade
          </Link>
        </div>
        
        <div className="game-render-container">
          {renderGame()}
        </div>
      </div>
    </div>
  );
}

export default GamePage;
