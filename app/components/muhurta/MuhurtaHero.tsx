'use client';

import { GeoLocation } from '@/app/lib/panchang/types';

interface MuhurtaHeroProps {
  location: GeoLocation;
  onOpenLocationModal: () => void;
}

export default function MuhurtaHero({ location, onOpenLocationModal }: MuhurtaHeroProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#121330] via-[#1a1b48] to-[#0a0b1e] p-6 text-white shadow-xl ring-1 ring-white/10 sm:p-8">
      {/* Decorative cosmic aura */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-indigo-500/15 blur-3xl" />

      <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div className="space-y-2.5 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-serif text-2xl font-bold tracking-wide text-amber-400 sm:text-3xl">
              शुभ मुहूर्त शोधक
            </span>
            <span
              className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-500/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-300 shadow-sm backdrop-blur-sm"
              title="Public Beta — Active mathematical verification against traditional observatories and almanacs"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
              Beta
            </span>
            <button
              onClick={onOpenLocationModal}
              className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-200 transition hover:bg-amber-400/20"
              title="Click to edit precise coordinates or change location"
            >
              <span>📍</span>
              <span className="max-w-[200px] truncate">{location.name}</span>
              <span className="text-[10px] text-amber-400/80">
                ({location.latitude.toFixed(2)}°, {location.longitude.toFixed(2)}°)
              </span>
            </button>
            <a
              href="mailto:mail@sanatan.cc?subject=Shubh%20Muhurta%20Beta%20Feedback"
              className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-white/10 px-3 py-1 text-xs font-medium text-amber-200 transition hover:bg-white/20 hover:text-white backdrop-blur-sm"
              title="Send feedback or calculation validation notes to mail@sanatan.cc"
            >
              <span>✉️</span>
              <span>Send Beta Feedback</span>
            </a>
          </div>

          <h1 className="font-serif text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl">
            Shubh Muhurta Finder &amp; Auspicious Timings
          </h1>

          <p className="text-xs leading-relaxed text-indigo-200 sm:text-sm">
            Algorithmic discovery of auspicious dates and time windows across the next 30 to 180 days based on authentic classical Vedic texts (<em>Muhurta Chintamani</em> &amp; <em>Brihat Samhita</em>). Evaluates Tithi, Nakshatra, Yoga, Karana, Bhadra exclusion, Rahu Kaal, and planetary Choghadiya localized to your exact coordinates.
          </p>
        </div>

        {/* Feature badge pillars */}
        <div className="flex flex-row md:flex-col gap-2 text-xs">
          <div className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 border border-white/10 backdrop-blur-sm">
            <span className="text-amber-400">✨</span>
            <span className="text-zinc-200 text-[11px]">Sarvartha &amp; Amrita Siddhi Yogas</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 border border-white/10 backdrop-blur-sm">
            <span className="text-emerald-400">✓</span>
            <span className="text-zinc-200 text-[11px]">Bhadra &amp; Rikta Tithi Filtering</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 border border-white/10 backdrop-blur-sm">
            <span className="text-indigo-400">⏱</span>
            <span className="text-zinc-200 text-[11px]">Exact Daytime Choghadiya Windows</span>
          </div>
        </div>
      </div>
    </div>
  );
}
