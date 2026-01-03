import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, BarChart3, Calendar, Palette, Sparkles, LogOut, Menu, X, Image as ImageIcon, History,
    ChevronDown, Globe, Zap, MessageSquare, Briefcase, Building, Code, BookOpen, LifeBuoy, Key, PieChart, Users, Activity
} from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from '../components/ThemeToggle';

export default function Navbar() {
    const location = useLocation();
    const apiKey = localStorage.getItem('social_api_key');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        if (confirm('Are you sure you want to logout? This will clear your API Key.')) {
            localStorage.removeItem('social_api_key');
            window.location.href = '/';
        }
    };

    const privateLinks = [
        { name: 'Connections', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Analytics', path: '/analytics', icon: BarChart3 },
        { name: 'Schedule', path: '/schedule', icon: Calendar },
        { name: 'Media', path: '/media', icon: ImageIcon },
        { name: 'Ghostwriter', path: '/ai', icon: Sparkles },
        { name: 'Brand Kit', path: '/brand', icon: Palette },
        { name: 'History', path: '/history', icon: History },
    ];

    const publicNavItems = [
        {
            name: 'Platform',
            children: [
                { name: 'Publishing', icon: Calendar, desc: 'Schedule & Publish', path: '/#publishing' },
                { name: 'Analytics', icon: BarChart3, desc: 'Measure Performace', path: '/#analytics' },
                { name: 'Engagement', icon: MessageSquare, desc: 'Social Inbox', path: '/#engagement' },
                { name: 'Listening', icon: Activity, desc: 'Monitor Trends', path: '/#listening' },
                { name: 'Advocacy', icon: Users, desc: 'Employee Advocacy', path: '/#advocacy' },
            ]
        },
        {
            name: 'Solutions',
            children: [
                { name: 'Enterprise', icon: Building, desc: 'Scale your organization', path: '/#enterprise' },
                { name: 'Agencies', icon: Briefcase, desc: 'Manage multiple clients', path: '/#agencies' },
                { name: 'Small Business', icon: Zap, desc: 'Grow your brand', path: '/#smb' },
            ]
        },
        {
            name: 'Resources',
            children: [
                { name: 'API Docs', icon: Code, desc: 'Build with HighShift', path: '/docs' },
                { name: 'Help Center', icon: LifeBuoy, desc: 'Guides & Support', path: '/help' },
                { name: 'Get API Key', icon: Key, desc: 'Developer Settings', path: '/dashboard' },
                { name: 'Blog', icon: BookOpen, desc: 'Tips & Strategy', path: '/blog' },
            ]
        },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 backdrop-blur-md
            ${apiKey
                ? 'bg-white/90 dark:bg-black/80 border-b border-slate-200 dark:border-white/10'
                : 'bg-slate-950/90 border-b border-slate-800 text-white'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo Area */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center
                                ${apiKey ? 'bg-gradient-to-br from-primary to-secondary shadow-lg' : 'bg-white shadow-sm'}`}>
                                <span className={`font-bold ${apiKey ? 'text-white' : 'text-slate-900'}`}>H</span>
                            </div>
                            <span className={`font-bold text-xl tracking-tight
                                ${apiKey
                                    ? 'bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-gray-400'
                                    : 'text-white'
                                }`}>
                                HighShift Cloud
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        {apiKey ? (
                            // Logged In: Dashboard Links
                            privateLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-2 group relative overflow-hidden
                                    ${location.pathname === link.path
                                            ? 'text-primary bg-primary/10 border border-primary/20 shadow-sm font-bold'
                                            : 'text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                                        }`}
                                >
                                    <link.icon className={`w-4 h-4 ${location.pathname === link.path ? 'text-primary' : 'text-gray-500 group-hover:text-primary transition-colors'}`} />
                                    {link.name}
                                </Link>
                            ))
                        ) : (
                            // Logged Out: Mega Menu Drops
                            <div className="flex items-center gap-2">
                                {publicNavItems.map((item) => (
                                    <div key={item.name} className="group relative">
                                        <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
                                            {item.name} <ChevronDown className="w-4 h-4 opacity-50 group-hover:rotate-180 transition-transform" />
                                        </button>

                                        {/* Dropdown */}
                                        <div className="hidden group-hover:block absolute top-full left-1/2 -translate-x-1/2 w-72 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl shadow-black/50 overflow-hidden pt-1 mt-1 transition-all animate-fade-in-down z-50">
                                            <div className="p-2 space-y-1">
                                                <div className="px-3 py-1 text-xs font-bold text-slate-500 uppercase tracking-wider">{item.name}</div>
                                                {item.children.map(child => (
                                                    <Link key={child.name} to={child.path} className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group/link">
                                                        <div className="mt-1 p-1.5 bg-white/5 rounded-md group-hover/link:bg-primary/20 group-hover/link:text-primary transition-colors text-slate-400">
                                                            <child.icon className="w-4 h-4" />
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-semibold text-white">{child.name}</div>
                                                            <div className="text-xs text-slate-500 group-hover/link:text-slate-400">{child.desc}</div>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <Link to="/pricing" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">Plans & Pricing</Link>
                            </div>
                        )}
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-4">
                        <ThemeToggle />

                        {apiKey ? (
                            <button onClick={handleLogout} className="hidden md:flex p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20" title="Logout">
                                <LogOut className="w-5 h-5" />
                            </button>
                        ) : (
                            // Public Actions
                            <div className="hidden md:flex items-center gap-4">
                                <Link to="/login" className="text-sm font-bold text-white hover:text-primary transition-colors">
                                    Log In
                                </Link>
                                <Link to="/login" className="bg-primary hover:bg-primaryHover text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg hover:shadow-primary/25">
                                    Start Free Trial
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Toggle */}
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-gray-400 hover:text-white">
                            {isMenuOpen ? <X className={`w-6 h-6 ${apiKey ? 'text-slate-800 dark:text-white' : 'text-white'}`} /> : <Menu className={`w-6 h-6 ${apiKey ? 'text-slate-800 dark:text-white' : 'text-white'}`} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className={`md:hidden border-t absolute w-full left-0 animate-fade-in-down h-screen sm:h-auto overflow-y-auto pb-20
                    ${apiKey ? 'bg-white/95 dark:bg-black/95 border-slate-200 dark:border-white/10' : 'bg-slate-950 border-slate-800'}`}>
                    <div className="px-4 py-4 space-y-4">
                        {apiKey ? (
                            privateLinks.map(link => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`flex items-center gap-3 p-3 rounded-xl font-medium ${location.pathname === link.path ? 'bg-primary/20 text-primary' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                                >
                                    <link.icon className="w-5 h-5" /> {link.name}
                                </Link>
                            ))
                        ) : (
                            // Public Mobile Menu
                            <>
                                {publicNavItems.map(item => (
                                    <div key={item.name} className="border-b border-white/5 pb-4">
                                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{item.name}</div>
                                        <div className="grid grid-cols-1 gap-2">
                                            {item.children.map(child => (
                                                <Link
                                                    key={child.name}
                                                    to={child.path}
                                                    onClick={() => setIsMenuOpen(false)}
                                                    className="flex items-center gap-3 p-2 rounded-lg text-slate-300 hover:bg-white/5 hover:text-white"
                                                >
                                                    <child.icon className="w-4 h-4 text-slate-500" />
                                                    {child.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                <Link to="/pricing" onClick={() => setIsMenuOpen(false)} className="block py-2 text-slate-300 font-bold">Pricing</Link>
                                <div className="pt-4 flex gap-3">
                                    <Link to="/login" onClick={() => setIsMenuOpen(false)} className="flex-1 py-3 bg-white/10 rounded-xl text-center font-bold text-white">Log In</Link>
                                    <Link to="/login" onClick={() => setIsMenuOpen(false)} className="flex-1 py-3 bg-primary rounded-xl text-center font-bold text-white">Start Free Trial</Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
