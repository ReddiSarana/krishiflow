export type AuthScreen = 'login' | 'register' | 'forgot-password' | 'otp' | 'land-verification' | 'dashboard';

export type DeviceMode = 'desktop' | 'tablet' | 'mobile' | 'responsive';

export type LoginMethod = 'phone' | 'email';

export type UserRole = 'farmer' | 'fpo' | 'agronomist' | 'enterprise';

export interface LandRecord {
  pattadarPassbookNo: string; // e.g., T-284910294
  khataNo: string; // e.g., 408
  surveyNo: string; // e.g., 142/A, 89/2
  district: string; // e.g., Warangal, Nizamabad, Vikarabad, Karimnagar
  mandal: string; // e.g., Narsampet, Armoor, Tandur
  village: string; // e.g., Chennaraopet, Balkonda, Basheerabad
  totalAcres: number; // e.g., 4.5
  cultivableAcres: number; // e.g., 4.0
  soilType: string; // e.g., Black Cotton Soil (Regur), Red Sandy Loam (Chalka)
  waterSource: string; // e.g., Borewell + Drip, Canal Irrigation, Open Well, Rainfed
  verifiedVia: 'Telangana Dharani Portal' | 'MeeSeva Land Records' | 'Revenue Department API';
  verificationDate: string;
  dharaniCertificateId: string;
  isVerified: boolean;
  activeCrops: string[];
  rythuBandhuEligible?: boolean;
  rythuBimaEnrolled?: boolean;
  pmKisanDbtActive?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role?: UserRole;
  farmLocation?: string;
  avatarUrl?: string;
  provider?: 'email' | 'phone' | 'google' | 'apple' | 'github' | 'microsoft' | 'biometric';
  createdAt: string;
  landRecord?: LandRecord;
}

export interface PasswordStrength {
  score: number; // 0 to 4
  label: 'Too Weak' | 'Weak' | 'Fair' | 'Good' | 'Strong';
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}
