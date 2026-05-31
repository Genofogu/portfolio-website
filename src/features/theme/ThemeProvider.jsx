import React, { createContext, useContext, useState, useEffect } from 'react';
import { themesList } from './themes';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('genofogu-theme');
    return savedTheme || 'genofogu-legacy';
  });

  useEffect(() => {
    localStorage.setItem('genofogu-theme', theme);
    document.body.setAttribute('data-theme', theme);
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
