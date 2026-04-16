import FeaturePageTemplate from '../../components/FeaturePageTemplate';
import { LifeBuoy, MessageCircle, FileText, PlayCircle, Users, Mail } from 'lucide-react';

export default function Help() {
    const features = [
        {
            title: "Knowledge Base",
            description: "Search hundreds of articles to find answers to your questions instantly.",
            icon: FileText
        },
        {
            title: "Live Chat",
            description: "Chat with a support specialist in real-time. Average response time: < 2 minutes.",
            icon: MessageCircle
        },
        {
            title: "Video Academy",
            description: "Master the platform with our comprehensive video course for new users.",
            icon: PlayCircle
        },
        {
            title: "Community Forum",
            description: "Connect with other Social Raven users to share tips, tricks, and best practices.",
            icon: Users
        },
        {
            title: "Email Support",
            description: "Submit a ticket for complex issues. We'll get back to you within 24 hours.",
            icon: Mail
        },
        {
            title: "System Status",
            description: "Check the real-time operational status of all Social Raven systems.",
            icon: LifeBuoy
        }
    ];

    return (
        <FeaturePageTemplate
            title="Help Center"
            subtitle="We're here to help. Find the answers you need to get back to growing your business."
            heroGradient="from-blue-600 to-blue-800"
            features={features}
            ctaTitle="Still need help?"
            ctaText="Our support team is just a click away."
        />
    );
}
