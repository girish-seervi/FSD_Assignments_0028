import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import HttpDemo from './components/HttpDemo';
import LayoutDemo from './components/LayoutDemo';
import RegistrationForm from './components/RegistrationForm';
import ConceptsSection from './components/ConceptsSection';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ScrollToTop />
      {/* 1. Navbar */}
      <Navbar />

      {/* Main Content Area - Dynamic Routing */}
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/http-demo" element={<HttpDemo />} />
          <Route path="/layouts" element={<LayoutDemo />} />
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/concepts" element={<ConceptsSection />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* 2. Footer */}
      <Footer />
    </div>
  );
}

