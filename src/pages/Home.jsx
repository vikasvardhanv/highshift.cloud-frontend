import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { 
  Home as HomeIcon, PenTool, BarChart2, Inbox, FileText, Settings, 
  Search, Bell, ChevronRight, TrendingUp, MessageSquare, Calendar 
} from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-[#050505] font-sans min-h-screen text-white selection:bg-raven-500/30 overflow-hidden flex flex-col">
      
      {/* MARKETING TOP NAVBAR (Absolute/Fixed overlay) */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-4 bg-[#050505]/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center">
            <img src="/images/image.png" alt="R" className="w-full h-full object-contain" />
          </div>
          <span className="font-black text-white italic uppercase tracking-tighter text-lg">
            Social Raven
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-textMuted">
          <Link to="/how-it-works" className="hover:text-white transition-colors">How It Works</Link>
          <Link to="/product" className="hover:text-white transition-colors">Product</Link>
          <Link to="/solutions" className="hover:text-white transition-colors">Solutions</Link>
          <Link to="/community" className="hover:text-white transition-colors">Community</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-bold hover:text-white text-textMuted transition-colors">Log In</Link>
          <Link to="/login" className="px-5 py-2 bg-gradient-to-r from-raven-500 to-raven-600 text-white text-sm font-bold rounded-lg hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all">
            Start Free Trial
          </Link>
        </div>
      </nav>

      {/* DASHBOARD HERO INTERFACE */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Animated Marketing Overlay (Floating in center) */}
        <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
           <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8, delay: 0.5 }}
             className="text-center pointer-events-auto relative z-50 p-8 max-w-4xl"
           >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium text-white shadow-xl mb-6">
                <span className="w-2 h-2 rounded-full bg-raven-500 animate-pulse shadow-[0_0_8px_rgba(139,92,246,0.8)]"></span>
                The Ultimate Social OS
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight drop-shadow-2xl">
                The operating system for <br/>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-raven-400 to-sky-400">social distribution.</span>
              </h1>
              <p className="text-xl text-textMuted mb-8 max-w-2xl mx-auto drop-shadow-md">
                Social Raven unifies your campaigns, predictive analytics, and creator management into a single, high-performance platform.
              </p>
              <Link to="/login" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black hover:bg-white/90 font-bold rounded-xl transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                Get Started Now <ChevronRight className="w-5 h-5" />
              </Link>
           </motion.div>
        </div>

        {/* --- THE DASHBOARD MOCKUP (Background) --- */}
        <div className="flex-1 flex opacity-40 scale-[1.02] transform-gpu blur-[1px]">
          
          {/* MOCK SIDEBAR */}
          <div className="w-64 border-r border-white/5 bg-[#0a0a0a] p-4 flex flex-col gap-2">
            {[
              { icon: HomeIcon, label: 'Dashboard', active: true },
              { icon: PenTool, label: 'Content' },
              { icon: BarChart2, label: 'Analytics' },
              { icon: Inbox, label: 'Inbox' },
              { icon: FileText, label: 'Reports' },
              { icon: Settings, label: 'Settings' }
            ].map((item, i) => (
              <div key={i} className={`flex items-center gap-3 px-4 py-3 rounded-xl ${item.active ? 'bg-gradient-to-r from-raven-600/40 to-raven-900/40 border border-raven-500/30 text-white' : 'text-textMuted'}`}>
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </div>
            ))}
          </div>

          {/* MOCK MAIN CONTENT */}
          <div className="flex-1 p-8 bg-[#000000]">
            
            {/* Mock Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold">Overview: Engagement & Growth <span className="text-textMuted text-lg font-normal">(Last 30 Days)</span></h2>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-white/5 border border-white/10 rounded-full px-4 py-2 flex items-center gap-2 w-64">
                  <Search className="w-4 h-4 text-textMuted" />
                  <span className="text-textMuted text-sm">Search...</span>
                </div>
                <Bell className="w-5 h-5 text-textMuted" />
                <div className="w-8 h-8 rounded-full bg-raven-600"></div>
              </div>
            </div>

            {/* Mock Grid */}
            <div className="grid grid-cols-3 gap-6 h-[700px]">
              
              {/* Span 2 Column */}
              <div className="col-span-2 flex flex-col gap-6">
                
                {/* Chart Card */}
                <div className="flex-1 bg-[#0a0a0a]/80 border border-white/5 rounded-2xl p-6 flex flex-col">
                  <h3 className="font-semibold mb-6">Reach & Engagement</h3>
                  <div className="flex gap-12 mb-8">
                    <div>
                      <p className="text-sm text-textMuted mb-1">Total Impressions</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold">125K</span>
                        <span className="text-emerald-400 text-sm font-semibold">+15.2%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-textMuted mb-1">Engagements</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold">42.8K</span>
                        <span className="text-emerald-400 text-sm font-semibold">+18.1%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 relative border-b border-l border-white/5">
                     {/* Mock Chart Lines */}
                     <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                       <path d="M0,80 Q10,70 20,80 T40,60 T60,80 T80,30 T100,50" fill="none" stroke="rgb(139, 92, 246)" strokeWidth="3" />
                       <path d="M0,90 Q15,85 30,90 T50,80 T70,90 T85,60 T100,70" fill="none" stroke="rgb(56, 189, 248)" strokeWidth="3" />
                     </svg>
                  </div>
                </div>

                {/* Social Cards */}
                <div className="h-48 grid grid-cols-3 gap-6">
                  {['Twitter', 'LinkedIn', 'Instagram'].map((network, i) => (
                    <div key={network} className="bg-[#0a0a0a]/80 border border-white/5 rounded-2xl p-5 flex flex-col justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-white/10"></div>
                        <span className="font-semibold">{network}</span>
                      </div>
                      <div>
                        <div className="text-3xl font-bold">{i === 0 ? '1.2M' : i === 1 ? '250K' : '850K'}</div>
                        <div className="text-xs text-textMuted uppercase tracking-wider mt-1">Followers</div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

              {/* Span 1 Column */}
              <div className="col-span-1 flex flex-col gap-6">
                <div className="flex-1 bg-[#0a0a0a]/80 border border-white/5 rounded-2xl p-6">
                  <h3 className="font-semibold mb-6">Upcoming Posts & Queue</h3>
                  <div className="space-y-4">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="h-20 bg-white/5 rounded-xl border border-white/5"></div>
                    ))}
                  </div>
                </div>
                <div className="h-64 bg-[#0a0a0a]/80 border border-white/5 rounded-2xl p-6">
                  <h3 className="font-semibold mb-6">Recent Activity Feed</h3>
                  <div className="space-y-4">
                    {[1,2,3].map(i => (
                      <div key={i} className="flex gap-4 items-center">
                        <div className="w-8 h-8 rounded-full bg-white/10"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-2 bg-white/20 rounded w-1/3"></div>
                          <div className="h-2 bg-white/10 rounded w-2/3"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
