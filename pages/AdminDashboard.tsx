import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Upload, FileText, Layers, Smartphone, Clock, Check, X, Github, Mail, Link as LinkIcon, Plus, Server, Edit2, Image as ImageIcon } from 'lucide-react';
import { ApiService } from '../services/api';
import { OSType, TeamApplication, Device } from '../types';
import { MarkdownEditor } from '../components/MarkdownEditor';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upload' | 'applications' | 'devices'>('upload');
  const { register, handleSubmit, reset, control, formState: { isSubmitting }, setValue } = useForm();
  const [uploadStatus, setUploadStatus] = useState('');
  
  // Upload State
  const [devices, setDevices] = useState<Device[]>([]);
  const [isNewDevice, setIsNewDevice] = useState(false);

  // Devices Management State
  const [editingDevice, setEditingDevice] = useState<Device | null>(null);
  const [deviceUpdateStatus, setDeviceUpdateStatus] = useState('');

  // Applications State
  const [applications, setApplications] = useState<TeamApplication[]>([]);
  const [loadingApps, setLoadingApps] = useState(false);
  const [processingApp, setProcessingApp] = useState<number | null>(null);

  useEffect(() => {
    // Load devices initially
    loadDevices();
  }, []);

  useEffect(() => {
    if (activeTab === 'applications') {
      fetchApplications();
    }
  }, [activeTab]);

  const loadDevices = () => {
    ApiService.getDevices().then(setDevices);
  };

  const fetchApplications = async () => {
    setLoadingApps(true);
    try {
      const data = await ApiService.getApplications();
      // Sort pending first
      const sorted = data.sort((a, b) => {
        if (a.status === 'pending' && b.status !== 'pending') return -1;
        if (a.status !== 'pending' && b.status === 'pending') return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      setApplications(sorted);
    } finally {
      setLoadingApps(false);
    }
  };

  const onUploadSubmit = async (data: any) => {
    setUploadStatus('Publishing release...');
    
    try {
      let deviceId = data.deviceId;

      // If new device, create it first
      if (isNewDevice) {
        setUploadStatus('Creating new device entry...');
        const newDevice = await ApiService.createDevice({
          name: data.newDeviceName,
          model: data.newDeviceModel,
          manufacturer: data.newDeviceManufacturer,
          photo: data.newDevicePhoto || 'https://via.placeholder.com/300x400?text=No+Image'
        });
        deviceId = newDevice.id;
        setDevices(prev => [...prev, newDevice]);
      }

      // Upload ROM with correct device ID
      await ApiService.adminUpload({
        ...data,
        deviceId: Number(deviceId)
      });

      setUploadStatus('Success! ROM published.');
      setTimeout(() => setUploadStatus(''), 3000);
      reset();
      setIsNewDevice(false);
    } catch (error) {
      setUploadStatus('Error publishing release.');
    }
  };

  const handleAppStatus = async (id: number, status: 'approved' | 'rejected') => {
    setProcessingApp(id);
    await ApiService.updateApplicationStatus(id, status);
    setApplications(prev => prev.map(app => 
      app.id === id ? { ...app, status } : app
    ));
    setProcessingApp(null);
  };

  const handleUpdateDevice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDevice) return;

    try {
      await ApiService.updateDevice(editingDevice);
      setDeviceUpdateStatus('Device updated successfully!');
      setDevices(prev => prev.map(d => d.id === editingDevice.id ? editingDevice : d));
      
      setTimeout(() => {
        setDeviceUpdateStatus('');
        setEditingDevice(null);
      }, 1500);
    } catch (error) {
      setDeviceUpdateStatus('Failed to update device.');
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-project-dark p-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm h-fit">
            <h2 className="text-lg font-bold mb-6 px-4 dark:text-white">Admin Panel</h2>
            <nav className="space-y-2">
              <button 
                onClick={() => setActiveTab('upload')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'upload' ? 'bg-project-primary text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
              >
                <Upload size={18} /> Upload ROM
              </button>
              <button 
                onClick={() => setActiveTab('devices')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'devices' ? 'bg-project-primary text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
              >
                <Smartphone size={18} /> Manage Devices
              </button>
              <button 
                onClick={() => setActiveTab('applications')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'applications' ? 'bg-project-primary text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
              >
                <FileText size={18} /> Team Applications
                {applications.filter(a => a.status === 'pending').length > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {applications.filter(a => a.status === 'pending').length}
                  </span>
                )}
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1">
            {activeTab === 'upload' && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm">
                <h3 className="text-2xl font-bold mb-6 dark:text-white">Upload New Build</h3>
                
                {uploadStatus && (
                  <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-900">
                    {uploadStatus}
                  </div>
                )}

                <form onSubmit={handleSubmit(onUploadSubmit)} className="space-y-6 max-w-3xl">
                  
                  {/* Device Selection Section */}
                  <div className="bg-slate-50 dark:bg-slate-700/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex justify-between items-center mb-4">
                      <label className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <Smartphone size={20} /> Device Details
                      </label>
                      <button 
                        type="button"
                        onClick={() => setIsNewDevice(!isNewDevice)}
                        className="text-sm text-project-primary font-medium hover:underline flex items-center gap-1"
                      >
                        {isNewDevice ? 'Select Existing Device' : 'Add New Device'}
                      </button>
                    </div>

                    {!isNewDevice ? (
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Select Device</label>
                        <div className="relative">
                          <select 
                            {...register('deviceId')} 
                            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 dark:text-white"
                          >
                            <option value="">-- Select a device --</option>
                            {devices.map(d => (
                              <option key={d.id} value={d.id}>{d.manufacturer} {d.name} ({d.model})</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Manufacturer</label>
                            <input {...register('newDeviceManufacturer')} placeholder="e.g. Xiaomi" className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 dark:text-white" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Device Name</label>
                            <input {...register('newDeviceName')} placeholder="e.g. Mi 9" className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 dark:text-white" />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                           <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Codename (Model)</label>
                            <input {...register('newDeviceModel')} placeholder="e.g. cepheus" className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 dark:text-white" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Photo URL</label>
                            <input {...register('newDevicePhoto')} placeholder="https://..." className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 dark:text-white" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ROM Details */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title</label>
                      <input {...register('title')} placeholder="e.g. SleepOS Stable" className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 dark:text-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">OS Type</label>
                      <div className="relative">
                         <Layers className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18}/>
                         <select {...register('osType')} className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 dark:text-white">
                           {Object.values(OSType).map(t => <option key={t} value={t}>{t}</option>)}
                         </select>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Version</label>
                      <input {...register('version')} placeholder="v1.0" className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 dark:text-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">File Size</label>
                      <input {...register('fileSize')} placeholder="e.g. 1.5 GB" className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 dark:text-white" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Download Link</label>
                    <div className="relative">
                       <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                       <input 
                         {...register('downloadUrl', { required: true })} 
                         placeholder="https://sourceforge.net/projects/..." 
                         className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 dark:text-white" 
                       />
                    </div>
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Changelog (Markdown)</label>
                     <Controller
                       name="changelog"
                       control={control}
                       defaultValue=""
                       render={({ field }) => (
                         <MarkdownEditor value={field.value} onChange={field.onChange} />
                       )}
                     />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-project-primary hover:bg-blue-600 text-white font-bold py-3 rounded-lg shadow-lg transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
                  >
                    {isSubmitting ? 'Processing...' : <><Server size={18} /> Publish Release</>}
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'devices' && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm">
                 <h3 className="text-2xl font-bold mb-6 dark:text-white">Manage Devices</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {devices.map(device => (
                     <div key={device.id} className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden group">
                        <div className="relative h-48 bg-slate-100 dark:bg-slate-700">
                           <img src={device.photo} alt={device.name} className="w-full h-full object-cover" />
                           <button 
                             onClick={() => setEditingDevice(device)}
                             className="absolute top-2 right-2 p-2 bg-white/90 dark:bg-black/70 rounded-full text-project-primary hover:scale-110 transition-transform"
                           >
                             <Edit2 size={16} />
                           </button>
                        </div>
                        <div className="p-4">
                           <h4 className="font-bold text-lg dark:text-white">{device.name}</h4>
                           <div className="flex justify-between items-center mt-1">
                              <span className="text-sm text-slate-500 dark:text-slate-400 font-mono">{device.model}</span>
                              <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-300">{device.manufacturer}</span>
                           </div>
                        </div>
                     </div>
                   ))}
                 </div>

                 {/* Edit Modal */}
                 {editingDevice && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setEditingDevice(null)}>
                       <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-md shadow-2xl p-6" onClick={e => e.stopPropagation()}>
                          <div className="flex justify-between items-center mb-6">
                             <h3 className="text-xl font-bold dark:text-white">Edit Device</h3>
                             <button onClick={() => setEditingDevice(null)}><X size={20} className="text-slate-400" /></button>
                          </div>

                          {deviceUpdateStatus && (
                            <div className="mb-4 p-3 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-lg text-sm">
                              {deviceUpdateStatus}
                            </div>
                          )}

                          <form onSubmit={handleUpdateDevice} className="space-y-4">
                             <div>
                               <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Device Name</label>
                               <input 
                                 value={editingDevice.name}
                                 onChange={e => setEditingDevice({...editingDevice, name: e.target.value})}
                                 className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 dark:text-white" 
                               />
                             </div>
                             <div>
                               <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Codename (Model)</label>
                               <input 
                                 value={editingDevice.model}
                                 onChange={e => setEditingDevice({...editingDevice, model: e.target.value})}
                                 className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 dark:text-white" 
                               />
                             </div>
                             <div>
                               <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Manufacturer</label>
                               <input 
                                 value={editingDevice.manufacturer}
                                 onChange={e => setEditingDevice({...editingDevice, manufacturer: e.target.value})}
                                 className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 dark:text-white" 
                               />
                             </div>
                             <div>
                               <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Photo URL</label>
                               <div className="relative">
                                  <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                  <input 
                                    value={editingDevice.photo}
                                    onChange={e => setEditingDevice({...editingDevice, photo: e.target.value})}
                                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 dark:text-white" 
                                  />
                               </div>
                             </div>

                             <div className="pt-4 flex justify-end gap-3">
                                <button 
                                  type="button" 
                                  onClick={() => setEditingDevice(null)}
                                  className="px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
                                >
                                  Cancel
                                </button>
                                <button 
                                  type="submit" 
                                  className="px-6 py-2 bg-project-primary text-white rounded-lg hover:bg-blue-600 font-medium shadow-lg"
                                >
                                  Save Changes
                                </button>
                             </div>
                          </form>
                       </div>
                    </div>
                 )}
              </div>
            )}

            {activeTab === 'applications' && (
               <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm">
                 <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold dark:text-white">Team Applications</h3>
                    <button onClick={fetchApplications} className="text-sm text-project-primary hover:underline">Refresh</button>
                 </div>
                 
                 {loadingApps ? (
                   <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-project-primary"></div></div>
                 ) : applications.length === 0 ? (
                   <div className="text-center py-12 text-slate-500 dark:text-slate-400">No applications found.</div>
                 ) : (
                   <div className="space-y-4">
                      {applications.map(app => (
                        <div key={app.id} className={`border border-slate-200 dark:border-slate-700 rounded-xl p-6 transition-colors ${app.status === 'pending' ? 'bg-white dark:bg-slate-800' : 'bg-slate-50 dark:bg-slate-900/30 opacity-75'}`}>
                          <div className="flex justify-between items-start mb-4">
                             <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-lg font-bold text-slate-500 dark:text-slate-400 uppercase">
                                  {app.name.substring(0, 2)}
                                </div>
                                <div>
                                   <h4 className="font-bold text-lg dark:text-white">{app.name}</h4>
                                   <div className="flex flex-wrap gap-3 text-sm text-slate-500 mt-1">
                                      <span className="flex items-center gap-1 hover:text-project-primary"><Mail size={14}/> {app.email}</span>
                                      <span className="flex items-center gap-1 hover:text-project-primary"><Github size={14}/> {app.github}</span>
                                   </div>
                                </div>
                             </div>
                             <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(app.status)}`}>
                               {app.status}
                             </span>
                          </div>
                          
                          <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg mb-4">
                            <p className="text-xs uppercase text-slate-400 font-bold mb-1">Applying for: <span className="text-project-primary">{app.role}</span></p>
                            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">"{app.message}"</p>
                          </div>

                          <div className="flex justify-between items-center">
                             <div className="text-xs text-slate-400 flex items-center gap-1">
                                <Clock size={12}/> {new Date(app.createdAt).toLocaleDateString()} at {new Date(app.createdAt).toLocaleTimeString()}
                             </div>
                             
                             {app.status === 'pending' && (
                               <div className="flex gap-3">
                                  <button 
                                    onClick={() => handleAppStatus(app.id, 'approved')}
                                    disabled={processingApp === app.id}
                                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                                  >
                                    <Check size={16} /> Approve
                                  </button>
                                  <button 
                                    onClick={() => handleAppStatus(app.id, 'rejected')}
                                    disabled={processingApp === app.id}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                                  >
                                    <X size={16} /> Reject
                                  </button>
                               </div>
                             )}
                          </div>
                        </div>
                      ))}
                   </div>
                 )}
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};