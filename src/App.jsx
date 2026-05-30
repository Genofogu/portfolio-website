import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/MainLayout';
import CustomCursor from './components/CustomCursor/CustomCursor'; // Preload cursor

// Lazy Loaded Pages
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PlaygroundPage = lazy(() => import('./pages/PlaygroundPage'));
const PlaygroundEditorPage = lazy(() => import('./pages/PlaygroundEditorPage'));
const JsGamePage = lazy(() => import('./pages/JsGamePage'));
const GamePlayPage = lazy(() => import('./pages/GamePlayPage'));
const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage'));
const AuthPage = lazy(() => import('./pages/LoginPage'));
const Scheduler = lazy(() => import('./scheduler/Scheduler'));

// Loading Fallback
const LoadingScreen = () => (
  <div style={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'var(--color-background)', color: 'var(--color-accent-primary)' }}>
    <i className="fa-solid fa-circle-notch fa-spin fa-3x"></i>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            {/* Public Routes with MainLayout */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects" element={<Navigate to="/#portfolio" replace />} />
              <Route path="/contact" element={<ContactPage />} />
              
              <Route path="/case-study/:id" element={<CaseStudyPage />} />
              
              <Route path="/playground" element={<PlaygroundPage />} />
              <Route path="/playground/editor" element={<PlaygroundEditorPage />} />
              
              <Route path="/js-game" element={<JsGamePage />} />
              <Route path="/js-game/:gameId" element={<GamePlayPage />} />
            </Route>

            {/* Auth Routes */}
            <Route path="/login" element={<AuthPage />} />

            {/* Protected Modular App Routes (No MainLayout wrapper) */}
            <Route 
              path="/scheduler/*" 
              element={
                <ProtectedRoute>
                  <CustomCursor />
                  <Scheduler />
                </ProtectedRoute>
              } 
            />

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  </ThemeProvider>
  );
}

export default App;