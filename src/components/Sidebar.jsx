import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    BarChart2,
    Calendar,
    Image,
    PenTool,
    MessageSquare,
    History,
    Palette,
    Settings,
    LogOut,
    Network,
    Zap,
    User,
    ChevronDown,
    ChevronRight,
    Sparkles
} from 'lucide-react';

const NAV_ITEMS = [
    { label: 'Instances', path: '/connections', icon: Network },
    { label: 'Profiles', path: '/profiles', icon: User },
    { label: 'Publishing', path: '/publishing', icon: LayoutDashboard },
    { label: 'Schedule', path: '/schedule', icon: Calendar },
    { label: 'Media Library', path: '/media', icon: Image },
    { label: 'Analytics', path: '/analytics', icon: BarChart2 },
    { label: 'Smart Inbox', path: '/inbox', icon: MessageSquare },
    { label: 'Brand Kit', path: '/brand', icon: Palette },
    { label: 'Social Raven AI', path: '/ai', icon: Zap },
    { label: 'Instant Publish', path: '/instant', icon: Sparkles },
    { label: 'Developer API', path: '/developer', icon: PenTool },
    { label: 'Settings', path: '/settings', icon: Settings },
];

export default function Sidebar({ isOpen, onToggle, onClose }) {
    const location = useLocation();

    return (
        <aside
            className={`fixed left-0 top-0 h-screen bg-bgSurface border-r border-borderColor transition-all duration-300 z-50 flex flex-col ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0 w-20'}`}
        >
            {/* Logo Area */}
            <div className="h-16 flex items-center px-6 border-b border-borderColor">
                <div className="w-8 h-8 flex items-center justify-center shrink-0">
                    <img src="/images/image.png" alt="R" className="w-full h-full object-contain" />
                </div>
                <span className={`ml-3 font-black text-textMain italic uppercase tracking-tighter text-lg transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 lg:w-0 overflow-hidden'}`}>
                    Social Raven
                </span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
                {NAV_ITEMS.map((item) => {
                    const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => {
                                if (window.innerWidth < 1024) onClose();
                            }}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${isActive ? 'bg-primary/10 text-primary font-bold shadow-sm' : 'text-textMuted hover:bg-bgSurfaceHighlight hover:text-textMain' }`}
                        >
                            <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-primary' : 'text-textMuted group-hover:text-textMain'}`} strokeWidth={2} />
                            <span className={`whitespace-nowrap transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 lg:w-0 overflow-hidden'}`}>
                                {item.label}
                            </span>

                            {/* Active Indicator (Right side) */}
                            {isActive && isOpen && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer / Toggle / Collapse button for Desktop */}
            <div className="p-4 border-t border-borderColor">
                <button
                    onClick={onToggle}
                    className="hidden lg:flex w-full items-center justify-center p-2 rounded-lg hover:bg-bgSurfaceHighlight text-textMuted hover:text-textMain transition-colors"
                    title={isOpen ? "Collapse Sidebar" : "Expand Sidebar"}
                >
                    <div className={`transition-transform duration-300 ${isOpen ? 'rotate-0' : 'rotate-180'}`}>
                        <ChevronDown className="w-5 h-5 -rotate-90" />
                    </div>
                </button>
            </div>
        </aside>
    );
}
