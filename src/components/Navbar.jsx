import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { REGISTRATION_URL } from '../config/constants';
import ieteLogo from '../assets/iete_logo.svg';
import tcetLogo from '../assets/tcet_logo.svg';
import './Navbar.css';

const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'tracks', label: 'Tracks' },
    { id: 'prizes', label: 'Prizes' },
    { id: 'sponsors', label: 'Partners' },
    { id: 'team', label: 'Team' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50);

        // Active section detection using viewport percentage
        const sections = navLinks.map(l => document.getElementById(l.id));
        const scrollPos = latest + window.innerHeight * 0.4;

        for (let i = sections.length - 1; i >= 0; i--) {
            if (sections[i] && sections[i].offsetTop <= scrollPos) {
                setActiveSection(navLinks[i].id);
                break;
            }
        }
    });

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setMobileOpen(false);
    };

    return (
        <>
            <motion.nav
                className={`navbar ${scrolled ? 'navbar--floating' : ''}`}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="navbar__glass">
                    <div className="navbar__logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className="navbar__logo-icons">
                            <img src={ieteLogo} alt="IETE" className="navbar__org-logo" />
                        </div>
                        <div className="navbar__logo-text">
                            {"OSCILLATION".split('').map((char, i) => (
                                <motion.span
                                    key={i}
                                    animate={{
                                        y: [0, -5, 0],
                                        opacity: [0.7, 1, 0.7],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: i * 0.12
                                    }}
                                    style={{ display: 'inline-block' }}
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </div>
                    </div>

                    <div className="navbar__desktop">
                        <ul className="navbar__menu">
                            {navLinks.map((link) => (
                                <li key={link.id} onClick={() => scrollTo(link.id)}>
                                    <span className={`navbar__link-text ${activeSection === link.id ? 'active' : ''}`}>
                                        {link.label}
                                    </span>
                                    {activeSection === link.id && (
                                        <motion.div
                                            layoutId="nav-active"
                                            className="navbar__link-active-bg"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </li>
                            ))}
                        </ul>
                        <div className="navbar__right-actions">
                            <button className="navbar__register-btn btn-disabled" disabled>
                                Registration Closed
                            </button>

                            <div className="navbar__logo-icons navbar__logo-icons--right">
                                <img src={tcetLogo} alt="TCET" className="navbar__org-logo" />
                            </div>
                        </div>
                    </div>

                    <button className="navbar__mobile-toggle" onClick={() => setMobileOpen(true)} aria-label="Open navigation menu">
                        <HiMenuAlt4 />
                    </button>
                </div>
            </motion.nav>

            {/* Full Screen Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        className="mobile-menu"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="mobile-menu__overlay" onClick={() => setMobileOpen(false)} />

                        <motion.div
                            className="mobile-menu__content"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        >
                            <button className="mobile-menu__close" onClick={() => setMobileOpen(false)} aria-label="Close navigation menu">
                                <HiX />
                            </button>

                            <div className="mobile-menu__links">
                                {navLinks.map((link, i) => (
                                    <motion.button
                                        key={link.id}
                                        className="mobile-menu__link"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + (i * 0.05) }}
                                        onClick={() => scrollTo(link.id)}
                                    >
                                        {link.label}
                                    </motion.button>
                                ))}
                            </div>

                            <motion.button
                                className="btn-primary mobile-menu__cta btn-disabled"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                disabled
                            >
                                Registration Closed
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
