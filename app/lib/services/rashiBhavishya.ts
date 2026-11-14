export interface RashiMeta {
  index: number;
  nameHi: string;
  nameEn: string;
  symbol: string;
  lordHi: string;
  lordEn: string;
  elementHi: string;
  elementEn: string;
  luckyColorHi: string;
  luckyColorEn: string;
  colorHex: string;
  luckyNumber: number;
  ishtadevHi: string;
  ishtadevEn: string;
  seedMantra: string;
}

export const ALL_RASHIS: RashiMeta[] = [
  {
    index: 0,
    nameHi: 'मेष',
    nameEn: 'Aries',
    symbol: '♈',
    lordHi: 'मङ्गल देव',
    lordEn: 'Mars',
    elementHi: 'अग्नि तत्व',
    elementEn: 'Fire',
    luckyColorHi: 'लाल व सिन्दूरी',
    luckyColorEn: 'Crimson Red',
    colorHex: '#dc2626',
    luckyNumber: 9,
    ishtadevHi: 'श्री हनुमान जी एवं कार्तिकेय',
    ishtadevEn: 'Lord Hanuman & Kartikeya',
    seedMantra: 'ॐ अं अङ्गारकाय नमः',
  },
  {
    index: 1,
    nameHi: 'वृषभ',
    nameEn: 'Taurus',
    symbol: '♉',
    lordHi: 'शुक्र देव',
    lordEn: 'Venus',
    elementHi: 'पृथ्वी तत्व',
    elementEn: 'Earth',
    luckyColorHi: 'श्वेत व चमकीला धवल',
    luckyColorEn: 'Milky White',
    colorHex: '#0284c7',
    luckyNumber: 6,
    ishtadevHi: 'माता महालक्ष्मी',
    ishtadevEn: 'Goddess Mahalakshmi',
    seedMantra: 'ॐ शुं शुक्राय नमः',
  },
  {
    index: 2,
    nameHi: 'मिथुन',
    nameEn: 'Gemini',
    symbol: '♊',
    lordHi: 'बुध देव',
    lordEn: 'Mercury',
    elementHi: 'वायु तत्व',
    elementEn: 'Air',
    luckyColorHi: 'हरा व धानी',
    luckyColorEn: 'Emerald Green',
    colorHex: '#059669',
    luckyNumber: 5,
    ishtadevHi: 'भगवान श्री गणेश',
    ishtadevEn: 'Lord Sri Ganesha',
    seedMantra: 'ॐ बुं बुधाय नमः',
  },
  {
    index: 3,
    nameHi: 'कर्क',
    nameEn: 'Cancer',
    symbol: '♋',
    lordHi: 'चन्द्र देव',
    lordEn: 'Moon',
    elementHi: 'जल तत्व',
    elementEn: 'Water',
    luckyColorHi: 'मोती जैसा श्वेत व चांदी',
    luckyColorEn: 'Pearl White & Silver',
    colorHex: '#475569',
    luckyNumber: 2,
    ishtadevHi: 'भगवान सदाशिव (भोलेनाथ)',
    ishtadevEn: 'Lord Sadashiva',
    seedMantra: 'ॐ सों सोमाय नमः',
  },
  {
    index: 4,
    nameHi: 'सिंह',
    nameEn: 'Leo',
    symbol: '♌',
    lordHi: 'सूर्य देव',
    lordEn: 'Sun',
    elementHi: 'अग्नि तत्व',
    elementEn: 'Fire',
    luckyColorHi: 'स्वर्ण पीला व गहरा नारंगी',
    luckyColorEn: 'Golden Yellow & Orange',
    colorHex: '#ea580c',
    luckyNumber: 1,
    ishtadevHi: 'भगवान सूर्यनारायण व गायत्री',
    ishtadevEn: 'Lord Suryanarayana & Gayatri',
    seedMantra: 'ॐ घृणिः सूर्याय नमः',
  },
  {
    index: 5,
    nameHi: 'कन्या',
    nameEn: 'Virgo',
    symbol: '♍',
    lordHi: 'बुध देव',
    lordEn: 'Mercury',
    elementHi: 'पृथ्वी तत्व',
    elementEn: 'Earth',
    luckyColorHi: 'गहरा हरा व तोतिया',
    luckyColorEn: 'Forest Green',
    colorHex: '#16a34a',
    luckyNumber: 5,
    ishtadevHi: 'भगवान श्री हरि विष्णु',
    ishtadevEn: 'Lord Sri Hari Vishnu',
    seedMantra: 'ॐ नमो भगवते वासुदेवाय',
  },
  {
    index: 6,
    nameHi: 'तुला',
    nameEn: 'Libra',
    symbol: '♎',
    lordHi: 'शुक्र देव',
    lordEn: 'Venus',
    elementHi: 'वायु तत्व',
    elementEn: 'Air',
    luckyColorHi: 'गुलाबी व आसमानी नीला',
    luckyColorEn: 'Pastel Pink & Sky Blue',
    colorHex: '#d946ef',
    luckyNumber: 6,
    ishtadevHi: 'माता दुर्गा व जगदम्बा',
    ishtadevEn: 'Mother Durga',
    seedMantra: 'ॐ दुं दुर्गायै नमः',
  },
  {
    index: 7,
    nameHi: 'वृश्चिक',
    nameEn: 'Scorpio',
    symbol: '♏',
    lordHi: 'मङ्गल देव',
    lordEn: 'Mars',
    elementHi: 'जल तत्व',
    elementEn: 'Water',
    luckyColorHi: 'गहरा लाल व केसरिया',
    luckyColorEn: 'Deep Crimson & Saffron',
    colorHex: '#b91c1c',
    luckyNumber: 9,
    ishtadevHi: 'संकटमोचन श्री हनुमान',
    ishtadevEn: 'Lord Hanuman',
    seedMantra: 'ॐ हं हनुमते नमः',
  },
  {
    index: 8,
    nameHi: 'धनु',
    nameEn: 'Sagittarius',
    symbol: '♐',
    lordHi: 'बृहस्पति (गुरु)',
    lordEn: 'Jupiter',
    elementHi: 'अग्नि तत्व',
    elementEn: 'Fire',
    luckyColorHi: 'पीताम्बरी पीला',
    luckyColorEn: 'Bright Yellow',
    colorHex: '#ca8a04',
    luckyNumber: 3,
    ishtadevHi: 'भगवान दत्तात्रेय व श्री हरि',
    ishtadevEn: 'Lord Dattatreya & Vishnu',
    seedMantra: 'ॐ बृं बृहस्पतये नमः',
  },
  {
    index: 9,
    nameHi: 'मकर',
    nameEn: 'Capricorn',
    symbol: '♑',
    lordHi: 'शनि देव',
    lordEn: 'Saturn',
    elementHi: 'पृथ्वी तत्व',
    elementEn: 'Earth',
    luckyColorHi: 'नीला व गहरा जामुनी',
    luckyColorEn: 'Navy Blue & Charcoal',
    colorHex: '#1e3a8a',
    luckyNumber: 8,
    ishtadevHi: 'भगवान शनिदेव व भैरव',
    ishtadevEn: 'Lord Shani & Bhairava',
    seedMantra: 'ॐ शं शनैश्चराय नमः',
  },
  {
    index: 10,
    nameHi: 'कुम्भ',
    nameEn: 'Aquarius',
    symbol: '♒',
    lordHi: 'शनि देव',
    lordEn: 'Saturn',
    elementHi: 'वायु तत्व',
    elementEn: 'Air',
    luckyColorHi: 'आसमानी व गहरा नीला',
    luckyColorEn: 'Royal Blue & Cyan',
    colorHex: '#2563eb',
    luckyNumber: 8,
    ishtadevHi: 'भगवान महादेव शिव',
    ishtadevEn: 'Lord Mahadeva Shiva',
    seedMantra: 'ॐ नमः शिवाय',
  },
  {
    index: 11,
    nameHi: 'मीन',
    nameEn: 'Pisces',
    symbol: '♓',
    lordHi: 'बृहस्पति (गुरु)',
    lordEn: 'Jupiter',
    elementHi: 'जल तत्व',
    elementEn: 'Water',
    luckyColorHi: 'स्वर्णिम पीला व केसरिया',
    luckyColorEn: 'Golden Saffron',
    colorHex: '#d97706',
    luckyNumber: 3,
    ishtadevHi: 'भगवान श्री नारायण व राम जी',
    ishtadevEn: 'Lord Narayana & Sri Rama',
    seedMantra: 'ॐ नमो नारायणाय',
  },
];

export interface DailyRashiOutlook {
  rashi: RashiMeta;
  transitHouse: number; // 1 to 12
  houseTitleHi: string;
  houseTitleEn: string;
  guidanceHi: string;
  guidanceEn: string;
  energyLevelHi: string;
  energyLevelEn: string;
  satvikActionHi: string;
  satvikActionEn: string;
  luckyColorHi: string;
  luckyColorEn: string;
  luckyNumber: number;
}

const HOUSE_TRANSIT_DATA: Record<
  number,
  {
    titleHi: string;
    titleEn: string;
    energyHi: string;
    energyEn: string;
    guidanceHi: string;
    guidanceEn: string;
  }
> = {
  1: {
    titleHi: 'चन्द्र आपकी ही राशि में (आत्म-उत्साह व शान्ति)',
    titleEn: 'Moon in 1st House (Mental Vitality & Peace)',
    energyHi: '🌟 अति शुभ (95%)',
    energyEn: '🌟 Supreme (95%)',
    guidanceHi: 'मानसिक प्रसन्नता, शारीरिक स्फूर्ति व आत्मविश्वास में वृद्धि होगी। आपके व्यक्तित्व का प्रभाव दूसरों पर स्पष्ट दिखेगा। नवीन योजनाओं व सङ्कल्पों के आरम्भ हेतु उत्तम दिवस है।',
    guidanceEn: 'Heightened enthusiasm, self-confidence, and vitality. Your presence radiates warmth and inspiration. Ideal for setting new intentions and spiritual resolves.',
  },
  2: {
    titleHi: 'द्वितीय भाव में चन्द्र (धन वृद्धि व मधुर वाणी)',
    titleEn: 'Moon in 2nd House (Prosperity & Sweet Speech)',
    energyHi: '✨ शुभ (85%)',
    energyEn: '✨ Auspicious (85%)',
    guidanceHi: 'वाणी में मधुरता रहेगी जिससे पारिवारिक व सामाजिक सम्बन्ध प्रगाढ़ होंगे। वित्तीय नियोजन व धन संचय के प्रयास सफल होंगे। घर में स्वादिष्ट भोजन व आनन्द का वातावरण रहेगा।',
    guidanceEn: 'Graceful communication strengthens family ties. Favorable for financial planning and wealth preservation. Domestic harmony and joyous meals.',
  },
  3: {
    titleHi: 'तृतीय भाव में चन्द्र (पराक्रम व कार्य सिद्धि)',
    titleEn: 'Moon in 3rd House (Courage & Enterprise)',
    energyHi: '🚀 तेजस्वी (90%)',
    energyEn: '🚀 Dynamic (90%)',
    guidanceHi: 'साहस, पराक्रम व उद्यमशीलता में वृद्धि होगी। छोटे भाई-बहनों व मित्रों से पूर्ण सहयोग मिलेगा। लघु यात्राएं व संवाद के माध्यम से अटके कार्य गति पकड़ेंगे।',
    guidanceEn: 'Courage, initiative, and proactive energy prevail. Great support from siblings and close friends. Short travels and negotiations yield triumph.',
  },
  4: {
    titleHi: 'चतुर्थ भाव में चन्द्र (घरेलू सुख व आत्म-चिंतन)',
    titleEn: 'Moon in 4th House (Domestic Serenity & Heart Peace)',
    energyHi: '🕊️ मध्यम-शान्त (75%)',
    energyEn: '🕊️ Serene (75%)',
    guidanceHi: 'माता का स्नेह व आशीर्वाद प्राप्त होगा। गृह व वाहन सम्बन्धी कार्यों में मन लगेगा। कार्यक्षेत्र में अधिक भागदौड़ से बचें, घरेलू शान्ति व आत्म-चिंतन को प्राथमिकता दें।',
    guidanceEn: 'Cherish maternal blessings and home comforts. Focus on emotional groundedness. Prioritize peace of heart over aggressive material pursuits today.',
  },
  5: {
    titleHi: 'पञ्चम भाव में चन्द्र (बुद्धि, मन्त्र सिद्धि व ज्ञान)',
    titleEn: 'Moon in 5th House (Intellect, Devotion & Creativity)',
    energyHi: '🌸 दिव्य (90%)',
    energyEn: '🌸 Divine (90%)',
    guidanceHi: 'प्रज्ञा व विवेक जागृत रहेगा। मन्त्र जप, गीता स्वाध्याय व रचनात्मक कार्यों में मन रमेगा। संतान सम्बन्धी शुभ समाचार मिल सकते हैं। विद्यार्थियों व शोधार्थियों हेतु श्रेष्ठ काल।',
    guidanceEn: 'Awakened spiritual intellect and discernment. Supreme for mantra japa, study of sacred texts, and creative expressions. Joy through children and learning.',
  },
  6: {
    titleHi: 'षष्ठ भाव में चन्द्र (शत्रु-बाधा विजय व स्वास्थ्य)',
    titleEn: 'Moon in 6th House (Overcoming Obstacles & Good Health)',
    energyHi: '🛡️ विजयी (85%)',
    energyEn: '🛡️ Victorious (85%)',
    guidanceHi: 'कठिन चुनौतियों व विरोधियों पर आपका वर्चस्व रहेगा। कर्मक्षेत्र में अथक परिश्रम का सुखद प्रतिफल मिलेगा। स्वास्थ्य में सुधार होगा व पुराने कर्जों से मुक्ति का मार्ग बनेगा।',
    guidanceEn: 'Supreme resilience against daily hurdles and opponents. Disciplined effort yields fruitful outcomes in your vocation. Health and vitality bounce back.',
  },
  7: {
    titleHi: 'सप्तम भाव में चन्द्र (साझेदारी व दांपत्य सुख)',
    titleEn: 'Moon in 7th House (Partnership & Marital Harmony)',
    energyHi: '✨ शुभ (85%)',
    energyEn: '✨ Harmonious (85%)',
    guidanceHi: 'जीवनसाथी के साथ सामंजस्य व प्रेम में प्रगाढ़ता आएगी। व्यावसायिक साझेदारी व अनुबंधों में सकारात्मक प्रगति होगी। सामाजिक प्रतिष्ठा व जनसम्पर्क का विस्तार होगा।',
    guidanceEn: 'Deepened marital harmony and partnership warmth. Fruitful discussions in business collaborations. Social goodwill and mutual trust flourish.',
  },
  8: {
    titleHi: 'अष्टम भाव में चन्द्र (साधना, शोध व वाणी संयम)',
    titleEn: 'Moon in 8th House (Introspection & Caution)',
    energyHi: '⚠️ सावधानी व साधना (60%)',
    energyEn: '⚠️ Contemplative (60%)',
    guidanceHi: 'गूढ़ अध्यात्म, ध्यान व प्राणायाम हेतु यह काल अति अनुकूल है। परन्तु सांसारिक कार्यों में उतावलेपन व विवाद से बचें। वाहन सावधानी से चलाएं व वाणी पर पूर्ण संयम रखें।',
    guidanceEn: 'Supreme for esoteric contemplation, silent meditation, and prayers. Exercise calm caution in worldly disputes and financial risk. Drive mindfully.',
  },
  9: {
    titleHi: 'नवम भाव में चन्द्र (भाग्य वृद्धि व धर्म-कर्म)',
    titleEn: 'Moon in 9th House (Fortunate Dharma & Blessings)',
    energyHi: '🌟 परम शुभ (95%)',
    energyEn: '🌟 Most Fortunate (95%)',
    guidanceHi: 'भाग्य का पूर्ण सहयोग प्राप्त होगा। मन्दिर दर्शन, तीर्थ व सत्सङ्ग में रुचि बढ़ेगी। पिता व गुरुजनों का आशीर्वाद मिलेगा। धार्मिक सङ्कल्पों की पूर्ति का सर्वोत्तम दिन।',
    guidanceEn: 'Cosmic fortune smiles upon righteous endeavors. Drawn towards temple visits, pilgrimages, and satsang. Guru and parental blessings guide your steps.',
  },
  10: {
    titleHi: 'दशम भाव में चन्द्र (कर्म सिद्धि व सम्मान)',
    titleEn: 'Moon in 10th House (Career Triumph & Honor)',
    energyHi: '👑 प्रतिष्ठा वर्धक (95%)',
    energyEn: '👑 High Honor (95%)',
    guidanceHi: 'कार्यक्षेत्र में आपकी प्रतिष्ठा व प्रभाव बढ़ेगा। वरिष्ठ अधिकारियों व समाज में आपके योगदान की सराहना होगी। महत्वपूर्ण व्यावसायिक दायित्वों को पूर्ण करने का सुयोग है।',
    guidanceEn: 'Leadership, vocational recognition, and fulfillment of duties. Superiors and peers appreciate your integrity. High accomplishments in righteous action.',
  },
  11: {
    titleHi: 'एकादश भाव में चन्द्र (सर्वतोमुखी लाभ व सिद्धि)',
    titleEn: 'Moon in 11th House (Abundance & Wish Fulfillment)',
    energyHi: '💰 सर्वतोमुखी लाभ (98%)',
    energyEn: '💰 Abundant Gains (98%)',
    guidanceHi: 'धन, समृद्धि व दीर्घकालिक मनोकामनाओं की पूर्ति होगी। मित्रों व शुभचिंतकों का अप्रत्याशित सहयोग मिलेगा। रुके हुए कार्यों में अचानक गति आएगी। हर्ष व उल्लास का दिवस।',
    guidanceEn: 'Fulfillment of aspirations, multi-fold gains, and prosperity. Unexpected support from well-wishers and elder allies. Joyous celebration of success.',
  },
  12: {
    titleHi: 'द्वादश भाव में चन्द्र (शुभ व्यय, दान व वैराग्य)',
    titleEn: 'Moon in 12th House (Spiritual Peace & Charity)',
    energyHi: '🕊️ शान्ति व सेवा (70%)',
    energyEn: '🕊️ Serene Giving (70%)',
    guidanceHi: 'दान-पुण्य, गौसेवा व मन्दिर सेवा में धन व समय का सदुपयोग होगा। रात्रि में गम्भीर ध्यान व विश्राम से मानसिक शान्ति मिलेगी। व्यर्थ के वाद-विवाद व दिखावे से दूर रहें।',
    guidanceEn: 'Ideal for charitable offerings, cow service (Gau Seva), and quiet reflection. Deep peaceful rest and meditation. Avoid ostentatious spending.',
  },
};

const WEEKDAY_UPAYS: Record<
  number,
  {
    actionHi: string;
    actionEn: string;
  }
> = {
  0: {
    actionHi: 'तांबे के पात्र से भगवान सूर्य को जल व लाल रोली अर्पित करें, "ॐ सूर्याय नमः" का जप करें।',
    actionEn: 'Offer water with red kumkum to Lord Surya from a copper vessel while chanting the Surya Gayatri.',
  },
  1: {
    actionHi: 'शिवलिंग पर कच्चा दूध व जल चढ़ाएं, "ॐ नमः शिवाय" का 11 बार जप करें।',
    actionEn: 'Offer clean water and raw milk to Shiva Lingam; chant "Om Namah Shivaya" 11 times.',
  },
  2: {
    actionHi: 'श्री हनुमान चालीसा का पाठ करें, सिन्दूर का तिलक लगाएं व बन्दरों या गौ को गुड़-चना खिलाएं।',
    actionEn: 'Recite Sri Hanuman Chalisa, apply saffron tilak, and feed jaggery-gram to cows or birds.',
  },
  3: {
    actionHi: 'भगवान श्री गणेश को 21 दूर्वा दल अर्पित करें व हरी मूंग का दान करें।',
    actionEn: 'Offer 21 blades of sacred Durva grass to Lord Ganesha and feed green fodder to cows.',
  },
  4: {
    actionHi: 'भगवान श्री हरि विष्णु को पीले पुष्प अर्पित करें व मस्तक पर चन्दन का तिलक लगाएं।',
    actionEn: 'Offer yellow flowers to Lord Vishnu, apply sandalwood tilak, and honor your Guru.',
  },
  5: {
    actionHi: 'माता महालक्ष्मी के सम्मुख घी का दीप प्रज्वलित करें व "श्री सूक्तम्" का पाठ करें।',
    actionEn: 'Light a pure ghee deepam before Mother Mahalakshmi and recite Sri Suktam.',
  },
  6: {
    actionHi: 'पीपल वृक्ष अथवा मन्दिर में सरसों के तेल का दीपक जलाएं, पक्षियों को दाना डालें।',
    actionEn: 'Light a sesame/mustard oil lamp near a sacred Peepal tree or temple, and feed birds.',
  },
};

/**
 * Calculates authentic Vedic Gochara guidance for a given Janma Rashi,
 * factoring in current Moon sign and planetary weekday lord.
 */
export function getDailyRashiOutlook(
  rashiIndex: number,
  moonRashiIndex: number,
  date: Date = new Date()
): DailyRashiOutlook {
  const normRashiIdx = Math.max(0, Math.min(11, rashiIndex));
  const normMoonIdx = Math.max(0, Math.min(11, moonRashiIndex));
  const rashi = ALL_RASHIS[normRashiIdx];

  // Classical Vedic House calculation: 1 to 12
  const transitHouse = ((normMoonIdx - normRashiIdx + 12) % 12) + 1;
  const houseData = HOUSE_TRANSIT_DATA[transitHouse] || HOUSE_TRANSIT_DATA[1];
  const dayLordUpay = WEEKDAY_UPAYS[date.getDay()] || WEEKDAY_UPAYS[0];

  return {
    rashi,
    transitHouse,
    houseTitleHi: houseData.titleHi,
    houseTitleEn: houseData.titleEn,
    guidanceHi: houseData.guidanceHi,
    guidanceEn: houseData.guidanceEn,
    energyLevelHi: houseData.energyHi,
    energyLevelEn: houseData.energyEn,
    satvikActionHi: dayLordUpay.actionHi,
    satvikActionEn: dayLordUpay.actionEn,
    luckyColorHi: rashi.luckyColorHi,
    luckyColorEn: rashi.luckyColorEn,
    luckyNumber: rashi.luckyNumber,
  };
}
