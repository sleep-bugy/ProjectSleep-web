import { Device, Feature, OSType, Rom, RomWithDevice, TeamMember, User, TeamApplication } from '../types';

// CONFIGURATION
// Set to 'false' to connect to your real Laravel Backend
// Set to 'true' to use the built-in mock data (for demo/testing without backend)
const USE_MOCK_API = true; 
const API_BASE_URL = "http://localhost:8000/api";

// ==========================================
// MOCK DATA STORE
// ==========================================
const mockDevices: Device[] = [
  { id: 1, name: "Xiaomi Mi 9", model: "cepheus", manufacturer: "Xiaomi", photo: "https://picsum.photos/id/1/300/400" },
  { id: 2, name: "Redmi Note 10", model: "mojito", manufacturer: "Xiaomi", photo: "https://picsum.photos/id/2/300/400" },
  { id: 3, name: "POCO F3", model: "alioth", manufacturer: "POCO", photo: "https://picsum.photos/id/3/300/400" },
];

const mockRoms: Rom[] = [
  {
    id: 101,
    deviceId: 1,
    title: "SleepOS Stable",
    version: "v2.3.1",
    osType: OSType.SleepOS,
    fileSize: "1.4 GB",
    uploadDate: "2025-11-20",
    downloadCount: 1205,
    downloadUrl: "#",
    checksum: "md5: 8923849238492384",
    changelog: `# v2.3.1\n- Fixed battery drain\n- Updated security patch\n- Improved system stability`,
    notes: "Clean flash recommended."
  },
  {
    id: 102,
    deviceId: 2,
    title: "PixelExperience Plus",
    version: "13.0",
    osType: OSType.AOSP,
    fileSize: "1.8 GB",
    uploadDate: "2025-11-18",
    downloadCount: 850,
    downloadUrl: "#",
    checksum: "md5: 123123123123",
    changelog: "# Update November\n- Synced with latest sources",
  },
  {
    id: 103,
    deviceId: 3,
    title: "OxygenOS Port",
    version: "14.0",
    osType: OSType.Port,
    fileSize: "2.1 GB",
    uploadDate: "2025-11-15",
    downloadCount: 2300,
    downloadUrl: "#",
    checksum: "md5: ababababab",
    changelog: "# OOS 14 Port\n- Camera fully working\n- Debloated",
    notes: "Bugs: NFC not working."
  }
];

const mockTeamMembers: TeamMember[] = [
  { id: 1, name: "Alex Sleep", role: "Lead Developer", countryCode: "ID", avatar: "https://picsum.photos/id/1005/100/100" },
  { id: 2, name: "John Doe", role: "Maintainer", countryCode: "IN", avatar: "https://picsum.photos/id/1012/100/100" },
  { id: 3, name: "Sarah Smith", role: "Designer", countryCode: "RU", avatar: "https://picsum.photos/id/1027/100/100" },
];

const mockFeatures: Feature[] = [
  { id: 1, title: "Optimized Performance", description: "SleepOS is tuned for maximum speed and battery efficiency.", imageUrl: "https://picsum.photos/id/10/600/400" },
  { id: 2, title: "Customization", description: "Deep customization engine to make your device truly yours.", imageUrl: "https://picsum.photos/id/20/600/400" },
  { id: 3, title: "Security", description: "Monthly security updates merged within 24 hours of release.", imageUrl: "https://picsum.photos/id/30/600/400" },
];

let mockApplications: TeamApplication[] = [
  { 
    id: 1, 
    name: "Michael Code", 
    email: "mike@example.com", 
    role: "developer", 
    github: "github.com/mikecode", 
    message: "I have worked on several AOSP projects and would love to help maintain the kernel for POCO F3.",
    status: "pending", 
    createdAt: "2025-11-25T10:00:00Z" 
  },
  { 
    id: 2, 
    name: "Anna Design", 
    email: "anna@example.com", 
    role: "designer", 
    github: "behance.net/anna", 
    message: "I can help improve the system UI assets and website graphics.",
    status: "pending", 
    createdAt: "2025-11-24T14:30:00Z" 
  },
];

// ==========================================
// HELPER FOR REAL API
// ==========================================
const getAuthHeader = () => {
  const userStr = localStorage.getItem('projectSleepUser');
  if (userStr) {
    const user = JSON.parse(userStr);
    return { 'Authorization': `Bearer ${user.token}` };
  }
  return {};
};

const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...getAuthHeader(),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API Error: ${response.status}`);
  }

  return response.json();
};

// ==========================================
// SERVICE EXPORT
// ==========================================
export const ApiService = {
  // --- FEATURES ---
  getFeatures: async (): Promise<Feature[]> => {
    if (USE_MOCK_API) {
      return new Promise(resolve => setTimeout(() => resolve([...mockFeatures]), 500));
    }
    const res = await fetchApi('/features');
    return res.data;
  },

  createFeature: async (featureData: Omit<Feature, 'id'>): Promise<Feature> => {
    if (USE_MOCK_API) {
      return new Promise(resolve => {
        setTimeout(() => {
          const newFeature = { ...featureData, id: Math.max(...mockFeatures.map(f => f.id), 0) + 1 };
          mockFeatures.push(newFeature);
          resolve(newFeature);
        }, 500);
      });
    }
    const res = await fetchApi('/features', { method: 'POST', body: JSON.stringify(featureData) });
    return res.data;
  },

  updateFeature: async (feature: Feature): Promise<boolean> => {
    if (USE_MOCK_API) {
      return new Promise(resolve => {
        setTimeout(() => {
          const index = mockFeatures.findIndex(f => f.id === feature.id);
          if (index !== -1) {
            mockFeatures[index] = feature;
            resolve(true);
          } else resolve(false);
        }, 500);
      });
    }
    await fetchApi(`/features/${feature.id}`, { method: 'PUT', body: JSON.stringify(feature) });
    return true;
  },

  deleteFeature: async (id: number): Promise<boolean> => {
    if (USE_MOCK_API) {
      return new Promise(resolve => {
        setTimeout(() => {
          const index = mockFeatures.findIndex(f => f.id === id);
          if (index !== -1) {
            mockFeatures.splice(index, 1);
            resolve(true);
          } else resolve(false);
        }, 500);
      });
    }
    await fetchApi(`/features/${id}`, { method: 'DELETE' });
    return true;
  },

  // --- DEVICES ---
  getDevices: async (): Promise<Device[]> => {
    if (USE_MOCK_API) {
      return new Promise(resolve => setTimeout(() => resolve([...mockDevices]), 500));
    }
    const res = await fetchApi('/devices');
    return res.data;
  },

  createDevice: async (deviceData: Omit<Device, 'id'>): Promise<Device> => {
    if (USE_MOCK_API) {
      return new Promise(resolve => {
        setTimeout(() => {
          const newDevice = { ...deviceData, id: Math.max(...mockDevices.map(d => d.id), 0) + 1 };
          mockDevices.push(newDevice);
          resolve(newDevice);
        }, 500);
      });
    }
    const res = await fetchApi('/devices', { method: 'POST', body: JSON.stringify(deviceData) });
    return res.data;
  },

  updateDevice: async (device: Device): Promise<Device> => {
    if (USE_MOCK_API) {
      return new Promise(resolve => {
        setTimeout(() => {
          const index = mockDevices.findIndex(d => d.id === device.id);
          if (index !== -1) {
            mockDevices[index] = device;
            resolve(device);
          } else resolve(device);
        }, 500);
      });
    }
    const res = await fetchApi(`/devices/${device.id}`, { method: 'PUT', body: JSON.stringify(device) });
    return res.data;
  },

  // --- ROMS ---
  getRoms: async (query: string = "", typeFilters: OSType[] = []): Promise<RomWithDevice[]> => {
    if (USE_MOCK_API) {
      return new Promise(resolve => {
        setTimeout(() => {
          let filtered = mockRoms.map(rom => ({
            ...rom,
            device: mockDevices.find(d => d.id === rom.deviceId)!
          })).filter(r => r.device); 

          if (query) {
            const q = query.toLowerCase();
            filtered = filtered.filter(r => 
              r.title.toLowerCase().includes(q) || 
              r.device.name.toLowerCase().includes(q) || 
              r.device.model.toLowerCase().includes(q)
            );
          }

          if (typeFilters.length > 0) {
            filtered = filtered.filter(r => typeFilters.includes(r.osType));
          }

          filtered.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
          resolve(filtered);
        }, 600);
      });
    }
    
    // Real API Query Params
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (typeFilters.length > 0) params.append('types', typeFilters.join(','));
    
    const res = await fetchApi(`/roms?${params.toString()}`);
    return res.data; // Expecting backend to return RomWithDevice structure
  },

  adminUpload: async (data: any): Promise<boolean> => {
    if (USE_MOCK_API) {
      console.log("Admin uploading...", data);
      return new Promise(resolve => {
        setTimeout(() => {
          const newRom: Rom = {
            id: Math.max(...mockRoms.map(r => r.id), 100) + 1,
            deviceId: Number(data.deviceId),
            title: data.title,
            version: data.version,
            osType: data.osType,
            fileSize: data.fileSize,
            uploadDate: new Date().toISOString().split('T')[0],
            downloadCount: 0,
            changelog: data.changelog,
            notes: data.notes || '',
            downloadUrl: data.downloadUrl,
            checksum: data.checksum || 'N/A'
          };
          mockRoms.push(newRom);
          resolve(true);
        }, 1500);
      });
    }
    await fetchApi('/roms', { method: 'POST', body: JSON.stringify(data) });
    return true;
  },

  updateRom: async (rom: RomWithDevice): Promise<boolean> => {
    if (USE_MOCK_API) {
      return new Promise(resolve => {
        setTimeout(() => {
          const index = mockRoms.findIndex(r => r.id === rom.id);
          if (index !== -1) {
            const updated = { ...mockRoms[index], ...rom, deviceId: rom.device.id };
            mockRoms[index] = updated;
            resolve(true);
          } else resolve(false);
        }, 500);
      });
    }
    // Extract only ID fields needed for update
    const payload = { ...rom, deviceId: rom.device.id };
    await fetchApi(`/roms/${rom.id}`, { method: 'PUT', body: JSON.stringify(payload) });
    return true;
  },

  deleteRom: async (id: number): Promise<boolean> => {
    if (USE_MOCK_API) {
      return new Promise(resolve => {
        setTimeout(() => {
          const index = mockRoms.findIndex(r => r.id === id);
          if (index !== -1) {
            mockRoms.splice(index, 1);
            resolve(true);
          } else resolve(false);
        }, 500);
      });
    }
    await fetchApi(`/roms/${id}`, { method: 'DELETE' });
    return true;
  },

  // --- TEAM & APPLICATIONS ---
  getTeam: async (): Promise<TeamMember[]> => {
    if (USE_MOCK_API) {
      return new Promise(resolve => setTimeout(() => resolve(mockTeamMembers), 500));
    }
    const res = await fetchApi('/team');
    return res.data;
  },

  submitApplication: async (data: any): Promise<boolean> => {
    console.log("Submitting application...", data);
    if (USE_MOCK_API) {
      return new Promise(resolve => setTimeout(() => resolve(true), 1000));
    }
    await fetchApi('/applications', { method: 'POST', body: JSON.stringify(data) });
    return true;
  },

  getApplications: async (): Promise<TeamApplication[]> => {
    if (USE_MOCK_API) {
      return new Promise(resolve => setTimeout(() => resolve([...mockApplications]), 500));
    }
    const res = await fetchApi('/admin/applications');
    return res.data;
  },

  updateApplicationStatus: async (id: number, status: 'approved' | 'rejected'): Promise<boolean> => {
    if (USE_MOCK_API) {
      return new Promise(resolve => {
        setTimeout(() => {
          const index = mockApplications.findIndex(a => a.id === id);
          if (index !== -1) {
            mockApplications[index].status = status;
            console.log(`Email sent to ${mockApplications[index].email}: Application ${status}`);
          }
          resolve(true);
        }, 600);
      });
    }
    await fetchApi(`/admin/applications/${id}/status`, { 
      method: 'PUT', 
      body: JSON.stringify({ status }) 
    });
    return true;
  },

  // --- AUTH ---
  login: async (email: string): Promise<User> => {
    if (USE_MOCK_API) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: 99,
            email,
            role: 'admin',
            token: 'mock-jwt-token-xyz'
          });
        }, 800);
      });
    }
    // Real Login
    // In a real app, you'd send password too.
    // For this interface, we assume the frontend form passes password in a real scenario,
    // but our current interface only takes email for mock. 
    // Note: The Login.tsx calls this with just email based on mock. 
    // You would need to update Login.tsx to pass {email, password} to ApiService.login
    // For now, we'll assume this is handled or updated.
    const res = await fetchApi('/login', { 
      method: 'POST', 
      body: JSON.stringify({ email, password: 'admin' }) // Hardcoded for interface compatibility, adjust in Login.tsx
    });
    return {
      id: res.user.id,
      email: res.user.email,
      role: res.user.role,
      token: res.token
    };
  }
};