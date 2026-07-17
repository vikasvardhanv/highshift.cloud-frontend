import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { getCurrentUser } from '../services/api';
import { User, ChevronDown, LogOut, Menu, Settings, Search } from 'lucide-react';
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
 const token = localStorage.getItem('token');
 const apiKey = localStorage.getItem('social_api_key');
 if (err.response?.status === 401 || (!token && !apiKey)) {
 localStorage.removeItem('token');
 localStorage.removeItem('social_api_key');
 window.location.href = '/login';
 return;
 }
 // For other errors, show minimal fallback but keep user in app
 setUser({ name: 'User', initials: 'U', email: '' });
 }
 };

 useEffect(() => {
 loadUserInfo();
 // Set initial sidebar state based on screen size
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
    <div className="dashboard-shell min-h-screen bg-[#000000] font-sans flex overflow-x-hidden text-textMain relative z-0">
      {/* Ambient Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-raven-900/20 blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed top-[40%] left-[30%] w-[30%] h-[30%] rounded-full bg-raven-600/5 blur-[100px] -z-10 pointer-events-none" />

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
 <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 relative z-10 w-full ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>

      {/* Top Bar - Clean Professional */}
      <header className="sticky top-0 z-40 bg-[#000000]/80 backdrop-blur-md border-b border-white/5 h-16">
        <div className="px-4 lg:px-6 h-full flex items-center justify-between">
 {/* Title Breadcrumb & Mobile Menu Toggle */}
 <div className="flex items-center gap-3 lg:gap-4">
 <button
 onClick={() => setSidebarOpen(!sidebarOpen)}
 className="p-2 -ml-2 rounded-lg hover:bg-white/5 backdrop-blur-sm border border-white/10 lg:hidden text-textMuted"
 >
 <Menu className="w-6 h-6" />
 </button>
            <h1 className="text-base lg:text-lg font-bold text-white truncate max-w-[150px] md:max-w-none">
              {location.pathname.split('/').pop()?.charAt(0).toUpperCase() + location.pathname.split('/').pop()?.slice(1) || 'Dashboard'}
            </h1>
            <div className="hidden lg:flex items-center ml-8 bg-white/5 border border-white/5 rounded-full px-4 py-1.5 w-64 focus-within:ring-1 focus-within:ring-raven-500 transition-all">
               <Search className="w-4 h-4 text-textMuted mr-2" />
               <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-sm text-white placeholder:text-textMuted w-full" />
            </div>
          </div>

          {/* Right Actions */}
 <div className="flex items-center gap-2 lg:gap-4">
 <ThemeToggle />
 <div className="h-6 w-px bg-borderColor hidden md:block" />

 <div className="relative">
 <button
 onClick={() => setShowDropdown(!showDropdown)}
 className="flex items-center gap-2 lg:gap-3 hover:bg-white/5 backdrop-blur-sm border border-white/10 px-1.5 py-1.5 rounded-lg transition-colors border border-transparent"
 >
 <div className="w-8 h-8 rounded-full bg-raven-600 flex items-center justify-center text-xs font-bold text-textMain flex-shrink-0">
 {user?.avatar ? (
 <img src={user.avatar} className="w-full h-full rounded-full object-cover" />
 ) : (
 user?.initials || 'A'
 )}
 </div>
 <span className="text-sm font-semibold text-textMain hidden sm:block truncate max-w-[100px]">
 {user?.name || 'Admin'}
 </span>
 <ChevronDown className={`w-4 h-4 text-textMuted transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
 </button>

 {showDropdown && (
 <div className="absolute right-0 top-full mt-2 w-56 bg-bgColor border border-white/10 rounded-xl shadow-2xl py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
 <div className="px-4 py-3 border-b border-white/10">
 <p className="text-sm font-bold text-textMain">{user?.name}</p>
 <p className="text-xs text-textMuted truncate">{user?.email || ''}</p>
 </div>

 <div className="py-1">
 <Link to="/settings" onClick={() => setShowDropdown(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-textMuted hover:bg-white/5 backdrop-blur-sm border border-white/10">
 <Settings className="w-4 h-4" /> Settings
 </Link>
 </div>

 <div className="border-t border-white/10 py-1">
 <button
 onClick={handleLogout}
 className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-500/10"
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

