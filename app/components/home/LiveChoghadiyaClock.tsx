'use client';

import { useState, useMemo } from 'react';
import { GeoLocation, ChoghadiyaPeriod } from '@/app/lib/panchang/types';
import { calculatePanchang } from '@/app/lib/panchang';
import { useLanguage } from '@/app/lib/i18n/LanguageContext';

interface LiveChoghadiyaClockProps {
  location: GeoLocation;
}

const QUAL_HI: Record<string, string> = {
  Amrit: 'अमृत',
  Shubh: 'शुभ',
  Labh: 'लाभ',
  Char: 'चल',
  Rog: 'रोग',
  Kaal: 'काल',
  Udveg: 'उद्वेग',
};

const RULER_HI: Record<string, string> = {
  Sun: 'सूर्य',
  Moon: 'चन्द्र',
  Mars: 'मंगल',
  Mercury: 'बुध',
  Jupiter: 'बृहस्पति',
  Venus: 'शुक्र',
  Saturn: 'शनि',
};

const CHOGHADIYA_EXPLAINER: Record<
  string,
  {
    desc: string;
    descHi: string;
    suitable: string;
    suitableHi: string;
    badge: string;
  }
> = {
  Amrit: {
    desc: 'Ruled by Moon / Mercury. Pure nectar; universally auspicious for all actions.',
    descHi: 'चन्द्र/बुध द्वारा शासित। अमृत के समान परम शुभ, सभी कार्यों के लिए कल्याणकारी।',
    suitable: 'Spiritual initiation, investments, ceremonies, travel, and business launch.',
    suitableHi: 'दीक्षा, पूजन, यात्रा, गृह प्रवेश एवं नवीन व्यापार का शुभारम्भ।',
    badge: 'bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-500/30',
  },
  Shubh: {
    desc: 'Ruled by Jupiter. Highly auspicious and divine blessing window.',
    descHi: 'बृहस्पति देव द्वारा शासित। धर्म, ज्ञान और मांगलिक कार्यों हेतु सर्वश्रेष्ठ।',
    suitable: 'Marriage rituals, religious rites, purchases, learning, and agreements.',
    suitableHi: 'विवाह, धार्मिक अनुष्ठान, विद्यारम्भ, आभूषण क्रय और अनुबंध।',
    badge: 'bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-500/30',
  },
  Labh: {
    desc: 'Ruled by Mercury. Highly beneficial for wealth accumulation and commerce.',
    descHi: 'बुध ग्रह द्वारा शासित। धनोपार्जन, व्यापार और आर्थिक लाभ हेतु अति उत्तम।',
    suitable: 'Starting commercial trade, signing contracts, buying assets, education.',
    suitableHi: 'दुकान या व्यापार आरम्भ, बहीखाता, शेयर व संपदा निवेश।',
    badge: 'bg-teal-500/20 text-teal-800 dark:text-teal-300 border-teal-500/30',
  },
  Char: {
    desc: 'Ruled by Venus. Mobile and dynamic energy.',
    descHi: 'शुक्र ग्रह द्वारा शासित। गतिशीलता और यात्रा हेतु अनुकूल मुहूर्त।',
    suitable: 'Travel, vehicle driving, journey start, sports, and fast-moving tasks.',
    suitableHi: 'यात्रा, वाहन क्रय व चालन, खेलकूद तथा गत्यात्मक कार्य।',
    badge: 'bg-blue-500/20 text-blue-800 dark:text-blue-300 border-blue-500/30',
  },
  Rog: {
    desc: 'Ruled by Mars. Negative energy; indicates strife, disputes, or illness.',
    descHi: 'मंगल देव द्वारा शासित। कलह, रोग व विवाद का कारक; शुभ कार्य वर्जित।',
    suitable: 'Medical consultations or warfare; strictly avoid auspicious beginnings.',
    suitableHi: 'रोगोपचार, वाद-विवाद निवारण; शुभ कार्य प्रारम्भ न करें।',
    badge: 'bg-red-500/20 text-red-800 dark:text-red-300 border-red-500/30',
  },
  Kaal: {
    desc: 'Ruled by Saturn. Heavy karmic pressure; indicates delay or loss.',
    descHi: 'शनि देव द्वारा शासित। हानि, विलम्ब और विघ्न कारक; शुभ कार्य न करें।',
    suitable: 'Demolition or debt clearance; avoid launching new ventures or travel.',
    suitableHi: 'ऋण मुक्ति, पुराना ढांचा हटाना; नया कार्य व यात्रा वर्जित।',
    badge: 'bg-rose-500/20 text-rose-800 dark:text-rose-300 border-rose-500/30',
  },
  Udveg: {
    desc: 'Ruled by Sun. Creates mental anxiety, restlessness, and sudden turbulence.',
    descHi: 'सूर्य देव द्वारा शासित। उद्विग्नता व अशांति कारक; शांतिपूर्वक कार्य करें।',
    suitable: 'Government tax compliance or state duties; avoid celebrations.',
    suitableHi: 'राजकार्य, कर भुगतान; मांगलिक उत्सव व नवीन कार्य टालें।',
    badge: 'bg-amber-500/20 text-amber-800 dark:text-amber-300 border-amber-500/30',
  },
};

export default function LiveChoghadiyaClock({ location }: LiveChoghadiyaClockProps) {
  const [tab, setTab] = useState<'day' | 'night'>('day');
  const [selectedPeriod, setSelectedPeriod] = useState<ChoghadiyaPeriod | null>(null);
  const { language, t } = useLanguage();

  const now = useMemo(() => new Date(), []);
  const panchang = useMemo(() => {
    return calculatePanchang(now, location, 'Lahiri', now);
  }, [now, location]);

  const periods = tab === 'day' ? panchang.choghadiya.day : panchang.choghadiya.night;
  const currentPeriod = useMemo(() => {
    const all = [...panchang.choghadiya.day, ...panchang.choghadiya.night];
    return all.find((c) => c.isCurrent) || periods[0];
  }, [panchang, periods]);

  const activeInspection = selectedPeriod || currentPeriod;
  const explainer = CHOGHADIYA_EXPLAINER[activeInspection.quality] || {
    desc: 'Vedic hourly muhurta division.',
    suitable: 'General day tasks.',
    badge: 'bg-zinc-100 text-zinc-800',
  };

  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-zinc-200/90 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
      {/* Header with Day/Night Switcher */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            <span>⌛</span>
            <span>{language === 'hi' ? 'चौघड़िया समय चक्र' : 'Vedic Muhurta Segments'}</span>
          </div>
          <h2 className="mt-1 font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            {t('choghadiyaTitle')}
          </h2>
          <p className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">
            {t('choghadiyaSubtitle')}
          </p>
        </div>

        {/* Segmented Switcher */}
        <div className="inline-flex rounded-2xl border border-zinc-200 bg-zinc-100 p-1 dark:border-zinc-700 dark:bg-zinc-800">
          <button
            type="button"
            onClick={() => {
              setTab('day');
              setSelectedPeriod(null);
            }}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
              tab === 'day'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
            }`}
          >
            <span>☀️</span>
            <span>{t('daytime')}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setTab('night');
              setSelectedPeriod(null);
            }}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
              tab === 'night'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
            }`}
          >
            <span>🌙</span>
            <span>{t('nighttime')}</span>
          </button>
        </div>
      </div>

      {/* Interactive 8-Period Horizontal Slider / Grid */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
        {periods.map((period, idx) => {
          const isSelected = activeInspection.name === period.name && activeInspection.startTime.getTime() === period.startTime.getTime();
          const isCurrent = period.isCurrent;
          const isAuspicious =
            period.quality === 'Amrit' ||
            period.quality === 'Shubh' ||
            period.quality === 'Labh';

          return (
            <div
              key={`${period.name}-${idx}`}
              onClick={() => setSelectedPeriod(period)}
              className={`group relative flex flex-col justify-between rounded-2xl border p-3 transition-all duration-200 cursor-pointer ${
                isCurrent
                  ? 'border-amber-500 bg-amber-500/10 shadow-md ring-2 ring-amber-400/40 dark:bg-amber-400/10'
                  : isSelected
                  ? 'border-zinc-400 bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-800'
                  : 'border-zinc-200 bg-zinc-50 hover:border-zinc-300 hover:bg-white dark:border-zinc-800 dark:bg-zinc-950/50 dark:hover:bg-zinc-800'
              }`}
            >
              {isCurrent && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-2 py-0.2 text-[9px] font-bold text-white uppercase shadow-sm">
                    <span className="h-1.5 w-1.5 animate-ping rounded-full bg-white" />
                    {language === 'hi' ? 'सक्रिय' : 'Now'}
                  </span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-zinc-500">#{idx + 1}</span>
                  <span
                    className={`rounded px-1.5 py-0.2 text-[9px] font-bold ${
                      isAuspicious
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : period.quality === 'Char'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300'
                    }`}
                  >
                    {language === 'hi' ? (QUAL_HI[period.quality] || period.quality) : period.quality}
                  </span>
                </div>

                <h3 className="mt-1.5 font-serif text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  {language === 'hi' ? period.nameDevanagari : period.name}
                </h3>
              </div>

              <div className="mt-3 border-t border-zinc-200/60 pt-2 text-[10px] dark:border-zinc-800">
                <p className="font-mono font-medium text-zinc-700 dark:text-zinc-300">
                  {formatHourMinute(period.startTime, location.timezone)} - {formatHourMinute(period.endTime, location.timezone)}
                </p>
                <p className="mt-0.5 text-zinc-500 dark:text-zinc-400">
                  {language === 'hi' ? 'स्वामी:' : 'Lord:'}{' '}
                  <span className="font-semibold text-zinc-700 dark:text-zinc-200">
                    {language === 'hi' ? (RULER_HI[period.ruler] || period.ruler) : period.ruler}
                  </span>
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Detail Inspector for the clicked/current Choghadiya */}
      <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/80 p-4 dark:border-zinc-800 dark:bg-zinc-950/60 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-2xl text-amber-600 dark:bg-amber-400/10 dark:text-amber-400">
              {activeInspection.quality === 'Amrit' || activeInspection.quality === 'Shubh' || activeInspection.quality === 'Labh' ? '✨' : '⌛'}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  {language === 'hi'
                    ? `${activeInspection.nameDevanagari} चौघड़िया`
                    : `${activeInspection.name} Choghadiya`}
                </h4>
                <span className={`rounded-full border px-2.5 py-0.5 text-xs font-bold ${explainer.badge}`}>
                  {language === 'hi'
                    ? `${QUAL_HI[activeInspection.quality] || activeInspection.quality} श्रेणी`
                    : `${activeInspection.quality} Tier`}
                </span>
                {activeInspection.isCurrent && (
                  <span className="rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-white">
                    {language === 'hi' ? 'अभी सक्रिय' : 'Active Right Now'}
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                {language === 'hi' ? (
                  <>
                    समय:{' '}
                    <strong className="font-mono text-zinc-900 dark:text-zinc-100">
                      {formatHourMinute(activeInspection.startTime, location.timezone)} से{' '}
                      {formatHourMinute(activeInspection.endTime, location.timezone)}
                    </strong>{' '}
                    • स्वामी ग्रह:{' '}
                    <strong>{RULER_HI[activeInspection.ruler] || activeInspection.ruler}</strong>
                  </>
                ) : (
                  <>
                    Timing:{' '}
                    <strong className="font-mono text-zinc-900 dark:text-zinc-100">
                      {formatHourMinute(activeInspection.startTime, location.timezone)} to{' '}
                      {formatHourMinute(activeInspection.endTime, location.timezone)}
                    </strong>{' '}
                    • Ruling Planet: <strong>{activeInspection.ruler}</strong>
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500">
              {language === 'hi'
                ? 'विवरण देखने के लिए किसी भी चौघड़िया पर क्लिक करें'
                : 'Tap any segment above to inspect'}
            </span>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 border-t border-zinc-200/60 pt-3 text-xs sm:grid-cols-2 dark:border-zinc-800">
          <div>
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">
              {language === 'hi' ? 'शास्त्र महत्व:' : 'Shastra Significance:'}
            </span>
            <p className="mt-0.5 text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {language === 'hi' ? explainer.descHi : explainer.desc}
            </p>
          </div>
          <div>
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">
              {language === 'hi' ? 'शुभ कार्य निर्देश:' : 'Recommended Activities:'}
            </span>
            <p className="mt-0.5 text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {language === 'hi' ? explainer.suitableHi : explainer.suitable}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatHourMinute(date: Date, timezone: string): string {
  try {
    return new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: timezone,
    }).format(date);
  } catch {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
