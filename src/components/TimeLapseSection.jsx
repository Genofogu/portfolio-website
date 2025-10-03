import React, { useRef } from 'react';
import useScrollPosition from '../hooks/useScrollPosition';
import useCurrentTime from '../hooks/useCurrentTime';

function TimeLapseSection() {
  const sectionRef = useRef(null);
  const scrollPosition = useScrollPosition();
  const currentTime = useCurrentTime();

  // --- 1. THE KEY CHANGE: Calculate Progress in a Shorter Distance ---
  const calculateScrollProgress = () => {
    if (!sectionRef.current) return 0;

    const rect = sectionRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // We want the animation to start when the top of the section hits the top of the viewport (rect.top <= 0)
    // and end when the bottom of the section hits the bottom of the viewport.
    const scrollableDistance = rect.height - viewportHeight;
    const currentScroll = -rect.top;

    // This makes the progress 0 at the start of the scroll and 1 at the end.
    const progress = Math.max(0, Math.min(1, currentScroll / scrollableDistance));
    
    return isNaN(progress) ? 0 : progress;
  };
  const scrollProgress = calculateScrollProgress();

  // --- All the time calculation logic from here is the same ---
  const calculateTimeProperties = (hour) => {
    const progress = hour / 24;
    let skyColor1, skyColor2;
    if (hour < 4 || hour > 21) { skyColor1 = '#0c0a18'; skyColor2 = '#2a3b64'; }
    else if (hour < 6) { skyColor1 = '#2a3b64'; skyColor2 = '#7b4a74'; }
    else if (hour < 8) { skyColor1 = '#f9a857'; skyColor2 = '#f9d49c'; }
    else if (hour < 17) { skyColor1 = '#8ecae6'; skyColor2 = '#bde0fe'; }
    else if (hour < 19) { skyColor1 = '#f9a857'; skyColor2 = '#e673a2'; }
    else { skyColor1 = '#e673a2'; skyColor2 = '#7b4a74'; }

    const xPosition = -10 + (progress * 120); 
    const yPosition = 100 - (Math.sin(progress * Math.PI) * 90);
    const sunOpacity = (hour > 5.5 && hour < 19.5) ? 1 : 0;
    const starsOpacity = (hour < 5 || hour > 20) ? 1 - Math.sin((hour - 20) * Math.PI / 9) : 0;
    return { skyColor1, skyColor2, xPosition, yPosition, sunOpacity, starsOpacity };
  };

  const currentHour = currentTime.getHours() + currentTime.getMinutes() / 60;
  const isTimeLocked = scrollProgress > 0.495 && scrollProgress < 0.505;
  const displayHour = isTimeLocked ? currentHour : scrollProgress * 24;
  const timeProps = calculateTimeProperties(displayHour);

  const hours = String(currentTime.getHours()).padStart(2, '0');
  const minutes = String(currentTime.getMinutes()).padStart(2, '0');

  return (
    <section ref={sectionRef} className="timelapse-section">
      <div 
        className="timelapse-sky" 
        style={{ background: `linear-gradient(to bottom, ${timeProps.skyColor1}, ${timeProps.skyColor2})` }}
      >
        <div className="stars" style={{ opacity: timeProps.starsOpacity }}></div>
        <div className="clouds"></div>
        <div 
          className="sun" 
          style={{ 
            left: `${timeProps.xPosition}%`, 
            top: `${timeProps.yPosition}%`, 
            opacity: timeProps.sunOpacity 
          }}
        ></div>
        <div 
          className="moon" 
          style={{ 
            left: `${timeProps.xPosition}%`, 
            top: `${timeProps.yPosition}%`, 
            opacity: 1 - timeProps.sunOpacity
          }}
        ></div>
        <div className="clock" style={{ opacity: isTimeLocked ? 1 : 0 }}>
          {hours}:{minutes}
        </div>
      </div>
      <div className="ocean">
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
    </section>
  );
}

export default TimeLapseSection;