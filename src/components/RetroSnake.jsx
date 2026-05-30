import React, { useEffect, useRef, useState } from 'react';
import '../styles/components/_UnityGame.scss'; // Reuse arcade game styles

const RetroSnake = () => {
  const canvasRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(localStorage.getItem('snakeHighScore') || 0);

  const gameState = useRef({
    snake: [{ x: 10, y: 10 }],
    direction: { x: 1, y: 0 },
    nextDirection: { x: 1, y: 0 },
    food: { x: 5, y: 5 },
    gridSize: 20,
    tileCount: 20,
    gameInterval: null,
    score: 0,
  });

  const generateFood = (state) => {
    let newFood;
    let onSnake = true;
    while (onSnake) {
      newFood = {
        x: Math.floor(Math.random() * state.tileCount),
        y: Math.floor(Math.random() * state.tileCount),
      };
      onSnake = state.snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
    }
    state.food = newFood;
  };

  const startGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const state = gameState.current;
    
    state.snake = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ];
    state.direction = { x: 1, y: 0 };
    state.nextDirection = { x: 1, y: 0 };
    state.score = 0;
    setScore(0);
    setGameOver(false);
    generateFood(state);

    if (state.gameInterval) clearInterval(state.gameInterval);
    
    state.gameInterval = setInterval(() => {
      // Update direction to prevent double-press self-collision
      state.direction = state.nextDirection;

      // Calculate new head
      const head = {
        x: state.snake[0].x + state.direction.x,
        y: state.snake[0].y + state.direction.y
      };

      // Collision check with walls or self
      const hitWall = head.x < 0 || head.x >= state.tileCount || head.y < 0 || head.y >= state.tileCount;
      const hitSelf = state.snake.some(segment => segment.x === head.x && segment.y === head.y);

      if (hitWall || hitSelf) {
        clearInterval(state.gameInterval);
        setGameOver(true);
        const savedHigh = localStorage.getItem('snakeHighScore') || 0;
        if (state.score > savedHigh) {
          localStorage.setItem('snakeHighScore', state.score);
          setHighScore(state.score);
        }
        return;
      }

      // Add new head
      state.snake.unshift(head);

      // Check food collision
      if (head.x === state.food.x && head.y === state.food.y) {
        state.score += 10;
        setScore(state.score);
        generateFood(state);
      } else {
        // Remove tail if didn't eat food
        state.snake.pop();
      }

      // Render
      ctx.fillStyle = '#0f172a'; // Background matching theme
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid lines subtly
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= state.tileCount; i++) {
        ctx.beginPath();
        ctx.moveTo(i * state.gridSize, 0);
        ctx.lineTo(i * state.gridSize, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * state.gridSize);
        ctx.lineTo(canvas.width, i * state.gridSize);
        ctx.stroke();
      }

      // Draw Food
      ctx.fillStyle = '#ef4444'; // Red food
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(
        state.food.x * state.gridSize + state.gridSize / 2,
        state.food.y * state.gridSize + state.gridSize / 2,
        state.gridSize / 2 - 2,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.shadowBlur = 0; // Reset shadow

      // Draw Snake
      state.snake.forEach((segment, index) => {
        const isHead = index === 0;
        ctx.fillStyle = isHead ? '#10b981' : '#34d399'; // Emerald themed green
        ctx.fillRect(
          segment.x * state.gridSize + 1,
          segment.y * state.gridSize + 1,
          state.gridSize - 2,
          state.gridSize - 2
        );

        // Snake eyes
        if (isHead) {
          ctx.fillStyle = '#0f172a';
          if (state.direction.x !== 0) {
            ctx.fillRect(segment.x * state.gridSize + 12, segment.y * state.gridSize + 4, 3, 3);
            ctx.fillRect(segment.x * state.gridSize + 12, segment.y * state.gridSize + 12, 3, 3);
          } else {
            ctx.fillRect(segment.x * state.gridSize + 4, segment.y * state.gridSize + 12, 3, 3);
            ctx.fillRect(segment.x * state.gridSize + 12, segment.y * state.gridSize + 12, 3, 3);
          }
        }
      });

    }, 100);
  };

  useEffect(() => {
    startGame();

    const handleKeyDown = (e) => {
      const state = gameState.current;
      switch (e.code) {
        case 'ArrowUp':
        case 'KeyW':
          if (state.direction.y === 0) state.nextDirection = { x: 0, y: -1 };
          break;
        case 'ArrowDown':
        case 'KeyS':
          if (state.direction.y === 0) state.nextDirection = { x: 0, y: 1 };
          break;
        case 'ArrowLeft':
        case 'KeyA':
          if (state.direction.x === 0) state.nextDirection = { x: -1, y: 0 };
          break;
        case 'ArrowRight':
        case 'KeyD':
          if (state.direction.x === 0) state.nextDirection = { x: 1, y: 0 };
          break;
        case 'Space':
          if (gameOver) {
            startGame();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      const state = gameState.current;
      if (state.gameInterval) clearInterval(state.gameInterval);
    };
  }, [gameOver]);

  return (
    <div className="game-container">
      <h1>Retro Snake Game</h1>
      <div className="game-score-board">
        <span>Score: {score}</span>
        <span>High Score: {highScore}</span>
      </div>
      <div className="canvas-wrapper" style={{ position: 'relative', width: '400px', height: '400px', margin: '0 auto' }}>
        <canvas 
          ref={canvasRef} 
          width={400} 
          height={400} 
          style={{ border: '2px solid var(--color-border)', borderRadius: '8px', background: '#0f172a' }}
        />
        {gameOver && (
          <div className="game-overlay" style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(2, 6, 23, 0.85)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '8px',
            color: 'white'
          }}>
            <h2 style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '2rem' }}>Game Over</h2>
            <p style={{ marginBottom: '1.5rem' }}>Final Score: {score}</p>
            <button 
              onClick={startGame} 
              style={{
                background: 'var(--color-accent-primary)',
                color: 'var(--color-background)',
                border: 'none',
                padding: '0.8rem 1.8rem',
                borderRadius: '6px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Restart (Space)
            </button>
          </div>
        )}
      </div>
      <p style={{ marginTop: '1rem', color: 'var(--color-text-secondary)' }}>Use Arrow keys or WASD to navigate.</p>
    </div>
  );
};

export default RetroSnake;
