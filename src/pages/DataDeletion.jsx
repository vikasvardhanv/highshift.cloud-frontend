export default function DataDeletion() {
    return (
        <div className="max-w-4xl mx-auto py-12 px-4 space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">User Data Deletion</h1>
                <p className="text-slate-500">Instructions for removing your data from Social Raven</p>
            </div>

            <section className="space-y-4">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-amber-800 mb-2">Data Deletion Request</h2>
                    <p className="text-amber-700">
                        In accordance with Facebook Platform rules and GDPR compliance, you have the right to request the deletion of your user data.
                    </p>
                </div>

                <h3 className="text-xl font-semibold text-slate-800 mt-8">How to remove your data:</h3>

                <div className="space-y-6">
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 shrink-0">1</div>
                        <div>
                            <h4 className="font-semibold text-slate-900">Disconnect Accounts</h4>
                            <p className="text-slate-600 mt-1">
                                Log in to Social Raven, navigate to the <strong>Connections</strong> page, and click the trash icon next to any connected account. This immediately revokes our access tokens and removes stored profile data for that platform.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 shrink-0">2</div>
                        <div>
                            <h4 className="font-semibold text-slate-900">Deauthorize via Facebook/Instagram</h4>
                            <p className="text-slate-600 mt-1">
                                You can also remove our app's access directly from your social media settings:
                            </p>
                            <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-600">
                                <li><strong>Facebook:</strong> Settings & Privacy &gt; Settings &gt; Business Integrations &gt; Find "Social Raven" &gt; Remove.</li>
                                <li><strong>Instagram:</strong> Settings &gt; Apps and Websites &gt; Active &gt; Find "Social Raven" &gt; Remove.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 shrink-0">3</div>
                        <div>
                            <h4 className="font-semibold text-slate-900">Request Full Erasure</h4>
                            <p className="text-slate-600 mt-1">
                                To permanently delete your Social Raven user account and all associated data, please send an email to our Data Protection Officer:
                            </p>
                            <div className="mt-3 p-4 bg-slate-50 rounded-lg border border-slate-200 inline-block">
                                <span className="font-mono text-slate-700">privacy@socialraven.cloud</span>
                            </div>
                            <p className="text-sm text-slate-500 mt-2">
                                Please include "Data Deletion Request" in the subject line. We will process your request within 30 days.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
