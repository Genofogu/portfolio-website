# Genofogu Portfolio Transformation — Implementation Plan

Transform the Genofogu portfolio from a generic Data Scientist template into a premium personal ecosystem for **Geno (Anu Gaur)**.

## Codebase Analysis Summary

| Aspect | Current State | Assessment |
|--------|--------------|------------|
| **Tech Stack** | Vite + React 19 + SCSS + React Router 7 | ✅ Solid foundation |
| **Architecture** | MainLayout → Pages → Components | ✅ Good pattern, needs expansion |
| **Identity** | "Data Scientist & Strategic Innovator" | ❌ Generic, not Geno |
| **Hero** | Scramble animation, spotlight effect | ⚠️ Good effects, wrong content |
| **Portfolio Cards** | 3 fake case studies (churn, sales, NLP) | ❌ Placeholder data |
| **Social Cards** | Fake 625k/150k/100k follower counts | ❌ Misleading |
| **TimeLapse** | Scroll-driven day/night sky animation | ✅ Beautiful but not API-connected |
| **Interactive3D** | Rotating cube, scroll-driven | ⚠️ Cool but disconnected |
| **About Page** | Renders same `<About>` component as homepage | ❌ Duplicate, generic |
| **Contact Page** | Also renders `<About>` (bug!) | ❌ Broken — shows About content |
| **Playground** | CodeMirror JS editor only, directly on page | ⚠️ Editor works, wrong structure |
| **JS Game** | iframe to play2048.co | ❌ Broken external dependency |
| **Scheduler** | Grid layout with empty dashboard | ⚠️ Skeleton only |
| **Custom Cursor** | Rocket SVG, dual cursor issue | ⚠️ Logic works, default cursor shows |
| **Navigation** | Desktop nav only, no burger menu | ❌ No mobile nav |
| **Responsiveness** | Minimal — only 2 `@media` queries total | ❌ Not mobile-friendly |
| **Footer** | Fluid blob animation, placeholder links | ⚠️ Animation great, links fake |

## User Review Required

> [!IMPORTANT]
> **Real Social Links Needed**: Please provide your actual GitHub, LinkedIn, and Instagram URLs so I can wire them throughout the site. I'll use placeholder slugs like `github.com/genofogu` for now.

> [!IMPORTANT]
> **SoulWake URL**: Do you have a deployed SoulWake URL? I'll add a "Launch SoulWake" button on the Scheduler page and link from the homepage.

> [!WARNING]
> **ContactPage.jsx Bug**: The Contact page currently renders the `<About>` component (it's literally a copy of AboutPage.jsx). This will be completely rewritten.

> [!IMPORTANT]
> **Weather API Key**: The Living World Engine feature needs a weather API key (OpenWeatherMap free tier). Should I use a public free endpoint, or do you have an API key? I'll add a `.env` variable for it.

---

## Proposed Changes

The work is organized into **8 phases**, ordered by dependency (foundation first, polish last).

---

### Phase 1: Foundation — Layout System, Cursor Fix, Navigation

This phase fixes all the "infrastructure" issues: consistent containers, hidden default cursor, and mobile burger menu.

#### [MODIFY] [_variables.scss](file:///d:/Programming/2026/Project/My%20Websitw/Genofogu/src/styles/base/_variables.scss)
- Add responsive breakpoint variables: `$bp-mobile: 480px`, `$bp-tablet: 768px`, `$bp-laptop: 1024px`, `$bp-desktop: 1440px`, `$bp-ultrawide: 2560px`
- Add global container/spacing tokens: `$container-max-width: 1200px`, `$container-padding: clamp(1rem, 5vw, 4rem)`
- Upgrade color palette for both themes — replace the brownish accent `#771e08` with a futuristic cyan-blue `#00d4ff` for dark mode
- Add new color tokens: `--color-accent-secondary`, `--color-gradient-start`, `--color-gradient-end`

#### [MODIFY] [_base.scss](file:///d:/Programming/2026/Project/My%20Websitw/Genofogu/src/styles/base/_base.scss)
- Add `cursor: none` globally to `*, *::before, *::after` and `body` — fixes the dual cursor issue
- Add `.global-container` utility class with consistent max-width and padding
- Add responsive typography scale using `clamp()`
- Add `html { scroll-behavior: smooth }` for anchor navigation
- Add Google Font imports for Inter/Outfit as secondary fonts

#### [MODIFY] [_CustomCursor.scss](file:///d:/Programming/2026/Project/My%20Websitw/Genofogu/src/styles/components/_CustomCursor.scss)
- Add `body.custom-cursor-active { cursor: none !important; }` and `body.custom-cursor-active * { cursor: none !important; }`  
- This ensures that when the custom cursor component activates, the default cursor is hidden on ALL elements including inputs, buttons, links

#### [MODIFY] [Header.jsx](file:///d:/Programming/2026/Project/My%20Websitw/Genofogu/src/components/Header.jsx)
- Add `useState` for `isMobileMenuOpen`
- Add burger menu button (☰) visible at `≤ 768px`
- Add mobile slide-in panel with all navigation links: Home, About, Projects, Playground, JS Games, Scheduler, Contact
- Add smooth slide-in animation (translateX)
- Add overlay backdrop that closes menu on click
- Keep desktop nav unchanged

#### [MODIFY] [_Header.scss](file:///d:/Programming/2026/Project/My%20Websitw/Genofogu/src/styles/components/_Header.scss)
- Add mobile burger button styles
- Add mobile overlay/backdrop styles
- Add slide-in nav panel styles with transitions
- Add media query to hide desktop nav at `≤ 768px`
- Add all responsive breakpoints

#### [MODIFY] [MainLayout.jsx](file:///d:/Programming/2026/Project/My%20Websitw/Genofogu/src/components/MainLayout.jsx)
- Wrap `<Outlet>` in a container div with consistent padding
- Add `scroll-to-top` behavior on route change using `useEffect` + `useLocation`

---

### Phase 2: Home Page Rebuild

#### [MODIFY] [Hero.jsx](file:///d:/Programming/2026/Project/My%20Websitw/Genofogu/src/components/Hero.jsx)
- Replace "Data Scientist & Strategic Innovator" with identity-focused messaging
- Title: `"Building AI Systems"` with animated scramble on rotating words: `["Digital Products", "Future Ventures", "RAG Systems", "SoulWake"]`
- Subtitle: Brief personal tagline — "MCA Aspirant • AI/ML Developer • RAG Builder • Future Startup Founder"
- Add a secondary bio paragraph focused on what Geno actually builds
- Add dual CTA buttons: "View My Work" → `#portfolio`, "Launch SoulWake" → external link
- Add animated floating tech badges: Python, TensorFlow, AWS, GCP, LangChain, React
- Preserve spotlight mouse-follow effect and scramble animation

#### [MODIFY] [_Hero.scss](file:///d:/Programming/2026/Project/My%20Websitw/Genofogu/src/styles/components/_Hero.scss)
- Add responsive padding using global container
- Add floating badge animations (subtle float + glow)
- Add responsive font sizing for all breakpoints
- Improve typography hierarchy

#### [MODIFY] [Portfolio.jsx](file:///d:/Programming/2026/Project/My%20Websitw/Genofogu/src/components/Portfolio.jsx)
- Replace 3 fake case studies with 6 real projects:
  1. **SoulWake** — AI-powered daily productivity companion
  2. **RAG Knowledge Assistant** — Retrieval-augmented generation system
  3. **AI Search System** — Intelligent document search with embeddings
  4. **Travel Recommendation Platform** — ML-powered travel suggestions  
  5. **Customer Churn Predictor** — End-to-end MLOps pipeline (keep, rewrite)
  6. **Cloud Infrastructure** — AWS/GCP deployment projects
- Each card adds: tech stack tags, GitHub button, Live Demo button
- Add section title: "What I've Built" instead of "Case Studies"

#### [MODIFY] [data/projects.js](file:///d:/Programming/2026/Project/My%20Websitw/Genofogu/src/data/projects.js)
- Complete rewrite with 6 realistic projects reflecting Geno's actual focus areas
- Add `githubUrl`, `liveUrl`, `category` fields to each project

#### [MODIFY] [SocialCards.jsx](file:///d:/Programming/2026/Project/My%20Websitw/Genofogu/src/components/SocialCards.jsx)
- Remove fake follower counts (625k, 150k, 100k)
- Replace with real profile links: GitHub, LinkedIn, Instagram
- Change metric display to: "Open Source Projects", "Connections", "Creative Posts" (qualitative, not fake numbers)
- Update all `link` URLs to actual profiles
- Keep the mouse-follow glow effect (it's great)

#### [MODIFY] [FluidFooter.jsx](file:///d:/Programming/2026/Project/My%20Websitw/Genofogu/src/components/FluidFooter.jsx)
- Replace `your-username` with Geno's actual URLs
- Replace `Your Name` with `Geno (Anu Gaur)`
- Update "Explore" links to match new nav structure
- Keep the fluid blob animation (it's excellent)

#### [MODIFY] [HomePage.jsx](file:///d:/Programming/2026/Project/My%20Websitw/Genofogu/src/pages/HomePage.jsx)
- Keep section order: Hero → Portfolio → SocialCards → Interactive3D → TimeLapse
- No structural changes needed — the sub-component changes handle everything

---

### Phase 3: Data-Driven Dimensions — Living World Engine

Transform the TimeLapse + Interactive3D section into a dynamic, API-driven environment.

#### [MODIFY] [Interactive3DSection.jsx](file:///d:/Programming/2026/Project/My%20Websitw/Genofogu/src/components/Interactive3DSection.jsx)
- Rename title from "Data-Driven Dimensions" to "Living World Engine"
- Keep the 3D cube as a visual element but add contextual data display
- Add real-time data overlay: timezone, location city, weather condition
- On scroll progress, reveal current weather/time data instead of just the cube

#### [NEW] [useWeatherData.js](file:///d:/Programming/2026/Project/My%20Websitw/Genofogu/src/hooks/useWeatherData.js)
- Custom hook that uses `navigator.geolocation` to detect user location
- Fetches weather data from OpenWeatherMap free API (or sunrise-sunset.org for free)
- Returns: `{ temperature, condition, sunrise, sunset, moonPhase, isDay, city, timezone, loading, error }`
- Falls back to IST timezone / New Delhi if geolocation is denied
- API key loaded from `import.meta.env.VITE_WEATHER_API_KEY` with `// TODO: Add weather API key` marker

#### [MODIFY] [TimeLapseSection.jsx](file:///d:/Programming/2026/Project/My%20Websitw/Genofogu/src/components/TimeLapseSection.jsx)
- Integrate `useWeatherData` hook for real-world data
- Replace static scroll-based time with real timezone-aware time
- Add dynamic visual states:
  - Morning (5-8): Warm sunrise gradient, soft amber glow
  - Day (8-17): Blue sky, drifting clouds
  - Evening (17-20): Orange-pink sunset transition
  - Night (20-5): Dark sky, stars, moon with phase display
- Add rain animation overlay when weather condition is "Rain" (CSS particles)
- Add firefly particles for night state (CSS animation)
- Show data overlay: Location, Temperature, Sunrise/Sunset, Moon Phase
- Keep scroll-based time exploration for the scroll journey, but snap to real time at midpoint

#### [MODIFY] [_TimeLapseSection.scss](file:///d:/Programming/2026/Project/My%20Websitw/Genofogu/src/styles/components/_TimeLapseSection.scss)
- Add rain particle animation keyframes
- Add firefly CSS animation
- Add weather data overlay styles (glassmorphism card)
- Add responsive sizing for all elements
- Enhance cloud animations

#### [MODIFY] [_Interactive3DSection.scss](file:///d:/Programming/2026/Project/My%20Websitw/Genofogu/src/styles/components/_Interactive3DSection.scss)
- Add data overlay positioning
- Keep cube animation, add responsive scaling

---

### Phase 4: About Page Rebuild

#### [MODIFY] [AboutPage.jsx](file:///d:/Programming/2026/Project/My%20Websitw/Genofogu/src/pages/AboutPage.jsx)
- Complete rewrite — no longer just wrapping `<About>` component
- Build full page with multiple sections:
  1. **Hero Banner**: "Hey, I'm Geno" with gradient text
  2. **Who Am I**: Personal introduction paragraph
  3. **My Journey Timeline**: Vertical animated timeline — School → Programming → Data Science → AI/ML → Cloud → RAG → SoulWake → Future Startup
  4. **What I Build**: Grid of capability cards (AI Systems, RAG Apps, Data Solutions, Cloud Projects)
  5. **Future Vision**: Goals and aspirations section
  6. **Tech Stack**: Visual grid of technologies with icons

#### [MODIFY] [About.jsx](file:///d:/Programming/2026/Project/My%20Websitw/Genofogu/src/components/About.jsx)
- Repurpose as a reusable "About Summary" section for the homepage
- Keep the intersection observer animation

#### [NEW] [_AboutPage.scss](file:///d:/Programming/2026/Project/My%20Websitw/Genofogu/src/styles/components/_AboutPage.scss)
- Timeline styles with animated connector line
- Capability card grid with glassmorphism
- Tech stack icon grid
- All breakpoints for responsive design

#### [MODIFY] [main.scss](file:///d:/Programming/2026/Project/My%20Websitw/Genofogu/src/styles/main.scss)
- Add `@use 'components/AboutPage'`

---

### Phase 5: Contact Page Rebuild

#### [MODIFY] [ContactPage.jsx](file:///d:/Programming/2026/Project/My%20Websitw/Genofogu/src/pages/ContactPage.jsx)
- Complete rewrite (currently renders `<About>` due to copy-paste bug)
- Build "Let's Build Something Together" page:
  1. **Hero**: "Let's Build Something Together" with gradient text
  2. **Contact Form**: Name, Email, Subject, Message fields (frontend only, form action placeholder)
  3. **Collaboration Section**: "Open for" cards — AI Projects, Research, Internships, Development
  4. **Current Learning**: Badge display — AI/ML, RAG, AWS, GCP, Data Science
  5. **Social Links**: GitHub, LinkedIn, Instagram, Email with icons

#### [MODIFY] [Contact.jsx](file:///d:/Programming/2026/Project/My%20Websitw/Genofogu/src/components/Contact.jsx)
- Keep as a reusable small contact CTA for the homepage footer area
- Fix email link: `mailto:anugaur300@gmail.com` (currently missing `mailto:`)

#### [NEW] [_ContactPage.scss](file:///d:/Programming/2026/Project/My%20Websitw/Genofogu/src/styles/components/_ContactPage.scss)
- Form styling with floating labels
- Collaboration cards grid
- Learning badges
- Social links with icon hover effects
- All responsive breakpoints

#### [MODIFY] [main.scss](file:///d:/Programming/2026/Project/My%20Websitw/Genofogu/src/styles/main.scss)
- Add `@use 'components/ContactPage'`

---

### Phase 6: Playground Page Rebuild

#### [MODIFY] [PlaygroundPage.jsx](file:///d:/Programming/2026/Project/My%20Websitw/Genofogu/src/pages/PlaygroundPage.jsx)
- Transform into a **Project Showcase** page (CodePen/Dribbble-inspired)
- Add project cards with: thumbnail, title, category, description, tech stack, preview/GitHub buttons
- Add category filter system: AI, Web Dev, Data Science, Cloud, Experiments
- Add link to `/playground/editor` for the coding playground

#### [MODIFY] [CodePlayground.jsx](file:///d:/Programming/2026/Project/My%20Websitw/Genofogu/src/components/CodePlayground.jsx)
- Move to its own route at `/playground/editor`
- Keep existing CodeMirror functionality for JavaScript
- Add `// TODO: Integrate Judge0 API for Python/Java/C++ execution` markers
- Add `// TODO: Integrate Piston API as alternative backend` markers

#### [NEW] [PlaygroundEditorPage.jsx](file:///d:/Programming/2026/Project/My%20Websitw/Genofogu/src/pages/PlaygroundEditorPage.jsx)
- Wraps the `<CodePlayground>` component
- Add "← Back to Projects" navigation link

#### [NEW] [_PlaygroundPage.scss](file:///d:/Programming/2026/Project/My%20Websitw/Genofogu/src/styles/components/_PlaygroundPage.scss)
- Project showcase grid
- Filter buttons/tabs
- Card hover effects with glassmorphism
- All responsive breakpoints

#### [MODIFY] [App.jsx](file:///d:/Programming/2026/Project/My%20Websitw/Genofogu/src/App.jsx)
- Add route: `/playground/editor` → `PlaygroundEditorPage`

#### [MODIFY] [main.scss](file:///d:/Programming/2026/Project/My%20Websitw/Genofogu/src/styles/main.scss)
- Add `@use 'components/PlaygroundPage'`

---

### Phase 7: JS Game Page Rebuild

#### [MODIFY] [JsGamePage.jsx](file:///d:/Programming/2026/Project/My%20Websitw/Genofogu/src/pages/JsGamePage.jsx)
- Transform into a **Game Hub** page
- Remove iframe dependency (ExternalGame.jsx)
- Display game cards for built-in games:
  1. **Canvas Jumper** (already built in UnityGame.jsx — rename/reuse)
  2. **Snake** (new, simple canvas game)
  3. **Space Shooter** (new, canvas game)
  4. **Dino Runner** (new, canvas game)
- Each card shows: thumbnail, title, description, Play button, High Score
- Add `// TODO: Integrate Supabase for leaderboards and high scores` markers

#### [NEW] [games/SnakeGame.jsx](file:///d:/Programming/2026/Project/My%20Websitw/Genofogu/src/components/games/SnakeGame.jsx)
- Self-contained canvas Snake game component

#### [NEW] [games/SpaceShooter.jsx](file:///d:/Programming/2026/Project/My%20Websitw/Genofogu/src/components/games/SpaceShooter.jsx)
- Self-contained canvas Space Shooter game component

#### [NEW] [games/DinoRunner.jsx](file:///d:/Programming/2026/Project/My%20Websitw/Genofogu/src/components/games/DinoRunner.jsx)
- Self-contained canvas Dino Runner game component

#### [MODIFY] [UnityGame.jsx](file:///d:/Programming/2026/Project/My%20Websitw/Genofogu/src/components/UnityGame.jsx)
- Rename to `CanvasJumper.jsx` (already a canvas game, not Unity)
- Clean up code, add responsive canvas sizing

#### [NEW] [GamePlayPage.jsx](file:///d:/Programming/2026/Project/My%20Websitw/Genofogu/src/pages/GamePlayPage.jsx)
- Route: `/js-game/:gameId`
- Renders the selected game component full-screen
- Back button to game hub

#### [NEW] [_GameHub.scss](file:///d:/Programming/2026/Project/My%20Websitw/Genofogu/src/styles/components/_GameHub.scss)
- Game card grid
- Score displays
- Play button animations
- All responsive breakpoints

#### [MODIFY] [App.jsx](file:///d:/Programming/2026/Project/My%20Websitw/Genofogu/src/App.jsx)
- Add route: `/js-game/:gameId` → `GamePlayPage`

#### [MODIFY] [main.scss](file:///d:/Programming/2026/Project/My%20Websitw/Genofogu/src/styles/main.scss)
- Add `@use 'components/GameHub'`

---

### Phase 8: Scheduler Page Rebuild

#### [MODIFY] [scheduler/Scheduler.jsx](file:///d:/Programming/2026/Project/My%20Websitw/Genofogu/src/scheduler/Scheduler.jsx)
- Transform into **Productivity Hub** 
- Replace grid layout with a card-based dashboard
- Feature SoulWake as primary product card with "Launch" button

#### [MODIFY] [scheduler/pages/DashboardPage.jsx](file:///d:/Programming/2026/Project/My%20Websitw/Genofogu/src/scheduler/pages/DashboardPage.jsx)
- Display productivity cards:
  1. **SoulWake** — Featured product card with launch button
  2. **Daily Goals** — Placeholder card with TODO for Supabase integration
  3. **Habit Tracker** — Placeholder card
  4. **Task Manager** — Placeholder card
- Modern dashboard UI with glassmorphism

#### [MODIFY] [scheduler/components/Sidebar.jsx](file:///d:/Programming/2026/Project/My%20Websitw/Genofogu/src/scheduler/components/Sidebar.jsx)
- Update branding to "Productivity Hub"
- Add "← Back to Portfolio" link

---

### Phase 9: Performance & Code Quality

#### [MODIFY] [App.jsx](file:///d:/Programming/2026/Project/My%20Websitw/Genofogu/src/App.jsx)
- Add `React.lazy()` for all page components
- Add `<Suspense>` wrapper with loading fallback
- This enables automatic code splitting per route

#### [MODIFY] [index.html](file:///d:/Programming/2026/Project/My%20Websitw/Genofogu/index.html)
- Add proper meta description and OG tags for SEO
- Add preconnect for Google Fonts
- Fix title to "Geno | AI Developer & Builder"

#### Global SCSS Refactoring
- Add consistent section padding via `.global-container` mixin
- Add responsive breakpoints to ALL component SCSS files
- Ensure no content touches screen edges on any viewport

---

## Open Questions

> [!IMPORTANT]
> 1. **Social Media URLs**: What are your exact GitHub, LinkedIn, and Instagram profile URLs?
> 2. **SoulWake**: Is SoulWake deployed? If so, what's the URL?
> 3. **Weather API**: Should I set up an OpenWeatherMap free API key, or use a free no-key endpoint (sunrise-sunset.org)?
> 4. **Email**: Is `anugaur300@gmail.com` the correct contact email?
> 5. **Project GitHub Repos**: Do any of the 6 portfolio projects have live GitHub repos I should link to?

---

## Verification Plan

### Automated Tests
- `npm run build` — Verify zero build errors after all changes
- `npm run lint` — Verify zero lint errors
- Browser testing at 5 viewports: 375px (mobile), 768px (tablet), 1024px (laptop), 1440px (desktop), 2560px (ultrawide)

### Manual Verification
- Visual inspection of every page at all breakpoints via browser subagent
- Verify custom cursor works (no dual cursor)
- Verify burger menu opens/closes on mobile
- Verify all route navigation works
- Verify TimeLapse responds to scroll
- Verify social links point to correct URLs
- Verify contact form renders correctly (not the About page!)
