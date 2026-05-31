import React from 'react';
import CodePlayground from './CodePlayground';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

function IDEPage() {
  const [heroRef, heroVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [featuresRef, featuresVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [languagesRef, languagesVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [aiRef, aiVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [previewRef, previewVisible] = useIntersectionObserver({ threshold: 0.05 });
  const [roadmapRef, roadmapVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [ctaRef, ctaVisible] = useIntersectionObserver({ threshold: 0.1 });

  // Feature cards data
  const features = [
    {
      icon: "fa-solid fa-bolt",
      title: "Vite-Powered Runtimes",
      desc: "Compile and execute your scripts instantly in the browser. Zero server delay, pure JavaScript compilation."
    },
    {
      icon: "fa-solid fa-keyboard",
      title: "Vim & Emacs Bindings",
      desc: "Fully configurable keyboard maps. Work exactly the way you do in your local console environment."
    },
    {
      icon: "fa-solid fa-network-wired",
      title: "Real-Time Sandbox",
      desc: "Isolated DOM context rendering allows you to test scripts, APIs, and algorithms safely in-browser."
    },
    {
      icon: "fa-solid fa-sliders",
      title: "Customizable Workspace",
      desc: "Adjust typography, themes, keymaps, and panel positions to craft your optimal code layout."
    }
  ];

  // AI capabilities list
  const aiFeatures = [
    {
      title: "Intelligent Autocomplete",
      desc: "Predictive inline code suggestions based on your active code block context."
    },
    {
      title: "Automated Refactoring",
      desc: "Refactor nested logic loops or resolve architectural warnings with a single click."
    },
    {
      title: "Interactive Debugger",
      desc: "AI-driven stack trace inspection highlights runtime errors and offers instant resolutions."
    }
  ];

  // Roadmap quarters
  const roadmap = [
    {
      quarter: "Q3 2026",
      title: "Collaborative Uplink",
      desc: "Multi-cursor collaborative pairing inside browser sessions with built-in voice links."
    },
    {
      quarter: "Q4 2026",
      title: "Containerized Terminals",
      desc: "Execute complete Node.js, Python, and Go microservices inside webassembly-virtualized containers."
    },
    {
      quarter: "Q1 2027",
      title: "Startup Deployment Bundles",
      desc: "Compile sandbox configurations directly into scalable CloudFormation or Terraform templates."
    }
  ];

  // Language cards
  const languages = [
    { name: "JavaScript", icon: "fa-brands fa-js", color: "#f7df1e", status: "Runnable" },
    { name: "TypeScript", icon: "fa-solid fa-code", color: "#3178c6", status: "Coming Soon" },
    { name: "Python", icon: "fa-brands fa-python", color: "#3776ab", status: "Syntax Support" },
    { name: "Java", icon: "fa-brands fa-java", color: "#007396", status: "Syntax Support" },
    { name: "C++", icon: "fa-solid fa-microchip", color: "#00599c", status: "Syntax Support" },
    { name: "HTML & CSS", icon: "fa-brands fa-html5", color: "#e34f26", status: "Preview Support" }
  ];

  return (
    <div className="ide-landing-page">
      {/* 1. Hero Section */}
      <section
        ref={heroRef}
        className={`ide-hero g-section ${heroVisible ? 'is-visible' : ''}`}
      >
        <div className="g-container">
          <div className="ide-hero__content">
            <span className="badge">Geno's IDE v1.0.0</span>
            <h1 className="gradient-text">Geno's IDE: The Developer Sandbox of the Future</h1>
            <p className="ide-hero__subtitle">
              A premium, browser-based development environment built on Genofogu mechanics.
              Accelerated runtimes, advanced AI context models, and modern theme adaptations.
            </p>
            <div className="ide-hero__ctas">
              <a href="#editor-preview" className="hero-cta-btn primary">
                <i className="fa-solid fa-circle-play"></i> Try In Browser
              </a>
              <a href="#" target="_blank" rel="noreferrer" className="hero-cta-btn secondary">
                <i className="fa-brands fa-github"></i> Clone Sandbox CLI
              </a>
            </div>
          </div>

          <div className="ide-hero__preview-wrapper">
            <div className="ide-mockup-frame">
              <div className="ide-mockup-header">
                <div className="dot red"></div>
                <div className="dot yellow"></div>
                <div className="dot green"></div>
                <span className="title">geno's_ide_editor.js — Geno's IDE</span>
              </div>
              <div className="ide-mockup-content">
                <div className="sidebar-mock">
                  <i className="fa-solid fa-folder-open active"></i>
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <i className="fa-solid fa-code-fork"></i>
                  <i className="fa-solid fa-cubes"></i>
                </div>
                <div className="editor-mock">
                  <div className="editor-row">
                    <span className="line-num">1</span>
                    <span className="code-text"><span className="keyword">import</span> &#123; IDE &#125; <span className="keyword">from</span> <span className="string">'geno's-core'</span>;</span>
                  </div>
                  <div className="editor-row">
                    <span className="line-num">2</span>
                    <span className="code-text"><span className="comment">// Initializing the sandbox compiler runtime</span></span>
                  </div>
                  <div className="editor-row">
                    <span className="line-num">3</span>
                    <span className="code-text"><span className="keyword">const</span> compiler = <span className="keyword">new</span> IDE.Compiler(&#123;</span>
                  </div>
                  <div className="editor-row">
                    <span className="line-num">4</span>
                    <span className="code-text">  hotReload: <span className="boolean">true</span>,</span>
                  </div>
                  <div className="editor-row">
                    <span className="line-num">5</span>
                    <span className="code-text">  aiModel: <span className="string">'vespera-gpt-v4'</span></span>
                  </div>
                  <div className="editor-row">
                    <span className="line-num">6</span>
                    <span className="code-text">&#125;);</span>
                  </div>
                  <div className="editor-row">
                    <span className="line-num">7</span>
                    <span className="code-text">compiler.launch();</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Feature Cards Section */}
      <section
        ref={featuresRef}
        className={`ide-features g-section ${featuresVisible ? 'is-visible' : ''}`}
      >
        <div className="g-container">
          <div className="section-title-wrapper">
            <h2>Accelerated Engineering Features</h2>
            <p>Designed for optimal efficiency, visual clarity, and fluid workspace transitions.</p>
          </div>

          <div className="features-grid">
            {features.map((feat, idx) => (
              <div key={idx} className="feature-card glass-card">
                <div className="feature-card__icon-wrapper">
                  <i className={feat.icon}></i>
                </div>
                <h3>{feat.title}</h3>
                <p>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. AI Capabilities Section */}
      <section
        ref={aiRef}
        className={`ide-ai g-section ${aiVisible ? 'is-visible' : ''}`}
      >
        <div className="g-container">
          <div className="ide-ai__layout">
            <div className="ide-ai__content">
              <span className="small-badge">Vespera AI</span>
              <h2>AI Contextual Copilot</h2>
              <p>
                Integrated directly into the editor kernel, the Vespera AI assistant analyzes local symbol tables
                to provide syntax completions, automated test structures, and semantic error explanations.
              </p>
              <div className="ai-features-list">
                {aiFeatures.map((feat, idx) => (
                  <div key={idx} className="ai-feature-item">
                    <h4><i className="fa-solid fa-microchip"></i> {feat.title}</h4>
                    <p>{feat.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="ide-ai__visual">
              <div className="ai-glow-card glass-card">
                <div className="ai-glow-header">
                  <i className="fa-solid fa-bolt"></i>
                  <span>Vespera Agent status: Online</span>
                </div>
                <div className="ai-glow-body">
                  <p className="user-prompt">&gt; Refactor the render loop for performance.</p>
                  <p className="ai-response">Optimizing memory allocation in WebGL textures... complete. Render frame rate increased to 120 FPS.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Supported Languages Section */}
      <section
        ref={languagesRef}
        className={`ide-languages g-section ${languagesVisible ? 'is-visible' : ''}`}
      >
        <div className="g-container">
          <div className="section-title-wrapper">
            <h2>Multi-Language Syntax Kernel</h2>
            <p>Write, validate, and execute in multiple backend runtimes, all configured out of the box.</p>
          </div>

          <div className="languages-grid">
            {languages.map((lang, idx) => (
              <div key={idx} className="language-card glass-card">
                <i className={lang.icon} style={{ color: lang.color }}></i>
                <h3>{lang.name}</h3>
                <span className={`status-badge ${lang.status.toLowerCase().replace(' ', '-')}`}>
                  {lang.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Browser IDE Preview (The Code Editor) */}
      <section
        id="editor-preview"
        ref={previewRef}
        className={`ide-preview-section g-section ${previewVisible ? 'is-visible' : ''}`}
      >
        <div className="g-container">
          <div className="section-title-wrapper">
            <h2>Live Interactive Sandbox</h2>
            <p>Write your scripts directly inside the live virtual machine below. Select tabs to examine other languages.</p>
          </div>

          <div className="live-editor-wrapper">
            <CodePlayground />
          </div>
        </div>
      </section>

      {/* 6. Future Roadmap Section */}
      <section
        ref={roadmapRef}
        className={`ide-roadmap g-section ${roadmapVisible ? 'is-visible' : ''}`}
      >
        <div className="g-container">
          <div className="section-title-wrapper">
            <h2>Development Roadmap</h2>
            <p>Our long-term architectural pipeline for extending CortexIDE capabilities.</p>
          </div>

          <div className="roadmap-timeline">
            {roadmap.map((item, idx) => (
              <div key={idx} className="roadmap-item">
                <div className="roadmap-marker">
                  <div className="roadmap-dot"></div>
                  <span className="quarter">{item.quarter}</span>
                </div>
                <div className="roadmap-content glass-card">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Download / Launch IDE CTA Section */}
      <section
        ref={ctaRef}
        className={`ide-cta g-section ${ctaVisible ? 'is-visible' : ''}`}
      >
        <div className="g-container">
          <div className="cta-box glass-card">
            <h2>Launch Geno's IDE Now</h2>
            <p>Unlock the sandbox. Experience zero-friction compiler execution, dynamic theme adaptations, and integrated AI.</p>
            <div className="cta-buttons">
              <a href="#editor-preview" className="cta-btn primary">
                Launch Web Editor
              </a>
              <a href="#" target="_blank" rel="noreferrer" className="cta-btn secondary">
                View Source Repository
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default IDEPage;
