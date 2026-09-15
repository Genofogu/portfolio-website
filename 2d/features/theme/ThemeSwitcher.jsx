import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from './ThemeProvider';

function ThemeSwitcher() {
  const { theme, setSpecificTheme, themesList } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const activeTheme = themesList.find(t => t.id === theme) || themesList[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => { document.removeEventListener("mousedown", handleClickOutside); };
  }, [dropdownRef]);

  return (
    <div className="theme-switcher" ref={dropdownRef}>
      <button 
        className="theme-switcher__toggle" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Theme Menu"
      >
        <i className="fa-solid fa-palette"></i>
        <span className="theme-switcher__label desktop-only" style={{ marginLeft: '5px' }}>{activeTheme.name}</span>
      </button>

      {isOpen && (
        <div className="theme-switcher__dropdown">
          <div className="theme-switcher__header">Select Theme</div>
          <div className="theme-switcher__list">
            {themesList.map((t) => (
              <button
                key={t.id}
                className={`theme-switcher__item ${theme === t.id ? 'is-active' : ''}`}
                onClick={() => {
                  setSpecificTheme(t.id);
                  setIsOpen(false);
                }}
              >
                <span className="theme-circle" data-theme-preview={t.id}></span>
                {t.name}
                {theme === t.id && <i className="fa-solid fa-check theme-check"></i>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ThemeSwitcher;
