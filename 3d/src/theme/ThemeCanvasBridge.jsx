// ThemeCanvasBridge.jsx - Smooth 3D Canvas Theme Interpolator

import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { useTheme } from './ThemeContext';

const ThemeCanvasBridge = () => {
    const { theme } = useTheme();
    const { scene } = useThree();

    useEffect(() => {
        if (!scene) return;

        // Target settings from current theme
        const targetColor = new THREE.Color(theme.threeVars.fogColor);
        const targetNear = theme.threeVars.fogNear;
        const targetFar = theme.threeVars.fogFar;

        // 1. Interpolate Scene Background Color
        if (scene.background) {
            gsap.to(scene.background, {
                r: targetColor.r,
                g: targetColor.g,
                b: targetColor.b,
                duration: 1.0,
                ease: 'power2.out'
            });
        } else {
            scene.background = new THREE.Color(theme.threeVars.fogColor);
        }

        // 2. Interpolate Scene Fog properties
        if (scene.fog) {
            gsap.to(scene.fog.color, {
                r: targetColor.r,
                g: targetColor.g,
                b: targetColor.b,
                duration: 1.0,
                ease: 'power2.out'
            });

            gsap.to(scene.fog, {
                near: targetNear,
                far: targetFar,
                duration: 1.0,
                ease: 'power2.out'
            });
        }
    }, [theme, scene]);

    return null;
};

export default ThemeCanvasBridge;
