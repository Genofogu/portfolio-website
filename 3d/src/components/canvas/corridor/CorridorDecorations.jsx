// CorridorDecorations.jsx - Decorative Props & Interactive Frames (Paper & Cyber Worlds)

import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import gsap from 'gsap';
import { useTheme } from '../../../theme/ThemeContext';
import { useSafeTexture } from '../../../hooks/useSafeTexture';
import '../shaders/RevealMaterial';
import { isTouchDevice } from '../../../utils/deviceDetect';

// Global variables for useFrame to prevent GC stalls
const tempPos = new THREE.Vector3();
const tempRot = new THREE.Quaternion();
const tempScale = new THREE.Vector3();
const tempCamDir = new THREE.Vector3();
const tempEuler = new THREE.Euler();
const tempQuat = new THREE.Quaternion();

const CABIN_SKETCH_URL = '/fonts/CabinSketch-Regular.ttf';
const CYBER_FONT_URL = '/fonts/orbitron-700.ttf';

const PictureContent = ({ imagePath, imagePaintedPath, width, height, isPainted }) => {
    const texture = useSafeTexture(imagePath);
    const paintedTexture = useSafeTexture(imagePaintedPath || imagePath);
    const materialRef = useRef();

    useEffect(() => {
        if (!materialRef.current || !imagePaintedPath) return;

        if (isPainted) {
            gsap.to(materialRef.current, {
                uProgress: 1.0,
                duration: 0.8,
                ease: 'power2.out',
                overwrite: true
            });
        } else {
            gsap.to(materialRef.current, {
                uProgress: 0.0,
                duration: 0.5,
                ease: 'power2.out',
                overwrite: true
            });
        }
    }, [isPainted, imagePaintedPath]);

    return (
        <group position={[0, 0, 0.01]}>
            {imagePaintedPath && (
                <mesh position={[0, 0, -0.001]}>
                    <planeGeometry args={[width, height]} />
                    <meshBasicMaterial 
                        color="#ffffff"
                        map={paintedTexture}
                        transparent={true}
                        alphaTest={0.5}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            )}
            <mesh position={[0, 0, 0]}>
                <planeGeometry args={[width, height]} />
                {imagePaintedPath ? (
                    <revealMaterial 
                        color="#ffffff"
                        ref={materialRef}
                        map={texture}
                        transparent={true}
                        alphaTest={0.1}
                        side={THREE.DoubleSide}
                        uProgress={0.0}
                    />
                ) : (
                    <meshBasicMaterial 
                        color="#ffffff"
                        map={texture}
                        transparent={true}
                        alphaTest={0.1}
                        side={THREE.DoubleSide}
                    />
                )}
            </mesh>
        </group>
    );
};

// Inspectable Project Frame Component
const InspectableFrame = ({ frame, wallX, frameTexture, framePaintedTexture, isPaper, setCameraOverride }) => {
    const { camera, viewport } = useThree();
    const groupRef = useRef();
    const frameMaterialRef = useRef();
    const framePaintedRef = useRef();
    const compileFramesRef = useRef(0);
    const hideDelayRef = useRef();

    const originalPos = useMemo(() => new THREE.Vector3(
        frame.side === 'left' ? -wallX + (frame.offsetFromWall || 0) : wallX - (frame.offsetFromWall || 0),
        frame.y,
        frame.z
    ), [frame, wallX]);

    const originalRot = useMemo(() => new THREE.Euler(
        0, frame.side === 'left' ? Math.PI / 2 : -Math.PI / 2, 0
    ), [frame.side]);

    const [isHovered, setIsHovered] = useState(false);
    const [isInspected, setIsInspected] = useState(false);

    const isTouch = useMemo(() => isTouchDevice(), []);
    const isMobile = viewport.width < 5 || viewport.aspect < 0.8 || isTouch;

    useEffect(() => {
        return () => {
            if (isInspected) {
                if (setCameraOverride) setCameraOverride(false);
                window.dispatchEvent(new CustomEvent('inspectChange', { detail: false }));
            }
        };
    }, [isInspected, setCameraOverride]);

    useEffect(() => {
        if (isHovered && !isMobile) document.body.style.cursor = 'pointer';
        else document.body.style.cursor = 'auto';
    }, [isHovered, isMobile]);

    useEffect(() => {
        if (!frameMaterialRef.current) return;

        const shouldBePainted = isHovered || isInspected;

        if (shouldBePainted) {
            if (hideDelayRef.current) hideDelayRef.current.kill();
            if (framePaintedRef.current) framePaintedRef.current.visible = true;

            gsap.to(frameMaterialRef.current, {
                uProgress: 1.0,
                duration: 0.8,
                ease: 'power2.out',
                overwrite: true
            });
        } else {
            gsap.to(frameMaterialRef.current, {
                uProgress: 0.0,
                duration: 0.5,
                ease: 'power2.out',
                overwrite: true
            });

            hideDelayRef.current = gsap.delayedCall(0.55, () => {
                if (framePaintedRef.current) framePaintedRef.current.visible = false;
            });
        }

        return () => {
            if (hideDelayRef.current) hideDelayRef.current.kill();
        };
    }, [isHovered, isInspected]);

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        if (compileFramesRef.current < 2) {
            compileFramesRef.current++;
            if (compileFramesRef.current === 2) {
                if (!isHovered && !isInspected && framePaintedRef.current) {
                    framePaintedRef.current.visible = false;
                }
            }
        }

        if (isInspected) {
            camera.getWorldDirection(tempCamDir);
            const baseDistance = 1.3;
            const aspectOffset = Math.max(0, 1.8 - viewport.aspect) * 1.5;
            const distance = Math.min(2.8, Math.max(1.5, baseDistance + aspectOffset));

            tempPos.copy(camera.position).add(tempCamDir.multiplyScalar(distance));
            tempRot.copy(camera.quaternion);

            const tiltX = -state.pointer.y * 0.3;
            const tiltY = state.pointer.x * 0.3;
            tempEuler.set(tiltX, tiltY, 0);
            tempQuat.setFromEuler(tempEuler);
            tempRot.multiply(tempQuat);

            tempScale.set(1.2, 1.2, 1.2);
        } else {
            tempPos.copy(originalPos);
            tempRot.setFromEuler(originalRot);
            tempScale.set(1, 1, 1);
        }

        const factor = delta * 6;
        groupRef.current.position.lerp(tempPos, factor);
        groupRef.current.quaternion.slerp(tempRot, factor);
        groupRef.current.scale.lerp(tempScale, factor);
    });

    return (
        <group ref={groupRef} position={originalPos} rotation={originalRot}>
            {/* Clickable Hitbox */}
            <mesh
                position={[0, 0, 0.05]}
                onClick={(e) => {
                    e.stopPropagation();
                    if (isMobile) return;
                    setIsInspected((prev) => {
                        const next = !prev;
                        if (setCameraOverride) setCameraOverride(next);
                        window.dispatchEvent(new CustomEvent('inspectChange', { detail: next }));
                        return next;
                    });
                    setIsHovered(false);
                }}
                onPointerEnter={(e) => {
                    e.stopPropagation();
                    if (!isInspected && !isMobile) setIsHovered(true);
                }}
                onPointerLeave={(e) => {
                    e.stopPropagation();
                    setIsHovered(false);
                }}
            >
                <planeGeometry args={[frame.width, frame.height]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0} depthWrite={false} />
            </mesh>

            {/* Visual Frame rendering based on Theme */}
            {isPaper ? (
                <>
                    {/* Painted Layer */}
                    {!isTouch && (
                        <mesh ref={framePaintedRef} position={[0, 0, -0.001]} scale={[0.98, 0.98, 1]}>
                            <planeGeometry args={[frame.width, frame.height]} />
                            <meshBasicMaterial color="#ffffff" map={framePaintedTexture} transparent alphaTest={0.5} side={THREE.DoubleSide} />
                        </mesh>
                    )}
                    {/* Sketch Overlay */}
                    <mesh position={[0, 0, 0]}>
                        <planeGeometry args={[frame.width, frame.height]} />
                        <revealMaterial color="#ffffff" ref={frameMaterialRef} map={frameTexture} transparent alphaTest={0.1} side={THREE.DoubleSide} uProgress={0.0} />
                    </mesh>
                </>
            ) : (
                <>
                    {/* Cyber Neon frame border */}
                    <mesh position={[0, 0, -0.015]}>
                        <planeGeometry args={[frame.width + 0.1, frame.height + 0.1]} />
                        <meshBasicMaterial color={frame.side === 'left' ? "#00F5FF" : "#FF2BD6"} wireframe transparent opacity={0.7} toneMapped={false} />
                    </mesh>
                    <mesh position={[0, 0, -0.01]}>
                        <planeGeometry args={[frame.width, frame.height]} />
                        <meshStandardMaterial color="#111827" transparent opacity={0.65} roughness={0.1} metalness={0.9} />
                    </mesh>
                    {/* Refs mapping to prevent warnings */}
                    <mesh ref={framePaintedRef} position={[0,0,0]} visible={false} />
                    <mesh position={[0,0,0]} visible={false}>
                        <revealMaterial ref={frameMaterialRef} map={frameTexture} uProgress={0} />
                    </mesh>
                </>
            )}

            {/* Inner Project Artwork */}
            {frame.image && (
                <PictureContent
                    imagePath={frame.image}
                    imagePaintedPath={!isTouch ? frame.imagePainted : null}
                    width={frame.imageWidth || frame.width * 0.7}
                    height={frame.imageHeight || frame.height * 0.7}
                    isPainted={isHovered || isInspected}
                />
            )}

            {/* Hand-drawn signature lines */}
            {frame.signature && (
                <Text
                    position={[
                        frame.signatureX !== undefined ? frame.signatureX : (frame.width / 2 - 0.1),
                        frame.signatureY !== undefined ? frame.signatureY : (-frame.height / 2 + 0.15),
                        0.02
                    ]}
                    fontSize={frame.signatureSize || 0.12}
                    font={isPaper ? CABIN_SKETCH_URL : CYBER_FONT_URL}
                    color={isPaper ? "#333333" : (frame.side === 'left' ? "#00F5FF" : "#FF2BD6")}
                    anchorX="center"
                    anchorY="middle"
                    toneMapped={!isPaper}
                >
                    {frame.signature}
                </Text>
            )}
        </group>
    );
};

/**
 * CorridorDecorations Component
 */
const CorridorDecorations = ({ segmentLength = 80, zOffset = 10, corridorWidth = 4.0, corridorHeight = 3.5, zClip = 100000, setCameraOverride }) => {
    const { isPaper, isCyber } = useTheme();
    const wallX = corridorWidth / 2 - 0.01;
    const floorY = -corridorHeight / 2;
    const ceilingY = corridorHeight / 2;

    // Load textures safely via custom useSafeTexture to avoid crashes
    const frameTexture = useSafeTexture('/textures/corridor/ramkanazdjecieduza.webp');
    const framePaintedTexture = useSafeTexture('/textures/corridor/ramkanazdjecieduza_painted.webp');
    const standingFrameTexture = useSafeTexture('/textures/corridor/ramkanazdjeciemala.webp');
    const treeTexture = useSafeTexture('/textures/corridor/drzewkowdoniczce.webp');
    const grateTexture = useSafeTexture('/textures/corridor/kratkawentylacyjna.webp');
    const flowerTexture = useSafeTexture('/textures/corridor/kwiatekwdoniczce.webp');
    const lampGrilleTexture = useSafeTexture('/textures/corridor/kratanalampy.webp');
    const lampSideTexture = useSafeTexture('/textures/corridor/bokilampy.webp');
    const woodTexture = useSafeTexture('/textures/corridor/texturadrewnadonozekbiurka.webp');
    const tableTopTexture = useSafeTexture('/textures/corridor/gorastolika.webp');
    const cabinetFrontTexture = useSafeTexture('/textures/corridor/szafkaprzod.webp');
    const cabinetRestTexture = useSafeTexture('/textures/corridor/szafkaprzodgora.webp');

    const legTexture = useMemo(() => {
        const tex = woodTexture.clone();
        tex.rotation = Math.PI / 2;
        tex.center.set(0.5, 0.5);
        return tex;
    }, [woodTexture]);

    // Corridor ceiling lamps setup
    const lights = useMemo(() => {
        const items = [];
        const LIGHT_SPACING = 15;
        const LIGHT_START_OFFSET = -5;
        const startZ = zOffset + LIGHT_START_OFFSET;
        const endZ = zOffset - segmentLength + 10;

        for (let z = startZ; z > endZ; z -= LIGHT_SPACING) {
            items.push({ z });
        }
        return items;
    }, [segmentLength, zOffset]);

    // Inspectable project layout metadata
    const frames = useMemo(() => [
        {
            z: zOffset - 10,
            side: 'right',
            width: 2.5,
            height: 2.5 / 1.785,
            y: 0.3,
            id: 'frame-1',
            image: '/textures/corridor/rysuneknaobraz1.webp',
            imageWidth: 1.1,
            imageHeight: 1.1,
            offsetFromWall: 0.1
        },
        {
            z: zOffset - 25,
            side: 'left',
            width: 2.5,
            height: 2.5 / 1.785,
            y: 0.2,
            id: 'frame-2',
            image: '/textures/corridor/rysuneknaobrazek3.webp',
            imageWidth: 1.7,
            imageHeight: 1.0,
            offsetFromWall: 0.1
        },
        {
            z: zOffset - 40,
            side: 'right',
            width: 2.5,
            height: 2.5 / 1.785,
            y: 0.25,
            id: 'frame-3',
            signature: "Empty canvas!\nWant your art here?\nContact me!"
        },
        {
            z: zOffset - 55,
            side: 'left',
            width: 2.5,
            height: 2.5 / 1.785,
            y: 0.35,
            id: 'frame-4',
            signature: "Empty canvas!\nWant your art here?\nContact me!"
        }
    ], [zOffset]);

    const tableConfig = useMemo(() => ({
        z: zOffset - 35,
        width: 2.0,
        depth: 0.8,
        height: 1.0,
        legRadius: 0.08,
        topThickness: 0.08,
        x: -wallX + 0.42
    }), [zOffset, wallX]);

    return (
        <group>
            {/* ====================================================
                WORLD 1: Paper Sketchbook Decorations
                ==================================================== */}
            {isPaper && (
                <group>
                    {/* Ceiling Lamps */}
                    {lights.filter(light => light.z <= zClip).map((light, i) => (
                        <group key={`light-paper-${i}`} position={[0, ceilingY, light.z]}>
                            <mesh position={[0, -0.03, 0]}>
                                <boxGeometry args={[2.0, 0.06, 0.5]} />
                                <meshBasicMaterial attach="material-0" color="#e8e8e8" />
                                <meshBasicMaterial attach="material-1" color="#e8e8e8" />
                                <meshBasicMaterial attach="material-2" color="#d0d0d0" />
                                <meshBasicMaterial
                                    attach="material-3"
                                    map={lampGrilleTexture}
                                    transparent={true}
                                    alphaTest={0.1}
                                    side={THREE.DoubleSide}
                                    color="#e0e0e0"
                                />
                                <meshBasicMaterial color="#e0e0e0" attach="material-4" map={lampSideTexture} />
                                <meshBasicMaterial color="#e0e0e0" attach="material-5" map={lampSideTexture} />
                            </mesh>
                            {/* Inner white glow plate */}
                            <mesh position={[0, -0.059, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                                <planeGeometry args={[1.9, 0.4]} />
                                <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
                            </mesh>
                        </group>
                    ))}

                    {/* Sketched 3D Table */}
                    <group position={[tableConfig.x, floorY, tableConfig.z]} rotation={[0, Math.PI / 2, 0]}>
                        {/* Table Legs */}
                        {[
                            [-tableConfig.width / 2 + 0.1, -tableConfig.depth / 2 + 0.1],
                            [tableConfig.width / 2 - 0.1, -tableConfig.depth / 2 + 0.1],
                            [-tableConfig.width / 2 + 0.1, tableConfig.depth / 2 - 0.1],
                            [tableConfig.width / 2 - 0.1, tableConfig.depth / 2 - 0.1]
                        ].map((pos, i) => (
                            <mesh key={`leg-${i}`} position={[pos[0], tableConfig.height / 2, pos[1]]}>
                                <boxGeometry args={[tableConfig.legRadius * 2, tableConfig.height, tableConfig.legRadius * 2]} />
                                <meshBasicMaterial color="#e0e0e0" map={legTexture} />
                            </mesh>
                        ))}
                        {/* Table Top */}
                        <mesh position={[0, tableConfig.height + tableConfig.topThickness / 2, 0]}>
                            <boxGeometry args={[tableConfig.width, tableConfig.topThickness, tableConfig.depth]} />
                            <meshBasicMaterial color="#e0e0e0" attach="material-0" map={woodTexture} />
                            <meshBasicMaterial color="#e0e0e0" attach="material-1" map={woodTexture} />
                            <meshBasicMaterial color="#e0e0e0" attach="material-2" map={tableTopTexture} />
                            <meshBasicMaterial color="#e0e0e0" attach="material-3" />
                            <meshBasicMaterial color="#e0e0e0" attach="material-4" map={woodTexture} />
                            <meshBasicMaterial color="#e0e0e0" attach="material-5" map={woodTexture} />
                        </mesh>
                        {/* Table Potted Flower */}
                        <mesh position={[0, tableConfig.height + tableConfig.topThickness + 0.2, 0]} rotation={[0, -Math.PI / 4, 0]}>
                            <planeGeometry args={[0.3, 0.3 / 0.758]} />
                            <meshBasicMaterial color="#e0e0e0" map={flowerTexture} transparent alphaTest={0.1} side={THREE.DoubleSide} />
                        </mesh>
                    </group>

                    {/* Sketched 3D Cabinet */}
                    <mesh position={[wallX - 0.26, floorY + 0.5, zOffset - 51]}>
                        <boxGeometry args={[0.5, 1.0, 0.8]} />
                        <meshBasicMaterial color="#e0e0e0" attach="material-0" map={cabinetRestTexture} />
                        <meshBasicMaterial color="#e0e0e0" attach="material-1" map={cabinetFrontTexture} />
                        <meshBasicMaterial color="#e0e0e0" attach="material-2" map={cabinetRestTexture} />
                        <meshBasicMaterial color="#e0e0e0" attach="material-3" map={cabinetRestTexture} />
                        <meshBasicMaterial color="#e0e0e0" attach="material-4" map={cabinetRestTexture} />
                        <meshBasicMaterial color="#e0e0e0" attach="material-5" map={cabinetRestTexture} />
                    </mesh>

                    {/* Standing Frame on cabinet */}
                    <mesh position={[wallX - 0.26, floorY + 1.2, zOffset - 51]} rotation={[0, -Math.PI / 2 + 0.2, 0]}>
                        <planeGeometry args={[0.3, 0.3 / 0.777]} />
                        <meshBasicMaterial color="#e0e0e0" map={standingFrameTexture} transparent alphaTest={0.1} side={THREE.DoubleSide} />
                    </mesh>

                    {/* Sketched Potted Tree */}
                    <mesh position={[-wallX + 0.8, floorY + 1.5, zOffset - 58]} rotation={[0, Math.PI / 4, 0]}>
                        <planeGeometry args={[1.8, 1.8 / 0.602]} />
                        <meshBasicMaterial color="#e0e0e0" map={treeTexture} transparent alphaTest={0.1} side={THREE.DoubleSide} />
                    </mesh>

                    {/* Sketched ventilation grates */}
                    {frames.map((frame, i) => {
                        const isFrameLeft = frame.side === 'left';
                        const grateSide = isFrameLeft ? 'right' : 'left';
                        return (
                            <mesh
                                key={`grate-paper-${i}`}
                                position={[
                                    grateSide === 'left' ? -wallX + 0.01 : wallX - 0.01,
                                    ceilingY - 0.6,
                                    frame.z
                                ]}
                                rotation={[0, grateSide === 'left' ? Math.PI / 2 : -Math.PI / 2, 0]}
                            >
                                <planeGeometry args={[0.8, 0.8 / 1.968]} />
                                <meshBasicMaterial color="#e0e0e0" map={grateTexture} transparent alphaTest={0.1} side={THREE.DoubleSide} />
                            </mesh>
                        );
                    })}
                </group>
            )}

            {/* ====================================================
                WORLD 2: Cyber Neon Decorations
                ==================================================== */}
            {isCyber && (
                <group>
                    {/* Server rack */}
                    <group position={[wallX - 0.8, floorY + 0.8, zOffset - 30]} rotation={[0, -Math.PI / 2, 0]}>
                        <mesh>
                            <boxGeometry args={[1.2, 1.6, 0.6]} />
                            <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
                        </mesh>
                        <mesh position={[0, 0, 0.301]}>
                            <planeGeometry args={[1.0, 1.4]} />
                            <meshStandardMaterial color="#1e293b" wireframe />
                        </mesh>
                        <BlinkingLeds />
                    </group>

                    {/* Console hologram desk */}
                    <group position={[wallX - 1.2, floorY + 0.3, zOffset - 27.5]}>
                        <mesh position={[0, -0.15, 0]}>
                            <cylinderGeometry args={[0.35, 0.45, 0.3, 8]} />
                            <meshStandardMaterial color="#111827" metalness={0.95} roughness={0.15} />
                        </mesh>
                        <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                            <ringGeometry args={[0.3, 0.35, 32]} />
                            <meshBasicMaterial color="#00F5FF" toneMapped={false} />
                        </mesh>
                        <HologramCore position={[0, 0.5, 0]} />
                    </group>

                    {/* Abstract Neon Geometric Tree */}
                    <group position={[-wallX + 0.8, floorY + 1.2, zOffset - 58]} rotation={[0, Math.PI / 4, 0]}>
                        <mesh position={[0, -0.4, 0]}>
                            <cylinderGeometry args={[0.3, 0.2, 0.4, 12]} />
                            <meshStandardMaterial color="#111827" metalness={0.9} roughness={0.1} />
                        </mesh>
                        <mesh position={[0, 0.3, 0]}>
                            <cylinderGeometry args={[0.03, 0.03, 1.0, 8]} />
                            <meshBasicMaterial color="#00F5FF" toneMapped={false} />
                        </mesh>
                        <AbstractPlantLeaves />
                    </group>

                    {/* Cyber Rotating Ventilation Fans */}
                    {frames.map((frame, i) => {
                        const isFrameLeft = frame.side === 'left';
                        const grateSide = isFrameLeft ? 'right' : 'left';
                        return (
                            <group
                                key={`grate-cyber-${i}`}
                                position={[
                                    grateSide === 'left' ? -wallX + 0.015 : wallX - 0.015,
                                    ceilingY - 0.6,
                                    frame.z
                                ]}
                                rotation={[0, grateSide === 'left' ? Math.PI / 2 : -Math.PI / 2, 0]}
                            >
                                <mesh>
                                    <planeGeometry args={[0.8, 0.8]} />
                                    <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} side={THREE.DoubleSide} />
                                </mesh>
                                <mesh position={[0, 0, 0.005]}>
                                    <ringGeometry args={[0.32, 0.36, 32]} />
                                    <meshBasicMaterial color={grateSide === 'left' ? '#00F5FF' : '#FF2BD6'} toneMapped={false} />
                                </mesh>
                                <VentFanBlades />
                            </group>
                        );
                    })}
                </group>
            )}

            {/* Inspectable Project Frames - Active in BOTH themes but styles differ */}
            {frames.map((frame) => (
                <InspectableFrame
                    key={frame.id}
                    frame={frame}
                    wallX={wallX}
                    frameTexture={frameTexture}
                    framePaintedTexture={framePaintedTexture}
                    isPaper={isPaper}
                    setCameraOverride={setCameraOverride}
                />
            ))}
        </group>
    );
};

// Blinking server LEDs
const BlinkingLeds = () => {
    const refs = useRef([]);
    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        refs.current.forEach((ref, i) => {
            if (ref) {
                const speed = 3 + (i % 3) * 4;
                const brightness = Math.sin(time * speed) > 0 ? 1 : 0;
                ref.material.opacity = brightness * 0.9 + 0.1;
            }
        });
    });

    const ledData = [
        { pos: [-0.27, 0.32, -0.2], color: '#39FF14' },
        { pos: [-0.27, 0.32, -0.1], color: '#FF3333' },
        { pos: [-0.27, 0.32, 0.0], color: '#39FF14' },
        { pos: [-0.27, 0.02, -0.2], color: '#00F5FF' },
        { pos: [-0.27, 0.02, -0.1], color: '#00F5FF' },
        { pos: [-0.27, -0.28, -0.2], color: '#39FF14' },
        { pos: [-0.27, -0.28, 0.1], color: '#FF9900' }
    ];

    return (
        <group>
            {ledData.map((led, i) => (
                <mesh 
                    key={i} 
                    ref={el => refs.current[i] = el} 
                    position={led.pos}
                >
                    <sphereGeometry args={[0.015, 8, 8]} />
                    <meshBasicMaterial color={led.color} transparent toneMapped={false} />
                </mesh>
            ))}
        </group>
    );
};

// Rotating vent fan blades
const VentFanBlades = () => {
    const fanRef = useRef();
    useFrame((state, delta) => {
        if (fanRef.current) {
            fanRef.current.rotation.z -= delta * 5.0;
        }
    });
    return (
        <group ref={fanRef} position={[0, 0, 0.002]}>
            {[0, 1, 2, 3].map((idx) => (
                <mesh key={idx} rotation={[0, 0, (idx * Math.PI) / 2]}>
                    <planeGeometry args={[0.08, 0.6]} />
                    <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.3} side={THREE.DoubleSide} />
                </mesh>
            ))}
        </group>
    );
};

// Hologram Core
const HologramCore = ({ position }) => {
    const meshRef = useRef();
    const torusRef = useRef();

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 1.5;
            meshRef.current.rotation.x += delta * 0.8;
        }
        if (torusRef.current) {
            torusRef.current.rotation.y -= delta * 0.9;
        }
    });

    return (
        <group position={position}>
            <mesh ref={meshRef}>
                <octahedronGeometry args={[0.15, 0]} />
                <meshBasicMaterial color="#FF2BD6" wireframe toneMapped={false} />
            </mesh>
            <mesh ref={torusRef} rotation={[Math.PI / 4, 0, 0]}>
                <torusGeometry args={[0.26, 0.01, 8, 32]} />
                <meshBasicMaterial color="#00F5FF" toneMapped={false} />
            </mesh>
        </group>
    );
};

// Abstract Neon Geometric Tree branches
const AbstractPlantLeaves = () => {
    const groupRef = useRef();
    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (groupRef.current) {
            groupRef.current.children.forEach((child, idx) => {
                child.rotation.y = time * (0.2 + idx * 0.1);
                child.position.y = 0.3 + Math.sin(time + idx) * 0.08;
            });
        }
    });

    return (
        <group ref={groupRef}>
            <mesh position={[0, 0.3, 0]}>
                <torusGeometry args={[0.3, 0.015, 8, 32]} />
                <meshBasicMaterial color="#FF2BD6" toneMapped={false} />
            </mesh>
            <mesh position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.2, 0.015, 8, 32]} />
                <meshBasicMaterial color="#00F5FF" toneMapped={false} />
            </mesh>
            <mesh position={[0, 0.7, 0]}>
                <torusGeometry args={[0.1, 0.012, 8, 32]} />
                <meshBasicMaterial color="#8B5CF6" toneMapped={false} />
            </mesh>
        </group>
    );
};

export default CorridorDecorations;
