export default function PlaceholderPage({ title }) {
    return (
        <div className="glass-card p-8 rounded-2xl flex flex-col items-center justify-center min-h-[60vh] text-center">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400 mb-4">{title}</h1>
            <p className="text-gray-400 max-w-md">
                This feature is currently under development as part of the Social Raven Pro update.
                Stay tuned for powerful {title.toLowerCase()} tools coming soon.
            </p>
        </div>
    );
}
