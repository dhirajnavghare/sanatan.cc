import Link from "next/link";

const NAME = "sanatan.cc";
const TAGLINE =
  "Hindu Dharma spiritual texts, articles, content, and applications.";
const GITHUB_URL = "https://github.com/dhirajnavghare/sanatan.cc";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 font-sans sm:py-24">
      <div className="flex w-full max-w-3xl flex-col gap-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300">
            <span>ॐ</span>
            <span>वैदिक ज्ञान एवं अनुप्रयोग</span>
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-zinc-950 sm:text-6xl dark:text-zinc-50 font-serif">
            {NAME}
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            {TAGLINE} Dedicated to open-source preservation, high-precision mathematical astrology, and authentic Vedic knowledge.
          </p>
        </div>

        {/* Applications Grid: Panchang & Shubh Muhurta Finder */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Featured Application: Panchang */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-amber-200/60 bg-gradient-to-br from-amber-50 via-white to-amber-50/20 p-6 shadow-sm dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800/50 sm:p-7">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[11px] font-bold text-amber-800 dark:text-amber-300">
                  Public Beta
                </span>
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  High-Precision Ephemeris
                </span>
              </div>
              <h2 className="font-serif text-xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-2xl">
                पञ्चाङ्गम् — Vedic Panchang
              </h2>
              <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                Extremely accurate calculation-based Panchang computed locally from Sun and Moon ephemeris (Lahiri Ayanamsa, VSOP87, ELP-2000). Calculates Tithi, Nakshatra, Yoga, Karana, Vara, Shubh Muhurtas, and Choghadiya.
              </p>
            </div>

            <div className="mt-6">
              <Link
                href="/panchang"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 px-5 py-3 text-xs font-semibold text-white shadow-md transition hover:from-amber-700 hover:to-amber-800"
              >
                <span>Open Panchang</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Featured Application: Shubh Muhurta Finder */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-indigo-200/60 bg-gradient-to-br from-indigo-50/60 via-white to-purple-50/20 p-6 shadow-sm dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-900 dark:to-[#171838]/60 sm:p-7">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-[11px] font-bold text-indigo-800 dark:text-indigo-300">
                  Public Beta
                </span>
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  Classical Shastra Engine
                </span>
              </div>
              <h2 className="font-serif text-xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-2xl">
                शुभ मुहूर्त — Muhurta Finder
              </h2>
              <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                Algorithmic discovery across 30 to 180 days for Griha Pravesh, Vivaha, Vehicle Purchase, Business Start, and Property Registration. Filters Bhadra, Rikta Tithis, and identifies Sarvartha Siddhi &amp; Amrita Siddhi yogas.
              </p>
            </div>

            <div className="mt-6">
              <Link
                href="/muhurta"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-5 py-3 text-xs font-semibold text-white shadow-md transition hover:from-indigo-700 hover:to-indigo-800"
              >
                <span>Find Auspicious Muhurtas</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 border-t border-zinc-200/80 pt-6 text-sm dark:border-zinc-800/80">
          <Link
            href="/panchang"
            className="font-medium text-amber-600 underline underline-offset-4 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300"
          >
            Panchang &rarr;
          </Link>

          <Link
            href="/muhurta"
            className="font-medium text-indigo-600 underline underline-offset-4 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Muhurta Finder &rarr;
          </Link>

          <Link
            href="/about"
            className="font-medium text-zinc-600 underline underline-offset-4 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="font-medium text-zinc-600 underline underline-offset-4 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            Contact
          </Link>

          <Link
            href="/terms"
            className="font-medium text-zinc-600 underline underline-offset-4 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            Terms
          </Link>

          <Link
            href="/privacy"
            className="font-medium text-zinc-600 underline underline-offset-4 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            Privacy
          </Link>

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-zinc-600 underline underline-offset-4 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            GitHub
          </a>

          <a
            href="mailto:mail@sanatan.cc?subject=Sanatan.cc%20Beta%20Feedback"
            className="font-medium text-amber-600 underline underline-offset-4 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300"
          >
            Feedback (mail@sanatan.cc)
          </a>
        </div>
      </div>
    </div>
  );
}
