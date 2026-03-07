import { motion } from 'framer-motion';
import { HiArrowRight, HiCalendar } from 'react-icons/hi';
import { FaBullseye } from 'react-icons/fa';
import { REGISTRATION_URL } from '../config/constants';
import './Register.css';

export default function Register() {
    return (
        <section className="section register" id="register">
            <div className="container">
                <motion.div
                    className="register__content"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="register__glow register__glow--1" />
                    <div className="register__glow register__glow--2" />

                    <h2 className="register__title">
                        Ready to <span className="gradient-text">Innovate?</span>
                    </h2>
                    <p className="register__desc">
                        Join hundreds of innovators at Oscillation 3.0. Pick your track, build your team, and create something extraordinary.
                    </p>

                    <div className="register__actions">
                        <a href={REGISTRATION_URL} target="_blank" rel="noopener noreferrer" className="btn-primary register__btn">
                            Register Now <HiArrowRight />
                        </a>
                    </div>

                    <div className="register__info">
                        <span className="register__info-item"><HiCalendar /> Deadline: 28th March 2026</span>
                        <span className="register__info-divider">•</span>
                        <span className="register__info-item"><FaBullseye /> Limited spots available</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
