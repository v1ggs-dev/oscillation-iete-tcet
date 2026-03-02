import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionTemplate, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { HiX, HiStar, HiUserGroup } from 'react-icons/hi';
import { FaTrophy, FaCubes, FaBullseye, FaArrowRight, FaAward, FaDownload } from 'react-icons/fa';
import { ideathonTrack, projectPresentationTrack } from '../data/tracks';
import { REGISTRATION_URL } from '../config/constants';
import MagneticButton from './MagneticButton';
import pitchDeckTemplate from '../assets/Oscillation Pitchdeck Template.pptx';
import './Tracks.css';
/* ── Track Card ── */
function TrackCard({ track, type, onClick, isBlue }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const normalX = useMotionValue(0.5);
    const normalY = useMotionValue(0.5);

    const rotateX = useSpring(useTransform(normalY, [0, 1], [8, -8]), { stiffness: 200, damping: 20 });
    const rotateY = useSpring(useTransform(normalX, [0, 1], [-8, 8]), { stiffness: 200, damping: 20 });

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
        normalX.set((clientX - left) / width);
        normalY.set((clientY - top) / height);
    }

    function handleMouseLeave() {
        normalX.set(0.5);
        normalY.set(0.5);
    }

    const scrollToRegister = (e) => {
        e.stopPropagation();
        window.open(REGISTRATION_URL, "_blank");
    };

    return (
        <motion.div
            className={`tracks__card glass-card ${isBlue ? 'tracks__card--blue' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover={{ scale: 1.02 }}
            style={{
                rotateX,
                rotateY,
                transformPerspective: 800,
                transformStyle: 'preserve-3d',
            }}
        >
            <motion.div
                className="tracks__card-spotlight"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                          650px circle at ${mouseX}px ${mouseY}px,
                          ${isBlue ? 'rgba(6, 182, 212, 0.15)' : 'rgba(168, 85, 247, 0.15)'},
                          transparent 80%
                        )
                    `,
                }}
            />

            <div className={`tracks__card-glow ${isBlue ? 'tracks__card-glow--blue' : 'tracks__card-glow--purple'}`} />

            <div className="tracks__card-icon-wrapper">
                {track.icon}
            </div>

            <h3 className="tracks__card-title">{track.title}</h3>
            <p className="tracks__card-subtitle">{track.subtitle}</p>
            <p className="tracks__card-desc">{track.description}</p>

            <div className="tracks__card-divider" />

            <div className="tracks__card-highlights">
                {type === 'ideathon' ? (
                    <>
                        <div className="tracks__card-highlight">
                            <FaTrophy className="highlight-icon" /> Trophy + Certs
                        </div>
                        <div className="tracks__card-highlight">
                            <HiUserGroup className="highlight-icon" /> 1–4 Members
                        </div>
                    </>
                ) : (
                    <>
                        <div className="tracks__card-highlight">
                            <HiStar className="highlight-icon" /> Prizes Worth ₹7.8k
                        </div>
                        <div className="tracks__card-highlight">
                            <HiUserGroup className="highlight-icon" /> 1–4 Members
                        </div>
                    </>
                )}
            </div>

            <div className="tracks__card-actions">
                <MagneticButton>
                    <button
                        className={`btn-primary tracks__card-btn ${isBlue ? 'btn-blue' : ''}`}
                        onClick={scrollToRegister}
                    >
                        Register Now <FaArrowRight />
                    </button>
                </MagneticButton>
                <button className="tracks__card-link">
                    View Details
                </button>
            </div>
        </motion.div>
    );
}

/* ── Track Detail Page — Full-Screen, Clean Layout ── */
function TrackModal({ track, type, onClose }) {
    const isIdeathon = type === 'ideathon';

    const scrollToRegister = () => {
        onClose();
        window.open(REGISTRATION_URL, "_blank");
    };

    const stats = isIdeathon ? [
        { label: 'Prize', value: track.details.winner },
        { label: 'Team Size', value: track.details.teamSize },
        { label: 'Pitch Duration', value: track.details.duration },
        { label: 'Q&A', value: track.details.qa },
        { label: 'Format', value: track.details.format },
        { label: 'Submission', value: track.details.submission },
        { label: 'Language', value: track.details.language },
    ] : [
        { label: 'Prizes', value: track.details.prizePool },
        { label: 'Team Size', value: track.details.teamSize },
        { label: 'Presentation Time', value: track.details.duration },
        { label: 'Demo Requirement', value: track.details.demo },
        { label: 'Submission', value: track.details.submission },
    ];

    return (
        <motion.div
            className="track-page__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="track-page"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
            >
                {/* Top bar */}
                <div className="track-page__topbar">
                    <button className="track-page__back" onClick={onClose} aria-label="Close details">
                        <HiX /> Close
                    </button>
                    <button
                        className="btn-primary track-page__register"
                        onClick={scrollToRegister}
                    >
                        Register Now <FaArrowRight />
                    </button>
                </div>

                {/* Content */}
                <div className="track-page__content">
                    {/* Header */}
                    <div className="track-page__header">
                        <span className="track-page__icon">{track.icon}</span>
                        <h2 className="track-page__title">{track.title}</h2>
                        <p className="track-page__subtitle">{track.subtitle}</p>
                        <p className="track-page__desc">{track.description}</p>
                    </div>

                    {/* Details Grid */}
                    <div className="track-page__details">
                        <h3 className="track-page__section-title">Details</h3>
                        <div className="track-page__details-grid">
                            {stats.map((stat, i) => (
                                <div key={i} className="track-page__detail">
                                    <span className="track-page__detail-label">{stat.label}</span>
                                    <span className="track-page__detail-value">{stat.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Themes / Sub-Tracks */}
                    <div className="track-page__section">
                        <h3 className="track-page__section-title">
                            {isIdeathon ? <><FaBullseye /> Themes</> : <><FaCubes /> Sub-Tracks</>}
                        </h3>
                        <div className="track-page__items">
                            {(isIdeathon ? track.themes : track.subtracks).map((item, i) => (
                                <div key={i} className="track-page__item">
                                    <span className="track-page__item-icon">{item.icon}</span>
                                    <div>
                                        <strong>{item.name}</strong>
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pitch Deck Template — Ideathon only */}
                    {isIdeathon && (
                        <div className="track-page__section">
                            <h3 className="track-page__section-title">
                                <FaDownload /> Pitch Deck Template
                            </h3>
                            <p className="track-page__template-desc">
                                Download the official pitch deck template. All teams must follow this format for their submissions.
                            </p>
                            <a
                                href={pitchDeckTemplate}
                                download="Oscillation Pitchdeck Template.pptx"
                                className="track-page__download-btn"
                                aria-label="Download pitch deck template"
                            >
                                <FaDownload /> Download Template (.pptx)
                            </a>
                        </div>
                    )}

                    {/* Special Awards — Project Presentation only */}
                    {!isIdeathon && track.specialAwards && (
                        <div className="track-page__section">
                            <h3 className="track-page__section-title">
                                <FaAward /> Special Awards
                            </h3>
                            <div className="track-page__awards">
                                {track.specialAwards.map((award, i) => (
                                    <div key={i} className="track-page__award">
                                        <span className="track-page__award-icon">{award.icon}</span>
                                        <span>{award.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function Tracks() {
    const [activeModal, setActiveModal] = useState(null);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (activeModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [activeModal]);

    return (
        <section className="section tracks" id="tracks">
            <div className="container">
                <motion.div
                    className="tracks__header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">Tracks</span>
                    <h2 className="section-title">
                        Choose Your <span className="gradient-text">Arena</span>
                    </h2>
                    <p className="section-subtitle">
                        Oscillation features two distinct tracks designed to test your innovation vs implementation skills.
                    </p>
                </motion.div>

                <div className="tracks__grid">
                    <TrackCard
                        track={ideathonTrack}
                        type="ideathon"
                        onClick={() => setActiveModal('ideathon')}
                    />
                    <TrackCard
                        track={projectPresentationTrack}
                        type="hardware"
                        onClick={() => setActiveModal('hardware')}
                        isBlue
                    />
                </div>
            </div>

            <AnimatePresence>
                {activeModal === 'ideathon' && (
                    <TrackModal track={ideathonTrack} type="ideathon" onClose={() => setActiveModal(null)} />
                )}
                {activeModal === 'hardware' && (
                    <TrackModal track={projectPresentationTrack} type="hardware" onClose={() => setActiveModal(null)} />
                )}
            </AnimatePresence>
        </section>
    );
}
