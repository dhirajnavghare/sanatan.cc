'use client';

import Link from 'next/link';

interface ApplicationCard {
  id: string;
  name: string;
  nameDevanagari: string;
  subtitle: string;
  description: string;
  icon: string;
  href: string;
  badge: string;
  gradient: string;
  buttonGradient: string;
  tags: { label: string; href?: string }[];
}

const APPS: ApplicationCard[] = [
  {
    id: 'panchang',
    name: 'Daily Panchang',
    nameDevanagari: 'दैनिक पञ्चाङ्गम्',
    subtitle: 'Zero-Approximation Vedic Ephemeris & 5 Limbs',
    description:
      'Astronomically verified calculation-based Panchang using NASA JPL VSOP87 and Chapront ELP-2000 theories. Computes Tithi, Nakshatra, Yoga, Karana, Vara, and Daytime/Nighttime Choghadiyas for any coordinates on Earth in < 1ms.',
    icon: '🗓',
    href: '/panchang',
    badge: 'Core Engine',
    gradient: 'from-amber-500/10 via-amber-500/5 to-transparent border-amber-500/20 hover:border-amber-500/50',
    buttonGradient: 'from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-amber-500/25',
    tags: [
      { label: 'Tithi & Paksha' },
      { label: 'Nakshatra & Pada' },
      { label: 'Rahu Kaal' },
      { label: 'Abhijit Muhurta' },
      { label: '16 Choghadiyas' },
      { label: 'Lahiri Ayanamsa' },
    ],
  },
  {
    id: 'muhurta',
    name: 'Shubh Muhurta Finder',
    nameDevanagari: 'शुभ मुहूर्त अन्वेषक',
    subtitle: 'Vedic Shastra Classical Auspicious Timing Engine',
    description:
      'Algorithmic discovery across 30 to 180 days for Griha Pravesh, Vivaha, Vehicle, Business, Property, and Gold. Implements Muhurta Chintamani, strictly eliminating Vishti Bhadra and Rikta Tithis while identifying Sarvartha and Amrita Siddhi yogas.',
    icon: '✨',
    href: '/muhurta',
    badge: 'Classical Canon',
    gradient: 'from-indigo-500/10 via-indigo-500/5 to-transparent border-indigo-500/20 hover:border-indigo-500/50',
    buttonGradient: 'from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 shadow-indigo-600/25',
    tags: [
      { label: 'Griha Pravesh', href: '/muhurta?category=griha-pravesh' },
      { label: 'Vivaha', href: '/muhurta?category=vivaha' },
      { label: 'Vehicle', href: '/muhurta?category=vehicle' },
      { label: 'Business', href: '/muhurta?category=business' },
      { label: 'Sarvartha Siddhi' },
      { label: 'Bhadra Exclusion' },
    ],
  },
  {
    id: 'festivals',
    name: 'Festivals Timeline',
    nameDevanagari: 'उत्सव एवं व्रत पञ्चिका',
    subtitle: '150+ Chronological Celebrations & Vrats',
    description:
      'Astronomically verified annual timeline of sacred Hindu festivals, Ekadashi vrats, Jayantis, and solar transits. Built upon Dharmasindhu and Nirnayasindhu vyapti rules with puja muhurtas, presiding deities, and shastric rituals.',
    icon: '🪔',
    href: '/festivals',
    badge: 'Annual Calendar',
    gradient: 'from-orange-500/10 via-orange-500/5 to-transparent border-orange-500/20 hover:border-orange-500/50',
    buttonGradient: 'from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 shadow-orange-500/25',
    tags: [
      { label: 'Diwali', href: '/festivals?search=diwali' },
      { label: 'Maha Shivaratri', href: '/festivals?search=shivaratri' },
      { label: 'Navratri', href: '/festivals?search=navratri' },
      { label: 'Ekadashi Vrats', href: '/festivals?category=ekadashi' },
      { label: 'Puja Muhurtas' },
      { label: 'Dynamic Multi-Year' },
    ],
  },
  {
    id: 'devatas',
    name: 'Devi Devatas',
    nameDevanagari: 'देवी-देवता ज्ञानकोष',
    subtitle: 'Sacred Mantras, Iconography & Philosophical Tatva',
    description:
      'Immersive repository of sacred Hindu deities across Shaiva, Vaishnava, Shakta, and Smarta traditions. Features authentic Sanskrit stotras with English meanings, philosophical tatva, vahanas, ayudhas, and deep-links to daily Panchang.',
    icon: '🕉️',
    href: '/devatas',
    badge: 'Vedic Lore',
    gradient: 'from-amber-500/10 via-amber-500/5 to-transparent border-amber-500/20 hover:border-amber-500/50',
    buttonGradient: 'from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-amber-600/25',
    tags: [
      { label: 'Lord Shiva', href: '/devatas?id=shiva' },
      { label: 'Lord Vishnu', href: '/devatas?id=vishnu' },
      { label: 'Maa Durga', href: '/devatas?id=durga' },
      { label: 'Lord Ganesha', href: '/devatas?id=ganesha' },
      { label: 'Lord Krishna', href: '/devatas?id=krishna' },
      { label: 'Panchayatana' },
    ],
  },
  {
    id: 'temples',
    name: 'Temples & Tirthas',
    nameDevanagari: 'तीर्थ-मन्दिर दर्शन',
    subtitle: 'Sacred Pilgrimage Circuits & Local Ephemeris',
    description:
      'Spiritual repository of 31 iconic Hindu temples: 12 Jyotirlingas, 4 Char Dhams, Shakti Peethas, and 5 Pancha Bhoota Sthalas. Features architectural heritage, sacred rivers, darshan schedules, and real-time local temple Panchang.',
    icon: '🛕',
    href: '/temples',
    badge: 'Holy Circuits',
    gradient: 'from-amber-500/10 via-amber-500/5 to-transparent border-amber-500/20 hover:border-amber-500/50',
    buttonGradient: 'from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 shadow-amber-600/25',
    tags: [
      { label: '12 Jyotirlingas', href: '/temples?circuit=jyotirlinga' },
      { label: 'Char Dham', href: '/temples?circuit=char-dham' },
      { label: 'Pancha Bhootas', href: '/temples?circuit=pancha-bhoota' },
      { label: 'Kashi Vishwanath', href: '/temples?id=kashi-vishwanath' },
      { label: 'Kedarnath', href: '/temples?id=kedarnath' },
      { label: 'Local Ephemeris' },
    ],
  },
];

export default function InteractiveAppsGrid() {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center sm:text-left">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
          <span>🏛️</span>
          <span>पंच महा-अनुप्रयोग • Five Core Applications</span>
        </div>
        <h2 className="mt-1 font-serif text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">
          The sanatan.cc Spiritual &amp; Ephemeris Suite
        </h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Complete Vedic knowledge platform engineered with mathematical rigor and cultural devotion
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
                  {app.badge}
                </span>
              </div>

              <div className="mt-4">
                <h3 className="font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  {app.name}
                </h3>
                <p className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                  {app.nameDevanagari}
                </p>
                <p className="mt-1 text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                  {app.subtitle}
                </p>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                {app.description}
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
                      {t.label}
                    </Link>
                  ) : (
                    <span
                      key={t.label}
                      className="rounded-lg bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-600 dark:bg-zinc-800/60 dark:text-zinc-400"
                    >
                      {t.label}
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
                <span>Launch {app.name}</span>
                <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
