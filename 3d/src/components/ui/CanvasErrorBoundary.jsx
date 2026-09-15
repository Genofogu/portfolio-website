// CanvasErrorBoundary.jsx - Safe Render Guard for 3D Canvas

import React, { Component } from 'react';
import '../../styles/ThemeSwitcher.scss'; // Reuse gorgeous cyberpunk style tokens

class CanvasErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('[CanvasErrorBoundary] Captured render crash:', error, errorInfo);
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null });
        // Attempt to dispatch scene reload signals if relevant
        window.dispatchEvent(new CustomEvent('canvas-recover'));
    };

    render() {
        if (this.state.hasError) {
            return (
                <div 
                    style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(5, 5, 16, 0.9)',
                        zIndex: 99,
                        fontFamily: "var(--font-primary)",
                        color: '#f5f5f5',
                        padding: '24px',
                        textAlign: 'center'
                    }}
                >
                    <div 
                        className="theme-modal" 
                        style={{ 
                            transform: 'scale(1)', 
                            maxWidth: '440px', 
                            pointerEvents: 'auto' 
                        }}
                    >
                        <div className="theme-modal-header">
                            <h2 style={{ color: 'var(--color-neon-magenta)' }}>Engine Alert</h2>
                        </div>
                        <div style={{ margin: '16px 0', fontSize: '0.9rem', color: '#94a3b8', lineHeight: '1.4' }}>
                            <p style={{ marginBottom: '12px' }}>
                                A WebGL or texture rendering exception was intercepted.
                            </p>
                            <code 
                                style={{ 
                                    display: 'block', 
                                    padding: '10px', 
                                    background: 'rgba(0,0,0,0.3)', 
                                    borderRadius: '6px', 
                                    color: '#f43f5e',
                                    fontSize: '0.8rem',
                                    textAlign: 'left',
                                    overflowX: 'auto',
                                    maxHeight: '100px',
                                    fontFamily: 'monospace'
                                }}
                            >
                                {this.state.error?.toString() || 'WebGL Context Lost'}
                            </code>
                        </div>
                        <button
                            onClick={this.handleRetry}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '10px 20px',
                                background: 'rgba(0, 245, 255, 0.1)',
                                border: '1px solid var(--color-neon-cyan)',
                                color: '#fff',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                fontFamily: 'var(--font-title)',
                                letterSpacing: '1px',
                                fontSize: '0.9rem',
                                textTransform: 'uppercase'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = 'rgba(0, 245, 255, 0.25)';
                                e.target.style.boxShadow = '0 0 15px rgba(0, 245, 255, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = 'rgba(0, 245, 255, 0.1)';
                                e.target.style.boxShadow = 'none';
                            }}
                        >
                            ⚡ Restore Canvas
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default CanvasErrorBoundary;
