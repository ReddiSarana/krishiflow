import React from 'react';
import { PasswordStrength } from '../../types/auth';
import { Check, Circle } from 'lucide-react';

interface PasswordStrengthMeterProps {
  strength: PasswordStrength;
  passwordLength: number;
}

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ strength, passwordLength }) => {
  const getBarColor = (index: number) => {
    if (passwordLength === 0 || index >= strength.score) {
      return 'bg-slate-800';
    }
    if (strength.score === 1) return 'bg-rose-500';
    if (strength.score === 2) return 'bg-amber-500';
    if (strength.score === 3) return 'bg-teal-500';
    return 'bg-emerald-500';
  };

  const getLabelColor = () => {
    if (passwordLength === 0) return 'text-slate-500';
    if (strength.score === 1) return 'text-rose-400 font-semibold';
    if (strength.score === 2) return 'text-amber-400 font-semibold';
    if (strength.score === 3) return 'text-teal-400 font-semibold';
    return 'text-emerald-400 font-semibold';
  };

  return (
    <div className="mt-2 space-y-2">
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-slate-400">Password security:</span>
        <span className={getLabelColor()}>{passwordLength === 0 ? 'Enter password' : strength.label}</span>
      </div>

      <div className="grid grid-cols-4 gap-1.5 h-1.5">
        {[0, 1, 2, 3].map((idx) => (
          <div
            key={idx}
            className={`rounded-full transition-all duration-300 ${getBarColor(idx)}`}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-2 text-[10px] text-slate-400 pt-1">
        <RuleItem valid={strength.hasMinLength} text="8+ chars" />
        <RuleItem valid={strength.hasUppercase} text="Uppercase" />
        <RuleItem valid={strength.hasNumber} text="Number (0-9)" />
        <RuleItem valid={strength.hasSpecialChar} text="Special symbol" />
      </div>
    </div>
  );
};

const RuleItem: React.FC<{ valid: boolean; text: string }> = ({ valid, text }) => (
  <span className={`inline-flex items-center gap-1 ${valid ? 'text-emerald-400' : 'text-slate-500'}`}>
    {valid ? <Check className="w-3 h-3 text-emerald-400 font-bold" /> : <Circle className="w-2.5 h-2.5 text-slate-600" />}
    <span>{text}</span>
  </span>
);
