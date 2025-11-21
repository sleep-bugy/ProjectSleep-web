import { Device, Feature, OSType, Rom, RomWithDevice, TeamMember, User, TeamApplication } from '../types';

// Mock Data
const devices: Device[] = [
  { id: 1, name: "Xiaomi Mi 9", model: "cepheus", manufacturer: "Xiaomi", photo: "https://picsum.photos/id/1/300/400" },
  { id: 2, name: "Redmi Note 10", model: "mojito", manufacturer: "Xiaomi", photo: "https://picsum.photos/id/2/300/400" },
  { id: 3, name: "POCO F3", model: "alioth", manufacturer: "POCO", photo: "https://picsum.photos/id/3/300/400" },
];

const roms: Rom[] = [
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
    changelog: `
# v2.3.1
- Fixed battery drain
- Updated security patch
- Improved system stability
    `,
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

const teamMembers: TeamMember[] = [
  { id: 1, name: "Alex Sleep", role: "Lead Developer", countryCode: "ID", avatar: "https://picsum.photos/id/1005/100/100" },
  { id: 2, name: "John Doe", role: "Maintainer", countryCode: "IN", avatar: "https://picsum.photos/id/1012/100/100" },
  { id: 3, name: "Sarah Smith", role: "Designer", countryCode: "RU", avatar: "https://picsum.photos/id/1027/100/100" },
];

const features: Feature[] = [
  { id: 1, title: "Optimized Performance", description: "SleepOS is tuned for maximum speed and battery efficiency.", imageUrl: "https://picsum.photos/id/10/600/400" },
  { id: 2, title: "Customization", description: "Deep customization engine to make your device truly yours.", imageUrl: "https://picsum.photos/id/20/600/400" },
  { id: 3, title: "Security", description: "Monthly security updates merged within 24 hours of release.", imageUrl: "https://picsum.photos/id/30/600/400" },
];

let applications: TeamApplication[] = [
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
  { 
    id: 3, 
    name: "David Community", 
    email: "david@example.com", 
    role: "community_manager", 
    github: "twitter.com/david", 
    message: "I moderate several large Telegram groups.",
    status: "rejected", 
    createdAt: "2025-11-20T09:15:00Z" 
  }
];

// Service Functions
export const ApiService = {
  getFeatures: async (): Promise<Feature[]> => {
    return new Promise(resolve => setTimeout(() => resolve([...features]), 500));
  },
  createFeature: async (featureData: Omit<Feature, 'id'>): Promise<Feature> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const newFeature = { ...featureData, id: Math.max(...features.map(f => f.id), 0) + 1 };
        features.push(newFeature);
        resolve(newFeature);
      }, 500);
    });
  },
  updateFeature: async (feature: Feature): Promise<boolean> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const index = features.findIndex(f => f.id === feature.id);
        if (index !== -1) {
          features[index] = feature;
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  },
  deleteFeature: async (id: number): Promise<boolean> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const index = features.findIndex(f => f.id === id);
        if (index !== -1) {
          features.splice(index, 1);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  },
  getDevices: async (): Promise<Device[]> => {
    return new Promise(resolve => setTimeout(() => resolve([...devices]), 500));
  },
  createDevice: async (deviceData: Omit<Device, 'id'>): Promise<Device> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const newDevice = { ...deviceData, id: Math.max(...devices.map(d => d.id), 0) + 1 };
        devices.push(newDevice);
        resolve(newDevice);
      }, 500);
    });
  },
  updateDevice: async (device: Device): Promise<Device> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const index = devices.findIndex(d => d.id === device.id);
        if (index !== -1) {
          devices[index] = device;
          resolve(device);
        } else {
          resolve(device); // fallback
        }
      }, 500);
    });
  },
  getRoms: async (query: string = "", typeFilters: OSType[] = []): Promise<RomWithDevice[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        let filtered = roms.map(rom => ({
          ...rom,
          device: devices.find(d => d.id === rom.deviceId)!
        })).filter(r => r.device); // Filter out any broken refs

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

        resolve(filtered);
      }, 600);
    });
  },
  updateRom: async (rom: RomWithDevice): Promise<boolean> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const index = roms.findIndex(r => r.id === rom.id);
        if (index !== -1) {
          // Mock update
          const updated = { ...roms[index], ...rom, deviceId: rom.device.id };
          roms[index] = updated;
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  },
  deleteRom: async (id: number): Promise<boolean> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const index = roms.findIndex(r => r.id === id);
        if (index !== -1) {
          roms.splice(index, 1);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  },
  getTeam: async (): Promise<TeamMember[]> => {
    return new Promise(resolve => setTimeout(() => resolve(teamMembers), 500));
  },
  login: async (email: string): Promise<User> => {
    // Mock login
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
  },
  submitApplication: async (data: any): Promise<boolean> => {
    console.log("Submitting application to mohammadadisetiawan09@gmail.com", data);
    return new Promise(resolve => setTimeout(() => resolve(true), 1000));
  },
  getApplications: async (): Promise<TeamApplication[]> => {
    return new Promise(resolve => setTimeout(() => resolve([...applications]), 500));
  },
  updateApplicationStatus: async (id: number, status: 'approved' | 'rejected'): Promise<boolean> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const index = applications.findIndex(a => a.id === id);
        if (index !== -1) {
          applications[index].status = status;
          // Simulate email notification
          console.log(`Sending email to ${applications[index].email}: Application ${status}`);
        }
        resolve(true);
      }, 600);
    });
  },
  adminUpload: async (data: any): Promise<boolean> => {
    console.log("Admin uploading...", data);
    return new Promise(resolve => setTimeout(() => resolve(true), 1500));
  }
};