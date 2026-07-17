import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2, CheckCircle, XCircle, Zap, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AuthCallback() {
 const [searchParams] = useSearchParams();
 const navigate = useNavigate();

 const token = searchParams.get('token');
 const apiKey = searchParams.get('apiKey');
 const platform = searchParams.get('platform');
 const accountId = searchParams.get('accountId');
 const profileId = searchParams.get('profileId');
 const error = searchParams.get('error');

 const initialStatus = error ? 'error' : (token || platform || accountId || apiKey) ? 'success' : 'error';
 const [status] = useState(initialStatus);

 useEffect(() => {
 // 1. Store JWT token if present
 if (token) {
 localStorage.setItem('token', token);
 }

 // 2. Store API Key if present
 if (apiKey) {
 localStorage.setItem('social_api_key', apiKey);
 }

 // 3. Handle success redirect
 if (status === 'success') {
 const timer = setTimeout(() => {
 const params = new URLSearchParams();
 if (platform) params.set('connected', platform);
 if (accountId) params.set('accountId', accountId);
 if (profileId) {
 params.set('profileId', profileId);
 localStorage.setItem('pending_connection_profile_id', profileId);
 }
 navigate(`/connections${params.toString() ? `?${params.toString()}` : ''}`, { replace: true });
 }, 1200);
 return () => clearTimeout(timer);
 }
 }, [navigate, token, apiKey, platform, accountId, profileId, status]);

 return (
 <div className="flex flex-col items-center justify-center min-h-[80vh] relative overflow-hidden bg-bgColor">
 {/* Background Glows */}
 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full opacity-50 pointer-events-none"></div>

 <div className="relative z-10 text-center max-w-sm px-6">
 {status === 'processing' && (
 <motion.div
 initial={{ opacity: 0, scale: 0.9 }}
 animate={{ opacity: 1, scale: 1 }}
 className="flex flex-col items-center"
 >
 <div className="relative mb-8">
 <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
 <div className="absolute inset-0 flex items-center justify-center">
 <Zap className="w-8 h-8 text-primary animate-pulse" />
 </div>
 </div>
 <h2 className="text-3xl font-bold text-textMain mb-2 tracking-tight">Securing Connection</h2>
 <p className="text-textMuted">Handshaking with your social identity...</p>
 </motion.div>
 )}

 {status === 'success' && (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="flex flex-col items-center"
 >
 <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-8 shadow-2xl shadow-emerald-500/20">
 <ShieldCheck className="w-10 h-10 text-emerald-400" />
 </div>
 <h2 className="text-3xl font-bold text-textMain mb-2 tracking-tight">Identity Verified</h2>
 <p className="text-emerald-400/80 font-medium mb-8">Connection successful! Syncing nodes...</p>

 <div className="flex items-center gap-2 text-textMuted text-xs font-bold uppercase tracking-widest animate-pulse">
 Redirecting <ArrowRight className="w-3 h-3" />
 </div>
 </motion.div>
 )}

 {status === 'error' && (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="flex flex-col items-center"
 >
 <div className="w-20 h-20 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center mb-8 shadow-2xl shadow-red-500/20">
 <XCircle className="w-10 h-10 text-red-500" />
 </div>
 <h2 className="text-3xl font-bold text-textMain mb-2 tracking-tight">Access Restricted</h2>
 <p className="text-textMuted mb-8">{searchParams.get('error') ||"We couldn't verify your credentials with the platform."}</p>
 <button
 onClick={() => navigate('/connections')}
 className="px-8 py-3 bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 border border-white/10 rounded-xl text-textMain font-bold transition-all flex items-center gap-2"
 >
 Return to Connections
 </button>
 </motion.div>
 )}
 </div>
 </div>
 );
}
