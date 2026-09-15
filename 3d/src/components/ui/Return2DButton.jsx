import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDimension } from '@shared/DimensionContext';
import './Return2DButton.scss';

const Return2DButton = () => {
  const navigate = useNavigate();
  const { triggerTransition } = useDimension();

  const handleReturnTo2D = () => {
    triggerTransition('/', navigate);
  };

  return (
    <button className="return-2d-btn" onClick={handleReturnTo2D} aria-label="Return to 2D Experience">
      <div className="btn-glow" />
      <div className="btn-content">
        <span className="btn-icon">
          <i className="fa-solid fa-arrow-left-long"></i>
        </span>
        <span className="btn-text">Return to 2D</span>
      </div>
    </button>
  );
};

export default Return2DButton;
