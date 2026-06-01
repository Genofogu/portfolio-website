import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { projectsData } from '../../data/projects';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

function ProjectsPage() {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.05 });
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract unique categories
  const categories = ['All', ...new Set(projectsData.map(p => p.category))];

  // Filter & search logic
  const filteredProjects = projectsData.filter(p => {
    const matchCategory = filter === 'All' || p.category === filter;
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
  });

  return (
    <div 
      ref={sectionRef} 
      className={`projects-page g-section ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="g-container">
        <header className="projects-header">
          <h1 className="gradient-text">Selected Builds & Research</h1>
          <p className="projects-subtitle">
            A comprehensive index of my systems architectures, machine learning models, and full-stack software developments.
          </p>
        </header>

        {/* Filter and Search Controls */}
        <div className="projects-controls glass-card">
          <div className="filter-buttons">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`filter-btn ${filter === cat ? 'is-active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="search-box">
            <i className="fa-solid fa-magnifying-glass search-icon"></i>
            <input
              type="text"
              placeholder="Search by title, technology, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-search" onClick={() => setSearchQuery('')}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="projects-empty glass-card">
            <i className="fa-solid fa-box-open empty-icon"></i>
            <h3>No builds found</h3>
            <p>Try adjusting your filters or search query to find matching projects.</p>
          </div>
        ) : (
          <div className="projects-grid">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.slug} 
                className="project-card glass-card"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="project-card__image-container">
                  <img src={project.heroImage} alt={project.title} className="project-card__image" />
                  <div className="project-card__overlay">
                    <Link to={`/case-study/${project.slug}`} className="project-card__overlay-btn">
                      Explore Case Study
                    </Link>
                  </div>
                </div>

                <div className="project-card__content">
                  <div className="project-card__header">
                    <span className="project-card__category">{project.category}</span>
                    <h3 className="project-card__title">{project.title}</h3>
                  </div>

                  <p className="project-card__description">{project.summary}</p>

                  <div className="project-card__tags">
                    {project.tags.map((tag, tIndex) => (
                      <span key={tIndex} className="project-card__tag">{tag}</span>
                    ))}
                  </div>

                  <div className="project-card__footer">
                    <Link to={`/case-study/${project.slug}`} className="project-card__details-link">
                      Details <i className="fa-solid fa-arrow-right-long"></i>
                    </Link>

                    <div className="project-card__links">
                      <Link to="/github" title="GitHub Repository">
                        <i className="fa-brands fa-github"></i>
                      </Link>
                      {project.liveUrl === '#' ? (
                        <Link to="/coming-soon" title="Under Development">
                          <i className="fa-solid fa-arrow-up-right-from-square" style={{ opacity: 0.6 }}></i>
                        </Link>
                      ) : (
                        <a href={project.liveUrl} target="_blank" rel="noreferrer" title="Live Deployment">
                          <i className="fa-solid fa-arrow-up-right-from-square"></i>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectsPage;
