export interface FestivalMetaRecord {
  nameDevanagari: string;
  deity: string;
  pujaMuhurta: string;
  significance: string;
  rituals: string[];
}

export const FESTIVAL_METADATA_MAP: Record<string, FestivalMetaRecord> = {
  'Makar Sankranti / Pongal / Uttarayana': {
    nameDevanagari: 'मकर संक्रांति / पोंगल / उत्तरायण',
    deity: 'Surya Dev (सूर्य देव)',
    pujaMuhurta: 'Mahapunya Kaal & Punya Kaal around Sunrise',
    significance: 'Celestial transit of the Sun into the sign of Makara (Capricorn), marking the start of Uttarayana, the auspicious six-month northward journey of the Sun.',
    rituals: [
      'Holy dip (Snana) in sacred rivers (Ganga, Yamuna, Godavari).',
      'Charity (Daana) of sesame seeds (Til), jaggery (Gud), warm clothes, and khichdi.',
      'Surya Arghya with red flowers, vermilion, and water in copper vessel.',
    ],
  },
  'Vasant Panchami (Saraswati Puja)': {
    nameDevanagari: 'वसन्त पञ्चमी (सरस्वती पूजा)',
    deity: 'Maa Saraswati (माँ सरस्वती)',
    pujaMuhurta: 'Purvahna Kaal (Morning to Midday)',
    significance: 'Marks the onset of Vasanta Ritu (Spring) and honors Maa Saraswati, the Goddess of wisdom, learning, music, and divine arts.',
    rituals: [
      'Wearing yellow garments and offering yellow flowers, saffron rice, and sweets.',
      'Vidhyarambham / Akshar Abhyasam ceremony for initiating children into learning.',
      'Saraswati Vandana and worshipping books, musical instruments, and pens.',
    ],
  },
  'Ratha Saptami': {
    nameDevanagari: 'रथ सप्तमी (सूर्य जयंती)',
    deity: 'Surya Bhagavan (भगवान सूर्य)',
    pujaMuhurta: 'Arunodaya / Sunrise Snana',
    significance: 'Surya Jayanti, celebrating the birth of Lord Surya and the turning of His celestial chariot drawn by seven horses representing the rainbow colors.',
    rituals: [
      'Snana before sunrise holding Ark leaves (Calotropis) on head and shoulders.',
      'Surya Gayatri Japa and offering Arghya facing east.',
      'Cooking milk kheer in earthen pot over open fire.',
    ],
  },
  'Maha Shivaratri': {
    nameDevanagari: 'महाशिवरात्रि',
    deity: 'Lord Shiva & Mata Parvati (भगवान शिव एवं माता पार्वती)',
    pujaMuhurta: 'Nishita Kaal (Midnight) & 4 Prahara Puja',
    significance: 'The Great Night of Shiva, commemorating the celestial cosmic dance (Tandava) and the divine union of Shiva and Shakti. Highest day for transcending ignorance.',
    rituals: [
      'Strict fasting (Nirjala or Phalahara) throughout day and night.',
      'Continuous Abhishekam with Panchamrita (Milk, Curd, Ghee, Honey, Sugar), Ganga jal, and Belpatra.',
      'Chanting Maha Mrityunjaya Mantra and Om Namah Shivaya throughout the four night praharas.',
    ],
  },
  'Holika Dahan': {
    nameDevanagari: 'होलिका दहन (छोटी होली)',
    deity: 'Lord Narasimha & Bhakta Prahlada (भगवान नृसिंह)',
    pujaMuhurta: 'Pradosha Kaal without Bhadra',
    significance: 'Celebrates the triumph of devout faith and righteousness (Dharma) over demonic hubris, remembering Prahlada’s salvation from the fire of Holika.',
    rituals: [
      'Lighting the sacred bonfire during auspicious Pradosha Kaal free of Bhadra.',
      'Parikrama (circumambulation) offering coconuts, wheat stalks, and sugarcane.',
      'Chanting protective Narasimha and Vishnu Stotras.',
    ],
  },
  'Holi / Dhulivandan (Rangwali Holi)': {
    nameDevanagari: 'होली / धूलिवन्दन (रंगवाली होली)',
    deity: 'Radha-Krishna & Lord Vishnu (श्रीराधा-कृष्ण)',
    pujaMuhurta: 'Pratipada Morning / Daytime',
    significance: 'The festival of divine love and vibrant joy, commemorating the divine leelas of Radha-Krishna in Braj and greeting the fertile spring season.',
    rituals: [
      'Applying herbal gulal and colors to deities, elders, and loved ones.',
      'Distributing traditional sweets like gujiya, thandai, and puran poli.',
      'Singing Hori bhajans and fostering reconciliation and brotherhood.',
    ],
  },
  'Gudi Padwa / Ugadi / Chaitra Navratri begins': {
    nameDevanagari: 'गुड़ी पड़वा / उगादि / चैत्र नवरात्रि घटस्थापना',
    deity: 'Lord Brahma & Maa Durga (ब्रह्मा जी एवं माँ दुर्गा)',
    pujaMuhurta: 'Pratah Kaal / Sunrise Ghatasthapana',
    significance: 'The Vedic New Year (Navasamvatsara), marking the exact cosmological day Lord Brahma began the creation of the Universe, and beginning of Chaitra Navratri.',
    rituals: [
      'Raising the auspicious Gudi flag adorned with neem leaves, mango twigs, and copper kalash.',
      'Partaking neem leaves with jaggery symbolizing the bittersweet nature of life.',
      'Ghatasthapana and installing Maa Durga kalash for 9-day Navratri worship.',
    ],
  },
  'Rama Navami': {
    nameDevanagari: 'रामनवमी',
    deity: 'Maryada Purushottama Lord Rama (श्रीरामचन्द्र)',
    pujaMuhurta: 'Madhyahna Kaal (Midday at 12:00 PM)',
    significance: 'Celebrates the divine incarnation (Avatara) of Lord Rama in Ayodhya at midday during the Abhijit Muhurta in Chaitra Shukla Navami.',
    rituals: [
      'Recitation of Ramacharitmanas and Valmiki Ramayana.',
      'Noontime Rama Janmotsava puja with panchamrit abhishekam and cradle rocking.',
      'Distribution of panakam, kosambari, and tulsi prasad.',
    ],
  },
  'Mahavir Jayanti': {
    nameDevanagari: 'महावीर जयंती',
    deity: 'Bhagavan Mahavira (भगवान महावीर)',
    pujaMuhurta: 'Morning Snana & Ahimsa Prayer',
    significance: 'Birth anniversary of the 24th Tirthankara Bhagavan Mahavira, champion of Ahimsa (non-violence), Satya (truth), and Aparigraha (non-possession).',
    rituals: [
      'Abhisheka of Mahavira idol with water and milk.',
      'Practicing Ahimsa and charity to the needy.',
      'Reflecting on the 5 Great Vows (Mahavratas).',
    ],
  },
  'Hanuman Jayanti': {
    nameDevanagari: 'श्रीहनुमान जयंती',
    deity: 'Lord Hanuman (पवनपुत्र श्रीहनुमान)',
    pujaMuhurta: 'Purnima Sunrise to Midday',
    significance: 'Celebrates the birth of Lord Hanuman, the supreme devotee of Lord Rama, embodiment of selfless service, colossal strength, and divine wisdom.',
    rituals: [
      'Offering vermilion (Sindoor) and jasmine oil (Chamelika Tel) to Lord Hanuman.',
      'Chanting Hanuman Chalisa, Sundarkand, and Bajrang Baan.',
      'Offering laddu, jalebi, and sacred Tulsi garlands.',
    ],
  },
  'Akshaya Tritiya': {
    nameDevanagari: 'अक्षय तृतीया (आखा तीज)',
    deity: 'Maa Lakshmi & Lord Narayana (महालक्ष्मी एवं श्रीविष्णु)',
    pujaMuhurta: 'Pratah to Madhyahna Kaal',
    significance: 'A day of limitless auspiciousness where all positive deeds, spiritual tapas, and charitable donations bear perpetual and imperishable (Akshaya) merit.',
    rituals: [
      'Beginning new ventures, ceremonies, and financial investments.',
      'Daana of earthen pots (Ghata), water, barley (Yava), and umbrella to the needy.',
      'Worship of Kubera, Lord Vishnu, and buying gold or silver as a mark of enduring prosperity.',
    ],
  },
  'Buddha Purnima': {
    nameDevanagari: 'बुद्ध पूर्णिमा (वैशाख पूर्णिमा)',
    deity: 'Gautama Buddha / Vishnu Avatara (भगवान बुद्ध)',
    pujaMuhurta: 'Purnima Midday and Evening',
    significance: 'Triple blessed day marking the birth, enlightenment (Bodhi), and Mahaparinirvana of Gautama Buddha.',
    rituals: [
      'Meditation on compassion, loving-kindness (Metta), and mindfulness.',
      'Pouring water around Bodhi / Peepal tree roots.',
      'Fasting and non-violence.',
    ],
  },
  'Ganga Dussehra': {
    nameDevanagari: 'गंगा दशहरा',
    deity: 'Mata Ganga (माँ गङ्गा)',
    pujaMuhurta: 'Dashami Madhyahna / Morning',
    significance: 'Marks the sacred descent of the holy river Ganga (Gangavatarana) from the heavens to Earth through the locks of Lord Shiva to liberate King Sagara’s ancestors.',
    rituals: [
      'Snana in River Ganga or with Ganga jal added to bath water.',
      'Offering ten types of flowers, ten fruits, and ten deepas (Dasha-vidha Daana).',
      'Chanting Ganga Stotram to eradicate ten types of sins.',
    ],
  },
  'Vat Purnima': {
    nameDevanagari: 'वट पूर्णिमा व्रत',
    deity: 'Savitri & Satyavan (सावित्री-सत्यवान)',
    pujaMuhurta: 'Purnima Morning',
    significance: 'Honors the devotion of Savitri who through unwavering chastity and intellect compelled Lord Yama to return the soul of her departed husband Satyavan.',
    rituals: [
      'Wives tying sacred red/yellow thread (Raksha Sutra) around Banyan tree (Vat Vriksha).',
      'Watering Banyan roots and offering fruits and sprouted grains.',
      'Prayers for longevity and wellbeing of husband and family.',
    ],
  },
  'Jagannath Rath Yatra': {
    nameDevanagari: 'जगन्नाथ रथयात्रा',
    deity: 'Lord Jagannath, Balabhadra & Subhadra (भगवान जगन्नाथ)',
    pujaMuhurta: 'Dwitiya Pratah Kaal / Yatra Commencement',
    significance: 'The grand chariot procession in Puri where the Lord of the Universe leaves His inner sanctum to grant darshan to every soul on the grand road.',
    rituals: [
      'Pulling the sacred ropes of Nandighosa, Taladhwaja, and Darpadalana chariots.',
      'Chanting Hare Krishna Mahamantra and singing devotional kirtans.',
      'Offering Chappan Bhog and participating in temple car festivals.',
    ],
  },
  'Devshayani Ekadashi (Ashadhi Ekadashi)': {
    nameDevanagari: 'देवशयनी एकादशी (आषाढ़ी एकादशी)',
    deity: 'Lord Vishnu (क्षीरसागरशायी भगवान विष्णु)',
    pujaMuhurta: 'Ekadashi Sunrise & Harivasara',
    significance: 'Commencement of Chaturmas (four sacred months) where Lord Vishnu enters cosmic yogic slumber (Yoga Nidra) upon the coils of Sheshanaga in Ksheerasagara.',
    rituals: [
      'Taking the four-month vow of spiritual disciplines (Chaturmas Vrata).',
      'Pandharpur Wari pilgrimage darshan of Lord Vithoba.',
      'Strict fasting on grains, beans, and onions.',
    ],
  },
  'Guru Purnima': {
    nameDevanagari: 'गुरु पूर्णिमा (व्यास पूर्णिमा)',
    deity: 'Maharshi Veda Vyasa & Sadguru (महर्षि वेदव्यास)',
    pujaMuhurta: 'Purnima Midday and Evening',
    significance: 'Birth anniversary of Sage Veda Vyasa, the compiler of the Vedas and author of Mahabharata; dedicated to revering one’s spiritual preceptor (Guru).',
    rituals: [
      'Guru Puja offering flowers, fruit, and Charan Paduka vandana.',
      'Reciting the Guru Gita and reflecting on spiritual teachings.',
      'Renewing vows of humility, study, and sadhana.',
    ],
  },
  'Nag Panchami': {
    nameDevanagari: 'नाग पञ्चमी',
    deity: 'Nag Devatas: Ananta, Vasuki, Shesha (नाग देवता)',
    pujaMuhurta: 'Panchami Sunrise to Morning',
    significance: 'Worship of serpent deities (Nagas) associated with Lord Shiva and Vishnu, praying for protection from reptile harm and alleviation of Sarpa Dosha.',
    rituals: [
      'Offering milk, unboiled rice, and turmeric to sacred snake mounds or images.',
      'Avoiding ploughing or digging Earth on this sacred day.',
      'Chanting Navanaga Stotram for family wellbeing.',
    ],
  },
  'Raksha Bandhan': {
    nameDevanagari: 'रक्षाबंधन',
    deity: 'Lord Vishnu & Yama-Yamuna (भाई-बहन का रक्षा पर्व)',
    pujaMuhurta: 'Aparahna / Pradosha Kaal (Free of Bhadra)',
    significance: 'Celebration of protective love and fraternal duty where sisters tie the protective sacred thread (Rakhi) on brothers’ wrists, invoking divine blessings.',
    rituals: [
      'Observing auspicious Aparahna muhurta strictly avoiding Bhadra duration.',
      'Applying kumkum tilak, tying Rakhi, and offering sweets.',
      'Brothers pledging lifelong protection and offering gifts.',
    ],
  },
  'Krishna Janmashtami': {
    nameDevanagari: 'श्रीकृष्ण जन्माष्टमी',
    deity: 'Lord Sri Krishna (योगेश्वर श्रीकृष्ण)',
    pujaMuhurta: 'Nishita Kaal (Midnight Abhishekam)',
    significance: 'The divine midnight birth of Lord Sri Krishna, the Poorna Avatara of Vishnu, born to vanquish evil (Adharma) and re-establish Dharma on Earth.',
    rituals: [
      'Day-long fast until midnight midnight worship.',
      'Midnight Panchamrita abhishekam of Laddu Gopal idol.',
      'Chanting Bhagavad Gita chapter 12, rock cradle, and distributing Makhan-Mishri.',
    ],
  },
  'Hartalika Teej': {
    nameDevanagari: 'हरतालिका तीज',
    deity: 'Shiva-Parvati (उमा-महेश्वर)',
    pujaMuhurta: 'Pratah or Pradosha Kaal',
    significance: 'Commemorates Goddess Parvati’s severe penance in the forest to attain Lord Shiva as Her divine consort, observed by married women and maidens.',
    rituals: [
      'Making clay idols of Shiva and Parvati with sand or river clay.',
      'Fasting without water (Nirjala) and nighttime devotional vigils.',
      'Listening to Hartalika Vrat Katha and offering 16 shringar items.',
    ],
  },
  'Ganesh Chaturthi': {
    nameDevanagari: 'गणेश चतुर्थी (विनायक चतुर्थी)',
    deity: 'Lord Ganesha (विघ्नहर्ता श्रीगणेश)',
    pujaMuhurta: 'Madhyahna Kaal (Midday Ganapati Sthapana)',
    significance: 'The joyous arrival of Lord Ganesha, the remover of all obstacles and giver of intellect, worshipped at midday in Shukla Chaturthi.',
    rituals: [
      'Prana Pratishtha of eco-friendly clay Ganesha idol during Madhyahna.',
      'Offering 21 Durva grass blades, red hibiscus flowers, and Modakas.',
      'Reciting Atharvashirsha, Ganapati Aarti, and 108 names.',
    ],
  },
  'Anant Chaturdashi': {
    nameDevanagari: 'अनंत चतुर्दशी (गणेश विसर्जन)',
    deity: 'Lord Ananta Padmanabha (भगवान अनंत)',
    pujaMuhurta: 'Morning to Midday Puja & Visarjan',
    significance: 'Dedicated to Lord Ananta (the infinite aspect of Vishnu) and grand immersion (Visarjan) of Lord Ganesha idols after 10 days of festive worship.',
    rituals: [
      'Tying the 14-knot sacred Ananta thread on the right forearm.',
      'Grand procession and immersion of Ganesha idols in rivers and sea.',
      'Offering 14 pooris and pudding to Lord Vishnu.',
    ],
  },
  'Sarvapitri Amavasya (Mahalaya)': {
    nameDevanagari: 'सर्वपितृ अमावस्या (महालय)',
    deity: 'Pitru Devatas (पितर देवता)',
    pujaMuhurta: 'Aparahna / Kutapa Muhurta',
    significance: 'The culmination of Pitru Paksha where tarpana and shraddha offerings are made to all ancestors, liberating debts and receiving pitru blessings.',
    rituals: [
      'Tarpanam with black sesame seeds (Kala Til), water, and kusha grass.',
      'Brahmana Bhojanam and offering food to cows, crows, and dogs.',
      'Chanting Pitru Suktam and seeking forgiveness for ancestral peace.',
    ],
  },
  'Sharad Navratri begins (Ghatasthapana)': {
    nameDevanagari: 'शारदीय नवरात्रि घटस्थापना',
    deity: 'Mata Shailaputri & Maa Durga (माँ शैलपुत्री)',
    pujaMuhurta: 'Pratah Kaal / Abhijit Muhurta',
    significance: 'The commencement of the nine divine nights dedicated to the forms of Navadurga, embodying the supreme primordial energy (Mahashakti).',
    rituals: [
      'Kalash Sthapana (consecrating sacred pot with sacred soil and barley seeds).',
      'Lighting the Akhanda Jyoti (unbroken oil flame) for nine days.',
      'Recitation of Durga Saptashati (Devi Mahatmya).',
    ],
  },
  'Durga Ashtami (Maha Ashtami)': {
    nameDevanagari: 'दुर्गा अष्टमी (महाअष्टमी)',
    deity: 'Mata Mahagauri / Chamunda (माँ महागौरी)',
    pujaMuhurta: 'Sandhi Puja (Junction of Ashtami and Navami)',
    significance: 'The climactic day of Navratri celebrating Goddess Durga’s divine manifestation to slay Mahishasura; features the powerful Sandhi Puja with 108 lotus flowers.',
    rituals: [
      'Performing Sandhi Puja during the 48-minute juncture of Ashtami and Navami.',
      'Kanya Pujan honoring 9 young prepubescent girls as living forms of the Goddess.',
      'Offering halwa, puri, and chana prasad.',
    ],
  },
  'Maha Navami': {
    nameDevanagari: 'महानवमी',
    deity: 'Mata Siddhidatri (माँ सिद्धिदात्री)',
    pujaMuhurta: 'Madhyahna Kaal Navami Puja',
    significance: 'The ninth night celebrating the bestower of all supernatural powers and spiritual perfections (Siddhis), culminating the Navratri penance.',
    rituals: [
      'Ayudha Puja (worship of tools, vehicles, weapons, and instruments of vocation).',
      'Navami Havan / Yajna with samidha and ghee offerings.',
      'Suvasini Puja and breaking the Navratri fast (Parana) per tradition.',
    ],
  },
  'Dussehra (Vijayadashami)': {
    nameDevanagari: 'विजयादशमी (दशहरा)',
    deity: 'Lord Rama & Maa Durga (श्रीराम एवं माँ दुर्गा)',
    pujaMuhurta: 'Vijaya Muhurta & Aparahna Kaal',
    significance: 'The grand victory of good over evil: Lord Rama vanquished Ravana, and Goddess Durga vanquished Mahishasura. Ultimate day for victorious beginnings.',
    rituals: [
      'Shami tree worship (Shami Puja) and exchanging Shami leaves as gold.',
      'Aparajita Puja in the northeastern direction for victory in all endeavors.',
      'Effigy burning of Ravana, Kumbhakarna, and Meghanada.',
    ],
  },
  'Karwa Chauth': {
    nameDevanagari: 'करवा चौथ (करक चतुर्थी)',
    deity: 'Lord Shiva, Parvati, Ganesha & Chandra Dev (चन्द्र देव)',
    pujaMuhurta: 'Evening Sandhya Puja & Moonrise Arghya',
    significance: 'Unwavering festival of love and marital devotion where wives fast without water from dawn until moonrise for their husband’s longevity and prosperity.',
    rituals: [
      'Consuming pre-dawn Sargahi meal before sunrise.',
      'Listening to Karwa Chauth Vrat Katha in traditional festive attire.',
      'Sighting the Moon through a sieve, offering water Arghya, and breaking fast.',
    ],
  },
  'Ahoi Ashtami': {
    nameDevanagari: 'अहोई अष्टमी',
    deity: 'Mata Ahoi (अहोई माता)',
    pujaMuhurta: 'Pradosha Kaal & Star Sight',
    significance: 'A sacred fast observed by mothers for the protection, longevity, and flourishing life of their children, celebrated eight days before Diwali.',
    rituals: [
      'Drawing Ahoi Mata mural on wall with eight corners and children motifs.',
      'Fasting until evening sighting of stars or moonrise.',
      'Offering water Arghya to stars through a Karwa pot.',
    ],
  },
  'Dhanteras (Dhanatrayodashi)': {
    nameDevanagari: 'धनतेरस (धनत्रयोदशी / धन्वंतरि जयंती)',
    deity: 'Lord Dhanvantari & Lord Kubera (भगवान धन्वंतरि एवं कुबेर)',
    pujaMuhurta: 'Pradosha Kaal (after sunset)',
    significance: 'The auspicious inception of Diwali festivities celebrating Lord Dhanvantari (physician of the Gods emerging with Amrita) and Lord Kubera.',
    rituals: [
      'Purchasing precious metals (gold/silver) or new copper/brass utensils.',
      'Lighting Yamadeepdaan (four-wicked lamp facing south) to dispel untimely death.',
      'Lakshmi-Kubera puja with coriander seeds and lotus petals.',
    ],
  },
  'Naraka Chaturdashi (Chhoti Diwali)': {
    nameDevanagari: 'नरक चतुर्दशी (रूप चौदस / छोटी दिवाली)',
    deity: 'Lord Krishna & Lord Yama (भगवान श्रीकृष्ण)',
    pujaMuhurta: 'Abhyanga Snana before Sunrise',
    significance: 'Celebrates Lord Krishna’s vanquishing of the tyrant demon Narakasura and liberation of 16,000 captive maidens; purification of body and spirit.',
    rituals: [
      'Abhyanga Snana (herbal oil bath with Ubtan) before sunrise.',
      'Lighting 14 deepas throughout home and courtyards in the evening.',
      'Yama Deepam offering to overcome sins and fears.',
    ],
  },
  'Diwali (Lakshmi Puja)': {
    nameDevanagari: 'दीपावली (महालक्ष्मी पूजन)',
    deity: 'Maha Lakshmi, Ganesha & Saraswati (महालक्ष्मी, गणेश जी)',
    pujaMuhurta: 'Pradosha Kaal & Vrishabha Lagna',
    significance: 'The festival of lights illuminating the dark night of Amavasya, celebrating Maa Lakshmi’s emergence and welcoming Lord Rama’s return to Ayodhya.',
    rituals: [
      'Grand Lakshmi-Ganesha puja during Pradosha and Sthira Lagna (Vrishabha/Simha).',
      'Illuminating every doorway and window with earthen oil lamps (Diyas).',
      'Opening of new accounting ledger books (Chopda Pujan) and distributing sweets.',
    ],
  },
  'Govardhan Puja / Annakut': {
    nameDevanagari: 'गोवर्धन पूजा / अन्नकूट',
    deity: 'Lord Krishna (गिरिराज गोवर्धन)',
    pujaMuhurta: 'Pratah to Madhyahna Kaal',
    significance: 'Commemorates Lord Krishna lifting Mount Govardhan on His little finger to shelter the people of Gokula from the torrential storms of Indra.',
    rituals: [
      'Constructing a hillock of cow dung representing Govardhan Parvat.',
      'Annakut offering: preparing 56 food delicacies (Chappan Bhog) for Krishna.',
      'Gau Puja (worshipping and feeding cows and calves).',
    ],
  },
  'Bhai Dooj (Yama Dwitiya)': {
    nameDevanagari: 'भाई दूज (यम द्वितीया)',
    deity: 'Yamaraja & Yamuna Devi (यमराज एवं यमुना देवी)',
    pujaMuhurta: 'Aparahna Kaal',
    significance: 'Celebrates the bond between brother and sister, recalling Yamaraja visiting his sister Yamuna, granting the boon that brothers who receive tilak will not face Naraka.',
    rituals: [
      'Sisters applying vermilion and rice tilak on brother’s forehead.',
      'Serving homecooked meals and sweets to brothers.',
      'Mutual exchange of protective blessings and heartfelt gifts.',
    ],
  },
  'Chhath Puja (Surya Shashthi)': {
    nameDevanagari: 'छठ पूजा (सूर्य षष्ठी / डाला छठ)',
    deity: 'Surya Bhagavan & Chhathi Maiya (भगवान सूर्य एवं छठी मईया)',
    pujaMuhurta: 'Evening Sandhya Arghya & Next Morning Sunrise Arghya',
    significance: 'An austere four-day Vedic sun worship festival giving gratitude to the Sun God for sustaining life on Earth and granting vitality, progeny, and cures.',
    rituals: [
      'Nahay-Khay and Kharna fasts leading into 36 hours of waterless fasting.',
      'Offering Sandhya Arghya to the setting Sun standing knee-deep in water.',
      'Final Usha Arghya to the rising Sun next morning with bamboo baskets (Soop).',
    ],
  },
  'Tulsi Vivah': {
    nameDevanagari: 'तुलसी विवाह',
    deity: 'Tulsi Devi & Shaligram (तुलसी माता एवं शालिग्राम भगवान)',
    pujaMuhurta: 'Pradosha Kaal (Evening)',
    significance: 'Ceremonial marriage of Holy Basil (Vrinda/Tulsi) with Lord Vishnu in the form of sacred Shaligram, opening the annual Hindu wedding season.',
    rituals: [
      'Decorating the Tulsi pot with bridal red chunari, bangles, and turmeric.',
      'Performing traditional Vedic wedding rituals with Shaligram stone.',
      'Singing wedding songs and distributing sugarcane, gooseberries (Amla), and sweets.',
    ],
  },
  'Kartik Purnima / Dev Diwali': {
    nameDevanagari: 'कार्तिक पूर्णिमा / देव दीपावली',
    deity: 'Tripurari Shiva & Lord Vishnu (त्रिपुरारि शिव)',
    pujaMuhurta: 'Pradosha Kaal (Ganga Ghat Deepotsava)',
    significance: 'Dev Diwali in Varanasi where the Gods descend to bathe in the Ganga celebrating Lord Shiva’s victory over the demon Tripurasura and Matsya Avatara.',
    rituals: [
      'Snana in Ganga and lighting millions of earthen lamps along river ghats.',
      'Offering Deepdaan to temples and flowing waters.',
      'Chanting Vishnu Sahasranama and Shiva Mahimna Stotra.',
    ],
  },
  'Mokshada Ekadashi / Gita Jayanti': {
    nameDevanagari: 'मोक्षदा एकादशी / गीता जयंती',
    deity: 'Lord Sri Krishna & Shrimad Bhagavad Gita (श्रीकृष्ण एवं गीता जी)',
    pujaMuhurta: 'Ekadashi Sunrise & Harivasara',
    significance: 'The historic day on the Kurukshetra battlefield when Lord Krishna revealed the eternal divine song, the Shrimad Bhagavad Gita, to Arjuna.',
    rituals: [
      'Recitation and study of the complete 18 chapters of Bhagavad Gita.',
      'Strict grainless Ekadashi fasting for liberation (Moksha).',
      'Distributing copies of Bhagavad Gita as holy charity.',
    ],
  },
  'Dattatreya Jayanti': {
    nameDevanagari: 'दत्तात्रेय जयंती',
    deity: 'Lord Dattatreya (श्रीदत्तात्रेय भगवान)',
    pujaMuhurta: 'Margashirsha Purnima Midday',
    significance: 'Birth of Lord Dattatreya, the unified avatar of Brahma, Vishnu, and Shiva (Trimurti), and Supreme Guru to seekers of ultimate truth.',
    rituals: [
      'Reading Avadhuta Gita and Guru Charitra.',
      'Abhishekam with sandalwood paste and bilva leaves.',
      'Meditation on non-duality and humility.',
    ],
  },
};

export const RITU_DATA: Record<number, { name: string; nameDevanagari: string }> = {
  0: { name: 'Vasanta (Spring)', nameDevanagari: 'वसन्त ऋतु' }, // Chaitra
  1: { name: 'Vasanta (Spring)', nameDevanagari: 'वसन्त ऋतु' }, // Vaishakha
  2: { name: 'Grishma (Summer)', nameDevanagari: 'ग्रीष्म ऋतु' }, // Jyeshtha
  3: { name: 'Grishma (Summer)', nameDevanagari: 'ग्रीष्म ऋतु' }, // Ashadha
  4: { name: 'Varsha (Monsoon)', nameDevanagari: 'वर्षा ऋतु' }, // Shravana
  5: { name: 'Varsha (Monsoon)', nameDevanagari: 'वर्षा ऋतु' }, // Bhadrapada
  6: { name: 'Sharad (Autumn)', nameDevanagari: 'शरद ऋतु' }, // Ashwina
  7: { name: 'Sharad (Autumn)', nameDevanagari: 'शरद ऋतु' }, // Kartika
  8: { name: 'Hemanta (Pre-Winter)', nameDevanagari: 'हेमन्त ऋतु' }, // Margashirsha
  9: { name: 'Hemanta (Pre-Winter)', nameDevanagari: 'हेमन्त ऋतु' }, // Pausha
  10: { name: 'Shishira (Winter)', nameDevanagari: 'शिशिर ऋतु' }, // Magha
  11: { name: 'Shishira (Winter)', nameDevanagari: 'शिशिर ऋतु' }, // Phalguna
};

export const MONTH_NAMES_MAP = [
  { monthNumber: 1, monthName: 'January', monthNameHindi: 'जनवरी' },
  { monthNumber: 2, monthName: 'February', monthNameHindi: 'फरवरी' },
  { monthNumber: 3, monthName: 'March', monthNameHindi: 'मार्च' },
  { monthNumber: 4, monthName: 'April', monthNameHindi: 'अप्रैल' },
  { monthNumber: 5, monthName: 'May', monthNameHindi: 'मई' },
  { monthNumber: 6, monthName: 'June', monthNameHindi: 'जून' },
  { monthNumber: 7, monthName: 'July', monthNameHindi: 'जुलाई' },
  { monthNumber: 8, monthName: 'August', monthNameHindi: 'अगस्त' },
  { monthNumber: 9, monthName: 'September', monthNameHindi: 'सितंबर' },
  { monthNumber: 10, monthName: 'October', monthNameHindi: 'अक्टूबर' },
  { monthNumber: 11, monthName: 'November', monthNameHindi: 'नवंबर' },
  { monthNumber: 12, monthName: 'December', monthNameHindi: 'दिसंबर' },
];

export const DAY_OF_WEEK_MAP: Record<number, { english: string; hindi: string }> = {
  0: { english: 'Sunday', hindi: 'रविवार' },
  1: { english: 'Monday', hindi: 'सोमवार' },
  2: { english: 'Tuesday', hindi: 'मंगलवार' },
  3: { english: 'Wednesday', hindi: 'बुधवार' },
  4: { english: 'Thursday', hindi: 'गुरुवार' },
  5: { english: 'Friday', hindi: 'शुक्रवार' },
  6: { english: 'Saturday', hindi: 'शनिवार' },
};
