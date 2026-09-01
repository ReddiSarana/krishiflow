import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Checkbox } from '../ui/Checkbox';
import { SocialAuthButtons } from './SocialAuthButtons';
import { Mail, Lock, Phone, Fingerprint, ArrowRight, Sprout } from 'lucide-react';
import { LoginMethod } from '../../types/auth';
import { useLanguage } from '../../context/LanguageContext';

export const LoginForm: React.FC = () => {
  const { t } = useLanguage();
  const { setUser, setCurrentScreen, setIsBiometricModalOpen, setOtpTarget, showToast } = useAuth();
  
  const [method, setMethod] = useState<LoginMethod>('phone');
  const [phoneCountry, setPhoneCountry] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; phone?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (method === 'phone') {
      if (!phoneNumber.trim() || phoneNumber.length < 7) {
        newErrors.phone = 'Please enter a valid 10-digit mobile number';
      }
    } else {
      if (!email.trim()) {
        newErrors.email = 'Kisan ID or Email is required';
      }
      if (!password) {
        newErrors.password = 'Password is required';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      if (method === 'phone') {
        const fullPhone = `${phoneCountry} ${phoneNumber}`;
        await authService.sendOtp(fullPhone);
        setOtpTarget(fullPhone);
        setCurrentScreen('otp');
        showToast('Kisan OTP Sent', `Security PIN sent to ${fullPhone}`, 'info');
      } else {
        const user = await authService.loginWithEmail(email, password);
        setUser(user);
        setCurrentScreen('dashboard');
        showToast('Welcome to KrishiFlow!', `Signed in as ${user.name}`, 'success');
      }
    } catch {
      showToast('Authentication Failed', 'Please verify your credentials and try again', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <div className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-emerald-400">
          <Sprout className="w-3.5 h-3.5" />
          <span>Kisan / Member Sign In</span>
        </div>
        <button
          type="button"
          onClick={() => setIsBiometricModalOpen(true)}
          className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-500/30 transition-all"
        >
          <Fingerprint className="w-3.5 h-3.5" />
          <span>Passkey / Face ID</span>
        </button>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
        {t.authSignInTitle}
      </h2>
      <p className="text-slate-400 text-xs sm:text-sm mt-1.5 mb-5">
        {t.authSignInSubtitle}
      </p>

      <div className="flex p-1 bg-slate-800/80 rounded-xl border border-slate-700/60 mb-5">
        <button
          type="button"
          onClick={() => setMethod('phone')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all text-center ${
            method === 'phone'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {t.authMobileOtpTab}
        </button>
        <button
          type="button"
          onClick={() => setMethod('email')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all text-center ${
            method === 'email'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {t.authEmailTab}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {method === 'phone' ? (
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Mobile Phone Number (मोबाइल नंबर) <span className="text-rose-400">*</span>
            </label>
            <div className="flex gap-2">
              <select
                value={phoneCountry}
                onChange={(e) => setPhoneCountry(e.target.value)}
                className="w-24 px-2 py-2.5 bg-slate-800/90 border border-slate-700 text-white text-sm rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="+91">🇮🇳 +91</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+49">🇩🇪 +49</option>
              </select>
              <div className="flex-1">
                <Input
                  type="tel"
                  inputMode="numeric"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="98765 43210"
                  icon={<Phone className="w-4 h-4" />}
                  error={errors.phone}
                  required
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            <Input
              label="Kisan ID or Email Address"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="KF-78902 or ramesh@krishiflow.in"
              icon={<Mail className="w-4 h-4" />}
              error={errors.email}
              required
            />

            <div>
              <div className="flex items-center justify-between mb-1">
                <span />
                <button
                  type="button"
                  onClick={() => setCurrentScreen('forgot-password')}
                  className="text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <Input
                label="Password"
                isPassword
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                icon={<Lock className="w-4 h-4" />}
                error={errors.password}
                required
              />
            </div>
          </>
        )}

        <div className="flex items-center justify-between pt-1">
          <Checkbox
            label="Keep me signed in on this device"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <span className="text-[11px] text-slate-500">Auto-login active</span>
        </div>

        <Button
          type="submit"
          isLoading={isLoading}
          rightIcon={<ArrowRight className="w-4 h-4" />}
          className="w-full mt-2"
          size="lg"
        >
          {method === 'phone' ? 'Get Instant OTP (ओटीपी पाएं)' : 'Sign In to KrishiFlow'}
        </Button>
      </form>

      <SocialAuthButtons actionLabel="continue" />

      <p className="text-center text-xs text-slate-400 mt-6">
        New to KrishiFlow?{' '}
        <button
          type="button"
          onClick={() => setCurrentScreen('register')}
          className="font-semibold text-emerald-400 hover:text-emerald-300 transition-colors underline-offset-4 hover:underline"
        >
          Register as Farmer / Agribusiness
        </button>
      </p>
    </div>
  );
};
