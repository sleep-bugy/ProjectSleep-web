import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sun, Moon, Menu, X, Globe, LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { AuthContext } from '../App';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'id', name: 'Indonesian', flag: '🇮🇩' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  { code: 'th', name: 'Thai', flag: '🇹🇭' },
  { code: 'vi', name: 'Vietnamese', flag: '🇻🇳' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { code: 'ka', name: 'Georgian', flag: '🇬🇪' },
  { code: 'bn', name: 'Bengali', flag: '🇧🇩' },
];

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t, i18n } = useTranslation();
  const { user, logout } = useContext(AuthContext);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return true;
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);
  
  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setShowLangMenu(false);
  };

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/features', label: t('nav.features') },
    { to: '/download', label: t('nav.download') },
    { to: '/team', label: t('nav.team') },
    { to: '/about', label: t('nav.about') },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 dark:text-gray-100 transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-project-darker/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-project-primary rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-project-primary to-project-accent">
                Project Sleep
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.to} 
                  to={link.to}
                  className={({ isActive }) => 
                    `text-sm font-medium transition-colors hover:text-project-primary ${isActive ? 'text-project-primary' : 'text-slate-600 dark:text-slate-300'}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Controls */}
            <div className="hidden md:flex items-center gap-4">
              {/* Language Selector */}
              <div className="relative">
                <button 
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                  aria-label="Select Language"
                >
                  <Globe size={20} />
                </button>
                {showLangMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-project-dark border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl overflow-hidden py-1">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-white/10 ${i18n.language === lang.code ? 'text-project-primary font-semibold' : ''}`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                aria-label="Toggle Theme"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Auth */}
              {user ? (
                <div className="flex items-center gap-3">
                   <Link to="/admin" className="text-sm font-medium text-project-accent hover:text-project-primary">Dashboard</Link>
                   <button onClick={logout} className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 transition-colors">
                     <LogOut size={20} />
                   </button>
                </div>
              ) : (
                <Link to="/login" className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                  <LogIn size={20} />
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-md hover:bg-slate-100 dark:hover:bg-white/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-project-dark border-t border-slate-200 dark:border-slate-700 h-[calc(100vh-73px)] overflow-y-auto">
            <div className="flex flex-col p-4 space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.to} 
                  to={link.to} 
                  className="text-lg font-medium py-2 border-b border-slate-100 dark:border-white/5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="py-4 border-b border-slate-100 dark:border-white/5">
                <button onClick={toggleTheme} className="flex items-center gap-2 text-sm font-medium w-full py-2">
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
                  {isDark ? 'Light Mode' : 'Dark Mode'}
                </button>
              </div>

              <div className="py-2">
                <p className="text-xs font-bold text-slate-500 uppercase mb-3">Select Language</p>
                <div className="grid grid-cols-5 gap-4">
                   {LANGUAGES.map(l => (
                     <button 
                      key={l.code} 
                      onClick={() => { changeLanguage(l.code); setIsMenuOpen(false); }} 
                      className={`flex flex-col items-center gap-1 p-2 rounded hover:bg-slate-100 dark:hover:bg-white/5 ${i18n.language === l.code ? 'bg-slate-100 dark:bg-white/10' : ''}`}
                     >
                       <span className="text-2xl">{l.flag}</span>
                       <span className="text-[10px]">{l.code.toUpperCase()}</span>
                     </button>
                   ))}
                </div>
              </div>

              {user ? (
                 <div className="flex flex-col gap-2 pt-4 mt-auto">
                    <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="w-full py-3 bg-project-primary text-white rounded-lg text-center font-bold">Admin Dashboard</Link>
                    <button onClick={() => { logout(); setIsMenuOpen(false); }} className="text-red-500 text-sm py-3 border border-red-200 dark:border-red-900 rounded-lg">Logout</button>
                 </div>
              ) : (
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-project-primary font-medium text-center py-2">Admin Login</Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-project-darker border-t border-slate-200 dark:border-slate-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-project-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
                <span className="text-xl font-bold">Project Sleep</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mb-6">
                Redefining Android experience with stability, performance, and elegance. 
                Join our community to experience the difference.
              </p>
              <div className="flex gap-4">
                 <a href="#" className="text-slate-400 hover:text-project-primary transition-colors">Discord</a>
                 <a href="#" className="text-slate-400 hover:text-project-primary transition-colors">Telegram</a>
                 <a href="#" className="text-slate-400 hover:text-project-primary transition-colors">GitHub</a>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold mb-4 text-slate-800 dark:text-white">Resources</h3>
              <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                <li><Link to="/download" className="hover:text-project-primary">Downloads</Link></li>
                <li><Link to="/features" className="hover:text-project-primary">Features</Link></li>
                <li><a href="#" className="hover:text-project-primary">Source Code</a></li>
                <li><a href="#" className="hover:text-project-primary">Changelogs</a></li>
              </ul>
            </div>

            <div>
               <h3 className="font-bold mb-4 text-slate-800 dark:text-white">Legal</h3>
               <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                 <li><a href="#" className="hover:text-project-primary">Privacy Policy</a></li>
                 <li><a href="#" className="hover:text-project-primary">Terms of Service</a></li>
                 <li><Link to="/team" className="hover:text-project-primary">Join the Team</Link></li>
               </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-500">
            &copy; {new Date().getFullYear()} Project Sleep. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};