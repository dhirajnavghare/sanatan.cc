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

        {/* Featured Live Application Card: Panchang */}
        <div className="relative overflow-hidden rounded-3xl border border-amber-200/60 bg-gradient-to-br from-amber-50 via-white to-indigo-50/30 p-6 shadow-sm dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-900 dark:to-[#171838]/40 sm:p-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-bold text-amber-800 dark:text-amber-300">
                  Public Beta
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  Calculation-based Ephemeris • Open for Validation
                </span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-3xl">
                पञ्चाङ्गम् — High-Precision Vedic Panchang
              </h2>
              <p className="max-w-lg text-sm text-zinc-600 dark:text-zinc-400">
                Extremely accurate calculation-based Panchang computed locally from Sun and Moon ephemeris (Lahiri Ayanamsa, VSOP87, Chapront ELP-2000). Enter exact Latitude &amp; Longitude or use GPS. Computes Tithi, Nakshatra, Yoga, Karana, Vara, Shubh Muhurtas, Choghadiya, and festivals.
              </p>
            </div>

            <Link
              href="/panchang"
              className="inline-flex flex-none items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:from-amber-700 hover:to-amber-800 hover:shadow-lg"
            >
              <span>Open Panchang</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 border-t border-zinc-200/80 pt-6 text-sm dark:border-zinc-800/80">
          <Link
            href="/panchang"
            className="font-medium text-amber-600 underline underline-offset-4 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300"
          >
            Explore Panchang Tab &rarr;
          </Link>

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-zinc-600 underline underline-offset-4 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            View on GitHub
          </a>

          <a
            href="mailto:mail@sanatan.cc?subject=Sanatan.cc%20Panchang%20Beta%20Feedback"
            className="font-medium text-amber-600 underline underline-offset-4 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300"
          >
            Beta Feedback (mail@sanatan.cc)
          </a>
        </div>
      </div>
    </div>
  );
}
