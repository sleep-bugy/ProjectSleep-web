import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Smartphone, Zap, Shield, DownloadCloud } from 'lucide-react';
import { OSType } from '../types';

export const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-project-darker">
        <div className="absolute inset-0 opacity-20">
             <div className="absolute top-0 -left-4 w-72 h-72 bg-project-primary rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
             <div className="absolute top-0 -right-4 w-72 h-72 bg-project-accent rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
             <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/download" 
              className="px-8 py-4 bg-project-primary hover:bg-blue-600 text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <DownloadCloud size={20} />
              {t('hero.cta')}
            </Link>
            <Link 
              to="/features" 
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur text-white font-bold rounded-full transition-all border border-white/20"
            >
              {t('nav.features')}
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links / Categories */}
      <section className="py-16 bg-white dark:bg-project-dark">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 -mt-24 relative z-20">
            {[
              { title: OSType.SleepOS, desc: t('home.cards.sleepos_desc'), icon: <Zap className="text-yellow-400" size={32} /> },
              { title: OSType.AOSP, desc: t('home.cards.aosp_desc'), icon: <Smartphone className="text-green-400" size={32} /> },
              { title: OSType.Port, desc: t('home.cards.port_desc'), icon: <Shield className="text-purple-400" size={32} /> },
            ].map((item) => (
              <Link 
                key={item.title}
                to={`/download?filter=${item.title}`} 
                className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow border border-slate-100 dark:border-slate-700 flex flex-col items-center text-center group"
              >
                <div className="mb-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-full group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2 text-slate-800 dark:text-white">{item.title}</h3>
                <p className="text-slate-500 dark:text-slate-300 mb-4">{item.desc}</p>
                <span className="text-project-primary font-medium flex items-center gap-1">{t('home.explore')} <ArrowRight size={16} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Snippet */}
      <section className="py-20 bg-slate-50 dark:bg-project-darker">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <img 
              src="https://picsum.photos/id/48/800/600" 
              alt="Development" 
              className="rounded-2xl shadow-2xl border-4 border-white dark:border-slate-700"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-6 text-slate-800 dark:text-white whitespace-pre-line">{t('home.community_title')}</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              {t('home.community_desc')}
            </p>
            <Link to="/about" className="text-project-primary font-bold text-lg hover:underline">{t('home.read_mission')} &rarr;</Link>
          </div>
        </div>
      </section>
    </div>
  );
};