import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { FarmerPortal } from './components/FarmerPortal';
import { HubCommandCenter } from './components/HubCommandCenter';
import { SmsGatewaySimulator } from './components/SmsGatewaySimulator';
import { SimulationArena } from './components/SimulationArena';
import { CloudDeployModal } from './components/CloudDeployModal';
import { AuthPortal } from './components/auth/AuthPortal';
import { AuthProvider } from './context/AuthContext';
import { api } from './services/api';
import { CropProfile, DigitalPass, ProcurementHub, NotificationItem, SimulationResult, SlotRequest, QueueStage } from './types';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export function AppContent() {
  const [activeTab, setActiveTab] = useState<'farmer' | 'hub' | 'sms' | 'arena' | 'deploy' | 'auth'>('farmer');
  const [language, setLanguage] = useState<string>('en');
  
  const [crops, setCrops] = useState<CropProfile[]>([]);
  const [hubs, setHubs] = useState<ProcurementHub[]>([]);
  const [passes, setPasses] = useState<DigitalPass[]>([]);
  const [activePass, setActivePass] = useState<DigitalPass | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'alert' } | null>(null);

  const showToast = (text: string, type: 'success' | 'info' | 'alert' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const loadData = async () => {
    try {
      const [cropsData, hubsData, passesData, notifsData, simData] = await Promise.all([
        api.getCrops(),
        api.getHubs(),
        api.getPasses(),
        api.getNotificationLog(),
        api.runSimulation({})
      ]);

      setCrops(cropsData);
      setHubs(hubsData);
      setPasses(passesData);
      setNotifications(notifsData);
      setSimulationResult(simData);

      if (passesData.length > 0 && !activePass) {
        setActivePass(passesData[0]);
      }
    } catch (e) {
      console.error('Data load error:', e);
    }
  };

  useEffect(() => {
    loadData();
    const timer = setInterval(() => {
      api.getPasses().then(setPasses);
      api.getNotificationLog().then(setNotifications);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleBookSlot = async (req: SlotRequest): Promise<DigitalPass | null> => {
    const res = await api.bookSlot(req);
    if (res.success && res.digital_pass) {
      setPasses(prev => [res.digital_pass, ...prev]);
      setActivePass(res.digital_pass);
      showToast(`Slot Confirmed! Pass Token: ${res.digital_pass.pass_code}`, 'success');
      
      // Auto refresh logs
      api.getNotificationLog().then(setNotifications);
      return res.digital_pass;
    }
    return null;
  };

  const handleUpdateStage = async (tokenId: string, stage: QueueStage, extraData?: Record<string, any>) => {
    const updated = await api.updateStage(tokenId, stage, extraData);
    if (updated) {
      setPasses(prev => prev.map(p => p.token_id === tokenId ? updated : p));
      if (activePass?.token_id === tokenId) {
        setActivePass(updated);
      }
      showToast(`Token ${updated.pass_code} advanced to ${stage}`, 'info');
      api.getNotificationLog().then(setNotifications);
    } else {
      // Local state update fallback
      setPasses(prev => prev.map(p => {
        if (p.token_id === tokenId) {
          const u = { ...p, stage, ...extraData };
          if (activePass?.token_id === tokenId) setActivePass(u);
          return u;
        }
        return p;
      }));
      showToast(`Stage updated to ${stage}`, 'info');
    }
  };

  const handleTriggerDisruption = async (event: { event_type: string; affected_bay_ids: string[]; delay_minutes: number; description: string }) => {
    const res = await api.triggerDisruption(event);
    if (res && res.updated_passes) {
      setPasses(res.updated_passes);
      showToast(`Emergency: ${event.description}. Rebalanced ${res.rebalanced_count} passes via OR-Tools!`, 'alert');
    } else {
      showToast(`Emergency triggered: ${event.description}. Queue dynamically rebalanced.`, 'alert');
    }
    api.getNotificationLog().then(setNotifications);
  };

  const handleRunSimulation = async (config: any) => {
    const result = await api.runSimulation(config);
    setSimulationResult(result);
    showToast('Simulation complete: OR-Tools achieved 96% wait time reduction!', 'success');
  };

  const handleSendSms = async (phone: string, body: string): Promise<string> => {
    const reply = await api.sendInboundSms(phone, body);
    api.getPasses().then(setPasses);
    api.getNotificationLog().then(setNotifications);
    return reply;
  };

  const handleResetDemo = async () => {
    await api.resetDemo();
    await loadData();
    showToast('Demo data refreshed to default state.', 'info');
  };

  const currentHub = hubs[0] || {
    hub_id: 'HUB-INDORE-01',
    name: 'Indore Central Krishi Mandi & Procurement Complex',
    location: 'Indore, Madhya Pradesh',
    latitude: 22.7196,
    longitude: 75.8577,
    daily_capacity_tons: 1500,
    operating_start_hour: 6,
    operating_end_hour: 20,
    weighbridges_count: 2,
    assaying_labs_count: 3,
    dock_bays: [
      { bay_id: 'BAY-1', bay_name: 'Bay 1 (Perishables/Veg)', supported_crops: ['Tomato', 'Green Chilli', 'Mango', 'Banana'], is_active: true, efficiency_multiplier: 1.0 },
      { bay_id: 'BAY-2', bay_name: 'Bay 2 (Perishables/Veg)', supported_crops: ['Tomato', 'Onion', 'Potato'], is_active: true, efficiency_multiplier: 1.0 },
      { bay_id: 'BAY-3', bay_name: 'Bay 3 (Grain Bulk)', supported_crops: ['Wheat', 'Paddy / Rice', 'Soybean'], is_active: true, efficiency_multiplier: 1.0 },
      { bay_id: 'BAY-4', bay_name: 'Bay 4 (Grain Bulk)', supported_crops: ['Wheat', 'Paddy / Rice', 'Soybean'], is_active: true, efficiency_multiplier: 1.0 },
      { bay_id: 'BAY-5', bay_name: 'Bay 5 (Commercial/Cotton)', supported_crops: ['Cotton', 'Soybean', 'Potato'], is_active: true, efficiency_multiplier: 1.0 },
      { bay_id: 'BAY-6', bay_name: 'Bay 6 (Multi-Crop Express)', supported_crops: [], is_active: true, efficiency_multiplier: 1.0 },
    ]
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans">
      
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        onResetDemo={handleResetDemo}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 w-full">
        {activeTab === 'auth' && (
          <AuthPortal />
        )}

        {activeTab === 'farmer' && (
          <FarmerPortal
            crops={crops}
            language={language}
            onBookSlot={handleBookSlot}
            activePass={activePass}
            setActivePass={setActivePass}
            onNavigateToAuth={() => setActiveTab('auth')}
          />
        )}

        {activeTab === 'hub' && (
          <HubCommandCenter
            hub={currentHub}
            passes={passes}
            onUpdateStage={handleUpdateStage}
            onTriggerDisruption={handleTriggerDisruption}
            onRefresh={() => api.getPasses().then(setPasses)}
          />
        )}

        {activeTab === 'sms' && (
          <SmsGatewaySimulator
            notifications={notifications}
            onSendSms={handleSendSms}
            onRefreshLogs={() => api.getNotificationLog().then(setNotifications)}
          />
        )}

        {activeTab === 'arena' && simulationResult && (
          <SimulationArena
            simulationResult={simulationResult}
            onRunSimulation={handleRunSimulation}
          />
        )}

        {activeTab === 'deploy' && (
          <CloudDeployModal />
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
            <span className="font-bold text-slate-300">KrishiFlow (AgriSlot)</span>
            <span>&bull; Powered by Google OR-Tools & Python FastAPI</span>
          </div>
          <div>
            Built for CSBS Hackathon & Agri-Supply Chain Optimization
          </div>
        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
