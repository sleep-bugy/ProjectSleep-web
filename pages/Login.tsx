import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../App';
import { ApiService } from '../services/api';
import { Lock, Mail } from 'lucide-react';

export const Login: React.FC = () => {
  const { t } = useTranslation();
  const { login } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [error, setError] = useState('');

  const onSubmit = async (data: any) => {
    try {
      // Mock validation
      if (data.email === 'admin@projectsleep.com' && data.password === 'admin') {
        const user = await ApiService.login(data.email);
        login(user);
      } else {
        setError('Invalid credentials. Use admin@projectsleep.com / admin');
      }
    } catch (e) {
      setError(t('common.error'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-project-dark px-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{t('login.title')}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">{t('login.subtitle')}</p>
        </div>

        {error && <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-6 text-sm text-center">{error}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                {...register('email', { required: true })}
                placeholder={t('login.email')}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-700 border-transparent focus:bg-white dark:focus:bg-slate-600 focus:ring-2 focus:ring-project-primary dark:text-white transition-all"
              />
            </div>
            {errors.email && <span className="text-red-500 text-xs mt-1 ml-1">{t('login.required')}</span>}
          </div>

          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="password"
                {...register('password', { required: true })}
                placeholder={t('login.password')}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-700 border-transparent focus:bg-white dark:focus:bg-slate-600 focus:ring-2 focus:ring-project-primary dark:text-white transition-all"
              />
            </div>
            {errors.password && <span className="text-red-500 text-xs mt-1 ml-1">{t('login.required')}</span>}
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-project-primary hover:bg-blue-600 text-white font-bold py-3 rounded-lg shadow-lg transition-colors disabled:opacity-50"
          >
            {isSubmitting ? t('login.verifying') : t('login.submit')}
          </button>
        </form>
      </div>
    </div>
  );
};