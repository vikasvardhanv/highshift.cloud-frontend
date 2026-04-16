import FeaturePageTemplate from '../../components/FeaturePageTemplate';
import { MessageSquare, Inbox, Zap, Smile, UserCheck, Filter } from 'lucide-react';
import {
    UnifiedInboxAnimation,
    AutomatedRulesAnimation,
    TeamCalibrationAnimation,
    SavedRepliesAnimation,
    SentimentAnalysisAnimation,
    SmartFilteringAnimation
} from '../../components/FeatureAnimations';

export default function Engagement() {
    const features = [
        {
            title: "Unified Social Inbox",
            description: "Manage comments, DMs, and mentions from X, Facebook, Instagram, and LinkedIn in a single stream.",
            icon: Inbox,
            animation: <UnifiedInboxAnimation />
        },
        {
            title: "Automated Rules",
            description: "Automatically tag, archive, or assign incoming messages based on keywords or sender influence.",
            icon: Zap,
            animation: <AutomatedRulesAnimation />
        },
        {
            title: "Team Calibration",
            description: "See who is replying to a message in real-time to avoid duplicate responses.",
            icon: UserCheck,
            animation: <TeamCalibrationAnimation />
        },
        {
            title: "Saved Replies",
            description: "Build a library of common answers to speed up your response time for FAQs.",
            icon: MessageSquare,
            animation: <SavedRepliesAnimation />
        },
        {
            title: "Sentiment Analysis",
            description: "Instantly gauge the tone of a message (Positive, Neutral, Negative) before you even read it.",
            icon: Smile,
            animation: <SentimentAnalysisAnimation />
        },
        {
            title: "Smart Filtering",
            description: "Create custom views to focus on high-priority tickets, such as purchase inquiries or complaints.",
            icon: Filter,
            animation: <SmartFilteringAnimation />
        }
    ];

    return (
        <FeaturePageTemplate
            title="Social Engagement"
            subtitle="Build stronger relationships with your audience. Never miss a comment, message, or review again."
            heroGradient="from-purple-500 to-pink-500"
            features={features}
            targetRoute="/inbox"
        />
    );
}
