import { Link } from 'react-router-dom';
import {
    Calendar, TrendingUp, Sparkles, Users, ArrowRight,
    Globe, CheckCircle, Clock, BarChart3, MessageSquare, Zap, Shield, Code, ChevronRight, Briefcase,
    Radio, Megaphone, Lock, Layout, Workflow, Target, Boxes, Share2
} from 'lucide-react';
import HowItWorks from '../components/HowItWorks';
import { SentimentCard, SocialPostCard, AiAssistCard, StatsCard } from '../components/FloatingWidgets';
import heroImage from '../assets/hero-person-wide.png';

export default function Home() {
    return (
        <div className="bg-white dark:bg-black font-sans">

            {/* HERO SECTION */}
            <div className="relative bg-slate-950 pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-16">

                        {/* Text Content */}
                        <div className="flex-1 text-center lg:text-left z-10">
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
                                The Intelligent OS for <br />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500">
                                    Social Growth
                                </span>
                            </h1>
                            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                Stop manually posting. Start dominating. Automate scheduling, unify your inbox, and prove ROI with AI-powered precision across every channel.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                                <Link to="/login" className="px-8 py-4 bg-primary hover:bg-primaryHover text-white font-bold rounded-xl text-lg transition-all shadow-lg hover:shadow-primary/25 flex items-center gap-2">
                                    Start Free Trial
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-lg transition-all border border-white/10">
                                    Live Product Tour
                                </button>
                            </div>
                            <p className="mt-4 text-xs text-slate-500 uppercase tracking-widest font-bold">No credit card required • GDPR Compliant • 99.9% Uptime</p>
                        </div>

                        {/* Hero Image & Widgets */}
                        <div className="flex-1 relative w-full max-w-xl lg:max-w-none">
                            {/* Updated Container */}
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-900 group">
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-50 mix-blend-overlay z-10"></div>
                                <img
                                    src={heroImage}
                                    alt="Social Media Manager optimizing workflow"
                                    className="w-full h-auto object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out"
                                />

                                {/* Floating Widgets Overlay */}
                                <div className="absolute inset-0 z-20 pointer-events-none">
                                    <div className="relative w-full h-full">
                                        <SentimentCard />
                                        <SocialPostCard />
                                        <AiAssistCard />
                                        <StatsCard />
                                    </div>
                                </div>
                            </div>

                            {/* Glow effects */}
                            <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none -z-10"></div>
                            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* STRATEGIC VALUE SECTION (Formerly Use Cases) */}
            <div className="py-24 bg-white dark:bg-black">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-500 uppercase tracking-widest mb-2 border-b-2 border-slate-100 dark:border-white/10 pb-4 inline-block">Strategic Value</h2>
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

            {/* PLATFORM CAPABILITIES (Formerly Platform Overview) */}
            <div className="py-24 bg-slate-50 dark:bg-white/5 border-y border-slate-200 dark:border-white/5">
                <div className="container mx-auto px-4 max-w-7xl">
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
                        <div className="lg:col-span-1 lg:col-start-4 bg-slate-100 dark:bg-white/5 p-8 rounded-2xl h-fit">
                            <h3 className="text-lg font-bold text-slate-500 uppercase tracking-wide mb-6">Ecosystem</h3>
                            <div className="space-y-6">
                                <PlatformLink title="Take the Product Tour" />
                                <PlatformLink title="AI Ghostwriter" />
                                <PlatformLink title="CRM Integrations" />
                                <PlatformLink title="Enterprise Security" />
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

            {/* HOW IT WORKS (Animated) */}
            <HowItWorks />

            {/* DEVELOPER & COMMUNITY */}
            <div className="py-24 bg-white dark:bg-black">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Developers & Community</h2>
                        <p className="text-slate-500">Extensible infrastructure for scaling teams.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {/* API Card */}
                        <div className="group bg-slate-950 rounded-3xl p-8 relative overflow-hidden text-white hover:scale-[1.02] transition-transform duration-300">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Boxes className="w-32 h-32" />
                            </div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                                    <Code className="w-6 h-6 text-green-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">HighShift API</h3>
                                <p className="text-slate-400 mb-6 text-sm">
                                    Programmatic access to publishing, analytics, and listening data. Build custom dashboards.
                                </p>
                                <div className="bg-black/50 rounded-lg p-3 font-mono text-xs text-green-400 mb-6 border border-white/10">
                                    curl -X POS /api/v1/schedule
                                </div>
                                <Link to="/docs" className="inline-flex items-center gap-2 text-sm font-bold hover:text-green-400 transition-colors">
                                    Read API Docs <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-white/5 rounded-3xl p-8 border border-slate-100 dark:border-white/10 hover:border-primary/50 transition-colors hover:shadow-lg">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                                <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Strategy Hub</h3>
                            <p className="text-slate-500 dark:text-gray-400 mb-6 text-sm">
                                Masterclasses, case studies, and templates from top social strategists.
                            </p>
                            <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">
                                Browse Resources <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="bg-slate-50 dark:bg-white/5 rounded-3xl p-8 border border-slate-100 dark:border-white/10 hover:border-primary/50 transition-colors hover:shadow-lg">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-500/20 rounded-xl flex items-center justify-center mb-6">
                                <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Knowledge Base</h3>
                            <p className="text-slate-500 dark:text-gray-400 mb-6 text-sm">
                                24/7 self-service support, video tutorials, and implementation guides.
                            </p>
                            <Link to="/help" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">
                                Visit Help Center <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Bottom */}
            <div className="py-20 bg-primary">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Ready to modernize your social stack?</h2>
                    <Link to="/login" className="inline-flex items-center gap-2 px-10 py-5 bg-white text-primary font-bold text-xl rounded-2xl hover:bg-slate-50 transition-colors shadow-2xl">
                        Start 30-Day Free Trial
                        <ArrowRight className="w-6 h-6" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

// Helpers
function UserCaseItem({ title, desc }) {
    return (
        <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{title}</h3>
            <p className="text-lg text-slate-600 dark:text-gray-400 leading-relaxed font-light text-base">{desc}</p>
        </div>
    )
}

function FeatureItem({ icon: Icon, title, desc }) {
    return (
        <div className="group">
            <div className="flex items-center gap-3 mb-2">
                <Icon className="w-6 h-6 text-slate-900 dark:text-white" />
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h4>
            </div>
            <p className="text-slate-600 dark:text-gray-400 leading-relaxed text-sm">{desc}</p>
        </div>
    )
}

function PlatformLink({ title }) {
    return (
        <a href="#" className="flex items-center justify-between group cursor-pointer hover:bg-white dark:hover:bg-white/10 p-2 -mx-2 rounded-lg transition-colors">
            <span className="text-lg font-bold text-slate-900 dark:text-white">{title}</span>
            <ChevronRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
        </a>
    )
}
