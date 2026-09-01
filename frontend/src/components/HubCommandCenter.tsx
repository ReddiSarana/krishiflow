import React, { useState } from 'react';
import { 
  Warehouse, 
  Truck, 
  Scale, 
  FlaskConical, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Zap, 
  ShieldAlert, 
  TrendingUp, 
  ArrowRight,
  IndianRupee,
  RefreshCw,
  Search,
  Filter,
  Check
} from 'lucide-react';
import { DigitalPass, ProcurementHub, QueueStage } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface HubCommandCenterProps {
  hub: ProcurementHub;
  passes: DigitalPass[];
  onUpdateStage: (tokenId: string, stage: QueueStage, extraData?: Record<string, any>) => Promise<void>;
  onTriggerDisruption: (event: { event_type: string; affected_bay_ids: string[]; delay_minutes: number; description: string }) => Promise<void>;
  onRefresh: () => void;
}

export const HubCommandCenter: React.FC<HubCommandCenterProps> = ({
  hub,
  passes,
  onUpdateStage,
  onTriggerDisruption,
  onRefresh
}) => {
  const { t } = useLanguage();
  const [selectedPassForAssaying, setSelectedPassForAssaying] = useState<DigitalPass | null>(null);
  const [moistureInput, setMoistureInput] = useState<number>(12.4);
  const [gradeInput, setGradeInput] = useState<string>('Grade A (Export Quality)');
  const [grossWeightInput, setGrossWeightInput] = useState<number>(5420);
  const [isRebalancing, setIsRebalancing] = useState(false);
  const [filterStage, setFilterStage] = useState<string>('ALL');

  // Stats calculation
  const totalVolumeTons = passes.reduce((acc, p) => acc + (p.quantity_quintals * 0.1), 0);
  const completedCount = passes.filter(p => p.stage === 'COMPLETED').length;
  const inYardCount = passes.filter(p => p.stage !== 'COMPLETED' && p.stage !== 'SCHEDULED').length;
  const activeUnloadingCount = passes.filter(p => p.stage === 'UNLOADING_DOCK').length;

  const handleAdvanceStage = async (passObj: DigitalPass) => {
    const nextStages: Record<QueueStage, QueueStage> = {
      'SCHEDULED': 'GATE_ARRIVED',
      'GATE_ARRIVED': 'WEIGHBRIDGE_IN',
      'WEIGHBRIDGE_IN': 'ASSAYING',
      'ASSAYING': 'UNLOADING_DOCK',
      'UNLOADING_DOCK': 'WEIGHBRIDGE_OUT',
      'WEIGHBRIDGE_OUT': 'COMPLETED',
      'COMPLETED': 'COMPLETED',
      'CANCELLED': 'CANCELLED',
      'DELAYED': 'GATE_ARRIVED'
    };
    const next = nextStages[passObj.stage];

    if (passObj.stage === 'WEIGHBRIDGE_IN') {
      // Prompt assaying modal
      setSelectedPassForAssaying(passObj);
      setMoistureInput(passObj.moisture_pct || 12.0);
      setGrossWeightInput((passObj.quantity_quintals * 100) + 1200);
      return;
    }

    await onUpdateStage(passObj.token_id, next);
  };

  const handleSaveAssaying = async () => {
    if (!selectedPassForAssaying) return;
    const netWeight = Math.max(100, grossWeightInput - 1200); // 1200kg tare weight
    const payout = (netWeight / 100) * 2200; // Rs 2200 per quintal

    await onUpdateStage(selectedPassForAssaying.token_id, 'UNLOADING_DOCK', {
      moisture_pct: moistureInput,
      quality_grade: gradeInput,
      gross_weight_kg: grossWeightInput,
      net_weight_kg: netWeight,
      estimated_payout_inr: payout
    });
    setSelectedPassForAssaying(null);
  };

  const handleEmergencyDisruption = async (type: 'DOCK_BREAKDOWN' | 'HEAVY_RAIN') => {
    setIsRebalancing(true);
    try {
      if (type === 'DOCK_BREAKDOWN') {
        await onTriggerDisruption({
          event_type: 'DOCK_BREAKDOWN',
          affected_bay_ids: ['BAY-1'],
          delay_minutes: 35,
          description: 'Hydraulic Unloader Motor Failure at Bay 1'
        });
      } else {
        await onTriggerDisruption({
          event_type: 'HEAVY_RAIN',
          affected_bay_ids: [],
          delay_minutes: 60,
          description: 'Monsoon Rain Delay - Wet Tarping Protocol Activated'
        });
      }
    } finally {
      setIsRebalancing(false);
    }
  };

  const filteredPasses = passes.filter(p => {
    if (filterStage === 'ALL') return true;
    return p.stage === filterStage;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Hub Status & Emergency Controls */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <Warehouse className="h-5 w-5 text-emerald-400" />
              <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-400">
                {t.hubTitle}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              {hub.name}
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              {t.hubSubtitle} &bull; Capacity: {hub.daily_capacity_tons} MT/day
            </p>
          </div>

          {/* Quick Disruption Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleEmergencyDisruption('DOCK_BREAKDOWN')}
              disabled={isRebalancing}
              className="px-4 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 font-bold text-xs flex items-center space-x-2 transition-all shadow-md shadow-rose-950/40"
            >
              <ShieldAlert className="h-4 w-4 text-rose-400" />
              <span>{isRebalancing ? t.hubRebalancingActive : t.hubBayBreakdown}</span>
            </button>

            <button
              onClick={() => handleEmergencyDisruption('HEAVY_RAIN')}
              disabled={isRebalancing}
              className="px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-bold text-xs flex items-center space-x-2 transition-all shadow-md shadow-amber-950/40"
            >
              <Zap className="h-4 w-4 text-amber-400" />
              <span>{isRebalancing ? t.hubRebalancingActive : t.hubRainAlert}</span>
            </button>

            <button
              onClick={onRefresh}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Refresh Queue"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Real-time KPI Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center space-x-2 text-xs text-slate-400 mb-1">
              <Truck className="h-4 w-4 text-emerald-400" />
              <span>{t.hubTotalVolume}</span>
            </div>
            <div className="text-2xl font-black text-white font-mono">
              {passes.length} <span className="text-xs text-slate-400 font-normal">trucks</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Volume: <span className="text-emerald-400 font-semibold">{totalVolumeTons.toFixed(1)} MT</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center space-x-2 text-xs text-slate-400 mb-1">
              <Clock className="h-4 w-4 text-amber-400" />
              <span>{t.hubVehiclesInYard}</span>
            </div>
            <div className="text-2xl font-black text-amber-400 font-mono">
              {inYardCount} <span className="text-xs text-slate-400 font-normal">active</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Weighbridge & Assaying Queue
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center space-x-2 text-xs text-slate-400 mb-1">
              <Warehouse className="h-4 w-4 text-cyan-400" />
              <span>{t.hubActiveUnloading}</span>
            </div>
            <div className="text-2xl font-black text-cyan-400 font-mono">
              {activeUnloadingCount} / {hub.dock_bays.length}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              High-throughput Express
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center space-x-2 text-xs text-slate-400 mb-1">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>{t.hubCompletedLoads}</span>
            </div>
            <div className="text-2xl font-black text-emerald-400 font-mono">
              {completedCount} <span className="text-xs text-slate-400 font-normal">cleared</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              DBT Payout Transferred
            </div>
          </div>
        </div>
      </div>

      {/* Live Dock Bays Monitor */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
        <h2 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
          <Warehouse className="h-5 w-5 text-emerald-400" />
          <span>Real-Time Dock Bays & Assaying Lanes</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hub.dock_bays.map((bay) => {
            const currentPass = passes.find(p => p.assigned_bay_id === bay.bay_id && p.stage === 'UNLOADING_DOCK');
            const isDisrupted = !bay.is_active;

            return (
              <div
                key={bay.bay_id}
                className={`p-5 rounded-2xl border transition-all ${
                  isDisrupted
                    ? 'bg-rose-950/20 border-rose-500/40 text-rose-300'
                    : currentPass
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300 glow-emerald'
                    : 'bg-slate-900/90 border-slate-800 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono tracking-wider">
                    {bay.bay_id}
                  </span>
                  <span className={`text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full ${
                    isDisrupted
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      : currentPass
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 animate-pulse'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}>
                    {isDisrupted ? 'Disabled' : currentPass ? 'Unloading Active' : 'Bay Ready'}
                  </span>
                </div>

                <div className="mt-3 font-bold text-sm text-slate-100">
                  {bay.bay_name}
                </div>

                <div className="text-[11px] text-slate-400 mt-1">
                  Supported: {bay.supported_crops.length > 0 ? bay.supported_crops.join(', ') : 'All Crops Universal'}
                </div>

                {currentPass && (
                  <div className="mt-3 pt-3 border-t border-emerald-500/20 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-mono font-bold text-white">{currentPass.pass_code}</span>
                      <span className="text-slate-400 block text-[11px]">{currentPass.farmer_name}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-emerald-400">{currentPass.crop}</span>
                      <span className="text-slate-400 block text-[11px]">{currentPass.quantity_quintals} Qtl</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Procurement Queue & Stage Transition Table */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
              <Scale className="h-5 w-5 text-emerald-400" />
              <span>Live Scheduled Queue & Assaying Workflow</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Click "Advance Stage" on any truck to simulate physical movement through the mandi gates.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-slate-400" />
            <select
              value={filterStage}
              onChange={(e) => setFilterStage(e.target.value)}
              aria-label="Filter Queue by Stage"
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 outline-none"
            >
              <option value="ALL">All Stages ({passes.length})</option>
              <option value="SCHEDULED">Scheduled at Farm</option>
              <option value="GATE_ARRIVED">Gate Arrived</option>
              <option value="WEIGHBRIDGE_IN">Weighbridge Gross</option>
              <option value="ASSAYING">Assaying Lab</option>
              <option value="UNLOADING_DOCK">Dock Unloading</option>
              <option value="COMPLETED">Completed DBT</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Token / Pass</th>
                <th className="py-3 px-4">Farmer & Village</th>
                <th className="py-3 px-4">Crop & Volume</th>
                <th className="py-3 px-4">Assigned Slot & Bay</th>
                <th className="py-3 px-4">Current Stage</th>
                <th className="py-3 px-4">Quality & Moisture</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredPasses.map((p) => (
                <tr key={p.token_id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                      {p.pass_code}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white">{p.farmer_name}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{p.phone}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-200">{p.crop}</div>
                    <div className="text-[11px] text-slate-400">{p.quantity_quintals} Quintals &bull; {p.vehicle_type}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-bold text-amber-400 font-mono">{p.scheduled_slot_start} - {p.scheduled_slot_end}</div>
                    <div className="text-[11px] text-slate-400">{p.assigned_bay_name}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      p.stage === 'COMPLETED' 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                        : p.stage === 'UNLOADING_DOCK'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 animate-pulse'
                        : p.stage === 'ASSAYING'
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        : p.stage === 'WEIGHBRIDGE_IN'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}>
                      {p.stage}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    {p.quality_grade ? (
                      <div>
                        <span className="font-semibold text-emerald-300">{p.quality_grade}</span>
                        <span className="text-[11px] text-slate-400 block">Moisture: {p.moisture_pct}%</span>
                      </div>
                    ) : (
                      <span className="text-slate-500 italic">Pending Assaying</span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    {p.stage !== 'COMPLETED' ? (
                      <button
                        onClick={() => handleAdvanceStage(p)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all inline-flex items-center space-x-1"
                      >
                        <span>Advance</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    ) : (
                      <span className="text-emerald-400 font-bold flex items-center justify-end space-x-1">
                        <Check className="h-4 w-4" />
                        <span>DBT Paid</span>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assaying & Moisture Modal */}
      {selectedPassForAssaying && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/40 max-w-md w-full space-y-6 shadow-2xl bg-slate-900">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <FlaskConical className="h-5 w-5 text-emerald-400" />
                <h3 className="font-bold text-lg text-white">Quality Assaying & Weighbridge</h3>
              </div>
              <span className="font-mono text-xs font-bold text-emerald-400">
                {selectedPassForAssaying.pass_code}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Gross Scale Weight (KG)</label>
                <input
                  type="number"
                  value={grossWeightInput}
                  onChange={(e) => setGrossWeightInput(parseFloat(e.target.value) || 0)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono font-bold text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Moisture Level (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={moistureInput}
                  onChange={(e) => setMoistureInput(parseFloat(e.target.value) || 0)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono font-bold text-sm outline-none"
                />
                <span className="text-[11px] text-emerald-400 mt-1 block">
                  Max acceptable: 14.0% &bull; Current sample: Compliant
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Assayed Grade</label>
                <select
                  value={gradeInput}
                  onChange={(e) => setGradeInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm outline-none"
                >
                  <option value="Grade A (Export Quality)">Grade A (Export Quality)</option>
                  <option value="Grade B (Commercial Fair)">Grade B (Commercial Fair)</option>
                  <option value="Grade C (Processing Standard)">Grade C (Processing Standard)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => setSelectedPassForAssaying(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAssaying}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-950/60"
              >
                Approve & Direct to Bay
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
