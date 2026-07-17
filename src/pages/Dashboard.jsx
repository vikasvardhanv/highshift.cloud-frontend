import { motion } from 'framer-motion';
import { 
  TrendingUp, Users, Calendar as CalendarIcon, Activity, 
  MessageSquare, Heart, Share2, MoreHorizontal, CheckCircle2, ChevronRight
} from 'lucide-react';

// Reusable Card Component
function DashboardCard({ title, subtitle, children, action, className = "" }) {
  return (
    <div className={`bg-[#0a0a0a]/50 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden flex flex-col ${className}`}>
      <div className="p-5 border-b border-white/5 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-white text-sm">{title}</h3>
          {subtitle && <p className="text-xs text-textMuted mt-0.5">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
      <div className="p-5 flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="max-w-[1600px] mx-auto w-full space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            Overview: Engagement & Growth <span className="text-textMuted font-normal text-sm">(Last 30 Days)</span>
          </h2>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN (Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Reach & Engagement Chart */}
          <DashboardCard 
            title="Reach & Engagement" 
            action={
              <button className="text-xs bg-bgSurfaceHighlight hover:bg-white/10 text-white px-3 py-1.5 rounded-lg border border-white/5 transition-colors flex items-center gap-1">
                All Impressions <ChevronRight className="w-3 h-3" />
              </button>
            }
          >
            <div className="flex items-start gap-8 mb-6">
              <div>
                <p className="text-xs text-textMuted mb-1">Total Impressions</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-white">125K</span>
                  <span className="text-xs font-semibold text-emerald-400">+15.2%</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-textMuted mb-1">Engagements</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-white">42.8K</span>
                  <span className="text-xs font-semibold text-emerald-400">+18.1%</span>
                </div>
              </div>
            </div>

            {/* Simulated Chart */}
            <div className="relative h-48 w-full mt-auto flex items-end">
               {/* Background Grid Lines */}
               <div className="absolute inset-0 flex flex-col justify-between border-l border-b border-white/5">
                 {[1,2,3,4].map(i => <div key={i} className="border-b border-white/5 w-full h-full" />)}
               </div>
               
               {/* SVG Chart Line (Abstract/Simulated) */}
               <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                 <defs>
                   <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="0%" stopColor="rgb(139, 92, 246)" stopOpacity="0.4" />
                     <stop offset="100%" stopColor="rgb(139, 92, 246)" stopOpacity="0" />
                   </linearGradient>
                   <linearGradient id="chartGradient2" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="0%" stopColor="rgb(56, 189, 248)" stopOpacity="0.4" />
                     <stop offset="100%" stopColor="rgb(56, 189, 248)" stopOpacity="0" />
                   </linearGradient>
                 </defs>
                 
                 {/* Purple Line */}
                 <path d="M0,80 Q10,70 20,80 T40,60 T60,80 T80,30 T100,50 L100,100 L0,100 Z" fill="url(#chartGradient)" />
                 <path d="M0,80 Q10,70 20,80 T40,60 T60,80 T80,30 T100,50" fill="none" stroke="rgb(139, 92, 246)" strokeWidth="2" />
                 
                 {/* Blue Line */}
                 <path d="M0,90 Q15,85 30,90 T50,80 T70,90 T85,60 T100,70 L100,100 L0,100 Z" fill="url(#chartGradient2)" />
                 <path d="M0,90 Q15,85 30,90 T50,80 T70,90 T85,60 T100,70" fill="none" stroke="rgb(56, 189, 248)" strokeWidth="2" />
                 
                 {/* Data Point Glow */}
                 <circle cx="80" cy="30" r="3" fill="white" className="drop-shadow-[0_0_8px_rgba(139,92,246,1)]" />
               </svg>
            </div>
          </DashboardCard>

          {/* Social Media Performance */}
          <DashboardCard title="Social Media Performance">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Twitter */}
                <div className="bg-bgSurfaceHighlight border border-white/5 rounded-xl p-4">
                   <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded bg-[#1DA1F2]/20 flex items-center justify-center">
                         <svg className="w-3 h-3 text-[#1DA1F2]" viewBox="0 0 24 24" fill="currentColor">
                           <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                         </svg>
                      </div>
                      <span className="text-white text-sm font-semibold">Twitter</span>
                   </div>
                   <div className="mb-2">
                     <div className="text-2xl font-bold text-white">1.2M</div>
                     <div className="text-[10px] text-textMuted uppercase tracking-wider">Followers</div>
                   </div>
                   <div className="mt-4 flex items-end justify-between">
                      <svg className="w-16 h-8" viewBox="0 0 100 30" preserveAspectRatio="none">
                         <path d="M0,25 Q10,20 20,25 T40,15 T60,20 T80,5 T100,10" fill="none" stroke="rgb(139, 92, 246)" strokeWidth="2" />
                      </svg>
                      <span className="text-xs font-semibold text-emerald-400">+18.4%</span>
                   </div>
                </div>

                {/* LinkedIn */}
                <div className="bg-bgSurfaceHighlight border border-white/5 rounded-xl p-4">
                   <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded bg-[#0A66C2]/20 flex items-center justify-center">
                         <svg className="w-3 h-3 text-[#0A66C2]" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      </div>
                      <span className="text-white text-sm font-semibold">LinkedIn</span>
                   </div>
                   <div className="mb-2">
                     <div className="text-2xl font-bold text-white">250K</div>
                     <div className="text-[10px] text-textMuted uppercase tracking-wider">Followers</div>
                   </div>
                   <div className="mt-4 flex items-end justify-between">
                      <svg className="w-16 h-8" viewBox="0 0 100 30" preserveAspectRatio="none">
                         <path d="M0,25 Q10,15 20,20 T40,10 T60,15 T80,0 T100,5" fill="none" stroke="rgb(56, 189, 248)" strokeWidth="2" />
                      </svg>
                      <span className="text-xs font-semibold text-emerald-400">+10.2%</span>
                   </div>
                </div>

                {/* Instagram */}
                <div className="bg-bgSurfaceHighlight border border-white/5 rounded-xl p-4">
                   <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center">
                         <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                      </div>
                      <span className="text-white text-sm font-semibold">Instagram</span>
                   </div>
                   <div className="mb-2">
                     <div className="text-2xl font-bold text-white">850K</div>
                     <div className="text-[10px] text-textMuted uppercase tracking-wider">Followers</div>
                   </div>
                   <div className="mt-4 flex items-end justify-between">
                      <svg className="w-16 h-8" viewBox="0 0 100 30" preserveAspectRatio="none">
                         <path d="M0,20 Q10,25 20,15 T40,20 T60,5 T80,10 T100,0" fill="none" stroke="rgb(236, 72, 153)" strokeWidth="2" />
                      </svg>
                      <span className="text-xs font-semibold text-emerald-400">+21.1%</span>
                   </div>
                </div>
             </div>
          </DashboardCard>
        </div>

        {/* RIGHT COLUMN (Span 1) */}
        <div className="space-y-6">
          
          {/* Upcoming Posts & Approval Queue */}
          <DashboardCard title="Upcoming Posts & Queue" className="h-[400px]">
             <div className="space-y-3 overflow-y-auto pr-2">
                
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="p-3 rounded-xl bg-bgSurfaceHighlight border border-white/5 flex gap-3 hover:bg-white/10 transition-colors cursor-pointer group">
                     <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center ${i % 2 === 0 ? 'bg-[#1DA1F2]/20 text-[#1DA1F2]' : 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white'}`}>
                        {i % 2 === 0 ? (
                           <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                             <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                           </svg>
                        ) : (
                           <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                        )}
                     </div>
                     <div className="flex-1 min-w-0">
                        <h4 className="text-white text-xs font-semibold truncate mb-1">Product Launch 🚀</h4>
                        <p className="text-[10px] text-textMuted line-clamp-2 leading-relaxed">
                          We're so excited to announce the launch of our new features. Read more about it on our blog!
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                           <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-raven-500/20 text-raven-300">Scheduled</span>
                           <span className="text-[9px] text-textMuted">Tomorrow, 11:00 AM</span>
                        </div>
                     </div>
                  </div>
                ))}
                
             </div>
          </DashboardCard>

          {/* Recent Activity Feed */}
          <DashboardCard title="Recent Activity Feed">
             <div className="space-y-4">
                <div className="flex gap-3">
                   <div className="mt-1 w-2 h-2 rounded-full bg-raven-500 shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
                   <div>
                      <p className="text-xs text-white"><span className="font-semibold">Linked Account</span> • 15m ago</p>
                      <p className="text-xs text-textMuted mt-0.5">LinkedIn post "Product Launch" was successfully published.</p>
                   </div>
                </div>
                <div className="flex gap-3">
                   <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                   <div>
                      <p className="text-xs text-white"><span className="font-semibold">System</span> • 3h ago</p>
                      <p className="text-xs text-textMuted mt-0.5">Generated weekly analytics report for all profiles.</p>
                   </div>
                </div>
                <div className="flex gap-3">
                   <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                   <div>
                      <p className="text-xs text-white"><span className="font-semibold">Team Member</span> • 5h ago</p>
                      <p className="text-xs text-textMuted mt-0.5">Added a new asset to the Brand Kit.</p>
                   </div>
                </div>
             </div>
          </DashboardCard>

        </div>
      </div>
    </div>
  );
}
