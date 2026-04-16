import { motion } from 'framer-motion';
import HowItWorks from '../components/HowItWorks';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function HowItWorksPage() {
    return (
        <div className="bg-white dark:bg-black font-sans min-h-screen pt-16">
            <Navbar />
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-7xl mx-auto px-4 py-20"
            >
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6">Master Your Social Presence</h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto">See how Social Raven empowers your brand across every channel.</p>
                </div>
                
                <HowItWorks />
                
                <div className="mt-32 border-t border-slate-100 dark:border-white/5 pt-20 pb-40">
                    <div className="grid md:grid-cols-2 gap-16">
                        <div>
                            <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Seamless Integration</h2>
                            <p className="text-lg text-slate-600 dark:text-gray-400 mb-8">
                                Connect any social account via OAuth in seconds. We handle the technical complexities of each platform's API so you don't have to.
                            </p>
                            <img src="/static/images/connections-preview.png" alt="Connections" className="rounded-2xl shadow-2xl border border-slate-100 dark:border-white/10" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Visual Scheduling</h2>
                            <p className="text-lg text-slate-600 dark:text-gray-400 mb-8">
                                Use our drag-and-drop calendar to plan your week, month, or quarter. We'll find the peak engagement hours for your specific audience.
                            </p>
                            <img src="/static/images/calendar-preview.png" alt="Calendar" className="rounded-2xl shadow-2xl border border-slate-100 dark:border-white/10" />
                        </div>
                    </div>
                </div>
            </motion.div>
            <Footer />
        </div>
    );
}
