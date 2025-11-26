import React, { useEffect, useRef } from 'react';

// --- Data for our cards ---
const socialData = [
  {
    name: "Instagram",
    icon: "fa-brands fa-instagram",
    metric: "Followers",
    value: "625k",
    link: "https://www.instagram.com/your-username",
    callToAction: "Follow me"
  },
  {
    name: "Github",
    icon: "fa-brands fa-github",
    metric: "Followers",
    value: "150k",
    link: "https://github.com/your-username",
    callToAction: "Follow me"
  },
  {
    name: "Linkedin",
    icon: "fa-brands fa-linkedin",
    metric: "Connection",
    value: "100k",
    link: "https://www.linkedin.com/in/your-username",
    callToAction: "Connect"
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
    <div id="cards" ref={cardsContainerRef}>
      {socialData.map((social, index) => (
        <div className="card" key={index}>
          <div className="card_content">
            <i className={social.icon}></i>
            <h2>{social.name}</h2>
            <p>{social.metric} : <span>{social.value}</span></p>
            <a href={social.link} target="_blank" rel="noopener noreferrer">
              <i className="fa-solid fa-link"></i>
              <span>{social.callToAction}</span>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SocialCards;