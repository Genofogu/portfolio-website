import React, { useEffect, useRef, useState } from 'react';
import '../../../styles/games/_PlatformRunner.scss'; // Reuse general arcade game styles


const StarShip = () => {
  const canvasRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(localStorage.getItem('starshipHighScore') || 0);

  const gameState = useRef({
    ship: { x: 200, y: 320, width: 30, height: 30, speed: 6 },
    asteroids: [],
    particles: [],
    keys: {},
    score: 0,
    asteroidTimer: 0,
    animationId: null,
  });

  const startGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const state = gameState.current;
    state.ship.x = canvas.width / 2 - state.ship.width / 2;
    state.ship.y = canvas.height - 60;
    state.asteroids = [];
    state.particles = [];
    state.score = 0;
    state.asteroidTimer = 0;

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
      // Ship movements
      if (state.keys['ArrowLeft'] || state.keys['KeyA']) {
        state.ship.x = Math.max(0, state.ship.x - state.ship.speed);
      }
      if (state.keys['ArrowRight'] || state.keys['KeyD']) {
        state.ship.x = Math.min(canvas.width - state.ship.width, state.ship.x + state.ship.speed);
      }
      if (state.keys['ArrowUp'] || state.keys['KeyW']) {
        state.ship.y = Math.max(0, state.ship.y - state.ship.speed);
      }
      if (state.keys['ArrowDown'] || state.keys['KeyS']) {
        state.ship.y = Math.min(canvas.height - state.ship.height, state.ship.y + state.ship.speed);
      }

      // Spawn Asteroids
      state.asteroidTimer++;
      const spawnRate = Math.max(10, 35 - Math.floor(state.score / 200) * 3);
      if (state.asteroidTimer > spawnRate) {
        state.asteroids.push({
          x: Math.random() * canvas.width,
          y: -30,
          radius: 10 + Math.random() * 20,
          speed: 3 + Math.random() * 4 + (state.score / 500),
          rotation: 0,
          rotSpeed: (Math.random() - 0.5) * 0.05
        });
        state.asteroidTimer = 0;
      }

      // Update Asteroids
      state.asteroids.forEach((ast, idx) => {
        ast.y += ast.speed;
        ast.rotation += ast.rotSpeed;

        // Collision Check (Circle to Box)
        const closestX = Math.max(state.ship.x, Math.min(ast.x, state.ship.x + state.ship.width));
        const closestY = Math.max(state.ship.y, Math.min(ast.y, state.ship.y + state.ship.height));
        const distX = ast.x - closestX;
        const distY = ast.y - closestY;
        const distance = Math.sqrt((distX * distX) + (distY * distY));

        if (distance < ast.radius) {
          triggerExplosion(ast.x, ast.y);
          triggerGameOver();
        }

        // Out of bounds
        if (ast.y - ast.radius > canvas.height) {
          state.asteroids.splice(idx, 1);
        }
      });

      // Update Particles
      state.particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.025;
        if (p.alpha <= 0) state.particles.splice(idx, 1);
      });

      // Increase Score
      state.score += 0.2;
      setScore(Math.floor(state.score));
    };

    const triggerExplosion = (x, y) => {
      for (let i = 0; i < 20; i++) {
        state.particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 8,
          vy: (Math.random() - 0.5) * 8,
          color: '#f97316',
          alpha: 1
        });
      }
    };

    const draw = () => {
      ctx.fillStyle = '#05050a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Starfield
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      for (let i = 0; i < 15; i++) {
        const sx = (i * 43) % canvas.width;
        const sy = (i * 29 + Date.now() / 25) % canvas.height;
        ctx.fillRect(sx, sy, 1, 1);
      }

      // Draw Ship (Gold themed rocket)
      ctx.fillStyle = '#fbbf24';
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(state.ship.x + state.ship.width / 2, state.ship.y);
      ctx.lineTo(state.ship.x, state.ship.y + state.ship.height);
      ctx.lineTo(state.ship.x + state.ship.width, state.ship.y + state.ship.height);
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = 0;

      // Engine spark
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(state.ship.x + state.ship.width / 2 - 3, state.ship.y + state.ship.height, 6, 4 + Math.random() * 4);

      // Draw Asteroids
      state.asteroids.forEach((ast) => {
        ctx.save();
        ctx.translate(ast.x, ast.y);
        ctx.rotate(ast.rotation);
        
        ctx.fillStyle = '#78716c';
        ctx.strokeStyle = '#a8a29e';
        ctx.lineWidth = 1.5;
        
        ctx.beginPath();
        // Draw jagged rock
        for (let j = 0; j < 8; j++) {
          const angle = (j / 8) * Math.PI * 2;
          const r = ast.radius * (0.8 + Math.random() * 0.3);
          const rx = Math.cos(angle) * r;
          const ry = Math.sin(angle) * r;
          if (j === 0) ctx.moveTo(rx, ry);
          else ctx.lineTo(rx, ry);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      });

      // Draw Particles
      state.particles.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    };

    const triggerGameOver = () => {
      cancelAnimationFrame(state.animationId);
      setGameOver(true);
      const finalS = Math.floor(state.score);
      const savedHigh = localStorage.getItem('starshipHighScore') || 0;
      if (finalS > savedHigh) {
        localStorage.setItem('starshipHighScore', finalS);
        setHighScore(finalS);
      }
    };

    const tick = () => {
      update();
      draw();
      state.animationId = requestAnimationFrame(tick);
    };

    tick();
  };

  useEffect(() => {
    startGame();

    const handleKeyDown = (e) => {
      const state = gameState.current;
      state.keys[e.code] = true;
      if (e.code === 'Space' && gameOver) {
        startGame();
      }
    };

    const handleKeyUp = (e) => {
      const state = gameState.current;
      state.keys[e.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      const state = gameState.current;
      if (state.animationId) cancelAnimationFrame(state.animationId);
    };
  }, [gameOver]);

  return (
    <div className="game-container">
      <h1>StarShip Asteroid Dodge</h1>
      <div className="game-score-board">
        <span>Score: {Math.floor(score)}</span>
        <span>High Score: {highScore}</span>
      </div>
      <div className="canvas-wrapper" style={{ position: 'relative', width: '400px', height: '400px', margin: '0 auto' }}>
        <canvas 
          ref={canvasRef} 
          width={400} 
          height={400} 
          style={{ border: '2px solid var(--color-border)', borderRadius: '8px', background: '#05050a' }}
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
            <h2 style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '2rem' }}>Ship Destroyed</h2>
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
              Relaunch (Space)
            </button>
          </div>
        )}
      </div>
      <p style={{ marginTop: '1rem', color: 'var(--color-text-secondary)' }}>Use WASD / Arrow Keys to fly the ship and dodge asteroids.</p>
    </div>
  );
};

export default StarShip;
