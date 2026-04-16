import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="w-full bg-black border-t border-white/5 pt-24 pb-12 relative z-50">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="space-y-4">
                    <div className="flex items-center gap-4 group">
                        <img src="/images/image.png" alt="Social Raven Logo" className="w-10 h-10 object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                        <span className="text-xl font-black text-white italic uppercase tracking-tighter">Social Raven</span>
                    </div>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            Seamlessly share your videos across multiple platforms. Automate your social media presence with our powerful API.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 tracking-wide">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
                            <li><Link to="/features/publishing" className="hover:text-blue-400 transition-colors">Features</Link></li>
                            <li><Link to="/pricing" className="hover:text-blue-400 transition-colors">Pricing</Link></li>
                            <li><Link to="/docs" className="hover:text-blue-400 transition-colors">Documentation</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 tracking-wide">Legal</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><Link to="/terms" className="hover:text-blue-400 transition-colors">Terms of Use</Link></li>
                            <li><Link to="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Legal Notice</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 tracking-wide">Contact</h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-blue-400" />
                                <span>info@socialraven.cloud</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 mt-0.5 text-blue-400" />
                                <span>Calle Puerta del Mar, 18 5th Floor, 29005 Málaga, Spain</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800 text-center text-slate-500 text-xs">
                    © {new Date().getFullYear()} Social Raven. All rights reserved. Operado por TONVI TECH SL.
                </div>
            </div>
        </footer>
    );
}
