import { useEffect, useState } from 'react';
import { getMediaLibrary } from '../services/api';
import { Loader2, Image as ImageIcon, Trash2, Calendar, Download, Film } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function MediaLibrary() {
 const { t } = useTranslation();
 const [media, setMedia] = useState([]);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
 loadMedia();
 }, []);

 const loadMedia = async () => {
 try {
 const data = await getMediaLibrary();
 setMedia(data || []); // Backend returns list of items directly or wrapped
 } catch (err) {
 console.error(err);
 } finally {
 setLoading(false);
 }
 };

 if (loading) return <div className="p-20 flex justify-center"><Loader2 className="animate-spin text-raven-400 w-8 h-8" /></div>;

 return (
 <div className="max-w-7xl mx-auto space-y-8 pb-20 animate-in fade-in duration-500">
 {/* Header */}
 <div className="flex items-end justify-between">
 <div>
 <h1 className="text-3xl font-bold text-textMain">{t('media.title')}</h1>
 <p className="text-textMuted text-textMuted mt-1">
 {t('media.subtitle')}
 </p>
 </div>
 </div>

 {/* Gallery */}
 {media.length === 0 ? (
 <div className="bg-bgSurface border border-borderColor rounded-2xl p-12 text-center">
 <div className="w-16 h-16 rounded-full bg-bgSurfaceHighlight flex items-center justify-center mx-auto mb-4">
 <ImageIcon className="w-8 h-8 text-textMuted" />
 </div>
 <h3 className="text-lg font-bold text-textMuted mb-2">{t('media.noMedia')}</h3>
 <p className="text-textMuted text-sm max-w-md mx-auto">
 {t('media.noMediaDesc')}
 </p>
 </div>
 ) : (
 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
 {media.map(item => (
 <div key={item.id} className="group relative bg-bgSurface border border-borderColor rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all pt-[100%]">
 <div className="absolute inset-0">
 {item.type === 'video' ? (
 <div className="w-full h-full relative bg-bgColor">
 <video src={item.url} className="w-full h-full object-cover" />
 <div className="absolute top-2 right-2 p-1 bg-black/50 rounded-lg">
 <Film className="w-4 h-4 text-textMain" />
 </div>
 </div>
 ) : (
 <img src={item.url} alt={item.filename} className="w-full h-full object-cover" loading="lazy" />
 )}

 {/* Overlay info */}
 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
 <p className="text-textMain text-xs truncate font-medium mb-1">{item.filename}</p>
 <p className="text-white/70 text-[10px] flex items-center gap-1">
 <Calendar className="w-3 h-3" />
 {new Date(item.created_at).toLocaleDateString()}
 </p>
 </div>
 </div>
 </div>
 ))}
 </div>
 )}
 </div>
 );
}
