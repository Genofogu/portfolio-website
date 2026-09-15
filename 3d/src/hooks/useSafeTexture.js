// useSafeTexture.js - Safe Asset Loading & Caching with Graceful Fallbacks

import { useEffect, useState } from 'react';
import * as THREE from 'three';

// Centralized texture cache and placeholder generator
const textureCache = new Map();

const createPlaceholderTexture = (hexColor = '#1e293b') => {
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = hexColor;
    ctx.fillRect(0, 0, 16, 16);
    
    // Draw a subtle grid pattern on placeholder so it is visually identifiable in dev
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, 16, 16);
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.name = `fallback-${hexColor}`;
    return texture;
};

/**
 * useSafeTexture Hook
 * Loads WebGL textures asynchronously, caches them, and handles loading errors gracefully.
 */
export const useSafeTexture = (url, options = {}) => {
    const [texture, setTexture] = useState(() => {
        if (!url) return createPlaceholderTexture('#050510');
        if (textureCache.has(url)) return textureCache.get(url);
        return createPlaceholderTexture('#1e293b');
    });

    useEffect(() => {
        if (!url) return;
        
        if (textureCache.has(url)) {
            setTexture(textureCache.get(url));
            return;
        }

        const loader = new THREE.TextureLoader();
        
        const handleSuccess = (loadedTexture) => {
            // Apply standard wrap & repetition settings
            if (options.wrapS) loadedTexture.wrapS = options.wrapS;
            if (options.wrapT) loadedTexture.wrapT = options.wrapT;
            if (options.repeat) {
                loadedTexture.repeat.set(options.repeat[0], options.repeat[1]);
            }
            loadedTexture.colorSpace = THREE.SRGBColorSpace;
            loadedTexture.needsUpdate = true;

            textureCache.set(url, loadedTexture);
            setTexture(loadedTexture);
        };

        const handleFailure = (err) => {
            if (import.meta.env.DEV) {
                console.warn(`[useSafeTexture] Failed to load asset: "${url}". Falling back to safe solid placeholder.`);
            }
            // Use distinct color for failed textures to help debugging
            const fallback = createPlaceholderTexture('#ff007f'); 
            textureCache.set(url, fallback);
            setTexture(fallback);
        };

        loader.load(url, handleSuccess, undefined, handleFailure);
        
    }, [url, options.wrapS, options.wrapT, options.repeat]);

    return texture;
};
