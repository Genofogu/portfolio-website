import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

function Contact() {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section 
      id="contact" 
      className={`contact ${isVisible ? 'is-visible' : ''}`} 
      ref={sectionRef}
    >
      <h2 className="contact__title">Get In Touch</h2>
      <p className="contact__subtitle">
        I'm currently open to new opportunities and collaborations. If you have a project in mind or just want to connect, feel free to reach out.
      </p>
      <a href="anugaur300@gmail.com" className="contact__button">
        Say Hello
      </a>
      <div className="contact__socials">
        <a href="https://github.com/genofogu" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://linkedin.com/in/genofogu" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        {/* Add other links like Twitter or a blog if you have them */}
      </div>
    </section>
  );
}

export default Contact;