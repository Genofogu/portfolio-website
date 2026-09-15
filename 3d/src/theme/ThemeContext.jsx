import { createContext, useContext, useEffect, useMemo } from 'react';
import { useTheme as useGenoTheme } from '@2d/features/theme/ThemeProvider';
import { THEMES, THEME_IDS } from './ThemeConfig';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const { theme: genoTheme, setSpecificTheme } = useGenoTheme();

    const currentThemeId = useMemo(() => {
        return genoTheme === 'pure-light' ? THEME_IDS.PAPER : THEME_IDS.CYBER;
    }, [genoTheme]);

    const activeTheme = THEMES[currentThemeId];

    // Apply CSS Variables to document body dynamically
    useEffect(() => {
        const body = document.body;
        body.setAttribute('data-theme', genoTheme);

        // Set CSS custom properties
        Object.entries(activeTheme.cssVars).forEach(([key, value]) => {
            body.style.setProperty(key, value);
        });

        return () => {
            Object.keys(activeTheme.cssVars).forEach((key) => {
                body.style.removeProperty(key);
            });
        };
    }, [genoTheme, activeTheme]);

    const changeTheme = (themeId) => {
        if (themeId === THEME_IDS.PAPER) {
            setSpecificTheme('pure-light');
        } else {
            setSpecificTheme('cyber-neon');
        }
    };

    return (
        <ThemeContext.Provider value={{
            themeId: currentThemeId,
            theme: activeTheme,
            allThemes: Object.values(THEMES),
            setTheme: changeTheme,
            isPaper: currentThemeId === THEME_IDS.PAPER,
            isCyber: currentThemeId === THEME_IDS.CYBER
        }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
