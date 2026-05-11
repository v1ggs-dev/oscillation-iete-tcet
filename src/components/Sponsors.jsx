import { motion } from 'framer-motion';
import unstopLogo from '../assets/unstop/white/Unstop-Logo-White.svg';
import osenLogo from '../assets/sponsors/osen.jpg';
import levelUpLogo from '../assets/sponsors/level-up.png';
import vercelLogo from '../assets/sponsors/vercel.png';
import './Sponsors.css';

export default function Sponsors() {
    return (
        <section className="section sponsors" id="sponsors">
            <div className="container">
                <motion.div
                    className="sponsors__header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">Partners</span>
                    <h2 className="section-title">
                        Our <span className="gradient-text">Sponsors</span>
                    </h2>
                </motion.div>

                <motion.div
                    className="sponsors__content glass-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="sponsors__grid">
                        <a
                            href="https://unstop.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="sponsors__logo-container"
                        >
                            <span className="sponsors__logo-label">Powered By</span>
                            <img
                                src={unstopLogo}
                                alt="Unstop"
                                className="sponsors__logo"
                            />
                        </a>
                        <div className="sponsors__logo-container">
                            <img src={osenLogo} alt="OSEN" className="sponsors__logo" style={{ borderRadius: '12px' }} />
                        </div>
                        <div className="sponsors__logo-container">
                            <img src={levelUpLogo} alt="Level Up" className="sponsors__logo" />
                        </div>
                        <div className="sponsors__logo-container">
                            <img src={vercelLogo} alt="Vercel" className="sponsors__logo" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
