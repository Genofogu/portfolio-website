import React from 'react';
import { Link } from 'react-router-dom';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { projectsData } from '../../data/projects';

function Portfolio() {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section
      id="portfolio"
      className={`portfolio g-section ${isVisible ? 'is-visible' : ''}`}
      ref={sectionRef}
    >
      <div className="portfolio__header">
        <h2 className="portfolio__title">What I've Built</h2>
        <svg className="portfolio__connector" width="100" height="150" viewBox="0 0 100 150" preserveAspectRatio="none">
          <path d="M 50,0 Q 50,75 90,75 T 50,150" stroke="var(--color-accent-primary)" fill="none" strokeWidth="2" />
        </svg>
      </div>

      <div className="portfolio__grid">
        {projectsData.map((study, index) => (
          <div
            className="portfolio-card glass-card"
            key={index}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="portfolio-card__header">
              <span className="portfolio-card__category">{study.category}</span>
              <h3 className="portfolio-card__title">{study.title}</h3>
            </div>
            
            <p className="portfolio-card__description">{study.summary}</p>
            
            <div className="portfolio-card__tags">
              {study.tags.map((tag, tagIndex) => (
                <span key={tagIndex}>{tag}</span>
              ))}
            </div>
            
            <div className="portfolio-card__actions">
              <Link to={`/case-study/${study.slug}`} className="btn-read">
                Details →
              </Link>
              <div className="portfolio-card__links">
                <Link to="/github" title="View Source">
                  <i className="fa-brands fa-github"></i>
                </Link>
                {study.liveUrl === '#' ? (
                  <Link to="/coming-soon" title="Under Development">
                    <i className="fa-solid fa-arrow-up-right-from-square" style={{ opacity: 0.6 }}></i>
                  </Link>
                ) : (
                  <a href={study.liveUrl} target="_blank" rel="noreferrer" title="Live Demo">
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Portfolio;