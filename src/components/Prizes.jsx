import { motion } from 'framer-motion';
import { HiLightBulb } from 'react-icons/hi';
import { FaBullseye, FaTrophy, FaMedal, FaAward, FaCertificate } from 'react-icons/fa';
import { projectPresentationTrack } from '../data/tracks';
import TiltCard from './TiltCard';
import './Prizes.css';

const podiumPlaces = [
    { place: '1st', label: 'Winner', icon: <FaTrophy />, className: 'prizes__place--gold' },
    { place: '2nd', label: 'Runner Up', icon: <FaMedal />, className: 'prizes__place--silver' },
    { place: '3rd', label: 'Second Runner Up', icon: <FaAward />, className: 'prizes__place--bronze' },
];

export default function Prizes() {
    return (
        <section className="section prizes" id="prizes">
            <div className="container">
                <motion.div
                    className="prizes__header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">Prizes</span>
                    <h2 className="section-title">
                        Prizes & <span className="gradient-text">Awards</span>
                    </h2>
                </motion.div>

                {/* Prize Pool Showcase */}
                <motion.div
                    className="prizes__pool glass-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="prizes__pool-glow" />
                    <span className="prizes__pool-label">Project Presentation Track</span>
                    <div className="prizes__pool-amount">
                        <span className="prizes__pool-value gradient-text">₹7.8K</span>
                    </div>
                    <p className="prizes__pool-subtitle">Prizes Worth</p>
                </motion.div>

                {/* Podium Places */}
                <div className="prizes__podium">
                    {podiumPlaces.map((place, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.12 }}
                        >
                            <TiltCard className={`prizes__place glass-card ${place.className}`} tiltStrength={12}>
                                <span className="prizes__place-icon">{place.icon}</span>
                                <span className="prizes__place-rank">{place.place}</span>
                                <h4 className="prizes__place-label">{place.label}</h4>
                            </TiltCard>
                        </motion.div>
                    ))}
                </div>

                {/* Special Awards */}
                <motion.div
                    className="prizes__awards-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="prizes__awards-track-badge">Project Presentation Track</span>
                    <h3 className="prizes__awards-title"><FaBullseye className="prizes__awards-title-icon" /> Special Awards</h3>
                    <p className="prizes__awards-desc">Recognizing excellence beyond the podium — exclusive to the Project Presentation track</p>
                </motion.div>

                <div className="prizes__awards-grid">
                    {projectPresentationTrack.specialAwards.map((award, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <TiltCard className="prizes__award-card glass-card" tiltStrength={15}>
                                <span className="prizes__award-icon">{award.icon}</span>
                                <h4 className="prizes__award-name">{award.name}</h4>
                            </TiltCard>
                        </motion.div>
                    ))}
                </div>

                {/* Ideathon Prize */}
                <motion.div
                    className="prizes__ideathon glass-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="prizes__ideathon-content">
                        <span className="prizes__ideathon-icon"><HiLightBulb /></span>
                        <div>
                            <h4>Ideathon Track</h4>
                            <p>Winner receives a Trophy + Certificates for all participants</p>
                        </div>
                    </div>
                </motion.div>

                {/* Certificates for All */}
                <motion.div
                    className="prizes__certificates glass-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="prizes__certificates-content">
                        <span className="prizes__certificates-icon"><FaCertificate /></span>
                        <div>
                            <h4>Participation Certificates</h4>
                            <p>Every participant receives an official certificate of participation</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
