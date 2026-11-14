export type Language = 'en' | 'hi';

export interface Translations {
  // Navigation
  navHome: string;
  navPanchang: string;
  navMuhurta: string;
  navFestivals: string;
  navDeities: string;
  navTemples: string;
  navSettings: string;
  navFeedback: string;

  // Hero & Panchang
  heroTitle: string;
  heroSubtitle: string;
  heroTagline: string;
  todaysPanchang: string;
  shareWhatsApp: string;
  copyCard: string;
  downloadImage: string;
  copiedSuccess: string;
  openFullPanchang: string;
  findMuhurta: string;

  // 5 Limbs (Pancha-Anga)
  limbTithi: string;
  limbNakshatra: string;
  limbYoga: string;
  limbKarana: string;
  limbVara: string;
  endsAt: string;
  rulingLord: string;
  quality: string;
  type: string;
  graha: string;

  // Ephemeris
  sunrise: string;
  sunset: string;
  dayLength: string;
  moonPhase: string;
  abhijitMuhurta: string;
  rahuKaal: string;
  yamaganda: string;

  // Calendar systems
  calendarSystem: string;
  purnimanta: string;
  purnimantaDesc: string;
  amanta: string;
  amantaDesc: string;

  // Choghadiya
  choghadiyaTitle: string;
  choghadiyaSubtitle: string;
  daytime: string;
  nighttime: string;
  activeNow: string;
  auspicious: string;
  inauspicious: string;

  // Muhurta Wizard
  muhurtaWizardTitle: string;
  muhurtaWizardSubtitle: string;
  scan180Days: string;
  nextAuspiciousDates: string;

  // Festivals
  upcomingFestivalsTitle: string;
  upcomingFestivalsSubtitle: string;
  allFestivals: string;
  majorFestivals: string;
  ekadashiVrats: string;
  jayantis: string;
  pujaMuhurta: string;
  viewDetails: string;

  // Vrat Kathas & Vidhi
  vratKathaTitle: string;
  vratKathaSubtitle: string;
  pujaVidhi: string;
  paranaTiming: string;
  fastingRules: string;
  readKatha: string;
  close: string;

  // Common
  searchPlaceholder: string;
  quickCities: string;
  useMyGps: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    navHome: 'Home',
    navPanchang: 'Panchang',
    navMuhurta: 'Muhurta',
    navFestivals: 'Festivals',
    navDeities: 'Deities',
    navTemples: 'Temples',
    navSettings: 'Settings',
    navFeedback: 'Feedback',

    heroTitle: "Today's Vedic Panchang",
    heroSubtitle: 'High-Precision Astronomical Ephemeris & Auspicious Timings',
    heroTagline: 'Pure mathematical ephemeris with zero approximations, computed from NASA JPL & Jean Meeus first principles.',
    todaysPanchang: "Today's Sacred Panchang",
    shareWhatsApp: 'Share on WhatsApp',
    copyCard: 'Copy Card Text',
    downloadImage: 'Download Image Card',
    copiedSuccess: 'Copied to Clipboard! ✓',
    openFullPanchang: 'Open Full Panchang',
    findMuhurta: 'Find Shubh Muhurta',

    limbTithi: '1. Tithi',
    limbNakshatra: '2. Nakshatra',
    limbYoga: '3. Yoga',
    limbKarana: '4. Karana',
    limbVara: '5. Vara',
    endsAt: 'Ends',
    rulingLord: 'Lord',
    quality: 'Quality',
    type: 'Type',
    graha: 'Graha',

    sunrise: 'Sunrise',
    sunset: 'Sunset',
    dayLength: 'Day Length',
    moonPhase: 'Moon Phase',
    abhijitMuhurta: 'Abhijit Muhurta',
    rahuKaal: 'Rahu Kaal',
    yamaganda: 'Yamaganda',

    calendarSystem: 'Calendar System',
    purnimanta: 'Purnimanta (North India)',
    purnimantaDesc: 'Month ends on Purnima (UP, Bihar, Rajasthan, MP, Delhi)',
    amanta: 'Amanta (Maharashtra / Gujarat / South)',
    amantaDesc: 'Month ends on Amavasya (Maharashtra, Gujarat, Karnataka, AP, Tamil Nadu)',

    choghadiyaTitle: 'Live Choghadiya Dial',
    choghadiyaSubtitle: 'Vedic 16-period cosmic clock for day and night',
    daytime: 'Daytime (8)',
    nighttime: 'Nighttime (8)',
    activeNow: 'Active Now',
    auspicious: 'Auspicious',
    inauspicious: 'Inauspicious',

    muhurtaWizardTitle: 'Instant Muhurta Discovery',
    muhurtaWizardSubtitle: 'Select a venture to discover canonical auspicious dates',
    scan180Days: 'Scan 180 Days',
    nextAuspiciousDates: 'Next Auspicious Dates',

    upcomingFestivalsTitle: 'Sacred Hindu Festivals',
    upcomingFestivalsSubtitle: 'Astronomically calculated celebration dates and fasting windows',
    allFestivals: 'All Celebrations',
    majorFestivals: 'Major Utsavs',
    ekadashiVrats: 'Ekadashi & Vrats',
    jayantis: 'Jayantis',
    pujaMuhurta: 'Puja Muhurta',
    viewDetails: 'Puja Details & Lore',

    vratKathaTitle: 'Sacred Vrat Kathas & Puja Vidhi',
    vratKathaSubtitle: 'Traditional fasting rituals, authentic stories, and Parana muhurtas',
    pujaVidhi: 'Step-by-Step Puja Vidhi',
    paranaTiming: 'Parana Timing (Fast Breaking)',
    fastingRules: 'Fasting (Vrat) Guidelines',
    readKatha: 'Read Complete Katha',
    close: 'Close',

    searchPlaceholder: 'Search festivals, temples, deities, muhurtas, or panchang...',
    quickCities: 'Quick Sacred Centers',
    useMyGps: 'Use My GPS',
  },
  hi: {
    navHome: 'मुखपृष्ठ',
    navPanchang: 'पञ्चाङ्ग',
    navMuhurta: 'शुभ मुहूर्त',
    navFestivals: 'व्रत-त्योहार',
    navDeities: 'देवी-देवता',
    navTemples: 'तीर्थ-मन्दिर',
    navSettings: 'सेटिंग्स',
    navFeedback: 'प्रतिक्रिया',

    heroTitle: 'आज का वैदिक पञ्चाङ्ग',
    heroSubtitle: 'शुद्ध खगोलीय पञ्चाङ्ग एवं शुभ मुहूर्त',
    heroTagline: 'नासा एवं प्राचीन भारतीय सिद्धान्तों पर आधारित पूर्णतः सटीक एवं प्रामाणिक पञ्चाङ्ग गणना।',
    todaysPanchang: 'आज का दैनिक पञ्चाङ्ग',
    shareWhatsApp: 'व्हाट्सएप पर शेयर करें',
    copyCard: 'पञ्चाङ्ग विवरण कॉपी करें',
    downloadImage: 'पञ्चाङ्ग चित्र डाउनलोड करें',
    copiedSuccess: 'कॉपी हो गया! ✓',
    openFullPanchang: 'सम्पूर्ण पञ्चाङ्ग देखें',
    findMuhurta: 'शुभ मुहूर्त खोजें',

    limbTithi: '१. तिथि',
    limbNakshatra: '२. नक्षत्र',
    limbYoga: '३. योग',
    limbKarana: '४. करण',
    limbVara: '५. वार',
    endsAt: 'समाप्ति',
    rulingLord: 'स्वामी',
    quality: 'प्रकृति',
    type: 'प्रकार',
    graha: 'ग्रह',

    sunrise: 'सूर्योदय',
    sunset: 'सूर्यास्त',
    dayLength: 'दिनमान',
    moonPhase: 'चन्द्र कला',
    abhijitMuhurta: 'अभिजित मुहूर्त',
    rahuKaal: 'राहु काल',
    yamaganda: 'यमगण्ड',

    calendarSystem: 'मास गणना पद्धति',
    purnimanta: 'पूर्णिमान्त (उत्तर भारत)',
    purnimantaDesc: 'माह पूर्णिमा को समाप्त होता है (उ.प्र., बिहार, राजस्थान, म.प्र., दिल्ली)',
    amanta: 'अमान्त (महाराष्ट्र / गुजरात / दक्षिण भारत)',
    amantaDesc: 'माह अमावस्या को समाप्त होता है (महाराष्ट्र, गुजरात, कर्नाटक, आन्ध्र)',

    choghadiyaTitle: 'आज का चौघड़िया चक्र',
    choghadiyaSubtitle: 'दिन एवं रात्रि के १६ चौघड़िया मुहूर्त',
    daytime: 'दिन का चौघड़िया (८)',
    nighttime: 'रात्रि का चौघड़िया (८)',
    activeNow: 'वर्तमान सक्रिय',
    auspicious: 'शुभ',
    inauspicious: 'अशुभ',

    muhurtaWizardTitle: 'शीघ्र मुहूर्त अन्वेषक',
    muhurtaWizardSubtitle: 'अपने मांगलिक कार्य के लिए शास्त्रसम्मत शुभ तिथियां देखें',
    scan180Days: '१८० दिनों का मुहूर्त देखें',
    nextAuspiciousDates: 'आगामी शुभ मुहूर्त',

    upcomingFestivalsTitle: 'आगामी व्रत एवं प्रमुख त्योहार',
    upcomingFestivalsSubtitle: 'धर्मसिन्धु एवं निर्णयसिन्धु सम्मत पर्व तिथियां एवं पूजा मुहूर्त',
    allFestivals: 'सभी व्रत-पर्व',
    majorFestivals: 'प्रमुख त्योहार',
    ekadashiVrats: 'एकादशी व्रत',
    jayantis: 'जयंती पर्व',
    pujaMuhurta: 'पूजा मुहूर्त',
    viewDetails: 'पूजा विधि एवं कथा',

    vratKathaTitle: 'पवित्र व्रत कथाएं एवं पूजा विधि',
    vratKathaSubtitle: 'एकादशी, प्रदोष एवं प्रमुख व्रतों की प्रामाणिक कथाएं एवं पारण समय',
    pujaVidhi: 'घर पर सरल पूजा विधि',
    paranaTiming: 'व्रत पारण का शुभ समय',
    fastingRules: 'व्रत एवं फलाहार नियम',
    readKatha: 'सम्पूर्ण कथा पढ़ें',
    close: 'बंद करें',

    searchPlaceholder: 'त्योहार, मन्दिर, देवी-देवता, मुहूर्त या पञ्चाङ्ग खोजें...',
    quickCities: 'प्रमुख तीर्थ एवं नगर',
    useMyGps: 'मेरी वर्तमान स्थिति',
  },
};
