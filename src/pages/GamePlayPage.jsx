import React from 'react';
import { useParams, Link } from 'react-router-dom';
import CanvasJumper from '../components/UnityGame';
import RetroSnake from '../components/RetroSnake';
import SpaceShooter from '../components/SpaceShooter';
import DinoRunner from '../components/DinoRunner';

function GamePlayPage() {
  const { gameId } = useParams();

  const renderGame = () => {
    switch (gameId) {
      case 'canvas-jumper':
        return <CanvasJumper />;
      case 'snake':
        return <RetroSnake />;
      case 'space-shooter':
        return <SpaceShooter />;
      case 'dino-runner':
        return <DinoRunner />;
      default:
        return <h2>Game not found</h2>;
    }
  };

  return (
    <div className="game-play-page g-section">
      <div className="g-container">
        <div style={{ marginBottom: '2rem' }}>
          <Link to="/js-game" style={{ color: 'var(--color-text-secondary)' }}>
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

export default GamePlayPage;
