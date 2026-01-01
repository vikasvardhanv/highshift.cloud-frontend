import { useEffect, useState, useRef } from 'react';
import { getAccounts, getAuthUrl, postContent, disconnectAccount, uploadAndPost, getProfiles, createProfile } from '../services/api';
import {
    Facebook, Twitter, Instagram, Linkedin, Youtube,
    Send, Trash2, Check, Sparkles, X, Zap,
    AtSign, Pin, MessageSquare, Cloud, Music, Plus, Calendar, Clock, Loader2, AlertCircle, CheckCircle,
    Upload, Link2, FileText, Image as ImageIcon, ChevronDown, User
} from 'lucide-react';
import { generateContent, schedulePost } from '../services/api';

const PLATFORMS = [
    { id: 'twitter', name: 'Twitter / X', icon: Twitter, color: 'hover:text-sky-400' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'hover:text-blue-500' },
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'hover:text-pink-500' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'hover:text-blue-600' },
    { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'hover:text-red-500' },
    { id: 'threads', name: 'Threads', icon: AtSign, color: 'hover:text-white' },
    { id: 'pinterest', name: 'Pinterest', icon: Pin, color: 'hover:text-red-600' },
    { id: 'reddit', name: 'Reddit', icon: MessageSquare, color: 'hover:text-orange-500' },
    { id: 'bluesky', name: 'Bluesky', icon: Cloud, color: 'hover:text-blue-400' },
    { id: 'tiktok', name: 'TikTok', icon: Music, color: 'hover:text-pink-400' },
];

const UPLOAD_METHODS = [
    { id: 'text', label: 'Text Only', icon: FileText },
    { id: 'url', label: 'Media URL', icon: Link2 },
    { id: 'file', label: 'Upload File', icon: Upload },
];

export default function Dashboard() {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [apiKey] = useState(localStorage.getItem('social_api_key'));
    const [postText, setPostText] = useState('');
    const [posting, setPosting] = useState(false);
    const [selectedAccounts, setSelectedAccounts] = useState([]);
    const [postResult, setPostResult] = useState(null);
    const [aiPrompt, setAiPrompt] = useState('');
    const [showAiModal, setShowAiModal] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [showConnect, setShowConnect] = useState(false);
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [scheduledTime, setScheduledTime] = useState('');

    // NEW: Upload method state
    const [uploadMethod, setUploadMethod] = useState('text');
    const [mediaUrls, setMediaUrls] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const fileInputRef = useRef(null);

    // NEW: Profile state
    const [profiles, setProfiles] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState('all');
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [newProfileName, setNewProfileName] = useState('');
    const [showNewProfile, setShowNewProfile] = useState(false);

    useEffect(() => {
        if (apiKey) {
            loadAccounts();
            loadProfiles();
        } else {
            setLoading(false);
        }
    }, [apiKey]);

    const loadProfiles = async () => {
        try {
            const data = await getProfiles();
            setProfiles(data || []);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCreateProfile = async () => {
        if (!newProfileName.trim()) return;
        try {
            await createProfile(newProfileName.trim());
            setNewProfileName('');
            setShowNewProfile(false);
            await loadProfiles();
        } catch (err) {
            alert(err.response?.data?.detail || 'Failed to create profile');
        }
    };

    const loadAccounts = async () => {
        try {
            const data = await getAccounts();
            if (data && Array.isArray(data.accounts)) {
                setAccounts(data.accounts);
            } else {
                setAccounts([]);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleConnect = async (platformId) => {
        try {
            const url = await getAuthUrl(platformId, import.meta.env.VITE_CLIENT_REDIRECT || 'http://localhost:5173/auth/callback');
            window.location.href = url;
        } catch (err) {
            alert('Failed to get auth URL: ' + err.message);
        }
    };

    const handleDisconnect = async (platform, accountId) => {
        if (!confirm("Are you sure you want to disconnect this account?")) return;
        try {
            await disconnectAccount(platform, accountId);
            await loadAccounts();
        } catch (err) {
            alert('Failed to disconnect');
        }
    }

    const handlePost = async () => {
        if (!postText) return;
        if (selectedAccounts.length === 0) return alert('Select at least one account');

        setPosting(true);
        setPostResult(null);

        const targetAccounts = accounts.filter(a => selectedAccounts.includes(a.accountId))
            .map(a => ({ platform: a.platform, accountId: a.accountId }));

        try {
            let res;

            if (uploadMethod === 'file' && selectedFiles.length > 0) {
                // Use file upload endpoint
                res = await uploadAndPost(targetAccounts, postText, selectedFiles, []);
            } else if (uploadMethod === 'url' && mediaUrls.trim()) {
                // Use URL-based upload
                const urls = mediaUrls.split(',').map(u => u.trim()).filter(u => u);
                res = await uploadAndPost(targetAccounts, postText, [], urls);
            } else {
                // Text-only post
                res = await postContent(targetAccounts, postText);
            }

            setPostResult({ success: true, data: res });
            setPostText('');
            setSelectedAccounts([]);
            setMediaUrls('');
            setSelectedFiles([]);
            setTimeout(() => setPostResult(null), 5000);
        } catch (err) {
            setPostResult({ success: false, error: err.response?.data?.message || err.message });
        } finally {
            setPosting(false);
        }
    };

    const toggleAccountSelection = (id) => {
        if (selectedAccounts.includes(id)) {
            setSelectedAccounts(selectedAccounts.filter(a => a !== id));
        } else {
            setSelectedAccounts([...selectedAccounts, id]);
        }
    };

    const handleAiGenerate = async () => {
        if (!aiPrompt) return;
        setGenerating(true);
        try {
            const result = await generateContent(aiPrompt, 'twitter', 'Professional');
            setPostText(result);
            setShowAiModal(false);
            setAiPrompt('');
        } catch (err) {
            alert('Failed to generate content: ' + err.message);
        } finally {
            setGenerating(false);
        }
    };

    const openAiModal = () => {
        setAiPrompt(postText ? `Optimize this post for better engagement:\n\n"${postText}"` : '');
        setShowAiModal(true);
    };

    const calculateSmartTime = () => {
        // Simple "Smart" Logic: Tomorrow at 10 AM, or next weekday if weekend?
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(10, 0, 0, 0);

        // Format for datetime-local: YYYY-MM-DDTHH:mm
        const yyyy = tomorrow.getFullYear();
        const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const dd = String(tomorrow.getDate()).padStart(2, '0');
        const hh = String(tomorrow.getHours()).padStart(2, '0');
        const min = String(tomorrow.getMinutes()).padStart(2, '0');

        return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
    }

    const openScheduleModal = (isSmart = false) => {
        if (!postText) return alert('Please add content first');
        if (selectedAccounts.length === 0) return alert('Select at least one account');

        if (isSmart) {
            setScheduledTime(calculateSmartTime());
        } else {
            // Default to now + 1 hour
            const now = new Date();
            now.setHours(now.getHours() + 1);
            // Format...
            const yyyy = now.getFullYear();
            const mm = String(now.getMonth() + 1).padStart(2, '0');
            const dd = String(now.getDate()).padStart(2, '0');
            const hh = String(now.getHours()).padStart(2, '0');
            const min = String(now.getMinutes()).padStart(2, '0');
            setScheduledTime(`${yyyy}-${mm}-${dd}T${hh}:${min}`);
        }
        setShowScheduleModal(true);
    }

    const confirmSchedule = async () => {
        setPosting(true);
        try {
            const targetAccounts = accounts.filter(a => selectedAccounts.includes(a.accountId))
                .map(a => ({ platform: a.platform, accountId: a.accountId }));

            // Convert local time to ISO with timezone if possible, or just send ISO
            const dateObj = new Date(scheduledTime);

            await schedulePost(targetAccounts, postText, dateObj.toISOString());
            setPostResult({ success: true, message: `Scheduled for ${dateObj.toLocaleString()}` });
            setPostText('');
            setSelectedAccounts([]);
            setShowScheduleModal(false);
            setTimeout(() => setPostResult(null), 5000);
        } catch (err) {
            setPostResult({ success: false, error: err.message });
        } finally {
            setPosting(false);
        }
    }


    if (!apiKey) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4 animate-slide-up">
                <div className="absolute top-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-[100px] -z-10 animate-blob mix-blend-screen" />
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -z-10 animate-blob animation-delay-2000 mix-blend-screen" />

                <h2 className="text-4xl md:text-5xl font-bold mb-6 aurora-text">Welcome to HighShift</h2>
                <p className="text-gray-400 mb-10 max-w-md mx-auto text-lg leading-relaxed">
                    The unified operating system for your social presence.
                    <br />Connect an account to begin.
                </p>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-2xl">
                    {PLATFORMS.slice(0, 6).map(p => (
                        <button
                            key={p.id}
                            onClick={() => handleConnect(p.id)}
                            className="group glass-card hover:bg-surfaceHighlight p-6 rounded-2xl flex flex-col items-center justify-center gap-4 transition-all hover:-translate-y-1"
                        >
                            <p.icon className={`w-8 h-8 text-gray-400 transition-colors ${p.color} group-hover:scale-110`} />
                            <span className="font-medium">{p.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-8 animate-fade-in relative z-10">
            {/* Ambient Background Elements */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white mb-1">Command Center</h1>
                    <p className="text-gray-400 text-sm">Overview of your social ecosystem</p>
                </div>

                {/* Profile Selector */}
                <div className="relative">
                    <button
                        onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                    >
                        <User className="w-4 h-4 text-secondary" />
                        <span className="font-medium">{selectedProfile === 'all' ? 'All Accounts' : selectedProfile}</span>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showProfileDropdown ? 'rotate-180' : ''}`} />
                    </button>

                    {showProfileDropdown && (
                        <div className="absolute right-0 mt-2 w-56 bg-surface border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden animate-fade-in">
                            <button
                                onClick={() => { setSelectedProfile('all'); setShowProfileDropdown(false); }}
                                className={`w-full text-left px-4 py-3 hover:bg-white/5 transition-colors ${selectedProfile === 'all' ? 'bg-primary/10 text-primary' : ''}`}
                            >
                                All Accounts
                            </button>
                            {profiles.map(p => (
                                <button
                                    key={p.name}
                                    onClick={() => { setSelectedProfile(p.name); setShowProfileDropdown(false); }}
                                    className={`w-full text-left px-4 py-3 hover:bg-white/5 transition-colors ${selectedProfile === p.name ? 'bg-primary/10 text-primary' : ''}`}
                                >
                                    {p.name}
                                </button>
                            ))}
                            <div className="border-t border-white/10">
                                {showNewProfile ? (
                                    <div className="p-3 flex gap-2">
                                        <input
                                            type="text"
                                            value={newProfileName}
                                            onChange={(e) => setNewProfileName(e.target.value)}
                                            placeholder="Profile name"
                                            className="flex-1 bg-black/30 border border-white/10 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-primary"
                                            autoFocus
                                            onKeyDown={(e) => e.key === 'Enter' && handleCreateProfile()}
                                        />
                                        <button onClick={handleCreateProfile} className="px-3 py-1.5 bg-primary rounded-lg text-sm font-medium">
                                            Add
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setShowNewProfile(true)}
                                        className="w-full text-left px-4 py-3 hover:bg-white/5 text-secondary flex items-center gap-2"
                                    >
                                        <Plus className="w-4 h-4" />
                                        New Profile
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-6 relative z-10 w-full max-w-5xl mx-auto">

                {/* Creation Studio (Full Width) */}
                <div className="w-full">
                    <div className="glass-card rounded-3xl p-1 h-full shadow-2xl shadow-primary/5">
                        <div className="h-full bg-surface/50 rounded-[22px] p-6 md:p-8 flex flex-col relative overflow-hidden backdrop-blur-3xl">
                            {/* Subtle Studio Glow */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-[80px] pointer-events-none" />

                            <div className="flex justify-between items-center mb-8 relative z-10">
                                <h3 className="text-xl font-bold flex items-center gap-3">
                                    <span className="p-2 rounded-lg bg-primary/20 text-primary"><Send className="w-5 h-5" /></span>
                                    Creation Studio
                                </h3>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => openScheduleModal(false)}
                                        className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-white"
                                    >
                                        <Clock className="w-4 h-4" />
                                        Schedule
                                    </button>
                                    <button
                                        onClick={openAiModal}
                                        className="group flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 hover:border-violet-500/50 transition-all text-xs font-bold uppercase tracking-wider text-violet-300 hover:text-white hover:shadow-[0_0_20px_-5px_rgba(139,92,246,0.5)]"
                                    >
                                        <Sparkles className="w-4 h-4 group-hover:animate-pulse" />
                                        AI Assist
                                    </button>
                                </div>
                            </div>

                            {/* Account Selector - Horizontal Scroll - Only place to select accounts for posting */}
                            <div className="mb-6 relative z-10">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">Post to:</label>
                                <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide items-center">
                                    {Array.isArray(accounts) && accounts.map(acc => {
                                        const isSelected = selectedAccounts.includes(acc.accountId);
                                        return (
                                            <button
                                                key={acc.accountId}
                                                onClick={() => toggleAccountSelection(acc.accountId)}
                                                className={`
                                                    shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all flex items-center gap-3
                                                    ${isSelected
                                                        ? 'bg-primary text-white border-primary shadow-[0_4px_15px_rgba(139,92,246,0.4)] translate-y-[-1px]'
                                                        : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:border-white/20 hover:text-white'}
                                                `}
                                            >
                                                {/* Platform Icon */}
                                                <div className={`p-1 rounded-full ${isSelected ? 'bg-white/20' : 'bg-black/20'}`}>
                                                    {(PLATFORMS.find(p => p.id === acc.platform) || { icon: Zap }).icon({ className: "w-3 h-3" })}
                                                </div>
                                                <div className="flex flex-col items-start leading-none">
                                                    <span className="text-[10px] opacity-70 mb-0.5 uppercase tracking-wider">{acc.platform}</span>
                                                    <span className="font-semibold">@{acc.username}</span>
                                                </div>
                                                {isSelected && <Check className="w-4 h-4 ml-1" />}
                                            </button>
                                        )
                                    })}

                                    {/* Add New Button (Redirects to Connections) */}
                                    <a
                                        href="/connections"
                                        className="shrink-0 w-10 h-10 rounded-full border border-dashed border-white/20 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/50 hover:bg-white/5 transition-all"
                                        title="Connect new account"
                                    >
                                        <Plus className="w-5 h-5" />
                                    </a>

                                    {(!accounts || accounts.length === 0) && <span className="text-gray-500 text-sm ml-2">No accounts. Click + to connect.</span>}
                                </div>
                            </div>

                            {/* Upload Method Toggle */}
                            <div className="mb-6 relative z-10">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">Content Type:</label>
                                <div className="flex gap-2">
                                    {UPLOAD_METHODS.map(method => (
                                        <button
                                            key={method.id}
                                            onClick={() => setUploadMethod(method.id)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all border ${uploadMethod === method.id
                                                ? 'bg-secondary/20 text-secondary border-secondary/50'
                                                : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'
                                                }`}
                                        >
                                            <method.icon className="w-4 h-4" />
                                            {method.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Conditional Media Inputs */}
                            {uploadMethod === 'url' && (
                                <div className="mb-6 relative z-10">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">Media URL(s):</label>
                                    <input
                                        type="text"
                                        value={mediaUrls}
                                        onChange={(e) => setMediaUrls(e.target.value)}
                                        placeholder="https://example.com/image.jpg (comma-separate for multiple)"
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-secondary/50 focus:outline-none transition-all"
                                    />
                                </div>
                            )}

                            {uploadMethod === 'file' && (
                                <div className="mb-6 relative z-10">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">Upload Media:</label>
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="border-2 border-dashed border-white/20 rounded-2xl p-8 text-center cursor-pointer hover:border-white/40 hover:bg-white/5 transition-all"
                                    >
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            multiple
                                            accept="image/*,video/*"
                                            onChange={(e) => setSelectedFiles(Array.from(e.target.files || []))}
                                            className="hidden"
                                        />
                                        {selectedFiles.length > 0 ? (
                                            <div className="flex flex-wrap gap-2 justify-center">
                                                {selectedFiles.map((file, idx) => (
                                                    <div key={idx} className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-sm">
                                                        <ImageIcon className="w-4 h-4 text-secondary" />
                                                        {file.name}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <>
                                                <Upload className="w-8 h-8 text-gray-500 mx-auto mb-3" />
                                                <p className="text-gray-400">Click to upload photos or videos</p>
                                                <p className="text-xs text-gray-600 mt-1">Supports JPG, PNG, GIF, MP4, MOV</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Editor Area */}
                            <div className="flex-1 relative mb-6 group">
                                <textarea
                                    value={postText}
                                    onChange={(e) => setPostText(e.target.value)}
                                    placeholder="What's happening today?"
                                    className="w-full h-full min-h-[200px] bg-black/20 hover:bg-black/30 border border-white/5 focus:border-primary/50 focus:bg-black/40 rounded-2xl p-6 text-lg text-white placeholder-gray-600 focus:outline-none transition-all resize-none shadow-inner"
                                ></textarea>

                                {/* Character Count (Simple) */}
                                <div className="absolute bottom-4 right-4 text-xs text-gray-600 font-mono">
                                    {postText.length} chars
                                </div>
                            </div>

                            {/* Actions Footer */}
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
                                <div className="text-xs text-gray-500 font-medium">
                                    {postResult && (
                                        <span className={`flex items-center gap-2 ${postResult.success ? 'text-green-400' : 'text-red-400'}`}>
                                            {postResult.success ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                                            {postResult.message || (postResult.success ? 'Distributed successfully' : 'Failed to post')}
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center gap-3 w-full sm:w-auto">
                                    <button
                                        onClick={() => openScheduleModal(true)}
                                        disabled={posting || !postText || selectedAccounts.length === 0}
                                        className="flex-1 sm:flex-none px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-medium transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        <Zap className="w-4 h-4" />
                                        Smart Queue
                                    </button>
                                    <button
                                        onClick={handlePost}
                                        disabled={posting || !postText || selectedAccounts.length === 0}
                                        className="flex-1 sm:flex-none px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary hover:brightness-110 text-white font-bold shadow-[0_0_20px_-5px_rgba(139,92,246,0.5)] transition-all hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {posting ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Send className="w-4 h-4" />}
                                        Publish Now
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Connected Accounts Grid (Unified View) */}
            <div className="w-full max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-display font-bold text-white">Your Network</h3>
                    <button
                        onClick={() => setShowConnect(!showConnect)}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-sm font-medium transition-all"
                    >
                        {showConnect ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        {showConnect ? 'Close' : 'Connect New'}
                    </button>
                </div>

                {/* Expandable Connect Area */}
                {showConnect && (
                    <div className="mb-8 p-6 rounded-3xl bg-surface/50 border border-white/5 animate-slide-up backdrop-blur-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Select Platform to Connect</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 relative z-10">
                            {PLATFORMS.map(p => (
                                <button key={p.id} onClick={() => handleConnect(p.id)} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-black/20 hover:bg-white/10 transition-all group border border-white/5 hover:border-white/20">
                                    <p.icon className={`w-8 h-8 mb-3 text-gray-400 ${p.color} transition-colors group-hover:scale-110`} />
                                    <span className="text-xs font-bold text-gray-300 group-hover:text-white">{p.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {loading ? (
                        <div className="col-span-full py-20 flex justify-center"><Loader2 className="animate-spin text-primary w-8 h-8" /></div>
                    ) : (
                        <>
                            {Array.isArray(accounts) && accounts.map(acc => (
                                <div key={acc.accountId} className="glass-card p-6 rounded-3xl relative group overflow-hidden hover:bg-white/5 transition-all border border-white/5">
                                    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all">
                                        <button onClick={() => handleDisconnect(acc.platform, acc.accountId)} className="p-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="flex flex-col items-center text-center pt-2">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-surfaceHighlight to-surface border border-white/10 flex items-center justify-center shadow-lg mb-4">
                                            {(PLATFORMS.find(p => p.id === acc.platform) || { icon: Zap }).icon({ className: "w-7 h-7 text-gray-200" })}
                                        </div>
                                        <h3 className="font-bold text-base truncate w-full px-2">{acc.displayName}</h3>
                                        <p className="text-xs text-gray-400 mb-4">@{acc.username}</p>

                                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-green-400">Connected</span>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {(!accounts || accounts.length === 0) && (
                                <div className="col-span-full text-center py-20 opacity-50 bg-white/5 rounded-3xl border border-dashed border-white/10">
                                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Cloud className="w-8 h-8 text-gray-500" />
                                    </div>
                                    <p className="text-gray-400">No accounts linked yet.</p>
                                    <button onClick={() => setShowConnect(true)} className="mt-4 text-primary hover:underline">Connect your first account</button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* AI Modal */}
            {showAiModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="glass-card w-full max-w-md p-6 rounded-2xl relative">
                        <button onClick={() => setShowAiModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                        <div className="flex items-center gap-3 mb-6">
                            <Sparkles className="w-6 h-6 text-purple-400" />
                            <h3 className="text-lg font-bold">Ghostwriter</h3>
                        </div>
                        <textarea
                            value={aiPrompt}
                            onChange={(e) => setAiPrompt(e.target.value)}
                            placeholder="Describe what you want to write..."
                            className="w-full h-32 bg-black/40 border border-white/10 rounded-xl p-4 text-sm focus:outline-none mb-4"
                        ></textarea>
                        <button
                            onClick={handleAiGenerate}
                            disabled={generating || !aiPrompt}
                            className="w-full py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold text-white flex items-center justify-center gap-2"
                        >
                            {generating ? <Loader2 className="animate-spin w-4 h-4" /> : "Generate"}
                        </button>
                    </div>
                </div>
            )}

            {/* Schedule Modal */}
            {showScheduleModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
                    <div className="glass-card w-full max-w-sm p-6 rounded-3xl relative animate-slide-up">
                        <button onClick={() => setShowScheduleModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                            <X className="w-5 h-5" />
                        </button>

                        <div className="mb-6">
                            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-secondary" /> Schedule Post
                            </h3>
                            <p className="text-sm text-gray-400">
                                Pick a time or use our AI recommended slot.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Publish Date & Time</label>
                                <input
                                    type="datetime-local"
                                    value={scheduledTime}
                                    onChange={(e) => setScheduledTime(e.target.value)}
                                    className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white focus:border-secondary/50 outline-none transition-all"
                                />
                            </div>

                            <button
                                onClick={confirmSchedule}
                                disabled={posting}
                                className="w-full py-3.5 bg-gradient-to-r from-secondary to-blue-600 rounded-xl font-bold text-white shadow-lg hover:shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {posting ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Clock className="w-5 h-5" />}
                                Confirm Schedule
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
