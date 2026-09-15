import React from 'react';
import { useDimension } from './DimensionContext';
import './DimensionTransition.scss';

const DimensionTransition = () => {
  const { overlayRef, ringsRef, linesRef, transitionType, loadingProgress } = useDimension();

  return (
    <div className={`dimension-overlay ${transitionType}`} ref={overlayRef} style={{ display: 'none' }}>
      <div className="dimension-blur-bg" />
      
      {/* Dynamic wormhole speed lines */}
      <div className="speed-lines" ref={linesRef}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      {/* Concentric Portal Rings */}
      <div className="portal-rings">
        {[0, 1, 2, 3].map((idx) => (
          <div
            key={idx}
            className={`portal-ring ring-${idx}`}
            ref={(el) => (ringsRef.current[idx] = el)}
          />
        ))}
      </div>

      <div className="dimension-label">
        {transitionType === 'enter' 
          ? `LOADING 3D DIMENSION... ${loadingProgress}%` 
          : 'RETURNING TO 2D EXPERIENCE...'}
      </div>
    </div>
  );
};

export default DimensionTransition;
