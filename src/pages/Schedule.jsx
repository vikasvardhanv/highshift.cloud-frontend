import { useState, useEffect } from 'react';
import { format, startOfWeek, addDays, startOfMonth, endOfMonth, endOfWeek, isSameMonth, isSameDay, addMonths, subMonths, parseISO } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus, Loader2, Twitter, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import { getScheduledPosts } from '../services/api';
import { useNavigate } from 'react-router-dom';

const PLATFORM_COLORS = {
    twitter: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    facebook: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    instagram: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
    linkedin: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    youtube: 'bg-red-500/20 text-red-300 border-red-500/30',
};

const PLATFORM_ICONS = {
    twitter: '🐦',
    facebook: '📘',
    instagram: '📷',
    linkedin: '💼',
    youtube: '📺',
};

export default function Schedule() {
    const navigate = useNavigate();
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        try {
            const data = await getScheduledPosts();
            setPosts(data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Group posts by date
    const postsByDate = posts.reduce((acc, post) => {
        const dateKey = format(new Date(post.scheduled_time || post.scheduledFor), 'yyyy-MM-dd');
        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(post);
        return acc;
    }, {});

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
    const onDateClick = (day) => setSelectedDate(day);

    const renderHeader = () => {
        const dateFormat = "MMMM yyyy";
        return (
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold">{format(currentMonth, dateFormat)}</h2>
                    <div className="flex gap-1 bg-white/5 rounded-lg p-1">
                        <button onClick={prevMonth} className="p-1 hover:bg-white/10 rounded"><ChevronLeft className="w-5 h-5" /></button>
                        <button onClick={nextMonth} className="p-1 hover:bg-white/10 rounded"><ChevronRight className="w-5 h-5" /></button>
                    </div>
                </div>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primaryHover rounded-lg text-sm font-semibold transition-colors"
                >
                    <Plus className="w-4 h-4" /> Schedule Post
                </button>
            </div>
        );
    };

    const renderDays = () => {
        const dateFormat = "EEE";
        const days = [];
        let startDate = startOfWeek(currentMonth);
        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="col-span-1 text-center text-xs font-semibold text-gray-500 uppercase py-2" key={i}>
                    {format(addDays(startDate, i), dateFormat)}
                </div>
            );
        }
        return <div className="grid grid-cols-7 mb-2">{days}</div>;
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const dateFormat = "d";
        const rows = [];
        let days = [];
        let day = startDate;

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                const formattedDate = format(day, dateFormat);
                const cloneDay = day;
                const dateKey = format(day, 'yyyy-MM-dd');
                const dayPosts = postsByDate[dateKey] || [];

                days.push(
                    <div
                        className={`min-h-[120px] p-2 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors relative group
                        ${!isSameMonth(day, monthStart) ? "text-gray-600 bg-transparent" : "text-gray-300"}
                        ${isSameDay(day, selectedDate) ? "ring-1 ring-primary inset-0" : ""}
                        `}
                        key={day.toString()}
                        onClick={() => onDateClick(cloneDay)}
                    >
                        <span className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${isSameDay(day, new Date()) ? "bg-primary text-white" : ""}`}>
                            {formattedDate}
                        </span>

                        {/* Real scheduled posts */}
                        {dayPosts.slice(0, 2).map((post, idx) => {
                            const platform = post.target_accounts?.[0]?.platform || 'twitter';
                            const colorClass = PLATFORM_COLORS[platform] || PLATFORM_COLORS.twitter;
                            const icon = PLATFORM_ICONS[platform] || '📝';
                            return (
                                <div
                                    key={post.id || post._id || idx}
                                    className={`mt-1 p-1.5 text-xs ${colorClass} rounded border truncate`}
                                >
                                    {icon} {post.content?.substring(0, 20)}...
                                </div>
                            );
                        })}
                        {dayPosts.length > 2 && (
                            <div className="mt-1 text-xs text-gray-500">+{dayPosts.length - 2} more</div>
                        )}
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div className="grid grid-cols-7 gap-px bg-white/5 border border-white/5 rounded-lg overflow-hidden" key={day.toString()}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="space-y-px">{rows}</div>;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="glass-card p-6 rounded-2xl">
            {renderHeader()}
            {renderDays()}
            {renderCells()}

            {/* Selected day details */}
            {selectedDate && postsByDate[format(selectedDate, 'yyyy-MM-dd')]?.length > 0 && (
                <div className="mt-6 p-4 bg-white/5 rounded-xl">
                    <h3 className="font-semibold mb-3">Posts on {format(selectedDate, 'MMMM d, yyyy')}</h3>
                    <div className="space-y-2">
                        {postsByDate[format(selectedDate, 'yyyy-MM-dd')].map((post, idx) => (
                            <div key={post.id || post._id || idx} className="p-3 bg-white/5 rounded-lg">
                                <p className="text-sm">{post.content}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {format(new Date(post.scheduled_time || post.scheduledFor), 'h:mm a')} •
                                    {post.target_accounts?.map(a => a.platform).join(', ')}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

