import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import * as THREE from 'three';

const DimensionContext = createContext();

export const DimensionProvider = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionType, setTransitionType] = useState('enter'); // 'enter' (to 3d) or 'exit' (to 2d)
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [is3DReady, setIs3DReady] = useState(false);
  const [hasTransitionedFrom2D, setHasTransitionedFrom2D] = useState(false);
  
  const overlayRef = useRef(null);
  const ringsRef = useRef([]);
  const linesRef = useRef(null);
  const loopTimelineRef = useRef(null);
  const resolveTransitionRef = useRef(null);

  // Hook into THREE.DefaultLoadingManager during transitions to 3D with smooth progress
  useEffect(() => {
    if (!isTransitioning || transitionType !== 'enter') {
      return;
    }

    const origOnStart = THREE.DefaultLoadingManager.onStart;
    const origOnProgress = THREE.DefaultLoadingManager.onProgress;
    const origOnLoad = THREE.DefaultLoadingManager.onLoad;

    // Reset progress at start with an immediate engaging value
    setLoadingProgress(15);

    // Smooth incremental progress ticker so the user sees continuous visual feedback
    const progressTimer = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev < 40) return prev + Math.floor(Math.random() * 8 + 4);
        if (prev < 75) return prev + Math.floor(Math.random() * 4 + 2);
        if (prev < 92) return prev + 1;
        return prev;
      });
    }, 120);

    THREE.DefaultLoadingManager.onStart = (url, loaded, total) => {
      if (total > 0) {
        const pct = Math.round((loaded / total) * 90);
        setLoadingProgress((prev) => Math.max(prev, pct));
      }
      origOnStart?.(url, loaded, total);
    };

    THREE.DefaultLoadingManager.onProgress = (url, loaded, total) => {
      if (total > 0) {
        const pct = Math.round((loaded / total) * 90);
        setLoadingProgress((prev) => Math.max(prev, pct));
      }
      origOnProgress?.(url, loaded, total);
    };

    THREE.DefaultLoadingManager.onLoad = () => {
      setLoadingProgress((prev) => Math.max(prev, 95));
      origOnLoad?.();
    };

    return () => {
      clearInterval(progressTimer);
      THREE.DefaultLoadingManager.onStart = origOnStart;
      THREE.DefaultLoadingManager.onProgress = origOnProgress;
      THREE.DefaultLoadingManager.onLoad = origOnLoad;
    };
  }, [isTransitioning, transitionType]);

  const signalSceneReady = () => {
    setIs3DReady(true);
  };

  const triggerTransition = (targetPath, navigateFn) => {
    if (isTransitioning) return;
    
    const isTo3D = targetPath.includes('3d');
    setTransitionType(isTo3D ? 'enter' : 'exit');
    setIsTransitioning(true);
    setIs3DReady(false);
    setLoadingProgress(isTo3D ? 15 : 0);
    setHasTransitionedFrom2D(isTo3D);

    // Stop any existing loop timeline
    if (loopTimelineRef.current) {
      loopTimelineRef.current.kill();
    }

    // 1. Initial fade-in timeline
    const tl = gsap.timeline();

    // Reset styles
    if (overlayRef.current) gsap.set(overlayRef.current, { display: 'flex', opacity: 0 });
    const activeRings = ringsRef.current.filter(Boolean);
    if (activeRings.length > 0) gsap.set(activeRings, { scale: 0, opacity: 0 });
    if (linesRef.current) gsap.set(linesRef.current, { opacity: 0, scale: 0.8 });

    // Animate Overlay Fade In & Blur
    if (overlayRef.current) {
      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.inOut',
      });
    }

    // Zoom/Portal Ring Effect
    if (activeRings.length > 0) {
      tl.to(activeRings, {
        scale: (i) => 2 + i * 1.5,
        opacity: 1,
        stagger: 0.05,
        duration: 0.5,
        ease: 'power2.out',
      }, '-=0.2');
    }

    if (linesRef.current) {
      tl.to(linesRef.current, {
        opacity: 0.8,
        scale: 2.5,
        duration: 0.4,
        ease: 'power2.out',
      }, '-=0.3');
    }

    tl.add(() => {
      // Navigate to the target page mid-way
      navigateFn(targetPath);

      // Start looping animation while loading/rendering
      const loop = gsap.timeline({ repeat: -1 });
      
      // Infinite rotation & pulsing
      ringsRef.current.filter(Boolean).forEach((ring, idx) => {
        const direction = idx % 2 === 0 ? 1 : -1;
        const baseScale = 2 + idx * 1.5;
        loop.to(ring, {
          rotation: `+=${360 * direction}`,
          duration: 3 + idx,
          ease: 'none',
        }, 0);
        loop.to(ring, {
          scale: baseScale * 1.05,
          yoyo: true,
          repeat: 1,
          duration: 1 + idx * 0.5,
          ease: 'sine.inOut'
        }, 0);
      });

      if (linesRef.current) {
        loop.to(linesRef.current, {
          rotation: '+=360',
          scale: 2.8,
          yoyo: true,
          repeat: 1,
          duration: 4,
          ease: 'none',
        }, 0);
      }

      loopTimelineRef.current = loop;
    });

    // Store a resolver function to call when target is ready
    resolveTransitionRef.current = () => {
      if (loopTimelineRef.current) {
        loopTimelineRef.current.kill();
      }

      const outTimeline = gsap.timeline({
        onComplete: () => {
          setIsTransitioning(false);
          if (overlayRef.current) gsap.set(overlayRef.current, { display: 'none' });
        }
      });

      // Animate out (portal exit)
      const currentRings = ringsRef.current.filter(Boolean);
      if (currentRings.length > 0) {
        outTimeline.to(currentRings, {
          scale: 5,
          opacity: 0,
          stagger: 0.03,
          duration: 0.6,
          ease: 'power2.in',
        });
      }

      if (linesRef.current) {
        outTimeline.to(linesRef.current, {
          opacity: 0,
          scale: 4,
          duration: 0.5,
          ease: 'power2.in',
        }, '-=0.5');
      }

      outTimeline.to(overlayRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
      }, '-=0.3');
    };
  };

  // Monitor loading completion to trigger transition resolution with guaranteed fallback
  useEffect(() => {
    if (!isTransitioning) return;

    let safetyTimer = null;

    if (transitionType === 'enter') {
      // To 3D: Wait for both assets and scene warm-up ready
      if (is3DReady) {
        setLoadingProgress(100);
        resolveTransitionRef.current?.();
      } else {
        // Fallback safety timeout: NEVER allow portal loading screen to hang indefinitely
        safetyTimer = setTimeout(() => {
          console.warn('[DimensionContext] Safety timeout reached (4.5s). Forcing transition completion.');
          setIs3DReady(true);
        }, 4500);
      }
    } else {
      // To 2D: Resolve immediately as 2D loads instantly
      resolveTransitionRef.current?.();
    }

    return () => {
      if (safetyTimer) clearTimeout(safetyTimer);
    };
  }, [isTransitioning, transitionType, is3DReady]);

  // Cleanup loop on unmount
  useEffect(() => {
    return () => {
      if (loopTimelineRef.current) loopTimelineRef.current.kill();
    };
  }, []);

  return (
    <DimensionContext.Provider value={{
      triggerTransition,
      signalSceneReady,
      overlayRef,
      ringsRef,
      linesRef,
      transitionType,
      isTransitioning,
      loadingProgress,
      hasTransitionedFrom2D,
      setHasTransitionedFrom2D
    }}>
      {children}
    </DimensionContext.Provider>
  );
};

export const useDimension = () => useContext(DimensionContext);
