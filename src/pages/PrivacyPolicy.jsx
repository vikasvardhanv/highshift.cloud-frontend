export default function PrivacyPolicy() {
    return (
        <div className="max-w-4xl mx-auto py-12 px-4 space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
                <p className="text-slate-500">Effective Date: January 1, 2024</p>
            </div>

            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800">1. Introduction</h2>
                <p className="text-slate-600 leading-relaxed">
                    Welcome to Social Raven ("we," "our," or "us"). We are committed to protecting your privacy and ensuring you have a positive experience on our website and in using our products and services (collectively, "Services"). This policy outlines our data handling practices and your rights.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800">2. Information We Collect</h2>
                <p className="text-slate-600 leading-relaxed">
                    We collect information directly from you when you register for an account, connect social media profiles, or contact support. This includes:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-slate-600">
                    <li>Account Information: Name, email address, and profile picture.</li>
                    <li>Social Data: Public profile information and content from connected accounts (Facebook, Instagram, LinkedIn, etc.) solely for the purpose of publishing and analytics.</li>
                    <li>Usage Data: Information about how you use our dashboard and features.</li>
                </ul>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800">3. How We Use Your Information</h2>
                <p className="text-slate-600 leading-relaxed">
                    We use your data to:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-slate-600">
                    <li>Provide, maintain, and improve our Services.</li>
                    <li>Process transactions and send related information.</li>
                    <li>Send technical notices, updates, and support messages.</li>
                    <li>Respond to your comments and questions.</li>
                </ul>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800">4. Data Sharing and Disclosure</h2>
                <p className="text-slate-600 leading-relaxed">
                    We do not sell your personal data. We may share information with third-party vendors, consultants, and other service providers who need access to such information to carry out work on our behalf, subject to strict data protection obligations.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800">5. Your Rights</h2>
                <p className="text-slate-600 leading-relaxed">
                    You have the right to access, correct, or delete your personal information. You can manage your connected accounts directly within the application settings. To request full account deletion, please visit our Data Deletion page or contact support.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800">6. Contact Us</h2>
                <p className="text-slate-600 leading-relaxed">
                    If you have any questions about this Privacy Policy, please contact us at support@socialraven.cloud.
                </p>
            </section>
        </div>
    );
}
