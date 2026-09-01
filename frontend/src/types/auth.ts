export type AuthScreen = 'login' | 'register' | 'forgot-password' | 'otp' | 'dashboard';

export type DeviceMode = 'desktop' | 'tablet' | 'mobile' | 'responsive';

export type LoginMethod = 'phone' | 'email';

export type UserRole = 'farmer' | 'fpo' | 'agronomist' | 'enterprise';

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
