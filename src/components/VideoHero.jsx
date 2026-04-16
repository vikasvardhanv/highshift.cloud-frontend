import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function VideoHero() {
    const containerRef = useRef(null);
    const videoRef1 = useRef(null);
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Use a secondary ref check inside useEffect
    useEffect(() => {
        const video = videoRef1.current;
        if (!video) return;

        const handleTimeUpdate = () => {
            if (!video || isNaN(video.currentTime)) return;
            try {
                if (video.currentTime >= 1.2) {
                    video.currentTime = 0;
                }
            } catch (err) {}
        };
        
        video.addEventListener('timeupdate', handleTimeUpdate);
        return () => video.removeEventListener('timeupdate', handleTimeUpdate);
    }, [videoRef1]);

    // 1. INTRO: Logo + Headline
    const introOpacity = useTransform(scrollYProgress, [0, 0.08, 0.12], [1, 1, 0]);
    const introScale = useTransform(scrollYProgress, [0, 0.08], [1, 0.9]);

    // 2. VIDEO: 1-SECOND LOOP (Priming)
    const video1Opacity = useTransform(scrollYProgress, [0.12, 0.16, 0.32, 0.36], [0, 1, 1, 0]);

    // 3. TEXT: THE SOCIAL ROBOT
    const robotTextOpacity = useTransform(scrollYProgress, [0.36, 0.4, 0.54, 0.58], [0, 1, 1, 0]);
    const lineX = useTransform(scrollYProgress, [0.36, 0.54], [-50, 0]);

    // 4. VIDEO: SILENT ENGINE
    const video2Opacity = useTransform(scrollYProgress, [0.58, 0.62, 0.78, 0.82], [0, 1, 1, 0]);

    // 5. VIDEO: CHAOS TAMED
    const video3Opacity = useTransform(scrollYProgress, [0.82, 0.86, 0.98, 1], [0, 1, 1, 0]);
    const video3Scale = useTransform(scrollYProgress, [0.82, 1], [1.05, 1]);

    return (
        <div ref={containerRef} className="h-[800vh] relative z-0 bg-black">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-black">
                
                {/* 1. INITIAL HEADLINE (Visible at start) */}
                <motion.div 
                    style={{ opacity: introOpacity, scale: introScale }}
                    className="absolute inset-0 z-[60] flex flex-col items-center justify-center p-6 text-center"
                >
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="w-32 h-32 md:w-56 md:h-56 mb-12"
                    >
                        <img src="/images/image.png" alt="Social Raven Logo" className="w-full h-full object-contain" />
                    </motion.div>
                    <h1 className="text-4xl md:text-8xl font-black text-white italic uppercase tracking-tighter mb-4 leading-none">
                        The Evolution<br/>Is Here
                    </h1>
                    <p className="text-indigo-500 font-bold tracking-[0.5em] uppercase text-sm md:text-xl opacity-80">
                        Social Raven
                    </p>
                </motion.div>

                {/* 2. VIDEO: PRIMING snippet */}
                <motion.div style={{ opacity: video1Opacity }} className="absolute inset-0 z-10 w-full h-full">
                    <video 
                        id="priming-loop-video"
                        ref={videoRef1}
                        src="/videos/Social_Media_Animation_For_Website.mp4" 
                        autoPlay muted loop playsInline
                        className="w-full h-full object-cover grayscale opacity-40 blur-[1px]"
                    />
                    <div className="absolute inset-0 bg-black/50" />
                </motion.div>

                {/* 3. MESSAGE: THE SOCIAL ROBOT */}
                <motion.div style={{ opacity: robotTextOpacity }} className="absolute inset-0 z-[55] flex flex-col items-center justify-center text-center px-4">
                    <motion.div style={{ x: lineX }} className="max-w-5xl space-y-8">
                        <h2 className="text-6xl md:text-[10rem] font-black text-white uppercase tracking-tighter italic leading-[0.85] shadow-2xl">
                            The Social<br/>Robot
                        </h2>
                        <div className="h-2 w-32 bg-indigo-600 mx-auto" />
                        <p className="text-2xl md:text-5xl text-slate-400 font-light italic leading-tight">
                            Synthesizing attention into outcome.
                        </p>
                    </motion.div>
                </motion.div>

                {/* 4. VIDEO: SILENT ENGINE */}
                <motion.div style={{ opacity: video2Opacity }} className="absolute inset-0 z-20 w-full h-full">
                    <video 
                        id="silent-engine-video"
                        src="/videos/Social_Raven_Silent_Engine.mp4" 
                        autoPlay muted loop playsInline
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                </motion.div>

                {/* 5. VIDEO: CHAOS TAMED */}
                <motion.div style={{ opacity: video3Opacity, scale: video3Scale }} className="absolute inset-0 z-30 w-full h-full">
                    <video 
                        id="chaos-tamed-video"
                        src="/videos/Digital_Raven_Organizes_Social_Media_Chaos.mp4" 
                        autoPlay muted loop playsInline
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                         <h2 className="text-6xl md:text-9xl font-black text-white italic tracking-tighter uppercase mb-6 leading-none">Chaos<br/>Removed</h2>
                         <div className="w-24 h-2 bg-indigo-600 rounded-full" />
                    </div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div 
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.03, 0.98, 1], [1, 0, 0, 0]) }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 z-[80] pointer-events-none"
                >
                    <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1 backdrop-blur-sm">
                        <motion.div 
                            animate={{ y: [0, 12, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="w-1.5 h-1.5 bg-indigo-500 rounded-full shadow-[0_0_10px_indigo]" 
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
