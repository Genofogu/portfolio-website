import React from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import JourneyTimeline from './JourneyTimeline';
import TechStack from './TechStack';
import FutureVision from './FutureVision';

function AboutPage() {
  const [heroRef, heroVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [journeyRef, journeyVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [buildRef, buildVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [visionRef, visionVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section ref={heroRef} className={`about-hero g-section ${heroVisible ? 'is-visible' : ''}`}>
        <div className="g-container">
          <h1 className="about-hero__title">
            <span className="gradient-text">Hey, I'm Geno.</span>
          </h1>
          <p className="about-hero__subtitle">
            I'm a builder. From crafting AI-powered applications to architecting scalable cloud infrastructure, 
            I focus on transforming complex data into seamless, impactful digital experiences. 
            My ultimate goal? Launching Aetheris Labs to build high-performance tools and services for developers.
          </p>
        </div>
      </section>

      {/* Journey Timeline */}
      <section ref={journeyRef} className={`about-journey g-section ${journeyVisible ? 'is-visible' : ''}`}>
        <div className="g-container">
          <h2>My Journey</h2>
          <JourneyTimeline />
        </div>
      </section>

      {/* Core Competencies */}
      <section ref={buildRef} className={`about-build g-section ${buildVisible ? 'is-visible' : ''}`}>
        <div className="g-container">
          <h2>Core Competencies</h2>
          <TechStack />
        </div>
      </section>

      {/* Future Vision */}
      <section ref={visionRef} className={`about-vision g-section ${visionVisible ? 'is-visible' : ''}`}>
        <div className="g-container">
          <h2>Future Vision</h2>
          <FutureVision />
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
