// PaperBackground.jsx - Unified Backdrop Component (Paper & Cyber Worlds)

import { useMemo, useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { useTheme } from '../../../theme/ThemeContext';

const PaperBackground = () => {
    const { isPaper, isCyber } = useTheme();
    const cityGroupRef = useRef();

    // Load paper texture for the Sketchbook theme
    const paperTexture = useTexture('/textures/paper-texture.webp');

    // Transitions state for smooth blending
    const [cyberOpacity, setCyberOpacity] = useState(isCyber ? 1 : 0);
    const [paperOpacity, setPaperOpacity] = useState(isPaper ? 1 : 0);

    useEffect(() => {
        gsap.to({ val: cyberOpacity }, {
            val: isCyber ? 1 : 0,
            duration: 1.0,
            ease: 'power2.out',
            onUpdate: function() {
                setCyberOpacity(this.targets()[0].val);
            }
        });
        gsap.to({ val: paperOpacity }, {
            val: isPaper ? 1 : 0,
            duration: 1.0,
            ease: 'power2.out',
            onUpdate: function() {
                setPaperOpacity(this.targets()[0].val);
            }
        });
    }, [isCyber, isPaper]);

    // Create randomized skyscrapers data
    const buildings = useMemo(() => {
        const result = [];
        const colors = ['#00F5FF', '#FF2BD6', '#8B5CF6', '#4CC9F0', '#FF7A00'];
        for (let i = 0; i < 35; i++) {
            const height = 8 + Math.random() * 15;
            const width = 1.5 + Math.random() * 2.5;
            const depth = 1.5 + Math.random() * 2.5;
            const x = (Math.random() - 0.5) * 45;
            const z = -12 - Math.random() * 25;
            const y = -10 + height / 2;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const glowIntensity = 0.3 + Math.random() * 0.7;

            result.push({ x, y, z, width, height, depth, color, glowIntensity });
        }
        return result;
    }, []);

    // Flying vehicles (light trails)
    const vehicles = useMemo(() => {
        const result = [];
        for (let i = 0; i < 15; i++) {
            result.push({
                x: (Math.random() - 0.5) * 40,
                y: -3 + Math.random() * 12,
                z: -8 - Math.random() * 20,
                speed: 0.05 + Math.random() * 0.1,
                width: 0.1 + Math.random() * 0.2,
                color: Math.random() > 0.5 ? '#00F5FF' : '#FF2BD6'
            });
        }
        return result;
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (cityGroupRef.current && cyberOpacity > 0.01) {
            cityGroupRef.current.position.y = Math.sin(time * 0.5) * 0.05;
        }
    });

    return (
        <group>
            {/* ====================================================
                WORLD 1: Warm Paper Sketchbook Backdrop
                ==================================================== */}
            {paperOpacity > 0.01 && (
                <group>
                    {/* Main background plane - far back */}
                    <mesh position={[0, 0, -8]}>
                        <planeGeometry args={[25, 18]} />
                        <meshBasicMaterial
                            map={paperTexture}
                            color="#fafafa"
                            transparent
                            opacity={paperOpacity}
                        />
                    </mesh>

                    {/* Floor plane with grid effect */}
                    <mesh position={[0, -2.5, -2]} rotation={[-Math.PI / 2.5, 0, 0]}>
                        <planeGeometry args={[20, 15]} />
                        <meshBasicMaterial
                            color="#f5f5f5"
                            transparent
                            opacity={0.9 * paperOpacity}
                        />
                    </mesh>

                    {/* Subtle vignette corners using planes */}
                    <VignetteCorners opacity={paperOpacity} />
                </group>
            )}

            {/* ====================================================
                WORLD 2: Dark Cyberpunk Penthouse Backdrop
                ==================================================== */}
            {cyberOpacity > 0.01 && (
                <group>
                    {/* Dark Sky Backing */}
                    <mesh position={[0, 0, -40]}>
                        <planeGeometry args={[120, 80]} />
                        <meshBasicMaterial color="#050510" transparent opacity={cyberOpacity} />
                    </mesh>

                    {/* City Skyline */}
                    <group ref={cityGroupRef}>
                        {buildings.map((b, i) => (
                            <group key={`building-${i}`} position={[b.x, b.y, b.z]}>
                                {/* Main Building Body */}
                                <mesh>
                                    <boxGeometry args={[b.width, b.height, b.depth]} />
                                    <meshBasicMaterial color="#090B16" transparent opacity={cyberOpacity} />
                                </mesh>
                                {/* Neon Edge Highlight */}
                                <mesh position={[0, 0, b.depth / 2 + 0.01]}>
                                    <planeGeometry args={[b.width, b.height]} />
                                    <meshBasicMaterial 
                                        color={b.color} 
                                        transparent 
                                        opacity={0.15 * cyberOpacity} 
                                        wireframe
                                    />
                                </mesh>
                                {/* Holographic Glowing Top */}
                                <mesh position={[0, b.height / 2 + 0.1, 0]}>
                                    <boxGeometry args={[b.width * 0.8, 0.2, b.depth * 0.8]} />
                                    <meshBasicMaterial color={b.color} toneMapped={false} transparent opacity={cyberOpacity} />
                                </mesh>
                            </group>
                        ))}

                        {/* Flying Vehicles (Moving lights) */}
                        <FlyingVehicles vehicles={vehicles} opacity={cyberOpacity} />
                    </group>

                    {/* Volumetric Fog Plane (Far Back) */}
                    <mesh position={[0, -2, -15]} rotation={[-Math.PI / 2.5, 0, 0]}>
                        <planeGeometry args={[60, 30]} />
                        <meshBasicMaterial
                            color="#090B16"
                            transparent
                            opacity={0.7 * cyberOpacity}
                        />
                    </mesh>

                    {/* Cyber Grid Floor */}
                    <mesh position={[0, -2.5, -2]} rotation={[-Math.PI / 2.5, 0, 0]}>
                        <planeGeometry args={[25, 20]} />
                        <meshBasicMaterial
                            color="#050510"
                            transparent
                            opacity={0.95 * cyberOpacity}
                        />
                    </mesh>

                    {/* Luxury Penthouse Floor LED Strips */}
                    <mesh position={[0, -2.49, -2]} rotation={[-Math.PI / 2.5, 0, 0]}>
                        <planeGeometry args={[18, 0.05]} />
                        <meshBasicMaterial color="#FF2BD6" toneMapped={false} transparent opacity={cyberOpacity} />
                    </mesh>
                </group>
            )}

            {/* Grid lines - handles both notebook paper sketch lines and cyber energy grids */}
            <GridLines paperOpacity={paperOpacity} cyberOpacity={cyberOpacity} />
        </group>
    );
};

// Flying vehicles animation
const FlyingVehicles = ({ vehicles, opacity }) => {
    const groupRef = useRef();

    useFrame((state, delta) => {
        if (!groupRef.current) return;
        groupRef.current.children.forEach((mesh, index) => {
            const v = vehicles[index];
            mesh.position.x += v.speed;
            if (mesh.position.x > 25) {
                mesh.position.x = -25;
            }
        });
    });

    return (
        <group ref={groupRef}>
            {vehicles.map((v, i) => (
                <mesh key={`vehicle-${i}`} position={[v.x, v.y, v.z]}>
                    <boxGeometry args={[v.width * 4, v.width, v.width]} />
                    <meshBasicMaterial color={v.color} toneMapped={false} transparent opacity={opacity} />
                </mesh>
            ))}
        </group>
    );
};

// Unified grid perspective rendering
const GridLines = ({ paperOpacity, cyberOpacity }) => {
    const lines = useMemo(() => {
        const result = [];
        // Horizontal grid lines
        for (let i = -8; i <= 8; i++) {
            result.push({
                position: [0, -2.48 + i * 0.01, -2 - i * 1.0],
                width: 25,
                // Paper grid opacity mapping
                paperOpacity: Math.max(0, 0.15 - Math.abs(i) * 0.01),
                // Cyber grid opacity mapping
                cyberOpacity: Math.max(0, 0.4 - Math.abs(i) * 0.04),
                cyberColor: i % 2 === 0 ? '#00F5FF' : '#FF2BD6'
            });
        }
        return result;
    }, []);

    return (
        <group>
            {/* Sketchbook Notebook Grid Lines */}
            {paperOpacity > 0.01 && lines.map((line, i) => (
                <mesh
                    key={`paper-grid-${i}`}
                    position={line.position}
                    rotation={[-Math.PI / 2.5, 0, 0]}
                >
                    <planeGeometry args={[15, 0.01]} />
                    <meshBasicMaterial
                        color="#cccccc"
                        transparent
                        opacity={line.paperOpacity * paperOpacity}
                    />
                </mesh>
            ))}

            {/* Cyber Neon Energy Grid Lines */}
            {cyberOpacity > 0.01 && lines.map((line, i) => (
                <mesh
                    key={`cyber-grid-${i}`}
                    position={line.position}
                    rotation={[-Math.PI / 2.5, 0, 0]}
                >
                    <planeGeometry args={[line.width, 0.02]} />
                    <meshBasicMaterial
                        color={line.cyberColor}
                        transparent
                        opacity={line.cyberOpacity * cyberOpacity}
                        toneMapped={false}
                    />
                </mesh>
            ))}
        </group>
    );
};

// Warm paper sketchbook border shadow vignette
const VignetteCorners = ({ opacity }) => {
    return (
        <group>
            <mesh position={[-6, 4, 0]}>
                <circleGeometry args={[3, 32]} />
                <meshBasicMaterial
                    color="#000000"
                    transparent
                    opacity={0.03 * opacity}
                />
            </mesh>
            <mesh position={[6, 4, 0]}>
                <circleGeometry args={[3, 32]} />
                <meshBasicMaterial
                    color="#000000"
                    transparent
                    opacity={0.03 * opacity}
                />
            </mesh>
        </group>
    );
};

export default PaperBackground;
