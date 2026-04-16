import FeaturePageTemplate from '../../components/FeaturePageTemplate';
import { BookOpen, PenTool, Lightbulb, Video, Mic, Search } from 'lucide-react';

export default function Blog() {
    const features = [
        {
            title: "Strategy Guides",
            description: "Deep dives into social media strategies that are working right now.",
            icon: Lightbulb
        },
        {
            title: "Product Updates",
            description: "Be the first to know about new features and improvements to Social Raven.",
            icon: PenTool
        },
        {
            title: "Video Tutorials",
            description: "Watch and learn. Step-by-step guides to mastering social media marketing.",
            icon: Video
        },
        {
            title: "Industry News",
            description: "Stay ahead of the curve with the latest updates from X, TikTok, LinkedIn, and Meta.",
            icon: Search
        },
        {
            title: "Podcasts",
            description: "Interviews with top marketing leaders and CMOs.",
            icon: Mic
        },
        {
            title: "Case Studies",
            description: "See how other brands are using Social Raven to achieve massive growth.",
            icon: BookOpen
        }
    ];

    return (
        <FeaturePageTemplate
            title="Social Raven Blog"
            subtitle="Insights, trends, and strategies to help you navigate the ever-changing world of social media."
            heroGradient="from-teal-500 to-cyan-500"
            features={features}
            ctaTitle="Stay in the loop"
            ctaText="Subscribe to our newsletter for weekly updates."
        />
    );
}
