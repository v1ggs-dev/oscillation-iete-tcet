import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * TiltCard – 3D tilt effect on hover, based on cursor position.
 * Props:
 *  - children: card content
 *  - className: CSS class for the card
 *  - tiltStrength: max tilt degrees (default 12)
 *  - ...rest: passed through
 */
export default function TiltCard({ children, className = '', tiltStrength = 12, ...rest }) {
    const ref = useRef(null);
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    const rotateX = useSpring(useTransform(mouseY, [0, 1], [tiltStrength, -tiltStrength]), { stiffness: 200, damping: 20 });
    const rotateY = useSpring(useTransform(mouseX, [0, 1], [-tiltStrength, tiltStrength]), { stiffness: 200, damping: 20 });



    const handleMouseMove = (e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mouseX.set((e.clientX - rect.left) / rect.width);
        mouseY.set((e.clientY - rect.top) / rect.height);
    };

    const handleMouseLeave = () => {
        mouseX.set(0.5);
        mouseY.set(0.5);
    };

    return (
        <motion.div
            ref={ref}
            className={className}
            style={{
                rotateX,
                rotateY,
                transformPerspective: 800,
                transformStyle: 'preserve-3d',
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            {...rest}
        >
            {children}
        </motion.div>
    );
}

