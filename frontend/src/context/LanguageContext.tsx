import React, { createContext, useContext, useState, useEffect } from 'react';

export type SupportedLanguage = 'en' | 'te' | 'hi' | 'mr' | 'pa';

export interface Translations {
  // Navigation
  navFarmerPwa: string;
  navTelanganaCrops: string;
  navFarmerProfile: string;
  navLandVerification: string;
  navHubCenter: string;
  navSmsBot: string;
  navJudgeArena: string;
  navLoginRegister: string;
  navKisanId: string;
  navCloudDeploy: string;
  navEngineBadge: string;
  navTagline: string;
  navResetDemo: string;

  // Telangana Crops Window
  telanganaHeaderBadge: string;
  telanganaTitle: string;
  telanganaSubtitle: string;
  telanganaCatalogedCrops: string;
  telanganaCategoriesCount: string;
  telanganaDistrictsCount: string;
  telanganaSearchPlaceholder: string;
  telanganaAllDistricts: string;
  telanganaAllSeasons: string;
  telanganaWaterNeed: string;
  telanganaShowing: string;
  telanganaCropsFlora: string;
  telanganaResetFilters: string;
  telanganaMandiBenchmark: string;
  telanganaSeason: string;
  telanganaWater: string;
  telanganaCultivationGuide: string;
  telanganaBookSlot: string;
  telanganaOverview: string;
  telanganaSuitableSoil: string;
  telanganaDuration: string;
  telanganaAvgYield: string;
  telanganaPriceRange: string;
  telanganaRecommendedVarieties: string;
  telanganaKeyDistricts: string;
  telanganaFarmerBenefits: string;
  telanganaPrimaryHub: string;
  telanganaBookSlotFor: string;

  // Farmer Portal
  farmerTitle: string;
  farmerSubtitle: string;
  farmerName: string;
  farmerPhone: string;
  farmerVillage: string;
  farmerCropType: string;
  farmerQuantity: string;
  farmerVehicle: string;
  farmerDistance: string;
  farmerTravelEst: string;
  farmerPreferredHour: string;
  farmerBookBtn: string;
  farmerBooking: string;
  farmerPassTitle: string;
  farmerBayAssigned: string;
  farmerSlotTime: string;
  farmerDepartureAdvisory: string;
  farmerDepartBy: string;
  farmerSpoilageProtection: string;
  farmerStageTracker: string;
  farmerPayoutEst: string;
  farmerOfflineReady: string;
  farmerKisanSignInBtn: string;
  farmerActiveHub: string;

  // Hub Command Center
  hubTitle: string;
  hubSubtitle: string;
  hubTotalVolume: string;
  hubCompletedLoads: string;
  hubVehiclesInYard: string;
  hubActiveUnloading: string;
  hubEmergencyTrigger: string;
  hubBayBreakdown: string;
  hubLaborShortage: string;
  hubRainAlert: string;
  hubRebalancingActive: string;
  hubAssayingTitle: string;
  hubMoisturePercent: string;
  hubQualityGrade: string;
  hubGrossWeight: string;
  hubAdvanceStage: string;
  hubStageScheduled: string;
  hubStageGate: string;
  hubStageWeighbridge: string;
  hubStageAssaying: string;
  hubStageUnloading: string;
  hubStageCompleted: string;

  // SMS & WhatsApp Bot Simulator
  smsTitle: string;
  smsSubtitle: string;
  smsTabWhatsapp: string;
  smsTabFeaturePhone: string;
  smsBotInstructions: string;
  smsQuickBookTomato: string;
  smsQuickCheckStatus: string;
  smsQuickReportDelay: string;
  smsInputPlaceholder: string;
  smsSendBtn: string;
  smsLiveLogs: string;

  // Arena & Simulation
  arenaTitle: string;
  arenaSubtitle: string;
  arenaControlsTitle: string;
  arenaNumFarmers: string;
  arenaPerishableRatio: string;
  arenaDockBays: string;
  arenaSurgeSpike: string;
  arenaRunBtn: string;
  arenaRunning: string;
  arenaAvgWaitTime: string;
  arenaSpoilagePrevented: string;
  arenaThroughputGain: string;
  arenaFuelSavings: string;
  arenaTraditionalFifo: string;
  arenaOrToolsOptimized: string;

  // Auth Portal
  authSignInTitle: string;
  authSignInSubtitle: string;
  authRegisterTitle: string;
  authRegisterSubtitle: string;
  authMobileOtpTab: string;
  authEmailTab: string;
  authFullName: string;
  authMobileNumber: string;
  authEmailAddress: string;
  authPassword: string;
  authConfirmPassword: string;
  authRememberMe: string;
  authGetOtpBtn: string;
  authSignInBtn: string;
  authRegisterBtn: string;
  authEnterOtpTitle: string;
  authVerifyOtpBtn: string;
  authRoleFarmer: string;
  authRoleFpo: string;
  authRoleAgronomist: string;
  authRoleBuyer: string;
  authDeviceWeb: string;
  authDeviceTablet: string;
  authDeviceMobile: string;
  authSignOutBtn: string;
  authVerifiedKisan: string;
  authActivePassToken: string;
  authSecurityActive: string;
}

export const TRANSLATIONS: Record<SupportedLanguage, Translations> = {
  // ==========================================
  // ENGLISH
  // ==========================================
  en: {
    navFarmerPwa: 'Farmer PWA',
    navTelanganaCrops: '🌾 Telangana Crops',
    navFarmerProfile: '👤 My Profile & Land Passport',
    navLandVerification: '📄 Land Verification',
    navHubCenter: 'Hub Command Center',
    navSmsBot: 'WhatsApp / SMS Bot',
    navJudgeArena: 'CSBS Judge Arena',
    navLoginRegister: 'Sign In / Register',
    navKisanId: 'Kisan ID',
    navCloudDeploy: 'Cloud Deploy',
    navEngineBadge: 'OR-Tools CP-SAT',
    navTagline: 'Telangana Agri-Horticulture & Dharani Land Intelligence Portal',
    navResetDemo: 'Reset Live Demo Dataset',

    telanganaHeaderBadge: 'Telangana State Complete Agri-Horticulture Directory',
    telanganaTitle: 'Crops, Fruits, Vegetables, Millets & Flora of Telangana',
    telanganaSubtitle: 'Explore the rich agricultural diversity across all 33 districts of Telangana. Check sowing calendars, live mandi price benchmarks, and book delivery passes.',
    telanganaCatalogedCrops: 'Cataloged Crops',
    telanganaCategoriesCount: '9 Categories',
    telanganaDistrictsCount: '33 Districts',
    telanganaSearchPlaceholder: 'Search by Crop (e.g. Paddy, Cotton, Tandur, Turmeric, Mango)...',
    telanganaAllDistricts: 'All Districts',
    telanganaAllSeasons: 'All Seasons',
    telanganaWaterNeed: 'Water Need',
    telanganaShowing: 'Showing',
    telanganaCropsFlora: 'Telangana Crops & Plants',
    telanganaResetFilters: 'Reset Filters',
    telanganaMandiBenchmark: 'Mandi Benchmark',
    telanganaSeason: 'Season',
    telanganaWater: 'Water Need',
    telanganaCultivationGuide: 'Cultivation Guide',
    telanganaBookSlot: 'Book Slot',
    telanganaOverview: 'Cultivation Overview',
    telanganaSuitableSoil: 'Suitable Soil Type',
    telanganaDuration: 'Crop Duration & Lifecycle',
    telanganaAvgYield: 'Average Yield Per Acre',
    telanganaPriceRange: 'APMC Mandi Price Range',
    telanganaRecommendedVarieties: 'Recommended Telangana Varieties',
    telanganaKeyDistricts: 'Key Cultivating Districts',
    telanganaFarmerBenefits: 'Farmer Advantages',
    telanganaPrimaryHub: 'Primary Hub',
    telanganaBookSlotFor: 'Book Delivery Slot',

    farmerTitle: 'Farmer Procurement Booking Portal',
    farmerSubtitle: 'Dynamic AI-Scheduled Drop-off Slot & Digital Krishi-Pass',
    farmerName: 'Farmer Full Name',
    farmerPhone: 'Mobile Number (WhatsApp/SMS)',
    farmerVillage: 'Village / Origin Location',
    farmerCropType: 'Crop to Procure',
    farmerQuantity: 'Quantity (Quintals)',
    farmerVehicle: 'Transport Vehicle',
    farmerDistance: 'Distance to Procurement Hub (KM)',
    farmerTravelEst: 'Estimated Transit Time',
    farmerPreferredHour: 'Preferred Arrival Window',
    farmerBookBtn: 'Generate AI-Optimized Slot & Pass',
    farmerBooking: 'Calculating Multi-Dock Constraints with OR-Tools...',
    farmerPassTitle: 'Official Digital Krishi-Pass (Token)',
    farmerBayAssigned: 'Assigned Dock Bay',
    farmerSlotTime: 'Scheduled Arrival Window',
    farmerDepartureAdvisory: 'Smart Departure Advisory',
    farmerDepartBy: 'Start journey from farm by',
    farmerSpoilageProtection: 'Perishability Priority Rating',
    farmerStageTracker: 'Live Procurement Lifecycle Tracker',
    farmerPayoutEst: 'Estimated Direct Benefit Transfer (DBT)',
    farmerOfflineReady: 'Saved for 100% Offline Gate Entry',
    farmerKisanSignInBtn: 'Kisan Sign In / Register',
    farmerActiveHub: 'Active Mandi Hub',

    hubTitle: 'Mandi Hub Operations Command Center',
    hubSubtitle: 'Live Unloading Bays, Weighbridges, Digital Assaying Labs & AI Rebalancing',
    hubTotalVolume: 'Total Volume Expected',
    hubCompletedLoads: 'Completed Loads',
    hubVehiclesInYard: 'Vehicles In Yard',
    hubActiveUnloading: 'Active Unloading Bays',
    hubEmergencyTrigger: 'Simulate Live Emergency Disruption',
    hubBayBreakdown: 'Bay 2 Breakdown (Mechanical)',
    hubLaborShortage: 'Unloading Labor Shortage (50% Delay)',
    hubRainAlert: 'Flash Heavy Rain (Perishable Fast-track)',
    hubRebalancingActive: 'OR-Tools Dynamic Rebalancing Active',
    hubAssayingTitle: 'Digital Grain Quality Assaying Lab',
    hubMoisturePercent: 'Moisture Content (%)',
    hubQualityGrade: 'Assayed Quality Grade',
    hubGrossWeight: 'Weighbridge Gross Weight (kg)',
    hubAdvanceStage: 'Advance Queue Stage',
    hubStageScheduled: 'Scheduled',
    hubStageGate: 'Gate Entry',
    hubStageWeighbridge: 'Weighbridge In',
    hubStageAssaying: 'Assaying Lab',
    hubStageUnloading: 'Unloading Dock',
    hubStageCompleted: 'Completed & Paid',

    smsTitle: 'Two-Way WhatsApp & SMS Mandi Gateway',
    smsSubtitle: 'Simulates automated interactive booking for basic keypad featurephones and smartphones',
    smsTabWhatsapp: 'WhatsApp Interactive Bot',
    smsTabFeaturePhone: 'Keypad Featurephone SMS',
    smsBotInstructions: 'Send commands: 1️⃣ BOOK <CROP> <QTY> <VILLAGE>  2️⃣ STATUS <TOKEN>  3️⃣ DELAY <MINS>',
    smsQuickBookTomato: 'BOOK TOMATO 40 SANWER',
    smsQuickCheckStatus: 'STATUS KRISHI-1001',
    smsQuickReportDelay: 'DELAY 30 TRAFFIC',
    smsInputPlaceholder: 'Type a message or click quick command above...',
    smsSendBtn: 'Send Message',
    smsLiveLogs: 'Telecom SMS Dispatch Logs',

    arenaTitle: 'Operations Research Simulation Arena',
    arenaSubtitle: 'Direct mathematical benchmark: Google OR-Tools Dynamic Slots vs Traditional Unmanaged Mandi Queues',
    arenaControlsTitle: 'Simulation Parameters & Multi-Bay Constraints',
    arenaNumFarmers: 'Simulated Farmer Inflow',
    arenaPerishableRatio: 'Perishable Crop Proportion (%)',
    arenaDockBays: 'Active Unloading Bays',
    arenaSurgeSpike: 'Simulate Morning Unscheduled Surge (8:00 AM)',
    arenaRunBtn: 'Run Real-Time OR-Tools Optimization Benchmark',
    arenaRunning: 'Solving CP-SAT Integer Programming Matrix...',
    arenaAvgWaitTime: 'Avg Wait Time Reduction',
    arenaSpoilagePrevented: 'Perishable Spoilage Prevented',
    arenaThroughputGain: 'Yard Throughput Gain',
    arenaFuelSavings: 'Farmer Diesel Fuel Savings',
    arenaTraditionalFifo: 'Traditional FIFO Queue (Unmanaged Mandi)',
    arenaOrToolsOptimized: 'KrishiFlow OR-Tools Smart Schedule',

    authSignInTitle: 'Sign in to KrishiFlow',
    authSignInSubtitle: 'Access real-time mandi prices, queue tracking, and your farm dispatch passes.',
    authRegisterTitle: 'Create Kisan & Partner Account',
    authRegisterSubtitle: 'Select your role to personalize crop advisory, mandi prices, and trading tools.',
    authMobileOtpTab: '📱 Mobile Number (OTP)',
    authEmailTab: '✉️ Kisan ID / Email',
    authFullName: 'Full Name',
    authMobileNumber: 'Mobile Phone Number',
    authEmailAddress: 'Email Address',
    authPassword: 'Password',
    authConfirmPassword: 'Confirm Password',
    authRememberMe: 'Keep me signed in on this device',
    authGetOtpBtn: 'Get Instant OTP',
    authSignInBtn: 'Sign In to KrishiFlow',
    authRegisterBtn: 'Register for KrishiFlow',
    authEnterOtpTitle: 'Enter 6-Digit OTP',
    authVerifyOtpBtn: 'Verify & Enter Kisan Portal',
    authRoleFarmer: 'Farmer',
    authRoleFpo: 'FPO / Coop',
    authRoleAgronomist: 'Agronomist',
    authRoleBuyer: 'Trader / Buyer',
    authDeviceWeb: 'Web Desktop',
    authDeviceTablet: 'Tablet',
    authDeviceMobile: 'Mobile Phone',
    authSignOutBtn: 'Sign Out',
    authVerifiedKisan: 'Verified Kisan Member',
    authActivePassToken: 'Active Gate Pass',
    authSecurityActive: '2FA + Passkey Protected'
  },

  // ==========================================
  // TELUGU (తెలుగు)
  // ==========================================
  te: {
    navFarmerPwa: 'రైతు పోర్టల్ (PWA)',
    navTelanganaCrops: '🌾 తెలంగాణ పంటలు',
    navFarmerProfile: '👤 నా ప్రొఫైల్ & భూమి పాస్‌పోర్ట్',
    navLandVerification: '📄 భూమి ధృవీకరణ',
    navHubCenter: 'హబ్ కమాండ్ సెంటర్',
    navSmsBot: 'వాట్సాప్ / SMS బాట్',
    navJudgeArena: 'జడ్జ్ అరేనా',
    navLoginRegister: 'లాగిన్ / రిజిస్టర్',
    navKisanId: 'కిసాన్ ఐడీ',
    navCloudDeploy: 'క్లౌడ్ డిప్లాయ్',
    navEngineBadge: 'OR-టూల్స్ AI ఇంజిన్',
    navTagline: 'తెలంగాణ సమగ్ర పంటలు మరియు ధరణి భూమి సమాచార పోర్టల్',
    navResetDemo: 'డెమో రీసెట్ చేయండి',

    telanganaHeaderBadge: 'తెలంగాణ రాష్ట్ర సమగ్ర వ్యవసాయ & ఉద్యానవన పంటల విజ్ఞాన వేదిక',
    telanganaTitle: 'తెలంగాణ పంటలు, పండ్లు, కూరగాయలు & వృక్ష సంపద',
    telanganaSubtitle: 'తెలంగాణలోని 33 జిల్లాల్లో పండే వరి, పత్తి, తాండూరు కందులు, మిర్చి, పసుపు, మామిడి మరియు అన్ని రకాల పంటల వివరాలు, మార్కెట్ ధరలు & బుకింగ్ సౌకర్యం.',
    telanganaCatalogedCrops: 'మొత్తం పంటలు',
    telanganaCategoriesCount: '9 విభాగాలు',
    telanganaDistrictsCount: '33 జిల్లాలు',
    telanganaSearchPlaceholder: 'పంట పేరుతో వెతకండి (ఉదా: వరి, పత్తి, తాండూరు కందులు, పసుపు, మామిడి)...',
    telanganaAllDistricts: 'అన్ని జిల్లాలు',
    telanganaAllSeasons: 'అన్ని రుతువులు',
    telanganaWaterNeed: 'నీటి అవసరం',
    telanganaShowing: 'చూపిస్తున్నవి',
    telanganaCropsFlora: 'తెలంగాణ పంటలు & మొక్కలు',
    telanganaResetFilters: 'ఫిల్టర్లు క్లియర్ చేయండి',
    telanganaMandiBenchmark: 'మార్కెట్ ధర (ధర పరిధి)',
    telanganaSeason: 'పంట కాలం',
    telanganaWater: 'నీటి అవసరం',
    telanganaCultivationGuide: 'సాగు సమాచారం',
    telanganaBookSlot: 'స్లాట్ బుక్ చేయండి',
    telanganaOverview: 'పంట సమగ్ర సమాచారం',
    telanganaSuitableSoil: 'అనుకూలమైన నేలలు',
    telanganaDuration: 'పంట కాల పరిమితి',
    telanganaAvgYield: 'ఎకరాకు సగటు దిగుబడి',
    telanganaPriceRange: 'మార్కెట్ యార్డ్ ధరల శ్రేణి',
    telanganaRecommendedVarieties: 'సిఫార్సు చేసిన రకాలు',
    telanganaKeyDistricts: 'ప్రధానంగా సాగయ్యే జిల్లాలు',
    telanganaFarmerBenefits: 'రైతుకు కలిగే ప్రయోజనాలు',
    telanganaPrimaryHub: 'ప్రధాన మార్కెట్ హబ్',
    telanganaBookSlotFor: 'డెలివరీ స్లాట్ బుక్ చేయండి',

    farmerTitle: 'రైతు ప్రొక్యూర్మెంట్ బుకింగ్ పోర్టల్',
    farmerSubtitle: 'ఏఐ ఆధారిత డ్రాప్-ఆఫ్ స్లాట్ & డిజిటల్ కృషి-పాస్',
    farmerName: 'రైతు పూర్తి పేరు',
    farmerPhone: 'మొబైల్ నంబర్ (WhatsApp/SMS)',
    farmerVillage: 'గ్రామం / ప్రదేశం',
    farmerCropType: 'పంట రకం',
    farmerQuantity: 'పరిమాణం (క్వింటాళ్లలో)',
    farmerVehicle: 'రవాణా వాహనం',
    farmerDistance: 'హబ్ నుండి దూరం (కి.మీ.)',
    farmerTravelEst: 'ప్రయాణ సమయం',
    farmerPreferredHour: 'ప్రాధాన్యత సమయం',
    farmerBookBtn: 'ఏఐ స్లాట్ & డిజిటల్ పాస్ పొందండి',
    farmerBooking: 'OR-టూల్స్ ద్వారా స్లాట్ కేటాయింపు జరుగుతోంది...',
    farmerPassTitle: 'అధికారిక డిజిటల్ కృషి-పాస్ (టోకెన్)',
    farmerBayAssigned: 'కేటాయించిన అన్‌లోడింగ్ బే',
    farmerSlotTime: 'మార్కెట్ రాక సమయం',
    farmerDepartureAdvisory: 'ప్రయాణ ప్రణాళిక సూచన',
    farmerDepartBy: 'చేను నుండి బయలుదేరాల్సిన సమయం',
    farmerSpoilageProtection: 'నాణ్యత రక్షణ రేటింగ్',
    farmerStageTracker: 'ప్రత్యక్ష పురోగతి ట్రాకర్',
    farmerPayoutEst: 'అంచనా వేసిన DBT చెల్లింపు',
    farmerOfflineReady: 'ఆఫ్‌లైన్ ఎంట్రీ సిద్ధం',
    farmerKisanSignInBtn: 'కిసాన్ సైన్ ఇన్ / రిజిస్టర్',
    farmerActiveHub: 'ప్రస్తుత మార్కెట్ హబ్',

    hubTitle: 'మార్కెట్ హబ్ ఆపరేషన్స్ కమాండ్ సెంటర్',
    hubSubtitle: 'లైవ్ అన్‌లోడింగ్ బేలు, వే-బ్రిడ్జ్‌లు, డిజిటల్ క్వాలిటీ ల్యాబ్ & ఏఐ రీబ్యాలెన్సింగ్',
    hubTotalVolume: 'మొత్తం అంచనా ప్రొక్యూర్మెంట్',
    hubCompletedLoads: 'పూర్తయిన లోడ్లు',
    hubVehiclesInYard: 'యార్డ్‌లోని వాహనాలు',
    hubActiveUnloading: 'సక్రియ అన్‌లోడింగ్ బేలు',
    hubEmergencyTrigger: 'ఎమర్జెన్సీ డిస్రప్షన్ ట్రిగ్గర్ చేయండి',
    hubBayBreakdown: 'బే 2 మెకానికల్ బ్రేక్‌డౌన్',
    hubLaborShortage: 'లేబర్ కొరత (50% ఆలస్యం)',
    hubRainAlert: 'భారీ వర్షం హెచ్చరిక (పాడయ్యే పంటల ప్రాధాన్యత)',
    hubRebalancingActive: 'OR-టూల్స్ డైనమిక్ రీబ్యాలెన్సింగ్ యాక్టివ్',
    hubAssayingTitle: 'డిజిటల్ గ్రెయిన్ క్వాలిటీ అస్సేయింగ్ ల్యాబ్',
    hubMoisturePercent: 'తేమ శాతం (%)',
    hubQualityGrade: 'నిర్ధారించిన నాణ్యత గ్రేడ్',
    hubGrossWeight: 'వే-బ్రిడ్జ్ స్థూల బరువు (కేజీలు)',
    hubAdvanceStage: 'తర్వాతి దశకు తరలించండి',
    hubStageScheduled: 'షెడ్యూల్ చేయబడింది',
    hubStageGate: 'గేట్ ప్రవేశం',
    hubStageWeighbridge: 'వే-బ్రిడ్జ్ బరువు',
    hubStageAssaying: 'నాణ్యత పరీక్ష ల్యాబ్',
    hubStageUnloading: 'బే అన్‌లోడింగ్',
    hubStageCompleted: 'చెల్లింపు పూర్తయింది',

    smsTitle: 'రెండు వైపులా పనిచేసే వాట్సాప్ & SMS గేట్‌వే',
    smsSubtitle: 'ఫీచర్‌ఫోన్లు మరియు స్మార్ట్‌ఫోన్ రైతుల కోసం ఆటోమేటెడ్ ఎస్‌ఎంఎస్ బాట్ సిమ్యులేటర్',
    smsTabWhatsapp: 'వాట్సాప్ ఇంటరాక్టివ్ బాట్',
    smsTabFeaturePhone: 'సాధారణ మొబైల్ SMS',
    smsBotInstructions: 'ఆదేశాలు పంపండి: 1️⃣ BOOK <పంట> <పరిమాణం> <గ్రామం>  2️⃣ STATUS <టోకెన్>  3️⃣ DELAY <నిమిషాలు>',
    smsQuickBookTomato: 'BOOK TOMATO 40 SANWER',
    smsQuickCheckStatus: 'STATUS KRISHI-1001',
    smsQuickReportDelay: 'DELAY 30 TRAFFIC',
    smsInputPlaceholder: 'సందేశం రాయండి లేదా పైనున్న బటన్ క్లిక్ చేయండి...',
    smsSendBtn: 'సందేశం పంపండి',
    smsLiveLogs: 'టెలికాం SMS డిస్పాచ్ లాగ్స్',

    arenaTitle: 'ఆపరేషన్స్ రీసెర్చ్ సిమ్యులేషన్ అరేనా',
    arenaSubtitle: 'గూగుల్ OR-టూల్స్ డైనమిక్ స్లాట్లు వర్సెస్ సాధారణ మార్కెట్ క్యూ పనితీరు పోలిక',
    arenaControlsTitle: 'సిమ్యులేషన్ పారామితులు & పరిమితులు',
    arenaNumFarmers: 'రైతుల సంఖ్య',
    arenaPerishableRatio: 'పాడయ్యే పంటల శాతం (%)',
    arenaDockBays: 'సక్రియ అన్‌లోడింగ్ బేలు',
    arenaSurgeSpike: 'ఉదయం రద్దీ స్పైక్ సిమ్యులేషన్ (8:00 AM)',
    arenaRunBtn: 'లైవ్ OR-టూల్స్ ఆప్టిమైజేషన్ రన్ చేయండి',
    arenaRunning: 'CP-SAT అల్గారిథమ్ లెక్కించబడుతోంది...',
    arenaAvgWaitTime: 'నిరీక్షణ సమయం తగ్గింపు',
    arenaSpoilagePrevented: 'పాడవడం నివారించబడిన పంట',
    arenaThroughputGain: 'మార్కెట్ సామర్థ్యం పెంపు',
    arenaFuelSavings: 'రైతు డీజిల్ ఆదా',
    arenaTraditionalFifo: 'సాంప్రదాయ క్రమరహిత క్యూ (FIFO)',
    arenaOrToolsOptimized: 'కృషిఫ్లో OR-టూల్స్ స్మార్ట్ షెడ్యూల్',

    authSignInTitle: 'కృషిఫ్లో పోర్టల్‌లోకి లాగిన్ అవ్వండి',
    authSignInSubtitle: 'మార్కెట్ ధరలు, డిజిటల్ గేట్ పాస్‌లు మరియు క్యూ ట్రాకింగ్ పొందండి.',
    authRegisterTitle: 'కిసాన్ & భాగస్వామి ఖాతాను సృష్టించండి',
    authRegisterSubtitle: 'మీ పాత్రను ఎంచుకోండి: రైతు, ఎఫ్‌పీఓ, లేదా వ్యాపారి.',
    authMobileOtpTab: '📱 మొబైల్ నంబర్ (OTP)',
    authEmailTab: '✉️ కిసాన్ ఐడీ / ఈమెయిల్',
    authFullName: 'పూర్తి పేరు',
    authMobileNumber: 'మొబైల్ నంబర్',
    authEmailAddress: 'ఈమెయిల్ చిరునామా',
    authPassword: 'పాస్‌వర్డ్',
    authConfirmPassword: 'పాస్‌వర్డ్ నిర్ధారణ',
    authRememberMe: 'ఈ పరికరంలో నన్ను లాగిన్ చేసి ఉంచండి',
    authGetOtpBtn: 'తక్షణ OTP పొందండి',
    authSignInBtn: 'కృషిఫ్లోలో సైన్ ఇన్ అవ్వండి',
    authRegisterBtn: 'ఖాతా నమోదు చేసుకోండి',
    authEnterOtpTitle: '6-అంకెల OTP నమోదు చేయండి',
    authVerifyOtpBtn: 'ధృవీకరించి ప్రవేశించండి',
    authRoleFarmer: 'రైతు (Farmer)',
    authRoleFpo: 'రైతు ఉత్పత్తి సంఘం (FPO)',
    authRoleAgronomist: 'వ్యవసాయ నిపుణులు',
    authRoleBuyer: 'వ్యాపారి / కొనుగోలుదారు',
    authDeviceWeb: 'వెబ్ డెస్క్‌టాప్',
    authDeviceTablet: 'టాబ్లెట్',
    authDeviceMobile: 'మొబైల్ ఫోన్',
    authSignOutBtn: 'సైన్ అవుట్',
    authVerifiedKisan: 'ధృవీకరించబడిన కిసాన్ సభ్యుడు',
    authActivePassToken: 'సక్రియ గేట్ పాస్ టోకెన్',
    authSecurityActive: '2FA + పాస్‌కీ భద్రత సక్రియం'
  },

  // ==========================================
  // HINDI (हिन्दी)
  // ==========================================
  hi: {
    navFarmerPwa: 'किसान पोर्टल (PWA)',
    navTelanganaCrops: '🌾 तेलंगाना फसलें',
    navFarmerProfile: '👤 मेरा प्रोफाइल व भूमि पासपोर्ट',
    navLandVerification: '📄 भूमि सत्यापन',
    navHubCenter: 'मंडी कमांड सेंटर',
    navSmsBot: 'व्हाट्सएप / SMS बॉट',
    navJudgeArena: 'जज एरीना',
    navLoginRegister: 'लॉग इन / रजिस्टर',
    navKisanId: 'किसान आईडी',
    navCloudDeploy: 'क्लाउड डिप्लॉय',
    navEngineBadge: 'OR-टूल्स CP-SAT',
    navTagline: 'तेलंगाना कृषि एवं धरणी भूमि रिकॉर्ड पोर्टल',
    navResetDemo: 'डेमो डेटा रीसेट करें',

    telanganaHeaderBadge: 'तेलंगाना राज्य संपूर्ण कृषि एवं बागवानी निर्देशिका',
    telanganaTitle: 'तेलंगाना की प्रमुख फसलें, फल, सब्जियां और वनस्पति',
    telanganaSubtitle: 'तेलंगाना के सभी 33 जिलों में उगाई जाने वाली धान, कपास, तांडूर अरहर, हल्दी, मिर्च और आम की संपूर्ण जानकारी, बुवाई कैलेंडर व मंडी भाव।',
    telanganaCatalogedCrops: 'दर्ज फसलें',
    telanganaCategoriesCount: '9 श्रेणियां',
    telanganaDistrictsCount: '33 जिले',
    telanganaSearchPlaceholder: 'फसल का नाम खोजें (उदा: धान, कपास, तांडूर अरहर, हल्दी, आम)...',
    telanganaAllDistricts: 'सभी जिले',
    telanganaAllSeasons: 'सभी मौसम',
    telanganaWaterNeed: 'पानी की आवश्यकता',
    telanganaShowing: 'प्रदर्शित',
    telanganaCropsFlora: 'तेलंगाना फसलें एवं वनस्पति',
    telanganaResetFilters: 'फ़िल्टर हटाएं',
    telanganaMandiBenchmark: 'मंडी भाव (न्यूनतम-अधिकतम)',
    telanganaSeason: 'फसल मौसम',
    telanganaWater: 'जल आवश्यकता',
    telanganaCultivationGuide: 'खेती गाइड',
    telanganaBookSlot: 'स्लॉट बुक करें',
    telanganaOverview: 'खेती का संपूर्ण विवरण',
    telanganaSuitableSoil: 'उपयुक्त मिट्टी',
    telanganaDuration: 'फसल अवधि (दिन)',
    telanganaAvgYield: 'प्रति एकड़ औसत पैदावार',
    telanganaPriceRange: 'APMC मंडी मूल्य सीमा',
    telanganaRecommendedVarieties: 'अनुशंसित किस्में',
    telanganaKeyDistricts: 'प्रमुख उत्पादक जिले',
    telanganaFarmerBenefits: 'किसान को मुख्य लाभ',
    telanganaPrimaryHub: 'प्रमुख खरीद केंद्र',
    telanganaBookSlotFor: 'डिलीवरी स्लॉट बुक करें',

    farmerTitle: 'किसान उपज स्लॉट बुकिंग पोर्टल',
    farmerSubtitle: 'एआई-संचालित सटीक समय स्लॉट एवं डिजिटल कृषि-पास',
    farmerName: 'किसान का पूरा नाम',
    farmerPhone: 'मोबाइल नंबर (व्हाट्सएप/एसएमएस)',
    farmerVillage: 'गांव / मूल स्थान',
    farmerCropType: 'उपज / फसल का प्रकार',
    farmerQuantity: 'मात्रा (क्विंटल में)',
    farmerVehicle: 'परिवहन वाहन',
    farmerDistance: 'मंडी/गोदाम से दूरी (कि.मी.)',
    farmerTravelEst: 'अनुमानित यात्रा समय',
    farmerPreferredHour: 'पसंदीदा आगमन समय',
    farmerBookBtn: 'एआई-अनुकूलित स्लॉट व पास बनाएं',
    farmerBooking: 'ओआर-टूल्स द्वारा स्लॉट की गणना हो रही है...',
    farmerPassTitle: 'डिजिटल कृषि-पास (टोकन)',
    farmerBayAssigned: 'आवंटित अनलोडिंग बे',
    farmerSlotTime: 'मंडी आगमन का समय',
    farmerDepartureAdvisory: 'यात्रा प्रस्थान सुझाव',
    farmerDepartBy: 'खेत से रवाना होने का सही समय',
    farmerSpoilageProtection: 'सड़न/खराबी सुरक्षा रेटिंग',
    farmerStageTracker: 'लाइव प्रक्रिया ट्रैकर',
    farmerPayoutEst: 'अनुमानित प्रत्यक्ष लाभ अंतरण (DBT राशि)',
    farmerOfflineReady: 'ऑफ़लाइन गेट एंट्री के लिए सुरक्षित',
    farmerKisanSignInBtn: 'किसान साइन इन / रजिस्टर',
    farmerActiveHub: 'सक्रिय मंडी हब',

    hubTitle: 'मंडी परिचालन कमांड सेंटर',
    hubSubtitle: 'लाइव अनलोडिंग बे, वे-ब्रिज, डिजिटल प्रयोगशाला एवं एआई शेड्यूलिंग',
    hubTotalVolume: 'कुल अनुमानित आवक (टन)',
    hubCompletedLoads: 'पूर्ण अनलोडिंग',
    hubVehiclesInYard: 'परिसर में वाहन',
    hubActiveUnloading: 'सक्रिय अनलोडिंग बे',
    hubEmergencyTrigger: 'आपातकालीन व्यवधान सिमुलेट करें',
    hubBayBreakdown: 'बे 2 खराबी (यांत्रिक)',
    hubLaborShortage: 'मजदूरों की कमी (50% देरी)',
    hubRainAlert: 'भारी बारिश अलर्ट (जल्द खराब होने वाली फसलें प्राथमिकता)',
    hubRebalancingActive: 'OR-टूल्स रीबैलेंसिंग सक्रिय',
    hubAssayingTitle: 'डिजिटल गुणवत्ता परख प्रयोगशाला',
    hubMoisturePercent: 'नमी की मात्रा (%)',
    hubQualityGrade: 'प्रमाणित गुणवत्ता ग्रेड',
    hubGrossWeight: 'वे-ब्रिज सकल वजन (किग्रा)',
    hubAdvanceStage: 'अगले चरण में भेजें',
    hubStageScheduled: 'शेड्यूल किया गया',
    hubStageGate: 'गेट आगमन',
    hubStageWeighbridge: 'वे-ब्रिज इन',
    hubStageAssaying: 'गुणवत्ता जांच',
    hubStageUnloading: 'बे अनलोडिंग',
    hubStageCompleted: 'भुगतान पूर्ण',

    smsTitle: 'व्हाट्सएप एवं SMS स्वचालित मंडी गेटवे',
    smsSubtitle: 'कीपैड फोन और स्मार्टफोन दोनों के लिए स्वचालित 2-तरफा बॉट',
    smsTabWhatsapp: 'व्हाट्सएप चैटबॉट',
    smsTabFeaturePhone: 'साधारण फोन SMS',
    smsBotInstructions: 'कमांड भेजें: 1️⃣ BOOK <फसल> <मात्रा> <गांव>  2️⃣ STATUS <टोकन>  3️⃣ DELAY <मिनट>',
    smsQuickBookTomato: 'BOOK TOMATO 40 SANWER',
    smsQuickCheckStatus: 'STATUS KRISHI-1001',
    smsQuickReportDelay: 'DELAY 30 TRAFFIC',
    smsInputPlaceholder: 'संदेश लिखें या ऊपर दिया बटन दबाएं...',
    smsSendBtn: 'संदेश भेजें',
    smsLiveLogs: 'टेलीकॉम SMS डिस्पैच लॉग',

    arenaTitle: 'ऑपरेशन्स रिसर्च सिमुलेशन एरीना',
    arenaSubtitle: 'गूगल OR-टूल्स बनाम पारंपरिक अनियंत्रित मंडी कतार प्रदर्शन तुलना',
    arenaControlsTitle: 'सिमुलेशन पैरामीटर व बाधाएं',
    arenaNumFarmers: 'सिमुलेटेड किसान संख्या',
    arenaPerishableRatio: 'खराब होने वाली फसलों का अनुपात (%)',
    arenaDockBays: 'सक्रिय अनलोडिंग बे',
    arenaSurgeSpike: 'सुबह की भीड़ स्पाइक सिमुलेट करें (8:00 AM)',
    arenaRunBtn: 'OR-टूल्स लाइव सिमुलेशन चलाएं',
    arenaRunning: 'CP-SAT गणितीय मैट्रिक्स हल हो रहा है...',
    arenaAvgWaitTime: 'प्रतीक्षा समय में कमी',
    arenaSpoilagePrevented: 'बचाई गई उपज',
    arenaThroughputGain: 'मंडी कार्यक्षमता वृद्धि',
    arenaFuelSavings: 'किसान डीजल बचत',
    arenaTraditionalFifo: 'पारंपरिक अनियंत्रित कतार (FIFO)',
    arenaOrToolsOptimized: 'कृषि-फ्लो OR-टूल्स स्मार्ट शेड्यूलिंग',

    authSignInTitle: 'कृषि-फ्लो में साइन इन करें',
    authSignInSubtitle: 'मंडी भाव, डिजिटल गेट पास और स्लॉट ट्रैकिंग तक सीधी पहुंच।',
    authRegisterTitle: 'किसान एवं पार्टनर खाता बनाएं',
    authRegisterSubtitle: 'अपनी भूमिका चुनें: किसान, एफपीओ, या व्यापारी।',
    authMobileOtpTab: '📱 मोबाइल नंबर (OTP)',
    authEmailTab: '✉️ किसान आईडी / ईमेल',
    authFullName: 'पूरा नाम',
    authMobileNumber: 'मोबाइल नंबर',
    authEmailAddress: 'ईमेल पता',
    authPassword: 'पासवर्ड',
    authConfirmPassword: 'पासवर्ड पुष्टि',
    authRememberMe: 'इस डिवाइस पर मुझे याद रखें',
    authGetOtpBtn: 'ओटीपी प्राप्त करें',
    authSignInBtn: 'कृषि-फ्लो में प्रवेश करें',
    authRegisterBtn: 'खाता पंजीकृत करें',
    authEnterOtpTitle: '6-अंकीय ओटीपी दर्ज करें',
    authVerifyOtpBtn: 'सत्यापित करें और आगे बढ़ें',
    authRoleFarmer: 'किसान',
    authRoleFpo: 'एफपीओ / सहकारी',
    authRoleAgronomist: 'कृषि वैज्ञानिक',
    authRoleBuyer: 'व्यापारी / खरीदार',
    authDeviceWeb: 'वेब डेस्कटॉप',
    authDeviceTablet: 'टैबलेट',
    authDeviceMobile: 'मोबाइल फोन',
    authSignOutBtn: 'साइन आउट',
    authVerifiedKisan: 'सत्यापित किसान सदस्य',
    authActivePassToken: 'सक्रिय गेट पास',
    authSecurityActive: '2FA + पासकी सुरक्षा सक्रिय'
  },

  // ==========================================
  // MARATHI (मराठी)
  // ==========================================
  mr: {
    navFarmerPwa: 'शेतकरी पोर्टल (PWA)',
    navTelanganaCrops: '🌾 तेलंगणा पिके',
    navFarmerProfile: '👤 माझे प्रोफाइल व जमीन पासपोर्ट',
    navLandVerification: '📄 जमीन पडताळणी',
    navHubCenter: 'खरेदी केंद्र नियंत्रण',
    navSmsBot: 'व्हॉट्सॲप / SMS बॉट',
    navJudgeArena: 'परीक्षक दालन',
    navLoginRegister: 'लॉगिन / नोंदणी',
    navKisanId: 'किसान आयडी',
    navCloudDeploy: 'क्लाउड डिप्लॉय',
    navEngineBadge: 'OR-टूल्स CP-SAT',
    navTagline: 'तेलंगणा पिके व धरणी जमीन माहिती पोर्टल',
    navResetDemo: 'डेमो डेटा पूर्ववत करा',

    telanganaHeaderBadge: 'तेलंगणा राज्य सर्वसमावेशक कृषी व फलोत्पादन निर्देशिका',
    telanganaTitle: 'तेलंगणातील प्रमुख पिके, फळे, भाज्या आणि वनस्पती',
    telanganaSubtitle: 'तेलंगणातील ३३ जिल्ह्यांमधील तांदूळ, कापूस, तूर, हळद, मिरची आणि आंब्याची सविस्तर माहिती व बाजारभाव.',
    telanganaCatalogedCrops: 'नोंदणीकृत पिके',
    telanganaCategoriesCount: '९ वर्गवारी',
    telanganaDistrictsCount: '३३ जिल्हे',
    telanganaSearchPlaceholder: 'पिकाचे नाव शोधा (उदा: भात, कापूस, तूर, हळद, आंबा)...',
    telanganaAllDistricts: 'सर्व जिल्हे',
    telanganaAllSeasons: 'सर्व हंगाम',
    telanganaWaterNeed: 'पाण्याची गरज',
    telanganaShowing: 'दर्शवित आहे',
    telanganaCropsFlora: 'तेलंगणा पिके व वनस्पती',
    telanganaResetFilters: 'फिल्टर रिसेट करा',
    telanganaMandiBenchmark: 'बाजारभाव दर',
    telanganaSeason: 'हंगाम',
    telanganaWater: 'पाण्याची आवश्यकता',
    telanganaCultivationGuide: 'लागवड माहिती',
    telanganaBookSlot: 'स्लॉट बुक करा',
    telanganaOverview: 'लागवड सविस्तर माहिती',
    telanganaSuitableSoil: 'योग्य जमीन',
    telanganaDuration: 'पीक कालावधी',
    telanganaAvgYield: 'एकर प्रति सरासरी उत्पन्न',
    telanganaPriceRange: 'APMC बाजारभाव मर्यादा',
    telanganaRecommendedVarieties: 'शिफारस केलेले वाण',
    telanganaKeyDistricts: 'प्रमुख उत्पादक जिल्हे',
    telanganaFarmerBenefits: 'शेतकऱ्यांना होणारे फायदे',
    telanganaPrimaryHub: 'प्रमुख खरेदी केंद्र',
    telanganaBookSlotFor: 'डिलिव्हरी स्लॉट बुक करा',

    farmerTitle: 'शेतकरी खरेदी स्लॉट बुकिंग पोर्टल',
    farmerSubtitle: 'एआय-आधारित अचूक वेळ स्लॉट आणि डिजिटल कृषी-पास',
    farmerName: 'शेतकऱ्याचे पूर्ण नाव',
    farmerPhone: 'मोबाईल क्रमांक (WhatsApp/SMS)',
    farmerVillage: 'गाव / ठिकाण',
    farmerCropType: 'पिकाचा प्रकार',
    farmerQuantity: 'प्रमाण (क्विंटल)',
    farmerVehicle: 'वाहन प्रकार',
    farmerDistance: 'खरेदी केंद्रापासून अंतर (किमी)',
    farmerTravelEst: 'प्रवासाची अंदाजे वेळ',
    farmerPreferredHour: 'पसंतीची वेळ',
    farmerBookBtn: 'एआय स्लॉट व पास मिळवा',
    farmerBooking: 'स्लॉट शोधत आहे...',
    farmerPassTitle: 'डिजिटल कृषी-पास (टोकन)',
    farmerBayAssigned: 'नेमून दिलेली अनलोडिंग बे',
    farmerSlotTime: 'आगमनाची वेळ',
    farmerDepartureAdvisory: 'प्रवास सूचना',
    farmerDepartBy: 'घरावरून निघण्याची वेळ',
    farmerSpoilageProtection: 'नासाडी संरक्षण रेटिंग',
    farmerStageTracker: 'थेट प्रक्रिया स्थिती',
    farmerPayoutEst: 'अंदाजे डीबीटी रक्कम',
    farmerOfflineReady: 'ऑफलाईन वापरासाठी उपलब्ध',
    farmerKisanSignInBtn: 'किसान लॉगिन / नोंदणी',
    farmerActiveHub: 'सक्रिय खरेदी केंद्र',

    hubTitle: 'मार्केट यार्ड नियंत्रण केंद्र',
    hubSubtitle: 'अनलोडिंग बे, वजन काटा, लॅब चाचणी आणि एआय शेड्यूलिंग',
    hubTotalVolume: 'एकूण आवक अंदाज (टन)',
    hubCompletedLoads: 'पूर्ण झालेली वाहने',
    hubVehiclesInYard: 'यार्डमधील वाहने',
    hubActiveUnloading: 'सक्रिय अनलोडिंग बे',
    hubEmergencyTrigger: 'आपत्कालीन अडथळा निर्माण करा',
    hubBayBreakdown: 'बे २ यांत्रिक बिघाड',
    hubLaborShortage: 'मजुरांची कमतरता',
    hubRainAlert: 'मुसळधार पाऊस इशारा',
    hubRebalancingActive: 'OR-टूल्स शेड्यूलिंग चालू',
    hubAssayingTitle: 'डिजिटल धान्य गुणवत्ता चाचणी प्रयोगशाळा',
    hubMoisturePercent: 'ओलावा प्रमाण (%)',
    hubQualityGrade: 'प्रमाणित गुणवत्ता ग्रेड',
    hubGrossWeight: 'वजन काटा एकूण वजन (किग्रॅ)',
    hubAdvanceStage: 'पुढील टप्प्यावर पाठवा',
    hubStageScheduled: 'शेड्यूल',
    hubStageGate: 'गेट आगमन',
    hubStageWeighbridge: 'वजन काटा',
    hubStageAssaying: 'गुणवत्ता चाचणी',
    hubStageUnloading: 'अनलोडिंग',
    hubStageCompleted: 'पेमेंट पूर्ण',

    smsTitle: 'व्हॉट्सॲप आणि SMS स्वयंचलित मार्केट गेटवे',
    smsSubtitle: 'साध्या फोन आणि स्मार्टफोनसाठी स्वयंचलित २-मार्गी बॉट',
    smsTabWhatsapp: 'व्हॉट्सॲप बॉट',
    smsTabFeaturePhone: 'साधा फोन SMS',
    smsBotInstructions: 'कमांड पाठवा: 1️⃣ BOOK <पीक> <प्रमाण> <गाव>  2️⃣ STATUS <टोकन>  3️⃣ DELAY <वेळ>',
    smsQuickBookTomato: 'BOOK TOMATO 40 SANWER',
    smsQuickCheckStatus: 'STATUS KRISHI-1001',
    smsQuickReportDelay: 'DELAY 30 TRAFFIC',
    smsInputPlaceholder: 'संदेश लिहा किंवा वरील बटण दाबा...',
    smsSendBtn: 'संदेश पाठवा',
    smsLiveLogs: 'SMS ट्रॅकिंग लॉग',

    arenaTitle: 'ऑपरेशन्स रिसर्च सिम्युलेशन दालन',
    arenaSubtitle: 'गूगल OR-टूल्स विरूद्ध पारंपारिक अनियंत्रित रांग तुलना',
    arenaControlsTitle: 'सिम्युलेशन नियंत्रणे',
    arenaNumFarmers: 'शेतकरी संख्या',
    arenaPerishableRatio: 'नाशिवंत पिके प्रमाण (%)',
    arenaDockBays: 'सक्रिय अनलोडिंग बे',
    arenaSurgeSpike: 'सकाळची गर्दी सिमुलेट करा',
    arenaRunBtn: 'OR-टूल्स सिम्युलेशन सुरू करा',
    arenaRunning: 'गणना चालू आहे...',
    arenaAvgWaitTime: 'वेळेत बचत',
    arenaSpoilagePrevented: 'नासाडी रोखलेली पिके',
    arenaThroughputGain: 'कार्यक्षमता वाढ',
    arenaFuelSavings: 'डिझेल बचत',
    arenaTraditionalFifo: 'पारंपारिक रांग (FIFO)',
    arenaOrToolsOptimized: 'कृषी-फ्लो OR-टूल्स स्मार्ट शेड्यूलिंग',

    authSignInTitle: 'कृषी-फ्लो मध्ये लॉगिन करा',
    authSignInSubtitle: 'बाजारभाव, गेट पास आणि रीअल-टाइम ट्रॅकिंगसाठी साइन इन करा.',
    authRegisterTitle: 'शेतकरी व भागीदार खाते तयार करा',
    authRegisterSubtitle: 'आपली भूमिका निवडा: शेतकरी, एफपीओ किंवा व्यापारी.',
    authMobileOtpTab: '📱 मोबाईल नंबर (OTP)',
    authEmailTab: '✉️ किसान आयडी / ईमेल',
    authFullName: 'पूर्ण नाव',
    authMobileNumber: 'मोबाईल नंबर',
    authEmailAddress: 'ईमेल पत्ता',
    authPassword: 'पासवर्ड',
    authConfirmPassword: 'पासवर्ड पुष्टीकरण',
    authRememberMe: 'माझे लॉगिन चालू ठेवा',
    authGetOtpBtn: 'ओटीपी मिळवा',
    authSignInBtn: 'लॉगिन करा',
    authRegisterBtn: 'नोंदणी करा',
    authEnterOtpTitle: '६-अंकी ओटीपी टाका',
    authVerifyOtpBtn: 'पडताळणी करा आणि पुढे जा',
    authRoleFarmer: 'शेतकरी',
    authRoleFpo: 'एफपीओ / सहकारी',
    authRoleAgronomist: 'कृषी तज्ञ',
    authRoleBuyer: 'व्यापारी / खरेदीदार',
    authDeviceWeb: 'वेब डेस्कटॉप',
    authDeviceTablet: 'टॅबलेट',
    authDeviceMobile: 'मोबाईल फोन',
    authSignOutBtn: 'लॉग आउट',
    authVerifiedKisan: 'प्रमाणित किसान सदस्य',
    authActivePassToken: 'सक्रिय गेट पास',
    authSecurityActive: '2FA + पासकी सुरक्षा सक्रिय'
  },

  // ==========================================
  // PUNJABI (ਪੰਜਾਬੀ)
  // ==========================================
  pa: {
    navFarmerPwa: 'ਕਿਸਾਨ ਪੋਰਟਲ (PWA)',
    navTelanganaCrops: '🌾 ਤੇਲੰਗਾਨਾ ਫਸਲਾਂ',
    navFarmerProfile: '👤 ਮੇਰਾ ਪ੍ਰੋਫਾਈਲ ਤੇ ਜ਼ਮੀਨ ਪਾਸਪੋਰਟ',
    navLandVerification: '📄 ਜ਼ਮੀਨ ਤਸਦੀਕ',
    navHubCenter: 'ਮੰਡੀ ਕਮਾਂਡ ਸੈਂਟਰ',
    navSmsBot: 'ਵਟਸਐਪ / SMS ਬੋਟ',
    navJudgeArena: 'ਜੱਜ ਅਰੀਨਾ',
    navLoginRegister: 'ਸਾਈਨ ਇਨ / ਰਜਿਸਟਰ',
    navKisanId: 'ਕਿਸਾਨ ਆਈਡੀ',
    navCloudDeploy: 'ਕਲਾਉਡ ਡਿਪਲਾਏ',
    navEngineBadge: 'OR-ਟੂਲਸ CP-SAT',
    navTagline: 'ਤੇਲੰਗਾਨਾ ਫਸਲਾਂ ਅਤੇ ਧਰਣੀ ਜ਼ਮੀਨ ਰਿਕਾਰਡ ਪੋਰਟਲ',
    navResetDemo: 'ਡੈਮੋ ਰੀਸੈਟ ਕਰੋ',

    telanganaHeaderBadge: 'ਤੇਲੰਗਾਨਾ ਰਾਜ ਸੰਪੂਰਨ ਖੇਤੀਬਾੜੀ ਅਤੇ ਬਾਗਬਾਨੀ ਡਾਇਰੈਕਟਰੀ',
    telanganaTitle: 'ਤੇਲੰਗਾਨਾ ਦੀਆਂ ਫਸਲਾਂ, ਫਲ, ਸਬਜ਼ੀਆਂ ਅਤੇ ਬਨਸਪਤੀ',
    telanganaSubtitle: 'ਤੇਲੰਗਾਨਾ ਦੇ 33 ਜ਼ਿਲ੍ਹਿਆਂ ਵਿੱਚ ਝੋਨਾ, ਨਰਮਾ, ਦਾਲਾਂ, ਹਲਦੀ, ਮਿਰਚ ਅਤੇ ਅੰਬ ਦੀ ਪੂਰੀ ਜਾਣਕਾਰੀ ਅਤੇ ਮੰਡੀ ਭਾਅ।',
    telanganaCatalogedCrops: 'ਦਰਜ ਫਸਲਾਂ',
    telanganaCategoriesCount: '9 ਸ਼੍ਰੇਣੀਆਂ',
    telanganaDistrictsCount: '33 ਜ਼ਿਲ੍ਹੇ',
    telanganaSearchPlaceholder: 'ਫਸਲ ਦਾ ਨਾਮ ਖੋਜੋ (ਜਿਵੇਂ: ਝੋਨਾ, ਕਪਾਹ, ਦਾਲ, ਹਲਦੀ, ਅੰਬ)...',
    telanganaAllDistricts: 'ਸਾਰੇ ਜ਼ਿਲ੍ਹੇ',
    telanganaAllSeasons: 'ਸਾਰੇ ਮੌਸਮ',
    telanganaWaterNeed: 'ਪਾਣੀ ਦੀ ਲੋੜ',
    telanganaShowing: 'ਦਿਖਾ ਰਿਹਾ ਹੈ',
    telanganaCropsFlora: 'ਤੇਲੰਗਾਨਾ ਫਸਲਾਂ ਅਤੇ ਬੂਟੇ',
    telanganaResetFilters: 'ਫਿਲਟਰ ਰੀਸੈਟ ਕਰੋ',
    telanganaMandiBenchmark: 'ਮੰਡੀ ਭਾਅ',
    telanganaSeason: 'ਮੌਸਮ',
    telanganaWater: 'ਪਾਣੀ ਦੀ ਲੋੜ',
    telanganaCultivationGuide: 'ਕਾਸ਼ਤ ਗਾਈਡ',
    telanganaBookSlot: 'ਸਲਾਟ ਬੁੱਕ ਕਰੋ',
    telanganaOverview: 'ਕਾਸ਼ਤ ਸੰਖੇਪ',
    telanganaSuitableSoil: 'ਢੁਕਵੀਂ ਜ਼ਮੀਨ',
    telanganaDuration: 'ਫਸਲ ਦਾ ਸਮਾਂ',
    telanganaAvgYield: 'ਪ੍ਰਤੀ ਏਕੜ ਔਸਤ ਝਾੜ',
    telanganaPriceRange: 'APMC ਮੰਡੀ ਕੀਮਤ ਸੀਮਾ',
    telanganaRecommendedVarieties: 'ਸਿਫਾਰਸ਼ ਕੀਤੀਆਂ ਕਿਸਮਾਂ',
    telanganaKeyDistricts: 'ਮੁੱਖ ਉਤਪਾਦਕ ਜ਼ਿਲ੍ਹੇ',
    telanganaFarmerBenefits: 'ਕਿਸਾਨ ਲਾਭ',
    telanganaPrimaryHub: 'ਮੁੱਖ ਖਰੀਦ ਕੇਂਦਰ',
    telanganaBookSlotFor: 'ਡਿਲੀਵਰੀ ਸਲਾਟ ਬੁੱਕ ਕਰੋ',

    farmerTitle: 'ਕਿਸਾਨ ਖਰੀਦ ਸਲਾਟ ਬੁਕਿੰਗ ਪੋਰਟਲ',
    farmerSubtitle: 'ਏਆਈ-ਅਧਾਰਿਤ ਸਲਾਟ ਅਤੇ ਡਿਜੀਟਲ ਕ੍ਰਿਸ਼ੀ-ਪਾਸ',
    farmerName: 'ਕਿਸਾਨ ਦਾ ਨਾਮ',
    farmerPhone: 'ਮੋਬਾਈਲ ਨੰਬਰ',
    farmerVillage: 'ਪਿੰਡ / ਥਾਂ',
    farmerCropType: 'ਫਸਲ ਦੀ ਕਿਸਮ',
    farmerQuantity: 'ਮਾਤਰਾ (ਕੁਇੰਟਲ)',
    farmerVehicle: 'ਵਾਹਨ ਦੀ ਕਿਸਮ',
    farmerDistance: 'ਮੰਡੀ ਤੋਂ ਦੂਰੀ (ਕਿ.ਮੀ.)',
    farmerTravelEst: 'ਸਫ਼ਰ ਦਾ ਅੰਦਾਜ਼ਾ',
    farmerPreferredHour: 'ਤਰਜੀਹੀ ਸਮਾਂ',
    farmerBookBtn: 'ਸਲਾਟ ਤੇ ਪਾਸ ਬਣਾਓ',
    farmerBooking: 'ਸਲਾਟ ਬਣ ਰਿਹਾ ਹੈ...',
    farmerPassTitle: 'ਡਿਜੀਟਲ ਕ੍ਰਿਸ਼ੀ-ਪਾਸ (ਟੋਕਨ)',
    farmerBayAssigned: 'ਅਲਾਟ ਕੀਤੀ ਬੇਅ',
    farmerSlotTime: 'ਪਹੁੰਚਣ ਦਾ ਸਮਾਂ',
    farmerDepartureAdvisory: 'ਸਫ਼ਰ ਸਲਾਹ',
    farmerDepartBy: 'ਚੱਲਣ ਦਾ ਸਹੀ ਸਮਾਂ',
    farmerSpoilageProtection: 'ਖ਼ਰਾਬੀ ਸੁਰੱਖਿਆ ਰੇਟਿੰਗ',
    farmerStageTracker: 'ਲਾਈਵ ਸਥਿਤੀ',
    farmerPayoutEst: 'ਅੰਦਾਜ਼ਨ ਡੀਬੀਟੀ ਰਕਮ',
    farmerOfflineReady: 'ਔਫਲਾਈਨ ਪਾਸ ਤਿਆਰ',
    farmerKisanSignInBtn: 'ਕਿਸਾਨ ਸਾਈਨ ਇਨ / ਰਜਿਸਟਰ',
    farmerActiveHub: 'ਸਰਗਰਮ ਮੰਡੀ ਕੇਂਦਰ',

    hubTitle: 'ਮੰਡੀ ਕਮਾਂਡ ਸੈਂਟਰ',
    hubSubtitle: 'ਲਾਈਵ ਅਨਲੋਡਿੰਗ ਬੇਅ, ਕੰਡੇ, ਲੈਬ ਟੈਸਟਿੰਗ ਅਤੇ ਏਆਈ ਸ਼ਡਿਊਲਿੰਗ',
    hubTotalVolume: 'ਕੁੱਲ ਅੰਦਾਜ਼ਨ ਆਮਦ (ਟਨ)',
    hubCompletedLoads: 'ਪੂਰੇ ਹੋਏ ਲੋਡ',
    hubVehiclesInYard: 'ਯਾਰਡ ਵਿੱਚ ਵਾਹਨ',
    hubActiveUnloading: 'ਸਰਗਰਮ ਬੇਅ',
    hubEmergencyTrigger: 'ਐਮਰਜੈਂਸੀ ਰੁਕਾਵਟ ਬਣਾਓ',
    hubBayBreakdown: 'ਬੇਅ 2 ਖਰਾਬੀ',
    hubLaborShortage: 'ਲੇਬਰ ਦੀ ਘਾਟ',
    hubRainAlert: 'ਭਾਰੀ ਮੀਂਹ ਚੇਤਾਵਨੀ',
    hubRebalancingActive: 'OR-ਟੂਲਸ ਰੀਬੈਲੈਂਸਿੰਗ ਚਾਲੂ',
    hubAssayingTitle: 'ਡਿਜੀਟਲ ਗੁਣਵੱਤਾ ਲੈਬ',
    hubMoisturePercent: 'ਨਮੀ ਦੀ ਮਾਤਰਾ (%)',
    hubQualityGrade: 'ਗੁਣਵੱਤਾ ਗ੍ਰੇਡ',
    hubGrossWeight: 'ਕੰਡਾ ਕੁੱਲ ਵਜ਼ਨ (ਕਿਲੋ)',
    hubAdvanceStage: 'ਅਗਲੇ ਪੜਾਅ ਤੇ ਭੇਜੋ',
    hubStageScheduled: 'ਸ਼ਡਿਊਲ',
    hubStageGate: 'ਗੇਟ ਐਂਟਰੀ',
    hubStageWeighbridge: 'ਕੰਡਾ (ਵਜ਼ਨ)',
    hubStageAssaying: 'ਗੁਣਵੱਤਾ ਜਾਂਚ',
    hubStageUnloading: 'ਅਨਲੋਡਿੰਗ',
    hubStageCompleted: 'ਭੁਗਤਾਨ ਪੂਰਾ',

    smsTitle: 'ਵਟਸਐਪ ਅਤੇ SMS ਆਟੋਮੇਟਿਡ ਮੰਡੀ ਗੇਟਵੇ',
    smsSubtitle: 'ਕੀਪੈਡ ਫੋਨਾਂ ਅਤੇ ਸਮਾਰਟਫੋਨਾਂ ਦੋਵਾਂ ਲਈ 2-ਤਰਫਾ ਬੋਟ',
    smsTabWhatsapp: 'ਵਟਸਐਪ ਬੋਟ',
    smsTabFeaturePhone: 'ਸਾਧਾਰਨ ਫੋਨ SMS',
    smsBotInstructions: 'ਕਮਾਂਡ ਭੇਜੋ: 1️⃣ BOOK <ਫਸਲ> <ਮਾਤਰਾ> <ਪਿੰਡ>  2️⃣ STATUS <ਟੋਕਨ>  3️⃣ DELAY <ਮਿੰਟ>',
    smsQuickBookTomato: 'BOOK TOMATO 40 SANWER',
    smsQuickCheckStatus: 'STATUS KRISHI-1001',
    smsQuickReportDelay: 'DELAY 30 TRAFFIC',
    smsInputPlaceholder: 'ਸੁਨੇਹਾ ਲਿਖੋ ਜਾਂ ਉੱਪਰ ਵਾਲਾ ਬਟਨ ਦਬਾਓ...',
    smsSendBtn: 'ਸੁਨੇਹਾ ਭੇਜੋ',
    smsLiveLogs: 'SMS ਡਿਸਪੈਚ ਲੌਗ',

    arenaTitle: 'ਆਪਰੇਸ਼ਨ ਰਿਸਰਚ ਸਿਮੂਲੇਸ਼ਨ ਅਰੀਨਾ',
    arenaSubtitle: 'ਗੂਗਲ OR-ਟੂਲਸ ਬਨਾਮ ਆਮ ਮੰਡੀ ਕਤਾਰ ਤੁਲਨਾ',
    arenaControlsTitle: 'ਸਿਮੂਲੇਸ਼ਨ ਪੈਰਾਮੀਟਰ',
    arenaNumFarmers: 'ਕਿਸਾਨਾਂ ਦੀ ਗਿਣਤੀ',
    arenaPerishableRatio: 'ਖਰਾਬ ਹੋਣ ਵਾਲੀਆਂ ਫਸਲਾਂ (%)',
    arenaDockBays: 'ਸਰਗਰਮ ਅਨਲੋਡਿੰਗ ਬੇਅ',
    arenaSurgeSpike: 'ਸਵੇਰ ਦੀ ਭੀੜ ਸਿਮੂਲੇਟ ਕਰੋ',
    arenaRunBtn: 'OR-ਟੂਲਸ ਲਾਈਵ ਸਿਮੂਲੇਸ਼ਨ ਚਲਾਓ',
    arenaRunning: 'ਹਿਸਾਬ ਲਗਾਇਆ ਜਾ ਰਿਹਾ ਹੈ...',
    arenaAvgWaitTime: 'ਉਡੀਕ ਸਮੇਂ ਵਿੱਚ ਕਮੀ',
    arenaSpoilagePrevented: 'ਬਚਾਈ ਗਈ ਫਸਲ',
    arenaThroughputGain: 'ਮੰਡੀ ਸਮਰੱਥਾ ਵਾਧਾ',
    arenaFuelSavings: 'ਡੀਜ਼ਲ ਬਚਤ',
    arenaTraditionalFifo: 'ਰਵਾਇਤੀ ਕਤਾਰ (FIFO)',
    arenaOrToolsOptimized: 'ਕ੍ਰਿਸ਼ੀ-ਫਲੋ OR-ਟੂਲਸ ਸਮਾਰਟ ਸ਼ਡਿਊਲ',

    authSignInTitle: 'ਕ੍ਰਿਸ਼ੀ-ਫਲੋ ਵਿੱਚ ਸਾਈਨ ਇਨ ਕਰੋ',
    authSignInSubtitle: 'ਮੰਡੀ ਭਾਅ ਅਤੇ ਡਿਜੀਟਲ ਗੇਟ ਪਾਸ ਪ੍ਰਾਪਤ ਕਰੋ।',
    authRegisterTitle: 'ਕਿਸਾਨ ਖਾਤਾ ਬਣਾਓ',
    authRegisterSubtitle: 'ਆਪਣੀ ਭੂਮਿਕਾ ਚੁਣੋ: ਕਿਸਾਨ ਜਾਂ ਵਪਾਰੀ।',
    authMobileOtpTab: '📱 ਮੋਬਾਈਲ ਨੰਬਰ (OTP)',
    authEmailTab: '✉️ ਕਿਸਾਨ ਆਈਡੀ / ਈਮੇਲ',
    authFullName: 'ਪੂਰਾ ਨਾਮ',
    authMobileNumber: 'ਮੋਬਾਈਲ ਨੰਬਰ',
    authEmailAddress: 'ਈਮੇਲ ਪਤਾ',
    authPassword: 'ਪਾਸਵਰਡ',
    authConfirmPassword: 'ਪਾਸਵਰਡ ਪੁਸ਼ਟੀ',
    authRememberMe: 'ਮੈਨੂੰ ਯਾਦ ਰੱਖੋ',
    authGetOtpBtn: 'ਓਟੀਪੀ ਪ੍ਰਾਪਤ ਕਰੋ',
    authSignInBtn: 'ਸਾਈਨ ਇਨ ਕਰੋ',
    authRegisterBtn: 'ਰਜਿਸਟਰ ਕਰੋ',
    authEnterOtpTitle: '6-ਅੰਕੀ ਓਟੀਪੀ ਦਰਜ ਕਰੋ',
    authVerifyOtpBtn: 'ਪੁਸ਼ਟੀ ਕਰੋ ਅਤੇ ਅੱਗੇ ਵਧੋ',
    authRoleFarmer: 'ਕਿਸਾਨ',
    authRoleFpo: 'ਐਫਪੀਓ / ਸਹਿਕਾਰੀ',
    authRoleAgronomist: 'ਖੇਤੀ ਵਿਗਿਆਨੀ',
    authRoleBuyer: 'ਵਪਾਰੀ / ਖਰੀਦਦਾਰ',
    authDeviceWeb: 'ਵੈੱਬ ਡੈਸਕਟਾਪ',
    authDeviceTablet: 'ਟੈਬਲੇਟ',
    authDeviceMobile: 'ਮੋਬਾਈਲ ਫ਼ੋਨ',
    authSignOutBtn: 'ਸਾਈਨ ਆਉਟ',
    authVerifiedKisan: 'ਪ੍ਰਮਾਣਿਤ ਕਿਸਾਨ ਮੈਂਬਰ',
    authActivePassToken: 'ਸਰਗਰਮ ਗੇਟ ਪਾਸ',
    authSecurityActive: '2FA + ਪਾਸਕੀ ਸੁਰੱਖਿਆ ਚਾਲੂ'
  }
};

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    const saved = localStorage.getItem('krishiflow_language') as SupportedLanguage;
    return saved && TRANSLATIONS[saved] ? saved : 'en';
  });

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    localStorage.setItem('krishiflow_language', lang);
  };

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
