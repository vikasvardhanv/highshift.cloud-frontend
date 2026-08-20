import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Bot, User, Copy, RefreshCw, Loader2, Zap, Command, Film, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { generateContent } from '../services/api';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

export default function AiStudio() {
  const { t } = useTranslation();
 const navigate = useNavigate();
 const [messages, setMessages] = useState([
 {
 role: 'assistant',
 type: 'text',
 content: t('ai_studio.initialMessage', "I am your Social Raven AI Creative Assistant. I can generate high-impact posts or create visuals. Just ask me to 'write a post about...' or 'generate an image of...'.")
 }
 ]);
 const [input, setInput] = useState('');
 const [loading, setLoading] = useState(false);
 const [tone, setTone] = useState('Professional');
 const bottomRef = useRef(null);

 const tones = [
 { id: 'Professional', label: t('ai_studio.tones.professional', 'Professional'), icon: Command, color: 'text-raven-400', bg: 'bg-raven-500/10 border-raven-500/20' },
 { id: 'Witty', label: t('ai_studio.tones.witty', 'Witty'), icon: Sparkles, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
 { id: 'Aggressive', label: t('ai_studio.tones.bold', 'Bold'), icon: Zap, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
 { id: 'Empathetic', label: t('ai_studio.tones.empathetic', 'Empathetic'), icon: User, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
 { id: 'Minimalist', label: t('ai_studio.tones.minimal', 'Minimal'), icon: Bot, color: 'text-textMuted', bg: 'bg-bgSurface/10 border-slate-500/20' }
 ];

 useEffect(() => {
 bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
 }, [messages]);

 const handleSend = async () => {
 if (!input.trim() || loading) return;

 const userMessage = input;
 setMessages(prev => [...prev, { role: 'user', type: 'text', content: userMessage }]);
 setInput('');
 setLoading(true);

 try {
 // backend expects: topic (prompt), platform (optional), tone (optional)
 const result = await generateContent(userMessage, 'all', tone);

 // result = { type: 'text'|'image'|'video'|'error', content: '...', model: '...' }
 setMessages(prev => [...prev, {
 role: 'assistant',
 type: result.type || 'text',
 content: result.content,
 model: result.model
 }]);
 } catch (err) {
 console.error(err);
 setMessages(prev => [...prev, { role: 'assistant', type: 'text', content: t('ai_studio.errorConnection', "My connection to the neural net was interrupted. Please try again.") }]);
 } finally {
 setLoading(false);
 }
 };

 const scheduleMessage = (content) => {
 if (!content) return;
 navigate('/schedule', {
 state: {
 openComposer: true,
 draftContent: content,
 },
 });
 };

 return (
 <div className="h-[calc(100vh-140px)] flex flex-col relative overflow-hidden rounded-3xl border border-borderColor bg-bgColor shadow-2xl">
 {/* Ambient Background Effects */}
 <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
 <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-raven-600/10 blur-[100px]" />
 <div className="absolute top-[40%] -left-[10%] w-[500px] h-[500px] rounded-full bg-purple-600/5 blur-[100px]" />
 </div>

 {/* Header */}
 <div className="z-10 flex flex-col md:flex-row md:items-center justify-between p-6 border-b border-borderColor bg-bgColor backdrop-blur-md">
 <div className="flex items-center gap-4 mb-4 md:mb-0">
 <div className="relative">
 <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-raven-500 to-purple-600 flex items-center justify-center shadow-lg shadow-raven-500/20">
 <Bot className="w-6 h-6 text-textMain" />
 </div>
 <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-bgColor flex items-center justify-center">
 <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
 </div>
 </div>
 <div>
 <h2 className="text-lg font-bold text-textMain tracking-tight flex items-center gap-2">
 {t('ai_studio.title', 'Social Raven AI')} <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-raven-500/20 text-raven-400 border border-raven-500/20 tracking-wide">PRO</span>
 </h2>
 <p className="text-xs text-textMuted">{t('ai_studio.subtitle', 'Multi-modal Creative Engine')}</p>
 </div>
 </div>

 <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
 {tones.map(t_obj => (
 <button
 key={t_obj.id}
 onClick={() => setTone(t_obj.id)}
 className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border
 ${tone === t_obj.id
 ? `${t_obj.bg} ${t_obj.color} border-current shadow-lg shadow-raven-500/5 ring-1 ring-inset ring-white/5`
 : 'bg-bgSurfaceHighlight border-transparent text-textMuted hover:bg-white/10 hover:text-textMain'}`}
 >
 <t_obj.icon className="w-3.5 h-3.5" />
 {t_obj.label}
 </button>
 ))}
 </div>
 </div>

 {/* Chat Area */}
 <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide z-10">
 <AnimatePresence initial={false}>
 {messages.map((msg, idx) => (
 <motion.div
 key={idx}
 initial={{ opacity: 0, y: 10, scale: 0.98 }}
 animate={{ opacity: 1, y: 0, scale: 1 }}
 transition={{ duration: 0.3 }}
 className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
 >
 {/* Avatar */}
 <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-lg border ${msg.role === 'assistant' ? 'bg-raven-500/10 border-raven-500/20 text-raven-400' : 'bg-bgSurfaceHighlight border-borderColor text-textMuted'}`}>
 {msg.role === 'assistant' ? <Sparkles className="w-4 h-4" /> : <User className="w-4 h-4" />}
 </div>

 {/* Message Bubble */}
 <div className={`max-w-[80%] rounded-2xl p-5 text-sm leading-relaxed shadow-sm flex flex-col gap-2 ${msg.role === 'assistant' ? 'bg-bgSurface/80 border border-borderColor text-textMain rounded-tl-sm' : 'bg-raven-600 text-textMain rounded-tr-sm shadow-raven-500/10'}`}>

 {msg.type === 'image' ? (
 <div className="rounded-xl overflow-hidden shadow-lg border border-borderColor mt-1">
 <img src={msg.content} alt="Generated" className="w-full h-auto max-w-sm" />
 <div className="p-2 bg-bgColor text-xs text-textMuted flex justify-between">
 <span>{t('ai_studio.generatedBy', 'Generated by Social Raven AI')}</span>
 <a href={msg.content} target="_blank" rel="noopener noreferrer" className="text-raven-400 hover:text-raven-400">{t('ai_studio.openFull', 'Open Full')}</a>
 </div>
 </div>
 ) : msg.type === 'video' ? (
 <div className="rounded-xl overflow-hidden shadow-lg border border-borderColor mt-1">
   <video src={msg.content} controls className="w-full h-auto max-w-sm rounded-t-xl" />
   <div className="p-2 bg-bgColor text-xs text-textMuted flex justify-between">
     <span>{t('ai_studio.generatedBy', 'Generated by Social Raven AI')}</span>
     <a href={msg.content} target="_blank" rel="noopener noreferrer" className="text-raven-400 hover:text-raven-400">{t('ai_studio.openFull', 'Open Full')}</a>
   </div>
 </div>
 ) : (
 <div className="whitespace-pre-wrap font-sans">
 {msg.content}
 </div>
 )}

 {/* Metadata / Actions for Assistants */}
 {msg.role === 'assistant' && !loading && (
 <div className="flex items-center gap-3 mt-2 pt-2 border-t border-borderColor opacity-50 hover:opacity-100 transition-opacity">
 {msg.model && <span className="text-[10px] uppercase font-bold text-textMuted">{msg.model}</span>}
 <div className="flex-1"></div>
 {msg.type === 'text' && (
 <button
 onClick={() => navigator.clipboard.writeText(msg.content)}
 className="flex items-center gap-1.5 text-xs font-medium text-textMuted hover:text-raven-400 transition-colors"
 >
 <Copy className="w-3 h-3" /> {t('ai_studio.copy', 'Copy')}
 </button>
 )}
 {msg.type === 'text' && msg.content && (
 <button
 onClick={() => scheduleMessage(msg.content)}
 className="flex items-center gap-1.5 text-xs font-medium text-textMuted hover:text-raven-400 transition-colors"
 >
 <Calendar className="w-3 h-3" /> {t('ai_studio.schedule', 'Schedule')}
 </button>
 )}
 <button className="flex items-center gap-1.5 text-xs font-medium text-textMuted hover:text-raven-400 transition-colors">
 <RefreshCw className="w-3 h-3" /> {t('ai_studio.retry', 'Retry')}
 </button>
 </div>
 )}
 </div>
 </motion.div>
 ))}
 </AnimatePresence>

 {loading && (
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 className="flex gap-4"
 >
 <div className="w-8 h-8 rounded-lg bg-raven-500/10 border border-raven-500/20 flex items-center justify-center shrink-0">
 <Loader2 className="w-4 h-4 text-raven-400 animate-spin" />
 </div>
 <div className="bg-bgColor border border-borderColor px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1">
 <span className="w-1.5 h-1.5 rounded-full bg-raven-500/50 animate-bounce" style={{ animationDelay: '0ms' }}></span>
 <span className="w-1.5 h-1.5 rounded-full bg-raven-500/50 animate-bounce" style={{ animationDelay: '150ms' }}></span>
 <span className="w-1.5 h-1.5 rounded-full bg-raven-500/50 animate-bounce" style={{ animationDelay: '300ms' }}></span>
 </div>
 </motion.div>
 )}
 <div ref={bottomRef} />
 </div>

 {/* Input Area */}
 <div className="p-6 bg-bgColor border-t border-borderColor z-20">
 <div className="relative max-w-4xl mx-auto">
 <div className="absolute inset-0 bg-raven-500/5 blur-xl -z-10 rounded-full" />
 <input
 value={input}
 onChange={(e) => setInput(e.target.value)}
 onKeyDown={(e) => e.key === 'Enter' && handleSend()}
 disabled={loading}
 type="text"
 placeholder={t('ai_studio.placeholder', "Ask: 'Write a tweet about launch...' or 'Generate an image of a futuristic city...'")}
 className="w-full bg-bgSurface/80 border border-borderColor rounded-xl pl-5 pr-32 py-4 focus:outline-none focus:border-raven-500/50 focus:ring-1 focus:ring-raven-500/50 transition-all text-sm text-textMain placeholder:text-textMuted shadow-xl"
 />
 <div className="absolute right-2 top-2 bottom-2">
 <button
 onClick={handleSend}
 disabled={loading || !input.trim()}
 className="h-full px-5 bg-raven-600 hover:bg-raven-500 disabled:opacity-50 disabled:hover:bg-raven-600 rounded-lg text-textMain text-xs font-bold uppercase tracking-wider transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
 >
 {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
 <span>{t('ai_studio.generate', 'Generate')}</span>
 </button>
 </div>
 </div>
 <div className="text-center mt-3">
 <p className="text-[10px] text-textMuted uppercase tracking-widest font-medium">
 {t('ai_studio.poweredBy', 'Powered by Social Raven AI Models')}
 </p>
 </div>
 </div>
 </div>
 );
}
