import React, { useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { ApiService } from '../services/api';
import { Feature } from '../types';
import { AuthContext } from '../App';
import { Plus, X, Edit2, Trash2, Save } from 'lucide-react';

interface FeatureForm {
  title: string;
  description: string;
  imageUrl: string;
}

export const Features: React.FC = () => {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingFeature, setEditingFeature] = useState<Feature | null>(null);
  const { user } = useContext(AuthContext);

  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm<FeatureForm>();

  useEffect(() => {
    ApiService.getFeatures().then(setFeatures);
  }, []);

  const handleAddClick = () => {
    setEditingFeature(null);
    reset({ title: '', description: '', imageUrl: '' });
    setIsFormOpen(true);
  };

  const handleEditClick = (feature: Feature) => {
    setEditingFeature(feature);
    setValue('title', feature.title);
    setValue('description', feature.description);
    setValue('imageUrl', feature.imageUrl);
    setSelectedFeature(null); // Close detail modal
    setIsFormOpen(true);
  };

  const handleDeleteClick = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this feature?')) {
      await ApiService.deleteFeature(id);
      setFeatures(prev => prev.filter(f => f.id !== id));
      setSelectedFeature(null);
    }
  };

  const onFormSubmit = async (data: FeatureForm) => {
    if (editingFeature) {
      // Update existing
      const updatedFeature = { ...editingFeature, ...data };
      await ApiService.updateFeature(updatedFeature);
      setFeatures(prev => prev.map(f => f.id === updatedFeature.id ? updatedFeature : f));
    } else {
      // Create new
      const newFeature = await ApiService.createFeature(data);
      setFeatures(prev => [...prev, newFeature]);
    }
    setIsFormOpen(false);
  };

  return (
    <div className="py-16 bg-slate-50 dark:bg-project-dark min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">Features</h1>
            <p className="text-slate-500 dark:text-slate-300">Discover what makes SleepOS unique.</p>
          </div>
          {user?.role === 'admin' && (
            <button 
              onClick={handleAddClick}
              className="px-4 py-2 bg-project-primary text-white rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors"
            >
              <Plus size={18} /> Add Feature
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer group"
              onClick={() => setSelectedFeature(feature)}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={feature.imageUrl} 
                  alt={feature.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Detail Modal */}
        {selectedFeature && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedFeature(null)}>
            <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative" onClick={e => e.stopPropagation()}>
              <button 
                onClick={() => setSelectedFeature(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors z-10"
              >
                <X size={24} />
              </button>
              <img src={selectedFeature.imageUrl} alt={selectedFeature.title} className="w-full h-80 object-cover" />
              <div className="p-8">
                <h2 className="text-3xl font-bold mb-4 text-slate-800 dark:text-white">{selectedFeature.title}</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{selectedFeature.description}</p>
                
                {user?.role === 'admin' && (
                  <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 flex gap-4 justify-end">
                    <button 
                      onClick={() => handleEditClick(selectedFeature)}
                      className="px-4 py-2 bg-project-primary hover:bg-blue-600 text-white rounded-lg text-sm font-medium flex items-center gap-2"
                    >
                      <Edit2 size={16} /> Edit Feature
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(selectedFeature.id)}
                      className="px-4 py-2 bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 dark:text-red-400 rounded-lg text-sm font-medium flex items-center gap-2"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Edit/Add Form Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-xl shadow-2xl p-8 relative">
              <button 
                onClick={() => setIsFormOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                <X size={24} />
              </button>
              
              <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">
                {editingFeature ? 'Edit Feature' : 'Add New Feature'}
              </h2>

              <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title</label>
                  <input 
                    {...register('title', { required: true })} 
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 dark:text-white focus:ring-2 focus:ring-project-primary"
                    placeholder="Feature Title"
                  />
                  {errors.title && <span className="text-red-500 text-xs">Title is required</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Image URL</label>
                  <input 
                    {...register('imageUrl', { required: true })} 
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 dark:text-white focus:ring-2 focus:ring-project-primary"
                    placeholder="https://..."
                  />
                  {errors.imageUrl && <span className="text-red-500 text-xs">Image URL is required</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                  <textarea 
                    {...register('description', { required: true })} 
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 dark:text-white focus:ring-2 focus:ring-project-primary"
                    placeholder="Describe the feature..."
                  />
                  {errors.description && <span className="text-red-500 text-xs">Description is required</span>}
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
                   <button 
                     type="button"
                     onClick={() => setIsFormOpen(false)}
                     className="px-6 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 font-medium"
                   >
                     Cancel
                   </button>
                   <button 
                     type="submit"
                     disabled={isSubmitting}
                     className="px-6 py-2 bg-project-primary hover:bg-blue-600 text-white rounded-lg font-bold flex items-center gap-2 shadow-lg disabled:opacity-70"
                   >
                     <Save size={18} />
                     {isSubmitting ? 'Saving...' : 'Save Feature'}
                   </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};