import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  // Create an array for the 128 bubbles
  const bubbles = Array.from({ length: 128 }, (_, i) => {
    const style = {
      '--size': `${2 + Math.random() * 4}rem`,
      '--distance': `${6 + Math.random() * 4}rem`,
      '--position': `${-5 + Math.random() * 110}%`,
      '--time': `${2 + Math.random() * 2}s`,
      '--delay': `${-1 * (2 + Math.random() * 2)}s`,
    };
    return <div key={i} className="bubble" style={style}></div>;
  });

  return (
    <footer className="footer">
      <div className="bubbles">
        {bubbles}
      </div>
      <div className="content">
        <div className="footer-links">
          <div>
            <b>Explore</b>
            <Link to="/#portfolio">Case Studies</Link>
            <Link to="/about">About Me</Link>
            <Link to="/playground">Playground</Link>
            <Link to="/game">Game</Link>
          </div>
          <div>
            <b>Connect</b>
            <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/your-username" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://instagram.com/your-username" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
        <div className="footer-credits">
          <p>© {currentYear} Your Name. All rights reserved.</p>
          <p>Designed with passion.</p>
        </div>
      </div>

      {/* The SVG Filter for the Blob Effect */}
      <svg style={{ position: 'fixed', top: '100vh', visibility: 'hidden' }}>
        <defs>
          <filter id="blob">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="blob" />
          </filter>
        </defs>
      </svg>
    </footer>
  );
}

export default Footer;