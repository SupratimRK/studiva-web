import { Suspense, lazy } from 'react';

import Navbar from '../components/layout/Navbar';
import Hero from '../features/home/Hero';
import Marquee from '../components/ui/Marquee';

const Features = lazy(() => import('../features/home/Features'));
const HowItWorks = lazy(() => import('../features/home/HowItWorks'));
const CreatorEconomy = lazy(() => import('../features/home/CreatorEconomy'));
const Testimonials = lazy(() => import('../features/home/Testimonials'));
const Comparison = lazy(() => import('../features/home/Comparison'));
const FAQ = lazy(() => import('../features/home/FAQ'));
const FinalCTA = lazy(() => import('../features/home/FinalCTA'));
import Footer from '../components/layout/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Suspense fallback={<div style={{ height: '400px' }} />}>
          <Features />
          <HowItWorks />
          <CreatorEconomy />
          <Testimonials />
          <Comparison />
          <FAQ />
          <FinalCTA />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
