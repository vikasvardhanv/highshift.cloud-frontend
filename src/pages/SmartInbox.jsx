import MediaFeed from '../components/dashboard/MediaFeed';

export default function SmartInbox() {
    return (
        <div className="h-full">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Smart Inbox</h1>
            <MediaFeed />
        </div>
    );
}
