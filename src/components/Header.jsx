import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

function Header() {
  return (

    <header className="site-header">
      <div className="site-header__wrapper">
        <Link to="/" className="site-header__logo">Geno</Link>
        <div className="site-header__actions">
          <nav className="site-header__nav">
           <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/playground">Playground</Link>
           <Link to="/game">Game</Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export default Header;