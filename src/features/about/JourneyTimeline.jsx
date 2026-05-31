import React from 'react';

function JourneyTimeline() {
  const timelineItems = [
    {
      title: "The Beginning",
      desc: "Discovered programming in school. Wrote my first lines of code and realized I could build anything."
    },
    {
      title: "Data Science Era",
      desc: "Dived deep into Python, Pandas, and Scikit-Learn. Learned how to extract stories and predictions from raw data."
    },
    {
      title: "AI & Cloud Architecture",
      desc: "Shifted focus to deploying models at scale. Mastered AWS, GCP, and integrating LLMs via RAG pipelines."
    },
    {
      title: "Building Vespera & Beyond",
      desc: "Currently developing Vespera, a productivity hub, while pursuing my MCA and laying the groundwork for Aetheris Labs."
    }
  ];

  return (
    <div className="timeline">
      {timelineItems.map((item, idx) => (
        <div key={idx} className="timeline__item">
          <div className="timeline__dot"></div>
          <div className="timeline__content glass-card">
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default JourneyTimeline;
