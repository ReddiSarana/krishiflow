import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  BadgeCheck, 
  Award, 
  MapPin, 
  TreeDeciduous, 
  Landmark, 
  CheckCircle2, 
  Download, 
  Printer, 
  QrCode, 
  FileText, 
  ShieldCheck, 
  Sprout, 
  Layers, 
  Droplets, 
  IndianRupee, 
  Calendar,
  LogOut,
  Sparkles,
  Phone,
  Mail,
  ChevronRight
} from 'lucide-react';
import { Button } from '../ui/Button';

interface FarmerProfileWindowProps {
  onNavigateToCrops: () => void;
}

export const FarmerProfileWindow: React.FC<FarmerProfileWindowProps> = ({ onNavigateToCrops }) => {
  const { user, logout, showToast } = useAuth();
  const { t } = useLanguage();

  const land = user?.landRecord || {
    pattadarPassbookNo: 'T-284910294',
    khataNo: '412',
    surveyNo: '142/A & 142/B',
    district: 'Warangal',
    mandal: 'Narsampet',
    village: 'Chennaraopet',
    totalAcres: 4.5,
    cultivableAcres: 4.2,
    soilType: 'Black Cotton Soil (Regur)',
    waterSource: 'Borewell + Drip Irrigation',
    verifiedVia: 'Telangana Dharani Portal' as const,
    verificationDate: '02 Sep 2026',
    dharaniCertificateId: 'DH-TEL-WGL-2026-89421',
    isVerified: true,
    activeCrops: ['Warangal Teja Chilli', 'Cotton (Kapas)', 'Maize (Mokka Jonna)'],
    rythuBandhuEligible: true,
    rythuBimaEnrolled: true,
    pmKisanDbtActive: true
  };

  const farmerName = user?.name || 'మల్లేశం గౌడ్ (Mallesham Goud)';
  const farmerEmail = user?.email || 'kisan.mallesham@krishiflow.in';
  const farmerPhone = user?.phone || '+91 98490 12345';
  const kisanId = user?.id || 'KISAN-TEL-582910';

  const initials = farmerName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const handlePrintCertificate = () => {
    window.print();
  };

  const handleDownloadPassport = () => {
    showToast(
      'డిజిటల్ ల్యాండ్ పాస్‌పోర్ట్ డౌన్‌లోడ్ అవుతోంది...',
      `Dharani Certificate #${land.dharaniCertificateId} PDF format ready.`,
      'success'
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-slide-up">
      {/* Top Header Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/60 via-slate-950 to-teal-950/40 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-2xl font-black text-white shadow-xl shadow-emerald-500/30 ring-4 ring-emerald-500/20">
              {initials}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-2xl sm:text-3xl font-black text-white">
                  {farmerName}
                </h1>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1">
                  <BadgeCheck className="w-4 h-4 text-emerald-400" />
                  ధరణి ధృవీకరించిన రైతు (Verified Kisan)
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 mt-1">
                <span className="flex items-center gap-1.5 font-mono text-emerald-400">
                  <FileText className="w-3.5 h-3.5" />
                  ID: {kisanId}
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  {land.village}, {land.mandal}, {land.district} జిల్లా
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  {farmerPhone}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrintCertificate}
              leftIcon={<Printer className="w-4 h-4" />}
            >
              సర్టిఫికేట్ ప్రింట్
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleDownloadPassport}
              className="bg-emerald-600 hover:bg-emerald-500 text-white"
              leftIcon={<Download className="w-4 h-4" />}
            >
              డిజిటల్ పాస్‌పోర్ట్
            </Button>
          </div>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Official Digital Land Passport Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-950/80 relative overflow-hidden shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Landmark className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                  తెలంగాణ ధరణి డిజిటల్ ల్యాండ్ పాస్‌పోర్ట్
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
                1-B ROR
              </span>
            </div>

            {/* Passport Data Rows */}
            <div className="space-y-3.5 text-xs">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
                <span className="text-slate-400">పట్టాదారు పాస్‌బుక్ నంబర్ (PPB No.)</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">{land.pattadarPassbookNo}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
                <span className="text-slate-400">ఖాతా సంఖ్య (Khata No.)</span>
                <span className="font-mono font-bold text-white text-sm">{land.khataNo}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
                <span className="text-slate-400">సర్వే నంబర్లు (Survey / Sub-Div)</span>
                <span className="font-mono font-bold text-amber-400 text-sm">{land.surveyNo}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
                <span className="text-slate-400">మొత్తం విస్తీర్ణం (Total Land Extent)</span>
                <span className="font-bold text-white text-sm">{land.totalAcres} ఎకరాలు ({land.cultivableAcres} ఎకరాల సాగు)</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
                <span className="text-slate-400">ధరణి సర్టిఫికేట్ ID</span>
                <span className="font-mono text-emerald-300 text-xs font-semibold">{land.dharaniCertificateId}</span>
              </div>
            </div>

            {/* QR Code & Security Stamp */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-slate-950 border border-emerald-500/30">
                  <QrCode className="w-10 h-10 text-emerald-400" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white">డిజిటల్ వెరిఫికేషన్ QR</div>
                  <div className="text-[10px] text-slate-400">ధరణి రెవెన్యూ ఆర్కైవ్ ద్వారా రక్షించబడింది</div>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-block px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  VERIFIED 2026
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Soil Health, Subsidies & Active Crops */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Soil Classification & Water Security */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-950/80 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <TreeDeciduous className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">భూమి రకం & నీటి వనరుల నివేదిక (Soil & Water Profile)</h3>
              </div>
              <button 
                onClick={onNavigateToCrops}
                className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
              >
                <span>అనుకూల పంటలు చూడండి</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Layers className="w-4 h-4 text-amber-400" />
                  <span>నేల వర్గీకరణ (Soil Type)</span>
                </div>
                <div className="text-sm font-bold text-white">{land.soilType}</div>
                <div className="text-[11px] text-emerald-400">పత్తి, మిర్చి, కందులు సాగుకు అత్యంత అనుకూలం</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Droplets className="w-4 h-4 text-cyan-400" />
                  <span>నీటి పారుదల వసతి (Water Source)</span>
                </div>
                <div className="text-sm font-bold text-white">{land.waterSource}</div>
                <div className="text-[11px] text-cyan-400">మైక్రో-ఇరిగేషన్ డ్రిప్ ద్వారా 45% నీటి ఆదా</div>
              </div>
            </div>
          </div>

          {/* Active Crops Registered */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-950/80 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sprout className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">ప్రస్తుత సాగులో ఉన్న పంటలు (Active Crops on Record)</h3>
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {land.activeCrops.map((crop, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-bold text-xs flex items-center gap-2 shadow-sm"
                >
                  <Sprout className="w-4 h-4 text-emerald-400" />
                  <span>{crop}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Telangana Government Schemes & Subsidies Status */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-950/80 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Landmark className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">ప్రభుత్వ సంక్షేమ పథకాల స్థితి (Direct DBT & Subsidies)</h3>
              </div>
              <span className="text-[10px] text-emerald-400 font-bold px-2 py-0.5 rounded-full bg-emerald-500/10">
                100% అర్హత ధృవీకరణ
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-xs font-bold text-white">రైతు బంధు (Rythu Bandhu)</div>
                <div className="text-xs font-mono font-bold text-emerald-400">₹{(land.totalAcres * 10000).toLocaleString()} / సం.</div>
                <div className="text-[10px] text-slate-400">ఖరీఫ్ & రబీ DBT జమ అవుతుంది</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-xs font-bold text-white">రైతు బీమా (Rythu Bima)</div>
                <div className="text-xs font-mono font-bold text-teal-400">₹5,00,000 కవరేజ్</div>
                <div className="text-[10px] text-slate-400">LIC ప్రీమియం ప్రభుత్వం చెల్లింపు</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-xs font-bold text-white">PM-Kisan సమ్మాన్ నిధి</div>
                <div className="text-xs font-mono font-bold text-amber-400">₹6,000 / సం.</div>
                <div className="text-[10px] text-slate-400">ఆధార్ అనుసంధాన DBT యాక్టివ్</div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              onClick={onNavigateToCrops}
              variant="primary"
              size="lg"
              className="flex-1 justify-center bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold"
              leftIcon={<TreeDeciduous className="w-5 h-5" />}
            >
              తెలంగాణ పంటల డైరెక్టరీని అన్వేషించండి
            </Button>

            <Button
              onClick={logout}
              variant="danger"
              size="lg"
              className="justify-center"
              leftIcon={<LogOut className="w-4 h-4" />}
            >
              సైన్ అవుట్ (Sign Out)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
