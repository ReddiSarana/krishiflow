import { User, PasswordStrength, UserRole } from '../types/auth';

/**
 * Calculates password strength metrics
 */
export function checkPasswordStrength(password: string): PasswordStrength {
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

  let score = 0;
  if (hasMinLength) score++;
  if (hasUppercase) score++;
  if (hasNumber) score++;
  if (hasSpecialChar) score++;

  let label: PasswordStrength['label'] = 'Too Weak';
  if (password.length === 0) label = 'Too Weak';
  else if (score === 1) label = 'Weak';
  else if (score === 2) label = 'Fair';
  else if (score === 3) label = 'Good';
  else if (score === 4) label = 'Strong';

  return {
    score,
    label,
    hasMinLength,
    hasUppercase,
    hasNumber,
    hasSpecialChar,
  };
}

/**
 * KrishiFlow Mock Auth Service
 */
export const authService = {
  async loginWithEmail(email: string, _password: string): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return {
      id: 'KF_' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      name: email.split('@')[0],
      email,
      role: 'farmer',
      farmLocation: 'Indore Central Agri Complex',
      provider: 'email',
      createdAt: new Date().toISOString(),
    };
  },

  async loginWithPhone(phone: string): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      id: 'KF_' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      name: 'Ramesh Patel (Kisan Member)',
      email: 'ramesh.farmer@krishiflow.in',
      phone,
      role: 'farmer',
      farmLocation: 'Indore Mandi Hub, Bay 3',
      provider: 'phone',
      createdAt: new Date().toISOString(),
    };
  },

  async register(name: string, email: string, _password: string, role: UserRole = 'farmer'): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return {
      id: 'KF_' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      name,
      email,
      role,
      farmLocation: 'Indore Central Hub',
      provider: 'email',
      createdAt: new Date().toISOString(),
    };
  },

  async loginWithSocial(provider: 'google' | 'apple' | 'github' | 'microsoft'): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 700));
    return {
      id: 'KF_' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} Agri Member`,
      email: `partner@${provider}-krishi.org`,
      role: 'enterprise',
      farmLocation: 'Madhya Pradesh Agro Zone',
      provider,
      createdAt: new Date().toISOString(),
    };
  },

  async loginWithBiometrics(): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      id: 'KF_BIO_' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      name: 'Verified Kisan Member',
      email: 'kisan.passkey@krishiflow.local',
      role: 'farmer',
      farmLocation: 'Indore Hub Slot #412',
      provider: 'biometric',
      createdAt: new Date().toISOString(),
    };
  },

  async sendOtp(_destination: string): Promise<{ success: boolean; countdown: number }> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true, countdown: 45 };
  },

  async verifyOtp(_otp: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return true;
  },

  async sendPasswordReset(_email: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return true;
  },
};
