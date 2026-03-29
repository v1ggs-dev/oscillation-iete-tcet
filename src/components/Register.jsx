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
                        Registration <span className="gradient-text">Closed!</span>
                    </h2>
                    <p className="register__desc">
                        Thank you to the overwhelming number of innovators who signed up for Oscillation 3.0! The screening rounds are officially underway. We look forward to witnessing your incredible pitches and prototypes on April 4th.
                    </p>

                    <div className="register__actions">
                        <button disabled className="btn-primary register__btn btn-disabled" style={{ cursor: 'default' }}>
                            Thank You For Registering
                        </button>
                    </div>

                    <div className="register__info">
                        <span className="register__info-item"><HiCalendar /> Grand Finale: 4th April 2026</span>
                        <span className="register__info-divider">•</span>
                        <span className="register__info-item"><FaBullseye /> TCET Mumbai</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
