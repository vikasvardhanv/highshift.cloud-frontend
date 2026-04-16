import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    X, ChevronDown, Check, Globe, Clock, Send, Loader2, AlertCircle, User, Plus, FolderOpen, Info, Trash2, Link,
    CheckCircle2, Image as ImageIcon, Video, Smile, MapPin, MoreHorizontal, Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAccounts, uploadMedia, postContent, schedulePost, getProfiles, getMediaLibrary, deleteMedia } from '../../services/api';

export default function Publisher() {
    const navigate = useNavigate();
    const [profiles, setProfiles] = useState([]);
    const [selectedProfileId, setSelectedProfileId] = useState(null);
    const [accounts, setAccounts] = useState([]); // Filtered by profile
    const [allAccounts, setAllAccounts] = useState([]); // All accounts store
    const [selectedAccounts, setSelectedAccounts] = useState([]);
    const [content, setContent] = useState('');
    const [mediaFiles, setMediaFiles] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSchedule, setShowSchedule] = useState(false);
    const [scheduleDate, setScheduleDate] = useState('');
    const [scheduleTime, setScheduleTime] = useState('');
    const [previewMode, setPreviewMode] = useState('mobile');

    // Notifications
    const [toast, setToast] = useState(null);

    // Media Library Modal
    const [showLibrary, setShowLibrary] = useState(false);
    const [libraryMedia, setLibraryMedia] = useState([]);
    const [libraryLoading, setLibraryLoading] = useState(false);

    // URL Input State
    const [showUrlInput, setShowUrlInput] = useState(false);
    const [urlInputValue, setUrlInputValue] = useState('');

    const fileInputRef = useRef(null);

    useEffect(() => {
        loadData();
    }, []);

    // Filter accounts when profile changes
    useEffect(() => {
        if (!selectedProfileId) {
            setAccounts([]);
            return;
        }
        const filtered = allAccounts.filter(acc => acc.profileId === selectedProfileId);
        setAccounts(filtered);
        // Auto-select all accounts for this profile
        if (filtered.length > 0) {
            setSelectedAccounts(filtered.map(a => a.accountId));
        } else {
            setSelectedAccounts([]);
        }
    }, [selectedProfileId, allAccounts]);

    const loadData = async () => {
        try {
            const [profilesData, accountsData] = await Promise.all([
                getProfiles(),
                getAccounts()
            ]);

            setProfiles(profilesData || []);
            setAllAccounts(accountsData.accounts || []);

            // Auto-select first profile
            if (profilesData && profilesData.length > 0) {
                setSelectedProfileId(profilesData[0].id);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const toggleAccount = (id) => {
        if (selectedAccounts.includes(id)) {
            setSelectedAccounts(selectedAccounts.filter(a => a !== id));
        } else {
            setSelectedAccounts([...selectedAccounts, id]);
        }
    };

    const handleFileSelect = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        // Reset input immediately so same file can be selected again
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }

        // Vercel Serverless Limit check (approx 4.5MB safe limit)
        const MAX_SIZE = 4.5 * 1024 * 1024;

        const validFiles = files.filter(f => {
            if (f.size > MAX_SIZE) {
                setToast({
                    type: 'error',
                    message: `File ${f.name} is too large (>4.5MB). Please use a URL for large videos.`
                });
                return false;
            }
            return true;
        });

        if (validFiles.length === 0) return;

        // Upload immediately to get URL
        // In a real app we might show progress bars here
        for (const file of validFiles) {
            const tempId = Math.random().toString(36).substr(2, 9);
            const isVideo = file.type.startsWith('video/');
            const previewUrl = URL.createObjectURL(file);

            // Add optimistic preview
            setMediaFiles(prev => [...prev, {
                id: tempId,
                file,
                url: previewUrl,
                type: isVideo ? 'video' : 'image',
                uploading: true
            }]);

            try {
                // Upload to backend
                const res = await uploadMedia([file]);

                // Update with real URL
                // uploadMedia returns the array of URLs directly
                const realUrl = res && res.length > 0 ? res[0] : null;

                if (!realUrl) {
                    throw new Error("No URL returned from server");
                }

                setMediaFiles(prev => prev.map(item =>
                    item.id === tempId ? { ...item, url: realUrl, uploading: false } : item
                ));
            } catch (err) {
                console.error('Upload failed', err);
                // Remove failed upload
                setMediaFiles(prev => prev.filter(item => item.id !== tempId));
                setToast({ type: 'error', message: 'Failed to upload media.' });
            }
        }
    };

    const removeMedia = (id) => {
        setMediaFiles(mediaFiles.filter(m => m.id !== id));
    };

    const openLibrary = async () => {
        setShowLibrary(true);
        if (libraryMedia.length === 0) {
            setLibraryLoading(true);
            try {
                const data = await getMediaLibrary();
                setLibraryMedia(data || []);
            } catch (err) {
                console.error('Failed to load library', err);
            } finally {
                setLibraryLoading(false);
            }
        }
    };

    const handleAddUrl = () => {
        if (!urlInputValue) return;

        let type = 'image';
        const lowerUrl = urlInputValue.toLowerCase();
        let isEmbed = false;

        if (lowerUrl.match(/\.(mp4|mov|avi|mkv|webm)$/)) {
            type = 'video';
        } else if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be') || lowerUrl.includes('vimeo')) {
            type = 'video';
            isEmbed = true;
        }

        const tempId = Math.random().toString(36).substr(2, 9);
        setMediaFiles(prev => [...prev, {
            id: tempId,
            url: urlInputValue,
            type: type,
            uploading: false,
            isUrl: true,
            isEmbed: isEmbed
        }]);

        setUrlInputValue('');
        setShowUrlInput(false);
    };

    const getEmbedUrl = (url) => {
        if (!url) return '';
        // YouTube
        const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
        if (ytMatch && ytMatch[1]) {
            return `https://www.youtube.com/embed/${ytMatch[1]}`;
        }
        // Vimeo
        const vimeoMatch = url.match(/(?:vimeo\.com\/)([0-9]+)/);
        if (vimeoMatch && vimeoMatch[1]) {
            return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
        }
        return url;
    };

    const selectFromLibrary = (item) => {
        // Add media from library to current selection
        setMediaFiles(prev => [...prev, {
            id: item.id,
            url: item.url,
            type: item.type,
            uploading: false
        }]);
        setShowLibrary(false);
    };

    const handleDeleteFromLibrary = async (e, id) => {
        e.stopPropagation();
        if (!window.confirm("Are you sure you want to delete this file?")) return;

        try {
            await deleteMedia(id);
            setLibraryMedia(prev => prev.filter(m => m.id !== id));
            setToast({ type: 'success', message: 'File deleted.' });
        } catch (err) {
            console.error("Delete failed", err);
            setToast({ type: 'error', message: 'Failed to delete file.' });
        }
    };

    const handleSubmit = async (isDraft = false) => {
        if (!content && mediaFiles.length === 0) {
            setToast({ type: 'error', message: 'Please add some content to post.' });
            return;
        }
        if (selectedAccounts.length === 0) {
            setToast({ type: 'error', message: 'Please select at least one account.' });
            return;
        }

        setIsSubmitting(true);
        try {
            // Separate actual media files (imgs/mp4s) from Rich Embeds (YouTube)
            // Twitter/etc cannot "upload" a YouTube link as a file. We must append it to body.
            const mediaToUpload = mediaFiles.filter(m => !m.isEmbed).map(m => m.url);
            const embedLinks = mediaFiles.filter(m => m.isEmbed).map(m => m.url);

            // Append embed links to content if present
            let finalContent = content;
            if (embedLinks.length > 0) {
                finalContent += "\n\n" + embedLinks.join("\n");
            }

            // Construct payload matching backend PostAccount model { platform, accountId }
            const accountsPayload = selectedAccounts.map(accId => {
                const acc = accounts.find(a => a.accountId === accId);
                return acc ? { platform: acc.platform, accountId: acc.accountId } : null;
            }).filter(Boolean);

            // Basic logic: If date/time set, schedule it. Otherwise post now.
            if (scheduleDate && scheduleTime) {
                const isoDateTime = new Date(`${scheduleDate}T${scheduleTime}`).toISOString();
                await schedulePost(accountsPayload, finalContent, isoDateTime, mediaToUpload);
                setToast({ type: 'success', message: 'Post scheduled successfully!' });
            } else {
                await postContent(accountsPayload, finalContent, mediaToUpload);
                setToast({ type: 'success', message: 'Posted successfully!' });
            }

            // Reset form
            setContent('');
            setMediaFiles([]);
            setScheduleDate('');
            setScheduleTime('');
            setShowSchedule(false);

        } catch (err) {
            console.error(err);
            setToast({ type: 'error', message: err.response?.data?.detail || 'Failed to post.' });
        } finally {
            setIsSubmitting(false);
            // Auto hide toast
            setTimeout(() => setToast(null), 3000);
        }
    };

    // --- RENDER ---
    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-140px)] gap-0 bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800">

            {/* --- LEFT COLUMN: COMPOSER --- */}
            <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-slate-900">
                {/* 1. Account Selector */}
                {/* 1. Account Setup */}
                <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                    <div className="flex flex-col gap-4">
                        {/* Profile Selector */}
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Post As (Profile)</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <select
                                    className="w-full pl-10 pr-10 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none text-slate-700 dark:text-slate-200"
                                    value={selectedProfileId || ''}
                                    onChange={(e) => setSelectedProfileId(e.target.value)}
                                >
                                    {profiles.map(p => (
                                        <option key={p.id} value={p.id}>{p.name}</option>
                                    ))}
                                    {profiles.length === 0 && <option value="">No profiles found</option>}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                            </div>
                        </div>

                        {/* Accounts List (Horizontal Scroll) */}
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Select Accounts</label>
                            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                {accounts.map(acc => {
                                    const isSelected = selectedAccounts.includes(acc.accountId);
                                    let platformColor = 'bg-slate-500';
                                    if (acc.platform === 'twitter') platformColor = 'text-[#1DA1F2]';
                                    if (acc.platform === 'facebook') platformColor = 'text-[#1877F2]';
                                    if (acc.platform === 'linkedin') platformColor = 'text-[#0A66C2]';
                                    if (acc.platform === 'instagram') platformColor = 'text-[#E4405F]';
                                    if (acc.platform === 'youtube') platformColor = 'text-[#FF0000]';

                                    return (
                                        <button
                                            key={acc.accountId}
                                            onClick={() => toggleAccount(acc.accountId)}
                                            className={`
                                                flex items-center justify-between p-3 rounded-xl border transition-all min-w-[220px] max-w-[220px] text-left
                                                ${isSelected
                                                    ? 'bg-sky-50 border-sky-400 dark:bg-sky-900/30 dark:border-sky-500/50 shadow-sm'
                                                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-750'}
                                            `}
                                        >
                                            <div className="flex items-center gap-3">
                                                {/* Icon */}
                                                <div className={`flex-shrink-0 ${platformColor}`}>
                                                    <SocialIcon platform={acc.platform} className="w-6 h-6" />
                                                </div>

                                                {/* Text Info */}
                                                <div className="flex flex-col overflow-hidden">
                                                    <span className={`text-sm font-bold truncate ${isSelected ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                                                        {acc.username.startsWith('@') ? acc.username : `@${acc.username}`}
                                                    </span>
                                                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                                                        {acc.platform}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Selection Indicator */}
                                            {isSelected && (
                                                <div className="flex-shrink-0 text-sky-500">
                                                    <CheckCircle2 className="w-5 h-5 fill-current" />
                                                </div>
                                            )}
                                        </button>
                                    )
                                })}
                                {accounts.length === 0 && (
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm text-slate-400 italic">No accounts connected.</span>
                                        <button
                                            onClick={() => navigate('/profiles')}
                                            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                            Add Account
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Editor Area */}
                <div className="flex-1 flex flex-col relative">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Start writing your post..."
                        className="flex-1 w-full p-6 bg-transparent resize-none focus:outline-none text-slate-800 dark:text-slate-200 text-lg placeholder:text-slate-400"
                    />

                    {/* Media Preview Grid */}
                    {mediaFiles.length > 0 && (
                        <div className="px-6 pb-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {mediaFiles.map(media => (
                                <div key={media.id} className="relative aspect-square rounded-xl overflow-hidden group border border-slate-200 dark:border-slate-700">
                                    {media.uploading && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                                            <Loader2 className="w-6 h-6 text-white animate-spin" />
                                        </div>
                                    )}
                                    {media.uploading && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                                            <Loader2 className="w-6 h-6 text-white animate-spin" />
                                        </div>
                                    )}
                                    {media.type === 'video' ? (
                                        media.isEmbed ? (
                                            <iframe
                                                src={getEmbedUrl(media.url)}
                                                className="w-full h-full object-cover pointer-events-none"
                                                title="Embed"
                                            />
                                        ) : (
                                            <video src={media.url} className="w-full h-full object-cover" />
                                        )
                                    ) : (
                                        <img src={media.url} className="w-full h-full object-cover" />
                                    )}
                                    <button
                                        onClick={() => removeMedia(media.id)}
                                        className="absolute top-1 right-1 p-1 bg-black/50 hover:bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Toolbar */}
                    <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            <input
                                type="file"
                                multiple
                                accept="image/*,video/*"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                            />
                            <ToolbarBtn icon={ImageIcon} label="Photo" onClick={() => fileInputRef.current?.click()} />
                            <ToolbarBtn icon={Video} label="Video" onClick={() => fileInputRef.current?.click()} />
                            <ToolbarBtn icon={FolderOpen} label="Library" onClick={openLibrary} />
                            <ToolbarBtn icon={Link} label="Link" onClick={() => setShowUrlInput(true)} />

                            {/* Video Guidelines Info */}
                            <div className="relative group ml-1">
                                <Info className="w-4 h-4 text-slate-400 cursor-help" />
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-slate-800 text-white text-xs p-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl">
                                    <p className="font-bold mb-1">Video Guidelines:</p>
                                    <ul className="list-disc pl-3 space-y-1 text-slate-300">
                                        <li>Max size: 4.5MB (Direct) or use URL</li>
                                        <li>Ratio: 16:9, 1:1, or 9:16</li>
                                        <li>Twitter: Max 140s</li>
                                        <li>Instagram: Max 60s (Feed), 15m (Reels)</li>
                                    </ul>
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
                                </div>
                            </div>

                            <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-2" />
                            <ToolbarBtn icon={Smile} label="Emoji" />
                            <ToolbarBtn icon={MapPin} label="Location" />
                        </div>
                        <span className="text-xs text-slate-400 font-medium">{content.length} / 2200</span>
                    </div>
                </div>

                {/* 3. Footer Options */}
                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800">
                    <div className="border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 p-4 mb-4">
                        <button
                            onClick={() => setShowSchedule(!showSchedule)}
                            className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 w-full justify-between"
                        >
                            <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-indigo-500" /> Scheduling Options</span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${showSchedule ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {showSchedule && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-4 flex flex-col sm:flex-row gap-4 items-end">
                                        <div className="flex-1">
                                            <label className="text-xs font-bold text-slate-500 mb-1 block">Date</label>
                                            <input
                                                type="date"
                                                value={scheduleDate}
                                                onChange={(e) => setScheduleDate(e.target.value)}
                                                className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label className="text-xs font-bold text-slate-500 mb-1 block">Time</label>
                                            <input
                                                type="time"
                                                value={scheduleTime}
                                                onChange={(e) => setScheduleTime(e.target.value)}
                                                className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                            />
                                        </div>
                                        <button
                                            onClick={() => {
                                                setScheduleDate('');
                                                setScheduleTime('');
                                                setShowSchedule(false);
                                            }}
                                            className="px-3 py-2.5 bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600 dark:bg-slate-800 dark:hover:bg-red-900/20 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors flex items-center justify-center"
                                            title="Clear & Cancel Schedule"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                    {scheduleDate && scheduleTime && (
                                        <div className="flex items-center gap-2 mt-3 text-xs text-indigo-500 font-medium bg-indigo-50 dark:bg-indigo-500/10 p-2 rounded-lg border border-indigo-100 dark:border-indigo-500/20">
                                            <Clock className="w-3 h-3" />
                                            Will be posted on {new Date(`${scheduleDate}T${scheduleTime}`).toLocaleString()}
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="flex items-center justify-end gap-3">
                        <button className="px-5 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors">
                            Save Draft
                        </button>
                        <button
                            onClick={() => handleSubmit()}
                            disabled={isSubmitting || mediaFiles.some(m => m.uploading) || (showSchedule && (!scheduleDate || !scheduleTime))} // Disable if uploading or partially filled schedule
                            className={`px-6 py-2.5 text-white text-sm font-bold rounded-xl shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98]
                                ${(showSchedule && scheduleDate && scheduleTime)
                                    ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/20'
                                    : 'bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 shadow-slate-900/10'}
                            `}
                        >
                            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : ((showSchedule && scheduleDate && scheduleTime) ? <Clock className="w-4 h-4" /> : <Send className="w-4 h-4" />)}
                            {isSubmitting
                                ? 'Processing...'
                                : ((showSchedule && scheduleDate && scheduleTime) ? 'Schedule Post' : 'Publish Now')
                            }
                        </button>
                    </div>
                </div>
            </div>

            {/* --- RIGHT COLUMN: PREVIEW --- */}
            <div className="w-[400px] xl:w-[480px] bg-slate-100 dark:bg-black p-6 border-l border-slate-200 dark:border-slate-800 hidden lg:flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-slate-700 dark:text-slate-300 text-sm uppercase tracking-wider">Network Preview</h3>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setPreviewMode('mobile')}
                            className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors ${previewMode === 'mobile' ? 'text-indigo-600 bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-800 dark:text-slate-500 dark:hover:text-slate-300'}`}
                        >
                            Mobile
                        </button>
                        <button
                            onClick={() => setPreviewMode('desktop')}
                            className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors ${previewMode === 'desktop' ? 'text-indigo-600 bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-800 dark:text-slate-500 dark:hover:text-slate-300'}`}
                        >
                            Desktop
                        </button>
                    </div>
                </div>

                <div className="flex-1 flex items-center justify-center">
                    {/* Mock Phone/Desktop Preview */}
                    <div className={`transition-all duration-300 flex flex-col bg-white dark:bg-slate-900 shadow-2xl overflow-hidden
                        ${previewMode === 'mobile'
                            ? 'w-[320px] rounded-[2rem] border-[6px] border-slate-200 dark:border-slate-800'
                            : 'w-full max-w-[440px] rounded-lg border border-slate-200 dark:border-slate-800'
                        }`}
                    >
                        {/* Header */}
                        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                            <div className="flex-1">
                                <div className="h-2 w-24 bg-slate-200 dark:bg-slate-700 rounded mb-1.5"></div>
                                <div className="h-1.5 w-12 bg-slate-100 dark:bg-slate-800 rounded"></div>
                            </div>
                            <MoreHorizontal className="w-4 h-4 text-slate-300" />
                        </div>

                        {/* Content */}
                        <div className="p-0">
                            {mediaFiles.length > 0 ? (
                                <div className="aspect-square bg-slate-100 dark:bg-slate-950 relative">
                                    {mediaFiles[0].type === 'video' ? (
                                        mediaFiles[0].isEmbed ? (
                                            <iframe
                                                src={getEmbedUrl(mediaFiles[0].url)}
                                                className="w-full h-full object-cover"
                                                title="Preview"
                                            />
                                        ) : (
                                            <video src={mediaFiles[0].url} className="w-full h-full object-cover" />
                                        )
                                    ) : (
                                        <img src={mediaFiles[0].url} className="w-full h-full object-cover" />
                                    )}
                                    {mediaFiles.length > 1 && (
                                        <div className="absolute top-2 right-2 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded-md">
                                            + {mediaFiles.length - 1} more
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="aspect-square bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-300">
                                    <ImageIcon className="w-12 h-12" />
                                </div>
                            )}
                        </div>

                        {/* Caption */}
                        <div className="p-4">
                            <div className="flex gap-3 mb-3">
                                <div className="w-5 h-5 rounded-full border border-slate-200 dark:border-slate-700"></div>
                                <div className="w-5 h-5 rounded-full border border-slate-200 dark:border-slate-700"></div>
                                <div className="w-5 h-5 rounded-full border border-slate-200 dark:border-slate-700"></div>
                            </div>
                            <div className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">username</div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap">
                                {content || <span className="text-slate-300 italic">Your caption here...</span>}
                            </p>
                            <div className="mt-3 text-[10px] text-slate-400 uppercase">2 hours ago</div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-xs text-slate-400 max-w-xs mx-auto">
                        <AlertCircle className="w-3 h-3 inline mr-1" />
                        Preview approximates how your content will display. Social networks may update their UI at any time.
                    </p>
                </div>
            </div>

            {/* Media Library Modal */}
            <AnimatePresence>
                {showLibrary && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowLibrary(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Select from Library</h3>
                                <button onClick={() => setShowLibrary(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                                    <X className="w-5 h-5 text-slate-500" />
                                </button>
                            </div>
                            <div className="p-4 overflow-y-auto max-h-[60vh]">
                                {libraryLoading ? (
                                    <div className="flex justify-center py-12">
                                        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                                    </div>
                                ) : libraryMedia.length === 0 ? (
                                    <div className="text-center py-12 text-slate-500">
                                        <FolderOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                        <p>No media in library yet.</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                                        {libraryMedia.map(item => (
                                            <button
                                                key={item.id}
                                                onClick={() => selectFromLibrary(item)}
                                                className="relative pt-[100%] rounded-xl overflow-hidden border-2 border-transparent hover:border-indigo-500 transition-all group"
                                            >
                                                <div className="absolute inset-0">
                                                    {item.type === 'video' ? (
                                                        <video src={item.url} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <img src={item.url} alt={item.filename} className="w-full h-full object-cover" />
                                                    )}
                                                    <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/20 transition-colors flex items-center justify-center">
                                                        <Plus className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </div>
                                                </div>
                                                {/* Delete Button */}
                                                <div
                                                    onClick={(e) => handleDeleteFromLibrary(e, item.id)}
                                                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-10"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>



            {/* URL Input Modal */}
            <AnimatePresence>
                {showUrlInput && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowUrlInput(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Add Media from URL</h3>
                            <input
                                type="text"
                                value={urlInputValue}
                                onChange={(e) => setUrlInputValue(e.target.value)}
                                placeholder="https://example.com/image.jpg"
                                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 mb-4 focus:ring-2 focus:ring-indigo-500 outline-none"
                                autoFocus
                            />
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setShowUrlInput(false)}
                                    className="px-4 py-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddUrl}
                                    className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold"
                                >
                                    Add Media
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toast Notification */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className={`fixed bottom-8 right-8 px-6 py-4 rounded-xl shadow-2xl border flex items-center gap-3 z-50
                            ${toast.type === 'error' ? 'bg-red-50 dark:bg-red-900/90 border-red-200 text-red-700 dark:text-red-100' : 'bg-emerald-50 dark:bg-emerald-900/90 border-emerald-200 text-emerald-700 dark:text-emerald-100'}`}
                    >
                        {toast.type === 'error' ? <AlertCircle className="w-5 h-5" /> : <Check className="w-5 h-5" />}
                        <span className="font-bold">{toast.message}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div >
    );
}

function ToolbarBtn({ icon: Icon, label, onClick }) {
    return (
        <button
            onClick={onClick}
            className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors flex items-center justify-center"
            title={label}
        >
            <Icon className="w-5 h-5" />
        </button>
    )
}

function SocialIcon({ platform, className = "w-5 h-5" }) {
    switch (platform.toLowerCase()) {
        case 'twitter':
        case 'x':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            );
        case 'facebook':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.148 0-2.971.956-2.971 3.594v.377h4.945l-1.037 3.667h-3.908v7.98h-4.843Z" />
                </svg>
            );
        case 'instagram':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M12.31 4.75c1.891 0 2.126.008 2.872.042 3.44.156 5.037 1.769 5.2 5.286.035.765.042 1.003.042 2.91 0 1.905-.007 2.14-.042 2.898-.163 3.513-1.758 5.126-5.2 5.286-.746.033-.981.041-2.872.041-1.894 0-2.128-.008-2.874-.041-3.468-.157-5.06-1.79-5.2-5.286-.035-.758-.042-.993-.042-2.898 0-1.907.007-2.145.042-2.91.14-3.518 1.732-5.13 5.2-5.286.746-.034.98-.042 2.874-.042ZM12.31 2.25c-2.738 0-3.085.01-4.161.059-4.885.222-7.627 3-7.842 7.925C.256 11.298.25 11.64.25 14.39c0 2.75.006 3.092.057 4.156.215 4.925 2.957 7.703 7.842 7.925 1.076.049 1.423.059 4.161.059 2.741 0 3.087-.01 4.163-.059 4.887-.222 7.629-3 7.846-7.925.047-1.064.053-1.406.053-4.156 0-2.75-.006-3.092-.053-4.156-.217-4.925-2.959-7.703-7.846-7.925-1.076-.049-1.422-.059-4.163-.059Z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M12.31 8.351a4.663 4.663 0 1 0 0 9.326 4.663 4.663 0 0 0 0-9.326Zm0-2.5a7.163 7.163 0 1 1 0 14.326 7.163 7.163 0 0 1 0-14.326Z" clipRule="evenodd" />
                    <path d="M20.245 7.172a1.666 1.666 0 1 1-3.333 0 1.666 1.666 0 0 1 3.333 0Z" />
                </svg>
            );
        case 'linkedin':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            );
        case 'youtube':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
            );
        default:
            return <Globe className={className} />;
    }
}
