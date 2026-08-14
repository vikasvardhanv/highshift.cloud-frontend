import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
  { label: 'Instances', key: 'instances', path: '/connections', icon: Network },
  { label: 'Profiles', key: 'profiles', path: '/profiles', icon: User },
  { label: 'Publishing', key: 'publishing', path: '/publishing', icon: LayoutDashboard },
  { label: 'Schedule', key: 'schedule', path: '/schedule', icon: Calendar },
  { label: 'Media Library', key: 'mediaLibrary', path: '/media', icon: Image },
  { label: 'Analytics', key: 'analytics', path: '/analytics', icon: BarChart2 },
  { label: 'Smart Inbox', key: 'smartInbox', path: '/inbox', icon: MessageSquare },
  { label: 'Brand Kit', key: 'brandKit', path: '/brand', icon: Palette },
  { label: 'Social Raven AI', key: 'socialRavenAi', path: '/ai', icon: Zap },
  { label: 'Instant Publish', key: 'instantPublish', path: '/instant', icon: Sparkles },
  { label: 'Developer API', key: 'developerApi', path: '/developer', icon: PenTool },
  { label: 'Settings', key: 'settings', path: '/settings', icon: Settings },
];

export default function Sidebar({ isOpen, onToggle, onClose }) {
 const location = useLocation();
 const { t } = useTranslation();

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-bgColor border-r border-borderColor transition-all duration-300 z-50 flex flex-col ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0 w-20'}`}
    >
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-borderColor">
        <div className="w-8 h-8 flex items-center justify-center shrink-0">
          <img src="/images/image.png" alt="R" className="w-full h-full object-contain" />
        </div>
        <span className={`ml-3 font-black text-white italic uppercase tracking-tighter text-lg transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 lg:w-0 overflow-hidden'}`}>
          Social Raven
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-2">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => {
                if (window.innerWidth < 1024) onClose();
              }}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group ${isActive ? 'bg-gradient-to-r from-raven-600 to-raven-900 text-white font-bold shadow-lg shadow-raven-500/30 border border-raven-500/50' : 'text-textMuted hover:bg-bgSurfaceHighlight hover:text-white border border-transparent' }`}
            >
              <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-white' : 'text-textMuted group-hover:text-white'}`} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`whitespace-nowrap transition-opacity text-sm ${isOpen ? 'opacity-100' : 'opacity-0 lg:w-0 overflow-hidden'}`}>
                {t(`nav.${item.key}`, item.label)}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / Toggle / Collapse button for Desktop */}
      <div className="p-4 border-t border-borderColor">
        <button
          onClick={onToggle}
          className="hidden lg:flex w-full items-center justify-center p-2 rounded-lg hover:bg-white/5 text-textMuted hover:text-white transition-colors"
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
