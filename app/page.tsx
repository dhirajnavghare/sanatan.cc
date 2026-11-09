import Link from "next/link";

const NAME = "sanatan.cc";
const TAGLINE =
  "Preserving authentic Hindu Dharma spiritual heritage with high-precision mathematical Vedic ephemeris.";
const GITHUB_URL = "https://github.com/dhirajnavghare/sanatan.cc";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 font-sans sm:px-6 sm:py-20 lg:px-8">
      <div className="flex w-full max-w-5xl flex-col gap-10">
        {/* Top Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#121332] via-[#1a1c50] to-[#0a0b20] p-8 text-white shadow-xl ring-1 ring-white/10 sm:p-12">
          {/* Decorative ambient auras */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-amber-500/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="relative space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/20 px-3.5 py-1 text-xs font-semibold text-amber-300 backdrop-blur-md">
              <span className="text-sm">ॐ</span>
              <span>वैदिक ज्ञान एवं खगोलीय अनुप्रयोग</span>
            </div>

            <h1 className="font-serif text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl">
              {NAME}
            </h1>

            <p className="text-sm leading-relaxed text-indigo-200 sm:text-lg">
              {TAGLINE} Dedicated to open-source public domain preservation, zero-tabular ephemeris trigonometry, and authentic scriptural Shastra calculations.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/panchang"
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-amber-500/30 transition hover:from-amber-600 hover:to-amber-700 cursor-pointer"
              >
                <span>🗓 Open Daily Panchang</span>
                <span>&rarr;</span>
              </Link>
              <Link
                href="/muhurta"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-xs font-bold text-white backdrop-blur-md transition hover:bg-white/20 cursor-pointer"
              >
                <span>✨ Find Shubh Muhurtas</span>
                <span>&rarr;</span>
              </Link>
              <Link
                href="/festivals"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-xs font-bold text-white backdrop-blur-md transition hover:bg-white/20 cursor-pointer"
              >
                <span>🪔 Festivals Timeline</span>
                <span>&rarr;</span>
              </Link>
              <Link
                href="/devatas"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-xs font-bold text-white backdrop-blur-md transition hover:bg-white/20 cursor-pointer"
              >
                <span>🕉️ Devi Devatas</span>
                <span>&rarr;</span>
              </Link>
              <Link
                href="/temples"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-xs font-bold text-white backdrop-blur-md transition hover:bg-white/20 cursor-pointer"
              >
                <span>🛕 Temples &amp; Tirthas</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Applications Grid: Panchang, Shubh Muhurta Finder, Festival Timeline, Devi Devatas & Temples */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Application 1: Panchang */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200/90 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 sm:p-7">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-2xl text-amber-600 dark:bg-amber-400/10 dark:text-amber-400">
                  🗓
                </span>
                <span className="rounded-full bg-amber-500/20 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                  Public Beta
                </span>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  पञ्चाङ्गम् — Daily Panchang
                </h2>
                <p className="mt-1 text-xs text-amber-700 dark:text-amber-400 font-medium">
                  High-Precision Ephemeris &amp; Astronomical Calculator
                </p>
              </div>

              <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                Extremely accurate calculation-based Panchang computed on our high-performance backend using NASA JPL VSOP87 and Chapront ELP-2000 lunar theories with Lahiri Chitra Paksha Ayanamsa. Computes Tithi, Nakshatra, Yoga, Karana, Vara, Shubh Muhurtas, and Daytime/Nighttime Choghadiyas for any coordinates on Earth.
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {['Tithi', 'Nakshatra', 'Yoga', 'Karana', 'Choghadiya', 'Rahu Kaal', 'Abhijit'].map((limb) => (
                  <span
                    key={limb}
                    className="rounded-lg bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                  >
                    {limb}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/panchang"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3 text-xs font-bold text-white shadow-md shadow-amber-500/20 transition hover:from-amber-600 hover:to-amber-700 cursor-pointer"
              >
                <span>Launch Panchang Calculator</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Application 2: Shubh Muhurta Finder */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200/90 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-2xl text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400">
                  ✨
                </span>
                <span className="rounded-full bg-indigo-500/20 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-indigo-800 dark:text-indigo-300">
                  Public Beta
                </span>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  शुभ मुहूर्त — Muhurta Finder
                </h2>
                <p className="mt-1 text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                  Classical Vedic Shastra Auspicious Timing Engine
                </p>
              </div>

              <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                Algorithmic discovery across 30 to 180 days for Griha Pravesh, Vivaha, Vehicle Purchase, Business Start, Property Registration, and Namakarana. Implements rigorous canonical rules from <em>Muhurta Chintamani</em>, strictly excluding Vishti Bhadra and Rikta Tithis while identifying Sarvartha &amp; Amrita Siddhi yogas.
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {['Griha Pravesh', 'Vivaha', 'Vehicle', 'Business', 'Property', 'Gold', 'Siddhi Yogas'].map((cat) => (
                  <span
                    key={cat}
                    className="rounded-lg bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/muhurta"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-5 py-3 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition hover:from-indigo-700 hover:to-indigo-800 cursor-pointer"
              >
                <span>Discover Auspicious Muhurtas</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Application 3: Hindu Festivals Timeline */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200/90 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 sm:p-7">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 text-2xl text-orange-600 dark:bg-orange-400/10 dark:text-orange-400">
                  🪔
                </span>
                <span className="rounded-full bg-orange-500/20 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-orange-800 dark:text-orange-300">
                  New Feature
                </span>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  उत्सव एवं व्रत — Festivals Timeline
                </h2>
                <p className="mt-1 text-xs text-orange-700 dark:text-orange-400 font-medium">
                  Chronological Hindu Festival &amp; Vrat Calendar
                </p>
              </div>

              <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                Astronomically verified timeline of 150+ sacred Hindu festivals, Ekadashi vrats, Jayantis, and solar transits. Features Dharmasindhu vyapti rules, puja muhurta windows, presiding deities, and traditional observance guidance for any year.
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {['Diwali', 'Shivaratri', 'Holi', 'Navratri', 'Ekadashi', 'Ganesh Utsav', 'Puja Muhurtas'].map((f) => (
                  <span
                    key={f}
                    className="rounded-lg bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/festivals"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 px-5 py-3 text-xs font-bold text-white shadow-md shadow-orange-500/20 transition hover:from-orange-600 hover:to-amber-700 cursor-pointer"
              >
                <span>Explore Festivals Timeline</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Application 4: Hindu Devi Devatas */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200/90 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 sm:p-7">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-2xl text-amber-600 dark:bg-amber-400/10 dark:text-amber-400">
                  🕉️
                </span>
                <span className="rounded-full bg-amber-500/20 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                  New Feature
                </span>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  देवी-देवता — Devi Devatas
                </h2>
                <p className="mt-1 text-xs text-amber-700 dark:text-amber-400 font-medium">
                  Vedic Philosophy, Sacred Mantras &amp; Divine Iconography
                </p>
              </div>

              <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                Immersive repository of sacred Hindu deities across Shaiva, Vaishnava, Shakta, and Smarta traditions. Features authentic Sanskrit mantras with English meanings, philosophical tatva, vahanas, ayudhas, historic temples, and deep-links to daily Panchang tithis and annual festivals.
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {['Shiva', 'Vishnu', 'Durga', 'Ganesha', 'Krishna', 'Rama', 'Hanuman', 'Lakshmi', 'Mantras', 'Temples'].map((d) => (
                  <span
                    key={d}
                    className="rounded-lg bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/devatas"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-5 py-3 text-xs font-bold text-white shadow-md shadow-amber-500/20 transition hover:from-amber-600 hover:to-orange-600 cursor-pointer"
              >
                <span>Explore Devi Devatas</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Application 5: Hindu Sanatan Temples & Tirthas */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200/90 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 sm:p-7">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-2xl text-amber-600 dark:bg-amber-400/10 dark:text-amber-400">
                  🛕
                </span>
                <span className="rounded-full bg-amber-500/20 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                  New Feature
                </span>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  तीर्थ-मन्दिर — Temples &amp; Tirthas
                </h2>
                <p className="mt-1 text-xs text-amber-700 dark:text-amber-400 font-medium">
                  Sacred Pilgrimage Circuits, Puranic Lore &amp; Local Panchang
                </p>
              </div>

              <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                Spiritual repository of iconic Hindu temples: 12 Jyotirlingas, 4 Char Dhams, Shakti Peethas, Pancha Bhoota Sthalams, and global sanctuaries. Features architectural styles, sacred rivers, darshan schedules, and real-time local Panchang calculations at exact geographic coordinates.
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {['12 Jyotirlingas', 'Char Dham', 'Shakti Peethas', 'Pancha Bhoota', 'Ayodhya', 'Kashi', 'Puri', 'Tirupati'].map((t) => (
                  <span
                    key={t}
                    className="rounded-lg bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/temples"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-5 py-3 text-xs font-bold text-white shadow-md shadow-amber-500/20 transition hover:from-amber-600 hover:to-orange-600 cursor-pointer"
              >
                <span>Explore Sacred Temples &amp; Tirthas</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Feature Pillars */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-2xl">🔬</span>
            <h3 className="mt-2 font-serif text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Pure Ephemeris Math
            </h3>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              Zero tabular approximations. Real-time solar, lunar, and planetary perturbation calculations from first principles.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-2xl">⚡</span>
            <h3 className="mt-2 font-serif text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Sub-Millisecond Engine
            </h3>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              High-performance backend evaluation with LRU caching, rendering daily panchang and 180-day scans in under 1ms.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-2xl">🔒</span>
            <h3 className="mt-2 font-serif text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Zero Trackers &amp; Privacy
            </h3>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              Zero advertising scripts, zero tracking pixels. Custom coordinates remain exclusively in local browser storage.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-2xl">🤖</span>
            <h3 className="mt-2 font-serif text-sm font-bold text-zinc-900 dark:text-zinc-100">
              AI &amp; Agent Native
            </h3>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              Full WebMCP tool registry, SEP-1649 MCP server cards, and token-efficient Markdown content negotiation.
            </p>
          </div>
        </div>

        {/* Bottom Quick Links */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-zinc-200/80 pt-6 text-xs text-zinc-600 dark:border-zinc-800/80 dark:text-zinc-400">
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/panchang" className="font-semibold text-amber-600 hover:text-amber-700 dark:text-amber-400">
              Panchang &rarr;
            </Link>
            <Link href="/muhurta" className="font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
              Muhurta Finder &rarr;
            </Link>
            <Link href="/about" className="hover:text-zinc-900 dark:hover:text-zinc-100">
              About
            </Link>
            <Link href="/contact" className="hover:text-zinc-900 dark:hover:text-zinc-100">
              Contact
            </Link>
            <Link href="/terms" className="hover:text-zinc-900 dark:hover:text-zinc-100">
              Terms (CC0 1.0)
            </Link>
            <Link href="/privacy" className="hover:text-zinc-900 dark:hover:text-zinc-100">
              Privacy
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              GitHub Repository
            </a>
            <span>•</span>
            <a
              href="mailto:mail@sanatan.cc?subject=Sanatan.cc%20Feedback"
              className="font-semibold text-amber-600 hover:text-amber-700 dark:text-amber-400"
            >
              mail@sanatan.cc
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
