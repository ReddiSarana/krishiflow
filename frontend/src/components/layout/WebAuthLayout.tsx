import React from 'react';
import { Sprout, ShieldCheck, TrendingUp, Droplets } from 'lucide-react';

interface WebAuthLayoutProps {
  children: React.ReactNode;
}

export const WebAuthLayout: React.FC<WebAuthLayoutProps> = ({ children }) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 min-h-[640px] backdrop-blur-xl">
      {/* Left Branded Showcase Panel */}
      <div className="hidden lg:flex lg:col-span-5 relative bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950 p-8 sm:p-10 flex-col justify-between overflow-hidden border-r border-slate-800/80">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-semibold mb-6">
            <Sprout className="w-3.5 h-3.5 text-emerald-400" />
            <span>KrishiFlow Smart Agri-Ecosystem</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight leading-tight">
            Dynamic Agri-Logistics & Queue Management.
          </h2>
          <p className="text-slate-400 text-sm mt-3 leading-relaxed">
            Eliminate mandi congestion, book smart dock slots, and track real-time crop unloading.
          </p>
        </div>

        <div className="relative z-10 space-y-3 my-6">
          <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-sm">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white">OR-Tools AI Queue Optimization</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">96% reduction in farmer wait time with priority bay routing.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-sm">
            <div className="p-2 rounded-xl bg-teal-500/20 text-teal-400">
              <Droplets className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white">Zero Perishable Spoilage</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Fast-track perishable crops with automated expiry prevention.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-sm">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white">QR Digital Dispatch Pass</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Instant gate check-in and weighbridge integration.</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-4 border-t border-slate-800/80">
          <p className="text-xs text-slate-300 italic">
            "We cut mandi queue times from 6 hours to 25 minutes using KrishiFlow digital passes."
          </p>
          <div className="flex items-center gap-2.5 mt-2.5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center text-[10px] font-bold text-slate-950">
              RP
            </div>
            <div>
              <div className="text-xs font-semibold text-white">Ramesh Patel</div>
              <div className="text-[10px] text-slate-400">GreenHarvest Farmer Producer Org</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Content / Form View */}
      <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center max-w-xl mx-auto w-full">
        {children}
      </div>
    </div>
  );
};
