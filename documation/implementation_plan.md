# Plan: Fix 2D ↔ 3D Transition System

This plan outlines structural fixes to resolve:
1. Double loading screens when navigating 2D → 3D.
2. Fake progress loaders, replacing them with real-time asset loading monitoring.
3. UI freezes, missing animations, black backgrounds, and locked scrollbars when returning to 2D.
4. Memory cleanup on 3D unmount.

## Proposed Changes

### 1. Shared Transition & Real Loading System

#### [MODIFY] [shared/DimensionContext.jsx](file:///d:/Programming/2026/Project/Landing%20Pages/Genofogu/shared/DimensionContext.jsx)
- Set up a global Three.js loader listener hooking into `THREE.DefaultLoadingManager`.
- Add states: `loadingProgress`, `is3DLoaded`, `isWarmupComplete`.
- Update `triggerTransition` to:
  - Fade in the transition overlay.
  - Navigate to `/3d`.
  - Pause transition completion until both `is3DLoaded` and `isWarmupComplete` are true.
  - Provide a callback `signalSceneReady()` to be triggered by the 3D scene warmup component.

#### [MODIFY] [shared/DimensionTransition.jsx](file:///d:/Programming/2026/Project/Landing%20Pages/Genofogu/shared/DimensionTransition.jsx)
- Display the real loading progress percentage (e.g. `45%`) in the portal text label during 2D → 3D transitions.

### 2. 3D Loading Screen Bypass

#### [MODIFY] [3d/src/App.jsx](file:///d:/Programming/2026/Project/Landing%20Pages/Genofogu/3d/src/App.jsx)
- Use `useDimension` to check if a 2D → 3D transition is active.
- If entering from 2D:
  - Bypass the standard 3D paper `<Preloader />` completely (render it hidden/inactive).
  - Synchronize its local `isLoaded` state with the transition state, letting the portal hide the scene until ready.
  - On mount, add class `mode-3d` to `document.body`.
  - On unmount, remove class `mode-3d` and cleanup style properties from `document.body`.

#### [MODIFY] [3d/src/components/canvas/Experience.jsx](file:///d:/Programming/2026/Project/Landing%20Pages/Genofogu/3d/src/components/canvas/Experience.jsx)
- Pass `signalSceneReady()` to the `RoomWarmup` callback so that shader compilation completion is synchronized with the portal transition overlay.

### 3. Cleanup & 2D State Restoration

#### [MODIFY] [3d/src/theme/ThemeContext.jsx](file:///d:/Programming/2026/Project/Landing%20Pages/Genofogu/3d/src/theme/ThemeContext.jsx)
- Modify the `useEffect` applying theme variables to `document.body`.
- Return a cleanup function that explicitly runs `body.style.removeProperty(key)` for every 3D CSS custom property. This prevents inline variables from lingering and overriding 2D styles.

#### [MODIFY] [3d/src/styles/_base.scss](file:///d:/Programming/2026/Project/Landing%20Pages/Genofogu/3d/src/styles/_base.scss)
- Scope body resets (such as `overflow: hidden` and custom scrollbars) under `body.mode-3d`. This guarantees that returning to 2D instantly restores browser scrollbars and scrolling capability.

## Verification Plan

### Automated Tests
- Run `npm run build` to verify there are no compilation, rollup, or dependency issues.

### Manual Verification
1. Open the website, navigate from 2D to 3D.
   - Verify that no double loading screens occur.
   - Verify the portal transition shows real asset loading progress in percentage.
   - Verify the 3D penthouse corridor displays immediately and fully interactive once the portal closes.
2. Click "Return to 2D".
   - Verify that the 2D theme colors, font styles, animations, custom cursor, scroll mechanics, and hover animations are fully restored.
   - Check the developer console for any WebGL context warnings or uncaught exceptions.
