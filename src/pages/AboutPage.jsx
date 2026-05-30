import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

function AboutPage() {
  const [heroRef, heroVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [journeyRef, journeyVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [buildRef, buildVisible] = useIntersectionObserver({ threshold: 0.1 });

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
            My ultimate goal? Building my own startup.
          </p>
        </div>
      </section>

      {/* Journey Timeline */}
      <section ref={journeyRef} className={`about-journey g-section ${journeyVisible ? 'is-visible' : ''}`}>
        <div className="g-container">
          <h2>My Journey</h2>
          <div className="timeline">
            <div className="timeline__item">
              <div className="timeline__dot"></div>
              <div className="timeline__content glass-card">
                <h3>The Beginning</h3>
                <p>Discovered programming in school. Wrote my first lines of code and realized I could build anything.</p>
              </div>
            </div>
            <div className="timeline__item">
              <div className="timeline__dot"></div>
              <div className="timeline__content glass-card">
                <h3>Data Science Era</h3>
                <p>Dove deep into Python, Pandas, and Scikit-Learn. Learned how to extract stories and predictions from raw data.</p>
              </div>
            </div>
            <div className="timeline__item">
              <div className="timeline__dot"></div>
              <div className="timeline__content glass-card">
                <h3>AI & Cloud Architecture</h3>
                <p>Shifted focus to deploying models at scale. Mastered AWS, GCP, and integrating LLMs via RAG pipelines.</p>
              </div>
            </div>
            <div className="timeline__item">
              <div className="timeline__dot"></div>
              <div className="timeline__content glass-card">
                <h3>Building SoulWake & Beyond</h3>
                <p>Currently developing SoulWake, a productivity hub, while pursuing my MCA and laying the groundwork for a future startup.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What I Build */}
      <section ref={buildRef} className={`about-build g-section ${buildVisible ? 'is-visible' : ''}`}>
        <div className="g-container">
          <h2>What I Build</h2>
          <div className="build-grid">
            <div className="build-card glass-card">
              <i className="fa-solid fa-brain"></i>
              <h3>AI Systems</h3>
              <p>Designing intelligent agents, sentiment analyzers, and predictive models using modern machine learning frameworks.</p>
            </div>
            <div className="build-card glass-card">
              <i className="fa-solid fa-database"></i>
              <h3>RAG Applications</h3>
              <p>Creating highly-contextual large language model apps using vector databases like Pinecone and LangChain.</p>
            </div>
            <div className="build-card glass-card">
              <i className="fa-solid fa-cloud"></i>
              <h3>Cloud Infrastructure</h3>
              <p>Deploying resilient, scalable architectures on AWS and GCP using containerization and CI/CD pipelines.</p>
            </div>
            <div className="build-card glass-card">
              <i className="fa-solid fa-rocket"></i>
              <h3>Future Vision</h3>
              <p>I aim to fuse AI, data science, and exceptional UX into a startup that solves real-world inefficiencies.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;