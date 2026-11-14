'use client';

import { useState } from 'react';
import { VratGuidance } from '@/app/lib/services/vratGuidelines';
import { VratParanaDetails } from '@/app/lib/services/vratParana';
import { triggerHaptic } from '@/app/lib/services/sacredAudio';

interface VratHeroCardProps {
  vrat: VratGuidance | null;
  paranaInfo?: VratParanaDetails | null;
  isHi: boolean;
}

export default function VratHeroCard({
  vrat,
  paranaInfo,
  isHi,
}: VratHeroCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!vrat && !paranaInfo) return null;

  const handleOpenModal = () => {
    triggerHaptic('tap');
    setIsModalOpen(true);
  };

  // If only Parana Info is present without general vrat guidance
  if (!vrat && paranaInfo) {
    return (
      <div
        data-testid="parana-hero-banner"
        className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-5 shadow-xs dark:bg-emerald-950/20 sm:p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌟</span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
              {isHi
                ? paranaInfo.isDwadashi
                  ? 'एकादशी व्रत पारण मुहूर्त (आज)'
                  : 'एकादशी व्रत पारण मुहूर्त (कल)'
                : paranaInfo.isDwadashi
                ? 'Ekadashi Fast Breaking Window (Today)'
                : 'Ekadashi Fast Breaking Window (Tomorrow)'}
            </span>
          </div>
          <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-bold text-emerald-800 dark:text-emerald-300">
            {isHi ? paranaInfo.vratNameHi : paranaInfo.vratNameEn}
          </span>
        </div>

        <div className="mt-2 font-serif text-2xl font-extrabold text-emerald-900 dark:text-emerald-100 sm:text-3xl">
          {paranaInfo.startTimeFormatted} — {paranaInfo.endTimeFormatted}
        </div>

        <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
          {isHi ? paranaInfo.guidanceHi : paranaInfo.guidanceEn}
        </p>
      </div>
    );
  }

  if (!vrat) return null;

  return (
    <>
      <div
        data-testid="vrat-hero-card"
        onClick={handleOpenModal}
        className="group relative cursor-pointer overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-transparent p-5 shadow-sm transition hover:border-amber-500/50 hover:shadow-md sm:p-6 dark:border-amber-400/20 dark:bg-zinc-900"
      >
        {/* Top Badges Row */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-extrabold text-amber-800 dark:text-amber-300">
            <span>{vrat.badgeHi.split(' ')[0]}</span>
            <span>{isHi ? vrat.badgeHi : vrat.badgeEn}</span>
          </span>

          <span className="text-xs font-bold text-amber-700 group-hover:translate-x-0.5 transition-transform dark:text-amber-400">
            {isHi ? 'विधि व आहार नियम →' : 'Vidhi & Diet Rules →'}
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-2 font-serif text-xl font-extrabold text-zinc-900 sm:text-2xl dark:text-zinc-50">
          {isHi ? vrat.titleHi : vrat.titleEn}
        </h3>

        {/* Dynamic Metric: Moonrise countdown or Parana */}
        {vrat.moonriseTime && (
          <div className="mt-3 flex items-center gap-3 rounded-2xl bg-white/70 p-3 shadow-xs dark:bg-zinc-800/80">
            <span className="text-2xl">🌕</span>
            <div>
              <div className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
                {isHi ? 'आज का चन्द्रोदय (चन्द्र दर्शन व अर्घ्य)' : "Today's Moonrise (Chandra Arghya)"}
              </div>
              <div className="font-serif text-base font-bold text-zinc-900 dark:text-zinc-100">
                {vrat.moonriseTime}{' '}
                {vrat.moonriseCountdown ? (
                  <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                    • {vrat.moonriseCountdown}
                  </span>
                ) : (
                  vrat.hasMoonRisen && (
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      • {isHi ? 'चन्द्रमा उदित हो चुका है' : 'Moon has risen'}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        )}

        {vrat.ekadashiParana && !vrat.moonriseTime && (
          <div className="mt-3 flex items-center gap-3 rounded-2xl bg-emerald-500/15 p-3 dark:bg-emerald-950/40">
            <span className="text-2xl">🟢</span>
            <div>
              <div className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300">
                {isHi ? 'द्वादशी पारणा समय' : 'Dwadashi Parana Window'}
              </div>
              <div className="font-serif text-base font-bold text-emerald-900 dark:text-emerald-100">
                {vrat.ekadashiParana.startTimeFormatted} — {vrat.ekadashiParana.endTimeFormatted}
              </div>
            </div>
          </div>
        )}

        {/* Quick Food preview */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400">
          <span className="font-semibold text-zinc-800 dark:text-zinc-200">
            {isHi ? 'स्वीकार्य फलाहार:' : 'Permissible Diet:'}
          </span>
          {vrat.permissibleFoodsHi.slice(0, 3).map((f, i) => (
            <span
              key={i}
              className="rounded-md bg-zinc-100 px-2 py-0.5 text-[11px] dark:bg-zinc-800"
            >
              {isHi ? f : vrat.permissibleFoodsEn[i] || f}
            </span>
          ))}
          <span className="text-amber-600 dark:text-amber-400 font-bold">+अन्य</span>
        </div>
      </div>

      {/* Modal: Full Vrat Details */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-xl max-h-[85vh] flex flex-col rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="text-xl">📖</span>
                <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  {isHi ? vrat.titleHi : vrat.titleEn}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 flex-1 overflow-y-auto space-y-4 pr-1">
              {/* Deity & Significance */}
              <div className="rounded-2xl bg-amber-500/10 p-4 dark:bg-amber-950/20">
                <div className="text-xs font-bold text-amber-800 dark:text-amber-300">
                  {isHi ? 'अधिष्ठाता देव:' : 'Presiding Deity:'} {isHi ? vrat.deityHi : vrat.deityEn}
                </div>
                <p className="mt-1 text-xs text-zinc-700 dark:text-zinc-300">
                  {isHi ? vrat.significanceHi : vrat.significanceEn}
                </p>
              </div>

              {/* Arghya Mantra if any */}
              {vrat.arghyaMantraSanskrit && (
                <div className="rounded-2xl border border-amber-300 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800">
                  <div className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                    {isHi ? 'चन्द्र अर्घ्य मन्त्र (Chandra Arghya Mantra)' : 'Chandra Arghya Mantra'}
                  </div>
                  <div className="mt-2 font-serif text-sm font-bold text-zinc-900 dark:text-zinc-100 leading-relaxed whitespace-pre-line">
                    {vrat.arghyaMantraSanskrit}
                  </div>
                  <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
                    {isHi ? vrat.arghyaMantraMeaningHi : vrat.arghyaMantraMeaningEn}
                  </p>
                </div>
              )}

              {/* Allowed & Prohibited Foods Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/20">
                  <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                    ✓ {isHi ? 'स्वीकार्य फलाहार' : 'Allowed Fasting Foods'}
                  </div>
                  <ul className="mt-2 space-y-1 text-xs text-zinc-700 dark:text-zinc-300">
                    {(isHi ? vrat.permissibleFoodsHi : vrat.permissibleFoodsEn).map((item, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="text-emerald-600">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-red-200 bg-red-50/50 p-4 dark:border-red-900/50 dark:bg-red-950/20">
                  <div className="text-xs font-bold text-red-800 dark:text-red-300">
                    ✕ {isHi ? 'वर्जित खाद्य पदार्थ' : 'Prohibited Foods'}
                  </div>
                  <ul className="mt-2 space-y-1 text-xs text-zinc-700 dark:text-zinc-300">
                    {(isHi ? vrat.prohibitedFoodsHi : vrat.prohibitedFoodsEn).map((item, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="text-red-500">✕</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Fasting Rules */}
              <div className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800">
                <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                  {isHi ? 'शास्त्रीय व्रत नियम:' : 'Shastric Fasting Rules:'}
                </div>
                <ul className="mt-2 space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                  {(isHi ? vrat.fastingRulesHi : vrat.fastingRulesEn).map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 border-t border-zinc-100 pt-3 dark:border-zinc-800 flex justify-end">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-xl bg-amber-500 px-5 py-2 text-xs font-bold text-white hover:bg-amber-600 cursor-pointer"
              >
                {isHi ? 'सम्पन्न' : 'Done'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
