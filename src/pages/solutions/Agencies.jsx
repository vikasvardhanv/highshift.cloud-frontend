import FeaturePageTemplate from '../../components/FeaturePageTemplate';
import { Briefcase, Layers, Users, FileCheck, Share2, Wallet } from 'lucide-react';

export default function Agencies() {
    const features = [
        {
            title: "Client Portfolio View",
            description: "See the status of all your client accounts in one dashboard without logging in and out.",
            icon: Briefcase
        },
        {
            title: "White-Label Reporting",
            description: "Deliver professional reports with your agency's logo and branding, not ours.",
            icon: FileCheck
        },
        {
            title: "Seamless Collaboration",
            description: "Invite clients to review and approve content with limited-access guest accounts.",
            icon: Users
        },
        {
            title: "Asset Segmentation",
            description: "Keep creative assets completely separate and secure for each client workspace.",
            icon: Layers
        },
        {
            title: "Proof of ROI",
            description: "Demonstrate exact value metric by metric to retain clients and justify retainers.",
            icon: Wallet
        },
        {
            title: "Automated Workflows",
            description: "Reduce manual overhead so your team can handle more clients with the same headcount.",
            icon: Share2
        }
    ];

    return (
        <FeaturePageTemplate
            title="Social Raven for Agencies"
            subtitle="Manage more clients with less chaos. The operating system for modern social media agencies."
            heroGradient="from-indigo-500 to-purple-500"
            features={features}
            targetRoute="/publishing"
        />
    );
}
