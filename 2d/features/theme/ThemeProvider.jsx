import React, { createContext, useContext, useState, useEffect } from 'react';
import { themesList } from './themes';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('geno-theme');
    return savedTheme || 'geno-legacy';
  });

  useEffect(() => {
    localStorage.setItem('geno-theme', theme);
    document.body.setAttribute('data-theme', theme);
    window.dispatchEvent(new CustomEvent('itom-theme-sync-from-2d', { detail: theme }));
  }, [theme]);

  useEffect(() => {
    const handleSync = (e) => {
      const theme3D = e.detail;
      if (theme3D === 'paper') {
        if (theme !== 'pure-light') setTheme('pure-light');
      } else if (theme3D === 'cyber') {
        if (theme === 'pure-light') setTheme('cyber-neon');
      }
    };
    window.addEventListener('geno-theme-sync', handleSync);
    return () => window.removeEventListener('geno-theme-sync', handleSync);
  }, [theme]);

  const cycleTheme = () => {
    setTheme(prev => {
      const currentIndex = themesList.findIndex(t => t.id === prev);
      const nextIndex = (currentIndex + 1) % themesList.length;
      return themesList[nextIndex].id;
    });
  };

  const setSpecificTheme = (themeId) => {
    if (themesList.find(t => t.id === themeId)) {
      setTheme(themeId);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, cycleTheme, setSpecificTheme, themesList }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
