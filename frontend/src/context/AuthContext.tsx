import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthScreen, DeviceMode, User, ToastMessage, LandRecord } from '../types/auth';

interface AuthContextType {
  user: User | null;
  currentScreen: AuthScreen;
  deviceMode: DeviceMode;
  isBiometricModalOpen: boolean;
  otpTarget: string;
  toasts: ToastMessage[];
  pendingRegistration: Partial<User> | null;
  setUser: (user: User | null) => void;
  setCurrentScreen: (screen: AuthScreen) => void;
  setDeviceMode: (mode: DeviceMode) => void;
  setIsBiometricModalOpen: (open: boolean) => void;
  setOtpTarget: (target: string) => void;
  setPendingRegistration: (data: Partial<User> | null) => void;
  completeLandVerification: (landRecord: LandRecord) => void;
  showToast: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('krishiflow_kisan_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [currentScreen, setCurrentScreen] = useState<AuthScreen>('login');
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
  const [isBiometricModalOpen, setIsBiometricModalOpen] = useState<boolean>(false);
  const [otpTarget, setOtpTarget] = useState<string>('+91 98765 43210');
  const [pendingRegistration, setPendingRegistration] = useState<Partial<User> | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const setUser = (newUser: User | null) => {
    setUserState(newUser);
    if (newUser) {
      localStorage.setItem('krishiflow_kisan_user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('krishiflow_kisan_user');
    }
  };

  const completeLandVerification = (landRecord: LandRecord) => {
    const baseUser: User = user || {
      id: pendingRegistration?.id || `KISAN-${Math.floor(100000 + Math.random() * 900000)}`,
      name: pendingRegistration?.name || 'Mallesham Goud',
      email: pendingRegistration?.email || `${(pendingRegistration?.name || 'kisan').toLowerCase().replace(/\s+/g, '')}@krishiflow.in`,
      phone: pendingRegistration?.phone || '+91 98490 12345',
      role: 'farmer',
      farmLocation: `${landRecord.village}, ${landRecord.district}`,
      createdAt: new Date().toISOString()
    };

    const verifiedUser: User = {
      ...baseUser,
      landRecord
    };

    setUser(verifiedUser);
    setPendingRegistration(null);
    setCurrentScreen('dashboard');
    showToast(
      'భూమి రికార్డు ధృవీకరణ పూర్తయింది! (Land Verified)',
      `ధరణి సర్టిఫికేట్ ID: ${landRecord.dharaniCertificateId} జారీ చేయబడింది.`,
      'success'
    );
  };

  const showToast = (title: string, description?: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastMessage = { id, type, title, description };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const logout = () => {
    setUser(null);
    setPendingRegistration(null);
    setCurrentScreen('login');
    showToast('Signed Out', 'You have been signed out of your Kisan account', 'info');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        currentScreen,
        deviceMode,
        isBiometricModalOpen,
        otpTarget,
        toasts,
        pendingRegistration,
        setUser,
        setCurrentScreen,
        setDeviceMode,
        setIsBiometricModalOpen,
        setOtpTarget,
        setPendingRegistration,
        completeLandVerification,
        showToast,
        removeToast,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
