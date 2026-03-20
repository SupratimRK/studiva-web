import { useEffect, useState } from 'react';
import { Menu, X, ArrowRight, BookOpen, UserCircle, Layout, LayoutDashboard } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const links = [
        { label: 'Features', href: '#features', icon: <Layout size={14} /> },
        { label: 'How it works', href: '#how-it-works', icon: <LayoutDashboard size={14} /> },
        { label: 'Creators', href: '#creators', icon: <UserCircle size={14} /> },
        { label: 'Reviews', href: '#testimonials', icon: <BookOpen size={14} /> },
    ];

    return (
        <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
            <div className="container nav__inner">
                {/* Logo */}
                <a href="#" className="nav__logo" id="nav-logo">
                    <div className="nav__logo-icon">
                        <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
                            <rect width="28" height="28" rx="7" fill="var(--accent)" />
                            <path d="M7 9h14M7 14h9M7 19h12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
                        </svg>
                    </div>
                    <span>Studyvia</span>
                </a>

                {/* Desktop Links */}
                <div className="nav__links">
                    {links.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="nav__link"
                            id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                            <span className="nav__link-icon">{link.icon}</span>
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Actions */}
                <div className="nav__actions">
                    <a href="#download" className="btn-primary" id="nav-cta-download">
                        Get the App
                        <ArrowRight size={14} />
                    </a>
                    <button
                        className="nav__mobile-toggle"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`nav__mobile-menu ${isOpen ? 'is-open' : ''}`}>
                <div className="container">
                    {links.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="nav__mobile-link"
                        >
                            {link.label}
                        </a>
                    ))}
                    <a href="#download" className="btn-primary" style={{ width: '100%', marginTop: '20px' }}>
                        Download Studyvia
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
