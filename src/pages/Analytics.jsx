import { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Users, Eye, MousePointer, Loader2 } from 'lucide-react';
import { getAccounts, getAnalytics } from '../services/api';
import { motion } from 'framer-motion';

const MOCK_DATA = [
    { name: 'Mon', views: 0, likes: 0 },
    { name: 'Tue', views: 0, likes: 0 },
    { name: 'Wed', views: 0, likes: 0 },
    { name: 'Thu', views: 0, likes: 0 },
    { name: 'Fri', views: 0, likes: 0 },
    { name: 'Sat', views: 0, likes: 0 },
    { name: 'Sun', views: 0, likes: 0 },
];

const StatCard = ({ title, value, change, isPositive, icon: Icon }) => (
    <motion.div
        variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 }
        }}
        className="group relative glass-card p-8 rounded-[2.5rem] bg-white/[0.02] border-white/5 hover:border-white/10 transition-all duration-500 overflow-hidden shadow-2xl"
    >
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity opacity-0 group-hover:opacity-100"></div>

        <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
                <Icon className="w-6 h-6 text-primary group-hover:animate-pulse" />
            </div>
            <div className={`flex items-center text-[10px] font-extrabold px-3 py-1.5 rounded-full border ${isPositive ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border-rose-500/20'}`}>
                {isPositive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                {change}%
            </div>
        </div>

        <div className="space-y-1">
            <div className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-slate-600 tracking-tighter">
                {value}
            </div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                {title}
            </div>
        </div>
    </motion.div>
);

export default function Analytics() {
    const [data, setData] = useState(MOCK_DATA);
    const [stats, setStats] = useState({
        impressions: 0,
        engagement: 0,
        followers: 0,
        changes: { impressions: 0, engagement: 0, followers: 0 }
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAnalytics();
    }, []);

    const loadAnalytics = async () => {
        try {
            const accountsData = await getAccounts();
            const accounts = accountsData?.accounts || [];
            if (accounts.length > 0) {
                const analytics = await getAnalytics(accounts[0].accountId);
                if (analytics.daily) setData(analytics.daily);
                if (analytics.total) setStats(prev => ({ ...prev, ...analytics.total }));
            }
        } catch (err) {
            console.error("Failed to load analytics", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center p-24 gap-4">
            <Loader2 className="animate-spin text-primary w-12 h-12" />
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Aggregating Global Metrics...</p>
        </div>
    );

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-10 pb-20"
        >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight mb-2">Neural Insights</h1>
                    <p className="text-slate-500 font-medium leading-relaxed max-w-xl">
                        Real-time synthesis of cross-platform performance and audience resonance protocols.
                    </p>
                </div>
            </div>

            {/* Stats Grid */}
            <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <StatCard
                    title="Total Impressions"
                    value={(stats.impressions || 0).toLocaleString()}
                    change={stats.changes?.impressions || 0}
                    isPositive={(stats.changes?.impressions || 0) >= 0}
                    icon={Eye}
                />
                <StatCard
                    title="Total Engagement"
                    value={(stats.engagement || 0).toLocaleString()}
                    change={stats.changes?.engagement || 0}
                    isPositive={(stats.changes?.engagement || 0) >= 0}
                    icon={MousePointer}
                />
                <StatCard
                    title="Total Followers"
                    value={(stats.followers || 0).toLocaleString()}
                    change={stats.changes?.followers || 0}
                    isPositive={(stats.changes?.followers || 0) >= 0}
                    icon={Users}
                />
            </motion.div>

            {/* Charts Area */}
            <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Growth Chart */}
                <div className="lg:col-span-2 glass-card p-10 rounded-[2.5rem] bg-white/[0.02] border-white/5 relative overflow-hidden group shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 opacity-20"></div>

                    <div className="flex items-center justify-between mb-10">
                        <h3 className="text-xl font-extrabold flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            Growth Trajectory
                        </h3>
                        <div className="flex gap-2">
                            {['7D', '30D', '90D'].map(period => (
                                <button key={period} className={`px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase transition-all ${period === '7D' ? 'bg-primary/20 text-primary border border-primary/20' : 'text-slate-500 hover:text-slate-300'}`}>
                                    {period}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    stroke="#334155"
                                    fontSize={10}
                                    fontWeight="bold"
                                    axisLine={false}
                                    tickLine={false}
                                    tickMargin={15}
                                />
                                <YAxis
                                    stroke="#334155"
                                    fontSize={10}
                                    fontWeight="bold"
                                    axisLine={false}
                                    tickLine={false}
                                    tickMargin={15}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#020617',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '1.5rem',
                                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                                    }}
                                    itemStyle={{ color: '#10B981', fontSize: '12px', fontWeight: 'bold' }}
                                    labelStyle={{ color: '#64748b', fontSize: '10px', fontWeight: 'bold', marginBottom: '4px', textTransform: 'uppercase' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="views"
                                    stroke="#10B981"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorViews)"
                                    animationDuration={2000}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Engagement Chart */}
                <div className="glass-card p-10 rounded-[2.5rem] bg-white/[0.02] border-white/5 shadow-2xl">
                    <h3 className="text-xl font-extrabold mb-10 text-center">Engagement Pulsar</h3>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    stroke="#334155"
                                    fontSize={10}
                                    fontWeight="bold"
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    stroke="#334155"
                                    fontSize={10}
                                    fontWeight="bold"
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#020617',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '1.5rem'
                                    }}
                                />
                                <Bar
                                    dataKey="likes"
                                    fill="#3B82F6"
                                    radius={[8, 8, 0, 0]}
                                    animationDuration={1500}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-6 p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 text-[10px] items-center justify-center font-bold text-blue-400 uppercase tracking-widest text-center">
                        Peak Performance: Wednesday
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
