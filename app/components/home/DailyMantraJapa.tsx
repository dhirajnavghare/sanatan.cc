'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/lib/i18n/LanguageContext';
import { playTempleBell, playShankhNaad, triggerHaptic } from '@/app/lib/services/sacredAudio';

interface SacredMantra {
  title: string;
  titleDevanagari: string;
  deity: string;
  deityDevanagari: string;
  devanagari: string;
  transliteration: string;
  meaning: string;
  meaningHindi: string;
  benefits: string;
  benefitsHindi: string;
}

const MANTRAS_COLLECTION: SacredMantra[] = [
  {
    title: 'Maha Mrityunjaya Mantra',
    titleDevanagari: 'महामृत्युंजय मन्त्र',
    deity: 'Lord Shiva',
    deityDevanagari: 'भगवान देवाधिदेव शिव',
    devanagari: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्।\nउर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात्॥',
    transliteration:
      'Om Tryambakam Yajamahe Sugandhim Pushti-Vardhanam |\nUrvarukam-Iva Bandhanan-Mrityor-Mukshiya Mamritat ||',
    meaning:
      'We worship the Three-Eyed Lord (Shiva), fragrant and nourisher of all beings. May He liberate us from death and worldly bondage, like a ripe cucumber easily detached from its vine, and grant us liberation into immortality.',
    meaningHindi:
      'हम त्रिनेत्रधारी भगवान शिव की आराधना करते हैं, जो सुगन्धित और सभी जीवों के पोषक हैं। जिस प्रकार पका हुआ खरबूजा बेल से अनायास मुक्त हो जाता है, उसी प्रकार वे हमें मृत्यु और सांसारिक बंधनों से मुक्त कर अमृतत्व प्रदान करें।',
    benefits: 'Bestows spiritual strength, long life, freedom from fear, and physical and mental healing.',
    benefitsHindi: 'आत्मिक बल, दीर्घायु, भयमुक्ति तथा शारीरिक व मानसिक आरोग्य प्रदान करता है।',
  },
  {
    title: 'Gayatri Mantra',
    titleDevanagari: 'गायत्री मन्त्र',
    deity: 'Devi Gayatri',
    deityDevanagari: 'देवी गायत्री',
    devanagari: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं\nभर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्॥',
    transliteration:
      'Om Bhur Bhuvah Svah Tat-Savitur-Varenyam |\nBhargo Devasya Dheemahi Dhiyo Yo Nah Prachodayat ||',
    meaning:
      'We meditate upon the transcendental glory of the Supreme Divine Sun (Savitr), the creator of physical, mental, and celestial spheres. May that Divine Light illuminate and awaken our intellect.',
    meaningHindi:
      'हम उस प्राणस्वरूप, दुःखनाशक, सुखस्वरूप, श्रेष्ठ, तेजस्वी, पापनाशक, देवस्वरूप परमात्मा का ध्यान करते हैं। वह परमात्मा हमारी बुद्धि को सन्मार्ग की ओर प्रेरित करे।',
    benefits: 'Awakens higher wisdom, sharpens intellect, dispels darkness, and elevates consciousness.',
    benefitsHindi: 'सद्बुद्धि, विवेक, तेजस्विता, अन्धकार निवारण और चेतना का उन्नयन करता है।',
  },
  {
    title: 'Universal Peace Prayer',
    titleDevanagari: 'शान्ति मन्त्र',
    deity: 'Brahman',
    deityDevanagari: 'परब्रह्म परमात्मा',
    devanagari: 'ॐ असतो मा सद्गमय। तमसो मा ज्योतिर्गमय।\nमृत्योर्मा अमृतं गमय। ॐ शान्तिः शान्तिः शान्तिः॥',
    transliteration:
      'Om Asato Ma Sadgamaya | Tamaso Ma Jyotirgamaya |\nMrityor-Ma Amritam Gamaya | Om Shantih Shantih Shantih ||',
    meaning:
      'Lead us from falsehood to truth. Lead us from darkness to light. Lead us from death to immortality. Om, peace, peace, peace.',
    meaningHindi:
      'हे प्रभु! हमें असत्य से सत्य की ओर ले चलें। हमें अज्ञान रूपी अंधकार से ज्ञान रूपी प्रकाश की ओर ले चलें। हमें मृत्यु से अमरता की ओर ले चलें। ॐ शान्तिः शान्तिः शान्तिः॥',
    benefits: 'Removes ignorance, clears confusion, brings mental serenity and cosmic peace.',
    benefitsHindi: 'अज्ञान निवारण, मानसिक शांति, भ्रममुक्ति और वैश्विक शांति स्थापित करता है।',
  },
];

export default function DailyMantraJapa() {
  const [mantraIndex, setMantraIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(true);
  const [copied, setCopied] = useState(false);
  const [japaCount, setJapaCount] = useState(0);
  const [completedMalas, setCompletedMalas] = useState(0);
  const { language } = useLanguage();

  const activeMantra = MANTRAS_COLLECTION[mantraIndex];

  const handleCopy = async () => {
    try {
      const title = language === 'hi' ? activeMantra.titleDevanagari : activeMantra.title;
      const meaning = language === 'hi' ? activeMantra.meaningHindi : activeMantra.meaning;
      const translit = language === 'hi' ? '' : `\n\n${activeMantra.transliteration}`;
      const text = `${title}\n\n${activeMantra.devanagari}${translit}\n\n${language === 'hi' ? 'भावार्थ:' : 'Meaning:'}\n${meaning}`;
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const handleBeadClick = () => {
    triggerHaptic('tap');
    if (japaCount + 1 >= 108) {
      setJapaCount(0);
      setCompletedMalas((prev) => prev + 1);
      playTempleBell(1.0);
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
            <span>{language === 'hi' ? 'दैनिक मन्त्र साधना एवं जप माला' : 'Daily Japa & Sacred Stotras'}</span>
          </div>
          <h2 className="mt-1 font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            {language === 'hi' ? 'पवित्र मन्त्र एवं १०८ जप माला' : 'Sacred Mantra & 108 Japa Counter'}
          </h2>
          <p className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">
            {language === 'hi'
              ? 'डिजिटल माला और दार्शनिक भावार्थ के साथ पवित्र वैदिक मन्त्रों का जप करें'
              : 'Chant divine Sanskrit mantras with interactive digital mala counting and classical philosophy'}
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
              {language === 'hi' ? `मन्त्र ${idx + 1}` : `Mantra ${idx + 1}`}
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
                {language === 'hi' ? activeMantra.deityDevanagari : activeMantra.deity}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 cursor-pointer"
              >
                <span>{copied ? '✓' : '📋'}</span>
                <span>
                  {copied
                    ? (language === 'hi' ? 'कॉपी हुआ!' : 'Copied!')
                    : (language === 'hi' ? 'मन्त्र कॉपी करें' : 'Copy Mantra')}
                </span>
              </button>
            </div>

            <h3 className="mt-4 font-serif text-xl font-bold text-zinc-900 dark:text-zinc-50">
              {language === 'hi' ? activeMantra.titleDevanagari : activeMantra.title}
            </h3>

            {/* Devanagari Script */}
            <div className="mt-4 rounded-2xl border border-amber-300/40 bg-white/80 p-5 shadow-inner dark:border-amber-800/40 dark:bg-zinc-950/60">
              <p className="font-serif text-lg font-bold leading-relaxed text-amber-950 dark:text-amber-200 sm:text-2xl whitespace-pre-line text-center">
                {activeMantra.devanagari}
              </p>
            </div>

            {/* Transliteration: Only shown in English mode */}
            {language === 'en' && (
              <p className="mt-3 font-serif text-xs italic leading-relaxed text-zinc-600 dark:text-zinc-400 whitespace-pre-line text-center">
                {activeMantra.transliteration}
              </p>
            )}

            {/* Meaning Toggle */}
            {showMeaning && (
              <div className="mt-4 rounded-xl border border-zinc-200/60 bg-white/60 p-3.5 text-xs text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-300">
                <p className="font-semibold text-amber-900 dark:text-amber-300">
                  {language === 'hi' ? 'आध्यात्मिक भावार्थ:' : 'Spiritual Meaning:'}
                </p>
                <p className="mt-1 leading-relaxed">
                  {language === 'hi' ? activeMantra.meaningHindi : activeMantra.meaning}
                </p>
                <p className="mt-2 text-[11px] text-zinc-500">
                  <strong>{language === 'hi' ? 'दिव्य फल:' : 'Sacred Benefit:'}</strong>{' '}
                  {language === 'hi' ? activeMantra.benefitsHindi : activeMantra.benefits}
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
              {showMeaning
                ? (language === 'hi' ? 'भावार्थ छिपाएं' : 'Hide Meaning')
                : (language === 'hi' ? 'आध्यात्मिक भावार्थ देखें' : 'Show Spiritual Meaning')}
            </button>

            <Link
              href="/devatas"
              className="font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
            >
              {language === 'hi' ? 'सभी देवी-देवता एवं स्तोत्र देखें →' : 'Explore All Deities & Mantras →'}
            </Link>
          </div>
        </div>

        {/* 108 Japa Bead Counter (1 Column) */}
        <div className="flex flex-col items-center justify-between rounded-2xl border border-zinc-200/80 bg-zinc-50/70 p-6 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="w-full text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              {language === 'hi' ? 'इंटरैक्टिव जप माला' : 'Interactive Japa Mala'}
            </span>
            <h4 className="mt-0.5 font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
              {language === 'hi' ? '१०८ मनका जप गणक' : '108 Bead Counter'}
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
              <span className="text-[11px] font-semibold text-zinc-400">
                {language === 'hi' ? '/ १०८ मनके' : '/ 108 Beads'}
              </span>
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
              <span>{language === 'hi' ? 'मनका गणना (+१)' : 'Count +1 Bead'}</span>
            </button>

            {completedMalas > 0 && (
              <p className="text-center text-xs font-bold text-emerald-600 dark:text-emerald-400">
                {language === 'hi'
                  ? `🎉 ${completedMalas} पूर्ण माला (१०८) सम्पन्न!`
                  : `🎉 ${completedMalas} Full ${completedMalas === 1 ? 'Mala' : 'Malas'} (108) Completed!`}
              </p>
            )}

            <div className="flex items-center justify-between gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  triggerHaptic('tap');
                  playTempleBell(1.0);
                }}
                className="inline-flex items-center gap-1 rounded-xl border border-amber-300 bg-amber-50/80 px-2.5 py-1 text-[11px] font-bold text-amber-800 transition hover:bg-amber-100 dark:border-amber-700/60 dark:bg-amber-950/40 dark:text-amber-300 cursor-pointer"
                title="Ring authentic Temple Brass Bell"
              >
                <span>🔔</span>
                <span>{language === 'hi' ? 'घंटी' : 'Bell'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  triggerHaptic('tap');
                  playShankhNaad(1.0);
                }}
                className="inline-flex items-center gap-1 rounded-xl border border-indigo-300 bg-indigo-50/80 px-2.5 py-1 text-[11px] font-bold text-indigo-800 transition hover:bg-indigo-100 dark:border-indigo-700/60 dark:bg-indigo-950/40 dark:text-indigo-300 cursor-pointer"
                title="Blow sacred Shankh Naad"
              >
                <span>🐚</span>
                <span>{language === 'hi' ? 'शंख' : 'Shankh'}</span>
              </button>

              <button
                type="button"
                onClick={handleResetJapa}
                className="text-center text-xs font-semibold text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 cursor-pointer"
              >
                {language === 'hi' ? 'रीसेट करें' : 'Reset Counter'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
