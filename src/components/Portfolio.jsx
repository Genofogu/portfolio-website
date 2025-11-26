import React from 'react';
import { Link } from 'react-router-dom'; // 1. Import the Link component
import useIntersectionObserver from '../hooks/useIntersectionObserver';

// 2. Add a 'slug' to each project and remove the old 'link' property
const caseStudies = [
  {
    slug: "predictive-churn-model",
    title: "Predictive Customer Churn Model",
    description: "Developed a machine learning model using logistic regression to predict customer churn with 88% accuracy, enabling proactive retention campaigns.",
    tags: ["Python", "Scikit-learn", "Pandas", "Classification"],
  },
  {
    slug: "sales-forecasting-engine",
    title: "Sales Forecasting Engine",
    description: "Built a time-series forecasting model (ARIMA) to predict quarterly sales, improving inventory management and reducing overhead by 15%.",
    tags: ["R", "Time-Series", "Forecasting", "Data Visualization"],
  },
  {
    slug: "nlp-sentiment-analysis",
    title: "Natural Language Processing for Sentiment Analysis",
    description: "Engineered an NLP pipeline to analyze customer feedback from social media, providing real-time insights into brand sentiment and product issues.",
    tags: ["NLP", "PyTorch", "TextBlob", "API Integration"],
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
      <div className="portfolio__header">
        <h2 className="portfolio__title">Case Studies</h2>
        <svg className="portfolio__connector" width="100" height="200" viewBox="0 0 100 200" preserveAspectRatio="none">
          <path d="M 50,0 Q 50,100 90,100 T 50,200" stroke="var(--color-accent-primary)" fill="none" strokeWidth="3" />
        </svg>
      </div>

      <div className="portfolio__grid">
        {caseStudies.map((study, index) => (
          <div
            className="portfolio-card"
            key={index}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <h3 className="portfolio-card__title">{study.title}</h3>
            <p className="portfolio-card__description">{study.description}</p>
            <div className="portfolio-card__tags">
              {study.tags.map((tag, tagIndex) => (
                <span key={tagIndex}>{tag}</span>
              ))}
            </div>
            
            {/* 3. The Link is now INSIDE the card, replacing the old <a> tag */}
            <Link to={`/case-study/${study.slug}`} className="portfolio-card__link" data-visited="false">
              Read Case Study →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Portfolio;