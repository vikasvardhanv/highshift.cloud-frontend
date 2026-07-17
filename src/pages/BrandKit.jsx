import { useEffect, useMemo, useState } from 'react';
import {
 Archive,
 Check,
 Download,
 FileImage,
 Hash,
 ImageUp,
 Layers,
 Loader2,
 Palette,
 Save,
 SlidersHorizontal,
 Sparkles,
 Type,
 X
} from 'lucide-react';
import {
 generateBrandAssets,
 getBrandAssetFormats,
 getBrandKit,
 updateBrandKit
} from '../services/api';

const toneOptions = ['Professional', 'Friendly', 'Witty', 'Inspirational', 'Direct'];
const defaultPresets = {
 social_pack: ['social_square', 'instagram_portrait', 'instagram_story', 'x_header', 'linkedin_post', 'facebook_post'],
 website_pack: ['website_og', 'hero_desktop', 'hero_mobile', 'cover_photo', 'favicon'],
 identity_pack: ['app_icon', 'favicon', 'profile_picture', 'email_header'],
 complete_pack: []
};

const formatLabel = (value) => value
 .split('_')
 .map((part) => part === 'x' ? 'X' : part.charAt(0).toUpperCase() + part.slice(1))
 .join(' ');

const parseDownloadName = (headers) => {
 const disposition = headers?.['content-disposition'];
 const match = disposition?.match(/filename="?([^"]+)"?/i);
 return match?.[1] || 'highshift-brand-assets.zip';
};

export default function BrandKit() {
 const [activeTab, setActiveTab] = useState('voice');
 const [loading, setLoading] = useState(true);
 const [saving, setSaving] = useState(false);
 const [generating, setGenerating] = useState(false);
 const [error, setError] = useState('');
 const [success, setSuccess] = useState('');
 const [formatInfo, setFormatInfo] = useState({ formats: {}, categories: {}, presets: defaultPresets, output_formats: ['png', 'jpg', 'webp', 'ico'] });
 const [assetFile, setAssetFile] = useState(null);
 const [selectedFormats, setSelectedFormats] = useState([]);
 const [outputFormats, setOutputFormats] = useState(['png']);
 const [assetOptions, setAssetOptions] = useState({
 preset: 'social_pack',
 fill_mode: 'contain',
 background_color: '#111827',
 auto_crop: true,
 enhance_contrast: false,
 sharpen: true,
 grayscale: false,
 bw: false,
 invert: false,
 saturation: 1,
 brightness: 1
 });
 const [formData, setFormData] = useState({
 company_name: '',
 industry: '',
 website: '',
 tone: 'Professional',
 description: '',
 keywords: '',
 colors: '#4f46e5, #111827'
 });

 useEffect(() => {
 loadData();
 }, []);

 const loadData = async () => {
 setError('');
 try {
 const [brand, formats] = await Promise.all([getBrandKit(), getBrandAssetFormats()]);
 const preferences = brand?.asset_preferences || {};
 setFormatInfo({
 formats: formats?.formats || {},
 categories: formats?.categories || {},
 presets: formats?.presets || defaultPresets,
 output_formats: formats?.output_formats || ['png', 'jpg', 'webp', 'ico']
 });
 const initialPreset = preferences.preset || 'social_pack';
 setSelectedFormats(preferences.selected_formats || formats?.presets?.[initialPreset] || defaultPresets.social_pack);
 setOutputFormats(preferences.output_formats || ['png']);
 setAssetOptions((current) => ({
 ...current,
 ...preferences,
 preset: initialPreset
 }));
 if (brand) {
 setFormData({
 company_name: brand.company_name || '',
 industry: brand.industry || '',
 website: brand.website || '',
 tone: brand.tone || 'Professional',
 description: brand.description || '',
 keywords: Array.isArray(brand.keywords) ? brand.keywords.join(', ') : brand.keywords || '',
 colors: Array.isArray(brand.colors) ? brand.colors.join(', ') : brand.colors || '#4f46e5, #111827'
 });
 }
 } catch (err) {
 setError(err?.response?.data?.detail || 'Could not load the HighShift brand workspace.');
 } finally {
 setLoading(false);
 }
 };

 const formatCount = useMemo(() => selectedFormats.length * outputFormats.length, [selectedFormats, outputFormats]);
 const sortedCategories = useMemo(() => Object.entries(formatInfo.categories || {}), [formatInfo.categories]);

 const showStatus = (message) => {
 setSuccess(message);
 window.setTimeout(() => setSuccess(''), 2600);
 };

 const handleSave = async () => {
 setSaving(true);
 setError('');
 try {
 const payload = {
 ...formData,
 keywords: formData.keywords.split(',').map((item) => item.trim()).filter(Boolean),
 colors: formData.colors.split(',').map((item) => item.trim()).filter(Boolean),
 asset_preferences: {
 ...assetOptions,
 selected_formats: selectedFormats,
 output_formats: outputFormats
 }
 };
 await updateBrandKit(payload);
 showStatus('HighShift brand workspace saved.');
 } catch (err) {
 setError(err?.response?.data?.detail || 'Failed to save brand workspace.');
 } finally {
 setSaving(false);
 }
 };

 const applyPreset = (preset) => {
 const formats = formatInfo.presets?.[preset] || [];
 setAssetOptions((current) => ({ ...current, preset }));
 if (formats.length) setSelectedFormats(formats);
 if (preset === 'complete_pack' && !formats.length) setSelectedFormats(Object.keys(formatInfo.formats || {}));
 };

 const toggleFormat = (format) => {
 setSelectedFormats((current) => current.includes(format)
 ? current.filter((item) => item !== format)
 : [...current, format]);
 };

 const toggleOutput = (format) => {
 setOutputFormats((current) => {
 const next = current.includes(format)
 ? current.filter((item) => item !== format)
 : [...current, format];
 return next.length ? next : ['png'];
 });
 };

 const handleGenerate = async () => {
 if (!assetFile) {
 setError('Upload a logo or source image before generating assets.');
 return;
 }
 setGenerating(true);
 setError('');
 try {
 const data = new FormData();
 data.append('file', assetFile);
 data.append('selected_formats', selectedFormats.join(','));
 data.append('output_formats', outputFormats.join(','));
 data.append('fill_mode', assetOptions.fill_mode);
 data.append('background_color', assetOptions.background_color);
 data.append('auto_crop', String(assetOptions.auto_crop));
 data.append('enhance_contrast', String(assetOptions.enhance_contrast));
 data.append('sharpen', String(assetOptions.sharpen));
 data.append('grayscale', String(assetOptions.grayscale));
 data.append('bw', String(assetOptions.bw));
 data.append('invert', String(assetOptions.invert));
 data.append('saturation', String(assetOptions.saturation));
 data.append('brightness', String(assetOptions.brightness));

 const response = await generateBrandAssets(data);
 const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/zip' }));
 const link = document.createElement('a');
 link.href = url;
 link.download = parseDownloadName(response.headers);
 document.body.appendChild(link);
 link.click();
 link.remove();
 window.URL.revokeObjectURL(url);
 showStatus('HighShift asset pack generated.');
 } catch (err) {
 const detail = err?.response?.data?.detail;
 setError(typeof detail === 'string' ? detail : 'Asset generation failed.');
 } finally {
 setGenerating(false);
 }
 };

 if (loading) {
 return (
 <div className="max-w-6xl mx-auto space-y-6 pb-20">
 <div className="h-28 rounded-3xl bg-bgSurfaceHighlight animate-pulse" />
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 <div className="h-80 rounded-3xl bg-bgSurfaceHighlight animate-pulse lg:col-span-2" />
 <div className="h-80 rounded-3xl bg-bgSurfaceHighlight animate-pulse" />
 </div>
 </div>
 );
 }

 return (
 <div className="max-w-6xl mx-auto space-y-8 pb-20">
 <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
 <div className="space-y-3">
 <div className="inline-flex items-center gap-2 rounded-full border border-borderColor bg-bgSurfaceHighlight px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-textMuted">
 <Sparkles className="w-3.5 h-3.5 text-primary" />
 HighShift brand workspace
 </div>
 <div>
 <h1 className="text-4xl font-extrabold tracking-tight">Identity Hub</h1>
 <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-textMuted">
 Keep your voice, visual defaults, and ready-to-use asset exports in one place.
 </p>
 </div>
 </div>
 <div className="flex flex-wrap items-center gap-3">
 <button
 onClick={() => setActiveTab('voice')}
 className={`rounded-2xl px-5 py-3 text-xs font-extrabold uppercase tracking-widest transition-all active:scale-95 ${activeTab === 'voice' ? 'bg-bgSurface text-textMain' : 'bg-bgSurfaceHighlight text-textMuted hover:bg-white/10'}`}
 >
 Voice
 </button>
 <button
 onClick={() => setActiveTab('assets')}
 className={`rounded-2xl px-5 py-3 text-xs font-extrabold uppercase tracking-widest transition-all active:scale-95 ${activeTab === 'assets' ? 'bg-bgSurface text-textMain' : 'bg-bgSurfaceHighlight text-textMuted hover:bg-white/10'}`}
 >
 Assets
 </button>
 <button
 onClick={handleSave}
 disabled={saving}
 className="inline-flex items-center gap-3 rounded-2xl bg-primary px-6 py-3 text-xs font-extrabold uppercase tracking-widest text-textMain shadow-lg shadow-primary/20 transition-all hover:bg-primaryHover active:scale-95 disabled:opacity-50"
 >
 {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
 Save
 </button>
 </div>
 </div>

 {(error || success) && (
 <div className={`flex items-center justify-between rounded-2xl border px-5 py-4 text-sm font-semibold ${error ? 'border-red-500/30 bg-red-500/10 text-red-200' : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200'}`}>
 <span>{error || success}</span>
 <button onClick={() => { setError(''); setSuccess(''); }} className="rounded-lg p-1 hover:bg-white/10">
 <X className="w-4 h-4" />
 </button>
 </div>
 )}

 {activeTab === 'voice' ? (
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
 <section className="lg:col-span-8 glass-card rounded-3xl p-8 bg-white/[0.03] border-borderColor">
 <div className="flex items-center gap-4 mb-8">
 <div className="w-12 h-12 rounded-2xl bg-primary/15 border border-primary/20 flex items-center justify-center">
 <Type className="w-6 h-6 text-primary" />
 </div>
 <div>
 <h2 className="text-xl font-extrabold">Brand Voice</h2>
 <p className="text-xs text-textMuted font-bold uppercase tracking-widest mt-1">Used by HighShift content generation</p>
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
 <Field label="Brand name">
 <input value={formData.company_name} onChange={(e) => setFormData({ ...formData, company_name: e.target.value })} className="brand-input" placeholder="HighShift" />
 </Field>
 <Field label="Industry">
 <input value={formData.industry} onChange={(e) => setFormData({ ...formData, industry: e.target.value })} className="brand-input" placeholder="Social automation" />
 </Field>
 <Field label="Website" className="md:col-span-2">
 <input value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} className="brand-input" placeholder="https://highshift.cloud" />
 </Field>
 </div>

 <div className="mt-8">
 <label className="brand-label">Tone</label>
 <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
 {toneOptions.map((tone) => (
 <button
 key={tone}
 onClick={() => setFormData({ ...formData, tone })}
 className={`rounded-2xl border px-4 py-4 text-xs font-extrabold uppercase tracking-widest transition-all active:scale-95 ${formData.tone === tone ? 'border-primary bg-primary/20 text-textMain' : 'border-borderColor bg-bgSurfaceHighlight text-textMuted hover:border-white/20 hover:text-textMuted'}`}
 >
 {tone}
 </button>
 ))}
 </div>
 </div>

 <div className="mt-8">
 <div className="flex items-center justify-between">
 <label className="brand-label">Personality blueprint</label>
 <span className="text-[10px] font-bold tracking-widest text-textMuted">{formData.description.length} / 1000</span>
 </div>
 <textarea
 value={formData.description}
 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
 className="brand-textarea h-44"
 placeholder="Describe how HighShift should sound, what it believes, and the words it should avoid."
 />
 </div>
 </section>

 <aside className="lg:col-span-4 space-y-6">
 <section className="glass-card rounded-3xl p-8 bg-white/[0.03] border-borderColor">
 <div className="flex items-center gap-4 mb-6">
 <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center">
 <Hash className="w-6 h-6 text-emerald-300" />
 </div>
 <div>
 <h2 className="text-lg font-extrabold">Context</h2>
 <p className="text-xs text-textMuted font-bold uppercase tracking-widest mt-1">Keywords and phrases</p>
 </div>
 </div>
 <textarea value={formData.keywords} onChange={(e) => setFormData({ ...formData, keywords: e.target.value })} className="brand-textarea h-36" placeholder="AI agents, scheduling, analytics" />
 </section>

 <section className="glass-card rounded-3xl p-8 bg-white/[0.03] border-borderColor">
 <div className="flex items-center gap-4 mb-6">
 <div className="w-12 h-12 rounded-2xl bg-sky-500/15 border border-sky-500/20 flex items-center justify-center">
 <Palette className="w-6 h-6 text-sky-300" />
 </div>
 <div>
 <h2 className="text-lg font-extrabold">Colors</h2>
 <p className="text-xs text-textMuted font-bold uppercase tracking-widest mt-1">Shared with asset exports</p>
 </div>
 </div>
 <input value={formData.colors} onChange={(e) => setFormData({ ...formData, colors: e.target.value })} className="brand-input" placeholder="#4f46e5, #111827" />
 <div className="mt-4 flex gap-2">
 {formData.colors.split(',').map((color) => color.trim()).filter(Boolean).slice(0, 6).map((color) => (
 <span key={color} title={color} className="h-8 w-8 rounded-xl border border-borderColor" style={{ backgroundColor: color }} />
 ))}
 </div>
 </section>
 </aside>
 </div>
 ) : (
 <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
 <section className="xl:col-span-4 glass-card rounded-3xl p-8 bg-white/[0.03] border-borderColor">
 <div className="flex items-center gap-4 mb-8">
 <div className="w-12 h-12 rounded-2xl bg-primary/15 border border-primary/20 flex items-center justify-center">
 <ImageUp className="w-6 h-6 text-primary" />
 </div>
 <div>
 <h2 className="text-xl font-extrabold">Source Image</h2>
 <p className="text-xs text-textMuted font-bold uppercase tracking-widest mt-1">Logo, mark, or campaign visual</p>
 </div>
 </div>

 <label className="flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-white/15 bg-black/20 p-8 text-center transition-all hover:border-primary/50 hover:bg-primary/5">
 <FileImage className="w-10 h-10 text-textMuted" />
 <span className="mt-4 text-sm font-extrabold text-textMain">{assetFile ? assetFile.name : 'Upload image'}</span>
 <span className="mt-2 max-w-xs text-xs font-medium leading-5 text-textMuted">PNG, JPG, WEBP, or GIF. The backend exports a ready-to-use zip.</span>
 <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" className="hidden" onChange={(e) => setAssetFile(e.target.files?.[0] || null)} />
 </label>

 <div className="mt-6 grid grid-cols-2 gap-3">
 {Object.keys(formatInfo.presets || defaultPresets).map((preset) => (
 <button key={preset} onClick={() => applyPreset(preset)} className={`rounded-2xl border px-4 py-3 text-left text-xs font-extrabold uppercase tracking-widest transition-all active:scale-95 ${assetOptions.preset === preset ? 'border-primary bg-primary/20 text-textMain' : 'border-borderColor bg-bgSurfaceHighlight text-textMuted hover:text-textMuted'}`}>
 {formatLabel(preset.replace('_pack', ''))}
 </button>
 ))}
 </div>
 </section>

 <section className="xl:col-span-5 glass-card rounded-3xl p-8 bg-white/[0.03] border-borderColor">
 <div className="flex items-center gap-4 mb-8">
 <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center">
 <Layers className="w-6 h-6 text-emerald-300" />
 </div>
 <div>
 <h2 className="text-xl font-extrabold">Export Sizes</h2>
 <p className="text-xs text-textMuted font-bold uppercase tracking-widest mt-1">{selectedFormats.length} sizes selected</p>
 </div>
 </div>

 <div className="space-y-7 max-h-[620px] overflow-y-auto pr-2">
 {sortedCategories.map(([category, formats]) => (
 <div key={category}>
 <div className="mb-3 flex items-center justify-between">
 <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-textMuted">{category}</h3>
 <button onClick={() => setSelectedFormats((current) => Array.from(new Set([...current, ...formats])))} className="text-[11px] font-bold text-primary hover:text-textMain">Select all</button>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
 {formats.map((format) => {
 const details = formatInfo.formats?.[format];
 const selected = selectedFormats.includes(format);
 return (
 <button key={format} onClick={() => toggleFormat(format)} className={`rounded-2xl border p-4 text-left transition-all active:scale-[0.98] ${selected ? 'border-primary bg-primary/15' : 'border-borderColor bg-bgSurfaceHighlight hover:border-white/20'}`}>
 <div className="flex items-start justify-between gap-3">
 <div>
 <p className="text-sm font-extrabold text-textMain">{formatLabel(format)}</p>
 <p className="mt-1 text-xs text-textMuted">{details?.width} x {details?.height}</p>
 </div>
 {selected && <Check className="w-4 h-4 text-primary" />}
 </div>
 <p className="mt-3 text-xs leading-5 text-textMuted">{details?.description}</p>
 </button>
 );
 })}
 </div>
 </div>
 ))}
 </div>
 </section>

 <aside className="xl:col-span-3 space-y-6">
 <section className="glass-card rounded-3xl p-8 bg-white/[0.03] border-borderColor">
 <div className="flex items-center gap-4 mb-6">
 <div className="w-12 h-12 rounded-2xl bg-sky-500/15 border border-sky-500/20 flex items-center justify-center">
 <SlidersHorizontal className="w-6 h-6 text-sky-300" />
 </div>
 <div>
 <h2 className="text-lg font-extrabold">Processing</h2>
 <p className="text-xs text-textMuted font-bold uppercase tracking-widest mt-1">Resize behavior</p>
 </div>
 </div>

 <Field label="Canvas fill">
 <select value={assetOptions.fill_mode} onChange={(e) => setAssetOptions({ ...assetOptions, fill_mode: e.target.value })} className="brand-input">
 <option value="contain">Contain</option>
 <option value="cover">Cover</option>
 <option value="transparent">Transparent</option>
 </select>
 </Field>
 <Field label="Background color">
 <input value={assetOptions.background_color} onChange={(e) => setAssetOptions({ ...assetOptions, background_color: e.target.value })} className="brand-input" placeholder="#111827" />
 </Field>

 <div className="mt-5 space-y-3">
 {[
 ['auto_crop', 'Auto crop'],
 ['enhance_contrast', 'Contrast'],
 ['sharpen', 'Sharpen'],
 ['grayscale', 'Grayscale'],
 ['bw', 'Black and white'],
 ['invert', 'Invert']
 ].map(([key, label]) => (
 <Toggle key={key} label={label} checked={assetOptions[key]} onChange={() => setAssetOptions({ ...assetOptions, [key]: !assetOptions[key] })} />
 ))}
 </div>
 </section>

 <section className="glass-card rounded-3xl p-8 bg-white/[0.03] border-borderColor">
 <div className="flex items-center gap-4 mb-6">
 <div className="w-12 h-12 rounded-2xl bg-raven-500/15 border border-raven-500/20 flex items-center justify-center">
 <Archive className="w-6 h-6 text-raven-400" />
 </div>
 <div>
 <h2 className="text-lg font-extrabold">Package</h2>
 <p className="text-xs text-textMuted font-bold uppercase tracking-widest mt-1">{formatCount} files estimated</p>
 </div>
 </div>

 <div className="flex flex-wrap gap-2 mb-6">
 {(formatInfo.output_formats || ['png', 'jpg', 'webp', 'ico']).map((format) => (
 <button key={format} onClick={() => toggleOutput(format)} className={`rounded-xl border px-3 py-2 text-xs font-extrabold uppercase tracking-widest transition-all active:scale-95 ${outputFormats.includes(format) ? 'border-primary bg-primary/20 text-textMain' : 'border-borderColor bg-bgSurfaceHighlight text-textMuted'}`}>
 {format}
 </button>
 ))}
 </div>

 <button onClick={handleGenerate} disabled={generating || !selectedFormats.length} className="w-full inline-flex items-center justify-center gap-3 rounded-2xl bg-bgSurface px-5 py-4 text-xs font-extrabold uppercase tracking-widest text-textMain transition-all hover:bg-gray-200 active:scale-95 disabled:opacity-50">
 {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
 Generate zip
 </button>
 </section>
 </aside>
 </div>
 )}
 </div>
 );
}

function Field({ label, className = '', children }) {
 return (
 <div className={`space-y-2 ${className}`}>
 <label className="brand-label">{label}</label>
 {children}
 </div>
 );
}

function Toggle({ label, checked, onChange }) {
 return (
 <button onClick={onChange} className="flex w-full items-center justify-between rounded-2xl border border-borderColor bg-bgSurfaceHighlight px-4 py-3 text-sm font-bold text-textMuted transition-all hover:bg-white/10 active:scale-[0.98]">
 <span>{label}</span>
 <span className={`h-6 w-10 rounded-full p-1 transition-colors ${checked ? 'bg-primary' : 'bg-white/10'}`}>
 <span className={`block h-4 w-4 rounded-full bg-bgSurface transition-transform ${checked ? 'translate-x-4' : 'translate-x-0'}`} />
 </span>
 </button>
 );
}
