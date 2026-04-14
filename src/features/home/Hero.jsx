import { Suspense, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { TrendingUp, Users } from 'lucide-react';
import SplineScene from '../../components/ui/SplineScene';
import SplinePlaceholder from '../../components/ui/SplinePlaceholder';
import './Hero.css';

const Hero = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline();
        
        tl.from('.gsap-title-word', {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.15,
            // Mimics the Framer Motion y: [20, -5, 0] overshoot
            ease: "back.out(1.7)" 
        })
        .from('.gsap-sub', {
            y: 20,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out"
        }, "-=0.2")
        .from('.gsap-cta', {
            y: 20,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out"
        }, "-=0.4")
        .from('.gsap-stats', {
            opacity: 0,
            duration: 1
        }, "-=0.2");
        
        // Float animation for stats
        gsap.to('.hero__stat', {
            y: -10,
            duration: 2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            stagger: 0.3
        });

        // Background highlight sweep animation for "Into Income"
        gsap.to('.accent-text', {
            backgroundSize: "100% 100%",
            color: "var(--surface)",
            duration: 1.5,
            ease: "power3.inOut",
            delay: 0.8,
            stagger: 0.2
        });
        
    }, { scope: containerRef });

    return (
        <section className="hero" ref={containerRef}>
            <div className="grid-bg" />

            {/* 3D Scene Container - Hidden on Mobile via CSS */}
            <div className="hero__spline-container">
                <Suspense fallback={<SplinePlaceholder />}>
                    <SplineScene />
                </Suspense>
            </div>

            {/* Main Content Container */}
            <div className="container hero__inner">
                {/* Top: Big Title */}
                <div className="hero__text-layer">
                    <h1 className="hero__title">
                        <span className="gsap-title-word" style={{ display: 'inline-block' }}>
                            Turn Your Notes
                        </span>
                        <br />
                        <span className="accent-text gsap-title-word" style={{ display: 'inline-block' }}>
                            Int<span className="super-o">o</span>
                        </span>
                        {' '}
                        <span className="accent-text gsap-title-word" style={{ display: 'inline-block' }}>
                            Inc<span className="super-o">o</span>me.
                        </span>
                    </h1>
                </div>

                {/* Bottom: Description left, Buttons right */}
                <div className="hero__bottom-row">
                    <div className="hero__bottom-left gsap-sub">
                        <p className="hero__sub section-sub">
                            The world's first note marketplace that respects your time.
                            Earn through paid sales and rewarded ads — <strong>no forced ads, ever.</strong>
                        </p>
                        <div className="hero__stats gsap-stats">
                            <div className="hero__stat">
                                <Users size={18} />
                                <span><strong>200K+</strong> Learners</span>
                            </div>
                            <div className="hero__stat">
                                <TrendingUp size={18} />
                                <span><strong>₹2Cr+</strong> Paid</span>
                            </div>
                        </div>
                    </div>

                    <div className="hero__bottom-right gsap-cta">
                        <a href="https://play.google.com/store/apps/details?id=com.studiva.app" className="brutalist-button">
                            <svg className="brutalist-icon" viewBox="0 0 918.6 515.1" width="24" height="24" fill="currentColor">
                                <path d="M918.6 515.1h-918.6c14.7-155.7 103.7-288.7 235.1-359.9l-76.2-132c-4.3-7.4-1.8-16.8 5.6-21.1s16.8-1.8 21.1 5.6l77.2 133.7c58.9-26.9 125.2-41.9 196.5-41.9s137.6 15 196.5 41.9l77.2-133.7c4.2-7.4 13.7-9.9 21-5.6s9.9 13.7 5.6 21.1l-76.2 132c131.5 71.2 220.5 204.2 235.2 359.9zm-248.5-129c21.3 0 38.6-17.3 38.5-38.5 0-21.2-17.2-38.5-38.5-38.5-21.2 0-38.5 17.2-38.5 38.5 0 21.2 17.2 38.5 38.5 38.5zm-421.7 0c21.3 0 38.6-17.3 38.5-38.5 0-21.2-17.2-38.5-38.5-38.5-21.2 0-38.5 17.2-38.5 38.5 0 21.2 17.2 38.5 38.5 38.5z" />
                            </svg>
                            <div className="button-text">
                                <span>Download for</span>
                                <span>android</span>
                            </div>
                        </a>
                        <a className="fancy" href="/coming-soon" onClick={(e) => {
                            e.preventDefault();
                            window.history.pushState({}, '', '/coming-soon');
                            window.dispatchEvent(new Event('navigate'));
                        }}>
                            <span className="top-key"></span>
                            <svg className="fancy-icon" viewBox="0 0 814 1000" width="24" height="24" fill="currentColor">
                                <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
                            </svg>
                            <span className="text">Download for IOS</span>
                            <span className="bottom-key-1"></span>
                            <span className="bottom-key-2"></span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;