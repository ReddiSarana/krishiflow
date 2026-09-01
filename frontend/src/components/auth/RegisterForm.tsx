import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { authService, checkPasswordStrength } from '../../services/authService';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Checkbox } from '../ui/Checkbox';
import { PasswordStrengthMeter } from './PasswordStrengthMeter';
import { SocialAuthButtons } from './SocialAuthButtons';
import { User as UserIcon, Mail, Lock, ShieldCheck, ArrowRight, Sprout, Tractor, Building2, UserCheck } from 'lucide-react';
import { UserRole } from '../../types/auth';

export const RegisterForm: React.FC = () => {
  const { setCurrentScreen, setOtpTarget, showToast } = useAuth();

  const [role, setRole] = useState<UserRole>('farmer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
  }>({});

  const strength = checkPasswordStrength(password);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = 'Full name is required';
    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!phone.trim() || phone.length < 7) {
      newErrors.phone = 'Please enter a valid mobile number for Kisan SMS alerts';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!agreeTerms) {
      newErrors.terms = 'You must accept the terms & conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      await authService.register(name, email, password, role);
      setOtpTarget(phone);
      setCurrentScreen('otp');
      showToast(
        'Registration Initiated!',
        `We have sent an activation OTP to ${phone}`,
        'success'
      );
    } catch {
      showToast('Registration failed', 'Please try again with a different email/phone', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
          🌾 Join KrishiFlow Network
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
          Create Kisan & Partner Account
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          Select your role to personalize crop advisory, mandi prices, and trading tools.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        <button
          type="button"
          onClick={() => setRole('farmer')}
          className={`p-2.5 rounded-xl border text-left transition-all flex flex-col items-center justify-center gap-1 ${
            role === 'farmer'
              ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500'
              : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white'
          }`}
        >
          <Tractor className="w-4 h-4" />
          <span className="text-xs font-semibold">Farmer</span>
        </button>

        <button
          type="button"
          onClick={() => setRole('fpo')}
          className={`p-2.5 rounded-xl border text-left transition-all flex flex-col items-center justify-center gap-1 ${
            role === 'fpo'
              ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500'
              : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white'
          }`}
        >
          <Sprout className="w-4 h-4" />
          <span className="text-xs font-semibold">FPO / Coop</span>
        </button>

        <button
          type="button"
          onClick={() => setRole('agronomist')}
          className={`p-2.5 rounded-xl border text-left transition-all flex flex-col items-center justify-center gap-1 ${
            role === 'agronomist'
              ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500'
              : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span className="text-xs font-semibold">Agronomist</span>
        </button>

        <button
          type="button"
          onClick={() => setRole('enterprise')}
          className={`p-2.5 rounded-xl border text-left transition-all flex flex-col items-center justify-center gap-1 ${
            role === 'enterprise'
              ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500'
              : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span className="text-xs font-semibold">Trader / Buyer</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          label="Full Name (पूरा नाम)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ramesh Patel"
          icon={<UserIcon className="w-4 h-4" />}
          error={errors.name}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ramesh@krishiflow.in"
            icon={<Mail className="w-4 h-4" />}
            error={errors.email}
            required
          />

          <Input
            label="Mobile Number (ओटीपी के लिए)"
            type="tel"
            inputMode="numeric"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="98765 43210"
            icon={<span className="text-xs font-bold text-slate-400">🇮🇳</span>}
            error={errors.phone}
            required
          />
        </div>

        <div>
          <Input
            label="Create Secure Password"
            isPassword
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters with symbols"
            icon={<Lock className="w-4 h-4" />}
            error={errors.password}
            required
          />
          <PasswordStrengthMeter strength={strength} passwordLength={password.length} />
        </div>

        <Input
          label="Confirm Password"
          isPassword
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Repeat your password"
          icon={<ShieldCheck className="w-4 h-4" />}
          error={errors.confirmPassword}
          required
        />

        <div className="pt-1">
          <Checkbox
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            label={
              <span>
                I agree to the <a href="#" className="text-emerald-400 underline">KrishiFlow Kisan Terms</a> and{' '}
                <a href="#" className="text-emerald-400 underline">Privacy Policy</a>.
              </span>
            }
          />
          {errors.terms && <p className="text-[11px] font-medium text-rose-400 mt-1">{errors.terms}</p>}
        </div>

        <Button
          type="submit"
          isLoading={isLoading}
          rightIcon={<ArrowRight className="w-4 h-4" />}
          className="w-full mt-2"
          size="lg"
        >
          Register for KrishiFlow
        </Button>
      </form>

      <SocialAuthButtons actionLabel="register" />

      <p className="text-center text-xs text-slate-400 mt-4">
        Already registered?{' '}
        <button
          type="button"
          onClick={() => setCurrentScreen('login')}
          className="font-semibold text-emerald-400 hover:text-emerald-300 transition-colors underline-offset-4 hover:underline"
        >
          Sign in to your Kisan account
        </button>
      </p>
    </div>
  );
};
