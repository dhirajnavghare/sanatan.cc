import { PanchangData } from '../panchang/types';

export interface DailyDevataInfo {
  dayIndex: number; // 0 = Sunday, 1 = Monday, ...
  dayName: string;
  dayNameHi: string;
  deityName: string;
  deityNameHi: string;
  mantra: string;
  mantraDevanagari: string;
  significance: string;
  significanceHi: string;
  prayerId: string;
  accentColor: string;
  bgPastel: string;
}

export const WEEKDAY_DEVATAS: Record<number, DailyDevataInfo> = {
  0: {
    dayIndex: 0,
    dayName: 'Sunday (Ravivara)',
    dayNameHi: 'रविवार (भानुवार)',
    deityName: 'Lord Surya Narayana',
    deityNameHi: 'भगवान सूर्य नारायण',
    mantra: 'Om Suryaya Namah | Om Ghrinih Suryaya Namah',
    mantraDevanagari: 'ॐ सूर्याय नमः • ॐ घृणिः सूर्याय नमः',
    significance: 'Source of life, vitality (Tejas), health, eye sight, and spiritual illumination.',
    significanceHi: 'आरोग्य, तेजस्, नेत्र ज्योति, पितृ सुख एवं प्रत्यक्ष देव की उपासना।',
    prayerId: 'aditya-hridaya-stotram',
    accentColor: '#f59e0b',
    bgPastel: '#fef3c7',
  },
  1: {
    dayIndex: 1,
    dayName: 'Monday (Somavara)',
    dayNameHi: 'सोमवार (इन्दुवार)',
    deityName: 'Lord Shiva / Mahadeva',
    deityNameHi: 'भगवान शिव / महादेव',
    mantra: 'Om Namah Shivaya | Om Tryambakam Yajamahe',
    mantraDevanagari: 'ॐ नमः शिवाय • ॐ त्र्यम्बकं यजामहे',
    significance: 'Governs mind (Chandra), tranquility, freedom from fear and inner peace.',
    significanceHi: 'मानसिक शान्ति, भय मुक्ति, कालजयी चेतना एवं औढरदानी शिव कृपा।',
    prayerId: 'shiv-tandav-stotram',
    accentColor: '#0ea5e9',
    bgPastel: '#e0f2fe',
  },
  2: {
    dayIndex: 2,
    dayName: 'Tuesday (Mangalavara)',
    dayNameHi: 'मंगलवार (भौमवार)',
    deityName: 'Sri Hanuman & Mangal Dev',
    deityNameHi: 'श्री हनुमान जी एवं मंगल देव',
    mantra: 'Om Ham Hanumate Namah | Jai Bajrang Bali',
    mantraDevanagari: 'ॐ हं हनुमते नमः • जय बजरंग बली',
    significance: 'Courage, victory over obstacles, protection from negative energies and strength.',
    significanceHi: 'शौर्य, संकट निवारण, बल, बुद्धि, विद्या एवं नकारात्मक ऊर्जा से रक्षा।',
    prayerId: 'hanuman-chalisa',
    accentColor: '#ea580c',
    bgPastel: '#ffedd5',
  },
  3: {
    dayIndex: 3,
    dayName: 'Wednesday (Budhavara)',
    dayNameHi: 'बुधवार (सौम्यवार)',
    deityName: 'Lord Ganesha & Budha Dev',
    deityNameHi: 'विघ्नहर्ता श्री गणेश एवं बुध देव',
    mantra: 'Om Gam Ganapataye Namah | Om Budhaya Namah',
    mantraDevanagari: 'ॐ गं गणपतये नमः • ॐ बुधाय नमः',
    significance: 'Intellect (Buddhi), commercial success, speech eloquence, and obstacle removal.',
    significanceHi: 'बुद्धि, विवेक, व्यापारिक सफलता, वाक्पटुता एवं निर्विघ्न कार्य सिद्धि।',
    prayerId: 'sankat-nashak-ganesh-stotram',
    accentColor: '#10b981',
    bgPastel: '#d1fae5',
  },
  4: {
    dayIndex: 4,
    dayName: 'Thursday (Guruvara)',
    dayNameHi: 'गुरुवार (बृहस्पतिवार)',
    deityName: 'Lord Sri Hari Vishnu & Brihaspati',
    deityNameHi: 'भगवान श्री हरि विष्णु एवं देवगुरु बृहस्पति',
    mantra: 'Om Namo Bhagavate Vasudevaya | Om Gurave Namah',
    mantraDevanagari: 'ॐ नमो भगवते वासुदेवाय • ॐ बृं बृहस्पतये नमः',
    significance: 'Wisdom, spiritual growth, dharma, family prosperity and divine grace.',
    significanceHi: 'ज्ञान, धर्म, सद्गुरु कृपा, सन्तान सुख एवं भाग्योदय।',
    prayerId: 'vishnu-sahasranamam',
    accentColor: '#eab308',
    bgPastel: '#fef9c3',
  },
  5: {
    dayIndex: 5,
    dayName: 'Friday (Shukravara)',
    dayNameHi: 'शुक्रवार (भृगुवार)',
    deityName: 'Maa Mahalakshmi & Devi Durga',
    deityNameHi: 'माता महालक्ष्मी एवं भगवती दुर्गा',
    mantra: 'Om Shreem Hreem Kleem Mahalakshmaye Namah',
    mantraDevanagari: 'ॐ श्रीं ह्रीं क्लीं महालक्ष्म्यै नमः • ॐ दुं दुर्गायै नमः',
    significance: 'Wealth, abundance, aesthetic beauty, domestic harmony and feminine power.',
    significanceHi: 'ऐश्वर्य, वैभव, गृह सुख-शांति, समृद्धि एवं पराशक्ति कृपा।',
    prayerId: 'mahalakshmi-ashtakam',
    accentColor: '#ec4899',
    bgPastel: '#fce7f3',
  },
  6: {
    dayIndex: 6,
    dayName: 'Saturday (Shanivara)',
    dayNameHi: 'शनिवार (मन्दवार)',
    deityName: 'Lord Shani Dev & Hanuman Ji',
    deityNameHi: 'न्यायाधिपति शनि देव एवं श्री हनुमान',
    mantra: 'Om Sham Shanaishcharaya Namah | Nilanjana Samabhasam',
    mantraDevanagari: 'ॐ शं शनैश्चराय नमः • नीलांजन समाभासं...',
    significance: 'Justice, discipline, endurance, alleviation of karmic debts and planetary afflictions.',
    significanceHi: 'कर्म न्याय, अनुशासन, धैर्य, कष्ट निवारण एवं साढ़ेसाती शमन।',
    prayerId: 'hanuman-chalisa',
    accentColor: '#6366f1',
    bgPastel: '#e0e7ff',
  },
};

export interface ShastricVerse {
  id: string;
  category: 'pratah_smaran' | 'bhojana' | 'sandhya' | 'shayana' | 'snana';
  titleHi: string;
  titleEn: string;
  source: string;
  devanagari: string;
  transliteration: string;
  meaningHindi: string;
  meaningEnglish: string;
  timingContextHi: string;
  timingContextEn: string;
}

export const SACRED_DAILY_VERSES: ShastricVerse[] = [
  {
    id: 'kara_darshanam',
    category: 'pratah_smaran',
    titleHi: 'कराग्रे वसते लक्ष्मीः (प्रातः कर-दर्शन)',
    titleEn: 'Kara Darshanam (Palm Viewing upon Waking)',
    source: 'पारम्परिक स्मृति श्लोक',
    devanagari: 'कराग्रे वसते लक्ष्मीः करमध्ये सरस्वती।\nकरमूले तु गोविन्दः प्रभाते करदर्शनम्॥',
    transliteration: 'Karagre Vasate Lakshmih Kara-Madhye Sarasvati |\nKara-Mule Tu Govindah Prabhate Kara-Darshanam ||',
    meaningHindi: 'हथेली के अग्रभाग में माँ लक्ष्मी, मध्य में माँ सरस्वती और मूल भाग में भगवान श्री गोविन्द का वास है। अतः प्रातः काल दोनों हथेलियों के दर्शन करने चाहिए।',
    meaningEnglish: 'At the tip of palm resides Goddess Lakshmi, in the middle Goddess Saraswati, and at the base Lord Govinda. Hence, contemplate your palms in the morning.',
    timingContextHi: 'प्रातः निद्रा त्यागते ही, शय्या पर बैठे हुए',
    timingContextEn: 'Immediately upon waking up, while sitting in bed',
  },
  {
    id: 'bhoomi_pranam',
    category: 'pratah_smaran',
    titleHi: 'समुद्रवसने देवि (भू-वन्दन व क्षमा प्रार्थना)',
    titleEn: 'Bhoomi Vandana (Reverence to Mother Earth)',
    source: 'विष्णु पुराण',
    devanagari: 'समुद्रवसने देवि पर्वतस्तनमण्डले।\nविष्णुपत्नि नमस्तुभ्यं पादस्पर्शं क्षमस्व मे॥',
    transliteration: 'Samudra-Vasane Devi Parvata-Stana-Mandale |\nVishnu-Patni Namas-Tubhyam Pada-Sparsham Kshamasva Me ||',
    meaningHindi: 'समुद्र रूपी वस्त्र धारण करने वाली, पर्वतों रूपी स्तनों से मण्डित, भगवान श्री विष्णु की पत्नी हे पृथ्वी देवी! मैं आपको नमन करता हूँ। मेरे पैरों के स्पर्श के लिए मुझे क्षमा करें।',
    meaningEnglish: 'O Mother Earth, clothed by the ocean and adorned with mountains, divine consort of Lord Vishnu! I bow to you; forgive me for stepping on you with my feet.',
    timingContextHi: 'बिस्तर से भूमि पर पैर रखने से पूर्व',
    timingContextEn: 'Before placing feet on the ground from bed',
  },
  {
    id: 'snana_mantra',
    category: 'snana',
    titleHi: 'गङ्गे च यमुने चैव (पवित्र स्नान मन्त्र)',
    titleEn: 'Snana Mantra (Invoking Sacred Rivers)',
    source: 'ब्रह्म पुराण',
    devanagari: 'गङ्गे च यमुने चैव गोदावरि सरस्वति।\nनर्मदे सिन्धु कावेरि जलेऽस्मिन् संनिधिं कुरु॥',
    transliteration: 'Gange Cha Yamune Chaiva Godavari Sarasvati |\nNarmade Sindhu Kaveri Jale-Asmin Sannidhim Kuru ||',
    meaningHindi: 'हे पवित्र नदियों—गंगा, यमुना, गोदावरी, सरस्वती, नर्मदा, सिन्धु और कावेरी! आप सभी कृपा करके इस जल में उपस्थित होकर इसे तीर्थ जल बना दीजिए।',
    meaningEnglish: 'O sacred waters of Ganga, Yamuna, Godavari, Saraswati, Narmada, Sindhu, and Kaveri! Please sanctify this water with your divine presence.',
    timingContextHi: 'प्रातः दैनिक स्नान के समय',
    timingContextEn: 'While bathing in the morning',
  },
  {
    id: 'bhojana_mantra',
    category: 'bhojana',
    titleHi: 'ब्रह्मार्पणं ब्रह्म हविः (भोजन मन्त्र)',
    titleEn: 'Brahmarpanam (Sanctifying Food before Eating)',
    source: 'श्रीमद्भगवद्गीता (४.२४)',
    devanagari: 'ब्रह्मार्पणं ब्रह्म हविर्ब्रह्माग्नौ ब्रह्मणा हुतम्।\nब्रह्मैव तेन गन्तव्यं ब्रह्मकर्मसमाधिना॥',
    transliteration: 'Brahmarpanam Brahma Havir-Brahmagnau Brahmana Hutam |\nBrahmaiva Tena Gantavyam Brahma-Karma-Samadhina ||',
    meaningHindi: 'भोजन अर्पण ब्रह्म है, हविष्य (अन्न) ब्रह्म है, ब्रह्म रूप अग्नि में ब्रह्म द्वारा ही आहुति दी जा रही है। जो सबमें ब्रह्म का दर्शन करता है, वह ब्रह्म को ही प्राप्त होता है।',
    meaningEnglish: 'The act of offering is Brahman, the oblation is Brahman, poured by Brahman into the fire of Brahman. Brahman shall be reached by him who is absorbed in Brahman.',
    timingContextHi: 'भोजन ग्रहण करने से ठीक पूर्व',
    timingContextEn: 'Just before honoring meals',
  },
  {
    id: 'shayana_mantra',
    category: 'shayana',
    titleHi: 'करचरण कृतं वा (रात्रि शयन क्षमा प्रार्थना)',
    titleEn: 'Kshama Prarthana (Night Forgiveness before Sleep)',
    source: 'शिव अपराधापराध क्षमापन स्तोत्र',
    devanagari: 'करचरणकृतं वाक्कायजं कर्मजं वा।\nश्रवणनयनजं वा मानसं वापराधम्।\nविहितमविहितं वा सर्वमेतत्क्षमस्व।\nजय जय करुणाब्धे श्रीमहादेव शम्भो॥',
    transliteration: 'Kara-Charana-Kritam Vak-Kayajam Karmajam Va |\nShravana-Nayanajam Va Manasam Vaparadham |\nVihitam-Avihitam Va Sarvam-Etat-Kshamasva |\nJaya Jaya Karunabdhe Shri-Mahadeva Shambho ||',
    meaningHindi: 'हाथों, पैरों, वाणी, शरीर, कर्मों, कानों, आँखों अथवा मन से जाने-अनजाने जो भी अपराध या अनुचित आचरण हुआ हो, हे दयासागर देवाधिदेव महादेव! उन सबको क्षमा करें। आपकी सदा जय हो।',
    meaningEnglish: 'Whatever transgressions I may have committed with hands, feet, speech, body, ears, eyes, or mind, intentionally or unintentionally—forgive all of them, O ocean of mercy, Mahadeva!',
    timingContextHi: 'रात्रि में शयन से पूर्व',
    timingContextEn: 'Before resting at night',
  },
];

/**
 * Generates dynamic Vedic Sankalpa based on Panchang calculations.
 */
export function generateDailySankalpa(
  panchang: PanchangData,
  cityName: string = 'उज्जैन',
  userName?: string,
  gotra?: string
): {
  sanskrit: string;
  hindi: string;
  english: string;
} {
  const samvat = panchang.samvat.vikramSamvat;
  const tithiName = panchang.tithi.current.nameDevanagari;
  const paksha = panchang.tithi.current.pakshaDevanagari;
  const masa = panchang.masa.purnimantaNameDevanagari;
  const vara = panchang.vara.nameDevanagari;
  const nakshatra = panchang.nakshatra.current.nameDevanagari;
  const ritu = panchang.samvat.rituDevanagari || 'शरद्/हेमन्त';
  const ayana = panchang.samvat.ayanaDevanagari || 'उत्तरायण';

  const cleanGotra = gotra ? gotra.replace(/\s*\(.*?\)/, '').trim() : '';
  const cleanName = userName ? userName.trim() : '';

  const personalSanskrit = `${cleanGotra ? cleanGotra + ' गोत्रोत्पन्नः ' : ''}${cleanName ? cleanName + ' नामधेयः ' : ''}`;
  const personalHindi = `${cleanGotra ? cleanGotra + ' गोत्र में उत्पन्न ' : ''}${cleanName ? cleanName + ' नाम ' : ''}`;
  const personalEnglish = `${cleanGotra ? 'of ' + cleanGotra + ' Gotra, ' : ''}${cleanName ? 'I, ' + cleanName + ', ' : 'I '}`;

  const sanskrit = `ॐ विष्णुर्विष्णुर्विष्णुः। श्रीमद्भगवतो महापुरुषस्य विष्णोराज्ञया प्रवर्तमानस्य अद्य श्रीब्रह्मणो द्वितीये परार्धे श्रीश्वेतवाराहकल्पे वैवस्वतमन्वन्तरै अष्टाविंशतितमे कलियुगे कलिप्रथमचरणे जम्बूद्वीपे भरतखण्डे भारतवर्षे ${cityName} क्षेत्रे, श्रीविक्रमादित्य संवत्सरे ${samvat}, श्रीसूर्य ${ayana}े, ${ritu} ऋतौ, ${masa} मासे, ${paksha} पक्षे, ${tithiName} तिथौ, ${vara} वासरे, ${nakshatra} नक्षत्रे, ${personalSanskrit}मम आत्मनः श्रुतिस्मृतिपुराणोक्त पुण्यफलप्राप्त्यर्थं, सकल पापक्षयपूर्वकं धर्मार्थकाममोक्ष चतुर्विध पुरुषार्थ सिद्ध्यर्थं, श्रीपरमेश्वर प्रीत्यर्थं प्रातः/दैनिक नित्यकर्म सङ्कल्पम् अहं करिष्ये।`;

  const hindi = `परमेश्वर श्रीविष्णु की आज्ञा से, श्वेतवाराह कल्प, वैवस्वत मन्वन्तर, कलियुग के प्रथम चरण में, भारतवर्ष के '${cityName}' पावन क्षेत्र में, विक्रम संवत् ${samvat}, ${ayana}, ${ritu} ऋतु, ${masa} मास, ${paksha} पक्ष, ${tithiName} तिथि, ${vara}वार तथा ${nakshatra} नक्षत्र में — ${personalHindi}मैं अपने समस्त पापों के क्षय तथा धर्म, अर्थ, काम, मोक्ष की सिद्धि एवं परमेश्वर की प्रसन्नता हेतु आज का दैनिक नित्यकर्म संकल्प करता हूँ।`;

  const english = `By the sanction of Supreme Being Sri Vishnu, in the Svetavaraha Kalpa, Vaivaswata Manvantara, 28th Kaliyuga, in Bharatavarsha at '${cityName}', during Vikram Samvat ${samvat}, ${panchang.samvat.ayana || 'Uttarayana'}, ${panchang.masa.purnimantaName} Masa, ${panchang.tithi.current.paksha} Paksha, ${panchang.tithi.current.name} Tithi, on ${panchang.vara.name} under ${panchang.nakshatra.current.name} Nakshatra — ${personalEnglish}undertake this sacred daily Nitya Karma for spiritual purity and cosmic harmony.`;

  return { sanskrit, hindi, english };
}

/**
 * Calculates current period of the day for dynamic spiritual context.
 */
export function getCurrentSpiritualPeriod(now: Date = new Date(), sunrise?: Date, sunset?: Date): {
  periodKey: 'brahma' | 'pratah' | 'madhyahna' | 'sayam' | 'ratri';
  greetingHi: string;
  greetingEn: string;
  focusTitleHi: string;
  focusTitleEn: string;
  suggestedActionHi: string;
  suggestedActionEn: string;
} {
  const currentHour = now.getHours();
  const currentMin = now.getMinutes();
  const timeInMins = currentHour * 60 + currentMin;

  const sunriseMins = sunrise ? sunrise.getHours() * 60 + sunrise.getMinutes() : 360;
  const sunsetMins = sunset ? sunset.getHours() * 60 + sunset.getMinutes() : 1080;

  const brahmaStart = Math.max(0, sunriseMins - 96);
  const brahmaEnd = Math.max(0, sunriseMins - 48);

  if (timeInMins >= brahmaStart && timeInMins < brahmaEnd) {
    return {
      periodKey: 'brahma',
      greetingHi: 'शुभ ब्रह्म मुहूर्त',
      greetingEn: 'Auspicious Brahma Muhurta',
      focusTitleHi: 'ब्रह्म मुहूर्त ध्यान व जागरण',
      focusTitleEn: 'Brahma Muhurta Meditation',
      suggestedActionHi: 'आत्म-चिंतन, प्राणायाम व कराग्रे वसते लक्ष्मीः कर दर्शन करें।',
      suggestedActionEn: 'Awaken, contemplate the Divine and view palms with Kara Darshanam.',
    };
  }

  if (timeInMins < 720) {
    return {
      periodKey: 'pratah',
      greetingHi: 'शुभ प्रभात',
      greetingEn: 'Good Morning',
      focusTitleHi: 'प्रातः संध्या व सूर्य अर्घ्य',
      focusTitleEn: 'Surya Arghya & Pratah Sadhana',
      suggestedActionHi: 'ताम्बे के लोटे से सूर्य देव को अर्घ्य दें और १०८ बार गायत्री जप करें।',
      suggestedActionEn: 'Offer Arghya to Surya Dev and chant Gayatri Mantra.',
    };
  }

  if (timeInMins < 960) {
    return {
      periodKey: 'madhyahna',
      greetingHi: 'शुभ मध्याह्न',
      greetingEn: 'Good Afternoon',
      focusTitleHi: 'अभिजित मुहूर्त व सात्विक कर्म',
      focusTitleEn: 'Abhijit Muhurta & Righteous Duty',
      suggestedActionHi: 'अन्नपूर्णा श्लोक स्मरण कर भोजन ग्रहण करें व शुभ कार्य आरम्भ करें।',
      suggestedActionEn: 'Honor Annapurna before meals and execute vital tasks in Abhijit.',
    };
  }

  if (timeInMins <= sunsetMins + 90) {
    return {
      periodKey: 'sayam',
      greetingHi: 'शुभ सांध्य वेला',
      greetingEn: 'Auspicious Twilight',
      focusTitleHi: 'संध्या दीप प्रज्वलन व चालीसा',
      focusTitleEn: 'Evening Lamp & Chalisa',
      suggestedActionHi: 'तुलसी व मन्दिर में दीप जलाएं तथा हनुमान चालीसा का पाठ करें।',
      suggestedActionEn: 'Light lamp at Tulsi/Altar and chant Hanuman Chalisa.',
    };
  }

  return {
    periodKey: 'ratri',
    greetingHi: 'शुभ रात्रि',
    greetingEn: 'Peaceful Night',
    focusTitleHi: 'रात्रि स्मरण व आत्म-समर्पण',
    focusTitleEn: 'Night Contemplation & Rest',
    suggestedActionHi: 'दिनभर के कर्म भगवान को अर्पित कर क्षमा मन्त्र (करचरण कृतं...) जपें।',
    suggestedActionEn: 'Offer the day to the Divine and chant the forgiveness shloka before rest.',
  };
}
