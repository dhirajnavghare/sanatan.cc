import * as fs from 'fs';
import * as path from 'path';
import { PrayerRecord, PrayerVerse } from '../../app/lib/prayers/types';
import { PRAYERS_DATA as CURRENT_DATA } from '../../app/lib/prayers/data';

// 1. Hanuman Chalisa (43 verses complete)
const hanumanChalisa = CURRENT_DATA.find(p => p.id === 'hanuman-chalisa')!;

// 2. Shiv Tandav Stotram (15 verses complete)
const shivTandavExisting = CURRENT_DATA.find(p => p.id === 'shiv-tandav-stotram')!;
const shivTandavVerses: PrayerVerse[] = [
  shivTandavExisting.verses[0],
  shivTandavExisting.verses[1],
  shivTandavExisting.verses[2],
  shivTandavExisting.verses[3],
  shivTandavExisting.verses[4],
  {
    verseNumber: 6,
    verseType: 'sloka',
    sanskrit: 'ललाटचत्वरज्वलद्धनञ्जयस्फुलिङ्गभा-\nनिपीतपञ्चसायकं नमन्निलिम्पनायकम्।\nसुधामयूखलेखया विराजमानशेखरं\nमहाकपालिसम्पदेशिरोजटालमस्तु नः॥',
    transliteration: 'Lalatachatwarajwaladdhananjayasphulingabha-\nNipitapanchasayakam Namannilimpanayakam |\nSudhamayukhalekhaya Virajamanashekharam\nMahakapalisampadeshirojatalamastu Nah ||',
    hindiMeaning: 'जिनके ललाट रूपी प्रांगण में प्रज्वलित अग्नि की ज्वालाओं ने कामदेव को भस्म कर दिया, जिन्हें इन्द्रादि देवगण नमन करते हैं, जिनके मस्तक पर चन्द्रकला सुशोभित है, वे जटाधारी भगवान शिव हमें परम सम्पदा प्रदान करें।',
    englishMeaning: 'May the matted locks of Lord Shiva, from whose forehead courtyard sparks of fire consumed Kamadeva, who is saluted by Indra and the celestials, and whose crest bears the crescent moon, bestow upon us supreme spiritual treasure.'
  },
  {
    verseNumber: 7,
    verseType: 'sloka',
    sanskrit: 'करालभालपट्टिकाधगद्धगद्धगज्ज्वल-\nद्धनञ्जयाहुतीकृतप्रचण्डपञ्चसायके।\nधराधरेन्द्रनन्दिनीकुचाग्रचित्रपत्रक-\nप्रकल्पनैकशिल्पिनि त्रिलोचने रतिर्मम॥',
    transliteration: 'Karalabhalapattikadhagaddhagaddhagajjwala-\nDdhananjayāhutikritaprachandapanchasayake |\nDharadharendranandinikuchagrachitrapatraka-\nPrakalpanaikashilpini Trilocane Ratirmama ||',
    hindiMeaning: 'जिनके विकराल ललाट पट्ट पर धक-धक करती प्रज्वलित अग्नि में कामदेव की आहुति हो गई, तथा जो गिरिराज किशोरी माँ पार्वती के शृंगार हेतु एकमात्र सिद्ध शिल्पी हैं, उन त्रिनेत्रधारी भगवान शंकर में मेरा अनन्य अनुराग रहे।',
    englishMeaning: 'May my love be centered in that Three-Eyed Lord, upon the terrible surface of whose forehead fire devoured Kamadeva, and who is the master artist painting the auspicious designs on Goddess Parvati.'
  },
  {
    verseNumber: 8,
    verseType: 'sloka',
    sanskrit: 'नवीनमेघमण्डलीनिरुद्धदुर्धरस्फुरत्-\nकुहूनिशीथिनीतमःप्रबन्धबद्धकन्धरः।\nनिलिम्पनिर्झरीधरस्तनोतु कृत्तिसिन्धुरः\nकलानिधानबन्धुरः श्रियं जगद्धुरन्धरः॥',
    transliteration: 'Navinameghamandaliniruddhadurdharasphurat-\nKuhunishithinitamahprabandhabaddhakandharah |\nNilimpanirjharidharastanotu Krittisindhurah\nKalanidhanabandhurah Shriyam Jagaddhurandharah ||',
    hindiMeaning: 'नवीन मेघमालाओं के समान घने और अमावस्या की अर्धरात्रि के अन्धकार सदृश नील वर्ण कण्ठ वाले, देवनदी गंगा को धारण करने वाले, गजचर्म परिधारी, चन्द्रमा से सुशोभित, सम्पूर्ण जगत् के भार को वहन करने वाले भगवान शिव हमें ऐश्वर्य प्रदान करें।',
    englishMeaning: 'Whose throat shines with the darkness of dense new clouds and midnight on Amavasya, who holds celestial Ganga, wears the elephant skin, is crowned by the crescent moon, and sustains the universe—may He grant us eternal radiance.'
  },
  {
    verseNumber: 9,
    verseType: 'sloka',
    sanskrit: 'प्रफुल्लनीलपङ्कजप्रपञ्चकालिमप्रभा-\nवलम्बिकण्ठकन्दलीरुचिप्रबद्धकन्धरम्।\nस्मरच्छिदं पुरच्छिदं भवच्छिदं मखच्छिदं\nगजच्छिदान्धकच्छिदं तमन्तकच्छिदं भजे॥',
    transliteration: 'Praphullanilapankajaprapanchakalimaprabha-\nValambikanthakandaliruchiprabaddhakandharam |\nSmarachchhidam Purachchhidam Bhavachchhidam Makhachchhidam\nGajachchhidandhakachchhidam Tamantakachchhidam Bhaje ||',
    hindiMeaning: 'खिले हुए नीलकमल के सदृश कालिमायुक्त प्रभा से सुशोभित कण्ठ वाले, कामदेव, त्रिपुरासुर, संसार-बन्धन, दक्ष-यज्ञ, गजासुर और अन्धकासुर का संहार करने वाले, तथा यमराज का भी दलन करने वाले भगवान शिव का मैं भजन करता हूँ।',
    englishMeaning: 'I worship that Lord Shiva whose neck possesses the lustrous dark hue of a blooming blue lotus, who destroyed Kamadeva, shattered Tripura, severs worldly bondage, ruined Daksha’s sacrifice, slew Gajasura and Andhaka, and humbled Yamaraja.'
  },
  {
    verseNumber: 10,
    verseType: 'sloka',
    sanskrit: 'अखर्वसर्वमङ्गलाकलाकदम्बमञ्जरी-\nरसप्रवाहमाधुरीविजृम्भणामधुव्रतम्।\nस्मरान्तकं पुरान्तकं भवान्तकं मखान्तकं\nगजान्तकान्धकान्तकं तमन्तकान्तकं भजे॥',
    transliteration: 'Akharvasarwamangalakalakadambamanjari-\nRasapravahamadhurivijrimbhanamadhuvratam |\nSmarantakam Purantakam Bhavantakam Makhantakam\nGajantakandhakantakam Tamantakantakam Bhaje ||',
    hindiMeaning: 'जो सर्वमंगला माता पार्वती के कला रूपी कदम्ब पुष्पों के मधुर रस प्रवाह का आस्वादन करने वाले भौंरे के समान हैं, कामदेव, त्रिपुरासुर, जन्म-मरण बन्धन, मख, गजासुर, अन्धकासुर और यमराज का विनाश करने वाले हैं, उन भगवान शिव का मैं निरन्तर स्तवन करता हूँ।',
    englishMeaning: 'Who is the divine honeybee drinking the sweet flowing nectar of the blossoming kadamba blossoms of Goddess Parvati’s arts, the vanquisher of Kama, Tripura, Samsara, Daksha’s sacrifice, Gajasura, Andhaka, and Death itself—Him I adore.'
  },
  {
    verseNumber: 11,
    verseType: 'sloka',
    sanskrit: 'जयत्वदभ्रविभ्रमभ्रमद्भुजङ्गमश्वस-\nद्विनिर्गमत्क्रमस्फुरत्करालभालहव्यवाट्।\nधिमिद्धिमिद्धिमिध्वनन्मृदङ्गतुङ्गमङ्गल-\nध्वनिक्रमप्रवर्तितप्रचण्डताण्डवः शिवः॥',
    transliteration: 'Jayatvadabhravibhramabhramadbhujangamashwasa-\nDwinirgamattkramasphuratkaralabhalahavyavat |\nDhimiddhimiddhimidhwananmridangatungamangala-\nDhwanikramapravartitaprachandatandavah Shivah ||',
    hindiMeaning: 'आकाश में वेग से चक्कर काटते हुए सर्पों के फुफकारने से जिनके भयानक ललाट की अग्नि धधक रही है, तथा मृदंग की धिम-धिम की मंगलकारी गम्भीर ध्वनि के ताल पर जिनका प्रचण्ड ताण्डव नृत्य हो रहा है, उन देवाधिदेव शिव की जय हो।',
    englishMeaning: 'Victorious is Lord Shiva, whose forehead fire blazes terrifyingly fanned by the hissing of revolving serpents, dancing His fierce, cosmic Tandava to the profound, auspicious rhythmic resonance of the mridangam!'
  },
  {
    verseNumber: 12,
    verseType: 'sloka',
    sanskrit: 'दृषद्विचित्रतल्पयोर्भुजङ्गमौक्तिकस्रजोर-\nगरिष्ठरत्नलोष्ठयोः सुहृद्विपक्षपक्षयोः।\nतृणारविन्दचक्षुषोः प्रजामहीमहेन्द्रयोः\nसमप्रवृत्तिकः कदा सदाशिवं भजाम्यहम्॥',
    transliteration: 'Drishadvichitratelpayorbhujangamauktikasrajor-\nGarishtaratnaloshtayoh Suhridwipakshapakshayoh |\nTrinaravindachakshushoh Prajamahimahendrayoh\nSamapravrittikah Kada Sadashivam Bhajamyaham ||',
    hindiMeaning: 'कठोर पाषाण अथवा कोमल शय्या में, सर्प अथवा मोतियों की माला में, बहुमूल्य रत्न अथवा मिट्टी के ढेले में, मित्र अथवा शत्रु में, तिनके अथवा कमल-नयनों में, साधारण प्रजा अथवा चक्रवर्ती सम्राट में समभाव रखता हुआ मैं कब सदाशिव का भजन करूँगा?',
    englishMeaning: 'When will I view alike a hard stone and a soft bed, a serpent and a pearl garland, a priceless gem and a lump of clay, a friend and a foe, a blade of grass and a lotus eye, a commoner and an emperor, and worship Sadashiva with equanimity?'
  },
  {
    verseNumber: 13,
    verseType: 'sloka',
    sanskrit: 'कदा निलिम्पनिर्झरीनिकुञ्जकोटरे वसन्\nविमुक्तदुर्मतिः सदा शिरःस्थमञ्जलिं वहन्।\nविमुक्तलोललोचनो ललामभाललग्नकः\nशिवेति मन्त्रमुच्चरन् कदा सुखी भवाम्यहम्॥',
    transliteration: 'Kada Nilimpanirjharinikunjakotare Vasan\nVimuktadurmatih Sada Shirahsthamanjalim Vahan |\nVimuktalolalochano Lalamabhalalagnakah\nShiveti Mantramuchcharan Kada Sukhi Bhavamyaham ||',
    hindiMeaning: 'कब मैं देवनदी गंगा के तट पर लताकुंजों में वास करता हुआ, समस्त दुर्बुद्धि से मुक्त होकर, सिर पर हाथ जोड़े, चंचल नेत्रों के प्रपंच से विरक्त होकर, केवल "शिव" मन्त्र का उच्चारण करते हुए परम आनन्द को प्राप्त करूँगा?',
    englishMeaning: 'Living in the forest groves along the celestial Ganga, freed from deluded thoughts, hands folded upon my head in devotion, contemplating upon that radiant forehead, chanting the holy mantra "Shiva"—when will I attain that supreme peace?'
  },
  {
    verseNumber: 14,
    verseType: 'sloka',
    sanskrit: 'इमं हि नित्यमेवमुक्तमुत्तमोत्तमं स्तवं\nपठन्स्मरन्ब्रुवन्नरो विशुद्धिमेति संततम्।\nहरे गुरौ सुभक्तिमाशु याति नान्यथा गतिं\nविमोहनं हि देहिनां सुशङ्करस्य चिन्तनम्॥',
    transliteration: 'Imam Hi Nityamevamuktamuttamottamam Stavam\nPathansmaranbruvannaro Vishuddhineti Santatam |\nHare Gurau Subhaktimashu Yati Nanyatha Gatim\nVimohanam Hi Dehinam Sushankarasya Chintanam ||',
    hindiMeaning: 'इस प्रकार कहे गए इस सर्वोत्तम स्तोत्र का जो मनुष्य नित्य पाठ, स्मरण अथवा उच्चारण करता है, वह निरन्तर परम शुद्धि को प्राप्त होता है। वह जगतगुरु भगवान शंकर में शीघ्र ही अविचल भक्ति प्राप्त करता है और कभी अधोगति को नहीं जाता।',
    englishMeaning: 'Whosoever regularly recites, meditates upon, and proclaims this sublime hymn attains continuous inner purity. They swiftly attain unwavering devotion to Lord Shiva, the universal Guru, escaping rebirth; for meditation upon auspicious Shiva dispels all worldly delusion.'
  },
  {
    verseNumber: 15,
    verseType: 'sloka',
    sanskrit: 'पूजावसानसमये दशवक्त्रगीतं\nयः शम्भुपूजनपरं पठति प्रदोषे।\nतस्य स्थिरां रथगजेन्द्रतुरङ्गयुक्तां\nलक्ष्मीं सदैव सुमुखीं प्रददाति शम्भुः॥',
    transliteration: 'Pujavasanasamaye Dashavaktragitam\nYah Shambhupujanaparam Pathati Pradoshe |\nTasya Sthiram Rathagajendraturangayuktam\nLakshmim Sadaiva Sumukhim Pradadati Shambhuh ||',
    hindiMeaning: 'प्रदोष काल में शिव पूजन के उपरान्त जो मनुष्य दशमुख रावण द्वारा रचित इस स्तोत्र का पाठ करता है, भगवान शम्भु उसे रथ, हाथी और घोड़ों से सम्पन्न स्थिर लक्ष्मी तथा सदा अनुकूल रहने वाली समृद्धि प्रदान करते हैं।',
    englishMeaning: 'Whoever recites this hymn composed by the ten-headed Ravana after the worship of Lord Shiva during Pradosha dusk—to that devotee Lord Shambhu grants enduring prosperity accompanied by chariots, elephants, horses, and favorable fortune forever.'
  }
];

const shivTandavStotram: PrayerRecord = {
  ...shivTandavExisting,
  totalVerses: 15,
  verses: shivTandavVerses
};

// 3. Rigvedic Shri Suktam (16 verses complete: 15 riks + phalasruti)
const shriSuktamExisting = CURRENT_DATA.find(p => p.id === 'shri-suktam')!;
const shriSuktamVerses: PrayerVerse[] = [
  shriSuktamExisting.verses[0],
  shriSuktamExisting.verses[1],
  shriSuktamExisting.verses[2],
  shriSuktamExisting.verses[3],
  {
    verseNumber: 5,
    verseType: 'mantra',
    sanskrit: 'चन्द्रां प्रभासां यशसा ज्वलन्तीं श्रियं लोके देवजुष्टामुदाराम्।\nतां पद्मिनीमीं शरणमहं प्रपद्येऽलक्ष्मीर्मे नश्यतां त्वां वृणे॥',
    transliteration: 'Chandram Prabhasam Yashasa Jwalantim Shriyam Loke Devajushtamudaram |\nTam Padminimim Sharanamaham Prapadye Alakshmirme Nashyatam Twam Vrine ||',
    hindiMeaning: 'जो चन्द्रमा के सदृश आह्लादकारिणी, प्रकाशमयी, अपने यश से देदीप्यमान, सम्पूर्ण लोकों में देवपूजिता और परम उदार हैं, उन कमलनयनी भगवती लक्ष्मी की मैं शरण लेता हूँ। मेरी दरिद्रता का नाश हो; मैं आपका वरण करता हूँ।',
    englishMeaning: 'I take refuge in that benevolent Goddess Shri, delightful like the moon, brilliantly shining with glory, adored by the gods in all worlds, seated upon a lotus. May my poverty and misery be destroyed; I seek refuge in You.'
  },
  {
    verseNumber: 6,
    verseType: 'mantra',
    sanskrit: 'आदित्यवर्णे तपसोऽधिजातो वनस्पतिस्तव वृक्षोऽथ बिल्वः।\nतस्य फलानि तपसा नुदन्तु मायान्तरायाश्च बाह्या अलक्ष्मीः॥',
    transliteration: 'Adityavarne Tapasodhijato Vanaspatistava Vrikshotha Bilvah |\nTasya Phalani Tapasa Nudantu Mayantarayashcha Bahya Alakshmih ||',
    hindiMeaning: 'हे सूर्य के समान कान्ति वाली देवि! आपके तप से वनस्पतियों में श्रेष्ठ बिल्व वृक्ष उत्पन्न हुआ। उस बिल्व वृक्ष के फल आपके अनुग्रह से हमारे आन्तरिक अज्ञान तथा बाह्य दरिद्रता व अमंगल को दूर करें।',
    englishMeaning: 'O Sun-colored Goddess! Born of Your austerity is the monarch of trees, the Bilva. May its fruits, by Your grace, dispel the internal ignorance of our minds and all external afflictions and poverty.'
  },
  {
    verseNumber: 7,
    verseType: 'mantra',
    sanskrit: 'उपैतु मां देवसखः कीर्तिश्च मणिना सह।\nप्रादुर्भूतोऽस्मि राष्ट्रेऽस्मिन् कीर्तिमृद्धिं ददातु मे॥',
    transliteration: 'Upaitu Mam Devasakhah Kirtishcha Manina Saha |\nPradurbhutosmi Rashtresmin Kirtimriddhim Dadatu Me ||',
    hindiMeaning: 'देवताओं के सखा कुबेर और यश अपने मणियों सहित मुझे प्राप्त हों। मैं इस राष्ट्र में उत्पन्न हुआ हूँ; हे देवि! आप मुझे कीर्ति और समृद्धि प्रदान करें।',
    englishMeaning: 'May Kubera, the companion of celestials, and Fame approach me with gems and riches. I am born in this land; may Goddess Lakshmi endow me with exalted renown and boundless prosperity.'
  },
  {
    verseNumber: 8,
    verseType: 'mantra',
    sanskrit: 'क्षुत्पिपासामलां ज्येष्ठामलक्ष्मीं नाशयाम्यहम्।\nअभूतिमसमृद्धिं च सर्वान् निर्णुद मे गृहात्॥',
    transliteration: 'Kshutpipasamalam Jyeshthamalakshmim Nashayamyaham |\nAbhutimasamriddhim Cha Sarwan Nirnuda Me Grihat ||',
    hindiMeaning: 'भूख-प्यास से पीड़ित करने वाली तथा मलिन अलक्ष्मी (ज्येष्ठा) का मैं नाश करता हूँ। हे देवि! दरिद्रता, अभाव तथा असमृद्धि को आप मेरे गृह से सर्वथा निष्कासित कर दें।',
    englishMeaning: 'I destroy the misfortune of Alakshmi (the elder sister of Lakshmi), who manifests as hunger, thirst, and filth. O Goddess, banish all lack of abundance and scarcity forever from my dwelling!'
  },
  {
    verseNumber: 9,
    verseType: 'mantra',
    sanskrit: 'गन्धद्वारां दुराधर्षां नित्यपुष्टां करीषिणीम्।\nईश्वरीं सर्वभूतानां तामिहोपह्वये श्रियम्॥',
    transliteration: 'Gandhadwaram Duradharsham Nityapushtam Karishinim |\nIshwarim Sarwabhutanam Tami Hopahwaye Shriyam ||',
    hindiMeaning: 'जो सुगन्ध से पहचानी जाने वाली हैं, किसी से पराजित न होने वाली, नित्य परिपुष्ट, गोधन-समृद्धि की स्वामिनी तथा समस्त प्राणियों की अधीश्वरी हैं, उन भगवती श्री का मैं यहाँ आह्वान करता हूँ।',
    englishMeaning: 'She who is accessible through divine fragrance, invincible, ever-nourished, presiding over agricultural and pastoral wealth, the Supreme Sovereign over all living beings—that Goddess Shri I invoke.'
  },
  {
    verseNumber: 10,
    verseType: 'mantra',
    sanskrit: 'मनसः काममाकूतिं वाचः सत्यमशीमहि।\nपशूनां रूपमन्नस्य मयि श्रीः श्रयतां यशः॥',
    transliteration: 'Manasah Kamamakutim Vachah Satyamashimahi |\nPashunam Rupamannasya Mayi Shrih Shrayatam Yashah ||',
    hindiMeaning: 'हमारे मन की समस्त सात्त्विक कामनाओं और संकल्पों को, तथा वाणी की सत्यता को हम सिद्ध करें। पशु-धन, अन्न-सम्पदा तथा यश के रूप में महालक्ष्मी मुझमें नित्य निवास करें।',
    englishMeaning: 'May we attain the righteous desires of our hearts, the ultimate truth of speech, abundant cattle, diverse grains, nourishment, and honor—may Goddess Shri dwell perpetually within me.'
  },
  {
    verseNumber: 11,
    verseType: 'mantra',
    sanskrit: 'कर्दमेन प्रजाभूता मयि सम्भव कर्दम।\nश्रियं वासय मे कुले मातरं पद्ममालिनीम्॥',
    transliteration: 'Kardamena Prajabhuta Mayi Sambhava Kardama |\nShriyam Vasaya Me Kule Mataram Padmamalinim ||',
    hindiMeaning: 'हे कर्दम ऋषि! आप माँ लक्ष्मी के पुत्र रूप में अवतरित हुए हैं, अतः आप मेरे कुल में निवास करें और कमलों की माला धारण करने वाली माता महालक्ष्मी को मेरे वंश में सदा के लिए प्रतिष्ठित करें।',
    englishMeaning: 'O sage Kardama, through whom Mother Lakshmi manifests as offspring, dwell graciously with me and establish Mother Shri, crowned with lotus garlands, in my lineage for all generations.'
  },
  {
    verseNumber: 12,
    verseType: 'mantra',
    sanskrit: 'आपः सृजन्तु स्निग्धानि चिक्लीत वस मे गृहे।\nनि च देवीं मातरं श्रियं वासय मे कुले॥',
    transliteration: 'Apah Srijantu Snigdhani Chiklita Vasa Me Grihe |\nNi Cha Devim Mataram Shriyam Vasaya Me Kule ||',
    hindiMeaning: 'जलदेवता स्नेहपूर्ण स्निग्ध पदार्थों का सृजन करें। हे चिक्लीत (लक्ष्मीपुत्र)! आप मेरे घर में वास करें और अपनी माता दिव्य देवी लक्ष्मी को मेरे परिवार में स्थायी रूप से स्थापित करें।',
    englishMeaning: 'May the sacred waters yield auspicious nourishers. O Chiklita (divine son of Lakshmi), dwell in my abode and cause the divine Mother Shri to reside eternally in my family.'
  },
  {
    verseNumber: 13,
    verseType: 'mantra',
    sanskrit: 'आर्द्रां पुष्करिणीं पुष्टिं पिङ्गलां पद्ममालिनीम्।\nचन्द्रां हिरण्मयीं लक्ष्मीं जातवेदो म आवह॥',
    transliteration: 'Ardram Pushkarinim Pushtim Pingalam Padmamalinim |\nChandram Hiranmayim Lakshmim Jatavedo Ma Aavaha ||',
    hindiMeaning: 'हे अग्निदेव (जातवेदा)! जो दया से आर्द्र हैं, कमल-सरोवरों में विहार करने वाली, पुष्टि स्वरूपा, पीतवर्णा, कमलमाला धारिणी, चन्द्रमा के समान प्रकाशमयी और सुवर्णमयी हैं, उन महालक्ष्मी को मेरे लिए यहाँ ले आइए।',
    englishMeaning: 'O Jataveda (Agni)! Summon unto me that Lakshmi who is moist with mercy, seated on lotuses, the embodiment of sustenance, golden-hued, garlanded with lotuses, radiant like the moon, and made of gold.'
  },
  {
    verseNumber: 14,
    verseType: 'mantra',
    sanskrit: 'आर्द्रां यः करिणीं यष्टिं सुवर्णां हेममालिनीम्।\nसूर्यां हिरण्मयीं लक्ष्मीं जातवेदो म आवह॥',
    transliteration: 'Ardram Yah Karinim Yashtim Suvarnam Hemamalinim |\nSuryam Hiranmayim Lakshmim Jatavedo Ma Aavaha ||',
    hindiMeaning: 'हे अग्निदेव! जो भक्तों पर दया बरसाने वाली, साम्राज्य रूपी यष्टि (दण्ड) को धारण कराने वाली, सुवर्णमयी, स्वर्णहारों से अलंकृत, सूर्य के समान तेजस्विनी और हिरण्मयी हैं, उन महालक्ष्मी को मेरे लिए यहाँ ले आइए।',
    englishMeaning: 'O Agni, invoke for me that glorious Lakshmi who bestows the staff of imperial authority, who is golden, adorned with golden ornaments, radiant like the sun, and effulgent with wealth.'
  },
  {
    verseNumber: 15,
    verseType: 'mantra',
    sanskrit: 'तां म आवह जातवेदो लक्ष्मीमनपगामिनीम्।\nयस्यां हिरण्यं प्रभूतं गावो दास्योऽश्वान्विन्देयं पुरुषानहम्॥',
    transliteration: 'Tam Ma Aavaha Jatavedo Lakshmimanapagaminim |\nYasyam Hiranyam Prabhootam Gavo Dasyoshwan Vindeyam Purushanaham ||',
    hindiMeaning: 'हे जातवेदा अग्निदेव! आप मेरे लिए उन कभी न नष्ट होने वाली स्थिर लक्ष्मी को ले आइए, जिनके अनुग्रह से मैं प्रचुर सुवर्ण, गौएं, सेवक-सेविकाएं, अश्व और उत्तम परिजनों को प्राप्त करूँ।',
    englishMeaning: 'O Jataveda, bring to me that ever-abiding Lakshmi who never departs, through whom I may obtain boundless gold, cattle, attendants, horses, and noble kin.'
  },
  {
    verseNumber: 16,
    verseType: 'sloka',
    sanskrit: 'यः शुचिः प्रयतो भूत्वा जुहुयादाज्यमन्वहम्।\nसूक्तं पञ्चदशर्चं च श्रीकामः सततं जपेत्॥',
    transliteration: 'Yah Shuchih Prayato Bhutwa Juhuyadajyamanwaham |\nSuktam Panchadasharcham Cha Shrikamah Satatam Japet ||',
    hindiMeaning: 'जो मनुष्य पवित्र और संयमित होकर प्रतिदिन घृत की आहुति देता है और श्री की कामना रखते हुए इस पन्द्रह ऋचाओं वाले श्रीसूक्त का निरन्तर जप करता है, वह समस्त ऐश्वर्य और मोक्ष को प्राप्त करता है।',
    englishMeaning: 'One who, remaining pure and disciplined, offers daily oblations of clarified butter and continuously recites this sacred fifteen-verse hymn desirous of prosperity, attains enduring abundance and divine blessings.'
  }
];

const shriSuktam: PrayerRecord = {
  ...shriSuktamExisting,
  totalVerses: 16,
  verses: shriSuktamVerses
};

// 4. Sankat Mochan Hanuman Ashtak (9 verses complete: 8 stanzas + 1 Doha)
const sankatMochanExisting = CURRENT_DATA.find(p => p.id === 'sankat-mochan-hanuman-ashtak')!;
const sankatMochanVerses: PrayerVerse[] = [
  sankatMochanExisting.verses[0],
  {
    verseNumber: 2,
    verseType: 'stuti',
    sanskrit: 'बालि की त्रास कपीस बसै गिरि जात महाप्रभु पंथ निहारो।\nचौंकि महामुनि साप दियो तब चाहिय कौन बिचार बिचारो॥\nकै द्विज रूप लिवाय महाप्रभु सो तुम दास के सोक निवारो।\nको नहिं जानत है जग में कपि संकटमोचन नाम तिहारो॥',
    transliteration: 'Bali Ki Trasa Kapisa Basai Giri Jata Mahaprabhu Pantha Niharo |\nChaunki Mahamuni Sapa Diyo Taba Chahiya Kauna Bichara Bicharo ||\nKai Dwija Rupa Liwaya Mahaprabhu So Tuma Dasa Ke Soka Niwaro |\nKo Nahin Janata Hai Jaga Mein Kapi Sankatamochana Nama Tiharo ||',
    hindiMeaning: 'बाली के भय से जब सुग्रीव ऋष्यमूक पर्वत पर रहते थे और मार्ग देख रहे थे, तब आपने ब्राह्मण का रूप धरकर भगवान श्रीराम से उनका मिलन कराया और अपने सेवक सुग्रीव का सारा शोक दूर किया। हे कपिश्रेष्ठ! इस संसार में आपका संकटमोचन नाम कौन नहीं जानता?',
    englishMeaning: 'When Sugriva lived in terror of Vali upon Rishyamukha mountain, you assumed the guise of a Brahmin to unite him with Lord Rama, dispelling the sorrow of your master. Who in the world does not know your name as the Dispeller of Distress?'
  },
  {
    verseNumber: 3,
    verseType: 'stuti',
    sanskrit: 'अंगद के संग लेन गए सिय खोज कपीस यह बैन उचारो।\nजीवत ना बचिहौ हम सो जु बिना सुधि लाए इहां पगु धारो॥\nहेरि थके तट सिंधु सबै तब लाय सिया-सुधि प्रान उबारो।\nको नहिं जानत है जग में कपि संकटमोचन नाम तिहारो॥',
    transliteration: 'Angada Ke Sanga Lena Gaye Siya Khoja Kapisa Yaha Baina Ucharo |\nJiwata Na Bachihau Hama So Ju Bina Sudhi Laye Ihan Pagu Dharo ||\nHeri Thake Tata Sindhu Sabai Taba Laya Siya-Sudhi Prana Ubaro |\nKo Nahin Janata Hai Jaga Mein Kapi Sankatamochana Nama Tiharo ||',
    hindiMeaning: 'अंगद आदि वानरों के साथ जब आप सीता जी की खोज में निकले, और सुग्रीव ने कहा था कि बिना सुधि लाए जीवित नहीं बचोगे, तब समुद्र तट पर निराश वानरों में आपने ही लंका जाकर जानकी जी की खोज की और सबके प्राण बचाए।',
    englishMeaning: 'When you marched with Angada to search for Sita, facing death if you returned without news, and the vanaras lay exhausted by the ocean shore, you leapt across the sea, found Mother Sita, and saved their lives.'
  },
  {
    verseNumber: 4,
    verseType: 'stuti',
    sanskrit: 'रावन त्रास दई सिय को सब राक्षसि सो कही सोक निवारो।\nताहि समय हनुमान महाप्रभु जाय महा रजनीचर मारो॥\nचाहत सीय असोक सों आगि सु दै प्रभु मुद्रिका सोक निवारो।\nको नहिं जानत है जग में कपि संकटमोचन नाम तिहारो॥',
    transliteration: 'Rawana Trasa Dai Siya Ko Saba Rakshasi So Kahi Soka Niwaro |\nTahi Samaya Hanumana Mahaprabhu Jaya Maha Rajanichara Maro ||\nChahata Siya Asoka Son Aagi Su Dai Prabhu Mudrika Soka Niwaro |\nKo Nahin Janata Hai Jaga Mein Kapi Sankatamochana Nama Tiharo ||',
    hindiMeaning: 'रावण ने जब सीता जी को त्रास दिया और राक्षसियों से भयभीत कराया, तब हे हनुमान महाप्रभु! आपने अशोक वाटिका में जाकर राक्षसों का संहार किया और श्रीराम की मुद्रिका देकर माता सीता का शोक दूर किया।',
    englishMeaning: 'When Ravana terrorized Sita in Ashoka Vatika, you slew the wicked demons and dropped Lord Rama’s signet ring into Her lap, transforming Her despair into boundless hope.'
  },
  {
    verseNumber: 5,
    verseType: 'stuti',
    sanskrit: 'बान लग्यो उर लछिमन के तब प्रान तजे सुत रावन मारो।\nलै गृह बैद्य सुषेन समेत तबै गिरि द्रोण सु बीर उपारो॥\nआनि संजीवन हाथ दई तब लछिमन के तुम प्रान उबारो।\nको नहिं जानत है जग में कपि संकटमोचन नाम तिहारो॥',
    transliteration: 'Bana Lagyo Ura Lachhimana Ke Taba Prana Taje Suta Rawana Maro |\nLai Griha Baidya Sushena Sameta Tabai Giri Drona Su Bira Uparo ||\nAani Sanjiwana Hatha Dai Taba Lachhimana Ke Tuma Prana Ubaro |\nKo Nahin Janata Hai Jaga Mein Kapi Sankatamochana Nama Tiharo ||',
    hindiMeaning: 'मेघनाद की शक्ति से जब लक्ष्मण जी मूर्च्छित हो गए, तब आप लंका से सुषेण वैद्य को उनके गृह सहित उठा लाए और द्रोणाचल पर्वत को उखाड़कर संजीवनी बूटी लाकर लक्ष्मण जी के प्राणों की रक्षा की।',
    englishMeaning: 'When Lakshmana lay wounded by Meghanada’s spear, you brought physician Sushena along with his dwelling, uprooted the Drona mountain to fetch the Sanjivani herb, and revived Lakshmana.'
  },
  {
    verseNumber: 6,
    verseType: 'stuti',
    sanskrit: 'रावन जुद्ध अजान कियो तब नाग कि फांस सबै सिर डारो।\nश्रीरघुनाथ समेत सबै दल मोह भयो यह कष्ट निवारो॥\nखगपति आनि काटै तिनको तब संकट से प्रभु को बिसतारो।\nको नहिं जानत है जग में कपि संकटमोचन नाम तिहारो॥',
    transliteration: 'Rawana Juddha Agana Kiyo Taba Naga Ki Phansa Sabai Sira Daro |\nShriraghunatha Sameta Sabai Dala Moha Bhayo Yaha Kashta Niwaro ||\nKhagapati Aani Katai Tinako Taba Sankata Se Prabhu Ko Bisataro |\nKo Nahin Janata Hai Jaga Mein Kapi Sankatamochana Nama Tiharo ||',
    hindiMeaning: 'युद्ध में जब मेघनाद ने नागपाश डालकर श्रीराम और समस्त वानर सेना को बन्धन में डाल दिया, तब आपने गरुड़ जी को बुलाकर नागपाश कटवाया और समस्त सेना को संकट से उबारा।',
    englishMeaning: 'When Meghanada bound Sri Rama and the entire army with serpent nooses (Nagapasha), you summoned Garuda to sever the serpentine coils and delivered the Lord and His army from grave peril.'
  },
  {
    verseNumber: 7,
    verseType: 'stuti',
    sanskrit: 'बंधु समेत जबै अहिरावन लै रघुनाथ पतार सिधारो।\nदेबिहिं पूजि भली विधि सो बलि देउ सबै मिलि मंत्र बिचारो॥\nजाय सहाय भयो तब ही अहिरावन सैन्य समेत संहारो।\nको नहिं जानत है जग में कपि संकटमोचन नाम तिहारो॥',
    transliteration: 'Bandhu Sameta Jabai Ahirawana Lai Raghunatha Patara Sidharo |\nDebihin Puji Bhali Vidhi So Bali Deu Sabai Mili Mantra Bicharo ||\nJaya Sahaya Bhayo Taba Hi Ahirawana Sainya Sameta Sanharo |\nKo Nahin Janata Hai Jaga Mein Kapi Sankatamochana Nama Tiharo ||',
    hindiMeaning: 'जब अहिरावण श्रीराम और लक्ष्मण को पाताल लोक ले गया और देवी की बलि देने की योजना बनाई, तब आपने पाताल पहुंचकर अहिरावण का सेना सहित संहार किया और दोनों भाइयों की रक्षा की।',
    englishMeaning: 'When Ahiravana abducted Rama and Lakshmana to the netherworld to sacrifice them to the goddess, you entered Patala, slaughtered Ahiravana with his legions, and rescued the divine brothers.'
  },
  {
    verseNumber: 8,
    verseType: 'stuti',
    sanskrit: 'काज किए बड़ देवन के तुम बीर महाप्रभु देखि बिचारो।\nकौन सो संकट मोर गरीब को जो तुमसों नहिं जात है टारो॥\nबेगि हरो हनुमान महाप्रभु जो कछु संकट होय हमारो।\nको नहिं जानत है जग में कपि संकटमोचन नाम तिहारो॥',
    transliteration: 'Kaja Kiye Bada Devana Ke Tuma Bira Mahaprabhu Dekhi Bicharo |\nKauna So Sankata Mora Gariba Ko Jo Tumason Nahin Jata Hai Taro ||\nBegi Haro Hanumana Mahaprabhu Jo Kachhu Sankata Hoya Hamaro |\nKo Nahin Janata Hai Jaga Mein Kapi Sankatamochana Nama Tiharo ||',
    hindiMeaning: 'हे वीर महाप्रभु! आपने देवताओं के बड़े-बड़े कार्य सिद्ध किए हैं; फिर मुझ दीन-हीन का ऐसा कौन सा संकट है जिसे आप दूर नहीं कर सकते? हे हनुमान जी! शीघ्र ही मेरे संकटों को हर लीजिए।',
    englishMeaning: 'You accomplished monumental deeds for the gods; what affliction of a humble devotee like me could ever be impossible for you to avert? Speedily dispel all our distress, O great Lord Hanuman!'
  },
  {
    verseNumber: 9,
    verseType: 'doha',
    sanskrit: 'लाल देह लाली लसे अरु धरि लाल लंगूर।\nबज्र देह दानव दलन जय जय जय कपि सूर॥',
    transliteration: 'Lala Deha Lali Lase Aru Dhari Lala Langura |\nBajara Deha Danawa Dalana Jaya Jaya Jaya Kapi Sura ||',
    hindiMeaning: 'जिनके लाल वर्ण के शरीर पर सिन्दूर की शोभा है, जिनकी पूँछ लाल है, जिनका शरीर वज्र के समान कठोर और दानवों का दलन करने वाला है, उन शूरवीर वानरराज हनुमान जी की सदा जय हो!',
    englishMeaning: 'With your vermilion-red form shining with splendor, possessing a red tail, with a body hard as diamond that shatters the demons—victory, all victory to you, heroic King of monkeys!'
  }
];

const sankatMochan: PrayerRecord = {
  ...sankatMochanExisting,
  totalVerses: 9,
  verses: sankatMochanVerses
};

// 5. Aditya Hridaya Stotram (31 verses complete from Valmiki Ramayana Yuddha Kanda Sarga 105)
const adityaHridayaExisting = CURRENT_DATA.find(p => p.id === 'aditya-hridaya-stotram')!;
const adityaHridayaVerses: PrayerVerse[] = [
  adityaHridayaExisting.verses[0],
  adityaHridayaExisting.verses[1],
  {
    verseNumber: 3,
    verseType: 'sloka',
    sanskrit: 'सर्वमङ्गलमाङ्गल्यं सर्वपापप्रणाशनम्।\nचिन्ताशोकप्रशमनमायुर्वर्धनमुत्तमम्॥',
    transliteration: 'Sarvamangalamangalyam Sarwapapapranashanam |\nChintashokaprashamanam Ayurvardhanamuttamam ||',
    hindiMeaning: 'यह स्तोत्र सम्पूर्ण मंगलों का भी मंगल है, समस्त पापों का नाश करने वाला, चिन्ता और शोक का शमन करने वाला तथा आयु की वृद्धि करने वाला सर्वोत्तम साधन है।',
    englishMeaning: 'It is the most auspicious among all auspicious invocations, the destroyer of all sins, the dispeller of all anxiety and grief, and the supreme bestower of longevity.'
  },
  {
    verseNumber: 4,
    verseType: 'sloka',
    sanskrit: 'रश्मिमन्तं समुद्यन्तं देवासुरनमस्कृतम्।\nपूजयस्व विवस्वन्तं भास्करं भुवनेश्वरम्॥',
    transliteration: 'Rashmimantam Samudyantam Devasuranamaskritam |\nPujayaswa Vivaswantam Bhaskaram Bhuvaneshwaram ||',
    hindiMeaning: 'किरणों से सुशोभित, नित्य उदित होने वाले, देवताओं और असुरों द्वारा पूजित, सम्पूर्ण ब्रह्माण्ड के स्वामी भगवान सूर्य का एकाग्रचित्त होकर पूजन करो।',
    englishMeaning: 'Worship the Sun God (Vivasvan), the creator of light, the Lord of all realms, who rises adorned with glorious rays and is reverenced by both gods and demons.'
  },
  {
    verseNumber: 5,
    verseType: 'sloka',
    sanskrit: 'सर्वदेवात्मको ह्येष तेजस्वी रश्मिभावनः।\nएष देवासुरगणाँल्लोकान् पाति गभस्तिभिः॥',
    transliteration: 'Sarwadevatmako Hyesha Tejaswi Rashmibhavanah |\nEsha Devasuraganan Lokan Pati Gabhastibhih ||',
    hindiMeaning: 'निश्चय ही यह सम्पूर्ण देवताओं के स्वरूप हैं, परम तेजस्वी तथा किरणों के उद्गम हैं। यह अपनी रश्मियों से समस्त देव-दानव और लोकों का पालन करते हैं।',
    englishMeaning: 'He indeed embodies all the gods, intensely radiant and the fountainhead of light. By His rays He protects and nourishes all the worlds along with the celestials and demons.'
  },
  {
    verseNumber: 6,
    verseType: 'sloka',
    sanskrit: 'एष ब्रह्मा च विष्णुश्च शिवः स्कन्दः प्रजापतिः।\nमहेन्द्रो धनदः कालो यमः सोमो ह्यपां पतिः॥',
    transliteration: 'Esha Brahma Cha Vishnushcha Shivah Skandah Prajapatih |\nMahendro Dhanadah Kalo Yamah Somo Hyapam Patih ||',
    hindiMeaning: 'यही ब्रह्मा, विष्णु, शिव, स्कन्द, प्रजापति, इन्द्र, कुबेर, काल, यमराज, चन्द्रमा और वरुण देव हैं।',
    englishMeaning: 'He is Brahma, Vishnu, Shiva, Skanda, Prajapati, Indra, Kubera, Kala (Time), Yama, Soma (Moon), and Varuna the lord of the waters.'
  },
  {
    verseNumber: 7,
    verseType: 'sloka',
    sanskrit: 'पितरो वसवः साध्या ह्यश्विनौ मरुतो मनुः।\nवायुर्वह्निः प्रजाप्राण ऋतुकर्ता प्रभाकरः॥',
    transliteration: 'Pitaro Vasavah Sadhyah Hyashwinau Maruto Manuh |\nVayurvahnih Prajaprana Ritukarta Prabhakarah ||',
    hindiMeaning: 'यह पितृगण, वसुगण, साध्यगण, अश्विनीकुमार, मरुद्गण, मनु, वायु, अग्नि, प्रजा के प्राण, ऋतुओं के निर्माता और प्रभा के सागर हैं।',
    englishMeaning: 'He is the Pitris, the eight Vasus, the Sadhyas, the two Ashvins, the Maruts, Manu, Vayu, Agni, the vital life-breath of all creatures, the maker of seasons, and the source of radiance.'
  },
  {
    verseNumber: 8,
    verseType: 'sloka',
    sanskrit: 'आदित्यः सविता सूर्यः खगः पूषा गभस्तिमान्।\nसुवर्णसदृशो भानुर्हिरण्यरेता दिवाकरः॥',
    transliteration: 'Adityah Savita Suryah Khagah Pusha Gabhastiman |\nSuvarnasadrisho Bhanurhiranyareta Diwakarah ||',
    hindiMeaning: 'यह अदिति के पुत्र, जगत के उत्पादक, आकाश में विचरने वाले, पोषण करने वाले, सुवर्ण सदृश तेजस्वी, स्वर्णबीज और दिन के कर्ता हैं।',
    englishMeaning: 'He is Aditya (son of Aditi), Savita (the stimulator), Surya (the sun), Khaga (flying in space), Pushan (the nourisher), luminous with rays, golden in hue, the seed of gold, the maker of day.'
  },
  {
    verseNumber: 9,
    verseType: 'sloka',
    sanskrit: 'हरिदश्वः सहस्रार्चिः सप्तसप्तिर्मरीचिमान्।\nतिमिरोन्मथनः शम्भुस्त्वष्टा मार्तण्ड अंशुमान्॥',
    transliteration: 'Haridashwah Sahasrarchih Saptasaptirmarichiman |\nTimironmathanah Shambhustwashta Martanda Anshuman ||',
    hindiMeaning: 'हरे घोड़ों वाले, सहस्र किरणों वाले, सात घोड़ों वाले, मरीचिमान, अन्धकार का नाश करने वाले, कल्याणकारी शम्भु, त्वष्टा, मार्तण्ड और अंशुमान हैं।',
    englishMeaning: 'Having green-hued steeds, with thousands of rays, drawn by seven horses, radiant, dispeller of darkness, bestower of bliss, the fashioner of forms, born of the cosmic egg, full of rays.'
  },
  {
    verseNumber: 10,
    verseType: 'sloka',
    sanskrit: 'हिरण्यगर्भः शिशिरस्तपनो भास्करो रविः।\nअग्निगर्भोऽदितेः पुत्रः शङ्खः शिशिरनाशनः॥',
    transliteration: 'Hiranyagarbhah Shishirastapano Bhaskaro Ravih |\nAgnigarbhoditeh Putrah Shankhah Shishiranashanah ||',
    hindiMeaning: 'हिरण्यगर्भ, शीतलता हरने वाले तपन, प्रकाशक रवि, अग्नि को गर्भ में धारण करने वाले, अदिति-पुत्र तथा शिशिर ऋतु का शमन करने वाले हैं।',
    englishMeaning: 'The golden womb, warmth-giving yet cool, illuminator, son of Aditi, bearing fire within, tranquil and destroyer of coldness.'
  },
  {
    verseNumber: 11,
    verseType: 'sloka',
    sanskrit: 'व्योमनाथस्तमोभेदी ऋग्यजुःसामपारगः।\nघनवृष्टिरपां मित्रो विन्ध्यवीथीप्लवङ्गमः॥',
    transliteration: 'Vyomanathastamobhedi Rigyajuhsamaparagah |\nGhanavrishtirapam Mitro Vindhyavithiplawangamah ||',
    hindiMeaning: 'आकाश के नाथ, तम के भेदनकर्ता, ऋग्, यजुः और सामवेद के पारगामी, प्रचुर वर्षा करने वाले, जलों के मित्र और विन्ध्य पर्वत श्रेणी को लांघने वाले हैं।',
    englishMeaning: 'Lord of the sky, piercing all darkness, master of the Rig, Yajur, and Sama Vedas, cause of copious rain, friend of waters, gliding across the path over the Vindhyas.'
  },
  {
    verseNumber: 12,
    verseType: 'sloka',
    sanskrit: 'आतपी मण्डली मृत्युः पिङ्गलः सर्वतापनः।\nकविर्विश्वो महातेजा रक्तः सर्वभवोद्भवः॥',
    transliteration: 'Aatapi Mandali Mrityuh Pingalah Sarwatapanah |\nKavirvishwo Mahateja Raktah Sarwabhavodbhavah ||',
    hindiMeaning: 'ताप देने वाले, मण्डल आकार वाले, मृत्यु स्वरूप, पिंगल वर्ण, सबको तपाने वाले, सर्वज्ञ कवि, महातेजस्वी और सम्पूर्ण सृष्टि के उद्गम हैं।',
    englishMeaning: 'Intensely blazing, orb-formed, death of foes, tawny-hued, heating everything, supreme poet-seer, cosmic, all-glorious, and the source of all existence.'
  },
  {
    verseNumber: 13,
    verseType: 'sloka',
    sanskrit: 'नक्षत्रग्रहताराणामधिपो विश्वभावनः।\nतेजसामपि तेजस्वी द्वादशात्मन् नमोऽस्तु ते॥',
    transliteration: 'Nakshatragrahataranamadhipo Vishwabhavanah |\nTejasamapi Tejaswi Dwadashatman Namostu Te ||',
    hindiMeaning: 'नक्षत्रों, ग्रहों और तारों के अधिपति, विश्व की रक्षा करने वाले, तेजों में भी परम तेजस्वी द्वादशादित्य रूप आपको नमस्कार है।',
    englishMeaning: 'Sovereign over all lunar mansions, planets, and stars, protector of the universe, the splendour even of lights, O Twelve-Fold Deity (Dwadashatman), salutations to You!'
  },
  {
    verseNumber: 14,
    verseType: 'sloka',
    sanskrit: 'नमः पूर्वाय गिरये पश्चिमायाद्रये नमः।\nज्योतिर्गणानां पतये दिनाधिपतये नमः॥',
    transliteration: 'Namah Purwaya Giraye Pashchimayadraye Namah |\nJyotirgananam Pataye Dinadhipataye Namah ||',
    hindiMeaning: 'पूर्वाचल उदयाचल पर्वत को नमस्कार है, पश्चिमाचल अस्ताचल पर्वत को नमस्कार है। ज्योतिर्मण्डलों के स्वामी और दिन के अधिपति को नमस्कार है।',
    englishMeaning: 'Salutations to the eastern mount of sunrise, and salutations to the western mount of sunset. Salutations to the ruler of celestial lights and the lord of the day.'
  },
  {
    verseNumber: 15,
    verseType: 'sloka',
    sanskrit: 'जयाय जयभद्राय हर्यश्वाय नमो नमः।\nनमो नमः सहस्रांशो आदित्याय नमो नमः॥',
    transliteration: 'Jayaya Jayabhadraya Haryashwaya Namo Namah |\nNamo Namah Sahasransho Adityaya Namo Namah ||',
    hindiMeaning: 'जय स्वरूप, कल्याणकारी विजय प्रदाता, श्याम घोड़ों वाले, सहस्र किरणों वाले भगवान आदित्य को बारम्बार नमस्कार है।',
    englishMeaning: 'Salutations again and again to You who are victory and auspiciousness, drawn by green horses, O Thousand-Rayed Aditya, salutations!'
  },
  {
    verseNumber: 16,
    verseType: 'sloka',
    sanskrit: 'नम उग्राय वीराय सारङ्गाय नमो नमः।\nनमः पद्मप्रबोधाय मार्ताण्डाय नमो नमः॥',
    transliteration: 'Nama Ugraya Viraya Sarangaya Namo Namah |\nNamah Padmaprabodhaya Martandaya Namo Namah ||',
    hindiMeaning: 'उग्र स्वरूप, वीर, सारंग, कमलों को प्रफुल्लित करने वाले मार्तण्ड भगवान को बारम्बार नमस्कार है।',
    englishMeaning: 'Salutations to the formidable, the heroic, the swift-moving; salutations to Him who awakens the lotuses, the radiant Martanda!'
  },
  {
    verseNumber: 17,
    verseType: 'sloka',
    sanskrit: 'ब्रह्मेशानाच्युतेशाय सूर्यायादित्यवर्चसे।\nभास्वते सर्वभक्षाय रौद्राय वपुषे नमः॥',
    transliteration: 'Brahmeshanachyuteshaya Suryayadityavarchase |\nBhaswate Sarwabhakshaya Raudraya Vapushe Namah ||',
    hindiMeaning: 'ब्रह्मा, शिव और अच्युत विष्णु के ईश, सूर्य रूपी आदित्यवर्चस्, प्रकाशमान, प्रलय में सब भक्षण करने वाले रौद्र स्वरूप को नमस्कार है।',
    englishMeaning: 'Salutations to the Lord of Brahma, Shiva, and Vishnu; to the blazing Sun endowed with divine splendor, the consumer of all during cosmic dissolution, of terrifying power.'
  },
  {
    verseNumber: 18,
    verseType: 'sloka',
    sanskrit: 'तमोघ्नाय हिमघ्नाय शत्रुघ्नायामितात्मने।\nकृतघ्नघ्नाय देवाय ज्योतिषां पतये नमः॥',
    transliteration: 'Tamoghnaya Himaghnaya Shatrughnayamitatmane |\nKritaghnaghnaya Devaya Jyotisham Pataye Namah ||',
    hindiMeaning: 'अन्धकार का नाश करने वाले, शीत का शमन करने वाले, शत्रुओं का संहार करने वाले, कृतघ्नों का दलन करने वाले ज्योतिष्पति को नमस्कार है।',
    englishMeaning: 'Salutations to the dispeller of darkness, vanquisher of ice and cold, destroyer of foes, of boundless soul, punisher of the ungrateful, Lord of the luminaries.'
  },
  {
    verseNumber: 19,
    verseType: 'sloka',
    sanskrit: 'तप्तचामीकराभाय वह्नये विश्वकर्मणे।\nनमस्तमोऽभिनिघ्नाय रुचये लोकसाक्षिणे॥',
    transliteration: 'Taptachamikarabhaya Vahnaye Vishwakarmane |\nNamastamobhinighnaya Ruchaye Lokasakshine ||',
    hindiMeaning: 'तपाए हुए सुवर्ण सदृश कान्ति वाले, अग्नि स्वरूप, विश्व का निर्माण करने वाले, अन्धकारनाशक और सम्पूर्ण लोकों के साक्षी को नमस्कार है।',
    englishMeaning: 'Salutations to Him glowing like molten gold, fire incarnate, creator of the cosmos, remover of darkness, dazzling brilliance, the eternal witness of all worlds.'
  },
  {
    verseNumber: 20,
    verseType: 'sloka',
    sanskrit: 'नाशयत्येष वै भूतं तदेव सृजति प्रभुः।\nपायत्येष तपत्येष वर्षत्येष गभस्तिभिः॥',
    transliteration: 'Nashayatyesha Vai Bhutam Tadeva Srijati Prabhuh |\nPayatyesha Tapatyesha Varshatyesha Gabhastibhih ||',
    hindiMeaning: 'यही प्रभु चराचर जगत् का संहार करते हैं और पुनः सृजन करते हैं। यह अपनी किरणों से जल का शोषण करते हैं, तपाते हैं और वर्षा करते हैं।',
    englishMeaning: 'This Lord dissolves all beings and recreates them. With His rays He draws up water, heats the world, and pours down life-giving rain.'
  },
  {
    verseNumber: 21,
    verseType: 'sloka',
    sanskrit: 'एष सुप्तेषु जागर्ति भूतेषु परिनिष्ठितः।\nएष एवाग्निहोत्रं च फलं चैवाग्निहोत्रिणाम्॥',
    transliteration: 'Esha Supteshu Jagarti Bhuteshu Parinishtitah |\nEsha Evagnihotram Cha Phalam Chaivagnihotrinam ||',
    hindiMeaning: 'सब प्राणियों के सो जाने पर भी यह अन्तर्यामी रूप में जागते रहते हैं। यही अग्निहोत्र यज्ञ हैं और यही अग्निहोत्री पुरुषों के फल हैं।',
    englishMeaning: 'He remains awake within all creatures when they sleep, permanently established within. He is both the sacrificial rite and the fruit reaped by the sacrificers.'
  },
  {
    verseNumber: 22,
    verseType: 'sloka',
    sanskrit: 'वेदाश्च क्रतवश्चैव क्रतूनां फलमेव च।\nयानि कृत्यानि लोकेषु सर्व एष रविः प्रभुः॥',
    transliteration: 'Vedashcha Kratavashchaiva Kratunam Phalameva Cha |\nYani Krityani Lokeshu Sarwa Esha Ravih Prabhuh ||',
    hindiMeaning: 'वेद, यज्ञ और यज्ञों के फल तथा सम्पूर्ण लोकों में किए जाने वाले समस्त शुभ कर्म साक्षात् प्रभु सूर्यदेव ही हैं।',
    englishMeaning: 'The Vedas, the sacrifices, and the reward of all sacrifices, as well as every sacred duty in all realms, are none other than Lord Surya.'
  },
  {
    verseNumber: 23,
    verseType: 'sloka',
    sanskrit: 'एनमापत्सु कृच्छ्रेषु कान्तारेषु भयेषु च।\nकीर्तयन् पुरुषः कश्चिन्नावसीदति राघव॥',
    transliteration: 'Enamapatsu Krichchhreshu Kantareshu Bhayeshu Cha |\nKirtayan Purushah Kashchinnavasidati Raghava ||',
    hindiMeaning: 'हे राघव! विपत्तियों में, कष्ट में, घने जंगलों में और भय के समय जो मनुष्य इनका कीर्तन करता है, वह कभी दुःखी नहीं होता।',
    englishMeaning: 'O Raghava! Any mortal who recites this hymn in the midst of perils, calamities, pathless wildernesses, or fear never succumbs to grief.'
  },
  {
    verseNumber: 24,
    verseType: 'sloka',
    sanskrit: 'पूजयस्वैनमेकाग्रो देवदेवं जगत्पतिम्।\nएतत् त्रिगुणितं जप्त्वा युद्धेषु विजयिष्यसि॥',
    transliteration: 'Pujayaswainamekagro Devadevam Jagatpatim |\nEtat Trigunitam Japtwa Yuddheshu Vijayishyasi ||',
    hindiMeaning: 'तुम एकाग्रचित्त होकर इन देवाधिदेव जगत्पति का पूजन करो। इसका तीन बार जप करने से तुम युद्ध में निश्चय ही विजयी होगे।',
    englishMeaning: 'Worship with single-pointed mind this God of gods, the Lord of the universe. Reciting this hymn thrice, you will surely triumph in battle.'
  },
  {
    verseNumber: 25,
    verseType: 'sloka',
    sanskrit: 'अस्मिन् क्षणे महाबाहो रावणं त्वं वधिष्यसि।\nएवमुक्त्वा तदागस्त्यो जगाम च यथागतम्॥',
    transliteration: 'Asmin Kshane Mahabaho Ravanam Twam Vadhishyasi |\nEvamuktwa Tadagastyo Jagama Cha Yathagatam ||',
    hindiMeaning: 'हे महाबाहो! इसी क्षण तुम रावण का वध करोगे। ऐसा कहकर महर्षि अगस्त्य जैसे आए थे, वैसे ही चले गए।',
    englishMeaning: 'In this very battle, O mighty-armed hero, you will slay Ravana. Having spoken thus, Sage Agastya departed as he had come.'
  },
  {
    verseNumber: 26,
    verseType: 'sloka',
    sanskrit: 'एतच्छ्रुत्वा महातेजा नष्टशोकोऽभवत् तदा।\nधारयामास सुप्रीतो राघवः प्रयतात्मवान्॥',
    transliteration: 'Etachchhrutwa Mahateja Nashtashokobhavat Tada |\nDharayamasa Suprito Raghavah Prayatatmavan ||',
    hindiMeaning: 'यह सुनकर परम तेजस्वी राघव का समस्त शोक नष्ट हो गया। उन्होंने परम प्रसन्न होकर पवित्र अन्तःकरण से इस स्तोत्र को धारण किया।',
    englishMeaning: 'Hearing this, the immensely radiant Rama was relieved of all grief, filled with joy, and internalized this holy hymn with focused reverence.'
  },
  {
    verseNumber: 27,
    verseType: 'sloka',
    sanskrit: 'आदित्यं प्रेक्ष्य जप्त्वा तु परं हर्षमवाप्तवान्।\nत्रिराचम्य शुचिर्भूत्वा धनुरादाय वीर्यवान्॥',
    transliteration: 'Adityam Prekshya Japtwa Tu Param Harshamawaptavan |\nTrirachamya Shuchirbhutwa Dhanuradaya Viryavan ||',
    hindiMeaning: 'भगवान सूर्य को देखकर और स्तोत्र का जप करके श्रीराम परम हर्ष को प्राप्त हुए। उन्होंने तीन बार आचमन कर पवित्र होकर धनुष उठाया।',
    englishMeaning: 'Gazing upon the Sun and chanting the hymn, Rama experienced supreme joy. Performing achamana thrice to purify Himself, the valorous hero raised His bow.'
  },
  {
    verseNumber: 28,
    verseType: 'sloka',
    sanskrit: 'रावणं प्रेक्ष्य हृष्टात्मा युद्धाय समुपागमत्।\nसर्वयत्नेन महता वधे तस्य धृतोऽभवत्॥',
    transliteration: 'Ravanam Prekshya Hrishtatma Yuddhaya Samupagamat |\nSarwayatnena Mahata Vadhe Tasya Dhritobhavat ||',
    hindiMeaning: 'रावण को देखकर वे हर्षित चित्त से युद्ध हेतु आगे बढ़े और सम्पूर्ण महाप्रयत्न से उसके वध के लिए कृतसंकल्प हुए।',
    englishMeaning: 'Beholding Ravana, Rama advanced toward combat with exalted heart, determined with supreme effort to vanquish the demon king.'
  },
  {
    verseNumber: 29,
    verseType: 'sloka',
    sanskrit: 'अथ रविरवदन्निरीक्ष्य रामं\nमुदितमनाः परमं प्रहृष्यमाणः।\nनिशिचरपतिसंक्षयं विदित्वा\nसुरगणमध्यगतो वचस्त्वरेति॥',
    transliteration: 'Atha Raviravadannirikshya Ramam\nMuditamana Paramam Prahrishyamanah |\nNishicharapatisankshayam Viditwa\nSuraganamadhyagato Vachastwareti ||',
    hindiMeaning: 'तदनन्तर देवगणों के मध्य खड़े भगवान सूर्यदेव ने श्रीराम को देखकर परम हर्षित मन से रावण के विनाश को निकट जानकर उनसे कहा—"शीघ्रता कीजिए!"',
    englishMeaning: 'Then, knowing the destruction of the king of night-stalkers was at hand, Lord Surya, standing amidst the hosts of celestials, gazed upon Rama with rejoiced heart and uttered: "Hurry!"'
  },
  {
    verseNumber: 30,
    verseType: 'sloka',
    sanskrit: 'इति श्रीवाल्मीकीयरामायणे युद्धकाण्डे\nअगस्त्योपदिष्टमादित्यहृदयस्तोत्रं सम्पूर्णम्॥',
    transliteration: 'Iti Shrivalmikiyaramayane Yuddhakande\nAgastyopadishtamadityahridayastotram Sampoornam ||',
    hindiMeaning: 'इस प्रकार श्रीमद्वाल्मीकीय रामायण के युद्धकाण्ड में महर्षि अगस्त्य द्वारा उपदेशित आदित्य हृदय स्तोत्र सम्पूर्ण हुआ।',
    englishMeaning: 'Thus concludes the sacred Aditya Hridaya Stotra as imparted by Sage Agastya in the Yuddha Kanda of the holy Srimad Valmiki Ramayana.'
  },
  {
    verseNumber: 31,
    verseType: 'sloka',
    sanskrit: 'ॐ तत्सत्। ॐ श्रीसूर्यनारायणार्पणमस्तु॥',
    transliteration: 'Om Tat Sat | Om Shri Suryanarayanarpanamastu ||',
    hindiMeaning: 'ॐ तत् सत्। यह सम्पूर्ण स्तोत्र भगवान श्री सूर्यनारायण को समर्पित है।',
    englishMeaning: 'Om Tat Sat. May this be dedicated to Lord Sri Suryanarayana.'
  }
];

const adityaHridayaStotram: PrayerRecord = {
  ...adityaHridayaExisting,
  totalVerses: 31,
  verses: adityaHridayaVerses
};

// 6. Aarti Om Jai Jagdish Hare (8 verses complete)
const omJaiJagdishExisting = CURRENT_DATA.find(p => p.id === 'om-jai-jagdish-hare')!;
const omJaiJagdishVerses: PrayerVerse[] = [
  omJaiJagdishExisting.verses[0],
  omJaiJagdishExisting.verses[1],
  {
    verseNumber: 3,
    verseType: 'aarti',
    sanskrit: 'मात-पिता तुम मेरे, शरण गहूं किसकी।\nस्वामी शरण गहूं किसकी।\nतुम बिन और न दूजा, आस करूं जिसकी॥ ॐ जय जगदीश हरे॥',
    transliteration: 'Mata-Pita Tuma Mere, Sharana Gahūn Kisaki |\nSwami Sharana Gahūn Kisaki |\nTuma Bina Aura Na Duja, Aasa Karūn Jisaki || Om Jaya Jagadisha Hare ||',
    hindiMeaning: 'आप ही मेरे माता और पिता हैं; आपके अतिरिक्त मैं किसकी शरण लूँ? आपके सिवा मेरा दूसरा कोई नहीं है, जिससे मैं कोई आशा कर सकूँ।',
    englishMeaning: 'You alone are my mother and my father; in whose refuge else should I seek shelter? Other than You, there is none upon whom I can place my hopes. Victory to You, Lord of the Universe!'
  },
  {
    verseNumber: 4,
    verseType: 'aarti',
    sanskrit: 'तुम पूरण परमात्मा, तुम अन्तर्यामी।\nस्वामी तुम अन्तर्यामी।\nपारब्रह्म परमेश्वर, तुम सब के स्वामी॥ ॐ जय जगदीश हरे॥',
    transliteration: 'Tuma Purana Paramatma, Tuma Antaryami |\nSwami Tuma Antaryami |\nParabrahma Parameshwara, Tuma Saba Ke Swami || Om Jaya Jagadisha Hare ||',
    hindiMeaning: 'आप परिपूर्ण परमात्मा हैं, घट-घट के अन्तर्यामी हैं। आप ही परब्रह्म परमेश्वर हैं और आप ही सम्पूर्ण चराचर जगत् के स्वामी हैं।',
    englishMeaning: 'You are the all-pervading Supreme Spirit, the inner witness dwelling in all hearts. You are the Supreme Brahman, the Sovereign Lord of all beings.'
  },
  {
    verseNumber: 5,
    verseType: 'aarti',
    sanskrit: 'तुम करुणा के सागर, तुम पालन-कर्ता।\nस्वामी तुम पालन-कर्ता।\nमैं मूरख खल कामी, कृपा करो भर्ता॥ ॐ जय जगदीश हरे॥',
    transliteration: 'Tuma Karuna Ke Sagara, Tuma Palana-Karta |\nSwami Tuma Palana-Karta |\nMain Murakha Khala Kami, Kripa Karo Bharta || Om Jaya Jagadisha Hare ||',
    hindiMeaning: 'आप करुणा के अगाध सागर हैं, समस्त ब्रह्माण्ड का पालन-पोषण करने वाले हैं। मैं अज्ञानी, पापी और कामी हूँ; हे मेरे पालनहार स्वामी! मुझ पर कृपा कीजिए।',
    englishMeaning: 'You are an ocean of compassion, the Sustainer of all creation. I am ignorant and wayward; O Protector Lord, shower Your gracious mercy upon me!'
  },
  {
    verseNumber: 6,
    verseType: 'aarti',
    sanskrit: 'तुम हो एक अगोचर, सब के प्राणपति।\nस्वामी सब के प्राणपति।\nकिस विधि मिलूं दयामय, तुम को मैं कुमति॥ ॐ जय जगदीश हरे॥',
    transliteration: 'Tuma Ho Eka Agochara, Saba Ke Pranapati |\nSwami Saba Ke Pranapati |\nKisa Vidhi Milūn Dayamaya, Tuma Ko Main Kumati || Om Jaya Jagadisha Hare ||',
    hindiMeaning: 'आप इन्द्रियों से अगोचर (अतीन्द्रिय) हैं, सभी जीवों के प्राणेश्वर हैं। हे दयामय प्रभु! मुझ जैसी मन्दबुद्धि वाला भला किस प्रकार आपसे मिल सकता है?',
    englishMeaning: 'You are the formless, beyond sensory reach, the beloved Lord of all souls. O Compassionate One, by what means could a seeker of frail intellect ever attain You?'
  },
  {
    verseNumber: 7,
    verseType: 'aarti',
    sanskrit: 'दीनबन्धु दुःखहर्ता, तुम ठाकुर मेरे।\nस्वामी तुम ठाकुर मेरे।\nअपने हाथ उठाओ, द्वार पड़ा तेरे॥ ॐ जय जगदीश हरे॥',
    transliteration: 'Dinabandhu Duhkhaharta, Tuma Thakura Mere |\nSwami Tuma Thakura Mere |\nApane Hatha Uthao, Dwara Pada Tere || Om Jaya Jagadisha Hare ||',
    hindiMeaning: 'आप दीनों के परम सखा और समस्त दुःखों के हरणकर्ता हैं, आप ही मेरे स्वामी हैं। अपना वरदहस्त उठाइए; मैं आपके द्वार पर शरणागत पड़ा हूँ।',
    englishMeaning: 'You are the friend of the humble, the redeemer of sorrows, my only Master. Extend Your blessing hand, for I lie surrendered at Your sacred threshold.'
  },
  {
    verseNumber: 8,
    verseType: 'aarti',
    sanskrit: 'विषय-विकार मिटाओ, पाप हरो देवा।\nस्वामी पाप हरो देवा।\nश्रद्धा-भक्ति बढ़ाओ, सन्तन की सेवा॥ ॐ जय जगदीश हरे॥',
    transliteration: 'Vishaya-Vikara Mitao, Papa Haro Deva |\nSwami Papa Haro Deva |\nShraddha-Bhakti Badhao, Santana Ki Sewa || Om Jaya Jagadisha Hare ||',
    hindiMeaning: 'मेरे सांसारिक विषय-विकारों को मिटा दीजिए, मेरे समस्त पापों को हर लीजिए। मेरे हृदय में अपनी श्रद्धा और भक्ति की वृद्धि कीजिए और मुझे संतों की सेवा प्रदान कीजिए।',
    englishMeaning: 'Eradicate all sensual weaknesses, forgive my sins, O Lord. Foster deep faith and devotion within my soul, and grant me the privilege of serving the holy saints!'
  }
];

const omJaiJagdish: PrayerRecord = {
  ...omJaiJagdishExisting,
  totalVerses: 8,
  verses: omJaiJagdishVerses
};

// 7. Daily Pratahsmarana (5 verses complete)
const pratahsmaranaExisting = CURRENT_DATA.find(p => p.id === 'pratahsmarana-slokas')!;
const pratahsmaranaVerses: PrayerVerse[] = [
  pratahsmaranaExisting.verses[0],
  pratahsmaranaExisting.verses[1],
  pratahsmaranaExisting.verses[2],
  {
    verseNumber: 4,
    verseType: 'sloka',
    sanskrit: 'ब्रह्मा मुरारिस्त्रिपुरान्तकारी भानुः शशी भूमिसुतो बुधश्च।\nगुरुश्च शुक्रः शनिराहुकेतवः कुर्वन्तु सर्वे मम सुप्रभातम्॥',
    transliteration: 'Brahma Muraristripurantakari Bhanuh Shashi Bhumisuto Budhashcha |\nGurushcha Shukrah Shanirahuketavah Kurwantu Sarwe Mama Suprabhatam ||',
    hindiMeaning: 'सृष्टिकर्ता ब्रह्मा, दैत्यहर्ता भगवान विष्णु, त्रिपुर संहारक भगवान शिव, तथा सूर्य, चन्द्र, मंगल, बुध, गुरु, शुक्र, शनि, राहु और केतु—ये सभी नवग्रह मेरे प्रातःकाल को मंगलमय बनाएं।',
    englishMeaning: 'May Brahma, Vishnu, Shiva, the Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, and Ketu—may all these divine powers and nine planets make this morning auspicious and blessed for me!'
  },
  {
    verseNumber: 5,
    verseType: 'mantra',
    sanskrit: 'ॐ भूर्भुवः स्वः। तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि।\nधियो यो नः प्रचोदयात्॥',
    transliteration: 'Om Bhur Bhuvah Swah | Tat Savitur Varenyam Bhargo Devasya Dhimahi |\nDhiyo Yo Nah Prachodayat ||',
    hindiMeaning: 'उस प्राणस्वरूप, दुःखनाशक, सुखस्वरूप, श्रेष्ठ, तेजस्वी, पापनाशक, देवस्वरूप परमात्मा का हम ध्यान करते हैं; जो हमारी बुद्धि को सन्मार्ग की ओर प्रेरित करे।',
    englishMeaning: 'We meditate upon the supreme adorable effulgence of the divine Creator Sun; may He inspire, guide, and illuminate our intellects toward righteous wisdom.'
  }
];

const pratahsmarana: PrayerRecord = {
  ...pratahsmaranaExisting,
  totalVerses: 5,
  verses: pratahsmaranaVerses
};

// 8. Shri Ganesh Chalisa (Full 43 verses: 2 Dohas + 40 Chaupais + 1 Doha)
const ganeshChalisaExisting = CURRENT_DATA.find(p => p.id === 'ganesh-chalisa')!;

const ganeshChaupaisData: Array<{ sanskrit: string; trans: string; hi: string; en: string }> = [
  {
    sanskrit: 'जय जय जय गणपति गणराजू। मंगल भरण करण शुभ काजू॥',
    trans: 'Jaya Jaya Jaya Ganapati Ganaraju | Mangala Bharana Karana Shubha Kaju ||',
    hi: 'हे गणों के राजा गणपति! आपकी जय हो, जय हो, जय हो! आप मंगल भरने वाले और सभी शुभ कार्यों को सिद्ध करने वाले हैं।',
    en: 'Glory, glory, glory to Lord Ganapati, King of all celestial attendants! You are the bestower of all auspiciousness and the fulfiller of all righteous endeavors.'
  },
  {
    sanskrit: 'जय गजबदन सदन सुखदाता। विश्व विनायक बुद्धि विधाता॥',
    trans: 'Jaya Gajabadana Sadana Sukhadatha | Vishwa Vinayaka Buddhi Vidhata ||',
    hi: 'हे गजानन! सुख के धाम, सम्पूर्ण विश्व के विनायक और बुद्धि के विधाता! आपकी जय हो।',
    en: 'Victory to the elephant-faced Lord, sanctuary of bliss, universal leader (Vinayaka), and divine architect of wisdom.'
  },
  {
    sanskrit: 'वक्रतुण्ड शुचि शुण्ड सुहावन। तिलक त्रिपुण्ड भाल मन भावन॥',
    trans: 'Vakratunda Shuchi Shunda Suhawan | Tilaka Tripunda Bhala Mana Bhawan ||',
    hi: 'आपकी वक्र सूंड परम पवित्र और मनभावन है; आपके ललाट पर त्रिपुण्ड तिलक अत्यन्त मनोहर प्रतीत होता है।',
    en: 'Your curved trunk is pure and graceful; the sacred tripundra mark on Your broad forehead enchants the heart.'
  },
  {
    sanskrit: 'राजित मणि मुक्तन उर माला। स्वर्ण मुकुट शिर नयन विशाला॥',
    trans: 'Rajita Mani Muktana Ura Mala | Swarna Mukuta Shira Nayana Vishala ||',
    hi: 'आपके वक्षस्थल पर मणियों और मोतियों की माला सुशोभित है, सिर पर स्वर्ण मुकुट और विशाल नयन शोभा पा रहे हैं।',
    en: 'Your chest is adorned with garlands of gems and pearls; upon Your head rests a golden crown, and Your eyes are vast and merciful.'
  },
  {
    sanskrit: 'पुस्तक पाणि कुठार त्रिशूलं। मोदक भोग सुगन्धित फूलं॥',
    trans: 'Pustaka Pani Kuthara Trishulam | Modaka Bhoga Sugandhita Phulam ||',
    hi: 'आपके हाथों में पुस्तक, कुठार और त्रिशूल हैं; आपको मोदक का भोग और सुगन्धित पुष्प अत्यन्त प्रिय हैं।',
    en: 'In Your hands You hold the sacred scripture, axe, and trident; You are pleased by offerings of sweet modakas and fragrant blossoms.'
  },
  {
    sanskrit: 'सुन्दर पीताम्बर तन साजे। चरण पादुका मुनि मन राजे॥',
    trans: 'Sundara Pitambara Tana Saje | Charana Paduka Muni Mana Raje ||',
    hi: 'आपके श्रीअंग पर सुन्दर पीताम्बर सुशोभित है, और आपकी चरण पादुकाएं मुनियों के मनों में विराजती हैं।',
    en: 'Your divine form is dressed in radiant yellow silk, and Your holy sandals dwell in the meditative hearts of the sages.'
  },
  {
    sanskrit: 'धनि शिवसुवन षडानन भ्राता। गौरी ललन विश्व विख्याता॥',
    trans: 'Dhani Shivasuwana Shadanana Bhrata | Gauri Lalana Vishwa Vikhyata ||',
    hi: 'हे शिवपुत्र! कार्तिकेय के भ्राता! माता पार्वती के लाडले! आप धन्य हैं और सम्पूर्ण विश्व में विख्यात हैं।',
    en: 'Blessed are You, son of Shiva, brother of six-faced Kartikeya, beloved of Mother Gauri, renowned across the universe!'
  },
  {
    sanskrit: 'ऋद्धि सिद्धि तव चंवर सुधारे। मूषक वाहन सोहत द्वारे॥',
    trans: 'Riddhi Siddhi Tava Chanwara Sudhare | Mushaka Vahana Sohata Dware ||',
    hi: 'ऋद्धि और सिद्धि आपकी सेवा में चंवर डुलाती हैं, और आपका मूषक वाहन आपके द्वार पर सुशोभित रहता है।',
    en: 'Prosperity (Riddhi) and Spiritual Attainment (Siddhi) wave royal fans for You, and Your mouse vahana waits faithfully at Your portal.'
  },
  {
    sanskrit: 'कहौ जन्म शुभ कथा तुम्हारी। अति विचित्र अति पावनकारी॥',
    trans: 'Kahau Janma Shubha Katha Tumhari | Ati Vichitra Ati Pawanakari ||',
    hi: 'अब मैं आपके पावन प्राकट्य की कथा कहता हूँ, जो अत्यन्त विचित्र और परम पवित्र करने वाली है।',
    en: 'I now recite the auspicious tale of Your birth, wondrous beyond measure and profoundly sanctifying.'
  },
  {
    sanskrit: 'एक समय गिरिराज कुमारी। पुत्र हेतु तप कीन्हो भारी॥',
    trans: 'Eka Samaya Giriraja Kumari | Putra Hetu Tapa Kinho Bhari ||',
    hi: 'एक समय गिरिराज किशोरी पार्वती जी ने पुत्र प्राप्ति के लिए घोर तपस्या की।',
    en: 'Once upon a time, Mother Parvati, daughter of the mountain king, performed rigorous penance to obtain a son.'
  },
  {
    sanskrit: 'भयो यज्ञ जब पूर्ण अनूपा। तब प्रगट्यो शिशु सुन्दर रूपा॥',
    trans: 'Bhayo Yajna Jaba Purna Anupa | Taba Pragatyō Shishu Sundara Rupa ||',
    hi: 'जब वह अनुपम यज्ञ पूर्ण हुआ, तब अत्यन्त सुन्दर रूप में दिव्य बालक प्रकट हुआ।',
    en: 'When that incomparable yajna reached completion, a child of breathtaking divine splendor manifested.'
  },
  {
    sanskrit: 'लखि शिशु रूप सकल हरषाने। देवन सुमन बरसाए आनि॥',
    trans: 'Lakhi Shishu Rupa Sakala Harashane | Devana Sumana Barasaye Aani ||',
    hi: 'उस दिव्य बालक के रूप को देखकर सभी आनन्दित हो उठे और देवताओं ने आकाश से पुष्प वर्षा की।',
    en: 'Beholding the divine beauty of the child, all rejoiced and the gods gathered to shower flowers from the sky.'
  },
  {
    sanskrit: 'शनि सब देखन आए उर लासा। नहिं देख्यो कछु भय मन मासा॥',
    trans: 'Shani Saba Dekhana Aaye Ura Lasa | Nahin Dekhyo Kachhu Bhaya Mana Masa ||',
    hi: 'शनिदेव भी मन में उमंग लेकर देखने आए, किन्तु अपने दृष्टि-दोष के भय से उन्होंने बालक को नहीं देखा।',
    en: 'Shani Dev arrived eager to behold the newborn, but refrained from looking directly out of apprehension of his gaze.'
  },
  {
    sanskrit: 'गौरी कही देखु शिशु मोरा। शनि कह दृष्टि परे मति भोरा॥',
    trans: 'Gauri Kahi Dekhu Shishu Mora | Shani Kaha Drishti Pare Mati Bhora ||',
    hi: 'माता पार्वती ने कहा कि मेरे पुत्र को देखो; तब शनिदेव ने कहा कि मेरी दृष्टि पड़ने से अनिष्ट हो सकता है।',
    en: 'Gauri urged him to look upon Her child; Shani explained that his gaze might bring harm.'
  },
  {
    sanskrit: 'पार्वती जब अति हठ कीन्हा। शनि तब नयन निहारन दीन्हा॥',
    trans: 'Parvati Jaba Ati Hatha Kinha | Shani Taba Nayana Niharana Dinha ||',
    hi: 'जब पार्वती जी ने अधिक हठ किया, तब शनिदेव ने बालक की ओर दृष्टि डाली।',
    en: 'When Parvati insisted with maternal pride, Shani directed his gaze upon the infant.'
  },
  {
    sanskrit: 'शनि दृष्टि पड़त ही शिर उड़ि गयऊ। सुरपुर माहिं शोक सब भयऊ॥',
    trans: 'Shani Drishti Padata Hi Shira Udi Gayau | Surapura Mahin Shoka Saba Bhayau ||',
    hi: 'शनिदेव की दृष्टि पड़ते ही बालक का सिर आकाश में उड़ गया, जिससे देवलोक में घोर शोक छा गया।',
    en: 'Instantly, the head severed and ascended to the skies, plunging all realms into profound grief.'
  },
  {
    sanskrit: 'पार्वती जब रोवन लागीं। हाहाकार मच्यो बैरागी॥',
    trans: 'Parvati Jaba Rowana Lagin | Hahakara Machyo Bairagi ||',
    hi: 'पार्वती जी जब विलाप करने लगीं, तब सम्पूर्ण देवलोक में हाहाकार मच गया।',
    en: 'As Parvati wept in anguish, cries of sorrow reverberated through the cosmos.'
  },
  {
    sanskrit: 'गरुड़ चढ़े हरि बैकुण्ठ धाए। तुरतहिं गजबदन शिर लाए॥',
    trans: 'Garuda Chadhe Hari Baikuntha Dhaaye | Turatahin Gajabadana Shira Laye ||',
    hi: 'भगवान विष्णु गरुड़ पर आरूढ़ होकर दौड़े और तत्काल एक गज का मस्तक लेकर उपस्थित हुए।',
    en: 'Lord Vishnu mounted Garuda and sped forth, swiftly returning with the head of a noble elephant.'
  },
  {
    sanskrit: 'जोड़ि दियो शिर शिव कर कृपा। बालक जी उठि लीन्ह अनूपा॥',
    trans: 'Jodi Diyo Shira Shiva Kara Kripa | Balaka Ji Uthi Linha Anupa ||',
    hi: 'भगवान शिव ने कृपा करके उस गज-मस्तक को बालक के धड़ से जोड़ दिया, और वह अनुपम बालक जीवित हो उठा।',
    en: 'Lord Shiva graciously joined the elephant head, and the wondrous child sprang back to life.'
  },
  {
    sanskrit: 'नाम गणेश दियो हर हरषे। गंधर्व गायन सुर सुमन बरषे॥',
    trans: 'Nama Ganesha Diyo Hara Harashe | Gandharwa Gayana Sura Sumana Barashe ||',
    hi: 'शिवजी ने प्रसन्न होकर उनका नाम "गणेश" रखा; गन्धर्व गाने लगे और देवताओं ने पुष्प बरसाए।',
    en: 'Rejoicing, Shiva named Him "Ganesha"; celestial gandharvas sang and gods showered blossoms.'
  },
  {
    sanskrit: 'प्रथम पूज्य तुमको वर दीन्हा। बुद्धि विवेक सकल जग चीन्हा॥',
    trans: 'Prathama Pujya Tumako Vara Dinha | Buddhi Viveka Sakala Jaga Chinha ||',
    hi: 'देवताओं ने आपको प्रथम पूज्य होने का वरदान दिया, और सम्पूर्ण जगत् ने आपके बुद्धि-विवेक को पहचाना।',
    en: 'The gods granted You the boon of being worshipped first in every ritual, revered worldwide as wisdom.'
  },
  {
    sanskrit: 'बारह नाम पढ़े जो ध्यावै। सब सुख लहै परम फल पावै॥',
    trans: 'Baraha Nama Padhe Jo Dhyawai | Saba Sukha Lahai Parama Phala Pawai ||',
    hi: 'जो आपके बारह पावन नामों का पाठ और ध्यान करता है, वह सभी सुख प्राप्त कर परम पद पाता है।',
    en: 'Whoever recites and meditates upon Your twelve sacred names attains all happiness and supreme fulfillment.'
  },
  {
    sanskrit: 'सुमुख एकदन्त कपिला अरु। गजकर्णक लम्बोदर करु॥',
    trans: 'Sumukha Ekadanta Kapila Aru | Gajakarnaka Lambodara Karu ||',
    hi: 'सुमुख, एकदन्त, कपिल, गजकर्ण, लम्बोदर—ये आपके दिव्य रूप हैं।',
    en: 'Sumukha (the gracious-faced), Ekadanta (single-tusked), Kapila, Gajakarna (elephant-eared), Lambodara (pot-bellied).'
  },
  {
    sanskrit: 'विकट विनायक धूम्रकेतु। गणाध्यक्ष भालचन्द्र सचेतु॥',
    trans: 'Vikata Vinayaka Dhumraketu | Ganadhyaksha Bhalachandra Sachetu ||',
    hi: 'विकट, विनायक, धूम्रकेतु, गणाध्यक्ष और भालचन्द्र—ये आपके अमोघ नाम हैं।',
    en: 'Vikata (the formidable), Vinayaka (supreme guide), Dhumraketu (smoke-hued), Ganadhyaksha (leader of hosts), and Bhalachandra (moon-crested).'
  },
  {
    sanskrit: 'गजानन द्वादश नामावली। जपे जो सब संशय जाहिं टरी॥',
    trans: 'Gajanana Dwadasha Namavali | Jape Jo Saba Sanshaya Jahin Tari ||',
    hi: 'गजानन सहित यह बारह नामों की नामावली जो जपता है, उसके समस्त संशय और भय मिट जाते हैं।',
    en: 'Whoever chants these twelve names concluding with Gajanana overcomes all doubt and peril.'
  },
  {
    sanskrit: 'विद्यार्थी लभते विद्यां। धनार्थी लभते धनं॥',
    trans: 'Vidyarthi Labhate Vidyam | Dhanarthi Labhate Dhanam ||',
    hi: 'विद्या का अभिलाषी विद्या प्राप्त करता है, और धन का अभिलाषी धन-वैभव प्राप्त करता है।',
    en: 'Seekers of learning attain profound knowledge, and seekers of wealth attain abundant prosperity.'
  },
  {
    sanskrit: 'पुत्रार्थी लभते पुत्रान्। मोक्षार्थी लभते गतिं॥',
    trans: 'Putrarthi Labhate Putran | Moksharthi Labhate Gatim ||',
    hi: 'पुत्र का अभिलाषी उत्तम सन्तान पाता है, और मोक्ष का अभिलाषी परम गति को प्राप्त करता है।',
    en: 'Those desiring noble lineage are blessed with children, and seekers of liberation attain the supreme abode.'
  },
  {
    sanskrit: 'जपहिं निरन्तर जो नर कोई। ताके काज सिद्ध सब होई॥',
    trans: 'Japahin Nirantara Jo Nara Koi | Take Kaja Siddha Saba Hoi ||',
    hi: 'जो मनुष्य निरन्तर इस चालीसा का जप करता है, उसके समस्त कार्य सिद्ध हो जाते हैं।',
    en: 'Whosoever continuously recites this prayer sees all their noble endeavors crowned with success.'
  },
  {
    sanskrit: 'दुर्गम काज बनावनहारे। भक्तन के संकट टरटारे॥',
    trans: 'Durgama Kaja Banawanahare | Bhaktana Ke Sankata Taratare ||',
    hi: 'आप असम्भव व कठिन कार्यों को भी सुगम बना देते हैं और भक्तों के समस्त संकटों को दूर कर देते हैं।',
    en: 'You make the most insurmountable tasks effortless and cast away every sorrow of Your devotees.'
  },
  {
    sanskrit: 'मोदक भोग लगावैं जोई। मनवांछित फल पावै सोई॥',
    trans: 'Modaka Bhoga Lagawain Joi | Manawanchhita Phala Pawai Soi ||',
    hi: 'जो आपको प्रेम से मोदक का भोग लगाता है, वह अपने मनवांछित फल प्राप्त करता है।',
    en: 'Whoever devoutly offers sweet modakas to You reaps the cherished desires of their heart.'
  },
  {
    sanskrit: 'दूर्वा दल जो तुम्हे चढ़ावै। ताके सब क्लेश नशावै॥',
    trans: 'Durva Dala Jo Tumhe Chadhawai | Take Saba Klesha Nashawai ||',
    hi: 'जो आपको पवित्र दूर्वा दल अर्पित करता है, उसके समस्त क्लेश और सन्ताप नष्ट हो जाते हैं।',
    en: 'Whoever presents green durva blades at Your feet sees all inner anxieties and afflictions obliterated.'
  },
  {
    sanskrit: 'सिन्दूर शोभित मस्तक राता। विघ्न विनाशन बुद्धि विधाता॥',
    trans: 'Sindura Shobhita Mastaka Rata | Vighna Vinashana Buddhi Vidhata ||',
    hi: 'आपके मस्तक पर लाल सिन्दूर सुशोभित है; आप विघ्नों का विनाश करने वाले और बुद्धि प्रदान करने वाले हैं।',
    en: 'Your radiant head glows adorned with vermilion; You are the destroyer of obstacles and the giver of intellect.'
  },
  {
    sanskrit: 'भक्तन के तुम रक्षक स्वामी। घट घट वासी अन्तर्यामी॥',
    trans: 'Bhaktana Ke Tuma Rakshaka Swami | Ghata Ghata Vasi Antaryami ||',
    hi: 'हे स्वामी! आप अपने भक्तों के रक्षक हैं, और प्रत्येक घट में वास करने वाले अन्तर्यामी हैं।',
    en: 'You are the eternal guardian of devotees, the omnipresent indweller knowing every heart.'
  },
  {
    sanskrit: 'अन्धक असुर संहारे भ्राता। सुर मुनि सब मिलि गुण गाता॥',
    trans: 'Andhaka Asura Sanhare Bhrata | Sura Muni Saba Mili Guna Gata ||',
    hi: 'दुष्ट असुरों का संहार करने वाले आप हैं; समस्त देव और मुनि मिलकर आपके गुणों का गान करते हैं।',
    en: 'Destroyer of evil demons, You are venerated by all celestials and sages singing Your praises.'
  },
  {
    sanskrit: 'दीन दयाल दया निधि देवा। मोरे काज करहु शुभ सेवा॥',
    trans: 'Dina Dayala Daya Nidhi Deva | More Kaja Karahu Shubha Sewa ||',
    hi: 'हे दीनदयाल! दया के निधान! मुझ सेवक के समस्त कार्यों को शुभ और सफल बनाएं।',
    en: 'O compassionate Lord of the meek, treasury of mercy! Bless all our endeavors with auspicious completion.'
  },
  {
    sanskrit: 'दास जानि अपनावहु स्वामी। क्षमहु चूक मम अन्तर्यामी॥',
    trans: 'Dasa Jani Apanawahu Swami | Kshamahu Chuka Mama Antaryami ||',
    hi: 'मुझे अपना दास जानकर स्वीकार कीजिए, और हे अन्तर्यामी! मेरी समस्त भूलों को क्षमा कीजिए।',
    en: 'Accept me as Your humble servant, O omniscient Master, and forgive all my shortcomings.'
  },
  {
    sanskrit: 'जो यह पाठ करै चित्त लाई। ताके गृह बसै सुखदाई॥',
    trans: 'Jo Yaha Patha Karai Chitta Lai | Take Griha Basai Sukhadai ||',
    hi: 'जो एकाग्रचित्त होकर इस चालीसा का पाठ करता है, उसके घर में सुख और शान्ति का वास होता है।',
    en: 'Whoever chants this recitation with sincere concentration finds joy, harmony, and peace gracing their home.'
  },
  {
    sanskrit: 'चालीस दिन चालीस बांरा। पाठ करै जो प्रेम अपारा॥',
    trans: 'Chalisa Dina Chalisa Banra | Patha Karai Jo Prema Apara ||',
    hi: 'जो चालीस दिनों तक प्रेमपूर्वक चालीस बार इसका पाठ करता है,',
    en: 'Whoever recites this prayer forty times over forty days with boundless devotion,'
  },
  {
    sanskrit: 'ताके सब संशय मिटि जाहीं। सुख सम्पत्ति बाढ़े अधिकाहीं॥',
    trans: 'Take Saba Sanshaya Miti Jahin | Sukha Sampatti Badhe Adhikahin ||',
    hi: 'उसके समस्त संशय मिट जाते हैं और उसके घर में सुख-सम्पत्ति की अपार वृद्धि होती है।',
    en: 'Has all doubts dissipated and is blessed with escalating peace, well-being, and prosperity.'
  },
  {
    sanskrit: 'गणपति की जो शरण पुकारे। ताके काज सदा सुधारे॥',
    trans: 'Ganapati Ki Jo Sharana Pukare | Take Kaja Sada Sudhare ||',
    hi: 'जो भगवान गणपति की शरण में आता है, उसके समस्त कार्य सदा सिद्ध हो जाते हैं।',
    en: 'Whoever seeks refuge in Lord Ganapati finds all their challenges resolved forever.'
  }
];

const ganeshChalisaVerses: PrayerVerse[] = [
  ganeshChalisaExisting.verses[0], // Opening Doha
  ...ganeshChaupaisData.map((c, idx) => ({
    verseNumber: idx + 2,
    verseType: 'chaupai' as const,
    sanskrit: c.sanskrit,
    transliteration: c.trans,
    hindiMeaning: c.hi,
    englishMeaning: c.en
  })),
  {
    verseNumber: 42,
    verseType: 'doha',
    sanskrit: 'नित नव मंगल गृह बसै लहै जगत सनमान।\nसम्बन्ध सबहिं सों सुधरै बुद्धि होय बलवान॥',
    transliteration: 'Nita Nava Mangala Griha Basai Lahai Jagata Sanmana |\nSambandha Sabahin Son Sudharai Buddhi Hoya Balawana ||',
    hindiMeaning: 'उसके घर में नित्य नया मंगल होता है, संसार में सम्मान प्राप्त होता है, सबके साथ सम्बन्ध सुधरते हैं और बुद्धि बलवान होती है।',
    englishMeaning: 'New joy and auspiciousness daily grace their home; they earn worldly honor, relational harmony, and formidable intellectual strength.'
  },
  {
    verseNumber: 43,
    verseType: 'doha',
    sanskrit: 'श्री गणेश चालीसा पढ़ी जो ध्यावै चित्त लाय।\nसब संकट कटि जाहिं तिन विघ्न न बाधा आय॥',
    transliteration: 'Shri Ganesha Chalisa Padhi Jo Dhyawai Chitta Laya |\nSaba Sankata Kati Jahin Tina Vighna Na Badha Aaya ||',
    hindiMeaning: 'जो मनुष्य मन लगाकर श्रीगणेश चालीसा का पाठ और ध्यान करता है, उसके समस्त संकट कट जाते हैं और कभी कोई विघ्न-बाधा नहीं आती।',
    englishMeaning: 'Whoever recites and meditates upon this Shri Ganesh Chalisa with earnest devotion is freed from every crisis, and no obstacles can ever hinder their path.'
  }
];

const ganeshChalisa: PrayerRecord = {
  ...ganeshChalisaExisting,
  totalVerses: 43,
  verses: ganeshChalisaVerses
};

// Combine all 8 complete prayers
const COMPLETE_DATABASE: PrayerRecord[] = [
  hanumanChalisa,
  shivTandavStotram,
  shriSuktam,
  sankatMochan,
  adityaHridayaStotram,
  ganeshChalisa,
  omJaiJagdish,
  pratahsmarana
];

// Generate TypeScript code
const fileContent = `import { PrayerRecord } from './types';

export const PRAYERS_DATA: PrayerRecord[] = ${JSON.stringify(COMPLETE_DATABASE, null, 2)};
`;

const targetPath = path.resolve(__dirname, '../../app/lib/prayers/data.ts');
fs.writeFileSync(targetPath, fileContent, 'utf-8');
console.log('Successfully written complete PRAYERS_DATA to:', targetPath);
for (const p of COMPLETE_DATABASE) {
  console.log(`• ${p.id.padEnd(28)}: ${p.verses.length} verses (metadata total: ${p.totalVerses})`);
}
