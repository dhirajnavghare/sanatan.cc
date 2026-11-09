'use client';

import { PanchangData, MuhurtaPeriod } from '@/app/lib/panchang/types';
import { useLanguage } from '@/app/lib/i18n/LanguageContext';
import { formatPanchangTime } from './PanchangHero';

interface MuhurtaSectionProps {
  data: PanchangData;
}

export default function MuhurtaSection({ data }: MuhurtaSectionProps) {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const { muhurtas, location, vara } = data;
  const tz = location.timezone;

  const renderMuhurtaRow = (period: MuhurtaPeriod, isBad: boolean = false) => {
    return (
      <div
        key={period.name}
        className="flex items-center justify-between border-b border-zinc-100 py-3 last:border-b-0 dark:border-zinc-800"
      >
        <div className="flex items-center gap-2.5">
          <span
            className={`h-2.5 w-2.5 rounded-full flex-none ${
              isBad ? 'bg-rose-500' : 'bg-emerald-500'
            }`}
          />
          <div>
            <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {isHi ? period.nameDevanagari || period.name : period.name}
            </div>
            {period.description && (
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                {period.description}
              </div>
            )}
          </div>
        </div>

        <div className="text-right">
          <span className="font-mono text-sm font-bold text-zinc-900 dark:text-zinc-50" suppressHydrationWarning>
            {formatPanchangTime(period.startTime, tz)} – {formatPanchangTime(period.endTime, tz)}
          </span>
        </div>
      </div>
    );
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-bold text-zinc-900 dark:text-zinc-50">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/10 text-xs font-bold text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400">
            ✓
          </span>
          <span>{isHi ? 'शुभ एवं अशुभ समय' : 'Auspicious & Inauspicious Muhurtas'}</span>
        </h2>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          {isHi ? 'स्थानीय दिनमान एवं रात्रिमान के सूक्ष्म विभाजन' : 'Exact local daylight & nighttime divisions'}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Shubh Muhurtas */}
        <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm dark:border-emerald-950/60 dark:bg-zinc-900">
          <div className="mb-2 flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <h3 className="font-serif text-base font-bold text-emerald-900 dark:text-emerald-200">
                {isHi ? 'शुभ मुहूर्त' : 'Auspicious Timings'}
              </h3>
            </div>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300">
              {isHi ? 'नूतन आरम्भ हेतु प्रशस्त' : 'Optimal for Beginnings'}
            </span>
          </div>

          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {renderMuhurtaRow(muhurtas.brahmaMuhurta)}
            {renderMuhurtaRow(muhurtas.pratahSandhya)}
            {muhurtas.abhijitMuhurta ? (
              renderMuhurtaRow(muhurtas.abhijitMuhurta)
            ) : (
              <div className="flex items-center justify-between py-3 text-xs text-zinc-400">
                <div className="flex items-center gap-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                  <span>{isHi ? 'अभिजित मुहूर्त' : 'Abhijit Muhurta'}</span>
                </div>
                <span>
                  {isHi
                    ? 'बुधवार दोष के कारण अभिजित मुहूर्त का परिहार'
                    : `Skipped on ${vara.englishName}s due to astrological prohibition`}
                </span>
              </div>
            )}
            {muhurtas.amritKaal && renderMuhurtaRow(muhurtas.amritKaal)}
            {renderMuhurtaRow(muhurtas.vijayaMuhurta)}
            {renderMuhurtaRow(muhurtas.godhuliMuhurta)}
            {renderMuhurtaRow(muhurtas.sayahnaSandhya)}
            {renderMuhurtaRow(muhurtas.nishitaMuhurta)}
          </div>
        </div>

        {/* Ashubh Kaal */}
        <div className="rounded-2xl border border-rose-100 bg-white p-5 shadow-sm dark:border-rose-950/60 dark:bg-zinc-900">
          <div className="mb-2 flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-rose-500" />
              <h3 className="font-serif text-base font-bold text-rose-900 dark:text-rose-200">
                {isHi ? 'अशुभ काल' : 'Inauspicious Kaal'}
              </h3>
            </div>
            <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-semibold text-rose-700 dark:bg-rose-950/70 dark:text-rose-300">
              {isHi ? 'प्रमुख कार्यों में वर्जित' : 'Avoid Major Undertakings'}
            </span>
          </div>

          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {renderMuhurtaRow(muhurtas.rahuKaal, true)}
            {renderMuhurtaRow(muhurtas.yamaganda, true)}
            {renderMuhurtaRow(muhurtas.gulikaKaal, true)}
            {muhurtas.durMuhurtas.map((dm) => renderMuhurtaRow(dm, true))}
            {muhurtas.varjyam && renderMuhurtaRow(muhurtas.varjyam, true)}
          </div>
        </div>
      </div>
    </section>
  );
}
