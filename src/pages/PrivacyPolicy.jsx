import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
    return (
        <div className="max-w-4xl mx-auto py-20 px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                <p className="text-gray-400 mb-8">Effective Date: April 27, 2024</p>

                <section className="space-y-6 text-gray-300">
                    <p>
                        At upload-post.com, operated by TONVI TECH SL ("we", "our", or "us"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our Services.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-10 mb-4">1. Information We Collect</h2>
                    <p><strong>Personal Information:</strong> We may collect personal information such as your name, email address, and payment information when you create an account or subscribe to our Services.</p>
                    <p><strong>Social Media Data:</strong> When you connect your social media accounts (Instagram, Facebook, Twitter, LinkedIn, YouTube), we access certain data from those platforms through their APIs to provide our services. This includes access tokens, profile information, and the ability to post content on your behalf.</p>
                    <p><strong>Usage Data:</strong> We may collect information about how you interact with our website and services, including IP addresses, browser types, and pages visited.</p>

                    <h2 className="text-2xl font-bold text-white mt-10 mb-4">2. How We Use Your Information</h2>
                    <p>We use the collected information for various purposes, including:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>To provide and maintain our Services.</li>
                        <li>To manage your account and provide customer support.</li>
                        <li>To process transactions and send related information.</li>
                        <li>To improve and personalize your experience with our Services.</li>
                        <li>To communicate with you about updates, promotions, and news.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-white mt-10 mb-4">3. Data Retention and Deletion</h2>
                    <p>We retain your information as long as your account is active or as needed to provide you Services. You can delete your account and associated data at any time through your account settings or by contacting us.</p>
                    <p><strong>YouTube API Data:</strong> Our use of YouTube API Services is governed by the Google Privacy Policy. You can manage or revoke access via the <a href="https://security.google.com/settings/security/permissions" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google security settings page</a>.</p>

                    <h2 className="text-2xl font-bold text-white mt-10 mb-4">4. Sharing Your Information</h2>
                    <p>We do not sell your personal information. We may share your data only in the following circumstances:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>With service providers who perform services for us (e.g., hosting, payment processing).</li>
                        <li>When required by law or to protect our rights.</li>
                        <li>With your explicit consent.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-white mt-10 mb-4">5. Security</h2>
                    <p>We implement industry-standard security measures to protect your data. However, no method of transmission over the internet or electronic storage is 100% secure.</p>

                    <h2 className="text-2xl font-bold text-white mt-10 mb-4">6. Your Rights</h2>
                    <p>Depending on your location, you may have rights under the GDPR (General Data Protection Regulation) or other privacy laws, including the right to access, correct, or delete your personal data.</p>

                    <h2 className="text-2xl font-bold text-white mt-10 mb-4">7. Contact Us</h2>
                    <p>If you have any questions about this Privacy Policy, please contact us:</p>
                    <p>
                        Email: info@upload-post.com<br />
                        Address: Calle Puerta del Mar, 18 5th Floor, 29005 Málaga, Spain
                    </p>
                </section>
            </motion.div>
        </div>
    );
}
