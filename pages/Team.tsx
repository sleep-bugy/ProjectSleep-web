import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ApiService } from '../services/api';
import { TeamMember } from '../types';
import { useTranslation } from 'react-i18next';
import ReactCountryFlag from 'react-country-flag';
import { Send, CheckCircle } from 'lucide-react';

interface ApplicationForm {
  name: string;
  email: string;
  github: string;
  role: string;
  message: string;
}

export const Team: React.FC = () => {
  const { t } = useTranslation();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ApplicationForm>();

  useEffect(() => {
    ApiService.getTeam().then(setMembers);
  }, []);

  const onSubmit = async (data: ApplicationForm) => {
    await ApiService.submitApplication(data);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-project-dark pb-20">
      {/* Hero */}
      <div className="bg-project-darker py-20 text-center text-white mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('team.title')}</h1>
        <p className="text-slate-400 max-w-2xl mx-auto px-4">{t('team.subtitle')}</p>
      </div>

      <div className="container mx-auto px-4">
        {/* Members Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-20">
          {members.map(member => (
            <div key={member.id} className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow border-t-4 border-project-primary">
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 border-4 border-slate-100 dark:border-slate-700">
                <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-lg dark:text-white">{member.name}</h3>
              <p className="text-project-primary text-sm font-medium mb-2">{member.role}</p>
              <div className="flex justify-center items-center gap-2 text-sm text-slate-500">
                <ReactCountryFlag countryCode={member.countryCode} svg />
                <span>{member.countryCode}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Application Form */}
        <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-2 text-slate-800 dark:text-white">{t('team.apply')}</h2>
              <p className="text-slate-500 dark:text-slate-400">{t('team.want_contribute')}</p>
            </div>

            {submitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">{t('team.success_title')}</h3>
                <p className="text-slate-500">{t('team.success_msg')}</p>
                <button onClick={() => setSubmitted(false)} className="mt-8 text-project-primary hover:underline">{t('team.send_another')}</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('team.form.name')}</label>
                    <input 
                      {...register('name', { required: true })} 
                      className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:border-project-primary focus:ring-2 focus:ring-project-primary dark:text-white"
                    />
                    {errors.name && <span className="text-red-500 text-xs mt-1">Name is required</span>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('team.form.email')}</label>
                    <input 
                      type="email"
                      {...register('email', { required: true })} 
                      className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:border-project-primary focus:ring-2 focus:ring-project-primary dark:text-white"
                    />
                    {errors.email && <span className="text-red-500 text-xs mt-1">Email is required</span>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('team.form.github')}</label>
                    <input 
                      {...register('github', { required: true })} 
                      className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:border-project-primary focus:ring-2 focus:ring-project-primary dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('team.form.role')}</label>
                    <select 
                      {...register('role')} 
                      className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:border-project-primary focus:ring-2 focus:ring-project-primary dark:text-white"
                    >
                      <option value="developer">{t('team.form.roles.developer')}</option>
                      <option value="designer">{t('team.form.roles.designer')}</option>
                      <option value="maintainer">{t('team.form.roles.maintainer')}</option>
                      <option value="community_manager">{t('team.form.roles.community_manager')}</option>
                    </select>
                  </div>
                </div>

                <div>
                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('team.form.message')}</label>
                   <textarea 
                     {...register('message', { required: true })}
                     rows={4}
                     className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:border-project-primary focus:ring-2 focus:ring-project-primary dark:text-white"
                   ></textarea>
                </div>

                <div className="flex justify-end">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="px-8 py-4 bg-project-primary hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? t('team.form.sending') : <>{t('team.form.submit')} <Send size={18} /></>}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};