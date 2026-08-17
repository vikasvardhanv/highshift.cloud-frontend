import { motion, AnimatePresence } from"framer-motion";
import { useState, useEffect } from 'react';
import {
 Zap, Sparkles, Send, Loader2, Info, ChevronRight, Globe,
 Instagram, Facebook, Twitter, Linkedin, Cloud, Key, Settings, User, Network
} from 'lucide-react';
import { triggerInstantPublish, getDeveloperKeys, updateDeveloperKeys } from '../services/api';
import { useTranslation } from 'react-i18next';

export default function InstantPublish() {
 const { t } = useTranslation();
 const [topic, setTopic] = useState('');
 const [audience, setAudience] = useState('');
 const [date, setDate] = useState('');
 const [loading, setLoading] = useState(false);
 const [status, setStatus] = useState(null);
 const [apiKey, setApiKey] = useState(localStorage.getItem('social_api_key') || '');

 const [userEmail, setUserEmail] = useState('');
 const [handles, setHandles] = useState({
 instagram: '',
 facebook: '',
 linkedin: '',
 twitter: ''
 });

 useEffect(() => {
 const fetchUserAndKeys = async () => {
 const user = JSON.parse(localStorage.getItem('user_data') || '{}');
 if (user.email) setUserEmail(user.email);

 try {
 const keys = await getDeveloperKeys();
 if (keys && keys.upload_post) {
 setApiKey(keys.upload_post);
 localStorage.setItem('social_api_key', keys.upload_post);
 }
 } catch (err) {
 console.error("Failed to fetch developer keys", err);
 }
 };
 fetchUserAndKeys();
 }, []);

 const handleSaveApiKey = async () => {
 if (!apiKey) return;
 setLoading(true);
 try {
 await updateDeveloperKeys({ upload_post: apiKey });
 localStorage.setItem('social_api_key', apiKey);
 setStatus({ type: 'success', message: t('instant.successKey') });
 } catch (err) {
 setStatus({ type: 'error', message: t('instant.errorKey') });
 } finally {
 setLoading(false);
 setTimeout(() => setStatus(null), 3000);
 }
 };

 const handleSubmit = async (e) => {
 e.preventDefault();
 setLoading(true);
 setStatus(null);

 try {
 await triggerInstantPublish({
 email: userEmail || 'user@example.com',
 postTopic: topic,
 targetAudience: audience,
 date: date,
 system: apiKey ? 'upload_post' : 'social_raven',
 apiKey: apiKey,
 ...handles
 });
 setStatus({ type: 'success', message: t('instant.successTrigger') });
 } catch (err) {
 setStatus({ type: 'error', message: t('instant.errorTrigger') });
 } finally {
 setLoading(false);
 }
 };

 return (
 <div className="min-h-screen bg-bgColor text-textMain p-8">
 <div className="max-w-4xl mx-auto">

 {/* Header */}
 <div className="mb-12">
 <h1 style={{ color: '#0f172a' }} className="text-6xl font-black italic uppercase tracking-tighter mb-4 dark:!text-textMain">
 {t('instant.title')}
 </h1>
 <p className="text-textMuted text-textMuted font-bold uppercase tracking-[0.2em] text-xs">
 {t('instant.subtitle')}
 </p>
 </div>

 <div className="bg-bgSurface border border-borderColor rounded-[3rem] p-12 shadow-2xl space-y-12">

 {/* Main Form */}
 <form onSubmit={handleSubmit} className="space-y-8">
 <div className="grid md:grid-cols-2 gap-8">
 <div className="space-y-4">
 <label className="text-[10px] font-black text-textMuted text-textMuted uppercase tracking-widest pl-2">{t('instant.coreTopic')}</label>
 <textarea
 required
 value={topic}
 onChange={(e) => setTopic(e.target.value)}
 placeholder={t('instant.coreTopicPlaceholder')}
 className="w-full h-40 bg-bgColor border border-borderColor rounded-3xl p-6 text-xl font-black italic uppercase tracking-tighter focus:outline-none focus:border-raven-500 transition-all resize-none text-textMain text-textMain placeholder:text-textMuted"
 />
 </div>
 <div className="space-y-8">
 <div className="space-y-4">
 <label className="text-[10px] font-black text-textMuted text-textMuted uppercase tracking-widest pl-2">{t('instant.targetAudience')}</label>
 <input
 type="text"
 required
 value={audience}
 onChange={(e) => setAudience(e.target.value)}
 placeholder={t('instant.targetAudiencePlaceholder')}
 className="w-full bg-bgColor border border-borderColor rounded-2xl p-6 font-black italic uppercase tracking-tighter focus:outline-none focus:border-raven-500 transition-all text-textMain text-textMain placeholder:text-textMuted"
 />
 </div>
 <div className="space-y-4">
 <label className="text-[10px] font-black text-textMuted text-textMuted uppercase tracking-widest pl-2">{t('instant.publishDate')}</label>
 <input
 type="date"
 required
 value={date}
 onChange={(e) => setDate(e.target.value)}
 className="w-full bg-bgColor border border-borderColor rounded-2xl p-6 font-black italic uppercase tracking-tighter focus:outline-none focus:border-raven-500 transition-all text-textMain text-textMain"
 />
 </div>
 </div>
 </div>

 {/* Social Handles Section */}
 <div className="pt-12 border-t border-borderColor">
 <div className="flex items-center gap-4 mb-8">
 <Network className="w-5 h-5 text-raven-400" />
 <h3 style={{ color: '#0f172a' }} className="text-xl font-black italic uppercase tracking-tighter dark:!text-textMain">
 {t('instant.distributionPoints')}
 </h3>
 </div>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
 {['instagram', 'facebook', 'linkedin', 'twitter'].map((p) => (
 <div key={p} className="space-y-3">
 <div className="flex items-center gap-3">
 <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${p === 'instagram' ? 'bg-pink-50 text-pink-500' : p === 'facebook' ? 'bg-blue-50 text-blue-600' : p === 'linkedin' ? 'bg-sky-50 text-sky-600' : 'bg-bgColor text-textMain' }`}>
 {p === 'instagram' && <Instagram className="w-4 h-4" />}
 {p === 'facebook' && <Facebook className="w-4 h-4" />}
 {p === 'linkedin' && <Linkedin className="w-4 h-4" />}
 {p === 'twitter' && <Twitter className="w-4 h-4" />}
 </div>
 <span className="text-[10px] font-black text-textMuted text-textMuted uppercase tracking-widest">{p}</span>
 </div>
 <div className="relative group">
 <input
 type="text"
 value={handles[p]}
 onChange={(e) => setHandles({ ...handles, [p]: e.target.value })}
 placeholder={t('instant.handlePlaceholder')}
 className="w-full bg-bgColor border border-borderColor rounded-2xl px-5 py-4 text-sm font-bold text-textMain text-textMain focus:outline-none focus:border-raven-500 transition-all placeholder:text-textMuted"
 />
 </div>
 </div>
 ))}
 </div>
 </div>

 {/* Engine Configuration Section */}
 <div className="pt-12 border-t border-borderColor">
 <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-10">
 <div className="space-y-2">
 <div className="flex items-center gap-4">
 <Settings className="w-5 h-5 text-raven-400" />
 <h3 className="text-xl font-black italic uppercase tracking-tighter text-textMain">{t('instant.engineConfig')}</h3>
 </div>
 <p className="text-[10px] font-black text-textMuted text-textMuted uppercase tracking-widest pl-9">{t('instant.engineConfigDesc')}</p>
 </div>

 <div className="flex-1 flex flex-col sm:flex-row items-center gap-6">
 {/* System Choice Icons */}
 <div className="flex items-center gap-3 p-2 bg-bgSurfaceHighlight dark:bg-bgColor rounded-[2rem] border border-borderColor">
 <button
 type="button"
 onClick={() => {
 if (confirm("Go to Connections/Instances management?")) {
 window.location.href = '/connections';
 }
 }}
 className={`p-4 rounded-full transition-all group relative ${apiKey ? 'hover:bg-white dark:hover:bg-bgSurfaceHighlight bg-bgSurfaceHighlight0 bg-bgSurfaceHighlight' : 'bg-bgSurfaceHighlight shadow-lg'}`}
 title="Social Raven"
 >
 <img src="/images/image.png" alt="R" className={`w-6 h-6 group-hover:scale-110 transition-transform ${apiKey ? 'grayscale opacity-30' : ''}`} />
 <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-bgColor border border-borderColor px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-textMain z-[100]">Social Raven</div>
 </button>
 <button
 type="button"
 className={`p-4 rounded-full transition-all group relative ${apiKey ? 'bg-raven-600 text-textMain shadow-xl shadow-raven-600/40' : 'hover:bg-white dark:hover:bg-bgSurfaceHighlight'}`}
 title="Upload Post System"
 >
 <Cloud className="w-6 h-6 group-hover:scale-110 transition-transform" />
 <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-bgColor border border-borderColor px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-textMain z-[100]">Upload Post</div>
 </button>
 </div>

 {/* API Key Row */}
 <div className="flex-1 w-full flex gap-3">
 <div className="flex-1 relative group">
 <div className="absolute left-6 top-1/2 -translate-y-1/2 text-textMuted group-focus-within:text-raven-500 transition-colors">
 <Key className="w-5 h-5" />
 </div>
 <input
 type="password"
 value={apiKey}
 onChange={(e) => setApiKey(e.target.value)}
 placeholder={t('instant.pasteKey')}
 className="w-full bg-bgSurface border border-borderColor rounded-3xl pl-16 pr-6 py-5 font-bold text-xs tracking-widest focus:outline-none focus:border-raven-500 transition-all text-textMain text-textMain placeholder:text-textMuted shadow-sm"
 />
 </div>
 <button
 type="button"
 onClick={handleSaveApiKey}
 disabled={loading || !apiKey}
 className="px-10 py-5 bg-bgColor text-textMain rounded-3xl font-black italic uppercase tracking-tighter hover:bg-bgSurfaceHighlight transition-all active:scale-95 disabled:opacity-50 whitespace-nowrap shadow-xl shadow-obsidian-950/10 flex items-center gap-3 text-sm"
 >
 {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-amber-400" />}
 {t('instant.persist')}
 </button>
 </div>
 </div>
 </div>
 </div>

 {/* Submit */}
 <button
 type="submit"
 disabled={loading}
 className="w-full h-24 bg-raven-600 text-textMain rounded-3xl flex items-center justify-center gap-4 hover:bg-raven-700 transition-all active:scale-[0.98] shadow-2xl shadow-raven-600/20 group overflow-hidden relative"
 >
 {loading ? (
 <Loader2 className="w-10 h-10 animate-spin" />
 ) : (
 <>
 <span className="text-3xl font-black italic uppercase tracking-tighter">{t('instant.initiate')}</span>
 <Send className="w-8 h-8 group-hover:translate-x-3 group-hover:-translate-y-2 transition-transform" />
 </>
 )}
 </button>
 </form>

 {/* Status Feedback */}
 <AnimatePresence>
 {status && (
 <motion.div
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: 10 }}
 className={`p-6 rounded-2xl flex items-center gap-4 ${status.type === 'success' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20' }`}
 >
 <Info className="w-6 h-6" />
 <span className="font-black italic uppercase tracking-tighter">{status.message}</span>
 </motion.div>
 )}
 </AnimatePresence>

 </div>
 </div>
 </div>
 );
}