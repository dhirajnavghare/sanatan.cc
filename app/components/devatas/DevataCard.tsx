'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DeityRecord } from '@/app/lib/devatas/types';
import { useLanguage } from '@/app/lib/i18n/LanguageContext';
import { cleanFestivalName } from '@/app/lib/i18n/formatters';

interface DevataCardProps {
  deity: DeityRecord;
  onOpenModal: (deity: DeityRecord) => void;
}

const TRADITION_HI: Record<string, string> = {
  Shaiva: 'शैव',
  Vaishnava: 'वैष्णव',
  Shakta: 'शाक्त',
  Ganapatya: 'गाणपत्य',
  Saura: 'सौर',
  Kaumara: 'कौमार',
};

export default function DevataCard({ deity, onOpenModal }: DevataCardProps) {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const [copiedMantra, setCopiedMantra] = useState(false);
  const primaryMantra = deity.keyMantras[0];

  const handleCopyMantra = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!primaryMantra) return;
    navigator.clipboard.writeText(
      `${primaryMantra.devanagari}\n${primaryMantra.transliteration}\nMeaning: ${primaryMantra.meaning}`
    );
    setCopiedMantra(true);
    setTimeout(() => setCopiedMantra(false), 2000);
  };

  return (
    <div
      onClick={() => onOpenModal(deity)}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200/90 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-500/40 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-amber-500/30 sm:p-6 cursor-pointer"
    >
      {/* Ambient background glow matching deity color theme */}
      <div
        className={`pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-gradient-to-br ${deity.colorTheme.accentGlow} opacity-10 blur-2xl transition-opacity group-hover:opacity-20`}
      />

      <div className="space-y-4">
        {/* Top Badges Row */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${deity.colorTheme.badgeBg} ${deity.colorTheme.badgeText} ${deity.colorTheme.border}`}
            >
              {isHi ? (TRADITION_HI[deity.tradition] || deity.tradition) : deity.tradition}
            </span>
            {deity.isPanchaDeva && (
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:border-amber-400/30 dark:text-amber-300">
                <span>✨</span>
                <span>{isHi ? 'पञ्च देव' : 'Pancha Deva'}</span>
              </span>
            )}
          </div>

          <span className="text-[11px] font-medium text-zinc-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            {isHi ? 'सम्पूर्ण दर्शन →' : 'Tap for full lore →'}
          </span>
        </div>

        {/* Deity Title */}
        <div>
          <h3 className="font-serif text-xl font-bold text-zinc-900 group-hover:text-amber-600 dark:text-zinc-50 dark:group-hover:text-amber-400 transition-colors sm:text-2xl">
            {isHi ? deity.nameDevanagari : deity.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs text-zinc-600 dark:text-zinc-400">
            {isHi ? (deity.subtitleDevanagari || deity.subtitle) : deity.subtitle}
          </p>
        </div>

        {/* Quick Highlights (Vahana, Sacred Day, Sacred Tithi) */}
        <div className="grid grid-cols-2 gap-2 rounded-2xl border border-zinc-100 bg-zinc-50/60 p-3 text-[11px] dark:border-zinc-800/60 dark:bg-zinc-950/50">
          {deity.vahana && (
            <div>
              <span className="text-zinc-400">{isHi ? 'वाहन:' : 'Vahana:'}</span>{' '}
              <strong className="text-zinc-800 dark:text-zinc-200 font-semibold">
                {cleanVahana(deity.vahana, isHi)}
              </strong>
            </div>
          )}
          <div>
            <span className="text-zinc-400">{isHi ? 'प्रिय वार:' : 'Sacred Day:'}</span>{' '}
            <strong className="text-zinc-800 dark:text-zinc-200 font-semibold">
              {cleanSacredDay(deity.sacredDay, isHi)}
            </strong>
          </div>
          <div className="col-span-2">
            <span className="text-zinc-400">{isHi ? 'प्रिय तिथि:' : 'Sacred Tithi:'}</span>{' '}
            <span className="text-zinc-700 dark:text-zinc-300 font-medium">
              {isHi
                ? deity.sacredTithi
                    .replace(/Chaturdashi/g, 'चतुर्दशी')
                    .replace(/Pradosha/g, 'प्रदोष')
                    .replace(/Ekadashi/g, 'एकादशी')
                    .replace(/Purnima/g, 'पूर्णिमा')
                    .replace(/Amavasya/g, 'अमावस्या')
                    .replace(/Ashtami/g, 'अष्टमी')
                    .replace(/Navami/g, 'नवमी')
                    .replace(/Chaturthi/g, 'चतुर्थी')
                    .replace(/Panchami/g, 'पंचमी')
                    .replace(/Shashti/g, 'षष्ठी')
                    .replace(/Saptami/g, 'सप्तमी')
                    .replace(/Dashami/g, 'दशमी')
                    .replace(/Trayodashi/g, 'त्रयोदशी')
                    .replace(/[()]/g, '')
                    .replace(/\s+/g, ' ')
                    .trim()
                : deity.sacredTithi.split('(')[0].trim()}
            </span>
          </div>
        </div>

        {/* Primary Mantra Preview */}
        {primaryMantra && (
          <div className="rounded-2xl border border-amber-500/15 bg-amber-500/5 p-3.5 dark:border-amber-500/10 dark:bg-amber-950/20">
            <div className="flex items-center justify-between gap-1 pb-1 text-[11px] font-semibold text-amber-900 dark:text-amber-300">
              <span className="truncate">📜 {primaryMantra.title}</span>
              <button
                type="button"
                onClick={handleCopyMantra}
                className="shrink-0 rounded-md border border-amber-500/20 bg-white/70 px-1.5 py-0.5 text-[10px] text-zinc-700 transition hover:bg-white dark:border-amber-400/20 dark:bg-zinc-800/70 dark:text-zinc-300 cursor-pointer"
                title={isHi ? 'मन्त्र प्रतिलिपि करें' : 'Copy Sanskrit mantra'}
              >
                {copiedMantra
                  ? (isHi ? '✓ प्रतिलिपि' : '✓ Copied')
                  : (isHi ? '📋 प्रतिलिपि' : '📋 Copy')}
              </button>
            </div>
            <div className="font-serif text-xs font-bold leading-relaxed text-zinc-900 dark:text-zinc-100">
              {primaryMantra.devanagari}
            </div>
            <div className="mt-1 line-clamp-2 text-[11px] text-zinc-600 dark:text-zinc-400">
              {primaryMantra.meaning}
            </div>
          </div>
        )}

        {/* Associated Festivals Pills */}
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
            {isHi ? 'प्रमुख पर्व:' : 'Major Festivals:'}
          </span>
          <div className="flex flex-wrap gap-1">
            {deity.associatedFestivals.slice(0, 3).map((f) => (
              <span
                key={f}
                className="rounded-lg bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              >
                🪔 {cleanFestivalName(f, isHi)}
              </span>
            ))}
            {deity.associatedFestivals.length > 3 && (
              <span className="rounded-lg bg-zinc-100 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                +{deity.associatedFestivals.length - 3} {isHi ? 'अन्य' : 'more'}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Footer Buttons */}
      <div className="mt-5 flex items-center justify-between gap-2 border-t border-zinc-100 pt-4 dark:border-zinc-800">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenModal(deity);
          }}
          className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-900 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 cursor-pointer"
        >
          <span>{isHi ? 'विस्तृत दर्शन' : 'Detailed Lore'}</span>
          <span>&rarr;</span>
        </button>

        <Link
          href={`/festivals?q=${encodeURIComponent(deity.name.split('/')[0].trim())}`}
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          title={isHi ? `${deity.nameDevanagari} के पर्व देखें` : `View ${deity.name} festivals in timeline`}
        >
          <span>{isHi ? '🪔 पर्व' : '🪔 Festivals'}</span>
        </Link>
      </div>
    </div>
  );
}

function cleanVahana(vahana: string | undefined, isHi: boolean): string {
  if (!vahana) return '';
  const match = vahana.match(/\(([^)]+)\)/);
  if (isHi && match) return match[1].trim();
  if (isHi) {
    if (vahana.includes('Nandi')) return 'नन्दी';
    if (vahana.includes('Garuda')) return 'गरुड़';
    if (vahana.includes('Mooshaka') || vahana.includes('Mouse')) return 'मूषक';
    if (vahana.includes('Lion') || vahana.includes('Tiger')) return 'सिंह / व्याघ्र';
    if (vahana.includes('Swan') || vahana.includes('Hamsa')) return 'हंस';
    if (vahana.includes('Peacock')) return 'मयूर';
    if (vahana.includes('Elephant') || vahana.includes('Airavata')) return 'ऐरावत';
    if (vahana.includes('Horse')) return 'सप्त अश्व रथ';
  }
  return vahana.split('(')[0].trim();
}

function cleanSacredDay(day: string | undefined, isHi: boolean): string {
  if (!day) return '';
  if (!isHi) {
    return day.split('(')[0].trim();
  }
  return day
    .replace(/Monday/g, 'सोमवार')
    .replace(/Tuesday/g, 'मंगलवार')
    .replace(/Wednesday/g, 'बुधवार')
    .replace(/Thursday/g, 'गुरुवार')
    .replace(/Friday/g, 'शुक्रवार')
    .replace(/Saturday/g, 'शनिवार')
    .replace(/Sunday/g, 'रविवार')
    .replace(/Somavara/gi, '')
    .replace(/Guruvara/gi, '')
    .replace(/Mangalavara/gi, '')
    .replace(/Budhavara/gi, '')
    .replace(/Shukravara/gi, '')
    .replace(/Shanivara/gi, '')
    .replace(/Ravivara/gi, '')
    .replace(/Ekadashi/g, 'एकादशी')
    .replace(/Ashtami/g, 'अष्टमी')
    .replace(/Pradosha/g, 'प्रदोष')
    .replace(/[()]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

