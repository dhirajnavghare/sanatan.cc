'use client';

import { useState } from 'react';

export default function EphemerisTechPillars() {
  const [activeTab, setActiveTab] = useState<'sanatan' | 'traditional'>('sanatan');

  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-zinc-200/90 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            <span>🔬</span>
            <span>खगोलीय यथार्थता • Astronomical Ephemeris Technology</span>
          </div>
          <h2 className="mt-1 font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Why Mathematical Ephemeris Matters
          </h2>
          <p className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">
            Comparison between traditional static tabular almanacs and our zero-approximation NASA JPL VSOP87 engine
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="inline-flex rounded-2xl border border-zinc-200 bg-zinc-100 p-1 dark:border-zinc-700 dark:bg-zinc-800">
          <button
            type="button"
            onClick={() => setActiveTab('sanatan')}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
              activeTab === 'sanatan'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
            }`}
          >
            sanatan.cc Math (NASA JPL)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('traditional')}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
              activeTab === 'traditional'
                ? 'bg-zinc-700 text-white shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
            }`}
          >
            Traditional Tabular Print
          </button>
        </div>
      </div>

      {/* Comparison Visual Panel */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/70 p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <span className="text-2xl">📐</span>
          <h4 className="mt-2 font-serif text-sm font-bold text-zinc-900 dark:text-zinc-100">
            Orbital Precision
          </h4>
          <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
            {activeTab === 'sanatan'
              ? 'Meeus VSOP87 & Chapront ELP-2000 full harmonic series with < 0.0002° solar and < 0.003° lunar error.'
              : 'Mean motion linear tables with up to 15-45 arcminute perturbation drift over time.'}
          </p>
          <div className="mt-3 text-[10px] font-bold uppercase text-amber-700 dark:text-amber-400">
            {activeTab === 'sanatan' ? '✓ IAU Standards Compliant' : '⚠ Historical Approximation'}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/70 p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <span className="text-2xl">🌍</span>
          <h4 className="mt-2 font-serif text-sm font-bold text-zinc-900 dark:text-zinc-100">
            Topocentric Horizon
          </h4>
          <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
            {activeTab === 'sanatan'
              ? 'Computes local elevation horizon dip, atmospheric refraction (-0.8333°), and exact topocentric parallax.'
              : 'Typically hardcoded for Ujjain or Varanasi; introduces 15 to 45 min errors in other continents.'}
          </p>
          <div className="mt-3 text-[10px] font-bold uppercase text-amber-700 dark:text-amber-400">
            {activeTab === 'sanatan' ? '✓ Accurate Worldwide' : '⚠ Regional Only'}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/70 p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <span className="text-2xl">⚡</span>
          <h4 className="mt-2 font-serif text-sm font-bold text-zinc-900 dark:text-zinc-100">
            Computation Speed
          </h4>
          <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
            {activeTab === 'sanatan'
              ? 'Under 1 millisecond execution via optimized trigonometric formulas with LRU caching.'
              : 'Manual lookup across voluminous paper tables or slow external server database round-trips.'}
          </p>
          <div className="mt-3 text-[10px] font-bold uppercase text-amber-700 dark:text-amber-400">
            {activeTab === 'sanatan' ? '✓ Sub-millisecond Instant' : '⚠ Static Manual Tables'}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/70 p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <span className="text-2xl">📜</span>
          <h4 className="mt-2 font-serif text-sm font-bold text-zinc-900 dark:text-zinc-100">
            Shastric Vyapti Fidelity
          </h4>
          <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
            {activeTab === 'sanatan'
              ? 'Faithful to Muhurta Chintamani, Dharmasindhu, and Nirnayasindhu with Bhadra Vishti exclusion.'
              : 'Often omits critical local vyapti rules or conflates Smarta and Vaishnava fasting boundaries.'}
          </p>
          <div className="mt-3 text-[10px] font-bold uppercase text-amber-700 dark:text-amber-400">
            {activeTab === 'sanatan' ? '✓ Canonical Dharmasindhu' : '⚠ Varies by Publisher'}
          </div>
        </div>
      </div>
    </div>
  );
}
