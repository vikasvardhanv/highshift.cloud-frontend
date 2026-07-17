import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import {
  Calendar, TrendingUp, Users, ArrowRight,
  MessageSquare, BarChart3, Radio, Share2, Shield, Workflow, Lock, Zap
} from 'lucide-react';
import heroImage from '../assets/hero-social-raven.png';
export default function Home() {
  return (
    <div className="bg-bgColor font-sans min-h-screen text-textMain selection:bg-primary/30 relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50"></div>


      {/* HERO SECTION */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 px-4 max-w-7xl mx-auto flex flex-col items-center text-center z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-borderColor bg-bgSurface/50 backdrop-blur-md text-sm font-medium text-textMuted shadow-xl">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            New: Autonomous Distribution Engine
          </div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 max-w-5xl leading-[1.1]"
        >
          The operating system for <br className="hidden md:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
            social distribution.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-textMuted max-w-2xl mb-12"
        >
          Social Raven unifies your campaigns, predictive analytics, and creator management into a single, high-performance platform. Stop guessing, start scaling.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link to="/login" className="px-8 py-4 bg-textMain text-bgColor hover:bg-white/90 font-bold rounded-xl transition-all flex items-center gap-2">
            Start Free Trial <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/product" className="px-8 py-4 bg-bgSurface border border-borderColor hover:border-white/20 text-textMain font-medium rounded-xl transition-all shadow-xl">
            View Documentation
          </Link>
        </motion.div>

        {/* Dashboard Preview Graphic */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-24 w-full relative max-w-5xl mx-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bgColor/10 to-bgColor z-10 pointer-events-none"></div>
          <div className="rounded-2xl border border-borderColor bg-bgSurface/30 p-2 lg:p-4 backdrop-blur-xl shadow-2xl shadow-primary/10 overflow-hidden">
             <img 
               src={heroImage} 
               alt="Social Raven Platform" 
               className="w-full h-auto rounded-xl border border-borderColor object-cover"
             />
          </div>
        </motion.div>
      </section>

      {/* STRATEGIC VALUE (BENTO BOX) */}
      <section className="py-32 px-4 max-w-7xl mx-auto relative z-10">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Everything you need to <br/><span className="text-textMuted">scale distribution.</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          
          {/* Bento Card 1 - Large */}
          <div className="md:col-span-2 bg-bgSurface border border-borderColor rounded-3xl p-8 relative overflow-hidden group hover:border-white/10 transition-colors flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -mr-20 -mt-20 transition-transform duration-700 group-hover:scale-110"></div>
            <div>
              <div className="w-12 h-12 bg-bgSurfaceHighlight rounded-xl flex items-center justify-center mb-6">
                <Calendar className="w-6 h-6 text-textMain" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Multi-Channel Campaigns</h3>
              <p className="text-textMuted max-w-md">Launch synchronized campaigns across LinkedIn, X, and Instagram. One visual calendar gives you total control without the chaos.</p>
            </div>
          </div>

          {/* Bento Card 2 - Small */}
          <div className="md:col-span-1 bg-bgSurface border border-borderColor rounded-3xl p-8 relative overflow-hidden group hover:border-white/10 transition-colors flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-bgSurfaceHighlight rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-textMain" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Revenue Attribution</h3>
              <p className="text-textMuted text-sm">Track the direct impact of social posts on your bottom line with CRM integration.</p>
            </div>
          </div>

          {/* Bento Card 3 - Small */}
          <div className="md:col-span-1 bg-bgSurface border border-borderColor rounded-3xl p-8 relative overflow-hidden group hover:border-white/10 transition-colors flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-bgSurfaceHighlight rounded-xl flex items-center justify-center mb-6">
                <MessageSquare className="w-6 h-6 text-textMain" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Unified Inbox</h3>
              <p className="text-textMuted text-sm">Consolidate every DM and comment into a single priority inbox.</p>
            </div>
          </div>

          {/* Bento Card 4 - Large */}
          <div className="md:col-span-2 bg-bgSurface border border-borderColor rounded-3xl p-8 relative overflow-hidden group hover:border-white/10 transition-colors flex flex-col justify-between">
             <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -mr-20 -mb-20 transition-transform duration-700 group-hover:scale-110"></div>
            <div>
              <div className="w-12 h-12 bg-bgSurfaceHighlight rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-textMain" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Predictive Analytics</h3>
              <p className="text-textMuted max-w-md">Our AI analyzes historical data to tell you exactly what to post and when for maximum reach. Go beyond vanity metrics.</p>
            </div>
          </div>

        </div>
      </section>

      {/* AUTONOMOUS INTELLIGENCE */}
      <section className="py-32 border-t border-borderColor relative z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-bgSurface/20 to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-4 max-w-7xl relative">
          <div className="mb-20 text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Autonomous Intelligence</h2>
            <p className="text-textMuted">Engineered for absolute distribution and brand authority.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureBox 
              icon={Users}
              title="Creator Management"
              desc="Discover, vet, and manage influencer partnerships in one seamless CRM."
            />
            <FeatureBox 
              icon={Share2}
              title="Employee Amplification"
              desc="Turn your workforce into a distribution engine with curated sharing."
            />
            <FeatureBox 
              icon={Radio}
              title="Competitor Listening"
              desc="Monitor share of voice and sentiment against your market rivals."
            />
            <FeatureBox 
              icon={Workflow}
              title="Team Workflows"
              desc="Specialized roles, approval chains, and audit logs keep your team compliant."
            />
            <FeatureBox 
              icon={Shield}
              title="Enterprise Grade"
              desc="SOC2 compliant infrastructure with dedicated IP nodes for massive scale."
            />
            <FeatureBox 
              icon={Zap}
              title="AI Ghostwriter"
              desc="Generate high-converting copy specifically tuned to your brand voice."
            />
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="py-40 relative overflow-hidden border-t border-borderColor">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/10 pointer-events-none"></div>
        <div className="absolute bottom-[-50%] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-primary/20 blur-[150px] rounded-full pointer-events-none"></div>
        
        <div className="container mx-auto px-4 max-w-3xl text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">Ready to scale?</h2>
          <p className="text-xl text-textMuted mb-12">Join thousands of brands orchestrating their social presence with Social Raven.</p>
          <Link to="/login" className="inline-flex items-center gap-3 px-10 py-5 bg-textMain text-bgColor font-bold rounded-2xl hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)]">
            Get Started Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  );
}

function FeatureBox({ icon: Icon, title, desc }) {
  return (
    <div className="p-8 rounded-2xl border border-borderColor bg-bgSurface/30 backdrop-blur-sm hover:bg-bgSurfaceHighlight/50 transition-colors">
      <Icon className="w-6 h-6 text-primary mb-6" />
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-textMuted text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
