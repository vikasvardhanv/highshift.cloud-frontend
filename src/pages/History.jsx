import { useState, useEffect } from 'react';
import { Search, Filter, MoreHorizontal, CheckCircle, Clock, Loader2, FileX } from 'lucide-react';
import { getScheduledPosts } from '../services/api';

export default function History() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const itemsPerPage = 8;

    useEffect(() => {
        const loadHistory = async () => {
            try {
                const data = await getScheduledPosts();
                setPosts(data || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadHistory();
    }, []);

    const filteredPosts = posts.filter(post =>
        post.content?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
    const paginatedPosts = filteredPosts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    if (loading) return (
        <div className="flex flex-col items-center justify-center p-24 gap-4">
            <Loader2 className="animate-spin text-primary w-12 h-12" />
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Retrieving Archive Logs...</p>
        </div>
    );

    return (
        <div className="space-y-10 pb-20 animate-fade-in relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight mb-2">Broadcast Archive</h1>
                    <p className="text-slate-500 font-medium leading-relaxed max-w-xl">
                        A chronological record of all neural transmissions across the connected nodes.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative group">
                        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Filter transmissions..."
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
                            className="bg-black/40 border border-white/10 rounded-2xl pl-12 pr-6 py-3.5 text-sm focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all w-full sm:w-72 placeholder:text-slate-700"
                        />
                    </div>
                    <button className="flex items-center justify-center gap-3 px-6 py-3.5 bg-white/5 hover:bg-white/10 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all border border-white/5 hover:border-white/10">
                        <Filter className="w-4 h-4" />
                        Parameters
                    </button>
                </div>
            </div>

            <div className="relative glass-card rounded-[2.5rem] overflow-hidden border-white/5 bg-white/[0.02] shadow-2xl">
                {filteredPosts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 text-center px-6">
                        <div className="w-20 h-20 bg-slate-900 border border-white/5 rounded-3xl flex items-center justify-center mb-6 shadow-inner">
                            <FileX className="w-10 h-10 text-slate-700" />
                        </div>
                        <h3 className="text-xl font-extrabold mb-2">Null Set Detected</h3>
                        <p className="text-sm text-slate-500 max-w-xs font-medium">No transmission records match your current filter parameters.</p>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto scrollbar-hide">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white/[0.03] border-b border-white/5 text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">
                                        <th className="p-8">Transmission Content</th>
                                        <th className="p-8">Target Nodes</th>
                                        <th className="p-8">Temporal Vector</th>
                                        <th className="p-8">Status</th>
                                        <th className="p-8 text-right">Reference</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {paginatedPosts.map((post) => (
                                        <tr key={post.id || post._id} className="group hover:bg-white/[0.02] transition-all duration-300">
                                            <td className="p-8 max-w-sm">
                                                <div className="text-[13px] font-bold text-slate-200 line-clamp-2 leading-relaxed">
                                                    {post.content}
                                                </div>
                                            </td>
                                            <td className="p-8">
                                                <div className="flex -space-x-3">
                                                    {(post.target_accounts || []).slice(0, 4).map(acc => (
                                                        <div
                                                            key={acc.accountId}
                                                            className="w-10 h-10 rounded-xl bg-slate-900 border-2 border-slate-950 flex items-center justify-center text-[10px] font-black uppercase tracking-tighter text-slate-400 group-hover:border-slate-900 transition-colors shadow-xl"
                                                            title={acc.platform}
                                                        >
                                                            {(acc.platform || 'social')[0]}
                                                        </div>
                                                    ))}
                                                    {(post.target_accounts || []).length > 4 && (
                                                        <div className="w-10 h-10 rounded-xl bg-primary/20 border-2 border-slate-950 flex items-center justify-center text-[10px] font-black text-primary group-hover:border-slate-900 transition-colors">
                                                            +{(post.target_accounts || []).length - 4}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-8">
                                                <div className="space-y-1">
                                                    <div className="text-[12px] font-bold text-slate-300">
                                                        {new Date(post.scheduled_time || post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </div>
                                                    <div className="text-[10px] font-medium text-slate-600 uppercase tracking-widest">
                                                        {new Date(post.scheduled_time || post.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-8">
                                                <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-[10px] font-extrabold uppercase tracking-widest border
                                                    ${post.status === 'published'
                                                        ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                                                        : post.status === 'failed'
                                                            ? 'bg-rose-500/10 text-rose-500 border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.1)]'
                                                            : 'bg-primary/10 text-primary border-primary/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]'}`}>
                                                    <div className={`w-1.5 h-1.5 rounded-full ${post.status === 'published' ? 'bg-emerald-500' : post.status === 'failed' ? 'bg-rose-500' : 'bg-primary animate-pulse'}`} />
                                                    {post.status || 'Active'}
                                                </span>
                                            </td>
                                            <td className="p-8 text-right">
                                                <button className="w-10 h-10 bg-slate-900 border border-white/5 rounded-xl flex items-center justify-center text-slate-500 hover:text-white hover:border-primary/50 transition-all opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0">
                                                    <MoreHorizontal className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination - Refined */}
                        <div className="p-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 bg-white/[0.01]">
                            <div className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">
                                Showing record <span className="text-slate-300">{((page - 1) * itemsPerPage) + 1}</span> to <span className="text-slate-300">{Math.min(page * itemsPerPage, filteredPosts.length)}</span> of <span className="text-slate-300">{filteredPosts.length}</span>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="px-6 py-2.5 bg-slate-900 border border-white/5 hover:border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page >= totalPages}
                                    className="px-6 py-2.5 bg-slate-900 border border-white/5 hover:border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                >
                                    Next Phase
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

