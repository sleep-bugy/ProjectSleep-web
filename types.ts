export enum OSType {
  SleepOS = 'SleepOS',
  AOSP = 'AOSP',
  Port = 'Port'
}

export interface Device {
  id: number;
  name: string;
  model: string;
  photo: string;
  manufacturer: string;
}

export interface Rom {
  id: number;
  deviceId: number;
  title: string;
  version: string;
  osType: OSType;
  fileSize: string;
  uploadDate: string;
  downloadCount: number;
  changelog: string;
  notes?: string;
  downloadUrl: string;
  checksum: string;
}

export interface RomWithDevice extends Rom {
  device: Device;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  countryCode: string;
  avatar: string;
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

export interface User {
  id: number;
  email: string;
  role: 'admin' | 'user';
  token: string;
}

export interface TeamApplication {
  id: number;
  name: string;
  email: string;
  role: string;
  github: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}