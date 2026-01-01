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
    LogOut,
    Settings,
    ChevronLeft,
    ChevronRight,
    Key
} from 'lucide-react';
import { useState } from 'react';

const MENU_ITEMS = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Connections', path: '/dashboard', icon: MessageSquare }, // Re-using dashboard for connections for now
    { label: 'Analytics', path: '/analytics', icon: BarChart2 },
    { label: 'Schedule', path: '/schedule', icon: Calendar },
    { label: 'Media', path: '/media', icon: Image },
    { label: 'Ghostwriter', path: '/ai', icon: PenTool },
    { label: 'Brand Kit', path: '/brand', icon: Palette },
    { label: 'Brand Kit', path: '/brand', icon: Palette },
    { label: 'History', path: '/history', icon: History },
    { label: 'API Keys', path: '/apikeys', icon: Key },
];

export default function Sidebar({ isOpen, onToggle }) {
    const location = useLocation();

    return (
        <aside
            className={`fixed left-0 top-0 h-screen bg-background border-r border-white/5 transition-all duration-300 z-50 flex flex-col
            ${isOpen ? 'w-64' : 'w-20'}`}
        >
            {/* Logo Area */}
            <div className="h-16 flex items-center px-6 border-b border-white/5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
                    <span className="font-bold text-white">H</span>
                </div>
                {isOpen && (
                    <span className="ml-3 font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 animate-fade-in">
                        HighShift
                    </span>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
                <div className="mb-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {isOpen ? 'Overview' : '...'}
                </div>

                {MENU_ITEMS.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative
                            ${isActive
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                        >
                            <item.icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-primary' : 'text-gray-400 group-hover:text-white'}`} />

                            {isOpen && (
                                <span className="font-medium animate-fade-in">{item.label}</span>
                            )}

                            {/* Tooltip for collapsed state */}
                            {!isOpen && (
                                <div className="absolute left-full ml-4 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-white/10">
                                    {item.label}
                                </div>
                            )}
                        </Link>
                    )
                })}
            </nav>

            {/* Bottom Actions */}
            <div className="p-3 border-t border-white/5 space-y-1">
                <button
                    onClick={onToggle}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
                >
                    {isOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                    {isOpen && <span className="font-medium animate-fade-in">Collapse</span>}
                </button>

                <Link
                    to="/settings"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
                >
                    <Settings className="w-5 h-5" />
                    {isOpen && <span className="font-medium animate-fade-in">Settings</span>}
                </Link>
            </div>
        </aside>
    );
}
