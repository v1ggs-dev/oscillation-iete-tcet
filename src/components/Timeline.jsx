import { motion } from 'framer-motion';
import { timelineEvents } from '../data/timeline';
import './Timeline.css';

export default function Timeline() {
    return (
        <section className="section timeline" id="timeline">
            <div className="container">
                <motion.div
                    className="timeline__header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">Timeline</span>
                    <h2 className="section-title">
                        Event <span className="gradient-text">Flow</span>
                    </h2>
                    <p className="section-subtitle">
                        Follow the journey from registration to the awards ceremony.
                    </p>
                </motion.div>

                <div className="timeline__track">
                    <div className="timeline__line" />
                    {timelineEvents.map((event, i) => (
                        <motion.div
                            key={event.id}
                            className={`timeline__item ${i % 2 === 0 ? 'timeline__item--left' : 'timeline__item--right'} ${event.status === 'completed' ? 'timeline__item--completed' : ''}`}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                        >
                            <div className="timeline__dot">
                                <span>{event.icon}</span>
                            </div>
                            <div className="timeline__card glass-card">
                                <h3 className="timeline__card-title">{event.title}</h3>
                                {event.description && <p className="timeline__card-desc">{event.description}</p>}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
