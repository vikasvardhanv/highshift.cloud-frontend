import { useState } from 'react';
import { User, Bell, Shield, CreditCard, Save, ExternalLink, Zap } from 'lucide-react';

export default function Settings() {
    const [activeTab, setActiveTab] = useState('profile');
    const [formData, setFormData] = useState({
        name: 'Neural User',
        email: 'user@socialraven.cloud'
    });

    const tabs = [
        { id: 'profile', label: 'Identity', icon: User },
        { id: 'notifications', label: 'Alerts', icon: Bell },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'billing', label: 'Subscription', icon: CreditCard },
    ];

    return (
        <div className="space-y-10 pb-20 animate-fade-in relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight mb-2">System Config</h1>
                    <p className="text-slate-500 font-medium leading-relaxed max-w-xl">
                        Calibrate your neural interface and manage authentication protocols for the socialraven network.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Sidebar Nav */}
                <div className="lg:col-span-3 space-y-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                                w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300
                                ${activeTab === tab.id
                                    ? 'bg-primary/20 text-primary border border-primary/20 shadow-lg shadow-primary/5'
                                    : 'text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent'}
                            `}
                        >
                            <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-primary' : 'text-slate-600'}`} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="lg:col-span-9">
                    <div className="glass-card p-10 rounded-[2.5rem] bg-white dark:bg-surface border-slate-200 dark:border-white/5 shadow-2xl relative overflow-hidden group min-h-[500px]">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 opacity-50 group-hover:opacity-100 transition-opacity"></div>

                        {activeTab === 'profile' && (
                            <div className="space-y-10 animate-fade-in">
                                <div>
                                    <h3 className="text-xl font-black mb-2 uppercase tracking-tight text-slate-900 dark:text-white">Identity Matrix</h3>
                                    <p className="text-xs text-slate-500 font-medium">Update your public signature across the network.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Display Label</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Neural Address</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full"
                                        />
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <button className="flex items-center gap-3 px-8 py-4 bg-primary hover:bg-primaryHover rounded-2xl text-[10px] font-black text-white uppercase tracking-[0.2em] transition-all shadow-xl shadow-primary/20 hover:scale-105 active:scale-95">
                                        <Save className="w-4 h-4" />
                                        Synchronize profile
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'billing' && (
                            <div className="space-y-10 animate-fade-in h-full flex flex-col justify-center items-center text-center py-20">
                                <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center border border-primary/20 mb-8 shadow-2xl">
                                    <CreditCard className="w-10 h-10 text-primary animate-pulse" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black mb-3 uppercase tracking-tighter">Premium Access Active</h3>
                                    <p className="text-sm text-slate-500 font-medium max-w-sm mx-auto leading-relaxed">
                                        Your subscription is managed through our secure stripe portal. Review invoices and plan details below.
                                    </p>
                                </div>
                                <div className="pt-4">
                                    <button className="px-10 py-5 bg-white text-black hover:bg-slate-200 rounded-3xl text-[10px] font-black uppercase tracking-[0.3em] transition-all shadow-2xl hover:scale-105 active:scale-95 flex items-center gap-3">
                                        Access Stripe Portal
                                        <ExternalLink className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab !== 'profile' && activeTab !== 'billing' && (
                            <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl flex items-center justify-center mb-6">
                                    <Zap className="w-8 h-8 text-slate-400 dark:text-slate-700" />
                                </div>
                                <h3 className="text-lg font-black uppercase tracking-tight mb-2 text-slate-900 dark:text-white">Protocol Under Development</h3>
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Neural link for {activeTab} coming soon</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
