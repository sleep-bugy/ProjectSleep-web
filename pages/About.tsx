import React from 'react';
import { MessageCircle, Github } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-project-dark py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-6">About Project Sleep</h1>
          <div className="w-20 h-1 bg-project-primary mx-auto rounded-full"></div>
        </div>
        
        <div className="space-y-12">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-project-primary">Our Mission</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Project Sleep aims to provide a seamless, stable, and highly performant Android experience. 
              We believe that your device should sleep when you sleep—no battery drain, no lags, just pure performance when you need it.
              We combine the best features of various ROMs into a cohesive ecosystem.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm">
              <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">Community</h2>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                We are driven by the community. Join our Discord or Telegram groups to chat with developers, 
                report bugs, or just hang out with fellow enthusiasts.
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
              <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">Open Source</h2>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                We believe in transparency. Our code is open source and available on GitHub. 
                Feel free to audit, contribute, or fork our repositories.
              </p>
              <a href="#" className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-black text-white rounded-lg hover:opacity-90 transition-opacity">
                <Github size={18} /> GitHub
              </a>
            </div>
          </div>

          <div className="text-center pt-8">
             <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">Code of Conduct</h3>
             <p className="text-slate-500 dark:text-slate-400">
               We are committed to providing a friendly, safe and welcoming environment for all, regardless of gender, sexual orientation, ability, ethnicity, socioeconomic status, and religion (or lack thereof).
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};