import { useState, useRef, useEffect } from 'react';
import {
    Send, Trash2, Check, Sparkles, X, Zap, AtSign, Pin,
    MessageSquare, Cloud, Music, Plus, Calendar, Clock,
    Loader2, AlertCircle, CheckCircle, Upload, Link2,
    FileText, Image as ImageIcon, Smile
} from 'lucide-react';
import { motion } from 'framer-motion';
import { postContent, uploadAndPost, generateContent } from '../../services/api';

const UPLOAD_METHODS = [
    { id: 'text', label: 'Text Only', icon: FileText },
    { id: 'url', label: 'Media URL', icon: Link2 },
    { id: 'file', label: 'Upload File', icon: Upload },
];

export default function Composer({ accounts = [], selectedAccounts = [], onAccountToggle, onSuccess }) {
    const [postText, setPostText] = useState('');
    const [posting, setPosting] = useState(false);
    const [uploadMethod, setUploadMethod] = useState('text');
    const [mediaUrls, setMediaUrls] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [postResult, setPostResult] = useState(null);
    const [showAiModal, setShowAiModal] = useState(false);
    const [aiPrompt, setAiPrompt] = useState('');
    const [generating, setGenerating] = useState(false);
    const [soloMode, setSoloMode] = useState(false);
    const fileInputRef = useRef(null);

    // Sync solo mode with account selection
    useEffect(() => {
        if (soloMode) {
            const allIds = accounts.map(a => a.accountId);
            // We need to notify parent to select all, but for now we'll handle visual state
            // In a real app, this would call a setAllSelected function from props
        }
    }, [soloMode, accounts]);

    const handleSoloToggle = () => {
        setSoloMode(!soloMode);
        if (!soloMode) {
            // Select all accounts via the callback if provided, or handled by parent
            accounts.forEach(acc => {
                if (!selectedAccounts.includes(acc.accountId)) {
                    onAccountToggle(acc.accountId);
                }
            });
        }
    };

    // Handle file selection
    const onFileSelect = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFiles(Array.from(e.target.files));
        }
    };

    // AI Generation
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

    // Posting Logic
    const handlePost = async () => {
        if (!postText && uploadMethod === 'text') return;
        if (selectedAccounts.length === 0) return alert('Select at least one account');

        setPosting(true);
        setPostResult(null);

        const targetAccounts = accounts.filter(a => selectedAccounts.includes(a.accountId))
            .map(a => ({ platform: a.platform, accountId: a.accountId }));

        try {
            let res;
            if (uploadMethod === 'file' && selectedFiles.length > 0) {
                res = await uploadAndPost(targetAccounts, postText, selectedFiles, []);
            } else if (uploadMethod === 'url' && mediaUrls.trim()) {
                const urls = mediaUrls.split(',').map(u => u.trim()).filter(u => u);
                res = await uploadAndPost(targetAccounts, postText, [], urls);
            } else {
                res = await postContent(targetAccounts, postText);
            }

            setPostResult({ success: true, data: res });
            setPostText('');
            setMediaUrls('');
            setSelectedFiles([]);
            setSoloMode(false);
            if (onSuccess) onSuccess();

            setTimeout(() => setPostResult(null), 5000);
        } catch (err) {
            setPostResult({ success: false, error: err.response?.data?.message || err.message });
        } finally {
            setPosting(false);
        }
    };

    return (
        <div className={`relative overflow-hidden rounded-[2.5rem] p-8 border transition-all duration-500 backdrop-blur-3xl shadow-2xl
            ${soloMode
                ? 'bg-primary/5 border-primary/30 shadow-primary/20'
                : 'bg-white/5 border-white/10 shadow-black'}`}>

            {/* Solo Mode background decoration */}
            {soloMode && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -mr-48 -mt-48 animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] -ml-32 -mb-32"></div>
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 relative z-10">
                <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500 transform rotate-3
                        ${soloMode ? 'bg-primary scale-110' : 'bg-gradient-to-br from-slate-700 to-slate-900'}`}>
                        <Send className={`w-7 h-7 text-white transition-all ${soloMode ? 'scale-110' : ''}`} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">
                            {soloMode ? 'Solo Upload Engine' : 'Creation Studio'}
                        </h2>
                        <p className="text-sm text-slate-500 font-medium">
                            {soloMode ? 'Broadcasting to all nodes simultaneously' : 'Compose and target specific platforms'}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {/* Solo Mode Toggle */}
                    <button
                        onClick={handleSoloToggle}
                        className={`group relative flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all border
                        ${soloMode
                                ? 'bg-primary/20 text-primary border-primary/40'
                                : 'bg-white/5 text-slate-400 border-white/10 hover:border-white/20'}`}
                    >
                        <Zap className={`w-4 h-4 transition-all ${soloMode ? 'fill-primary animate-pulse' : 'group-hover:text-primary'}`} />
                        Solo Mode
                        <div className={`w-10 h-5 rounded-full p-1 transition-colors relative
                            ${soloMode ? 'bg-primary' : 'bg-slate-800'}`}>
                            <div className={`w-3 h-3 bg-white rounded-full transition-all 
                                ${soloMode ? 'ml-5' : 'ml-0'}`} />
                        </div>
                    </button>

                    <button
                        onClick={openAiModal}
                        className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-fuchsia-400 transition-all"
                        title="AI Ghostwriter"
                    >
                        <Sparkles className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Account Selector */}
            {accounts.length > 0 && (
                <div className="mb-8 relative z-10">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Target Nodes</p>
                        {soloMode && (
                            <span className="text-[10px] font-bold text-primary uppercase tracking-widest animate-pulse flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" /> Global Casting Active
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {accounts.map(acc => {
                            const isSelected = selectedAccounts.includes(acc.accountId);
                            return (
                                <button
                                    key={acc.accountId}
                                    onClick={() => !soloMode && onAccountToggle(acc.accountId)}
                                    disabled={soloMode}
                                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all duration-300 text-sm whitespace-nowrap
                                    ${isSelected
                                            ? 'bg-primary/20 text-primary border-primary/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                                            : 'bg-white/5 text-slate-500 border-white/5 hover:bg-white/10 hover:text-slate-300'}
                                    ${soloMode ? 'opacity-50 cursor-not-allowed scale-95' : 'hover:-translate-y-0.5'}`}
                                >
                                    <div className="w-2 h-2 rounded-full bg-current opacity-60"></div>
                                    <span className="font-bold capitalize">{acc.platform}</span>
                                    <span className="opacity-40 text-xs">@{acc.username || 'user'}</span>
                                </button>
                            );
                        })}
                        {!soloMode && (
                            <button className="w-10 h-10 rounded-xl border border-dashed border-slate-700 hover:border-primary/50 hover:text-primary text-slate-500 flex items-center justify-center transition-all bg-white/5">
                                <Plus className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Content Area */}
            <div className="space-y-6 relative z-10">
                {/* Upload Method Tabs */}
                <div className="flex gap-2 p-1.5 bg-black/40 border border-white/5 rounded-2xl w-fit">
                    {UPLOAD_METHODS.map(method => (
                        <button
                            key={method.id}
                            onClick={() => setUploadMethod(method.id)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all border
                            ${uploadMethod === method.id
                                    ? 'bg-primary/20 text-primary border-primary/30 shadow-[0_0_20px_rgba(16,185,129,0.1)]'
                                    : 'text-slate-500 border-transparent hover:text-slate-300 hover:bg-white/5'}`}
                        >
                            <method.icon className="w-3.5 h-3.5" />
                            {method.label}
                        </button>
                    ))}
                </div>

                {/* Text Input */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
                    <textarea
                        value={postText}
                        onChange={(e) => setPostText(e.target.value)}
                        placeholder={soloMode ? "Broadcasting to all your networks..." : "What's happening today?"}
                        className={`relative w-full h-48 bg-black/30 border rounded-2xl p-6 text-lg focus:outline-none transition-all resize-none placeholder:text-slate-700
                        ${soloMode ? 'border-primary/30' : 'border-white/10 focus:border-primary/50'}`}
                    />
                    <div className="absolute bottom-4 right-6 text-[10px] text-slate-700 font-bold uppercase tracking-widest">
                        {postText.length} Characters
                    </div>
                </div>

                {/* Media Inputs */}
                {uploadMethod === 'url' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="animate-fade-in"
                    >
                        <input
                            type="text"
                            value={mediaUrls}
                            onChange={(e) => setMediaUrls(e.target.value)}
                            placeholder="Enter image or video URLs (comma separated)"
                            className="w-full bg-black/30 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-primary/50 transition-all placeholder:text-slate-700"
                        />
                    </motion.div>
                )}

                {uploadMethod === 'file' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="animate-fade-in group/upload"
                    >
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-white/10 hover:border-primary/50 hover:bg-primary/5 rounded-[2rem] p-12 text-center cursor-pointer transition-all duration-300 relative overflow-hidden"
                        >
                            <input
                                type="file"
                                multiple
                                accept="image/*,video/*"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={onFileSelect}
                            />
                            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4 group-hover/upload:scale-110 transition-transform duration-500">
                                <Upload className="w-8 h-8 text-slate-500 group-hover/upload:text-primary transition-colors" />
                            </div>
                            <p className="text-lg text-slate-300 font-bold tracking-tight">Drop files or click to forge</p>
                            <p className="text-sm text-slate-500 mt-2 font-medium">
                                {selectedFiles.length > 0
                                    ? `${selectedFiles.length} nodes ready for transmission`
                                    : 'High-res JPG, PNG, or MP4 up to 50MB'}
                            </p>

                            {selectedFiles.length > 0 && (
                                <div className="mt-4 flex flex-wrap justify-center gap-2">
                                    {selectedFiles.map((f, i) => (
                                        <div key={i} className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-bold text-primary uppercase">
                                            {f.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* Action Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/5">
                    <div className="flex items-center gap-6">
                        <button className="text-xs font-bold text-slate-500 hover:text-primary transition-colors flex items-center gap-2 uppercase tracking-widest">
                            <Calendar className="w-4 h-4" /> Smart Queue
                        </button>
                        <div className="h-4 w-px bg-white/5"></div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">System Ready</span>
                        </div>
                    </div>

                    <button
                        onClick={handlePost}
                        disabled={posting || (selectedAccounts.length === 0)}
                        className={`relative group px-10 py-4 rounded-2xl font-bold shadow-2xl transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden
                        ${soloMode
                                ? 'bg-primary text-white scale-105'
                                : 'bg-white text-black hover:bg-slate-200'}`}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        <div className="flex items-center gap-3 relative z-10">
                            {posting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className={`w-5 h-5 ${soloMode ? 'animate-bounce' : ''}`} />}
                            {soloMode ? 'SOLO BROADCAST' : 'PUBLISH NOW'}
                        </div>
                    </button>
                </div>
            </div>

            {/* Post Result Toast/Banner */}
            {postResult && (
                <div className={`absolute bottom-4 left-4 right-4 p-4 rounded-xl flex items-center gap-3 animate-fade-in-up border backdrop-blur-md shadow-2xl z-20 
                    ${postResult.success ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' : 'bg-red-500/10 border-red-500/20 text-red-300'}`}>
                    {postResult.success ? <CheckCircle className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
                    <p className="text-sm font-medium">{postResult.success ? 'Content published successfully!' : postResult.error}</p>
                </div>
            )}

            {/* AI Modal */}
            {showAiModal && (
                <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 rounded-2xl">
                    <div className="w-full max-w-sm bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-fuchsia-400" /> Ghostwriter AI
                            </h3>
                            <button onClick={() => setShowAiModal(false)} className="p-1 hover:bg-white/10 rounded-lg"><X className="w-4 h-4" /></button>
                        </div>
                        <textarea
                            value={aiPrompt}
                            onChange={(e) => setAiPrompt(e.target.value)}
                            placeholder="e.g. Write a funny tweet about coffee..."
                            className="w-full h-32 bg-black/40 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-fuchsia-500/50 mb-4 resize-none"
                        />
                        <button
                            onClick={handleAiGenerate}
                            disabled={generating || !aiPrompt}
                            className="w-full py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl text-white font-bold flex items-center justify-center gap-2"
                        >
                            {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                            Generate Content
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
