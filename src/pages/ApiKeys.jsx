import { useState, useEffect } from 'react';
import { getKeys, createKey, deleteKey } from '../services/api';
import { Key, Plus, Trash2, Copy, Check, Loader2, AlertCircle, Eye, EyeOff, Terminal, ShieldCheck, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ApiKeys() {
    const [keys, setKeys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [newKeyName, setNewKeyName] = useState('');
    const [showNewKey, setShowNewKey] = useState(null);
    const [copied, setCopied] = useState(false);
    const [isKeyVisible, setIsKeyVisible] = useState(false);

    useEffect(() => {
        loadKeys();
    }, []);

    const loadKeys = async () => {
        try {
            const data = await getKeys();
            setKeys(data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!newKeyName.trim()) return;

        setCreating(true);
        try {
            const res = await createKey(newKeyName);
            setShowNewKey(res);
            setKeys([...keys, res.key]);
            setNewKeyName('');
        } catch (err) {
            alert('Failed to create key');
        } finally {
            setCreating(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to revoke this API Key? integrations using it will stop working immediately.')) return;
        try {
            await deleteKey(id);
            setKeys(keys.filter(k => k.id !== id));
        } catch (err) {
            alert('Failed to delete key');
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

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
            className="space-y-10 pb-20 max-w-5xl mx-auto"
        >
            {/* Header Section */}
            <motion.div variants={item} className="relative p-8 rounded-[2rem] bg-slate-900 border border-white/5 overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] -ml-32 -mb-32 pointer-events-none"></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
                                Developer Suite
                            </span>
                            <span className="inline-block py-1 px-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
                                Solo Access Enabled
                            </span>
                        </div>
                        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">API Management</h1>
                        <p className="text-slate-400 max-w-lg leading-relaxed">
                            Integrate Social Raven directly into your workflow. Create unique keys for specialized automation and solo upload capabilities.
                        </p>
                    </div>

                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
                        <Terminal className="w-10 h-10 text-primary" />
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Create Key Section */}
                <motion.div variants={item} className="lg:col-span-1 space-y-6">
                    <div className="glass-card p-6 rounded-3xl border border-white/10 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 relative z-10">
                            <Plus className="w-5 h-5 text-primary" />
                            New Forge
                        </h3>
                        <form onSubmit={handleCreate} className="space-y-4 relative z-10">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Key Alias</label>
                                <input
                                    type="text"
                                    value={newKeyName}
                                    onChange={(e) => setNewKeyName(e.target.value)}
                                    placeholder="e.g. My Custom Script"
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all placeholder:text-slate-700"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={creating || !newKeyName.trim()}
                                className="w-full py-4 bg-primary hover:bg-primaryHover disabled:opacity-50 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                            >
                                {creating ? <Loader2 className="animate-spin w-5 h-5" /> : <Zap className="w-5 h-5" />}
                                Generate Key
                            </button>
                        </form>
                    </div>

                    <div className="p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 flex gap-4 items-start">
                        <ShieldCheck className="w-6 h-6 text-emerald-500 shrink-0" />
                        <div>
                            <h4 className="text-sm font-bold text-emerald-500">Security First</h4>
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                Keys provide full access to your publishing nodes. Never share them or commit them to public repositories.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Keys Table Section */}
                <motion.div variants={item} className="lg:col-span-2 space-y-6">
                    <AnimatePresence mode="wait">
                        {showNewKey && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="relative p-8 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 shadow-2xl overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4">
                                    <button onClick={() => setShowNewKey(null)} className="p-1 hover:bg-white/10 rounded-lg"><X className="w-4 h-4 text-emerald-500" /></button>
                                </div>
                                <div className="flex items-start gap-5">
                                    <div className="p-3 bg-emerald-500/20 rounded-2xl">
                                        <ShieldCheck className="w-8 h-8 text-emerald-400" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-xl font-bold text-white mb-1">Key Forged Successfully</h4>
                                        <p className="text-sm text-emerald-400/80 mb-6 font-medium">Protect this key. It will not be shown again.</p>

                                        <div className="flex items-center gap-3 bg-black/40 p-4 rounded-xl border border-white/5">
                                            <code className="flex-1 font-mono text-emerald-400 break-all text-sm tracking-tighter">
                                                {isKeyVisible ? showNewKey.rawApiKey : '•'.repeat(48)}
                                            </code>
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => setIsKeyVisible(!isKeyVisible)}
                                                    className="p-2.5 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white"
                                                >
                                                    {isKeyVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                                <button
                                                    onClick={() => copyToClipboard(showNewKey.rawApiKey)}
                                                    className="p-2.5 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white"
                                                >
                                                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="glass-card rounded-[2rem] border border-white/5 shadow-2xl overflow-hidden bg-slate-900/50 backdrop-blur-md">
                        <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
                            <h3 className="font-bold text-lg">Active Identities</h3>
                            <span className="text-xs font-bold text-slate-500 bg-white/5 py-1 px-3 rounded-full">{keys.length} Total</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-white/5 text-[10px] uppercase font-bold text-slate-500 tracking-widest">
                                    <tr>
                                        <th className="px-8 py-4">Identity Name</th>
                                        <th className="px-8 py-4">Created</th>
                                        <th className="px-8 py-4">Last Activity</th>
                                        <th className="px-8 py-4 text-right">Access Control</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {loading ? (
                                        <tr>
                                            <td colSpan="4" className="px-8 py-16 text-center">
                                                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
                                                <p className="text-slate-500 font-medium">Scanning network for keys...</p>
                                            </td>
                                        </tr>
                                    ) : keys.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="px-8 py-16 text-center">
                                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <Key className="w-8 h-8 text-slate-700" />
                                                </div>
                                                <p className="text-slate-500 font-medium italic">No developer keys forged yet.</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        keys.map((key) => (
                                            <tr key={key.id} className="hover:bg-white/5 transition-all group">
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                                                        <span className="font-bold text-slate-200">{key.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5 text-sm text-slate-500">
                                                    {new Date(key.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-8 py-5 text-sm text-slate-500">
                                                    {key.last_used ? new Date(key.last_used).toLocaleDateString() : 'Inactive'}
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <button
                                                        onClick={() => handleDelete(key.id)}
                                                        className="p-2.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                                                        title="Revoke Identity"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

// Add simple X icon if missing
function X({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
    )
}
