import { Link } from 'react-router-dom';
import {
    Calendar, TrendingUp, Sparkles, Users, ArrowRight,
    Globe, CheckCircle, Clock, BarChart3, MessageSquare, Zap, Shield, Code, ChevronRight, Briefcase,
    Radio, Megaphone, Lock, Layout, Workflow, Target, Boxes, Share2
} from 'lucide-react';
import HowItWorks from '../components/HowItWorks';
import { SentimentCard, SocialPostCard, AiAssistCard, StatsCard } from '../components/FloatingWidgets';
import VideoHero from '../components/VideoHero';
import heroImage from '../assets/hero-person-wide.png';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Home() {
    return (
        <div className="bg-black font-sans selection:bg-indigo-500/30">

            {/* THE EVOLUTION SEQUENCE (Taste-Skill) */}
            <VideoHero />

            {/* STRATEGIC VALUE SECTION */}
            <div className="py-24 bg-black relative z-10">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="mb-20 text-center">
                        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic mb-4">Strategic Value</h2>
                        <div className="w-16 h-1.5 bg-indigo-500 mx-auto" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
                        <UserCaseItem
                            title="Orchestrate Multi-Channel Campaigns"
                            desc="Launch synchronized campaigns across LinkedIn, X, Instagram, and more without the chaos. One calendar, total control."
                        />
                        <UserCaseItem
                            title="Convert Followers into Revenue"
                            desc="Stop guessing. Track the direct impact of social posts on your bottom line with advanced conversion attribution."
                        />
                        <UserCaseItem
                            title="Predictive Performance Analytics"
                            desc="Go beyond vanity metrics. Our AI analyzes historical data to tell you exactly what to post and when for maximum reach."
                        />
                        <UserCaseItem
                            title="Scale Brand Authority"
                            desc="Sustain a 24/7 presence with evergreen content recycling and smart-queue technology that keeps your feed active."
                        />
                        <UserCaseItem
                            title="Unify Team Workflows"
                            desc="Eliminate bottlenecks. specialized roles, approval chains, and audit logs keep your team compliant and efficient."
                        />
                        <UserCaseItem
                            title="Delight Customers Instantly"
                            desc="Never miss a query. Consolidate every DM and comment into a single priority inbox with AI-suggested replies."
                        />
                    </div>
                </div>
            </div>

            {/* PLATFORM CAPABILITIES */}
            <div className="py-32 bg-black border-y border-white/5">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="mb-24 text-center">
                        <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter italic mb-4 tracking-[-0.05em]">Autonomous Intelligence</h2>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Engineered for absolute distribution</p>
                    </div>
                    <div className="grid lg:grid-cols-4 gap-12">

                        {/* Column 1: Core Automation */}
                        <div className="lg:col-span-1">
                            <h3 className="text-lg font-bold text-slate-500 uppercase tracking-wide mb-8">Core Automation</h3>
                            <div className="space-y-10">
                                <FeatureItem
                                    icon={MessageSquare}
                                    title="Unified Inbox"
                                    desc="Zero-inbox methodology for all your social channels."
                                />
                                <FeatureItem
                                    icon={Calendar}
                                    title="Visual Scheduler"
                                    desc="Drag-and-drop planning with 'Best Time to Post' AI."
                                />
                                <FeatureItem
                                    icon={BarChart3}
                                    title="Executive Reporting"
                                    desc="Automated, white-labeled PDF reports delivered to stakeholders."
                                />
                            </div>
                        </div>

                        {/* Column 2: Growth Intelligence */}
                        <div className="lg:col-span-1">
                            <h3 className="text-lg font-bold text-slate-500 uppercase tracking-wide mb-8">Growth Intelligence</h3>
                            <div className="space-y-10">
                                <FeatureItem
                                    icon={TrendingUp}
                                    title="ROI Attribution"
                                    desc="Connect social engagement directly to CRM and web conversions."
                                />
                                <FeatureItem
                                    icon={Radio}
                                    title="Competitor Listening"
                                    desc="Monitor share of voice and sentiment against your market rivals."
                                />
                                <FeatureItem
                                    icon={Users}
                                    title="Creator Management"
                                    desc="Discover, vet, and manage influencer partnerships in one CRM."
                                />
                                <FeatureItem
                                    icon={Share2}
                                    title="Employee Amplification"
                                    desc="Turn your workforce into a distribution engine with curated sharing."
                                />
                            </div>
                        </div>

                        {/* Column 3: Ecosystem (Sidebar) */}
                        <div className="lg:col-span-1 lg:col-start-4 bg-white/5 p-10 rounded-[2.5rem] h-fit border border-white/5 backdrop-blur-3xl">
                            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em] mb-8">Ecosystem</h3>
                            <div className="space-y-8">
                                <PlatformLink title="Product Tour" />
                                <PlatformLink title="AI Ghostwriter" />
                                <PlatformLink title="Market Intelligence" />
                                <PlatformLink title="Enterprise Nodes" />
                            </div>

                            <div className="mt-8 pt-8 border-t border-slate-200 dark:border-white/10">
                                <Link to="/login" className="block w-full py-3 bg-primary hover:bg-primaryHover text-white text-center font-bold rounded-xl transition-colors shadow-lg">
                                    Request Custom Demo
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* CTA Bottom */}
            <div className="py-32 bg-black border-t border-white/5">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-7xl font-black text-white mb-12 uppercase italic tracking-tighter">Ready to scale?</h2>
                    <Link to="/login" className="inline-flex items-center gap-4 px-12 py-6 bg-white text-black font-black text-2xl rounded-2xl hover:bg-slate-200 transition-all shadow-2xl hover:scale-105">
                        Start Free Trial
                        <ArrowRight className="w-8 h-8" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

// Helpers
function UserCaseItem({ title, desc }) {
    return (
        <div className="group border-l-2 border-white/5 pl-8 hover:border-indigo-500 transition-colors duration-500">
            <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{title}</h3>
            <p className="text-lg text-slate-400 leading-relaxed font-medium">{desc}</p>
        </div>
    )
}

function FeatureItem({ icon: Icon, title, desc }) {
    return (
        <div className="group">
            <div className="flex items-center gap-4 mb-3">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-indigo-500 transition-colors">
                    <Icon className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white tracking-tight">{title}</h4>
            </div>
            <p className="text-slate-500 leading-relaxed text-sm font-medium">{desc}</p>
        </div>
    )
}

function PlatformLink({ title }) {
    return (
        <a href="#" className="flex items-center justify-between group cursor-pointer hover:bg-white/5 p-3 -mx-3 rounded-2xl transition-all duration-300">
            <span className="text-lg font-bold text-white group-hover:text-indigo-400 tracking-tight">{title}</span>
            <ChevronRight className="w-5 h-5 text-indigo-500 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
        </a>
    )
}
