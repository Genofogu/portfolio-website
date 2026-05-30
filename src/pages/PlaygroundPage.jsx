import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projects';

function PlaygroundPage() {
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', ...new Set(projectsData.map(p => p.category))];
  
  const filteredProjects = filter === 'All' 
    ? projectsData 
    : projectsData.filter(p => p.category === filter);

  return (
    <div className="playground-page g-section">
      <div className="g-container">
        
        <header className="playground-header">
          <h1>Project Showcase</h1>
          <p>A collection of my experiments, systems, and open-source contributions.</p>
          
          <div className="playground-nav">
            <Link to="/playground/editor" className="btn-editor">
              <i className="fa-solid fa-code"></i> Open Code Editor
            </Link>
          </div>
        </header>

        <div className="filters">
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="project-gallery">
          {filteredProjects.map(project => (
            <div key={project.slug} className="gallery-card glass-card">
              <div className="card-thumb" style={{ backgroundImage: `url(${project.heroImage})` }}>
                <span className="card-category">{project.category}</span>
              </div>
              <div className="card-content">
                <h3>{project.title}</h3>
                <p>{project.subtitle}</p>
                
                <div className="card-tags">
                  {project.tags.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}
                  {project.tags.length > 3 && <span>+{project.tags.length - 3}</span>}
                </div>
                
                <div className="card-actions">
                  <Link to={`/case-study/${project.slug}`} className="btn-view">View Details</Link>
                  {project.githubUrl && project.githubUrl !== '#' && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer"><i className="fa-brands fa-github"></i></a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default PlaygroundPage;