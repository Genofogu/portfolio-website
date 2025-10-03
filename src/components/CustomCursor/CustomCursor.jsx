import React, { useState, useEffect } from 'react';
// Sticking with the URL import as it's the most stable for now.
import RocketCursorURL from './assets/RocketCursor.svg';

function CustomCursor() {
  // --- The Core Change: Simple state for position ---
  // We start it off-screen so it's not visible at position 0,0 on load.
  const [position, setPosition] = useState({ x: -100, y: -100 });
  
  // State for visibility and interactions remains the same
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isIdle, setIsIdle] = useState(true); // Start as idle

  // useEffect now only handles setting up and cleaning up event listeners
  useEffect(() => {
    let idleTimer = null;

    const handleMouseEnter = () => {
      setIsVisible(true);
      document.body.classList.add('custom-cursor-active');
    };
    const handleMouseLeave = () => {
      setIsVisible(false);
      document.body.classList.remove('custom-cursor-active');
    };

    const handleMouseMove = (e) => {
      // --- DIRECTLY SET POSITION - NO DELAY, NO SMOOTHING ---
      setPosition({ x: e.clientX, y: e.clientY });

      // Handle idle state
      setIsIdle(false);
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => setIsIdle(true), 1000); // Shorter idle time
    };

    const handleMouseOver = (e) => e.target.closest('a, button') && setIsHoveringLink(true);
    const handleMouseOut = (e) => e.target.closest('a, button') && setIsHoveringLink(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Add all event listeners
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => { // Cleanup
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      clearTimeout(idleTimer);
    };
  }, []);

  const isMoving = !isIdle;
  const cursorClasses = `custom-cursor ${isVisible ? 'is-visible' : ''} ${isMoving ? 'is-moving' : ''} ${isIdle ? 'is-idle' : ''} ${isHoveringLink ? 'is-link-hover' : ''} ${isClicking ? 'is-clicking' : ''}`;

  return (
    <div 
      className={cursorClasses}
      // We now use left and top directly from state.
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <img src={RocketCursorURL} alt="Rocket Cursor" />
    </div>
  );
}

export default CustomCursor;