import { useState, useEffect } from 'react';
import {
    Users, Plus, Loader2, Zap, Send, Calendar, BarChart3,
    Video, MessageCircle, Play, Bookmark, MoreVertical,
    CheckCircle2, Search, Filter, ArrowUpRight,
    Facebook, Twitter, Instagram, Linkedin, Youtube, Globe
} from 'lucide-react';
import { getAccounts } from '../../services/api';
import { motion } from 'framer-motion';

export default function MediaFeed() {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCreator, setSelectedCreator] = useState(null);

    const getPlatformIcon = (platform) => {
        switch (platform?.toLowerCase()) {
            case 'facebook': return <Facebook className="w-4 h-4 text-blue-600" />;
            case 'twitter': return <Twitter className="w-4 h-4 text-sky-500" />;
            case 'instagram': return <Instagram className="w-4 h-4 text-pink-500" />;
            case 'linkedin': return <Linkedin className="w-4 h-4 text-blue-700" />;
            case 'youtube': return <Youtube className="w-4 h-4 text-red-600" />;
            default: return <Globe className="w-4 h-4 text-slate-500" />;
        }
    };

    // Simulated media data for the UI
    const mediaItems = [
        {
            id: 1,
            type: 'video',
            thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=800&q=80',
            title: 'AI Ads Strategy',
            views: '4.5M',
            likes: '88.5K',
            comments: '6.1K',
            creator: '@rourkeheath',
            creatorAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80'
        },
        {
            id: 2,
            type: 'image',
            thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80',
            title: 'Photoshop Update is INSANE',
            views: '262.6K',
            likes: '10.1K',
            comments: '1.3K',
            creator: '@sebastienjeffries',
            creatorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'
        }
    ];

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await getAccounts();
            setAccounts(data?.accounts || []);
            setLoading(false);
        } catch (err) {
            console.error("Failed to load accounts", err);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
                <Loader2 className="animate-spin text-indigo-500 w-8 h-8" />
            </div>
        );
    }

    return (
        <div className="h-[calc(100vh-140px)] flex gap-6 overflow-hidden max-w-[1600px] mx-auto">
            {/* LEFT COLUMN: Creator Management */}
            <div className="w-[380px] flex flex-col gap-6 shrink-0">

                {/* Add Creator Input */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
                    <div className="flex items-center gap-2 mb-4 text-slate-400 text-sm font-medium">
                        <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                        Add Instagram Creator
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Enter Instagram username..."
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 px-4 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600"
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-slate-700 hover:bg-indigo-600 rounded-lg text-slate-300 hover:text-white transition-colors">
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Tracked Creators List */}
                <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col overflow-hidden">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-slate-200 font-semibold flex items-center gap-2">
                            <Users className="w-4 h-4 text-slate-500" />
                            Tracked Creators ({accounts.length})
                        </h3>
                    </div>

                    <div className="flex items-center justify-between mb-4 bg-slate-800/30 p-2 rounded-lg border border-slate-800">
                        <div className="flex items-center gap-3">
                            <button className="text-xs font-medium text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-md border border-slate-700 transition-all">
                                Select All
                            </button>
                            <span className="text-[10px] text-slate-500">2 of 19 selected</span>
                        </div>
                        <button className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-lg shadow-indigo-600/20 transition-all">
                            Get Reels
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                        {accounts.map((account) => (
                            <motion.div
                                key={account.accountId}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`group p-3 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${selectedCreator === account.accountId
                                    ? 'bg-indigo-500/10 border-indigo-500/50'
                                    : 'bg-slate-800/30 border-slate-800 hover:border-slate-700'
                                    }`}
                                onClick={() => setSelectedCreator(account.accountId)}
                            >
                                <div className="flex items-center gap-3 relative z-10">
                                    <div className="relative">
                                        <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden ring-2 ring-slate-800">
                                            <img
                                                src={account.rawProfile?.data?.profile_image_url || `https://ui-avatars.com/api/?name=${account.username}&background=random`}
                                                alt={account.username}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-indigo-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
                                            <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-1.5 mb-0.5">
                                            {getPlatformIcon(account.platform)}
                                            <h4 className="text-sm font-bold text-slate-200 truncate">
                                                {account.displayName || account.username || 'Page Name'}
                                            </h4>
                                        </div>
                                        <p className="text-[10px] text-slate-500 truncate ml-5.5">
                                            @{account.username}
                                        </p>
                                    </div>
                                </div>

                                {/* Hover Actions */}
                                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="text-slate-500 hover:text-red-400 transition-colors">
                                        <MoreVertical className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN: Media Feed */}
            <div className="flex-1 bg-slate-950 rounded-3xl overflow-hidden flex flex-col">
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-full">
                        {mediaItems.map((item) => (
                            <div key={item.id} className="relative group rounded-2xl overflow-hidden aspect-[9/16] bg-slate-900 border border-slate-800 shadow-2xl">
                                {/* Media Background */}
                                <img
                                    src={item.thumbnail}
                                    alt={item.title}
                                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50"></div>

                                {/* Top Actions */}
                                <div className="absolute top-4 left-4 z-20">
                                    <button className="p-2 bg-slate-900/50 backdrop-blur-md rounded-full text-white/70 hover:text-white hover:bg-indigo-600 transition-all">
                                        <Bookmark className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="absolute top-4 right-4 z-20">
                                    <button className="p-2 bg-slate-900/50 backdrop-blur-md rounded-full text-white/70 hover:text-white transition-all">
                                        <Video className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Center Content (Title overlay) */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 duration-300">
                                    <h3 className="text-3xl font-black text-white leading-tight drop-shadow-2xl mb-4" style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '1px' }}>
                                        {item.title}
                                    </h3>
                                    <button className="flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-bold hover:bg-white hover:text-indigo-900 transition-all">
                                        <Zap className="w-4 h-4 fill-current" />
                                        Harmonize
                                    </button>
                                </div>

                                {/* Bottom Info */}
                                <div className="absolute bottom-0 left-0 w-full p-5 z-20 bg-slate-900/90 backdrop-blur-xl border-t border-white/5 transform translate-y-0 transition-transform">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <img src={item.creatorAvatar} className="w-8 h-8 rounded-full border border-white/10" alt="Avatar" />
                                            <div>
                                                <p className="text-xs font-bold text-white">{item.creator}</p>
                                                <p className="text-[10px] text-slate-400">09/08/2026</p>
                                            </div>
                                        </div>
                                        <button className="text-slate-400 hover:text-white">
                                            <ArrowUpRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <p className="text-xs text-slate-300 line-clamp-2 mb-3 leading-relaxed">
                                        How to create AI Videos for your brand or business 💥 #MagnificAI #KlingAI
                                    </p>

                                    <div className="flex items-center justify-between text-[11px] font-medium text-slate-400 border-t border-white/5 pt-3">
                                        <div className="flex gap-4">
                                            <span className="flex items-center gap-1"><Play className="w-3 h-3" /> {item.views}</span>
                                            <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> {item.likes}</span>
                                            <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" /> {item.comments}</span>
                                        </div>
                                        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide flex items-center gap-1.5 transition-colors">
                                            <CheckCircle2 className="w-3 h-3" /> Transcribe
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
