import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import SHARED components that appear on every page
import Header from './components/Header';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor/CustomCursor';

// Import our new PAGE components
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CaseStudyPage from './pages/CaseStudyPage';
import PlaygroundPage from './pages/PlaygroundPage';
import GamePage from './pages/GamePage';

// Import your main stylesheet (this remains global)
import './styles/main.scss';

function App() {
  return (
    <BrowserRouter>
      {/* These components are OUTSIDE <Routes> so they appear on every page */}
      <CustomCursor />
      <Header />

      {/* The <main> tag now wraps the changing page content */}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
         <Route path="/case-study/:slug" element={<CaseStudyPage />} />
         <Route path="/playground" element={<PlaygroundPage />} />
         <Route path="/game" element={<GamePage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;