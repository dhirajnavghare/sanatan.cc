'use client';

import Link from 'next/link';
import { useLanguage } from '@/app/lib/i18n/LanguageContext';

interface ApplicationCard {
  id: string;
  name: string;
  nameDevanagari: string;
  subtitle: string;
  subtitleHindi: string;
  description: string;
  descriptionHindi: string;
  icon: string;
  href: string;
  badge: string;
  badgeHindi: string;
  gradient: string;
  buttonGradient: string;
  tags: { label: string; labelHindi: string; href?: string }[];
}

const APPS: ApplicationCard[] = [
  {
    id: 'panchang',
    name: 'Daily Panchang',
    nameDevanagari: 'दैनिक पञ्चाङ्ग',
    subtitle: 'Zero-Approximation Vedic Ephemeris & 5 Limbs',
    subtitleHindi: 'शून्य-अनुमान आधारित वैदिक गणित व पञ्चाङ्ग',
    description:
      'Astronomically verified calculation-based Panchang using NASA JPL VSOP87 and Chapront ELP-2000 theories. Computes Tithi, Nakshatra, Yoga, Karana, Vara, and Daytime/Nighttime Choghadiyas for any coordinates on Earth in < 1ms.',
    descriptionHindi:
      'नासा JPL VSOP87 एवं Chapront ELP-2000 सिद्धांतों पर आधारित यथार्थ पञ्चाङ्ग। पृथ्वी के किसी भी स्थान हेतु तिथि, नक्षत्र, योग, करण, वार एवं दिन/रात्रि चौघड़िया की < १ मिलीसेकंड में गणना।',
    icon: '🗓',
    href: '/panchang',
    badge: 'Core Engine',
    badgeHindi: 'मूल गणना',
    gradient: 'from-amber-500/10 via-amber-500/5 to-transparent border-amber-500/20 hover:border-amber-500/50',
    buttonGradient: 'from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-amber-500/25',
    tags: [
      { label: 'Tithi & Paksha', labelHindi: 'तिथि व पक्ष' },
      { label: 'Nakshatra & Pada', labelHindi: 'नक्षत्र व चरण' },
      { label: 'Rahu Kaal', labelHindi: 'राहु काल' },
      { label: 'Abhijit Muhurta', labelHindi: 'अभिजित मुहूर्त' },
      { label: '16 Choghadiyas', labelHindi: '१६ चौघड़िया' },
      { label: 'Lahiri Ayanamsa', labelHindi: 'लाहिड़ी अयनांश' },
    ],
  },
  {
    id: 'muhurta',
    name: 'Shubh Muhurta Finder',
    nameDevanagari: 'शुभ मुहूर्त अन्वेषक',
    subtitle: 'Vedic Shastra Classical Auspicious Timing Engine',
    subtitleHindi: 'शास्त्रीय विधि सम्मत शुभ काल निर्धारक',
    description:
      'Algorithmic discovery across 30 to 180 days for Griha Pravesh, Vivaha, Vehicle, Business, Property, and Gold. Implements Muhurta Chintamani, strictly eliminating Vishti Bhadra and Rikta Tithis while identifying Sarvartha and Amrita Siddhi yogas.',
    descriptionHindi:
      'गृह प्रवेश, विवाह, वाहन, व्यापार, सम्पत्ति एवं स्वर्ण क्रय हेतु ३० से १८० दिनों में शास्त्रीय खोज। भद्रा (विष्टि) व रिक्ता तिथियों का पूर्ण त्याग तथा सर्वार्थ सिद्धि योगों का चयन।',
    icon: '✨',
    href: '/muhurta',
    badge: 'Classical Canon',
    badgeHindi: 'शास्त्रीय प्रमाण',
    gradient: 'from-indigo-500/10 via-indigo-500/5 to-transparent border-indigo-500/20 hover:border-indigo-500/50',
    buttonGradient: 'from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 shadow-indigo-600/25',
    tags: [
      { label: 'Griha Pravesh', labelHindi: 'गृह प्रवेश', href: '/muhurta?category=griha-pravesh' },
      { label: 'Vivaha', labelHindi: 'विवाह', href: '/muhurta?category=vivaha' },
      { label: 'Vehicle', labelHindi: 'वाहन क्रय', href: '/muhurta?category=vehicle' },
      { label: 'Business', labelHindi: 'व्यापार आरम्भ', href: '/muhurta?category=business' },
      { label: 'Sarvartha Siddhi', labelHindi: 'सर्वार्थ सिद्धि' },
      { label: 'Bhadra Exclusion', labelHindi: 'भद्रा त्याग' },
    ],
  },
  {
    id: 'festivals',
    name: 'Festivals Timeline',
    nameDevanagari: 'उत्सव एवं व्रत पञ्चिका',
    subtitle: '150+ Chronological Celebrations & Vrats',
    subtitleHindi: '१५०+ वार्षिक पर्व, व्रत एवं जयन्तियां',
    description:
      'Astronomically verified annual timeline of sacred Hindu festivals, Ekadashi vrats, Jayantis, and solar transits. Built upon Dharmasindhu and Nirnayasindhu vyapti rules with puja muhurtas, presiding deities, and shastric rituals.',
    descriptionHindi:
      'धर्मसिन्धु एवं निर्णयसिन्धु व्याप्ति नियमों पर आधारित वार्षिक हिन्दू पर्व, एकादशी व्रत एवं संक्रान्ति। पूजा मुहूर्त, अधिष्ठाता देवता एवं शास्त्रीय पूजा विधि सहित।',
    icon: '🪔',
    href: '/festivals',
    badge: 'Annual Calendar',
    badgeHindi: 'वार्षिक पञ्चिका',
    gradient: 'from-orange-500/10 via-orange-500/5 to-transparent border-orange-500/20 hover:border-orange-500/50',
    buttonGradient: 'from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 shadow-orange-500/25',
    tags: [
      { label: 'Diwali', labelHindi: 'दीपावली', href: '/festivals?search=diwali' },
      { label: 'Maha Shivaratri', labelHindi: 'महाशिवरात्रि', href: '/festivals?search=shivaratri' },
      { label: 'Navratri', labelHindi: 'नवरात्रि', href: '/festivals?search=navratri' },
      { label: 'Ekadashi Vrats', labelHindi: 'एकादशी व्रत', href: '/festivals?category=ekadashi' },
      { label: 'Puja Muhurtas', labelHindi: 'पूजा मुहूर्त' },
      { label: 'Dynamic Multi-Year', labelHindi: 'बहुवर्षीय गणना' },
    ],
  },
  {
    id: 'devatas',
    name: 'Devi Devatas',
    nameDevanagari: 'देवी-देवता ज्ञानकोष',
    subtitle: 'Sacred Mantras, Iconography & Philosophical Tatva',
    subtitleHindi: 'वैदिक मन्त्र, रूप-स्वरूप एवं दार्शनिक तत्त्व',
    description:
      'Immersive repository of sacred Hindu deities across Shaiva, Vaishnava, Shakta, and Smarta traditions. Features authentic Sanskrit stotras with English meanings, philosophical tatva, vahanas, ayudhas, and deep-links to daily Panchang.',
    descriptionHindi:
      'शैव, वैष्णव, शाक्त एवं स्मार्त परम्पराओं के पावन देवी-देवताओं का संकलन। प्रामाणिक संस्कृत स्तोत्र, आध्यात्मिक भावार्थ, वाहन, आयुध एवं पञ्चाङ्ग संयोजन।',
    icon: '🕉️',
    href: '/devatas',
    badge: 'Vedic Lore',
    badgeHindi: 'वैदिक ज्ञानकोष',
    gradient: 'from-amber-500/10 via-amber-500/5 to-transparent border-amber-500/20 hover:border-amber-500/50',
    buttonGradient: 'from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-amber-600/25',
    tags: [
      { label: 'Lord Shiva', labelHindi: 'भगवान शिव', href: '/devatas?id=shiva' },
      { label: 'Lord Vishnu', labelHindi: 'भगवान विष्णु', href: '/devatas?id=vishnu' },
      { label: 'Maa Durga', labelHindi: 'माँ दुर्गा', href: '/devatas?id=durga' },
      { label: 'Lord Ganesha', labelHindi: 'भगवान गणेश', href: '/devatas?id=ganesha' },
      { label: 'Lord Krishna', labelHindi: 'भगवान श्रीकृष्ण', href: '/devatas?id=krishna' },
      { label: 'Panchayatana', labelHindi: 'पंचायतन पूजा' },
    ],
  },
  {
    id: 'temples',
    name: 'Temples & Tirthas',
    nameDevanagari: 'तीर्थ-मन्दिर दर्शन',
    subtitle: 'Sacred Pilgrimage Circuits & Local Ephemeris',
    subtitleHindi: 'पवित्र तीर्थ परिक्रमा एवं स्थानीय पञ्चाङ्ग',
    description:
      'Spiritual repository of 31 iconic Hindu temples: 12 Jyotirlingas, 4 Char Dhams, Shakti Peethas, and 5 Pancha Bhoota Sthalas. Features architectural heritage, sacred rivers, darshan schedules, and real-time local temple Panchang.',
    descriptionHindi:
      '३१ पवित्र धामों का तीर्थ संग्रह: १२ ज्योतिर्लिंग, ४ चार धाम, शक्तिपीठ एवं पंचभूत स्थल। स्थापत्य धरोहर, पावन नदियां, दर्शन समय एवं स्थानीय मन्दिर पञ्चाङ्ग।',
    icon: '🛕',
    href: '/temples',
    badge: 'Holy Circuits',
    badgeHindi: 'तीर्थ परिक्रमा',
    gradient: 'from-amber-500/10 via-amber-500/5 to-transparent border-amber-500/20 hover:border-amber-500/50',
    buttonGradient: 'from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 shadow-amber-600/25',
    tags: [
      { label: '12 Jyotirlingas', labelHindi: '१२ ज्योतिर्लिंग', href: '/temples?circuit=jyotirlinga' },
      { label: 'Char Dham', labelHindi: 'चार धाम', href: '/temples?circuit=char-dham' },
      { label: 'Pancha Bhootas', labelHindi: 'पंचभूत स्थल', href: '/temples?circuit=pancha-bhoota' },
      { label: 'Kashi Vishwanath', labelHindi: 'काशी विश्वनाथ', href: '/temples?id=kashi-vishwanath' },
      { label: 'Kedarnath', labelHindi: 'केदारनाथ', href: '/temples?id=kedarnath' },
      { label: 'Local Ephemeris', labelHindi: 'स्थानीय पञ्चाङ्ग' },
    ],
  },
];

export default function InteractiveAppsGrid() {
  const { language } = useLanguage();

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center sm:text-left">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
          <span>🏛️</span>
          <span>{language === 'hi' ? 'पंच महा-अनुप्रयोग' : 'Five Core Applications'}</span>
        </div>
        <h2 className="mt-1 font-serif text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">
          {language === 'hi'
            ? 'sanatan.cc वैदिक एवं खगोलीय अनुप्रयोग'
            : 'The sanatan.cc Spiritual & Ephemeris Suite'}
        </h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          {language === 'hi'
            ? 'गणितीय शुद्धता एवं सांस्कृतिक निष्ठा से युक्त सम्पूर्ण सनातन ज्ञान मंच'
            : 'Complete Vedic knowledge platform engineered with mathematical rigor and cultural devotion'}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {APPS.map((app) => (
          <div
            key={app.id}
            className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border bg-gradient-to-br p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:bg-zinc-900 ${app.gradient}`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm ring-1 ring-zinc-200/80 transition-transform duration-300 group-hover:scale-110 dark:bg-zinc-800 dark:ring-zinc-700">
                  {app.icon}
                </span>
                <span className="rounded-full bg-zinc-900/10 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-zinc-700 dark:bg-white/10 dark:text-zinc-300">
                  {language === 'hi' ? app.badgeHindi : app.badge}
                </span>
              </div>

              <div className="mt-4">
                <h3 className="font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  {language === 'hi' ? app.nameDevanagari : app.name}
                </h3>
                <p className="mt-1 text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                  {language === 'hi' ? app.subtitleHindi : app.subtitle}
                </p>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                {language === 'hi' ? app.descriptionHindi : app.description}
              </p>

              {/* Quick Tags */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {app.tags.map((t) =>
                  t.href ? (
                    <Link
                      key={t.label}
                      href={t.href}
                      className="rounded-lg bg-white/80 px-2 py-0.5 text-[10px] font-semibold text-zinc-700 shadow-xs ring-1 ring-zinc-200/60 transition hover:bg-amber-50 hover:text-amber-800 dark:bg-zinc-800/80 dark:text-zinc-300 dark:ring-zinc-700 dark:hover:bg-zinc-700"
                    >
                      {language === 'hi' ? t.labelHindi : t.label}
                    </Link>
                  ) : (
                    <span
                      key={t.label}
                      className="rounded-lg bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-600 dark:bg-zinc-800/60 dark:text-zinc-400"
                    >
                      {language === 'hi' ? t.labelHindi : t.label}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="mt-6 border-t border-zinc-200/60 pt-4 dark:border-zinc-800">
              <Link
                href={app.href}
                className={`flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r px-4 py-3 text-xs font-bold text-white shadow-md transition-all duration-200 ${app.buttonGradient}`}
              >
                <span>{language === 'hi' ? `${app.nameDevanagari} खोलें` : `Launch ${app.name}`}</span>
                <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
