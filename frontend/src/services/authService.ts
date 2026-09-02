import { User, PasswordStrength, UserRole, LandRecord } from '../types/auth';

const defaultTelanganaLandRecord: LandRecord = {
  pattadarPassbookNo: 'T-284910294',
  khataNo: '412',
  surveyNo: '142/A & 142/B',
  district: 'Warangal',
  mandal: 'Narsampet',
  village: 'Chennaraopet',
  totalAcres: 4.5,
  cultivableAcres: 4.2,
  soilType: 'Black Cotton Soil (Regur)',
  waterSource: 'Borewell + Drip Irrigation',
  verifiedVia: 'Telangana Dharani Portal',
  verificationDate: '02 Sep 2026',
  dharaniCertificateId: 'DH-TEL-WGL-2026-89421',
  isVerified: true,
  activeCrops: ['Warangal Teja Chilli', 'Cotton (Kapas)', 'Maize (Mokka Jonna)'],
  rythuBandhuEligible: true,
  rythuBimaEnrolled: true,
  pmKisanDbtActive: true
};

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
 * KrishiFlow Auth Service with Telangana Dharani Land Verification
 */
export const authService = {
  async loginWithEmail(email: string, _password: string): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return {
      id: 'KISAN-TEL-582910',
      name: email.includes('@') ? 'మల్లేశం గౌడ్ (Mallesham Goud)' : email,
      email: email.includes('@') ? email : 'kisan.mallesham@krishiflow.in',
      phone: '+91 98490 12345',
      role: 'farmer',
      farmLocation: 'Chennaraopet, Warangal',
      provider: 'email',
      createdAt: new Date().toISOString(),
      landRecord: defaultTelanganaLandRecord
    };
  },

  async loginWithPhone(phone: string): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return {
      id: 'KISAN-TEL-582910',
      name: 'మల్లేశం గౌడ్ (Mallesham Goud)',
      email: 'kisan.mallesham@krishiflow.in',
      phone: phone || '+91 98490 12345',
      role: 'farmer',
      farmLocation: 'Chennaraopet, Warangal',
      provider: 'phone',
      createdAt: new Date().toISOString(),
      landRecord: defaultTelanganaLandRecord
    };
  },

  async register(name: string, email: string, _password: string, role: UserRole = 'farmer'): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return {
      id: 'KISAN-TEL-' + Math.floor(100000 + Math.random() * 900000),
      name,
      email,
      role,
      farmLocation: 'Warangal, Telangana',
      provider: 'email',
      createdAt: new Date().toISOString(),
    };
  },

  async loginWithSocial(provider: 'google' | 'apple' | 'github' | 'microsoft'): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return {
      id: 'KISAN-TEL-' + Math.floor(100000 + Math.random() * 900000),
      name: `రామి రెడ్డి (Rami Reddy - ${provider.toUpperCase()})`,
      email: `partner@${provider}-krishi.org`,
      role: 'farmer',
      farmLocation: 'Balkonda, Nizamabad',
      provider,
      createdAt: new Date().toISOString(),
      landRecord: {
        ...defaultTelanganaLandRecord,
        pattadarPassbookNo: 'T-918237461',
        district: 'Nizamabad',
        mandal: 'Armoor',
        village: 'Balkonda',
        totalAcres: 6.0,
        cultivableAcres: 5.5,
        activeCrops: ['Nizamabad Turmeric (Pasupu)', 'Paddy / Rice', 'Sesame']
      }
    };
  },

  async loginWithBiometrics(): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return {
      id: 'KISAN-TEL-582910',
      name: 'మల్లేశం గౌడ్ (Mallesham Goud)',
      email: 'kisan.passkey@krishiflow.local',
      phone: '+91 98490 12345',
      role: 'farmer',
      farmLocation: 'Chennaraopet, Warangal',
      provider: 'biometric',
      createdAt: new Date().toISOString(),
      landRecord: defaultTelanganaLandRecord
    };
  },

  async sendOtp(_destination: string): Promise<{ success: boolean; countdown: number }> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { success: true, countdown: 45 };
  },

  async verifyOtp(_otp: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return true;
  },

  async sendPasswordReset(_email: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return true;
  },
};
