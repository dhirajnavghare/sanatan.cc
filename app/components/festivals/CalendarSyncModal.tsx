'use client';

import { useState } from 'react';
import { GeoLocation } from '@/app/lib/panchang/types';
import { useLanguage } from '@/app/lib/i18n/LanguageContext';

interface CalendarSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  location: GeoLocation;
  initialCategory?: string;
  initialYear?: number;
}

export default function CalendarSyncModal({
  isOpen,
  onClose,
  location,
  initialCategory = 'major',
  initialYear = new Date().getFullYear(),
}: CalendarSyncModalProps) {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const [category, setCategory] = useState<string>(initialCategory);
  const [year, setYear] = useState<number>(initialYear);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://sanatan.cc';
  const downloadUrl = `/api/calendar?type=${category}&year=${year}&lat=${location.latitude}&lon=${location.longitude}&tz=${encodeURIComponent(location.timezone)}&name=${encodeURIComponent(location.name)}&download=1&lang=${language}`;
  const webcalBase = origin.replace(/^https?:\/\//, 'webcal://');
  const webcalUrl = `${webcalBase}/api/calendar?type=${category}&year=${year}&lat=${location.latitude}&lon=${location.longitude}&tz=${encodeURIComponent(location.timezone)}&name=${encodeURIComponent(location.name)}&lang=${language}`;
  const httpsUrl = `${origin}/api/calendar?type=${category}&year=${year}&lat=${location.latitude}&lon=${location.longitude}&tz=${encodeURIComponent(location.timezone)}&name=${encodeURIComponent(location.name)}&lang=${language}`;

  const googleCalendarSubscribeUrl = `https://calendar.google.com/calendar/u/0/r/settings/addbyurl?cid=${encodeURIComponent(httpsUrl)}`;

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(httpsUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="calendar-sync-title"
    >
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-zinc-900/10 dark:bg-zinc-900 dark:ring-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with decorative aura */}
        <div className="relative border-b border-zinc-200/80 bg-gradient-to-br from-amber-500/10 via-amber-600/5 to-transparent p-6 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-xl shadow-md shadow-amber-500/20 text-white">
                📅
              </span>
              <div>
                <h3
                  id="calendar-sync-title"
                  className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100"
                >
                  {isHi ? 'वैदिक पर्व एवं एकादशी कैलेण्डर सिंक' : 'Vedic Festivals & Ekadashi Sync'}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {isHi
                    ? 'गूगल कैलेण्डर, एप्पल कैलेण्डर एवं आउटलुक में स्वचालित जोड़ें'
                    : 'Sync to Google Calendar, Apple Calendar, or Microsoft Outlook'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              type="button"
              className="rounded-full p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 transition"
              aria-label={isHi ? 'बन्द करें' : 'Close modal'}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Options: Category & Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                {isHi ? 'पर्व श्रेणी' : 'Calendar Scope'}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-xs font-medium text-zinc-800 shadow-xs focus:border-amber-500 focus:outline-hidden dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
              >
                <option value="major">{isHi ? 'प्रमुख व्रत एवं त्योहार' : 'All Major Festivals'}</option>
                <option value="ekadashi">{isHi ? 'समस्त २४ एकादशी व्रत' : 'All 24 Ekadashi Vrats'}</option>
                <option value="all">{isHi ? 'सम्पूर्ण पञ्चाङ्ग (पर्व + व्रत + जयन्ती)' : 'Complete Almanac (All Events)'}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                {isHi ? 'वर्ष' : 'Calendar Year'}
              </label>
              <div className="flex gap-1.5">
                {[2025, 2026, 2027].map((y) => (
                  <button
                    key={y}
                    type="button"
                    onClick={() => setYear(y)}
                    className={`flex-1 rounded-xl py-2 text-xs font-bold transition ${
                      year === y
                        ? 'bg-amber-500 text-white shadow-sm'
                        : 'border border-zinc-200 bg-zinc-50 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-300'
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Location note */}
          <div className="rounded-xl bg-amber-50/70 border border-amber-200/60 p-3 text-xs text-amber-900 dark:bg-amber-950/20 dark:border-amber-900/40 dark:text-amber-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span>📍</span>
              <span className="font-medium">
                {isHi ? 'सटीक स्थान:' : 'Calculated for:'} {location.name}
              </span>
            </div>
            <span className="text-[11px] opacity-75">{location.timezone}</span>
          </div>

          {/* 3 Sync Action Options */}
          <div className="space-y-3 pt-1">
            {/* 1. Google Calendar Web Sync */}
            <a
              href={googleCalendarSubscribeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-2xl border border-zinc-200/90 bg-white p-4 shadow-xs transition hover:border-amber-500 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-800/80 dark:hover:border-amber-500 group"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 text-xl font-bold dark:bg-blue-950/50 dark:text-blue-400">
                  G
                </span>
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition">
                    {isHi ? 'गूगल कैलेण्डर में जोड़ें (एक क्लिक)' : 'Add to Google Calendar (1-Click)'}
                  </h4>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    {isHi
                      ? 'सीधे अपने गूगल खाते में पर्व एवं एकादशी तिथि सिंक करें'
                      : 'Opens Google Calendar to subscribe via URL automatically'}
                  </p>
                </div>
              </div>
              <span className="rounded-xl bg-amber-500 px-3 py-1.5 text-xs font-bold text-white shadow-xs group-hover:bg-amber-600 transition">
                {isHi ? 'खोलें ↗' : 'Connect ↗'}
              </span>
            </a>

            {/* 2. Download .ICS File */}
            <a
              href={downloadUrl}
              download
              className="flex items-center justify-between rounded-2xl border border-zinc-200/90 bg-white p-4 shadow-xs transition hover:border-amber-500 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-800/80 dark:hover:border-amber-500 group"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700 text-xl font-bold dark:bg-zinc-700 dark:text-zinc-200">
                  📥
                </span>
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition">
                    {isHi ? 'एप्पल / आउटलुक / आईओएस फाइल (.ics)' : 'Download .ics Calendar File'}
                  </h4>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    {isHi
                      ? 'आईफोन, मैक, आउटलुक अथवा किसी भी कैलेण्डर ऍप में इम्पोर्ट करें'
                      : 'Import into Apple Calendar, Outlook, Thunderbird, or Mobile'}
                  </p>
                </div>
              </div>
              <span className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-bold text-zinc-700 group-hover:border-amber-400 group-hover:bg-amber-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:group-hover:bg-amber-950/40 transition">
                {isHi ? 'डाउनलोड' : 'Download'}
              </span>
            </a>

            {/* 3. Copy Webcal URL for Live Subscription */}
            <div className="rounded-2xl border border-zinc-200/90 bg-zinc-50/60 p-4 dark:border-zinc-800 dark:bg-zinc-800/40">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm">🔗</span>
                  <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                    {isHi ? 'लाइव कैलेण्डर यूआरएल (स्वतः नवीनीकरण)' : 'Live Calendar Subscription Feed'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyUrl}
                  className="rounded-lg bg-amber-500/10 px-2.5 py-1 text-xs font-bold text-amber-700 hover:bg-amber-500/20 dark:text-amber-400 transition cursor-pointer"
                >
                  {copiedLink ? (isHi ? 'प्रतिलिपि बन गई!' : 'Copied!') : (isHi ? 'प्रतिलिपि बनाएं' : 'Copy URL')}
                </button>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono break-all line-clamp-1 bg-white/80 dark:bg-zinc-900/80 p-2 rounded-lg border border-zinc-200 dark:border-zinc-800">
                {webcalUrl}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
