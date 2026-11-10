'use client';

import { useState, useId } from 'react';
import { PrayerRecord, PrayerVerse } from '@/app/lib/prayers/types';
import { useLanguage } from '@/app/lib/i18n/LanguageContext';

interface PrayerReaderModalProps {
  prayer: PrayerRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

type ThemeMode = 'amber' | 'night' | 'parchment';
type FontSize = 'sm' | 'md' | 'lg' | 'xl';
type ViewMode = 'continuous' | 'stepper';

export default function PrayerReaderModal({
  prayer,
  isOpen,
  onClose,
}: PrayerReaderModalProps) {
  const modalTitleId = useId();
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const [theme, setTheme] = useState<ThemeMode>('amber');
  const [fontSize, setFontSize] = useState<FontSize>('md');
  const [viewMode, setViewMode] = useState<ViewMode>('continuous');
  const [activeVerseIndex, setActiveVerseIndex] = useState<number>(0);

  const [showMeaning, setShowMeaning] = useState<boolean>(true);
  const [showTransliteration, setShowTransliteration] = useState<boolean>(true);

  // Repetition Japa / Sankalpa Counter
  const [targetCount, setTargetCount] = useState<number>(prayer?.recommendedCounts[0] || 1);
  const [currentCount, setCurrentCount] = useState<number>(0);
  const [copiedVerse, setCopiedVerse] = useState<number | null>(null);

  if (!isOpen || !prayer) return null;

  // Theme styling definitions
  const themeStyles: Record<ThemeMode, { bg: string; text: string; cardBg: string; border: string; accent: string }> = {
    amber: {
      bg: 'bg-[#fffaf0] dark:bg-[#14120f]',
      text: 'text-zinc-900 dark:text-amber-100',
      cardBg: 'bg-white/90 dark:bg-[#1d1914]',
      border: 'border-amber-200/70 dark:border-amber-900/40',
      accent: 'text-amber-700 dark:text-amber-400',
    },
    night: {
      bg: 'bg-[#0a0c16]',
      text: 'text-amber-100',
      cardBg: 'bg-[#121629]',
      border: 'border-indigo-900/50',
      accent: 'text-amber-400',
    },
    parchment: {
      bg: 'bg-[#fbf7ed]',
      text: 'text-[#3d2f1d]',
      cardBg: 'bg-[#f4eedb]',
      border: 'border-[#dfd3be]',
      accent: 'text-[#8a5d2b]',
    },
  };

  // Font size mapping for verse text
  const fontSizeClass = {
    sm: 'text-base sm:text-lg leading-relaxed',
    md: 'text-lg sm:text-xl leading-relaxed sm:leading-loose',
    lg: 'text-xl sm:text-2xl leading-relaxed sm:leading-loose',
    xl: 'text-2xl sm:text-3xl leading-loose',
  }[fontSize];

  const currentTheme = themeStyles[theme];

  const handleIncrementCounter = () => {
    setCurrentCount((prev) => prev + 1);
  };

  const handleResetCounter = () => {
    setCurrentCount(0);
  };

  const handleCopyVerse = async (verse: PrayerVerse) => {
    const textToCopy = isHi
      ? `${verse.sanskrit}\n\nभावार्थ:\n${verse.hindiMeaning}`
      : `${verse.transliteration}\n\nMeaning:\n${verse.englishMeaning}`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedVerse(verse.verseNumber);
      setTimeout(() => setCopiedVerse(null), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={modalTitleId}
    >
      <div
        className={`relative flex flex-col w-full max-w-3xl h-[92vh] max-h-[900px] overflow-hidden rounded-3xl shadow-2xl transition-colors duration-300 ${currentTheme.bg} ${currentTheme.text} border ${currentTheme.border}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className={`flex flex-col gap-3 border-b p-4 sm:p-5 backdrop-blur-md ${currentTheme.border} ${currentTheme.cardBg}`}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">🕉️</span>
                <h2 id={modalTitleId} className="font-serif text-lg sm:text-xl font-bold">
                  {isHi ? prayer.titleDevanagari : prayer.title}
                </h2>
              </div>
              <p className={`text-xs ${currentTheme.accent}`}>
                {isHi ? prayer.authorDevanagari : prayer.author} • {prayer.totalVerses} {isHi ? 'पद' : 'Verses'}
              </p>
            </div>

            <button
              onClick={onClose}
              type="button"
              className="rounded-full p-2 text-zinc-400 hover:bg-zinc-200/50 hover:text-zinc-700 dark:hover:bg-zinc-800 transition"
              aria-label={isHi ? 'बन्द करें' : 'Close reader'}
            >
              ✕
            </button>
          </div>

          {/* Reader Preference Controls */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-zinc-200/40 dark:border-zinc-800 text-xs">
            {/* Font Size & Atmosphere */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] opacity-75">{isHi ? 'अक्षर:' : 'Size:'}</span>
              {(['sm', 'md', 'lg', 'xl'] as FontSize[]).map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setFontSize(size)}
                  className={`rounded-lg px-2 py-0.5 font-bold transition ${
                    fontSize === size
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-zinc-200/60 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
                  }`}
                >
                  {size === 'sm' ? 'A' : size === 'md' ? 'A+' : size === 'lg' ? 'A++' : 'A+++'}
                </button>
              ))}

              <div className="h-4 w-px bg-zinc-300 dark:bg-zinc-700 mx-1" />

              <span className="text-[11px] opacity-75">{isHi ? 'वातावरण:' : 'Mood:'}</span>
              <button
                type="button"
                onClick={() => setTheme('amber')}
                className={`rounded-lg px-2 py-0.5 font-bold transition ${
                  theme === 'amber' ? 'bg-amber-500 text-white' : 'bg-amber-100 text-amber-900 dark:bg-zinc-800 dark:text-zinc-300'
                }`}
                title={isHi ? 'सात्त्विक उषाकाल' : 'Sattvic Amber'}
              >
                🌅
              </button>
              <button
                type="button"
                onClick={() => setTheme('night')}
                className={`rounded-lg px-2 py-0.5 font-bold transition ${
                  theme === 'night' ? 'bg-indigo-600 text-white' : 'bg-indigo-950 text-indigo-200'
                }`}
                title={isHi ? 'सन्ध्या आरती दीप' : 'Temple Night'}
              >
                🌌
              </button>
              <button
                type="button"
                onClick={() => setTheme('parchment')}
                className={`rounded-lg px-2 py-0.5 font-bold transition ${
                  theme === 'parchment' ? 'bg-[#8a5d2b] text-white' : 'bg-[#dfd3be] text-[#3d2f1d]'
                }`}
                title={isHi ? 'पाण्डुलिपि' : 'Parchment'}
              >
                📜
              </button>
            </div>

            {/* Toggle Toggles */}
            <div className="flex items-center gap-2">
              {!isHi && (
                <button
                  type="button"
                  onClick={() => setShowTransliteration(!showTransliteration)}
                  className={`rounded-lg px-2 py-1 font-semibold transition ${
                    showTransliteration
                      ? 'bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30'
                      : 'bg-zinc-200/60 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                  }`}
                >
                  Pronunciation
                </button>
              )}

              <button
                type="button"
                onClick={() => setShowMeaning(!showMeaning)}
                className={`rounded-lg px-2 py-1 font-semibold transition ${
                  showMeaning
                    ? 'bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30'
                    : 'bg-zinc-200/60 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                }`}
              >
                {isHi ? 'भावार्थ' : 'Meaning'}
              </button>

              <button
                type="button"
                onClick={() => setViewMode(viewMode === 'continuous' ? 'stepper' : 'continuous')}
                className="rounded-lg border border-zinc-200 bg-white/80 px-2 py-1 font-semibold text-zinc-700 shadow-2xs dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
              >
                {viewMode === 'continuous'
                  ? (isHi ? 'अखण्ड पाठ' : 'Book View')
                  : (isHi ? 'पद-दर-पद' : 'Focus Mode')}
              </button>
            </div>
          </div>
        </div>

        {/* Repetition Japa / Sankalpa Counter Strip */}
        <div className={`flex flex-wrap items-center justify-between gap-3 border-b px-4 py-2 text-xs backdrop-blur-xs ${currentTheme.border} ${currentTheme.cardBg}`}>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-amber-600 dark:text-amber-400">
              {isHi ? 'सङ्कल्प पाठ:' : 'Sankalpa Target:'}
            </span>
            <div className="flex gap-1">
              {prayer.recommendedCounts.map((cnt) => (
                <button
                  key={cnt}
                  type="button"
                  onClick={() => setTargetCount(cnt)}
                  className={`rounded-md px-2 py-0.5 text-xs font-bold transition ${
                    targetCount === cnt
                      ? 'bg-amber-500 text-white'
                      : 'bg-zinc-200/50 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                  }`}
                >
                  {cnt}x
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 font-bold">
              <span>{isHi ? 'सम्पादित:' : 'Completed:'}</span>
              <span className={`text-sm ${currentCount >= targetCount ? 'text-emerald-500 font-extrabold' : 'text-amber-600'}`}>
                {currentCount} / {targetCount}
              </span>
              {currentCount >= targetCount && <span className="text-emerald-500">✓</span>}
            </div>

            <button
              type="button"
              onClick={handleIncrementCounter}
              className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-3 py-1 font-bold text-white shadow-xs hover:from-amber-600 hover:to-amber-700 active:scale-95 transition"
            >
              +1 {isHi ? 'पाठ' : 'Chant'}
            </button>

            {currentCount > 0 && (
              <button
                type="button"
                onClick={handleResetCounter}
                className="text-[11px] text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                {isHi ? 'रीसेट' : 'Reset'}
              </button>
            )}
          </div>
        </div>

        {/* Main Verses Reading Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
          {viewMode === 'continuous' ? (
            /* Continuous Book View */
            <div className="space-y-6 max-w-2xl mx-auto">
              {prayer.verses.map((verse) => (
                <div
                  key={verse.verseNumber}
                  className={`rounded-2xl border p-5 sm:p-6 transition-all duration-200 ${currentTheme.cardBg} ${currentTheme.border} shadow-xs relative group`}
                >
                  {/* Verse Number & Type Pill */}
                  <div className="flex items-center justify-between mb-3 text-xs opacity-75">
                    <span className="font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                      {isHi
                        ? (verse.verseType === 'doha' ? 'दोहा' : verse.verseType === 'chaupai' ? 'चौपाई' : 'श्लोक')
                        : (verse.verseType.charAt(0).toUpperCase() + verse.verseType.slice(1))}{' '}
                      {verse.verseNumber}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleCopyVerse(verse)}
                      className="opacity-0 group-hover:opacity-100 transition rounded-md px-2 py-0.5 bg-zinc-200/60 dark:bg-zinc-800 text-[10px] font-semibold cursor-pointer"
                    >
                      {copiedVerse === verse.verseNumber
                        ? (isHi ? 'प्रतिलिपि बन गई!' : 'Copied!')
                        : (isHi ? 'प्रतिलिपि' : 'Copy')}
                    </button>
                  </div>

                  {/* Sacred Text (Strict language separation) */}
                  {isHi ? (
                    <div className={`font-serif font-semibold whitespace-pre-line ${fontSizeClass}`}>
                      {verse.sanskrit}
                    </div>
                  ) : (
                    <div>
                      {showTransliteration && (
                        <div className={`font-serif italic font-medium whitespace-pre-line ${fontSizeClass} text-amber-700 dark:text-amber-300`}>
                          {verse.transliteration}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Bhaavartha / Meaning */}
                  {showMeaning && (
                    <div className="mt-4 pt-3 border-t border-zinc-200/50 dark:border-zinc-800/80 text-xs sm:text-sm leading-relaxed opacity-90">
                      <strong className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${currentTheme.accent}`}>
                        {isHi ? 'भावार्थ:' : 'Spiritual Meaning:'}
                      </strong>
                      <p>{isHi ? verse.hindiMeaning : verse.englishMeaning}</p>
                    </div>
                  )}
                </div>
              ))}

              {/* Phala-shruti Card at the end */}
              <div className={`rounded-2xl border p-5 ${currentTheme.border} bg-amber-500/10 text-xs leading-relaxed`}>
                <strong className={`block font-serif text-sm font-bold mb-1 ${currentTheme.accent}`}>
                  {isHi ? 'फलश्रुति एवं माहात्म्य:' : 'Phala Shruti & Divine Fruits:'}
                </strong>
                <p>{isHi ? prayer.phalaShrutiDevanagari : prayer.phalaShruti}</p>
              </div>
            </div>
          ) : (
            /* Focus Stepper Mode (One verse at a time) */
            <div className="flex flex-col items-center justify-between min-h-[400px] max-w-xl mx-auto py-6">
              <div className="w-full">
                <div className="text-center mb-4 text-xs font-bold uppercase tracking-wider text-amber-600">
                  {isHi ? 'पद' : 'Verse'} {activeVerseIndex + 1} / {prayer.verses.length}
                </div>

                {prayer.verses[activeVerseIndex] && (
                  <div className={`rounded-3xl border p-8 text-center shadow-lg ${currentTheme.cardBg} ${currentTheme.border}`}>
                    {isHi ? (
                      <div className={`font-serif font-bold whitespace-pre-line ${fontSizeClass}`}>
                        {prayer.verses[activeVerseIndex].sanskrit}
                      </div>
                    ) : (
                      <div className={`font-serif italic font-semibold whitespace-pre-line ${fontSizeClass} text-amber-700 dark:text-amber-300`}>
                        {prayer.verses[activeVerseIndex].transliteration}
                      </div>
                    )}

                    {showMeaning && (
                      <div className="mt-6 pt-4 border-t border-zinc-200/50 dark:border-zinc-800 text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-300 text-left">
                        <strong className="block text-[11px] font-bold uppercase tracking-wider text-amber-600 mb-1">
                          {isHi ? 'भावार्थ:' : 'Meaning:'}
                        </strong>
                        <p>
                          {isHi
                            ? prayer.verses[activeVerseIndex].hindiMeaning
                            : prayer.verses[activeVerseIndex].englishMeaning}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Stepper Navigation Buttons */}
              <div className="flex items-center gap-4 mt-8">
                <button
                  type="button"
                  disabled={activeVerseIndex === 0}
                  onClick={() => setActiveVerseIndex((prev) => Math.max(0, prev - 1))}
                  className="rounded-xl border border-zinc-300 bg-white px-4 py-2 text-xs font-bold shadow-xs disabled:opacity-30 dark:border-zinc-700 dark:bg-zinc-800 transition"
                >
                  &larr; {isHi ? 'पिछला पद' : 'Previous'}
                </button>

                <button
                  type="button"
                  disabled={activeVerseIndex >= prayer.verses.length - 1}
                  onClick={() => setActiveVerseIndex((prev) => Math.min(prayer.verses.length - 1, prev + 1))}
                  className="rounded-xl bg-amber-500 px-5 py-2 text-xs font-bold text-white shadow-xs disabled:opacity-30 hover:bg-amber-600 transition"
                >
                  {isHi ? 'अगला पद' : 'Next'} &rarr;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
