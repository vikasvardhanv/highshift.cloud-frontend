import { Facebook, Instagram, Linkedin, Twitter, ArrowRight, CheckCircle, Globe } from 'lucide-react';
import { getAuthUrl } from '../../services/api';

export default function Onboarding({ onComplete }) {

    const handleConnect = async (platform) => {
        try {
            const authUrl = await getAuthUrl(platform, window.location.origin + '/publishing');
            window.location.href = authUrl;
        } catch (err) {
            console.error('Failed to get auth URL:', err);
            alert('Failed to connect to ' + platform + '. Please try again.');
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-20 px-4 animate-in fade-in duration-700">
            <div className="text-center mb-12">
                <div className="w-16 h-16 bg-raven-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-raven-600/20 mb-6">
                    <span className="text-white font-bold text-3xl">H</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Welcome to Social Raven
                </h1>
                <p className="text-lg text-gray-500 text-gray-400 max-w-lg mx-auto">
                    Connect your social accounts to start publishing, scheduling, and analyzing your content from one place.
                </p>
            </div>

            <div className="bg-white dark:bg-obsidian-950 border border-white/10 dark:border-white/10 rounded-2xl p-8 shadow-sm">
                <h2 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
                    Select a platform to connect
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <ConnectButton
                        platform="Twitter / X"
                        icon={Twitter}
                        description="Schedule tweets & threads"
                        onClick={() => handleConnect('twitter')}
                    />
                    <ConnectButton
                        platform="LinkedIn"
                        icon={Linkedin}
                        description="Publish professional updates"
                        onClick={() => handleConnect('linkedin')}
                    />
                    <ConnectButton
                        platform="Facebook"
                        icon={Facebook}
                        description="Manage pages & groups"
                        onClick={() => handleConnect('facebook')}
                    />
                    <ConnectButton
                        platform="Instagram"
                        icon={Instagram}
                        description="Share photos & reels"
                        onClick={() => handleConnect('instagram')}
                    />
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 dark:border-white/10 flex items-center justify-center text-xs text-gray-400">
                    <CheckCircle className="w-3 h-3 mr-1.5 text-emerald-500" />
                    Secure OAuth 2.0 Connection
                </div>
            </div>

            <div className="mt-8 text-center">
                <button onClick={onComplete} className="text-sm text-gray-500 hover:text-white dark:hover:text-white transition-colors">
                    Skip for now (Demo Mode)
                </button>
            </div>
        </div>
    );
}

function ConnectButton({ platform, icon: Icon, description, onClick }) {
    return (
        <button
            onClick={onClick}
            className="flex items-start gap-4 p-4 rounded-xl border border-white/10 dark:border-white/10 hover:border-raven-500 dark:hover:border-raven-500 hover:shadow-md transition-all text-left group bg-obsidian-950 hover:bg-white dark:hover:bg-obsidian-950"
        >
            <div className="p-2.5 bg-white/5 rounded-lg shadow-sm group-hover:bg-raven-500/10 group-hover:bg-raven-900/20 group-hover:text-raven-400 transition-colors">
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <h3 className="font-semibold text-white group-hover:text-raven-400 transition-colors">
                    {platform}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">{description}</p>
            </div>
        </button>
    );
}
