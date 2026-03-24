import { Twitter, Instagram, Linkedin, Youtube, Zap } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    const handleNavigate = (e, href) => {
        if (href.startsWith('/')) {
            e.preventDefault();
            window.history.pushState({}, '', href);
            window.dispatchEvent(new Event('navigate'));
        }
    };

    const cols = [
        { title: 'Product', links: [{ label: 'Features', href: '#' }, { label: 'How it works', href: '#' }, { label: 'Creator Tools', href: '#' }, { label: 'Pricing', href: '#' }, { label: 'Release Notes', href: '#' }] },
        { title: 'Subjects', links: [{ label: 'JEE Mains', href: '#' }, { label: 'NEET UG', href: '#' }, { label: 'CBSE Class 12', href: '#' }, { label: 'UPSC Prelims', href: '#' }, { label: 'Engineering', href: '#' }] },
        { title: 'Company', links: [{ label: 'About Studyvia', href: '#' }, { label: 'Career', href: '#' }, { label: 'Newsroom', href: '#' }, { label: 'Contact Us', href: '#' }] },
        { title: 'Legal', links: [{ label: 'Privacy Policy', href: '/privacy' }, { label: 'Terms of Service', href: '/tos' }, { label: 'Account Deletion', href: '/delete-account' }] },
    ];

    return (
        <footer className="footer" id="footer">
            <div className="container footer__inner">
                <div className="footer__brand">
                    <div className="footer__logo">
                        <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                            <rect width="28" height="28" rx="7" fill="var(--accent)" />
                            <path d="M7 9h14M7 14h9M7 19h12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
                        </svg>
                        <span>Studyvia</span>
                    </div>
                    <p className="footer__tagline">The world's premium note-sharing marketplace. Built for students, by students.</p>
                    <div className="footer__social">
                        {[Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => (
                            <a key={i} href="#" className="footer__social-link" aria-label="Social link">
                                <Icon size={16} />
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
                                    <li key={l.label}>
                                        <a 
                                            href={l.href} 
                                            id={`footer-link-${l.label.toLowerCase().replace(/\s+/g, '-')}`}
                                            onClick={(e) => handleNavigate(e, l.href)}
                                        >
                                            {l.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <div className="footer__bottom">
                <div className="container footer__bottom-inner">
                    <span>© 2025 Studyvia Platform. All rights reserved.</span>
                    <span className="footer__location">
                        <Zap size={12} fill="var(--accent-light)" stroke="none" />
                        Made in India
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
