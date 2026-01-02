import { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Users, Eye, MousePointer, Loader2 } from 'lucide-react';
import { getAccounts, getAnalytics } from '../services/api';

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
    <div className="glass-card p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-white/5 rounded-lg">
                <Icon className="w-5 h-5 text-primary" />
            </div>
            <div className={`flex items-center text-xs font-semibold px-2 py-1 rounded-full ${isPositive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                {isPositive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                {change}%
            </div>
        </div>
        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">{value}</div>
        <div className="text-sm text-gray-400">{title}</div>
    </div>
);

export default function Analytics() {
    const [data, setData] = useState(MOCK_DATA);
    const [stats, setStats] = useState({ impressions: 0, engagement: 0, followers: 0, changes: { impressions: 0, engagement: 0, followers: 0 } });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAnalytics();
    }, []);

    const loadAnalytics = async () => {
        try {
            const accountsData = await getAccounts();
            const accounts = accountsData?.accounts || [];
            if (accounts.length > 0) {
                // Fetch for the first account as demo
                const analytics = await getAnalytics(accounts[0].accountId);
                // Transform backend data to chart format if needed, or just use what is returned if it matches
                // For now, assuming backend returns { daily: [], total: {} }
                if (analytics.daily) setData(analytics.daily);
                if (analytics.total) setStats(prev => ({ ...prev, ...analytics.total }));
            }
        } catch (err) {
            console.error("Failed to load analytics", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary" /></div>;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Analytics Overview</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Impressions" value={stats.impressions.toLocaleString()} change={stats.changes?.impressions || 0} isPositive={(stats.changes?.impressions || 0) >= 0} icon={Eye} />
                <StatCard title="Total Engagement" value={stats.engagement.toLocaleString()} change={stats.changes?.engagement || 0} isPositive={(stats.changes?.engagement || 0) >= 0} icon={MousePointer} />
                <StatCard title="Total Followers" value={stats.followers.toLocaleString()} change={stats.changes?.followers || 0} isPositive={(stats.changes?.followers || 0) >= 0} icon={Users} />
            </div>

            {/* Charts Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Growth Chart */}
                <div className="glass-card p-6 rounded-2xl">
                    <h3 className="text-lg font-semibold mb-6">Growth Trends</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="name" stroke="#666" />
                                <YAxis stroke="#666" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                />
                                <Area type="monotone" dataKey="views" stroke="#10B981" fillOpacity={1} fill="url(#colorViews)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Engagement Chart */}
                <div className="glass-card p-6 rounded-2xl">
                    <h3 className="text-lg font-semibold mb-6">Engagement Source</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="name" stroke="#666" />
                                <YAxis stroke="#666" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                />
                                <Bar dataKey="likes" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
