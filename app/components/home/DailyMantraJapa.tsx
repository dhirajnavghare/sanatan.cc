'use client';

import { useState } from 'react';
import Link from 'next/link';

interface SacredMantra {
  title: string;
  deity: string;
  devanagari: string;
  transliteration: string;
  meaning: string;
  benefits: string;
}

const MANTRAS_COLLECTION: SacredMantra[] = [
  {
    title: 'महामृत्युंजय मन्त्र (Maha Mrityunjaya Mantra)',
    deity: 'Lord Shiva (Mahadeva)',
    devanagari: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्।\nउर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात्॥',
    transliteration:
      'Om Tryambakam Yajamahe Sugandhim Pushti-Vardhanam |\nUrvarukam-Iva Bandhanan-Mrityor-Mukshiya Mamritat ||',
    meaning:
      'We worship the Three-Eyed Lord (Shiva), fragrant and nourisher of all beings. May He liberate us from death and worldly bondage, like a ripe cucumber easily detached from its vine, and grant us liberation into immortality.',
    benefits: 'Bestows spiritual strength, long life, freedom from fear, and physical and mental healing.',
  },
  {
    title: 'गायत्री मन्त्र (Gayatri Mantra)',
    deity: 'Devi Gayatri / Savitr (Solar Divine)',
    devanagari: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं\nभर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्॥',
    transliteration:
      'Om Bhur Bhuvah Svah Tat-Savitur-Varenyam |\nBhargo Devasya Dheemahi Dhiyo Yo Nah Prachodayat ||',
    meaning:
      'We meditate upon the transcendental glory of the Supreme Divine Sun (Savitr), the creator of physical, mental, and celestial spheres. May that Divine Light illuminate and awaken our intellect.',
    benefits: 'Awakens higher wisdom, sharpens intellect, dispels darkness, and elevates consciousness.',
  },
  {
    title: 'शान्ति मन्त्र (Universal Peace Prayer)',
    deity: 'Brahman (Supreme Universal Reality)',
    devanagari: 'ॐ असतो मा सद्गमय। तमसो मा ज्योतिर्गमय।\nमृत्योर्मा अमृतं गमय। ॐ शान्तिः शान्तिः शान्तिः॥',
    transliteration:
      'Om Asato Ma Sadgamaya | Tamaso Ma Jyotirgamaya |\nMrityor-Ma Amritam Gamaya | Om Shantih Shantih Shantih ||',
    meaning:
      'Lead us from falsehood to truth. Lead us from darkness to light. Lead us from death to immortality. Om, peace, peace, peace.',
    benefits: 'Removes ignorance, clears confusion, brings mental serenity and cosmic peace.',
  },
];

export default function DailyMantraJapa() {
  const [mantraIndex, setMantraIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(true);
  const [copied, setCopied] = useState(false);
  const [japaCount, setJapaCount] = useState(0);
  const [completedMalas, setCompletedMalas] = useState(0);

  const activeMantra = MANTRAS_COLLECTION[mantraIndex];

  const handleCopy = async () => {
    try {
      const text = `${activeMantra.title}\n\n${activeMantra.devanagari}\n\n${activeMantra.transliteration}\n\nMeaning:\n${activeMantra.meaning}`;
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const handleBeadClick = () => {
    if (japaCount + 1 >= 108) {
      setJapaCount(0);
      setCompletedMalas((prev) => prev + 1);
    } else {
      setJapaCount((prev) => prev + 1);
    }
  };

  const handleResetJapa = () => {
    setJapaCount(0);
    setCompletedMalas(0);
  };

  const percentProgress = ((japaCount / 108) * 100).toFixed(0);

  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-zinc-200/90 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            <span>📿</span>
            <span>दैनिक मन्त्र साधना एवं जप माला • Daily Japa &amp; Sacred Stotras</span>
          </div>
          <h2 className="mt-1 font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Sacred Mantra &amp; 108 Japa Counter
          </h2>
          <p className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">
            Chant divine Sanskrit mantras with interactive digital mala counting and classical philosophy
          </p>
        </div>

        {/* Next Mantra Switcher */}
        <div className="flex items-center gap-2">
          {MANTRAS_COLLECTION.map((m, idx) => (
            <button
              key={m.title}
              type="button"
              onClick={() => {
                setMantraIndex(idx);
                setJapaCount(0);
              }}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                mantraIndex === idx
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'border border-zinc-200 bg-zinc-50 text-zinc-600 hover:bg-white dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
              }`}
            >
              Mantra {idx + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Mantra Card (2 Columns) */}
        <div className="relative flex flex-col justify-between rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50/50 via-white to-amber-50/30 p-6 dark:border-amber-900/40 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950 lg:col-span-2">
          <div>
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-amber-500/15 px-3 py-1 text-xs font-bold text-amber-900 dark:text-amber-300">
                {activeMantra.deity}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 cursor-pointer"
              >
                <span>{copied ? '✓' : '📋'}</span>
                <span>{copied ? 'Copied!' : 'Copy Mantra'}</span>
              </button>
            </div>

            <h3 className="mt-4 font-serif text-xl font-bold text-zinc-900 dark:text-zinc-50">
              {activeMantra.title}
            </h3>

            {/* Devanagari Script */}
            <div className="mt-4 rounded-2xl border border-amber-300/40 bg-white/80 p-5 shadow-inner dark:border-amber-800/40 dark:bg-zinc-950/60">
              <p className="font-serif text-lg font-bold leading-relaxed text-amber-950 dark:text-amber-200 sm:text-2xl whitespace-pre-line text-center">
                {activeMantra.devanagari}
              </p>
            </div>

            {/* Transliteration */}
            <p className="mt-3 font-serif text-xs italic leading-relaxed text-zinc-600 dark:text-zinc-400 whitespace-pre-line text-center">
              {activeMantra.transliteration}
            </p>

            {/* Meaning Toggle */}
            {showMeaning && (
              <div className="mt-4 rounded-xl border border-zinc-200/60 bg-white/60 p-3.5 text-xs text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-300">
                <p className="font-semibold text-amber-900 dark:text-amber-300">Spiritual Meaning:</p>
                <p className="mt-1 leading-relaxed">{activeMantra.meaning}</p>
                <p className="mt-2 text-[11px] text-zinc-500">
                  <strong>Sacred Benefit:</strong> {activeMantra.benefits}
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-amber-200/60 pt-3 text-xs dark:border-amber-900/40">
            <button
              type="button"
              onClick={() => setShowMeaning((prev) => !prev)}
              className="font-semibold text-amber-700 hover:text-amber-800 dark:text-amber-400 cursor-pointer"
            >
              {showMeaning ? 'Hide Meaning' : 'Show Spiritual Meaning'}
            </button>

            <Link
              href="/devatas"
              className="font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
            >
              Explore All Deities &amp; Mantras &rarr;
            </Link>
          </div>
        </div>

        {/* 108 Japa Bead Counter (1 Column) */}
        <div className="flex flex-col items-center justify-between rounded-2xl border border-zinc-200/80 bg-zinc-50/70 p-6 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="w-full text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              Interactive Japa Mala
            </span>
            <h4 className="mt-0.5 font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
              108 Bead Counter
            </h4>
          </div>

          {/* Circular Progress & Bead */}
          <div className="relative my-4 flex h-40 w-40 items-center justify-center">
            {/* SVG Ring */}
            <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                className="stroke-zinc-200 dark:stroke-zinc-800"
                strokeWidth="7"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                className="stroke-amber-500 transition-all duration-200 ease-out"
                strokeWidth="7"
                strokeDasharray="264"
                strokeDashoffset={264 - (264 * japaCount) / 108}
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            {/* Center Content */}
            <div className="absolute flex flex-col items-center justify-center">
              <span className="font-mono text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
                {japaCount}
              </span>
              <span className="text-[11px] font-semibold text-zinc-400">/ 108 Beads</span>
              <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">
                {percentProgress}%
              </span>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex w-full flex-col gap-2">
            <button
              type="button"
              onClick={handleBeadClick}
              className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 py-3.5 text-sm font-bold text-white shadow-lg shadow-amber-500/30 transition-all duration-150 hover:from-amber-600 hover:to-amber-800 active:scale-95 cursor-pointer"
            >
              <span className="text-lg transition-transform group-hover:scale-125">📿</span>
              <span>Count +1 Bead</span>
            </button>

            {completedMalas > 0 && (
              <p className="text-center text-xs font-bold text-emerald-600 dark:text-emerald-400">
                🎉 {completedMalas} Full {completedMalas === 1 ? 'Mala' : 'Malas'} (108) Completed!
              </p>
            )}

            <button
              type="button"
              onClick={handleResetJapa}
              className="text-center text-xs font-semibold text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
            >
              Reset Counter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
