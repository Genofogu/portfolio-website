import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@2d/features/auth/AuthContext';
import { ThemeProvider } from '@2d/features/theme/ThemeProvider';
import ProtectedRoute from '@2d/features/auth/ProtectedRoute';
import MainLayout from '@2d/features/shared/MainLayout';
import CustomCursor from '@2d/features/shared/CustomCursor';
import { DimensionProvider } from '@shared/DimensionContext';
import DimensionTransition from '@shared/DimensionTransition';

// Lazy Loaded 2D Pages
const HomePage = lazy(() => import('@2d/features/home/HomePage'));
const AboutPage = lazy(() => import('@2d/features/about/AboutPage'));
const ProjectsPage = lazy(() => import('@2d/features/projects/ProjectsPage'));
const ContactPage = lazy(() => import('@2d/features/contact/ContactPage'));
const IDEPage = lazy(() => import('@2d/features/ide/IDEPage'));
const IDEEditorPage = lazy(() => import('@2d/features/ide/IDEEditorPage'));
const JsGamePage = lazy(() => import('@2d/features/games/GameHub'));
const GamePlayPage = lazy(() => import('@2d/features/games/GamePage'));
const CaseStudyPage = lazy(() => import('@2d/features/projects/CaseStudyPage'));
const GitHubPage = lazy(() => import('@2d/features/github/GitHubPage'));
const ComingSoonPage = lazy(() => import('@2d/features/comingsoon/ComingSoonPage'));

// Blog Pages
const BlogPage = lazy(() => import('@2d/features/blog/BlogPage'));
const BlogPostPage = lazy(() => import('@2d/features/blog/BlogPostPage'));
const BlogCategoryPage = lazy(() => import('@2d/features/blog/BlogCategoryPage'));
const BlogSearch = lazy(() => import('@2d/features/blog/BlogSearch'));

// Dashboard Pages
const DashboardLayout = lazy(() => import('@2d/features/dashboard/DashboardLayout'));
const DashboardPage = lazy(() => import('@2d/features/dashboard/DashboardPage'));
const TasksPage = lazy(() => import('@2d/features/dashboard/TasksPage'));
const StatsPage = lazy(() => import('@2d/features/dashboard/StatsPage'));

// Lazy Loaded 3D App
const ThreeDApp = lazy(() => import('@3d/src/App'));

// Loading Fallback
const LoadingScreen = () => (
  <div style={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'var(--color-background)', color: 'var(--color-accent-primary)' }}>
    <i className="fa-solid fa-circle-notch fa-spin fa-3x"></i>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <DimensionProvider>
        <Router>
          <AuthProvider>
            <DimensionTransition />
            <Suspense fallback={<LoadingScreen />}>
              <Routes>
                {/* 2D Portfolio Route aliases */}
                <Route path="/2d/*" element={<Navigate to="/" replace />} />

                {/* 3D Immersive Portfolio */}
                <Route path="/3d" element={<ThreeDApp />} />

                {/* Public 2D Routes with MainLayout */}
                <Route element={<MainLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  
                  <Route path="/case-study/:id" element={<CaseStudyPage />} />
                  
                  <Route path="/ide" element={<IDEPage />} />
                  <Route path="/ide/editor" element={<IDEEditorPage />} />
                  
                  <Route path="/js-game" element={<JsGamePage />} />
                  <Route path="/js-game/:gameId" element={<GamePlayPage />} />

                  <Route path="/github" element={<GitHubPage />} />
                  <Route path="/coming-soon" element={<ComingSoonPage />} />

                  {/* Blog Routes */}
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:slug" element={<BlogPostPage />} />
                  <Route path="/blog/category/:category" element={<BlogCategoryPage />} />
                  <Route path="/blog/search" element={<BlogSearch />} />
                </Route>

                {/* Auth Routes redirected to Home */}
                <Route path="/login" element={<Navigate to="/" replace />} />
                <Route path="/register" element={<Navigate to="/" replace />} />

                {/* Protected Dashboard Routes (No MainLayout wrapper) */}
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <CustomCursor />
                      <DashboardLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<DashboardPage />} />
                  <Route path="tasks" element={<TasksPage />} />
                  <Route path="stats" element={<StatsPage />} />
                </Route>

                {/* Legacy Redirect */}
                <Route path="/scheduler/*" element={<Navigate to="/dashboard" replace />} />

                {/* Catch-all redirect */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </AuthProvider>
        </Router>
      </DimensionProvider>
    </ThemeProvider>
  );
}

export default App;