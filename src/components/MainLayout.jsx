import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import FluidFooter from './FluidFooter';
import CustomCursor from './CustomCursor/CustomCursor';
import '../styles/main.scss';

function MainLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.location.hash) {
      // Delay slightly to let the page render first
      setTimeout(() => {
        const id = window.location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }, 100);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <>
      <CustomCursor />
      <Header />
      <main className="g-container">
        <Outlet />
      </main>
      <FluidFooter />
    </>
  );
}

export default MainLayout;