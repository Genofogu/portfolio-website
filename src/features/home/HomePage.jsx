import React from 'react';
import Hero from './Hero';
import Portfolio from './Portfolio';
import SocialCards from './SocialCards';
import Interactive3DSection from './Interactive3DSection';
import TimeLapseSection from './TimeLapseSection';
import LatestArticles from './LatestArticles';

function HomePage() {
  return (
    <>
      <Hero />
      <Portfolio />
      <SocialCards /> 
      <Interactive3DSection />
      <TimeLapseSection />
      <LatestArticles />
    </>
  );
}

export default HomePage;