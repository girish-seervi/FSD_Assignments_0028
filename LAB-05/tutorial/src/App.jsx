import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import HttpDemo from './components/HttpDemo';
import LayoutDemo from './components/LayoutDemo';
import RegistrationForm from './components/RegistrationForm';
import ConceptsSection from './components/ConceptsSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 1. Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main style={{ flex: 1 }}>
        {/* 2. Hero Section */}
        <HeroSection />

        {/* 3. Tutorial 1: HTTP Request-Response Demo */}
        <HttpDemo />

        {/* 4. Tutorial 2: Flexbox and Grid Layout Demo */}
        <LayoutDemo />

        {/* 5. Tutorial 3: Student Registration Form & Dynamic StudentCard */}
        <RegistrationForm />

        {/* 6. Tutorial 4 & Summary: Tutorial Concepts Covered */}
        <ConceptsSection />
      </main>

      {/* 7. Footer */}
      <Footer />
    </div>
  );
}
