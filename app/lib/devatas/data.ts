import { DeityRecord, DeityTradition, DevatasFilterOptions, DevatasApiResponse } from './types';

export const DEITIES_DATABASE: DeityRecord[] = [
  // 1. Lord Shiva
  {
    id: 'shiva',
    name: 'Lord Shiva / Mahadeva',
    nameDevanagari: 'भगवान शिव / महादेव',
    subtitle: 'The Supreme Consciousness, Lord of Transformation & Ascetics',
    subtitleDevanagari: 'सच्चिदानंद परब्रह्म, लयकर्ता एवं औढरदानी',
    tradition: 'Shaiva',
    isPanchaDeva: true,
    consort: 'Maa Parvati / Shakti (माता पार्वती)',
    vahana: 'Nandi the Bull (नन्दी)',
    ayudhas: ['Trishula (Trident)', 'Damaru (Drum)', 'Pinaka (Bow)'],
    abode: 'Mount Kailash (कैलाश पर्वत)',
    sacredDay: 'Monday (Somavara)',
    sacredTithi: 'Trayodashi (Pradosha) & Chaturdashi (Shivaratri)',
    associatedFestivals: ['Maha Shivaratri', 'Shravana Somavar', 'Masik Shivaratri', 'Pradosh Vrat'],
    colorTheme: {
      badgeBg: 'bg-cyan-500/10 dark:bg-cyan-400/10',
      badgeText: 'text-cyan-800 dark:text-cyan-300',
      border: 'border-cyan-500/30',
      accentGlow: 'from-cyan-500 to-blue-600',
    },
    tatva:
      'Shiva represents pure formless consciousness (Nirguna Brahman) beyond time and space, as well as the Auspicious One who absorbs cosmic dissolution (Laya) so creation can be reborn anew. He is the Adi Guru of Yoga and meditation.',
    iconography:
      'The Crescent Moon on His locks symbolizes mastery over time (Kala); River Ganga represents the flow of spiritual wisdom; the Third Eye (Trinetra) burns ignorance into illumination; the blue throat (Neelakantha) signifies absorbing cosmic poison to protect all beings; the Serpent (Vasuki) coiled around His neck represents conquer over fear and death.',
    keyMantras: [
      {
        title: 'Maha Mrityunjaya Mantra (Rigveda 7.59.12)',
        devanagari: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात्॥',
        transliteration: 'oṃ tryambakaṃ yajāmahe sugandhiṃ puṣṭivardhanam | urvārukamiva bandhanān mṛtyor mukṣīya māmṛtāt ||',
        meaning: 'We revere the Three-Eyed Lord Shiva, who is fragrant and nourishes all beings. May He liberate us from death and bondage to mortality, just as a ripe cucumber effortlessly separates from its stalk, leading us into immortality.',
      },
      {
        title: 'Panchakshari Shiva Mantra',
        devanagari: 'ॐ नमः शिवाय॥',
        transliteration: 'oṃ namaḥ śivāya ||',
        meaning: 'Salutations to the Auspicious and Eternal Supreme Reality (Shiva).',
      },
    ],
    majorTemples: [
      { name: 'Kashi Vishwanath', location: 'Varanasi, Uttar Pradesh', significance: 'Chief of the 12 sacred Jyotirlingas upon the banks of Ganga.' },
      { name: 'Mahakaleshwar Jyotirlinga', location: 'Ujjain, Madhya Pradesh', significance: 'The Lord of Time, seated on the ancient Vedic prime meridian.' },
      { name: 'Kedarnath Jyotirlinga', location: 'Rudraprayag, Uttarakhand', significance: 'Himalayan shrine of liberation at 3,583m elevation.' },
      { name: 'Somnath Jyotirlinga', location: 'Prabhas Patan, Gujarat', significance: 'The eternal primordial Jyotirlinga blessed by Chandra Dev.' },
    ],
    traditionalOfferings: ['Belpatra (Bilva leaves)', 'Gangajal / Pure Water', 'Bhasma (Sacred ash)', 'Dhatura & Bhaang', 'Raw milk & honey'],
  },

  // 2. Lord Vishnu
  {
    id: 'vishnu',
    name: 'Lord Vishnu / Narayana',
    nameDevanagari: 'भगवान विष्णु / श्रीनारायण',
    subtitle: 'The All-Pervading Preserver & Guardian of Cosmic Order (Dharma)',
    subtitleDevanagari: 'जगतपालक, सर्वव्यापी श्रीहरि नारायण',
    tradition: 'Vaishnava',
    isPanchaDeva: true,
    consort: 'Maa Mahalakshmi (महालक्ष्मी)',
    vahana: 'Garuda (गरुड़)',
    ayudhas: ['Sudarshana Chakra (Discus)', 'Panchajanya Shankha (Conch)', 'Kaumodaki Gada (Mace)', 'Padma (Lotus)'],
    abode: 'Vaikuntha / Ksheerasagara (वैकुण्ठ धाम)',
    sacredDay: 'Thursday (Guruvara)',
    sacredTithi: 'Ekadashi (All 24/26 annual Ekadashis) & Purnima',
    associatedFestivals: ['Devshayani Ekadashi', 'Devutthana Ekadashi', 'Gita Jayanti', 'Vaikuntha Ekadashi'],
    colorTheme: {
      badgeBg: 'bg-amber-500/10 dark:bg-amber-400/10',
      badgeText: 'text-amber-800 dark:text-amber-300',
      border: 'border-amber-500/30',
      accentGlow: 'from-amber-500 to-yellow-600',
    },
    tatva:
      'Vishnu (derived from root "Vish" meaning to pervade) is the sustaining aspect of Brahman who upholds cosmic harmony (Rita) and righteousness (Dharma). Whenever adharma rises, He incarnates as an Avatara to protect the noble and guide humanity.',
    iconography:
      'Four arms symbolize dominion over the 4 cardinal directions, 4 Vedas, and 4 aims of life (Purusharthas). The Sudarshana Chakra represents cosmic mind and righteousness cutting through illusion; the Conch symbolizes the primordial vibration (Pranava Om); the Mace signifies physical and mental power; the Lotus represents untainted spiritual purity amidst worldly waters.',
    keyMantras: [
      {
        title: 'Maha Vishnu Dhyana Mantra',
        devanagari: 'शान्ताकारं भुजगशयनं पद्मनाभं सुरेशं विश्वाधारं गगनसदृशं मेघवर्णं शुभाङ्गम्। लक्ष्मीकान्तं कमलनयनं योगिभिर्ध्यानगम्यं वन्दे विष्णुं भवभयहरं सर्वलोकैकनाथम्॥',
        transliteration: 'śāntākāraṃ bhujagaśayanaṃ padmanābhaṃ sureśaṃ viśvādhāraṃ gaganasadṛśaṃ meghavarṇaṃ śubhāṅgam | lakṣmīkāntaṃ kamalanayanaṃ yogibhirdhyānagamyaṃ vande viṣṇuṃ bhavabhayaharaṃ sarvalokaikanātham ||',
        meaning: 'I bow to Lord Vishnu, the embodiment of profound peace, resting upon the serpent Shesha, with a lotus emerging from His navel, Lord of the Gods, the foundation of the cosmos, boundless as the sky, cloud-complexioned, radiant, beloved of Lakshmi, lotus-eyed, attained by sages in deep meditation, the dispeller of fear of worldly existence, the sole Sovereign of all realms.',
      },
      {
        title: 'Dvadasakshara Vasudeva Mantra',
        devanagari: 'ॐ नमो भगवते वासुदेवाय॥',
        transliteration: 'oṃ namo bhagavate vāsudevāya ||',
        meaning: 'I surrender to the Supreme Divine Being, Lord Vasudeva, the indwelling light of all creation.',
      },
    ],
    majorTemples: [
      { name: 'Badrinath Temple', location: 'Chamoli, Uttarakhand', significance: 'One of the Char Dham pilgrimage sites, where Narayana performed tapas.' },
      { name: 'Tirumala Venkateshwara', location: 'Tirupati, Andhra Pradesh', significance: 'Kali Yuga Vaikuntha where Lord Srinivasa resides.' },
      { name: 'Sri Ranganathaswamy', location: 'Srirangam, Tamil Nadu', significance: 'Premier Divya Desam temple complex dedicated to reclining Ranganatha.' },
      { name: 'Jagannath Puri', location: 'Puri, Odisha', significance: 'Eastern Char Dham sanctuary of Lord of the Universe.' },
    ],
    traditionalOfferings: ['Tulsi leaves (Holy Basil)', 'Yellow flowers & pitambari garments', 'Chandan (Sandalwood paste)', 'Panakam and sweet kheer', 'Makkhan & Mishri'],
  },

  // 3. Maa Durga / Parashakti
  {
    id: 'durga',
    name: 'Maa Durga / Parashakti',
    nameDevanagari: 'माँ दुर्गा / जगदम्बा',
    subtitle: 'Supreme Primordial Energy (Mahashakti) & Slayer of Mahishasura',
    subtitleDevanagari: 'आदिशक्ति, दुर्गतिनाशिनी एवं महिषासुरमर्दिनी',
    tradition: 'Shakta',
    isPanchaDeva: true,
    consort: 'Lord Shiva (भगवान शिव)',
    vahana: 'Lion / Tiger (सिंह / व्याघ्र)',
    ayudhas: ['Trishula', 'Sudarshana Chakra', 'Bow & Arrow', 'Sword (Khadga)', 'Lotus'],
    abode: 'Manidweepa / Kailash (मणिद्वीप)',
    sacredDay: 'Friday (Shukravara) & Tuesday (Mangalavara)',
    sacredTithi: 'Ashtami & Navami of Shukla Paksha',
    associatedFestivals: ['Sharad Navratri', 'Chaitra Navratri', 'Durga Ashtami', 'Vijayadashami'],
    colorTheme: {
      badgeBg: 'bg-rose-500/10 dark:bg-rose-400/10',
      badgeText: 'text-rose-800 dark:text-rose-300',
      border: 'border-rose-500/30',
      accentGlow: 'from-rose-500 to-red-600',
    },
    tatva:
      'Durga (meaning the invincible, impenetrable fortress) is the dynamic creative kinetic power (Kriya Shakti) of the Supreme Reality without which consciousness remains inert. She embodies the unified strength of all Devas combating demonic ego and darkness.',
    iconography:
      'Her ten arms represent protection across all 10 directions; riding the lion symbolizes absolute mastery over animalistic ego, anger, and ferocity; weapons gifted by all Devas symbolize collective divine virtue defeating pride and tyranny.',
    keyMantras: [
      {
        title: 'Navarna Mantra (Devi Mahatmya)',
        devanagari: 'ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे॥',
        transliteration: 'oṃ aiṃ hrīṃ klīṃ cāmuṇḍāyai vicce ||',
        meaning: 'Salutations to the Supreme Goddess who embodies creation (Saraswati / Aim), preservation (Lakshmi / Hrim), and transformation (Kali / Klim), the conqueror of passion and ignorance (Chamunda).',
      },
      {
        title: 'Sarva Mangala Mangalye (Devi Mahatmya 11.10)',
        devanagari: 'सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके। शरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते॥',
        transliteration: 'sarvamaṅgalamāṅgalye śive sarvārthasādhike | śaraṇye tryambake gauri nārāyaṇi namo\'stu te ||',
        meaning: 'O Auspicious of all auspiciousness, the consort of Shiva, who accomplishes every aspiration, refuge of the surrenderers, Three-Eyed Gauri, O Divine Narayani, salutations unto Thee!',
      },
    ],
    majorTemples: [
      { name: 'Kamakhya Temple', location: 'Guwahati, Assam', significance: 'Supreme Tantric Shakti Peetha celebrating the creative womb of the Divine Mother.' },
      { name: 'Vaishno Devi', location: 'Katra, Jammu & Kashmir', significance: 'Sacred Himalayan cave sanctuary of Mahalakshmi, Mahakali, and Mahasaraswati.' },
      { name: 'Kalighat Shakti Peetha', location: 'Kolkata, West Bengal', significance: 'Ancient Shakti Peetha representing Sati’s right toes.' },
      { name: 'Meenakshi Amman', location: 'Madurai, Tamil Nadu', significance: 'Grand architectural wonder dedicated to warrior goddess Meenakshi.' },
    ],
    traditionalOfferings: ['Red Hibiscus (Gudhal)', 'Kumkum & Sindoor', 'Chunari & Shringar items', 'Halwa, Puri & Chana', 'Pomegranate and coconut'],
  },

  // 4. Lord Ganesha
  {
    id: 'ganesha',
    name: 'Lord Ganesha / Vighnaharta',
    nameDevanagari: 'भगवान श्रीगणेश / विनायक',
    subtitle: 'Lord of Intellect, Wisdom & Remover of All Obstacles',
    subtitleDevanagari: 'प्रथम पूज्य, विघ्नहर्ता एवं बुद्धिदाता',
    tradition: 'Ganapatya',
    isPanchaDeva: true,
    consort: 'Riddhi & Siddhi (ऋद्धि-सिद्धि)',
    vahana: 'Mooshaka / Mouse (मूषक)',
    ayudhas: ['Pasha (Noose)', 'Ankusha (Elephant Goad)', 'Modaka', 'Broken Tusk (Danta)'],
    abode: 'Ganeshaloka / Mount Kailash (गणेशलोक)',
    sacredDay: 'Wednesday (Budhavara)',
    sacredTithi: 'Chaturthi (Sankashti & Vinayaka Chaturthi)',
    associatedFestivals: ['Ganesh Chaturthi', 'Sankashti Chaturthi', 'Vinayaka Chaturthi', 'Anant Chaturdashi'],
    colorTheme: {
      badgeBg: 'bg-orange-500/10 dark:bg-orange-400/10',
      badgeText: 'text-orange-800 dark:text-orange-300',
      border: 'border-orange-500/30',
      accentGlow: 'from-orange-500 to-amber-600',
    },
    tatva:
      'Ganesha is Prathama-Pujya (the first to be invoked in any Vedic ritual), ruling the Muladhara Chakra (the root energy center anchoring consciousness). He governs the cosmic principle of discrimination (Buddhi), intellect (Medha), and auspicious commencements.',
    iconography:
      'The elephant head signifies vast cosmic wisdom, listening capacity, and profound memory; the single tusk (Ekadanta) represents non-duality (Advaita); the large ears hear all prayers while filtering trivialities; the curved trunk reflects adaptability and intellect; riding the small mouse shows intellect commanding erratic desires.',
    keyMantras: [
      {
        title: 'Vakratunda Mahakaya Shloka',
        devanagari: 'वक्रतुण्ड महाकाय सूर्यकोटिसमप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥',
        transliteration: 'vakratuṇḍa mahākāya sūryakoṭisamaprabha | nirvighnaṃ kuru me deva sarvakāryeṣu sarvadā ||',
        meaning: 'O Lord with the curved trunk, immense divine body, and brilliance radiant as ten million suns! Please remove all obstacles from all my endeavors, always and forever.',
      },
      {
        title: 'Ganapati Moola Mantra (Ganapati Atharvashirsha)',
        devanagari: 'ॐ गं गणपतये नमः॥',
        transliteration: 'oṃ gaṃ gaṇapataye namaḥ ||',
        meaning: 'Salutations to Lord Ganapati, with His sacred seed sound "Gam", the sovereign Lord of all categories and beings.',
      },
    ],
    majorTemples: [
      { name: 'Siddhivinayak Temple', location: 'Prabhadevi, Mumbai, Maharashtra', significance: 'Celebrated wish-fulfilling shrine where Ganesha’s trunk turns to the right.' },
      { name: 'Ashtavinayaka Temples', location: 'Maharashtra (8 Shrines)', significance: 'Self-manifested (Swayambhu) 8 sacred sanctuaries of Lord Ganesha.' },
      { name: 'Ucchi Pillayar Temple', location: 'Tiruchirappalli, Tamil Nadu', significance: 'Famous rock-fort shrine with ancient Puranic link to Vibhishana.' },
    ],
    traditionalOfferings: ['21 blades of Durva grass', 'Steamed Modaks and Laddus', 'Red Hibiscus flowers', 'Sindoor (Vermilion)', 'Jaggery and coconut'],
  },

  // 5. Lord Sri Krishna
  {
    id: 'krishna',
    name: 'Lord Sri Krishna',
    nameDevanagari: 'योगेश्वर श्रीकृष्ण',
    subtitle: 'The Supreme Person, Eternal Flutist & Divine Teacher of the Gita',
    subtitleDevanagari: 'लीलापुरुषोत्तम, जगद्गुरु एवं भगवद्गीता उपदेशक',
    tradition: 'Vaishnava',
    isPanchaDeva: false,
    avatarOf: 'Lord Vishnu (8th Avatara / Svayam Bhagavan)',
    consort: 'Sri Radha Rani & Rukmini Devi (श्रीराधारानी एवं रुक्मिणी)',
    vahana: 'Garuda (गरुड़)',
    ayudhas: ['Murali (Flute)', 'Sudarshana Chakra', 'Kaustubha Gem', 'Vanamala'],
    abode: 'Goloka Vrindavana (गोलोक वृन्दावन)',
    sacredDay: 'Wednesday (Budhavara) & Ashtami',
    sacredTithi: 'Ashtami (Krishna Paksha) & Ekadashi',
    associatedFestivals: ['Krishna Janmashtami', 'Holi', 'Govardhan Puja', 'Gita Jayanti', 'Radhashtami'],
    colorTheme: {
      badgeBg: 'bg-blue-500/10 dark:bg-blue-400/10',
      badgeText: 'text-blue-800 dark:text-blue-300',
      border: 'border-blue-500/30',
      accentGlow: 'from-blue-500 to-indigo-600',
    },
    tatva:
      'Krishna is celebrated in Srimad Bhagavatam as "Krishnas tu Bhagavan Svayam" (Krishna is the Supreme Divinity Himself in full manifestation). He synthesized the highest paths of Karma Yoga (selfless action), Bhakti Yoga (unconditional love), and Jnana Yoga (spiritual wisdom) in the Bhagavad Gita.',
    iconography:
      'The dark cloud complexion (Shyamala) denotes infinity, like the deep raincloud or boundless sky; the peacock feather (Mayura Pankha) signifies mastery over all colors of life with non-attachment; playing the flute calls every individual soul back to its divine source; bending in 3 places (Tribhanga) symbolizes divine grace and elegance.',
    keyMantras: [
      {
        title: 'Maha Mantra (Kali-Santarana Upanishad)',
        devanagari: 'हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे। हरे राम हरे राम राम राम हरे हरे॥',
        transliteration: 'hare kṛṣṇa hare kṛṣṇa kṛṣṇa kṛṣṇa hare hare | hare rāma hare rāma rāma rāma hare hare ||',
        meaning: 'O Supreme Energy of Godhead (Hara/Radha), O All-Attractive Lord (Krishna), O Supreme Enjoyer (Rama), please engage me in Your divine loving service.',
      },
      {
        title: 'Krishna Ashtakam Opening',
        devanagari: 'वसुदेवसुतं देवं कंसचाणूरमर्दनम्। देवकीपरमानन्दं कृष्णं वन्दे जगद्गुरुम्॥',
        transliteration: 'vasudevasutaṃ devaṃ kaṃsacāṇūramardanam | devakīparamānandaṃ kṛṣṇaṃ vande jagadgurum ||',
        meaning: 'I bow to Lord Krishna, the son of Vasudeva, the slayer of Kamsa and Chanura, the supreme joy of Mother Devaki, and the Guru of the entire universe.',
      },
    ],
    majorTemples: [
      { name: 'Dwarkadhish Temple', location: 'Dwarka, Gujarat', significance: 'Western Char Dham coastal kingdom and sovereign realm of Lord Krishna.' },
      { name: 'Banke Bihari Temple', location: 'Vrindavan, Uttar Pradesh', significance: 'Heart of Braj Bhoomi where Krishna performed His divine boyhood leelas.' },
      { name: 'Guruvayur Temple', location: 'Guruvayur, Kerala', significance: 'Bhuloka Vaikuntha where the child Krishna idol worshipped by Vasudeva is consecrated.' },
      { name: 'Nathdwara Shrinathji', location: 'Nathdwara, Rajasthan', significance: 'Famous seat of Pushti Marg celebrating child Krishna lifting Mount Govardhan.' },
    ],
    traditionalOfferings: ['Makkhan (White butter) & Mishri', 'Tulsi Dal (Basil leaves)', 'Malpua & peda', 'Fragrant flowers & yellow kadamba blooms'],
  },

  // 6. Lord Sri Rama
  {
    id: 'rama',
    name: 'Lord Sri Rama',
    nameDevanagari: 'मर्यादा पुरुषोत्तम श्रीराम',
    subtitle: 'The Exemplar of Righteousness, Truth, Compassion & Dharma',
    subtitleDevanagari: 'रघुकुल शिरोमणि, धर्मधुरंधर एवं मर्यादा पुरुषोत्तम',
    tradition: 'Vaishnava',
    isPanchaDeva: false,
    avatarOf: 'Lord Vishnu (7th Avatara)',
    consort: 'Maa Sita Devi (माता सीता)',
    vahana: 'Pushpaka Vimana / Garuda',
    ayudhas: ['Kodanda Bow & Arrow (कोदण्ड धनुष)', 'Sword (Khadga)'],
    abode: 'Ayodhya / Saketa Loka (साकेत धाम)',
    sacredDay: 'Sunday / Tuesday',
    sacredTithi: 'Navami (Shukla Navami in Chaitra)',
    associatedFestivals: ['Rama Navami', 'Diwali', 'Vijayadashami (Dussehra)', 'Vivah Panchami'],
    colorTheme: {
      badgeBg: 'bg-emerald-500/10 dark:bg-emerald-400/10',
      badgeText: 'text-emerald-800 dark:text-emerald-300',
      border: 'border-emerald-500/30',
      accentGlow: 'from-emerald-500 to-teal-600',
    },
    tatva:
      'Rama personifies "Ramo Vigrahavan Dharmah" (Rama is the very embodiment of Dharma walking upon Earth). Through personal trial, exile, and sacrifice, He demonstrated filial piety, fidelity to vows, and selfless governance (Rama Rajya).',
    iconography:
      'Holding the Kodanda bow represents readiness to defend righteousness and the weak; peaceful countenance reflects unperturbed composure (Samatvam) in victory or hardship; blue-green complexion reflects tranquil vastness and benevolence.',
    keyMantras: [
      {
        title: 'Sri Rama Taraka Mantra',
        devanagari: 'श्रीराम जय राम जय जय राम॥',
        transliteration: 'śrīrāma jaya rāma jaya jaya rāma ||',
        meaning: 'Victory to the sacred name of Sri Rama, triumph to Lord Rama forever and ever.',
      },
      {
        title: 'Ramachandra Dhyana Shloka',
        devanagari: 'रामाय रामभद्राय रामचन्द्राय वेधसे। रघुनाथाय नाथाय सीतायाः पतये नमः॥',
        transliteration: 'rāmāya rāmabhadrāya rāmacandrāya vedhase | raghunāthāya nāthāya sītāyāḥ pataye namaḥ ||',
        meaning: 'Salutations to Lord Rama, the auspicious Ramabhadra, the radiant Ramachandra, the Lord of Raghus, the protector and Lord of Mother Sita.',
      },
    ],
    majorTemples: [
      { name: 'Ram Janmabhoomi Mandir', location: 'Ayodhya, Uttar Pradesh', significance: 'Sacred birthplace of Lord Rama on the banks of river Sarayu.' },
      { name: 'Ramanathaswamy Temple', location: 'Rameswaram, Tamil Nadu', significance: 'Jyotirlinga shrine where Rama consecrated Shiva before crossing to Lanka.' },
      { name: 'Kalaram Temple', location: 'Panchavati, Nashik, Maharashtra', significance: 'Sacred Dandakaranya forest where Rama, Sita, and Lakshmana resided in exile.' },
      { name: 'Bhadrachalam Temple', location: 'Bhadradri Kothagudem, Telangana', significance: 'Celebrated Dandakaranya sanctuary on the banks of the Godavari.' },
    ],
    traditionalOfferings: ['Tulsi leaves', 'Panakam (jaggery, black pepper, cardamom water)', 'Kosambari (sprouted moong salad)', 'Yellow champa flowers'],
  },

  // 7. Lord Sri Hanuman
  {
    id: 'hanuman',
    name: 'Lord Sri Hanuman',
    nameDevanagari: 'पवनपुत्र श्रीहनुमान',
    subtitle: 'Supreme Devotee, Conqueror of Obstacles & Embodiment of Strength',
    subtitleDevanagari: 'संकटमोचन, अष्टसिद्धि-नवनिधि के दाता एवं रुद्रावतार',
    tradition: 'Hanuman',
    isPanchaDeva: false,
    avatarOf: 'Rudra Avatara (11th Rudra of Lord Shiva)',
    vahana: 'Air / Wind (Wind God Vayu)',
    ayudhas: ['Gada (Golden Mace)', 'Dronagiri Mountain in Hand'],
    abode: 'Gandhamadana Mountain / Wherever Rama’s name is sung',
    sacredDay: 'Tuesday (Mangalavara) & Saturday (Shanivara)',
    sacredTithi: 'Purnima (Chaitra Purnima)',
    associatedFestivals: ['Hanuman Jayanti', 'Sundarkand Path', 'Shani Pradosh'],
    colorTheme: {
      badgeBg: 'bg-red-500/10 dark:bg-red-400/10',
      badgeText: 'text-red-800 dark:text-red-300',
      border: 'border-red-500/30',
      accentGlow: 'from-red-500 to-orange-600',
    },
    tatva:
      'Hanuman is the pinnacle of Dasa Bhakti (selfless devotion through action), unyielding chastity (Brahmacharya), fearlessness, and humility. He possesses the 8 mystic perfections (Ashta Siddhis) and 9 forms of wealth (Nava Nidhis), yet finds His highest glory in serving Rama.',
    iconography:
      'Golden or vermilion body reflects spiritual radiance; holding the mace shows indestructible force destroying evil spirits; carrying Dronagiri herb mountain symbolizes bringing life-saving healing; chest torn open reveals Rama and Sita permanently inscribed in His heart.',
    keyMantras: [
      {
        title: 'Hanuman Bija Mantra',
        devanagari: 'ॐ हं हनुमते नमः॥',
        transliteration: 'oṃ haṃ hanumate namaḥ ||',
        meaning: 'Salutations to the valorous Lord Hanuman with His primordial seed sound "Ham".',
      },
      {
        title: 'Manojavam Maruti Shloka',
        devanagari: 'मनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम्। वातात्मजं वानरयूथमुख्यं श्रीरामदूतं शरणं प्रपद्ये॥',
        transliteration: 'manojavaṃ mārutatulyavegaṃ jitendriyaṃ buddhimatāṃ variṣṭham | vātātmajaṃ vānarayūthamukhyaṃ śrīrāmadūtaṃ śaraṇaṃ prapadye ||',
        meaning: 'I take refuge in Lord Rama’s envoy, who is swift as the mind, as speedy as the wind, master of the senses, supreme among the wise, son of the Wind God, and leader of the Vanaras.',
      },
    ],
    majorTemples: [
      { name: 'Sankat Mochan Temple', location: 'Varanasi, Uttar Pradesh', significance: 'Consecrated by Goswami Tulsidas, author of Hanuman Chalisa.' },
      { name: 'Salasar Balaji', location: 'Churu, Rajasthan', significance: 'Unique self-manifested bearded idol of Balaji Hanuman.' },
      { name: 'Mehandipur Balaji', location: 'Dausa, Rajasthan', significance: 'Famed pilgrimage center known for exorcising negative energies and suffering.' },
      { name: 'Hanuman Garhi', location: 'Ayodhya, Uttar Pradesh', significance: 'Fortress temple guarding the sacred gates of Ayodhya.' },
    ],
    traditionalOfferings: ['Sindoor and Jasmine oil (Chola)', 'Boondi and Besan Laddus', 'Betel leaf garland (Paan Beda)', 'Tulsi garland'],
  },

  // 8. Maa Mahalakshmi
  {
    id: 'lakshmi',
    name: 'Maa Mahalakshmi',
    nameDevanagari: 'माँ महालक्ष्मी',
    subtitle: 'Goddess of Spiritual & Material Wealth, Prosperity, Auspiciousness & Grace',
    subtitleDevanagari: 'धन, धान्य, सौभाग्य, ऐश्वर्य एवं श्री की अधिष्ठात्री देवी',
    tradition: 'Shakta',
    isPanchaDeva: false,
    consort: 'Lord Vishnu (भगवान विष्णु)',
    vahana: 'White Owl / Elephant (उलूक / गजराज)',
    ayudhas: ['Padma (Two Lotus flowers)', 'Abhaya Mudra', 'Varada Mudra (Gold shower)'],
    abode: 'Ksheerasagara / Vaikuntha (वैकुण्ठ धाम)',
    sacredDay: 'Friday (Shukravara)',
    sacredTithi: 'Amavasya (Diwali) & Purnima (Sharad Purnima)',
    associatedFestivals: ['Diwali (Lakshmi Puja)', 'Dhanteras', 'Sharad Purnima (Kojagari)', 'Varalakshmi Vratam'],
    colorTheme: {
      badgeBg: 'bg-yellow-500/10 dark:bg-yellow-400/10',
      badgeText: 'text-yellow-800 dark:text-yellow-300',
      border: 'border-yellow-500/30',
      accentGlow: 'from-yellow-500 to-amber-600',
    },
    tatva:
      'Lakshmi (from Sanskrit "Lakshya" meaning aim or goal) represents not merely physical wealth, but Ashta Lakshmi: wealth of wisdom, courage, grain, progeny, victory, spiritual illumination, and prosperity aligned with Dharma.',
    iconography:
      'Emerging from the churning of the cosmic ocean (Samudra Manthan) seated on a pink lotus; showering gold coins from Her hand signifies boundless generosity; flanked by four white elephants pouring nectar signifies royal auspiciousness and rain-fertilized soil.',
    keyMantras: [
      {
        title: 'Maha Lakshmi Beeja Mantra',
        devanagari: 'ॐ श्रीं ह्रीं क्लीं त्रिभुवनमहालक्ष्म्यै अस्माकं दारिद्र्यं नाशय प्रसीद प्रसीद क्लीं ह्रीं श्रीं ॐ नमः॥',
        transliteration: 'oṃ śrīṃ hrīṃ klīṃ tribhuvanamahālakṣmyai asmākaṃ dāridryaṃ nāśaya prasīda prasīda klīṃ hrīṃ śrīṃ oṃ namaḥ ||',
        meaning: 'Salutations to the Supreme Goddess Mahalakshmi of the three worlds; dispel all poverty of spirit and mind; shower Thy divine grace upon us.',
      },
      {
        title: 'Sri Sukta Opening Mantra (Rigveda Khila)',
        devanagari: 'हिरण्यवर्णां हरिणीं सुवर्णरजतस्रजाम्। चन्द्रां हिरण्मयीं लक्ष्मीं जातवेदो म आवह॥',
        transliteration: 'hiraṇyavarṇāṃ hariṇīṃ suvarṇarajatasrajām | candrāṃ hiraṇmayīṃ lakṣmīṃ jātavedo ma āvaha ||',
        meaning: 'O Agni, invoke for me that Goddess Lakshmi, who shines with the golden hue, who is adorned with gold and silver garlands, radiant as the soothing moon, the very embodiment of prosperity.',
      },
    ],
    majorTemples: [
      { name: 'Mahalakshmi Temple', location: 'Kolhapur, Maharashtra', significance: 'One of the prime 51 Shakti Peethas, famed Karvir Kshetra where Sun rays bathe the deity.' },
      { name: 'Sripuram Golden Temple', location: 'Vellore, Tamil Nadu', significance: 'Spiritual city gilded in over 1,500 kg of pure gold dedicated to Sri Narayani.' },
      { name: 'Ashtalakshmi Temple', location: 'Besant Nagar, Chennai, Tamil Nadu', significance: 'Dedicated to the eight primary divine manifestations of Mahalakshmi.' },
    ],
    traditionalOfferings: ['Lotus and red roses', 'Kheer (Payasam) with saffron', 'Coriander seeds and jaggery', 'Silver/gold coins and raw turmeric'],
  },

  // 9. Maa Saraswati
  {
    id: 'saraswati',
    name: 'Maa Saraswati',
    nameDevanagari: 'माँ सरस्वती',
    subtitle: 'Goddess of Learning, Wisdom, Music, Arts, Eloquence & Truth',
    subtitleDevanagari: 'विद्या, बुद्धि, वाणी, ज्ञान एवं संगीत की अधिष्ठात्री',
    tradition: 'Shakta',
    isPanchaDeva: false,
    consort: 'Lord Brahma (ब्रह्मा जी)',
    vahana: 'Swan (Hamsa) & Peacock (हंस / मयूर)',
    ayudhas: ['Veena (Lute)', 'Veda / Pustaka (Sacred Scripture)', 'Akshamala (Japa Rosary)', 'Kamandalu'],
    abode: 'Brahmaloka / Saraswatidweepa (ब्रह्मलोक)',
    sacredDay: 'Thursday / Wednesday',
    sacredTithi: 'Panchami of Shukla Paksha (Magha)',
    associatedFestivals: ['Vasant Panchami', 'Navratri Saraswati Puja', 'Ayudha Puja'],
    colorTheme: {
      badgeBg: 'bg-zinc-500/10 dark:bg-zinc-400/10',
      badgeText: 'text-zinc-800 dark:text-zinc-300',
      border: 'border-zinc-400/30',
      accentGlow: 'from-zinc-100 to-amber-200',
    },
    tatva:
      'Saraswati (meaning "the flowing stream of consciousness and knowledge") represents pure Sattva, untainted by rajasic vanity or tamasic inertia. She is the mother of the Vedas, speech (Vak), mathematics, logic, and sacred sound.',
    iconography:
      'Clothed entirely in spotless white silk symbolizing purity of thought; the Veena represents tuning mind and heart to cosmic harmony; the book represents spiritual knowledge; the crystal rosary represents the power of mantra japa; riding the swan signifies discernment (Neera-Ksheera Viveka, separating milk of truth from water of untruth).',
    keyMantras: [
      {
        title: 'Saraswati Vandana',
        devanagari: 'या कुन्देन्दुतुषारहारधवला या शुभ्रवस्त्रावृता या वीणावरदण्डमण्डितकरा या श्वेतपद्मासना। या ब्रह्माच्युतशंकरप्रभृतिभिर्देवैः सदा वन्दिता सा मां पातु सरस्वती भगवती निःशेषजाड्यापहा॥',
        transliteration: 'yā kundendutuṣārahāradhavalā yā śubhravastrāvṛtā yā vīṇāvaradaṇḍamaṇḍitakarā yā śvetapadmāsanā | yā brahmācyutaśaṅkaraprabhṛtibhirdevaiḥ sadā vanditā sā māṃ pātu sarasvatī bhagavatī niḥśeṣajāḍyāpahā ||',
        meaning: 'May Goddess Saraswati protect me—She who is fair as jasmine, the moon, and snow; who is adorned in pure white garments; whose hands grace the divine Veena; seated on a white lotus; whom Brahma, Vishnu, and Shiva constantly revere; may She eradicate all dullness and ignorance from my mind.',
      },
    ],
    majorTemples: [
      { name: 'Sharada Peetham', location: 'Sringeri, Karnataka', significance: 'First Peetham established by Adi Shankaracharya dedicated to Goddess Sharadamba.' },
      { name: 'Gnana Saraswathi Temple', location: 'Basar, Telangana', significance: 'Ancient shrine on the Godavari where Maharshi Vyasa performed penance.' },
      { name: 'Koothanur Maha Saraswathi', location: 'Tiruvarur, Tamil Nadu', significance: 'Unique temple dedicated exclusively to Saraswati in South India.' },
    ],
    traditionalOfferings: ['White lotus and yellow marigold flowers', 'Honey, curd, and puffed rice', 'Yellow saffron sweets', 'Pens, notebooks, and musical instruments'],
  },

  // 10. Surya Bhagavan
  {
    id: 'surya',
    name: 'Surya Bhagavan / Aditya',
    nameDevanagari: 'भगवान सूर्य / प्रत्यक्ष देव',
    subtitle: 'The Visible Supreme Divinity, Soul of the Universe & Source of Light',
    subtitleDevanagari: 'जगतचक्षु, प्रत्यक्ष देव एवं सर्वतेजोमय भास्कर',
    tradition: 'Saura',
    isPanchaDeva: true,
    consort: 'Sanjna & Chhaya (संज्ञा एवं छाया)',
    vahana: 'Seven Horses Chariot driven by Aruna (सप्ताश्व रथ)',
    ayudhas: ['Padma (Two Lotuses in hands)', 'Chakra', 'Kripana'],
    abode: 'Suryaloka (सूर्यलोक)',
    sacredDay: 'Sunday (Ravivara)',
    sacredTithi: 'Saptami (Ratha Saptami / Bhanu Saptami)',
    associatedFestivals: ['Makar Sankranti', 'Chhath Puja', 'Ratha Saptami', 'Pongal'],
    colorTheme: {
      badgeBg: 'bg-amber-600/10 dark:bg-amber-400/10',
      badgeText: 'text-amber-800 dark:text-amber-300',
      border: 'border-amber-600/30',
      accentGlow: 'from-amber-500 to-red-500',
    },
    tatva:
      'Surya is praised in the Vedas as "Surya Atma Jagatas Tasthushashcha" (The Sun is the Soul of all that moves and does not move). He is the Pratyaksha Daivam (the directly observable God) sustaining biological, thermal, and spiritual life across all planetary spheres.',
    iconography:
      'Riding a chariot with one wheel (representing cyclical time or Samvatsara) drawn by seven horses (symbolizing the seven meters of Vedic poetry and the 7 colors of sunlight); holding two lotuses in full bloom facing the sky; guided by the charioteer Aruna (dawn).',
    keyMantras: [
      {
        title: 'Gayatri Mantra (Rigveda 3.62.10)',
        devanagari: 'ॐ भूर्भुवः स्वः। तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि। धियो यो नः प्रचोदयात्॥',
        transliteration: 'oṃ bhūr bhuvaḥ svaḥ | tat savitur vareṇyaṃ bhargo devasya dhīmahi | dhiyo yo naḥ pracodayāt ||',
        meaning: 'We meditate upon that supreme radiant illumination of the Divine Creator Sun (Savitr). May He awaken and inspire our intellect toward realization of truth.',
      },
      {
        title: 'Aditya Hridaya Stotram Opening',
        devanagari: 'ततो युद्धपरिश्रान्तं समरे चिन्तया स्थितम्। रावणं चाग्रतो दृष्ट्वा युद्धाय समुपस्थितम्। दैवतैश्च समागम्य द्रष्टुमभ्यागतो रणम्। उपागम्याब्रवीद्राममगस्त्यो भगवानृषिः॥',
        transliteration: 'tato yuddhaparīśrāntaṃ samare cintayā sthitam ...',
        meaning: 'Sage Agastya imparted the secret Aditya Hridaya Stotram to Sri Rama, invoking Surya Bhagavan to bestow victory over Ravana.',
      },
    ],
    majorTemples: [
      { name: 'Konark Sun Temple', location: 'Konark, Odisha', significance: 'Monumental 13th-century chariot architectural marvel on the Bay of Bengal.' },
      { name: 'Modhera Sun Temple', location: 'Mehsana, Gujarat', significance: 'Equinoctial solilunar architectural masterpiece where first rays illuminate the sanctum.' },
      { name: 'Martand Sun Temple', location: 'Anantnag, Jammu & Kashmir', significance: 'Grand medieval temple built atop a scenic plateau.' },
    ],
    traditionalOfferings: ['Arghya with copper vessel (water, vermilion, red akshata)', 'Red flowers and Gur (Jaggery)', 'Wheat and sesame seeds', 'Surya Namaskara'],
  },

  // 11. Lord Kartikeya / Murugan
  {
    id: 'kartikeya',
    name: 'Lord Kartikeya / Murugan / Skanda',
    nameDevanagari: 'भगवान कार्तिकेय / मुरुगन / स्कन्द',
    subtitle: 'Commander-in-Chief of Divine Forces, God of Valor & Spiritual Warfare',
    subtitleDevanagari: 'देवसेनापति, षडानन, मुरुगन एवं तारकासुर संहारक',
    tradition: 'Kaumara',
    isPanchaDeva: false,
    consort: 'Valli & Devasena (वल्ली एवं देवसेना)',
    vahana: 'Peacock (Mayura / Paravani)',
    ayudhas: ['Vel (Divine Spear of Wisdom)', 'Bow and Sword'],
    abode: 'Skandaloka / Palani Hills',
    sacredDay: 'Tuesday (Mangalavara)',
    sacredTithi: 'Shashthi (Skanda Sashti)',
    associatedFestivals: ['Skanda Sashti', 'Thaipusam', 'Panguni Uthiram', 'Vaikasi Visakam'],
    colorTheme: {
      badgeBg: 'bg-red-600/10 dark:bg-red-400/10',
      badgeText: 'text-red-900 dark:text-red-300',
      border: 'border-red-600/30',
      accentGlow: 'from-red-600 to-amber-600',
    },
    tatva:
      'Born from the sparks of Shiva’s third eye and nurtured by the six Krittikas (Pleiades), Skanda represents the concentrated flame of spiritual knowledge (Jnana) that incinerates demonic forces of ignorance (Taraka and Surapadma).',
    iconography:
      'Six faces (Shanmukha) signify mastery over the 5 senses plus mind, and vigilance in all directions; the Vel (spear) embodies sharp, broad, and deep spiritual intelligence (Jnana Shakti); riding the peacock represents subjugating venomous ego and worldly pride.',
    keyMantras: [
      {
        title: 'Skanda Gayatri Mantra',
        devanagari: 'ॐ तत्पुरुषाय विद्महे महासेनाय धीमहि। तन्नः षण्मुखः प्रचोदयात्॥',
        transliteration: 'oṃ tatpuruṣāya vidmahe mahāsenāya dhīmahi | tannaḥ ṣaṇmukhaḥ pracodayāt ||',
        meaning: 'May we know that Supreme Being; we meditate upon the Commander of the Divine Army (Mahasena); may the Six-Faced Lord inspire and direct our intellect.',
      },
    ],
    majorTemples: [
      { name: 'Arupadai Veedu (Six Abodes of Murugan)', location: 'Tamil Nadu (Palani, Tiruchendur, Swamimalai, etc.)', significance: 'The six sacred pilgrimage encampments celebrating Skanda’s victories and wisdom.' },
      { name: 'Batu Caves', location: 'Gombak, Selangor, Malaysia', significance: 'Famed limestone cave sanctuary with world’s tallest 42.7m golden Murugan statue.' },
    ],
    traditionalOfferings: ['Panchamritam (Palani style with bananas, honey, ghee, jaggery)', 'Vibhuti (Holy ash)', 'Red and yellow flowers', 'Milk (Kavadi offering)'],
  },

  // 12. Maa Kali
  {
    id: 'kali',
    name: 'Maa Kali / Mahakali',
    nameDevanagari: 'माँ काली / महाकाली',
    subtitle: 'The Ferocious Mother, Transcendence of Time & Destroyer of Ego',
    subtitleDevanagari: 'कालजयी, अकालविनाशिनी एवं खड्गधारिणी महाकाली',
    tradition: 'Shakta',
    isPanchaDeva: false,
    consort: 'Lord Shiva (भगवान शिव)',
    vahana: 'Jackal / Ghost attendants / Lion',
    ayudhas: ['Khadga (Curved Sword)', 'Trishula', 'Severed Demon Head', 'Kapala (Skull Cup)'],
    abode: 'Cremation grounds / Kaliloka',
    sacredDay: 'Saturday / Tuesday',
    sacredTithi: 'Amavasya (Deepavali Kali Puja) & Ashtami',
    associatedFestivals: ['Kali Puja', 'Ratanti Kali Puja', 'Phalaharini Kali Puja'],
    colorTheme: {
      badgeBg: 'bg-purple-600/10 dark:bg-purple-400/10',
      badgeText: 'text-purple-900 dark:text-purple-300',
      border: 'border-purple-600/30',
      accentGlow: 'from-purple-800 to-black',
    },
    tatva:
      'Kali (feminine form of Kala, meaning "Time" and "Black") is the aspect of the Divine Mother who annihilates death itself. She frees the soul from false bodily ego and the terror of mortality, embodying the boundless primordial void from which all creation emerges and into which it dissolves.',
    iconography:
      'Dark complexion mirrors the unmanifest cosmos; naked (Digambari) signifies being clothed solely in boundless infinity without conceptual concealment; standing upon Shiva represents dynamic Prakriti dancing atop motionless Purusha; the garland of 50 skulls signifies the letters of the Sanskrit alphabet (Varnamala); tongue extended reflects sudden awareness of stepping upon Her divine consort Shiva.',
    keyMantras: [
      {
        title: 'Maha Kali Beeja Mantra',
        devanagari: 'ॐ क्रीं कालिकायै नमः॥',
        transliteration: 'oṃ krīṃ kālikāyai namaḥ ||',
        meaning: 'Salutations to the Supreme Goddess Kali, with Her primal transformation beeja "Krim".',
      },
    ],
    majorTemples: [
      { name: 'Dakshineswar Kali Temple', location: 'Kolkata, West Bengal', significance: 'Sacred seat of Bhavatarini Kali where Sri Ramakrishna Paramahamsa attained God-realization.' },
      { name: 'Tarapith Shakti Peetha', location: 'Birbhum, West Bengal', significance: 'Tantric sanctuary of Goddess Tara and sage Bamakhepa.' },
      { name: 'Ujjain Mahakali / Harsiddhi', location: 'Ujjain, Madhya Pradesh', significance: 'Ancient Shakti Peetha associated with King Vikramaditya.' },
    ],
    traditionalOfferings: ['Red Hibiscus garland', 'Sweets and puffed rice (Khai-Batasa)', 'Pomegranate and lemons', 'Incense and deepa'],
  },
];

export const TRADITIONS_CONFIG: {
  id: DeityTradition;
  label: string;
  labelDevanagari: string;
}[] = [
  { id: 'all', label: 'All Deities', labelDevanagari: 'सर्व देवी-देवता' },
  { id: 'pancha_deva', label: 'Pancha Deva', labelDevanagari: 'स्मार्त पंचायतन' },
  { id: 'shaiva', label: 'Shaiva', labelDevanagari: 'शैव' },
  { id: 'vaishnava', label: 'Vaishnava', labelDevanagari: 'वैष्णव' },
  { id: 'shakta', label: 'Shakta', labelDevanagari: 'शाक्त (देवी)' },
  { id: 'ganapatya', label: 'Ganapatya', labelDevanagari: 'गाणपत्य' },
  { id: 'hanuman', label: 'Hanuman', labelDevanagari: 'श्रीहनुमान' },
  { id: 'kaumara', label: 'Kaumara', labelDevanagari: 'कौमार' },
  { id: 'saura', label: 'Saura', labelDevanagari: 'सौर' },
];

export function getDevataById(id: string): DeityRecord | undefined {
  return DEITIES_DATABASE.find((d) => d.id.toLowerCase() === id.toLowerCase().trim());
}

export function getDevatas(options: DevatasFilterOptions = {}): DevatasApiResponse {
  const { tradition = 'all', searchQuery = '', id } = options;

  if (id) {
    const single = getDevataById(id);
    return {
      totalCount: single ? 1 : 0,
      traditions: TRADITIONS_CONFIG.map((t) => ({
        ...t,
        count: DEITIES_DATABASE.filter((d) =>
          t.id === 'all'
            ? true
            : t.id === 'pancha_deva'
            ? d.isPanchaDeva
            : d.tradition.toLowerCase() === t.id.toLowerCase()
        ).length,
      })),
      deities: single ? [single] : [],
    };
  }

  let filtered = [...DEITIES_DATABASE];

  if (tradition && tradition !== 'all') {
    if (tradition === 'pancha_deva') {
      filtered = filtered.filter((d) => d.isPanchaDeva);
    } else {
      filtered = filtered.filter((d) => d.tradition.toLowerCase() === tradition.toLowerCase());
    }
  }

  if (searchQuery && searchQuery.trim().length > 0) {
    const q = searchQuery.toLowerCase().trim();
    filtered = filtered.filter((d) => {
      const matchName = d.name.toLowerCase().includes(q) || d.nameDevanagari.includes(q);
      const matchSubtitle = d.subtitle.toLowerCase().includes(q) || d.subtitleDevanagari.includes(q);
      const matchTatva = d.tatva.toLowerCase().includes(q);
      const matchVahana = d.vahana?.toLowerCase().includes(q);
      const matchAyudhas = d.ayudhas?.some((a) => a.toLowerCase().includes(q));
      const matchFestivals = d.associatedFestivals.some((f) => f.toLowerCase().includes(q));
      const matchOfferings = d.traditionalOfferings.some((o) => o.toLowerCase().includes(q));
      const matchTemples = d.majorTemples.some(
        (t) => t.name.toLowerCase().includes(q) || t.location.toLowerCase().includes(q)
      );
      const matchMantras = d.keyMantras.some(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.devanagari.includes(q) ||
          m.transliteration.toLowerCase().includes(q) ||
          m.meaning.toLowerCase().includes(q)
      );

      return (
        matchName ||
        matchSubtitle ||
        matchTatva ||
        matchVahana ||
        matchAyudhas ||
        matchFestivals ||
        matchOfferings ||
        matchTemples ||
        matchMantras
      );
    });
  }

  const traditionCounts = TRADITIONS_CONFIG.map((t) => ({
    ...t,
    count: DEITIES_DATABASE.filter((d) =>
      t.id === 'all'
        ? true
        : t.id === 'pancha_deva'
        ? d.isPanchaDeva
        : d.tradition.toLowerCase() === t.id.toLowerCase()
    ).length,
  }));

  return {
    totalCount: filtered.length,
    traditions: traditionCounts,
    deities: filtered,
  };
}

