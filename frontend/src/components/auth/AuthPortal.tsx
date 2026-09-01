import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { OtpVerificationForm } from './OtpVerificationForm';
import { BiometricAuthModal } from './BiometricAuthModal';
import { WebAuthLayout } from '../layout/WebAuthLayout';
import { MobileAuthLayout } from '../layout/MobileAuthLayout';
import { Monitor, Tablet, Smartphone, LogOut, Award, MapPin, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';

export const AuthPortal: React.FC = () => {
  const { t } = useLanguage();
  const { user, currentScreen, setCurrentScreen, deviceMode, setDeviceMode, logout, showToast } = useAuth();

  const handleDeviceChange = (mode: 'desktop' | 'tablet' | 'mobile') => {
    setDeviceMode(mode);
    showToast(`Switched to ${mode.toUpperCase()} preview mode`, undefined, 'info');
  };

  const getContainerWidth = () => {
    switch (deviceMode) {
      case 'desktop':
        return 'max-w-6xl w-full';
      case 'tablet':
        return 'max-w-2xl w-full';
      case 'mobile':
        return 'max-w-[390px] w-full';
      default:
        return 'w-full max-w-6xl';
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'register':
        return <RegisterForm />;
      case 'forgot-password':
        return <ForgotPasswordForm />;
      case 'otp':
        return <OtpVerificationForm />;
      case 'login':
      default:
        return <LoginForm />;
    }
  };

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'KF';

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Top Device & Status Bar */}
      <div className="glass-panel p-4 rounded-3xl border border-slate-800 bg-slate-950/70 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-white">KrishiFlow Identity & Access Management</h2>
            <span className="px-2.5 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full">
              Web & Mobile Dual Interface
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Test responsive authentication, OTP SMS delivery, password strength, and biometric passkeys.
          </p>
        </div>

        {/* Viewport Switcher */}
        <div className="flex items-center bg-slate-900 p-1 rounded-2xl border border-slate-800">
          <button
            onClick={() => handleDeviceChange('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              deviceMode === 'desktop'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>{t.authDeviceWeb}</span>
          </button>
          <button
            onClick={() => handleDeviceChange('tablet')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              deviceMode === 'tablet'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>{t.authDeviceTablet}</span>
          </button>
          <button
            onClick={() => handleDeviceChange('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              deviceMode === 'mobile'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>{t.authDeviceMobile}</span>
          </button>
        </div>
      </div>

      {/* Main Form or User Session Container */}
      <div className="flex items-center justify-center p-2 sm:p-4">
        <div className={`transition-all duration-300 ease-out ${getContainerWidth()}`}>
          {currentScreen === 'dashboard' ? (
            /* Authenticated State */
            <div className="bg-slate-900/95 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-2xl mx-auto">
              <div className="flex flex-wrap items-center justify-between pb-5 border-b border-slate-800 gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-xl font-bold text-white shadow-lg shadow-emerald-500/25">
                    {initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold text-white">{user?.name || 'Verified Kisan Member'}</h2>
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        Verified Kisan ID
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                      <span>{user?.email || 'kisan@krishiflow.in'}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-emerald-400">
                        <MapPin className="w-3 h-3" />
                        {user?.farmLocation || 'Indore Hub Slot #412'}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  variant="danger"
                  size="sm"
                  onClick={logout}
                  leftIcon={<LogOut className="w-3.5 h-3.5" />}
                >
                  Sign Out
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 my-5">
                <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                  <div className="text-xs text-slate-400">Security Protection</div>
                  <div className="text-base font-bold text-emerald-400 mt-1">2FA + Passkey</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">FIDO2 & OTP enabled</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                  <div className="text-xs text-slate-400">Active Gate Pass</div>
                  <div className="text-base font-bold text-teal-400 mt-1">Token #TK-7842</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Indore Bay 3 Assigned</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                  <div className="text-xs text-slate-400">Cross-Device Sync</div>
                  <div className="text-base font-bold text-amber-400 mt-1">PWA & SMS Linked</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Automatic session handoff</div>
                </div>
              </div>

              <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">Kisan Session Active & Authenticated</div>
                    <div className="text-[11px] text-slate-400">You can now book priority bays and manage queue tokens.</div>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setCurrentScreen('login')}
                >
                  Test Login Form
                </Button>
              </div>
            </div>
          ) : deviceMode === 'mobile' ? (
            /* Mobile Device Frame */
            <div className="phone-frame relative overflow-hidden bg-slate-900 border-8 border-slate-800 rounded-[44px] shadow-2xl">
              <div className="w-32 h-6 bg-black rounded-b-2xl absolute top-0 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center gap-2">
                <div className="w-2.5 h-2.5 bg-slate-900 rounded-full border border-slate-700" />
                <div className="w-10 h-1 bg-slate-800 rounded-full" />
              </div>
              <div className="pt-6">
                <MobileAuthLayout>{renderScreen()}</MobileAuthLayout>
              </div>
            </div>
          ) : (
            /* Web Desktop / Tablet Layout */
            <WebAuthLayout>{renderScreen()}</WebAuthLayout>
          )}
        </div>
      </div>

      <BiometricAuthModal />
    </div>
  );
};
