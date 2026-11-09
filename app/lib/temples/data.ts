import {
  TempleRecord,
  TempleCircuit,
  TemplesFilterOptions,
  TemplesApiResponse,
} from './types';

export const TEMPLES_DATABASE: TempleRecord[] = [
  // ==========================================
  // 12 SACRED JYOTIRLINGAS (द्वादश ज्योतिर्लिंग)
  // ==========================================
  {
    id: 'kashi-vishwanath',
    name: 'Kashi Vishwanath Jyotirlinga',
    nameDevanagari: 'श्री काशी विश्वनाथ ज्योतिर्लिंग',
    circuit: 'Jyotirlinga',
    circuitCategory: 'jyotirlinga',
    tradition: 'Shaiva',
    deityId: 'shiva',
    primaryDeity: 'Lord Shiva (Vishveshwara / Vishwanath)',
    primaryDeityDevanagari: 'भगवान शिव (विश्वेश्वर)',
    consortDeity: 'Maa Annapurna (माँ अन्नपूर्णा)',
    location: {
      city: 'Varanasi',
      state: 'Uttar Pradesh',
      country: 'India',
      latitude: 25.3109,
      longitude: 83.0107,
      elevationMeters: 80,
    },
    sacredRiver: 'Holy Ganga (उत्तरवाहिनी गङ्गा)',
    era: 'Primordial Vedic (Reconstructed 1780 CE by Maharani Ahilyabai Holkar)',
    architecturalStyle: 'Nagara Style with Golden Shikhara (donated by Maharaja Ranjit Singh)',
    significance:
      'Chief of the 12 sacred Jyotirlingas. Established upon Lord Shiva’s Trishula in the eternal city of Moksha (Kashi). It is believed that any soul departing here receives the Taraka Mantra directly from Shiva, attaining instant liberation (Kaivalya Mukti).',
    puranicLore:
      'According to Kashi Khanda of Skanda Purana, when Brahma and Vishnu debated supreme supremacy, Shiva manifested as a boundless pillar of light (Jyotirlinga) piercing through all three cosmic realms. This radiant axis is permanently grounded in Kashi.',
    darshanTimings: '03:00 AM – 11:00 PM (Mangala Aarti: 03:00 AM, Saptarshi Aarti: 07:00 PM)',
    dressCode: 'Traditional Indian attire (Dhoti/Kurta for men, Saree/Salwar for women for Sparsh Darshan)',
    majorFestivals: ['Maha Shivaratri', 'Dev Deepavali', 'Shravana Masam Somavara', 'Rangbhari Ekadashi'],
    presidingTithi: 'Chaturdashi (Krishna Paksha) & Trayodashi (Pradosha)',
    colorTheme: {
      badgeBg: 'bg-cyan-500/10 dark:bg-cyan-400/10',
      badgeText: 'text-cyan-800 dark:text-cyan-300',
      border: 'border-cyan-500/30',
      accentGlow: 'from-cyan-500 to-blue-600',
    },
  },
  {
    id: 'mahakaleshwar',
    name: 'Mahakaleshwar Jyotirlinga',
    nameDevanagari: 'श्री महाकालेश्वर ज्योतिर्लिंग',
    circuit: 'Jyotirlinga',
    circuitCategory: 'jyotirlinga',
    tradition: 'Shaiva',
    deityId: 'shiva',
    primaryDeity: 'Lord Mahakal (Sovereign Lord of Time & Eternity)',
    primaryDeityDevanagari: 'भगवान महाकाल (काल के स्वामी)',
    location: {
      city: 'Ujjain',
      state: 'Madhya Pradesh',
      country: 'India',
      latitude: 23.1827,
      longitude: 75.7682,
      elevationMeters: 494,
    },
    sacredRiver: 'Holy Kshipra (शिप्रा नदी)',
    era: 'Vedic / Prehistoric (Seat of ancient Indian prime meridian and astronomical calculations)',
    architecturalStyle: 'Bhumija & Maratha Temple Architecture',
    significance:
      'Unique as the only south-facing (Dakshinabhimukhi) Jyotirlinga, possessing profound power to conquer untimely death (Akal Mrityu). Famous worldwide for the sacred Bhasma Aarti performed each dawn with fresh sacred ash.',
    puranicLore:
      'When the demon Dushana tormented the pious brahmins of Avanti (Ujjain), Lord Shiva burst forth from the earth as Mahakala, incinerating the demon with a single roar of wrath and choosing to reside here forever as the protector of devotees.',
    darshanTimings: '04:00 AM – 11:00 PM (Bhasma Aarti: 04:00 AM, Sandhya Aarti: 07:00 PM)',
    dressCode: 'Strict Vedic dress (Traditional Unstitched Dhoti-Solah for Bhasma Aarti inner sanctum)',
    majorFestivals: ['Maha Shivaratri (Shiv Navratri 9 days)', 'Shravana Sawari (Royal Procession)', 'Simhastha Kumbh Mela'],
    presidingTithi: 'Chaturdashi & Monday (Somavara)',
    colorTheme: {
      badgeBg: 'bg-amber-500/10 dark:bg-amber-400/10',
      badgeText: 'text-amber-800 dark:text-amber-300',
      border: 'border-amber-500/30',
      accentGlow: 'from-amber-600 to-orange-700',
    },
  },
  {
    id: 'somnath',
    name: 'Somnath Jyotirlinga',
    nameDevanagari: 'श्री सोमनाथ ज्योतिर्लिंग',
    circuit: 'Jyotirlinga',
    circuitCategory: 'jyotirlinga',
    tradition: 'Shaiva',
    deityId: 'shiva',
    primaryDeity: 'Lord Somnath (Protector of the Moon God)',
    primaryDeityDevanagari: 'भगवान सोमनाथ (चन्द्रमौली)',
    location: {
      city: 'Prabhas Patan, Veraval',
      state: 'Gujarat',
      country: 'India',
      latitude: 20.888,
      longitude: 70.4012,
      elevationMeters: 5,
    },
    sacredRiver: 'Triveni Sangam (Hiran, Kapila, and Saraswati confluence into Arabian Sea)',
    era: 'First of the 12 Jyotirlingas (Current grand structure consecrated 1951 by Sardar Vallabhbhai Patel)',
    architecturalStyle: 'Chalukya / Solanki Style (Māru-Gurjara)',
    significance:
      'The primordial Jyotirlinga ("Prathamam Somanatham Cha"). Stands on the shores of the Arabian Sea where an arrow-pillar (Bāna Stambha) marks that no landmass exists in a straight line between Somnath and Antarctica.',
    puranicLore:
      'Chandra Dev (the Moon God) was cursed by Daksha Prajapati to wane into oblivion. He performed severe penance here to Lord Shiva, who freed him from decay and crowned His divine locks with the crescent moon.',
    darshanTimings: '06:00 AM – 10:00 PM (Aartis: 07:00 AM, 12:00 PM, 07:00 PM; Light & Sound show: 08:00 PM)',
    dressCode: 'Decent traditional attire (No leather items, phones, or cameras allowed inside)',
    majorFestivals: ['Maha Shivaratri', 'Kartik Purnima Mela', 'Shravana Somavara'],
    presidingTithi: 'Purnima & Chaturdashi',
    colorTheme: {
      badgeBg: 'bg-yellow-500/10 dark:bg-yellow-400/10',
      badgeText: 'text-yellow-800 dark:text-yellow-300',
      border: 'border-yellow-500/30',
      accentGlow: 'from-yellow-400 to-amber-600',
    },
  },
  {
    id: 'kedarnath',
    name: 'Kedarnath Jyotirlinga',
    nameDevanagari: 'श्री केदारनाथ ज्योतिर्लिंग',
    circuit: 'Jyotirlinga',
    circuitCategory: 'jyotirlinga',
    tradition: 'Shaiva',
    deityId: 'shiva',
    primaryDeity: 'Lord Kedarnath / Sadashiva',
    primaryDeityDevanagari: 'भगवान केदारनाथ (सदाशिव)',
    location: {
      city: 'Rudraprayag',
      state: 'Uttarakhand',
      country: 'India',
      latitude: 30.7352,
      longitude: 79.0669,
      elevationMeters: 3583,
    },
    sacredRiver: 'Mandakini River (मन्दाकिनी)',
    era: 'Mahabharata Era (Constructed by Pandavas, consecrated by Adi Shankaracharya in 8th Century CE)',
    architecturalStyle: 'Himalayan Heavy Stone Masonry (Katyuri Architecture)',
    significance:
      'Highest of all 12 Jyotirlingas, situated at 3,583 meters against the snowy Kedarnath peaks. It is both a prime Jyotirlinga and the crowning jewel of the Chota Char Dham circuit.',
    puranicLore:
      'Seeking redemption for the blood shed in the Kurukshetra war, the Pandavas pursued Lord Shiva in the Himalayas. Shiva assumed the form of a celestial bull and dived into the earth; His triangular hump remained above ground at Kedarnath.',
    darshanTimings: '04:00 AM – 09:00 PM (Temple opens on Akshaya Tritiya / Vaisakh and closes on Bhai Dooj / Kartik)',
    dressCode: 'Heavy warm woolens, respectful traditional clothes',
    majorFestivals: ['Akshaya Tritiya (Temple Opening)', 'Bhai Dooj (Doli Procession to Ukhimath)', 'Shravana Purnima'],
    presidingTithi: 'Akshaya Tritiya (Vaishakha Shukla Tritiya) & Shravana Purnima',
    colorTheme: {
      badgeBg: 'bg-emerald-500/10 dark:bg-emerald-400/10',
      badgeText: 'text-emerald-800 dark:text-emerald-300',
      border: 'border-emerald-500/30',
      accentGlow: 'from-emerald-600 to-teal-700',
    },
  },
  {
    id: 'mallikarjuna',
    name: 'Mallikarjuna Jyotirlinga',
    nameDevanagari: 'श्री मल्लिकार्जुन ज्योतिर्लिंग (श्रीशैलम)',
    circuit: 'Jyotirlinga',
    circuitCategory: 'jyotirlinga',
    tradition: 'Shaiva',
    deityId: 'shiva',
    primaryDeity: 'Lord Mallikarjuna & Goddess Bhramaramba',
    primaryDeityDevanagari: 'श्री मल्लिकार्जुन एवं भ्रमराम्बा देवी',
    consortDeity: 'Maa Bhramaramba (18 Maha Shakti Peetha)',
    location: {
      city: 'Srisailam',
      state: 'Andhra Pradesh',
      country: 'India',
      latitude: 16.074,
      longitude: 78.868,
      elevationMeters: 457,
    },
    sacredRiver: 'Krishna River / Patalaganga (कृष्णा नदी)',
    era: 'Satavahana, Ikshvaku, and Vijayanagara Patronage',
    architecturalStyle: 'Dravidian Architecture with Massive Gopurams and Fortified Prakaram',
    significance:
      'Remarkable sacred site where a Jyotirlinga and an 18 Maha Shakti Peetha (Bhramaramba) co-exist in the same holy complex on Srisailam mountain (Kailasa of the South).',
    puranicLore:
      'When Lord Kartikeya left Kailash in sorrow after Ganesha circumambulated their parents, Shiva and Parvati visited Srisailam on Amavasya and Purnima respectively to be near their son, manifesting as Mallikarjuna (Jasmine flower garlanded Shiva).',
    darshanTimings: '04:30 AM – 10:00 PM (Suprabhatam: 05:00 AM, Sparsha Darshan available)',
    dressCode: 'Strict South Indian traditional attire (Dhoti/Kurta for men, Saree/Churidar for women)',
    majorFestivals: ['Maha Shivaratri Brahmotsavam (7 days)', 'Ugadi', 'Navaratri (Bhramaramba Utsav)'],
    presidingTithi: 'Chaturdashi & Amavasya',
    colorTheme: {
      badgeBg: 'bg-indigo-500/10 dark:bg-indigo-400/10',
      badgeText: 'text-indigo-800 dark:text-indigo-300',
      border: 'border-indigo-500/30',
      accentGlow: 'from-indigo-600 to-purple-700',
    },
  },
  {
    id: 'omkareshwar',
    name: 'Omkareshwar & Mamleshwar Jyotirlinga',
    nameDevanagari: 'श्री ओंकारेश्वर एवं ममलेश्वर ज्योतिर्लिंग',
    circuit: 'Jyotirlinga',
    circuitCategory: 'jyotirlinga',
    tradition: 'Shaiva',
    deityId: 'shiva',
    primaryDeity: 'Lord Omkareshwar (Omkar Svarupa)',
    primaryDeityDevanagari: 'भगवान ओंकारेश्वर (प्रणव स्वरूप)',
    location: {
      city: 'Khandwa / Mandhata Island',
      state: 'Madhya Pradesh',
      country: 'India',
      latitude: 22.2464,
      longitude: 76.1519,
      elevationMeters: 174,
    },
    sacredRiver: 'Holy Narmada (रेवा / नर्मदा)',
    era: 'Paramara Dynasty & Holkar Restoration',
    architecturalStyle: 'Nagara Style with Multi-tier Carved Stone Sanctuaries',
    significance:
      'Situated on Mandhata Island in river Narmada, naturally contoured in the exact sacred geometric shape of the sacred syllable "ॐ" (Om). Visited alongside Mamleshwar (Amareshwar) on the southern bank to complete the pilgrimage.',
    puranicLore:
      'Vindhya mountain performed arduous tapas here to Lord Shiva to grow in stature. Shiva blessed Vindhya and manifested in two equal forms: Omkareshwar (primal linga) and Amareshwar/Mamleshwar (earthly linga).',
    darshanTimings: '05:00 AM – 09:30 PM (Mangala Aarti: 05:00 AM, Shayan Aarti: 08:30 PM)',
    dressCode: 'Traditional Indian clothes',
    majorFestivals: ['Maha Shivaratri', 'Kartik Purnima Narmada Deepotsav', 'Shravana Somavara'],
    presidingTithi: 'Trayodashi & Chaturdashi',
    colorTheme: {
      badgeBg: 'bg-orange-500/10 dark:bg-orange-400/10',
      badgeText: 'text-orange-800 dark:text-orange-300',
      border: 'border-orange-500/30',
      accentGlow: 'from-orange-500 to-amber-600',
    },
  },
  {
    id: 'trimbakeshwar',
    name: 'Trimbakeshwar Jyotirlinga',
    nameDevanagari: 'श्री त्र्यम्बकेश्वर ज्योतिर्लिंग',
    circuit: 'Jyotirlinga',
    circuitCategory: 'jyotirlinga',
    tradition: 'Shaiva',
    deityId: 'shiva',
    primaryDeity: 'Lord Trimbakeshwar (Three-Faced Trimurti Linga)',
    primaryDeityDevanagari: 'भगवान त्र्यम्बकेश्वर (ब्रह्मा-विष्णु-महेश)',
    location: {
      city: 'Nashik',
      state: 'Maharashtra',
      country: 'India',
      latitude: 19.9324,
      longitude: 73.5308,
      elevationMeters: 750,
    },
    sacredRiver: 'Godavari River (Southern Ganga / गौतमी)',
    era: 'Built with black basalt by Peshwa Balaji Baji Rao (1755–1786 CE)',
    architecturalStyle: 'Hemadpanthi / Black Basalt Nagara Architecture',
    significance:
      'Unique Jyotirlinga enshrining a hollow cavity with three small thumb-sized lingams representing the Trimurti: Brahma, Vishnu, and Rudra. Site of the sacred Nashik-Trimbak Kumbh Mela.',
    puranicLore:
      'Sage Gautama performed severe austerities at Brahmagiri hill to redeem an accidental cow-slaying blemish. Pleased, Lord Shiva released River Godavari (Ganga) to flow through Trimbak and agreed to reside here eternally.',
    darshanTimings: '05:30 AM – 09:00 PM (Rudrabhishek, Narayan Nagbali & Kalsarpa pujas)',
    dressCode: 'Silk/Cotton Dhoti and Angavastram for inner sanctum abhishek',
    majorFestivals: ['Maha Shivaratri', 'Nashik Kumbh Mela (every 12 years)', 'Tripurari Purnima'],
    presidingTithi: 'Chaturdashi & Purnima',
    colorTheme: {
      badgeBg: 'bg-blue-500/10 dark:bg-blue-400/10',
      badgeText: 'text-blue-800 dark:text-blue-300',
      border: 'border-blue-500/30',
      accentGlow: 'from-blue-600 to-indigo-700',
    },
  },
  {
    id: 'ramanathaswamy',
    name: 'Ramanathaswamy Temple',
    nameDevanagari: 'श्री रामनाथस्वामी मन्दिर (रामेश्वरम)',
    circuit: 'Char Dham',
    circuitCategory: 'char_dham',
    tradition: 'Shaiva',
    deityId: 'shiva',
    primaryDeity: 'Lord Ramanathaswamy (Lingam consecrated by Sri Rama)',
    primaryDeityDevanagari: 'भगवान रामनाथस्वामी',
    consortDeity: 'Maa Parvathavarthini (माँ पर्वथवर्धिनी)',
    location: {
      city: 'Rameswaram',
      state: 'Tamil Nadu',
      country: 'India',
      latitude: 9.2881,
      longitude: 79.3174,
      elevationMeters: 10,
    },
    sacredRiver: 'Agni Theertham & 22 Sacred Wells (समुद्र एवं तीर्थ)',
    era: 'Pandya and Jaffna Kings; Sethupathi Dynasty expansions (12th–16th Century CE)',
    architecturalStyle: 'Dravidian Architecture with the World’s Longest Temple Corridor (1,220m)',
    significance:
      'Both a sacred Jyotirlinga and the Southern Char Dham of Bharat. Devotees bathe in the 22 holy wells (Theerthams) inside the temple grounds to cleanse all spiritual toxins.',
    puranicLore:
      'After vanquishing Ravana in Lanka, Lord Rama desired to worship Shiva to expiate the sin of killing a brahmin king. Mother Sita fashioned the Ramalinga from ocean sand, while Hanuman brought the Viswalinga from Mount Kailash.',
    darshanTimings: '05:00 AM – 01:00 PM, 03:00 PM – 09:00 PM (Sphatika Linga Darshan: 05:00 AM)',
    dressCode: 'Traditional South Indian attire (Men bare upper torso with dhoti; sarees for women)',
    majorFestivals: ['Maha Shivaratri', 'Thirukalyanam (Divine Marriage)', 'Aadi Amavasai'],
    presidingTithi: 'Amavasya & Chaturdashi',
    colorTheme: {
      badgeBg: 'bg-emerald-500/10 dark:bg-emerald-400/10',
      badgeText: 'text-emerald-800 dark:text-emerald-300',
      border: 'border-emerald-500/30',
      accentGlow: 'from-emerald-500 to-teal-600',
    },
  },

  // ==========================================
  // THE 4 GRAND CHAR DHAMS (चार धाम)
  // ==========================================
  {
    id: 'badrinath',
    name: 'Badrinath Temple',
    nameDevanagari: 'श्री बद्रीनाथ धाम (बद्रीविशाल)',
    circuit: 'Char Dham',
    circuitCategory: 'char_dham',
    tradition: 'Vaishnava',
    deityId: 'vishnu',
    primaryDeity: 'Lord Badri Vishal (Meditating Mahavishnu)',
    primaryDeityDevanagari: 'भगवान बद्रीविशाल (पद्मासन नारायण)',
    location: {
      city: 'Chamoli',
      state: 'Uttarakhand',
      country: 'India',
      latitude: 30.7447,
      longitude: 79.4912,
      elevationMeters: 3133,
    },
    sacredRiver: 'Alaknanda River (अलकनन्दा)',
    era: 'Vedic (Self-manifested Shaligram idol consecrated by Adi Shankaracharya in 8th Century CE)',
    architecturalStyle: 'Traditional Garhwal Himalayan Wooden & Stone Architecture with Bright Pagoda Facade',
    significance:
      'The premier Northern Char Dham sanctuary nestled between Nar and Narayana mountain ranges. The Lord sits in Padmasana posture immersed in deep cosmic tapas for the welfare of all living beings.',
    puranicLore:
      'Lord Narayana performed severe penance under extreme winter cold; Mother Lakshmi transformed Herself into a Badri tree (wild berry) to shelter Him from the elements. Touched by Her devotion, He named the sanctuary Badrikashram.',
    darshanTimings: '04:30 AM – 09:00 PM (Maha Abhishek: 04:30 AM; Shayan Aarti: 08:30 PM; open May to November)',
    dressCode: 'Warm woolen traditional clothes (modest attire mandatory)',
    majorFestivals: ['Akshaya Tritiya (Temple Kapat Opening)', 'Badri-Kedar Utsav', 'Janmashtami'],
    presidingTithi: 'Akshaya Tritiya & Ekadashi',
    colorTheme: {
      badgeBg: 'bg-amber-500/10 dark:bg-amber-400/10',
      badgeText: 'text-amber-800 dark:text-amber-300',
      border: 'border-amber-500/30',
      accentGlow: 'from-amber-500 to-yellow-600',
    },
  },
  {
    id: 'jagannath-puri',
    name: 'Jagannath Puri Temple',
    nameDevanagari: 'श्री जगन्नाथ पुरी धाम',
    circuit: 'Char Dham',
    circuitCategory: 'char_dham',
    tradition: 'Vaishnava',
    deityId: 'krishna',
    primaryDeity: 'Lord Jagannath, Balabhadra & Subhadra',
    primaryDeityDevanagari: 'श्री जगन्नाथ, बलभद्र एवं सुभद्रा',
    location: {
      city: 'Puri',
      state: 'Odisha',
      country: 'India',
      latitude: 19.8049,
      longitude: 85.8179,
      elevationMeters: 10,
    },
    sacredRiver: 'Mahodadhi (Bay of Bengal Ocean) & Rohini Kunda',
    era: 'Built by King Anantavarman Chodaganga Deva in 12th Century CE',
    architecturalStyle: 'Kalinga Architecture with towering 65-meter Deula Vimana',
    significance:
      'The Eastern Char Dham of Bharat. Famous for the world-renowned Ratha Yatra (Chariot Festival), Mahaprasad cooked in earthen pots on woodfire, and the mysterious Neelachakra flag fluttering against the wind direction.',
    puranicLore:
      'Lord Jagannath is the wooden embodiment (Daru Brahma) of Supreme Narayana. The sacred deities are carved from holy Neem logs and renewed every 12 to 19 years during the sacred Nabakalebara ritual.',
    darshanTimings: '05:00 AM – 11:00 PM (Dwaraphita: 05:00 AM; Sandhya Dhupa: 07:00 PM; Badashinghara: 11:00 PM)',
    dressCode: 'Indian traditional attire (Leather belts, shoes, phones, cameras strictly prohibited)',
    majorFestivals: ['Ratha Yatra (Ashadha Shukla Dwitiya)', 'Snana Yatra', 'Chandan Yatra', 'Janmashtami'],
    presidingTithi: 'Dwitiya (Ashadha Shukla Paksha) & Purnima',
    colorTheme: {
      badgeBg: 'bg-blue-500/10 dark:bg-blue-400/10',
      badgeText: 'text-blue-800 dark:text-blue-300',
      border: 'border-blue-500/30',
      accentGlow: 'from-blue-600 to-indigo-700',
    },
  },
  {
    id: 'dwarkadhish',
    name: 'Dwarkadhish Temple (Jagat Mandir)',
    nameDevanagari: 'श्री द्वारकाधीश मन्दिर (जगत मन्दिर)',
    circuit: 'Char Dham',
    circuitCategory: 'char_dham',
    tradition: 'Vaishnava',
    deityId: 'krishna',
    primaryDeity: 'Lord Sri Krishna as Dwarkanath / King of Dwarka',
    primaryDeityDevanagari: 'भगवान द्वारकाधीश (त्रिविक्रम स्वरूप)',
    location: {
      city: 'Dwarka',
      state: 'Gujarat',
      country: 'India',
      latitude: 22.2376,
      longitude: 68.9678,
      elevationMeters: 12,
    },
    sacredRiver: 'Gomti River merging into Arabian Sea (गोमती संगम)',
    era: 'Original shrine constructed by Krishna’s great-grandson Vajranabha; current 5-story temple ~16th Century CE',
    architecturalStyle: 'Chalukya-influenced Nagara Architecture with 72 pillars and 78-meter Shikhara',
    significance:
      'The Western Char Dham and sacred Mokshapuri. The iconic 52-yard flag (Dhvaja) is hoisted 5 times daily atop the Shikhara, visible miles away across the Arabian Sea.',
    puranicLore:
      'Krishna migrated with the Yadavas from Mathura to establish the golden island kingdom of Dwarka. Archaeologists have discovered submerged ancient megalithic walls offshore matching the Mahabharata descriptions.',
    darshanTimings: '06:30 AM – 01:00 PM, 05:00 PM – 09:30 PM (Mangala Aarti: 06:30 AM; Sandhya Aarti: 07:30 PM)',
    dressCode: 'Decent traditional attire (No shorts or modern skirts; no electronics allowed inside)',
    majorFestivals: ['Krishna Janmashtami', 'Holi / Phul Dol', 'Annakut (Govardhan Puja)', 'Tulsi Vivah'],
    presidingTithi: 'Ashtami (Krishna Paksha) & Ekadashi',
    colorTheme: {
      badgeBg: 'bg-teal-500/10 dark:bg-teal-400/10',
      badgeText: 'text-teal-800 dark:text-teal-300',
      border: 'border-teal-500/30',
      accentGlow: 'from-teal-500 to-emerald-600',
    },
  },

  // ==========================================
  // PANCHA BHOOTA STHALAMS (पंचभूत स्थल)
  // ==========================================
  {
    id: 'chidambaram-nataraja',
    name: 'Chidambaram Nataraja Temple',
    nameDevanagari: 'श्री चिदम्बरम नटराज मन्दिर (आकाश स्थल)',
    circuit: 'Pancha Bhoota',
    circuitCategory: 'pancha_bhoota',
    tradition: 'Shaiva',
    deityId: 'shiva',
    primaryDeity: 'Lord Nataraja (Cosmic Dancer) & Akasa Lingam',
    primaryDeityDevanagari: 'भगवान नटराज एवं चिदम्बर रहस्य (आकाश)',
    consortDeity: 'Maa Sivakami Amman',
    location: {
      city: 'Chidambaram',
      state: 'Tamil Nadu',
      country: 'India',
      latitude: 11.3992,
      longitude: 79.6935,
      elevationMeters: 6,
    },
    era: 'Chola Dynasty Golden Age (9th–13th Century CE)',
    architecturalStyle: 'Dravidian Architecture with Gold-plated Chit Sabha roof and 108 Natya Karanas',
    significance:
      'Represents the Akasa (Ether / Space) element. Here Lord Shiva dances the eternal Anandatandava. The innermost sanctum (Chidambara Rahasya) contains no idol—only a curtain revealing golden bilva leaves draped across empty space, symbolizing formless omnipresent Brahman.',
    puranicLore:
      'Shiva performed the cosmic dance of bliss before sages Patanjali and Vyaghrapada in the sacred Thillai forest, defeating the arrogance of the ritualist sages of Darukavana.',
    darshanTimings: '06:00 AM – 12:00 PM, 05:00 PM – 10:00 PM (Kala Santhi, Uchi Kala, and Ardhajama pujas)',
    dressCode: 'Dhoti for men (upper cloth removed inside); traditional sarees for women',
    majorFestivals: ['Marghazhi Thiruvaadhirai (Arudra Darshanam)', 'Aani Thirumanjanam', 'Natyanjali Dance Festival'],
    presidingTithi: 'Arudra Nakshatra & Pradosha',
    colorTheme: {
      badgeBg: 'bg-purple-500/10 dark:bg-purple-400/10',
      badgeText: 'text-purple-800 dark:text-purple-300',
      border: 'border-purple-500/30',
      accentGlow: 'from-purple-600 to-indigo-700',
    },
  },
  {
    id: 'annamalaiyar-thiruvannamalai',
    name: 'Arunachaleswarar Temple',
    nameDevanagari: 'श्री अरुणाचलेश्वर मन्दिर (अग्नि स्थल - तिरुवन्नामलै)',
    circuit: 'Pancha Bhoota',
    circuitCategory: 'pancha_bhoota',
    tradition: 'Shaiva',
    deityId: 'shiva',
    primaryDeity: 'Lord Arunachaleswarar (Agni / Fire Lingam)',
    primaryDeityDevanagari: 'भगवान अरुणाचलेश्वर (अग्नि लिंग)',
    consortDeity: 'Unnamalai Amman (Apitakuchambal)',
    location: {
      city: 'Thiruvannamalai',
      state: 'Tamil Nadu',
      country: 'India',
      latitude: 12.2319,
      longitude: 79.0677,
      elevationMeters: 171,
    },
    era: 'Chola, Hoysala, and Vijayanagara Kings (King Krishnadevaraya built the 66m Rajagopuram in 1516 CE)',
    architecturalStyle: 'Grand Dravidian Architecture spanning 25 acres with four massive Gopurams',
    significance:
      'Represents the Agni (Fire) element of the Pancha Bhootas. Arunachala hill itself is venerated as the self-manifested Shiva Linga. Pilgrims perform Girivalam (14km barefoot circumambulation of Arunachala hill) on every Purnima night.',
    puranicLore:
      'Here Lord Shiva manifested as a boundless pillar of fire to vanquish the egos of Brahma and Vishnu. On Kartika Deepam, a gigantic beacon of ghee is lit atop Arunachala hill summit, visible for over 30 kilometers.',
    darshanTimings: '05:30 AM – 12:30 PM, 03:30 PM – 09:30 PM',
    dressCode: 'Modest Indian traditional attire',
    majorFestivals: ['Karthigai Deepam Festival (10 days)', 'Chitra Pournami Girivalam', 'Maha Shivaratri'],
    presidingTithi: 'Krittika Nakshatra & Purnima (Kartik)',
    colorTheme: {
      badgeBg: 'bg-red-500/10 dark:bg-red-400/10',
      badgeText: 'text-red-800 dark:text-red-300',
      border: 'border-red-500/30',
      accentGlow: 'from-red-600 to-orange-700',
    },
  },

  // ==========================================
  // SACRED SHAKTI PEETHAS (प्रमुख शक्तिपीठ)
  // ==========================================
  {
    id: 'kamakhya-temple',
    name: 'Maa Kamakhya Temple',
    nameDevanagari: 'माँ कामाख्या महाशक्तिपीठ (नीलाचल)',
    circuit: 'Shakti Peetha',
    circuitCategory: 'shakti_peetha',
    tradition: 'Shakta',
    deityId: 'durga',
    primaryDeity: 'Goddess Kamakhya (Bleeding Goddess of Creation)',
    primaryDeityDevanagari: 'माँ कामाख्या (महामाया)',
    location: {
      city: 'Guwahati',
      state: 'Assam',
      country: 'India',
      latitude: 26.1664,
      longitude: 91.7056,
      elevationMeters: 160,
    },
    sacredRiver: 'Brahmaputra River (ब्रह्मपुत्र)',
    era: 'Ancient Tantric Center (Rebuilt 1565 CE by King Naranarayan of Koch dynasty)',
    architecturalStyle: 'Nilachal Type (Beehive-shaped Dome over Cruciform Base)',
    significance:
      'Supreme of all 51 Shakti Peethas. Sati’s Yoni (creative womb) fell upon Nilachal hill. Celebrates the feminine power of generation and menstruation without social taboo during the annual Ambubachi Mela.',
    puranicLore:
      'Kamadeva, the God of Love, was burnt to ashes by Shiva’s third eye. He regained his enchanting physical form after worshipping Goddess Shakti upon this hill, giving the deity the sacred name Kamakhya.',
    darshanTimings: '08:00 AM – 01:00 PM, 02:30 PM – 05:30 PM (Sanctum is in a dark natural subterranean cave over a natural spring)',
    dressCode: 'Modest traditional dress (No leather items permitted inside sanctum)',
    majorFestivals: ['Ambubachi Mela (Ashadha month)', 'Durga Puja & Navaratri', 'Manasa Puja'],
    presidingTithi: 'Mrigashirsha / Ashadha & Ashtami',
    colorTheme: {
      badgeBg: 'bg-rose-500/10 dark:bg-rose-400/10',
      badgeText: 'text-rose-800 dark:text-rose-300',
      border: 'border-rose-500/30',
      accentGlow: 'from-rose-600 to-pink-700',
    },
  },
  {
    id: 'vaishno-devi',
    name: 'Maa Vaishno Devi Shrine',
    nameDevanagari: 'श्री माता वैष्णो देवी मन्दिर (त्रिकूट पर्वत)',
    circuit: 'Shakti Peetha',
    circuitCategory: 'shakti_peetha',
    tradition: 'Shakta',
    deityId: 'durga',
    primaryDeity: 'Three Natural Pindis: Maha Kali, Maha Lakshmi, Maha Saraswati',
    primaryDeityDevanagari: 'त्रिशक्ति पिण्डी (महाकाली, महालक्ष्मी, महासरस्वती)',
    location: {
      city: 'Katra, Reasi',
      state: 'Jammu and Kashmir',
      country: 'India',
      latitude: 33.0308,
      longitude: 74.949,
      elevationMeters: 1585,
    },
    sacredRiver: 'Banganga & Charan Paduka stream',
    era: 'Treta Yuga Lore / Historical Cave Shrine',
    architecturalStyle: 'Natural Holy Mountain Cave Sanctum',
    significance:
      'Sacred Himalayan cavern sanctuary where the combined energies of Kali, Lakshmi, and Saraswati reside in the form of three natural rock formations (Pindis). Visited by millions undertaking the 13km upward trek from Katra.',
    puranicLore:
      'Vaishnavi was created by the Triple Goddesses to uphold Dharma. When the tantric ascetic Bhairon Nath pursued Her, She took the form of Kali at Ardhkuwari cave, beheaded Bhairon Nath, and attained permanent meditation inside the Holy Cave.',
    darshanTimings: 'Open 24 hours daily (except during morning and evening aartis: 06:00 AM & 06:30 PM)',
    dressCode: 'Modest respectful clothing; warm woolens in winter',
    majorFestivals: ['Chaitra Navratri', 'Sharad Navratri (Grand 9-day celebrations)', 'Diwali'],
    presidingTithi: 'Navami & Ashtami (Navratri)',
    colorTheme: {
      badgeBg: 'bg-red-500/10 dark:bg-red-400/10',
      badgeText: 'text-red-800 dark:text-red-300',
      border: 'border-red-500/30',
      accentGlow: 'from-red-600 to-rose-700',
    },
  },
  {
    id: 'kalighat-temple',
    name: 'Kalighat Kali Temple',
    nameDevanagari: 'श्री कालीघाट काली मन्दिर (कोलकाता)',
    circuit: 'Shakti Peetha',
    circuitCategory: 'shakti_peetha',
    tradition: 'Shakta',
    deityId: 'kali',
    primaryDeity: 'Maa Dakshina Kali',
    primaryDeityDevanagari: 'माँ दक्षिणा काली',
    location: {
      city: 'Kolkata',
      state: 'West Bengal',
      country: 'India',
      latitude: 22.518,
      longitude: 88.3426,
      elevationMeters: 9,
    },
    sacredRiver: 'Adi Ganga Canal (भागीरथी / आदि गङ्गा)',
    era: 'Ancient Shakti Peetha (Current structure completed 1809 CE by Sabarna Roy Choudhury family)',
    architecturalStyle: 'Bengal Chala Temple Architecture (Bengal Char-Chala style)',
    significance:
      'Premier Shakti Peetha of Eastern India where the right toes of Goddess Sati fell. Renowned for the unique three huge eyes, golden tongue, and four hands of Maa Kali.',
    puranicLore:
      'When Shiva performed the Rudra Tandava with the charred body of Sati, Vishnu’s Sudarshana Chakra fragmented Her body into 51 pieces. The sacred toe bones fell upon this bank of the ancient Bhagirathi.',
    darshanTimings: '05:00 AM – 02:00 PM, 05:00 PM – 10:30 PM (Mangala Aarti: 05:00 AM, Sandhya Aarti: 06:30 PM)',
    dressCode: 'Traditional Indian clothing',
    majorFestivals: ['Kali Puja (Diwali night)', 'Durga Puja', 'Poila Boishakh (Bengali New Year)', 'Snana Yatra'],
    presidingTithi: 'Amavasya & Ashtami',
    colorTheme: {
      badgeBg: 'bg-purple-600/10 dark:bg-purple-400/10',
      badgeText: 'text-purple-900 dark:text-purple-300',
      border: 'border-purple-600/30',
      accentGlow: 'from-purple-800 to-black',
    },
  },

  // ==========================================
  // DIVYA DESAMS & MAHA KSHETRAS
  // ==========================================
  {
    id: 'sri-ranganathaswamy',
    name: 'Sri Ranganathaswamy Temple',
    nameDevanagari: 'श्री रङ्गनाथस्वामी मन्दिर (श्रीरङ्गम)',
    circuit: 'Divya Desam',
    circuitCategory: 'divya_desam',
    tradition: 'Vaishnava',
    deityId: 'vishnu',
    primaryDeity: 'Lord Ranganatha (Reclining Vishnu on Shesha Naga)',
    primaryDeityDevanagari: 'भगवान रङ्गनाथ (शेषशायी)',
    consortDeity: 'Maa Ranganayaki (Thayar)',
    location: {
      city: 'Srirangam, Tiruchirappalli',
      state: 'Tamil Nadu',
      country: 'India',
      latitude: 10.8624,
      longitude: 78.6901,
      elevationMeters: 85,
    },
    sacredRiver: 'Kaveri River and Kollidam River (कावेरी एवं कोल्लिडम)',
    era: 'Sangam Era / Chola, Pandya, and Vijayanagara additions',
    architecturalStyle: 'Dravidian Splendor: World’s Largest Functioning Hindu Temple (156 acres, 21 Gopurams)',
    significance:
      'The premier of all 108 Divya Desams (Thiruvarangam). Enclosed within seven concentric walled enclosures (Prakarams) representing the 7 cosmic chakras or body sheaths.',
    puranicLore:
      'The deity was worshipped by Lord Rama in Ayodhya. After Rama’s coronation, He gifted the deity to Vibhishana. En route to Lanka, Vibhishana set the deity down on the banks of the Kaveri, and Lord Ranganatha decided to remain here facing South toward Lanka.',
    darshanTimings: '06:00 AM – 09:00 PM (Viswaroopa Seva: 06:00 AM; multiple darshan slots)',
    dressCode: 'Strict South Indian traditional attire (Dhoti with Angavastram for men, Saree for women)',
    majorFestivals: ['Vaikuntha Ekadashi (Paramapada Vasal opening, 21-day festival)', 'Brahmotsavam', 'Chithirai Ther'],
    presidingTithi: 'Ekadashi (Shukla Paksha in Margashirsha / Dhanurmasam)',
    colorTheme: {
      badgeBg: 'bg-emerald-500/10 dark:bg-emerald-400/10',
      badgeText: 'text-emerald-800 dark:text-emerald-300',
      border: 'border-emerald-500/30',
      accentGlow: 'from-emerald-600 to-teal-700',
    },
  },
  {
    id: 'tirupati-balaji',
    name: 'Tirumala Venkateswara Temple',
    nameDevanagari: 'श्री तिरुमला वेङ्कटेश्वर मन्दिर (तिरुपति बालाजी)',
    circuit: 'Maha Kshetra',
    circuitCategory: 'maha_kshetra',
    tradition: 'Vaishnava',
    deityId: 'vishnu',
    primaryDeity: 'Lord Venkateswara (Govinda / Srinivasa)',
    primaryDeityDevanagari: 'भगवान वेङ्कटेश्वर (श्रीनिवास बालाजी)',
    consortDeity: 'Maa Padmavathi (Alamelu Manga)',
    location: {
      city: 'Tirumala, Tirupati',
      state: 'Andhra Pradesh',
      country: 'India',
      latitude: 13.6833,
      longitude: 79.3472,
      elevationMeters: 853,
    },
    sacredRiver: 'Swami Pushkarini Holy Tank',
    era: 'Mentioned in Rigveda and Puranas; Pallava, Chola, and Vijayanagara royal patronage',
    architecturalStyle: 'Dravidian Architecture with Ananda Nilayam Golden Vimana',
    significance:
      'Kali Yuga Vaikuntha and the most visited sacred pilgrimage shrine in the world. Lord Venkateswara manifests here to grant liberation, wipe karmic debts, and protect humanity during the dark age of Kali.',
    puranicLore:
      'Lord Srinivasa borrowed wealth from Kubera to solemnize His divine wedding with Princess Padmavathi. Devotees offer donations (Hundi) to assist the Lord in repaying interest to Kubera until the end of Kali Yuga.',
    darshanTimings: '02:30 AM – 01:30 AM (Suprabhatam: 02:30 AM, Thomala Seva, Sarva Darshan throughout day & night)',
    dressCode: 'Traditional Indian attire mandatory (Dhoti/Kurta for men, Saree/Half-saree/Churidar for women)',
    majorFestivals: ['Sri Venkateswara Brahmotsavam (9 days)', 'Vaikuntha Ekadashi', 'Rathasapthami'],
    presidingTithi: 'Ekadashi & Saturday (Shanivara)',
    colorTheme: {
      badgeBg: 'bg-yellow-500/10 dark:bg-yellow-400/10',
      badgeText: 'text-yellow-800 dark:text-yellow-300',
      border: 'border-yellow-500/30',
      accentGlow: 'from-yellow-500 to-amber-600',
    },
  },
  {
    id: 'ram-janmabhoomi',
    name: 'Sri Ram Janmabhoomi Mandir',
    nameDevanagari: 'श्री राम जन्मभूमि मन्दिर (अयोध्या धाम)',
    circuit: 'Maha Kshetra',
    circuitCategory: 'maha_kshetra',
    tradition: 'Vaishnava',
    deityId: 'rama',
    primaryDeity: 'Bhagavan Ram Lalla Virajman (Child Rama)',
    primaryDeityDevanagari: 'भगवान श्रीराम लला विराजमान',
    consortDeity: 'Maa Sita (माता सीता)',
    location: {
      city: 'Ayodhya',
      state: 'Uttar Pradesh',
      country: 'India',
      latitude: 26.7956,
      longitude: 82.1944,
      elevationMeters: 102,
    },
    sacredRiver: 'Sarayu River (पवित्र सरयू नदी)',
    era: 'Vedic Primordial Birthplace (Grand new temple consecrated on January 22, 2024)',
    architecturalStyle: 'Grand Nagara Style with Pink Bansi Paharpur Sandstone, Zero Iron/Steel, 392 Pillars',
    significance:
      'Sacred birthplace of Lord Rama, the ideal exemplar of righteousness (Maryada Purushottama). Built entirely without steel or iron to endure over 1,000 years, featuring the exquisite 51-inch black Krishna Shila idol of Ram Lalla.',
    puranicLore:
      'According to Valmiki Ramayana, Lord Rama was born in Ayodhya on Chaitra Shukla Navami at midday, under Punarvasu nakshatra with five planets in their exalted signs. A Surya Tilak optical mirror-lens system channels natural sunlight directly onto Ram Lalla’s forehead every Rama Navami.',
    darshanTimings: '06:30 AM – 10:00 PM (Mangala Aarti: 06:30 AM; Shringaar Aarti: 12:00 PM; Shayan Aarti: 10:00 PM)',
    dressCode: 'Modest traditional Indian clothing',
    majorFestivals: ['Rama Navami (Surya Tilak)', 'Deepotsav (Record millions of diyas along Sarayu)', 'Vivah Panchami'],
    presidingTithi: 'Navami (Chaitra Shukla Paksha)',
    colorTheme: {
      badgeBg: 'bg-amber-500/10 dark:bg-amber-400/10',
      badgeText: 'text-amber-800 dark:text-amber-300',
      border: 'border-amber-500/30',
      accentGlow: 'from-amber-500 to-orange-600',
    },
  },
  {
    id: 'meenakshi-amman',
    name: 'Madurai Meenakshi Sundareswarar Temple',
    nameDevanagari: 'श्री मीनाक्षी सुन्दरेश्वरर मन्दिर (मदुरै)',
    circuit: 'Maha Kshetra',
    circuitCategory: 'maha_kshetra',
    tradition: 'Shakta',
    deityId: 'durga',
    primaryDeity: 'Goddess Meenakshi (Fish-Eyed Queen) & Lord Sundareswarar (Shiva)',
    primaryDeityDevanagari: 'माँ मीनाक्षी एवं सुन्दरेश्वरर',
    location: {
      city: 'Madurai',
      state: 'Tamil Nadu',
      country: 'India',
      latitude: 9.9195,
      longitude: 78.1193,
      elevationMeters: 136,
    },
    sacredRiver: 'Vaigai River & Golden Lotus Tank (पोट्रामरै कुलम)',
    era: 'Early Pandyan Era (Rebuilt 16th–17th Century CE by King Thirumalai Nayak)',
    architecturalStyle: 'Dravidian Masterpiece with 14 Soaring Gopurams and Hall of 1000 Musical Pillars',
    significance:
      'One of the grandest temple complexes in existence, where the Divine Mother Meenakshi reigns as sovereign monarch. Devotees worship Goddess Meenakshi first before paying obeisance to Lord Shiva.',
    puranicLore:
      'Born from a royal sacrificial fire to King Malayadhwaja Pandya, Princess Meenakshi conquered all eight directions. When She encountered Shiva on Mount Kailash, Her third breast disappeared as prophesied, recognizing Her eternal Lord.',
    darshanTimings: '05:00 AM – 12:30 PM, 04:00 PM – 10:00 PM',
    dressCode: 'Strict South Indian traditional attire (No lungis, caps, or electronic devices allowed)',
    majorFestivals: ['Chithirai Thiruvizha (Divine Wedding, 10 days)', 'Navaratri', 'Avani Moola Utsavam'],
    presidingTithi: 'Ashtami & Chaitra Purnima',
    colorTheme: {
      badgeBg: 'bg-teal-500/10 dark:bg-teal-400/10',
      badgeText: 'text-teal-800 dark:text-teal-300',
      border: 'border-teal-500/30',
      accentGlow: 'from-teal-600 to-cyan-700',
    },
  },

  // ==========================================
  // GLOBAL SANATAN SANCTUARIES (वैश्विक मन्दिर)
  // ==========================================
  {
    id: 'pashupatinath-nepal',
    name: 'Pashupatinath Temple',
    nameDevanagari: 'श्री पशुपतिनाथ मन्दिर (काठमांडू, नेपाल)',
    circuit: 'International',
    circuitCategory: 'international',
    tradition: 'Shaiva',
    deityId: 'shiva',
    primaryDeity: 'Lord Pashupatinath (Lord of all Living Beings)',
    primaryDeityDevanagari: 'भगवान पशुपतिनाथ (पंचमुखी सदाशिव)',
    location: {
      city: 'Kathmandu',
      state: 'Bagmati Province',
      country: 'Nepal',
      latitude: 27.7104,
      longitude: 85.3487,
      elevationMeters: 1320,
    },
    sacredRiver: 'Bagmati River (बागमती नदी)',
    era: 'Ancient Licchavi Period (Current Pagoda consecrated 1692 CE by King Bhupatindra Malla)',
    architecturalStyle: 'Nepalese Pagoda Architecture with Tiered Gilded Copper Roofs and Silver Doors',
    significance:
      'UNESCO World Heritage Site and the sovereign spiritual protector of the Himalayas. Features a unique five-faced Mukhalinga facing East (Tatpurusha), West (Sadyojata), North (Vamadeva), South (Aghora), and Zenith (Ishana).',
    puranicLore:
      'Lord Shiva assumed the disguise of a radiant deer in the lush Sleshmantaka forest. When the gods discovered Him, He returned to His divine form, leaving His horn behind as the sacred linga of Pashupatinath.',
    darshanTimings: '04:00 AM – 09:00 PM (Sanctum open for morning abhishekam until 12:00 PM; Evening Bagmati Ganga Aarti: 06:00 PM)',
    dressCode: 'Strict Hindu sanctum access; decent traditional Indian/Nepalese attire (Leather belts/wallets strictly prohibited)',
    majorFestivals: ['Maha Shivaratri (Over 1 million pilgrims)', 'Teej Festival', 'Bala Chaturdashi'],
    presidingTithi: 'Chaturdashi (Krishna Paksha) & Monday',
    colorTheme: {
      badgeBg: 'bg-red-500/10 dark:bg-red-400/10',
      badgeText: 'text-red-800 dark:text-red-300',
      border: 'border-red-500/30',
      accentGlow: 'from-red-600 to-amber-700',
    },
  },
  {
    id: 'batu-caves-malaysia',
    name: 'Batu Caves Murugan Temple',
    nameDevanagari: 'श्री बातू गुफा मुरुगन मन्दिर (मलेशिया)',
    circuit: 'International',
    circuitCategory: 'international',
    tradition: 'Kaumara',
    deityId: 'kartikeya',
    primaryDeity: 'Lord Murugan / Sri Subramanyar',
    primaryDeityDevanagari: 'भगवान मुरुगन (सुब्रह्मण्य स्वामी)',
    location: {
      city: 'Gombak, Selangor',
      state: 'Kuala Lumpur Outskirts',
      country: 'Malaysia',
      latitude: 3.2374,
      longitude: 101.6839,
      elevationMeters: 120,
    },
    era: 'Consecrated 1890 CE by K. Thamboosamy Pillai',
    architecturalStyle: 'Limestone Natural Cavern with 272 Rainbow Painted Steps and 42.7m Golden Murugan Statue',
    significance:
      'The most famous Hindu pilgrimage shrine outside Bharat. Famed for the world’s tallest 140-foot golden statue of Lord Murugan holding the divine Vel, guarding the 400-million-year-old limestone cavern complex.',
    puranicLore:
      'Lord Murugan received the Vel (Spear of Wisdom) from His Mother Parvati to conquer the inner and outer demons of illusion, symbolizing the awakening of spiritual intelligence.',
    darshanTimings: '06:00 AM – 09:00 PM Daily',
    dressCode: 'Modest attire (Knees and shoulders must be covered to climb the 272 steps)',
    majorFestivals: ['Thaipusam (Over 1.5 million devotees carry Kavadi)', 'Skanda Sashti', 'Panguni Uthiram'],
    presidingTithi: 'Shashthi & Thaipusam (Pushya Purnima)',
    colorTheme: {
      badgeBg: 'bg-amber-500/10 dark:bg-amber-400/10',
      badgeText: 'text-amber-800 dark:text-amber-300',
      border: 'border-amber-500/30',
      accentGlow: 'from-amber-500 to-yellow-600',
    },
  },
  {
    id: 'akshardham-robbinsville',
    name: 'BAPS Swaminarayan Akshardham (Robbinsville)',
    nameDevanagari: 'श्री स्वामिनारायण अक्षरधाम (रॉबिन्सविले, यूएसए)',
    circuit: 'International',
    circuitCategory: 'international',
    tradition: 'Vaishnava',
    deityId: 'vishnu',
    primaryDeity: 'Bhagwan Swaminarayan & Akshar-Purushottam Maharaj',
    primaryDeityDevanagari: 'भगवान स्वामिनारायण',
    location: {
      city: 'Robbinsville',
      state: 'New Jersey',
      country: 'United States',
      latitude: 40.244,
      longitude: -74.5828,
      elevationMeters: 35,
    },
    era: 'Consecrated in October 2023 after 12 years of construction by 12,500+ volunteers',
    architecturalStyle: 'Traditional Hindu Stone Architecture (Nagara & Māru-Gurjara) using 1.9 million cu ft of Italian Carrara & Bulgarian Limestone',
    significance:
      'The largest active Hindu stone temple complex outside India and second largest in modern history. Designed according to ancient Shilpa Shastras with zero structural steel.',
    puranicLore:
      'Honors the timeless Vedic message of "Vasudhaiva Kutumbakam" (The world is one family) through intricate stone carvings of 151 ancient and modern global scientists, sages, and thinkers.',
    darshanTimings: '09:00 AM – 07:30 PM (Nilkanth Varni Abhishek: 10:00 AM – 06:30 PM)',
    dressCode: 'Strict modest dress code (Shoulders and knees must be covered; shoes removed)',
    majorFestivals: ['Diwali & Annakut', 'Janmashtami', 'Swaminarayan Jayanti'],
    presidingTithi: 'Navami (Chaitra Shukla) & Purnima',
    colorTheme: {
      badgeBg: 'bg-zinc-500/10 dark:bg-zinc-400/10',
      badgeText: 'text-zinc-800 dark:text-zinc-300',
      border: 'border-zinc-400/30',
      accentGlow: 'from-zinc-200 to-amber-300',
    },
  },
  {
    id: 'prambanan-indonesia',
    name: 'Prambanan Trimurti Temple',
    nameDevanagari: 'प्रम्बनन त्रिमूर्ति मन्दिर (जावा, इंडोनेशिया)',
    circuit: 'International',
    circuitCategory: 'international',
    tradition: 'Smarta',
    deityId: 'shiva',
    primaryDeity: 'Lord Shiva (Mahadeva), Vishnu, and Brahma',
    primaryDeityDevanagari: 'सदाशिव, महाविष्णु एवं ब्रह्मा (त्रिमूर्ति)',
    location: {
      city: 'Yogyakarta',
      state: 'Central Java',
      country: 'Indonesia',
      latitude: -7.752,
      longitude: 110.4915,
      elevationMeters: 140,
    },
    sacredRiver: 'Opak River (ओपक नदी)',
    era: 'Constructed around 850 CE by Rakai Pikatan of the Sanjaya Dynasty',
    architecturalStyle: 'Ancient Javanese Hindu Architecture with 47-meter soaring Central Shiva Tower',
    significance:
      'UNESCO World Heritage Site and the largest Hindu temple compound in Southeast Asia dedicated to the Trimurti. The outer balustrades are adorned with bas-reliefs illustrating the complete narrative of the Ramayana and Bhagavata Purana.',
    puranicLore:
      'Legend of Roro Jonggrang recounts how a demon prince Bandung Bondowoso was tasked with carving 1,000 stone statues in a single night to win the princess’s hand, whose petrified statue became Durga Mahishasuramardini in the northern chamber.',
    darshanTimings: '06:30 AM – 05:00 PM Daily',
    dressCode: 'Respectful attire (Sarongs provided at entrance for all visitors)',
    majorFestivals: ['Ramayana Ballet (Full Moon nights)', 'Maha Shivaratri', 'Nyepi Festival'],
    presidingTithi: 'Purnima & Shivaratri',
    colorTheme: {
      badgeBg: 'bg-indigo-500/10 dark:bg-indigo-400/10',
      badgeText: 'text-indigo-800 dark:text-indigo-300',
      border: 'border-indigo-500/30',
      accentGlow: 'from-indigo-600 to-purple-800',
    },
  },
];

export const CIRCUITS_CONFIG: {
  id: TempleCircuit;
  label: string;
  labelDevanagari: string;
}[] = [
  { id: 'all', label: 'All Tirthas', labelDevanagari: 'सर्व तीर्थ' },
  { id: 'jyotirlinga', label: '12 Jyotirlingas', labelDevanagari: 'द्वादश ज्योतिर्लिंग' },
  { id: 'char_dham', label: 'Char Dham', labelDevanagari: 'चार धाम' },
  { id: 'shakti_peetha', label: 'Shakti Peethas', labelDevanagari: 'शक्तिपीठ' },
  { id: 'pancha_bhoota', label: 'Pancha Bhoota', labelDevanagari: 'पंचभूत स्थल' },
  { id: 'divya_desam', label: 'Divya Desams', labelDevanagari: 'दिव्य देशम' },
  { id: 'maha_kshetra', label: 'Maha Kshetras', labelDevanagari: 'महाक्षेत्र' },
  { id: 'international', label: 'Global Sanctuaries', labelDevanagari: 'वैश्विक मन्दिर' },
];

export function getTempleById(id: string): TempleRecord | undefined {
  return TEMPLES_DATABASE.find((t) => t.id.toLowerCase() === id.toLowerCase().trim());
}

export function getTemples(options: TemplesFilterOptions = {}): TemplesApiResponse {
  const { circuit = 'all', tradition = 'all', state, searchQuery = '', id, deityId } = options;

  if (id) {
    const single = getTempleById(id);
    return {
      totalCount: single ? 1 : 0,
      circuits: CIRCUITS_CONFIG.map((c) => ({
        ...c,
        count: TEMPLES_DATABASE.filter((t) => (c.id === 'all' ? true : t.circuitCategory === c.id)).length,
      })),
      temples: single ? [single] : [],
    };
  }

  let filtered = [...TEMPLES_DATABASE];

  if (circuit && circuit !== 'all') {
    filtered = filtered.filter((t) => t.circuitCategory === circuit);
  }

  if (tradition && tradition !== 'all') {
    filtered = filtered.filter((t) => t.tradition.toLowerCase() === tradition.toLowerCase());
  }

  if (deityId && deityId.trim().length > 0) {
    filtered = filtered.filter((t) => t.deityId.toLowerCase() === deityId.toLowerCase().trim());
  }

  if (state && state.trim().length > 0) {
    filtered = filtered.filter((t) => t.location.state.toLowerCase() === state.toLowerCase().trim());
  }

  if (searchQuery && searchQuery.trim().length > 0) {
    const q = searchQuery.toLowerCase().trim();
    filtered = filtered.filter((t) => {
      const matchName = t.name.toLowerCase().includes(q) || t.nameDevanagari.includes(q);
      const matchDeity =
        t.primaryDeity.toLowerCase().includes(q) ||
        t.primaryDeityDevanagari.includes(q) ||
        (t.consortDeity && t.consortDeity.toLowerCase().includes(q));
      const matchLocation =
        t.location.city.toLowerCase().includes(q) ||
        t.location.state.toLowerCase().includes(q) ||
        t.location.country.toLowerCase().includes(q);
      const matchRiver = t.sacredRiver && t.sacredRiver.toLowerCase().includes(q);
      const matchCircuit = t.circuit.toLowerCase().includes(q);
      const matchSignificance = t.significance.toLowerCase().includes(q) || t.puranicLore.toLowerCase().includes(q);
      const matchFestivals = t.majorFestivals.some((f) => f.toLowerCase().includes(q));

      return (
        matchName ||
        matchDeity ||
        matchLocation ||
        matchRiver ||
        matchCircuit ||
        matchSignificance ||
        matchFestivals
      );
    });
  }

  const circuitCounts = CIRCUITS_CONFIG.map((c) => ({
    ...c,
    count: TEMPLES_DATABASE.filter((t) => (c.id === 'all' ? true : t.circuitCategory === c.id)).length,
  }));

  return {
    totalCount: filtered.length,
    circuits: circuitCounts,
    temples: filtered,
  };
}
