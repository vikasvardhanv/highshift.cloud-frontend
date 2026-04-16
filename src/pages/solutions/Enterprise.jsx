import FeaturePageTemplate from '../../components/FeaturePageTemplate';
import { Building, Shield, Lock, Globe, Users, Headphones } from 'lucide-react';

export default function Enterprise() {
    const features = [
        {
            title: "Scalable Governance",
            description: "Advanced role-based access control (RBAC) and SSO integration (Okta, Azure AD) for thousands of users.",
            icon: Lock
        },
        {
            title: "Global Workflow",
            description: "Manage decentralized teams across multiple regions and languages with unified oversight.",
            icon: Globe
        },
        {
            title: "Audit Trails",
            description: "Complete logs of every action taken within the platform for compliance and security reviews.",
            icon: Shield
        },
        {
            title: "Dedicated Success Manager",
            description: "Strategic guidance from social experts who understand the enterprise landscape.",
            icon: Users
        },
        {
            title: "Custom Integrations",
            description: "Connect Social Raven with your existing tech stack: Salesforce, Tableau, Zendesk, and more.",
            icon: Building
        },
        {
            title: "Priority Support",
            description: "24/7/365 support with guaranteed SLA response times.",
            icon: Headphones
        }
    ];

    return (
        <FeaturePageTemplate
            title="Social Raven for Enterprise"
            subtitle="Security, scale, and sophistication. The social suite built for the world's largest organizations."
            heroGradient="from-slate-700 to-slate-900"
            features={features}
            targetRoute="/publishing"
        />
    );
}
