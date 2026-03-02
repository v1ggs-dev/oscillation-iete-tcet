import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronDown } from 'react-icons/hi';

import './Guidelines.css';

const guidelines = [
    {
        title: 'Team Rules & Discipline',
        content: [
            'Team size: 1–4 members for all tracks',
            'College ID is mandatory for all participants',
            'Arrive at least 30 minutes before the event starts',
            'Maintain decorum and respect fellow participants, mentors, and judges',
            "Judges' decision is final and binding",
        ],
    },
    {
        title: 'Resources & Originality',
        content: [
            'Bring your own laptops, hardware components, chargers, and accessories',
            'Internet connectivity will be provided at the venue',
            'Plagiarism is strictly prohibited — original work only',
            'Pre-built libraries and frameworks are allowed, but the core logic must be original',
        ],
    },
    {
        title: 'General Guidelines',
        content: [
            'Plan and test your ideas beforehand to make the most of event time',
            'Keep the venue clean and organized',
            'Any damage to venue property is the responsibility of the participant',
            'Problem statement and domain changes are allowed during the event',
        ],
    },
    {
        title: 'Track Selection',
        content: [
            'Oscillation will be conducted in two tracks: Ideathon and Project Presentation',
            'Participants can take part in any one track of their choice',
            'Each track has its own judging criteria and prizes',
        ],
    },
];

function AccordionItem({ item, isOpen, onClick }) {
    return (
        <div className={`guidelines__item glass-card ${isOpen ? 'guidelines__item--open' : ''}`}>
            <button className="guidelines__item-header" onClick={onClick}>
                <h3 className="guidelines__item-title">{item.title}</h3>
                <HiChevronDown className={`guidelines__item-icon ${isOpen ? 'guidelines__item-icon--open' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="guidelines__item-body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ul className="guidelines__list">
                            {item.content.map((line, i) => (
                                <li key={i}>{line}</li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function Guidelines() {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="section guidelines" id="guidelines">
            <div className="container">
                <motion.div
                    className="guidelines__header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">Rules</span>
                    <h2 className="section-title">
                        Guidelines & <span className="gradient-text">Rules</span>
                    </h2>
                    <p className="section-subtitle">
                        Please read all guidelines carefully before participating.
                    </p>
                </motion.div>

                <div className="guidelines__accordion">
                    {guidelines.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                        >
                            <AccordionItem
                                item={item}
                                isOpen={openIndex === i}
                                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                            />
                        </motion.div>
                    ))}
                </div>


            </div>
        </section>
    );
}
