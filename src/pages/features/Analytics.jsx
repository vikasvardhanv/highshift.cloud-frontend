import FeaturePageTemplate from '../../components/FeaturePageTemplate';
import { BarChart3, TrendingUp, PieChart, Download, Share2, Target } from 'lucide-react';
import {
    CrossChannelAnimation,
    CompetitorAnimation,
    CustomDashboardAnimation,
    AutomatedReportsAnimation,
    PostLevelInsightsAnimation,
    SharableLinksAnimation
} from '../../components/FeatureAnimations';

export default function Analytics() {
    const features = [
        {
            title: "Cross-Channel Performance",
            description: "Aggregated metrics across all your profiles. See your total reach, engagement, and follower growth in one view.",
            icon: BarChart3,
            animation: <CrossChannelAnimation />
        },
        {
            title: "Competitor Benchmarking",
            description: "Track how your performance stacks up against key competitors in your industry.",
            icon: Target,
            animation: <CompetitorAnimation />
        },
        {
            title: "Custom Dashboards",
            description: "Build reports that matter to you. layout widgets to focus on KPIs that drive your business goals.",
            icon: PieChart,
            animation: <CustomDashboardAnimation />
        },
        {
            title: "Automated Reports",
            description: "Schedule PDF reports to be emailed to your clients or stakeholders automatically every week.",
            icon: Download,
            animation: <AutomatedReportsAnimation />
        },
        {
            title: "Post-Level Insights",
            description: "Deep dive into specific posts to understand what creative or copy resonates best with your audience.",
            icon: TrendingUp,
            animation: <PostLevelInsightsAnimation />
        },
        {
            title: "Sharable Links",
            description: "Send live dashboard links to clients so they can check performance without needing a login.",
            icon: Share2,
            animation: <SharableLinksAnimation />
        }
    ];

    return (
        <FeaturePageTemplate
            title="Advanced Analytics"
            subtitle="Prove the value of your social media efforts with data that drives strategy and demonstrates ROI."
            heroGradient="from-emerald-500 to-green-500"
            features={features}
            targetRoute="/analytics"
        />
    );
}
