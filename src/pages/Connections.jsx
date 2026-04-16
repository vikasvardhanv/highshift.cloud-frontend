import { useEffect, useState } from 'react';
import { getAccounts, getAuthUrl, disconnectAccount, getProfiles, createProfile } from '../services/api';
import {
    Facebook, Twitter, Instagram, Linkedin, Youtube, Music,
    Trash2, Plus, Loader2, Globe, CheckCircle2, AlertCircle, ArrowRight, X, User, ChevronRight, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PLATFORMS = [
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-500', bg: 'bg-pink-500/10' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'text-blue-600', bg: 'bg-blue-600/10' },
    { id: 'twitter', name: 'X / Twitter', icon: Twitter, color: 'text-white', bg: 'bg-white/10' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'text-red-600', bg: 'bg-red-600/10' },
];

export default function Connections() {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [isCreatingProfile, setIsCreatingProfile] = useState(false);
    const [newProfileName, setNewProfileName] = useState('');
    const [showPlatformSelect, setShowPlatformSelect] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await getProfiles();
            setProfiles(data || []);
            if (data && data.length > 0 && !selectedProfile) {
                // Keep current selection if refreshing
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateProfile = async () => {
        if (!newProfileName.trim()) return;
        setLoading(true);
        try {
            await createProfile(newProfileName);
            setNewProfileName('');
            setIsCreatingProfile(false);
            await loadData();
        } catch (err) {
            alert('Failed to create profile');
        } finally {
            setLoading(false);
        }
    };

    const startAuth = async (platformId) => {
        if (!selectedProfile) return;
        try {
            const data = await getAuthUrl(platformId, window.location.origin + '/auth/callback', selectedProfile.id);
            if (data.authUrl) {
                window.location.href = data.authUrl;
            }
        } catch (err) {
            alert('Failed to start authentication');
        }
    };

    const handleDisconnect = async (platform, accountId) => {
        if (!confirm("Disconnect this account?")) return;
        try {
            await disconnectAccount(platform, accountId);
            await loadData();
        } catch (err) {
            alert('Failed to disconnect');
        }
    };

    if (loading && profiles.length === 0) {
        return <div className="min-h-screen bg-slate-50 flex items-center justify-center"><Loader2 className="animate-spin text-indigo-600 w-10 h-10" /></div>;
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 p-8">
            <div className="max-w-6xl mx-auto space-y-12">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-2 text-slate-900">Social Connections</h1>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Profile-Based Account Orchestration</p>
                    </div>
                    <button 
                        onClick={() => setIsCreatingProfile(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-white text-black font-black uppercase italic tracking-tighter rounded-xl hover:bg-slate-200 transition-all active:scale-95 shadow-xl shadow-white/5"
                    >
                        <Plus className="w-5 h-5" /> New Profile
                    </button>
                </div>

                {/* Main View: Profile Selection or Account Management */}
                <div className="grid lg:grid-cols-[350px,1fr] gap-12">
                    
                    {/* Left: Profiles List */}
                    <div className="space-y-4">
                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Select Profile</h3>
                        {profiles.map(p => (
                            <button
                                key={p.id}
                                onClick={() => { setSelectedProfile(p); setShowPlatformSelect(false); }}
                                className={`w-full group relative flex items-center justify-between p-6 rounded-2xl border transition-all overflow-hidden ${selectedProfile?.id === p.id ? 'bg-indigo-600 border-indigo-600 shadow-2xl shadow-indigo-600/20' : 'bg-white border-slate-200 hover:border-indigo-300'}`}
                            >
                                <div className="flex items-center gap-4 relative z-10">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black italic text-xl ${selectedProfile?.id === p.id ? 'bg-white text-indigo-600' : 'bg-white/10 text-white'}`}>
                                        {p.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="text-left">
                                        <div className="font-black italic uppercase tracking-tighter text-lg">{p.name}</div>
                                        <div className={`text-[10px] font-bold uppercase tracking-widest ${selectedProfile?.id === p.id ? 'text-indigo-200' : 'text-slate-500'}`}>
                                            {p.accounts?.length || 0} Accounts
                                        </div>
                                    </div>
                                </div>
                                <ChevronRight className={`w-5 h-5 relative z-10 transition-transform ${selectedProfile?.id === p.id ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100'}`} />
                                {selectedProfile?.id === p.id && (
                                    <motion.div layoutId="profile-bg" className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-700" />
                                )}
                            </button>
                        ))}

                        {profiles.length === 0 && !isCreatingProfile && (
                            <div className="p-12 text-center bg-white/5 border border-dashed border-white/10 rounded-2xl">
                                <User className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No Profiles Found</p>
                            </div>
                        )}
                    </div>

                    {/* Right: Profile Details & Account Linking */}
                    <div className="min-h-[500px]">
                        <AnimatePresence mode="wait">
                            {selectedProfile ? (
                                <motion.div 
                                    key={selectedProfile.id}
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                    className="space-y-8"
                                >
                                    {/* Selected Profile Header */}
                                    <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 relative overflow-hidden shadow-sm">
                                        <div className="absolute top-0 right-0 p-10 opacity-5">
                                            <Zap className="w-48 h-48 text-indigo-600 fill-indigo-600" />
                                        </div>
                                        
                                        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                                            <div className="space-y-2">
                                                <h2 className="text-5xl font-black italic uppercase tracking-tighter text-slate-900">{selectedProfile.name}</h2>
                                                <p className="text-slate-500 font-medium">Orchestrate social flows for this profile</p>
                                            </div>
                                            <button 
                                                onClick={() => setShowPlatformSelect(!showPlatformSelect)}
                                                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase italic tracking-tighter rounded-2xl shadow-2xl shadow-indigo-600/30 transition-all active:scale-95 flex items-center gap-3"
                                            >
                                                {showPlatformSelect ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                                {showPlatformSelect ? 'Cancel' : 'Link Social Account'}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Action: Platform Select Grid */}
                                    {showPlatformSelect && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                            className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4"
                                        >
                                            {PLATFORMS.map(p => (
                                                <button
                                                    key={p.id}
                                                    onClick={() => startAuth(p.id)}
                                                    className="group flex flex-col items-center justify-center p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/[0.07] transition-all"
                                                >
                                                    <div className={`w-16 h-16 rounded-2xl ${p.bg} flex items-center justify-center mb-6 ${p.color} group-hover:scale-110 transition-transform`}>
                                                        <p.icon className="w-8 h-8" />
                                                    </div>
                                                    <span className="font-black italic uppercase tracking-tighter text-sm">{p.name}</span>
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}

                                    {/* Connected Accounts List */}
                                    <div className="space-y-4">
                                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Connected Accounts</h3>
                                        {(!selectedProfile.accounts || selectedProfile.accounts.length === 0) ? (
                                            <div className="p-20 text-center bg-white/5 rounded-3xl border border-white/5">
                                                <Globe className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                                                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No Accounts Linked</p>
                                                <p className="text-slate-600 text-xs mt-2">Link your first account to start publishing</p>
                                            </div>
                                        ) : (
                                            <div className="grid gap-4">
                                                {selectedProfile.accounts.map(acc => {
                                                    const platformCfg = PLATFORMS.find(p => p.id === acc.platform);
                                                    const Icon = platformCfg?.icon || Globe;
                                                    return (
                                                        <div 
                                                            key={acc.accountId}
                                                            className="flex items-center justify-between p-6 bg-white rounded-2xl border border-slate-100 group hover:border-indigo-200 transition-all shadow-sm"
                                                        >
                                                            <div className="flex items-center gap-4">
                                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${platformCfg?.bg || 'bg-white/10'} ${platformCfg?.color || 'text-white'}`}>
                                                                    <Icon className="w-6 h-6" />
                                                                </div>
                                                                <div>
                                                                    <div className="font-black italic uppercase tracking-tighter text-lg">@{acc.username}</div>
                                                                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{acc.platform}</div>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-4">
                                                                <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
                                                                    <CheckCircle2 className="w-3 h-3" /> Live
                                                                </span>
                                                                <button 
                                                                    onClick={() => handleDisconnect(acc.platform, acc.accountId)}
                                                                    className="p-3 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-all text-slate-500"
                                                                >
                                                                    <Trash2 className="w-5 h-5" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="h-full flex items-center justify-center p-20 text-center bg-white rounded-[3rem] border border-dashed border-slate-200 shadow-sm">
                                    <div className="space-y-6">
                                        <div className="w-24 h-24 bg-slate-50 border border-slate-100 rounded-[2rem] flex items-center justify-center mx-auto scale-110">
                                            <User className="w-10 h-10 text-slate-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-2 text-slate-800">Select a Profile</h3>
                                            <p className="text-slate-500 font-medium max-w-xs mx-auto">Click a profile on the left to manage its social accounts or create a new one.</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>
            </div>

            {/* Create Profile Modal */}
            <AnimatePresence>
                {isCreatingProfile && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                            className="bg-black border border-white/10 p-12 rounded-[3.5rem] max-w-xl w-full text-center relative shadow-2xl shadow-indigo-600/10"
                        >
                            <button onClick={() => setIsCreatingProfile(false)} className="absolute top-8 right-8 text-slate-500 hover:text-white"><X className="w-8 h-8" /></button>
                            
                            <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-indigo-600/20">
                                <Plus className="w-10 h-10 text-white" />
                            </div>
                            
                            <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-4">Create Profile</h2>
                            <p className="text-slate-500 font-medium mb-10">Profiles group your social accounts for seamless brand management.</p>
                            
                            <input 
                                autoFocus type="text" value={newProfileName} onChange={(e) => setNewProfileName(e.target.value)}
                                placeholder="e.g. Acme Tech or Client A"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-6 text-2xl font-black italic uppercase italic tracking-tighter focus:outline-none focus:border-indigo-500 transition-all mb-8 text-center"
                                onKeyDown={(e) => e.key === 'Enter' && handleCreateProfile()}
                            />
                            
                            <button 
                                onClick={handleCreateProfile}
                                disabled={!newProfileName.trim() || loading}
                                className="w-full bg-white text-black py-6 rounded-2xl font-black italic uppercase italic tracking-tighter text-xl shadow-2xl shadow-white/10 hover:bg-slate-200 transition-all active:scale-95 disabled:opacity-50"
                            >
                                {loading ? <Loader2 className="w-8 h-8 animate-spin mx-auto" /> : 'Create Profile'}
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
