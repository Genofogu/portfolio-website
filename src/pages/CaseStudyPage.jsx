import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { projectsData } from '../data/projects'; // Import our new database

function CaseStudyPage() {
  const { slug } = useParams();
  const navigate = useNavigate(); // Hook for programmatic navigation
  
  // Find the project data that matches the slug from the URL
  const project = projectsData.find(p => p.slug === slug);

  // If no project is found for the given slug, redirect to a 404 page or homepage
  useEffect(() => {
    if (!project) {
      navigate('/'); // Redirect to homepage if project not found
    }
  }, [project, navigate]);

  // If the project is not found yet, we can render a loading state or nothing
  if (!project) {
    return null; 
  }

  return (
    <div className="case-study-page">
      {/* 1. Hero Section */}
      <header className="case-study-hero" style={{ backgroundImage: `url(${project.heroImage})` }}>
        <div className="case-study-hero__overlay">
          <h1>{project.title}</h1>
          <p>{project.subtitle}</p>
        </div>
      </header>
      
      {/* 2. Main Content Layout */}
      <div className="case-study-content-layout">
        <main className="case-study-main">
          {project.sections.map((section, index) => (
            <section key={index} className="case-study-section">
              <h2>{section.title}</h2>
              {section.content.map((paragraph, pIndex) => (
                <p key={pIndex}>{paragraph}</p>
              ))}
            </section>
          ))}
        </main>
        
        <aside className="case-study-sidebar">
          <div className="sidebar-widget">
            <h3>Tech Stack</h3>
            <div className="tags">
              {project.tags.map(tag => <span key={tag}>{tag}</span>)}
            </div>
          </div>
          <div className="sidebar-widget">
            <h3>Summary</h3>
            <p>{project.summary}</p>
          </div>
        </aside>
      </div>
      
      <div className="case-study-footer">
        <Link to="/#portfolio" className="back-to-portfolio-link">← Back to All Case Studies</Link>
      </div>
    </div>
  );
}

export default CaseStudyPage;