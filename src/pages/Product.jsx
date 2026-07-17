import { motion, AnimatePresence } from"framer-motion";
import { Link } from 'react-router-dom';
import { 
 Zap, Sparkles, Globe, BarChart3, MessageSquare, 
 Shield, Cpu, Layers, Target, Clock, ArrowRight 
} from 'lucide-react';

export default function ProductPage() {
 return (
 <div className="min-h-screen bg-black text-textMain selection:bg-raven-500/30 overflow-x-hidden font-sans">
 
 {/* Cinematic Hero */}
 <section className="relative h-screen flex items-center justify-center p-6 bg-black overflow-hidden">
 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-black to-black opacity-60" />
 <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-raven-600/5 blur-[120px] rounded-full" />
 <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-purple-600/5 blur-[150px] rounded-full" />

 <div className="relative z-10 text-center max-w-5xl mx-auto">
 <motion.div 
 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
 className="flex flex-col items-center gap-6"
 >
 <div className="w-24 h-24 rounded-[2rem] bg-raven-600 flex items-center justify-center shadow-2xl shadow-raven-600/30">
 <Zap className="w-12 h-12 text-textMain fill-white" />
 </div>
 <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-[0.8] mb-4 text-textMain">
 Engineered<br/>For Impact
 </h1>
 <p className="text-xl md:text-2xl text-textMuted font-bold uppercase tracking-[0.2em] mb-12">
 The Silent Engine of Social Success
 </p>
 <div className="flex gap-4">
 <Link to="/login" className="px-10 py-5 bg-[#0a0a0a]/80 backdrop-blur-md text-textMain font-black uppercase italic tracking-tighter text-xl rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all inline-block">
 Deploy Raven
 </Link>
 <Link to="/docs" className="px-10 py-5 bg-white/5 backdrop-blur-sm border border-white/10 border border-white/10 text-textMain font-black uppercase italic tracking-tighter text-xl rounded-2xl backdrop-blur-md hover:bg-white/10 transition-all inline-block">
 Documentation
 </Link>
 </div>
 </motion.div>
 </div>
 </section>

 {/* Feature Modules */}
 <section className="py-32 px-6">
 <div className="max-w-7xl mx-auto space-y-32">
 
 {/* Multi-Profile Orchestration */}
 <Module 
 icon={Layers}
 title="Profile Orchestration"
 headline="Group Your Worlds"
 desc="Separate clients, brands, or projects into distinct Profiles. Link multiple social accounts under each profile to keep your data siloed and your workflow clean."
 color="text-raven-400"
 link="/features/publishing"
 />

 {/* Instant Publish */}
 <Module 
 icon={Sparkles}
 title="Instant Distribution"
 headline="The Speed of AI"
 desc="Enter a topic, define your audience, and let Social Raven handle the rest. Our orchestration engine instantly crafts and distributes optimized content across your nodes."
 reverse
 color="text-emerald-400"
 link="/features/publishing"
 />

 {/* AI Ghostwriter */}
 <Module 
 icon={Cpu}
 title="Neural Engine"
 headline="Your AI Ghostwriter"
 desc="Built-in AI writing assistant that learns your brand tone and crafts compelling hooks for X, LinkedIn, Instagram, and more."
 color="text-purple-400"
 link="/features/ghostwriter"
 />

 </div>
 </section>

 {/* Technical Specs */}
 <section className="py-32 bg-white/5 backdrop-blur-sm border border-white/10 border-y border-white/10 relative overflow-hidden">
 <div className="max-w-7xl mx-auto px-6">
 <div className="mb-20 text-center">
 <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4 text-textMain">Advanced Architecture</h2>
 <p className="text-textMuted font-bold tracking-widest uppercase text-xs">A Technical Masterpiece Built for Scale</p>
 </div>

 <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
 <StatCard icon={Target} title="Smart Targeting" value="100%" desc="Algorithm Optimized" />
 <StatCard icon={Globe} title="Unified Hub" value="Global" desc="Cross-Platform Support" />
 <StatCard icon={BarChart3} title="Deep Insights" value="Real-time" desc="Engagement Tracking" />
 <StatCard icon={Shield} title="Bank-Grade" value="Encrypted" desc="Key Management" />
 </div>
 </div>
 </section>

 {/* Bottom CTA */}
 <section className="py-40 px-6 text-center">
 <div className="max-w-4xl mx-auto">
 <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter mb-12 text-textMain">Take Flight Today</h2>
 <Link to="/login" className="group relative inline-flex px-16 py-8 bg-raven-600 text-textMain font-black uppercase italic tracking-tighter text-3xl rounded-[2.5rem] shadow-2xl shadow-raven-600/40 hover:scale-110 active:scale-95 transition-all overflow-hidden items-center justify-center">
 <span className="relative z-10 flex items-center gap-4">Start Your Evolution <ArrowRight className="w-10 h-10 group-hover:translate-x-3 transition-transform" /></span>
 <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-raven-500 opacity-0 group-hover:opacity-100 transition-opacity" />
 </Link>
 </div>
 </section>

 </div>
 );
}

function Module({ icon: Icon, title, headline, desc, reverse, color, link }) {
 return (
 <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16 lg:gap-32`}>
 <div className="flex-1 space-y-8">
 <div className={`flex items-center gap-3 font-black italic uppercase tracking-[0.2em] text-sm ${color}`}>
 <Icon className="w-5 h-5" /> {title}
 </div>
 <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-tight text-textMain">{headline}</h2>
 <p className="text-xl text-textMuted font-medium max-w-xl leading-relaxed">{desc}</p>
 <Link to={link} className="inline-flex items-center gap-2 text-textMain font-black italic uppercase tracking-widest text-xs group">
 Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
 </Link>
 </div>
 <div className="flex-1 w-full aspect-video rounded-[3.5rem] bg-raven-600/5 border border-white/10 flex items-center justify-center p-12 overflow-hidden relative">
 <div className={`w-full h-full rounded-[2.5rem] ${color.replace('text', 'bg').replace('400', '500')}/10 blur-3xl absolute inset-0 opacity-30`} />
 <Icon className={`w-32 h-32 ${color} relative z-10`} strokeWidth={0.5} />
 </div>
 </div>
 );
}

function StatCard({ icon: Icon, title, value, desc }) {
 return (
 <div className="p-10 bg-black border border-white/10 rounded-[2.5rem] hover:border-white/20 transition-all text-center group">
 <div className="w-12 h-12 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center mx-auto mb-8 group-hover:bg-raven-600 group-hover:text-textMain transition-all">
 <Icon className="w-6 h-6" />
 </div>
 <div className="text-4xl font-black italic uppercase tracking-tighter mb-2">{value}</div>
 <div className="text-sm font-bold text-textMain uppercase tracking-widest mb-1">{title}</div>
 <div className="text-xs text-textMuted font-medium">{desc}</div>
 </div>
 );
}
