import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Mail, KeyRound, ArrowLeft, ArrowRight } from 'lucide-react';

export const ForgotPasswordForm: React.FC = () => {
  const { setCurrentScreen, setOtpTarget, showToast } = useAuth();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your mobile number or registered email');
      return;
    }

    setIsLoading(true);
    try {
      await authService.sendPasswordReset(email);
      setOtpTarget(email);
      setCurrentScreen('otp');
      showToast('Recovery Code Dispatched', `We sent a 6-digit PIN to ${email}`, 'info');
    } catch {
      showToast('Error', 'Unable to process password reset request', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto text-center">
      <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/10">
        <KeyRound className="w-7 h-7" />
      </div>

      <h2 className="text-2xl font-bold text-white tracking-tight">Reset Kisan Password</h2>
      <p className="text-slate-400 text-xs sm:text-sm mt-1.5 mb-6 max-w-sm mx-auto">
        Enter the mobile number or email linked to your Kisan account and we will send a 6-digit recovery PIN.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <Input
          label="Registered Mobile Number or Email"
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError('');
          }}
          placeholder="9876543210 or ramesh@krishiflow.in"
          icon={<Mail className="w-4 h-4" />}
          error={error}
          required
        />

        <Button
          type="submit"
          isLoading={isLoading}
          rightIcon={<ArrowRight className="w-4 h-4" />}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-amber-500/20"
          size="lg"
        >
          Send Recovery Code
        </Button>
      </form>

      <div className="mt-6 pt-6 border-t border-slate-800">
        <button
          type="button"
          onClick={() => setCurrentScreen('login')}
          className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to sign in</span>
        </button>
      </div>
    </div>
  );
};
