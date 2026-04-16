import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfiles, createProfile, deleteProfile, getAuthUrl, disconnectAccount } from '../services/api';
import {
    Facebook, Twitter, Instagram, Linkedin, Youtube,
    Trash2, Plus, Loader2, User, Globe, ExternalLink, Users, Zap
} from 'lucide-react';

const PLATFORMS = [
    { id: 'twitter', name: 'Twitter', icon: Twitter, color: 'text-sky-500', bg: 'bg-sky-50 dark:bg-sky-900/20' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-600', bg: 'bg-pink-50 dark:bg-pink-900/20' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'text-blue-700', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20' },
];

export default function Profiles() {
    const navigate = useNavigate();
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newProfileName, setNewProfileName] = useState('');
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await getProfiles();
            setProfiles(data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateProfile = async () => {
        if (!newProfileName.trim()) return;
        setCreating(true);
        try {
            await createProfile(newProfileName);
            setNewProfileName('');
            await loadData();
        } catch (err) {
            alert('Failed to create profile: ' + (err.response?.data?.detail || err.message));
        } finally {
            setCreating(false);
        }
    };

    const handleDeleteProfile = async (id) => {
        if (!confirm('Delete this profile? All connected accounts will be removed.')) return;
        try {
            await deleteProfile(id);
            await loadData();
        } catch (err) {
            alert('Failed to delete profile');
        }
    };

    const handleDisconnect = async (platform, accountId) => {
        if (!confirm("Disconnect this account?")) return;
        try {
            await disconnectAccount(platform, accountId);
            await loadData();
        } catch (err) {
            alert('Failed to disconnect');
        }
    };

    if (loading) return <div className="p-20 flex justify-center"><Loader2 className="animate-spin text-indigo-600 w-8 h-8" /></div>;

    const totalAccounts = profiles.reduce((sum, p) => sum + (p.accounts?.length || 0), 0);

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Profiles</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        Organize your social accounts into profiles for easy management.
                    </p>
                </div>

                {/* Stats */}
                <div className="flex gap-4">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-center min-w-[100px]">
                        <div className="text-2xl font-bold text-indigo-600">{profiles.length}</div>
                        <div className="text-xs text-slate-500 font-medium">Profiles</div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-center min-w-[100px]">
                        <div className="text-2xl font-bold text-emerald-600">{totalAccounts}</div>
                        <div className="text-xs text-slate-500 font-medium">Accounts</div>
                    </div>
                </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">Create New Profile</h3>
                        <p className="text-indigo-100 text-sm">
                            Each profile can hold multiple social accounts. Use profiles to separate clients, brands, or teams.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newProfileName}
                            onChange={(e) => setNewProfileName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleCreateProfile()}
                            placeholder="Profile name..."
                            className="px-4 py-2.5 bg-white/20 backdrop-blur border border-white/30 rounded-xl text-white placeholder:text-indigo-200 focus:outline-none focus:ring-2 focus:ring-white/50 min-w-[200px]"
                        />
                        <button
                            onClick={handleCreateProfile}
                            disabled={creating || !newProfileName.trim()}
                            className="px-5 py-2.5 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 disabled:opacity-50 transition-all flex items-center gap-2"
                        >
                            {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                            Create
                        </button>
                    </div>
                </div>
            </div>

            {/* Profiles Grid */}
            {profiles.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                        <Users className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-2">No profiles yet</h3>
                    <p className="text-slate-500 text-sm max-w-md mx-auto">
                        Create your first profile above to start connecting social media accounts.
                    </p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {profiles.map(profile => (
                        <div
                            key={profile.id}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            {/* Profile Header */}
                            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                                        {profile.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 dark:text-white">{profile.name}</h3>
                                        <p className="text-xs text-slate-500">
                                            {profile.accounts?.length || 0} connected account{profile.accounts?.length !== 1 ? 's' : ''}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => navigate('/connections')}
                                        className="px-3 py-1.5 text-sm font-medium text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors flex items-center gap-1.5"
                                    >
                                        <Plus className="w-3.5 h-3.5" /> Add Account
                                    </button>
                                    <button
                                        onClick={() => handleDeleteProfile(profile.id)}
                                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                        title="Delete Profile"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Connected Accounts */}
                            <div className="p-5">
                                {(!profile.accounts || profile.accounts.length === 0) ? (
                                    <div className="text-center py-6">
                                        <p className="text-slate-400 text-sm mb-3">No accounts connected yet</p>
                                        <button
                                            onClick={() => navigate('/connections')}
                                            className="text-sm font-medium text-indigo-600 hover:underline flex items-center gap-1 mx-auto"
                                        >
                                            <Zap className="w-4 h-4" /> Connect your first account
                                        </button>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                        {profile.accounts.map(acc => {
                                            const platformCfg = PLATFORMS.find(p => p.id === acc.platform);
                                            const Icon = platformCfg?.icon || Globe;

                                            return (
                                                <div
                                                    key={acc.accountId}
                                                    className={`flex items-center gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-800 ${platformCfg?.bg || 'bg-slate-50'}`}
                                                >
                                                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${platformCfg?.color}`}>
                                                        <Icon className="w-5 h-5" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="font-medium text-slate-800 dark:text-slate-200 text-sm truncate">
                                                            @{acc.username}
                                                        </div>
                                                        <div className="text-xs text-slate-500 capitalize">{acc.platform}</div>
                                                    </div>
                                                    <button
                                                        onClick={() => handleDisconnect(acc.platform, acc.accountId)}
                                                        className="p-1.5 text-slate-400 hover:text-red-500 rounded transition-colors"
                                                        title="Disconnect"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Help Card */}
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 flex-shrink-0">
                        <Zap className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1">Pro Tip: API Integration</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Use profiles to let your customers connect their own accounts. Pass the profile name as the <code className="bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs">user</code> parameter in API requests.
                        </p>
                        <button
                            onClick={() => navigate('/developer')}
                            className="mt-3 text-sm font-medium text-indigo-600 hover:underline flex items-center gap-1"
                        >
                            View API Documentation <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
