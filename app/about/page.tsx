import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About sanatan.cc — Mission, Open Source & Vedic Ephemeris',
  description:
    'sanatan.cc is an open-source initiative dedicated to authentic preservation of Hindu Dharma spiritual texts and high-precision astronomical Vedic calculations.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <div className="flex-1 bg-zinc-50/50 px-4 py-12 dark:bg-black sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-10">
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300">
            <span>ॐ</span>
            <span>About sanatan.cc</span>
          </div>
          <h1 className="font-serif text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
            Preserving Vedic Wisdom Through Modern Precision
          </h1>
          <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            sanatan.cc is a non-commercial, open-source initiative dedicated to preserving and sharing authentic Hindu Dharma spiritual texts, philosophical treatises, and world-class mathematical Vedic ephemeris applications.
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-xl text-amber-600 dark:text-amber-400">
              🔭
            </div>
            <h2 className="mt-4 font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Pure Ephemeris, Zero Hardcoding
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              Unlike static table lookup apps, our Panchang and Muhurta engines calculate planetary and solilunar positions in real-time using modern celestial mechanics (VSOP87 planetary theory, Chapront ELP-2000 lunar theory, and Lahiri Chitra Paksha Ayanamsa). Every limb transition is accurate to the astronomical second for any coordinates on Earth.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-xl text-indigo-600 dark:text-indigo-400">
              📜
            </div>
            <h2 className="mt-4 font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Classical Shastra Fidelity
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              Our auspicious timing algorithms rigorously encode traditional rules from canonical authorities including <em>Surya Siddhanta</em>, <em>Muhurta Chintamani</em>, <em>Brihat Samhita</em>, and <em>Kalaprakasika</em>. We filter malefic conditions like Bhadra (Vishti Karana) and Rikta Tithis with scriptural precision.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-xl text-emerald-600 dark:text-emerald-400">
              🔒
            </div>
            <h2 className="mt-4 font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Local Privacy by Design
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              All astronomical calculations execute entirely inside your client browser. We deploy zero tracking scripts, zero third-party telemetry, and zero advertising pixels. Your geographical location never leaves your device.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-xl text-purple-600 dark:text-purple-400">
              🤖
            </div>
            <h2 className="mt-4 font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Agent-Ready Infrastructure
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              Designed from the ground up for both human seekers and AI agents. We publish clean Markdown representations (`Accept: text/markdown`), expose in-browser WebMCP tools (`navigator.modelContext`), serve standard `llms.txt`, and host an MCP Server Card (`/.well-known/mcp/server-card.json`).
            </p>
          </div>
        </div>

        {/* Open Source Callout */}
        <div className="rounded-2xl border border-amber-200/60 bg-gradient-to-r from-amber-50 to-orange-50/50 p-6 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-800/40">
          <h3 className="font-serif text-base font-bold text-zinc-900 dark:text-zinc-100">
            Open Source &amp; Community Validation
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
            This repository is open-source under the MIT License. We actively invite astronomers, Jyotish scholars, and developers to audit our mathematical algorithms and report discrepancies against verified observatories.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href="https://github.com/dhirajnavghare/sanatan.cc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              <span>GitHub Repository</span>
              <span>→</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-xs font-semibold text-zinc-800 shadow-sm transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
            >
              <span>Contact &amp; Feedback</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
