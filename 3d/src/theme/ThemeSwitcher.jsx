// ThemeSwitcher.jsx - Cinematic World Selector

import { useState, useEffect, useRef } from 'react';
import { useTheme } from './ThemeContext';
import '../styles/ThemeSwitcher.scss';

const ThemeSwitcher = () => {
    const { themeId, allThemes, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef(null);
    const triggerRef = useRef(null);

    // Toggle modal visibility
    const toggleModal = () => {
        setIsOpen(prev => !prev);
    };

    // Close modal on Escape key press
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
                triggerRef.current?.focus();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    // Handle backdrop click
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            setIsOpen(false);
        }
    };

    return (
        <div className="theme-switcher-container">
            {/* Floating FAB trigger button */}
            <button
                ref={triggerRef}
                className="theme-fab-btn"
                onClick={toggleModal}
                aria-label="Open theme switcher modal"
                aria-expanded={isOpen}
            >
                <span className="icon">🌓</span>
            </button>

            {/* Modal dialog overlay */}
            <div
                className={`theme-modal-backdrop ${isOpen ? 'open' : ''}`}
                onClick={handleBackdropClick}
                aria-hidden={!isOpen}
            >
                <div
                    ref={modalRef}
                    className="theme-modal"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="theme-modal-title"
                >
                    <div className="theme-modal-header">
                        <h2 id="theme-modal-title">Select World</h2>
                        <button
                            className="close-btn"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close theme switcher modal"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="themes-grid">
                        {allThemes.map((t) => {
                            const isActive = t.id === themeId;
                            return (
                                <div
                                    key={t.id}
                                    className={`theme-card ${isActive ? 'active' : ''}`}
                                    onClick={() => {
                                        setTheme(t.id);
                                        // Auto-close with a tiny delay for ripple/active visualization
                                        setTimeout(() => setIsOpen(false), 250);
                                    }}
                                    role="button"
                                    aria-pressed={isActive}
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            setTheme(t.id);
                                            setTimeout(() => setIsOpen(false), 250);
                                        }
                                    }}
                                >
                                    <div className="theme-thumbnail-box">
                                        {t.thumbnail}
                                    </div>
                                    <div className="theme-info">
                                        <h4>{t.name}</h4>
                                        <p>{t.description}</p>
                                    </div>
                                    <div className="active-badge" aria-hidden="true">
                                        ✓
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThemeSwitcher;
