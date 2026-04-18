import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { getCurrentUser } from '../services/api';
import { User, ChevronDown, LogOut, Menu, Settings } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

export default function DashboardLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false); // Default closed on mobile, logic below handles desktop
    const [user, setUser] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const location = useLocation();

    const loadUserInfo = async () => {
        try {
            const data = await getCurrentUser();
            setUser({
                name: data.name || 'User',
                email: data.email,
                avatar: null,
                initials: data.initials || 'U'
            });
        } catch (err) {
            console.error('Failed to load user info:', err);
            // If auth fails (401), redirect to login
            if (err.response?.status === 401 || !localStorage.getItem('token')) {
                window.location.href = '/login';
                return;
            }
            // For other errors, show minimal fallback but keep user in app
            setUser({ name: 'User', initials: 'U', email: '' });
        }
    };

    useEffect(() => {
        loadUserInfo();
        if (window.innerWidth >= 1024) {
            setSidebarOpen(true);
        }
    }, []);

    const handleLogout = () => {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('token');
            localStorage.removeItem('social_api_key');
            window.location.href = '/login';
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-background font-sans flex overflow-x-hidden text-slate-900 dark:text-slate-100">
            {/* Sidebar Component - Mobile Overlays, Desktop stays fixed */}
            <Sidebar 
                isOpen={sidebarOpen} 
                onToggle={() => setSidebarOpen(!sidebarOpen)} 
                onClose={() => setSidebarOpen(false)}
            />

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content Area */}
            <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 relative z-10 w-full
                ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>

                {/* Top Bar - Clean Professional */}
                <header className="sticky top-0 z-40 bg-white/80 dark:bg-surface/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5 h-16">
                    <div className="px-4 lg:px-6 h-full flex items-center justify-between">
                        {/* Title Breadcrumb & Mobile Menu Toggle */}
                        <div className="flex items-center gap-3 lg:gap-4">
                            <button 
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="p-2 -ml-2 rounded-lg hover:bg-white/5 lg:hidden text-slate-400"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                            <h1 className="text-base lg:text-lg font-bold text-slate-900 dark:text-white truncate max-w-[150px] md:max-w-none">
                                {location.pathname.split('/').pop()?.charAt(0).toUpperCase() + location.pathname.split('/').pop()?.slice(1) || 'Dashboard'}
                            </h1>
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-2 lg:gap-4">
                            <ThemeToggle />
                            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 hidden md:block" />

                            <div className="relative">
                                <button
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className="flex items-center gap-2 lg:gap-3 hover:bg-slate-100 dark:hover:bg-slate-800 px-1.5 py-1.5 rounded-lg transition-colors border border-transparent"
                                >
                                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                                        {user?.avatar ? (
                                            <img src={user.avatar} className="w-full h-full rounded-full object-cover" />
                                        ) : (
                                            user?.initials || 'A'
                                        )}
                                    </div>
                                    <span className="text-sm font-semibold text-slate-700 hidden sm:block truncate max-w-[100px]">
                                        {user?.name || 'Admin'}
                                    </span>
                                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                                </button>

                                {showDropdown && (
                                    <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-surface border border-slate-200 dark:border-white/10 rounded-xl shadow-2xl py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                        <div className="px-4 py-3 border-b border-slate-100">
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">{user?.name}</p>
                                            <p className="text-xs text-slate-500 truncate">{user?.email || ''}</p>
                                        </div>

                                        <div className="py-1">
                                            <Link to="/settings" onClick={() => setShowDropdown(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">
                                                <Settings className="w-4 h-4" /> Settings
                                            </Link>
                                        </div>

                                        <div className="border-t border-slate-200 dark:border-slate-800 py-1">
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10"
                                            >
                                                <LogOut className="w-4 h-4" /> Sign out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 lg:p-8 overflow-y-auto" onClick={() => setShowDropdown(false)}>
                    <div className="max-w-6xl mx-auto space-y-6 lg:space-y-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

