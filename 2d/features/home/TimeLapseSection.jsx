import React, { useRef } from 'react';
import useScrollPosition from '../../hooks/useScrollPosition';
import useCurrentTime from '../../hooks/useCurrentTime';
import { useWeatherData } from '../../hooks/useWeatherData';

function TimeLapseSection() {
  const sectionRef = useRef(null);
  const scrollPosition = useScrollPosition();
  const currentTime = useCurrentTime();
  const weatherData = useWeatherData();

  const calculateScrollProgress = () => {
    if (!sectionRef.current) return 0;
    const rect = sectionRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const scrollableDistance = rect.height - viewportHeight;
    const currentScroll = -rect.top;
    const progress = Math.max(0, Math.min(1, currentScroll / scrollableDistance));
    return isNaN(progress) ? 0 : progress;
  };
  const scrollProgress = calculateScrollProgress();

  const currentHour = currentTime.getHours() + currentTime.getMinutes() / 60;
  
  // Snap to real time in the middle of the scroll (0.4 to 0.6)
  const isTimeLocked = scrollProgress > 0.4 && scrollProgress < 0.6;
  const displayHour = isTimeLocked ? currentHour : scrollProgress * 24;

  const calculateTimeProperties = (hour) => {
    const progress = hour / 24;
    let skyColor1, skyColor2;
    if (hour < 4 || hour > 21) { skyColor1 = '#0c0a18'; skyColor2 = '#2a3b64'; } // Night
    else if (hour < 6) { skyColor1 = '#2a3b64'; skyColor2 = '#7b4a74'; } // Dawn
    else if (hour < 8) { skyColor1 = '#f9a857'; skyColor2 = '#f9d49c'; } // Sunrise
    else if (hour < 17) { skyColor1 = '#8ecae6'; skyColor2 = '#3a86ff'; } // Day
    else if (hour < 19) { skyColor1 = '#f9a857'; skyColor2 = '#e673a2'; } // Sunset
    else { skyColor1 = '#e673a2'; skyColor2 = '#7b4a74'; } // Dusk

    const xPosition = -10 + (progress * 120);
    const yPosition = 100 - (Math.sin(progress * Math.PI) * 90);
    const sunOpacity = (hour > 5.5 && hour < 19.5) ? 1 : 0;
    const starsOpacity = (hour < 5 || hour > 20) ? 1 - Math.sin((hour - 20) * Math.PI / 9) : 0;
    
    return { skyColor1, skyColor2, xPosition, yPosition, sunOpacity, starsOpacity };
  };

  const timeProps = calculateTimeProperties(displayHour);
  const isRaining = weatherData.condition.toLowerCase().includes('rain') && isTimeLocked;
  const showFireflies = (displayHour < 5 || displayHour > 20);

  const hours = String(currentTime.getHours()).padStart(2, '0');
  const minutes = String(currentTime.getMinutes()).padStart(2, '0');

  return (
    <section ref={sectionRef} className="timelapse-section">
      <div 
        className="timelapse-sky" 
        style={{ background: `linear-gradient(to bottom, ${timeProps.skyColor1}, ${timeProps.skyColor2})` }}
      >
        <div className="stars" style={{ opacity: timeProps.starsOpacity }}></div>
        <div className="clouds" style={{ opacity: isRaining ? 0.8 : 0.4 }}></div>
        
        {showFireflies && <div className="fireflies"></div>}
        {isRaining && <div className="rain"></div>}

        <div className="sun" style={{ left: `${timeProps.xPosition}%`, top: `${timeProps.yPosition}%`, opacity: timeProps.sunOpacity }}></div>
        <div className="moon" style={{ left: `${timeProps.xPosition}%`, top: `${timeProps.yPosition}%`, opacity: 1 - timeProps.sunOpacity }}></div>
        
        <div className={`environment-data-hud ${isTimeLocked ? 'is-visible' : ''}`}>
          <div className="hud-time">{hours}:{minutes}</div>
          <div className="hud-details">
            <span className="hud-item"><i className="fa-solid fa-location-dot"></i> {weatherData.city}</span>
            <span className="hud-item"><i className="fa-solid fa-temperature-half"></i> {weatherData.temperature}°C</span>
            <span className="hud-item"><i className="fa-solid fa-cloud"></i> {weatherData.condition}</span>
            <span className="hud-item"><i className="fa-solid fa-moon"></i> {weatherData.moonPhase}</span>
          </div>
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