import React from 'react';
import { 
  Sprout, 
  Warehouse, 
  Smartphone, 
  Award, 
  Cloud, 
  Languages, 
  RefreshCw,
  Cpu,
  UserCheck,
  TreeDeciduous
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  activeTab: 'farmer' | 'telangana' | 'hub' | 'sms' | 'arena' | 'deploy' | 'auth';
  setActiveTab: (tab: 'farmer' | 'telangana' | 'hub' | 'sms' | 'arena' | 'deploy' | 'auth') => void;
  language: string;
  setLanguage: (lang: string) => void;
  onResetDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  onResetDemo
}) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 bg-slate-950/85">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('farmer')}>
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
                Dynamic Agri-Logistics & Telangana Crops Knowledge Explorer
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden lg:flex items-center space-x-1 p-1 rounded-2xl bg-slate-900/90 border border-slate-800">
            <button
              onClick={() => setActiveTab('farmer')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                activeTab === 'farmer'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40 glow-emerald'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Sprout className="h-4 w-4" />
              <span>Farmer PWA</span>
            </button>

            {/* NEW TELANGANA CROPS TAB */}
            <button
              onClick={() => setActiveTab('telangana')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                activeTab === 'telangana'
                  ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md shadow-teal-900/40 glow-emerald'
                  : 'text-teal-400 hover:text-teal-200 hover:bg-teal-500/10'
              }`}
            >
              <TreeDeciduous className="h-4 w-4 text-teal-300" />
              <span>🌾 Telangana Crops</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-teal-400/20 text-teal-200">33 Districts</span>
            </button>

            <button
              onClick={() => setActiveTab('hub')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                activeTab === 'hub'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40 glow-emerald'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Warehouse className="h-4 w-4" />
              <span>Hub Command Center</span>
            </button>

            <button
              onClick={() => setActiveTab('sms')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                activeTab === 'sms'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40 glow-emerald'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Smartphone className="h-4 w-4" />
              <span>WhatsApp / SMS Bot</span>
            </button>

            <button
              onClick={() => setActiveTab('arena')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                activeTab === 'arena'
                  ? 'bg-gradient-to-r from-amber-500 to-emerald-500 text-white shadow-md shadow-amber-900/40 glow-amber'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Award className="h-4 w-4 text-amber-300" />
              <span>CSBS Judge Arena</span>
            </button>

            <button
              onClick={() => setActiveTab('auth')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                activeTab === 'auth'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40 glow-emerald'
                  : 'text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10'
              }`}
            >
              <UserCheck className="h-4 w-4" />
              <span>{user ? `Kisan ID: ${user.name.split(' ')[0]}` : 'Login / Register'}</span>
            </button>

            <button
              onClick={() => setActiveTab('deploy')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                activeTab === 'deploy'
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-900/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Cloud className="h-4 w-4 text-cyan-400" />
              <span>Cloud Deploy</span>
            </button>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center space-x-2.5 sm:space-x-4">
            
            {/* Live Engine Badge */}
            <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-[11px]">
              <Cpu className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
              <span className="font-mono text-emerald-400 font-semibold">OR-Tools CP-SAT</span>
            </div>

            {/* Language Selector */}
            <div className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
              <Languages className="h-4 w-4 text-emerald-400" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                aria-label="Select Interface Language"
                className="bg-transparent text-xs font-medium text-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="en" className="bg-slate-900 text-slate-200">English</option>
                <option value="hi" className="bg-slate-900 text-slate-200">हिन्दी (Hindi)</option>
                <option value="te" className="bg-slate-900 text-slate-200">తెలుగు (Telugu)</option>
                <option value="mr" className="bg-slate-900 text-slate-200">मराठी (Marathi)</option>
                <option value="pa" className="bg-slate-900 text-slate-200">ਪੰਜਾਬੀ (Punjabi)</option>
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
              <span>{user ? user.name.split(' ')[0] : 'Sign In / Register'}</span>
            </button>

            {/* Reset Demo Button */}
            <button
              onClick={onResetDemo}
              title="Reset Live Demo Dataset"
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-emerald-400 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="flex lg:hidden overflow-x-auto py-2.5 space-x-2 border-t border-slate-800/80 no-scrollbar">
          <button
            onClick={() => setActiveTab('farmer')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
              activeTab === 'farmer' ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-300'
            }`}
          >
            <Sprout className="h-3.5 w-3.5" />
            <span>Farmer PWA</span>
          </button>
          <button
            onClick={() => setActiveTab('telangana')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
              activeTab === 'telangana' ? 'bg-teal-600 text-white' : 'bg-slate-900 text-teal-400'
            }`}
          >
            <TreeDeciduous className="h-3.5 w-3.5" />
            <span>🌾 Telangana Crops</span>
          </button>
          <button
            onClick={() => setActiveTab('auth')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
              activeTab === 'auth' ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-emerald-400'
            }`}
          >
            <UserCheck className="h-3.5 w-3.5" />
            <span>Login / Register</span>
          </button>
          <button
            onClick={() => setActiveTab('hub')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
              activeTab === 'hub' ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-300'
            }`}
          >
            <Warehouse className="h-3.5 w-3.5" />
            <span>Hub Manager</span>
          </button>
          <button
            onClick={() => setActiveTab('sms')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
              activeTab === 'sms' ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-300'
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" />
            <span>WhatsApp Bot</span>
          </button>
          <button
            onClick={() => setActiveTab('arena')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
              activeTab === 'arena' ? 'bg-amber-600 text-white' : 'bg-slate-900 text-slate-300'
            }`}
          >
            <Award className="h-3.5 w-3.5" />
            <span>Judge Arena</span>
          </button>
          <button
            onClick={() => setActiveTab('deploy')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
              activeTab === 'deploy' ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-300'
            }`}
          >
            <Cloud className="h-3.5 w-3.5" />
            <span>Cloud Deploy</span>
          </button>
        </div>
      </div>
    </header>
  );
};
