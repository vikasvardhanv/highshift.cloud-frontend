import { motion, AnimatePresence } from"framer-motion";

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Check, AlertCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { api } from '../../services/api';

export default function ForgotPassword() {
 const [email, setEmail] = useState('');
 const [status, setStatus] = useState('idle'); // idle, loading, success, error
 const [errorMessage, setErrorMessage] = useState('');

 const handleSubmit = async (e) => {
 e.preventDefault();
 setStatus('loading');
 setErrorMessage('');

 try {
 await api.post('/auth/forgot-password', { email });
 setStatus('success');
 } catch (err) {
 console.error(err);
 setStatus('error');
 setErrorMessage(err.response?.data?.detail ||"Something went wrong. Please try again.");
 }
 };

 return (
 <div className="min-h-screen bg-bgColor flex flex-col justify-center py-12 sm:px-6 lg:px-8">
 <div className="sm:mx-auto sm:w-full sm:max-w-md">
 <div className="flex justify-center">
 <div className="w-12 h-12 bg-raven-600 rounded-xl flex items-center justify-center shadow-xl shadow-raven-600/20">
 <svg className="w-7 h-7 text-textMain" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
 </svg>
 </div>
 </div>
 <h2 className="mt-6 text-center text-3xl font-extrabold text-textMain">
 Reset your password
 </h2>
 <p className="mt-2 text-center text-sm text-textMuted">
 Enter your email address and we'll send you a link to reset your password.
 </p>
 </div>

 <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
 <div className="bg-bgSurfaceHighlight py-8 px-4 shadow sm:rounded-xl sm:px-10 border border-borderColor">
 {status === 'success' ? (
 <div className="text-center">
 <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
 <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
 </div>
 <h3 className="text-lg font-medium text-textMain">Check your email</h3>
 <p className="mt-2 text-sm text-textMuted text-textMuted">
 We've sent a password reset link to <strong>{email}</strong>.
 </p>
 <div className="mt-6">
 <Link
 to="/login"
 className="text-sm font-medium text-raven-400 hover:text-raven-500 dark:text-raven-400 flex items-center justify-center gap-2"
 >
 <ArrowLeft className="w-4 h-4" />
 Back to login
 </Link>
 </div>
 </div>
 ) : (
 <form className="space-y-6" onSubmit={handleSubmit}>
 <div>
 <label htmlFor="email" className="block text-sm font-bold text-textMuted">
 Email address
 </label>
 <div className="mt-1 relative">
 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
 <Mail className="h-5 w-5 text-textMuted" />
 </div>
 <input
 id="email"
 name="email"
 type="email"
 autoComplete="email"
 required
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 className="appearance-none block w-full pl-10 px-3 py-2 border border-borderColor dark:border-slate-600 rounded-lg shadow-sm placeholder:text-textMuted focus:outline-none focus:ring-raven-500 focus:border-raven-500 sm:text-sm bg-bgSurfaceHighlight text-textMain"
 placeholder="you@example.com"
 />
 </div>
 </div>

 <AnimatePresence>
 {status === 'error' && (
 <motion.div
 initial={{ opacity: 0, height: 0 }}
 animate={{ opacity: 1, height: 'auto' }}
 exit={{ opacity: 0, height: 0 }}
 className="rounded-md bg-red-50 dark:bg-red-900/30 p-4"
 >
 <div className="flex">
 <div className="flex-shrink-0">
 <AlertCircle className="h-5 w-5 text-red-400" />
 </div>
 <div className="ml-3">
 <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
 Error
 </h3>
 <div className="mt-2 text-sm text-red-700 dark:text-red-300">
 <p>{errorMessage}</p>
 </div>
 </div>
 </div>
 </motion.div>
 )}
 </AnimatePresence>

 <div>
 <button
 type="submit"
 disabled={status === 'loading'}
 className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-textMain bg-raven-600 hover:bg-raven-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-raven-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
 >
 {status === 'loading' ? (
 <Loader2 className="w-5 h-5 animate-spin" />
 ) : (
 'Send Reset Link'
 )}
 </button>
 </div>

 <div className="text-center">
 <Link to="/login" className="text-sm font-medium text-raven-400 hover:text-raven-500 dark:text-raven-400">
 Back to login
 </Link>
 </div>
 </form>
 )}
 </div>
 </div>
 </div>
 );
}
