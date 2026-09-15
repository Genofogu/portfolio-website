import React, { useEffect, useRef, useState } from 'react';
import '../../../styles/games/_PlatformRunner.scss';


const DinoRunner = () => {
  const canvasRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(localStorage.getItem('dinoHighScore') || 0);

  const gameState = useRef({
    dino: { x: 50, y: 300, width: 30, height: 40, velocityY: 0, gravity: 0.8, jumpForce: -13, isGrounded: true },
    obstacles: [],
    groundY: 340,
    score: 0,
    speed: 6,
    spawnTimer: 0,
    animationId: null,
  });

  const startGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const state = gameState.current;
    state.dino.y = state.groundY - state.dino.height;
    state.dino.velocityY = 0;
    state.dino.isGrounded = true;
    state.obstacles = [];
    state.score = 0;
    state.speed = 6;
    state.spawnTimer = 0;

    setScore(0);
    setGameOver(false);

    if (state.animationId) cancelAnimationFrame(state.animationId);
    runGameLoop();
  };

  const runGameLoop = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const state = gameState.current;

    const update = () => {
      // Dino Jump Physics
      if (!state.dino.isGrounded) {
        state.dino.velocityY += state.dino.gravity;
        state.dino.y += state.dino.velocityY;

        // Ground check
        if (state.dino.y >= state.groundY - state.dino.height) {
          state.dino.y = state.groundY - state.dino.height;
          state.dino.velocityY = 0;
          state.dino.isGrounded = true;
        }
      }

      // Spawn Obstacles
      state.spawnTimer++;
      const minInterval = 60;
      const randomExtra = Math.random() * 80;
      if (state.spawnTimer > minInterval + randomExtra) {
        const height = 25 + Math.random() * 25;
        state.obstacles.push({
          x: canvas.width,
          y: state.groundY - height,
          width: 15 + Math.random() * 10,
          height: height
        });
        state.spawnTimer = 0;
      }

      // Update Obstacles
      state.obstacles.forEach((obs, idx) => {
        obs.x -= state.speed;

        // Check Collision
        if (
          state.dino.x < obs.x + obs.width &&
          state.dino.x + state.dino.width > obs.x &&
          state.dino.y < obs.y + obs.height &&
          state.dino.y + state.dino.height > obs.y
        ) {
          triggerGameOver();
        }

        // Remove out-of-bounds obstacles
        if (obs.x + obs.width < 0) {
          state.obstacles.splice(idx, 1);
        }
      });

      // Increase Speed & Score
      state.score += 0.15; // Speed independent tick
      setScore(Math.floor(state.score));
      state.speed = 6 + Math.floor(state.score / 100) * 0.5;
    };

    const draw = () => {
      // Background
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Ground
      ctx.strokeStyle = 'var(--color-border)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, state.groundY);
      ctx.lineTo(canvas.width, state.groundY);
      ctx.stroke();

      // Draw Dino (Amber/Gold color matching themes)
      ctx.fillStyle = '#f59e0b';
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 8;
      ctx.fillRect(state.dino.x, state.dino.y, state.dino.width, state.dino.height);
      
      // Dino eye and tiny details
      ctx.fillStyle = '#000000';
      ctx.fillRect(state.dino.x + 20, state.dino.y + 8, 3, 3);
      ctx.fillStyle = '#f59e0b';

      ctx.shadowBlur = 0;

      // Draw Obstacles (Cacti - Crimson red style)
      state.obstacles.forEach((obs) => {
        ctx.fillStyle = '#ef4444';
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 8;
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
        
        // Cactus branch effects
        ctx.fillRect(obs.x - 4, obs.y + obs.height * 0.3, 4, 8);
        ctx.fillRect(obs.x + obs.width, obs.y + obs.height * 0.4, 4, 8);
      });
      ctx.shadowBlur = 0;
    };

    const triggerGameOver = () => {
      cancelAnimationFrame(state.animationId);
      setGameOver(true);
      const finalS = Math.floor(state.score);
      const savedHigh = localStorage.getItem('dinoHighScore') || 0;
      if (finalS > savedHigh) {
        localStorage.setItem('dinoHighScore', finalS);
        setHighScore(finalS);
      }
    };

    const tick = () => {
      update();
      draw();
      if (state.dino.y < state.groundY) { // force loop if in mid-jump to avoid frozen frames
        // continue
      }
      state.animationId = requestAnimationFrame(tick);
    };

    tick();
  };

  useEffect(() => {
    startGame();

    const handleKeyDown = (e) => {
      const state = gameState.current;
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
        if (gameOver) {
          startGame();
        } else if (state.dino.isGrounded) {
          state.dino.velocityY = state.dino.jumpForce;
          state.dino.isGrounded = false;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      const state = gameState.current;
      if (state.animationId) cancelAnimationFrame(state.animationId);
    };
  }, [gameOver]);

  return (
    <div className="game-container">
      <h1>Retro Dino Runner</h1>
      <div className="game-score-board">
        <span>Score: {Math.floor(score)}</span>
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
            <h2 style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '2rem' }}>Crash! Game Over</h2>
            <p style={{ marginBottom: '1.5rem' }}>Final Score: {Math.floor(score)}</p>
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
      <p style={{ marginTop: '1rem', color: 'var(--color-text-secondary)' }}>Press SPACE, W, or UP Arrow to jump.</p>
    </div>
  );
};

export default DinoRunner;
