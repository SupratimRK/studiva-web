import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ThemeToggle from '../components/ui/ThemeToggle';
import Footer from '../components/layout/Footer';
import './Team.css';

gsap.registerPlugin(ScrollTrigger);

/* ── Data ──────────────────────────────────────────── */

const appTeam = [
  { id: 1, name: "Rupam Ghosh", designation: "Lead iOS Engineer", image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=3387&q=80" },
  { id: 2, name: "Debargha Sarkar", designation: "Android Developer", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" }
];

const webTeam = [
  { id: 5, name: "Rudra Narayan Chatterjee", designation: "Full Stack Engineer", image: "https://i.pinimg.com/474x/a9/d4/85/a9d485ab3fea763483ceb80d8e8823b4.jpg" },
  { id: 6, name: "Ayush Burman", designation: "Lead Web Developer", image: "https://i.pravatar.cc/300?img=11" }
];

const socialGraphicsTeam = [
  { id: 9, name: "Satyaki Das", designation: "Creative Director", image: "https://i.pravatar.cc/300?img=5" }
];

const prOutreachTeam = [
  { id: 101, name: "Md. Shadman Shahnawaz", image: "/team_figures/shadman.jpeg" },
  { id: 102, name: "Soham Singh", image: "https://i.pravatar.cc/300?img=4" },
  { id: 103, name: "Sk. Aqib", image: "/team_figures/aqib.jpeg" },
  { id: 104, name: "Rohit Jha", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" },
  { id: 105, name: "Anubhav Bishwakarma", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" },
  { id: 106, name: "Swastika Das", image: "https://i.pravatar.cc/300?img=9" },
  { id: 107, name: "Subhamoy Sinha", image: "https://i.pravatar.cc/300?img=14" },
  { id: 108, name: "Aniruddha Mukherjee", image: "https://i.pravatar.cc/300?img=20" },
  { id: 109, name: "Debipriya Ghosh", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" },
  { id: 110, name: "Aarav Raj", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" }
];

/* ── Capsule Card (shared across ALL layouts) ──────── */
const CapsuleCard = ({ member, className = '' }) => (
  <div className={`capsule-card ${className}`}>
    <img src={member.image} alt={member.name} />
    <div className="capsule-hover-info">
      <h3>{member.name}</h3>
      <p>{member.designation}</p>
    </div>
  </div>
);

/* ── Main Component ──────────────────────────────────── */
export default function Team() {
  const containerRef = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useGSAP(() => {

    /* ── Staggered entrance per section ── */
    gsap.utils.toArray('.team-section').forEach((section) => {
      const heading = section.querySelector('.section-title');
      const cards = section.querySelectorAll('.capsule-card');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      });

      if (heading) {
        tl.from(heading, { y: 50, opacity: 0, duration: 0.9, ease: 'power3.out' });
      }
      if (cards.length) {
        tl.from(cards, {
          y: 100,
          opacity: 0,
          scale: 0.9,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
        }, '-=0.6');
      }
    });

    /* ── Pill cards: gentle float ── */
    gsap.utils.toArray('.duo-grid .capsule-card, .solo-grid .capsule-card').forEach((card, i) => {
      gsap.to(card, {
        y: i % 2 === 0 ? -20 : 15,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        }
      });
    });

    /* ── Heading horizontal drift ── */
    gsap.utils.toArray('.section-title').forEach((el) => {
      gsap.to(el, {
        x: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 3,
        }
      });
    });

  }, { scope: containerRef });

  /* ── Modal animation ── */
  useGSAP(() => {
    if (isModalOpen) {
      gsap.fromTo('.recruitment-modal-overlay', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      gsap.fromTo('.recruitment-modal-content',
        { y: 150, opacity: 0, scale: 0.5 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'elastic.out(1, 0.5)', delay: 0.1 }
      );
    }
  }, [isModalOpen]);

  const navHome = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new Event('navigate'));
  };

  const closeModal = (e) => {
    if (e) e.stopPropagation();
    gsap.to('.recruitment-modal-content', { y: 20, opacity: 0, scale: 0.95, duration: 0.3, ease: 'power2.in' });
    gsap.to('.recruitment-modal-overlay', { opacity: 0, duration: 0.3, onComplete: () => setIsModalOpen(false) });
  };

  return (
    <>
      <main className="team-page" ref={containerRef}>
        <div className="floating-theme-toggle"><ThemeToggle /></div>
        <div className="team-dark-spacer" />

        {/* ── App Devs (2 people) ── */}
        <section className="team-section">
          <div className="container">
            <h2 className="section-title"><span className="hl">APP DEVS</span> YOU'VE BEEN SEARCHING FOR</h2>
          </div>
          <div className="duo-grid container">
            {appTeam.map(m => <CapsuleCard key={m.id} member={m} />)}
          </div>
        </section>

        {/* ── Web Devs (2 people) ── */}
        <section className="team-section">
          <div className="container">
            <h2 className="section-title"><span className="hl">WEB DEVS</span> WHO BUILD THE BACKBONE</h2>
          </div>
          <div className="duo-grid container">
            {webTeam.map(m => <CapsuleCard key={m.id} member={m} />)}
          </div>
        </section>

        {/* ── Creatives (1 person) ── */}
        <section className="team-section">
          <div className="container">
            <h2 className="section-title"><span className="hl">CREATIVES</span> THAT MAKE YOU STAND OUT</h2>
          </div>
          <div className="solo-grid container">
            {socialGraphicsTeam.map(m => <CapsuleCard key={m.id} className="solo-capsule" member={m} />)}
          </div>
        </section>

        {/* ── PR & Outreach (10 people) ── */}
        <section className="team-section">
          <div className="container">
            <h2 className="section-title"><span className="hl">PR EXPERTS</span> THAT SPREAD THE WORD</h2>
          </div>
          <div className="chubby-grid container">
            {prOutreachTeam.map((m, i) => (
              <CapsuleCard key={m.id} member={m} className={`chubby-${i + 1}`} />
            ))}
          </div>
        </section>

        {/* ── Bottom Actions ── */}
        <div className="team-footer-actions container">
          <button className="brutalist-button" onClick={navHome}>BACK TO HOMEPAGE</button>
          <button className="arch-btn join-btn" onClick={() => setIsModalOpen(true)}>JOIN THE CREW</button>
        </div>

        {/* ── Recruitment Modal ── */}
        {isModalOpen && (
          <div className="recruitment-modal-overlay" onClick={closeModal}>
            <div className="recruitment-modal-content frosted-glass" onClick={e => e.stopPropagation()}>
              <button className="modal-close-btn" onClick={closeModal}>✕</button>
              <h3 className="modal-title">JOIN THE CREW</h3>
              <form className="recruitment-form">
                <div className="form-group"><label>Full Name</label><input type="text" placeholder="John Doe" /></div>
                <div className="form-group"><label>Education / Graduation</label><input type="text" placeholder="B.Tech CS, Stanford" /></div>
                <div className="form-row flex-row">
                  <div className="form-group flex-1"><label>Age</label><input type="number" placeholder="22" /></div>
                  <div className="form-group flex-1"><label>Experience</label><input type="text" placeholder="3 Years" /></div>
                </div>
                <div className="form-group"><label>Role</label><input type="text" placeholder="e.g. Lead Web Developer" /></div>
                <button type="button" className="submit-form-btn" onClick={closeModal}>SUBMIT APPLICATION</button>
              </form>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
