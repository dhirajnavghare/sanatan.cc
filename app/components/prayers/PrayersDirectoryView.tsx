'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { getAllPrayers, getPrayerBySlug, getPrayerOfTheDay } from '@/app/lib/prayers/query';
import { DeityCategory, PrayerCategory, PrayerRecord } from '@/app/lib/prayers/types';
import PrayersHero from './PrayersHero';
import PrayerCard from './PrayerCard';
import PrayerReaderModal from './PrayerReaderModal';
import { useLanguage } from '@/app/lib/i18n/LanguageContext';

const DEITY_FILTERS: { id: DeityCategory | 'all'; labelEn: string; labelHi: string; icon: string }[] = [
  { id: 'all', labelEn: 'All Deities', labelHi: 'सभी देवता', icon: '🕉️' },
  { id: 'hanuman', labelEn: 'Hanuman', labelHi: 'हनुमान जी', icon: '🚩' },
  { id: 'shiva', labelEn: 'Lord Shiva', labelHi: 'भगवान शिव', icon: '🔱' },
  { id: 'devi', labelEn: 'Devi Maa', labelHi: 'भगवती दुर्गा / लक्ष्मी', icon: '🪷' },
  { id: 'surya', labelEn: 'Surya Dev', labelHi: 'सूर्य देव', icon: '☀️' },
  { id: 'vishnu', labelEn: 'Lord Vishnu', labelHi: 'श्रीहरि विष्णु', icon: '🪶' },
  { id: 'ganesha', labelEn: 'Ganesha', labelHi: 'श्रीगणेश', icon: '🐘' },
  { id: 'daily', labelEn: 'Daily Nitya', labelHi: 'दैनिक नित्य मन्त्र', icon: '🌅' },
];

const CATEGORY_FILTERS: { id: PrayerCategory | 'all'; labelEn: string; labelHi: string }[] = [
  { id: 'all', labelEn: 'All Types', labelHi: 'सभी प्रकार' },
  { id: 'chalisa', labelEn: 'Chalisas', labelHi: 'चालीसा' },
  { id: 'stotram', labelEn: 'Stotrams', labelHi: 'स्तोत्र' },
  { id: 'suktam', labelEn: 'Suktams', labelHi: 'सूक्त' },
  { id: 'aarti', labelEn: 'Aartis', labelHi: 'आरती' },
  { id: 'nitya', labelEn: 'Daily Slokas', labelHi: 'नित्य मन्त्र' },
];

export default function PrayersDirectoryView() {
  const searchParams = useSearchParams();
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const initialPrayerSlug = searchParams.get('prayer') || '';
  const [selectedPrayer, setSelectedPrayer] = useState<PrayerRecord | null>(() => {
    if (!initialPrayerSlug) return null;
    return getPrayerBySlug(initialPrayerSlug) || null;
  });

  const [deityFilter, setDeityFilter] = useState<DeityCategory | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<PrayerCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const allPrayers = useMemo(() => getAllPrayers(), []);
  const todayPrayer = useMemo(() => getPrayerOfTheDay(), []);

  const handleOpenPrayer = (prayer: PrayerRecord) => {
    setSelectedPrayer(prayer);
  };

  const handleCloseModal = () => {
    setSelectedPrayer(null);
  };

  // Filtered prayers
  const filteredPrayers = useMemo(() => {
    return allPrayers.filter((p) => {
      if (deityFilter !== 'all' && p.deity !== deityFilter) return false;
      if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;

      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = p.title.toLowerCase().includes(q) || p.titleDevanagari.includes(q);
        const matchesSub = p.subtitle.toLowerCase().includes(q) || p.subtitleDevanagari.includes(q);
        const matchesAuthor = p.author.toLowerCase().includes(q) || p.authorDevanagari.includes(q);
        const matchesVerse = p.verses.some(
          (v) =>
            v.sanskrit.includes(q) ||
            v.transliteration.toLowerCase().includes(q) ||
            v.hindiMeaning.includes(q) ||
            v.englishMeaning.toLowerCase().includes(q)
        );
        return matchesTitle || matchesSub || matchesAuthor || matchesVerse;
      }

      return true;
    });
  }, [allPrayers, deityFilter, categoryFilter, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <PrayersHero
        todayPrayer={todayPrayer}
        onSelectPrayer={handleOpenPrayer}
        totalPrayers={allPrayers.length}
      />

      {/* Filter & Search Bar */}
      <div className="space-y-4">
        {/* Deity Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {DEITY_FILTERS.map((tab) => {
            const isSelected = deityFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setDeityFilter(tab.id)}
                className={`flex-none inline-flex items-center gap-1.5 rounded-2xl px-3.5 py-2 text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md shadow-amber-500/25 ring-1 ring-amber-400/50'
                    : 'border border-zinc-200/90 bg-white/90 text-zinc-600 hover:border-amber-400 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-300 dark:hover:bg-zinc-800'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{isHi ? tab.labelHi : tab.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* Secondary Category Filters & Search */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-1.5">
            {CATEGORY_FILTERS.map((cat) => {
              const isSelected = categoryFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategoryFilter(cat.id)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                    isSelected
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs'
                      : 'border border-zinc-200 bg-zinc-50 text-zinc-600 hover:bg-white dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800'
                  }`}
                >
                  {isHi ? cat.labelHi : cat.labelEn}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <span className="absolute left-3 top-2.5 text-xs text-zinc-400">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isHi ? 'स्तोत्र, चालीसा या पद खोजें...' : 'Search prayer, deity, or verse...'}
              className="w-full rounded-2xl border border-zinc-300 bg-white/90 pl-9 pr-4 py-2 text-xs font-medium text-zinc-900 shadow-xs focus:border-amber-500 focus:outline-hidden dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-zinc-100 placeholder:text-zinc-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2 text-xs text-zinc-400 hover:text-zinc-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Prayers Cards Grid */}
      {filteredPrayers.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-800">
          <span className="text-3xl">📿</span>
          <h3 className="mt-2 font-serif text-base font-bold text-zinc-800 dark:text-zinc-200">
            {isHi ? 'कोई स्तोत्र या प्रार्थना नहीं मिली' : 'No Prayers Found'}
          </h3>
          <p className="mt-1 text-xs text-zinc-500">
            {isHi ? 'कृपया अन्य शब्द अथवा फिल्टर का चयन करें' : 'Try adjusting your search terms or filters'}
          </p>
          <button
            type="button"
            onClick={() => {
              setDeityFilter('all');
              setCategoryFilter('all');
              setSearchQuery('');
            }}
            className="mt-4 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-amber-600"
          >
            {isHi ? 'सभी फिल्टर रीसेट करें' : 'Reset All Filters'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPrayers.map((prayer) => (
            <PrayerCard
              key={prayer.id}
              prayer={prayer}
              onSelect={handleOpenPrayer}
            />
          ))}
        </div>
      )}

      {/* Dedicated Interactive Reader Modal */}
      <PrayerReaderModal
        prayer={selectedPrayer}
        isOpen={Boolean(selectedPrayer)}
        onClose={handleCloseModal}
      />
    </div>
  );
}
