import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronDown } from 'react-icons/hi';
import './FAQ.css';

const faqs = [
    {
        q: 'Can we add or remove team members before the Grand Finale?',
        a: 'No, team rosters were finalized during the Round 1 Screening phase. Only officially registered members may present to the judges on April 4th.',
    },
    {
        q: 'Can we diverge from our submitted abstract for the Grand Finale?',
        a: 'Pivoting to a completely new problem statement after the Round 1 selection is strictly prohibited.',
    },
    {
        q: 'Will accommodation or travel stipends be provided?',
        a: 'We do not provide travel stipends or overnight accommodation. Participants are expected to manage their own local transit to TCET Mumbai.',
    },
    {
        q: 'What equipment and resources should participants bring to the venue?',
        a: 'Participants are expected to bring their own personal laptops, necessary hardware components, chargers, and any other project-specific accessories. Complimentary internet access will be provided at the venue.',
    },
    {
        q: 'What is the prize distribution for the hackathon?',
        a: 'The Project Presentation track features prizes worth ₹7.8K, alongside special recognition awards (Best UI/UX, Most Social Impact, Jury Choice, and Audience Choice). The Ideathon track winner will be awarded a commemorative trophy and formal certificates of achievement.',
    },
    {
        q: 'Are participants allowed to use pre-existing code or libraries?',
        a: 'The utilization of pre-built libraries and open-source frameworks is permitted. However, the core logic and primary implementation of the solution must be original work developed during the event. Plagiarism is strictly prohibited and will result in disqualification.',
    },
    {
        q: 'What are the formal evaluation criteria for the submitted projects?',
        a: 'Evaluation criteria vary by track. The Ideathon track emphasizes problem clarity, innovation, feasibility, potential impact, and presentation proficiency. The Project Presentation track is assessed based on problem relevance, technical complexity, innovation, execution quality, the live demonstration, and overall scalability.',
    },
];

function FAQItem({ faq, isOpen, onClick, index }) {
    const answerId = `faq-answer-${index}`;

    return (
        <motion.div
            className={`faq__item glass-card ${isOpen ? 'faq__item--open' : ''}`}
            animate={{
                backgroundColor: isOpen ? 'rgba(168, 85, 247, 0.1)' : 'var(--bg-glass)',
                borderColor: isOpen ? 'var(--primary-500)' : 'var(--glass-border)'
            }}
            transition={{ duration: 0.3 }}
        >
            <button
                className="faq__item-header"
                onClick={onClick}
                aria-expanded={isOpen}
                aria-controls={answerId}
            >
                <h3 className="faq__item-question">{faq.q}</h3>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="faq__item-icon-wrapper"
                    aria-hidden="true"
                >
                    <HiChevronDown className="faq__item-icon" style={{ color: isOpen ? 'var(--primary-400)' : 'var(--text-muted)' }} />
                </motion.div>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        id={answerId}
                        className="faq__item-body"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: 'auto', marginTop: 10 },
                            collapsed: { opacity: 0, height: 0, marginTop: 0 }
                        }}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        <p className="faq__item-answer">{faq.a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(-1);

    return (
        <section className="section faq" id="faq">
            <div className="container">
                <motion.div
                    className="faq__header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">FAQ</span>
                    <h2 className="section-title">
                        Frequently Asked <span className="gradient-text">Questions</span>
                    </h2>
                </motion.div>

                <div className="faq__list">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                        >
                            <FAQItem
                                faq={faq}
                                index={i}
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
