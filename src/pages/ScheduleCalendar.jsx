import { useEffect, useState } from 'react';
import { getScheduleCalendar, cancelScheduledPost } from '../services/api';
import { Calendar, Clock, Loader2, Trash2, ChevronLeft, ChevronRight, Twitter, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

const PLATFORM_ICONS = {
    twitter: Twitter,
    facebook: Facebook,
    instagram: Instagram,
    linkedin: Linkedin,
    youtube: Youtube,
};

export default function ScheduleCalendar() {
    const [calendarData, setCalendarData] = useState({});
    const [loading, setLoading] = useState(true);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        loadCalendar();
    }, []);

    const loadCalendar = async () => {
        try {
            const data = await getScheduleCalendar();
            setCalendarData(data || {});
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (postId) => {
        if (!confirm("Cancel this scheduled post?")) return;
        try {
            await cancelScheduledPost(postId);
            await loadCalendar();
        } catch (err) {
            alert("Failed to cancel post");
        }
    };

    // Calendar helpers
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();
        return { daysInMonth, startingDay };
    };

    const formatDateKey = (year, month, day) => {
        return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    };

    const { daysInMonth, startingDay } = getDaysInMonth(currentMonth);
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold mb-1 flex items-center gap-3">
                        <Calendar className="w-8 h-8 text-secondary" />
                        Schedule Calendar
                    </h1>
                    <p className="text-gray-400">View and manage your scheduled posts</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Calendar Grid */}
                <div className="lg:col-span-2 glass-card p-6 rounded-3xl">
                    <div className="flex justify-between items-center mb-6">
                        <button onClick={prevMonth} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <h2 className="text-xl font-bold">{monthNames[month]} {year}</h2>
                        <button onClick={nextMonth} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Day Headers */}
                    <div className="grid grid-cols-7 gap-2 mb-4">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="text-center text-xs font-bold text-gray-500 uppercase">{day}</div>
                        ))}
                    </div>

                    {/* Calendar Days */}
                    <div className="grid grid-cols-7 gap-2">
                        {/* Empty cells for starting day offset */}
                        {Array.from({ length: startingDay }).map((_, i) => (
                            <div key={`empty-${i}`} className="aspect-square" />
                        ))}

                        {/* Actual days */}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                            const day = i + 1;
                            const dateKey = formatDateKey(year, month, day);
                            const posts = calendarData[dateKey] || [];
                            const hasItems = posts.length > 0;
                            const isSelected = selectedDate === dateKey;
                            const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();

                            return (
                                <button
                                    key={day}
                                    onClick={() => setSelectedDate(dateKey)}
                                    className={`
                                        aspect-square rounded-xl flex flex-col items-center justify-center text-sm transition-all relative
                                        ${isSelected ? 'bg-primary text-white' : 'hover:bg-white/10'}
                                        ${isToday && !isSelected ? 'ring-2 ring-secondary' : ''}
                                    `}
                                >
                                    <span className={`font-medium ${hasItems && !isSelected ? 'text-white' : ''}`}>{day}</span>
                                    {hasItems && (
                                        <div className="flex gap-0.5 mt-1">
                                            {posts.slice(0, 3).map((_, idx) => (
                                                <div key={idx} className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white/50' : 'bg-secondary'}`} />
                                            ))}
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Selected Day Details */}
                <div className="glass-card p-6 rounded-3xl">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-primary" />
                        {selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : 'Select a date'}
                    </h3>

                    {selectedDate && calendarData[selectedDate] ? (
                        <div className="space-y-4">
                            {calendarData[selectedDate].map(post => (
                                <div key={post.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 group">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-bold text-secondary">{post.time}</span>
                                        <button
                                            onClick={() => handleCancel(post.id)}
                                            className="opacity-0 group-hover:opacity-100 p-1 text-red-400 hover:bg-red-500/20 rounded transition-all"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-300 mb-3">{post.content}</p>
                                    <div className="flex gap-2">
                                        {post.platforms?.map(p => {
                                            const Icon = PLATFORM_ICONS[p] || Calendar;
                                            return <Icon key={p} className="w-4 h-4 text-gray-500" />;
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 text-gray-500">
                            {selectedDate ? 'No posts scheduled for this day' : 'Click on a date to see scheduled posts'}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
