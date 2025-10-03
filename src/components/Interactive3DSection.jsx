import React, { useRef } from 'react';
import useScrollPosition from '../hooks/useScrollPosition';

function Interactive3DSection() {
  const sectionRef = useRef(null);
  const scrollPosition = useScrollPosition();

  // --- 1. Calculate Scroll Progress within this section ---
  const calculateScrollProgress = () => {
    if (!sectionRef.current) return 0;

    const rect = sectionRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // The distance from the top of the section to the bottom of the viewport
    const distanceFromTop = viewportHeight - rect.top;
    
    // The total distance to scroll through (height of section + height of viewport)
    const totalScrollDistance = viewportHeight + rect.height;

    // Progress from 0 to 1
    const progress = Math.max(0, Math.min(1, distanceFromTop / totalScrollDistance));
    return progress;
  };

  const scrollProgress = calculateScrollProgress();

  // --- 2. Create the "Ping-Pong" Progress (0 -> 1 -> 0) ---
  // This is the value that will drive our animation forward and backward.
  const pingPongProgress = 1 - (Math.abs(scrollProgress - 0.5) * 2);

  // --- 3. Define the animation values based on the ping-pong progress ---
  const cubeRotation = pingPongProgress * -90; // Cube rotates from -90deg to 0deg and back
  const titleOpacity = pingPongProgress; // Title fades in and out
  const titleScale = 0.8 + (pingPongProgress * 0.2); // Title scales up and down

  return (
    // We use the ref to measure the section's position
    <section ref={sectionRef} className="interactive-3d-section">
      
      <div className="scene">
        <div 
          className="cube"
          style={{
            // The entire cube's rotation is controlled by scroll progress
            transform: `rotateX(${cubeRotation}deg) rotateY(${cubeRotation}deg)`
          }}
        >
          {/* We create 6 faces for our cube */}
          <div className="face front"></div>
          <div className="face back"></div>
          <div className="face right"></div>
          <div className="face left"></div>
          <div className="face top"></div>
          <div className="face bottom"></div>
        </div>
      </div>

      <div 
        className="interactive-3d-section__title"
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`
        }}
      >
        <h2>Data-Driven Dimensions</h2>
      </div>

    </section>
  );
}

export default Interactive3DSection;