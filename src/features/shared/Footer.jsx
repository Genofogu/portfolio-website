import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  // Generate an array of blob elements. The number (e.g., 15) can be adjusted for more/less complexity.
  const blobs = Array.from({ length: 15 }, (_, i) => {
    const style = {
      '--size': `${12 + Math.random() * 8}rem`, // Size of the blob
      '--duration-x': `${15 + Math.random() * 10}s`, // Horizontal movement speed
      '--duration-y': `${15 + Math.random() * 10}s`, // Vertical movement speed
      '--delay': `${-Math.random() * 10}s`, // Random start time
    };
    return <div key={i} className="blob" style={style}></div>;
  });

  return (
    <footer className="fluid-footer">
      {/* The container for all the moving blobs */}
      <div className="blobs-container">
        {blobs}
      </div>

      {/* The content sits on top of the animation */}
      <div className="fluid-footer__content">
        <div className="footer-links">
          <div>
            <b>Explore</b>
            <Link to="/#portfolio">Case Studies</Link>
            <Link to="/about">About Me</Link>
            <Link to="/ide">IDE</Link>
          </div>
          <div>
            <b>Connect</b>
            <a href="https://github.com/geno" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/geno" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://instagram.com/geno" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
        <div className="footer-credits">
          <p>© {currentYear} Geno. All rights reserved.</p>
        </div>
      </div>

      {/* The SVG Filter that creates the "liquid" merging effect */}
      <svg style={{ position: 'fixed', top: '100vh', visibility: 'hidden' }}>
        <defs>
          <filter id="liquid-blob-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="30" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 100 -20" result="blob" />
          </filter>
        </defs>
      </svg>
    </footer>
  );
}

export default Footer;