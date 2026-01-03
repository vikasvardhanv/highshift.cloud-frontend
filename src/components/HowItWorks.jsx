import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Facebook, Twitter, Instagram, Linkedin, Youtube,
    Calendar, BarChart2, TrendingUp, Target, Zap,
    CheckCircle, Clock, Send
} from 'lucide-react';

// Social media icons for rotation animation
const SOCIAL_ICONS = [
    { icon: Twitter, color: 'text-sky-400', bg: 'bg-sky-500/20' },
    { icon: Facebook, color: 'text-blue-500', bg: 'bg-blue-500/20' },
    { icon: Instagram, color: 'text-pink-500', bg: 'bg-pink-500/20' },
    { icon: Linkedin, color: 'text-blue-600', bg: 'bg-blue-600/20' },
    { icon: Youtube, color: 'text-red-500', bg: 'bg-red-500/20' },
];

// Step 1: Rotating Social Icons Animation
function ConnectAnimation() {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % SOCIAL_ICONS.length);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-40 h-40 mx-auto">
            {/* Orbiting icons */}
            {SOCIAL_ICONS.map((item, index) => {
                const angle = (index * 72) + (activeIndex * 72); // 360/5 = 72 degrees
                const radius = 60;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;
                const isActive = index === activeIndex;
                const IconComponent = item.icon;

                return (
                    <motion.div
                        key={index}
                        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${item.bg} rounded-2xl p-3 cursor-pointer transition-all`}
                        animate={{
                            x,
                            y,
                            scale: isActive ? 1.3 : 0.9,
                            opacity: isActive ? 1 : 0.6,
                        }}
                        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    >
                        <IconComponent className={`w-6 h-6 ${item.color}`} />
                    </motion.div>
                );
            })}

            {/* Center "Connect" pulse */}
            <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <Zap className="w-8 h-8 text-primary" />
            </motion.div>
        </div>
    );
}

// Step 2: Calendar Flying Animation
function ScheduleAnimation() {
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setPhase((prev) => (prev + 1) % 4);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-40 h-40 mx-auto overflow-visible">
            {/* Calendar icon with flying effect */}
            <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{
                    y: phase === 0 ? 0 : phase === 1 ? -20 : phase === 2 ? -40 : 0,
                    x: phase === 0 ? 0 : phase === 1 ? 10 : phase === 2 ? -10 : 0,
                    rotate: phase === 0 ? 0 : phase === 1 ? 5 : phase === 2 ? -5 : 0,
                    scale: phase === 2 ? 1.1 : 1,
                }}
                transition={{ type: 'spring', stiffness: 150, damping: 15 }}
            >
                <div className="w-20 h-20 bg-secondary/20 rounded-2xl flex items-center justify-center shadow-lg shadow-secondary/20">
                    <Calendar className="w-10 h-10 text-secondary" />
                </div>
            </motion.div>

            {/* Time indicators */}
            <AnimatePresence>
                {phase >= 1 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, x: 50, y: -30 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="absolute top-2 right-0 bg-white dark:bg-surface rounded-lg px-2 py-1 shadow-lg flex items-center gap-1"
                    >
                        <Clock className="w-3 h-3 text-secondary" />
                        <span className="text-xs font-bold text-slate-700 dark:text-gray-300">10:00 AM</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {phase >= 2 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-green-500/20 text-green-500 rounded-full px-3 py-1 flex items-center gap-1"
                    >
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-xs font-bold">Scheduled!</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Send icon flying out */}
            <AnimatePresence>
                {phase === 3 && (
                    <motion.div
                        initial={{ opacity: 1, x: 0, y: 0 }}
                        animate={{ opacity: 0, x: 60, y: -60 }}
                        transition={{ duration: 0.8 }}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                        <Send className="w-6 h-6 text-primary" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Step 3: Analytics Dashboard Animation
function AnalyticsAnimation() {
    const [values, setValues] = useState([40, 65, 50, 80, 60]);

    useEffect(() => {
        const interval = setInterval(() => {
            setValues(prev => prev.map(() => Math.floor(Math.random() * 60) + 30));
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-40 h-40 mx-auto">
            {/* Mini chart */}
            <div className="absolute inset-0 flex items-end justify-center gap-2 px-4 pb-4">
                {values.map((value, index) => (
                    <motion.div
                        key={index}
                        className="w-5 bg-gradient-to-t from-primary to-secondary rounded-t-lg"
                        initial={{ height: 0 }}
                        animate={{ height: `${value}%` }}
                        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                    />
                ))}
            </div>

            {/* Trending indicator */}
            <motion.div
                className="absolute top-2 right-2 bg-green-500/20 rounded-xl p-2"
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <TrendingUp className="w-5 h-5 text-green-500" />
            </motion.div>

            {/* Target icon */}
            <motion.div
                className="absolute top-2 left-2 bg-primary/20 rounded-xl p-2"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
            >
                <Target className="w-5 h-5 text-primary" />
            </motion.div>

            {/* Analytics label */}
            <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-slate-100 dark:bg-white/10 rounded-full px-3 py-1"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <div className="flex items-center gap-1">
                    <BarChart2 className="w-3 h-3 text-primary" />
                    <span className="text-xs font-bold text-slate-700 dark:text-gray-300">+27%</span>
                </div>
            </motion.div>
        </div>
    );
}

export default function HowItWorks() {
    const steps = [
        {
            id: 1,
            title: 'Connect Your Accounts',
            description: 'Link your social media profiles in seconds with our secure OAuth integration.',
            animation: <ConnectAnimation />,
        },
        {
            id: 2,
            title: 'Create & Schedule',
            description: 'Compose your posts, add media, set your schedule, and let us handle the rest.',
            animation: <ScheduleAnimation />,
        },
        {
            id: 3,
            title: 'Track & Optimize',
            description: 'Monitor performance metrics and refine your strategy with our analytics dashboard.',
            animation: <AnalyticsAnimation />,
        },
    ];

    return (
        <section className="py-24 bg-slate-50 dark:bg-surface/30 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">How It Works</h2>
                    <p className="text-lg text-slate-500 dark:text-gray-400 max-w-2xl mx-auto">
                        Get started in 3 simple steps
                    </p>
                </motion.div>

                {/* Steps Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative group"
                        >
                            {/* Step number */}
                            <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-lg shadow-primary/30 z-10">
                                {step.id}
                            </div>

                            {/* Card */}
                            <div className="bg-white dark:bg-surface/50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-slate-100 dark:border-white/5 h-full">
                                {/* Animation Container */}
                                <div className="mb-6 h-44 flex items-center justify-center">
                                    {step.animation}
                                </div>

                                {/* Text */}
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 text-center">
                                    {step.title}
                                </h3>
                                <p className="text-slate-500 dark:text-gray-400 text-center text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
