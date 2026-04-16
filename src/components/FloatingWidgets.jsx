import { motion } from 'framer-motion';
import { TrendingUp, MessageCircle, Heart, Share2, Sparkles, BarChart2, Star } from 'lucide-react';

export function SentimentCard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="absolute bottom-10 left-[-20px] md:left-[-60px] bg-white dark:bg-surface/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-white/10 w-64 z-20"
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Sentiment Trends</h4>
                    <span className="text-xs text-slate-500">Last 24 Hours</span>
                </div>
                <div className="p-1.5 bg-green-500/10 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
            </div>
            {/* Mock Chart */}
            <div className="h-16 flex items-end gap-1 mb-3">
                {[40, 65, 45, 80, 55, 70, 60, 85].map((h, i) => (
                    <div key={i} className="flex-1 bg-gradient-to-t from-primary/20 to-primary rounded-t-sm" style={{ height: `${h}%` }} />
                ))}
            </div>
            <div className="flex items-center gap-2 bg-slate-50 dark:bg-white/5 p-2 rounded-xl">
                <div className="flex text-yellow-400">
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                </div>
                <span className="text-xs font-bold text-slate-700 dark:text-white">4.9/5</span>
            </div>
        </motion.div>
    );
}

export function SocialPostCard() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute top-10 left-[-30px] md:left-[-80px] bg-white dark:bg-surface/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-white/10 w-56 z-20"
        >
            <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-500 p-0.5">
                    <div className="w-full h-full rounded-full bg-white dark:bg-black border-2 border-transparent relative overflow-hidden">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
                    </div>
                </div>
                <div>
                    <div className="h-2 w-20 bg-slate-200 dark:bg-white/20 rounded-full mb-1" />
                    <div className="h-1.5 w-12 bg-slate-100 dark:bg-white/10 rounded-full" />
                </div>
            </div>
            <div className="space-y-2 mb-4">
                <div className="h-24 bg-slate-100 dark:bg-white/5 rounded-xl flex items-center justify-center overflow-hidden relative">
                    <span className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
                    <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=300&q=80" alt="Post" className="w-full h-full object-cover opacity-80" />
                </div>
            </div>
            <div className="flex justify-between px-1">
                <div className="flex gap-3">
                    <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                    <MessageCircle className="w-4 h-4 text-slate-400" />
                </div>
                <Share2 className="w-4 h-4 text-slate-400" />
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-white/5 flex justify-between text-xs">
                <div>
                    <span className="block font-bold text-slate-900 dark:text-white">437</span>
                    <span className="text-slate-400">Impressions</span>
                </div>
                <div className="text-right">
                    <span className="block font-bold text-green-500">+12%</span>
                    <span className="text-slate-400">Engagement</span>
                </div>
            </div>
        </motion.div>
    );
}

export function AiAssistCard() {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="absolute bottom-20 right-[-20px] md:right-[-40px] bg-white dark:bg-surface/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-white/10 w-64 z-20"
        >
            <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-purple-500/10 rounded-lg">
                    <Sparkles className="w-4 h-4 text-purple-500" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Suggestions by AI Assist</h4>
            </div>
            <div className="space-y-2">
                <div className="bg-slate-50 dark:bg-white/5 p-2 rounded-lg text-xs text-slate-600 dark:text-gray-300">
                    "Excited to launch our new product line! 🚀 #Innovation"
                </div>
                <div className="bg-purple-50 dark:bg-purple-500/10 p-2 rounded-lg text-xs text-purple-700 dark:text-purple-300 border border-purple-100 dark:border-purple-500/20">
                    "Launch day is here! 🚀 Discover the future of #Innovation with our latest release."
                </div>
            </div>
            <button className="w-full mt-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-bold text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 transition-colors">
                Generate Variation
            </button>
        </motion.div>
    );
}

export function StatsCard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="absolute top-20 right-[-30px] md:right-[-60px] bg-emerald-400 text-slate-900 p-3 rounded-full shadow-lg flex items-center gap-3 z-20 pr-5"
        >
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <BarChart2 className="w-4 h-4 text-slate-900" />
            </div>
            <div>
                <span className="block text-xs font-semibold opacity-80">Total Revenue</span>
                <span className="block text-sm font-bold">$476,697.04</span>
            </div>
        </motion.div>
    );
}
