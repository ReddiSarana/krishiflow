import React from 'react';
import { 
  Sprout, 
  Languages, 
  RefreshCw,
  Cpu,
  UserCheck,
  TreeDeciduous
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage, SupportedLanguage } from '../context/LanguageContext';

interface NavbarProps {
  activeTab: 'telangana' | 'auth';
  setActiveTab: (tab: 'telangana' | 'auth') => void;
  onResetDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onResetDemo
}) => {
  const { user } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 bg-slate-950/85">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('telangana')}>
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-amber-400 p-[2px] shadow-lg shadow-emerald-900/30">
              <div className="h-full w-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Sprout className="h-6 w-6 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl sm:text-2xl bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
                  KrishiFlow
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  AgriSlot AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                {t.navTagline}
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden sm:flex items-center space-x-2 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800">
            {/* TELANGANA CROPS TAB */}
            <button
              onClick={() => setActiveTab('telangana')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                activeTab === 'telangana'
                  ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md shadow-teal-900/40 glow-emerald'
                  : 'text-teal-400 hover:text-teal-200 hover:bg-teal-500/10'
              }`}
            >
              <TreeDeciduous className="h-4 w-4 text-teal-300" />
              <span>{t.navTelanganaCrops}</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-teal-400/20 text-teal-200 font-bold">33</span>
            </button>

            {/* AUTH / LOGIN TAB */}
            <button
              onClick={() => setActiveTab('auth')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                activeTab === 'auth'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40 glow-emerald'
                  : 'text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10'
              }`}
            >
              <UserCheck className="h-4 w-4" />
              <span>{user ? `${t.navKisanId}: ${user.name.split(' ')[0]}` : t.navLoginRegister}</span>
            </button>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center space-x-2.5 sm:space-x-4">
            
            {/* Live Engine Badge */}
            <div className="hidden md:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-[11px]">
              <Cpu className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
              <span className="font-mono text-emerald-400 font-semibold">{t.navEngineBadge}</span>
            </div>

            {/* Dynamic Multi-Language Selector */}
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 shadow-inner">
              <Languages className="h-4 w-4 text-emerald-400 shrink-0" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
                aria-label="Select Interface Language"
                className="bg-transparent text-xs font-bold text-emerald-300 focus:outline-none cursor-pointer pr-1"
              >
                <option value="en" className="bg-slate-900 text-slate-100">🇬🇧 English</option>
                <option value="te" className="bg-slate-900 text-emerald-300 font-semibold">🌾 తెలుగు (Telugu)</option>
                <option value="hi" className="bg-slate-900 text-slate-100">🇮🇳 हिन्दी (Hindi)</option>
                <option value="mr" className="bg-slate-900 text-slate-100">🚩 मराठी (Marathi)</option>
                <option value="pa" className="bg-slate-900 text-slate-100">🌾 ਪੰਜਾਬੀ (Punjabi)</option>
              </select>
            </div>

            {/* Sign In / Register Quick Access Button */}
            <button
              onClick={() => setActiveTab('auth')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-md ${
                user
                  ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-900/60'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-emerald-900/40 glow-emerald'
              }`}
            >
              <UserCheck className="h-4 w-4" />
              <span>{user ? user.name.split(' ')[0] : t.navLoginRegister}</span>
            </button>

            {/* Reset Demo Button */}
            <button
              onClick={onResetDemo}
              title={t.navResetDemo}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-emerald-400 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="flex sm:hidden overflow-x-auto py-2.5 space-x-2 border-t border-slate-800/80 no-scrollbar">
          <button
            onClick={() => setActiveTab('telangana')}
            className={`flex-1 flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
              activeTab === 'telangana' ? 'bg-teal-600 text-white' : 'bg-slate-900 text-teal-400'
            }`}
          >
            <TreeDeciduous className="h-3.5 w-3.5" />
            <span>{t.navTelanganaCrops}</span>
          </button>
          <button
            onClick={() => setActiveTab('auth')}
            className={`flex-1 flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
              activeTab === 'auth' ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-emerald-400'
            }`}
          >
            <UserCheck className="h-3.5 w-3.5" />
            <span>{t.navLoginRegister}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
