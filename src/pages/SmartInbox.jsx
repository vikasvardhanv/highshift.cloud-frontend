import { useEffect, useMemo, useState } from 'react';
import {
    Facebook,
    Filter,
    Inbox,
    Instagram,
    Loader2,
    MessageSquareMore,
    Search,
    Sparkles,
    UsersRound
} from 'lucide-react';
import { getAccounts } from '../services/api';

const NETWORKS = ['all', 'facebook', 'instagram'];

const platformMeta = {
    facebook: {
        label: 'Facebook',
        icon: Facebook,
        tone: 'text-blue-300',
        badge: 'border-blue-400/20 bg-blue-400/10 text-blue-100'
    },
    instagram: {
        label: 'Instagram',
        icon: Instagram,
        tone: 'text-pink-300',
        badge: 'border-pink-400/20 bg-pink-400/10 text-pink-100'
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
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [network, setNetwork] = useState('all');
    const [query, setQuery] = useState('');
    const [selectedAccountIds, setSelectedAccountIds] = useState([]);

    useEffect(() => {
        let active = true;

        const loadAccounts = async () => {
            try {
                const data = await getAccounts();
                if (!active) return;

                const inboxAccounts = (data?.accounts || []).filter((account) => (
                    account.platform === 'facebook' || account.platform === 'instagram'
                ));
                setAccounts(inboxAccounts);
                setSelectedAccountIds(inboxAccounts.map((account) => account.accountId));
            } catch (error) {
                console.error('Failed to load inbox accounts', error);
            } finally {
                if (active) setLoading(false);
            }
        };

        loadAccounts();
        return () => {
            active = false;
        };
    }, []);

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
            <header className="flex flex-col gap-5 border-b border-white/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                        <Inbox className="h-3.5 w-3.5 text-primary" />
                        Unified social inbox
                    </div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-white">Facebook and Instagram, one queue</h1>
                    <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-slate-400">
                        One operational inbox for every connected Facebook Page and Instagram Business profile.
                    </p>
                </div>

                <div className="grid min-w-[280px] grid-cols-3 gap-3">
                    <Metric label="Accounts" value={counts.all} />
                    <Metric label="FB" value={counts.facebook} />
                    <Metric label="IG" value={counts.instagram} />
                </div>
            </header>

            <div className="grid min-h-[720px] grid-cols-1 gap-6 xl:grid-cols-[320px_minmax(0,1fr)_360px]">
                <aside className="flex min-h-0 flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <UsersRound className="h-5 w-5 text-slate-300" />
                        <div>
                            <h2 className="text-sm font-extrabold text-white">Connected inboxes</h2>
                            <p className="text-xs font-medium text-slate-500">Choose what feeds the shared queue</p>
                        </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2">
                        {NETWORKS.map((item) => (
                            <button
                                key={item}
                                type="button"
                                onClick={() => setNetwork(item)}
                                className={`rounded-2xl border px-3 py-3 text-xs font-extrabold uppercase tracking-widest transition-all ${network === item
                                    ? 'border-primary bg-primary/20 text-white'
                                    : 'border-white/10 bg-white/5 text-slate-500 hover:border-white/20 hover:text-slate-300'}`}
                            >
                                {item === 'all' ? 'All' : platformMeta[item].label}
                            </button>
                        ))}
                    </div>

                    <label className="relative mt-4 block">
                        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                        <input
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Search accounts"
                            className="w-full rounded-2xl border border-white/10 bg-black/20 py-3 pl-11 pr-4 text-sm font-semibold text-white outline-none placeholder:text-slate-600 focus:border-primary/60"
                        />
                    </label>

                    <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                        <span className="text-xs font-bold text-slate-400">{selectedVisibleCount} visible selected</span>
                        <div className="flex items-center gap-3">
                            <button type="button" onClick={selectVisibleAccounts} className="text-xs font-bold text-primary hover:text-white">All</button>
                            <button type="button" onClick={clearVisibleAccounts} className="text-xs font-bold text-slate-500 hover:text-white">Clear</button>
                        </div>
                    </div>

                    <div className="mt-4 flex-1 space-y-3 overflow-y-auto pr-1">
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

                <main className="flex min-h-0 flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
                    <div className="flex flex-col gap-4 border-b border-white/10 px-6 py-5 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h2 className="text-lg font-extrabold text-white">All conversations</h2>
                            <p className="mt-1 text-xs font-medium text-slate-500">
                                {selectedAccountIds.length} inboxes selected across {selectedPlatforms.size || 0} networks
                            </p>
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-xs font-bold uppercase tracking-widest text-slate-400">
                            <Filter className="h-4 w-4" />
                            Unified view
                        </div>
                    </div>

                    <div className="grid flex-1 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px]">
                        <section className="flex min-h-[560px] items-center justify-center border-b border-white/10 p-8 lg:border-b-0 lg:border-r">
                            <EmptyInbox selectedCount={selectedAccountIds.length} />
                        </section>

                        <section className="flex flex-col justify-between gap-6 p-6">
                            <div>
                                <div className="mb-4 flex items-center gap-3">
                                    <Sparkles className="h-5 w-5 text-primary" />
                                <div>
                                    <h3 className="text-sm font-extrabold text-white">Inbox behavior</h3>
                                        <p className="text-xs font-medium text-slate-500">Selected channel mix</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <InfoRow label="Facebook pages" value={counts.facebook} />
                                    <InfoRow label="Instagram profiles" value={counts.instagram} />
                                    <InfoRow label="Visible filters" value={selectedVisibleCount} />
                                </div>
                            </div>

                            <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                                <p className="text-sm font-extrabold text-white">Conversation feed</p>
                                <p className="mt-2 text-xs font-medium leading-5 text-slate-500">
                                    No synced threads are available yet for the selected inboxes.
                                </p>
                            </div>
                        </section>
                    </div>
                </main>

                <aside className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <MessageSquareMore className="h-5 w-5 text-slate-300" />
                        <div>
                            <h2 className="text-sm font-extrabold text-white">Thread details</h2>
                            <p className="text-xs font-medium text-slate-500">Reply panel will open here</p>
                        </div>
                    </div>

                    <div className="mt-6 space-y-4">
                        <EmptyPanel
                            title="Select a conversation"
                            text="Thread detail, channel, and reply context will appear in this pane."
                        />
                        <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Channels included</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                <PlatformBadge platform="facebook" />
                                <PlatformBadge platform="instagram" />
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

function Metric({ label, value }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">{label}</p>
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
            className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition-all ${checked
                ? 'border-primary/60 bg-primary/10'
                : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.07]'}`}
        >
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border ${meta?.badge || 'border-white/10 bg-white/5 text-white'}`}>
                <Icon className={`h-4 w-4 ${meta?.tone || 'text-white'}`} />
            </span>
            <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-extrabold text-white">{getAccountName(account)}</span>
                <span className="mt-1 block truncate text-xs font-medium text-slate-500">
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

function EmptyInbox({ selectedCount }) {
    return (
        <div className="max-w-xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl border border-primary/20 bg-primary/10">
                <Inbox className="h-7 w-7 text-primary" />
            </div>
            <h3 className="mt-5 text-xl font-extrabold text-white">Unified queue ready</h3>
            <p className="mt-3 text-sm font-medium leading-6 text-slate-400">
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
            <p className="mt-2 text-xs font-medium leading-5 text-slate-500">{text}</p>
        </div>
    );
}

function InfoRow({ label, value }) {
    return (
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
            <span className="text-xs font-bold text-slate-500">{label}</span>
            <span className="text-sm font-extrabold text-white">{value}</span>
        </div>
    );
}
