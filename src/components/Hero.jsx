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

/* ── Flip Countdown Timer ── */
function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const eventDate = new Date('2026-04-04T09:00:00+05:30').getTime();

        const updateTimer = () => {
            const now = new Date().getTime();
            const diff = eventDate - now;

            if (diff > 0) {
                setTimeLeft({
                    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((diff % (1000 * 60)) / 1000),
                });
            }
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="hero__countdown">
            {Object.entries(timeLeft).map(([label, value]) => {
                const str = String(value).padStart(2, '0');
                return (
                    <div key={label} className="hero__countdown-item">
                        <div className="hero__countdown-box glass-card">
                            <span className="hero__countdown-value">
                                {str.split('').map((d, i) => (
                                    <FlipDigit key={`${label}-${i}`} digit={d} />
                                ))}
                            </span>
                        </div>
                        <span className="hero__countdown-label">{label.toUpperCase()}</span>
                    </div>
                );
            })}
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

            <div className="hero__content container">
                <motion.div
                    className="hero__main"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
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
                        <button className="btn-primary" onClick={() => window.open(REGISTRATION_URL, '_blank')}>
                            Register Now <HiArrowRight />
                        </button>
                        <button className="btn-secondary" onClick={() => scrollTo('tracks')}>
                            View Tracks
                        </button>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="hero__visual"
                    style={{ y: y2 }}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <CountdownTimer />

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
