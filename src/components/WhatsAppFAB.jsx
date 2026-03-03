import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';
import { WHATSAPP_URL } from '../config/constants';
import qrCode from '../assets/static/wqr.png';
import './WhatsAppFAB.css';

export default function WhatsAppFAB() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Floating Action Button */}
            <motion.button
                className="wa-fab"
                onClick={() => setIsOpen(true)}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Join WhatsApp group"
            >
                <FaWhatsapp />
                <span className="wa-fab__pulse" />
            </motion.button>

            {/* QR Code Popup */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="wa-popup__overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            className="wa-popup__card"
                            initial={{ opacity: 0, scale: 0.85, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.85, y: 30 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="wa-popup__close"
                                onClick={() => setIsOpen(false)}
                                aria-label="Close"
                            >
                                <FaTimes />
                            </button>

                            <div className="wa-popup__icon">
                                <FaWhatsapp />
                            </div>

                            <h3 className="wa-popup__title">Join Our WhatsApp Group</h3>
                            <p className="wa-popup__desc">
                                Scan the QR code for the latest event updates, announcements & more.
                            </p>

                            <div className="wa-popup__qr-wrapper">
                                <img
                                    src={qrCode}
                                    alt="WhatsApp Group QR Code"
                                    className="wa-popup__qr"
                                />
                            </div>

                            <a
                                href={WHATSAPP_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="wa-popup__join-btn"
                            >
                                <FaWhatsapp /> Join Directly
                            </a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
