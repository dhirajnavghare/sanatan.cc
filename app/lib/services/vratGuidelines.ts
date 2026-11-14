import { PanchangData } from '../panchang/types';
import { calculateEkadashiParana, VratParanaDetails } from './vratParana';

export interface VratGuidance {
  vratId: 'sankashti' | 'vinayaka' | 'ekadashi' | 'pradosh' | 'purnima' | 'amavasya' | 'festival';
  titleHi: string;
  titleEn: string;
  badgeHi: string;
  badgeEn: string;
  deityHi: string;
  deityEn: string;
  significanceHi: string;
  significanceEn: string;
  moonriseTime?: string | null;
  moonriseCountdown?: string | null;
  hasMoonRisen?: boolean;
  arghyaMantraSanskrit?: string;
  arghyaMantraMeaningHi?: string;
  arghyaMantraMeaningEn?: string;
  arghyaVidhiHi?: string[];
  arghyaVidhiEn?: string[];
  permissibleFoodsHi: string[];
  permissibleFoodsEn: string[];
  prohibitedFoodsHi: string[];
  prohibitedFoodsEn: string[];
  fastingRulesHi: string[];
  fastingRulesEn: string[];
  ekadashiParana?: VratParanaDetails | null;
}

export function getTodayVratGuidance(
  panchang: PanchangData,
  date: Date = new Date(),
  timezone: string = 'Asia/Kolkata'
): VratGuidance | null {
  const tithi = panchang.tithi.current;
  const pakshaIdx = tithi.pakshaIndex; // 1..15
  const isKrishna = tithi.paksha === 'Krishna';
  const dayOfWeek = date.getDay(); // 0 = Sun, 2 = Tue

  const formatTime = (d: Date | string | null): string => {
    if (!d) return '—';
    const dateObj = typeof d === 'string' ? new Date(d) : d;
    try {
      return new Intl.DateTimeFormat('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: timezone,
      }).format(dateObj);
    } catch {
      return dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };

  // 1. Sankashti Chaturthi (Krishna Paksha Chaturthi)
  if (pakshaIdx === 4 && isKrishna) {
    const isAngarki = dayOfWeek === 2;
    const moonriseDate = panchang.moonTimes?.moonrise ? new Date(panchang.moonTimes.moonrise) : null;
    let countdownText: string | null = null;
    let hasRisen = false;

    if (moonriseDate) {
      const nowMs = date.getTime();
      const diffMs = moonriseDate.getTime() - nowMs;
      if (diffMs > 0) {
        const hrs = Math.floor(diffMs / (1000 * 60 * 60));
        const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        countdownText = hrs > 0 ? `${hrs}h ${mins}m बाद` : `${mins} मिनट बाद`;
      } else {
        hasRisen = true;
      }
    }

    return {
      vratId: 'sankashti',
      titleHi: isAngarki ? 'अंगारकी संकष्टी चतुर्थी (महाफलदायी)' : 'संकष्टी श्री गणेश चतुर्थी व्रत',
      titleEn: isAngarki ? 'Angarki Sankashti Chaturthi' : 'Sankashti Ganesh Chaturthi Vrat',
      badgeHi: isAngarki ? '🔴 अंगारकी योग' : '🐘 संकष्टी व्रत',
      badgeEn: isAngarki ? '🔴 Angarki Yoga' : '🐘 Sankashti Fast',
      deityHi: 'भगवान श्री गणेश एवं चन्द्रमा',
      deityEn: 'Lord Ganesha & Chandra Dev',
      significanceHi:
        'समस्त विघ्नों व संकटों का नाश। रात्रि में चन्द्र दर्शन व अर्घ्य उपरान्त ही व्रत पूर्ण माना जाता है।',
      significanceEn:
        'Remover of all obstacles and debts. Fast completes strictly after evening moonrise sight & Arghya.',
      moonriseTime: moonriseDate ? formatTime(moonriseDate) : null,
      moonriseCountdown: countdownText,
      hasMoonRisen: hasRisen,
      arghyaMantraSanskrit:
        'गगनार्णवमाणिक्य चन्द्र दाक्षायणीपते। गृहाणार्घ्यं मया दत्तं गणेशप्रीतिवर्धनम्॥',
      arghyaMantraMeaningHi:
        'आकाश रूपी समुद्र के मणिरूप, दक्ष कन्या रोहिणी के स्वामी हे चन्द्रदेव! श्री गणेश की प्रीति बढ़ाने वाला यह अर्घ्य स्वीकार करें।',
      arghyaMantraMeaningEn:
        'O Chandra Dev, jewel of the celestial ocean, beloved of Rohini! Please accept this Arghya pleasing to Lord Ganesha.',
      arghyaVidhiHi: [
        'चांदी अथवा तांबे के पात्र में जल, दूध, दूर्वा, कुमकुम व अक्षत लें।',
        'चन्द्रमा को देखकर अर्घ्य समर्पित करें एवं ३ बार प्रदक्षिणा करें।',
        'गणेश स्तोत्र का पाठ कर मोदक व सात्विक फलाहार से पारण करें।',
      ],
      arghyaVidhiEn: [
        'Fill silver/copper pot with water, milk, durva grass, kumkum & rice.',
        'Offer Arghya directly viewing Chandra Dev and circumambulate thrice.',
        'Recite Sankata Nashak Stotram and break fast with prasad.',
      ],
      permissibleFoodsHi: ['साबूदाना खिचड़ी', 'सिंघाड़े का आटा', 'दूध, दही, फल', 'सेंधा नमक', 'मूंगफली'],
      permissibleFoodsEn: ['Sabudana', 'Water chestnut flour', 'Milk, Curd, Fruits', 'Rock salt', 'Peanuts'],
      prohibitedFoodsHi: ['अन्न (गेहूं, चावल)', 'दालें व नमक (साधारण)', 'लहसुन-प्याज', 'मांसाहार व मदिरा'],
      prohibitedFoodsEn: ['Grains (Wheat, Rice)', 'Pulses', 'Garlic & Onion', 'Common Table Salt'],
      fastingRulesHi: [
        'सूर्योदय से चंद्रोदय तक निराहार अथवा केवल जलाहार/फलाहार रखें।',
        'सायंकाल गणेश अथर्वशीर्ष अथवा संकट नाशन स्तोत्र का पाठ करें।',
        'चन्द्रोदय के पश्चात अर्घ्य देकर ही भोजन ग्रहण करें।',
      ],
      fastingRulesEn: [
        'Maintain fasting from sunrise until moonrise Arghya.',
        'Chant Ganesha Atharvashirsha or 108 Ganesha Namavali.',
        'Consume satvik meal only after offering moon Arghya.',
      ],
    };
  }

  // 2. Vinayaka Chaturthi (Shukla Paksha Chaturthi)
  if (pakshaIdx === 4 && !isKrishna) {
    return {
      vratId: 'vinayaka',
      titleHi: 'विनायक चतुर्थी (मध्याह्न गणेश पूजन)',
      titleEn: 'Vinayaka Chaturthi Fast',
      badgeHi: '✨ विनायक व्रत',
      badgeEn: '✨ Vinayaka Vrat',
      deityHi: 'प्रथम पूज्य श्री गणेश',
      deityEn: 'Lord Sri Ganesha',
      significanceHi: 'बुद्धि, विवेक एवं कार्य सिद्धि। विनायक चतुर्थी का मुख्य पूजन मध्याह्न काल में किया जाता है।',
      significanceEn: 'Bestows intellect, focus and triumph in undertakings. Midday puja is essential.',
      permissibleFoodsHi: ['फल, दूध, मखाना', 'कुट्टू/सिंघाड़ा फलाहार', 'सेंधा नमक'],
      permissibleFoodsEn: ['Fruits, Milk, Foxnuts', 'Buckwheat / Chestnut flour', 'Rock salt'],
      prohibitedFoodsHi: ['अन्न व दालें', 'तामसिक भोजन', 'लहसुन, प्याज'],
      prohibitedFoodsEn: ['Grains, Pulses', 'Non-veg, Alcohol', 'Garlic, Onion'],
      fastingRulesHi: [
        'मध्याह्न काल (११:३० से ०१:३०) में भगवान गणेश की षोडशोपचार पूजा करें।',
        '२१ मोदक अथवा दूर्वा दल अर्पित करें।',
      ],
      fastingRulesEn: [
        'Conduct Lord Ganeshas puja during auspicious midday hours.',
        'Offer 21 Durva blades and modaks.',
      ],
    };
  }

  // 3. Ekadashi (11th Tithi)
  if (pakshaIdx === 11) {
    const paranaDetails = calculateEkadashiParana(panchang, {
      name: 'User Location',
      latitude: 0,
      longitude: 0,
      altitude: 0,
      timezone,
    }, date);

    return {
      vratId: 'ekadashi',
      titleHi: `${panchang.masa.purnimantaNameDevanagari} ${tithi.pakshaDevanagari} एकादशी व्रत`,
      titleEn: `${panchang.masa.purnimantaName} ${tithi.paksha} Ekadashi Vrat`,
      badgeHi: '🌸 परम पावन एकादशी',
      badgeEn: '🌸 Supreme Ekadashi',
      deityHi: 'भगवान श्री हरि विष्णु',
      deityEn: 'Lord Sri Hari Vishnu',
      significanceHi:
        'समस्त व्रतों का राजा। पद्म पुराण अनुसार एकादशी को अन्न में पाप का वास होता है, अतः पूर्ण अन्न त्याग परम आवश्यक है।',
      significanceEn:
        'The sovereign among all fasts. Padma Purana prescribes total abstinence from all grains, beans, and rice.',
      ekadashiParana: paranaDetails,
      permissibleFoodsHi: ['फलाहार (केला, सेब, अनार)', 'दूध, मट्ठा, घी', 'कुट्टू, सिंघाड़ा, साबूदाना', 'सेंधा नमक'],
      permissibleFoodsEn: ['Fruits (Banana, Apple)', 'Pure Milk & Ghee', 'Buckwheat & Sabudana', 'Rock salt'],
      prohibitedFoodsHi: ['चावल (कदापि नहीं)', 'गेहूं, बाजरा, मक्का', 'दालें, राजमा, छोले', 'बैंगन, गाजर, पान'],
      prohibitedFoodsEn: ['Rice (Strictly Forbidden)', 'All grains & pulses', 'Beans & Lentils', 'Eggplant'],
      fastingRulesHi: [
        'एकादशी के दिन चावल व अन्न का सर्वथा त्याग करें।',
        'भगवान विष्णु के मन्त्र "ॐ नमो भगवते वासुदेवाय" का निरन्तर जप करें।',
        'अगले दिन द्वादशी को सूर्योदय व पारण मुहूर्त के भीतर ही व्रत खोलें।',
      ],
      fastingRulesEn: [
        'Total abstinence from rice and grains is mandatory.',
        'Continuous remembrance of Lord Vishnu via Vishnu Sahasranama.',
        'Break fast strictly within the Shastric Dwadashi Parana window next morning.',
      ],
    };
  }

  // 4. Pradosha Vrat (13th Tithi)
  if (pakshaIdx === 13) {
    return {
      vratId: 'pradosh',
      titleHi: `${panchang.masa.purnimantaNameDevanagari} प्रदोष व्रत (शिव उपासना)`,
      titleEn: `${panchang.masa.purnimantaName} Pradosh Vrat`,
      badgeHi: '🔱 प्रदोष काल',
      badgeEn: '🔱 Pradosha Window',
      deityHi: 'देवाधिदेव महादेव व माता पार्वती',
      deityEn: 'Lord Shiva & Mother Parvati',
      significanceHi:
        'सूर्यास्त से ४५ मिनट पूर्व व पश्चात की वेला में भगवान शिव कैलास पर नटराज रूप में आनन्द ताण्डव करते हैं।',
      significanceEn:
        'Sacred twilight window where Lord Shiva performs the joyous cosmic dance of blessing.',
      permissibleFoodsHi: ['दूध, गंगाजल, फल', 'सेंधा नमक फलाहार'],
      permissibleFoodsEn: ['Milk, Sacred Ganga water, Fruits', 'Satvik fasting foods'],
      prohibitedFoodsHi: ['अन्न, तामसिक आहार', 'नमक (दिन में)'],
      prohibitedFoodsEn: ['Grains & Heavy food', 'Table salt during day'],
      fastingRulesHi: [
        'दिनभर निराहार या फलाहार रहकर सायं सूर्यास्त वेला में भगवान शिव का दुग्धाभिषेक करें।',
        'महामृत्युंजय मन्त्र अथवा ॐ नमः शिवाय का १०८ बार जप करें।',
      ],
      fastingRulesEn: [
        'Fast throughout daytime and conduct Shiva Abhishekam at twilight.',
        'Chant Maha Mrityunjaya or Om Namah Shivaya 108 times.',
      ],
    };
  }

  // 5. Purnima (15th Tithi Shukla)
  if (pakshaIdx === 15 && !isKrishna) {
    return {
      vratId: 'purnima',
      titleHi: `${panchang.masa.purnimantaNameDevanagari} पूर्णिमा (सत्यनारायण व्रत)`,
      titleEn: `${panchang.masa.purnimantaName} Purnima Fast`,
      badgeHi: '🌕 सत्यनारायण पूर्णिमा',
      badgeEn: '🌕 Purnima Vow',
      deityHi: 'भगवान श्री सत्यनारायण व माता लक्ष्मी',
      deityEn: 'Lord Satyanarayana & Maa Lakshmi',
      significanceHi: 'पूर्ण चन्द्र की अमृतमयी किरणें। सत्यनारायण कथा, गंगा स्नान व दीपदान का अक्षय फल।',
      significanceEn: 'Full Moon ambrosial night. Immense spiritual merit for Satyanarayana Katha and river dip.',
      permissibleFoodsHi: ['पंजीरी प्रसाद (गेहूं आटा भूनकर)', 'पंचामृत', 'केले व मौसमी फल'],
      permissibleFoodsEn: ['Panjiri Prasad', 'Panchamrita', 'Bananas & seasonal fruits'],
      prohibitedFoodsHi: ['मांसाहार, मदिरा', 'लहसुन-प्याज', 'कलह व कटु वचन'],
      prohibitedFoodsEn: ['Non-veg, Alcohol', 'Garlic, Onion', 'Harsh words'],
      fastingRulesHi: [
        'सायंकाल श्री सत्यनारायण भगवान की कथा सुनें व आरती करें।',
        'पूर्ण चन्द्रमा को अर्घ्य देकर चरणामृत व प्रसाद ग्रहण करें।',
      ],
      fastingRulesEn: [
        'Recite or listen to Sri Satyanarayana Katha at dusk.',
        'Offer Arghya to the glowing Full Moon and partake of Charanamrita.',
      ],
    };
  }

  // 6. Amavasya (15th Tithi Krishna)
  if (pakshaIdx === 15 && isKrishna) {
    return {
      vratId: 'amavasya',
      titleHi: `${panchang.masa.purnimantaNameDevanagari} दर्श अमावस्या (पितृ तर्पण दिवस)`,
      titleEn: `${panchang.masa.purnimantaName} Amavasya Day`,
      badgeHi: '🌑 पितृ तर्पण',
      badgeEn: '🌑 Ancestor Tarpan',
      deityHi: 'पितृ देव एवं भगवान सूर्य',
      deityEn: 'Pitru Devatas & Surya Narayana',
      significanceHi: 'पितरों की तृप्ति, शान्ति व आशीर्वाद प्राप्त करने हेतु तिल-जल तर्पण व ब्राह्मण/गौ-भोजन।',
      significanceEn: 'Supreme day for ancestral remembrance, water-sesame oblation, and cow feeding.',
      permissibleFoodsHi: ['सात्विक भोजन (पितृ भोग के पश्चात)', 'दूध, खीर, पूड़ी'],
      permissibleFoodsEn: ['Satvik vegetarian food after offering', 'Kheer, Puri'],
      prohibitedFoodsHi: ['मांसाहार, मदिra', 'लहसुन, प्याज', 'शुभ मांगलिक आरम्भ'],
      prohibitedFoodsEn: ['Non-veg, Alcohol', 'Garlic, Onion', 'New auspicious beginnings'],
      fastingRulesHi: [
        'मध्याह्न काल में दक्षिण दिशा की ओर मुख कर पितरों को जल व काले तिल से तर्पण दें।',
        'कौवे, कुत्ते, गाय व चींटियों को भोजन (पंचबलि) अवश्य दें।',
      ],
      fastingRulesEn: [
        'Offer water and black sesame facing South for ancestors at midday.',
        'Perform Pancha-bali: feed cows, birds, dogs, and ants.',
      ],
    };
  }

  return null;
}
