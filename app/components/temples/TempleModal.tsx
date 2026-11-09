'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { TempleRecord } from '@/app/lib/temples/types';
import { useLanguage } from '@/app/lib/i18n/LanguageContext';
import {
  cleanBilingualTitle,
  cleanFestivalName,
  cleanIndianLocation,
  cleanDarshanTimings,
  cleanDressCode,
  cleanEra,
} from '@/app/lib/i18n/formatters';

interface TempleModalProps {
  temple: TempleRecord | null;
  onClose: () => void;
}

const CIRCUIT_HI: Record<string, string> = {
  '12 Jyotirlingas': 'द्वादश ज्योतिर्लिंग',
  'Char Dham': 'चार धाम',
  'Shakti Peethas': 'शक्तिपीठ',
  'Pancha Bhoota': 'पंचभूत स्थल',
  'Global Heritage': 'वैश्विक तीर्थ',
};

const TEMPLE_TRADITION_HI: Record<string, string> = {
  Shaiva: 'शैव',
  Vaishnava: 'वैष्णव',
  Shakta: 'शाक्त',
  Smarta: 'स्मार्त',
  Kaumara: 'कौमार',
};

export default function TempleModal({ temple, onClose }: TempleModalProps) {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lock body scroll when modal open
  useEffect(() => {
    if (temple) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [temple]);

  if (!temple) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="temple-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog Card */}
      <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl transition-all dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-4 border-b border-zinc-100 pb-5 dark:border-zinc-800/80">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${temple.colorTheme.badgeBg} ${temple.colorTheme.badgeText} ${temple.colorTheme.border}`}
              >
                {isHi ? (CIRCUIT_HI[temple.circuit] || temple.circuit) : temple.circuit}
              </span>
              <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-[11px] font-bold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                {isHi ? (TEMPLE_TRADITION_HI[temple.tradition] || temple.tradition) : temple.tradition}
              </span>
              <span className="text-xs text-zinc-400">
                📍 {isHi ? cleanIndianLocation(`${temple.location.city}, ${temple.location.state}`, true) : `${temple.location.city}, ${temple.location.state}`}
              </span>
            </div>

            <h2 id="temple-modal-title" className="font-serif text-2xl font-black text-zinc-900 dark:text-zinc-50 sm:text-3xl">
              {isHi ? temple.nameDevanagari : temple.name}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-zinc-200 bg-zinc-50 p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-100 cursor-pointer"
            title={isHi ? 'संवाद बन्द करें (Esc)' : 'Close dialog (Esc)'}
          >
            <span className="sr-only">Close</span>
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="mt-6 space-y-6 text-xs text-zinc-700 dark:text-zinc-300">
          {/* Key Attributes Grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/60 p-3 dark:border-zinc-800 dark:bg-zinc-950/60">
              <span className="text-[10px] uppercase font-bold text-zinc-400">
                {isHi ? 'प्रधान आराध्य' : 'Primary Deity'}
              </span>
              <p className="mt-1 font-semibold text-zinc-900 dark:text-zinc-100">
                {isHi
                  ? (temple.primaryDeityDevanagari || temple.primaryDeity)
                  : temple.primaryDeity.replace(/\s*\([^)]*\)/g, '').trim()}
              </p>
            </div>
            {temple.sacredRiver && (
              <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/60 p-3 dark:border-zinc-800 dark:bg-zinc-950/60">
                <span className="text-[10px] uppercase font-bold text-zinc-400">
                  {isHi ? 'पवित्र नदी / संगम' : 'Sacred River / Sangam'}
                </span>
                <p className="mt-1 font-semibold text-zinc-900 dark:text-zinc-100">
                  {cleanBilingualTitle(temple.sacredRiver, isHi)}
                </p>
              </div>
            )}
            <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/60 p-3 dark:border-zinc-800 dark:bg-zinc-950/60">
              <span className="text-[10px] uppercase font-bold text-zinc-400">
                {isHi ? 'स्थापत्य शैली' : 'Architectural Style'}
              </span>
              <p className="mt-1 font-semibold text-zinc-900 dark:text-zinc-100">
                {cleanArchitecturalStyle(temple.architecturalStyle, isHi)}
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/60 p-3 dark:border-zinc-800 dark:bg-zinc-950/60">
              <span className="text-[10px] uppercase font-bold text-zinc-400">
                {isHi ? 'समुद्र तल से ऊँचाई' : 'Elevation'}
              </span>
              <p className="mt-1 font-semibold text-zinc-900 dark:text-zinc-100">
                {temple.location.elevationMeters
                  ? `${temple.location.elevationMeters} ${isHi ? 'मीटर' : 'm'}`
                  : (isHi ? 'समतल भूमि' : 'Plains')}
              </p>
            </div>
          </div>

          {/* Darshan Timings & Dress Code */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 dark:border-amber-500/15 dark:bg-amber-950/20">
              <span className="text-[10px] uppercase font-bold text-amber-800 dark:text-amber-300">
                {isHi ? '⏰ दर्शन एवं आरती समय' : '⏰ Darshan & Aarti Timings'}
              </span>
              <p className="mt-1.5 leading-relaxed font-medium text-zinc-800 dark:text-zinc-200">
                {cleanDarshanTimings(temple.darshanTimings, isHi)}
              </p>
            </div>
            {temple.dressCode && (
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50/60 p-4 dark:border-zinc-800 dark:bg-zinc-950/60">
                <span className="text-[10px] uppercase font-bold text-zinc-400">
                  {isHi ? '👔 पारम्परिक वेषभूषा एवं नियम' : '👔 Traditional Dress Code & Conduct'}
                </span>
                <p className="mt-1.5 leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {cleanDressCode(temple.dressCode, isHi)}
                </p>
              </div>
            )}
          </div>

          {/* Spiritual Significance */}
          <div className="space-y-1.5 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 dark:border-amber-500/15 dark:bg-amber-950/20">
            <h3 className="font-serif text-sm font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
              <span>🛕</span>
              <span>{isHi ? 'तीर्थ महिमा एवं आध्यात्मिक महत्त्व' : 'Spiritual Significance'}</span>
            </h3>
            <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">
              {temple.significance}
            </p>
          </div>

          {/* Puranic Lore */}
          <div className="space-y-1.5 rounded-2xl border border-zinc-200 bg-zinc-50/60 p-4 dark:border-zinc-800 dark:bg-zinc-950/60">
            <h3 className="font-serif text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
              <span>📜</span>
              <span>{isHi ? 'पौराणिक कथा एवं इतिहास' : 'Puranic Lore & Ancient History'}</span>
            </h3>
            <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">
              {temple.puranicLore}
            </p>
            <div className="pt-2 text-[11px] text-zinc-500 dark:text-zinc-400">
              <strong>{isHi ? 'ऐतिहासिक काल:' : 'Historical Era:'}</strong> {cleanEra(temple.era, isHi)}
            </div>
          </div>

          {/* Major Festivals */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
              {isHi ? 'मनाए जाने वाले प्रमुख उत्सव' : 'Major Festivals Celebrated'}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {temple.majorFestivals.map((festival) => (
                <Link
                  key={festival}
                  href={`/festivals?q=${encodeURIComponent(festival.split('(')[0].trim())}`}
                  className="rounded-xl border border-orange-500/20 bg-orange-500/10 px-2.5 py-1 text-xs font-semibold text-orange-800 transition hover:bg-orange-500/20 dark:text-orange-300"
                >
                  🪔 {cleanFestivalName(festival, isHi)} &rarr;
                </Link>
              ))}
            </div>
          </div>

          {/* Deep links & Map action */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-100 pt-5 dark:border-zinc-800/80">
            <div className="flex flex-wrap gap-2">
              {/* Presiding Deity Link */}
              <Link
                href={`/devatas?id=${encodeURIComponent(temple.deityId)}`}
                className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-bold text-amber-800 transition hover:bg-amber-500/20 dark:text-amber-300"
              >
                <span>
                  {isHi ? '🕉️ प्रधान आराध्य दर्शन' : `🕉️ Presiding Deity Lore (${temple.primaryDeity.split('(')[0].trim()})`}
                </span>
                <span>&rarr;</span>
              </Link>

              {/* Real-time Panchang at Temple Coordinates */}
              <Link
                href={`/panchang?lat=${temple.location.latitude}&lon=${temple.location.longitude}`}
                className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-zinc-100 px-3 py-1.5 text-xs font-bold text-zinc-700 transition hover:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              >
                <span>
                  {isHi ? '🗓 तीर्थ निर्देशांक पर पञ्चाङ्ग गणना' : '🗓 Calculate Panchang at Temple Coordinates'}
                </span>
                <span>&rarr;</span>
              </Link>

              {/* Geographic Navigation Map Link */}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${temple.location.latitude},${temple.location.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              >
                <span>{isHi ? '📍 मानचित्र देखें' : '📍 Open Map'}</span>
              </a>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-zinc-900 px-4 py-1.5 text-xs font-bold text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 cursor-pointer"
            >
              {isHi ? 'बन्द करें' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function cleanArchitecturalStyle(style: string | undefined, isHi: boolean): string {
  if (!style) return '';
  if (!isHi) return style.replace(/\s*\([^)]*\)/g, '').trim();
  const s = style.toLowerCase();
  if (s.includes('nagara')) return 'नागर स्थापत्य शैली';
  if (s.includes('dravidian')) return 'द्रविड़ स्थापत्य शैली';
  if (s.includes('vesara')) return 'वेसर स्थापत्य शैली';
  if (s.includes('kalinga')) return 'कलिंग स्थापत्य शैली';
  if (s.includes('hemadpanthi')) return 'हेमाडपंथी स्थापत्य';
  if (s.includes('bhumija') || s.includes('maratha')) return 'भूमिज एवं मराठा स्थापत्य शैली';
  if (s.includes('chalukya') || s.includes('solanki')) return 'चालुक्य / सोलंकी स्थापत्य';
  if (s.includes('katyuri') || s.includes('himalayan')) return 'पारम्परिक हिमालयी कत्यूरी शैली';
  if (s.includes('pagoda')) return 'नेपाली पैगोडा शैली';
  if (s.includes('cave')) return 'प्राकृतिक गुफा तीर्थ';
  if (s.includes('bengal') || s.includes('chala')) return 'बंगाल चाला स्थापत्य शैली';
  return style.replace(/\s*\([^)]*\)/g, '').trim();
}

