import React from 'react';
import { Sprout } from 'lucide-react';

interface MobileAuthLayoutProps {
  children: React.ReactNode;
}

export const MobileAuthLayout: React.FC<MobileAuthLayoutProps> = ({ children }) => {
  return (
    <div className="w-full flex flex-col justify-between min-h-[580px] p-4 sm:p-6 bg-slate-900/95">
      <div className="flex items-center justify-between pb-3.5 mb-2 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md">
            <Sprout className="w-4 h-4" />
          </div>
          <div>
            <span className="text-sm font-bold text-white tracking-tight">KrishiFlow</span>
            <span className="text-[10px] text-emerald-400 block -mt-1 font-medium">Kisan Portal</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            हिंदी / EN
          </span>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center py-2">
        {children}
      </div>

      <div className="pt-4 mt-4 border-t border-slate-800 text-center">
        <p className="text-[10px] text-slate-500">
          🌾 KrishiFlow • National Smart Agriculture Gateway
        </p>
      </div>
    </div>
  );
};
