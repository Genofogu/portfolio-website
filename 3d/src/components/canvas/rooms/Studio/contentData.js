/**
 * Studio Content Data
 * 
 * This file contains all content items for the Studio monitor tower.
 * Each item will be displayed on a monitor in the tower.
 * 
 * Platforms: 'youtube', 'blog', 'tiktok'
 */

export const PLATFORM_CONFIG = {
    youtube: {
        color: '#FF0000',
        accentColor: '#cc0000',
        icon: '▶',
        label: 'YouTube',
        shape: 'tv', // Wide CRT style
    },
    blog: {
        color: '#4A90D9',
        accentColor: '#2d6cb5',
        icon: '📝',
        label: 'Blog',
        shape: 'monitor', // Thin desktop monitor
    },
    tiktok: {
        color: '#00F2EA',
        accentColor: '#FF0050',
        icon: '🎵',
        label: 'TikTok',
        shape: 'phone', // Vertical phone
    },
};

// Genofogu Studio Content Data
const RAW_CONTENT_DATA = [
    // ============ Products & Platforms ============
    {
        id: 'prod-001',
        platform: 'youtube',
        title: 'Inhaby — Full-Stack Property & Tenant Ecosystem',
        description: 'Multi-app architecture connecting Tenant, Owner, and Admin workflows with React, Node, Supabase, and Vercel.',
        frontTexture: '/textures/studio/tvfront_filmikprojektdlamultiego.webp',
        paintedFrontTexture: '/textures/studio/tvfront_filmikprojektdlamultiego_painted.webp',
        thumbnail: null,
        url: 'https://github.com/geno',
        date: '2026-09-15',
        views: '15.4K',
        duration: 'Production',
    },
    {
        id: 'prod-002',
        platform: 'youtube',
        title: 'HourOS & Homlap — System & Product Architecture',
        description: 'Experimental tools, scheduling engines, and modular developer environments.',
        frontTexture: '/textures/studio/tvfront_filmikedytowaniezdjec.webp',
        paintedFrontTexture: '/textures/studio/tvfront_filmikedytowaniezdjec_painted.webp',
        thumbnail: null,
        url: 'https://github.com/geno',
        date: '2026-08-20',
        views: '8.2K',
        duration: 'Beta',
    },
    {
        id: 'prod-003',
        platform: 'youtube',
        title: 'AI & Data Science Exploration',
        description: 'Building custom RAG systems, model evaluation pipelines, and research tools.',
        thumbnail: null,
        url: 'https://github.com/geno',
        date: '2026-07-15',
        views: '12.1K',
        duration: 'Research',
    },
    {
        id: 'prod-004',
        platform: 'youtube',
        title: 'Cloud Native & Microservices Integration',
        description: 'Scalable API designs, event queues, and deployment automation.',
        thumbnail: null,
        url: 'https://github.com/geno',
        date: '2026-06-10',
        views: '9.8K',
        duration: 'Arch',
    },

    // ============ Blog Posts ============
    {
        id: 'blog-001',
        platform: 'blog',
        title: 'The Unfinished Path: An Autobiographical Life Journal',
        description: 'A long-form reflection on internal friction, building Inhaby, productivity loops, and self-understanding.',
        frontTexture: '/textures/studio/monitorfront_postnafbdoublewinner.webp',
        paintedFrontTexture: '/textures/studio/monitorfront_postnafbdoublewinner_painted.webp',
        thumbnail: null,
        url: '/blog/the-unfinished-path-autobiographical-portfolio-life-journal',
        date: '2026-09-15',
        readTime: '25 min',
    },
    {
        id: 'blog-002',
        platform: 'blog',
        title: 'Designing AI Products with Trust in Mind',
        description: 'Building AI systems that balance usability, reliability, and human-centered trust.',
        thumbnail: null,
        url: '/blog/designing-ai-products-with-trust',
        date: '2026-06-05',
        readTime: '7 min',
    },
    {
        id: 'blog-003',
        platform: 'blog',
        title: 'Data Science Workflow for Modern Teams',
        description: 'Practical steps to move from raw data to insight-driven decisions.',
        thumbnail: null,
        url: '/blog/data-science-workflow-for-modern-teams',
        date: '2026-05-18',
        readTime: '9 min',
    },
    {
        id: 'blog-004',
        platform: 'blog',
        title: 'Building Interactive 3D Web Experiences',
        description: 'Three.js and WebGL optimization techniques for production apps.',
        thumbnail: null,
        url: '/blog',
        date: '2026-04-12',
        readTime: '8 min',
    },

    // ============ Tech Highlights ============
    {
        id: 'tt-001',
        platform: 'tiktok',
        title: 'Genofogu 3D Experience ✨',
        description: 'Exploring WebGL, Three.js, and spatial web design.',
        frontTexture: '/textures/studio/phonefront_followmeontiktok.webp',
        paintedFrontTexture: '/textures/studio/phonefront_followmeontiktok_painted.webp',
        thumbnail: null,
        url: 'https://github.com/geno',
        date: '2026-09-15',
        views: '45.2K',
        likes: '3.8K',
    },
    {
        id: 'tt-002',
        platform: 'tiktok',
        title: 'Inhaby Multi-App Auth Flow 🚪',
        description: 'Supabase RLS & Role-based Access Control in action.',
        thumbnail: null,
        url: 'https://github.com/geno',
        date: '2026-08-30',
        views: '18.5K',
        likes: '1.9K',
    },
];

const ytTextures = ['/textures/studio/tvfront_filmikprojektdlamultiego.webp', '/textures/studio/tvfront_filmikedytowaniezdjec.webp'];
const ytPaintedTextures = ['/textures/studio/tvfront_filmikprojektdlamultiego_painted.webp', '/textures/studio/tvfront_filmikedytowaniezdjec_painted.webp'];
const blogTextures = ['/textures/studio/monitorfront_postnafbdoublewinner.webp'];
const blogPaintedTextures = ['/textures/studio/monitorfront_postnafbdoublewinner_painted.webp'];
const ttTextures = ['/textures/studio/phonefront_followmeontiktok.webp'];
const ttPaintedTextures = ['/textures/studio/phonefront_followmeontiktok_painted.webp'];

let ytIdx = 0, blogIdx = 0, ttIdx = 0;
let ytPIdx = 0, blogPIdx = 0, ttPIdx = 0;

export const CONTENT_DATA = RAW_CONTENT_DATA.map((item) => {
    return {
        ...item,
        frontTexture: item.frontTexture || (
            item.platform === 'youtube' ? ytTextures[ytIdx++ % ytTextures.length] :
                item.platform === 'blog' ? blogTextures[blogIdx++ % blogTextures.length] :
                    ttTextures[ttIdx++ % ttTextures.length]
        ),
        paintedFrontTexture: item.paintedFrontTexture || (
            item.platform === 'youtube' ? ytPaintedTextures[ytPIdx++ % ytPaintedTextures.length] :
                item.platform === 'blog' ? blogPaintedTextures[blogPIdx++ % blogPaintedTextures.length] :
                    ttPaintedTextures[ttPIdx++ % ttPaintedTextures.length]
        )
    };
});

// Helper to get content by platform
export const getContentByPlatform = (platform) => {
    if (platform === 'all') return CONTENT_DATA;
    return CONTENT_DATA.filter(item => item.platform === platform);
};

// Get latest content (for "On Air" indicator)
export const getLatestContent = () => {
    return [...CONTENT_DATA].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
};
