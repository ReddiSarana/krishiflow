import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';
import { Fingerprint, ScanFace, X } from 'lucide-react';
import { Button } from '../ui/Button';

export const BiometricAuthModal: React.FC = () => {
  const { isBiometricModalOpen, setIsBiometricModalOpen, setUser, setCurrentScreen, showToast } = useAuth();
  const [isAuthenticating, setIsAuthenticating] = React.useState(false);

  if (!isBiometricModalOpen) return null;

  const handleBiometricAuth = async () => {
    try {
      setIsAuthenticating(true);
      const user = await authService.loginWithBiometrics();
      setIsBiometricModalOpen(false);
      setUser(user);
      setCurrentScreen('dashboard');
      showToast('Face ID / Touch ID Match Confirmed', 'Authenticated via Kisan Passkey', 'success');
    } catch {
      showToast('Biometric recognition failed', 'Please try OTP or password login instead', 'error');
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 max-w-xs w-full text-center shadow-2xl animate-slide-up relative">
        <button
          onClick={() => setIsBiometricModalOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative w-24 h-24 mx-auto mb-5 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-emerald-500/40 animate-ping" />
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-600 flex items-center justify-center text-white shadow-xl shadow-emerald-500/40">
            <ScanFace className="w-10 h-10" />
          </div>
        </div>

        <h3 className="text-lg font-bold text-white">Kisan Face ID / Touch ID</h3>
        <p className="text-xs text-slate-400 mt-1">Touch sensor or align face for instant verification</p>

        <div className="mt-6 flex flex-col gap-2.5">
          <Button
            onClick={handleBiometricAuth}
            isLoading={isAuthenticating}
            leftIcon={<Fingerprint className="w-4 h-4" />}
            size="md"
          >
            Simulate Passkey Match
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsBiometricModalOpen(false)}
          >
            Use OTP Instead
          </Button>
        </div>
      </div>
    </div>
  );
};
