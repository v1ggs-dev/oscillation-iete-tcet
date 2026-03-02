import { motion } from 'framer-motion';
import { HiAcademicCap, HiCurrencyRupee, HiGlobeAlt, HiUserGroup, HiLightningBolt, HiPuzzle } from 'react-icons/hi';
import TiltCard from './TiltCard';
import './Benefits.css';

const benefits = [
    { icon: <HiAcademicCap />, title: 'Certificates', desc: 'Official certificates for all participants and winners' },
    { icon: <HiCurrencyRupee />, title: 'Prizes', desc: 'Cash prizes, trophies, and exciting special awards' },
    { icon: <HiGlobeAlt />, title: 'Industry Exposure', desc: 'Gain visibility in the tech community and industry' },
    { icon: <HiUserGroup />, title: 'Networking', desc: 'Connect with peers, mentors, and tech enthusiasts' },
    { icon: <HiLightningBolt />, title: 'Skill Building', desc: 'Learn, build, and push your technical boundaries' },
    { icon: <HiPuzzle />, title: 'Real Problems', desc: 'Work on real-world problem statements and domains' },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Benefits() {
    return (
        <section className="section benefits" id="benefits">
            <div className="container">
                <motion.div
                    className="benefits__header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">Why Participate</span>
                    <h2 className="section-title">
                        Why You Should <span className="gradient-text">Join</span>
                    </h2>
                    <p className="section-subtitle">
                        Beyond competition — gain skills, connections, and experiences that shape your career.
                    </p>
                </motion.div>

                <motion.div
                    className="benefits__grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                >
                    {benefits.map((b, i) => (
                        <motion.div key={i} variants={cardVariants}>
                            <TiltCard className="benefits__card glass-card" tiltStrength={10}>
                                <div className="benefits__card-icon">{b.icon}</div>
                                <h3 className="benefits__card-title">{b.title}</h3>
                                <p className="benefits__card-desc">{b.desc}</p>
                            </TiltCard>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
