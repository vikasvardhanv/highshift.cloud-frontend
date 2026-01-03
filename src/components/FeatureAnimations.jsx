import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar, Clock, Image, CheckCircle, Users, Repeat,
    Twitter, Facebook, Instagram, Linkedin, Layers,
    ArrowRight, BarChart2, TrendingUp, Zap, Sparkles,
    Mail, FileText, ExternalLink, Activity, PieChart,
    MousePointerClick, Share2, Eye, Inbox, Smile, Filter
} from 'lucide-react';

// Visual Calendar: Drag-and-drop animation
export function VisualCalendarAnimation() {
    const [draggedPost, setDraggedPost] = useState(null);
    const [targetDay, setTargetDay] = useState(2);

    useEffect(() => {
        const interval = setInterval(() => {
            setDraggedPost(prev => prev === null ? 0 : null);
            setTargetDay(prev => (prev + 1) % 5 + 1);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const posts = [
        { day: 1, color: 'bg-blue-500' },
        { day: 3, color: 'bg-pink-500' },
        { day: 4, color: 'bg-purple-500' },
    ];

    return (
        <div className="relative w-full h-48">
            {/* Mini Calendar Grid */}
            <div className="absolute inset-0 grid grid-cols-6 gap-2 p-4">
                {days.map((day, index) => (
                    <div key={day} className="flex flex-col items-center">
                        <span className="text-[10px] font-bold text-slate-500 mb-1">{day}</span>
                        <motion.div
                            className={`w-full h-20 rounded-lg border-2 border-dashed transition-all
                                ${draggedPost !== null && index === targetDay ? 'border-primary bg-primary/10' : 'border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-white/5'}`}
                            animate={draggedPost !== null && index === targetDay ? { scale: [1, 1.05, 1] } : {}}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Existing posts */}
                            {posts.filter(p => p.day === index).map((post, pIndex) => (
                                <motion.div
                                    key={pIndex}
                                    className={`w-full h-full rounded-md ${post.color} opacity-70 p-1 flex items-center justify-center`}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <Calendar className="w-3 h-3 text-white" />
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                ))}
            </div>

            {/* Dragging Post */}
            <AnimatePresence>
                {draggedPost !== null && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, x: 80, y: 50 }}
                        animate={{
                            opacity: 1,
                            scale: 0.9,
                            x: (targetDay * 50) + 20,
                            y: 80,
                            rotate: [0, -5, 5, 0]
                        }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ type: "spring", stiffness: 150 }}
                        className="absolute bg-emerald-500 rounded-lg shadow-2xl p-2 w-12 h-12 flex items-center justify-center z-20"
                    >
                        <Calendar className="w-6 h-6 text-white" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Best Time to Post: AI analysis visualization
export function BestTimeAnimation() {
    const [analyzing, setAnalyzing] = useState(true);
    const [suggestedTime, setSuggestedTime] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setAnalyzing(true);
            setSuggestedTime(null);
            setTimeout(() => {
                setAnalyzing(false);
                setSuggestedTime({ hour: 10 + Math.floor(Math.random() * 4), engagement: 85 + Math.floor(Math.random() * 15) });
            }, 2000);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const hours = [8, 10, 12, 14, 16, 18];

    return (
        <div className="relative w-full h-48 flex items-center justify-center">
            {/* Time bars */}
            <div className="absolute inset-0 flex items-end justify-center gap-3 px-6 pb-8">
                {hours.map((hour, index) => {
                    const isOptimal = suggestedTime && hour === suggestedTime.hour;
                    const height = 30 + Math.random() * 50;

                    return (
                        <div key={hour} className="flex flex-col items-center gap-1">
                            <motion.div
                                className={`w-8 rounded-t-lg ${isOptimal ? 'bg-gradient-to-t from-emerald-500 to-emerald-400' : 'bg-gradient-to-t from-slate-400 to-slate-300 dark:from-slate-600 dark:to-slate-500'}`}
                                initial={{ height: 0 }}
                                animate={{
                                    height: `${height}px`,
                                    scale: isOptimal ? 1.15 : 1
                                }}
                                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                            />
                            <span className="text-[9px] font-bold text-slate-500">{hour}:00</span>
                        </div>
                    );
                })}
            </div>

            {/* AI Scanning Effect */}
            <AnimatePresence>
                {analyzing && (
                    <motion.div
                        initial={{ opacity: 0, y: -120 }}
                        animate={{ opacity: [0.5, 1, 0.5], y: [-120, 60, -120] }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-x-0 h-1 bg-primary/50 blur-sm"
                    />
                )}
            </AnimatePresence>

            {/* AI Badge */}
            <motion.div
                className="absolute top-4 right-4"
                animate={{ rotate: analyzing ? 360 : 0 }}
                transition={{ duration: 2, repeat: analyzing ? Infinity : 0, ease: "linear" }}
            >
                <div className="bg-primary/20 rounded-xl p-2 backdrop-blur-sm">
                    <Sparkles className="w-5 h-5 text-primary" />
                </div>
            </motion.div>

            {/* Suggested Time Popup */}
            <AnimatePresence>
                {suggestedTime && !analyzing && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="absolute top-10 bg-emerald-500 text-white rounded-xl px-4 py-2 shadow-xl"
                    >
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm font-bold">{suggestedTime.hour}:00 • {suggestedTime.engagement}% engagement</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Multi-Platform: Network diagram
export function MultiPlatformAnimation() {
    const [activeIndex, setActiveIndex] = useState(0);
    const platforms = [
        { icon: Twitter, color: 'text-sky-400', bg: 'bg-sky-500/20' },
        { icon: Facebook, color: 'text-blue-500', bg: 'bg-blue-500/20' },
        { icon: Instagram, color: 'text-pink-500', bg: 'bg-pink-500/20' },
        { icon: Linkedin, color: 'text-blue-600', bg: 'bg-blue-600/20' },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % platforms.length);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-48 flex items-center justify-center">
            {/* Center content bubble */}
            <motion.div
                className="relative z-10 w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-xl"
                animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
            >
                <Layers className="w-10 h-10 text-white" />
            </motion.div>

            {/* Orbiting platforms */}
            {platforms.map((platform, index) => {
                const angle = (index * 90);
                const radius = 70;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;
                const Icon = platform.icon;
                const isActive = index === activeIndex;

                return (
                    <motion.div
                        key={index}
                        className={`absolute ${platform.bg} rounded-xl p-3 shadow-lg`}
                        animate={{
                            x,
                            y,
                            scale: isActive ? 1.2 : 0.9,
                            opacity: isActive ? 1 : 0.6
                        }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    >
                        <Icon className={`w-6 h-6 ${platform.color}`} />
                    </motion.div>
                );
            })}

            {/* Connection lines */}
            {platforms.map((_, index) => (
                <motion.div
                    key={`line-${index}`}
                    className="absolute w-1 h-16 bg-primary/20 origin-bottom"
                    style={{
                        rotate: `${index * 90}deg`,
                        transformOrigin: 'bottom center',
                        bottom: '50%',
                        left: '50%',
                    }}
                    animate={{
                        scaleY: index === activeIndex ? [1, 1.5, 1] : 1,
                        opacity: index === activeIndex ? [0.2, 0.5, 0.2] : 0.1
                    }}
                    transition={{ duration: 1.5 }}
                />
            ))}
        </div>
    );
}

// Asset Library: File organization
export function AssetLibraryAnimation() {
    const [organizing, setOrganizing] = useState(false);
    const [files, setFiles] = useState([
        { id: 1, x: 20, y: 30, organized: false },
        { id: 2, x: 60, y: 50, organized: false },
        { id: 3, x: 100, y: 20, organized: false },
        { id: 4, x: 130, y: 60, organized: false },
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setOrganizing(true);
            setTimeout(() => {
                setFiles(prev => prev.map(f => ({ ...f, organized: true })));
            }, 500);
            setTimeout(() => {
                setOrganizing(false);
                setFiles(prev => prev.map(f => ({ ...f, organized: false })));
            }, 3000);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-48">
            {/* Folder grid (organized state) */}
            <div className="absolute inset-0 grid grid-cols-2 gap-4 p-8 opacity-20">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="border-2 border-dashed border-slate-300 dark:border-white/10 rounded-lg" />
                ))}
            </div>

            {/* Floating files */}
            {files.map((file, index) => (
                <motion.div
                    key={file.id}
                    className="absolute w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-lg flex items-center justify-center"
                    animate={{
                        x: file.organized ? (index % 2) * 80 + 50 : file.x,
                        y: file.organized ? Math.floor(index / 2) * 70 + 40 : file.y,
                        rotate: file.organized ? 0 : [0, 5, -5, 0],
                        scale: file.organized ? 0.9 : 1
                    }}
                    transition={{ type: "spring", stiffness: 150, damping: 15 }}
                >
                    <Image className="w-6 h-6 text-white" />
                </motion.div>
            ))}

            {/* Organizing indicator */}
            <AnimatePresence>
                {organizing && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute top-4 right-4 bg-primary/20 rounded-full px-3 py-1"
                    >
                        <div className="flex items-center gap-1">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                                <Zap className="w-3 h-3 text-primary" />
                            </motion.div>
                            <span className="text-xs font-bold text-primary">Organizing</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Approval Workflow: Step progression
export function ApprovalWorkflowAnimation() {
    const [currentStep, setCurrentStep] = useState(0);
    const steps = ['Draft', 'Review', 'Approved'];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep(prev => (prev + 1) % (steps.length + 1));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-48 flex items-center justify-center px-4">
            <div className="flex items-center gap-4">
                {steps.map((step, index) => {
                    const isActive = index === currentStep;
                    const isComplete = index < currentStep;

                    return (
                        <div key={step} className="flex items-center">
                            {/* Step circle */}
                            <motion.div
                                className={`relative w-16 h-16 rounded-full flex flex-col items-center justify-center shadow-lg
                                    ${isComplete ? 'bg-emerald-500' : isActive ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-700'}`}
                                animate={{
                                    scale: isActive ? [1, 1.15, 1] : 1,
                                    boxShadow: isActive
                                        ? ['0 4px 6px rgba(251, 191, 36, 0.3)', '0 8px 16px rgba(251, 191, 36, 0.5)', '0 4px 6px rgba(251, 191, 36, 0.3)']
                                        : '0 4px 6px rgba(0, 0, 0, 0.1)'
                                }}
                                transition={{ duration: 0.8, repeat: isActive ? Infinity : 0 }}
                            >
                                {isComplete ? (
                                    <CheckCircle className="w-8 h-8 text-white" />
                                ) : (
                                    <Users className="w-8 h-8 text-white" />
                                )}
                                <span className="text-[8px] font-bold text-white mt-1">{step}</span>
                            </motion.div>

                            {/* Arrow connector */}
                            {index < steps.length - 1 && (
                                <motion.div
                                    className={`w-12 h-1 mx-2 ${isComplete ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'}`}
                                    animate={{
                                        scaleX: isComplete ? [1, 1.1, 1] : 1
                                    }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <ArrowRight className={`w-4 h-4 -mt-2 ml-8 ${isComplete ? 'text-emerald-500' : 'text-slate-400'}`} />
                                </motion.div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// Evergreen Recycling: Content loop
export function EvergreenRecyclingAnimation() {
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setPhase(prev => (prev + 1) % 4);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    const positions = [
        { x: 0, y: 0 },      // Top
        { x: 100, y: 60 },   // Right
        { x: 0, y: 120 },    // Bottom
        { x: -100, y: 60 },  // Left
    ];

    return (
        <div className="relative w-full h-48 flex items-center justify-center">
            {/* Circular path */}
            <div className="absolute w-48 h-48 rounded-full border-2 border-dashed border-primary/30" />

            {/* Rotating content pieces */}
            {[0, 1, 2].map((index) => {
                const currentPhase = (phase + index) % 4;
                const pos = positions[currentPhase];

                return (
                    <motion.div
                        key={index}
                        className={`absolute w-12 h-12 rounded-lg shadow-lg flex items-center justify-center
                            ${index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-purple-500' : 'bg-pink-500'}`}
                        animate={{
                            x: pos.x,
                            y: pos.y,
                            rotate: currentPhase * 90,
                            scale: currentPhase % 2 === 0 ? 1.1 : 0.9
                        }}
                        transition={{ type: "spring", stiffness: 150, damping: 15 }}
                    >
                        <Calendar className="w-6 h-6 text-white" />
                    </motion.div>
                );
            })}

            {/* Center icon */}
            <motion.div
                className="relative z-10 w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
                <Repeat className="w-8 h-8 text-emerald-500" />
            </motion.div>

            {/* Performance indicator */}
            <motion.div
                className="absolute top-4 right-4 bg-green-500/20 rounded-full px-3 py-1"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs font-bold text-green-500">Top Posts</span>
                </div>
            </motion.div>
        </div>
    );
}

// Cross-Channel Performance: Data aggregation
export function CrossChannelAnimation() {
    const platforms = [
        { icon: Twitter, color: 'text-sky-400', bg: 'bg-sky-500/10' },
        { icon: Facebook, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { icon: Instagram, color: 'text-pink-500', bg: 'bg-pink-500/10' },
        { icon: Linkedin, color: 'text-blue-600', bg: 'bg-blue-600/10' }
    ];

    return (
        <div className="relative w-full h-48 flex items-center justify-center">
            {/* Center Aggregate Box */}
            <motion.div
                className="relative z-20 w-24 h-24 glass-card bg-primary/20 rounded-[2rem] flex flex-col items-center justify-center border-primary/30"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="text-[10px] font-bold text-primary/70 uppercase tracking-tighter">Total Reach</div>
                <div className="text-xl font-bold text-primary tracking-tight">1.2M</div>
                <Activity className="w-4 h-4 text-primary/50 mt-1" />
            </motion.div>

            {/* Orbiting Platforms feeding data */}
            {platforms.map((p, i) => {
                const angle = (i * 90) * (Math.PI / 180);
                const radius = 70;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                    <div key={i}>
                        <motion.div
                            className={`absolute ${p.bg} p-2.5 rounded-xl border border-white/5`}
                            animate={{
                                x: x,
                                y: y,
                                opacity: [0.6, 1, 0.6]
                            }}
                            transition={{ duration: 3 + i, repeat: Infinity }}
                        >
                            <p.icon className={`w-5 h-5 ${p.color}`} />
                        </motion.div>

                        {/* Data particles */}
                        <motion.div
                            className="absolute w-1 h-1 bg-primary rounded-full blur-[1px]"
                            animate={{
                                x: [x, 0],
                                y: [y, 0],
                                opacity: [0, 1, 0],
                                scale: [0.5, 1.2, 0.5]
                            }}
                            transition={{
                                duration: 1.5,
                                delay: i * 0.4,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    </div>
                );
            })}
        </div>
    );
}

// Competitor Benchmarking: Comparative race
export function CompetitorAnimation() {
    const competitors = [
        { label: 'You', color: 'bg-primary' },
        { label: 'Brand A', color: 'bg-slate-400 dark:bg-slate-600' },
        { label: 'Brand B', color: 'bg-slate-400 dark:bg-slate-700' }
    ];

    return (
        <div className="relative w-full h-48 flex flex-col justify-center px-8 space-y-4">
            {competitors.map((comp, i) => (
                <div key={comp.label} className="w-full">
                    <div className="flex justify-between items-center mb-1">
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${i === 0 ? 'text-primary' : 'text-slate-500'}`}>
                            {comp.label}
                        </span>
                        <motion.span
                            className="text-[10px] font-bold text-slate-500"
                            animate={i === 0 ? { opacity: [0.5, 1, 0.5] } : {}}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            {i === 0 ? '+42%' : '+12%'}
                        </motion.span>
                    </div>
                    <div className="h-2.5 w-full bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            className={`h-full rounded-full ${comp.color}`}
                            initial={{ width: '10%' }}
                            animate={{
                                width: i === 0 ? ['60%', '85%', '70%'] : ['30%', '45%', '40%']
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.2
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

// Custom Dashboards: Adaptive widgets
export function CustomDashboardAnimation() {
    const [layout, setLayout] = useState([0, 1, 2, 3]);

    useEffect(() => {
        const interval = setInterval(() => {
            setLayout(prev => [...prev].sort(() => Math.random() - 0.5));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const widgets = [
        { icon: BarChart2, title: 'Growth' },
        { icon: PieChart, title: 'Share' },
        { icon: TrendingUp, title: 'Reach' },
        { icon: Activity, title: 'Pulse' }
    ];

    return (
        <div className="relative w-full h-48 p-4">
            <div className="grid grid-cols-2 grid-rows-2 gap-3 h-full">
                {layout.map((id, index) => {
                    const W = widgets[id];
                    return (
                        <motion.div
                            key={id}
                            layout
                            className="glass-card bg-white/5 border border-white/5 rounded-2xl flex flex-col items-center justify-center p-3 relative overflow-hidden group"
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        >
                            <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <MousePointerClick className="w-3 h-3 text-primary/50" />
                            </div>
                            <W.icon className="w-6 h-6 text-primary/70 mb-1" />
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{W.title}</span>

                            {/* Accent line */}
                            <motion.div
                                className="absolute bottom-0 left-0 h-0.5 bg-primary"
                                initial={{ width: 0 }}
                                animate={{ width: '40%' }}
                                transition={{ duration: 1.5, repeat: Infinity, alternate: true }}
                            />
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

// Automated Reports: PDF delivery
export function AutomatedReportsAnimation() {
    return (
        <div className="relative w-full h-48 flex items-center justify-center">
            {/* Clock context */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/5 rounded-full">
                <Clock className="w-3 h-3 text-slate-500" />
                <span className="text-[9px] font-bold text-slate-500 uppercase">Every Monday @ 9AM</span>
            </div>

            {/* Path */}
            {/* Using a simple div since bg-dashed-gradient might not exist in utilities */}
            <div className="absolute w-40 h-[1px] border-t border-dashed border-white/10" />

            {/* Icons */}
            <div className="relative flex items-center justify-between w-48 px-4">
                <div className="bg-primary/10 p-3 rounded-2xl border border-primary/20">
                    <FileText className="w-8 h-8 text-primary" />
                </div>

                <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                    <Mail className="w-8 h-8 text-slate-500" />
                </div>

                {/* Flying PDF icon */}
                <motion.div
                    className="absolute left-12"
                    animate={{
                        x: [0, 120, 120],
                        opacity: [0, 1, 0],
                        scale: [0.5, 1, 0.5],
                        rotate: [0, 15, 0]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        times: [0, 0.7, 1]
                    }}
                >
                    <div className="bg-primary shadow-xl rounded-lg p-1.5 border border-white/20">
                        <FileText className="w-4 h-4 text-white" />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

// Post-Level Insights: Deep dive
export function PostLevelInsightsAnimation() {
    const [zoomed, setZoomed] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setZoomed(prev => !prev);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const stats = [
        { icon: TrendingUp, val: '8.2k', delay: 0 },
        { icon: Share2, val: '412', delay: 0.2 },
        { icon: Eye, val: '12k', delay: 0.4 }
    ];

    return (
        <div className="relative w-full h-48 flex items-center justify-center">
            <motion.div
                className="relative z-10 w-32 bg-white dark:bg-surface border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                animate={{
                    scale: zoomed ? 0.8 : 1,
                    x: zoomed ? -30 : 0
                }}
                transition={{ type: "spring", stiffness: 100 }}
            >
                {/* Visual "Image" area */}
                <div className="h-20 bg-gradient-to-br from-indigo-500 to-primary flex items-center justify-center">
                    <Image className="w-8 h-8 text-white/50" />
                </div>
                <div className="p-2.5 space-y-1.5">
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full" />
                    <div className="h-1.5 w-3/4 bg-slate-100 dark:bg-white/5 rounded-full" />
                </div>
            </motion.div>

            {/* Insights floating out */}
            <AnimatePresence>
                {zoomed && (
                    <div className="absolute right-12 z-20 space-y-2">
                        {stats.map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ delay: s.delay }}
                                className="flex items-center gap-2 bg-primary/20 backdrop-blur-md rounded-xl px-2.5 py-1.5 border border-primary/30"
                            >
                                <s.icon className="w-3.5 h-3.5 text-primary" />
                                <span className="text-[10px] font-bold text-primary">{s.val}</span>
                            </motion.div>
                        ))}
                    </div>
                )}
            </AnimatePresence>

            {/* Cursor */}
            <motion.div
                className="absolute z-30 text-white pointer-events-none"
                animate={{
                    x: zoomed ? [80, 20] : [20, 80],
                    y: zoomed ? [60, 20] : [20, 60]
                }}
                transition={{ duration: 1.5 }}
            >
                <MousePointerClick className="w-5 h-5 drop-shadow-lg" />
            </motion.div>
        </div>
    );
}

// Sharable Links: Live view generation
export function SharableLinksAnimation() {
    const [status, setStatus] = useState('idle');

    useEffect(() => {
        const sequence = async () => {
            await new Promise(r => setTimeout(r, 1000));
            setStatus('generating');
            await new Promise(r => setTimeout(r, 2000));
            setStatus('copied');
            await new Promise(r => setTimeout(r, 2000));
            setStatus('idle');
        };
        const interval = setInterval(sequence, 6000);
        sequence();
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-48 flex items-center justify-center border-t border-white/5 pt-4">
            {/* Generating visual */}
            <div className="relative w-56 h-12 bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl flex items-center px-4 overflow-hidden shadow-xl">
                <ExternalLink className="w-4 h-4 text-slate-400 mr-3" />
                <div className="flex-1 overflow-hidden">
                    <motion.div
                        className="text-[10px] text-slate-500 font-mono whitespace-nowrap"
                        animate={status === 'generating' ? { x: [0, -10, 0] } : {}}
                    >
                        highshift.io/live/analytics/v3_491...
                    </motion.div>
                </div>

                <motion.div
                    className={`ml-2 px-3 py-1 rounded-lg text-[10px] font-bold transition-all
                        ${status === 'copied' ? 'bg-emerald-500 text-white' : 'bg-primary/20 text-primary'}`}
                    animate={status === 'generating' ? { scale: [1, 0.95, 1] } : {}}
                >
                    {status === 'copied' ? 'Copied!' : 'Share Live'}
                </motion.div>

                {/* Shimmer on generate */}
                <AnimatePresence>
                    {status === 'generating' && (
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
                            initial={{ x: '-100%' }}
                            animate={{ x: '100%' }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                    )}
                </AnimatePresence>
            </div>

            {/* Success sparkles */}
            <AnimatePresence>
                {status === 'copied' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: [1, 0], scale: [1, 2], rotate: 180 }}
                        className="absolute text-emerald-400"
                    >
                        <Sparkles className="w-12 h-12" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Unified Social Inbox: Multi-source stream
export function UnifiedInboxAnimation() {
    return (
        <div className="relative w-full h-48 flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-[180px] space-y-2">
                {[
                    { plat: Twitter, col: 'text-sky-400', delay: 0 },
                    { plat: Facebook, col: 'text-blue-500', delay: 1 },
                    { plat: Instagram, col: 'text-pink-500', delay: 2 }
                ].map((m, i) => (
                    <motion.div
                        key={i}
                        className="bg-white/5 border border-white/5 p-2 rounded-xl flex items-center gap-3"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: m.delay, duration: 0.8, repeat: Infinity, repeatDelay: 2 }}
                    >
                        <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center">
                            <m.plat className={`w-3 h-3 ${m.col}`} />
                        </div>
                        <div className="h-2 w-16 bg-white/10 rounded-full" />
                    </motion.div>
                ))}
            </div>

            {/* Inbox icon backdrop */}
            <motion.div
                className="absolute right-4 top-1/2 -translate-y-1/2 opacity-10"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
            >
                <Inbox className="w-32 h-32 text-primary" />
            </motion.div>
        </div>
    );
}

// Automated Rules: Priority sorting
export function AutomatedRulesAnimation() {
    return (
        <div className="relative w-full h-48 flex items-center justify-center">
            <div className="flex items-center gap-12">
                <div className="relative">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20">
                        <Zap className="w-8 h-8 text-primary shadow-glow" />
                    </div>
                    {/* Incoming items */}
                    {[0, 1, 2].map(i => (
                        <motion.div
                            key={i}
                            className="absolute -left-12 top-6 w-3 h-3 bg-slate-400 rounded-full"
                            animate={{ x: [0, 60], opacity: [0, 1, 0] }}
                            transition={{ duration: 1.5, delay: i * 0.5, repeat: Infinity, ease: "linear" }}
                        />
                    ))}
                </div>

                <div className="space-y-4">
                    {['Urgent', 'Spam'].map((tag, i) => (
                        <motion.div
                            key={tag}
                            className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border
                                ${i === 0 ? 'bg-red-500/10 border-red-500/30 text-red-500' : 'bg-slate-500/10 border-slate-500/30 text-slate-500'}`}
                            animate={{ x: [0, 10, 0] }}
                            transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
                        >
                            {tag}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Team Calibration: Real-time presence
export function TeamCalibrationAnimation() {
    return (
        <div className="relative w-full h-48 flex items-center justify-center p-8">
            <div className="w-full max-w-[200px] bg-white/5 border border-white/5 rounded-2xl p-4 relative shadow-2xl">
                <div className="h-3 w-3/4 bg-white/10 rounded-full mb-3" />
                <div className="h-3 w-1/2 bg-white/10 rounded-full" />

                {/* User Indicators */}
                <div className="absolute -top-4 -right-2 flex -space-x-3">
                    {[
                        { col: 'bg-emerald-500', label: 'Sarah' },
                        { col: 'bg-amber-500', label: 'Mike' }
                    ].map((user, i) => (
                        <motion.div
                            key={i}
                            className={`${user.col} w-8 h-8 rounded-full border-2 border-black flex items-center justify-center relative group`}
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 2, delay: i * 1, repeat: Infinity }}
                        >
                            <span className="text-[8px] font-bold text-white">{user.label[0]}</span>
                            {/* Typing indicator */}
                            {i === 0 && (
                                <motion.div
                                    className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-lg"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                >
                                    <div className="flex gap-0.5">
                                        {[1, 2, 3].map(d => (
                                            <div key={d} className="w-0.5 h-0.5 bg-primary rounded-full" />
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
            <div className="absolute bottom-6 text-[10px] font-bold text-primary animate-pulse tracking-widest uppercase">
                2 teammates active
            </div>
        </div>
    );
}

// Saved Replies: Quick injections
export function SavedRepliesAnimation() {
    return (
        <div className="relative w-full h-48 flex items-center justify-center gap-6">
            <div className="w-32 bg-white/5 border border-white/5 rounded-xl p-3 space-y-2">
                {['Hi there!', 'Thanks!', 'Refund...'].map((txt, i) => (
                    <motion.div
                        key={i}
                        className="p-1 px-2 bg-white/5 hover:bg-primary/20 rounded-md text-[8px] text-slate-400 cursor-pointer overflow-hidden border border-transparent hover:border-primary/30 transition-all font-bold uppercase"
                        animate={i === 1 ? { background: ['rgba(255,255,255,0.05)', 'rgba(16,185,129,0.2)', 'rgba(255,255,255,0.05)'] } : {}}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        {txt}
                    </motion.div>
                ))}
            </div>

            <div className="flex flex-col items-center">
                <motion.div
                    animate={{ x: [-20, 0], opacity: [0, 1] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 0.5 }}
                >
                    <ArrowRight className="w-5 h-5 text-primary mb-2" />
                </motion.div>
                <div className="w-24 h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center p-2">
                    <motion.div
                        className="h-1.5 w-full bg-primary/50 rounded-full"
                        animate={{ width: ['0%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5 }}
                    />
                </div>
            </div>
        </div>
    );
}

// Sentiment Analysis: AI emotion detection
export function SentimentAnalysisAnimation() {
    const [score, setScore] = useState(0.8); // 0 to 1

    useEffect(() => {
        const interval = setInterval(() => {
            setScore(Math.random());
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const getColor = () => {
        if (score > 0.6) return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
        if (score < 0.3) return 'text-red-500 bg-red-500/10 border-red-500/20';
        return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
    };

    return (
        <div className="relative w-full h-48 flex flex-col items-center justify-center p-8">
            <motion.div
                className={`w-full max-w-[220px] p-4 rounded-2xl border transition-colors duration-1000 ${getColor()}`}
            >
                <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest">Incoming Message</span>
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1 }}
                    >
                        <Smile className="w-5 h-5" />
                    </motion.div>
                </div>
                <div className="space-y-2">
                    <div className={`h-2 rounded-full opacity-30 ${score > 0.6 ? 'bg-emerald-500' : score < 0.3 ? 'bg-red-500' : 'bg-amber-500'}`} style={{ width: '90%' }} />
                    <div className={`h-2 rounded-full opacity-30 ${score > 0.6 ? 'bg-emerald-500' : score < 0.3 ? 'bg-red-500' : 'bg-amber-500'}`} style={{ width: '60%' }} />
                </div>
            </motion.div>

            <div className="mt-4 flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Analysis:</span>
                <span className={`text-[10px] font-bold uppercase tracking-tighter ${getColor().split(' ')[0]}`}>
                    {score > 0.6 ? 'Positive' : score < 0.3 ? 'Negative' : 'Neutral'}
                </span>
            </div>
        </div>
    );
}

// Smart Filtering: Focus views
export function SmartFilteringAnimation() {
    return (
        <div className="relative w-full h-48 flex items-center justify-center gap-8">
            <div className="relative w-24 h-24 flex items-center justify-center">
                <Filter className="w-16 h-16 text-slate-500/20" />

                {/* Flowing items */}
                {[0, 1, 2, 3].map(i => (
                    <motion.div
                        key={i}
                        className={`absolute w-3 h-3 rounded-full 
                            ${i % 2 === 0 ? 'bg-primary' : 'bg-slate-500'}`}
                        animate={{
                            x: [-60, 0, 60],
                            y: [0, 0, i % 2 === 0 ? -40 : 40],
                            opacity: [0, 1, 0]
                        }}
                        transition={{ duration: 2, delay: i * 0.5, repeat: Infinity, ease: "linear" }}
                    />
                ))}
            </div>

            <div className="space-y-4">
                <div className="text-center">
                    <div className="text-[8px] font-bold text-slate-500 uppercase mb-1">Priority View</div>
                    <motion.div
                        className="w-16 h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Zap className="w-5 h-5 text-primary" />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
