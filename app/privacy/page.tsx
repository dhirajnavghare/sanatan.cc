import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — sanatan.cc',
  description:
    'Privacy Policy for sanatan.cc — Client-side astronomical computing, zero trackers, and complete data privacy.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="flex-1 bg-zinc-50/50 px-4 py-12 dark:bg-black sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300">
            <span>🔒</span>
            <span>Privacy Policy</span>
          </div>
          <h1 className="font-serif text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
            Privacy by Design: Zero Trackers
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Effective Date: October 31, 2026 • Last updated: October 2026
          </p>
        </div>

        <div className="space-y-6 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
          <section className="space-y-2 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="font-serif text-base font-bold text-zinc-900 dark:text-zinc-100">
              1. No Personal Data Collection
            </h2>
            <p>
              sanatan.cc does not collect, sell, or rent personal data. There are no user account registration requirements, no advertising SDKs, and no tracking cookies.
            </p>
          </section>

          <section className="space-y-2 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="font-serif text-base font-bold text-zinc-900 dark:text-zinc-100">
              2. Geographical Coordinates &amp; Local Storage
            </h2>
            <p>
              When you select a city or enter custom Latitude and Longitude coordinates, those coordinates are processed locally in your browser. Any custom location preferences are saved exclusively in your browser’s local storage (`localStorage`) so your preferences persist between visits. Your coordinates are never transmitted or stored on remote servers.
            </p>
          </section>

          <section className="space-y-2 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="font-serif text-base font-bold text-zinc-900 dark:text-zinc-100">
              3. Analytics &amp; Cookies
            </h2>
            <p>
              We do not use Google Analytics, Meta Pixel, or any commercial profiling scripts. We believe that access to ancient spiritual wisdom and astronomical calculation should be completely private.
            </p>
          </section>

          <section className="space-y-2 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="font-serif text-base font-bold text-zinc-900 dark:text-zinc-100">
              4. Inquiries
            </h2>
            <p>
              For any questions regarding privacy on sanatan.cc, please contact us at <a href="mailto:mail@sanatan.cc" className="font-bold text-amber-600 underline dark:text-amber-400">mail@sanatan.cc</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
