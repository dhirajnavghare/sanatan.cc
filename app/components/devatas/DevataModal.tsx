'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { DeityRecord } from '@/app/lib/devatas/types';

interface DevataModalProps {
  deity: DeityRecord | null;
  onClose: () => void;
}

export default function DevataModal({ deity, onClose }: DevataModalProps) {
  const [copiedMantraIdx, setCopiedMantraIdx] = useState<number | null>(null);

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
    if (deity) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [deity]);

  if (!deity) return null;

  const copyToClipboard = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedMantraIdx(idx);
    setTimeout(() => {
      setCopiedMantraIdx(null);
    }, 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="devata-modal-title"
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
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${deity.colorTheme.badgeBg} ${deity.colorTheme.badgeText} ${deity.colorTheme.border}`}
              >
                {deity.tradition} Tradition
              </span>
              {deity.isPanchaDeva && (
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-bold text-amber-700 dark:border-amber-400/30 dark:text-amber-300">
                  <span>✨</span>
                  <span>Pancha Deva (स्मार्त पंचायतन)</span>
                </span>
              )}
            </div>

            <h2 id="devata-modal-title" className="font-serif text-2xl font-black text-zinc-900 dark:text-zinc-50 sm:text-3xl">
              {deity.name}
            </h2>
            <div className="font-serif text-lg font-bold text-amber-700 dark:text-amber-400">
              {deity.nameDevanagari}
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              {deity.subtitle} • <span className="font-serif">{deity.subtitleDevanagari}</span>
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-zinc-200 bg-zinc-50 p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-100 cursor-pointer"
            title="Close dialog (Esc)"
          >
            <span className="sr-only">Close</span>
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="mt-6 space-y-6 text-xs text-zinc-700 dark:text-zinc-300">
          {/* Key Attributes Grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {deity.vahana && (
              <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/60 p-3 dark:border-zinc-800 dark:bg-zinc-950/60">
                <span className="text-[10px] uppercase font-bold text-zinc-400">Vahana (Mount)</span>
                <p className="mt-1 font-semibold text-zinc-900 dark:text-zinc-100">{deity.vahana}</p>
              </div>
            )}
            {deity.consort && (
              <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/60 p-3 dark:border-zinc-800 dark:bg-zinc-950/60">
                <span className="text-[10px] uppercase font-bold text-zinc-400">Consort (Shakti)</span>
                <p className="mt-1 font-semibold text-zinc-900 dark:text-zinc-100">{deity.consort}</p>
              </div>
            )}
            {deity.abode && (
              <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/60 p-3 dark:border-zinc-800 dark:bg-zinc-950/60">
                <span className="text-[10px] uppercase font-bold text-zinc-400">Abode (Dhama)</span>
                <p className="mt-1 font-semibold text-zinc-900 dark:text-zinc-100">{deity.abode}</p>
              </div>
            )}
            <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/60 p-3 dark:border-zinc-800 dark:bg-zinc-950/60">
              <span className="text-[10px] uppercase font-bold text-zinc-400">Sacred Day</span>
              <p className="mt-1 font-semibold text-zinc-900 dark:text-zinc-100">{deity.sacredDay}</p>
            </div>
          </div>

          {/* Ayudhas & Weapons */}
          {deity.ayudhas && deity.ayudhas.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                Ayudhas (Sacred Implements &amp; Weapons)
              </span>
              <div className="flex flex-wrap gap-1.5">
                {deity.ayudhas.map((ayudha) => (
                  <span
                    key={ayudha}
                    className="rounded-xl border border-zinc-200 bg-white px-2.5 py-1 text-xs font-semibold text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                  >
                    ⚔️ {ayudha}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Vedic Tatva */}
          <div className="space-y-1.5 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 dark:border-amber-500/15 dark:bg-amber-950/20">
            <h3 className="font-serif text-sm font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
              <span>🕉️</span>
              <span>Vedic Philosophy &amp; Tatva (तात्विक स्वरूप)</span>
            </h3>
            <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">
              {deity.tatva}
            </p>
          </div>

          {/* Iconography & Divine Symbolism */}
          <div className="space-y-1.5 rounded-2xl border border-zinc-200 bg-zinc-50/60 p-4 dark:border-zinc-800 dark:bg-zinc-950/60">
            <h3 className="font-serif text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
              <span>👁️</span>
              <span>Iconography &amp; Divine Symbolism (रूप एवं प्रतीक)</span>
            </h3>
            <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">
              {deity.iconography}
            </p>
          </div>

          {/* Key Mantras */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
              <span>📜</span>
              <span>Sacred Sanskrit Mantras (महामन्त्र एवं स्तोत्र)</span>
            </h3>
            <div className="space-y-3">
              {deity.keyMantras.map((mantra, idx) => (
                <div
                  key={mantra.title}
                  className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className="flex items-center justify-between gap-2 border-b border-zinc-100 pb-2 dark:border-zinc-800">
                    <span className="font-serif font-bold text-amber-800 dark:text-amber-300">
                      {mantra.title}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(
                          `${mantra.devanagari}\n${mantra.transliteration}\nMeaning: ${mantra.meaning}`,
                          idx
                        )
                      }
                      className="rounded-lg border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[10px] font-semibold text-zinc-600 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 cursor-pointer"
                    >
                      {copiedMantraIdx === idx ? '✓ Copied!' : '📋 Copy'}
                    </button>
                  </div>
                  <div className="mt-3 font-serif text-sm font-semibold leading-relaxed text-zinc-900 dark:text-zinc-100">
                    {mantra.devanagari}
                  </div>
                  <div className="mt-1 font-mono text-[11px] italic text-zinc-500 dark:text-zinc-400">
                    {mantra.transliteration}
                  </div>
                  <div className="mt-2 text-[11px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                    <strong className="text-zinc-700 dark:text-zinc-300">Meaning:</strong> {mantra.meaning}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Major Temples & Pilgrimage Sanctuaries */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
              <span>🏛️</span>
              <span>Major Historic Temples &amp; Sanctuaries (प्रमुख तीर्थ स्थल)</span>
            </h3>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {deity.majorTemples.map((temple) => (
                <div
                  key={temple.name}
                  className="rounded-2xl border border-zinc-200/90 bg-zinc-50/70 p-3 dark:border-zinc-800 dark:bg-zinc-950/70"
                >
                  <div className="font-semibold text-zinc-900 dark:text-zinc-100">{temple.name}</div>
                  <div className="text-[11px] text-amber-700 dark:text-amber-400">📍 {temple.location}</div>
                  <div className="mt-1 text-[11px] text-zinc-600 dark:text-zinc-400">{temple.significance}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Traditional Offerings */}
          {deity.traditionalOfferings && deity.traditionalOfferings.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                Traditional Offerings (नैवेद्य एवं पूजन सामग्री)
              </span>
              <div className="flex flex-wrap gap-1.5">
                {deity.traditionalOfferings.map((offering) => (
                  <span
                    key={offering}
                    className="rounded-xl border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-800 dark:text-amber-300"
                  >
                    🌺 {offering}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Deep links to Panchang & Festivals */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-100 pt-5 dark:border-zinc-800/80">
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/festivals?q=${encodeURIComponent(deity.name.split('/')[0].trim())}`}
                className="inline-flex items-center gap-1.5 rounded-xl border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 text-xs font-bold text-orange-800 transition hover:bg-orange-500/20 dark:text-orange-300"
              >
                <span>🪔 View Festivals &amp; Vrats</span>
                <span>&rarr;</span>
              </Link>
              <Link
                href="/panchang"
                className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-zinc-100 px-3 py-1.5 text-xs font-bold text-zinc-700 transition hover:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              >
                <span>🗓 Check Today&apos;s Tithi in Panchang</span>
                <span>&rarr;</span>
              </Link>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-zinc-900 px-4 py-1.5 text-xs font-bold text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
