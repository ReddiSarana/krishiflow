import { LandRecord } from '../types/auth';

export interface DharaniLandRecordSample {
  pattadarName: string;
  fatherOrHusbandName: string;
  pattadarPassbookNo: string;
  khataNo: string;
  surveyNo: string;
  district: string;
  mandal: string;
  village: string;
  totalAcres: number;
  cultivableAcres: number;
  soilType: string;
  waterSource: string;
  activeCrops: string[];
  rythuBandhuEligible: boolean;
  rythuBimaEnrolled: boolean;
  pmKisanDbtActive: boolean;
  dharaniCertificateId: string;
}

export const TELANGANA_LAND_SAMPLES: DharaniLandRecordSample[] = [
  {
    pattadarName: 'Mallesham Goud',
    fatherOrHusbandName: 'Late Ramulu Goud',
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
    activeCrops: ['Warangal Teja Chilli', 'Cotton (Kapas)', 'Maize (Mokka Jonna)'],
    rythuBandhuEligible: true,
    rythuBimaEnrolled: true,
    pmKisanDbtActive: true,
    dharaniCertificateId: 'DH-TEL-WGL-2026-89421'
  },
  {
    pattadarName: 'Rami Reddy',
    fatherOrHusbandName: 'Narayana Reddy',
    pattadarPassbookNo: 'T-918237461',
    khataNo: '189',
    surveyNo: '89/2 & 90/1',
    district: 'Nizamabad',
    mandal: 'Armoor',
    village: 'Balkonda',
    totalAcres: 6.0,
    cultivableAcres: 5.5,
    soilType: 'Red Loamy Soil (Chalka)',
    waterSource: 'Sri Ram Sagar Project (SRSP) Canal + Tube Well',
    activeCrops: ['Nizamabad Turmeric (Pasupu)', 'Paddy / Rice (Sona Masoori)', 'Sesame (Nuvvulu)'],
    rythuBandhuEligible: true,
    rythuBimaEnrolled: true,
    pmKisanDbtActive: true,
    dharaniCertificateId: 'DH-TEL-NZB-2026-44102'
  },
  {
    pattadarName: 'Basavaraj Patil',
    fatherOrHusbandName: 'Sangappa Patil',
    pattadarPassbookNo: 'T-563829104',
    khataNo: '305',
    surveyNo: '204/1',
    district: 'Vikarabad',
    mandal: 'Tandur',
    village: 'Basheerabad',
    totalAcres: 8.5,
    cultivableAcres: 8.0,
    soilType: 'Deep Black Soil with High Calcium Limestone',
    waterSource: 'Rainfed + Farm Pond Harvesting',
    activeCrops: ['Tandur Red Gram (GI Tag Kandi)', 'Jowar (Jonna)', 'Castor (Aamudamu)'],
    rythuBandhuEligible: true,
    rythuBimaEnrolled: true,
    pmKisanDbtActive: true,
    dharaniCertificateId: 'DH-TEL-VKR-2026-19385'
  },
  {
    pattadarName: 'Venkataiah Kuruma',
    fatherOrHusbandName: 'Mallaiah Kuruma',
    pattadarPassbookNo: 'T-774910382',
    khataNo: '521',
    surveyNo: '312/AA',
    district: 'Jagtial',
    mandal: 'Korutla',
    village: 'Metpalli',
    totalAcres: 5.0,
    cultivableAcres: 4.8,
    soilType: 'Well-drained Alluvial Sandy Loam',
    waterSource: 'Drip Micro-Irrigation + Open Well',
    activeCrops: ['Jagtial Mango (Benishan / Banganapalle)', 'Turmeric', 'Mulberry Sericulture'],
    rythuBandhuEligible: true,
    rythuBimaEnrolled: true,
    pmKisanDbtActive: true,
    dharaniCertificateId: 'DH-TEL-JGT-2026-77291'
  },
  {
    pattadarName: 'Satyanarayana Murthy',
    fatherOrHusbandName: 'Appa Rao',
    pattadarPassbookNo: 'T-339182740',
    khataNo: '240',
    surveyNo: '167/3 & 168',
    district: 'Khammam',
    mandal: 'Kallur',
    village: 'Wyra',
    totalAcres: 10.0,
    cultivableAcres: 9.5,
    soilType: 'Clayey Loam Soil',
    waterSource: 'Nagarjuna Sagar Left Canal + Borewell',
    activeCrops: ['Oil Palm', 'Paddy / Rice (Telangana Sona)', 'Warangal Teja Chilli'],
    rythuBandhuEligible: true,
    rythuBimaEnrolled: true,
    pmKisanDbtActive: true,
    dharaniCertificateId: 'DH-TEL-KHM-2026-62019'
  }
];

export const verifyLandDocumentRecord = async (
  pattadarPassbookNo: string,
  surveyNo: string,
  district: string,
  mandal: string,
  village: string,
  acres: number,
  soilType: string,
  waterSource: string
): Promise<LandRecord> => {
  // Simulate Dharani Portal REST API Latency
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Check if matches one of the pre-configured Dharani records
  const match = TELANGANA_LAND_SAMPLES.find(
    (s) =>
      s.pattadarPassbookNo.toUpperCase().trim() === pattadarPassbookNo.toUpperCase().trim() ||
      (s.district.toLowerCase() === district.toLowerCase() && s.mandal.toLowerCase() === mandal.toLowerCase())
  );

  if (match) {
    return {
      pattadarPassbookNo: match.pattadarPassbookNo,
      khataNo: match.khataNo,
      surveyNo: surveyNo || match.surveyNo,
      district: match.district,
      mandal: match.mandal,
      village: match.village,
      totalAcres: acres || match.totalAcres,
      cultivableAcres: (acres ? acres * 0.9 : match.cultivableAcres),
      soilType: soilType || match.soilType,
      waterSource: waterSource || match.waterSource,
      verifiedVia: 'Telangana Dharani Portal',
      verificationDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      dharaniCertificateId: match.dharaniCertificateId,
      isVerified: true,
      activeCrops: match.activeCrops,
      rythuBandhuEligible: match.rythuBandhuEligible,
      rythuBimaEnrolled: match.rythuBimaEnrolled,
      pmKisanDbtActive: match.pmKisanDbtActive
    };
  }

  // Generate verified dynamic certificate for custom farmer inputs
  const randomCertId = `DH-TEL-${district.substring(0, 3).toUpperCase()}-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
  const cleanPassbook = pattadarPassbookNo || `T-${Math.floor(100000000 + Math.random() * 900000000)}`;
  const cleanSurvey = surveyNo || `${Math.floor(50 + Math.random() * 300)}/${['A', 'B', '1', '2'][Math.floor(Math.random() * 4)]}`;

  return {
    pattadarPassbookNo: cleanPassbook,
    khataNo: `${Math.floor(100 + Math.random() * 800)}`,
    surveyNo: cleanSurvey,
    district: district || 'Warangal',
    mandal: mandal || 'Narsampet',
    village: village || 'Chennaraopet',
    totalAcres: acres > 0 ? acres : 4.0,
    cultivableAcres: acres > 0 ? Number((acres * 0.9).toFixed(1)) : 3.6,
    soilType: soilType || 'Black Cotton Soil (Regur)',
    waterSource: waterSource || 'Borewell + Drip Irrigation',
    verifiedVia: 'Telangana Dharani Portal',
    verificationDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
    dharaniCertificateId: randomCertId,
    isVerified: true,
    activeCrops: ['Cotton (Kapas)', 'Paddy / Rice', 'Tandur Red Gram'],
    rythuBandhuEligible: true,
    rythuBimaEnrolled: true,
    pmKisanDbtActive: true
  };
};
