import React, { createContext, useContext, useState } from 'react';
import { AuthScreen, DeviceMode, User, ToastMessage } from '../types/auth';

interface AuthContextType {
  user: User | null;
  currentScreen: AuthScreen;
  deviceMode: DeviceMode;
  isBiometricModalOpen: boolean;
  otpTarget: string;
  toasts: ToastMessage[];
  setUser: (user: User | null) => void;
  setCurrentScreen: (screen: AuthScreen) => void;
  setDeviceMode: (mode: DeviceMode) => void;
  setIsBiometricModalOpen: (open: boolean) => void;
  setOtpTarget: (target: string) => void;
  showToast: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    id: 'KF_78902',
    name: 'Ramesh Patel (Kisan)',
    email: 'ramesh.farmer@krishiflow.in',
    phone: '+91 98765 43210',
    role: 'farmer',
    farmLocation: 'Indore Mandi Hub, Bay 3',
    createdAt: new Date().toISOString(),
  });
  const [currentScreen, setCurrentScreen] = useState<AuthScreen>('login');
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
  const [isBiometricModalOpen, setIsBiometricModalOpen] = useState<boolean>(false);
  const [otpTarget, setOtpTarget] = useState<string>('+91 98765 43210');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (title: string, description?: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastMessage = { id, type, title, description };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const logout = () => {
    setUser(null);
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
        setUser,
        setCurrentScreen,
        setDeviceMode,
        setIsBiometricModalOpen,
        setOtpTarget,
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
