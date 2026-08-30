import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Truck, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles, 
  Calendar, 
  FileCheck, 
  IndianRupee, 
  ArrowRight,
  ShieldCheck,
  Compass,
  Download,
  Share2
} from 'lucide-react';
import { CropType, VehicleType, SlotRequest, DigitalPass, CropProfile } from '../types';

interface FarmerPortalProps {
  crops: CropProfile[];
  language: string;
  onBookSlot: (req: SlotRequest) => Promise<DigitalPass | null>;
  activePass: DigitalPass | null;
  setActivePass: (pass: DigitalPass | null) => void;
}

const UI_TEXT = {
  en: {
    title: 'Farmer Procurement Booking Portal',
    subtitle: 'Dynamic AI-Scheduled Drop-off Slot & Digital Krishi-Pass',
    farmerName: 'Farmer Full Name',
    phone: 'Mobile Number (WhatsApp/SMS)',
    village: 'Village / Origin Location',
    cropType: 'Crop to Procure',
    quantity: 'Quantity (Quintals)',
    vehicle: 'Transport Vehicle',
    distance: 'Distance to Procurement Hub (KM)',
    travelEst: 'Estimated Transit Time',
    preferredHour: 'Preferred Arrival Window',
    bookBtn: 'Generate AI-Optimized Slot & Pass',
    booking: 'Calculating Multi-Dock Constraints with OR-Tools...',
    passTitle: 'Official Digital Krishi-Pass (Token)',
    bayAssigned: 'Assigned Dock Bay',
    slotTime: 'Scheduled Arrival Window',
    departureAdvisory: 'Smart Departure Advisory',
    departBy: 'Start journey from farm by',
    spoilageProtection: 'Perishability Priority Rating',
    stageTracker: 'Live Procurement Lifecycle Tracker',
    payoutEst: 'Estimated Direct Benefit Transfer (DBT)',
    offlineReady: 'Saved for 100% Offline Gate Entry',
    stages: ['Scheduled at Farm', 'Gate Entry', 'Weighbridge (Gross)', 'Assaying Lab', 'Dock Unloading', 'DBT Payment']
  },
  hi: {
    title: 'किसान उपज स्लॉट बुकिंग पोर्टल',
    subtitle: 'एआई-संचालित सटीक समय स्लॉट एवं डिजिटल कृषि-पास',
    farmerName: 'किसान का पूरा नाम',
    phone: 'मोबाइल नंबर (व्हाट्सएप/एसएमएस)',
    village: 'गांव / मूल स्थान',
    cropType: 'उपज / फसल का प्रकार',
    quantity: 'मात्रा (क्विंटल में)',
    vehicle: 'परिवहन वाहन',
    distance: 'मंडी/गोदाम से दूरी (कि.मी.)',
    travelEst: 'अनुमानित यात्रा समय',
    preferredHour: 'पसंदीदा आगमन समय',
    bookBtn: 'एआई-अनुकूलित स्लॉट व पास बनाएं',
    booking: 'ओआर-टूल्स द्वारा स्लॉट की गणना हो रही है...',
    passTitle: 'डिजिटल कृषि-पास (टोकन)',
    bayAssigned: 'आवंटित अनलोडिंग बे',
    slotTime: 'मंडी आगमन का समय',
    departureAdvisory: 'यात्रा प्रस्थान सुझाव',
    departBy: 'खेत से रवाना होने का सही समय',
    spoilageProtection: 'सड़न/खराबी सुरक्षा रेटिंग',
    stageTracker: 'लाइव प्रक्रिया ट्रैकर',
    payoutEst: 'अनुमानित प्रत्यक्ष लाभ अंतरण (DBT राशि)',
    offlineReady: 'ऑफ़लाइन गेट एंट्री के लिए सुरक्षित',
    stages: ['खेत पर शेड्यूल', 'गेट आगमन', 'वे-ब्रिज (वजन)', 'गुणवत्ता जांच', 'बे अनलोडिंग', 'डीबीटी भुगतान']
  },
  te: {
    title: 'రైతు ప్రొక్యూర్మెంట్ బుకింగ్ పోర్టల్',
    subtitle: 'ఏఐ ఆధారిత డ్రాప్-ఆఫ్ స్లాట్ & డిజిటల్ కృషి-పాస్',
    farmerName: 'రైతు పూర్తి పేరు',
    phone: 'మొబైల్ నంబర్ (WhatsApp/SMS)',
    village: 'గ్రామం / ప్రదేశం',
    cropType: 'పంట రకం',
    quantity: 'పరిమాణం (క్వింటాళ్లలో)',
    vehicle: 'రవాణా వాహనం',
    distance: 'హబ్ నుండి దూరం (కి.మీ.)',
    travelEst: 'ప్రయాణ సమయం',
    preferredHour: 'ప్రాధాన్యత సమయం',
    bookBtn: 'స్లాట్ & పాస్ రూపొందించండి',
    booking: 'స్లాట్ లెక్కిస్తోంది...',
    passTitle: 'డిజిటల్ కృషి-పాస్ (టోకెన్)',
    bayAssigned: 'కేటాయించిన బే',
    slotTime: 'రాక సమయం',
    departureAdvisory: 'ప్రయాణ సలహా',
    departBy: 'బయలుదేరాల్సిన సమయం',
    spoilageProtection: 'నాణ్యత భద్రతా రేటింగ్',
    stageTracker: 'ప్రత్యక్ష పురోగతి',
    payoutEst: 'అంచనా వేసిన చెల్లింపు (DBT)',
    offlineReady: 'ఆఫ్‌లైన్ ఎంట్రీ సిద్ధం',
    stages: ['షెడ్యూల్ చేయబడింది', 'గేట్ ఎంట్రీ', 'తూకం', 'నాణ్యత పరీక్ష', 'అన్‌లోడింగ్', 'చెల్లింపు']
  },
  mr: {
    title: 'शेतकरी खरेदी स्लॉट बुकिंग पोर्टल',
    subtitle: 'एआय-आधारित अचूक वेळ स्लॉट आणि डिजिटल कृषी-पास',
    farmerName: 'शेतकऱ्याचे पूर्ण नाव',
    phone: 'मोबाईल क्रमांक (WhatsApp/SMS)',
    village: 'गाव / ठिकाण',
    cropType: 'पिकाचा प्रकार',
    quantity: 'प्रमाण (क्विंटल)',
    vehicle: 'वाहन प्रकार',
    distance: 'खरेदी केंद्रापासून अंतर (किमी)',
    travelEst: 'प्रवासाची अंदाजे वेळ',
    preferredHour: 'पसंतीची वेळ',
    bookBtn: 'एआय स्लॉट व पास मिळवा',
    booking: 'स्लॉट शोधत आहे...',
    passTitle: 'डिजिटल कृषी-पास (टोकन)',
    bayAssigned: 'नेमून दिलेली अनलोडिंग बे',
    slotTime: 'आगमनाची वेळ',
    departureAdvisory: 'प्रवास सूचना',
    departBy: 'घरावरून निघण्याची वेळ',
    spoilageProtection: 'नासाडी संरक्षण रेटिंग',
    stageTracker: 'थेट प्रक्रिया स्थिती',
    payoutEst: 'अंदाजे डीबीटी रक्कम',
    offlineReady: 'ऑफलाईन वापरासाठी उपलब्ध',
    stages: ['शेड्यूल झाले', 'गेट आगमन', 'वजन काटा', 'गुणवत्ता चाचणी', 'अनलोडिंग', 'डीबीटी पेमेंट']
  },
  pa: {
    title: 'ਕਿਸਾਨ ਖਰੀਦ ਸਲਾਟ ਬੁਕਿੰਗ ਪੋਰਟਲ',
    subtitle: 'ਏਆਈ-ਅਧਾਰਿਤ ਸਲਾਟ ਅਤੇ ਡਿਜੀਟਲ ਕ੍ਰਿਸ਼ੀ-ਪਾਸ',
    farmerName: 'ਕਿਸਾਨ ਦਾ ਨਾਮ',
    phone: 'ਮੋਬਾਈਲ ਨੰਬਰ',
    village: 'ਪਿੰਡ / ਥਾਂ',
    cropType: 'ਫਸਲ ਦੀ ਕਿਸਮ',
    quantity: 'ਮਾਤਰਾ (ਕੁਇੰਟਲ)',
    vehicle: 'ਵਾਹਨ ਦੀ ਕਿਸਮ',
    distance: 'ਮੰਡੀ ਤੋਂ ਦੂਰੀ (ਕਿ.ਮੀ.)',
    travelEst: 'ਸਫ਼ਰ ਦਾ ਅੰਦਾਜ਼ਾ',
    preferredHour: 'ਤਰਜੀਹੀ ਸਮਾਂ',
    bookBtn: 'ਸਲਾਟ ਤੇ ਪਾਸ ਬਣਾਓ',
    booking: 'ਸਲਾਟ ਬਣ ਰਿਹਾ ਹੈ...',
    passTitle: 'ਡਿਜੀਟਲ ਕ੍ਰਿਸ਼ੀ-ਪਾਸ (ਟੋਕਨ)',
    bayAssigned: 'ਅਲਾਟ ਕੀਤੀ ਬੇਅ',
    slotTime: 'ਪਹੁੰਚਣ ਦਾ ਸਮਾਂ',
    departureAdvisory: 'ਸਫ਼ਰ ਸਲਾਹ',
    departBy: 'ਚੱਲਣ ਦਾ ਸਹੀ ਸਮਾਂ',
    spoilageProtection: 'ਖ਼ਰਾਬੀ ਸੁਰੱਖਿਆ ਰੇਟਿੰਗ',
    stageTracker: 'ਲਾਈਵ ਸਥਿਤੀ',
    payoutEst: 'ਅੰਦਾਜ਼ਨ ਡੀਬੀਟੀ ਰਕਮ',
    offlineReady: 'ਔਫਲਾਈਨ ਪਾਸ ਤਿਆਰ',
    stages: ['ਸ਼ੈਡਿਊਲ', 'ਗੇਟ ਐਂਟਰੀ', 'ਕੰਡਾ (ਵਜ਼ਨ)', 'ਗੁਣਵੱਤਾ ਜਾਂਚ', 'ਅਨਲੋਡਿੰਗ', 'ਡੀਬੀਟੀ ਭੁਗਤਾਨ']
  }
};

export const FarmerPortal: React.FC<FarmerPortalProps> = ({
  crops,
  language,
  onBookSlot,
  activePass,
  setActivePass
}) => {
  const t = UI_TEXT[language as keyof typeof UI_TEXT] || UI_TEXT.en;

  const [formData, setFormData] = useState<SlotRequest>({
    farmer_name: 'Ramesh Patel',
    phone: '+91 98260 44921',
    village: 'Sanwer (Indore)',
    crop: 'Tomato',
    quantity_quintals: 45,
    vehicle_type: 'Tractor Trolley',
    distance_km: 18,
    preferred_hour_window: 9,
    preferred_language: language
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedCropProfile = crops.find(c => c.name === formData.crop) || crops[0];
  const estTravelMins = Math.max(10, Math.round(formData.distance_km * 1.5));
  const estPayout = formData.quantity_quintals * (selectedCropProfile?.base_price_per_quintal || 2200);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const pass = await onBookSlot(formData);
      if (pass) {
        setActivePass(pass);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const stageIndex = {
    'SCHEDULED': 0,
    'GATE_ARRIVED': 1,
    'WEIGHBRIDGE_IN': 2,
    'ASSAYING': 3,
    'UNLOADING_DOCK': 4,
    'WEIGHBRIDGE_OUT': 4,
    'COMPLETED': 5,
    'CANCELLED': 0,
    'DELAYED': 0
  }[activePass?.stage || 'SCHEDULED'] ?? 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl glass-panel-emerald p-6 sm:p-8">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-3 border border-emerald-500/30">
              <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
              <span>Uber-Style Dynamic Drop-off Allocation</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {t.title}
            </h1>
            <p className="text-emerald-100/80 text-sm sm:text-base mt-2 max-w-2xl">
              {t.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="px-4 py-3 rounded-2xl bg-slate-900/80 border border-emerald-500/30 text-right">
              <div className="text-[11px] text-slate-400 font-medium">Active Mandi Hub</div>
              <div className="text-sm font-bold text-emerald-400">Indore Central Complex</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Slot Booking Form */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
              <h2 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-emerald-400" />
                <span>Reserve Optimized Drop-off Slot</span>
              </h2>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-mono">
                Step 1 of 2
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">{t.farmerName}</label>
                  <input
                    type="text"
                    required
                    value={formData.farmer_name}
                    onChange={(e) => setFormData({ ...formData, farmer_name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-100 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">{t.phone}</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-100 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">{t.village}</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={formData.village}
                      onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-100 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">{t.distance}</label>
                  <input
                    type="number"
                    min="1"
                    max="150"
                    required
                    value={formData.distance_km}
                    onChange={(e) => setFormData({ ...formData, distance_km: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-100 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none font-mono"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    {t.travelEst}: <span className="text-emerald-400 font-semibold">{estTravelMins} mins</span>
                  </span>
                </div>
              </div>

              {/* Crop & Quantity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">{t.cropType}</label>
                  <select
                    value={formData.crop}
                    onChange={(e) => setFormData({ ...formData, crop: e.target.value as CropType })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-100 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                  >
                    {crops.map((c) => (
                      <option key={c.name} value={c.name} className="bg-slate-900">
                        {c.name} {c.decay_weight_factor >= 7.0 ? '🚨 (Perishable)' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">{t.quantity}</label>
                  <input
                    type="number"
                    min="5"
                    max="500"
                    required
                    value={formData.quantity_quintals}
                    onChange={(e) => setFormData({ ...formData, quantity_quintals: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-100 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none font-mono"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    ~ {(formData.quantity_quintals * 0.1).toFixed(1)} Metric Tons
                  </span>
                </div>
              </div>

              {/* Vehicle & Preferred Window */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">{t.vehicle}</label>
                  <select
                    value={formData.vehicle_type}
                    onChange={(e) => setFormData({ ...formData, vehicle_type: e.target.value as VehicleType })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-100 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                  >
                    <option value="Tractor Trolley">Tractor Trolley (~4 MT)</option>
                    <option value="Small Truck (LCV)">Small Truck (LCV ~8 MT)</option>
                    <option value="Large Truck (HCV)">Large Truck (HCV ~18 MT)</option>
                    <option value="Small Carrier/Cart">Small Carrier/Cart (~1.5 MT)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">{t.preferredHour}</label>
                  <select
                    value={formData.preferred_hour_window}
                    onChange={(e) => setFormData({ ...formData, preferred_hour_window: parseInt(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-100 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                  >
                    <option value="7">07:00 AM - 08:00 AM (Early Slot)</option>
                    <option value="8">08:00 AM - 09:00 AM</option>
                    <option value="9">09:00 AM - 10:00 AM (Morning Peak)</option>
                    <option value="10">10:00 AM - 11:00 AM</option>
                    <option value="11">11:00 AM - 12:00 PM</option>
                    <option value="14">02:00 PM - 03:00 PM (Afternoon)</option>
                    <option value="16">04:00 PM - 05:00 PM (Evening)</option>
                  </select>
                </div>
              </div>

              {/* Crop Perishability Urgency Badge */}
              <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className={`p-2 rounded-xl ${
                    (selectedCropProfile?.decay_weight_factor || 1) >= 7.0 
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' 
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-200">
                      {formData.crop} {t.spoilageProtection}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Shelf-life: {selectedCropProfile?.shelf_life_hours} hrs | Priority Decay Multiplier: {selectedCropProfile?.decay_weight_factor}x
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[11px] text-slate-400">Est. Payout</div>
                  <div className="text-sm font-bold text-emerald-400 font-mono">
                    ₹{estPayout.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-950/60 glow-emerald transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                    <span>{t.booking}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 text-amber-300" />
                    <span>{t.bookBtn}</span>
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right: Digital Krishi-Pass & Live Queue Stepper */}
        <div className="lg:col-span-6 space-y-6">
          {activePass ? (
            <div className="space-y-6">
              
              {/* Digital Pass Card */}
              <div className="relative rounded-3xl overflow-hidden glass-panel border border-emerald-500/40 p-6 sm:p-8 bg-gradient-to-b from-slate-900/90 via-slate-950/95 to-slate-950 shadow-2xl">
                
                {/* Top Badge */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-400 font-mono">
                      {activePass.pass_code}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-xs text-slate-400 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Verified Mandi Pass</span>
                  </div>
                </div>

                {/* Main Details & QR Code */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 my-6 items-center">
                  <div className="sm:col-span-7 space-y-3">
                    <div>
                      <span className="text-[11px] text-slate-400 uppercase font-semibold">Farmer</span>
                      <h3 className="text-xl font-bold text-white">{activePass.farmer_name}</h3>
                      <p className="text-xs text-slate-400 font-mono">{activePass.phone}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                        <span className="text-[10px] text-slate-400 block">Crop & Volume</span>
                        <span className="text-xs font-bold text-emerald-300">
                          {activePass.crop} ({activePass.quantity_quintals} Qtl)
                        </span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                        <span className="text-[10px] text-slate-400 block">Vehicle</span>
                        <span className="text-xs font-bold text-amber-300">
                          {activePass.vehicle_type}
                        </span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
                      <div className="text-[11px] text-emerald-300 font-semibold">{t.bayAssigned}</div>
                      <div className="text-base font-extrabold text-emerald-400">{activePass.assigned_bay_name}</div>
                    </div>
                  </div>

                  {/* Dynamic QR Code */}
                  <div className="sm:col-span-5 flex flex-col items-center justify-center p-4 rounded-2xl bg-white text-slate-950 shadow-inner">
                    <QRCodeSVG
                      value={activePass.qr_payload}
                      size={135}
                      level="H"
                      includeMargin={false}
                    />
                    <span className="text-[10px] font-mono font-bold text-slate-600 mt-2">
                      SCAN AT GATE WEIGHBRIDGE
                    </span>
                  </div>
                </div>

                {/* Scheduled Slot & Smart Departure Advisory */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-800">
                  <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800">
                    <div className="flex items-center space-x-1.5 text-xs text-slate-400 mb-1">
                      <Clock className="h-3.5 w-3.5 text-amber-400" />
                      <span>{t.slotTime}</span>
                    </div>
                    <div className="text-lg font-black text-amber-400 font-mono">
                      {activePass.scheduled_slot_start} - {activePass.scheduled_slot_end}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Estimated Yard Wait: <span className="text-emerald-400 font-semibold">{activePass.estimated_wait_minutes} mins</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30">
                    <div className="flex items-center space-x-1.5 text-xs text-emerald-300 mb-1">
                      <Compass className="h-3.5 w-3.5 text-emerald-400" />
                      <span>{t.departureAdvisory}</span>
                    </div>
                    <div className="text-lg font-black text-emerald-300 font-mono">
                      {activePass.suggested_departure_time} AM
                    </div>
                    <div className="text-[11px] text-emerald-400/80 mt-0.5">
                      {t.departBy}
                    </div>
                  </div>
                </div>

                {/* DBT Estimated Payout Banner */}
                <div className="mt-4 p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <IndianRupee className="h-4 w-4 text-emerald-400" />
                    <span className="text-xs text-slate-300">{t.payoutEst}</span>
                  </div>
                  <span className="text-sm font-extrabold text-emerald-400 font-mono">
                    ₹{activePass.estimated_payout_inr.toLocaleString()}
                  </span>
                </div>

                {/* Offline note */}
                <div className="mt-3 text-center">
                  <span className="text-[11px] text-slate-500 font-medium">
                    ⚡ {t.offlineReady}
                  </span>
                </div>
              </div>

              {/* Live Lifecycle Stepper */}
              <div className="glass-panel p-6 rounded-3xl border border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center space-x-2">
                  <FileCheck className="h-4 w-4 text-emerald-400" />
                  <span>{t.stageTracker}</span>
                </h4>

                <div className="space-y-4">
                  {t.stages.map((stageName, idx) => {
                    const isDone = idx < stageIndex;
                    const isCurrent = idx === stageIndex;
                    return (
                      <div key={idx} className="flex items-center space-x-3">
                        <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          isDone 
                            ? 'bg-emerald-500 text-white shadow-md shadow-emerald-900/50' 
                            : isCurrent 
                            ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/20 font-extrabold animate-pulse'
                            : 'bg-slate-800 text-slate-500'
                        }`}>
                          {isDone ? <CheckCircle2 className="h-4 w-4" /> : idx + 1}
                        </div>
                        <div className="flex-1">
                          <span className={`text-xs font-semibold ${
                            isCurrent ? 'text-amber-400 font-bold' : isDone ? 'text-slate-200' : 'text-slate-500'
                          }`}>
                            {stageName}
                          </span>
                        </div>
                        {isCurrent && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            Active Step
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-12 rounded-3xl glass-panel border border-slate-800 text-center space-y-4">
              <div className="h-16 w-16 rounded-3xl bg-slate-900 flex items-center justify-center border border-slate-800 text-slate-500">
                <Truck className="h-8 w-8 text-emerald-500/60" />
              </div>
              <h3 className="text-lg font-bold text-slate-200">No Active Krishi-Pass Yet</h3>
              <p className="text-xs text-slate-400 max-w-sm">
                Fill the booking form on the left to generate an AI-optimized drop-off slot token with instant gate pass & travel departure advisory.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
