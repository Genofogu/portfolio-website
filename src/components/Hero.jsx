import React, { useState, useEffect, useRef } from 'react';

function Hero() {
  const heroRef = useRef(null);
  
  // NEW TEXT: Focused on data science and strategy
  const titlePart1 = "Data Scientist & Strategic ";
  const titlePart2 = "Innovator"; // A powerful, modern term
  
  const [animatedWord, setAnimatedWord] = useState(titlePart2);
  const intervalRef = useRef(null);

  // Continuous Scramble Animation (remains the same)
  useEffect(() => {
    const chars = "アイウエオカキクケコサシスセソタチツテト<>-_\\/[]{}—=+*^?#"; // More data/math/cyber feel
    
    const scrambleAnimation = () => {
      const newText = titlePart2
        .split('')
        .map((char, index) => (Math.random() > 0.6) ? titlePart2[index] : chars[Math.floor(Math.random() * chars.length)])
        .join('');
      setAnimatedWord(newText);
    };
    intervalRef.current = setInterval(scrambleAnimation, 80);
    return () => clearInterval(intervalRef.current);
  }, []);

  // Spotlight Effect (remains the same)
  useEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement) return;
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { offsetLeft, offsetTop } = heroElement;
      const x = clientX - offsetLeft;
      const y = clientY - offsetTop;
      heroElement.style.setProperty('--mouse-x', `${x}px`);
      heroElement.style.setProperty('--mouse-y', `${y}px`);
    };
    heroElement.addEventListener('mousemove', handleMouseMove);
    return () => heroElement.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="hero" className="hero" ref={heroRef}>
      <div className="hero__content">
        <div className="hero__animation-group">
          <h1 className="hero__title">
            {titlePart1}
            <span className="hero__title--animated">{animatedWord}</span>
          </h1>
          {/* NEW SUBTITLE: Focused on value and impact */}
          <p className="hero__subtitle">
            I translate complex data into actionable insights and strategic advantages, driving business growth through machine learning and predictive analytics.
          </p>
          {/* NEW CTA TEXT */}
          <a href="#portfolio" className="hero__cta-button">
            View Case Studies
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;