'use client';

import { PanchangData } from '@/app/lib/panchang/types';

interface FestivalsSectionProps {
  data: PanchangData;
  onSelectDate: (date: Date) => void;
}

export default function FestivalsSection({ data, onSelectDate }: FestivalsSectionProps) {
  const { festivals, upcomingFestivals, location } = data;

  return (
    <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Today's Festivals & Vrats */}
      <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800">
          <h2 className="flex items-center gap-2 font-serif text-base font-bold text-zinc-900 dark:text-zinc-50">
            <span>🎉 Today&apos;s Festivals & Vrat (आज के पर्व एवं व्रत)</span>
          </h2>
          <span className="text-xs text-zinc-400">
            {festivals.length} event{festivals.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="mt-3 divide-y divide-zinc-100 dark:divide-zinc-800">
          {festivals.length > 0 ? (
            festivals.map((fest, idx) => (
              <div key={idx} className="py-3 first:pt-1 last:pb-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-base font-bold text-zinc-900 dark:text-zinc-100">
                    {fest.name}
                  </h3>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      fest.isMajor
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300'
                        : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
                    }`}
                  >
                    {fest.category}
                  </span>
                </div>
                {fest.description && (
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    {fest.description}
                  </p>
                )}
              </div>
            ))
          ) : (
            <div className="py-6 text-center text-xs text-zinc-500 dark:text-zinc-400">
              No specific festival or vrat scheduled on this tithi.
            </div>
          )}
        </div>
      </div>

      {/* Coming Up: Upcoming Festivals */}
      <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800">
          <h2 className="flex items-center gap-2 font-serif text-base font-bold text-zinc-900 dark:text-zinc-50">
            <span>📅 Coming Up: Major Festivals (आगामी प्रमुख पर्व)</span>
          </h2>
          <span className="text-[11px] text-zinc-400">
            Click to view date
          </span>
        </div>

        <div className="mt-3 divide-y divide-zinc-100 dark:divide-zinc-800">
          {upcomingFestivals.length > 0 ? (
            upcomingFestivals.map((item, idx) => {
              const formattedDate = new Intl.DateTimeFormat('en-IN', {
                timeZone: location.timezone,
                weekday: 'short',
                day: 'numeric',
                month: 'short',
              }).format(item.date);

              const festNames = item.festivals.map((f) => f.name).join(', ');

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onSelectDate(item.date)}
                  className="flex w-full items-center justify-between py-3 text-left transition hover:bg-zinc-50 first:pt-1 last:pb-1 dark:hover:bg-zinc-800/50"
                  title={`Jump to ${formattedDate}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex-none rounded-xl bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                      {formattedDate}
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        {festNames}
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        in {item.daysRemaining} day{item.daysRemaining > 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>

                  <span className="text-xs text-amber-600 dark:text-amber-400">
                    View &rarr;
                  </span>
                </button>
              );
            })
          ) : (
            <div className="py-6 text-center text-xs text-zinc-500 dark:text-zinc-400">
              No upcoming festivals in the next 180 days.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
