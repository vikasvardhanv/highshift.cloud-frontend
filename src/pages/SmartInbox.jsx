import { useEffect, useMemo, useState, useRef } from 'react';
import {
    Facebook, Filter, Inbox, Instagram, Loader2, MessageSquareMore,
    Search, Sparkles, UsersRound, Send, ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAccounts, getInboxThreads, getThreadMessages, sendReply } from '../services/api';

const NETWORKS = ['all', 'facebook', 'instagram'];

const platformMeta = {
    facebook: {
        label: 'Facebook',
        icon: Facebook,
        tone: 'text-blue-300',
        badge: 'border-blue-400/20 bg-blue-400/10 text-blue-100',
        bg: 'bg-blue-600'
    },
    instagram: {
        label: 'Instagram',
        icon: Instagram,
        tone: 'text-pink-300',
        badge: 'border-pink-400/20 bg-pink-400/10 text-pink-100',
        bg: 'bg-pink-600'
    }
};

const getAccountName = (account) => (
    account.displayName
    || account.username
    || account.accountName
    || account.accountId
    || 'Connected account'
);

export default function SmartInbox() {
    // Accounts state
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [network, setNetwork] = useState('all');
    const [query, setQuery] = useState('');
    const [selectedAccountIds, setSelectedAccountIds] = useState([]);

    // Inbox state
    const [threads, setThreads] = useState([]);
    const [selectedThreadId, setSelectedThreadId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loadingMessages, setLoadingMessages] = useState(false);
    
    // Reply state
    const [replyText, setReplyText] = useState('');
    const [sending, setSending] = useState(false);
    const messagesEndRef = useRef(null);

    // Initial Data Load (Accounts & Threads)
    useEffect(() => {
        let active = true;

        const loadData = async () => {
            try {
                const [accountsData, threadsData] = await Promise.all([
                    getAccounts().catch(() => ({ accounts: [] })),
                    getInboxThreads().catch(() => ({ threads: [] }))
                ]);
                
                if (!active) return;

                const inboxAccounts = (accountsData?.accounts || []).filter((account) => (
                    account.platform === 'facebook' || account.platform === 'instagram'
                ));
                setAccounts(inboxAccounts);
                setSelectedAccountIds(inboxAccounts.map((account) => account.accountId));
                
                setThreads(threadsData?.threads || []);
            } catch (error) {
                console.error('Failed to load inbox data', error);
            } finally {
                if (active) setLoading(false);
            }
        };

        loadData();
        return () => { active = false; };
    }, []);

    // Load Messages when Thread is selected
    useEffect(() => {
        if (!selectedThreadId) {
            setMessages([]);
            return;
        }
        let active = true;
        const loadMessages = async () => {
            setLoadingMessages(true);
            try {
                const data = await getThreadMessages(selectedThreadId);
                if (active) {
                    setMessages(data?.messages || []);
                    // Mark as read locally
                    setThreads(current => current.map(t => 
                        t.id === selectedThreadId ? { ...t, is_read: true } : t
                    ));
                }
            } catch (err) {
                console.error('Failed to load messages', err);
            } finally {
                if (active) setLoadingMessages(false);
            }
        };
        loadMessages();
        return () => { active = false; };
    }, [selectedThreadId]);

    // Scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Send Reply
    const handleSendReply = async (e) => {
        e.preventDefault();
        if (!replyText.trim() || !selectedThreadId) return;
        
        const text = replyText.trim();
        setReplyText('');
        setSending(true);
        
        try {
            const data = await sendReply(selectedThreadId, text);
            setMessages(current => [...current, data.message]);
            setThreads(current => current.map(t => 
                t.id === selectedThreadId ? { ...t, snippet: text, updated_at: new Date().toISOString(), is_read: true } : t
            ));
        } catch (err) {
            console.error('Failed to send reply', err);
        } finally {
            setSending(false);
        }
    };

    // Computations
    const counts = useMemo(() => ({
        all: accounts.length,
        facebook: accounts.filter((account) => account.platform === 'facebook').length,
        instagram: accounts.filter((account) => account.platform === 'instagram').length
    }), [accounts]);

    const visibleAccounts = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();
        return accounts.filter((account) => {
            const matchesNetwork = network === 'all' || account.platform === network;
            const matchesQuery = !normalizedQuery || [
                getAccountName(account),
                account.username,
                account.platform
            ].filter(Boolean).some((value) => String(value).toLowerCase().includes(normalizedQuery));
            return matchesNetwork && matchesQuery;
        });
    }, [accounts, network, query]);

    const selectedVisibleCount = visibleAccounts.filter((account) => selectedAccountIds.includes(account.accountId)).length;
    const selectedPlatforms = new Set(
        accounts
            .filter((account) => selectedAccountIds.includes(account.accountId))
            .map((account) => account.platform)
    );
    
    // Include mock threads by default even if real account ID filter fails
    const visibleThreads = useMemo(() => {
        return threads.filter(t => selectedAccountIds.includes(t.account_id) || t.account_id.startsWith('mock_acc_'));
    }, [threads, selectedAccountIds]);
    
    const activeThread = useMemo(() => {
        return threads.find(t => t.id === selectedThreadId);
    }, [threads, selectedThreadId]);

    // Account Handlers
    const toggleAccount = (accountId) => {
        setSelectedAccountIds((current) => current.includes(accountId)
            ? current.filter((item) => item !== accountId)
            : [...current, accountId]);
    };

    const selectVisibleAccounts = () => {
        setSelectedAccountIds((current) => Array.from(new Set([
            ...current,
            ...visibleAccounts.map((account) => account.accountId)
        ])));
    };

    const clearVisibleAccounts = () => {
        const visibleIds = new Set(visibleAccounts.map((account) => account.accountId));
        setSelectedAccountIds((current) => current.filter((accountId) => !visibleIds.has(accountId)));
    };

    if (loading) {
        return (
            <div className="flex min-h-[68vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="mx-auto flex max-w-[1680px] flex-col gap-6 pb-10">
            <header className="flex flex-col gap-5 border-b border-borderColor pb-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-borderColor bg-bgSurfaceHighlight px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-textMuted">
                        <Inbox className="h-3.5 w-3.5 text-primary" />
                        Unified social inbox
                    </div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-textMain">Facebook and Instagram, one queue</h1>
                    <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-textMuted">
                        One operational inbox for every connected Facebook Page and Instagram Business profile.
                    </p>
                </div>

                <div className="grid min-w-[280px] grid-cols-3 gap-3">
                    <Metric label="Accounts" value={counts.all} />
                    <Metric label="FB" value={counts.facebook} />
                    <Metric label="IG" value={counts.instagram} />
                </div>
            </header>

            <div className="grid min-h-[720px] h-[calc(100vh-220px)] grid-cols-1 gap-6 xl:grid-cols-[320px_minmax(0,1fr)_380px]">
                {/* Left Pane - Accounts Filter */}
                <aside className="hidden xl:flex min-h-0 flex-col rounded-3xl border border-borderColor bg-bgSurface p-5 shadow-sm">
                    <div className="flex items-center gap-3 border-b border-borderColor pb-4">
                        <UsersRound className="h-5 w-5 text-textMuted" />
                        <div>
                            <h2 className="text-sm font-extrabold text-textMain">Connected inboxes</h2>
                            <p className="text-xs font-medium text-textMuted">Choose what feeds the shared queue</p>
                        </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2">
                        {NETWORKS.map((item) => (
                            <button
                                key={item}
                                type="button"
                                onClick={() => setNetwork(item)}
                                className={`rounded-2xl border px-3 py-3 text-xs font-extrabold uppercase tracking-widest transition-all ${network === item ? 'border-primary bg-primary/20 text-primary' : 'border-borderColor bg-bgSurfaceHighlight text-textMuted hover:border-textMuted hover:text-textMain'}`}
                            >
                                {item === 'all' ? 'All' : platformMeta[item].label}
                            </button>
                        ))}
                    </div>

                    <label className="relative mt-4 block">
                        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-textMuted" />
                        <input
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Search accounts"
                            className="w-full rounded-2xl border border-borderColor bg-bgSurfaceHighlight py-3 pl-11 pr-4 text-sm font-semibold text-textMain outline-none placeholder:text-textMuted focus:border-primary/60"
                        />
                    </label>

                    <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                        <span className="text-xs font-bold text-gray-400">{selectedVisibleCount} visible selected</span>
                        <div className="flex items-center gap-3">
                            <button type="button" onClick={selectVisibleAccounts} className="text-xs font-bold text-primary hover:text-white">All</button>
                            <button type="button" onClick={clearVisibleAccounts} className="text-xs font-bold text-gray-500 hover:text-white">Clear</button>
                        </div>
                    </div>

                    <div className="mt-4 flex-1 space-y-3 overflow-y-auto pr-1 custom-scrollbar">
                        {visibleAccounts.length ? visibleAccounts.map((account) => (
                            <AccountRow
                                key={`${account.platform}-${account.accountId}`}
                                account={account}
                                checked={selectedAccountIds.includes(account.accountId)}
                                onToggle={() => toggleAccount(account.accountId)}
                            />
                        )) : (
                            <EmptyPanel
                                title="No matching accounts"
                                text="Connect a Facebook Page or Instagram Business account, or change the current filters."
                            />
                        )}
                    </div>
                </aside>

                {/* Middle Pane - Threads List */}
                <main className={`flex min-h-0 flex-col overflow-hidden rounded-3xl border border-borderColor bg-bgSurface shadow-sm ${selectedThreadId ? 'hidden md:flex' : 'flex'}`}>
                    <div className="flex flex-col gap-4 border-b border-borderColor px-6 py-5 md:flex-row md:items-center md:justify-between shrink-0">
                        <div>
                            <h2 className="text-lg font-extrabold text-textMain">All conversations</h2>
                            <p className="mt-1 text-xs font-medium text-textMuted">
                                {visibleThreads.length} active threads across {selectedPlatforms.size || 0} networks
                            </p>
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-2xl border border-borderColor bg-bgSurfaceHighlight px-4 py-3 text-xs font-bold uppercase tracking-widest text-textMuted">
                            <Filter className="h-4 w-4" />
                            Unified view
                        </div>
                    </div>

                    {visibleThreads.length === 0 ? (
                        <div className="flex-1 flex items-center justify-center p-8">
                            <EmptyInbox selectedCount={selectedAccountIds.length} />
                        </div>
                    ) : (
                        <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                            {visibleThreads.map(thread => (
                                <button
                                    key={thread.id}
                                    onClick={() => setSelectedThreadId(thread.id)}
                                    className={`w-full flex items-start gap-4 p-4 rounded-2xl border text-left transition-all ${
                                        selectedThreadId === thread.id 
                                        ? 'bg-primary/20 border-primary/50' 
                                        : !thread.is_read 
                                            ? 'bg-white/10 border-white/20 hover:border-white/30' 
                                            : 'bg-transparent border-transparent hover:bg-white/5'
                                    }`}
                                >
                                    <div className="relative shrink-0">
                                        <img src={thread.sender_avatar} alt="" className="w-12 h-12 rounded-full object-cover" />
                                        <div className="absolute -bottom-1 -right-1">
                                            <PlatformBadgeIcon platform={thread.platform} />
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-bold text-white truncate pr-2">{thread.sender_name}</span>
                                            <span className="text-xs text-gray-400 shrink-0">
                                                {new Date(thread.updated_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                            </span>
                                        </div>
                                        <p className={`text-sm truncate ${!thread.is_read ? 'text-white font-medium' : 'text-gray-500'}`}>
                                            {thread.snippet}
                                        </p>
                                    </div>
                                    {!thread.is_read && (
                                        <div className="w-2.5 h-2.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </main>

                {/* Right Pane - Chat Window */}
                <aside className={`flex min-h-0 flex-col rounded-3xl border border-borderColor bg-bgSurface shadow-sm ${!selectedThreadId ? 'hidden xl:flex' : 'flex'}`}>
                    {!selectedThreadId ? (
                        <div className="p-6">
                            <div className="flex items-center gap-3 border-b border-borderColor pb-4">
                                <MessageSquareMore className="h-5 w-5 text-textMuted" />
                                <div>
                                    <h2 className="text-sm font-extrabold text-textMain">Thread details</h2>
                                    <p className="text-xs font-medium text-gray-500">Reply panel will open here</p>
                                </div>
                            </div>
                            <div className="mt-6 space-y-4">
                                <EmptyPanel
                                    title="Select a conversation"
                                    text="Thread detail, channel, and reply context will appear in this pane."
                                />
                                <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">Channels included</p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        <PlatformBadge platform="facebook" />
                                        <PlatformBadge platform="instagram" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Chat Header */}
                            <div className="flex items-center gap-4 border-b border-white/10 p-5 shrink-0 bg-black/10 rounded-t-3xl">
                                <button onClick={() => setSelectedThreadId(null)} className="xl:hidden p-2 -ml-2 text-gray-400 hover:text-white transition-colors">
                                    <ArrowLeft className="w-5 h-5" />
                                </button>
                                <img src={activeThread?.sender_avatar} className="w-10 h-10 rounded-full object-cover shadow-lg" />
                                <div className="flex-1">
                                    <h3 className="font-bold text-white text-sm">{activeThread?.sender_name}</h3>
                                    <p className="text-xs text-gray-400 capitalize inline-flex items-center gap-1.5 mt-0.5">
                                        <span className={`w-1.5 h-1.5 rounded-full ${platformMeta[activeThread?.platform]?.bg || 'bg-gray-500'}`} />
                                        {activeThread?.platform}
                                    </p>
                                </div>
                            </div>
                            
                            {/* Chat Messages */}
                            <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
                                {loadingMessages ? (
                                    <div className="flex justify-center py-8">
                                        <Loader2 className="w-6 h-6 animate-spin text-primary" />
                                    </div>
                                ) : (
                                    messages.map((msg, i) => {
                                        const showAvatar = !msg.is_from_me && (i === 0 || messages[i-1].is_from_me);
                                        return (
                                            <motion.div 
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                key={msg.id} 
                                                className={`flex items-end gap-2 ${msg.is_from_me ? 'justify-end' : 'justify-start'}`}
                                            >
                                                {!msg.is_from_me && (
                                                    <div className="w-8 shrink-0">
                                                        {showAvatar && <img src={activeThread?.sender_avatar} className="w-8 h-8 rounded-full" />}
                                                    </div>
                                                )}
                                                
                                                <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm ${
                                                    msg.is_from_me 
                                                    ? 'bg-primary text-white rounded-br-sm' 
                                                    : 'bg-white/10 border border-white/5 text-gray-100 rounded-bl-sm'
                                                }`}>
                                                    <p className="leading-relaxed">{msg.text}</p>
                                                    <div className={`text-[10px] mt-1.5 font-medium ${msg.is_from_me ? 'text-white/60 text-right' : 'text-gray-400'}`}>
                                                        {new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                            
                            {/* Chat Input */}
                            <div className="p-4 border-t border-white/10 bg-black/20 rounded-b-3xl shrink-0">
                                <form onSubmit={handleSendReply} className="relative flex items-center">
                                    <input 
                                        type="text" 
                                        value={replyText}
                                        onChange={e => setReplyText(e.target.value)}
                                        placeholder="Type a reply..." 
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-5 pr-14 py-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors shadow-inner"
                                    />
                                    <button 
                                        type="submit" 
                                        disabled={!replyText.trim() || sending}
                                        className="absolute right-2 bg-primary hover:bg-primary/90 text-white rounded-xl w-10 h-10 flex items-center justify-center transition-all disabled:opacity-50 disabled:scale-95 shadow-lg shadow-primary/20"
                                    >
                                        {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 -ml-0.5" />}
                                    </button>
                                </form>
                            </div>
                        </>
                    )}
                </aside>
            </div>
        </div>
    );
}

function Metric({ label, value }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">{label}</p>
            <p className="mt-1 text-2xl font-extrabold text-white">{value}</p>
        </div>
    );
}

function AccountRow({ account, checked, onToggle }) {
    const meta = platformMeta[account.platform];
    const Icon = meta?.icon || Inbox;

    return (
        <button
            type="button"
            onClick={onToggle}
            className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition-all ${checked ? 'border-primary/60 bg-primary/10' : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.07]'}`}
        >
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border ${meta?.badge || 'border-white/10 bg-white/5 text-white'}`}>
                <Icon className={`h-4 w-4 ${meta?.tone || 'text-white'}`} />
            </span>
            <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-extrabold text-white">{getAccountName(account)}</span>
                <span className="mt-1 block truncate text-xs font-medium text-gray-500">
                    {meta?.label || 'Account'}{account.username ? ` · @${account.username}` : ''}
                </span>
            </span>
            <span className={`h-5 w-5 rounded-full border ${checked ? 'border-primary bg-primary' : 'border-white/20 bg-transparent'}`} />
        </button>
    );
}

function PlatformBadge({ platform }) {
    const meta = platformMeta[platform];
    const Icon = meta.icon;

    return (
        <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-bold ${meta.badge}`}>
            <Icon className={`h-3.5 w-3.5 ${meta.tone}`} />
            {meta.label}
        </span>
    );
}

function PlatformBadgeIcon({ platform }) {
    const meta = platformMeta[platform];
    const Icon = meta?.icon || Inbox;
    return (
        <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 border-slate-900 ${meta?.bg || 'bg-gray-600'} text-white`}>
            <Icon className="w-3 h-3" />
        </div>
    );
}

function EmptyInbox({ selectedCount }) {
    return (
        <div className="max-w-xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl border border-primary/20 bg-primary/10">
                <Inbox className="h-7 w-7 text-primary" />
            </div>
            <h3 className="mt-5 text-xl font-extrabold text-white">Unified queue ready</h3>
            <p className="mt-3 text-sm font-medium leading-6 text-gray-400">
                {selectedCount
                    ? `${selectedCount} selected inboxes are combined in this queue.`
                    : 'No inboxes selected.'}
            </p>
        </div>
    );
}

function EmptyPanel({ title, text }) {
    return (
        <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
            <p className="text-sm font-extrabold text-white">{title}</p>
            <p className="mt-2 text-xs font-medium leading-5 text-gray-500">{text}</p>
        </div>
    );
}
