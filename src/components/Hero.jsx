import { useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { HiArrowRight, HiCalendar, HiLocationMarker, HiLightBulb } from 'react-icons/hi';
import { REGISTRATION_URL } from '../config/constants';
import useIsMobile from '../hooks/useIsMobile';
import './Hero.css';

const typewriterPhrases = ['Build the Future', 'Innovate & Create', 'Win Big'];

/* ── Text Split Animation ── */
function SplitText({ text, className = '', delay = 0, isMobile = false }) {
    return (
        <span className={className} aria-label={text}>
            {text.split('').map((char, i) => (
                <motion.span
                    key={i}
                    className="split-char"
                    initial={{ opacity: 0, y: 40, ...(isMobile ? {} : { filter: 'blur(8px)' }) }}
                    animate={{ opacity: 1, y: 0, ...(isMobile ? {} : { filter: 'blur(0px)' }) }}
                    transition={{
                        duration: 0.5,
                        delay: delay + i * 0.04,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </span>
    );
}

/* ── Typewriter ── */
function TypewriterText() {
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    const tick = useCallback(() => {
        const currentPhrase = typewriterPhrases[phraseIndex];

        if (!isDeleting) {
            setCharIndex((prev) => prev + 1);
            if (charIndex + 1 >= currentPhrase.length) {
                setTimeout(() => setIsDeleting(true), 1500);
                return;
            }
        } else {
            setCharIndex((prev) => prev - 1);
            if (charIndex - 1 <= 0) {
                setIsDeleting(false);
                setPhraseIndex((prev) => (prev + 1) % typewriterPhrases.length);
                return;
            }
        }
    }, [charIndex, isDeleting, phraseIndex]);

    useEffect(() => {
        const speed = isDeleting ? 40 : 80;
        const timer = setTimeout(tick, speed);
        return () => clearTimeout(timer);
    }, [tick, isDeleting]);

    return (
        <span className="hero__typewriter">
            {typewriterPhrases[phraseIndex].substring(0, charIndex)}
            <span className="hero__typewriter-cursor">|</span>
        </span>
    );
}

/* ── Flip Digit ── */
function FlipDigit({ digit }) {
    return (
        <span className="flip-digit">
            <AnimatePresence mode="popLayout">
                <motion.span
                    key={digit}
                    className="flip-digit__inner"
                    initial={{ rotateX: -90, opacity: 0 }}
                    animate={{ rotateX: 0, opacity: 1 }}
                    exit={{ rotateX: 90, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                    {digit}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}

/* ── Animated Counter ── */
function AnimatedCounter({ from, to }) {
    const [count, setCount] = useState(from);

    useEffect(() => {
        let startTime;
        const duration = 2500;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            
            const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
            const currentCount = Math.floor(easeOutQuart * (to - from) + from);
            
            setCount(currentCount);

            if (percentage < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }, [from, to]);

    return <span>{count}</span>;
}

/* ── Final Statistics ── */
function FinalStatistics() {
    const stats = [
        { label: 'Participants', value: 500, suffix: '+' },
        { label: 'Prototypes', value: 65, suffix: '+' }
    ];

    return (
        <div className="hero__countdown" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', width: '100%' }}>
            {stats.map((stat, idx) => (
                <motion.div 
                    key={idx} 
                    className="hero__countdown-item" 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + (idx * 0.1), duration: 0.5 }}
                >
                    <div className="hero__countdown-box glass-card" style={{ padding: '1.5rem 1rem', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                        <span className="hero__countdown-value" style={{ fontSize: '2.2rem', color: 'var(--blue-400)', textShadow: '0 0 15px rgba(96, 165, 250, 0.4)', fontWeight: 'bold', lineHeight: '1.1' }}>
                            <AnimatedCounter from={0} to={stat.value} />{stat.suffix}
                        </span>
                        <span className="hero__countdown-label" style={{ marginTop: '0.5rem', fontSize: '0.75rem', letterSpacing: '1.5px', color: '#e2e8f0', fontWeight: '600' }}>
                            {stat.label.toUpperCase()}
                        </span>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

/* ── WOW Element: Oscillation Rings ── */
function OscillationRings() {
    return (
        <div className="oscillation-rings-container">
            {[1, 2, 3].map((ring) => (
                <motion.div
                    key={ring}
                    className="oscillation-ring"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ 
                        scale: [1, 1.5, 2],
                        opacity: [0, 0.4, 0],
                        borderWidth: ["2px", "8px", "2px"],
                        boxShadow: [
                            "0 0 0px var(--primary-glow), inset 0 0 0px var(--secondary-glow)",
                            "0 0 40px var(--primary-glow), inset 0 0 40px var(--secondary-glow)",
                            "0 0 0px var(--primary-glow), inset 0 0 0px var(--secondary-glow)"
                        ]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        delay: ring * 2,
                        ease: "easeInOut"
                    }}
                    style={{
                        width: `${ring * 180}px`,
                        height: `${ring * 180}px`,
                        borderColor: ring % 2 === 0 ? "var(--primary-400)" : "var(--secondary-400)",
                        filter: "blur(4px)"
                    }}
                />
            ))}
        </div>
    );
}

/* ── Hero ── */
export default function Hero() {
    const isMobile = useIsMobile();
    const { scrollY } = useScroll();
    const y2 = useTransform(scrollY, [0, 500], [0, isMobile ? 0 : -150]);

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="hero" id="hero">
            {/* Background Effects */}
            <div className="hero__bg-orb hero__bg-orb--1" />
            <div className="hero__bg-orb hero__bg-orb--2" />

            <div className="hero__grid-overlay" />
            <OscillationRings />

            <div className="hero__content container">
                <motion.div
                    className="hero__main"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{ marginTop: isMobile ? '0' : '-40px' }}
                >
                    {/* Global Notice Banner */}
                    <div style={{ display: 'flex', justifyContent: isMobile ? 'center' : 'flex-start', marginBottom: '32px' }}>
                        <div style={{ background: 'rgba(6, 182, 212, 0.10)', WebkitBackdropFilter: 'blur(10px)', backdropFilter: 'blur(10px)', border: '1px solid rgba(6, 182, 212, 0.2)', padding: '10px 20px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', flexWrap: 'wrap', justifyContent: 'center', textAlign: 'center' }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--blue-400)', boxShadow: '0 0 10px var(--blue-400)' }}></span>
                            <span style={{ fontSize: '0.85rem', color: '#e2e8f0', fontWeight: '500', letterSpacing: '0.5px' }}>Oscillation 3.0 has successfully concluded. Thank you to all participants.</span>
                        </div>
                    </div>
                    <h1 className="hero__title">
                        <span className="hero__title-row">
                            <SplitText text="OSCILLATION" className="hero__title-line" delay={0.3} isMobile={isMobile} />
                            <span className="hero__title-sub">
                                <SplitText text="3.0" className="gradient-text hero__title-version" delay={0.8} isMobile={isMobile} />
                            </span>
                        </span>
                        <motion.div
                            className="hero__year-wrapper"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.1, duration: 0.5 }}
                        >
                            <span className="hero__year">2026</span>
                        </motion.div>
                    </h1>

                    <motion.p
                        className="hero__description"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.6 }}
                    >
                        Where innovation meets execution. <TypewriterText />
                    </motion.p>

                    <motion.div
                        className="hero__actions"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.4, duration: 0.6 }}
                    >
                        <button className="btn-primary btn-blue" onClick={() => scrollTo('tracks')}>
                            Explore Tracks
                        </button>
                    </motion.div>
                </motion.div>

                <div className="hero__divider" />

                <motion.div
                    className="hero__visual"
                    style={{ y: y2 }}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <FinalStatistics />

                    <div className="hero__stat-card glass-card">
                        <div className="hero__stat-icon"><HiCalendar /></div>
                        <div className="hero__stat-text" style={{ justifyContent: 'center' }}>
                            <strong>April 4th, 2026</strong>
                        </div>
                    </div>

                    <div className="hero__stat-card glass-card">
                        <div className="hero__stat-icon"><HiLocationMarker /></div>
                        <div className="hero__stat-text">
                            <strong>TCET Mumbai</strong>
                            <span>Offline Mode</span>
                        </div>
                    </div>

                    <div className="hero__stat-card glass-card">
                        <div className="hero__stat-icon"><HiLightBulb /></div>
                        <div className="hero__stat-text">
                            <strong>10+ Themes</strong>
                            <span>Multiple Domains</span>
                        </div>
                    </div>
                </motion.div>
            </div>


        </section>
    );
}
