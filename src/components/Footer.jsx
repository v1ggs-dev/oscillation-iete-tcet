import { HiPhone, HiMail } from 'react-icons/hi';
import ieteLogo from '../assets/iete_logo.svg';
import tcetLogo from '../assets/tcet_logo.svg';
import './Footer.css';

const quickLinks = [
    { label: 'About', href: '#about' },
    { label: 'Tracks', href: '#tracks' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Prizes', href: '#prizes' },
    { label: 'Guidelines', href: '#guidelines' },
    { label: 'FAQ', href: '#faq' },
];

export default function Footer() {
    const scrollTo = (e, id) => {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__grid">
                    {/* Brand */}
                    <div className="footer__brand">
                        <div className="footer__logo">
                            <div className="footer__logo-icons">
                                <img src={ieteLogo} alt="IETE" className="footer__org-logo" />
                                <span className="footer__logo-divider" />
                                <img src={tcetLogo} alt="TCET" className="footer__org-logo" />
                            </div>
                            <span className="footer__logo-text">Oscillation 3.0</span>
                        </div>
                        <p className="footer__tagline">
                            A premier hackathon by <strong className="footer__tagline-highlight">IETE Students' Forum</strong> at <strong className="footer__tagline-highlight">Thakur College of Engineering & Technology</strong>, Mumbai.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="footer__section">
                        <h4 className="footer__section-title">Quick Links</h4>
                        <ul className="footer__links">
                            {quickLinks.map((link, i) => (
                                <li key={i}>
                                    <a href={link.href} onClick={(e) => scrollTo(e, link.href.replace('#', ''))}>
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer__section">
                        <h4 className="footer__section-title">Contact</h4>
                        <div className="footer__contacts">
                            <div className="footer__contact">
                                <HiPhone />
                                <div>
                                    <span>Sneha Dubey</span>
                                    <a href="tel:+919004298127">+91 9004298127</a>
                                </div>
                            </div>
                            <div className="footer__contact">
                                <HiPhone />
                                <div>
                                    <span>Saurabh Singh</span>
                                    <a href="tel:+919004254727">+91 9004254727</a>
                                </div>
                            </div>
                            <div className="footer__contact">
                                <HiPhone />
                                <div>
                                    <span>Srishti Srivastava</span>
                                    <a href="tel:+919082414734">+91 90824 14734</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer__bottom">
                    <div className="footer__bottom-content">


                        <div className="footer__credits">
                            <p>© 2026 Oscillation 3.0 — IETE Students' Forum, TCET Mumbai. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
