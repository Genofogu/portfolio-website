import React from 'react';

// Import all of your homepage components
import Hero from '../components/Hero';
import Portfolio from '../components/Portfolio';
import Interactive3DSection from '../components/Interactive3DSection';
import TimeLapseSection from '../components/TimeLapseSection'; 

function HomePage() {
  return (
    <>
      <Hero />
      <Portfolio />
      <Interactive3DSection />
      <TimeLapseSection /> 
    </>
  );
}

export default HomePage;