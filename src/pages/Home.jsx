import { Link } from 'react-router-dom';
import {
    Calendar, TrendingUp, Sparkles, Users,
    Globe, CheckCircle, Clock, BarChart3
} from 'lucide-react';
import HowItWorks from '../components/HowItWorks';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center pt-20 pb-20">
            {/* Hero Section */}
            <div className="text-center max-w-5xl px-4">
                <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold uppercase tracking-wide border border-primary/20 mb-6 inline-block">
                    Social Media Automation & SEO Platform
                </span>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold  mb-6 leading-tight">
                    Automate Your Social Media.
                    <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-teal-500 to-sky-600 dark:from-primary dark:via-secondary dark:to-accent">
                        Amplify Your Reach.
                    </span>
                </h1>
                <p className="text-lg md:text-xl text-slate-600 dark:text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
                    Schedule posts across all major platforms, optimize for SEO, and track performance—all from one powerful dashboard.
                    <strong className="text-slate-900 dark:text-white"> No more juggling tools.</strong>
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/login"
                        className="px-8 py-4 rounded-xl bg-primary hover:bg-primaryHover text-white font-semibold text-lg transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                    >
                        Start Free Trial
                        <Calendar className="w-5 h-5" />
                    </Link>
                    <Link
                        to="/pricing"
                        className="px-8 py-4 rounded-xl bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 text-slate-900 dark:text-white font-semibold text-lg transition-all border-2 border-slate-200 dark:border-white/10"
                    >
                        View Pricing
                    </Link>
                </div>
            </div>

            {/* What We Do Section */}
            <div className="mt-32 w-full max-w-6xl px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Do</h2>
                    <p className="text-slate-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                        HighShift Cloud is your all-in-one platform for social media management, content scheduling, and SEO optimization.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={<Calendar className="w-8 h-8 text-primary" />}
                        title="Multi-Platform Scheduling"
                        desc="Schedule and publish content to Twitter, Facebook, Instagram, LinkedIn, and more—all from one dashboard."
                    />
                    <FeatureCard
                        icon={<TrendingUp className="w-8 h-8 text-emerald-500" />}
                        title="SEO Optimization"
                        desc="Built-in SEO tools to help your content rank higher and reach the right audience at the right time."
                    />
                    <FeatureCard
                        icon={<BarChart3 className="w-8 h-8 text-sky-500" />}
                        title="Performance Analytics"
                        desc="Track engagement, monitor growth, and get actionable insights to improve your social media strategy."
                    />
                    <FeatureCard
                        icon={<Sparkles className="w-8 h-8 text-purple-500" />}
                        title="AI-Powered Content"
                        desc="Use our AI Ghostwriter to generate engaging captions, hashtags, and content ideas instantly."
                    />
                    <FeatureCard
                        icon={<Users className="w-8 h-8 text-pink-500" />}
                        title="Team Collaboration"
                        desc="Invite team members, manage permissions, and streamline your content approval workflow."
                    />
                    <FeatureCard
                        icon={<Globe className="w-8 h-8 text-orange-500" />}
                        title="Centralized Media Library"
                        desc="Store, organize, and reuse your images and videos across all platforms with our media library."
                    />
                </div>
            </div>

            {/* How It Works Section - Animated */}
            <HowItWorks />

            {/* Benefits Grid */}
            <div className="mt-32 w-full max-w-6xl px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Why HighShift Cloud?</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <BenefitCard
                        icon={<Clock className="w-6 h-6 text-primary" />}
                        title="Save Time"
                        desc="Schedule weeks of content in minutes. Automate repetitive tasks and focus on strategy."
                    />
                    <BenefitCard
                        icon={<CheckCircle className="w-6 h-6 text-green-500" />}
                        title="Stay Consistent"
                        desc="Never miss a post. Maintain a consistent presence across all your social channels."
                    />
                    <BenefitCard
                        icon={<BarChart3 className="w-6 h-6 text-blue-500" />}
                        title="Data-Driven Decisions"
                        desc="Understand what works with comprehensive analytics and actionable insights."
                    />
                    <BenefitCard
                        icon={<Sparkles className="w-6 h-6 text-purple-500" />}
                        title="Professional Results"
                        desc="Create polished, engaging content with our AI tools and media library."
                    />
                </div>
            </div>

            {/* CTA Section */}
            <div className="mt-32 w-full max-w-4xl px-4">
                <div className="glass-card rounded-2xl p-12 text-center border-2 border-primary/20">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Ready to Transform Your Social Media?
                    </h2>
                    <p className="text-slate-600 dark:text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                        Join thousands of businesses using HighShift Cloud to streamline their social media management.
                    </p>
                    <Link
                        to="/login"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary hover:bg-primaryHover text-white font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
                    >
                        Get Started for Free
                        <Calendar className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

function FeatureCard({ icon, title, desc }) {
    return (
        <div className="glass-card p-6 rounded-2xl hover:shadow-lg dark:hover:bg-white/5 transition-all border border-slate-200 dark:border-white/10">
            <div className="w-14 h-14 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-4">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{title}</h3>
            <p className="text-slate-600 dark:text-gray-400 leading-relaxed">{desc}</p>
        </div>
    );
}

function BenefitCard({ icon, title, desc }) {
    return (
        <div className="flex gap-4 p-6 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-primary/30 dark:hover:border-primary/30 transition-all">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-white dark:bg-white/10 flex items-center justify-center">
                {icon}
            </div>
            <div>
                <h4 className="font-bold mb-1 text-slate-900 dark:text-white">{title}</h4>
                <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}
