import { useState, useEffect } from 'react';
import { Save, Globe, Hash, Smile, Loader2, Link2 } from 'lucide-react';
import { getBrandKit, updateBrandKit } from '../services/api';

export default function BrandKit() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        company_name: '',
        industry: '',
        website: '',
        tone: 'Professional',
        description: '',
        keywords: ''
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await getBrandKit();
            if (data) {
                setFormData({
                    ...data,
                    keywords: Array.isArray(data.keywords) ? data.keywords.join(', ') : data.keywords || ''
                });
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const payload = {
                ...formData,
                keywords: formData.keywords.split(',').map(k => k.trim()).filter(k => k)
            };
            await updateBrandKit(payload);
            alert('Identity Matrix Synchronized.');
        } catch (err) {
            alert('Failed to sync identity.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-primary w-10 h-10" /></div>;

    return (
        <div className="max-w-5xl mx-auto space-y-10 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight mb-2">Identity Hub</h1>
                    <p className="text-slate-500 font-medium">Calibrate your brand's synthetic voice for autonomous generation.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-3 px-8 py-4 bg-primary hover:bg-primaryHover rounded-2xl text-sm font-extrabold transition-all shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 disabled:opacity-50 border border-white/10"
                >
                    {saving ? <Loader2 className="animate-spin w-5 h-5" /> : <Save className="w-5 h-5" />}
                    FORCE SYNC
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Brand Voice Matrix */}
                <div className="lg:col-span-12 glass-card p-10 rounded-[2.5rem] relative overflow-hidden group border-white/5 bg-white/[0.02]">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 transition-transform duration-1000 group-hover:scale-110"></div>

                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center border border-blue-500/20 shadow-lg">
                            <Smile className="w-7 h-7 text-blue-400" />
                        </div>
                        <div>
                            <h3 className="text-xl font-extrabold">Sonic Tone & Description</h3>
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Defines the emotional resonance of output</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-10">
                        {['Professional', 'Friendly', 'Witty', 'Inspirational', 'Aggressive'].map((tone) => (
                            <label key={tone} className={`relative flex flex-col items-center gap-3 p-6 border rounded-[1.5rem] cursor-pointer transition-all duration-300
                                ${formData.tone === tone
                                    ? 'bg-primary/20 border-primary text-white shadow-xl shadow-primary/10'
                                    : 'border-white/5 bg-white/5 text-slate-500 hover:border-white/20 hover:text-slate-300'}`}>
                                <input
                                    type="radio"
                                    name="tone"
                                    className="hidden"
                                    checked={formData.tone === tone}
                                    onChange={() => setFormData({ ...formData, tone })}
                                />
                                <div className={`w-2 h-2 rounded-full mb-1 transition-all ${formData.tone === tone ? 'bg-primary animate-pulse' : 'bg-slate-800'}`}></div>
                                <span className="text-xs font-extrabold uppercase tracking-widest text-center">{tone}</span>
                            </label>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-[0.2em] ml-2">Personality Blueprint</label>
                            <span className="text-[10px] text-slate-600 font-bold tracking-widest">{formData.description.length} / 1000</span>
                        </div>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full h-40 rounded-[1.5rem] p-8 text-[15px]"
                            placeholder="Describe your brand's unique character, mission, and linguistic quirks..."
                        ></textarea>
                    </div>
                </div>

                {/* Identity Information */}
                <div className="lg:col-span-7 glass-card p-10 rounded-[2.5rem] bg-white/[0.02] border-white/5">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-14 h-14 bg-green-500/20 rounded-2xl flex items-center justify-center border border-green-500/20 shadow-lg">
                            <Globe className="w-7 h-7 text-green-400" />
                        </div>
                        <div>
                            <h3 className="text-xl font-extrabold">Static Attributes</h3>
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Core business metadata</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-[0.2em] ml-2">Brand Name</label>
                            <input
                                value={formData.company_name}
                                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                                type="text"
                                className="w-full rounded-2xl px-6 py-4 text-sm font-medium"
                                placeholder="e.g. Social Raven"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-[0.2em] ml-2">Market Sector</label>
                            <input
                                value={formData.industry}
                                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                                type="text"
                                className="w-full rounded-2xl px-6 py-4 text-sm font-medium"
                                placeholder="e.g. AI-Powered SaaS"
                            />
                        </div>
                        <div className="col-span-full space-y-3">
                            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-[0.2em] ml-2">Digital Core (URL)</label>
                            <div className="relative">
                                <Link2 className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                                <input
                                    value={formData.website}
                                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                    type="text"
                                    className="w-full rounded-2xl pl-14 pr-6 py-4 text-sm font-medium"
                                    placeholder="https://yourbrand.com"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Keywords Cloud */}
                <div className="lg:col-span-5 glass-card p-10 rounded-[2.5rem] bg-white/[0.02] border-white/5 relative overflow-hidden group">
                    <div className="absolute bottom-0 right-0 w-40 h-40 bg-pink-500/5 rounded-full blur-3xl -mb-20 -mr-20"></div>

                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-14 h-14 bg-pink-500/20 rounded-2xl flex items-center justify-center border border-pink-500/20 shadow-lg">
                            <Hash className="w-7 h-7 text-pink-400" />
                        </div>
                        <div>
                            <h3 className="text-xl font-extrabold">Context Cloud</h3>
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">High-impact terminologies</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-[0.2em] ml-2">Keywords Matrix</label>
                        <textarea
                            value={formData.keywords}
                            onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                            className="w-full h-[180px] rounded-[1.5rem] p-8 text-sm"
                            placeholder="Comma-separated tokens for AI grounding (e.g. Growth, Efficiency, Innovation)"
                        ></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
}
