import React from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle, Github } from 'lucide-react';

export const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-project-dark py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-6">{t('about.title')}</h1>
          <div className="w-20 h-1 bg-project-primary mx-auto rounded-full"></div>
        </div>
        
        <div className="space-y-12">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-project-primary">{t('about.mission_title')}</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {t('about.mission_desc')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm">
              <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">{t('about.community_title')}</h2>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                {t('about.community_desc')}
              </p>
              <div className="flex gap-4">
                <a href="#" className="flex items-center gap-2 px-4 py-2 bg-[#5865F2] text-white rounded-lg hover:opacity-90 transition-opacity">
                  <MessageCircle size={18} /> Discord
                </a>
                <a href="#" className="flex items-center gap-2 px-4 py-2 bg-[#229ED9] text-white rounded-lg hover:opacity-90 transition-opacity">
                  <MessageCircle size={18} /> Telegram
                </a>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm">
              <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">{t('about.opensource_title')}</h2>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                {t('about.opensource_desc')}
              </p>
              <a href="https://github.com/sleep-bugy" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-black text-white rounded-lg hover:opacity-90 transition-opacity">
                <Github size={18} /> GitHub
              </a>
            </div>
          </div>

          <div className="text-center pt-8">
             <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">{t('about.coc_title')}</h3>
             <p className="text-slate-500 dark:text-slate-400">
               {t('about.coc_desc')}
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};