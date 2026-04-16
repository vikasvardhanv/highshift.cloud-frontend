import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FeaturePageTemplate({
    title,
    subtitle,
    heroImage,
    heroGradient = "from-slate-900 via-indigo-950 to-slate-900",
    features = [],
    ctaTitle = "Ready to get started?",
    ctaText = "Join thousands of brands using Social Raven to grow.",
    targetRoute = "/dashboard" // Default route after login
}) {
    // Stagger container for grid with enhanced timing
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    // Enhanced item animation with rotation and scale
    const item = {
        hidden: { opacity: 0, y: 50, scale: 0.9, rotateX: -15 },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            transition: {
                type: "spring",
                stiffness: 80,
                damping: 15
            }
        }
    };

    // Floating animation for decorative elements
    const float = {
        initial: { y: 0 },
        animate: {
            y: [-10, 10, -10],
            transition: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    const loginUrl = `/login?redirect=${encodeURIComponent(targetRoute)}`;

    const isAuthenticated = localStorage.getItem('token') || localStorage.getItem('social_api_key');
    const finalCtaLink = isAuthenticated ? targetRoute : loginUrl;

    return (
        <div className="bg-white dark:bg-black font-sans overflow-hidden">
            {/* HERO */}
            <div className="relative pt-32 pb-20 overflow-hidden bg-slate-950">
                {/* Animated Gradient */}
                <motion.div
                    className={`absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-br ${heroGradient} opacity-20 blur-[100px] pointer-events-none`}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.3, 0.2]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Floating Sparkles */}
                <motion.div
                    variants={float}
                    initial="initial"
                    animate="animate"
                    className="absolute top-1/4 left-1/4 opacity-20"
                >
                    <Sparkles className="w-8 h-8 text-primary" />
                </motion.div>
                <motion.div
                    variants={float}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: 2 }}
                    className="absolute top-1/3 right-1/4 opacity-20"
                >
                    <Sparkles className="w-6 h-6 text-secondary" />
                </motion.div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <motion.span
                            className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm"
                            whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.4)" }}
                        >
                            Feature Spotlight
                        </motion.span>
                        <motion.h1
                            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight max-w-4xl mx-auto leading-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            {title}
                        </motion.h1>
                        <motion.p
                            className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            {subtitle}
                        </motion.p>
                        <motion.div
                            className="flex justify-center gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                        >
                            <motion.div
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Link to={finalCtaLink} className="px-8 py-4 bg-primary hover:bg-primaryHover text-white font-bold rounded-xl text-lg transition-all shadow-xl shadow-primary/10 flex items-center gap-2 relative overflow-hidden group">
                                    {/* Shimmer effect */}
                                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                    <span className="relative z-10">{isAuthenticated ? 'Enter Command Center' : 'Start Free Trial'}</span>
                                    <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* FEATURES GRID */}
            <div className="py-24 bg-white dark:bg-black relative">
                {/* Background decoration */}
                <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-12"
                    >
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                variants={item}
                                whileHover={{
                                    y: -10,
                                    scale: 1.03,
                                    transition: { type: "spring", stiffness: 300 }
                                }}
                                className="group relative p-8 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 hover:border-primary/30 transition-all hover:shadow-2xl hover:bg-white dark:hover:bg-slate-900 overflow-hidden"
                            >
                                {/* Animated background gradient on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Shimmer effect */}
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />

                                <div className="relative z-10">
                                    {/* Animation Container - NEW! */}
                                    {feature.animation && (
                                        <div className="h-48 bg-slate-100 dark:bg-black/20 rounded-t-2xl -m-8 mb-6 overflow-hidden relative">
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                {feature.animation}
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-3 mb-4">
                                        <motion.div
                                            className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shadow-sm group-hover:bg-primary/20 transition-colors"
                                            whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            {feature.icon && <feature.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />}
                                        </motion.div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary transition-colors">
                                            {feature.title}
                                        </h3>
                                    </div>
                                    <p className="text-slate-500 dark:text-gray-400 leading-relaxed text-sm">
                                        {feature.description}
                                    </p>
                                </div>

                                {/* Corner accent */}
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* CTA */}
            <div className="py-24 bg-slate-50 dark:bg-white/5 border-t border-slate-200 dark:border-white/5 relative overflow-hidden">
                {/* Animated background circles */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary/10"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.1, 0.3]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-secondary/10"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />

                <div className="container mx-auto px-4 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        <motion.h2
                            className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            {ctaTitle}
                        </motion.h2>
                        <motion.p
                            className="text-slate-500 text-lg mb-8 max-w-xl mx-auto"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            {ctaText}
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Link to={loginUrl} className="inline-flex items-center gap-2 px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-xl hover:opacity-90 transition-all shadow-xl hover:shadow-2xl relative overflow-hidden group">
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                <span className="relative z-10">Get Started Now</span>
                                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

