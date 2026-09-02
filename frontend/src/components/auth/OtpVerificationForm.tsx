import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';
import { Button } from '../ui/Button';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export const OtpVerificationForm: React.FC = () => {
  const { otpTarget, setUser, setCurrentScreen, setPendingRegistration, showToast } = useAuth();
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState<number>(45);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('');
      setOtp(digits);
      inputRefs.current[5]?.focus();
    }
  };

  const handleResend = async () => {
    if (countdown > 0) return;
    try {
      await authService.sendOtp(otpTarget);
      setCountdown(45);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
      showToast('New OTP Sent', `Dispatched another PIN to ${otpTarget}`, 'info');
    } catch {
      showToast('Resend Failed', 'Could not send verification code', 'error');
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) {
      showToast('Incomplete Code', 'Please enter all 6 digits of your PIN', 'error');
      return;
    }

    setIsVerifying(true);
    try {
      await authService.verifyOtp(code);
      setPendingRegistration({
        id: 'KISAN-TEL-' + Math.floor(100000 + Math.random() * 900000),
        name: otpTarget.includes('@') ? otpTarget.split('@')[0] : 'మల్లేశం గౌడ్ (Mallesham Goud)',
        email: otpTarget.includes('@') ? otpTarget : 'kisan.mallesham@krishiflow.in',
        phone: !otpTarget.includes('@') ? otpTarget : '+91 98490 12345',
        role: 'farmer',
        createdAt: new Date().toISOString(),
      });
      setCurrentScreen('land-verification');
      showToast('OTP ధృవీకరించబడింది!', 'దయచేసి మీ పట్టాదారు పాస్‌బుక్ & భూమి రికార్డులను నమోదు చేయండి.', 'success');
    } catch {
      showToast('Verification Failed', 'Invalid security code. Please check and retry.', 'error');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto text-center">
      <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/10">
        <ShieldAlert className="w-7 h-7" />
      </div>

      <h2 className="text-2xl font-bold text-white tracking-tight">Enter 6-Digit OTP</h2>
      <p className="text-slate-400 text-xs sm:text-sm mt-1.5 mb-6">
        We sent a verification SMS to <span className="text-white font-medium">{otpTarget}</span>
      </p>

      <form onSubmit={handleVerify} className="space-y-6">
        <div className="flex justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => { inputRefs.current[idx] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              className="w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-bold bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-inner"
            />
          ))}
        </div>

        <div className="text-xs text-slate-400">
          Didn't receive SMS?{' '}
          <button
            type="button"
            onClick={handleResend}
            disabled={countdown > 0}
            className="text-emerald-400 hover:text-emerald-300 font-semibold disabled:text-slate-600 disabled:cursor-not-allowed transition-colors"
          >
            {countdown > 0 ? `Resend OTP (${countdown}s)` : 'Resend OTP Now'}
          </button>
        </div>

        <Button
          type="submit"
          isLoading={isVerifying}
          className="w-full"
          size="lg"
        >
          Verify & Enter Kisan Portal
        </Button>
      </form>

      <div className="mt-6 pt-6 border-t border-slate-800">
        <button
          type="button"
          onClick={() => setCurrentScreen('login')}
          className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Cancel & return to sign in</span>
        </button>
      </div>
    </div>
  );
};
