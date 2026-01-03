import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-black/40 border-t border-white/5 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <Link to="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                            HighShift Cloud
                        </Link>
                        <p className="text-gray-400 text-sm">
                            Seamlessly share your videos across multiple platforms. Automate your social media presence with our powerful API.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li><Link to="/features/publishing" className="hover:text-primary transition-colors">Features</Link></li>
                            <li><Link to="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
                            <li><Link to="/docs" className="hover:text-primary transition-colors">Documentation</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Use</Link></li>
                            <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Legal Notice</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Contact</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                <span>info@highshift.cloud</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 mt-0.5" />
                                <span>Calle Puerta del Mar, 18 5th Floor, 29005 Málaga, Spain</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 text-center text-gray-500 text-xs">
                    © {new Date().getFullYear()} HighShift Cloud. All rights reserved. Operado por TONVI TECH SL.
                </div>
            </div>
        </footer>
    );
}
