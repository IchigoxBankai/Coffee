import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import WhyChooseUs from './components/WhyChooseUs';
import Experience from './components/Experience';
import Gallery from './components/Gallery';
import Story from './components/Story';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-luxury-cream overflow-hidden">
      <Navbar />
      <Hero />
      <Features />
      <WhyChooseUs />
      <Experience />
      <Gallery />
      <Story />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;
