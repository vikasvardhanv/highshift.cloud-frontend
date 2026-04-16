import FeaturePageTemplate from '../../components/FeaturePageTemplate';
import { Sparkles, PenTool, Zap, RefreshCw, Type, Bot } from 'lucide-react';

export default function Ghostwriter() {
    const features = [
        {
            title: "AI Caption Generator",
            description: "Generate engaging captions for Instagram, LinkedIn, and X in seconds, tailored to your brand voice.",
            icon: PenTool
        },
        {
            title: "Tone Adjustment",
            description: "Instantly rewrite your drafts to sound more professional, witty, urgent, or empathetic.",
            icon: Sparkles
        },
        {
            title: "Hashtag Suggestions",
            description: "Get relevant, trending hashtags automatically appended to your posts to maximize reach.",
            icon: Hash
        },
        {
            title: "Content Repurposing",
            description: "Turn a single blog post URL into a thread of tweets or a LinkedIn carousel instantly.",
            icon: RefreshCw
        },
        {
            title: "Grammar & Style",
            description: "Built-in proofreading ensures your posts are polished and error-free before publishing.",
            icon: Type
        },
        {
            title: "Idea Brainstorming",
            description: "Stuck on what to post? Ask Ghostwriter for 10 topic ideas for your niche.",
            icon: Zap
        }
    ];

    return (
        <FeaturePageTemplate
            title="AI Ghostwriter"
            subtitle="Your always-on creative partner. Generate, optimize, and repurpose content at scale with artificial intelligence."
            heroGradient="from-violet-600 to-fuchsia-600"
            features={features}
            targetRoute="/ai"
        />
    );
}

function Hash(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="4" x2="20" y1="9" y2="9" />
            <line x1="4" x2="20" y1="15" y2="15" />
            <line x1="10" x2="8" y1="3" y2="21" />
            <line x1="16" x2="14" y1="3" y2="21" />
        </svg>
    )
}
