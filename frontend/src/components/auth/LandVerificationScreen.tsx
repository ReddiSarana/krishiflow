import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { TELANGANA_DISTRICTS } from '../../data/telanganaCropsData';
import { TELANGANA_LAND_SAMPLES, verifyLandDocumentRecord } from '../../data/telanganaLandDatabase';
import { 
  FileCheck2, 
  UploadCloud, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  Loader2, 
  AlertCircle,
  FileText,
  BadgeCheck,
  Building2,
  TreeDeciduous,
  QrCode
} from 'lucide-react';
import { Button } from '../ui/Button';

export const LandVerificationScreen: React.FC = () => {
  const { user, pendingRegistration, completeLandVerification, showToast } = useAuth();
  const { t } = useLanguage();

  const [district, setDistrict] = useState<string>('Warangal');
  const [mandal, setMandal] = useState<string>('Narsampet');
  const [village, setVillage] = useState<string>('Chennaraopet');
  const [pattadarPassbookNo, setPattadarPassbookNo] = useState<string>('T-284910294');
  const [surveyNo, setSurveyNo] = useState<string>('142/A & 142/B');
  const [acres, setAcres] = useState<number>(4.5);
  const [soilType, setSoilType] = useState<string>('Black Cotton Soil (Regur)');
  const [waterSource, setWaterSource] = useState<string>('Borewell + Drip Irrigation');
  const [uploadedFileName, setUploadedFileName] = useState<string>('Pattadar_Passbook_Scan_T2849.pdf');

  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verificationStep, setVerificationStep] = useState<number>(0);
  const [verifiedResult, setVerifiedResult] = useState<any | null>(null);

  const farmerDisplayName = pendingRegistration?.name || user?.name || 'రైతు సోదరుడు (Kisan)';

  const handleApplyPreset = (sample: typeof TELANGANA_LAND_SAMPLES[0]) => {
    setDistrict(sample.district);
    setMandal(sample.mandal);
    setVillage(sample.village);
    setPattadarPassbookNo(sample.pattadarPassbookNo);
    setSurveyNo(sample.surveyNo);
    setAcres(sample.totalAcres);
    setSoilType(sample.soilType);
    setWaterSource(sample.waterSource);
    setUploadedFileName(`Dharani_E_Passbook_${sample.pattadarPassbookNo}.pdf`);
    showToast(`ధరణి రికార్డు ప్రీసెట్ ఎంపికైంది (${sample.district} - ${sample.village})`, undefined, 'info');
  };

  const handleStartVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pattadarPassbookNo.trim() || !surveyNo.trim()) {
      showToast('దయచేసి పట్టాదారు పాస్‌బుక్ నంబర్ మరియు సర్వే నంబర్ నమోదు చేయండి', undefined, 'error');
      return;
    }

    setIsVerifying(true);
    setVerificationStep(1);

    try {
      // Step 1: Query Dharani Portal
      await new Promise((r) => setTimeout(r, 700));
      setVerificationStep(2);

      // Step 2: Survey boundary verification
      await new Promise((r) => setTimeout(r, 800));
      setVerificationStep(3);

      // Step 3: Fetch Soil & Revenue Card
      const record = await verifyLandDocumentRecord(
        pattadarPassbookNo,
        surveyNo,
        district,
        mandal,
        village,
        acres,
        soilType,
        waterSource
      );

      setVerificationStep(4);
      await new Promise((r) => setTimeout(r, 500));
      setVerifiedResult(record);
    } catch {
      showToast('ధరణి సర్వర్ తాత్కాలికంగా స్పందించలేదు. దయచేసి మళ్ళీ ప్రయత్నించండి.', undefined, 'error');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleProceedToApp = () => {
    if (verifiedResult) {
      completeLandVerification(verifiedResult);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/40 to-slate-950/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-2 border border-emerald-500/30">
              <Building2 className="w-3.5 h-3.5" />
              <span>తెలంగాణ ప్రభుత్వం &bull; ధరణి భూమి రికార్డుల ధృవీకరణ (Dharani Portal)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              రైతు భూమి పత్రాల ధృవీకరణ & కిసాన్ పాస్‌పోర్ట్
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              నమస్తే <span className="font-bold text-emerald-400">{farmerDisplayName}</span>! మీ పట్టాదారు పాస్‌బుక్ వివరాలను ధృవీకరించి, మీ నేల రకానికి సరిపోయే పంటలు మరియు ప్రభుత్వ పథకాల ప్రయోజనాలను పొందండి.
            </p>
          </div>

          <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800 flex items-center gap-3 shrink-0">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">100% గవర్నమెంట్ రికార్డు ధృవీకరణ</div>
              <div className="text-[11px] text-emerald-400">రైతు బంధు & ధరణి e-KYC లింక్డ్</div>
            </div>
          </div>
        </div>
      </div>

      {!verifiedResult ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Quick Select Presets Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <div className="glass-panel p-5 rounded-3xl border border-slate-800 bg-slate-950/60 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>తెలంగాణ జిల్లాల నమూనా రికార్డులు (Quick Presets)</span>
                </h3>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                వేగవంతమైన డెమో కోసం క్రింది జిల్లాల నమూనా ధరణి పాస్‌బుక్‌లలో ఒకదాన్ని నేరుగా ఎంచుకోవచ్చు:
              </p>

              <div className="space-y-2 pt-1">
                {TELANGANA_LAND_SAMPLES.map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleApplyPreset(sample)}
                    className={`w-full text-left p-3 rounded-2xl border transition-all text-xs flex flex-col gap-1 ${
                      district === sample.district && village === sample.village
                        ? 'bg-emerald-950/80 border-emerald-500/50 text-white shadow-md shadow-emerald-950/50 ring-1 ring-emerald-500/40'
                        : 'bg-slate-900/70 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-300">{sample.district} &bull; {sample.village}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 font-mono text-slate-300">
                        {sample.totalAcres} ఎకరాలు
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      పట్టాదారు: <span className="text-slate-200">{sample.pattadarName}</span> &bull; ఖా: {sample.khataNo}
                    </div>
                    <div className="text-[10px] text-amber-300/90 font-medium">
                      పంటలు: {sample.activeCrops.join(', ')}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Verification Form */}
          <div className="lg:col-span-8">
            <form onSubmit={handleStartVerification} className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-950/80 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2 text-white font-bold text-base">
                  <FileCheck2 className="w-5 h-5 text-emerald-400" />
                  <span>పట్టాదారు పాస్‌బుక్ వివరాల నమోదు (Enter Land Details)</span>
                </div>
                <span className="text-xs text-slate-400">అన్ని వివరాలు తప్పనిసరి</span>
              </div>

              {/* District, Mandal, Village */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    జిల్లా (District)
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    {TELANGANA_DISTRICTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    మండలం (Mandal)
                  </label>
                  <input
                    type="text"
                    value={mandal}
                    onChange={(e) => setMandal(e.target.value)}
                    required
                    placeholder="ఉదా: Narsampet"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    గ్రామం (Village)
                  </label>
                  <input
                    type="text"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    required
                    placeholder="ఉదా: Chennaraopet"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Passbook No, Survey No, Acres */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    పట్టాదారు పాస్‌బుక్ సంఖ్య (PPB No.)
                  </label>
                  <input
                    type="text"
                    value={pattadarPassbookNo}
                    onChange={(e) => setPattadarPassbookNo(e.target.value)}
                    required
                    placeholder="T-284910294"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs font-mono text-emerald-400 font-bold focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    సర్వే నంబరు (Survey / Sub-Div)
                  </label>
                  <input
                    type="text"
                    value={surveyNo}
                    onChange={(e) => setSurveyNo(e.target.value)}
                    required
                    placeholder="142/A & 142/B"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs font-mono text-amber-300 font-bold focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    మొత్తం విస్తీర్ణం (Total Acres)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.5"
                    max="100"
                    value={acres}
                    onChange={(e) => setAcres(parseFloat(e.target.value) || 0)}
                    required
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white font-bold focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Soil & Water */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    నేల రకం (Soil Classification)
                  </label>
                  <select
                    value={soilType}
                    onChange={(e) => setSoilType(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Black Cotton Soil (Regur)">నల్లరేగడి నేల (Black Cotton Regur)</option>
                    <option value="Red Loamy Soil (Chalka)">ఎర్ర నేలలు / చల్కా (Red Sandy Loam)</option>
                    <option value="Deep Black Soil with High Calcium Limestone">సున్నపురాయి నల్ల నేల (Tandur Calcium Rich)</option>
                    <option value="Well-drained Alluvial Sandy Loam">వరి ఒండ్రు నేలలు (Alluvial Loam)</option>
                    <option value="Clayey Loam Soil">బంకమట్టి నేల (Clayey Loam)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    నీటి వనరు (Irrigation Source)
                  </label>
                  <select
                    value={waterSource}
                    onChange={(e) => setWaterSource(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Borewell + Drip Irrigation">బోరుబావి + డ్రిప్ సాగు (Borewell Drip)</option>
                    <option value="Canal Irrigation (SRSP / Nagarjuna Sagar)">కాలువ నీరు (Canal Irrigation)</option>
                    <option value="Open Well + Micro-Sprinklers">బావి నీరు (Open Well)</option>
                    <option value="Rainfed + Farm Pond Harvesting">వర్షాధారం (Rainfed)</option>
                  </select>
                </div>
              </div>

              {/* Document Upload Simulation */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  పట్టాదారు పాస్‌బుక్ కాపీ / 1-B ROR పత్రం (Document Upload)
                </label>
                <div className="border-2 border-dashed border-emerald-500/30 hover:border-emerald-500/60 rounded-2xl p-4 bg-emerald-950/20 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2">
                  <UploadCloud className="w-8 h-8 text-emerald-400" />
                  <div className="text-xs font-bold text-white">
                    {uploadedFileName}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    PDF, JPG, PNG ఫార్మాట్లలో పట్టాదారు పాస్‌బుక్ మొదటి పేజీ & 1-B రికార్డును అప్‌లోడ్ చేయండి
                  </div>
                </div>
              </div>

              {/* Verification Progress Modal / Overlay */}
              {isVerifying && (
                <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 space-y-3 animate-pulse">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>తెలంగాణ ధరణి సర్వర్‌తో ధృవీకరణ జరుగుతోంది...</span>
                  </div>

                  <div className="space-y-1.5 text-[11px] text-slate-300">
                    <div className={`flex items-center gap-2 ${verificationStep >= 1 ? 'text-emerald-400 font-semibold' : 'text-slate-500'}`}>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>దశ 1: మీసేవా & ధరణి రెవెన్యూ రికార్డులను ప్రశ్నించడం...</span>
                    </div>
                    <div className={`flex items-center gap-2 ${verificationStep >= 2 ? 'text-emerald-400 font-semibold' : 'text-slate-500'}`}>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>దశ 2: సర్వే నంబర్ {surveyNo} యాజమాన్య హక్కులను ధృవీకరించడం...</span>
                    </div>
                    <div className={`flex items-center gap-2 ${verificationStep >= 3 ? 'text-emerald-400 font-semibold' : 'text-slate-500'}`}>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>దశ 3: నేల ఆరోగ్యం & రైతు బంధు అర్హతను అనుసంధానించడం...</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full justify-center bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold shadow-lg shadow-emerald-950/60"
                disabled={isVerifying}
                leftIcon={<ShieldCheck className="w-5 h-5" />}
              >
                {isVerifying ? 'ధరణిలో ధృవీకరిస్తున్నాము...' : 'ధరణి పోర్టల్ ద్వారా ధృవీకరించండి (Verify with Dharani Portal)'}
              </Button>
            </form>
          </div>
        </div>
      ) : (
        /* Verified Land Certificate Success View */
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-emerald-500/50 bg-gradient-to-b from-emerald-950/60 to-slate-950 p-8 space-y-6 animate-scale-in shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-emerald-500/30">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center text-slate-950 shadow-xl shadow-emerald-500/30">
                <BadgeCheck className="w-10 h-10" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>ధరణి రికార్డుల ద్వారా విజయవంతంగా ధృవీకరించబడింది</span>
                </div>
                <h2 className="text-2xl font-black text-white">
                  డిజిటల్ కిసాన్ ల్యాండ్ సర్టిఫికేట్ (Verified Land Passport)
                </h2>
                <div className="text-xs text-slate-300 mt-0.5">
                  ధరణి సర్టిఫికేట్ సంఖ్య: <span className="font-mono text-emerald-300 font-bold">{verifiedResult.dharaniCertificateId}</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-900/90 rounded-2xl border border-emerald-500/30 flex items-center gap-3">
              <QrCode className="w-10 h-10 text-emerald-400" />
              <div className="text-right">
                <div className="text-[10px] text-slate-400">డిజిటల్ ధృవీకరణ QR</div>
                <div className="text-xs font-bold text-emerald-300 font-mono">100% ఆథెంటిక్</div>
              </div>
            </div>
          </div>

          {/* Key Verified Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="text-xs text-slate-400 mb-1">రైతు / పట్టాదారు పేరు</div>
              <div className="text-sm font-bold text-white">{farmerDisplayName}</div>
              <div className="text-[10px] text-emerald-400 mt-1">PPB: {verifiedResult.pattadarPassbookNo}</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="text-xs text-slate-400 mb-1">జిల్లా & గ్రామం</div>
              <div className="text-sm font-bold text-white">{verifiedResult.village}</div>
              <div className="text-[10px] text-slate-400 mt-1">{verifiedResult.mandal}, {verifiedResult.district}</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="text-xs text-slate-400 mb-1">సర్వే సంఖ్య & విస్తీర్ణం</div>
              <div className="text-sm font-bold text-amber-400 font-mono">{verifiedResult.surveyNo}</div>
              <div className="text-[10px] text-slate-300 mt-1">{verifiedResult.totalAcres} ఎకరాలు (సాగు: {verifiedResult.cultivableAcres} ఎకరాలు)</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="text-xs text-slate-400 mb-1">నేల రకం & నీటి వసతి</div>
              <div className="text-sm font-bold text-emerald-400">{verifiedResult.soilType.split(' ')[0]}</div>
              <div className="text-[10px] text-slate-300 mt-1">{verifiedResult.waterSource.split('+')[0]}</div>
            </div>
          </div>

          {/* Scheme Badges */}
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                రైతు బంధు అర్హత ధృవీకరించబడింది
              </span>
              <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                రైతు బీమా నమోదు యాక్టివ్
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                PM-Kisan DBT అర్హత
              </span>
            </div>
          </div>

          {/* Proceed CTA */}
          <div className="pt-2">
            <Button
              onClick={handleProceedToApp}
              variant="primary"
              size="lg"
              className="w-full justify-center bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold text-base py-4 rounded-2xl shadow-xl shadow-emerald-950/80 glow-emerald"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              ముందుకు సాగండి &bull; తెలంగాణ పంటలు & మీ ప్రొఫైల్ చూడండి (View Crops & Profile)
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
