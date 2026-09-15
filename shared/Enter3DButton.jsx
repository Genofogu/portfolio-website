import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDimension } from './DimensionContext';
import './Enter3DButton.scss';

const Enter3DButton = () => {
  const navigate = useNavigate();
  const { triggerTransition } = useDimension();

  const handleEnter3D = () => {
    triggerTransition('/3d', navigate);
  };

  return (
    <button className="enter-3d-btn" onClick={handleEnter3D} aria-label="Enter 3D Dimension">
      <div className="btn-glow" />
      <div className="btn-content">
        <span className="btn-icon">
          <i className="fa-solid fa-cube"></i>
        </span>
        <span className="btn-text">Enter 3D</span>
      </div>
    </button>
  );
};

export default Enter3DButton;
