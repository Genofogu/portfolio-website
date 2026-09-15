// Theme System Configurations - Highly Scalable Theme Architecture

export const THEME_IDS = {
    PAPER: 'paper',
    CYBER: 'cyber'
};

export const THEMES = {
    [THEME_IDS.PAPER]: {
        id: THEME_IDS.PAPER,
        name: 'Paper Sketch',
        description: 'Minimal architectural notebook with hand-drawn illustrations and warm cozy lighting.',
        thumbnail: '📄',
        previewImage: '/textures/paper-texture.webp', // Can use fallback texture
        cssVars: {
            '--color-bg': '#ffffff',
            '--color-bg-secondary': '#fafafa',
            '--color-panel': 'rgba(255, 255, 255, 0.85)',
            '--color-text': '#1a1a1a',
            '--color-text-secondary': '#666666',
            '--color-neon-cyan': '#1a1a1a', // Pencil charcoal style
            '--color-neon-magenta': '#d97706', // Warm amber accent
            '--border-color': 'rgba(26, 26, 26, 0.15)',
            '--font-primary': "'Patrick Hand', cursive, sans-serif",
            '--font-title': "'Patrick Hand', cursive, sans-serif"
        },
        threeVars: {
            fogColor: '#fafafa',
            fogNear: 5,
            fogFar: 25,
            ambientColor: '#ffffff',
            ambientIntensity: 0.75,
            dirColor: '#fffaed',
            dirIntensity: 0.85,
            dirPosition: [5, 10, 5],
            hemisphereSkyColor: '#ffffff',
            hemisphereGroundColor: '#e0e0e0',
            hemisphereIntensity: 0.5
        },
        audio: {
            ambience: '/sounds/cfl_turningpages-belem-breeze-487596.ogg', // warm acoustic
            ambienceVolume: 0.3
        }
    },
    [THEME_IDS.CYBER]: {
        id: THEME_IDS.CYBER,
        name: 'Cyber Neon',
        description: 'Futuristic neon city penthouse with glass, chrome, glowing holograms, and wet reflections.',
        thumbnail: '🌆',
        previewImage: '/og-image.webp', // or matching cyberpunk graphic
        cssVars: {
            '--color-bg': '#050510',
            '--color-bg-secondary': '#090B16',
            '--color-panel': 'rgba(22, 27, 47, 0.75)',
            '--color-text': '#F5F5F5',
            '--color-text-secondary': 'rgba(245, 245, 245, 0.6)',
            '--color-neon-cyan': '#00F5FF',
            '--color-neon-magenta': '#FF2BD6',
            '--border-color': 'rgba(255, 255, 255, 0.08)',
            '--font-primary': "'Space Grotesk', sans-serif",
            '--font-title': "'Orbitron', sans-serif"
        },
        threeVars: {
            fogColor: '#050510',
            fogNear: 2,
            fogFar: 18,
            ambientColor: '#0a0a23',
            ambientIntensity: 0.35,
            dirColor: '#00F5FF',
            dirIntensity: 0.7,
            dirPosition: [-5, 8, -5],
            hemisphereSkyColor: '#00F5FF',
            hemisphereGroundColor: '#FF2BD6',
            hemisphereIntensity: 0.25
        },
        audio: {
            ambience: '/sounds/cfl_turningpages-belem-breeze-487596.ogg', // custom synths/lofi if configured, otherwise fallback to keep functionality
            ambienceVolume: 0.25
        }
    }
};
