import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  const heroRef = useRef(null);
  
  const titlePart1 = "Building AI Systems, \nDigital Products & ";
  
  const animatedWords = ["Future Ventures", "RAG Systems", "Cloud Solutions", "Vespera"];
  const [wordIndex, setWordIndex] = useState(0);
  const [animatedWord, setAnimatedWord] = useState(animatedWords[0]);
  const intervalRef = useRef(null);
  const wordCycleRef = useRef(null);

  // Scramble Animation
  useEffect(() => {
    const chars = "アイウエオカキクケコサシスセソ<>-_\\/[]{}—=+*^?#"; 
    const currentTarget = animatedWords[wordIndex];
    let step = 0;

    const scrambleAnimation = () => {
      const newText = currentTarget
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (index < step) return currentTarget[index];
          return Math.random() > 0.8 ? currentTarget[index] : chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');
      
      setAnimatedWord(newText);
      step += 0.5; // Speed of reveal

      if (step > currentTarget.length + 5) {
        clearInterval(intervalRef.current);
        setAnimatedWord(currentTarget);
      }
    };

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(scrambleAnimation, 50);

    return () => clearInterval(intervalRef.current);
  }, [wordIndex]);

  // Cycle words every 4 seconds
  useEffect(() => {
    wordCycleRef.current = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % animatedWords.length);
    }, 4000);
    return () => clearInterval(wordCycleRef.current);
  }, []);

  // Spotlight Effect
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
    <section id="hero" className="hero g-section" ref={heroRef}>
      <div className="hero__content">
        <div className="hero__animation-group">
          
          <div className="hero__badges">
            <span className="badge">Python</span>
            <span className="badge">TensorFlow</span>
            <span className="badge">AWS / GCP</span>
            <span className="badge">LangChain</span>
            <span className="badge">React + SCSS</span>
          </div>

          <h1 className="hero__title">
            <span className="title-static">{titlePart1}</span>
            <br />
            <span className="hero__title--animated">{animatedWord}</span>
          </h1>
          
          <p className="hero__subtitle">
            <strong>Geno (Anu Gaur)</strong> — MCA Aspirant • AI/ML Developer • RAG Builder • Cloud Learner • Future Founder.
          </p>

          <p className="hero__bio">
            I engineer scalable AI systems, develop intelligent web applications, and explore the limits of machine learning to bring ambitious product concepts like Vespera into reality.
          </p>

          <div className="hero__actions">
            <a href="#portfolio" className="hero__cta-button primary">
              View My Work
            </a>
            <Link to="/github" className="hero__cta-button secondary">
              <i className="fa-brands fa-github"></i> GitHub
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;