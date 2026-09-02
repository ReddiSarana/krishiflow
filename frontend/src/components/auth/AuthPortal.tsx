import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { OtpVerificationForm } from './OtpVerificationForm';
import { LandVerificationScreen } from './LandVerificationScreen';
import { BiometricAuthModal } from './BiometricAuthModal';
import { WebAuthLayout } from '../layout/WebAuthLayout';
import { MobileAuthLayout } from '../layout/MobileAuthLayout';
import { Monitor, Tablet, Smartphone, LogOut, Award, MapPin, CheckCircle, ShieldCheck } from 'lucide-react';
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
    if (currentScreen === 'land-verification') {
      return 'max-w-5xl w-full';
    }
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
      case 'land-verification':
        return <LandVerificationScreen />;
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
            <h2 className="text-base font-bold text-white">KrishiFlow Kisan Identity & Access Management</h2>
            <span className="px-2.5 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Telangana Dharani Verified
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            రైతు లాగిన్, రిజిస్ట్రేషన్ మరియు ధరణి పట్టాదారు పాస్‌బుక్ ధృవీకరణ పోర్టల్
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
                        {user?.farmLocation || user?.landRecord?.district || 'Warangal, Telangana'}
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

              {/* Status Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6">
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-1">Pattadar Passbook</span>
                  <div className="font-mono text-sm font-bold text-emerald-400">
                    {user?.landRecord?.pattadarPassbookNo || 'T-284910294'}
                  </div>
                  <span className="text-[10px] text-slate-500">
                    Survey #{user?.landRecord?.surveyNo || '142/A'} &bull; {user?.landRecord?.totalAcres || '4.5'} Acres
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-1">Dharani Verification</span>
                  <div className="font-mono text-sm font-bold text-teal-300">
                    {user?.landRecord?.dharaniCertificateId || 'DH-TEL-WGL-2026-89421'}
                  </div>
                  <span className="text-[10px] text-emerald-400">
                    ✓ Verified via Telangana Land Records
                  </span>
                </div>
              </div>

              {/* Navigation Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setCurrentScreen('dashboard')}
                  className="flex-1 justify-center bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold"
                >
                  రైతు ప్రొఫైల్ & పంటలు చూడండి
                </Button>
              </div>
            </div>
          ) : deviceMode === 'mobile' || deviceMode === 'tablet' ? (
            <MobileAuthLayout>{renderScreen()}</MobileAuthLayout>
          ) : (
            <WebAuthLayout>{renderScreen()}</WebAuthLayout>
          )}
        </div>
      </div>

      <BiometricAuthModal />
    </div>
  );
};
