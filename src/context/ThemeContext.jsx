import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themesList = [
  { id: 'geno-dark', name: 'Geno Dark' },
  { id: 'soulwake', name: 'SoulWake' },
  { id: 'inferno', name: 'Inferno' },
  { id: 'emerald', name: 'Emerald' },
  { id: 'royal-gold', name: 'Royal Gold' },
  { id: 'sakura', name: 'Sakura' },
  { id: 'ocean', name: 'Ocean' },
  { id: 'pure-light', name: 'Pure Light' }
];

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('genofogu-theme');
    return savedTheme || 'geno-dark';
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