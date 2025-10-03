import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

// --- IMPORTANT ---
// Make sure your personal project data is correct inside this array.
// This is just a placeholder example.
const caseStudies = [
  {
    title: "Predictive Customer Churn Model",
    description: "Developed a machine learning model using logistic regression to predict customer churn with 88% accuracy, enabling proactive retention campaigns.",
    tags: ["Python", "Scikit-learn", "Pandas", "Classification"],
    link: "#" // Link to a more detailed case study page or GitHub repo
  },
  {
    title: "Sales Forecasting Engine",
    description: "Built a time-series forecasting model (ARIMA) to predict quarterly sales, improving inventory management and reducing overhead by 15%.",
    tags: ["R", "Time-Series", "Forecasting", "Data Visualization"],
    link: "#"
  },
  {
    title: "Natural Language Processing for Sentiment Analysis",
    description: "Engineered an NLP pipeline to analyze customer feedback from social media, providing real-time insights into brand sentiment and product issues.",
    tags: ["NLP", "PyTorch", "TextBlob", "API Integration"],
    link: "#"
  },
];

function Portfolio() {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section 
      id="portfolio" 
      className={`portfolio ${isVisible ? 'is-visible' : ''}`}
      ref={sectionRef}
    >
      {/* The title and SVG are now wrapped in a 'header' div for better layout control */}
      <div className="portfolio__header">
        <h2 className="portfolio__title">Case Studies</h2>
        
        {/* --- THIS IS THE NEW SVG CONNECTOR --- */}
        <svg className="portfolio__connector" width="100" height="200" viewBox="0 0 100 200" preserveAspectRatio="none">
          {/* The 'd' attribute defines the shape of the S-curve line */}
          <path d="M 50,0 Q 50,100 90,100 T 50,200" stroke="var(--accent-primary)" fill="none" strokeWidth="3" />
        </svg>
      </div>

      <div className="portfolio__grid">
        {caseStudies.map((study, index) => (
          <div 
            className="portfolio-card" 
            key={index} 
            // The style attribute here creates the staggered "cascade" animation for the cards
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <h3 className="portfolio-card__title">{study.title}</h3>
            <p className="portfolio-card__description">{study.description}</p>
            <div className="portfolio-card__tags">
              {study.tags.map((tag, tagIndex) => (
                <span key={tagIndex}>{tag}</span>
              ))}
            </div>
            <a href={study.link} className="portfolio-card__link" data-visited="false">Read Case Study →</a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Portfolio;