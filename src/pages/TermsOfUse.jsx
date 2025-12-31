import { motion } from 'framer-motion';

export default function TermsOfUse() {
    return (
        <div className="max-w-4xl mx-auto py-20 px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-4xl font-bold mb-8">Terms of Use</h1>
                <p className="text-gray-400 mb-8">Effective Date: April 27, 2024</p>

                <section className="space-y-6 text-gray-300">
                    <p>
                        Welcome to upload-post.com ("we", "our", "us"). These Terms of Use ("Terms") govern your access to and use of our website, services, and products (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, do not use our Services.
                    </p>

                    <p>
                        <strong>Social Media and API Services:</strong> When you authorize a social media network connection, it may store cookies or other data. Your interactions with these authorization features are governed by the privacy policy of the respective social media networks, and TONVI TECH SL shall not be held liable for any unlawful data processing activities performed.
                    </p>

                    <p>
                        Our service uses YouTube API Services. By connecting your account to YouTube, you agree to be bound by the YouTube Terms of Service and the Google Privacy Policy. You can revoke our application's access to your Google account at any time through the Google security settings page or contact us for assistance with unlinking your account.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-10 mb-4">1. Use of Services</h2>
                    <p><strong>Eligibility:</strong> You must be at least 13 years old to use our Services. By using our Services, you represent and warrant that you meet the eligibility requirements.</p>
                    <p><strong>Account Responsibility:</strong> If you create an account with us, you are responsible for maintaining the security of your account, and you are fully responsible for all activities that occur under the account. You agree to immediately notify us of any unauthorized use of your account.</p>
                    <p><strong>License:</strong> We grant you a limited, non-exclusive, non-transferable, revocable license to access and use our Services for your personal, non-commercial use, subject to these Terms.</p>
                    <p><strong>API and Software Access Restrictions:</strong> Access to our API and software is strictly individual and non-transferable. You are expressly prohibited from:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Using our API or software in a mass or bulk manner beyond individual use</li>
                        <li>Establishing or operating a business that leverages our API, software, or services as its foundation</li>
                        <li>Reselling, redistributing, or providing access to our API or software to third parties</li>
                        <li>Using our API or software to create a competing platform or service</li>
                    </ul>
                    <p>Violation of these restrictions may result in immediate termination of your access and potential legal action.</p>

                    <h2 className="text-2xl font-bold text-white mt-10 mb-4">2. User Conduct</h2>
                    <p>You agree not to use the Services to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Violate any applicable laws or regulations.</li>
                        <li>Infringe upon the intellectual property rights of others.</li>
                        <li>Transmit any viruses, malware, or other harmful computer code.</li>
                        <li>Engage in any activity that disrupts or interferes with the Services or servers connected to the Services.</li>
                        <li>Attempt to gain unauthorized access to any portion of the Services, other accounts, computer systems, or networks connected to the Services.</li>
                        <li>Use the Services to collect or harvest any personally identifiable information from other users.</li>
                        <li>Engage in any form of harassment or hate speech.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-white mt-10 mb-4">3. Content</h2>
                    <p>You retain ownership of any content you upload, post, or otherwise transmit through the Services ("User Content"). By providing User Content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, publish, translate, distribute, perform, and display such content within the Services and in any media now known or hereafter developed.</p>
                    <p>You represent and warrant that you have all rights, power, and authority necessary to grant us the rights described above for any User Content you provide.</p>

                    <h2 className="text-2xl font-bold text-white mt-10 mb-4">4. Intellectual Property</h2>
                    <p>The Services and all content, features, and functionality thereof are and will remain the exclusive property of TONVI TECH SL. and its licensors. The content is protected by copyright, trademark, and other laws of both Spain and foreign countries.</p>
                    <p>Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of TONVI TECH SL.</p>

                    <h2 className="text-2xl font-bold text-white mt-10 mb-4">5. Termination</h2>
                    <p>We reserve the right, without notice and at our sole discretion, to terminate your account or access to the Services, for any reason, including without limitation, breach of these Terms. Upon termination, your right to use the Services will immediately cease.</p>

                    <h2 className="text-2xl font-bold text-white mt-10 mb-4">6. Disclaimer of Warranties</h2>
                    <p>The Services are provided on an "AS IS" and "AS AVAILABLE" basis. TONVI TECH SL. makes no representations or warranties of any kind, express or implied, as to the operation of the Services, or the information, content, materials, or products included therein. You expressly agree that your use of the Services is at your sole risk.</p>

                    <h2 className="text-2xl font-bold text-white mt-10 mb-4">7. Limitation of Liability</h2>
                    <p>In no event shall TONVI TECH SL., nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Your access to or use of or inability to access or use the Services;</li>
                        <li>Any conduct or content of any third party on the Services;</li>
                        <li>Any content obtained from the Services;</li>
                        <li>Unauthorized access, use, or alteration of your transmissions or content.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-white mt-10 mb-4">8. Governing Law</h2>
                    <p>These Terms shall be governed and construed in accordance with the laws of Spain, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.</p>

                    <h2 className="text-2xl font-bold text-white mt-10 mb-4">9. Changes to Terms</h2>
                    <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
                    <p>By continuing to access or use our Services after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Services.</p>

                    <h2 className="text-2xl font-bold text-white mt-10 mb-4">10. Contact Us</h2>
                    <p>If you have any questions about these Terms, please contact us:</p>
                    <p>
                        Email: info@upload-post.com<br />
                        Address: Calle Puerta del Mar, 18 5th Floor, 29005 Málaga, Spain
                    </p>
                </section>
            </motion.div>
        </div>
    );
}
