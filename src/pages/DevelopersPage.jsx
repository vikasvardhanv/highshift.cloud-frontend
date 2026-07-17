import { motion, AnimatePresence } from"framer-motion";
import { Code, Boxes, Zap, ArrowRight, BookOpen, Key } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DevelopersPage() {
 return (
 <div className="container mx-auto px-4 py-32 max-w-7xl">
 {/* Header Section */}
 <div className="text-center mb-16 relative">
 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-raven-500/10 blur-[100px] pointer-events-none" />
 <motion.div 
 initial={{ opacity: 0, scale: 0.9 }}
 animate={{ opacity: 1, scale: 1 }}
 className="inline-flex items-center gap-2 px-3 py-1 bg-bgSurfaceHighlight border border-borderColor rounded-full text-xs font-bold uppercase tracking-widest text-raven-400 mb-8"
 >
 <Code className="w-3 h-3" /> API Documentation & Developer Tools
 </motion.div>
 <h1 className="text-5xl md:text-8xl font-black mb-8 italic tracking-tighter text-textMain">
 Extensible <br/> Infrastructure
 </h1>
 <p className="text-xl text-textMuted max-w-2xl mx-auto leading-relaxed">
 Built for speed, scalability, and seamless integration. Use our production-ready endpoints to automate social presence for teams and organizations of any size.
 </p>
 </div>

 {/* API Cards */}
 <div className="grid md:grid-cols-3 gap-8 mb-32">
 <DevCard
 icon={Code}
 iconColor="text-green-400"
 title="Social Raven REST API"
 description="Programmatic access to publishing, analytics, and listening data. Build custom dashboards for every social channel."
 code="curl -X POST /api/v1/schedule"
 link="/docs"
 linkText="Read API Docs"
 />
 <DevCard
 icon={Boxes}
 iconColor="text-blue-400"
 title="Native Integrations"
 description="Pre-built hooks for Shopify, HubSpot, and Salesforce. Connect your social stack to your growth engine in one click."
 code="socialraven.connect('hubspot')"
 link="/docs#integrations"
 linkText="Integrations Hub"
 />
 <DevCard
 icon={Key}
 iconColor="text-purple-400"
 title="Developer Keys"
 description="Manage API keys, register webhooks, and monitor usage in your dedicated developer settings portal."
 code="Bearer sk_live_9a2f..."
 link="/dashboard"
 linkText="Get API Key"
 />
 </div>

 {/* SDK Section */}
 <div className="bg-bgSurfaceHighlight border border-borderColor rounded-[3rem] p-12 md:p-24 relative overflow-hidden group">
 <div className="absolute top-0 right-0 p-24 opacity-5 group-hover:opacity-10 transition-opacity">
 <Zap className="w-96 h-96" />
 </div>
 <div className="grid lg:grid-cols-2 gap-16 relative z-10">
 <div>
 <h2 className="text-4xl font-bold mb-8 text-textMain">Performance Optimized SDKs</h2>
 <p className="text-lg text-textMuted mb-12">
 We provide official SDK libraries for Python, JavaScript, and Ruby. Scale your social automation without worrying about rate limits or authentication flow.
 </p>
 <div className="flex flex-col sm:flex-row gap-6">
 <Link to="/docs" className="px-8 py-4 bg-bgSurface text-textMain font-bold rounded-2xl text-center hover:bg-bgSurfaceHighlight transition-all shadow-xl">
 Start Building
 </Link>
 <button className="px-8 py-4 bg-bgSurfaceHighlight border border-borderColor text-textMain font-bold rounded-2xl hover:bg-white/10 transition-all text-center">
 Browse SDK Repo
 </button>
 </div>
 </div>
 <div className="bg-black/40 rounded-3xl p-8 border border-borderColor shadow-2xl backdrop-blur-xl">
 <div className="flex items-center gap-2 mb-6 border-b border-borderColor pb-4">
 <div className="w-3 h-3 rounded-full bg-red-500/50" />
 <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
 <div className="w-3 h-3 rounded-full bg-green-500/50" />
 <span className="text-[10px] text-textMuted font-mono ml-4 tracking-widest uppercase font-black italic">Social_Raven_Client.py</span>
 </div>
 <pre className="text-sm font-mono text-raven-400 overflow-x-auto leading-relaxed">
{`from social_raven import RavenClient

client = RavenClient(api_key="sk_live_9a2f...")

# Schedule a multi-platform post
response = client.posts.create(
 platforms=["linkedin","twitter"],
 content="Hello from the Raven API!",
 schedule_at="2026-03-24T10:00:00Z"
)

print(f"Scheduled Post ID: {response.id}")`}
 </pre>
 </div>
 </div>
 </div>
 </div>
 );
}

function DevCard({ icon: Icon, iconColor, title, description, code, link, linkText }) {
 return (
 <div className="group bg-bgColor border border-borderColor hover:border-borderColor rounded-3xl p-8 transition-all hover:translate-y-[-4px] backdrop-blur-md">
 <div className={`w-12 h-12 bg-bgSurfaceHighlight rounded-xl flex items-center justify-center mb-6 overflow-hidden`}>
 <Icon className={`w-6 h-6 ${iconColor}`} />
 </div>
 <h3 className="text-xl font-bold mb-3 text-textMain">{title}</h3>
 <p className="text-textMuted mb-8 text-sm leading-relaxed">
 {description}
 </p>
 <div className="bg-black/60 rounded-xl p-4 font-mono text-[11px] text-green-400 mb-8 border border-borderColor select-all truncate">
 {code}
 </div>
 <Link to={link} className="inline-flex items-center gap-2 text-sm font-bold text-textMain hover:text-raven-400 transition-all group/link">
 {linkText} <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
 </Link>
 </div>
 );
}
