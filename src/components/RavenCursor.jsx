import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

/**
 * RavenCursor: High-performance cinematic cursor.
 * Uses rotation and simplified wing flap (via scale/rotate) to avoid 
 * SVG path interpolation errors in some environments.
 */
export default function RavenCursor() {
    const [isVisible, setIsVisible] = useState(false);
    
    // Core position values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    
    // Smooth spring physics for "high-agency" feel
    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);
    
    // For rotation relative to movement
    const [rotation, setRotation] = useState(0);
    const lastPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isVisible) setIsVisible(true);
            
            const dx = e.clientX - lastPos.current.x;
            const dy = e.clientY - lastPos.current.y;
            
            // Calculate rotation based on velocity vector
            if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
                const angle = Math.atan2(dy, dx) * (180 / Math.PI);
                setRotation(angle);
            }
            
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            lastPos.current = { x: e.clientX, y: e.clientY };
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', handleMouseMove);
        document.body.addEventListener('mouseleave', handleMouseLeave);
        document.body.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            document.body.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [isVisible, mouseX, mouseY]);

    if (!isVisible) return null;

    return (
        <motion.div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                x,
                y,
                pointerEvents: 'none',
                zIndex: 9999,
                rotate: rotation,
                translateX: '-50%',
                translateY: '-50%',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            {/* The Raven Silhouette (Simplified for stability) */}
            <svg 
                width="60" 
                height="60" 
                viewBox="0 0 100 100" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="text-indigo-400 drop-shadow-[0_0_15px_rgba(99,102,241,0.6)]"
            >
                {/* Body */}
                <path 
                    d="M50 40C55 40 60 45 60 50C60 55 55 60 50 60C45 60 40 55 40 50C40 45 45 40 50 40Z" 
                    fill="currentColor" 
                />
                
                {/* Left Wing (Simplified Rotate instead of path morph) */}
                <motion.path
                    d="M40 50C20 40 10 20 5 10C10 30 20 45 40 50Z"
                    fill="currentColor"
                    style={{ originX: '40px', originY: '50px' }}
                    animate={{ rotate: [0, 15, 0] }}
                    transition={{ repeat: Infinity, duration: 0.4, ease: "easeInOut" }}
                />

                {/* Right Wing (Simplified Rotate instead of path morph) */}
                <motion.path
                    d="M60 50C80 40 90 20 95 10C90 30 80 45 60 50Z"
                    fill="currentColor"
                    style={{ originX: '60px', originY: '50px' }}
                    animate={{ rotate: [0, -15, 0] }}
                    transition={{ repeat: Infinity, duration: 0.4, ease: "easeInOut" }}
                />

                {/* Beak */}
                <path d="M50 60L50 65L48 62L50 60Z" fill="#FBBF24" />
                {/* Eye */}
                <circle cx="48" cy="50" r="1" fill="white" />
            </svg>
            
            {/* Performance Glide Aura */}
            <motion.div 
                className="absolute inset-x-0 top-1/2 h-4 bg-indigo-500/10 blur-xl -z-10 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ repeat: Infinity, duration: 2 }}
            />
        </motion.div>
    );
}
