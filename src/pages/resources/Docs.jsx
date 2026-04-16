import FeaturePageTemplate from '../../components/FeaturePageTemplate';
import { Code, Terminal, Key, Database, Globe, Lock } from 'lucide-react';

export default function Docs() {
    const features = [
        {
            title: "REST API",
            description: "Standard HTTP methods for accessing Social Raven resources. JSON responses.",
            icon: Globe
        },
        {
            title: "Authentication",
            description: "Secure OAuth 2.0 flow and API Key authentication for server-to-server communication.",
            icon: Lock
        },
        {
            title: "Webhooks",
            description: "Subscribe to real-time events like 'message.received' or 'post.published'.",
            icon: Database
        },
        {
            title: "SDKs",
            description: "Official client libraries for Node.js, Python, and Ruby.",
            icon: Terminal
        },
        {
            title: "Rate Limits",
            description: "Generous rate limits designed to scale with your application usage.",
            icon: Key
        },
        {
            title: "Interactive Console",
            description: "Test API endpoints directly from your browser without writing code.",
            icon: Code
        }
    ];

    return (
        <FeaturePageTemplate
            title="API Documentation"
            subtitle="Build powerful integrations and custom workflows on top of the Social Raven platform."
            heroGradient="from-slate-800 to-black"
            features={features}
            ctaTitle="Ready to build?"
            ctaText="Get your API credentials from the dashboard."
        />
    );
}
