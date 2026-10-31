import { GeoLocation } from './types';

export const TITHI_NAMES = [
  'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
  'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
  'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima'
];

export const TITHI_DEVANAGARI = [
  'प्रतिपदा', 'द्वितीया', 'तृतीया', 'चतुर्थी', 'पञ्चमी',
  'षष्ठी', 'सप्तमी', 'अष्टमी', 'नवमी', 'दशमी',
  'एकादशी', 'द्वादशी', 'त्रयोदशी', 'चतुर्दशी', 'पूर्णिमा'
];

export const TITHI_DEITIES = [
  'Agni', 'Brahma', 'Gauri', 'Ganesha', 'Naga',
  'Kartikeya', 'Surya', 'Shiva', 'Durga', 'Yama',
  'Vishva Devas', 'Vishnu', 'Kamadeva', 'Shiva', 'Chandra'
];

export const NAKSHATRA_NAMES = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira',
  'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha',
  'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati',
  'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha',
  'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada',
  'Uttara Bhadrapada', 'Revati'
];

export const NAKSHATRA_DEVANAGARI = [
  'अश्विनी', 'भरणी', 'कृत्तिका', 'रोहिणी', 'मृगशिरा',
  'आर्द्रा', 'पुनर्वसु', 'पुष्य', 'आश्लेषा', 'मघा',
  'पूर्वा फाल्गुनी', 'उत्तरा फाल्गुनी', 'हस्त', 'चित्रा', 'स्वाति',
  'विशाखा', 'अनुराधा', 'ज्येष्ठा', 'मूल', 'पूर्वाषाढा',
  'उत्तराषाढा', 'श्रवण', 'धनिष्ठा', 'शतभिषा', 'पूर्वाभाद्रपदा',
  'उत्तराभाद्रपदा', 'रेवती'
];

export const NAKSHATRA_LORDS = [
  'Ketu', 'Shukra (Venus)', 'Surya (Sun)', 'Chandra (Moon)', 'Mangala (Mars)',
  'Rahu', 'Guru (Jupiter)', 'Shani (Saturn)', 'Budha (Mercury)', 'Ketu',
  'Shukra (Venus)', 'Surya (Sun)', 'Chandra (Moon)', 'Mangala (Mars)', 'Rahu',
  'Guru (Jupiter)', 'Shani (Saturn)', 'Budha (Mercury)', 'Ketu', 'Shukra (Venus)',
  'Surya (Sun)', 'Chandra (Moon)', 'Mangala (Mars)', 'Rahu', 'Guru (Jupiter)',
  'Shani (Saturn)', 'Budha (Mercury)'
];

export const NAKSHATRA_DEITIES = [
  'Ashwini Kumaras', 'Yama', 'Agni', 'Brahma', 'Soma (Moon)',
  'Rudra', 'Aditi', 'Brihaspati', 'Sarpa (Serpent)', 'Pitris (Ancestors)',
  'Bhaga', 'Aryaman', 'Savitr (Sun)', 'Twashtr (Viswakarma)', 'Vayu (Wind)',
  'Indragni', 'Mitra', 'Indra', 'Nirriti', 'Apah (Water)',
  'Vishwadevas', 'Vishnu', 'Vasus', 'Varuna', 'Ajaikapada',
  'Ahirbudhnya', 'Pushan'
];

export const YOGA_NAMES = [
  'Vishkumbha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana',
  'Atiganda', 'Sukarma', 'Dhriti', 'Shula', 'Ganda',
  'Vriddhi', 'Dhruva', 'Vyaghata', 'Harshana', 'Vajra',
  'Siddhi', 'Vyatipata', 'Variyana', 'Parigha', 'Shiva',
  'Siddha', 'Sadhya', 'Shubha', 'Shukla', 'Brahma',
  'Indra', 'Vaidhriti'
];

export const YOGA_DEVANAGARI = [
  'विष्कम्भ', 'प्रीति', 'आयुष्मान्', 'सौभाग्य', 'शोभन',
  'अतिगण्ड', 'सुकर्मा', 'धृति', 'शूल', 'गण्ड',
  'वृद्धि', 'ध्रुव', 'व्याघात', 'हर्षण', 'वज्र',
  'सिद्धि', 'व्यतीपात', 'वरीयान्', 'परिघ', 'शिव',
  'सिद्ध', 'साध्य', 'शुभ', 'शुक्ल', 'ब्रह्म',
  'इन्द्र', 'वैधृति'
];

export const YOGA_NATURE: Array<'Auspicious' | 'Inauspicious' | 'Neutral'> = [
  'Inauspicious', 'Auspicious', 'Auspicious', 'Auspicious', 'Auspicious',
  'Inauspicious', 'Auspicious', 'Auspicious', 'Inauspicious', 'Inauspicious',
  'Auspicious', 'Auspicious', 'Inauspicious', 'Auspicious', 'Inauspicious',
  'Auspicious', 'Inauspicious', 'Auspicious', 'Inauspicious', 'Auspicious',
  'Auspicious', 'Auspicious', 'Auspicious', 'Auspicious', 'Auspicious',
  'Auspicious', 'Inauspicious'
];

export const CHARA_KARANAS = [
  'Bava', 'Balava', 'Kaulava', 'Taitila', 'Gara', 'Vanija', 'Vishti (Bhadra)'
];

export const CHARA_KARANAS_DEVANAGARI = [
  'बव', 'बालव', 'कौलव', 'तैतिल', 'गर', 'वणिज', 'विष्टि (भद्रा)'
];

export const STHIRA_KARANAS = ['Shakuni', 'Chatushpada', 'Naga', 'Kimstughna'];
export const STHIRA_KARANAS_DEVANAGARI = ['शकुनि', 'चतुष्पाद', 'नाग', 'किंस्तुघ्न'];

export const RASHI_NAMES = [
  'Mesha', 'Vrishabha', 'Mithuna', 'Karka', 'Simha', 'Kanya',
  'Tula', 'Vrishchika', 'Dhanu', 'Makara', 'Kumbha', 'Meena'
];

export const RASHI_DEVANAGARI = [
  'मेष', 'वृषभ', 'मिथुन', 'कर्क', 'सिंह', 'कन्या',
  'तुला', 'वृश्चिक', 'धनु', 'मकर', 'कुम्भ', 'मीन'
];

export const RASHI_ENGLISH = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

export const RASHI_LORDS = [
  'Mangala (Mars)', 'Shukra (Venus)', 'Budha (Mercury)', 'Chandra (Moon)', 'Surya (Sun)', 'Budha (Mercury)',
  'Shukra (Venus)', 'Mangala (Mars)', 'Guru (Jupiter)', 'Shani (Saturn)', 'Shani (Saturn)', 'Guru (Jupiter)'
];

export const RASHI_ELEMENTS: Array<'Fire' | 'Earth' | 'Air' | 'Water'> = [
  'Fire', 'Earth', 'Air', 'Water', 'Fire', 'Earth',
  'Air', 'Water', 'Fire', 'Earth', 'Air', 'Water'
];

export const LUNAR_MONTHS = [
  'Chaitra', 'Vaishakha', 'Jyeshtha', 'Ashadha', 'Shravana', 'Bhadrapada',
  'Ashwin', 'Kartik', 'Margashirsha', 'Pausha', 'Magha', 'Phalguna'
];

export const LUNAR_MONTHS_DEVANAGARI = [
  'चैत्र', 'वैशाख', 'ज्येष्ठ', 'आषाढ', 'श्रावण', 'भाद्रपद',
  'आश्विन', 'कार्तिक', 'मार्गशीर्ष', 'पौष', 'माघ', 'फाल्गुन'
];

export const VARA_NAMES = ['Ravivara', 'Somavara', 'Mangalavara', 'Budhavara', 'Guruvara', 'Shukravara', 'Shanivara'];
export const VARA_DEVANAGARI = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
export const VARA_ENGLISH = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const VARA_LORDS = ['Surya (Sun)', 'Chandra (Moon)', 'Mangala (Mars)', 'Budha (Mercury)', 'Guru (Jupiter)', 'Shukra (Venus)', 'Shani (Saturn)'];

export const RAHU_KAAL_PARTS = [8, 2, 7, 5, 6, 4, 3]; // 1-indexed eighth of the daytime for Sun..Sat
export const YAMAGANDA_PARTS = [5, 4, 3, 2, 1, 7, 6];
export const GULIKA_PARTS = [7, 6, 5, 4, 3, 2, 1];

export const CHOGHADIYA_DAY_SEQUENCES: Record<number, Array<'Udveg' | 'Char' | 'Labh' | 'Amrit' | 'Kaal' | 'Shubh' | 'Rog'>> = {
  0: ['Udveg', 'Char', 'Labh', 'Amrit', 'Kaal', 'Shubh', 'Rog', 'Udveg'], // Sun
  1: ['Amrit', 'Kaal', 'Shubh', 'Rog', 'Udveg', 'Char', 'Labh', 'Amrit'], // Mon
  2: ['Rog', 'Udveg', 'Char', 'Labh', 'Amrit', 'Kaal', 'Shubh', 'Rog'], // Tue
  3: ['Labh', 'Amrit', 'Kaal', 'Shubh', 'Rog', 'Udveg', 'Char', 'Labh'], // Wed
  4: ['Shubh', 'Rog', 'Udveg', 'Char', 'Labh', 'Amrit', 'Kaal', 'Shubh'], // Thu
  5: ['Char', 'Labh', 'Amrit', 'Kaal', 'Shubh', 'Rog', 'Udveg', 'Char'], // Fri
  6: ['Kaal', 'Shubh', 'Rog', 'Udveg', 'Char', 'Labh', 'Amrit', 'Kaal'], // Sat
};

export const CHOGHADIYA_NIGHT_SEQUENCES: Record<number, Array<'Udveg' | 'Char' | 'Labh' | 'Amrit' | 'Kaal' | 'Shubh' | 'Rog'>> = {
  0: ['Shubh', 'Amrit', 'Char', 'Rog', 'Kaal', 'Labh', 'Udveg', 'Shubh'],
  1: ['Char', 'Rog', 'Kaal', 'Labh', 'Udveg', 'Shubh', 'Amrit', 'Char'],
  2: ['Kaal', 'Labh', 'Udveg', 'Shubh', 'Amrit', 'Char', 'Rog', 'Kaal'],
  3: ['Udveg', 'Shubh', 'Amrit', 'Char', 'Rog', 'Kaal', 'Labh', 'Udveg'],
  4: ['Amrit', 'Char', 'Rog', 'Kaal', 'Labh', 'Udveg', 'Shubh', 'Amrit'],
  5: ['Rog', 'Kaal', 'Labh', 'Udveg', 'Shubh', 'Amrit', 'Char', 'Rog'],
  6: ['Labh', 'Udveg', 'Shubh', 'Amrit', 'Char', 'Rog', 'Kaal', 'Labh'],
};

export const CHOGHADIYA_META: Record<string, { devanagari: string; ruler: string; nature: 'Auspicious' | 'Neutral' | 'Inauspicious' }> = {
  Amrit: { devanagari: 'अमृत', ruler: 'Chandra', nature: 'Auspicious' },
  Shubh: { devanagari: 'शुभ', ruler: 'Guru', nature: 'Auspicious' },
  Labh: { devanagari: 'लाभ', ruler: 'Budha', nature: 'Auspicious' },
  Char: { devanagari: 'चर', ruler: 'Shukra', nature: 'Neutral' },
  Rog: { devanagari: 'रोग', ruler: 'Mangala', nature: 'Inauspicious' },
  Kaal: { devanagari: 'काल', ruler: 'Shani', nature: 'Inauspicious' },
  Udveg: { devanagari: 'उद्वेग', ruler: 'Surya', nature: 'Inauspicious' },
};

export const RITUS = [
  { name: 'Vasanta (Spring)', devanagari: 'वसन्त' },
  { name: 'Grishma (Summer)', devanagari: 'ग्रीष्म' },
  { name: 'Varsha (Monsoon)', devanagari: 'वर्षा' },
  { name: 'Sharad (Autumn)', devanagari: 'शरद्' },
  { name: 'Hemanta (Pre-winter)', devanagari: 'हेमन्त' },
  { name: 'Shishira (Winter)', devanagari: 'शिशिर' }
];

export const EKADASHI_NAMES_SHUKLA = [
  'Kamada', 'Mohini', 'Nirjala', 'Devshayani', 'Shravana Putrada',
  'Parivartini', 'Papankusha', 'Prabodhini (Devutthana)', 'Mokshada',
  'Pausha Putrada', 'Jaya', 'Amalaki'
];

export const EKADASHI_NAMES_KRISHNA = [
  'Papmochani', 'Varuthini', 'Apara', 'Yogini', 'Kamika',
  'Aja', 'Indira', 'Rama', 'Utpanna', 'Saphala', 'Shattila', 'Vijaya'
];

export const PRESET_CITIES: GeoLocation[] = [
  { name: 'Ujjain, India (Standard Meridian)', latitude: 23.1765, longitude: 75.7885, altitude: 491, timezone: 'Asia/Kolkata' },
  { name: 'Varanasi (Kashi), India', latitude: 25.3176, longitude: 82.9739, altitude: 81, timezone: 'Asia/Kolkata' },
  { name: 'New Delhi, India', latitude: 28.6139, longitude: 77.2090, altitude: 216, timezone: 'Asia/Kolkata' },
  { name: 'Mumbai, India', latitude: 19.0760, longitude: 72.8777, altitude: 14, timezone: 'Asia/Kolkata' },
  { name: 'Pune, India', latitude: 18.5204, longitude: 73.8567, altitude: 560, timezone: 'Asia/Kolkata' },
  { name: 'Nagpur, India', latitude: 21.1458, longitude: 79.0882, altitude: 310, timezone: 'Asia/Kolkata' },
  { name: 'Bengaluru, India', latitude: 12.9716, longitude: 77.5946, altitude: 920, timezone: 'Asia/Kolkata' },
  { name: 'Chennai, India', latitude: 13.0827, longitude: 80.2707, altitude: 6, timezone: 'Asia/Kolkata' },
  { name: 'Hyderabad, India', latitude: 17.3850, longitude: 78.4867, altitude: 542, timezone: 'Asia/Kolkata' },
  { name: 'Kolkata, India', latitude: 22.5726, longitude: 88.3639, altitude: 9, timezone: 'Asia/Kolkata' },
  { name: 'Ahmedabad, India', latitude: 23.0225, longitude: 72.5714, altitude: 53, timezone: 'Asia/Kolkata' },
  { name: 'Jaipur, India', latitude: 26.9124, longitude: 75.7873, altitude: 431, timezone: 'Asia/Kolkata' },
  { name: 'Ayodhya, India', latitude: 26.7922, longitude: 82.1998, altitude: 102, timezone: 'Asia/Kolkata' },
  { name: 'Haridwar, India', latitude: 29.9457, longitude: 78.1642, altitude: 314, timezone: 'Asia/Kolkata' },
  { name: 'Tirupati, India', latitude: 13.6288, longitude: 79.4192, altitude: 153, timezone: 'Asia/Kolkata' },
  { name: 'Rameswaram, India', latitude: 9.2876, longitude: 79.3129, altitude: 10, timezone: 'Asia/Kolkata' },
  { name: 'Puri, India', latitude: 19.8135, longitude: 85.8312, altitude: 10, timezone: 'Asia/Kolkata' },
  { name: 'London, UK', latitude: 51.5074, longitude: -0.1278, altitude: 25, timezone: 'Europe/London' },
  { name: 'New York, USA', latitude: 40.7128, longitude: -74.0060, altitude: 10, timezone: 'America/New_York' },
  { name: 'San Francisco, USA', latitude: 37.7749, longitude: -122.4194, altitude: 16, timezone: 'America/Los_Angeles' },
  { name: 'Dubai, UAE', latitude: 25.2048, longitude: 55.2708, altitude: 16, timezone: 'Asia/Dubai' },
  { name: 'Singapore', latitude: 1.3521, longitude: 103.8198, altitude: 15, timezone: 'Asia/Singapore' },
  { name: 'Sydney, Australia', latitude: -33.8688, longitude: 151.2093, altitude: 19, timezone: 'Australia/Sydney' },
  { name: 'Tokyo, Japan', latitude: 35.6762, longitude: 139.6503, altitude: 40, timezone: 'Asia/Tokyo' }
];
