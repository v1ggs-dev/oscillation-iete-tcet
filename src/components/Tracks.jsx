import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useMotionTemplate, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { HiX, HiStar, HiUserGroup } from 'react-icons/hi';
import { FaTrophy, FaCubes, FaBullseye, FaArrowRight, FaAward, FaDownload, FaCode } from 'react-icons/fa';
import { ideathonTrack, projectPresentationTrack } from '../data/tracks';
import { ideathonFinalists, projectPresentationFinalists } from '../data/results';
import { REGISTRATION_URL } from '../config/constants';
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
            <div style={{ display: 'inline-block', background: 'rgba(34, 197, 94, 0.15)', color: '#86efac', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold', margin: '4px 0 12px 0', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
                Round 1 Finalists Announced!
            </div>
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
                <button className="tracks__card-link">
                    View Results
                </button>
            </div>
        </motion.div>
    );
}

/* ── Track Detail Page — Full-Screen, Clean Layout ── */
function TrackModal({ track, type, onClose }) {
    const isIdeathon = type === 'ideathon';

    // Close on browser back button / swipe-back gesture
    useEffect(() => {
        window.history.pushState({ modal: true }, '');
        const handlePopState = () => onClose();
        window.addEventListener('popstate', handlePopState);
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [onClose]);

    // Close on Escape key
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onClose]);

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
                </div>

                {/* Content */}
                <div className="track-page__content">
                    {/* Header */}
                    <div className="track-page__header">
                        <span className="track-page__icon">{track.icon}</span>
                        <h2 className="track-page__title">{track.title}</h2>
                        <p className="track-page__subtitle">{track.subtitle}</p>
                        <div style={{ display: 'inline-block', background: 'rgba(34, 197, 94, 0.15)', color: '#86efac', padding: '6px 14px', borderRadius: '16px', fontSize: '0.9rem', fontWeight: 'bold', margin: '8px 0 16px 0', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
                            🎉 Round 1 Finalists Announced!
                        </div>
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

                    {/* Selected Teams Section */}
                    <div className="track-page__section">
                        <h3 className="track-page__section-title" style={{ color: 'var(--green-400)' }}>
                            <FaAward /> Round 1 Finalists
                        </h3>
                        <p className="track-page__template-desc" style={{ marginBottom: '1.5rem' }}>
                            Congratulations to the teams advancing to the Grand Finale! Search for your team below.
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: '12px' }}>
                            {(isIdeathon ? ideathonFinalists : projectPresentationFinalists).map((team, i) => (
                                <div key={i} style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '500', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s', cursor: 'default' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(-2px)' }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.transform = 'translateY(0)' }}>
                                    <HiStar style={{ color: 'var(--yellow-400)', flexShrink: 0, fontSize: '1.1rem' }} />
                                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{team}</span>
                                </div>
                            ))}
                        </div>
                    </div>

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

                {/* Sticky bottom close bar */}
                <div className="track-page__bottom-bar">
                    <button className="track-page__bottom-close" onClick={onClose}>
                        <HiX /> Close Details
                    </button>
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
        <>
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
            </section>

            {createPortal(
                <AnimatePresence>
                    {activeModal === 'ideathon' && (
                        <TrackModal track={ideathonTrack} type="ideathon" onClose={() => setActiveModal(null)} />
                    )}
                    {activeModal === 'hardware' && (
                        <TrackModal track={projectPresentationTrack} type="hardware" onClose={() => setActiveModal(null)} />
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
}
