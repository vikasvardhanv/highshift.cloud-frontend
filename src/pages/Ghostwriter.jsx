import { useState } from 'react';
import { Send, Sparkles, Bot, User, Copy, ThumbsUp, RefreshCw, Loader2 } from 'lucide-react';
import { generateContent } from '../services/api';

export default function Ghostwriter() {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hi! I\'m your AI Ghostwriter. Tell me what topic you want me to write about, or give me a link to summarize!' }
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!input.trim()) return;

        setMessages([...messages, { role: 'user', content: input }]);
        setInput('');

        // Mock Response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: `Here are 3 post variations about "${input}":\n\n1. 🚀 Just discovered something amazing about ${input}! Can't wait to share more details soon. #Innovation #Tech\n\n2. 💡 Pro Tip: When dealing with ${input}, always remember to focus on the basics first. It makes a huge difference!\n\n3. 🧵 Thread: Everything you need to know about ${input} in 5 simple steps. Let's dive in! 👇`
            }]);
        }, 1000);
    };

    return (
        <div className="h-[calc(100vh-140px)] flex flex-col glass-card rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center gap-3 bg-white/5">
                <div className="p-2 bg-primary/20 rounded-lg">
                    <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                    <h2 className="font-bold">AI Ghostwriter</h2>
                    <p className="text-xs text-gray-400">Powered by GPT-4 & HighShift Context Engine</p>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 
                            ${msg.role === 'assistant' ? 'bg-primary/20 text-primary' : 'bg-white/10 text-white'}`}>
                            {msg.role === 'assistant' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                        </div>
                        <div className={`max-w-[70%] p-4 rounded-2xl whitespace-pre-wrap
                            ${msg.role === 'assistant'
                                ? 'bg-white/5 border border-white/5 text-gray-200 rounded-tl-none'
                                : 'bg-primary text-white rounded-tr-none'}`}>
                            {msg.content}

                            {msg.role === 'assistant' && (
                                <div className="flex gap-2 mt-4 pt-4 border-t border-white/10">
                                    <button className="p-1.5 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors" title="Copy">
                                        <Copy className="w-3.5 h-3.5" />
                                    </button>
                                    <button className="p-1.5 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors" title="Regenerate">
                                        <RefreshCw className="w-3.5 h-3.5" />
                                    </button>
                                    <button className="ml-auto p-1.5 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors" title="Good Response">
                                        <ThumbsUp className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-white/5 bg-white/[0.02]">
                <div className="relative">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        type="text"
                        placeholder="Ask me to write a post, summarize an article, or create a thread..."
                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-4 pr-12 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                    />
                    <button
                        onClick={handleSend}
                        className="absolute right-2 top-2 p-2 bg-primary hover:bg-primaryHover rounded-lg text-white transition-colors"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
