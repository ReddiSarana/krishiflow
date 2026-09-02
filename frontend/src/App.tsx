import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { AuthPortal } from './components/auth/AuthPortal';
import { TelanganaCropsWindow } from './components/TelanganaCropsWindow';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export function AppContent() {
  const [activeTab, setActiveTab] = useState<'telangana' | 'auth'>('telangana');
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'alert' } | null>(null);

  const showToast = (text: string, type: 'success' | 'info' | 'alert' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleResetDemo = () => {
    showToast('Telangana Agri-Directory refreshed to latest market benchmark data.', 'info');
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans">
      
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onResetDemo={handleResetDemo}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 w-full">
        {activeTab === 'telangana' && (
          <TelanganaCropsWindow
            onSelectCropForBooking={(cropName) => {
              setActiveTab('auth');
              showToast(`Pre-selected ${cropName}. Please sign in with your Kisan ID to confirm delivery slot!`, 'info');
            }}
          />
        )}

        {activeTab === 'auth' && (
          <AuthPortal />
        )}
      </main>

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className={`px-4 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 text-xs font-bold border backdrop-blur-md ${
            toastMessage.type === 'alert'
              ? 'bg-rose-950/90 text-rose-200 border-rose-500/40 shadow-rose-950/50'
              : toastMessage.type === 'info'
              ? 'bg-cyan-950/90 text-cyan-200 border-cyan-500/40 shadow-cyan-950/50'
              : 'bg-emerald-950/90 text-emerald-200 border-emerald-500/40 shadow-emerald-950/50'
          }`}>
            {toastMessage.type === 'alert' ? (
              <AlertCircle className="h-4 w-4 text-rose-400" />
            ) : (
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            )}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="glass-panel border-t border-slate-900 py-6 text-center text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-300">KrishiFlow</span>
            <span>&bull; Telangana Agri-Horticulture & Flora Intelligence Portal</span>
          </div>
          <div>
            Built for 33 Districts of Telangana & Direct Farmer Value Discovery
          </div>
        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}
