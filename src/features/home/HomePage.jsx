import React from 'react';
import Hero from './Hero';
import Portfolio from './Portfolio';
import SocialCards from './SocialCards';
import Interactive3DSection from './Interactive3DSection';
import TimeLapseSection from './TimeLapseSection';

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