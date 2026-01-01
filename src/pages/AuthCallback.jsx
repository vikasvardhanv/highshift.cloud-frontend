import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

export default function AuthCallback() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('processing');

    useEffect(() => {
        // Extract all parameters
        const token = searchParams.get('token');
        const apiKey = searchParams.get('apiKey');
        const platform = searchParams.get('platform');
        const accountId = searchParams.get('accountId');
        const error = searchParams.get('error');

        // 1. Store JWT token if present (for ALL flows: login, registration, platform connection)
        if (token) {
            localStorage.setItem('token', token);
        }

        // 2. Store API Key if present (legacy support, new user registration)
        if (apiKey) {
            localStorage.setItem('social_api_key', apiKey);
        }

        // 3. Determine success/error status
        if (error) {
            setStatus('error');
        } else if (token || platform || accountId || apiKey) {
            // Success if we have any valid OAuth response parameter
            setStatus('success');
            setTimeout(() => {
                navigate('/dashboard');
            }, token && !platform ? 1000 : 1500); // Faster redirect for pure login flows
        } else {
            // No valid parameters - unknown state
            setStatus('error');
        }
    }, [searchParams, navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            {status === 'processing' && (
                <>
                    <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                    <h2 className="text-2xl font-bold">Verifying Connection...</h2>
                </>
            )}
            {status === 'success' && (
                <>
                    <CheckCircle className="w-12 h-12 text-green-500 mb-4 animate-bounce" />
                    <h2 className="text-2xl font-bold">Connected Successfully!</h2>
                    <p className="text-gray-400 mt-2">Redirecting to your dashboard...</p>
                </>
            )}
            {status === 'error' && (
                <>
                    <XCircle className="w-12 h-12 text-red-500 mb-4" />
                    <h2 className="text-2xl font-bold">Connection Failed</h2>
                    <p className="text-gray-400 mt-2">{searchParams.get('error') || "We couldn't verify the connection."}</p>
                    <button onClick={() => navigate('/dashboard')} className="mt-6 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                        Back to Dashboard
                    </button>
                </>
            )}
        </div>
    );
}
