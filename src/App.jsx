import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './features/auth/AuthContext';
import { ThemeProvider } from './features/theme/ThemeProvider';
import ProtectedRoute from './features/auth/ProtectedRoute';
import MainLayout from './features/shared/MainLayout';
import CustomCursor from './features/shared/CustomCursor'; // Preload cursor

// Lazy Loaded Pages
const HomePage = lazy(() => import('./features/home/HomePage'));
const AboutPage = lazy(() => import('./features/about/AboutPage'));
const ProjectsPage = lazy(() => import('./features/projects/ProjectsPage'));
const ContactPage = lazy(() => import('./features/contact/ContactPage'));
const IDEPage = lazy(() => import('./features/ide/IDEPage'));
const IDEEditorPage = lazy(() => import('./features/ide/IDEEditorPage'));
const JsGamePage = lazy(() => import('./features/games/GameHub'));
const GamePlayPage = lazy(() => import('./features/games/GamePage'));
const CaseStudyPage = lazy(() => import('./features/projects/CaseStudyPage'));
const AuthPage = lazy(() => import('./features/auth/LoginPage'));
const RegisterPage = lazy(() => import('./features/auth/RegisterPage'));
const GitHubPage = lazy(() => import('./features/github/GitHubPage'));
const ComingSoonPage = lazy(() => import('./features/comingsoon/ComingSoonPage'));

// Blog Pages
const BlogPage = lazy(() => import('./features/blog/BlogPage'));
const BlogPostPage = lazy(() => import('./features/blog/BlogPostPage'));
const BlogCategoryPage = lazy(() => import('./features/blog/BlogCategoryPage'));
const BlogSearch = lazy(() => import('./features/blog/BlogSearch'));

// Dashboard Pages
const DashboardLayout = lazy(() => import('./features/dashboard/DashboardLayout'));
const DashboardPage = lazy(() => import('./features/dashboard/DashboardPage'));
const TasksPage = lazy(() => import('./features/dashboard/TasksPage'));
const StatsPage = lazy(() => import('./features/dashboard/StatsPage'));

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
  </ThemeProvider>
  );
}

export default App;