import React from 'react';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  description?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, description, className = '', id, ...props }) => {
  const generatedId = id || 'chk_' + Math.random().toString(36).substring(2, 7);

  return (
    <div className="flex items-start gap-2.5">
      <input
        type="checkbox"
        id={generatedId}
        className={`mt-0.5 w-4 h-4 rounded bg-slate-800 border-slate-700 text-emerald-600 focus:ring-emerald-500 focus:ring-offset-slate-900 cursor-pointer ${className}`}
        {...props}
      />
      {(label || description) && (
        <div className="text-xs select-none">
          {label && (
            <label htmlFor={generatedId} className="font-medium text-slate-300 cursor-pointer">
              {label}
            </label>
          )}
          {description && <p className="text-slate-400 mt-0.5 leading-relaxed">{description}</p>}
        </div>
      )}
    </div>
  );
};
