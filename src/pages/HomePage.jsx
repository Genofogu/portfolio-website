import React from 'react';
import Hero from '../components/Hero';
import Portfolio from '../components/Portfolio';
import SocialCards from '../components/SocialCards'; // 1. Import it
import Interactive3DSection from '../components/Interactive3DSection';
import TimeLapseSection from '../components/TimeLapseSection';

function HomePage() {
  return (
    <>
      <Hero />
      <Portfolio />
      <SocialCards /> 
      <Interactive3DSection />
      <TimeLapseSection />
    </>
  );
}

export default HomePage;