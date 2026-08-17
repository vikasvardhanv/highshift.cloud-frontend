import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import {
  Calendar, TrendingUp, Users, ArrowRight,
  MessageSquare, BarChart3, Radio, Share2, Shield, Workflow, Lock, Zap
} from 'lucide-react';
import heroImage from '../assets/hero-social-raven.png';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();
  return (
    <div className="bg-[#000000] font-sans min-h-screen text-white selection:bg-primary/30 relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-raven-600/20 blur-[120px] rounded-full pointer-events-none opacity-50"></div>


      {/* HERO SECTION */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 px-4 max-w-7xl mx-auto flex flex-col items-center text-center z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium text-white/80 shadow-xl">
            <span className="w-2 h-2 rounded-full bg-raven-500 animate-pulse shadow-[0_0_8px_rgba(139,92,246,0.8)]"></span>
            {t('home.newEngine')}
          </div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 max-w-5xl leading-[1.1]"
        >
          {t('home.osTitle')} <br className="hidden md:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
            {t('home.socialDistribution')}
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-textMuted max-w-2xl mb-12"
        >
          {t('home.heroDesc')}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link to="/login" className="px-8 py-4 bg-white text-black hover:bg-white/90 font-bold rounded-xl transition-all flex items-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.15)]">
            {t('home.startTrial')} <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/product" className="px-8 py-4 bg-[#0a0a0a] border border-white/10 hover:border-white/30 text-white font-medium rounded-xl transition-all shadow-xl">
            {t('home.viewDocs')}
          </Link>
        </motion.div>

        {/* Dashboard Preview Graphic */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-24 w-full relative max-w-[1400px] mx-auto px-4 lg:px-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#000000]/50 to-[#000000] z-10 pointer-events-none"></div>
          <div className="rounded-2xl border border-white/10 bg-[#0a0a0a]/50 p-2 lg:p-4 backdrop-blur-xl shadow-[0_0_100px_rgba(139,92,246,0.15)] overflow-hidden">
             <img 
               src={heroImage} 
               alt="Social Raven Platform" 
               className="w-full h-auto rounded-xl border border-white/10 object-cover"
             />
          </div>
        </motion.div>
      </section>

      {/* STRATEGIC VALUE (BENTO BOX) */}
      <section className="py-32 px-4 max-w-7xl mx-auto relative z-10">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">{t('home.scaleDistribution')} <br/><span className="text-textMuted">{t('home.scaleDistributionSub')}</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          
          {/* Bento Card 1 - Large */}
          <div className="md:col-span-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-white/20 transition-colors flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-raven-500/10 rounded-full blur-[80px] -mr-20 -mt-20 transition-transform duration-700 group-hover:scale-110"></div>
            <div>
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{t('home.campaignsTitle')}</h3>
              <p className="text-textMuted max-w-md">{t('home.campaignsDesc')}</p>
            </div>
          </div>

          {/* Bento Card 2 - Small */}
          <div className="md:col-span-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-white/20 transition-colors flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{t('home.revenueTitle')}</h3>
              <p className="text-textMuted text-sm">{t('home.revenueDesc')}</p>
            </div>
          </div>

          {/* Bento Card 3 - Small */}
          <div className="md:col-span-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-white/20 transition-colors flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                <MessageSquare className="w-6 h-6 text-sky-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{t('home.inboxTitle')}</h3>
              <p className="text-textMuted text-sm">{t('home.inboxDesc')}</p>
            </div>
          </div>

          {/* Bento Card 4 - Large */}
          <div className="md:col-span-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-white/20 transition-colors flex flex-col justify-between">
             <div className="absolute bottom-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-[80px] -mr-20 -mb-20 transition-transform duration-700 group-hover:scale-110"></div>
            <div>
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{t('home.analyticsTitle')}</h3>
              <p className="text-textMuted max-w-md">{t('home.analyticsDesc')}</p>
            </div>
          </div>

        </div>
      </section>

      {/* AUTONOMOUS INTELLIGENCE */}
      <section className="py-32 border-t border-white/5 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-4 max-w-7xl relative">
          <div className="mb-20 text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">{t('home.autonomousIntell')}</h2>
            <p className="text-textMuted">{t('home.engineeredAuthority')}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureBox 
              icon={Users}
              title={t('home.creatorManage')}
              desc={t('home.creatorManageDesc')}
            />
            <FeatureBox 
              icon={Share2}
              title={t('home.employeeAmp')}
              desc={t('home.employeeAmpDesc')}
            />
            <FeatureBox 
              icon={Radio}
              title={t('home.competitorList')}
              desc={t('home.competitorListDesc')}
            />
            <FeatureBox 
              icon={Workflow}
              title={t('home.teamWorkflows')}
              desc={t('home.teamWorkflowsDesc')}
            />
            <FeatureBox 
              icon={Shield}
              title={t('home.enterpriseGrade')}
              desc={t('home.enterpriseGradeDesc')}
            />
            <FeatureBox 
              icon={Zap}
              title={t('home.aiGhostwriter')}
              desc={t('home.aiGhostwriterDesc')}
            />
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="py-40 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-raven-900/20 pointer-events-none"></div>
        <div className="absolute bottom-[-50%] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-raven-600/20 blur-[150px] rounded-full pointer-events-none"></div>
        
        <div className="container mx-auto px-4 max-w-3xl text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">{t('home.readyScale')}</h2>
          <p className="text-xl text-textMuted mb-12">{t('home.joinThousands')}</p>
          <Link to="/login" className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-bold rounded-2xl hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)]">
            {t('home.getStarted')} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  );
}

function FeatureBox({ icon: Icon, title, desc }) {
  return (
    <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
      <Icon className="w-6 h-6 text-raven-400 mb-6" />
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-textMuted text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
