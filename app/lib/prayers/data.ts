import { PrayerRecord } from './types';

export const PRAYERS_DATA: PrayerRecord[] = [
  // 1. Shri Hanuman Chalisa
  {
    id: 'hanuman-chalisa',
    slug: 'hanuman-chalisa',
    title: 'Shri Hanuman Chalisa',
    titleDevanagari: 'श्री हनुमान चालीसा',
    subtitle: 'Forty Sacred Chaupais of Lord Hanuman composed by Goswami Tulsidas',
    subtitleDevanagari: 'गोस्वामी तुलसीदास विरचित श्री पवनपुत्र की चालीस पवित्र चौपाइयां',
    deity: 'hanuman',
    category: 'chalisa',
    author: 'Goswami Tulsidas',
    authorDevanagari: 'गोस्वामी तुलसीदास',
    totalVerses: 43, // 2 opening Dohas + 40 Chaupais + 1 concluding Doha
    idealTime: 'Morning Sandhya / Sunset / Tuesday & Saturday',
    idealTimeDevanagari: 'प्रातः सन्ध्या / सायंकाल / मंगलवार एवं शनिवार',
    significance:
      'The supreme devotional hymn dedicated to Lord Hanuman for overcoming fear, illness, planetary afflictions (especially Saturn Shani dosha), and gaining boundless physical and spiritual strength.',
    significanceDevanagari:
      'भय, रोग, संकटनिवारण तथा शनि ग्रह दोष शमन हेतु परम कल्याणकारी स्तोत्र। इसके नित्य पाठ से आत्मबल, बुद्धि, विद्या एवं आध्यात्मिक सुरक्षा प्राप्त होती है।',
    phalaShruti:
      'Whoever recites this Chalisa a hundred times is liberated from all bondages and attains supreme spiritual beatitude.',
    phalaShrutiDevanagari:
      'जो यह पढ़ै हनुमान चालीसा। होय सिद्धि साखी गौरीसा। जो सौ बार पाठ करता है वह समस्त बन्धनों से मुक्त होकर परमानन्द प्राप्त करता है।',
    recommendedCounts: [1, 3, 7, 11, 21, 108],
    verses: [
      {
        verseNumber: 1,
        verseType: 'doha',
        sanskrit: 'श्रीगुरु चरन सरोज रज निज मनु मुकुरु सुधारि।\nबरनऊं रघुबर बिमल जसु जो दायकु फल चारि॥',
        transliteration:
          'Shri Guru Charana Saroja Raja Nija Manu Mukuru Sudhari |\nBaranau Raghubara Bimala Jasu Jo Dayaku Phala Chari ||',
        hindiMeaning:
          'श्री गुरु महाराज के चरण कमलों की धूलि से अपने मन रूपी दर्पण को पवित्र करके, मैं श्री रघुवीर के उस निर्मल यश का वर्णन करता हूँ, जो धर्म, अर्थ, काम और मोक्ष रूपी चारों फलों को प्रदान करने वाला है।',
        englishMeaning:
          'Having cleansed the mirror of my mind with the dust of the holy lotus feet of the revered Guru, I narrate the untainted fame of Sri Ramachandra, the bestower of the fourfold fruits of life (Dharma, Artha, Kama, Moksha).',
      },
      {
        verseNumber: 2,
        verseType: 'doha',
        sanskrit: 'बुद्धिहीन तनु जानिके सुमिरौं पवन-कुमार।\nबल बुधि बिद्या देहु मोहिं हरहु कलेस बिकार॥',
        transliteration:
          'Buddhihina Tanu Janike Sumirau Pavana-Kumara |\nBala Budhi Bidya Dehu Mohi Harahu Kalesa Bikara ||',
        hindiMeaning:
          'स्वयं को ज्ञान एवं बुद्धि से हीन जानकर, मैं पवनपुत्र श्री हनुमान जी का स्मरण करता हूँ। हे प्रभु! मुझे शारीरिक बल, सद्बुद्धि एवं दिव्य विद्या प्रदान करें तथा मेरे समस्त क्लेशों और मानसिक विकारों को हर लें।',
        englishMeaning:
          'Knowing myself to be devoid of wisdom, I invoke Pawan-Kumara (the son of Wind). Bestow upon me spiritual strength, intellect, and divine knowledge, and eradicate all my afflictions and imperfections.',
      },
      {
        verseNumber: 3,
        verseType: 'chaupai',
        sanskrit: 'जय हनुमान ज्ञान गुन सागर।\nजय कपीस तिहुं लोक उजागर॥',
        transliteration:
          'Jaya Hanumana Gyana Guna Sagara |\nJaya Kapisa Tihu Loka Ujagara ||',
        hindiMeaning:
          'हे श्री हनुमान जी! आपकी जय हो, आप अथाह ज्ञान एवं सद्गुणों के महासागर हैं। हे वानर श्रेष्ठ! तीनों लोकों में आपकी दिव्य कीर्ति प्रकाशित है।',
        englishMeaning:
          'Victory to Lord Hanuman, the boundless ocean of wisdom and virtues! Victory to the king of Vanaras, whose luminescent glory radiates across the three celestial worlds!',
      },
      {
        verseNumber: 4,
        verseType: 'chaupai',
        sanskrit: 'राम दूत अतुलित बल धामा।\nअंजनि-पुत्र पवनसुत नामा॥',
        transliteration:
          'Rama Duta Atulita Bala Dhama |\nAnjani-Putra Pavanasuta Nama ||',
        hindiMeaning:
          'आप प्रभु श्रीराम के अनन्य दूत एवं अतुलनीय बल के दिव्य धाम हैं। माता अञ्जना के पुत्र होने से आप अञ्जनिपुत्र तथा पवनदेव के पुत्र होने से पवनसुत के नाम से विख्यात हैं।',
        englishMeaning:
          'You are the foremost divine messenger of Lord Rama and the repository of immeasurable celestial strength. You are venerated as the son of Mata Anjana and the divine offspring of the Wind God.',
      },
      {
        verseNumber: 5,
        verseType: 'chaupai',
        sanskrit: 'महाबीर बिक्रम बजरंगी।\nकुमति निवार सुमति के संगी॥',
        transliteration:
          'Mahabira Bikrama Bajarangi |\nKumati Nibara Sumati Ke Sangi ||',
        hindiMeaning:
          'आप महान वीर, पराक्रमी एवं वज्र के समान सुदृढ़ अंग वाले हैं। आप दुर्बुद्धि का निवारण करने वाले तथा सद्बुद्धि और सत्कर्म के सनातन साथी हैं।',
        englishMeaning:
          'You are the great hero of boundless valor with limbs as firm as Indra diamond thunderbolt. You dispel negative intellect and accompany and bless noble and pure minds.',
      },
      {
        verseNumber: 6,
        verseType: 'chaupai',
        sanskrit: 'कंचन बरन बिराज सुबेसा।\nकानन कुंडल कुंचित केसा॥',
        transliteration:
          'Kanchana Barana Biraja Subesa |\nKanana Kundala Kunchita Kesa ||',
        hindiMeaning:
          'आपका दिव्य वर्ण स्वर्ण के समान तेजस्वी है, आप मनोहर वस्त्र धारण किए हुए हैं। आपके कानों में कुण्डल शोभायमान हैं और आपके केश घुंघराले हैं।',
        englishMeaning:
          'Your radiant complexion glows like molten gold, adorned in majestic attire. Splendid earrings grace your ears, and your dark hair cascades in elegant curls.',
      },
      {
        verseNumber: 7,
        verseType: 'chaupai',
        sanskrit: 'हाथ बज्र औ ध्वजा बिराजै।\nकांधे मूंज जनेऊ साजै॥',
        transliteration:
          'Hatha Bajra Au Dhwaja Birajai |\nKandhe Munja Janeu Sajai ||',
        hindiMeaning:
          'आपके हाथों में वज्र के समान गदा एवं धर्म की विजय ध्वजा सुशोभित है, तथा आपके कन्धे पर मूंज की पवित्र यज्ञोपवीत (जनेऊ) विराजमान है।',
        englishMeaning:
          'In your hands shine the protective thunderbolt mace and the sacred flag of victory, while across your shoulder rests the holy sacred thread made of munja grass.',
      },
      {
        verseNumber: 8,
        verseType: 'chaupai',
        sanskrit: 'संकर सुवन केसरीनंदन।\nतेज प्रताप महा जग बंदन॥',
        transliteration:
          'Sankara Suvana Kesarīnandana |\nTeja Pratapa Maha Jaga Bandana ||',
        hindiMeaning:
          'आप देवाधिदेव शिव के एकादश रुद्रावतार तथा राजा केसरी के आनन्दवर्धन पुत्र हैं। आपके दिव्य तेज एवं पराक्रम की सम्पूर्ण संसार वन्दना करता है।',
        englishMeaning:
          'You are the revered eleventh Rudra avatar of Lord Shiva and the delight of King Kesari. Your divine luminosity and boundless majesty are worshipped by the entire universe.',
      },
      {
        verseNumber: 9,
        verseType: 'chaupai',
        sanskrit: 'बिद्यावान गुनी अति चातुर।\nराम काज करिबे को आतुर॥',
        transliteration:
          'Bidyawana Guni Ati Chatura |\nRama Kaja Karibe Ko Atura ||',
        hindiMeaning:
          'आप समस्त चौदह विद्याओं में प्रवीण, गुणों की खान तथा परम चतुर हैं। आप भगवान श्रीराम के कार्यों को सिद्ध करने हेतु सदैव तत्पर रहते हैं।',
        englishMeaning:
          'You are the master of all sacred lore, virtuous and exceptionally wise. You are eternally eager and dedicated to accomplishing the divine mission of Lord Sri Rama.',
      },
      {
        verseNumber: 10,
        verseType: 'chaupai',
        sanskrit: 'प्रभु चरित्र सुनिबे को रसिया।\nराम लखन सीता मन बसिया॥',
        transliteration:
          'Prabhu Charitra Sunibe Ko Rasiya |\nRama Lakhana Sita Mana Basiya ||',
        hindiMeaning:
          'आप भगवान श्रीराम के पावन चरित्र को सुनने में अगाध आनन्द लेते हैं। आपके हृदय मन्दिर में श्रीराम, लक्ष्मण और माता जानकी सदैव निवास करते हैं।',
        englishMeaning:
          'You revel in pure ecstasy listening to the sacred glories of Lord Rama. Within your innermost heart eternally reside Sri Rama, Lakshmana, and Mother Sita.',
      },
      {
        verseNumber: 11,
        verseType: 'chaupai',
        sanskrit: 'सूक्ष्म रूप धरि सियहिं दिखावा।\nबिकट रूप धरि लंक जरावा॥',
        transliteration:
          'Sukshma Rupa Dhari Siyahin Dikhawa |\nBikata Rupa Dhari Lanka Jarawa ||',
        hindiMeaning:
          'आपने अशोक वाटिका में अति सूक्ष्म रूप धारण कर माता सीता को दर्शन दिया, और विकराल विशाल रूप धारण करके राक्षसों की लंका नगरी को भस्म कर दिया।',
        englishMeaning:
          'Assuming a minute humble form you appeared before Mother Sita in the Ashoka grove, and manifesting a colossal terrifying form you consumed Lanka in purifying flames.',
      },
      {
        verseNumber: 12,
        verseType: 'chaupai',
        sanskrit: 'भीम रूप धरि असुर संहारे।\nरामचंद्र के काज संवारे॥',
        transliteration:
          'Bhima Rupa Dhari Asura Samhare |\nRamachandra Ke Kaja Samware ||',
        hindiMeaning:
          'आपने भीमकाय विराट रूप धारण करके दुष्ट असुरों का संहार किया और मर्यादा पुरुषोत्तम प्रभु श्रीराम के समस्त कार्यों को सफलतापूर्वक संवारा।',
        englishMeaning:
          'Manifesting an awe-inspiring formidable stature you vanquished the demonic hordes, triumphantly fulfilling every noble task of Lord Ramachandra.',
      },
      {
        verseNumber: 13,
        verseType: 'chaupai',
        sanskrit: 'लाय सजीवन लखन जियाये।\nश्रीरघुबीर हरषि उर लाये॥',
        transliteration:
          'Laya Sajivana Lakhana Jiyaye |\nShriraghubira Harashi Ura Laye ||',
        hindiMeaning:
          'आपने हिमालय से संजीवनी बूटी लाकर मूर्छित लक्ष्मण जी को नवजीवन प्रदान किया, जिससे परम प्रसन्न होकर प्रभु श्रीराम ने आपको हृदय से लगा लिया।',
        englishMeaning:
          'Carrying the miraculous Sanjeevani herb from the Himalayas you restored Lakshmana to life, whereupon Lord Sri Rama embraced you in overwhelming joyous affection.',
      },
      {
        verseNumber: 14,
        verseType: 'chaupai',
        sanskrit: 'रघुपति कीन्ही बहुत बड़ाई।\nतुम मम प्रिय भरतहि सम भाई॥',
        transliteration:
          'Raghupati Kinhi Bahuta Badai |\nTuma Mama Priya Bharatahi Sama Bhai ||',
        hindiMeaning:
          'श्री रघुपति ने आपकी अपार प्रशंसा करते हुए कहा कि हे हनुमान! तुम मुझे मेरे परम प्रिय भाई भरत के समान ही प्रिय हो।',
        englishMeaning:
          'Lord Raghupati praised you with deep reverence, declaring: You are as dearly beloved to me as my own virtuous brother Bharata.',
      },
      {
        verseNumber: 15,
        verseType: 'chaupai',
        sanskrit: 'सहस बदन तुम्हरो जस गावैं।\nअस कहि श्रीपति कंठ लगावैं॥',
        transliteration:
          'Sahasa Badana Tumharo Jasa Gavain |\nAsa Kahi Shripati Kantha Lagawain ||',
        hindiMeaning:
          'सहस्र मुख वाले शेषनाग भी आपके पावन यश का गान करते हैं—ऐसा कहकर लक्ष्मीपति भगवान श्रीराम ने आपको पुनः अपने कण्ठ से लगा लिया।',
        englishMeaning:
          'The thousand-headed celestial serpent Shesha continuously sings your glory—proclaiming this, the Lord of Sri embraced you once more to His chest.',
      },
      {
        verseNumber: 16,
        verseType: 'chaupai',
        sanskrit: 'सनकादिक ब्रह्मादि मुनीसा।\nनारद सारद सहित अहीसा॥',
        transliteration:
          'Sanakadika Brahmadika Munisa |\nNarada Sarada Sahita Ahisa ||',
        hindiMeaning:
          'सनक आदि चारों कुमार, ब्रह्मा आदि देवगण, श्रेष्ठ मुनिगण, देवर्षि नारद, माँ सरस्वती और शेषनाग भी आपकी यशोगाथा का कीर्तन करते हैं।',
        englishMeaning:
          'Sanaka and the immortal sages, Lord Brahma and the devas, Narada, Mother Saraswati, and the king of serpents all chant your immaculate glories.',
      },
      {
        verseNumber: 17,
        verseType: 'chaupai',
        sanskrit: 'जम कुबेर दिगपाल जहां ते।\nकबि कोबिद कहि सके कहां ते॥',
        transliteration:
          'Jama Kubera Digapala Jahan Te |\nKabi Kobida Kahi Sake Kahan Te ||',
        hindiMeaning:
          'यमराज, कुबेर और समस्त दिशाओं के दिक्पाल भी जहाँ आपकी महिमा का पार नहीं पा सकते, वहाँ साधारण कवि अथवा पण्डित उसका सम्पूर्ण वर्णन कैसे कर सकते हैं?',
        englishMeaning:
          'When Yama, Kubera, and the cosmic guardians of the quarters cannot fathom the full extent of your glory, how can any mortal poet or scholar express it fully?',
      },
      {
        verseNumber: 18,
        verseType: 'chaupai',
        sanskrit: 'तुम उपकार सुग्रीवहिं कीन्हा।\nराम मिलाय राज पद दीन्हा॥',
        transliteration:
          'Tuma Upakara Sugrivahin Kinha |\nRama Milaya Raja Pada Dinha ||',
        hindiMeaning:
          'आपने सुग्रीव पर महान उपकार किया, उन्हें प्रभु श्रीराम से मिलाया और उन्हें किष्किन्धा का खोया हुआ राजपद पुनः दिलवाया।',
        englishMeaning:
          'You rendered immense grace unto Sugriva by introducing him to Sri Rama, thus restoring him to his sovereign throne as the king of Kishkindha.',
      },
      {
        verseNumber: 19,
        verseType: 'chaupai',
        sanskrit: 'तुम्हरो मंत्र बिभीषन माना।\nलंकेश्वर भए सब जग जाना॥',
        transliteration:
          'Tumharo Mantra Bibhishana Mana |\nLankeshwara Bhae Saba Jaga Jana ||',
        hindiMeaning:
          'आपके हितकारी परामर्श को विभीषण ने स्वीकार किया, जिसके फलस्वरूप वे लंका के अधिपति बने—यह सम्पूर्ण संसार भली-भाँति जानता है।',
        englishMeaning:
          'Vibhishana heeded your righteous counsel, and in doing so became the sovereign monarch of Lanka, as is renowned throughout the entire creation.',
      },
      {
        verseNumber: 20,
        verseType: 'chaupai',
        sanskrit: 'जुग सहस्र जोजन पर भानू।\nलील्यो ताहि मधुर फल जानू॥',
        transliteration:
          'Juga Sahasra Jojana Para Bhanu |\nLilyo Tahi Madhura Phala Janu ||',
        hindiMeaning:
          'जो सूर्य कई हजार योजन की अगाध दूरी पर स्थित है, आपने बाल्यकाल में उसे एक मीठा फल समझकर अनायास ही निगल लिया था।',
        englishMeaning:
          'The radiant Sun, situated millions of leagues away across cosmic space, you leapt toward in childhood and effortlessly swallowed, mistaking it for a sweet fruit.',
      },
      {
        verseNumber: 21,
        verseType: 'chaupai',
        sanskrit: 'प्रभु मुद्रिका मेलि मुख माहीं।\nजलधि लांघि गये अचरज नाहीं॥',
        transliteration:
          'Prabhu Mudrika Meli Mukha Mahin |\nJaladhi Langhi Gaye Acharaja Nahin ||',
        hindiMeaning:
          'प्रभु श्रीराम की मुद्रिका (अंगूठी) को अपने मुख में रखकर आपने सौ योजन विशाल समुद्र को छलांग लगाकर पार कर लिया, इसमें कोई आश्चर्य नहीं है।',
        englishMeaning:
          'Carrying the sacred signet ring of Lord Rama within your mouth, you leapt across the boundless hundred-league ocean—a feat causing no wonder for your immense power.',
      },
      {
        verseNumber: 22,
        verseType: 'chaupai',
        sanskrit: 'दुर्गम काज जगत के जेते।\nसुगम अनुग्रह तुम्हरे तेते॥',
        transliteration:
          'Durgama Kaja Jagata Ke Jete |\nSugama Anugraha Tumhare Tete ||',
        hindiMeaning:
          'इस संसार में जितने भी कठिन से कठिन कार्य हैं, वे सब आपकी कृपा दृष्टि एवं अनुग्रह से सहज और सुलभ हो जाते हैं।',
        englishMeaning:
          'All formidable, arduous, and seemingly insurmountable undertakings in this world become effortlessly achievable through your divine benevolence.',
      },
      {
        verseNumber: 23,
        verseType: 'chaupai',
        sanskrit: 'राम दुआरे तुम रखवारे।\nहोत न आज्ञा बिनु पैसारे॥',
        transliteration:
          'Rama Duare Tuma Rakhaware |\nHota Na Agya Binu Paisare ||',
        hindiMeaning:
          'आप प्रभु श्रीराम के मन्दिर एवं द्वार के मुख्य रक्षक हैं। आपकी अनुमति और कृपा के बिना कोई भी भीतर प्रवेश नहीं कर सकता।',
        englishMeaning:
          'You stand as the divine gatekeeper at the sacred threshold of Sri Rama. None may enter His sanctum without your gracious consent and blessing.',
      },
      {
        verseNumber: 24,
        verseType: 'chaupai',
        sanskrit: 'सब सुख लहै तुम्हारी सरना।\nतुम रक्षक काहू को डर ना॥',
        transliteration:
          'Saba Sukha Lahai Tumhari Sarana |\nTuma Rakshaka Kahu Ko Dara Na ||',
        hindiMeaning:
          'जो आपकी शरण में आता है, वह समस्त लौकिक एवं पारलौकिक सुख प्राप्त करता है। जब आप रक्षक हैं, तब किसी भी प्रकार का भय नहीं रह जाता।',
        englishMeaning:
          'Those who seek refuge in your grace attain every spiritual and worldly joy. When you are the supreme protector, whom should one fear?',
      },
      {
        verseNumber: 25,
        verseType: 'chaupai',
        sanskrit: 'आपन तेज सम्हारो आपै।\nतीनों लोक हांक तें कांपै॥',
        transliteration:
          'Apana Teja Samharo Apai |\nTinon Loka Hanka Ten Kampai ||',
        hindiMeaning:
          'अपने असीम तेज और वेग को केवल आप ही सम्भाल सकते हैं। आपकी एक सिंहगर्जना से तीनों लोक भय से कांप उठते हैं।',
        englishMeaning:
          'Only you yourself can contain your overwhelming brilliance and power. At your singular thunderous roar, the three cosmic realms tremble in awe.',
      },
      {
        verseNumber: 26,
        verseType: 'chaupai',
        sanskrit: 'भूत पिसाच निकट नहिं आवै।\nमहाबीर जब नाम सुनावै॥',
        transliteration:
          'Bhuta Pisacha Nikata Nahin Aawai |\nMahabira Jaba Nama Sunawai ||',
        hindiMeaning:
          'जहाँ महावीर हनुमान जी के पावन नाम का उच्चारण किया जाता है, वहाँ भूत, पिशाच, प्रेत एवं नकारात्मक शक्तियां निकट भी नहीं फटक सकतीं।',
        englishMeaning:
          'Negative energies, phantoms, and evil spirits cannot approach anywhere near when the triumphant name of Mahavira is uttered with devotion.',
      },
      {
        verseNumber: 27,
        verseType: 'chaupai',
        sanskrit: 'नासै रोग हरै सब पीरा।\nजपत निरंतर हनुमत बीरा॥',
        transliteration:
          'Nasai Roga Harai Saba Pira |\nJapata Nirantara Hanumata Bira ||',
        hindiMeaning:
          'वीर हनुमान जी के नाम का निरन्तर श्रद्धापूर्वक जप करने से समस्त असाध्य रोग नष्ट हो जाते हैं और समस्त पीड़ाएं दूर हो जाती हैं।',
        englishMeaning:
          'All afflictions, sickness, and sorrows are dissolved completely by chanting the sacred name of the heroic Hanuman with uninterrupted faith.',
      },
      {
        verseNumber: 28,
        verseType: 'chaupai',
        sanskrit: 'संकट तें हनुमान छुड़ावै।\nमन क्रम बचन ध्यान जो लावै॥',
        transliteration:
          'Sankata Ten Hanumana Chhudawai |\nMana Krama Bachana Dhyana Jo Lawai ||',
        hindiMeaning:
          'जो भी व्यक्ति मन, कर्म और वचन से श्री हनुमान जी का ध्यान करता है, हनुमान जी उसे जीवन के प्रत्येक संकट से मुक्त कर देते हैं।',
        englishMeaning:
          'Sri Hanuman delivers from every worldly crisis and tribulation anyone who meditates upon Him through purity of thought, speech, and righteous deed.',
      },
      {
        verseNumber: 29,
        verseType: 'chaupai',
        sanskrit: 'सब पर राम तपस्वी राजा।\nतिन के काज सकल तुम साजा॥',
        transliteration:
          'Saba Para Rama Tapaswi Raja |\nTina Ke Kaja Sakala Tuma Saja ||',
        hindiMeaning:
          'तपस्वी राजा श्रीराम सर्वोपरि हैं, और आपने उनके समस्त कठिन कार्यों को पूर्ण समर्पण के साथ सिद्ध किया।',
        englishMeaning:
          'Lord Sri Rama, the sovereign ascetic king, reigns supreme above all, and you harmoniously accomplished every divine undertaking He ordained.',
      },
      {
        verseNumber: 30,
        verseType: 'chaupai',
        sanskrit: 'और मनोरथ जो कोई लावै।\nसोइ अमित जीवन फल पावै॥',
        transliteration:
          'Aura Manoratha Jo Koi Lawai |\nSoi Amita Jivana Phala Pawai ||',
        hindiMeaning:
          'जो कोई भी भक्त आपके समक्ष कोई भी मनोकामना लेकर आता है, वह अपने जीवन में अमूल्य और अनन्त फल प्राप्त करता है।',
        englishMeaning:
          'Whosoever brings any sincere desire before you attains the boundless, limitless fruit of a fulfilled and blessed spiritual life.',
      },
      {
        verseNumber: 31,
        verseType: 'chaupai',
        sanskrit: 'चारों जुग परताप तुम्हारा।\nहै परसिद्ध जगत उजियारा॥',
        transliteration:
          'Charon Juga Paratapa Tumhara |\nHai Parasiddha Jagata Ujiyara ||',
        hindiMeaning:
          'सत्ययुग, त्रेता, द्वापर और कलियुग—चारों युगों में आपका प्रताप अखण्ड रूप से विद्यमान है, और आपकी पावन कीर्ति सम्पूर्ण ब्रह्माण्ड को प्रकाशित करती है।',
        englishMeaning:
          'Across all four cosmic epochs (Satya, Treta, Dvapara, and Kali), your divine brilliance endures undiminished, illuminating the universe with righteousness.',
      },
      {
        verseNumber: 32,
        verseType: 'chaupai',
        sanskrit: 'साधु संत के तुम रखवारे।\nअसुर निकंदन राम दुलारे॥',
        transliteration:
          'Sadhu Santa Ke Tuma Rakhaware |\nAsura Nikandana Rama Dulare ||',
        hindiMeaning:
          'आप सज्जनों, साधुओं और सन्तों के रक्षक हैं, दुष्ट असुरों का नाश करने वाले हैं और भगवान श्रीराम के अति लाड़ले हैं।',
        englishMeaning:
          'You are the fortress and shield of saints and sages, the destroyer of malevolent demons, and the most cherished beloved of Lord Sri Rama.',
      },
      {
        verseNumber: 33,
        verseType: 'chaupai',
        sanskrit: 'अष्ट सिद्धि नौ निधि के दाता।\nअस बर दीन जानकी माता॥',
        transliteration:
          'Ashta Siddhi Nau Nidhi Ke Data |\nAsa Bara Dina Janaki Mata ||',
        hindiMeaning:
          'आप अणिमा, महिमा आदि आठों सिद्धियों एवं पद्म, महापद्म आदि नौ निधियों के दाता हैं—यह दिव्य वरदान आपको जगज्जननी माता जानकी ने प्रदान किया है।',
        englishMeaning:
          'You are the sovereign bestower of the eight miraculous yogic siddhis and nine divine spiritual treasures, a supreme boon conferred upon you by Mother Janaki.',
      },
      {
        verseNumber: 34,
        verseType: 'chaupai',
        sanskrit: 'राम रसायन तुम्हरे पासा।\nसदा रहो रघुपति के दासा॥',
        transliteration:
          'Rama Rasayana Tumhare Pasa |\nSada Raho Raghupati Ke Dasa ||',
        hindiMeaning:
          'आपके पास श्रीराम-भक्ति रूपी अमूल्य दिव्य रसायन है। आप सदैव रघुपति के अनन्य और विनम्र सेवक बने रहते हैं।',
        englishMeaning:
          'You possess the sovereign nectar and panacea of Sri Rama devotion. May you forever remain the compassionate, devoted servant of Lord Raghupati.',
      },
      {
        verseNumber: 35,
        verseType: 'chaupai',
        sanskrit: 'तुम्हरे भजन राम को पावै।\nजनम जनम के दुख बिसरावै॥',
        transliteration:
          'Tumhare Bhajana Rama Ko Pawai |\nJanama Janama Ke Dukha Bisarawai ||',
        hindiMeaning:
          'आपके भजन और संकीर्तन से भक्त प्रभु श्रीराम को प्राप्त करता है और जन्म-जन्मान्तरों के संचित दुःखों एवं तापों से मुक्त हो जाता है।',
        englishMeaning:
          'Through loving worship of you, the devotee realizes Lord Sri Rama directly, transcending the accumulated sorrows of countless lifetimes.',
      },
      {
        verseNumber: 36,
        verseType: 'chaupai',
        sanskrit: 'अन्त काल रघुबर पुर जाई।\nजहां जन्म हरि-भक्त कहाई॥',
        transliteration:
          'Anta Kala Raghubara Pura Jai |\nJahan Janma Hari-Bhakta Kahai ||',
        hindiMeaning:
          'वह अन्त समय में श्री रघुनाथ जी के परम धाम (साकेत) को प्राप्त करता है, और यदि इस लोक में पुनः जन्म ले तो हरि का सच्चा भक्त कहलाता है।',
        englishMeaning:
          'At the close of earthly life such a soul departs to the supreme celestial abode of Sri Rama, or if reincarnated on earth, is recognized as a pure devotee of Hari.',
      },
      {
        verseNumber: 37,
        verseType: 'chaupai',
        sanskrit: 'और देवता चित्त न धरई।\nहनुमत सेइ सर्ब सुख करई॥',
        transliteration:
          'Aura Devata Chitta Na Dharai |\nHanumata Sei Sarba Sukha Karai ||',
        hindiMeaning:
          'यदि भक्त किसी अन्य देवता का ध्यान भी न करे, केवल श्री हनुमान जी की ही सेवा-आराधना करे, तो भी वह सम्पूर्ण सुख और परम कल्याण प्राप्त कर लेता है।',
        englishMeaning:
          'Even without fixing meditation on other deities, one who serves Sri Hanuman with steadfast faith attains every worldly happiness and supreme liberation.',
      },
      {
        verseNumber: 38,
        verseType: 'chaupai',
        sanskrit: 'संकट कटै मिटै सब पीरा।\nजो सुमिरै हनुमत बलबीरा॥',
        transliteration:
          'Sankata Katai Mitai Saba Pira |\nJo Sumirai Hanumata Balabira ||',
        hindiMeaning:
          'जो भी बलवान वीर हनुमान जी का श्रद्धापूर्वक स्मरण करता है, उसके सम्पूर्ण संकट कट जाते हैं और समस्त पीड़ाएं सदा के लिए समाप्त हो जाती हैं।',
        englishMeaning:
          'Every tribulation is severed and all affliction is extinguished for the steadfast devotee who meditates upon the heroic and mighty Hanuman.',
      },
      {
        verseNumber: 39,
        verseType: 'chaupai',
        sanskrit: 'जै जै जै हनुमान गोसाईं।\nकृपा करहु गुरु देव की नाईं॥',
        transliteration:
          'Jai Jai Jai Hanumana Gosain |\nKripa Karahu Guru Deva Ki Nain ||',
        hindiMeaning:
          'हे इन्द्रियों के स्वामी भगवान हनुमान! आपकी जय हो, जय हो, जय हो! आप सद्गुरुदेव की भांति मुझ पर अपनी असीम कृपा दृष्टि बनाए रखें।',
        englishMeaning:
          'Victory, victory, all victory to Lord Hanuman! Bestow your boundless grace and guidance upon me like a compassionate spiritual master.',
      },
      {
        verseNumber: 40,
        verseType: 'chaupai',
        sanskrit: 'जो सत बार पाठ कर कोई।\nछूटहि बंदि महा सुख होई॥',
        transliteration:
          'Jo Sata Bara Patha Kara Koi |\nChhutahi Bandi Maha Sukha Hoi ||',
        hindiMeaning:
          'जो कोई भी इस पावन चालीसा का सौ बार पाठ करता है, वह संसार के समस्त बन्धनों से मुक्त हो जाता है और उसे परमानन्द की प्राप्ति होती है।',
        englishMeaning:
          'Whosoever recites this sacred Chalisa a hundred times is unbound from all worldly fetters and enters into supreme spiritual bliss.',
      },
      {
        verseNumber: 41,
        verseType: 'chaupai',
        sanskrit: 'जो यह पढ़ै हनुमान चालीसा।\nहोय सिद्धि साखी गौरीसा॥',
        transliteration:
          'Jo Yaha Padhai Hanumana Chalisa |\nHoya Siddhi Sakhi Gaurisa ||',
        hindiMeaning:
          'जो कोई भी इस हनुमान चालीसा का नित्य पाठ करता है, उसकी समस्त मनोकामनाएं सिद्ध होती हैं—इसके प्रत्यक्ष साक्षी देवाधिदेव भगवान शिव हैं।',
        englishMeaning:
          'Whoever reads this Hanuman Chalisa attains spiritual perfection and accomplishment, to which Lord Shiva Himself is the eternal divine witness.',
      },
      {
        verseNumber: 42,
        verseType: 'chaupai',
        sanskrit: 'तुलसीदास सदा हरि चेरा।\nकीजै नाथ हृदय महं डेरा॥',
        transliteration:
          'Tulasidasa Sada Hari Chera |\nKijai Natha Hridaya Mahan Dera ||',
        hindiMeaning:
          'तुलसीदास सदा प्रभु श्रीहरि के अनन्य सेवक हैं। हे नाथ! आप सदा के लिए मेरे हृदय मन्दिर में अपना पावन निवास बना लीजिए।',
        englishMeaning:
          'Tulsidas is eternally the devoted servant of Lord Hari. O revered protector! Graciously establish your everlasting dwelling within my heart.',
      },
      {
        verseNumber: 43,
        verseType: 'doha',
        sanskrit: 'पवन तनय संकट हरन मंगल मूरति रूप।\nराम लखन सीता सहित हृदय बसहु सुर भूप॥',
        transliteration:
          'Pawana Tanaya Sankata Harana Mangala Murati Rupa |\nRama Lakhana Sita Sahita Hridaya Basahu Sura Bhupa ||',
        hindiMeaning:
          'हे पवनपुत्र! आप संकटों को हरने वाले और साक्षात् कल्याण की पावन मूर्ति हैं। हे देवशिरोमणि! आप भगवान श्रीराम, लक्ष्मण और माता सीता सहित सदैव मेरे हृदय में वास करें।',
        englishMeaning:
          'O Son of the Wind, dispeller of all tribulations, embodiment of supreme auspiciousness! Sovereign among devas, dwell eternally within my heart alongside Sri Rama, Lakshmana, and Mother Sita.',
      },
    ],
  },

  // 2. Shiv Tandav Stotram
  {
    id: 'shiv-tandav-stotram',
    slug: 'shiv-tandav-stotram',
    title: 'Shiv Tandav Stotram',
    titleDevanagari: 'शिव ताण्डव स्तोत्रम्',
    subtitle: 'Cosmic Dance Hymn of Lord Shiva composed by King Ravana',
    subtitleDevanagari: 'लङ्काधिपति रावण विरचित भगवान महेश्वर का दिव्य ताण्डव स्तोत्र',
    deity: 'shiva',
    category: 'stotram',
    author: 'King Ravana',
    authorDevanagari: 'लङ्केश रावण',
    totalVerses: 15,
    idealTime: 'Pradosha Kaal / Evening Sandhya / Monday / Maha Shivratri',
    idealTimeDevanagari: 'प्रदोष काल / सांध्य सन्ध्या / सोमवार / महाशिवरात्रि',
    significance:
      'The sublime Sanskrit rhythmic ode praising Lord Shiva ecstatic cosmic dance of dissolution and rejuvenation. Renowned for generating fearlessness, poetic brilliance, and unshakeable inner focus.',
    significanceDevanagari:
      'भगवान शिव के नटराज स्वरूप एवं संहार-सृजन के दिव्य ताण्डव नृत्य का ओजस्वी स्तुतिगान। इसके पाठ से वाणी में तेज, अगाध आत्मबल, शत्रुभय शमन तथा शिवानुग्रह की प्राप्ति होती है।',
    phalaShruti:
      'Whoever recites this hymn with devotion at the dusk of Pradosha is blessed with prosperity of chariots, wealth, elephants, and stable Lakshmi.',
    phalaShrutiDevanagari:
      'पूजावसानसमये दशवक्त्रगीतं यः शम्भुपूजनपरं पठति प्रदोषे। तस्य स्थिरां रथगजेंद्रतुरङ्गयुक्तां लक्ष्मीं सदैव सुमुखीं प्रददाति शम्भुः॥',
    recommendedCounts: [1, 3, 11],
    verses: [
      {
        verseNumber: 1,
        verseType: 'sloka',
        sanskrit: 'जटाटवीगलज्जलप्रवाहपावितस्थले\nगलेऽवलम्ब्य लम्बितां भुजङ्गतुङ्गमालिकाम्।\nडमड्डमड्डमड्डमन्निनादवड्डमर्वयं\nचकार चण्डताण्डवं तनोतु नः शिवः शिवम्॥',
        transliteration:
          'Jatatawigalajjala Pravahapavitasthale\nGalewalambya Lambitam Bhujangatungamalikam |\nDamaddamad Damaddaman Ninadavaddamarvayam\nChakara Chandatandavam Tanotu Nah Shivah Shivam ||',
        hindiMeaning:
          'सघन वन के समान जटाओं से प्रवाहित होने वाली गङ्गा जी की निर्मल धाराओं से पवित्र कण्ठ वाले, गले में विशालकाय सर्पों की माला धारण करने वाले, तथा डमरू की डम-डम ध्वनि के साथ प्रचण्ड ताण्डव नृत्य करने वाले भगवान शिव हमारा परम कल्याण करें।',
        englishMeaning:
          'With His neck sanctified by the cascading waters of the celestial Ganga flowing from His dense matted hair, wearing a great garland of serpent kings, and dancing the cosmic Tandava to the rhythmic resonance of His Damaru—may Lord Shiva bestow supreme auspiciousness upon us.',
      },
      {
        verseNumber: 2,
        verseType: 'sloka',
        sanskrit: 'जटाकटाहसम्भ्रमभ्रमन्निलिम्पनिर्झरी-\nविलोलवीचिवल्लरीविराजमानमूर्धनि।\nधग्धग्धगज्ज्वलल्ललाटपट्टपावके\nकिशोरचन्द्रशेखरे रतिः प्रतिक्षणं मम॥',
        transliteration:
          'Jatakatahasambhramabhramannilimpanirjhari-\nVilolavichivallarivirajamanamurdhani |\nDhagaddhagaddhagajjvalallalatapattapawake\nKishorachandrashekhare Ratih Pratikshanam Mama ||',
        hindiMeaning:
          'जिनके जटा रूपी कड़ाह में वेग से घूमती हुई देवनदी गङ्गा की चंचल लहरें मस्तक पर सुशोभित हैं, जिनके ललाट रूपी पट्ट पर अग्नि धक-धक प्रज्वलित हो रही है, तथा जिनके मस्तक पर बालचन्द्रमा विराजमान हैं, उन देवाधिदेव शिव में मेरा मन प्रतिक्षण अनुरक्त रहे।',
        englishMeaning:
          'Whose crown is adorned by the agitated surging waves of the divine river Ganga swirling within His vast locks, whose forehead blazes with the fiery light of His third eye, and on whose crest shines the crescent moon—may my soul ever find delight in that supreme Shiva.',
      },
      {
        verseNumber: 3,
        verseType: 'sloka',
        sanskrit: 'धराधरेन्द्रनन्दिनीविलासबन्धुबन्धुर-\nस्फुरद्दिगन्तसन्ततिप्रमोदमानमानसे।\nकृपाकटाक्षधोरणीनिरुद्धदुर्धरापदि\nक्वचिद्दिगम्बरे मनो विनोदमेतु वस्तुनि॥',
        transliteration:
          'Dharadharendranandinivilasabandhubandhura-\nSphuraddigantasantatipramodamanamanase |\nKripakatakshadhoraniniruddhadurdharapadi\nKwachiddigambare Mano Vinodametu Vastuni ||',
        hindiMeaning:
          'हिमालयपुत्री माता पार्वती के विलासपूर्ण कटाक्षों से जिनका चित्त परम प्रसन्न रहता है, जिनकी दयामयी दृष्टि मात्र से घोर विपत्तियों का नाश हो जाता है, ऐसे दिगम्बर (सम्पूर्ण दिशाओं को ही वस्त्र मानने वाले) भगवान शिव में मेरा मन नित्य आनन्द पाए।',
        englishMeaning:
          'Whose mind rejoices in the universe companion of Goddess Parvati, daughter of the mountain king, whose compassionate sidelong glance halts insurmountable calamities—in that cosmic Digambara Lord, may my consciousness find eternal peace.',
      },
      {
        verseNumber: 4,
        verseType: 'sloka',
        sanskrit: 'जटाभुजङ्गपिङ्गलस्फुरत्फणामणिप्रभा-\nकदम्बकुङ्कुमद्रवप्रलिप्तदिग्वधूमुखे।\nमदान्धसिन्धुरस्फुरत्त्वगुत्तरीयमेदुरे\nमनो विनोदमद्भुतं बिभर्तु भूतभर्तरि॥',
        transliteration:
          'Jatabhujangapingalasphuratphanammaniprabha-\nKadambakunkumadravapraliptadigvadhumukhe |\nMadandhasindhurasphurattvaguttariyamedure\nMano Vinodamadbhutam Bibhartu Bhutabhartari ||',
        hindiMeaning:
          'जिनके जटाजूट में लिपटे सर्पों की मणियों के पिंगल वर्ण प्रकाश से दसों दिशाओं के मुख कुङ्कुम से लिप्त प्रतीत होते हैं, तथा जो मदमस्त गजासुर के चर्म का उत्तरीय धारण किए हुए हैं, उन समस्त भूतों के स्वामी भगवान शिव में मेरा मन अद्भुत आनन्द प्राप्त करे।',
        englishMeaning:
          'With the radiant brilliance radiating from the gems upon the coiling serpents in His hair illuminating all directions like crimson kumkuma, adorned with the mantle of elephant hide—may my mind dwell in wondrous contemplation upon the Lord of all beings.',
      },
      {
        verseNumber: 5,
        verseType: 'sloka',
        sanskrit: 'सहस्रलोचनप्रभृत्यशेषलेखशेखर-\nप्रसूनधूलिधोरणीविधूसराङ्घ्रिपीठभूः।\nभुजङ्गराजमालया निबद्धजाटजूटकः\nश्रियै चिराय जायतां चकोरबन्धुशेखरः॥',
        transliteration:
          'Sahasralochanaprabhriyasheshalekhashekhara-\nPrasunadhulidhoranividhusaranghripithabhuh |\nBhujangarajamalaya Nibaddhajatajutakah\nShriyai Chiraya Jayatam Chakorabandhushekharah ||',
        hindiMeaning:
          'इन्द्र आदि समस्त देवताओं के मुकुटों में लगे पुष्पों के पराग से जिनके पावन चरण-पीठ धूसरित रहते हैं, तथा नागराज की माला से जिनका जटाजूट बंधा हुआ है, वे चन्द्रशेखर भगवान शिव हमें चिरकाल के लिए दिव्य ऐश्वर्य प्रदान करें।',
        englishMeaning:
          'Whose footstool is bathed in the pollen dust shed from the flowers adorning the diadems of Indra and all celestials, whose locks are bound by the serpent king, wearing the crescent moon—may He bestow upon us everlasting spiritual wealth.',
      },
    ],
  },

  // 3. Shri Suktam
  {
    id: 'shri-suktam',
    slug: 'shri-suktam',
    title: 'Rigvedic Shri Suktam',
    titleDevanagari: 'ऋग्वैदिक श्रीसूक्तम्',
    subtitle: 'Vedic Prosperity Invocations from the Rigveda Parishishta',
    subtitleDevanagari: 'ऋग्वेद खिलभाग विहित महालक्ष्मी का दिव्य समृद्धि सूक्त',
    deity: 'devi',
    category: 'suktam',
    author: 'Vedic Seers (Ananda & Kardama Rishis)',
    authorDevanagari: 'वैदिक ऋषि (आनन्द एवं कर्दम ऋषि)',
    totalVerses: 15,
    idealTime: 'Friday / Deepawali / Morning Puja',
    idealTimeDevanagari: 'शुक्रवार / दीपावली / प्रातः पूजन',
    significance:
      'The timeless Rigvedic hymn invoking Goddess Mahalakshmi as Shri, the golden goddess of spiritual and material abundance, beauty, health, and liberation from penury and misfortune.',
    significanceDevanagari:
      'ऋग्वेद की अत्यंत पवित्र ऋचाएं जो माँ महालक्ष्मी के स्वर्णिम स्वरूप का आह्वान करती हैं। दरिद्रता, दुर्भाग्य और ऋणमुक्ति तथा स्थिर सुख-समृद्धि हेतु इसका नित्य पाठ अचूक माना जाता है।',
    phalaShruti:
      'One who chants the fifteen verses of Shri Suktam daily with fire oblation attains enduring Lakshmi, cows, wealth, and supreme contentment.',
    phalaShrutiDevanagari:
      'यः शुचिः प्रयतो भूत्वा जुहुयादाज्यमन्वहम्। सूक्तं पञ्चदशर्चं च श्रीकामः सततं जपेत्॥',
    recommendedCounts: [1, 3, 16],
    verses: [
      {
        verseNumber: 1,
        verseType: 'mantra',
        sanskrit: 'ॐ हिरण्यवर्णां हरिणीं सुवर्णरजतस्रजाम्।\nचन्द्रां हिरण्मयीं लक्ष्मीं जातवेदो म आवह॥',
        transliteration:
          'Om Hiranyavarnam Harinim Suvarnarajatasrajam |\nChandram Hiranmayim Lakshmim Jatavedo Ma Aawaha ||',
        hindiMeaning:
          'हे अग्निदेव (जातवेदस)! आप मेरे लिए सुवर्ण के समान कान्ति वाली, हरिणी के सदृश चंचल एवं मनोहर, सोने और चाँदी के हार धारण करने वाली, चन्द्रमा के समान शीतल एवं आनन्दमयी हिरण्मयी महालक्ष्मी को यहाँ बुलाएं।',
        englishMeaning:
          'O Agni (all-knowing fire), summon for me Goddess Lakshmi, whose golden complexion radiates divine brilliance, who wears necklaces of gold and silver, who delights like the moon, and embodies supreme golden abundance.',
      },
      {
        verseNumber: 2,
        verseType: 'mantra',
        sanskrit: 'तां म आवह जातवेदो लक्ष्मीमनपगामिनीम्।\nयस्यां हिरण्यं विन्देयं गामश्वं पुरुषानहम्॥',
        transliteration:
          'Tam Ma Aawaha Jatavedo Lakshmimanapagaminim |\nYasyam Hiranyam Vindeyam Gamashwam Purushanaham ||',
        hindiMeaning:
          'हे अग्निदेव! आप मेरे लिए उन स्थिर रहने वाली भगवती लक्ष्मी का आह्वान करें, जिनके अनुग्रह से मैं कभी विचलित न होऊं और स्वर्ण, गौएं, अश्व तथा उत्तम परिजनों एवं सेवकों को प्राप्त करूँ।',
        englishMeaning:
          'Invoke for me, O Agni, that ever-abiding Lakshmi who never abandons Her devotees, by whose grace I may attain gold, kine, horses, noble family, and worthy associates.',
      },
      {
        verseNumber: 3,
        verseType: 'mantra',
        sanskrit: 'अश्वपूर्वां रथमध्यां हस्तिनादप्रबोधिनीम्।\nश्रियं देवीमुपह्वये श्रीर्मा देवी जुषताम्॥',
        transliteration:
          'Ashwapurvam Rathamadhyam Hastinadaprabodhinim |\nShriyam Devimupahwaye Shrirma Devi Jushatam ||',
        hindiMeaning:
          'जिनके आगे-आगे अश्व दौड़ते हैं, जो दिव्य रथ के मध्य में विराजती हैं, और हाथियों के गम्भीर नाद से जो जाग्रत होती हैं, उन साक्षात् श्री रूपी भगवती लक्ष्मी का मैं आह्वान करता हूँ; वे देवी मुझ पर प्रसन्न हों।',
        englishMeaning:
          'Preceded by divine steeds, seated in the center of the celestial chariot, awakened by the joyous trumpeting of noble elephants—I invoke that radiant Goddess Shri; may She bless and grace my life.',
      },
      {
        verseNumber: 4,
        verseType: 'mantra',
        sanskrit: 'कां सोस्मितां हिरण्यप्राकारामार्द्रां ज्वलन्तीं तृप्तां तर्पयन्तीम्।\nपद्मे स्थितां पद्मवर्णां तामिहोपह्वये श्रियम्॥',
        transliteration:
          'Kam Sosmitam Hiranyaprakaramardram Jwalantim Triptam Tarpayantim |\nPadme Sthitam Padmavarnam Tami Hopahwaye Shriyam ||',
        hindiMeaning:
          'जो अनिर्वचनीय हैं, मन्द-मन्द मुस्कुराती हैं, सुवर्ण के प्राचीर से घिरी हुई हैं, दयार्द्र हैं, तेजोमय रूप से प्रज्वलित हैं, स्वयं तृप्त रहकर भक्तों को तृप्त करने वाली हैं, कमल पर विराजमान और कमल सदृश कान्ति वाली हैं, उन भगवती श्री का मैं यहाँ आह्वान करता हूँ।',
        englishMeaning:
          'She of gentle divine smile, surrounded by ramparts of gold, bathed in compassion, luminously shining, completely fulfilled and fulfilling all seekers, seated on a lotus and glowing with the beauty of a lotus—that glorious Shri I invoke.',
      },
    ],
  },

  // 4. Sankat Mochan Hanuman Ashtak
  {
    id: 'sankat-mochan-hanuman-ashtak',
    slug: 'sankat-mochan-hanuman-ashtak',
    title: 'Sankat Mochan Hanuman Ashtak',
    titleDevanagari: 'संकट मोचन हनुमानाष्टक',
    subtitle: 'Eight Verses for Overcoming Calamities by Goswami Tulsidas',
    subtitleDevanagari: 'समस्त संकटों के निवारण हेतु गोस्वामी तुलसीदास कृत आठ दिव्य पद',
    deity: 'hanuman',
    category: 'stotram',
    author: 'Goswami Tulsidas',
    authorDevanagari: 'गोस्वामी तुलसीदास',
    totalVerses: 8,
    idealTime: 'Tuesday / Saturday / Times of distress',
    idealTimeDevanagari: 'मंगलवार / शनिवार / संकटकाल',
    significance:
      'Celebrated eight stanzas commemorating how Lord Hanuman resolved the direst challenges of Sugriva, Lakshmana, Sita, and the gods, concluding with the refrain asking which crisis He cannot solve.',
    significanceDevanagari:
      'गोस्वामी तुलसीदास विरचित आठ प्रसिद्ध पद, जिनमें स्मरण कराया गया है कि कैसे श्री हनुमान जी ने सुग्रीव, लक्ष्मण, सीता और देवताओं के बड़े-बड़े संकटों को क्षणभर में हर लिया था।',
    phalaShruti:
      'Whoever recites this Ashtak is instantly delivered from all perils, disease, and mental torment.',
    phalaShrutiDevanagari:
      'लाल देह लाली लसे अरु धरि लाल लंगूर। वज्र देह दानव दलन जय जय जय कपि सूर॥',
    recommendedCounts: [1, 3, 7, 11],
    verses: [
      {
        verseNumber: 1,
        verseType: 'stuti',
        sanskrit: 'बाल समय रबि भक्षि लियो तब तीनहुं लोक भयो अंधियारों।\nताहि सों त्रास भयो जग को यह संकट काहु सों जात न टारो॥\nदेवन आनि करी बिनती तब छांड़ि दियो रबि कष्ट निवारो।\nको नहिं जानत है जग में कपि संकटमोचन नाम तिहारो॥',
        transliteration:
          'Bala Samaya Rabi Bhakshi Liyo Taba Tinahun Loka Bhayo Andhiyaro |\nTahi Son Trasa Bhayo Jaga Ko Yaha Sankata Kahu Son Jata Na Taro ||\nDevana Aani Kari Binati Taba Chhandi Diyo Rabi Kashta Niwaro |\nKo Nahin Janata Hai Jaga Mein Kapi Sankatamochana Nama Tiharo ||',
        hindiMeaning:
          'बाल्यावस्था में जब आपने सूर्य को निगल लिया था, तब तीनों लोकों में घोर अन्धकार छा गया था। सम्पूर्ण संसार भयभीत हो उठा और कोई भी उस संकट को टालने में समर्थ न था। तब देवताओं ने आकर आपसे करबद्ध प्रार्थना की, तब आपने सूर्य को मुक्त कर जगत का संकट दूर किया। हे कपिश्रेष्ठ! इस संसार में ऐसा कौन है जो आपके संकटमोचन नाम को नहीं जानता?',
        englishMeaning:
          'In your childhood when you swallowed the blazing sun, all three worlds were plunged into deep darkness. The universe was seized with terror and none could avert this cosmic crisis. When the devas assembled and prayed to you, you released the sun and ended their sorrow. Who in this universe does not know your revered name as the Reliever of all Sorrows (Sankat Mochan)?',
      },
    ],
  },

  // 5. Aditya Hridaya Stotram
  {
    id: 'aditya-hridaya-stotram',
    slug: 'aditya-hridaya-stotram',
    title: 'Aditya Hridaya Stotram',
    titleDevanagari: 'आदित्य हृदय स्तोत्रम्',
    subtitle: 'Sacred Hymn of the Sun God imparted to Sri Rama by Sage Agastya',
    subtitleDevanagari: 'महर्षि अगस्त्य द्वारा भगवान श्रीराम को प्रदत्त अमोघ सूर्य स्तोत्र',
    deity: 'surya',
    category: 'stotram',
    author: 'Sage Agastya (Valmiki Ramayana)',
    authorDevanagari: 'महर्षि अगस्त्य (वाल्मीकि रामायण)',
    totalVerses: 12,
    idealTime: 'Sunday / Sunrise / Prior to crucial undertakings',
    idealTimeDevanagari: 'रविवार / सूर्योदय / महत्वपूर्ण कार्य से पूर्व',
    significance:
      'Imparted by Sage Agastya on the battlefield of Lanka to Lord Rama to vanquish Ravana. Bestows victory, destroys physical and mental lethargy, and enhances eye health and vitality.',
    significanceDevanagari:
      'लंका समरांगण में महर्षि अगस्त्य द्वारा भगवान श्रीराम को विजय प्राप्ति हेतु उपदेशित किया गया पावन स्तोत्र। इसके पाठ से समस्त शत्रुओं पर विजय, नेत्रज्योति, तेज तथा आरोग्य की प्राप्ति होती है।',
    phalaShruti:
      'One who worships the Sun God with this hymn never experiences sorrow, illness, or defeat in battle.',
    phalaShrutiDevanagari:
      'पूजयस्वैनमेकाग्रो देवदेवं जगत्पतिम्। एतत् त्रिगुणितं जप्त्वा युद्धेषु विजयिष्यसि॥',
    recommendedCounts: [1, 3],
    verses: [
      {
        verseNumber: 1,
        verseType: 'sloka',
        sanskrit: 'ततो युद्धपरिश्रान्तं समरे चिन्तया स्थितम्।\nरावणं चाग्रतो दृष्ट्वा युद्धाय समुपस्थितम्॥\nदैवतैश्च समागम्य द्रष्टुमभ्यागतो रणम्।\nउपागम्याब्रवीद्राममगस्त्यो भगवानृषिः॥',
        transliteration:
          'Tato Yuddhaparishrantam Samare Chintaya Sthitam |\nRavanam Chagrato Drishtwa Yuddhaya Samupasthitam ||\nDaivataishcha Samagamya Drashtumabhyagato Ranam |\nUpagamyabravidramamagastyo Bhagavanrishih ||',
        hindiMeaning:
          'तदनन्तर युद्ध से थके हुए और रणभूमि में चिन्तामग्न भगवान श्रीराम को देखकर, तथा रावण को पुनः युद्ध हेतु उपस्थित पाकर, देवताओं के साथ युद्ध देखने आए परम तेजस्वी भगवान अगस्त्य मुनि ने श्रीराम के पास जाकर कहा।',
        englishMeaning:
          'Then, seeing Sri Rama fatigued from battle and standing reflective upon the field, with Ravana advancing ready for combat, the revered sage Agastya, who had arrived with the celestials to witness the battle, approached Rama and spoke.',
      },
      {
        verseNumber: 2,
        verseType: 'sloka',
        sanskrit: 'राम राम महाबाहो शृणु गुह्यं सनातनम्।\nयेन सर्वानरीन् वत्स समरे विजयिष्यसि॥\nआदित्यहृदयं पुण्यं सर्वशत्रुविनाशनम्।\nजयावहं जपं नित्यमक्षयं परमं शिवम्॥',
        transliteration:
          'Rama Rama Mahabaho Shrinu Guhyam Sanatanam |\nYena Sarwanarin Vatsa Samare Vijayishyasi ||\nAdityahridayam Punyam Sarwashatruvinashanam |\nJayavaham Japam Nityamakshayam Paramam Shivam ||',
        hindiMeaning:
          'हे महाबाहो राम! सुनो, मैं तुम्हें वह सनातन गोपनीय रहस्य बतलाता हूँ, जिससे हे वत्स! तुम समर में समस्त शत्रुओं पर विजय प्राप्त करोगे। यह परम पवित्र आदित्य हृदय स्तोत्र समस्त शत्रुओं का नाश करने वाला, विजय प्रदाता, नित्य अक्षय और परम कल्याणकारी है।',
        englishMeaning:
          'O mighty-armed Rama! Listen to this eternal esoteric wisdom by which, dear child, you will triumph over every adversary in battle. This sacred Aditya Hridaya destroys all enemies, bestows victory, and is the perennial source of supreme auspiciousness.',
      },
    ],
  },

  // 6. Ganesh Chalisa & Aarti
  {
    id: 'ganesh-chalisa',
    slug: 'ganesh-chalisa',
    title: 'Shri Ganesh Chalisa',
    titleDevanagari: 'श्री गणेश चालीसा',
    subtitle: 'Forty Verses Dedicated to Lord Ganesha, Remover of Obstacles',
    subtitleDevanagari: 'विघ्नहर्ता भगवान श्रीगणेश की स्तुति में चालीस पावन चौपाइयां',
    deity: 'ganesha',
    category: 'chalisa',
    author: 'Traditional Bhakti Canon',
    authorDevanagari: 'पारम्परिक भक्ति परम्परा',
    totalVerses: 40,
    idealTime: 'Wednesday / Pratahkala / Ganesh Chaturthi',
    idealTimeDevanagari: 'बुधवार / प्रातःकाल / गणेश चतुर्थी',
    significance:
      'Invokes the beloved elephant-headed Lord Ganesha for removal of worldly and spiritual hindrances, granting intellectual acumen, prosperity, and peaceful beginnings for any new venture.',
    significanceDevanagari:
      'सर्वविघ्ननाशक, रिद्धि-सिद्धि के दाता भगवान गणेश का मंगलमय स्तवन। किसी भी नए कार्य के शुभारम्भ, बुद्धि-विवेक वृद्धि एवं पारिवारिक शान्ति हेतु इसका पाठ श्रेष्ठ है।',
    phalaShruti:
      'Reciting this Chalisa daily grants the grace of Ganesha and freedom from all hindrances.',
    phalaShrutiDevanagari:
      'नित नव मंगल गृह बसै लहै जगत सनमान। संबन्ध सबहिं सों सुधरै बुद्धि होय बलवान॥',
    recommendedCounts: [1, 3, 11],
    verses: [
      {
        verseNumber: 1,
        verseType: 'doha',
        sanskrit: 'जय गणपति सदगुण सदन कविवर बदन कृपाल।\nविघ्न हरण मंगल करण जय जय गिरिजालाल॥',
        transliteration:
          'Jaya Ganapati Sadguna Sadana Kavivara Badana Kripala |\nVighna Harana Mangala Karana Jaya Jaya Girijalala ||',
        hindiMeaning:
          'सद्गुणों के धाम, श्रेष्ठ कवियों के सदृश मुखमण्डल वाले, परम कृपालु भगवान गणपति की जय हो। विघ्नों का हरण करने वाले, मंगल का विधान करने वाले, माता पार्वती के नन्दन की जय-जयकार हो।',
        englishMeaning:
          'Victory to Lord Ganapati, the sanctuary of all virtues, gracious and eloquent, the dispeller of all obstacles and author of all auspiciousness! Glory, all glory to the beloved son of Girija!',
      },
    ],
  },

  // 7. Om Jai Jagdish Hare (Vishnu Aarti)
  {
    id: 'om-jai-jagdish-hare',
    slug: 'om-jai-jagdish-hare',
    title: 'Aarti Om Jai Jagdish Hare',
    titleDevanagari: 'आरती ॐ जय जगदीश हरे',
    subtitle: 'The Universal Hindu Devotional Aarti to Lord Vishnu',
    subtitleDevanagari: 'भगवान श्रीहरि विष्णु की सार्वभौमिक दैनिक संध्या आरती',
    deity: 'vishnu',
    category: 'aarti',
    author: 'Pandit Shardha Ram Phillauri',
    authorDevanagari: 'पण्डित श्रद्धाराम फिल्लौरी',
    totalVerses: 8,
    idealTime: 'Evening Sandhya Aarti / Daily Puja Conclusion',
    idealTimeDevanagari: 'सायं सन्ध्या आरती / नित्य देवपूजन उपरान्त',
    significance:
      'The quintessential daily Hindu evening prayer sung in millions of households across the globe, surrendering all burdens to the Sustainer of the cosmos.',
    significanceDevanagari:
      'सम्पूर्ण भारतवर्ष एवं विश्वभर के हिन्दू परिवारों में सायं सन्ध्या एवं पूजा के समापन पर गाई जाने वाली अत्यंत भावपूर्ण एवं लोकप्रिय आरती।',
    phalaShruti:
      'Singing this Aarti with pure devotion dispels grief, poverty, and anxiety, bringing peace and divine solace.',
    phalaShrutiDevanagari:
      'तन मन धन सब है तेरा, तेरा तुझको अर्पण क्या लागे मेरा। इस समर्पण भाव से गाने पर परम शान्ति एवं मुक्ति प्राप्त होती है।',
    recommendedCounts: [1],
    verses: [
      {
        verseNumber: 1,
        verseType: 'aarti',
        sanskrit: 'ॐ जय जगदीश हरे, स्वामी जय जगदीश हरे।\nभक्त जनों के संकट, दास जनों के संकट,\nक्षण में दूर करे॥ ॐ जय जगदीश हरे॥',
        transliteration:
          'Om Jaya Jagadisha Hare, Swami Jaya Jagadisha Hare |\nBhakta Janon Ke Sankata, Dasa Janon Ke Sankata,\nKshana Mein Dura Kare || Om Jaya Jagadisha Hare ||',
        hindiMeaning:
          'हे सम्पूर्ण ब्रह्माण्ड के स्वामी जगदीश प्रभु! आपकी जय हो। आप अपने अनन्य भक्तों और सेवकों के समस्त संकटों और पीड़ाओं को क्षणभर में दूर कर देते हैं। हे जगदीश स्वामी! आपकी जय हो।',
        englishMeaning:
          'Om, victory to You, Lord of the Universe (Jagadisha)! In a single fleeting moment You dissipate the sorrows, distress, and perils of Your devoted seekers. Victory to You, O Lord of the cosmos!',
      },
      {
        verseNumber: 2,
        verseType: 'aarti',
        sanskrit: 'जो ध्यावै फल पावै, दुख बिनसे मन का।\nसुख सम्पत्ति घर आवै, कष्ट मिटै तन का॥ ॐ जय जगदीश हरे॥',
        transliteration:
          'Jo Dhyawai Phala Pawai, Dukha Binase Mana Ka |\nSukha Sampatti Ghara Aawai, Kashta Mitai Tana Ka || Om Jaya Jagadisha Hare ||',
        hindiMeaning:
          'जो आपका ध्यान करता है, वह अभीष्ट फल प्राप्त करता है और उसके मन के समस्त दुःख नष्ट हो जाते हैं। उसके घर में सुख-समृद्धि का वास होता है और शारीरिक कष्ट दूर हो जाते हैं।',
        englishMeaning:
          'Whosoever meditates upon You attains the desired fruit, and the sorrows of their heart dissolve away. Peace, prosperity, and joy grace their home, and physical afflictions vanish.',
      },
    ],
  },

  // 8. Daily Pratahsmarana & Shanti Slokas
  {
    id: 'pratahsmarana-slokas',
    slug: 'pratahsmarana-slokas',
    title: 'Daily Morning Pratahsmarana Slokas',
    titleDevanagari: 'दैनिक प्रातःस्मरण मन्त्र',
    subtitle: 'Awakening, Earth-Forgiveness, and Morning Peace Invocations',
    subtitleDevanagari: 'कर-दर्शन, भूमिवन्दना, स्नान एवं प्रातः स्मरण के नित्य श्लोक',
    deity: 'daily',
    category: 'nitya',
    author: 'Vedic Tradition',
    authorDevanagari: 'वैदिक परम्परा',
    totalVerses: 5,
    idealTime: 'Immediately upon awakening (Brahma Muhurta)',
    idealTimeDevanagari: 'प्रातः निद्रा त्याग के तत्काल उपरान्त (ब्रह्ममुहूर्त)',
    significance:
      'The sacred Vedic daily habit of viewing one palms upon waking, seeking forgiveness from Mother Earth before stepping on Her, and invoking sacred rivers during morning bath.',
    significanceDevanagari:
      'प्रातःकाल शय्या त्यागते ही हथेलियों के दर्शन, पृथ्वी माता से क्षमा याचना एवं स्नान के समय तीर्थ नदियों का पावन स्मरण करने के सनातन नित्य नियम।',
    phalaShruti:
      'Attunes the mind to gratitude, humility, and positive energy from the first moment of dawn.',
    phalaShrutiDevanagari:
      'दिनभर की दिनचर्या में सात्त्विकता, एकाग्रता, धर्म एवं सकारात्मक ऊर्जा की अनुभूति होती है।',
    recommendedCounts: [1],
    verses: [
      {
        verseNumber: 1,
        verseType: 'sloka',
        sanskrit: 'कराग्रे वसते लक्ष्मीः करमध्ये सरस्वती।\nकरमूले तु गोविन्दः प्रभाते करदर्शनम्॥',
        transliteration:
          'Karagre Vasate Lakshmīh Karamadhye Saraswati |\nKaramule Tu Govindah Prabhate Karadarshanam ||',
        hindiMeaning:
          'हथेली के अग्रभाग में माँ लक्ष्मी, मध्य में माँ सरस्वती और मूल भाग में भगवान गोविन्द (श्रीकृष्ण) का वास है। अतः प्रातःकाल उठते ही अपनी दोनों हथेलियों का दर्शन करना चाहिए।',
        englishMeaning:
          'At the tip of the hand resides Goddess Lakshmi; in the center dwells Goddess Saraswati; at the base rests Lord Govinda Himself. Therefore, upon awakening in the morning, one should gaze upon one palms.',
      },
      {
        verseNumber: 2,
        verseType: 'sloka',
        sanskrit: 'समुद्रवसने देवि पर्वतस्तनमण्डले।\nविष्णुपत्नि नमस्तुभ्यं पादस्पर्शं क्षमस्व मे॥',
        transliteration:
          'Samudravasane Devi Parvatastanamandale |\nVishnupatni Namastubhyam Padasparsham Kshamaswa Me ||',
        hindiMeaning:
          'समुद्र रूपी वस्त्र धारण करने वाली, पर्वतों रूपी वक्षस्थल वाली, भगवान विष्णु की अर्धांगिनी हे पृथ्वी देवी! मैं आपको नमन करता हूँ। मेरे पैरों के स्पर्श के लिए आप कृपया मुझे क्षमा करें।',
        englishMeaning:
          'O Mother Earth, who wears the cosmic oceans as Your royal garment, whose bosom is adorned by sacred mountain ranges, consort of Lord Vishnu—I bow to You in reverence. Graciously forgive me for touching You with my feet.',
      },
      {
        verseNumber: 3,
        verseType: 'sloka',
        sanskrit: 'गङ्गे च यमुने चैव गोदावरि सरस्वति।\nनर्मदे सिन्धु कावेरि जलेऽस्मिन् सन्निधिं कुरु॥',
        transliteration:
          'Gange Cha Yamune Chaiva Godawari Saraswati |\nNarmade Sindhu Kaweri Jalesmin Sannidhim Kuru ||',
        hindiMeaning:
          'हे गङ्गा, यमुना, गोदावरी, सरस्वती, नर्मदा, सिन्धु और कावेरी! आप सभी पवित्र नदियां कृपा करके मेरे इस स्नान के जल में उपस्थित होकर इसे पावन बनाएं।',
        englishMeaning:
          'O sacred rivers Ganga, Yamuna, Godavari, Saraswati, Narmada, Sindhu, and Kaveri! Graciously manifest your divine essence in this water and sanctify this bath.',
      },
    ],
  },
];
