
import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Lock, Check, AlertCircle, ArrowLeft, Loader2, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../services/api';

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (!token) {
            setStatus('error');
            setErrorMessage('Invalid or missing reset token.');
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            setStatus('error');
            return;
        }

        if (password.length < 6) {
            setErrorMessage("Password must be at least 6 characters");
            setStatus('error');
            return;
        }

        setStatus('loading');
        setErrorMessage('');

        try {
            await api.post('/auth/reset-password', { token, new_password: password });
            setStatus('success');
            // Redirect after 3 seconds
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            console.error(err);
            setStatus('error');
            setErrorMessage(err.response?.data?.detail || "Failed to reset password. The link may have expired.");
        }
    };

    if (!token) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Invalid Link</h2>
                    <p className="mt-2 text-slate-600 dark:text-slate-400">This password reset link is invalid or missing.</p>
                    <div className="mt-6">
                        <Link to="/login" className="text-indigo-600 hover:text-indigo-500 font-medium">Back to Login</Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-xl shadow-indigo-600/20">
                        <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 dark:text-white">
                    Set new password
                </h2>
                <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
                    Your new password must be different from previously used passwords.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white dark:bg-slate-800 py-8 px-4 shadow sm:rounded-xl sm:px-10 border border-slate-200 dark:border-slate-700">
                    {status === 'success' ? (
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                                <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                            <h3 className="text-lg font-medium text-slate-900 dark:text-white">Password Reset Successful</h3>
                            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                Your password has been updated. You will be redirected to the login page shortly.
                            </p>
                            <div className="mt-6">
                                <Link
                                    to="/login"
                                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 flex items-center justify-center gap-2"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to login
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="new-password" className="block text-sm font-bold text-slate-700 dark:text-slate-300">
                                    New Password
                                </label>
                                <div className="mt-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        id="new-password"
                                        name="new-password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="appearance-none block w-full pl-10 pr-10 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-slate-700 dark:text-white"
                                        placeholder="••••••••"
                                        minLength={6}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="confirm-password" className="block text-sm font-bold text-slate-700 dark:text-slate-300">
                                    Confirm Password
                                </label>
                                <div className="mt-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        id="confirm-password"
                                        name="confirm-password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="appearance-none block w-full pl-10 pr-10 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-slate-700 dark:text-white"
                                        placeholder="••••••••"
                                        minLength={6}
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
                                    className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {status === 'loading' ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        'Reset Password'
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
