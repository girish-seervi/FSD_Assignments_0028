import React from 'react';
import './App.css';

import Loader from './components/Loader';
import ProgressBar from './components/ProgressBar';
import Navbar from './components/Navbar';
import HeroSlider from './components/HeroSlider';
import Statistics from './components/Statistics';
import HodDesk from './components/HodDesk';
import AboutDepartment from './components/AboutDepartment';
import VisionMission from './components/VisionMission';
import Programs from './components/Programs';
import FacultyDirectory from './components/FacultyDirectory';
import Laboratories from './components/Laboratories';
import ResearchInnovation from './components/ResearchInnovation';
import PlacementsRecruiters from './components/PlacementsRecruiters';
import Achievements from './components/Achievements';
import NewsEvents from './components/NewsEvents';
import Gallery from './components/Gallery';
import Downloads from './components/Downloads';
import Testimonials from './components/Testimonials';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

function App() {
  return (
    <div className="App">
      <Loader />
      <ProgressBar />
      <Navbar />
      <main>
        <HeroSlider />
        <Statistics />
        <HodDesk />
        <AboutDepartment />
        <VisionMission />
        <Programs />
        <FacultyDirectory />
        <Laboratories />
        <ResearchInnovation />
        <PlacementsRecruiters />
        <Achievements />
        <NewsEvents />
        <Gallery />
        <Downloads />
        <Testimonials />
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
