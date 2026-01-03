import { Upload, Image as ImageIcon, Film, MoreVertical, Plus } from 'lucide-react';

const MOCK_ASSETS = [
    { id: 1, type: 'image', name: 'Product_Launch_Banner.jpg', size: '2.4 MB', date: '2 mins ago', url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' },
    { id: 2, type: 'image', name: 'Team_Meeting.png', size: '1.2 MB', date: '4 hours ago', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' },
    { id: 3, type: 'video', name: 'Demo_Reel_FINAL.mp4', size: '45.2 MB', date: '1 day ago', url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' },
    { id: 4, type: 'image', name: 'Office_Setup.jpg', size: '3.1 MB', date: '2 days ago', url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' },
    { id: 5, type: 'image', name: 'Logo_Variant_3.png', size: '500 KB', date: '3 days ago', url: 'https://images.unsplash.com/photo-1626785774573-4b79931434c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' },
];

export default function MediaLibrary() {
    return (
        <div className="space-y-10 pb-20 animate-fade-in relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight mb-2">Asset Repository</h1>
                    <p className="text-slate-500 font-medium leading-relaxed max-w-xl">
                        A centralized creative database for high-fidelity media assets and neural-generated textures.
                    </p>
                </div>
                <button className="flex items-center gap-3 px-8 py-4 bg-primary hover:bg-primaryHover rounded-2xl text-sm font-extrabold text-white transition-all shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 border border-white/10">
                    <Upload className="w-5 h-5" />
                    INGEST ASSET
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {MOCK_ASSETS.map((asset) => (
                    <div key={asset.id} className="group relative glass-card rounded-[2.5rem] overflow-hidden bg-white/[0.02] border-white/5 hover:border-primary/30 transition-all duration-500 shadow-2xl">
                        <div className="aspect-[4/3] relative bg-slate-900 overflow-hidden">
                            <img
                                src={asset.url}
                                alt={asset.name}
                                className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>

                            {/* Tags */}
                            <div className="absolute top-4 left-4 flex gap-2">
                                <div className="px-3 py-1.5 bg-black/60 rounded-xl text-[9px] font-bold text-white backdrop-blur-md flex items-center gap-2 border border-white/10">
                                    {asset.type === 'video' ? <Film className="w-3 h-3 text-primary" /> : <ImageIcon className="w-3 h-3 text-primary" />}
                                    {asset.type.toUpperCase()}
                                </div>
                            </div>

                            {/* Actions Overlay */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-sm">
                                <button className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-2xl text-white flex items-center justify-center border border-white/10 transition-all hover:scale-110">
                                    <MoreVertical className="w-5 h-5" />
                                </button>
                                <button className="px-5 py-2.5 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all hover:scale-105">
                                    Preview
                                </button>
                            </div>
                        </div>

                        <div className="p-8">
                            <h3 className="font-extrabold text-sm truncate mb-3 group-hover:text-primary transition-colors">{asset.name}</h3>
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{asset.size}</span>
                                    <span className="text-[10px] font-medium text-slate-700">{asset.date}</span>
                                </div>
                                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-white/5 flex items-center justify-center group-hover:border-primary/50 transition-colors">
                                    <Plus className="w-4 h-4 text-slate-600 group-hover:text-primary" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Empty / Add More Placeholder */}
                <button className="group relative glass-card rounded-[2.5rem] border-dashed border-white/10 hover:border-primary/50 transition-all duration-500 flex flex-col items-center justify-center gap-4 min-h-[320px] bg-white/[0.01] hover:bg-white/[0.03]">
                    <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Plus className="w-6 h-6 text-slate-600 group-hover:text-primary" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Add to Library</span>
                </button>
            </div>
        </div>
    );
}
