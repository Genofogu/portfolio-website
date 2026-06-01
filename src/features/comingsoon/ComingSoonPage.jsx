import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ComingSoonPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [subState, setSubState] = useState('idle'); // idle | loading | success
  const [logs, setLogs] = useState([]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;

    setSubState('loading');
    setLogs([]);

    const logSteps = [
      "Establishing link with neural cache...",
      "Resolving routing node endpoint...",
      "Encrypting uplink keys...",
      "Uplink successful! Email registered to notification queue."
    ];

    logSteps.forEach((step, idx) => {
      setTimeout(() => {
        setLogs(prev => [...prev, `[system] > ${step}`]);
        if (idx === logSteps.length - 1) {
          setSubState('success');
          setEmail('');
        }
      }, (idx + 1) * 600);
    });
  };

  const devPhases = [
    { name: "Systems Architecture", status: "complete", percentage: 100 },
    { name: "Visual Framework & UI Design", status: "complete", percentage: 100 },
    { name: "Feature Pipeline & Sandbox", status: "in-progress", percentage: 65 },
    { name: "DeepMind AI Optimization", status: "pending", percentage: 0 }
  ];

  return (
    <div className="coming-soon-page g-section">
      {/* Background Glows */}
      <div className="coming-soon-glow primary"></div>
      <div className="coming-soon-glow secondary"></div>

      <div className="g-container">
        <div className="coming-soon-layout">
          
          {/* Main Visual/Text Area */}
          <div className="coming-soon-main glass-card">
            <div className="status-badge-wrapper">
              <span className="status-pulse-dot"></span>
              <span className="status-text">UPLINK ACTIVE &bull; CODEBASE DEPLOYING</span>
            </div>
            
            <h1 className="gradient-text coming-soon-title">Module Under Construction</h1>
            
            <p className="coming-soon-description">
              Our engineers are currently assembling this compiler runtime and database index. 
              The target modules are under heavy development phase to guarantee maximum performance and visual precision.
            </p>

            {/* Subscribe Box */}
            <div className="coming-soon-notify">
              <h3>Subscribe for Launch Telemetry</h3>
              
              {subState !== 'success' && (
                <form onSubmit={handleSubscribe} className="notify-form">
                  <div className="input-group">
                    <input 
                      type="email" 
                      placeholder="Enter uplink email address..." 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={subState === 'loading'}
                      required
                    />
                    <button type="submit" disabled={subState === 'loading'}>
                      {subState === 'loading' ? (
                        <i className="fa-solid fa-circle-notch fa-spin"></i>
                      ) : (
                        <span>Subscribe</span>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* Terminal Logs Simulation */}
              {logs.length > 0 && (
                <div className="terminal-logs">
                  <div className="terminal-logs-header">
                    <div className="term-dot red"></div>
                    <div className="term-dot yellow"></div>
                    <div className="term-dot green"></div>
                    <span className="term-title">uplink_connection.sh</span>
                  </div>
                  <div className="terminal-logs-body">
                    {logs.map((log, i) => (
                      <p key={i} className={`log-line ${i === logs.length - 1 ? 'last-success' : ''}`}>
                        {log}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {subState === 'success' && (
                <div className="notify-success">
                  <i className="fa-solid fa-circle-check success-icon"></i>
                  <div>
                    <h4>Uplink Registered!</h4>
                    <p>Notification subscription logged successfully. We will ping you when telemetry is live.</p>
                  </div>
                  <button onClick={() => setSubState('idle')} className="reset-btn">
                    Register Another
                  </button>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="coming-soon-actions">
              <button onClick={() => navigate(-1)} className="cs-btn secondary">
                <i className="fa-solid fa-arrow-left-long"></i> Back to Previous
              </button>
              <button onClick={() => navigate('/')} className="cs-btn primary">
                <i className="fa-solid fa-house"></i> Return to Base
              </button>
            </div>
          </div>

          {/* Development Metrics Panel */}
          <div className="coming-soon-metrics glass-card">
            <h3>Development Telemetry</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
              Real-time pipeline diagnostics of building steps.
            </p>

            <div className="phases-list">
              {devPhases.map((phase, idx) => (
                <div key={idx} className={`phase-item ${phase.status}`}>
                  <div className="phase-header">
                    <span className="phase-name">
                      {phase.status === 'complete' && <i className="fa-solid fa-circle-check completed-icon"></i>}
                      {phase.status === 'in-progress' && <i className="fa-solid fa-circle-notch fa-spin active-icon"></i>}
                      {phase.status === 'pending' && <i className="fa-regular fa-circle pending-icon"></i>}
                      {phase.name}
                    </span>
                    <span className="phase-val">{phase.percentage}%</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div 
                      className={`progress-bar-fill ${phase.status}`} 
                      style={{ width: `${phase.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="specifications-box">
              <h4>System Target Spec:</h4>
              <ul>
                <li><span className="spec-label">Core Runtime:</span> Node/V8 WebAssembly</li>
                <li><span className="spec-label">Target FPS:</span> 60-120 (Fluid animation)</li>
                <li><span className="spec-label">Latency:</span> &lt; 15ms Compiler responses</li>
                <li><span className="spec-label">Theme Engine:</span> HSL Variable Maps</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ComingSoonPage;
