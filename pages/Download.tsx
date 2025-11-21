import React, { useEffect, useState, useContext, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ApiService } from '../services/api';
import { RomWithDevice, OSType } from '../types';
import { Search, Filter, Download as DownloadIcon, Calendar, FileText, Hash, ChevronDown, ChevronUp, Edit, Plus, Trash } from 'lucide-react';
import { AuthContext } from '../App';

export const Download: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  
  const [roms, setRoms] = useState<RomWithDevice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<OSType[]>([]);
  const [selectedRom, setSelectedRom] = useState<RomWithDevice | null>(null);

  // Parse query params for initial filter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const filterParam = params.get('filter');
    if (filterParam && Object.values(OSType).includes(filterParam as OSType)) {
      setFilters([filterParam as OSType]);
    }
  }, [location]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      ApiService.getRoms(searchTerm, filters).then(data => {
        setRoms(data);
        setLoading(false);
      });
    }, 300); // Debounce simulation
    return () => clearTimeout(timer);
  }, [searchTerm, filters]);

  const toggleFilter = (type: OSType) => {
    setFilters(prev => 
      prev.includes(type) ? prev.filter(f => f !== type) : [...prev, type]
    );
  };

  const badgeColor = (type: OSType) => {
    switch(type) {
      case OSType.SleepOS: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case OSType.AOSP: return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case OSType.Port: return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-project-dark py-12">
      <div className="container mx-auto px-4">
        
        {/* Controls */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm mb-8 border border-slate-200 dark:border-slate-700">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder={t('download.searchPlaceholder')}
                className="w-full pl-10 pr-4 py-3 bg-slate-100 dark:bg-slate-700 border-none rounded-xl focus:ring-2 focus:ring-project-primary text-slate-800 dark:text-white placeholder-slate-400"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 flex-wrap justify-center">
               {Object.values(OSType).map((type) => (
                 <button
                   key={type}
                   onClick={() => toggleFilter(type)}
                   className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors border ${filters.includes(type) 
                     ? 'bg-project-primary text-white border-project-primary' 
                     : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-project-primary'}`}
                 >
                   {type}
                 </button>
               ))}
            </div>

            {user?.role === 'admin' && (
              <button className="px-4 py-2 bg-project-primary text-white rounded-lg flex items-center gap-2 shadow-lg hover:bg-blue-600">
                <Plus size={18} /> Upload Build
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-project-primary"></div></div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roms.map(rom => (
              <div key={rom.id} className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-slate-200 dark:border-slate-700 flex flex-col">
                <div className="flex p-4 gap-4 items-start">
                   <img src={rom.device.photo} alt={rom.device.name} className="w-20 h-24 object-cover rounded-lg bg-slate-200" />
                   <div>
                     <h3 className="font-bold text-lg text-slate-800 dark:text-white leading-tight">{rom.device.name}</h3>
                     <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{rom.device.model}</p>
                     <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${badgeColor(rom.osType)}`}>{rom.osType}</span>
                   </div>
                </div>
                
                <div className="px-4 py-2 flex-grow">
                   <div className="flex justify-between items-baseline mb-2">
                     <h4 className="text-xl font-semibold text-project-primary">{rom.title}</h4>
                     <span className="text-sm text-slate-500">{rom.version}</span>
                   </div>
                   <div className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 mb-4 bg-slate-50 dark:bg-slate-700/50 p-2 rounded">
                      {rom.changelog}
                   </div>
                </div>

                <div className="p-4 border-t border-slate-100 dark:border-slate-700 mt-auto flex gap-2">
                  <button 
                    onClick={() => setSelectedRom(rom)}
                    className="flex-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-white py-2 rounded-lg font-medium transition-colors"
                  >
                    Details
                  </button>
                  <a 
                    href={rom.downloadUrl}
                    className="flex-1 bg-project-primary hover:bg-blue-600 text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <DownloadIcon size={18} /> Get
                  </a>
                </div>
                {user?.role === 'admin' && (
                  <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900/50 flex justify-end gap-2">
                    <button className="p-1 text-slate-500 hover:text-project-primary"><Edit size={16}/></button>
                    <button className="p-1 text-slate-500 hover:text-red-500"><Trash size={16}/></button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Detail Modal */}
        {selectedRom && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedRom(null)}>
            <div className="bg-white dark:bg-project-dark rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
              <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <h2 className="text-2xl font-bold dark:text-white">{selectedRom.title} <span className="text-slate-500 text-lg font-normal">for {selectedRom.device.name}</span></h2>
                <button onClick={() => setSelectedRom(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><span className="text-2xl">&times;</span></button>
              </div>
              
              <div className="p-6 overflow-y-auto custom-scrollbar">
                 <div className="flex flex-wrap gap-4 mb-6 text-sm text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                      <Calendar size={16} /> {selectedRom.uploadDate}
                    </div>
                    <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                      <FileText size={16} /> {selectedRom.fileSize}
                    </div>
                    <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full font-mono">
                      <Hash size={16} /> {selectedRom.checksum.substring(0, 12)}...
                    </div>
                 </div>

                 <div className="mb-6">
                   <h3 className="font-bold text-lg mb-2 text-slate-800 dark:text-white">{t('download.notes')}</h3>
                   <p className="text-slate-600 dark:text-slate-300 bg-yellow-50 dark:bg-yellow-900/10 p-4 rounded-lg border border-yellow-100 dark:border-yellow-900/30">
                     {selectedRom.notes || "No special notes for this build."}
                   </p>
                 </div>

                 <div>
                   <h3 className="font-bold text-lg mb-2 text-slate-800 dark:text-white">{t('download.changelog')}</h3>
                   <div className="prose dark:prose-invert max-w-none bg-slate-50 dark:bg-slate-800 p-4 rounded-lg font-mono text-sm whitespace-pre-wrap">
                     {selectedRom.changelog}
                   </div>
                 </div>
              </div>

              <div className="p-6 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                 <a 
                    href={selectedRom.downloadUrl}
                    className="w-full py-4 bg-project-primary hover:bg-blue-600 text-white font-bold text-lg rounded-xl shadow-lg flex items-center justify-center gap-2 transition-colors"
                 >
                    <DownloadIcon size={24} /> Download Now
                 </a>
                 <p className="text-center text-xs text-slate-400 mt-2">By downloading, you agree to our terms of use.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};