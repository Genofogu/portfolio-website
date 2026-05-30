import React, { useEffect, useRef, useState } from 'react';
import '../styles/components/_UnityGame.scss';

const SpaceShooter = () => {
  const canvasRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [highScore, setHighScore] = useState(localStorage.getItem('spaceHighScore') || 0);

  const gameState = useRef({
    player: { x: 200, y: 350, width: 30, height: 20, speed: 6 },
    bullets: [],
    enemies: [],
    particles: [],
    keys: {},
    score: 0,
    lives: 3,
    enemySpawnTimer: 0,
    lastShotTime: 0,
    animationId: null,
  });

  const startGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const state = gameState.current;
    state.player.x = canvas.width / 2 - state.player.width / 2;
    state.player.y = canvas.height - 40;
    state.bullets = [];
    state.enemies = [];
    state.particles = [];
    state.score = 0;
    state.lives = 3;
    state.enemySpawnTimer = 0;
    state.lastShotTime = 0;

    setScore(0);
    setLives(3);
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
      // Move Player
      if (state.keys['ArrowLeft'] || state.keys['KeyA']) {
        state.player.x = Math.max(0, state.player.x - state.player.speed);
      }
      if (state.keys['ArrowRight'] || state.keys['KeyD']) {
        state.player.x = Math.min(canvas.width - state.player.width, state.player.x + state.player.speed);
      }

      // Shoot Bullet
      if (state.keys['Space']) {
        const now = Date.now();
        if (now - state.lastShotTime > 250) {
          state.bullets.push({
            x: state.player.x + state.player.width / 2 - 2,
            y: state.player.y - 10,
            width: 4,
            height: 12,
            speed: 8
          });
          state.lastShotTime = now;
        }
      }

      // Update Bullets
      state.bullets.forEach((b, idx) => {
        b.y -= b.speed;
        if (b.y < 0) state.bullets.splice(idx, 1);
      });

      // Spawn Enemies
      state.enemySpawnTimer++;
      const spawnInterval = Math.max(20, 60 - Math.floor(state.score / 100) * 3);
      if (state.enemySpawnTimer > spawnInterval) {
        state.enemies.push({
          x: Math.random() * (canvas.width - 24),
          y: -20,
          width: 24,
          height: 20,
          speed: 2 + Math.random() * 1.5 + (state.score / 200),
          color: `hsl(${Math.random() * 360}, 80%, 60%)`
        });
        state.enemySpawnTimer = 0;
      }

      // Update Enemies
      state.enemies.forEach((e, eIdx) => {
        e.y += e.speed;
        
        // Enemy out of bounds
        if (e.y > canvas.height) {
          state.enemies.splice(eIdx, 1);
          state.lives--;
          setLives(state.lives);
          if (state.lives <= 0) {
            triggerGameOver();
          }
        }

        // Collision: Enemy with Player
        if (
          e.x < state.player.x + state.player.width &&
          e.x + e.width > state.player.x &&
          e.y < state.player.y + state.player.height &&
          e.y + e.height > state.player.y
        ) {
          state.enemies.splice(eIdx, 1);
          createExplosion(e.x + e.width / 2, e.y + e.height / 2, e.color);
          state.lives--;
          setLives(state.lives);
          if (state.lives <= 0) {
            triggerGameOver();
          }
        }
      });

      // Collisions: Bullets with Enemies
      state.bullets.forEach((b, bIdx) => {
        state.enemies.forEach((e, eIdx) => {
          if (
            b.x < e.x + e.width &&
            b.x + b.width > e.x &&
            b.y < e.y + e.height &&
            b.y + b.height > e.y
          ) {
            state.bullets.splice(bIdx, 1);
            state.enemies.splice(eIdx, 1);
            createExplosion(e.x + e.width / 2, e.y + e.height / 2, e.color);
            state.score += 10;
            setScore(state.score);
          }
        });
      });

      // Update Particles
      state.particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.02;
        if (p.alpha <= 0) state.particles.splice(idx, 1);
      });
    };

    const createExplosion = (x, y, color) => {
      for (let i = 0; i < 15; i++) {
        state.particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6,
          radius: Math.random() * 3 + 1,
          color,
          alpha: 1
        });
      }
    };

    const draw = () => {
      // Clear
      ctx.fillStyle = '#0b0f19'; // Cosmic dark background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Starfield effect
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      for (let i = 0; i < 20; i++) {
        const sx = (i * 37) % canvas.width;
        const sy = (i * 19 + Date.now() / 15) % canvas.height;
        ctx.fillRect(sx, sy, 1.5, 1.5);
      }

      // Draw Player Ship (Cyan Glowing Triangle)
      ctx.fillStyle = '#0ea5e9';
      ctx.shadowColor = '#0ea5e9';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(state.player.x + state.player.width / 2, state.player.y);
      ctx.lineTo(state.player.x, state.player.y + state.player.height);
      ctx.lineTo(state.player.x + state.player.width, state.player.y + state.player.height);
      ctx.closePath();
      ctx.fill();

      // Engine Flame
      ctx.fillStyle = '#f97316';
      ctx.beginPath();
      ctx.moveTo(state.player.x + state.player.width / 2 - 4, state.player.y + state.player.height);
      ctx.lineTo(state.player.x + state.player.width / 2, state.player.y + state.player.height + 8 + Math.random() * 4);
      ctx.lineTo(state.player.x + state.player.width / 2 + 4, state.player.y + state.player.height);
      ctx.closePath();
      ctx.fill();

      ctx.shadowBlur = 0; // Reset glows

      // Draw Bullets (Red Laser lines)
      ctx.fillStyle = '#f43f5e';
      ctx.shadowColor = '#f43f5e';
      ctx.shadowBlur = 8;
      state.bullets.forEach((b) => {
        ctx.fillRect(b.x, b.y, b.width, b.height);
      });
      ctx.shadowBlur = 0;

      // Draw Enemies (Alien Invader shapes)
      state.enemies.forEach((e) => {
        ctx.fillStyle = e.color;
        ctx.shadowColor = e.color;
        ctx.shadowBlur = 6;
        
        // Draw alien body
        ctx.fillRect(e.x + 4, e.y, e.width - 8, e.height);
        ctx.fillRect(e.x, e.y + 4, e.width, e.height - 8);
        
        // Draw antenas/eyes
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(e.x + 4, e.y + 6, 3, 3);
        ctx.fillRect(e.x + e.width - 7, e.y + 6, 3, 3);
      });
      ctx.shadowBlur = 0;

      // Draw Explosion Particles
      state.particles.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    };

    const triggerGameOver = () => {
      cancelAnimationFrame(state.animationId);
      setGameOver(true);
      const savedHigh = localStorage.getItem('spaceHighScore') || 0;
      if (state.score > savedHigh) {
        localStorage.setItem('spaceHighScore', state.score);
        setHighScore(state.score);
      }
    };

    const tick = () => {
      if (state.lives <= 0) return;
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
      <h1>Space Shooter</h1>
      <div className="game-score-board">
        <span>Score: {score}</span>
        <span>Lives: {Array.from({ length: Math.max(0, lives) }).map((_, i) => '❤️').join(' ')}</span>
        <span>High Score: {highScore}</span>
      </div>
      <div className="canvas-wrapper" style={{ position: 'relative', width: '400px', height: '400px', margin: '0 auto' }}>
        <canvas 
          ref={canvasRef} 
          width={400} 
          height={400} 
          style={{ border: '2px solid var(--color-border)', borderRadius: '8px', background: '#0b0f19' }}
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
            <h2 style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '2rem' }}>Mission Failed</h2>
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
              Relaunch (Space)
            </button>
          </div>
        )}
      </div>
      <p style={{ marginTop: '1rem', color: 'var(--color-text-secondary)' }}>Use A/D or Left/Right arrow to move. Hold SPACE to fire.</p>
    </div>
  );
};

export default SpaceShooter;
