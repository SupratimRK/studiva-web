import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import './CreatorEconomy.css';

gsap.registerPlugin(ScrollTrigger);

const modes = [
    {
        id: 'paid',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <rect x="1" y="4" width="22" height="16" rx="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
        ),
        title: 'Paid notes',
        badge: 'Highest earnings',
        desc: 'Set a one-time price. Learners pay to access your full notes. You earn 70% of every sale.',
        earn: '₹15,000 / month avg.',
    },
    {
        id: 'rewarded',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <polygon points="23 7 16 12 23 17 23 7" />
                <rect x="1" y="5" width="15" height="14" rx="2" />
            </svg>
        ),
        title: 'Rewarded ads',
        badge: 'Best reach',
        desc: 'Notes are free — learners watch a 30-second ad to unlock. You earn from ad revenue automatically.',
        earn: '₹6,000 / month avg.',
    },
    {
        id: 'free',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
            </svg>
        ),
        title: 'Free notes',
        badge: 'Build reputation',
        desc: 'Share freely to grow your follower base and rank in search. Leads to higher paid note conversions.',
        earn: 'Reputation + discovery',
    },
];

function useCounter(target, duration = 1.5, start = false) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!start) return;
        let startTime = null;
        const step = (ts) => {
            if (!startTime) startTime = ts;
            const progress = Math.min((ts - startTime) / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [start, target, duration]);
    return count;
}

const stats = [
    { label: 'Creator payouts', value: 20000000, prefix: '₹', suffix: '+' },
    { label: 'Active creators', value: 4200, prefix: '', suffix: '+' },
    { label: 'Notes monetised', value: 32000, prefix: '', suffix: '+' },
    { label: 'Avg monthly earn', value: 8400, prefix: '₹', suffix: '' },
];

const StatItem = ({ stat, animate }) => {
    const count = useCounter(stat.value, 1.8, animate);
    const display = count >= 1000000
        ? `${stat.prefix}${(count / 1000000).toFixed(1)}Cr${stat.suffix}`
        : count >= 1000
            ? `${stat.prefix}${(count / 1000).toFixed(1)}K${stat.suffix}`
            : `${stat.prefix}${count}${stat.suffix}`;

    return (
        <div className="creator-stat">
            <span className="creator-stat__val">{display}</span>
            <span className="creator-stat__label">{stat.label}</span>
        </div>
    );
};

const CreatorEconomy = () => {
    const statsRef = useRef(null);
    const [animateStats, setAnimateStats] = useState(false);

    useEffect(() => {
        if (!statsRef.current) return;
        const trigger = ScrollTrigger.create({
            trigger: statsRef.current,
            start: 'top 80%',
            onEnter: () => setAnimateStats(true),
        });
        return () => trigger.kill();
    }, []);

    return (
        <section className="creator" id="creators">
            <div className="container">
                {/* Header */}
                <div className="creator__head">
                    <span className="label">Creator Economy</span>
                    <h2 className="section-title">Earn from what<br />you already know.</h2>
                    <p className="section-sub">
                        Your study notes are more valuable than you think. Thousands of students need exactly what you've already written.
                    </p>
                </div>

                {/* Mode cards */}
                <div className="creator__modes">
                    {modes.map((m, i) => (
                        <motion.div
                            key={m.id}
                            className="mode-card card"
                            id={`mode-${m.id}`}
                            initial={{ opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            whileHover={{ y: -6, transition: { type: 'spring', stiffness: 400 } }}
                        >
                            <div className="mode-card__top">
                                <div className="mode-card__icon">{m.icon}</div>
                                <span className="mode-card__badge">{m.badge}</span>
                            </div>
                            <h3 className="mode-card__title">{m.title}</h3>
                            <p className="mode-card__desc">{m.desc}</p>
                            <div className="mode-card__earn">
                                <span className="mode-card__earn-label">Average earnings</span>
                                <span className="mode-card__earn-val">{m.earn}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Animated stats */}
                <div className="creator__stats" ref={statsRef}>
                    {stats.map((s, i) => (
                        <StatItem key={i} stat={s} animate={animateStats} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CreatorEconomy;
