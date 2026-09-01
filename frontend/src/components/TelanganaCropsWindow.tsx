import React, { useState, useMemo } from 'react';
import { TELANGANA_CROPS_DATA, TelanganaCrop } from '../data/telanganaCropsData';
import { 
  Sprout, 
  Search, 
  Filter, 
  Award, 
  Droplets, 
  Calendar, 
  TrendingUp, 
  MapPin, 
  ArrowRight, 
  X, 
  Info,
  CheckCircle2,
  Sparkles,
  Layers
} from 'lucide-react';

interface TelanganaCropsWindowProps {
  onSelectCropForBooking?: (cropName: string) => void;
}

export const TelanganaCropsWindow: React.FC<TelanganaCropsWindowProps> = ({ onSelectCropForBooking }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSeason, setSelectedSeason] = useState<string>('All');
  const [selectedWater, setSelectedWater] = useState<string>('All');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [activeCropModal, setActiveCropModal] = useState<TelanganaCrop | null>(null);

  const categories = [
    'All',
    'Cereals & Millets',
    'Pulses',
    'Commercial & Cash Crops',
    'Oilseeds',
    'Fruits',
    'Vegetables',
    'Leafy Greens',
    'Spices & Condiments',
    'Medicinal & Agroforestry'
  ];

  const allDistricts = useMemo(() => {
    const set = new Set<string>();
    TELANGANA_CROPS_DATA.forEach(crop => {
      crop.majorDistricts.forEach(d => set.add(d.replace(/ \(.*\)/, '')));
    });
    return ['All', ...Array.from(set).sort()];
  }, []);

  const filteredCrops = useMemo(() => {
    return TELANGANA_CROPS_DATA.filter(crop => {
      const matchesSearch = 
        crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crop.teluguName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crop.popularVarieties.some(v => v.toLowerCase().includes(searchQuery.toLowerCase())) ||
        crop.majorDistricts.some(d => d.toLowerCase().includes(searchQuery.toLowerCase())) ||
        crop.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'All' || crop.category === selectedCategory;
      const matchesSeason = selectedSeason === 'All' || crop.season.includes(selectedSeason);
      const matchesWater = selectedWater === 'All' || crop.waterRequirement.toLowerCase().includes(selectedWater.toLowerCase());
      const matchesDistrict = selectedDistrict === 'All' || crop.majorDistricts.some(d => d.includes(selectedDistrict));

      return matchesSearch && matchesCategory && matchesSeason && matchesWater && matchesDistrict;
    });
  }, [searchQuery, selectedCategory, selectedSeason, selectedWater, selectedDistrict]);

  return (
    <div className="space-y-8 animate-slide-up">
      
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950 p-6 sm:p-10 border border-emerald-500/30 shadow-2xl">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-3 border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Telangana State Complete Agri-Horticulture Directory (తెలంగాణ పంటల విజ్ఞాన వేదిక)</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Crops, Fruits, Vegetables, Millets & Flora of Telangana
            </h1>
            <p className="text-emerald-100/80 text-xs sm:text-sm mt-2 leading-relaxed">
              Explore the rich agricultural diversity across all 33 districts of Telangana. From GI-tagged Tandur Red Gram, Warangal Teja Chilli, and Nizamabad Turmeric to Sri Dhanya Millets, Jagtial Mangoes, Nalgonda Sweet Oranges, Sericulture and Agroforestry.
            </p>
          </div>

          {/* Quick Telemetry Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 shrink-0">
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-emerald-500/30 text-center">
              <div className="text-lg font-black text-emerald-400">{TELANGANA_CROPS_DATA.length}+</div>
              <div className="text-[10px] text-slate-400">All Varieties</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-emerald-500/30 text-center">
              <div className="text-lg font-black text-amber-400">9 Categories</div>
              <div className="text-[10px] text-slate-400">Grains to Agroforestry</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-emerald-500/30 text-center col-span-2 sm:col-span-1">
              <div className="text-lg font-black text-teal-400">33</div>
              <div className="text-[10px] text-slate-400">Districts Covered</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-4">
        
        {/* Search Row */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Crop (e.g. వరి, Paddy, Cotton, పత్తి, Mango, Nizamabad, Turmeric)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-2xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder:text-slate-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Secondary Dropdown Filters */}
          <div className="flex flex-wrap gap-2">
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-medium text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="All">All Districts (అన్ని జిల్లాలు)</option>
              {allDistricts.filter(d => d !== 'All').map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
              className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-medium text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="All">All Seasons (అన్ని రుతువులు)</option>
              <option value="Kharif">Kharif (వానకాలం)</option>
              <option value="Rabi">Rabi (యాసంగి)</option>
              <option value="Summer">Summer (వేసవి)</option>
              <option value="Perennial">Year-round (శాశ్వత)</option>
            </select>

            <select
              value={selectedWater}
              onChange={(e) => setSelectedWater(e.target.value)}
              className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-medium text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="All">Water Need (నీటి అవసరం)</option>
              <option value="Low">Low (మెట్ట / డ్రైలాండ్)</option>
              <option value="Medium">Medium (మధ్యస్థ)</option>
              <option value="High">High (ఎక్కువ)</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          <span className="text-slate-500 font-semibold uppercase text-[10px] tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Categories:
          </span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all shrink-0 ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40 glow-emerald'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Crops Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-semibold text-slate-400">
            Showing <span className="text-emerald-400 font-bold">{filteredCrops.length}</span> Telangana Crops & Plants
          </div>
          {(selectedCategory !== 'All' || selectedSeason !== 'All' || selectedDistrict !== 'All' || selectedWater !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedSeason('All');
                setSelectedDistrict('All');
                setSelectedWater('All');
              }}
              className="text-xs text-emerald-400 hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {filteredCrops.length === 0 ? (
          <div className="glass-panel p-12 rounded-3xl text-center border border-slate-800">
            <Sprout className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-300">No matching crops found</h3>
            <p className="text-xs text-slate-500 mt-1">Try adjusting your search terms or filter criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCrops.map(crop => (
              <div
                key={crop.id}
                className="glass-panel rounded-3xl p-5 border border-slate-800/80 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between group hover:shadow-xl hover:shadow-emerald-950/20 bg-slate-900/70"
              >
                <div>
                  {/* Top Specialty Badge if any */}
                  {crop.giTagOrSpecialty && (
                    <div className="mb-3 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-300 text-[10px] font-bold flex items-center gap-1.5 line-clamp-1">
                      <Award className="w-3 h-3 text-amber-400 shrink-0" />
                      <span className="truncate">{crop.giTagOrSpecialty}</span>
                    </div>
                  )}

                  {/* Header & Icon */}
                  <div className="flex items-start gap-3.5 mb-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
                      {crop.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white text-base tracking-tight leading-snug group-hover:text-emerald-300 transition-colors">
                        {crop.name}
                      </h3>
                      <p className="text-xs text-emerald-400 font-medium mt-0.5 font-sans">
                        {crop.teluguName}
                      </p>
                      <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-400">
                        {crop.category}
                      </span>
                    </div>
                  </div>

                  {/* Description snippet */}
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
                    {crop.description}
                  </p>

                  {/* Metrics Badges */}
                  <div className="space-y-2 py-3 border-y border-slate-800/80 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Mandi Benchmark:
                      </span>
                      <span className="font-bold text-emerald-400">{crop.mandiPriceRange.split(' ')[0]} {crop.mandiPriceRange.split(' ')[1]}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-teal-400" /> Season:
                      </span>
                      <span className="font-medium text-slate-300 text-[11px]">{crop.season.split(' ')[0]}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-1">
                        <Droplets className="w-3.5 h-3.5 text-cyan-400" /> Water Need:
                      </span>
                      <span className={`font-semibold text-[11px] ${
                        crop.waterRequirement === 'Low' ? 'text-emerald-400' :
                        crop.waterRequirement === 'Medium' ? 'text-amber-400' : 'text-cyan-400'
                      }`}>
                        {crop.waterRequirement}
                      </span>
                    </div>
                  </div>

                  {/* Districts Tags */}
                  <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                    <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                    {crop.majorDistricts.slice(0, 3).map((d, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-400 border border-slate-700/50">
                        {d.replace(/ \(.*\)/, '')}
                      </span>
                    ))}
                    {crop.majorDistricts.length > 3 && (
                      <span className="text-[10px] text-slate-500">+{crop.majorDistricts.length - 3}</span>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-4 pt-3 flex items-center gap-2">
                  <button
                    onClick={() => setActiveCropModal(crop)}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all flex items-center justify-center gap-1"
                  >
                    <Info className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Cultivation Guide</span>
                  </button>

                  {onSelectCropForBooking && (
                    <button
                      onClick={() => onSelectCropForBooking(crop.name.split(' ')[0])}
                      className="py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold shadow-md shadow-emerald-950/40 transition-all flex items-center gap-1"
                      title="Book Delivery Slot in KrishiFlow"
                    >
                      <span>Book Slot</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CROP DETAIL MODAL */}
      {activeCropModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl animate-slide-up relative">
            
            <button
              onClick={() => setActiveCropModal(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600/30 to-teal-500/30 border border-emerald-500/40 flex items-center justify-center text-3xl shrink-0 shadow-lg">
                {activeCropModal.icon}
              </div>
              <div className="flex-1 pr-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {activeCropModal.category}
                  </span>
                  <span className="text-xs text-slate-400">{activeCropModal.season}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {activeCropModal.name}
                </h2>
                <p className="text-sm text-emerald-400 font-medium">
                  {activeCropModal.teluguName}
                </p>
              </div>
            </div>

            {/* Specialty Alert */}
            {activeCropModal.giTagOrSpecialty && (
              <div className="mb-6 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2.5">
                <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Telangana Agro Specialty / GI Certification:</div>
                  <div className="text-amber-200/90 mt-0.5">{activeCropModal.giTagOrSpecialty}</div>
                </div>
              </div>
            )}

            {/* Description */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Cultivation Overview</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeCropModal.description}
              </p>
            </div>

            {/* Key Grid Telemetry */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
              <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                <div className="text-[11px] text-slate-400">Suitable Soil Type (అనుకూల నేలలు)</div>
                <div className="text-xs font-bold text-white mt-1">{activeCropModal.soilType}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                <div className="text-[11px] text-slate-400">Crop Duration & Lifecycle</div>
                <div className="text-xs font-bold text-emerald-400 mt-1">{activeCropModal.durationDays}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                <div className="text-[11px] text-slate-400">Average Yield Per Acre (ఎకరాకు దిగుబడి)</div>
                <div className="text-xs font-bold text-teal-400 mt-1">{activeCropModal.avgYieldPerAcre}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                <div className="text-[11px] text-slate-400">APMC Mandi Price Range (మార్కెట్ ధర)</div>
                <div className="text-xs font-bold text-amber-400 mt-1">{activeCropModal.mandiPriceRange}</div>
              </div>
            </div>

            {/* High-Yield Varieties */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-400" /> Recommended Telangana Varieties (రకాలు)
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeCropModal.popularVarieties.map((v, i) => (
                  <span key={i} className="text-xs px-3 py-1 rounded-xl bg-slate-800 text-emerald-300 border border-emerald-500/20 font-medium">
                    {v}
                  </span>
                ))}
              </div>
            </div>

            {/* Major Growing Districts */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Key Cultivating Districts (ప్రధాన జిల్లాలు)
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {activeCropModal.majorDistricts.map((d, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700">
                    {d}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Advantages */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Farmer Advantages</h4>
              <div className="space-y-1.5">
                {activeCropModal.keyBenefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Bottom CTA */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              <div className="text-xs text-slate-400">
                Primary Hub: <span className="text-white font-medium">{activeCropModal.procurementHub}</span>
              </div>

              {onSelectCropForBooking && (
                <button
                  onClick={() => {
                    const name = activeCropModal.name.split(' ')[0];
                    setActiveCropModal(null);
                    onSelectCropForBooking(name);
                  }}
                  className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-900/40 flex items-center gap-2"
                >
                  <span>Book {activeCropModal.name.split(' ')[0]} Delivery Slot</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
