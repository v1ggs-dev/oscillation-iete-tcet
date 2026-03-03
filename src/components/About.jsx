import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HiLightningBolt, HiUserGroup, HiAcademicCap } from 'react-icons/hi';
import { FaLinkedinIn, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import TiltCard from './TiltCard';
import useIsMobile from '../hooks/useIsMobile';
import { SOCIALS } from '../config/constants';
import ieteLogo from '../assets/iete_logo.svg';
import tcetLogo from '../assets/tcet_logo.svg';
import './About.css';

const cards = [
    {
        icon: <HiLightningBolt />,
        title: 'Innovation Focus',
        description: 'Push boundaries with cutting-edge technology. Solve real-world problems with creative solutions that matter.',
    },
    {
        icon: <HiUserGroup />,
        title: 'Networking',
        description: 'Connect with like-minded innovators, industry mentors, and tech enthusiasts. Build relationships that last.',
    },
    {
        icon: <HiAcademicCap />,
        title: 'Competition',
        description: 'Compete for prizes, trophies, and recognition. Showcase your skills in front of expert judges.',
    },
];

const stats = [
    { value: 2, label: 'Tracks', prefix: '', suffix: '' },
    { value: 7.8, label: 'Prizes Worth', prefix: '₹', suffix: 'k' },
    { value: 4, label: 'Special Awards', prefix: '', suffix: '+' },
    { value: 10, label: 'Themes', prefix: '', suffix: '+' },
];

function AnimatedCounter({ value, prefix, suffix, duration = 2000 }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    const startTime = performance.now();
                    const isFloat = !Number.isInteger(value);

                    const animate = (now) => {
                        const elapsed = now - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        // Ease out cubic
                        const eased = 1 - Math.pow(1 - progress, 3);
                        const current = eased * value;
                        setCount(isFloat ? parseFloat(current.toFixed(1)) : Math.floor(current));
                        if (progress < 1) requestAnimationFrame(animate);
                    };

                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [value, duration]);

    return (
        <span ref={ref} className="about__stat-value gradient-text">
            {prefix}{count}{suffix}
        </span>
    );
}

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.15 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function About() {
    const isMobile = useIsMobile();
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });
    const cardY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [60, -60]);
    const statsY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [40, -40]);

    return (
        <section className="section about" id="about" ref={sectionRef}>
            <div className="container">
                <motion.div
                    className="about__header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">About</span>
                    <h2 className="section-title">
                        What is <span className="gradient-text">Oscillation?</span>
                    </h2>
                    <p className="section-subtitle">
                        Oscillation is a prestigious technical project competition organized by the IETE Students' Forum at Thakur College of Engineering & Technology (TCET) and conducted consistently over the past three to four years. The event provides a dynamic platform for students from TCET and other institutions to present innovative, domain-based projects before expert judges. Led by the Electronics and Computer Science (ECS) Department, Oscillation promotes technical excellence, creativity, and professional confidence while enabling students to effectively showcase their ideas and represent their institution.
                    </p>

                    <motion.div
                        className="about__organizers"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <span className="about__organizers-label">Proudly Organized By</span>
                        <div className="about__organizers-logos">
                            <div className="about__org">
                                <img src={ieteLogo} alt="IETE" className="about__org-logo" />
                                <span className="about__org-name">IETE Students' Forum</span>
                            </div>
                            <span className="about__org-divider">|</span>
                            <div className="about__org">
                                <img src={tcetLogo} alt="TCET" className="about__org-logo" />
                                <span className="about__org-name">TCET Mumbai</span>
                            </div>
                        </div>

                        <div className="about__socials">
                            <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" className="about__social-link" aria-label="LinkedIn">
                                <FaLinkedinIn />
                            </a>
                            <a href={SOCIALS.instagram} target="_blank" rel="noopener noreferrer" className="about__social-link" aria-label="Instagram">
                                <FaInstagram />
                            </a>
                            <a href={SOCIALS.whatsapp} target="_blank" rel="noopener noreferrer" className="about__social-link about__social-link--wa" aria-label="WhatsApp">
                                <FaWhatsapp />
                            </a>
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="about__cards"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    style={{ y: cardY }}
                >
                    {cards.map((card, i) => (
                        <motion.div key={i} variants={cardVariants}>
                            <TiltCard className="about__card glass-card" tiltStrength={8}>
                                <div className="about__card-icon">{card.icon}</div>
                                <h3 className="about__card-title">{card.title}</h3>
                                <p className="about__card-desc">{card.description}</p>
                            </TiltCard>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    className="about__stats"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    style={{ y: statsY }}
                >
                    {stats.map((stat, i) => (
                        <div key={i} style={{ display: 'contents' }}>
                            {i > 0 && <div className="about__stat-divider" />}
                            <div className="about__stat">
                                <AnimatedCounter
                                    value={stat.value}
                                    prefix={stat.prefix}
                                    suffix={stat.suffix}
                                />
                                <span className="about__stat-label">{stat.label}</span>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
