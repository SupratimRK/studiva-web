import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Sparkles, TrendingUp, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import './Features.css';

gsap.registerPlugin(ScrollTrigger);

const features = [
    {
        id: 'upload',
        label: 'Experience',
        title: 'Upload Effortlessly.',
        desc: 'Share handwritten scans, PDFs, or typed notes in seconds. Our AI-powered engine automatically tags and categorises your content for discoverability.',
        bullets: ['PDF & Handwritten scan support', 'Batch upload up to 100 pages', 'Auto-tagging for JEE, NEET, etc.', 'Cloud storage included'],
        video: '/videos/Video_Ready_After_Agreement.mp4',
        icon: <Layers size={18} />,
        flip: false,
        widgets: [
            { label: 'AI Tagging', value: 'Physics', x: -30, y: 10 },
            { label: 'Status', value: 'Optimised', x: 20, y: 80 }
        ]
    },
    {
        id: 'earn',
        label: 'Revenue',
        title: 'Earn Real Money.',
        desc: 'Turn your hard work into a sustainable income stream. Set your own price or use the rewarded ads model to reach more students while getting paid.',
        bullets: ['70% Creator revenue share', 'Rewarded ads payouts', 'Instant UPI withdrawals', 'Earning analytics dashboard'],
        video: '/videos/Video_Generation_Request_Fulfilled.mp4',
        icon: <TrendingUp size={18} />,
        flip: true,
        widgets: [
            { label: 'Revenue', value: '₹24,500', x: -40, y: 20 },
            { label: 'Unlocks', value: '1.2K', x: 30, y: 70 }
        ]
    },
    {
        id: 'learn',
        label: 'Knowledge',
        title: 'Learn Smarter.',
        desc: 'Access verified notes from toppers and rank-holders. Study offline, bookmark key concepts, and transform your preparation with real student content.',
        bullets: ['Topper-verified notes only', 'Filter by exam & subject', 'Offline-first reading mode', 'Study progress tracking'],
        video: '/videos/Flat_Illustration_Animation_Enhancement_Request.mp4',
        icon: <BookOpen size={18} />,
        flip: false,
        widgets: [
            { label: 'Verified', value: 'IIT Delhi', x: -20, y: 15 },
            { label: 'Rating', value: '4.8 ★', x: 40, y: 75 }
        ]
    },
];

const FeatureBlock = ({ feature, index }) => {
    const blockRef = useRef(null);
    const mediaRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const el = blockRef.current;
        if (!el) return;

        // Refresh ScrollTrigger to ensure correct offsets
        ScrollTrigger.refresh();

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                toggleActions: 'play none none none',
                once: true
            },
        });

        tl.fromTo(mediaRef.current,
            { opacity: 0, x: feature.flip ? 60 : -60, scale: 0.95 },
            { opacity: 1, x: 0, scale: 1, duration: 1, ease: 'power4.out' }
        ).fromTo(textRef.current,
            { opacity: 0, x: feature.flip ? -60 : 60 },
            { opacity: 1, x: 0, duration: 1, ease: 'power4.out' },
            '-=0.8'
        ).fromTo(el.querySelectorAll('.feat-bullet'),
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out' },
            '-=0.6'
        ).fromTo(el.querySelectorAll('.feat-widget'),
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, stagger: 0.2, duration: 0.7, ease: 'back.out(1.7)' },
            '-=0.4'
        );

        return () => tl.kill();
    }, [feature.flip]);

    return (
        <div
            className={`feat-block ${feature.flip ? 'feat-block--flip' : ''}`}
            ref={blockRef}
            id={`feature-${feature.id}`}
        >
            <div className="container feat-block__inner">
                {/* Media */}
                <div className="feat-block__media" ref={mediaRef}>
                    <div className="feat-block__video-container">
                        <div className="feat-block__video-wrapper card">
                            <video
                                src={feature.video}
                                autoPlay muted loop playsInline
                                className="feat-block__video"
                            />
                            {/* Overlay Vignette for premium feel */}
                            <div className="feat-block__video-overlay" />
                        </div>

                        {/* Floating Widgets */}
                        {feature.widgets.map((w, i) => (
                            <div
                                key={i}
                                className="feat-widget card"
                                style={{
                                    left: `${50 + w.x}%`,
                                    top: `${w.y}%`,
                                }}
                            >
                                <div className="feat-widget__label">{w.label}</div>
                                <div className="feat-widget__val">{w.value}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Text */}
                <div className="feat-block__text" ref={textRef}>
                    <div className="feat-block__label-wrap">
                        <span className="label-icon">{feature.icon}</span>
                        <span className="label-text">{feature.label}</span>
                    </div>
                    <h2 className="section-title feat-block__title">{feature.title}</h2>
                    <p className="section-sub feat-block__desc">{feature.desc}</p>
                    <ul className="feat-block__bullets">
                        {feature.bullets.map((b, i) => (
                            <li key={i} className="feat-bullet">
                                <CheckCircle2 size={16} className="feat-bullet__icon" />
                                <span>{b}</span>
                            </li>
                        ))}
                    </ul>
                    <a href="#download" className="btn-secondary feat-block__cta" id={`feat-cta-${feature.id}`}>
                        Get Started Free
                        <Sparkles size={14} />
                    </a>
                </div>
            </div>
        </div>
    );
};

const categories = [
    { name: 'JEE Mains', count: '12K+ notes' },
    { name: 'JEE Advanced', count: '8K+ notes' },
    { name: 'NEET UG', count: '15K+ notes' },
    { name: 'CBSE Class 12', count: '20K+ notes' },
    { name: 'Engineering', count: '11K+ notes' },
    { name: 'UPSC / IAS', count: '9K+ notes' },
    { name: 'CA Foundation', count: '6K+ notes' },
    { name: 'Law / CLAT', count: '4K+ notes' },
];

const Features = () => {
    const catRef = useRef(null);

    useEffect(() => {
        if (!catRef.current) return;
        const tl = gsap.timeline({
            scrollTrigger: { trigger: catRef.current, start: 'top 85%' },
        });
        tl.fromTo(catRef.current.querySelectorAll('.cat-chip'),
            { opacity: 0, y: 20, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, stagger: 0.05, duration: 0.6, ease: 'power2.out' }
        );
        return () => tl.kill();
    }, []);

    return (
        <section id="features" className="features">
            {features.map((f, i) => <FeatureBlock key={f.id} feature={f} index={i} />)}

            <div className="feat-cats" ref={catRef}>
                <div className="container">
                    <div className="feat-cats__head">
                        <span className="label">Ecosystem</span>
                        <h2 className="section-title">Supporting Every Aspirant.</h2>
                    </div>
                    <div className="feat-cats__grid">
                        {categories.map((c, i) => (
                            <motion.div
                                key={i}
                                className="cat-chip card"
                                id={`cat-${c.name.toLowerCase().replace(/\s+/g, '-')}`}
                                whileHover={{ y: -4, borderColor: 'var(--accent-light)' }}
                            >
                                <div className="cat-chip__dot" />
                                <div className="cat-chip__content">
                                    <span className="cat-chip__name">{c.name}</span>
                                    <span className="cat-chip__count">{c.count}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
