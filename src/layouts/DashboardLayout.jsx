import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { getAccounts } from '../services/api';
import { User, ChevronDown, LogOut, Menu } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

export default function DashboardLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [user, setUser] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const location = useLocation();

    useEffect(() => {
        loadUserInfo();
    }, []);

    const loadUserInfo = async () => {
        try {
            // Try to get user from connected accounts
            const data = await getAccounts();
            if (data && data.accounts && data.accounts.length > 0) {
                const firstAccount = data.accounts[0];
                setUser({
                    name: firstAccount.displayName || firstAccount.username || 'User',
                    email: firstAccount.rawProfile?.email || null,
                    avatar: firstAccount.rawProfile?.data?.profile_image_url || null,
                    initials: (firstAccount.displayName || firstAccount.username || 'U').substring(0, 2).toUpperCase()
                });
            } else {
                // Fallback to basic user display
                setUser({ name: 'User', initials: 'U' });
            }
        } catch (err) {
            console.error('Failed to load user info:', err);
            setUser({ name: 'User', initials: 'U' });
        }
    };

    const handleLogout = () => {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('token');
            localStorage.removeItem('social_api_key');
            window.location.href = '/login';
        }
    };

    // Get page title from current route
    const getPageTitle = () => {
        const path = location.pathname;
        const titles = {
            '/dashboard': 'Dashboard',
            '/analytics': 'Analytics',
            '/schedule': 'Schedule',
            '/calendar': 'Calendar View',
            '/media': 'Media Library',
            '/ai': 'Ghostwriter',
            '/brand': 'Brand Kit',
            '/history': 'History',
            '/api-keys': 'API Keys',
            '/settings': 'Settings',
        };
        return titles[path] || 'Dashboard';
    };

    // Get theme colors based on route
    const getPageTheme = () => {
        const path = location.pathname;
        if (path.includes('/schedule') || path.includes('/calendar')) return 'from-emerald-800/20 to-teal-800/20';
        if (path.includes('/analytics')) return 'from-teal-900/20 to-cyan-900/20';
        if (path.includes('/media')) return 'from-cyan-900/20 to-sky-900/20';
        if (path.includes('/ai')) return 'from-green-900/20 to-emerald-900/20';
        if (path.includes('/brand')) return 'from-teal-900/20 to-emerald-900/20';
        if (path.includes('/history')) return 'from-gray-800/20 to-slate-800/20';
        return 'from-primary/10 to-secondary/10'; // Default Dashboard
    };

    return (
        <div className="min-h-screen bg-background text-white font-sans flex relative overflow-hidden">
            {/* Ambient Background Gradient */}
            <div className={`absolute top-0 right-0 w-[800px] h-[600px] bg-gradient-to-bl ${getPageTheme()} blur-3xl rounded-full pointer-events-none opacity-50 z-0`} />

            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

            {/* Main Content Area */}
            <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 relative z-10
                ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>

                {/* Top Bar */}
                <div className="sticky top-0 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5 transition-colors duration-300">
                    <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                        {/* Top Left: Logo & App Name */}
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                                <span className="font-bold text-white">H</span>
                            </div>
                            <span className="text-slate-900 dark:text-white font-bold text-xl tracking-tight">HighShift Cloud</span>
                        </div>

                        {/* Top Right: Theme Toggle & User Profile */}
                        <div className="flex items-center gap-4">
                            <ThemeToggle />
                            <div className="relative">
                                <button
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                                >
                                    {user?.avatar ? (
                                        <img
                                            src={user.avatar}
                                            alt={user.name}
                                            className="w-8 h-8 rounded-full border border-primary/30"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold text-white shadow-sm">
                                            {user?.initials || 'U'}
                                        </div>
                                    )}
                                    <div className="text-left hidden sm:block">
                                        <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">{user?.name || 'User'}</p>
                                        <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">View Profile</p>
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-slate-400 dark:text-gray-500" />
                                </button>

                                {/* Dropdown Menu */}
                                {showDropdown && (
                                    <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-surface border border-slate-200 dark:border-white/10 rounded-xl shadow-2xl py-2 animate-fade-in z-50">
                                        <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 mb-2">
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">{user?.name}</p>
                                            <p className="text-xs text-slate-500 dark:text-gray-400 truncate">{user?.email}</p>
                                        </div>

                                        <Link to="/profile" className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-white/5 flex items-center gap-2">
                                            <div className="w-4 h-4 rounded-full border-2 border-slate-400 dark:border-gray-500" /> Profile
                                        </Link>
                                        <Link to="/settings" className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-white/5 flex items-center gap-2">
                                            <div className="w-4 h-4 rounded-full border-2 border-slate-400 dark:border-gray-500" /> Settings
                                        </Link>

                                        <div className="h-px bg-slate-100 dark:bg-white/5 my-2" />

                                        <button
                                            onClick={handleLogout}
                                            className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 flex items-center gap-2"
                                        >
                                            <LogOut className="w-4 h-4" /> Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Page Content */}
                <main className="flex-1 p-6 overflow-x-hidden" onClick={() => setShowDropdown(false)}>
                    <div className="max-w-7xl mx-auto animate-fade-in">
                        {children}
                    </div>
                </main>

                {/* Footer */}
                <div className="p-6 border-t border-slate-200 dark:border-white/5">
                    <p className="text-center text-slate-400 dark:text-gray-500 text-xs">
                        © {new Date().getFullYear()} HighShift Cloud. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}

