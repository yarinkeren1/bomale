import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
// import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Contact from './components/Contact';
import OurStory from './components/OurStory';
import Reviews from './components/Reviews';
import LeaveReview from './components/LeaveReview';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Footer />
            </>
          } />
          <Route path="/menu" element={
            <>
              <Menu />
              <Footer />
            </>
          } />
          <Route path="/contact" element={
            <>
              <Contact />
              <Footer />
            </>
          } />
          <Route path="/our-story" element={
            <>
              <OurStory />
              <Footer />
            </>
          } />
          <Route path="/reviews" element={
            <>
              <Reviews />
              <Footer />
            </>
          } />
          <Route path="/leave-review" element={
            <>
              <LeaveReview />
              <Footer />
            </>
          } />
        </Routes>
        {/* <Analytics /> */}
      </div>
    </Router>
  );
}

export default App;
