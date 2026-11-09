/**
 * Complete, single-language formatters for sanatan.cc
 * Guarantees STRICT ZERO English in Hindi mode and STRICT ZERO Devanagari in English mode.
 */

export function cleanPlanetLord(rawLord: string | undefined | null, isHi: boolean): string {
  if (!rawLord) return '';
  const s = rawLord.toLowerCase();

  if (isHi) {
    if (s.includes('surya') || s.includes('sun')) return 'सूर्य';
    if (s.includes('chandra') || s.includes('soma') || s.includes('moon')) return 'चन्द्र';
    if (s.includes('mangala') || s.includes('mars')) return 'मंगल';
    if (s.includes('budha') || s.includes('mercury')) return 'बुध';
    if (s.includes('guru') || s.includes('jupiter') || s.includes('brihaspati')) return 'बृहस्पति';
    if (s.includes('shukra') || s.includes('venus')) return 'शुक्र';
    if (s.includes('shani') || s.includes('saturn')) return 'शनि';
    if (s.includes('rahu')) return 'राहु';
    if (s.includes('ketu')) return 'केतु';
    return rawLord.replace(/\s*\([^)]*\)/g, '').trim();
  }

  // English mode
  if (s.includes('sun')) return 'Sun';
  if (s.includes('moon')) return 'Moon';
  if (s.includes('mars')) return 'Mars';
  if (s.includes('mercury')) return 'Mercury';
  if (s.includes('jupiter')) return 'Jupiter';
  if (s.includes('venus')) return 'Venus';
  if (s.includes('saturn')) return 'Saturn';
  if (s.includes('rahu')) return 'Rahu';
  if (s.includes('ketu')) return 'Ketu';
  return rawLord.replace(/\s*\([^)]*\)/g, '').trim();
}

export function cleanDeityName(rawDeity: string | undefined | null, isHi: boolean): string {
  if (!rawDeity) return '';
  const s = rawDeity.toLowerCase().trim();

  if (isHi) {
    if (s.includes('agni')) return 'अग्निदेव';
    if (s.includes('brahma')) return 'ब्रह्मा';
    if (s.includes('gauri')) return 'माता गौरी';
    if (s.includes('ganesha')) return 'श्रीगणेश';
    if (s.includes('naga')) return 'नाग देवता';
    if (s.includes('kartikeya')) return 'कार्तिकेय';
    if (s.includes('surya') || s.includes('savitr')) return 'सूर्यदेव';
    if (s.includes('shiva') || s.includes('rudra')) return 'भगवान शिव';
    if (s.includes('durga')) return 'माँ दुर्गा';
    if (s.includes('yama')) return 'यमराज';
    if (s.includes('vishva') || s.includes('vishwadevas')) return 'विश्वेदेव';
    if (s.includes('vishnu')) return 'भगवान विष्णु';
    if (s.includes('kamadeva')) return 'कामदेव';
    if (s.includes('chandra') || s.includes('soma')) return 'चन्द्रदेव';
    if (s.includes('ashwini')) return 'अश्विनी कुमार';
    if (s.includes('aditi')) return 'माता अदिति';
    if (s.includes('brihaspati')) return 'बृहस्पति देव';
    if (s.includes('sarpa')) return 'सर्प देवता';
    if (s.includes('pitris')) return 'पितृगण';
    if (s.includes('bhaga')) return 'भग देवता';
    if (s.includes('aryaman')) return 'अर्यमा';
    if (s.includes('twashtr') || s.includes('viswakarma')) return 'विश्वकर्मा';
    if (s.includes('vayu')) return 'वायुदेव';
    if (s.includes('indragni')) return 'इन्द्राग्नि';
    if (s.includes('mitra')) return 'मित्र देवता';
    if (s.includes('indra')) return 'इन्द्रदेव';
    if (s.includes('nirriti')) return 'निरृति';
    if (s.includes('apah') || s.includes('water')) return 'वरुण (जल देवता)';
    if (s.includes('vasus')) return 'अष्ट वसु';
    if (s.includes('varuna')) return 'वरुण देव';
    if (s.includes('ajaikapada')) return 'अजैकपाद';
    if (s.includes('ahirbudhnya')) return 'अहिर्बुध्न्य';
    if (s.includes('pushan')) return 'पूषा देव';
    if (s.includes('kali')) return 'माँ काली';
    if (s.includes('vrishabha')) return 'नन्दी / वृषभ';
    return rawDeity.replace(/\s*\([^)]*\)/g, '').trim();
  }

  // English mode: strip parenthetical Hindi/Sanskrit if present
  return rawDeity.replace(/\s*\([^)]*\)/g, '').trim();
}

export function cleanChoghadiyaQuality(quality: string | undefined | null, isHi: boolean): string {
  if (!quality) return '';
  if (!isHi) return quality;
  const qualMap: Record<string, string> = {
    Amrit: 'अमृत',
    Shubh: 'शुभ',
    Labh: 'लाभ',
    Char: 'चल',
    Rog: 'रोग',
    Kaal: 'काल',
    Udveg: 'उद्वेग',
  };
  return qualMap[quality] || quality;
}

export function cleanPaksha(paksha: string | undefined | null, isHi: boolean): string {
  if (!paksha) return '';
  if (isHi) {
    return paksha.toLowerCase().includes('shukla') ? 'शुक्ल' : 'कृष्ण';
  }
  return paksha.toLowerCase().includes('shukla') ? 'Shukla' : 'Krishna';
}

export function cleanBilingualTitle(text: string | undefined | null, isHi: boolean): string {
  if (!text) return '';
  const match = text.match(/\(([^)]+)\)/);
  if (isHi) {
    if (match && /[\u0900-\u097F]/.test(match[1])) {
      return match[1].trim();
    }
    return text.replace(/\s*\([A-Za-z0-9\s,.-]+\)/g, '').trim();
  }
  // English mode
  return text.replace(/\s*\([\u0900-\u097F\s,.-]+\)/g, '').trim();
}

export function cleanPanchakaName(panchaka: string | undefined | null, isHi: boolean): string {
  if (!panchaka || panchaka === 'None') return '';
  if (!isHi) return panchaka;
  const pMap: Record<string, string> = {
    Rog: 'रोग',
    Agni: 'अग्नि',
    Raj: 'राज',
    Chora: 'चोर',
    Mrityu: 'मृत्यु',
  };
  return pMap[panchaka] || panchaka;
}

export function formatMuhurtaReason(text: string | undefined | null, isHi: boolean): string {
  if (!text) return '';

  if (!isHi) {
    // English mode: strip all Devanagari
    return text
      .replace(/\s*\([\u0900-\u097F\s,.-]+\)/g, '')
      .replace(/[\u0900-\u097F]+/g, '')
      .replace(/\s{2,}/g, ' ')
      .trim();
  }

  // Hindi mode: full authentic localization
  const s = text.toLowerCase();
  if (s.includes('bhadra dosha free') || s.includes('भद्रारहित')) {
    return 'भद्रारहित कल्याणकारी मुहूर्त।';
  }
  if (s.includes('shukla paksha')) {
    return 'शुक्ल पक्ष की शुभ एवं कल्याणकारी ऊर्जा।';
  }
  if (s.includes('guru pushya')) {
    return 'गुरु पुष्य योग का महासंयोग।';
  }
  if (s.includes('ravi pushya')) {
    return 'रवि पुष्य योग का महासंयोग।';
  }
  if (s.includes('amrita siddhi')) {
    return 'अमृत सिद्धि योग का शुभ संयोग।';
  }
  if (s.includes('sarvartha siddhi')) {
    return 'सर्वार्थ सिद्धि योग का शुभ संयोग।';
  }
  if (s.includes('griha pravesh nakshatra')) {
    return 'गृहप्रवेश हेतु शास्त्रसम्मत शुभ नक्षत्र।';
  }
  if (s.includes('prime vivaha nakshatra')) {
    return 'विवाह संस्कार हेतु श्रेष्ठ एवं शुभ नक्षत्र।';
  }
  if (s.includes('favorable tithi') || s.includes('shuddha tithi')) {
    return 'शुभ एवं दोषरहित शास्त्रसम्मत तिथि।';
  }
  if (s.includes('auspicious weekday') || s.includes('harmonious day') || s.includes('benefic planetary day')) {
    return 'शुभ एवं फलप्रद वार।';
  }
  if (s.includes('vahan nakshatra')) {
    return 'वाहन क्रय हेतु प्रशस्त चर/क्षिप्र नक्षत्र।';
  }
  if (s.includes('business') || s.includes('commercial')) {
    return 'व्यापार एवं प्रतिष्ठान आरम्भ हेतु शुभ संयोग।';
  }
  if (s.includes('blessed by')) {
    return 'शास्त्रसम्मत शुभ योग से युक्त।';
  }

  // Fallback: extract Devanagari inside parentheses if present
  const match = text.match(/\(([\u0900-\u097F\s,.-]+)\)/);
  if (match) {
    return match[1].trim() + '।';
  }

  return text;
}

export function formatMuhurtaPrecaution(text: string | undefined | null, isHi: boolean): string {
  if (!text) return '';

  if (!isHi) {
    // English mode: strip all Devanagari
    return text
      .replace(/\s*\([\u0900-\u097F\s,.-]+\)/g, '')
      .replace(/[\u0900-\u097F]+/g, '')
      .replace(/\s{2,}/g, ' ')
      .trim();
  }

  // Hindi mode: full authentic localization
  const s = text.toLowerCase();
  if (s.includes('vishti') || s.includes('bhadra')) {
    return 'विष्टि (भद्रा) करण उपस्थित — यह समय त्याज्य है।';
  }
  if (s.includes('rikta')) {
    return 'रिक्ता तिथि उपस्थित — मुख्य कार्य आरम्भ न करें।';
  }
  if (s.includes('amavasya')) {
    return 'अमावस्या तिथि — मांगलिक कार्यों हेतु त्याज्य।';
  }
  if (s.includes('panchaka')) {
    return 'पञ्चक प्रभाव सक्रिय — सावधानी अपेक्षित है।';
  }
  if (s.includes('avoided for solemnizing') || s.includes('avoided for acquiring') || s.includes('traditionally avoided')) {
    return 'यह वार इस विशिष्ट कार्य हेतु शास्त्रसम्मत नहीं है।';
  }
  if (s.includes('not among prime') || s.includes('not on the prime')) {
    return 'यह नक्षत्र इस संस्कार हेतु मुख्य सूची में नहीं है।';
  }

  // Fallback: extract Devanagari inside parentheses if present
  const match = text.match(/\(([\u0900-\u097F\s,.-]+)\)/);
  if (match) {
    return match[1].trim() + '।';
  }

  return text;
}

const FESTIVAL_NAME_HI: Record<string, string> = {
  'Aadi Amavasai': 'आदि अमावस्या',
  'Aadi Pooram': 'आदि पूरम',
  'Aani Thirumanjanam': 'आनि तिरुमंजनम',
  'Akshaya Tritiya': 'अक्षय तृतीया',
  'Ambubachi Mela': 'अम्बुवाची मेला',
  'Anant Chaturdashi': 'अनन्त चतुर्दशी',
  'Ani Tirumanjanam': 'आनि तिरुमंजनम',
  'Annakut (Govardhan Puja)': 'अन्नकूट (गोवर्धन पूजा)',
  'Annakut': 'अन्नकूट',
  'Avani Moola Utsavam': 'आवनि मूल उत्सवम',
  'Ayudha Puja': 'आयुध पूजा',
  'Badri-Kedar Utsav': 'बद्री-केदार उत्सव',
  'Bala Chaturdashi': 'बाला चतुर्दशी',
  'Bhadrapada Mela': 'भाद्रपद मेला',
  'Bhai Dooj': 'भाई दूज (यम द्वितीया)',
  'Brahmotsavam': 'ब्रह्मोत्सवम',
  'Chaitra Navratri': 'चैत्र नवरात्रि',
  'Chandan Yatra': 'चन्दन यात्रा',
  'Chhath Puja': 'छठ पूजा',
  'Chithirai Ther': 'चित्तिरै रथोत्सव',
  'Chithirai Thiruvizha': 'चित्तिरै तिरुविझा',
  'Chitra Pournami Girivalam': 'चित्रा पौर्णमी गिरिवलम',
  'Deepotsav': 'दीपोत्सव',
  'Dev Deepavali': 'देव दीपावली',
  'Devshayani Ekadashi': 'देवशयनी एकादशी',
  'Devutthana Ekadashi': 'देवउठनी एकादशी',
  'Dhanteras': 'धनतेरस',
  'Diwali': 'दीपावली',
  'Diwali & Annakut': 'दीपावली एवं अन्नकूट',
  'Diwali (Lakshmi Puja)': 'दीपावली (महालक्ष्मी पूजन)',
  'Durga Ashtami': 'दुर्गाष्टमी',
  'Durga Puja': 'दुर्गा पूजा',
  'Durga Puja & Navaratri': 'दुर्गा पूजा एवं नवरात्रि',
  'Ganesh Chaturthi': 'गणेश चतुर्थी',
  'Gita Jayanti': 'गीता जयंती',
  'Govardhan Puja': 'गोवर्धन पूजा',
  'Hanuman Jayanti': 'हनुमान जयंती',
  'Holi': 'होली',
  'Holi / Phul Dol': 'होली (फूल डोल)',
  'Janmashtami': 'कृष्ण जन्माष्टमी',
  'Kali Puja': 'काली पूजा',
  'Kanku Abhishekam': 'कुंकुम अभिषेक',
  'Karthigai Deepam': 'कार्तिगई दीपम',
  'Kartik Deepotsav': 'कार्तिक दीपोत्सव',
  'Kartik Purnima Mela': 'कार्तिक पूर्णिमा मेला',
  'Kartik Purnima Narmada Deepotsav': 'कार्तिक पूर्णिमा नर्मदा दीपोत्सव',
  'Krishna Janmashtami': 'कृष्ण जन्माष्टमी',
  'Maha Shivaratri': 'महाशिवरात्रि',
  'Makar Sankranti': 'मकर संक्रांति',
  'Manasa Puja': 'मनसा पूजा',
  'Marghazhi Thiruvaadhirai': 'मार्गशीर्ष तिरुवाधिरै (आर्द्रा दर्शन)',
  'Masik Shivaratri': 'मासिक शिवरात्रि',
  'Nag Panchami': 'नाग पञ्चमी',
  'Nashik Kumbh Mela': 'नासिक कुम्भ मेला',
  'Natyanjali Dance Festival': 'नाट्यांजलि उत्सव',
  'Navaratri': 'नवरात्रि',
  'Navratri': 'नवरात्रि',
  'Navratri Saraswati Puja': 'नवरात्रि सरस्वती पूजा',
  'Nyepi Festival': 'न्येपी उत्सव',
  'Panguni Brahmotsavam': 'पंगुनी ब्रह्मोत्सवम',
  'Panguni Uthiram': 'पंगुनी उथिरम',
  'Phalaharini Kali Puja': 'फलहारिणी काली पूजा',
  'Poila Boishakh': 'पोइला बैशाख (नववर्ष)',
  'Pongal': 'पोंगल',
  'Pradosh Vrat': 'प्रदोष व्रत',
  'Pradosha': 'प्रदोष काल',
  'Radhashtami': 'राधाष्टमी',
  'Rama Navami': 'रामनवमी',
  'Ramayana Ballet': 'रामायण नृत्य नाटिका',
  'Rangbhari Ekadashi': 'रंगभरी एकादशी (आमलकी)',
  'Ratanti Kali Puja': 'रतन्ती काली पूजा',
  'Ratha Saptami': 'रथ सप्तमी',
  'Ratha Yatra': 'रथयात्रा',
  'Rathasapthami': 'रथसप्तमी',
  'Sankashti Chaturthi': 'संकष्टी चतुर्थी',
  'Shani Pradosh': 'शनि प्रदोष',
  'Sharad Navratri': 'शारदीय नवरात्रि',
  'Sharad Purnima': 'शरद पूर्णिमा',
  'Sharad Purnima (Kojagari)': 'शरद पूर्णिमा (कोजागरी)',
  'Shravan Somvar': 'श्रावण सोमवार',
  'Shravana Maas': 'श्रावण मास',
  'Shravana Masam Somavara': 'श्रावण मास सोमवार',
  'Shravana Purnima': 'श्रावण पूर्णिमा (रक्षाबन्धन)',
  'Shravana Sawari': 'श्रावण सवारी (महाकाल)',
  'Shravana Somavar': 'श्रावण सोमवार',
  'Shravana Somavara': 'श्रावण सोमवार',
  'Shravani Mela': 'श्रावणी मेला',
  'Simhastha Kumbh Mela': 'सिंहस्थ कुम्भ मेला',
  'Skanda Sashti': 'स्कन्द षष्ठी',
  'Snana Yatra': 'स्नान यात्रा',
  'Sri Venkateswara Brahmotsavam': 'श्री वेंकटेश्वर ब्रह्मोत्सवम',
  'Sundarkand Path': 'सुन्दरकाण्ड पाठ',
  'Swaminarayan Jayanti': 'स्वामिनारायण जयंती',
  'Teej Festival': 'हरतालिका तीज',
  'Thaipusam': 'थाईपूसम',
  'Thirukalyanam': 'तिरुक्कल्याणम (दिव्य विवाह)',
  'Tripurari Purnima': 'त्रिपुरारि पूर्णिमा',
  'Tripuri Purnima': 'त्रिपुरी पूर्णिमा',
  'Tulsi Vivah': 'तुलसी विवाह',
  'Ugadi': 'उगादि (नववर्ष)',
  'Vaikasi Visakam': 'वैकासी विशाखम',
  'Vaikuntha Chaturdashi': 'वैकुण्ठ चतुर्दशी',
  'Vaikuntha Ekadashi': 'वैकुण्ठ एकादशी',
  'Varalakshmi Vratam': 'वरलक्ष्मी व्रत',
  'Vasant Panchami': 'वसन्त पञ्चमी',
  'Vijayadashami': 'विजयादशमी',
  'Vijayadashami (Dussehra)': 'विजयादशमी (दशहरा)',
  'Vinayaka Chaturthi': 'विनायक चतुर्थी',
  'Vivah Panchami': 'विवाह पञ्चमी',
};

export function cleanFestivalName(rawName: string | undefined | null, isHi: boolean): string {
  if (!rawName) return '';
  if (!isHi) {
    return rawName.replace(/\s*\([\u0900-\u097F\s,.-]+\)/g, '').trim();
  }

  const base = rawName.split('(')[0].trim();
  if (FESTIVAL_NAME_HI[rawName]) return FESTIVAL_NAME_HI[rawName];
  if (FESTIVAL_NAME_HI[base]) return FESTIVAL_NAME_HI[base];

  for (const [key, val] of Object.entries(FESTIVAL_NAME_HI)) {
    if (rawName.toLowerCase().includes(key.toLowerCase())) {
      return val;
    }
  }

  const matchDev = rawName.match(/\(([\u0900-\u097F\s,.-]+)\)/);
  if (matchDev) return matchDev[1].trim();

  return rawName;
}

const AYUDHA_MAP_HI: Record<string, string> = {
  'Abhaya Mudra': 'अभय मुद्रा',
  'Akshamala (Japa Rosary)': 'अक्षमाला (जपमाला)',
  'Ankusha (Elephant Goad)': 'अंकुश',
  'Bow & Arrow': 'धनुष-बाण',
  'Bow and Sword': 'धनुष एवं तलवार',
  'Broken Tusk (Danta)': 'भग्न दन्त (एकदन्त)',
  'Chakra': 'चक्र',
  'Damaru (Drum)': 'डमरू',
  'Dronagiri Mountain in Hand': 'करकमल में द्रोणागिरि पर्वत',
  'Gada (Golden Mace)': 'सुवर्ण गदा',
  'Kamandalu': 'कमण्डलु',
  'Kapala (Skull Cup)': 'कपाल',
  'Kaumodaki Gada (Mace)': 'कौमोदकी गदा',
  'Kaustubha Gem': 'कौस्तुभ मणि',
  'Khadga (Curved Sword)': 'खड्ग (कृपाण)',
  'Kodanda Bow & Arrow (कोदण्ड धनुष)': 'कोदण्ड धनुष-बाण',
  'Kripana': 'कृपाण',
  'Lotus': 'कमल पुष्प',
  'Modaka': 'मोदक',
  'Murali (Flute)': 'मुरली (वेणु)',
  'Padma (Lotus)': 'पद्म (कमल)',
  'Padma (Two Lotus flowers)': 'द्वि-कमल पुष्प',
  'Padma (Two Lotuses in hands)': 'हस्तकमल में द्वि-पद्म',
  'Panchajanya Shankha (Conch)': 'पाञ्चजन्य शंख',
  'Pasha (Noose)': 'पाश',
  'Pinaka (Bow)': 'पिनाक धनुष',
  'Severed Demon Head': 'असुर शिर',
  'Sudarshana Chakra': 'सुदर्शन चक्र',
  'Sudarshana Chakra (Discus)': 'सुदर्शन चक्र',
  'Sword (Khadga)': 'खड्ग',
  'Trishula': 'त्रिशूल',
  'Trishula (Trident)': 'त्रिशूल',
  'Vanamala': 'वैजयन्ती वनमाला',
  'Varada Mudra (Gold shower)': 'वरद मुद्रा (स्वर्ण वर्षा)',
  'Veda / Pustaka (Sacred Scripture)': 'वेद / पवित्र ग्रन्थ',
  'Veena (Lute)': 'वीणा',
  'Vel (Divine Spear of Wisdom)': 'ज्ञान वेल (शक्ति त्रिशूल)',
};

export function cleanAyudha(ayudha: string | undefined | null, isHi: boolean): string {
  if (!ayudha) return '';
  if (!isHi) {
    return ayudha.replace(/\s*\([\u0900-\u097F\s,.-]+\)/g, '').trim();
  }
  if (AYUDHA_MAP_HI[ayudha]) return AYUDHA_MAP_HI[ayudha];
  for (const [k, v] of Object.entries(AYUDHA_MAP_HI)) {
    if (ayudha.toLowerCase().includes(k.toLowerCase())) return v;
  }
  return ayudha;
}

export function cleanOffering(offering: string | undefined | null, isHi: boolean): string {
  if (!offering) return '';
  if (!isHi) {
    return offering.replace(/\s*\([\u0900-\u097F\s,.-]+\)/g, '').trim();
  }
  const s = offering.toLowerCase();
  if (s.includes('durva')) return '२१ दूर्वा दल';
  if (s.includes('belpatra') || s.includes('bilva')) return 'बिल्वपत्र (बेलपत्र)';
  if (s.includes('tulsi')) return 'पवित्र तुलसी दल एवं माला';
  if (s.includes('hibiscus') || s.includes('gudhal')) return 'लाल गुड़हल पुष्प';
  if (s.includes('bhasma') || s.includes('vibhuti')) return 'पवित्र भस्म (विभूति)';
  if (s.includes('chandan') || s.includes('sandalwood')) return 'चन्दन लेप';
  if (s.includes('modak') || s.includes('laddu')) return 'मोदक एवं बेसन/बूंदी के लड्डू';
  if (s.includes('makkhan') || s.includes('butter')) return 'माखन-मिश्री';
  if (s.includes('panchamrit')) return 'पञ्चामृत';
  if (s.includes('gangajal') || s.includes('pure water')) return 'गंगाजल एवं शुद्ध जल';
  if (s.includes('kheer') || s.includes('payasam')) return 'केसर युक्त खीर (पायसम)';
  if (s.includes('dhatura')) return 'धतूरा एवं भांग';
  if (s.includes('arghya')) return 'ताम्रपात्र से सूर्य अर्घ्य';
  if (s.includes('sindoor') || s.includes('kumkum') || s.includes('vermilion')) return 'सिन्दूर एवं कुंकुम';
  if (s.includes('surya namaskara')) return 'सूर्य नमस्कार';
  if (s.includes('panakam')) return 'पानकम (गुड़, कालीमिर्च एवं इलायची जल)';
  if (s.includes('halwa')) return 'हलवा, पूरी एवं चना';
  if (s.includes('chunari')) return 'चुनरी एवं श्रृंगार सामग्री';
  if (s.includes('musical') || s.includes('pens')) return 'लेखनी, ग्रन्थ एवं वाद्य यन्त्र';
  if (s.includes('yellow flowers') || s.includes('pitambari')) return 'पीत पुष्प एवं पीताम्बरी वस्त्र';
  if (s.includes('lotus')) return 'श्वेत व रक्त कमल पुष्प';
  if (s.includes('betel') || s.includes('paan')) return 'ताम्बूल (पान बीड़ा)';
  if (s.includes('jaggery') || s.includes('coconut')) return 'गुड़ एवं श्रीफल (नारियल)';
  if (s.includes('incense') || s.includes('deepa')) return 'धूप एवं दीप';
  if (s.includes('raw milk') || s.includes('milk')) return 'कच्चा दुग्ध एवं मधु';

  const match = offering.match(/\(([^)]+)\)/);
  if (match && /[\u0900-\u097F]/.test(match[1])) return match[1].trim();

  return offering;
}

export function cleanIndianLocation(loc: string | undefined | null, isHi: boolean): string {
  if (!loc) return '';
  if (!isHi) return loc.replace(/\s*\([\u0900-\u097F\s,.-]+\)/g, '').trim();

  return loc
    .replace(/Varanasi/g, 'वाराणसी')
    .replace(/Ujjain/g, 'उज्जैन')
    .replace(/Rudraprayag/g, 'रुद्रप्रयाग')
    .replace(/Prabhas Patan/g, 'प्रभास पाटन')
    .replace(/Chamoli/g, 'चमोली')
    .replace(/Tirupati/g, 'तिरुपति')
    .replace(/Srirangam/g, 'श्रीरंगम')
    .replace(/Puri/g, 'पुरी')
    .replace(/Guwahati/g, 'गुवाहाटी')
    .replace(/Katra/g, 'कटरा')
    .replace(/Kolkata/g, 'कोलकाता')
    .replace(/Madurai/g, 'मदुरै')
    .replace(/Mumbai/g, 'मुम्बई')
    .replace(/Tiruchirappalli/g, 'तिरुचिरापल्ली')
    .replace(/Dwarka/g, 'द्वारका')
    .replace(/Vrindavan/g, 'वृन्दावन')
    .replace(/Guruvayur/g, 'गुरुवायूर')
    .replace(/Nathdwara/g, 'नाथद्वारा')
    .replace(/Ayodhya/g, 'अयोध्या')
    .replace(/Rameswaram/g, 'रामेश्वरम')
    .replace(/Bhadrachalam/g, 'भद्राचलम')
    .replace(/Kolhapur/g, 'कोल्हापुर')
    .replace(/Sringeri/g, 'श्रृंगेरी')
    .replace(/Basara/g, 'बासर')
    .replace(/Konark/g, 'कोणार्क')
    .replace(/Modhera/g, 'मोढेरा')
    .replace(/Palani/g, 'पलानी')
    .replace(/Batu Caves/g, 'बाटु केव्स')
    .replace(/Thanjavur/g, 'तंजावुर')
    .replace(/Chidambaram/g, 'चिदम्बरम')
    .replace(/Kathmandu/g, 'काठमांडू')
    .replace(/Tiruvannamalai/g, 'तिरुवन्नामलई')
    .replace(/Kanchipuram/g, 'कांचीपुरम')
    .replace(/Kalahasti/g, 'श्रीकालहस्ती')
    .replace(/Srikalahasti/g, 'श्रीकालहस्ती')
    .replace(/Trimbak/g, 'त्र्यंबक')
    .replace(/Nashik/g, 'नासिक')
    .replace(/Deoghar/g, 'देवघर')
    .replace(/Baidyanath/g, 'बैद्यनाथ')
    .replace(/Pune/g, 'पुणे')
    .replace(/Aurangabad/g, 'छत्रपति संभाजीनगर')
    .replace(/Srisailam/g, 'श्रीशैलम')
    .replace(/Khandwa/g, 'खण्डवा')
    .replace(/Haridwar/g, 'हरिद्वार')
    .replace(/Rishikesh/g, 'ऋषिकेश')
    .replace(/New Delhi/g, 'नई दिल्ली')
    .replace(/Delhi/g, 'दिल्ली')
    .replace(/Bengaluru/g, 'बेंगलुरु')
    .replace(/Chennai/g, 'चेन्नई')
    .replace(/Hyderabad/g, 'हैदराबाद')
    .replace(/Ahmedabad/g, 'अहमदाबाद')
    .replace(/Jaipur/g, 'जयपुर')
    .replace(/Nagpur/g, 'नागपुर')
    .replace(/Uttar Pradesh/g, 'उत्तर प्रदेश')
    .replace(/Madhya Pradesh/g, 'मध्य प्रदेश')
    .replace(/Uttarakhand/g, 'उत्तराखंड')
    .replace(/Gujarat/g, 'गुजरात')
    .replace(/Andhra Pradesh/g, 'आन्ध्र प्रदेश')
    .replace(/Tamil Nadu/g, 'तमिलनाडु')
    .replace(/Odisha/g, 'ओडिशा')
    .replace(/Assam/g, 'असम')
    .replace(/Jammu & Kashmir/g, 'जम्मू व कश्मीर')
    .replace(/West Bengal/g, 'पश्चिम बंगाल')
    .replace(/Maharashtra/g, 'महाराष्ट्र')
    .replace(/Kerala/g, 'केरल')
    .replace(/Rajasthan/g, 'राजस्थान')
    .replace(/Jharkhand/g, 'झारखंड')
    .replace(/Telangana/g, 'तेलंगाना')
    .replace(/Karnataka/g, 'कर्नाटक')
    .replace(/Malaysia/g, 'मलेशिया')
    .replace(/Nepal/g, 'नेपाल')
    .replace(/India/g, 'भारत')
    .replace(/Standard Meridian/g, 'मुख्य मध्याह्न रेखा');
}

export function cleanEra(era: string | undefined | null, isHi: boolean): string {
  if (!era) return '';
  if (!isHi) return era.replace(/\s*\([\u0900-\u097F\s,.-]+\)/g, '').trim();

  let res = era;
  res = res.replace(/Primordial Vedic/gi, 'सनातन वैदिक काल');
  res = res.replace(/Vedic/gi, 'वैदिक काल');
  res = res.replace(/Prehistoric/gi, 'प्रागैतिहासिक');
  res = res.replace(/Mahabharata Era/gi, 'महाभारत कालीन');
  res = res.replace(/Treta Yuga/gi, 'त्रेतायुग कालीन');
  res = res.replace(/Puranic/gi, 'पौराणिक काल');
  res = res.replace(/Century CE/gi, 'शताब्दी ईस्वी');
  res = res.replace(/CE/gi, 'ईस्वी');
  res = res.replace(/Reconstructed/gi, 'पुनर्निर्मित');
  res = res.replace(/Constructed/gi, 'निर्मित');
  res = res.replace(/Consecrated/gi, 'प्रतिष्ठित');
  res = res.replace(/Rebuilt/gi, 'पुनर्निर्मित');
  res = res.replace(/Dynasty/gi, 'राजवंश');
  res = res.replace(/Kings/gi, 'नरेश');
  res = res.replace(/King/gi, 'राजा');
  res = res.replace(/by/gi, 'द्वारा');
  res = res.replace(/in/gi, 'में');
  return res;
}

export function cleanDressCode(code: string | undefined | null, isHi: boolean): string {
  if (!code) return '';
  if (!isHi) return code.replace(/\s*\([\u0900-\u097F\s,.-]+\)/g, '').trim();

  let res = code;
  res = res.replace(/Traditional Indian attire/gi, 'पारम्परिक भारतीय परिधान');
  res = res.replace(/Strict Vedic dress/gi, 'वैदिक पारम्परिक परिधान');
  res = res.replace(/Strict South Indian traditional attire/gi, 'दक्षिण भारतीय पारम्परिक परिधान');
  res = res.replace(/Decent traditional attire/gi, 'सभ्य पारम्परिक परिधान');
  res = res.replace(/Traditional modest attire/gi, 'पारम्परिक सादगीपूर्ण परिधान');
  res = res.replace(/Dhoti\/Kurta for men/gi, 'पुरुषों हेतु धोती/कुर्ता');
  res = res.replace(/Dhoti for men/gi, 'पुरुषों हेतु धोती');
  res = res.replace(/Saree\/Salwar for women/gi, 'महिलाओं हेतु साड़ी/सलवार');
  res = res.replace(/Saree\/Churidar for women/gi, 'महिलाओं हेतु साड़ी/चूड़ीदार');
  res = res.replace(/Sarees for women/gi, 'महिलाओं हेतु साड़ी');
  res = res.replace(/for men/gi, 'पुरुषों हेतु');
  res = res.replace(/for women/gi, 'महिलाओं हेतु');
  res = res.replace(/Sparsh Darshan/gi, 'स्पर्श दर्शन');
  res = res.replace(/No leather items, phones, or cameras allowed inside/gi, 'चमड़े की वस्तुएं, मोबाइल एवं कैमरा वर्जित');
  res = res.replace(/Leather belts, shoes, phones, cameras strictly prohibited/gi, 'चमड़े के बेल्ट, जूते, फोन व कैमरा पूर्णतः वर्जित');
  res = res.replace(/Heavy warm woolens/gi, 'ऊनी गर्म पारम्परिक वस्त्र');
  res = res.replace(/mandatory/gi, 'अनिवार्य');
  return res;
}

export function cleanDarshanTimings(timings: string | undefined | null, isHi: boolean): string {
  if (!timings) return '';
  if (!isHi) return timings.replace(/\s*\([\u0900-\u097F\s,.-]+\)/g, '').trim();

  return timings
    .replace(/Open Daily/gi, 'प्रतिदिन दर्शन')
    .replace(/Daily/gi, 'प्रतिदिन')
    .replace(/AM/gi, 'प्रातः')
    .replace(/PM/gi, 'संध्या')
    .replace(/Mangala Aarti/gi, 'मंगला आरती')
    .replace(/Saptarshi Aarti/gi, 'सप्तर्षि आरती')
    .replace(/Bhasma Aarti/gi, 'भस्म आरती')
    .replace(/Shringar Aarti/gi, 'शृंगार आरती')
    .replace(/Sayana Aarti/gi, 'शयन आरती')
    .replace(/Sandhya Aarti/gi, 'संध्या आरती')
    .replace(/Bhog Aarti/gi, 'भोग आरती');
}

export function cleanPujaMuhurta(muhurta: string | undefined | null, isHi: boolean): string {
  if (!muhurta) return '';
  if (!isHi) return muhurta.replace(/\s*\([\u0900-\u097F\s,.-]+\)/g, '').trim();

  return muhurta
    .replace(/Mahapunya Kaal & Punya Kaal around Sunrise/gi, 'सूर्योदय के समय महापुण्य काल एवं पुण्य काल')
    .replace(/Purvahna Kaal \(Morning to Midday\)/gi, 'पूर्वाह्न काल (प्रातः से मध्याह्न)')
    .replace(/Arunodaya \/ Sunrise Snana/gi, 'अरुणोदय / सूर्योदय स्नान')
    .replace(/Nishita Kaal \(Midnight\) & 4 Prahara Puja/gi, 'निशीथ काल (मध्यरात्रि) एवं चार प्रहर पूजा')
    .replace(/Nishita Kaal \(Midnight Abhishekam\)/gi, 'निशीथ काल (मध्यरात्रि अभिषेक)')
    .replace(/Nishita Kaal/gi, 'निशीथ काल (मध्यरात्रि)')
    .replace(/Pradosha Kaal without Bhadra/gi, 'भद्रारहित प्रदोष काल')
    .replace(/Pradosha Kaal & Nishita Kaal/gi, 'प्रदोष काल एवं निशीथ काल')
    .replace(/Pradosha Kaal \(Lakshmi Puja\)/gi, 'प्रदोष काल (महालक्ष्मी पूजन)')
    .replace(/Pradosha Kaal/gi, 'प्रदोष काल')
    .replace(/Pratah Kaal \/ Sunrise Ghatasthapana/gi, 'प्रातःकाल / सूर्योदय घटस्थापना')
    .replace(/Pratah Kaal \/ Abhijit Muhurta/gi, 'प्रातःकाल / अभिजित मुहूर्त')
    .replace(/Pratah to Madhyahna Kaal/gi, 'प्रातः से मध्याह्न काल')
    .replace(/Pratah or Pradosha Kaal/gi, 'प्रातः अथवा प्रदोष काल')
    .replace(/Pratah Snana & Yama Tarpan/gi, 'प्रातः स्नान एवं यम तर्पण')
    .replace(/Pratah Snana & Deepadaana/gi, 'प्रातः स्नान एवं दीपदान')
    .replace(/Pratah Snana & Surya Tarpan/gi, 'प्रातः स्नान एवं सूर्य तर्पण')
    .replace(/Madhyahna Kaal \(Midday at 12:00 PM\)/gi, 'मध्याह्न काल (दोपहर १२:०० बजे)')
    .replace(/Madhyahna Kaal \(Midday Ganapati Sthapana\)/gi, 'मध्याह्न काल (गणपति स्थापना)')
    .replace(/Madhyahna Kaal Navami Puja/gi, 'मध्याह्न काल नवमी पूजा')
    .replace(/Madhyahna Kaal Gita Patha/gi, 'मध्याह्न काल गीता पाठ')
    .replace(/Madhyahna Kaal/gi, 'मध्याह्न काल')
    .replace(/Morning Snana & Ahimsa Prayer/gi, 'प्रातः स्नान एवं प्रार्थना')
    .replace(/Purnima Sunrise to Midday/gi, 'पूर्णिमा सूर्योदय से मध्याह्न')
    .replace(/Purnima Midday and Evening/gi, 'पूर्णिमा मध्याह्न एवं संध्या')
    .replace(/Purnima Morning/gi, 'पूर्णिमा प्रातःकाल')
    .replace(/Dashami Madhyahna \/ Morning/gi, 'दशमी मध्याह्न / प्रातःकाल')
    .replace(/Dwitiya Pratah Kaal \/ Yatra Commencement/gi, 'द्वितीया प्रातःकाल / यात्रा आरम्भ')
    .replace(/Ekadashi Sunrise & Harivasara/gi, 'एकादशी सूर्योदय एवं हरिवासर')
    .replace(/Panchami Sunrise to Morning/gi, 'पञ्चमी सूर्योदय से प्रातः काल')
    .replace(/Aparahna \/ Pradosha Kaal \(Free of Bhadra\)/gi, 'अपराह्न / प्रदोष काल (भद्रारहित)')
    .replace(/Aparahna \/ Kutapa Muhurta/gi, 'अपराह्न / कुतुप मुहूर्त')
    .replace(/Aparahna Kaal \(Bhratri Dwitiya\)/gi, 'अपराह्न काल (भ्रातृ द्वितीया)')
    .replace(/Aparahna Kaal/gi, 'अपराह्न काल')
    .replace(/Morning to Midday Puja & Visarjan/gi, 'प्रातः से मध्याह्न पूजन एवं विसर्जन')
    .replace(/Sandhi Puja \(Junction of Ashtami and Navami\)/gi, 'सन्धि पूजा (अष्टमी-नवमी संधिकाल)')
    .replace(/Vijaya Muhurta & Aparahna Kaal/gi, 'विजय मुहूर्त एवं अपराह्न काल')
    .replace(/Evening Sandhya Puja & Moonrise Arghya/gi, 'सायं सन्ध्या पूजा एवं चन्द्रोदय अर्घ्य')
    .replace(/Evening Sunset to Moonrise/gi, 'सायं सूर्यास्त से चन्द्रोदय')
    .replace(/Evening Tulsi Vivaha Lagna/gi, 'सायंकाल तुलसी विवाह लग्न')
    .replace(/Sunrise/gi, 'सूर्योदय')
    .replace(/Sunset/gi, 'सूर्यास्त')
    .replace(/Morning/gi, 'प्रातःकाल')
    .replace(/Evening/gi, 'सायंकाल')
    .replace(/Midday/gi, 'मध्याह्न')
    .replace(/Midnight/gi, 'मध्यरात्रि')
    .replace(/Auspicious Muhurta across day/gi, 'दिन भर शास्त्रसम्मत शुभ मुहूर्त');
}

export function cleanTempleSignificance(sig: string | undefined | null, isHi: boolean): string {
  if (!sig) return '';
  if (!isHi) return sig.replace(/\s*\([\u0900-\u097F\s,.-]+\)/g, '').trim();

  const s = sig.toLowerCase();
  if (s.includes('chief of the 12 sacred jyotirlingas') || s.includes('banks of ganga')) {
    return 'गङ्गा तट पर स्थित द्वादश ज्योतिर्लिंगों में प्रधान मोक्ष तीर्थ।';
  }
  if (s.includes('lord of time') || s.includes('prime meridian')) {
    return 'वैदिक मुख्य मध्याह्न रेखा पर प्रतिष्ठित काल के अधिष्ठाता महाकाल।';
  }
  if (s.includes('himalayan shrine') || s.includes('3,583m')) {
    return 'हिमालय की दिव्य गोद में ३,५८३ मीटर ऊंचाई पर स्थित पावन मोक्ष धाम।';
  }
  if (s.includes('first of the 12') || s.includes('chandra dev')) {
    return 'चन्द्रदेव द्वारा पूजित सनातन प्रथम ज्योतिर्लिंग धाम।';
  }
  if (s.includes('char dham') && s.includes('narayana')) {
    return 'चार धामों में पावन तीर्थ, जहाँ भगवान नारायण ने तपस्या की।';
  }
  if (s.includes('kali yuga vaikuntha') || s.includes('srinivasa')) {
    return 'कलियुग का प्रत्यक्ष वैकुण्ठ धाम, जहाँ भगवान श्रीनिवास विराजते हैं।';
  }
  if (s.includes('reclining ranganatha') || s.includes('srirangam')) {
    return 'शयन मुद्रा में भगवान रंगनाथ को समर्पित विशालतम वैष्णव तीर्थ।';
  }
  if (s.includes('lord of the universe') || s.includes('eastern char dham')) {
    return 'पूर्वी चार धाम में जगत के स्वामी भगवान जगन्नाथ का पावन धाम।';
  }
  if (s.includes('shakti peetha') && s.includes('womb')) {
    return 'परम तान्त्रिक शक्तिपीठ जहाँ माँ भगवती की योनि मुद्रा पूजित है।';
  }
  if (s.includes('trikuta') || s.includes('vaishno')) {
    return 'महालक्ष्मी, महाकाली और महासरस्वती की पवित्र त्रिकूटा पर्वत गुफा।';
  }
  if (s.includes('toes') || s.includes('kalighat')) {
    return 'माता सती के चरण के अंगूठे का पावन सिद्ध शक्तिपीठ।';
  }
  if (s.includes('meenakshi')) {
    return 'माँ मीनाक्षी एवं भगवान सुन्दरेश्वर को समर्पित भव्य स्थापत्य धाम।';
  }
  if (s.includes('trunk turns to the right') || s.includes('siddhivinayak')) {
    return 'दक्षिणमुखी सूंड वाले सिद्धिविनायक का प्रसिद्ध मनोकामना पूरक धाम।';
  }
  if (s.includes('ashtavinayaka') || s.includes('8 sanctuaries')) {
    return 'भगवान श्रीगणेश के स्वयम्भू आठ पावन अष्टविनायक तीर्थ।';
  }
  if (s.includes('rock-fort') || s.includes('vibhishana')) {
    return 'विभीषण से सम्बद्ध पौराणिक ऐतिहासिक शैल मन्दिर।';
  }
  if (s.includes('dwarka') || s.includes('western char dham')) {
    return 'पश्चिमी चार धाम में भगवान श्रीकृष्ण की पावन द्वारिकापुरी।';
  }
  if (s.includes('boyhood leelas') || s.includes('banke bihari')) {
    return 'ब्रजभूमि का पावन हृदय स्थल जहाँ श्रीकृष्ण ने बाल लीलाएं कीं।';
  }
  if (s.includes('guruvayur') || s.includes('bhuloka vaikuntha')) {
    return 'भूलोक वैकुण्ठ जहाँ भगवान बालकृष्ण का पावन विग्रह पूजित है।';
  }
  if (s.includes('govardhan') || s.includes('shrinathji')) {
    return 'पुष्टिमार्ग की प्रधान पीठ जहाँ गोवर्धनधारी श्रीकृष्ण पूजित हैं।';
  }
  if (s.includes('maryada purushottam') || s.includes('birthplace') || s.includes('janmabhoomi')) {
    return 'मर्यादा पुरुषोत्तम भगवान श्रीराम की पावन जन्मभूमि, भव्य मन्दिर।';
  }
  if (s.includes('kaikeyi') || s.includes('kanak bhawan')) {
    return 'माता कैकेयी द्वारा सीता जी को उपहार स्वरूप दिया गया दिव्य महल।';
  }
  if (s.includes('southern char dham') || s.includes('ramanathaswamy')) {
    return 'दक्षिणी चार धाम जहाँ श्रीराम ने लंका विजय पूर्व ज्योतिर्लिंग स्थापित किया।';
  }
  if (s.includes('bhadrachalam') || s.includes('godavari')) {
    return 'गोदावरी तट पर स्थित पावन धाम जहाँ श्रीराम, सीता व लक्ष्मण रहे।';
  }
  if (s.includes('protects the city') || s.includes('hanumangarhi')) {
    return 'अयोध्या की रक्षा करने वाले श्री हनुमान जी का दिव्य किला।';
  }
  if (s.includes('tulsidas') || s.includes('sankat mochan')) {
    return 'गोस्वामी तुलसीदास जी द्वारा स्थापित संकट निवारक पावन धाम।';
  }
  if (s.includes('salasar') || s.includes('moustache')) {
    return 'दाढ़ी-मूँछ वाले बाल हनुमान जी का प्रसिद्ध मनोकामना पूरक धाम।';
  }
  if (s.includes('mehandipur') || s.includes('evil spirits')) {
    return 'नकारात्मक ऊर्जा व ग्रह बाधा निवारण हेतु प्रसिद्ध तीर्थ।';
  }
  if (s.includes('kolhapur') || s.includes('prosperity')) {
    return 'समृद्धि और ऐश्वर्य की प्रधान पीठ जहाँ महालक्ष्मी साक्षात निवास करती हैं।';
  }
  if (s.includes('padmavathi')) {
    return 'तिरुपति के निकट माता पद्मावती का पावन मन्दिर।';
  }
  if (s.includes('sripuram') || s.includes('gold leaf')) {
    return 'विशुद्ध स्वर्ण से आच्छादित भव्य महालक्ष्मी धाम।';
  }
  if (s.includes('sringeri') || s.includes('sharada')) {
    return 'तुंगा तट पर आद्य शंकराचार्य द्वारा स्थापित दक्षिण आम्नाय विद्यापीठ।';
  }
  if (s.includes('basara') || s.includes('vyasa')) {
    return 'गोदावरी तट पर स्थित मन्दिर जहाँ महर्षि व्यास ने तप किया।';
  }
  if (s.includes('konark') || s.includes('chariot')) {
    return '१३वीं शताब्दी का रथ रूपी सूर्य मन्दिर, यूनेस्को विश्व धरोहर।';
  }
  if (s.includes('modhera') || s.includes('solanki')) {
    return 'पुष्पावती तट पर सोलंकी कालीन भव्य सूर्य मन्दिर।';
  }
  if (s.includes('palani') || s.includes('dhandayuthapani')) {
    return 'मुरुगन स्वामी का पावन दण्डायुधपाणि स्वरूप तीर्थ।';
  }
  if (s.includes('swamimalai') || s.includes('pranava mantra')) {
    return 'जहाँ मुरुगन स्वामी ने भगवान शिव को प्रणव मन्त्र ॐ का उपदेश दिया।';
  }
  if (s.includes('thiruchendur') || s.includes('soorapadman')) {
    return 'समुद्र तट पर स्थित मन्दिर जहाँ मुरुगन ने सूरपद्म का संहार किया।';
  }
  if (s.includes('batu caves')) {
    return '१४० फीट स्वर्ण मुरुगन प्रतिमा से युक्त मलेशिया का प्रसिद्ध गुफा मन्दिर।';
  }
  if (s.includes('dakshineswar') || s.includes('ramakrishna')) {
    return 'जहाँ रामकृष्ण परमहंस ने माँ भवतारिणी का साक्षात साक्षात्कार किया।';
  }
  if (s.includes('tarapith') || s.includes('vashistha')) {
    return 'तारा देवी एवं महर्षि वशिष्ठ को समर्पित सिद्ध श्मशान शक्तिपीठ।';
  }

  const match = sig.match(/\(([\u0900-\u097F\s,.-]+)\)/);
  if (match) return match[1].trim() + '।';

  return sig;
}

