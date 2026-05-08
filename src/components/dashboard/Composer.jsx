import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Send, Sparkles, X, Zap, Link2,
    FileText, Upload, CheckCircle, AlertCircle, Loader2, Plus, Image as ImageIcon,
    Calendar, Clock, ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { postContent, uploadAndPost, generateContent, schedulePost, uploadMedia } from '../../services/api';

const UPLOAD_METHODS = [
    { id: 'text', label: 'Text', icon: FileText },
    { id: 'url', label: 'Link', icon: Link2 },
    { id: 'file', label: 'Media', icon: ImageIcon },
];

export default function Composer({ accounts = [], selectedAccounts = [], profiles = [], onAccountToggle, onSuccess }) {
    const [postText, setPostText] = useState('');
    const [posting, setPosting] = useState(false);
    const [uploadMethod, setUploadMethod] = useState('text');
    const [mediaUrls, setMediaUrls] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [postResult, setPostResult] = useState(null);
    const [showAiModal, setShowAiModal] = useState(false);
    const [showAccountSelector, setShowAccountSelector] = useState(false);
    const [aiPrompt, setAiPrompt] = useState('');
    const [generating, setGenerating] = useState(false);
    const [soloMode, setSoloMode] = useState(false);

    // Scheduling State
    const [isScheduling, setIsScheduling] = useState(false);
    const [scheduledDate, setScheduledDate] = useState('');
    const [scheduledTime, setScheduledTime] = useState('');

    const fileInputRef = useRef(null);

    // Set default schedule time to tomorrow 10am if not set
    useEffect(() => {
        if (isScheduling && !scheduledDate) {
            const tmr = new Date();
            tmr.setDate(tmr.getDate() + 1);
            setScheduledDate(tmr.toISOString().split('T')[0]);
            setScheduledTime("10:00");
        }
    }, [isScheduling]);

    // Sync solo mode with account selection
    useEffect(() => {
        if (soloMode) {
            // Logic to handle visual state for solo mode
        }
    }, [soloMode, accounts]);

    const handleSoloToggle = () => {
        setSoloMode(!soloMode);
        if (!soloMode) {
            accounts.forEach(acc => {
                if (!selectedAccounts.includes(acc.accountId)) {
                    onAccountToggle(acc.accountId);
                }
            });
        }
    };

    const onFileSelect = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFiles(Array.from(e.target.files));
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

    const handlePost = async () => {
        if (!postText && uploadMethod === 'text') return;
        if (selectedAccounts.length === 0) return alert('Select at least one account');

        setPosting(true);
        setPostResult(null);

        const targetAccounts = accounts.filter(a => selectedAccounts.includes(a.accountId))
            .map(a => ({ platform: a.platform, accountId: a.accountId }));

        try {
            let res;

            // Handle Scheduling
            if (isScheduling) {
                const finalDate = new Date(`${scheduledDate}T${scheduledTime}:00`);
                let finalMediaUrls = [];

                // Upload files first if needed
                if (uploadMethod === 'file' && selectedFiles.length > 0) {
                    finalMediaUrls = await uploadMedia(selectedFiles);
                } else if (uploadMethod === 'url' && mediaUrls.trim()) {
                    finalMediaUrls = mediaUrls.split(',').map(u => u.trim()).filter(u => u);
                }

                res = await schedulePost(targetAccounts, postText, finalDate.toISOString(), finalMediaUrls);

            } else {
                // Immediate Posting
                if (uploadMethod === 'file' && selectedFiles.length > 0) {
                    // Ensure file upload works as requested
                    res = await uploadAndPost(targetAccounts, postText, selectedFiles, []);
                } else if (uploadMethod === 'url' && mediaUrls.trim()) {
                    const urls = mediaUrls.split(',').map(u => u.trim()).filter(u => u);
                    res = await uploadAndPost(targetAccounts, postText, [], urls);
                } else {
                    res = await postContent(targetAccounts, postText);
                }
            }

            setPostResult({ success: true, data: res });
            setPostText('');
            setMediaUrls('');
            setSelectedFiles([]);
            setSoloMode(false);
            setIsScheduling(false);
            if (onSuccess) onSuccess();

            setTimeout(() => setPostResult(null), 5000);
        } catch (err) {
            setPostResult({ success: false, error: err.response?.data?.message || err.message });
        } finally {
            setPosting(false);
        }
    };

    return (
        <div className={`relative rounded-xl border transition-all duration-300 shadow-sm
            ${soloMode
                ? 'bg-indigo-50/50 border-indigo-200 dark:bg-indigo-900/10 dark:border-indigo-800'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'}`}>

            {/* Header */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${soloMode ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
                        <Send className="w-4 h-4" />
                    </div>
                    <div>
                        <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                            {soloMode ? 'Broadcast Mode' : 'New Post'}
                        </h2>
                        <p className="text-xs text-slate-500">
                            {soloMode ? 'Publishing to all channels' : 'Create and schedule content'}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Link
                        to="/connections"
                        className="text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        Connect Social
                    </Link>

                    <button
                        onClick={handleSoloToggle}
                        className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5
                        ${soloMode
                                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300'
                                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'}`}
                    >
                        <Zap className="w-3.5 h-3.5" />
                        {soloMode ? 'Broadcast On' : 'Broadcast Off'}
                    </button>

                    <button
                        onClick={openAiModal}
                        className="p-1.5 text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-lg transition-colors"
                        title="AI Assistant"
                    >
                        <Sparkles className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Account Selector (Dropdown) */}
            {accounts.length > 0 && (
                <div className="relative px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 z-20">
                    <button
                        onClick={() => !soloMode && setShowAccountSelector(!showAccountSelector)}
                        disabled={soloMode}
                        className={`w-full flex items-center justify-between px-3 py-2 bg-white dark:bg-slate-800 border ${showAccountSelector ? 'border-indigo-500 ring-1 ring-indigo-500' : 'border-slate-200 dark:border-slate-700'} rounded-lg text-sm transition-all ${soloMode ? 'opacity-75 cursor-default' : 'hover:border-indigo-300 dark:hover:border-indigo-700'}`}
                    >
                        <div className="flex items-center gap-2 overflow-hidden">
                            <span className="font-medium text-slate-700 dark:text-slate-300">
                                {selectedAccounts.length === 0 ? 'Select Accounts' : `${selectedAccounts.length} accounts selected`}
                            </span>
                            {selectedAccounts.length > 0 && (
                                <div className="flex -space-x-1.5">
                                    {accounts.filter(a => selectedAccounts.includes(a.accountId)).slice(0, 5).map(a => (
                                        <div key={a.accountId} className="w-5 h-5 rounded-full border border-white dark:border-slate-800 flex items-center justify-center bg-indigo-100 text-[10px] text-indigo-600 font-bold uppercase" title={a.platform}>
                                            {a.platform[0]}
                                        </div>
                                    ))}
                                    {selectedAccounts.length > 5 && (
                                        <div className="w-5 h-5 rounded-full border border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-700 text-[9px] flex items-center justify-center text-slate-500">
                                            +{selectedAccounts.length - 5}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showAccountSelector ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                        {showAccountSelector && (
                            <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 5 }}
                                className="absolute top-full left-0 right-0 mt-1 mx-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl max-h-64 overflow-y-auto z-30"
                            >
                                {profiles.length > 0 ? (
                                    // Group by Profile
                                    profiles.map(profile => {
                                        const profileAccounts = accounts.filter(a => a.profileId === profile.id);
                                        if (profileAccounts.length === 0) return null;
                                        return (
                                            <div key={profile.id} className="border-b border-slate-100 dark:border-slate-800 last:border-0">
                                                <div className="px-3 py-2 bg-slate-50 dark:bg-slate-800/50 text-xs font-bold text-slate-500 uppercase tracking-wider sticky top-0">
                                                    {profile.name}
                                                </div>
                                                <div className="p-2 space-y-1">
                                                    {profileAccounts.map(acc => {
                                                        const isSelected = selectedAccounts.includes(acc.accountId);
                                                        return (
                                                            <button
                                                                key={acc.accountId}
                                                                onClick={() => onAccountToggle(acc.accountId)}
                                                                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${isSelected ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                                            >
                                                                <div className="flex items-center gap-2">
                                                                    <span className={`capitalize font-medium ${isSelected ? 'text-indigo-600 dark:text-indigo-400' : ''}`}>{acc.platform}</span>
                                                                    <span className="text-xs text-slate-400">@{acc.username}</span>
                                                                </div>
                                                                {isSelected && <CheckCircle className="w-4 h-4 text-indigo-500" />}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    // Fallback if no profiles loaded (Flat list)
                                    <div className="p-2 space-y-1">
                                        {accounts.map(acc => {
                                            const isSelected = selectedAccounts.includes(acc.accountId);
                                            return (
                                                <button
                                                    key={acc.accountId}
                                                    onClick={() => onAccountToggle(acc.accountId)}
                                                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${isSelected ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <span className={`capitalize font-medium ${isSelected ? 'text-indigo-600 dark:text-indigo-400' : ''}`}>{acc.platform}</span>
                                                        <span className="text-xs text-slate-400">@{acc.username}</span>
                                                    </div>
                                                    {isSelected && <CheckCircle className="w-4 h-4 text-indigo-500" />}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                                {/* Handle Unassigned Accounts */}
                                {profiles.length > 0 && accounts.filter(a => !a.profileId).length > 0 && (
                                    <div className="border-b border-slate-100 dark:border-slate-800 last:border-0">
                                        <div className="px-3 py-2 bg-slate-50 dark:bg-slate-800/50 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                            Unassigned
                                        </div>
                                        <div className="p-2 space-y-1">
                                            {accounts.filter(a => !a.profileId).map(acc => {
                                                const isSelected = selectedAccounts.includes(acc.accountId);
                                                return (
                                                    <button
                                                        key={acc.accountId}
                                                        onClick={() => onAccountToggle(acc.accountId)}
                                                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${isSelected ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <span className={`capitalize font-medium ${isSelected ? 'text-indigo-600 dark:text-indigo-400' : ''}`}>{acc.platform}</span>
                                                            <span className="text-xs text-slate-400">@{acc.username}</span>
                                                        </div>
                                                        {isSelected && <CheckCircle className="w-4 h-4 text-indigo-500" />}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}

            {/* Content Area */}
            <div className="p-4 space-y-4">
                <textarea
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    placeholder="What's on your mind?"
                    className="w-full h-32 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 resize-none focus:outline-none text-base"
                />

                {/* Media Handling */}
                <div className="space-y-3">
                    {uploadMethod === 'url' && (
                        <input
                            type="text"
                            value={mediaUrls}
                            onChange={(e) => setMediaUrls(e.target.value)}
                            placeholder="Paste image URL..."
                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm border border-slate-200 dark:border-slate-700 focus:border-indigo-500 outline-none"
                        />
                    )}

                    {uploadMethod === 'file' && (
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-6 text-center hover:border-indigo-400 cursor-pointer transition-colors"
                        >
                            <input
                                type="file"
                                multiple
                                accept="image/*,video/*"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={onFileSelect}
                            />
                            <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                            <p className="text-sm text-slate-500 font-medium">Click to upload images or video</p>
                            {selectedFiles.length > 0 && (
                                <div className="mt-2 flex flex-wrap justify-center gap-2">
                                    {selectedFiles.map((f, i) => (
                                        <span key={i} className="px-2 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs rounded-md">
                                            {f.name}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="flex flex-col gap-4 pt-2">
                    {/* Scheduling UI */}
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => setIsScheduling(!isScheduling)}
                            className={`flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors
                                ${isScheduling
                                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                        >
                            <Calendar className="w-3.5 h-3.5" />
                            {isScheduling ? 'Schedule On' : 'Schedule for later'}
                            {isScheduling && <ChevronDown className="w-3 h-3 ml-1" />}
                        </button>

                        {isScheduling && (
                            <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-2">
                                <input
                                    type="date"
                                    value={scheduledDate}
                                    onChange={e => setScheduledDate(e.target.value)}
                                    className="px-2 py-1 text-xs border border-slate-200 rounded-md outline-none focus:border-indigo-500"
                                />
                                <input
                                    type="time"
                                    value={scheduledTime}
                                    onChange={e => setScheduledTime(e.target.value)}
                                    className="px-2 py-1 text-xs border border-slate-200 rounded-md outline-none focus:border-indigo-500"
                                />
                                <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap" title="Your current system timezone">
                                    {Intl.DateTimeFormat().resolvedOptions().timeZone.split('/')[1]?.replace(/_/g, ' ') || 'Local'}
                                </span>
                                <button
                                    onClick={() => {
                                        setScheduledDate('');
                                        setScheduledTime('');
                                        setIsScheduling(false);
                                    }}
                                    className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-400 hover:text-red-500"
                                    title="Cancel"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
                        <div className="flex gap-1">
                            {UPLOAD_METHODS.map(method => (
                                <button
                                    key={method.id}
                                    onClick={() => setUploadMethod(method.id)}
                                    className={`p-2 rounded-lg transition-colors
                                    ${uploadMethod === method.id
                                            ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400'
                                            : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                    title={method.label}
                                >
                                    <method.icon className="w-4 h-4" />
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-xs text-slate-400 hidden sm:inline">{postText.length} chars</span>
                            <button
                                onClick={handlePost}
                                disabled={posting || selectedAccounts.length === 0 || (isScheduling && (!scheduledDate || !scheduledTime))}
                                className={`px-4 py-2 text-white text-sm font-medium rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors
                                    ${(isScheduling && scheduledDate && scheduledTime) ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900'}`}
                            >
                                {posting ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    (isScheduling && scheduledDate && scheduledTime) ? <Clock className="w-4 h-4" /> : <Send className="w-4 h-4" />
                                )}
                                {posting ? 'Processing...' : ((isScheduling && scheduledDate && scheduledTime) ? 'Schedule' : (soloMode ? 'Broadcast' : 'Post Now'))}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Result Notification */}
            <AnimatePresence>
                {postResult && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={`absolute bottom-full left-0 right-0 mb-4 mx-4 p-3 rounded-lg shadow-lg border flex items-center gap-2 text-sm font-medium z-10
                        ${postResult.success
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/50 dark:border-emerald-800 dark:text-emerald-300'
                                : 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/50 dark:border-red-800 dark:text-red-300'}`}
                    >
                        {postResult.success ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                        {postResult.success ? (isScheduling ? 'Scheduled successfully!' : 'Posted successfully!') : postResult.error}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* AI Modal (Unchanged) */}
            {showAiModal && (
                <div className="absolute inset-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 rounded-xl">
                    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xl">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-sm font-semibold flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-amber-500" /> AI Assistant
                            </h3>
                            <button onClick={() => setShowAiModal(false)}><X className="w-4 h-4 text-slate-400" /></button>
                        </div>
                        <textarea
                            value={aiPrompt}
                            onChange={(e) => setAiPrompt(e.target.value)}
                            placeholder="What should I write about?"
                            className="w-full h-24 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm mb-3 focus:outline-none resize-none"
                        />
                        <button
                            onClick={handleAiGenerate}
                            disabled={generating || !aiPrompt}
                            className="w-full py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
                        >
                            {generating ? 'Generating...' : 'Generate Text'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
