import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

function About() {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section 
      id="about" 
      className={`about ${isVisible ? 'is-visible' : ''}`} 
      ref={sectionRef}
    >
      <h2 className="about__title">Synthesizing Data, Driving Decisions</h2>
      <div className="about__content">
        <div className="about__text">
          <p>
            I am a results-driven data scientist with a passion for uncovering the narratives hidden within data. My expertise lies in leveraging statistical modeling, machine learning, and advanced analytics to solve complex business problems and inform high-stakes decisions.
          </p>
          <p>
            From predictive modeling to natural language processing, I am adept at managing the entire data lifecycle. My objective is to not only analyze data but to build scalable, data-driven products and frameworks that create lasting value and competitive differentiation.
          </p>
        </div>
        <div className="about__skills">
          {/* NEW SKILLS: Focused on the data science toolkit */}
          <h3>Core Competencies:</h3>
          <ul>
            <li>Python (Pandas, NumPy, Scikit-learn)</li>
            <li>TensorFlow / PyTorch</li>
            <li>SQL & NoSQL Databases</li>
            <li>Cloud Platforms (AWS, GCP, Azure)</li>
            <li>Data Visualization (Tableau, Matplotlib)</li>
            <li>Big Data Technologies (Spark, Hadoop)</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default About;