import React, { useEffect, useRef } from 'react';

const socialData = [
  {
    name: "GitHub",
    icon: "fa-brands fa-github",
    metric: "Open Source",
    value: "Projects",
    link: "https://github.com/genofogu",
    callToAction: "Explore Code"
  },
  {
    name: "LinkedIn",
    icon: "fa-brands fa-linkedin",
    metric: "Professional",
    value: "Network",
    link: "https://linkedin.com/in/genofogu",
    callToAction: "Connect"
  },
  {
    name: "Instagram",
    icon: "fa-brands fa-instagram",
    metric: "Creative",
    value: "Journal",
    link: "https://instagram.com/genofogu",
    callToAction: "Follow"
  }
];

function SocialCards() {
  const cardsContainerRef = useRef(null);

  useEffect(() => {
    const cardsContainer = cardsContainerRef.current;
    if (!cardsContainer) return;

    const handleMouseMove = (e) => {
      const cards = cardsContainer.querySelectorAll(".card");
      for (const card of cards) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      }
    };

    cardsContainer.addEventListener("mousemove", handleMouseMove);

    return () => {
      cardsContainer.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="g-section">
      <div id="cards" ref={cardsContainerRef}>
        {socialData.map((social, index) => (
          <div className="card" key={index}>
            <div className="card_content">
              <i className={social.icon}></i>
              <h2>{social.name}</h2>
              <p>{social.metric} <br/><span>{social.value}</span></p>
              <a href={social.link} target="_blank" rel="noopener noreferrer">
                <span>{social.callToAction}</span>
                <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SocialCards;