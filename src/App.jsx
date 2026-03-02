import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent, useTransform } from 'framer-motion';
import { HiChevronUp } from 'react-icons/hi';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Tracks from './components/Tracks';
import Timeline from './components/Timeline';
import Benefits from './components/Benefits';
import Prizes from './components/Prizes';
import Guidelines from './components/Guidelines';
import Team from './components/Team';
import Sponsors from './components/Sponsors';
import FAQ from './components/FAQ';
import Register from './components/Register';
import Footer from './components/Footer';

function PageLoader() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Extended the loading time slightly to let the animation play out beautifully
    const timer = setTimeout(() => setLoaded(true), 2500);

    // Global Security Event Traps
    const preventContextMenu = (e) => e.preventDefault();
    const preventShortcuts = (e) => {
      // Block Ctrl+A, Ctrl+C, Ctrl+X, Ctrl+U (source), Ctrl+P (print), F12 (DevTools)
      if (
        (e.ctrlKey && ['a', 'c', 'x', 'u', 'p', 's'].includes(e.key.toLowerCase())) ||
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && ['i', 'j', 'c'].includes(e.key.toLowerCase()))
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', preventContextMenu);
    document.addEventListener('keydown', preventShortcuts);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('contextmenu', preventContextMenu);
      document.removeEventListener('keydown', preventShortcuts);
    };
  }, []);

  // Framer Motion Variants for staggered text reveal
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { type: "spring", stiffness: 200, damping: 10 }
    }
  };

  const title = "OSCILLATION 3.0".split("");

  return (
    <AnimatePresence>
      {!loaded && (
        <motion.div
          className="page-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.1,
            filter: "blur(10px)",
            transition: { duration: 0.8, ease: "easeInOut" }
          }}
        >
          <div className="loader-content">
            {/* Wave Interference Animation */}
            <div className="loader-oscillation-system">
              {/* Generate multiple wave bars for the interference effect */}
              {[...Array(24)].map((_, i) => (
                <motion.div
                  key={i}
                  className="wave-bar"
                  animate={{
                    height: ["20%", "100%", "20%"],
                    background: [
                      "var(--primary-500)",
                      "var(--secondary-500)",
                      "var(--primary-500)"
                    ],
                    boxShadow: [
                      "0 0 10px var(--primary-glow)",
                      "0 0 20px var(--secondary-glow)",
                      "0 0 10px var(--primary-glow)"
                    ]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.1, // Stagger effect
                  }}
                />
              ))}
            </div>

            {/* Staggered Text Reveal */}
            <motion.div
              className="loader-text-container"
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              {title.map((char, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className="loader-char gradient-text"
                  style={{ display: char === " " ? "inline" : "inline-block" }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              className="loader-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              Initializing Systems...
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function AuroraBackground() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 3000], [0, -300]);
  const y2 = useTransform(scrollY, [0, 3000], [0, -150]);
  const y3 = useTransform(scrollY, [0, 3000], [0, -200]);
  const y4 = useTransform(scrollY, [0, 3000], [0, -100]);

  return (
    <div className="aurora-bg">
      <motion.div className="aurora-orb" style={{ y: y1 }} />
      <motion.div className="aurora-orb" style={{ y: y2 }} />
      <motion.div className="aurora-orb" style={{ y: y3 }} />
      <motion.div className="aurora-orb" style={{ y: y4 }} />
    </div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div className="scroll-progress" style={{ scaleX }} />
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 400);
  });

  return (
    <motion.button
      className="back-to-top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
      aria-label="Back to top"
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
    >
      <HiChevronUp />
    </motion.button>
  );
}

export default function App() {
  return (
    <>
      <PageLoader />
      <ScrollProgress />
      <AuroraBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Tracks />
        <Timeline />
        <Benefits />
        <Prizes />
        <Guidelines />
        <Team />
        <Sponsors />
        <FAQ />
        <Register />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
