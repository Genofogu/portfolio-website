import React from 'react';
import { journalMilestones, personalSections } from '../data/journalData';

function JournalView() {
  // Sort milestones chronologically (oldest to newest for timeline story, or newest to oldest. Let's do chronological oldest to newest so it reads like a story)
  const sortedMilestones = [...journalMilestones].sort((a, b) => {
    const getYear = (dateStr) => {
      const match = dateStr.match(/\d{4}/);
      return match ? parseInt(match[0], 10) : 9999;
    };
    return getYear(a.date) - getYear(b.date);
  });

  return (
    <div className="journal-view animate-fade-in">
      {/* Intro Header */}
      <section className="journal-hero">
        <span className="eyebrow">Autobiography & Journey</span>
        <h1>Behind the Code</h1>
        <p>A digital diary tracking my startup endeavors, academic growth, personal philosophy, and milestones.</p>
      </section>

      {/* Main Grid */}
      <div className="journal-layout">
        {/* Left Column: Timeline Story */}
        <main className="journal-main">
          <div className="journal-section-header">
            <span className="eyebrow">Timeline</span>
            <h2>My Chronological Journey</h2>
          </div>

          <div className="journal-timeline">
            <div className="timeline-line"></div>
            {sortedMilestones.map((item, index) => (
              <div key={item.id} className="timeline-node">
                <div className="timeline-marker">
                  <span className="timeline-year">{item.date}</span>
                  <div className="timeline-dot"></div>
                </div>

                <div className="timeline-card glass-card">
                  <div className="timeline-card__header">
                    <span className="card-badge">{item.category}</span>
                    <h3>{item.title}</h3>
                  </div>

                  <p className="timeline-card__desc">{item.description}</p>

                  {/* Startup Specific Fields */}
                  {item.category === 'Startup' && (
                    <div className="startup-details">
                      {item.whyStarted && (
                        <div className="detail-item">
                          <strong>Why it started:</strong> <p>{item.whyStarted}</p>
                        </div>
                      )}
                      {item.problemsSolved && (
                        <div className="detail-item">
                          <strong>Problems solved:</strong> <p>{item.problemsSolved}</p>
                        </div>
                      )}
                      {item.architecture && (
                        <div className="detail-item">
                          <strong>Architecture:</strong> <p>{item.architecture}</p>
                        </div>
                      )}
                      {item.progress && (
                        <div className="detail-item">
                          <strong>Current Progress:</strong> <p>{item.progress}</p>
                        </div>
                      )}
                      {item.future && (
                        <div className="detail-item">
                          <strong>Future roadmap:</strong> <p>{item.future}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Standard Milestone Details */}
                  <div className="milestone-bullets">
                    {item.skillsLearned && item.skillsLearned.length > 0 && (
                      <div className="bullet-row">
                        <i className="fa-solid fa-graduation-cap"></i>
                        <div>
                          <strong>Skills acquired:</strong>
                          <span> {item.skillsLearned.join(', ')}</span>
                        </div>
                      </div>
                    )}
                    {item.lessonsLearned && (
                      <div className="bullet-row">
                        <i className="fa-solid fa-lightbulb"></i>
                        <div>
                          <strong>Key lesson:</strong>
                          <span> {item.lessonsLearned}</span>
                        </div>
                      </div>
                    )}
                    {item.challenges && (
                      <div className="bullet-row">
                        <i className="fa-solid fa-triangle-exclamation"></i>
                        <div>
                          <strong>Challenges:</strong>
                          <span> {item.challenges}</span>
                        </div>
                      </div>
                    )}
                    {item.achievements && (
                      <div className="bullet-row">
                        <i className="fa-solid fa-trophy"></i>
                        <div>
                          <strong>Achievements:</strong>
                          <span> {item.achievements}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {item.technologies && item.technologies.length > 0 && (
                    <div className="timeline-card__tags">
                      {item.technologies.map(tech => (
                        <span key={tech} className="tech-tag">#{tech}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Startup Case Summaries */}
          <div className="journal-section-header" style={{ marginTop: '80px' }}>
            <span className="eyebrow">Startups</span>
            <h2>Venture Logs</h2>
          </div>

          <div className="startup-deep-dive">
            {/* Inhaby */}
            <div className="startup-box glass-card">
              <div className="startup-box__header">
                <i className="fa-solid fa-house-chimney startup-icon"></i>
                <div>
                  <h3>Inhaby</h3>
                  <small>Shared Room Listing Platform</small>
                </div>
              </div>
              <p>Inhaby was developed to address the trust deficit in matching young professionals with rental rooms. We designed user identity checks and owner verification modules so that users can interact safely.</p>
              <div className="startup-grid">
                <div>
                  <strong>Why Started:</strong>
                  <p>Students face rental scams and unstructured roommate choices. We needed a clean profile-first portal.</p>
                </div>
                <div>
                  <strong>Architecture:</strong>
                  <p>React, Node.js, and Supabase database using RLS access policies for strict security checks.</p>
                </div>
                <div>
                  <strong>Lessons:</strong>
                  <p>Database layer checks must enforce strict ownership verifications before any profile matches.</p>
                </div>
                <div>
                  <strong>Future Goals:</strong>
                  <p>Integrate lifestyle preference analytics to generate compatibility match scores.</p>
                </div>
              </div>
            </div>

            {/* Rare */}
            <div className="startup-box glass-card" style={{ marginTop: '32px' }}>
              <div className="startup-box__header">
                <i className="fa-solid fa-cube startup-icon"></i>
                <div>
                  <h3>Rare Labs</h3>
                  <small>Co-Founder & Technical Lead</small>
                </div>
              </div>
              <p>Co-founded Rare to build decentralized systems, developer assistants, and automation toolkits. Handled operations, core stack design, and collaborative integrations.</p>
              <div className="startup-grid">
                <div>
                  <strong>How I Joined:</strong>
                  <p>Found a team of builders wanting to automate repetitive code task patterns and workflows.</p>
                </div>
                <div>
                  <strong>Responsibilities:</strong>
                  <p>Direct technical decisions, run development cycles, organize databases, and model agent tasks.</p>
                </div>
                <div>
                  <strong>Business Lessons:</strong>
                  <p>Gather developer feedback early. Shipping a minimal viable version creates actual product validation.</p>
                </div>
                <div>
                  <strong>Ecosystem Growth:</strong>
                  <p>Releasing automated developer agent widgets and scaling collaborative workspace tools.</p>
                </div>
              </div>
            </div>

            {/* Homlap */}
            <div className="startup-box glass-card" style={{ marginTop: '32px' }}>
              <div className="startup-box__header">
                <i className="fa-solid fa-server startup-icon"></i>
                <div>
                  <h3>Homlap</h3>
                  <small>Smart Home Telemetry Portal</small>
                </div>
              </div>
              <p>Homlap represents an ambitious vision to centralize localized servers and smart home sensors into one performance-friendly telemetry dashboard.</p>
              <div className="startup-grid">
                <div>
                  <strong>Vision:</strong>
                  <p>Provide home server operators with unified insight metrics and IoT controls.</p>
                </div>
                <div>
                  <strong>Development:</strong>
                  <p>Utilized lightweight API routers, local caches, and optimized responsive layouts.</p>
                </div>
                <div>
                  <strong>Challenges:</strong>
                  <p>Maintaining real-time updates for telemetry feeds without causing system lockups on slow networks.</p>
                </div>
                <div>
                  <strong>What I Learned:</strong>
                  <p>Optimistic rendering and caching are critical when interfaces depend on localized IoT servers.</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Right Column: Personal & Philosophy Details */}
        <aside className="journal-sidebar">
          {/* About Me */}
          <section className="sidebar-card glass-card">
            <h3>{personalSections.aboutMe.title}</h3>
            <p>{personalSections.aboutMe.content}</p>
          </section>

          {/* Philosophy */}
          <section className="sidebar-card glass-card">
            <h3>{personalSections.philosophy.title}</h3>
            <p>{personalSections.philosophy.content}</p>
          </section>

          {/* Beliefs */}
          <section className="sidebar-card glass-card">
            <h3>{personalSections.whatIBelieve.title}</h3>
            <ul className="beliefs-list">
              {personalSections.whatIBelieve.beliefs.map((b, i) => (
                <li key={i}>
                  <i className="fa-solid fa-circle-check"></i>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Goals */}
          <section className="sidebar-card glass-card">
            <h3>{personalSections.goals.title}</h3>
            <ul className="goals-list">
              {personalSections.goals.list.map((g, i) => (
                <li key={i}>
                  <i className="fa-solid fa-bullseye"></i>
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Routine Tracker */}
          <section className="sidebar-card glass-card">
            <h3>Daily Routine</h3>
            <div className="routine-timeline">
              {personalSections.lifestyle.routine.map((r, i) => (
                <div key={i} className="routine-row">
                  <span className="routine-time">{r.time}</span>
                  <span className="routine-desc">{r.activity}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Hobbies list */}
          <section className="sidebar-card glass-card">
            <h3>Books</h3>
            <ul className="simple-list">
              {personalSections.lifestyle.books.map((book, i) => (
                <li key={i}><i className="fa-solid fa-book"></i> {book}</li>
              ))}
            </ul>
          </section>

          <section className="sidebar-card glass-card">
            <h3>Music</h3>
            <ul className="simple-list">
              {personalSections.lifestyle.music.map((music, i) => (
                <li key={i}><i className="fa-solid fa-music"></i> {music}</li>
              ))}
            </ul>
          </section>

          <section className="sidebar-card glass-card">
            <h3>Anime</h3>
            <ul className="simple-list">
              {personalSections.lifestyle.anime.map((anime, i) => (
                <li key={i}><i className="fa-solid fa-tv"></i> {anime}</li>
              ))}
            </ul>
          </section>

          <section className="sidebar-card glass-card">
            <h3>Fitness</h3>
            <p><i className="fa-solid fa-dumbbell"></i> {personalSections.lifestyle.fitness}</p>
          </section>
        </aside>
      </div>
    </div>
  );
}

export default JournalView;
