import React, { useState } from 'react';
import { 
  Smartphone, 
  Send, 
  Bot, 
  MessageSquare, 
  CheckCheck, 
  Globe, 
  Sparkles, 
  RefreshCw,
  BellRing,
  Share2
} from 'lucide-react';
import { NotificationItem } from '../types';

interface SmsGatewaySimulatorProps {
  notifications: NotificationItem[];
  onSendSms: (phone: string, body: string) => Promise<string>;
  onRefreshLogs: () => void;
}

export const SmsGatewaySimulator: React.FC<SmsGatewaySimulatorProps> = ({
  notifications,
  onSendSms,
  onRefreshLogs
}) => {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string; time: string; card?: any }>>([
    {
      sender: 'bot',
      text: '🌾 Namaste! Welcome to KrishiFlow Automated Mandi Gateway.\n\nSend commands:\n1️⃣ BOOK <CROP> <QTY> <VILLAGE>\n2️⃣ STATUS <TOKEN_CODE>\n3️⃣ DELAY <MINUTES>',
      time: '08:00 AM'
    },
    {
      sender: 'user',
      text: 'BOOK TOMATO 40 SANWER',
      time: '08:02 AM'
    },
    {
      sender: 'bot',
      text: '🌾 [KrishiFlow] Slot Confirmed! Token: KRISHI-1001.\nCrop: Tomato (40 Qtl).\nAssigned: Bay 1 (Perishables), Indore Mandi.\nSlot: 09:15 AM - 09:55 AM.\nSuggested Departure: 08:35 AM from Sanwer.\n\nTap below to view live QR Pass.',
      time: '08:02 AM',
      card: {
        token: 'KRISHI-1001',
        crop: 'Tomato',
        slot: '09:15 AM',
        bay: 'Bay 1'
      }
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [appMode, setAppMode] = useState<'whatsapp' | 'sms'>('whatsapp');

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputVal;
    if (!query.trim()) return;

    const userMsg = {
      sender: 'user' as const,
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputVal('');
    setIsTyping(true);

    try {
      const reply = await onSendSms('+919826044921', query);
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            sender: 'bot',
            text: reply,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        setIsTyping(false);
        onRefreshLogs();
      }, 600);
    } catch (e) {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2 border border-emerald-500/30">
              <Bot className="h-3.5 w-3.5" />
              <span>Twilio SMS & Meta WhatsApp Cloud API Integration</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Two-Way Multilingual Messaging Gateway
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Enables rural farmers with basic feature phones or smartphones to book slots, receive alerts, and verify QR passes via SMS & WhatsApp.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center space-x-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 self-start md:self-auto">
            <button
              onClick={() => setAppMode('whatsapp')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                appMode === 'whatsapp' ? 'bg-emerald-600 text-white shadow-md glow-emerald' : 'text-slate-400 hover:text-white'
              }`}
            >
              WhatsApp Bot
            </button>
            <button
              onClick={() => setAppMode('sms')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                appMode === 'sms' ? 'bg-emerald-600 text-white shadow-md glow-emerald' : 'text-slate-400 hover:text-white'
              }`}
            >
              Feature Phone SMS
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Smartphone Simulator UI */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-[360px] h-[640px] rounded-[44px] bg-slate-950 border-[6px] border-slate-800 shadow-2xl overflow-hidden flex flex-col relative ring-1 ring-slate-700">
            
            {/* Phone Notch */}
            <div className="h-6 bg-slate-950 flex items-center justify-between px-6 text-[10px] text-slate-400 font-semibold pt-1">
              <span>09:41</span>
              <div className="h-3.5 w-16 bg-slate-900 rounded-full" />
              <span>5G 98%</span>
            </div>

            {/* App Header */}
            <div className={`p-3.5 flex items-center justify-between border-b ${
              appMode === 'whatsapp' ? 'bg-emerald-900/90 border-emerald-800 text-white' : 'bg-slate-900 border-slate-800 text-white'
            }`}>
              <div className="flex items-center space-x-2.5">
                <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-xs text-white">
                  KF
                </div>
                <div>
                  <h4 className="text-xs font-bold">KrishiFlow Mandi Bot</h4>
                  <span className="text-[10px] text-emerald-200 block">Official Verified Channel</span>
                </div>
              </div>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-950/80">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-xs whitespace-pre-line leading-relaxed shadow-sm ${
                      m.sender === 'user'
                        ? 'bg-emerald-600 text-white rounded-tr-none'
                        : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-tl-none'
                    }`}
                  >
                    {m.text}

                    {m.card && (
                      <div className="mt-2.5 pt-2.5 border-t border-slate-800/80 space-y-1.5">
                        <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                          <span className="text-[10px] font-mono text-emerald-400 font-bold">{m.card.token}</span>
                          <span className="text-[10px] text-slate-400">{m.card.bay}</span>
                        </div>
                        <button className="w-full py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold text-[10px] border border-emerald-500/30 flex items-center justify-center space-x-1">
                          <Share2 className="h-3 w-3" />
                          <span>View Digital QR Pass</span>
                        </button>
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] text-slate-500 mt-1 px-1">{m.time}</span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center space-x-1.5 p-2 rounded-2xl bg-slate-900 text-slate-400 text-xs w-20">
                  <div className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-bounce" />
                  <div className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
            </div>

            {/* Quick Command Chips */}
            <div className="p-2 bg-slate-900 border-t border-slate-800 flex space-x-1.5 overflow-x-auto no-scrollbar">
              <button
                onClick={() => handleSend('BOOK TOMATO 50 SANWER')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-semibold whitespace-nowrap"
              >
                + Book Tomato (50 Qtl)
              </button>
              <button
                onClick={() => handleSend('BOOK PADDY 60 NIZAMABAD')}
                className="px-2.5 py-1 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-500/30 text-emerald-300 text-[10px] font-semibold whitespace-nowrap"
              >
                🌾 ధాన్యం బుకింగ్ (Paddy)
              </button>
              <button
                onClick={() => handleSend('STATUS KRISHI-1001')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-semibold whitespace-nowrap"
              >
                🔍 స్థితి తనిఖీ (Status)
              </button>
              <button
                onClick={() => handleSend('DELAY 30')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-semibold whitespace-nowrap"
              >
                ⏳ ఆలస్యం (Delay)
              </button>
            </div>

            {/* Chat Input Bar */}
            <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center space-x-2">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type SMS command (e.g. BOOK WHEAT 60)..."
                className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs outline-none focus:border-emerald-500"
              />
              <button
                onClick={() => handleSend()}
                className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Right: Live Notification Dispatch Audit Stream */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <BellRing className="h-5 w-5 text-emerald-400" />
                <h3 className="font-bold text-lg text-white">Live Automated Dispatch Feed</h3>
              </div>
              <button
                onClick={onRefreshLogs}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400"
                title="Refresh logs"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Automated alerts dispatched in real-time by the backend on slot bookings, dock calls, delays, and DBT payments.
            </p>

            <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                        {n.channel}
                      </span>
                      <span className="text-xs font-bold text-white">{n.recipient_name}</span>
                      <span className="text-[11px] text-slate-400 font-mono">({n.recipient_phone})</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium">{n.timestamp}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                    {n.message}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span className="flex items-center space-x-1 text-emerald-400">
                      <CheckCheck className="h-3.5 w-3.5" />
                      <span>{n.status} via Twilio / Meta API</span>
                    </span>
                    <span className="text-slate-500 font-mono">Lang: {n.language}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
