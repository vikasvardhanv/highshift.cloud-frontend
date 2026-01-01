import { useState, useEffect } from 'react';
import { getKeys, createKey, deleteKey } from '../services/api';
import { Key, Plus, Trash2, Copy, Check, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function ApiKeys() {
    const [keys, setKeys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [newKeyName, setNewKeyName] = useState('');
    const [showNewKey, setShowNewKey] = useState(null); // { name, rawApiKey }
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
            // res = { key: {...}, rawApiKey: "..." }
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
        if (!confirm('Are you sure you want to delete this API Key? integrations using it will stop working.')) return;
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

    return (
        <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">API Keys</h2>
                    <p className="text-gray-400 mt-2">Manage your API keys for external integrations.</p>
                </div>
                <div className="p-3 bg-purple-500/10 rounded-full border border-purple-500/20">
                    <Key className="w-6 h-6 text-purple-400" />
                </div>
            </div>

            {/* Create New Key Form */}
            <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-lg font-bold mb-4">Create New Key</h3>
                <form onSubmit={handleCreate} className="flex gap-4">
                    <input
                        type="text"
                        value={newKeyName}
                        onChange={(e) => setNewKeyName(e.target.value)}
                        placeholder="Enter key name (e.g. CI/CD Pipeline)"
                        className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-all"
                    />
                    <button
                        type="submit"
                        disabled={creating || !newKeyName.trim()}
                        className="px-6 py-3 bg-primary hover:bg-primaryHover disabled:opacity-50 rounded-xl font-bold transition-all flex items-center gap-2"
                    >
                        {creating ? <Loader2 className="animate-spin w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        Create Key
                    </button>
                </form>
            </div>

            {/* New Key Modal/Alert */}
            {showNewKey && (
                <div className="bg-green-500/10 border border-green-500/20 p-6 rounded-2xl animate-fade-in">
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-green-500/20 rounded-full shrink-0">
                            <Check className="w-6 h-6 text-green-400" />
                        </div>
                        <div className="flex-1 space-y-3">
                            <div>
                                <h4 className="font-bold text-green-400 text-lg">API Key Created Successfully</h4>
                                <p className="text-sm text-green-400/80">Copy this key now. You won't be able to see it again!</p>
                            </div>
                            <div className="flex items-center gap-2 bg-black/40 p-3 rounded-lg border border-white/5">
                                <code className="flex-1 font-mono text-green-300 break-all">
                                    {isKeyVisible ? showNewKey.rawApiKey : '•'.repeat(40)}
                                </code>
                                <button
                                    onClick={() => setIsKeyVisible(!isKeyVisible)}
                                    className="p-2 hover:bg-white/10 rounded-md transition-colors text-gray-400 hover:text-white"
                                    title={isKeyVisible ? "Hide Key" : "Show Key"}
                                >
                                    {isKeyVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                                <button
                                    onClick={() => copyToClipboard(showNewKey.rawApiKey)}
                                    className="p-2 hover:bg-white/10 rounded-md transition-colors text-gray-400 hover:text-white"
                                    title="Copy Key"
                                >
                                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                </button>
                            </div>
                            <button
                                onClick={() => setShowNewKey(null)}
                                className="text-sm text-gray-400 hover:text-white underline decoration-dotted"
                            >
                                I have saved this key
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Master/Legacy Key Note */}
            <div className="p-4 bg-yellow-500/5 border border-yellow-500/10 rounded-xl flex gap-3 text-yellow-500/80 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p>Note: Your original Master API Key (if any) is still active but not shown here for security. We recommend creating named keys for specific integrations.</p>
            </div>

            {/* Keys List */}
            <div className="glass-card rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-xs uppercase font-semibold text-gray-400">
                        <tr>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Created</th>
                            <th className="px-6 py-4">Last Used</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {loading ? (
                            <tr>
                                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                                    Loading keys...
                                </td>
                            </tr>
                        ) : keys.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="px-6 py-8 text-center text-gray-500 italic">
                                    No named API keys found. Create one above.
                                </td>
                            </tr>
                        ) : (
                            keys.map((key) => (
                                <tr key={key.id} className="hover:bg-white/5 transition-colors group">
                                    <td className="px-6 py-4 font-medium">{key.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-400">
                                        {new Date(key.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-400">
                                        {key.last_used ? new Date(key.last_used).toLocaleDateString() : 'Never'}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleDelete(key.id)}
                                            className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all opacity-50 group-hover:opacity-100"
                                            title="Revoke Key"
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
    );
}
