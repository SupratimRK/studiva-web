import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Home from './pages/Home';
import Lenis from '@studio-freight/lenis';

// Legal Pages
import Privacy from './pages/legal/Privacy';
import TOS from './pages/legal/TOS';
import DeleteAccount from './pages/legal/DeleteAccount';

// Dashboard
import DashboardLayout from './features/dashboard/DashboardLayout';
import Overview from './features/dashboard/Overview';
import NotesManager from './features/dashboard/NotesManager';

import './styles/variables.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [dashboardTab, setDashboardTab] = useState('overview');

  useEffect(() => {
    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 1.5,
      infinite: false,
    });

    ScrollTrigger.config({ limitCallbacks: true });

    // Sync ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0); // Disable lag smoothing to prevent 'jumpy' resets with Lenis sync

    // Listen for back/forward browser buttons
    const handleLocationChange = () => {
      setPath(window.location.pathname);
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('navigate', handleLocationChange);

    // Initial ScrollTrigger setup
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    const handleResize = () => {
        ScrollTrigger.refresh();
        lenis.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('navigate', handleLocationChange);
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      lenis.destroy();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);


  // Simple Router
  const renderContent = () => {
    switch (path) {
      case '/privacy':
        return <Privacy />;
      case '/tos':
        return <TOS />;
      case '/delete-account':
        return <DeleteAccount />;
      case '/dashboard':
        return (
          <DashboardLayout 
            activeTab={dashboardTab} 
            onTabChange={setDashboardTab}
          >
            {dashboardTab === 'overview' && <Overview />}
            {dashboardTab === 'notes' && <NotesManager />}
            {dashboardTab === 'earnings' && <div className="dashboard-card">Earnings Coming Soon</div>}
            {dashboardTab === 'analytics' && <div className="dashboard-card">Analytics Coming Soon</div>}
          </DashboardLayout>
        );
      default:
        return <Home />;
    }
  };

  return (
    <>
      {/* Premium Texture Noise */}
      <div className="noise" aria-hidden="true" />
      {renderContent()}
    </>
  );
}

export default App;

