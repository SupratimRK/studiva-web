import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import CreatorEconomy from './components/CreatorEconomy';
import Testimonials from './components/Testimonials';
import Comparison from './components/Comparison';
import FAQ from './components/FAQ';
import FinalCTA, { Footer } from './components/FinalCTA';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Force a scroll trigger refresh when everything is mounted
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', handleResize);

    // Smooth scroll native (just refreshing triggers)
    window.addEventListener('scroll', () => {
      ScrollTrigger.update();
    }, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <>
      {/* Noise overlay for premium texture */}
      <div className="noise" aria-hidden="true" />

      <Navbar />

      <main>
        <Hero />
        <Marquee />
        <Features />
        <HowItWorks />
        <CreatorEconomy />
        <Testimonials />

        {/* Fill some more stuffs: Comparison & FAQ */}
        <Comparison />
        <FAQ />

        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}

export default App;
