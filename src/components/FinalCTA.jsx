import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './FinalCTA.css';

gsap.registerPlugin(ScrollTrigger);

const AppStoreIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
);

const PlayStoreIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3.18 23.61c.3.17.64.26.99.26.38 0 .75-.1 1.08-.3l13.34-7.7-2.97-2.97-12.44 10.71zM.25 1.13C.09 1.46 0 1.83 0 2.22v19.56c0 .39.09.76.25 1.09l.1.1 10.96-10.96v-.26L.36 1.03l-.1.1zM20.79 10.5l-2.76-1.59L14.9 12.1l3.14 3.14 2.76-1.59c.79-.46.79-1.69-.01-2.15zM3.18.39L16.52 8.1 13.55 11.06 1.11.35C1.44.14 1.83.04 2.19.04c.34 0 .68.12.99.35z" />
    </svg>
);

const Footer = () => {
    const cols = [
        { title: 'Product', links: ['Features', 'How it works', 'Creator tools', 'Pricing', 'Changelog'] },
        { title: 'Subjects', links: ['JEE Mains', 'NEET UG', 'CBSE', 'UPSC / IAS', 'Engineering'] },
        { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press', 'Contact'] },
        { title: 'Legal', links: ['Privacy policy', 'Terms of use', 'Cookie policy', 'Creator agreement'] },
    ];
    return (
        <footer className="footer" id="footer">
            <div className="container footer__inner">
                <div className="footer__brand">
                    <div className="footer__logo">
                        <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                            <rect width="28" height="28" rx="7" fill="#7c3aed" />
                            <path d="M7 9h14M7 14h9M7 19h12" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <span>Studyvia</span>
                    </div>
                    <p className="footer__tagline">The note-sharing marketplace built for students, by students.</p>
                    <div className="footer__social">
                        {['Twitter', 'Instagram', 'LinkedIn', 'YouTube'].map(s => (
                            <a key={s} href="#" className="footer__social-link" aria-label={s} id={`footer-${s.toLowerCase()}`}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                    <rect x="2" y="2" width="20" height="20" rx="5" />
                                    <circle cx="12" cy="12" r="4" />
                                </svg>
                            </a>
                        ))}
                    </div>
                </div>

                <div className="footer__nav">
                    {cols.map(col => (
                        <div key={col.title} className="footer__col">
                            <span className="footer__col-title">{col.title}</span>
                            <ul>
                                {col.links.map(l => (
                                    <li key={l}><a href="#" id={`footer-link-${l.toLowerCase().replace(/\s+/g, '-')}`}>{l}</a></li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <div className="footer__bottom">
                <div className="container footer__bottom-inner">
                    <span>© 2025 Studyvia. All rights reserved.</span>
                    <span>Made in India — for students everywhere.</span>
                </div>
            </div>
        </footer>
    );
};

const FinalCTA = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const tl = gsap.timeline({
            scrollTrigger: { trigger: el, start: 'top 78%', toggleActions: 'play none none none' },
        });
        tl.from(el.querySelectorAll('.cta-animate'), {
            opacity: 0, y: 32, stagger: 0.12, duration: 0.65, ease: 'power3.out',
        });
        return () => tl.kill();
    }, []);

    return (
        <>
            <section className="final-cta" id="download" ref={sectionRef}>
                <div className="final-cta__grid-bg">
                    {/* grid + radial mask */}
                </div>
                <div className="container final-cta__inner">
                    <span className="label cta-animate">Start Today</span>
                    <h2 className="final-cta__title cta-animate">
                        Your notes could be<br />
                        <span className="accent-text">earning right now.</span>
                    </h2>
                    <p className="section-sub final-cta__sub cta-animate">
                        Join 200,000+ students and creators. Upload your first note free,
                        start earning within 24 hours. <strong>No forced ads. Ever.</strong>
                    </p>

                    <div className="final-cta__btns cta-animate">
                        <a href="#" className="cta-store-btn" id="final-cta-appstore">
                            <AppStoreIcon />
                            <div>
                                <span className="cta-store-btn__sub">Download on the</span>
                                <span className="cta-store-btn__name">App Store</span>
                            </div>
                        </a>
                        <a href="#" className="cta-store-btn" id="final-cta-playstore">
                            <PlayStoreIcon />
                            <div>
                                <span className="cta-store-btn__sub">Get it on</span>
                                <span className="cta-store-btn__name">Google Play</span>
                            </div>
                        </a>
                    </div>

                    <div className="final-cta__feature-tags cta-animate">
                        {['No forced ads — ever', 'Earn from day one', 'Secure payments', 'iOS & Android'].map(t => (
                            <span key={t} className="final-cta__tag">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M2 6l3 3 5-5" stroke="var(--accent-light)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export { Footer };
export default FinalCTA;
