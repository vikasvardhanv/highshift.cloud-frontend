import FeaturePageTemplate from '../../components/FeaturePageTemplate';
import { Activity, Search, Radio, Hash, Globe, Bell } from 'lucide-react';

export default function Listening() {
    const features = [
        {
            title: "Brand Monitoring",
            description: "Track mentions of your brand, products, or key executives across the entire web, not just social media.",
            icon: Search
        },
        {
            title: "Trend Discovery",
            description: "Identify emerging topics and hashtags in your industry before your competitors do.",
            icon: Activity
        },
        {
            title: "Sentiment Tracking",
            description: "Visualize the sentiment trend over time. Know instantly if a PR crisis is brewing.",
            icon: Radio
        },
        {
            title: "Custom Topics",
            description: "Build complex boolean queries to listen for specific phrases combined with geolocation or language.",
            icon: Hash
        },
        {
            title: "Competitive Intelligence",
            description: "Listen to your competitors' customers. Find out what they love and hate about their products.",
            icon: Globe
        },
        {
            title: "Smart Alerts",
            description: "Get notified via Slack or Email immediately when mention volume spikes unexpectedly.",
            icon: Bell
        }
    ];

    return (
        <FeaturePageTemplate
            title="Social Listening"
            subtitle="Understand the conversation behind the noise. Turn social data into actionable business intelligence."
            heroGradient="from-orange-500 to-red-500"
            features={features}
            targetRoute="/listening"
        />
    );
}
