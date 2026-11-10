import * as fs from 'fs';
import { PrayerRecord, PrayerVerse } from '../../app/lib/prayers/types';
import { PRAYERS_DATA as CURRENT_DATA } from '../../app/lib/prayers/data';

// 1. Shiv Tandav Stotram (All 15 verses complete)
const shivTandavVerses: PrayerVerse[] = [
  CURRENT_DATA.find(p => p.id === 'shiv-tandav-stotram')!.verses[0],
  CURRENT_DATA.find(p => p.id === 'shiv-tandav-stotram')!.verses[1],
  CURRENT_DATA.find(p => p.id === 'shiv-tandav-stotram')!.verses[2],
  CURRENT_DATA.find(p => p.id === 'shiv-tandav-stotram')!.verses[3],
  CURRENT_DATA.find(p => p.id === 'shiv-tandav-stotram')!.verses[4],
  {
    verseNumber: 6,
    verseType: 'sloka',
    sanskrit: 'ललाटचत्वरज्वलद्धनञ्जयस्फुलिङ्गभा-\nनिपीतपञ्चसायकं नमन्निलिम्पनायकम्।\nसुधामयूखलेखया विराजमानशेखरं\nमहाकपालिसम्पदेशिरोजटालमस्तु नः॥',
    transliteration: 'Lalatachatwarajwaladdhananjayasphulingabha-\nNipitapanchasayakam Namannilimpanayakam |\nSudhamayukhalekhaya Virajamanashekharam\nMahakapalisampadeshirojatalamastu Nah ||',
    hindiMeaning: 'जिनके ललाट रूपी प्रांगण में धधकती हुई अग्नि की ज्वालाओं ने कामदेव को भस्म कर दिया, जिन्हें देवराज इन्द्र सहित समस्त देवगण नमन करते हैं, जिनके मस्तक पर चन्द्रकला सुशोभित है, वे जटाधारी भगवान शिव हमें परम सम्पदा प्रदान करें।',
    englishMeaning: 'May the matted locks of Lord Shiva, from whose forehead courtyard sparks of fire blazed forth and consumed Kamadeva, who is saluted by the lord of celestials (Indra), and whose crest is adorned by the nectar-beamed crescent moon, bestow upon us supreme spiritual treasure.'
  },
  {
    verseNumber: 7,
    verseType: 'sloka',
    sanskrit: 'करालभालपट्टिकाधगद्धगद्धगज्ज्वल-\nद्धनञ्जयाहुतीकृतप्रचण्डपञ्चसायके।\nधराधरेन्द्रनन्दिनीकुचाग्रचित्रपत्रक-\nप्रकल्पनैकशिल्पिनि त्रिलोचने रतिर्मम॥',
    transliteration: 'Karalabhalapattikadhagaddhagaddhagajjwala-\nDdhananjayāhutikritaprachandapanchasayake |\nDharadharendranandinikuchagrachitrapatraka-\nPrakalpanaikashilpini Trilocane Ratirmama ||',
    hindiMeaning: 'जिनके विकराल ललाट पट्ट पर धक-धक करती प्रज्वलित अग्नि में कामदेव की आहुति हो गई, तथा जो गिरिराज किशोरी माँ पार्वती के शृंगार हेतु एकमात्र सिद्ध शिल्पी हैं, उन त्रिनेत्रधारी भगवान शंकर में मेरा अनन्य अनुराग रहे।',
    englishMeaning: 'May my love be centered in that Three-Eyed Lord, upon the terrible surface of whose forehead the flaming fire blazed and devoured Kamadeva, and who is the master artist painting the auspicious designs on Goddess Parvati.'
  },
  {
    verseNumber: 8,
    verseType: 'sloka',
    sanskrit: 'नवीनमेघमण्डलीनिरुद्धदुर्धरस्फुरत्-\nकुहूनिशीथिनीतमःप्रबन्धबद्धकन्धरः।\nनिलिम्पनिर्झरीधरस्तनोतु कृत्तिसिन्धुरः\nकलानिधानबन्धुरः श्रियं जगद्धुरन्धरः॥',
    transliteration: 'Navinameghamandaliniruddhadurdharasphurat-\nKuhunishithinitamahprabandhabaddhakandharah |\nNilimpanirjharidharastanotu Krittisindhurah\nKalanidhanabandhurah Shriyam Jagaddhurandharah ||',
    hindiMeaning: 'नवीन मेघमालाओं के समान घने और अमावस्या की अर्धरात्रि के अन्धकार सदृश नील वर्ण कण्ठ वाले, देवनदी गंगा को धारण करने वाले, गजचर्म परिधारी, चन्द्रमा से सुशोभित, सम्पूर्ण जगत् के भार को वहन करने वाले भगवान शिव हमें ऐश्वर्य प्रदान करें।',
    englishMeaning: 'Whose throat shines with the darkness of dense new clouds and the depth of midnight darkness on an Amavasya night, who holds the celestial Ganga, wears the elephant skin, is crowned by the treasury of arts (the moon), and sustains the universe—may He grant us eternal radiance.'
  },
  {
    verseNumber: 9,
    verseType: 'sloka',
    sanskrit: 'प्रफुल्लनीलपङ्कजप्रपञ्चकालिमप्रभा-\nवलम्बिकण्ठकन्दलीरुचिप्रबद्धकन्धरम्।\nस्मरच्छिदं पुरच्छिदं भवच्छिदं मखच्छिदं\nगजच्छिदान्धकच्छिदं तमन्तकच्छिदं भजे॥',
    transliteration: 'Praphullanilapankajaprapanchakalimaprabha-\nValambikanthakandaliruchiprabaddhakandharam |\nSmarachchhidam Purachchhidam Bhavachchhidam Makhachchhidam\nGajachchhidandhakachchhidam Tamantakachchhidam Bhaje ||',
    hindiMeaning: 'खिले हुए नीलकमल के सदृश कालिमायुक्त प्रभा से सुशोभित कण्ठ वाले, कामदेव, त्रिपुरासुर, संसार-बन्धन, दक्ष-यज्ञ, गजासुर और अन्धकासुर का संहार करने वाले, तथा यमराज का भी दलन करने वाले भगवान शिव का मैं भजन करता हूँ।',
    englishMeaning: 'I worship that Lord Shiva whose neck possesses the lustrous dark hue of a blooming blue lotus, who destroyed Kamadeva, shattered the three citadels (Tripura), severs worldly bondage, ruined the ego-sacrifice of Daksha, slew Gajasura and Andhakasura, and humbled Yamaraja (Antaka).'
  },
  {
    verseNumber: 10,
    verseType: 'sloka',
    sanskrit: 'अखर्वसर्वमङ्गलाकलाकदम्बमञ्जरी-\nरसप्रवाहमाधुरीविजृम्भणामधुव्रतम्।\nस्मरान्तकं पुरान्तकं भवान्तकं मखान्तकं\nगजान्तकान्धकान्तकं तमन्तकान्तकं भजे॥',
    transliteration: 'Akharvasarwamangalakalakadambamanjari-\nRasapravahamadhurivijrimbhanamadhuvratam |\nSmarantakam Purantakam Bhavantakam Makhantakam\nGajantakandhakantakam Tamantakantakam Bhaje ||',
    hindiMeaning: 'जो सर्वमंगला माता पार्वती के कला रूपी कदम्ब पुष्पों के मधुर रस प्रवाह का आस्वादन करने वाले भौंरे के समान हैं, कामदेव, त्रिपुरासुर, जन्म-मरण बन्धन, मख, गजासुर, अन्धकासुर और यमराज का विनाश करने वाले हैं, उन भगवान शिव का मैं निरन्तर स्तवन करता हूँ।',
    englishMeaning: 'Who is the divine honeybee drinking the sweet flowing nectar of the blossoming kadamba blossoms of Goddess Sarvamangala arts, the vanquisher of Kama, Tripura, Samsara, Daksha’s sacrifice, Gajasura, Andhaka, and Death itself—Him I adore.'
  },
  {
    verseNumber: 11,
    verseType: 'sloka',
    sanskrit: 'जयत्वदभ्रविभ्रमभ्रमद्भुजङ्गमश्वस-\nद्विनिर्गमत्क्रमस्फुरत्करालभालहव्यवाट्।\nधिमिद्धिमिद्धिमिध्वनन्मृदङ्गतुङ्गमङ्गल-\nध्वनिक्रमप्रवर्तितप्रचण्डताण्डवः शिवः॥',
    transliteration: 'Jayatvadabhravibhramabhramadbhujangamashwasa-\nDwinirgamattkramasphuratkaralabhalahavyavat |\nDhimiddhimiddhimidhwananmridangatungamangala-\nDhwanikramapravartitaprachandatandavah Shivah ||',
    hindiMeaning: 'आकाश में वेग से चक्कर काटते हुए सर्पों के फुफकारने से जिनके भयानक ललाट की अग्नि धधक रही है, तथा मृदंग की धिम-धिम की मंगलकारी गम्भीर ध्वनि के ताल पर जिनका प्रचण्ड ताण्डव नृत्य हो रहा है, उन देवाधिदेव शिव की जय हो।',
    englishMeaning: 'Victorious is Lord Shiva, whose forehead fire blazes terrifyingly fanned by the agitated hissing of revolving serpents, dancing His fierce, awe-inspiring Tandava to the profound, auspicious rhythmic resonance of the mridangam!'
  },
  {
    verseNumber: 12,
    verseType: 'sloka',
    sanskrit: 'दृषद्विचित्रतल्पयोर्भुजङ्गमौक्तिकस्रजोर-\nगरिष्ठरत्नलोष्ठयोः सुहृद्विपक्षपक्षयोः।\nतृणारविन्दचक्षुषोः प्रजामहीमहेन्द्रयोः\nसमप्रवृत्तिकः कदा सदाशिवं भजाम्यहम्॥',
    transliteration: 'Drishadvichitratelpayorbhujangamauktikasrajor-\nGarishtaratnaloshtayoh Suhridwipakshapakshayoh |\nTrinaravindachakshushoh Prajamahimahendrayoh\nSamapravrittikah Kada Sadashivam Bhajamyaham ||',
    hindiMeaning: 'कठोर पाषाण अथवा कोमल शय्या में, सर्प अथवा मोतियों की माला में, बहुमूल्य रत्न अथवा मिट्टी के ढेले में, मित्र अथवा शत्रु में, तिनके अथवा कमल-नयनों में, साधारण प्रजा अथवा चक्रवर्ती सम्राट में समभाव रखता हुआ मैं कब सदाशिव का भजन करूँगा?',
    englishMeaning: 'When will I view alike a hard stone and a soft bed, a snake and a pearl necklace, a priceless gem and a lump of clay, a friend and an enemy, a blade of grass and a lotus-eyed person, a commoner and an emperor, and worship the eternal Sadashiva with equal vision?'
  },
  {
    verseNumber: 13,
    verseType: 'sloka',
    sanskrit: 'कदा निलिम्पनिर्झरीनिकुञ्जकोटरे वसन्\nविमुक्तदुर्मतिः सदा शिरःस्थमञ्जलिं वहन्।\nविमुक्तलोललोचनो ललामभाललग्नकः\nशिवेति मन्त्रमुच्चरन् कदा सुखी भवाम्यहम्॥',
    transliteration: 'Kada Nilimpanirjharinikunjakotare Vasan\nVimuktadurmatih Sada Shirahsthamanjalim Vahan |\nVimuktalolalochano Lalamabhalalagnakah\nShiveti Mantramuchcharan Kada Sukhi Bhavamyaham ||',
    hindiMeaning: 'कब मैं देवनदी गंगा के तट पर लताकुंजों में वास करता हुआ, समस्त कुविचारों से मुक्त होकर, सिर पर अंजलि बांधे, चंचल नेत्रों को त्यागकर, ललाट पर तिलक लगाए, केवल "शिव" मन्त्र का उच्चारण करते हुए परम आनन्द को प्राप्त करूँगा?',
    englishMeaning: 'Living in the forest groves along the celestial Ganga, freed from impure thoughts, hands folded upon my head in prayer, unswerving in contemplation upon that radiant forehead, chanting the holy mantra "Shiva"—when will I attain that supreme peace?'
  },
  {
    verseNumber: 14,
    verseType: 'sloka',
    sanskrit: 'इमं हि नित्यमेवमुक्तमुत्तमोत्तमं स्तवं\nपठन्स्मरन्ब्रुवन्नरो विशुद्धिमेति संततम्।\nहरे गुरौ सुभक्तिमाशु याति नान्यथा गतिं\nविमोहनं हि देहिनां सुशङ्करस्य चिन्तनम्॥',
    transliteration: 'Imam Hi Nityamevamuktamuttamottamam Stavam\nPathansmaranbruvannaro Vishuddhineti Santatam |\nHare Gurau Subhaktimashu Yati Nanyatha Gatim\nVimohanam Hi Dehinam Sushankarasya Chintanam ||',
    hindiMeaning: 'इस प्रकार कहे गए इस सर्वोत्तम स्तोत्र का जो मनुष्य नित्य पाठ, स्मरण अथवा कीर्तन करता है, वह सदा पवित्र रहता है। वह शीघ्र ही देवाधिदेव शिव में अविचल भक्ति प्राप्त करता है और कभी अधोगति को प्राप्त नहीं होता; क्योंकि भगवान शंकर का चिन्तन समस्त मोह का नाश करने वाला है।',
    englishMeaning: 'Whosoever regularly recites, meditates upon, and proclaims this sublime hymn attains continuous inner purity. They swiftly attain unwavering devotion to Lord Shiva, the universal Guru, escaping rebirth; for meditation upon auspicious Shiva dispels all worldly delusion.'
  },
  {
    verseNumber: 15,
    verseType: 'sloka',
    sanskrit: 'पूजावसानसमये दशवक्त्रगीतं\nयः शम्भुपूजनपरं पठति प्रदोषे।\nतस्य स्थिरां रथगजेन्द्रतुरङ्गयुक्तां\nलक्ष्मीं सदैव सुमुखीं प्रददाति शम्भुः॥',
    transliteration: 'Pujavasanasamaye Dashavaktragitam\nYah Shambhupujanaparam Pathati Pradoshe |\nTasya Sthiram Rathagajendraturangayuktam\nLakshmim Sadaiva Sumukhim Pradadati Shambhuh ||',
    hindiMeaning: 'प्रदोष काल में शिव पूजन के उपरान्त जो मनुष्य रावण द्वारा रचित इस स्तोत्र का पाठ करता है, भगवान शिव उसे रथ, हाथी और घोड़ों से परिपूर्ण स्थिर लक्ष्मी तथा सदा अनुकूल रहने वाली समृद्धि प्रदान करते हैं।',
    englishMeaning: 'Whoever recites this hymn composed by the ten-headed Ravana after the worship of Lord Shiva during Pradosha dusk—to that devotee Lord Shambhu grants enduring prosperity accompanied by chariots, elephants, horses, and favorable fortune forever.'
  }
];

const shivTandavStotram: PrayerRecord = {
  ...CURRENT_DATA.find(p => p.id === 'shiv-tandav-stotram')!,
  totalVerses: 15,
  verses: shivTandavVerses
};

console.log('Shiv Tandav built with verses:', shivTandavStotram.verses.length);

// Write to verify
fs.writeFileSync('/tmp/test_built_tandav.json', JSON.stringify(shivTandavStotram, null, 2));
