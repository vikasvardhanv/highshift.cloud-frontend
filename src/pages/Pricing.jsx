import { useNavigate } from 'react-router-dom';
import { Check, X, Zap, Shield, Globe } from 'lucide-react';

import { useTranslation } from 'react-i18next';

export default function Pricing() {
 const navigate = useNavigate();
 const { t } = useTranslation();

 const TIERS = [
 {
 name: 'Starter',
 price: '$15',
 period: '/month',
 description: t('pricing.starterDesc'),
 features: [
 t('pricing.starterF1'),
 t('pricing.starterF2'),
 t('pricing.starterF3'),
 t('pricing.starterF4'),
 t('pricing.starterF5'),
 ],
 notIncluded: [
 t('pricing.starterNF1'),
 t('pricing.starterNF2'),
 t('pricing.starterNF3')
 ],
 cta: t('pricing.starterCta'),
 highlight: false
 },
 {
 name: 'Growth',
 price: '$49',
 period: '/month',
 description: t('pricing.growthDesc'),
 features: [
 t('pricing.growthF1'),
 t('pricing.growthF2'),
 t('pricing.growthF3'),
 t('pricing.growthF4'),
 t('pricing.growthF5'),
 t('pricing.growthF6')
 ],
 notIncluded: [
 t('pricing.growthNF1'),
 t('pricing.growthNF2')
 ],
 cta: t('pricing.growthCta'),
 highlight: true,
 tag: t('pricing.mostPopular')
 },
 {
 name: 'Agency',
 price: '$99',
 period: '/month',
 description: t('pricing.agencyDesc'),
 features: [
 t('pricing.agencyF1'),
 t('pricing.agencyF2'),
 t('pricing.agencyF3'),
 t('pricing.agencyF4'),
 t('pricing.agencyF5'),
 t('pricing.agencyF6')
 ],
 notIncluded: [],
 cta: t('pricing.agencyCta'),
 highlight: false
 }
 ];

 return (
 <div className="min-h-screen py-20 px-4 animate-fade-in">
 <div className="max-w-7xl mx-auto">
 {/* Header */}
 <div className="text-center mb-16 max-w-3xl mx-auto">
 <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
 {t('pricing.title')}
 </h1>
 <p className="text-textMuted text-lg">
 {t('pricing.subtitle')}
 </p>
 </div>

 {/* Tiers Grid */}
 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
 {/* Background Glow */}
 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-primary/20 blur-[120px] rounded-full -z-10 pointer-events-none"></div>

 {TIERS.map((tier, idx) => (
 <div
 key={idx}
 className={`relative rounded-3xl p-8 border backdrop-blur-xl transition-all duration-300 hover:translate-y-[-5px] flex flex-col ${tier.highlight ? 'bg-white/10 border-primary/50 shadow-[0_0_30px_rgba(99,102,241,0.2)]' : 'bg-black/40 border-borderColor hover:bg-bgSurfaceHighlight'}`}
 >
 {tier.highlight && (
 <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary px-4 py-1 rounded-full text-xs font-bold text-textMain shadow-lg uppercase tracking-wider">
 {tier.tag}
 </div>
 )}

 <div className="mb-8">
 <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
 <div className="flex items-baseline gap-1 mb-2">
 <span className="text-4xl font-bold text-textMain">{tier.price}</span>
 <span className="text-textMuted text-sm">{tier.period}</span>
 </div>
 <p className="text-sm text-textMuted">{tier.description}</p>
 </div>

 <button
 onClick={() => navigate('/login')}
 className={`w-full py-4 rounded-xl font-bold mb-8 transition-all flex items-center justify-center gap-2 ${tier.highlight ? 'bg-primary hover:bg-primaryHover text-textMain shadow-lg' : 'bg-white/10 hover:bg-white/20 text-textMain'}`}
 >
 {tier.cta} <Zap className="w-4 h-4" />
 </button>

 <div className="space-y-4 flex-1">
 {tier.features.map((feat, i) => (
 <div key={i} className="flex items-start gap-3 text-sm">
 <div className={`p-1 rounded-full shrink-0 ${tier.highlight ? 'bg-primary/20' : 'bg-white/10'}`}>
 <Check className={`w-3 h-3 ${tier.highlight ? 'text-primary' : 'text-textMuted'}`} />
 </div>
 <span className="text-textMuted">{feat}</span>
 </div>
 ))}
 {tier.notIncluded.map((feat, i) => (
 <div key={i} className="flex items-start gap-3 text-sm opacity-50">
 <div className="p-1 rounded-full bg-bgSurfaceHighlight shrink-0">
 <X className="w-3 h-3 text-textMuted" />
 </div>
 <span className="text-textMuted line-through">{feat}</span>
 </div>
 ))}
 </div>
 </div>
 ))}
 </div>

 {/* Trust/Social Proof */}
 <div className="mt-24 text-center border-t border-borderColor pt-16">
 <p className="text-sm font-semibold text-textMuted uppercase tracking-wider mb-8">{t('pricing.trustedBy')}</p>
 <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
 {/* Mock Logos */}
 <div className="flex items-center gap-2 text-xl font-bold"><Globe className="w-6 h-6" /> GlobalScale</div>
 <div className="flex items-center gap-2 text-xl font-bold"><Shield className="w-6 h-6" /> SecureTech</div>
 <div className="flex items-center gap-2 text-xl font-bold"><Zap className="w-6 h-6" /> FastGrowth</div>
 </div>
 </div>
 </div>
 </div>
 );
}
