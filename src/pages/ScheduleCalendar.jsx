import { useState, useEffect } from 'react';
import {
    ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MoreVertical,
    Edit2, Trash2, X, Plus, TrendingUp, Users, MessageSquare, Activity
} from 'lucide-react';
import { getScheduleCalendar, getAccounts, getActivityLog, getProfiles } from '../services/api';
import Composer from '../components/dashboard/Composer';
import { motion, AnimatePresence } from 'framer-motion';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function ScheduleCalendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [posts, setPosts] = useState({});
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);
    const [showComposer, setShowComposer] = useState(false);
    const [loading, setLoading] = useState(true);
    const [accounts, setAccounts] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [selectedAccounts, setSelectedAccounts] = useState([]);
    const [recentActivity, setRecentActivity] = useState([]);

    useEffect(() => {
        loadSchedule();
        loadAccounts();
        loadProfiles();
        loadActivity();

        // Real-time polling for activity
        const interval = setInterval(() => {
            loadActivity();
        }, 30000); // 30 seconds

        return () => clearInterval(interval);
    }, []);

    const loadProfiles = async () => {
        try {
            const data = await getProfiles();
            setProfiles(data || []);
        } catch (err) {
            console.error("Failed to load profiles", err);
        }
    };

    const loadActivity = async () => {
        try {
            const data = await getActivityLog();
            setRecentActivity(data || []);
        } catch (err) {
            console.error("Failed to load activity", err);
        }
    };

    const loadAccounts = async () => {
        try {
            const data = await getAccounts();
            setAccounts(data.accounts || []);
            if (data.accounts && data.accounts.length > 0) {
                // Pre-select all
                setSelectedAccounts(data.accounts.map(a => a.accountId));
            }
        } catch (err) {
            console.error("Failed to load accounts", err);
        }
    };

    const loadSchedule = async () => {
        try {
            const data = await getScheduleCalendar();
            // Backend now returns { calendar: [arrayOfPosts] }
            // We must group by LOCAL date here.

            const rawPosts = Array.isArray(data) ? data : (data.calendar || []);
            const grouped = {};

            if (Array.isArray(rawPosts)) {
                rawPosts.forEach(post => {
                    const postTime = post.time || post.scheduled_time || post.scheduledFor || post.scheduled_for;
                    if (!postTime) return;

                    const d = new Date(postTime); 
                    if (isNaN(d.getTime())) {
                        console.warn("Invalid date in scheduled post:", post);
                        return;
                    }

                    // Create local YYYY-MM-DD key
                    const dateKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

                    if (!grouped[dateKey]) grouped[dateKey] = [];

                    // Format time for display (HH:MM)
                    const timeStr = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

                    grouped[dateKey].push({
                        ...post,
                        time: timeStr, 
                        rawTime: postTime
                    });
                });
            } else {
                // Fallback if backend still returns old format (object)
                console.warn("Received old format from backend", rawPosts);
                Object.assign(grouped, rawPosts);
            }

            setPosts(grouped);
        } catch (err) {
            console.error("Failed to load schedule", err);
        } finally {
            setLoading(false);
        }
    };

    const handleAccountToggle = (accountId) => {
        setSelectedAccounts(prev =>
            prev.includes(accountId)
                ? prev.filter(id => id !== accountId)
                : [...prev, accountId]
        );
    };

    const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const navigateMonth = (direction) => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));

    const handleDateClick = (day) => {
        const dateKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        // Set up composer with this date? 
    };

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(currentDate);
        const firstDay = getFirstDayOfMonth(currentDate);
        const days = [];

        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-32 bg-slate-50/30 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800/50"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dateKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayPosts = posts[dateKey] || [];
            const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();

            days.push(
                <div key={day} className={`h-32 border border-slate-100 p-2 transition-all hover:bg-slate-50 relative group ${isToday ? 'bg-indigo-50/30' : 'bg-white'}`}>
                    <div className="flex justify-between items-start mb-2">
                        <span className={`text-sm font-semibold w-7 h-7 flex items-center justify-center rounded-lg ${isToday ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'text-slate-500'}`}>
                            {day}
                        </span>
                        {dayPosts.length > 0 && (
                            <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-wide border border-emerald-500/20">
                                {dayPosts.length} Posts
                            </span>
                        )}
                        <button
                            onClick={() => setShowComposer(true)}
                            className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-indigo-500 transition-all transform hover:scale-110"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="space-y-1.5 overflow-y-auto max-h-[calc(100%-2rem)] custom-scrollbar">
                        {dayPosts.map((post, idx) => (
                            <div
                                key={post.id || idx}
                                onClick={(e) => { e.stopPropagation(); setSelectedPost(post); }}
                                className="group/post relative p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all cursor-pointer shadow-sm hover:shadow-md"
                            >
                                <div className="flex items-center gap-1.5 mb-1">
                                    <Clock className="w-3 h-3 text-slate-400" />
                                    <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">{post.time}</span>
                                </div>
                                <div className="text-xs text-slate-600 dark:text-slate-400 truncate font-medium">{post.content}</div>
                                <div className="absolute top-1 right-1 flex gap-0.5 opacity-0 group-hover/post:opacity-100 transition-opacity">
                                    {post.platforms?.slice(0, 3).map((p, i) => (
                                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
        return days;
    };

    return (
        <div className="flex h-[calc(100vh-100px)] gap-6 overflow-hidden">
            {/* Main Calendar Area */}
            <div className="flex-1 flex flex-col space-y-6 overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-1">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Temporal Command</h1>
                        <p className="text-slate-500 text-sm font-medium mt-1">Orchestrate your global transmission capability.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm">
                            <button onClick={() => navigateMonth(-1)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors">
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <span className="text-sm font-bold text-slate-900 min-w-[120px] text-center uppercase tracking-wider">
                                {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
                            </span>
                            <button onClick={() => navigateMonth(1)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors">
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                        <button
                            onClick={() => setShowComposer(true)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Schedule Post</span>
                        </button>
                    </div>
                </div>

                <div className="flex-1 bg-white rounded-[2rem] border border-slate-200 shadow-2xl overflow-hidden flex flex-col">
                    <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50/50 backdrop-blur-sm z-10">
                        {DAYS.map(day => (
                            <div key={day} className="py-4 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                                {day}
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 flex-1 overflow-y-auto scrollbar-hide">
                        {renderCalendar()}
                    </div>
                </div>
            </div>

            {/* Recent Activity Sidebar */}
            <div className="w-80 shrink-0 hidden xl:flex flex-col gap-6 p-1">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent Activity</h2>
                    <button onClick={loadActivity} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" title="Refresh">
                        <MoreVertical className="w-4 h-4 text-slate-400" />
                    </button>
                </div>

                <div className="space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto scrollbar-hide">
                    {recentActivity.length > 0 ? (
                        recentActivity.map((log) => {
                            let icon = <Activity className="w-4 h-4 text-slate-500" />;
                            let accent = 'blue';

                            if (log.type === 'success') {
                                icon = <TrendingUp className="w-4 h-4 text-emerald-500" />;
                                accent = 'emerald';
                            } else if (log.type === 'error') {
                                icon = <Activity className="w-4 h-4 text-red-500" />;
                                accent = 'amber'; 
                            }

                            if (log.platform === 'Twitter') {
                                accent = 'blue';
                            } else if (log.platform === 'Instagram') {
                                accent = 'purple';
                            } else if (log.platform === 'Facebook') {
                                accent = 'blue'; 
                            }

                            return (
                                <ActivityCard
                                    key={log._id || log.id}
                                    icon={icon}
                                    title={log.title}
                                    platform={log.platform || 'System'}
                                    time={formatTimeAgo(log.time)}
                                    accent={accent}
                                />
                            )
                        })
                    ) : (
                        <div className="text-center py-10 text-slate-500">
                            <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">No recent activity</p>
                        </div>
                    )}
                </div>

                <div className="mt-auto p-6 rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden group cursor-pointer">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-110"></div>
                    <h3 className="text-lg font-bold relative z-10">View Full History</h3>
                    <p className="text-indigo-100 text-xs font-medium mt-1 relative z-10">Analyze your transmission logs.</p>
                </div>
            </div>

            {/* Composer Modal */}
            <AnimatePresence>
                {showComposer && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
                        onClick={() => setShowComposer(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={e => e.stopPropagation()}
                            className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl shadow-indigo-500/10 border border-slate-200 dark:border-slate-800 overflow-hidden"
                        >
                            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                                <h3 className="font-bold text-slate-800 dark:text-white">New Transmission</h3>
                                <button onClick={() => setShowComposer(false)} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
                                    <X className="w-5 h-5 text-slate-500" />
                                </button>
                            </div>
                            <div className="p-6">
                                <Composer
                                    onSuccess={() => { setShowComposer(false); loadSchedule(); }}
                                    selectedAccounts={selectedAccounts}
                                    accounts={accounts}
                                    profiles={profiles}
                                    onAccountToggle={handleAccountToggle}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function ActivityCard({ icon, title, platform, time, accent }) {
    const colors = {
        emerald: 'bg-emerald-500/10 border-emerald-500/20',
        blue: 'bg-blue-500/10 border-blue-500/20',
        purple: 'bg-purple-500/10 border-purple-500/20',
        amber: 'bg-amber-500/10 border-amber-500/20',
    };

    return (
        <div className="group flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/30 transition-all hover:shadow-lg hover:shadow-indigo-500/5 cursor-pointer">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors[accent]} group-hover:scale-110 transition-transform duration-300`}>
                {icon}
            </div>
            <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{title}</h4>
                <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-medium text-slate-500">{platform}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                    <span className="text-xs text-slate-400">{time}</span>
                </div>
            </div>
        </div>
    );
}

function formatTimeAgo(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return date.toLocaleDateString();
}
