import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Apple, Smartphone, ArrowRight, Play, Star, TrendingUp, Users } from 'lucide-react';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const containerRef = useRef(null);
    const phoneRef = useRef(null);

    useEffect(() => {
        // Parallax effect on phone
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
        });

        tl.to(phoneRef.current, { y: 100, rotateX: 20, ease: 'none' });

        return () => tl.kill();
    }, []);

    return (
        <section className="hero" ref={containerRef}>
            <div className="grid-bg" />
            <div className="hero__glow" />

            <div className="container hero__inner">
                {/* Left: Content */}
                <div className="hero__content">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="label">Community-Powered Knowledge</span>
                    </motion.div>

                    <h1 className="hero__title">
                        <motion.span
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            Turn Your Notes
                        </motion.span>
                        <br />
                        <motion.span
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="accent-text"
                        >
                            Into Income.
                        </motion.span>
                    </h1>

                    <motion.p
                        className="hero__sub section-sub"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.7 }}
                    >
                        The world's first note marketplace that respects your time.
                        Earn through paid sales and rewarded ads — <strong>no forced ads, ever.</strong>
                    </motion.p>

                    <motion.div
                        className="hero__cta"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.7 }}
                    >
                        <a href="#download" className="btn-primary">
                            <Apple size={18} fill="currentColor" />
                            Download for iOS
                        </a>
                        <a href="#download" className="btn-secondary">
                            <Smartphone size={18} />
                            Android App
                        </a>
                    </motion.div>

                    <motion.div
                        className="hero__stats"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                    >
                        <div className="hero__stat">
                            <Users size={16} />
                            <span><strong>200K+</strong> Learners</span>
                        </div>
                        <div className="hero__stat">
                            <TrendingUp size={16} />
                            <span><strong>₹2Cr+</strong> Paid</span>
                        </div>
                    </motion.div>
                </div>

                {/* Right: Visual with "Video Widgets" */}
                <div className="hero__visual">
                    <div className="hero__visual-container" ref={phoneRef}>
                        <div className="hero__phone-wrapper card">
                            <img src="/images/hero-phone.png" alt="StudivaApp" className="hero__phone-img" />
                            <div className="hero__phone-overlay" />
                        </div>

                        {/* Floating Widgets (The "Video Widgets" feel) */}
                        <motion.div
                            className="hero-widget card"
                            initial={{ opacity: 0, x: -40, y: 40 }}
                            animate={{ opacity: 1, x: 0, y: 0 }}
                            transition={{ delay: 1.2, duration: 0.8, type: 'spring' }}
                            style={{ top: '20%', left: '-80px' }}
                        >
                            <div className="hero-widget__icon"><Star size={14} fill="#fbbf24" stroke="none" /></div>
                            <div className="hero-widget__info">
                                <span className="hero-widget__label">Rating</span>
                                <span className="hero-widget__val">4.9/5</span>
                            </div>
                        </motion.div>

                        <motion.div
                            className="hero-widget card"
                            initial={{ opacity: 0, x: 40, y: -40 }}
                            animate={{ opacity: 1, x: 0, y: 0 }}
                            transition={{ delay: 1.4, duration: 0.8, type: 'spring' }}
                            style={{ bottom: '25%', right: '-60px' }}
                        >
                            <div className="hero-widget__icon"><Play size={14} fill="#fff" stroke="none" /></div>
                            <div className="hero-widget__info">
                                <span className="hero-widget__label">Ad Unlocks</span>
                                <span className="hero-widget__val">+12.4K</span>
                            </div>
                        </motion.div>

                        <motion.div
                            className="hero-widget hero-widget--green card"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.6, duration: 0.8, type: 'spring' }}
                            style={{ top: '65%', left: '-40px' }}
                        >
                            <div className="hero-widget__info">
                                <span className="hero-widget__label">Earnings</span>
                                <span className="hero-widget__val">₹1,240</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="hero__scroll">
                <div className="hero__scroll-line" />
                <span>Scroll to Explore</span>
            </div>
        </section>
    );
};

export default Hero;
