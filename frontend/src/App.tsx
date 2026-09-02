import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { AuthPortal } from './components/auth/AuthPortal';
import { TelanganaCropsWindow } from './components/TelanganaCropsWindow';
import { FarmerProfileWindow } from './components/profile/FarmerProfileWindow';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export function AppContent() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'crops' | 'profile' | 'auth'>('auth');
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'alert' } | null>(null);

  // Synchronize active tab based on user auth status
  useEffect(() => {
    if (user && user.landRecord?.isVerified) {
      if (activeTab === 'auth') {
        setActiveTab('crops');
      }
    } else {
      setActiveTab('auth');
    }
  }, [user]);

  const showToast = (text: string, type: 'success' | 'info' | 'alert' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleResetDemo = () => {
    showToast('తెలంగాణ పంటల సమాచారం & మార్కెట్ ధరలు తాజాకరించబడ్డాయి.', 'info');
  };

  const isUserVerified = Boolean(user && user.landRecord?.isVerified);

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
        
        {/* If Not Authenticated or Land Not Verified, Show Auth Portal (Sign In / Register / Land Verification) */}
        {!isUserVerified || activeTab === 'auth' ? (
          <AuthPortal />
        ) : (
          <>
            {/* Authenticated Tab 1: Telangana Crops & Flora Window */}
            {activeTab === 'crops' && (
              <TelanganaCropsWindow
                onSelectCropForBooking={(cropName) => {
                  setActiveTab('profile');
                  showToast(`${cropName} ఎంపిక చేయబడింది. మీ రైతు ప్రొఫైల్ & సాగు విస్తీర్ణంలో నమోదు చేయండి!`, 'info');
                }}
              />
            )}

            {/* Authenticated Tab 2: Farmer Profile & Land Passport Window */}
            {activeTab === 'profile' && (
              <FarmerProfileWindow
                onNavigateToCrops={() => setActiveTab('crops')}
              />
            )}
          </>
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
            <span>&bull; తెలంగాణ వ్యవసాయ & ఉద్యానవన పంటల విజ్ఞాన వేదిక</span>
          </div>
          <div>
            33 జిల్లాల పంటల సమాచారం &bull; ధరణి భూమి ధృవీకరణ &bull; డిజిటల్ కిసాన్ పాస్‌పోర్ట్
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
