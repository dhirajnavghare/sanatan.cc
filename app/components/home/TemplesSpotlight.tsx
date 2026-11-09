'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { TEMPLES_DATABASE } from '@/app/lib/temples/data';
import { TempleCircuit, TempleRecord } from '@/app/lib/temples/types';
import { calculateSunTimes } from '@/app/lib/panchang/astronomy';
import { useLanguage } from '@/app/lib/i18n/LanguageContext';
import { cleanBilingualTitle, cleanIndianLocation } from '@/app/lib/i18n/formatters';

export default function TemplesSpotlight() {
  const [selectedCircuit, setSelectedCircuit] = useState<'all' | TempleCircuit>('jyotirlinga');
  const { language } = useLanguage();

  const filteredTemples = useMemo(() => {
    let list = TEMPLES_DATABASE;
    if (selectedCircuit !== 'all') {
      list = list.filter(
        (t) => t.circuitCategory === selectedCircuit || t.secondaryCircuits?.includes(selectedCircuit)
      );
    }
    return list.slice(0, 6);
  }, [selectedCircuit]);

  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-zinc-200/90 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            <span>🛕</span>
            <span>{language === 'hi' ? 'पवित्र तीर्थ एवं मन्दिर' : 'Sacred Pilgrimage Spotlight'}</span>
          </div>
          <h2 className="mt-1 font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            {language === 'hi' ? 'पवित्र मन्दिर एवं तीर्थ स्थल' : 'Sacred Temples & Tirthas'}
          </h2>
          <p className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">
            {language === 'hi'
              ? '१२ ज्योतिर्लिंग, ४ चार धाम एवं पंचभूत स्थलों का स्थानीय मन्दिर पञ्चाङ्ग व दर्शन विवरण'
              : 'Explore 12 Jyotirlingas, 4 Char Dhams, and Pancha Bhoota Sthalas with real-time local temple ephemeris'}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'jyotirlinga', label: language === 'hi' ? '१२ ज्योतिर्लिंग' : '12 Jyotirlingas' },
            { id: 'char_dham', label: language === 'hi' ? 'चार धाम' : 'Char Dham' },
            { id: 'pancha_bhoota', label: language === 'hi' ? 'पंचभूत स्थल' : 'Pancha Bhootas' },
            { id: 'all', label: language === 'hi' ? 'सभी तीर्थ स्थल' : 'All Sacred Tirthas' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedCircuit(tab.id as typeof selectedCircuit)}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                selectedCircuit === tab.id
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'border border-zinc-200 bg-zinc-50 text-zinc-600 hover:bg-white dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Temples Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTemples.map((temple) => (
          <TempleSpotlightCard key={temple.id} temple={temple} language={language} />
        ))}
      </div>

      {/* Footer Link */}
      <div className="flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-800 text-xs">
        <span className="text-zinc-500">
          {language === 'hi'
            ? '३१ पवित्र हिन्दू तीर्थ स्थलों का इतिहास, पौराणिक कथा व दर्शन समय'
            : '31 iconic Hindu pilgrimage sanctuaries with historical sthalam lore & darshan timings'}
        </span>
        <Link
          href="/temples"
          className="font-bold text-amber-700 hover:text-amber-800 dark:text-amber-400"
        >
          {language === 'hi'
            ? 'सम्पूर्ण मन्दिर व तीर्थ परिक्रमा देखें →'
            : 'Explore All Temples & Holy Circuits →'}
        </Link>
      </div>
    </div>
  );
}

function TempleSpotlightCard({ temple, language }: { temple: TempleRecord; language: 'en' | 'hi' }) {
  const timezone = 'Asia/Kolkata';

  // Calculate today's sunrise & sunset at temple coordinates
  const sunTimes = useMemo(() => {
    try {
      const now = new Date();
      return calculateSunTimes(
        now.getFullYear(),
        now.getMonth() + 1,
        now.getDate(),
        temple.location.latitude,
        temple.location.longitude,
        temple.location.elevationMeters || 0,
        false
      );
    } catch {
      return null;
    }
  }, [temple]);

  const panchangLink = `/panchang?lat=${temple.location.latitude}&lon=${temple.location.longitude}&tz=${timezone}&name=${encodeURIComponent(
    temple.name
  )}`;

  const circuitBadge = useMemo(() => {
    if (language === 'hi') {
      if (temple.circuitCategory === 'jyotirlinga') return 'ज्योतिर्लिंग';
      if (temple.circuitCategory === 'char_dham') return 'चार धाम';
      if (temple.circuitCategory === 'pancha_bhoota') return 'पंचभूत';
      return 'पवित्र तीर्थ';
    }
    return temple.circuitCategory.replace('_', ' ');
  }, [language, temple.circuitCategory]);

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-zinc-50/70 p-4 transition-all duration-200 hover:border-amber-400 hover:bg-white hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-amber-600">
      <div>
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
            {circuitBadge}
          </span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {language === 'hi'
              ? cleanIndianLocation(`${temple.location.city}, ${temple.location.state}`, true)
              : `${temple.location.city}, ${temple.location.state}`}
          </span>
        </div>

        <h3 className="mt-2 font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {language === 'hi' ? temple.nameDevanagari : temple.name}
        </h3>

        <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">
          {temple.significance}
        </p>

        {temple.sacredRiver && (
          <p className="mt-2 text-[11px] text-zinc-500 dark:text-zinc-400">
            {language === 'hi' ? 'पवित्र नदी / तीर्थ:' : 'Sacred River / Tirtha:'}{' '}
            <strong className="text-zinc-700 dark:text-zinc-300">
              {cleanBilingualTitle(temple.sacredRiver, language === 'hi')}
            </strong>
          </p>
        )}
      </div>

      <div className="mt-4 border-t border-zinc-200/60 pt-2.5 text-xs dark:border-zinc-800">
        {sunTimes && (
          <div className="flex items-center justify-between font-mono text-[11px] text-zinc-600 dark:text-zinc-400">
            <span>{language === 'hi' ? `🌅 सूर्योदय: ${formatTime(sunTimes.sunrise, timezone)}` : `🌅 Sunrise: ${formatTime(sunTimes.sunrise, timezone)}`}</span>
            <span>{language === 'hi' ? `🌇 सूर्यास्त: ${formatTime(sunTimes.sunset, timezone)}` : `🌇 Sunset: ${formatTime(sunTimes.sunset, timezone)}`}</span>
          </div>
        )}

        <div className="mt-3 flex items-center justify-between">
          <Link
            href={`/temples?id=${temple.id}`}
            className="font-semibold text-amber-700 hover:text-amber-800 dark:text-amber-400"
          >
            {language === 'hi' ? 'दर्शन व कथा →' : 'Darshan Lore →'}
          </Link>
          <Link
            href={panchangLink}
            className="font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            {language === 'hi' ? 'स्थानीय पञ्चाङ्ग 🗓' : 'Local Panchang 🗓'}
          </Link>
        </div>
      </div>
    </div>
  );
}

function formatTime(date: Date, timezone: string): string {
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
