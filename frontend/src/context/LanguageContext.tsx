import React, { createContext, useContext, useState, useEffect } from 'react';

export type SupportedLanguage = 'en' | 'te' | 'hi' | 'mr' | 'pa';

export interface Translations {
  // Navigation
  navFarmerPwa: string;
  navTelanganaCrops: string;
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
}

export const TRANSLATIONS: Record<SupportedLanguage, Translations> = {
  en: {
    // Nav
    navFarmerPwa: 'Farmer PWA',
    navTelanganaCrops: '🌾 Telangana Crops',
    navHubCenter: 'Hub Command Center',
    navSmsBot: 'WhatsApp / SMS Bot',
    navJudgeArena: 'CSBS Judge Arena',
    navLoginRegister: 'Sign In / Register',
    navKisanId: 'Kisan ID',
    navCloudDeploy: 'Cloud Deploy',
    navEngineBadge: 'OR-Tools CP-SAT',
    navTagline: 'Dynamic Agri-Logistics & Telangana Crops Knowledge Explorer',
    navResetDemo: 'Reset Live Demo Dataset',

    // Telangana Crops
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

    // Farmer Portal
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

    // Auth Portal
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
    authDeviceMobile: 'Mobile Phone'
  },

  // TELUGU (తెలుగు)
  te: {
    // Nav
    navFarmerPwa: 'రైతు పోర్టల్ (PWA)',
    navTelanganaCrops: '🌾 తెలంగాణ పంటలు',
    navHubCenter: 'హబ్ కమాండ్ సెంటర్',
    navSmsBot: 'వాట్సాప్ / SMS బాట్',
    navJudgeArena: 'జడ్జ్ అరేనా',
    navLoginRegister: 'లాగిన్ / రిజిస్టర్',
    navKisanId: 'కిసాన్ ఐడీ',
    navCloudDeploy: 'క్లౌడ్ డిప్లాయ్',
    navEngineBadge: 'OR-టూల్స్ AI ఇంజిన్',
    navTagline: 'తెలంగాణ సమగ్ర పంటలు మరియు డైనమిక్ వ్యవసాయ లాజిస్టిక్స్ పోర్టల్',
    navResetDemo: 'డెమో రీసెట్ చేయండి',

    // Telangana Crops
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

    // Farmer Portal
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

    // Auth Portal
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
    authDeviceMobile: 'మొబైల్ ఫోన్'
  },

  // HINDI (हिन्दी)
  hi: {
    // Nav
    navFarmerPwa: 'किसान पोर्टल (PWA)',
    navTelanganaCrops: '🌾 तेलंगाना फसलें',
    navHubCenter: 'मंडी कमांड सेंटर',
    navSmsBot: 'व्हाट्सएप / SMS बॉट',
    navJudgeArena: 'जज एरीना',
    navLoginRegister: 'लॉग इन / रजिस्टर',
    navKisanId: 'किसान आईडी',
    navCloudDeploy: 'क्लाउड डिप्लॉय',
    navEngineBadge: 'OR-टूल्स CP-SAT',
    navTagline: 'तेलंगाना कृषि निर्देशिका एवं गतिशील कृषि-लॉजिस्टिक्स प्रणाली',
    navResetDemo: 'डेमो डेटा रीसेट करें',

    // Telangana Crops
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

    // Farmer Portal
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

    // Auth Portal
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
    authDeviceMobile: 'मोबाइल फोन'
  },

  // MARATHI (मराठी)
  mr: {
    // Nav
    navFarmerPwa: 'शेतकरी पोर्टल (PWA)',
    navTelanganaCrops: '🌾 तेलंगणा पिके',
    navHubCenter: 'खरेदी केंद्र नियंत्रण',
    navSmsBot: 'व्हॉट्सॲप / SMS बॉट',
    navJudgeArena: 'परीक्षक दालन',
    navLoginRegister: 'लॉगिन / नोंदणी',
    navKisanId: 'किसान आयडी',
    navCloudDeploy: 'क्लाउड डिप्लॉय',
    navEngineBadge: 'OR-टूल्स CP-SAT',
    navTagline: 'तेलंगणा पिके निर्देशिका आणि कृषी लॉजिस्टिक्स प्लॅटफॉर्म',
    navResetDemo: 'डेमो डेटा पूर्ववत करा',

    // Telangana Crops
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

    // Farmer Portal
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

    // Auth Portal
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
    authDeviceMobile: 'मोबाईल फोन'
  },

  // PUNJABI (ਪੰਜਾਬੀ)
  pa: {
    // Nav
    navFarmerPwa: 'ਕਿਸਾਨ ਪੋਰਟਲ (PWA)',
    navTelanganaCrops: '🌾 ਤੇਲੰਗਾਨਾ ਫਸਲਾਂ',
    navHubCenter: 'ਮੰਡੀ ਕਮਾਂਡ ਸੈਂਟਰ',
    navSmsBot: 'ਵਟਸਐਪ / SMS ਬੋਟ',
    navJudgeArena: 'ਜੱਜ ਅਰੀਨਾ',
    navLoginRegister: 'ਸਾਈਨ ਇਨ / ਰਜਿਸਟਰ',
    navKisanId: 'ਕਿਸਾਨ ਆਈਡੀ',
    navCloudDeploy: 'ਕਲਾਉਡ ਡਿਪਲਾਏ',
    navEngineBadge: 'OR-ਟੂਲਸ CP-SAT',
    navTagline: 'ਤੇਲੰਗਾਨਾ ਫਸਲਾਂ ਡਾਇਰੈਕਟਰੀ ਅਤੇ ਐਗਰੀ-ਲਾਜਿਸਟਿਕਸ ਪੋਰਟਲ',
    navResetDemo: 'ਡੈਮੋ ਰੀਸੈਟ ਕਰੋ',

    // Telangana Crops
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

    // Farmer Portal
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

    // Auth Portal
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
    authDeviceMobile: 'ਮੋਬਾਈਲ ਫ਼ੋਨ'
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
