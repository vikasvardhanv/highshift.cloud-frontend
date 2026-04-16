import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Bot, User, Copy, RefreshCw, Loader2, Zap, Command, Image as ImageIcon, Film } from 'lucide-react';
import { generateContent } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

export default function AiStudio() {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            type: 'text',
            content: "I am your Social Raven AI Creative Assistant. I can generate high-impact posts or create visuals. Just ask me to 'write a post about...' or 'generate an image of...'."
        }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [tone, setTone] = useState('Professional');
    const bottomRef = useRef(null);

    const tones = [
        { id: 'Professional', label: 'Professional', icon: Command, color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20' },
        { id: 'Witty', label: 'Witty', icon: Sparkles, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
        { id: 'Aggressive', label: 'Bold', icon: Zap, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
        { id: 'Empathetic', label: 'Empathetic', icon: User, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
        { id: 'Minimalist', label: 'Minimal', icon: Bot, color: 'text-slate-400', bg: 'bg-slate-500/10 border-slate-500/20' }
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
            setMessages(prev => [...prev, { role: 'assistant', type: 'text', content: "My connection to the neural net was interrupted. Please try again." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-[calc(100vh-140px)] flex flex-col relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl">
            {/* Ambient Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[100px]" />
                <div className="absolute top-[40%] -left-[10%] w-[500px] h-[500px] rounded-full bg-purple-600/5 blur-[100px]" />
            </div>

            {/* Header */}
            <div className="z-10 flex flex-col md:flex-row md:items-center justify-between p-6 border-b border-white/5 bg-slate-950/50 backdrop-blur-md">
                <div className="flex items-center gap-4 mb-4 md:mb-0">
                    <div className="relative">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <Bot className="w-6 h-6 text-white" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-slate-950 flex items-center justify-center">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                            Social Raven AI <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/20 tracking-wide">PRO</span>
                        </h2>
                        <p className="text-xs text-slate-400">Multi-modal Creative Engine</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                    {tones.map(t => (
                        <button
                            key={t.id}
                            onClick={() => setTone(t.id)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border
                            ${tone === t.id
                                    ? `${t.bg} ${t.color} border-current shadow-lg shadow-indigo-500/5 ring-1 ring-inset ring-white/5`
                                    : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10 hover:text-slate-200'}`}
                        >
                            <t.icon className="w-3.5 h-3.5" />
                            {t.label}
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
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-lg border
                                ${msg.role === 'assistant'
                                    ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
                                    : 'bg-slate-800 border-slate-700 text-slate-300'}`}>
                                {msg.role === 'assistant' ? <Sparkles className="w-4 h-4" /> : <User className="w-4 h-4" />}
                            </div>

                            {/* Message Bubble */}
                            <div className={`max-w-[80%] rounded-2xl p-5 text-sm leading-relaxed shadow-sm flex flex-col gap-2
                                ${msg.role === 'assistant'
                                    ? 'bg-slate-900/80 border border-white/10 text-slate-200 rounded-tl-sm'
                                    : 'bg-indigo-600 text-white rounded-tr-sm shadow-indigo-500/10'}`}>

                                {msg.type === 'image' ? (
                                    <div className="rounded-xl overflow-hidden shadow-lg border border-white/10 mt-1">
                                        <img src={msg.content} alt="Generated" className="w-full h-auto max-w-sm" />
                                        <div className="p-2 bg-slate-950/50 text-xs text-slate-400 flex justify-between">
                                            <span>Generated by Social Raven AI</span>
                                            <a href={msg.content} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300">Open Full</a>
                                        </div>
                                    </div>
                                ) : msg.type === 'video' ? (
                                    <div className="p-4 bg-slate-800/50 rounded-xl border border-white/5 flex items-center gap-3">
                                        <Film className="w-6 h-6 text-indigo-400" />
                                        <span className="italic text-slate-400">{msg.content}</span>
                                    </div>
                                ) : (
                                    <div className="whitespace-pre-wrap font-sans">
                                        {msg.content}
                                    </div>
                                )}

                                {/* Metadata / Actions for Assistants */}
                                {msg.role === 'assistant' && !loading && (
                                    <div className="flex items-center gap-3 mt-2 pt-2 border-t border-white/5 opacity-50 hover:opacity-100 transition-opacity">
                                        {msg.model && <span className="text-[10px] uppercase font-bold text-slate-500">{msg.model}</span>}
                                        <div className="flex-1"></div>
                                        {msg.type === 'text' && (
                                            <button
                                                onClick={() => navigator.clipboard.writeText(msg.content)}
                                                className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-indigo-400 transition-colors"
                                            >
                                                <Copy className="w-3 h-3" /> Copy
                                            </button>
                                        )}
                                        <button className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-indigo-400 transition-colors">
                                            <RefreshCw className="w-3 h-3" /> Retry
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
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                            <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
                        </div>
                        <div className="bg-slate-900/50 border border-white/5 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/50 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/50 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/50 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                        </div>
                    </motion.div>
                )}
                <div ref={bottomRef} />
            </div>

            {/* Input Area */}
            <div className="p-6 bg-slate-950 border-t border-white/5 z-20">
                <div className="relative max-w-4xl mx-auto">
                    <div className="absolute inset-0 bg-indigo-500/5 blur-xl -z-10 rounded-full" />
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        disabled={loading}
                        type="text"
                        placeholder="Ask: 'Write a tweet about launch...' or 'Generate an image of a futuristic city...'"
                        className="w-full bg-slate-900/80 border border-white/10 rounded-xl pl-5 pr-32 py-4 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all text-sm text-white placeholder-slate-500 shadow-xl"
                    />
                    <div className="absolute right-2 top-2 bottom-2">
                        <button
                            onClick={handleSend}
                            disabled={loading || !input.trim()}
                            className="h-full px-5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 rounded-lg text-white text-xs font-bold uppercase tracking-wider transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
                        >
                            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                            <span>Generate</span>
                        </button>
                    </div>
                </div>
                <div className="text-center mt-3">
                    <p className="text-[10px] text-slate-600 uppercase tracking-widest font-medium">
                        Powered by Social Raven AI Models
                    </p>
                </div>
            </div>
        </div>
    );
}
