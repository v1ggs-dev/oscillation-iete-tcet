import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedinIn, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { SOCIALS } from '../config/constants';
import './Team.css';
import ieteLogo from '../assets/iete_logo.svg';

import imgChairperson from '../assets/img_Chairperson.png';
import imgViceChairperson from '../assets/img_Vice-Chairperson.png';
import imgSecretary from '../assets/img_Secretary.png';
import imgTreasurer from '../assets/img_treasurer.png';
import imgSponsorshipHead from '../assets/img_Sponsorship Head.png';
import imgEventManager from '../assets/img_Event Manager.png';
import imgTechnicalLead from '../assets/img_Technical Lead.png';
import imgOutreachCoordinator from '../assets/img_Outreach Coordinator.png';

import imgWcSponsorship1 from '../assets/img_wc_sponsorship1.png';
import imgWcSponsorship2 from '../assets/img_wc_sponsorship2.webp';
import imgWcSponsorship3 from '../assets/img_wc_sponsorship3.webp';
import imgWcSponsorship4 from '../assets/img_wc_sponsorship4.webp';

import imgWcCreative1 from '../assets/img_wc_creative1.png';
import imgWcCreative2 from '../assets/img_wc_creative2.webp';
import imgWcCreative3 from '../assets/img_wc_creative3.png';
import imgWcCreative4 from '../assets/img_wc_creative4.png';
import imgWcCreative5 from '../assets/img_wc_creative5.png';
import imgWcCreative6 from '../assets/img_wc_creative6.png';

const coreTeam = [
    {
        name: 'Sneha Dubey',
        role: 'Chairperson',
        image: imgChairperson,
        linkedin: 'https://www.linkedin.com/in/sneha-dubey-475959313/',
    },
    {
        name: 'Saurabh Singh',
        role: 'Vice-Chairperson',
        image: imgViceChairperson,
        linkedin: 'https://www.linkedin.com/in/saurabh-singh-09a78930b/',
    },
    {
        name: 'Siddhi Chaudhari',
        role: 'Secretary',
        image: imgSecretary,
        linkedin: 'https://www.linkedin.com/in/siddhi-chaudhari-a2574131a/',
    },
    {
        name: 'Srishti Srivastava',
        role: 'Event Manager',
        image: imgEventManager,
        linkedin: 'https://www.linkedin.com/in/srishti-srivastava-994143291/',
    },
    {
        name: 'Varad Gandhi',
        role: 'Treasurer',
        image: imgTreasurer,
        linkedin: 'https://www.linkedin.com/in/varad-gandhi-15a9b9291/',
    },
    {
        name: 'Kartik Radye',
        role: 'Sponsorship Head',
        image: imgSponsorshipHead,
        linkedin: 'https://www.linkedin.com/in/kartik-radye-797b5531a/',
    },
    {
        name: 'Shubham Goswami',
        role: 'Technical Lead',
        image: imgTechnicalLead,
        linkedin: 'https://www.linkedin.com/in/shubhamgoswami099/',
    },
    {
        name: 'Ishita Mohapatra',
        role: 'Outreach Coordinator',
        image: imgOutreachCoordinator,
        linkedin: 'https://www.linkedin.com/in/ishita-mohapatra/',
    },
];

const workingCommittee = [
    { name: 'Ajinkya Mhatre', role: 'Sponsorship Team', image: imgWcSponsorship1, linkedin: 'https://www.linkedin.com/in/ajinkya-mhatre-3b6213330/' },
    { name: 'Shreyash Patil', role: 'Sponsorship Team', image: imgWcSponsorship2, linkedin: 'https://www.linkedin.com/in/patilshreyash/' },
    { name: 'Suraj Rawani', role: 'Sponsorship Team', image: imgWcSponsorship3, linkedin: 'https://www.linkedin.com/in/suraj-rawani-035b2734a/' },
    { name: 'Vignesh Bordikar', role: 'Sponsorship Team', image: imgWcSponsorship4, linkedin: 'https://www.linkedin.com/in/vignesh-bordikar/' },

    { name: 'Aditya Turkar', role: 'Creative Team', image: imgWcCreative1, linkedin: 'https://www.linkedin.com/in/aditya-turkar-813972348/' },
    { name: 'Anshul Chaurasia', role: 'Creative Team', image: imgWcCreative2, linkedin: null },
    { name: 'Anwesha Singh', role: 'Creative Team', image: imgWcCreative3, linkedin: 'https://www.linkedin.com/in/student-anwesha-singh/' },
    { name: 'Falakkhatoon Shaikh', role: 'Creative Team', image: imgWcCreative4, linkedin: 'https://www.linkedin.com/in/falak-shaikh-0b632a372/' },
    { name: 'Saanvi Tiwari', role: 'Creative Team', image: imgWcCreative5, linkedin: 'https://www.linkedin.com/in/saanvi-tiwari-5b1bb7375/' },
    { name: 'Suhani Darokar', role: 'Creative Team', image: imgWcCreative6, linkedin: '#' },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const TeamCard = ({ member, variants }) => {
    const [imgError, setImgError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const hasPhoto = !imgError && member.image;

    return (
        <motion.div className="team__card" variants={variants}>
            {/* Top Name & Role Header */}
            <div className="team__card-header">
                <h3 className="team__name">{member.name}</h3>
                <span className="team__role">{member.role}</span>
            </div>

            {/* Photo area with hover overlay */}
            <div className="team__photo-wrapper">
                {hasPhoto ? (
                    <img
                        src={member.image}
                        alt={`Photo of ${member.name}, ${member.role}`}
                        className={`team__photo ${isLoaded ? 'loaded' : ''}`}
                        onLoad={() => setIsLoaded(true)}
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className="team__photo-placeholder" aria-hidden="true">
                        <span>{member.name.charAt(0)}</span>
                    </div>
                )}

                {/* Hover Overlay containing only LinkedIn now */}
                <div className="team__hover-overlay">
                    {member.linkedin && member.linkedin !== '#' && (
                        <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name}'s LinkedIn profile`}
                            className="team__linkedin-btn"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <FaLinkedinIn /> <span>LinkedIn</span>
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default function Team() {
    const [activeTab, setActiveTab] = useState('core');

    const displayedTeam = activeTab === 'core' ? coreTeam : workingCommittee;

    return (
        <section className="section team" id="team">
            <div className="container">
                <motion.div
                    className="team__header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">Team</span>
                    <h2 className="section-title">
                        The {activeTab === 'core' ? 'Core' : 'Working'} <span className="gradient-text">{activeTab === 'core' ? 'Team' : 'Committee'}</span>
                    </h2>
                    <p className="section-subtitle">
                        Meet the people powering Oscillation 3.0
                    </p>

                    {/* Organizer Attribution */}
                    <motion.div
                        className="team__org glass-card"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <span className="team__org-label">Proudly Organized By</span>
                        <div className="team__org-name-wrapper">
                            <h3 className="team__org-title">IETE Students' Forum</h3>
                        </div>
                        <p className="team__org-venue">Thakur College of Engineering & Technology, Mumbai</p>
                    </motion.div>

                    {/* Tabs */}
                    <div className="team__tabs">
                        <button
                            className={`team__tab ${activeTab === 'core' ? 'active' : ''}`}
                            onClick={() => setActiveTab('core')}
                        >
                            Core Team
                        </button>
                        <button
                            className={`team__tab ${activeTab === 'wc' ? 'active' : ''}`}
                            onClick={() => setActiveTab('wc')}
                        >
                            Working Committee
                        </button>
                    </div>
                </motion.div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        className="team__grid"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    >
                        {displayedTeam.map((member, i) => (
                            <TeamCard key={i} member={member} variants={cardVariants} />
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* Social Links */}
                <motion.div
                    className="team__socials"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <span className="team__socials-label">Follow IETE TCET</span>
                    <div className="team__socials-icons">
                        <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" className="team__social-link" aria-label="LinkedIn">
                            <FaLinkedinIn />
                        </a>
                        <a href={SOCIALS.instagram} target="_blank" rel="noopener noreferrer" className="team__social-link" aria-label="Instagram">
                            <FaInstagram />
                        </a>
                        <a href={SOCIALS.whatsapp} target="_blank" rel="noopener noreferrer" className="team__social-link team__social-link--wa" aria-label="WhatsApp">
                            <FaWhatsapp />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
