import React, { useState, useEffect } from 'react';
import RocketCursorURL from './assets/RocketCursor.svg';

function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isIdle, setIsIdle] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768;
    };

    if (checkTouch()) {
      setIsTouchDevice(true);
      document.body.classList.remove('custom-cursor-active');
      return;
    }

    setIsTouchDevice(false);
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
      setPosition({ x: e.clientX, y: e.clientY });
      setIsIdle(false);
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => setIsIdle(true), 1000);
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, select, input[type="submit"], input[type="button"], [role="button"]')) {
        setIsHoveringLink(true);
      }
    };
    const handleMouseOut = (e) => {
      if (e.target.closest('a, button, select, input[type="submit"], input[type="button"], [role="button"]')) {
        setIsHoveringLink(false);
      }
    };
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.documentElement.addEventListener('mouseenter', handleMouseEnter);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Initial check in case cursor is already inside window
    document.body.classList.add('custom-cursor-active');
    setIsVisible(true);

    return () => {
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.classList.remove('custom-cursor-active');
      clearTimeout(idleTimer);
    };
  }, []);

  if (isTouchDevice) {
    return null;
  }

  const isMoving = !isIdle;
  const cursorClasses = `custom-cursor ${isVisible ? 'is-visible' : ''} ${isMoving ? 'is-moving' : ''} ${isIdle ? 'is-idle' : ''} ${isHoveringLink ? 'is-link-hover' : ''} ${isClicking ? 'is-clicking' : ''}`;

  return (
    <div 
      className={cursorClasses}
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