import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const githubProfile = {
  username: "geno",
  fullName: "Geno",
  bio: "Systems Architect & Deep Learning Engineer",
  location: "Silicon Valley, CA",
  company: "Cortex Labs",
  blog: "https://geno.dev",
  stats: {
    repos: 34,
    stars: 189,
    followers: 124,
    commitsThisYear: 1842
  },
  repos: [
    {
      name: "vespera",
      description: "AI-Powered Daily Productivity Companion. Habits, goals, and smart scheduling integrated in one glassmorphic workspace.",
      language: "JavaScript",
      languageColor: "#f7df1e",
      stars: 56,
      forks: 12,
      slug: "vespera"
    },
    {
      name: "rag-knowledge-assistant",
      description: "Retrieval-Augmented Generation chatbot utilizing Pinecone, LangChain, and HuggingFace embeddings for secure document search.",
      language: "Python",
      languageColor: "#3572A5",
      stars: 38,
      forks: 8,
      slug: "rag-knowledge-assistant"
    },
    {
      name: "cortex-ide",
      description: "Browser-based virtualized compiler sandbox with integrated Vespera AI contextual helper models and hot reloading.",
      language: "JavaScript",
      languageColor: "#f7df1e",
      stars: 47,
      forks: 5,
      slug: "ide"
    },
    {
      name: "churn-prediction-mlops",
      description: "End-to-end predictive MLOps pipeline featuring Docker containers, automated retraining, and AWS deployment.",
      language: "Python",
      languageColor: "#3572A5",
      stars: 23,
      forks: 3,
      slug: "predictive-churn-model"
    }
  ]
};

function GitHubPage() {
  const [copiedText, setCopiedText] = useState(null);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="github-page g-section">
      <div className="g-container">
        
        {/* Navigation Breadcrumb */}
        <div className="page-breadcrumb" style={{ marginBottom: '2rem' }}>
          <Link to="/" className="breadcrumb-back">
            <i className="fa-solid fa-arrow-left"></i> Back to Home
          </Link>
        </div>

        <div className="github-layout">
          
          {/* Profile Card Side */}
          <aside className="github-profile-card glass-card">
            <div className="profile-header">
              <div className="profile-avatar-wrapper">
                <i className="fa-brands fa-github-alt profile-avatar-icon"></i>
                <div className="avatar-glow"></div>
              </div>
              <h2 className="profile-name">{githubProfile.fullName}</h2>
              <p className="profile-username">@{githubProfile.username}</p>
            </div>
            
            <p className="profile-bio">{githubProfile.bio}</p>
            
            <div className="profile-details">
              <div className="detail-item">
                <i className="fa-solid fa-location-dot"></i>
                <span>{githubProfile.location}</span>
              </div>
              <div className="detail-item">
                <i className="fa-solid fa-building"></i>
                <span>{githubProfile.company}</span>
              </div>
              <div className="detail-item">
                <i className="fa-solid fa-link"></i>
                <a href={githubProfile.blog} target="_blank" rel="noreferrer">{githubProfile.blog.replace('https://', '')}</a>
              </div>
            </div>

            <div className="profile-stats">
              <div className="stat-box">
                <span className="stat-number">{githubProfile.stats.repos}</span>
                <span className="stat-label">Repositories</span>
              </div>
              <div className="stat-box">
                <span className="stat-number">{githubProfile.stats.stars}</span>
                <span className="stat-label">Stars</span>
              </div>
              <div className="stat-box">
                <span className="stat-number">{githubProfile.stats.followers}</span>
                <span className="stat-label">Followers</span>
              </div>
            </div>

            <a 
              href="https://github.com/geno" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="github-cta-btn"
            >
              <i className="fa-brands fa-github"></i> Visit GitHub Profile
            </a>
          </aside>

          {/* Repositories Main Panel */}
          <main className="github-repos-panel">
            <header className="panel-header">
              <h1 className="gradient-text">GitHub Repositories</h1>
              <p className="panel-subtitle">Explore active codebases, clone sandboxes, or read detailed case studies.</p>
            </header>

            {/* Contribution Graph Mockup */}
            <div className="contribution-chart-card glass-card">
              <div className="chart-header">
                <h3>System Commit Activity</h3>
                <span className="commits-count">{githubProfile.stats.commitsThisYear} commits in the last year</span>
              </div>
              <div className="mock-grid">
                {Array.from({ length: 53 }).map((_, colIdx) => (
                  <div key={colIdx} className="mock-column">
                    {Array.from({ length: 7 }).map((_, rowIdx) => {
                      // Generate varying intensities for a realistic git graph
                      const randVal = Math.random();
                      let intensity = 'none';
                      if (randVal > 0.85) intensity = 'high';
                      else if (randVal > 0.6) intensity = 'medium';
                      else if (randVal > 0.3) intensity = 'low';
                      
                      return (
                        <div 
                          key={rowIdx} 
                          className={`mock-cell intensity-${intensity}`} 
                          title="Activity logged"
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
              <div className="chart-legend">
                <span>Less</span>
                <div className="legend-cell intensity-none"></div>
                <div className="legend-cell intensity-low"></div>
                <div className="legend-cell intensity-medium"></div>
                <div className="legend-cell intensity-high"></div>
                <span>More</span>
              </div>
            </div>

            {/* Repository Grid */}
            <div className="repos-grid">
              {githubProfile.repos.map((repo) => (
                <div key={repo.name} className="repo-card glass-card">
                  <div className="repo-card-header">
                    <div className="repo-title-wrapper">
                      <i className="fa-solid fa-book-bookmark repo-icon"></i>
                      <h3 className="repo-name">{repo.name}</h3>
                    </div>
                    <span className="repo-badge">Public</span>
                  </div>

                  <p className="repo-description">{repo.description}</p>

                  {/* Copy code block */}
                  <div className="repo-clone-box">
                    <code className="clone-command">git clone https://github.com/geno/{repo.name}.git</code>
                    <button 
                      className={`copy-btn ${copiedText === repo.name ? 'copied' : ''}`}
                      onClick={() => copyToClipboard(`git clone https://github.com/geno/${repo.name}.git`, repo.name)}
                      title="Copy clone command"
                    >
                      {copiedText === repo.name ? (
                        <i className="fa-solid fa-check"></i>
                      ) : (
                        <i className="fa-solid fa-copy"></i>
                      )}
                    </button>
                  </div>

                  <div className="repo-card-footer">
                    <div className="repo-meta">
                      <span className="meta-lang">
                        <span className="lang-color-dot" style={{ backgroundColor: repo.languageColor }}></span>
                        {repo.language}
                      </span>
                      <span className="meta-stat">
                        <i className="fa-regular fa-star"></i> {repo.stars}
                      </span>
                      <span className="meta-stat">
                        <i className="fa-solid fa-code-branch"></i> {repo.forks}
                      </span>
                    </div>

                    <Link to={`/case-study/${repo.slug}`} className="repo-link">
                      View Case Study <i className="fa-solid fa-chevron-right"></i>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>

      </div>
    </div>
  );
}

export default GitHubPage;
