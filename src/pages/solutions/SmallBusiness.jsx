import FeaturePageTemplate from '../../components/FeaturePageTemplate';
import { Zap, Rocket, Target, Instagram, Smartphone, CreditCard } from 'lucide-react';

export default function SmallBusiness() {
    const features = [
        {
            title: "Quick Setup",
            description: "Connect your profiles and start scheduling in less than 5 minutes. No training required.",
            icon: Zap
        },
        {
            title: "Cost Effective",
            description: "Enterprise-grade tools at a price point that makes sense for growing businesses.",
            icon: CreditCard
        },
        {
            title: "Content Ideas",
            description: "Never run out of inspiration. Get AI-suggested content ideas for your niche.",
            icon: Rocket
        },
        {
            title: "Instagram First",
            description: "Powerful tools specifically for Instagram growth, including Grid preview and Stories scheduling.",
            icon: Instagram
        },
        {
            title: "Mobile App",
            description: "Manage your social presence from anywhere. Perfect for owner-operators on the move.",
            icon: Smartphone
        },
        {
            title: "Local SEO",
            description: "Simple tools to help you get discovered by customers in your area.",
            icon: Target
        }
    ];

    return (
        <FeaturePageTemplate
            title="Small Business Growth"
            subtitle="Look like a big brand without the big budget. Tools to help you grow your audience faster."
            heroGradient="from-yellow-500 to-orange-500"
            features={features}
            targetRoute="/publishing"
        />
    );
}
