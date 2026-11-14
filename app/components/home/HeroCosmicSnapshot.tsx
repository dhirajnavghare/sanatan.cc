'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { GeoLocation, PanchangData } from '@/app/lib/panchang/types';
import { PRESET_CITIES } from '@/app/lib/panchang/constants';
import { calculatePanchang } from '@/app/lib/panchang';
import { useLanguage } from '@/app/lib/i18n/LanguageContext';
import WhatsAppShareModal from './WhatsAppShareModal';
import VratKathaModal from './VratKathaModal';

interface HeroCosmicSnapshotProps {
  location: GeoLocation;
  onLocationChange: (loc: GeoLocation) => void;
}

export default function HeroCosmicSnapshot({
  location,
  onLocationChange,
}: HeroCosmicSnapshotProps) {
  const [currentTime, setCurrentTime] = useState<Date>(() => new Date());
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [isVratKathaOpen, setIsVratKathaOpen] = useState(false);

  const { language, calendarSystem, setCalendarSystem, t } = useLanguage();

  // Update clock every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Compute live panchang data instantly
  const panchang: PanchangData = useMemo(() => {
    return calculatePanchang(currentTime, location, 'Lahiri', currentTime);
  }, [currentTime, location]);

  // Determine active month name based on regional system
  const activeMasaDisplay = useMemo(() => {
    if (calendarSystem === 'amanta') {
      return language === 'hi'
        ? `${panchang.masa.amantaNameDevanagari} मास (अमान्त)`
        : `${panchang.masa.amantaName} Masa (Amanta)`;
    }
    return language === 'hi'
      ? `${panchang.masa.purnimantaNameDevanagari} मास (पूर्णिमान्त)`
      : `${panchang.masa.purnimantaName} Masa (Purnimanta)`;
  }, [calendarSystem, language, panchang.masa]);

  // Determine current active Choghadiya
  const currentChoghadiya = useMemo(() => {
    const all = [...panchang.choghadiya.day, ...panchang.choghadiya.night];
    return all.find((c) => c.isCurrent) || all[0];
  }, [panchang]);

  // Determine if Rahu Kaal or Abhijit is active right now
  const activeSpecialWindow = useMemo(() => {
    const nowMs = currentTime.getTime();
    const rahu = panchang.muhurtas.rahuKaal;
    const abhijit = panchang.muhurtas.abhijitMuhurta;

    if (nowMs >= rahu.startTime.getTime() && nowMs <= rahu.endTime.getTime()) {
      return {
        type: 'rahu',
        title: language === 'hi' ? '⚠️ राहु काल अभी सक्रिय है' : '⚠️ Rahu Kaal Currently Active',
        desc: language === 'hi'
          ? `नया मांगलिक कार्य न करें (${formatTimeShort(rahu.endTime, location.timezone)} तक)`
          : `Avoid starting significant ventures until ${formatTimeShort(rahu.endTime, location.timezone)}`,
        badgeClass: 'bg-red-500/20 text-red-200 border-red-500/30',
      };
    }

    if (abhijit && nowMs >= abhijit.startTime.getTime() && nowMs <= abhijit.endTime.getTime()) {
      return {
        type: 'abhijit',
        title: language === 'hi' ? '🌟 अभिजित मुहूर्त अभी सक्रिय है' : '🌟 Abhijit Muhurta Active Right Now',
        desc: language === 'hi'
          ? `सर्वकार्य सिद्धि विजय मुहूर्त (${formatTimeShort(abhijit.endTime, location.timezone)} तक)`
          : `Most auspicious midday victory window (until ${formatTimeShort(abhijit.endTime, location.timezone)})`,
        badgeClass: 'bg-amber-500/20 text-amber-200 border-amber-400/40',
      };
    }

    if (currentChoghadiya) {
      const isGood =
        currentChoghadiya.quality === 'Amrit' ||
        currentChoghadiya.quality === 'Shubh' ||
        currentChoghadiya.quality === 'Labh';
      const name = language === 'hi' ? currentChoghadiya.nameDevanagari : currentChoghadiya.name;
      const qualHiMap: Record<string, string> = {
        Amrit: 'अमृत',
        Shubh: 'शुभ',
        Labh: 'लाभ',
        Char: 'चल',
        Rog: 'रोग',
        Kaal: 'काल',
        Udveg: 'उद्वेग',
      };
      const rulerHiMap: Record<string, string> = {
        Sun: 'सूर्य',
        Moon: 'चन्द्र',
        Mars: 'मंगल',
        Mercury: 'बुध',
        Jupiter: 'बृहस्पति',
        Venus: 'शुक्र',
        Saturn: 'शनि',
      };
      const qual = language === 'hi' ? (qualHiMap[currentChoghadiya.quality] || currentChoghadiya.quality) : currentChoghadiya.quality;
      const ruler = language === 'hi' ? (rulerHiMap[currentChoghadiya.ruler] || currentChoghadiya.ruler) : currentChoghadiya.ruler;
      return {
        type: 'choghadiya',
        title: language === 'hi'
          ? `${isGood ? '🟢' : '⚪'} ${name} चौघड़िया सक्रिय (${qual})`
          : `${isGood ? '🟢' : '⚪'} ${name} Choghadiya Active (${qual})`,
        desc: `${language === 'hi' ? 'समाप्ति:' : 'Ends:'} ${formatTimeShort(currentChoghadiya.endTime, location.timezone)} • ${language === 'hi' ? 'स्वामी:' : 'Lord:'} ${ruler}`,
        badgeClass: isGood
          ? 'bg-emerald-500/20 text-emerald-200 border-emerald-400/30'
          : 'bg-white/10 text-indigo-200 border-white/20',
      };
    }

    return null;
  }, [currentTime, panchang, currentChoghadiya, location.timezone, language]);

  // GPS Geolocation Handler
  const handleDetectGps = () => {
    if (!navigator.geolocation) {
      setGpsError(language === 'hi' ? 'आपके ब्राउज़र में GPS उपलब्ध नहीं है।' : 'Geolocation is not supported by your browser.');
      return;
    }
    setIsDetectingLocation(true);
    setGpsError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsDetectingLocation(false);
        const { latitude, longitude } = pos.coords;
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata';
        const customLoc: GeoLocation = {
          name: language === 'hi' ? 'मेरी वर्तमान स्थिति' : 'My GPS Location',
          latitude,
          longitude,
          timezone: tz,
          altitude: 0,
        };
        onLocationChange(customLoc);
        try {
          localStorage.setItem('panchang_custom_location', JSON.stringify(customLoc));
        } catch {}
      },
      (err) => {
        setIsDetectingLocation(false);
        setGpsError((language === 'hi' ? 'स्थिति प्राप्त करने में त्रुटि: ' : 'Unable to retrieve your location: ') + err.message);
      },
      { timeout: 10000, enableHighAccuracy: false }
    );
  };

  // Format formatted date string
  const formattedDateStr = useMemo(() => {
    try {
      return new Intl.DateTimeFormat(language === 'hi' ? 'hi-IN' : 'en-IN', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: location.timezone,
      }).format(currentTime);
    } catch {
      return currentTime.toDateString();
    }
  }, [currentTime, location.timezone, language]);

  // Format local clock time
  const localClockStr = useMemo(() => {
    try {
      return new Intl.DateTimeFormat('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: location.timezone,
      }).format(currentTime);
    } catch {
      return currentTime.toLocaleTimeString();
    }
  }, [currentTime, location.timezone]);

  const topCities = [
    PRESET_CITIES.find((c) => c.name === 'New Delhi, India') || PRESET_CITIES[2],
    PRESET_CITIES.find((c) => c.name === 'Varanasi (Kashi), India') || PRESET_CITIES[1],
    PRESET_CITIES.find((c) => c.name === 'Ayodhya, India') || PRESET_CITIES[12],
    PRESET_CITIES.find((c) => c.name === 'Ujjain, India (Standard Meridian)') || PRESET_CITIES[0],
    PRESET_CITIES.find((c) => c.name === 'Mumbai, India') || PRESET_CITIES[3],
    PRESET_CITIES.find((c) => c.name === 'Bengaluru, India') || PRESET_CITIES[6],
    PRESET_CITIES.find((c) => c.name === 'London, UK') || PRESET_CITIES[17],
    PRESET_CITIES.find((c) => c.name === 'New York, USA') || PRESET_CITIES[18],
  ];

  const cityHiMap: Record<string, string> = {
    'New Delhi': 'नई दिल्ली',
    'Varanasi': 'वाराणसी',
    'Ayodhya': 'अयोध्या',
    'Ujjain': 'उज्जैन',
    'Mumbai': 'मुम्बई',
    'Bengaluru': 'बेंगलुरु',
    'London': 'लंदन',
    'New York': 'न्यूयॉर्क',
  };

  return (
    <>
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0e1028] via-[#161845] to-[#0a0b1d] p-6 text-white shadow-2xl ring-1 ring-white/15 sm:p-10">
        {/* Luminous Ambient Background Glows */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-amber-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-28 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-6">
          {/* Top Control Bar: City Selector, GPS, & Live Time */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/settings"
                title={language === 'hi' ? 'प्रधान देशान्तर सेटिंग्स देखें' : 'View Prime Meridian Settings'}
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/20 text-base text-amber-300 transition hover:bg-amber-500/30 cursor-pointer"
              >
                🧭
              </Link>
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <Link
                  href="/settings"
                  className="font-semibold text-zinc-300 hover:text-amber-300 transition cursor-pointer"
                  title={language === 'hi' ? 'प्रधान देशान्तर सेटिंग्स में बदलें' : 'Manage in Prime Meridian Settings'}
                >
                  {language === 'hi' ? 'प्रधान देशान्तर:' : 'Meridian & City:'}
                </Link>
                <select
                  aria-label="Select location"
                  value={location.name}
                  onChange={(e) => {
                    const match = PRESET_CITIES.find((c) => c.name === e.target.value);
                    if (match) onLocationChange(match);
                  }}
                  className="rounded-xl border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md outline-none transition hover:bg-white/15 cursor-pointer dark:bg-zinc-800"
                >
                  {PRESET_CITIES.map((c) => {
                    const shortName = c.name.split(',')[0].replace(' (Kashi)', '').replace(' (Standard Meridian)', '');
                    const displayCity = language === 'hi' ? (cityHiMap[shortName] || shortName) : c.name.split(',')[0];
                    const tzName = c.timezone.split('/')[1] || c.timezone;
                    return (
                      <option key={c.name} value={c.name} className="bg-zinc-900 text-white">
                        {displayCity} ({tzName})
                      </option>
                    );
                  })}
                </select>

                <button
                  type="button"
                  onClick={handleDetectGps}
                  disabled={isDetectingLocation}
                  title="Detect your exact coordinates via browser GPS"
                  className="inline-flex items-center gap-1 rounded-xl border border-amber-400/30 bg-amber-500/20 px-2.5 py-1.5 text-xs font-semibold text-amber-300 transition hover:bg-amber-500/30 disabled:opacity-50 cursor-pointer"
                >
                  <span>{isDetectingLocation ? '⏳' : '🎯'}</span>
                  <span>{isDetectingLocation ? (language === 'hi' ? 'खोज रहे...' : 'Locating...') : t('useMyGps')}</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs">
                <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                <span className="font-mono font-bold tracking-wider text-emerald-300" suppressHydrationWarning>{localClockStr}</span>
                <span className="text-[10px] text-zinc-400">
                  ({language === 'hi' ? (location.timezone.includes('Kolkata') ? 'भारतीय समय' : location.timezone.split('/')[1] || location.timezone) : (location.timezone.split('/')[1] || location.timezone)})
                </span>
              </div>
            </div>
          </div>

          {gpsError && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-200">
              {gpsError}
            </div>
          )}

          {/* Quick City Pills for Instant One-Click Switching */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-semibold text-zinc-400">{t('quickCities')}:</span>
              {topCities.map((c) => {
                const isSelected = location.name === c.name;
                const shortCity = c.name.split(',')[0].replace(' (Kashi)', '').replace(' (Standard Meridian)', '');
                const displayCity = language === 'hi' ? (cityHiMap[shortCity] || shortCity) : shortCity;
                return (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => onLocationChange(c)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-medium transition cursor-pointer ${
                      isSelected
                        ? 'border border-amber-400/50 bg-amber-500/30 text-amber-200 shadow-sm'
                        : 'border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/15 hover:text-white'
                    }`}
                  >
                    {displayCity}
                  </button>
                );
              })}
            </div>

            {/* P1: Regional Calendar Switcher (Purnimanta vs Amanta) */}
            <div className="flex items-center gap-1 rounded-xl border border-white/15 bg-white/5 p-1 text-[11px]">
              <span className="px-2 text-zinc-400 hidden sm:inline">{language === 'hi' ? 'मास:' : 'Calendar:'}</span>
              <button
                type="button"
                onClick={() => setCalendarSystem('purnimanta')}
                title={language === 'hi' ? 'उत्तर भारत (पूर्णिमान्त - माह पूर्णिमा पर समाप्त)' : 'North India (Purnimanta - month ends on Purnima)'}
                className={`rounded-lg px-2.5 py-1 font-bold transition cursor-pointer ${
                  calendarSystem === 'purnimanta'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {language === 'hi' ? 'पूर्णिमान्त (उत्तर भारत)' : 'Purnimanta (North India)'}
              </button>
              <button
                type="button"
                onClick={() => setCalendarSystem('amanta')}
                title={language === 'hi' ? 'महाराष्ट्र/गुजरात/दक्षिण (अमान्त - माह अमावस्या पर समाप्त)' : 'West & South India (Amanta - month ends on Amavasya)'}
                className={`rounded-lg px-2.5 py-1 font-bold transition cursor-pointer ${
                  calendarSystem === 'amanta'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {language === 'hi' ? 'अमान्त (महाराष्ट्र/गुजरात/दक्षिण)' : 'Amanta (West / South India)'}
              </button>
            </div>
          </div>

          {/* Main Hero Header */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-300 backdrop-blur-md">
                <span>ॐ</span>
                <span>{language === 'hi' ? 'आज का वैदिक पञ्चाङ्ग' : "Today's Vedic Panchang"}</span>
              </span>

              {/* Live Auspicious Status Pill */}
              {activeSpecialWindow && (
                <div
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-md ${activeSpecialWindow.badgeClass}`}
                >
                  <span className="text-xs">{activeSpecialWindow.title}</span>
                  <span className="hidden opacity-80 sm:inline">• {activeSpecialWindow.desc}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h1 className="font-serif text-3xl font-extrabold tracking-tight text-white sm:text-5xl" suppressHydrationWarning>
                  {formattedDateStr}
                </h1>
                <p className="mt-1 text-sm font-medium text-amber-300/90 sm:text-base">
                  {language === 'hi'
                    ? `${activeMasaDisplay} • ${panchang.tithi.current.pakshaDevanagari} पक्ष • विक्रम संवत् ${panchang.samvat.vikramSamvat} • शक संवत् ${panchang.samvat.shakaSamvat}`
                    : `${activeMasaDisplay} • ${panchang.tithi.current.paksha} Paksha • Vikram Samvat ${panchang.samvat.vikramSamvat} • Shaka Samvat ${panchang.samvat.shakaSamvat}`}
                </p>
              </div>

              {/* Action Buttons: WhatsApp Share, Vrat Katha, Open Full Panchang */}
              <div className="flex flex-wrap items-center gap-2.5">
                {/* P0 Feature: 1-Click WhatsApp Share */}
                <button
                  type="button"
                  onClick={() => setIsWhatsAppOpen(true)}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-3 text-xs font-bold text-white shadow-lg shadow-emerald-500/30 transition hover:from-emerald-600 hover:to-emerald-700 active:scale-95 cursor-pointer"
                >
                  <span className="text-base">📲</span>
                  <span>{t('shareWhatsApp')}</span>
                </button>

                {/* P1 Feature: Vrat Katha & Puja Vidhi */}
                <button
                  type="button"
                  onClick={() => setIsVratKathaOpen(true)}
                  className="inline-flex items-center gap-2 rounded-2xl border border-amber-400/40 bg-amber-500/20 px-4 py-3 text-xs font-bold text-amber-200 backdrop-blur-md transition hover:bg-amber-500/30 cursor-pointer"
                >
                  <span>📖</span>
                  <span>{language === 'hi' ? 'व्रत कथा व विधि' : 'Vrat Katha & Vidhi'}</span>
                </button>

                <Link
                  href={`/panchang?date=${panchang.isoDate}&lat=${location.latitude}&lon=${location.longitude}&tz=${location.timezone}`}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-3 text-xs font-bold text-white shadow-lg shadow-amber-500/30 transition hover:from-amber-600 hover:to-amber-700 cursor-pointer"
                >
                  <span>{t('openFullPanchang')}</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>
          </div>

          {/* 5 Sacred Limbs (Pancha-Anga) Live Cards Grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {/* Limb 1: Tithi */}
            <div className="group flex flex-col justify-between rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md transition hover:bg-white/15">
              <div>
                <div className="flex items-center justify-between text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                  <span>{t('limbTithi')}</span>
                  <span>🌙</span>
                </div>
                <h2 className="mt-1 font-serif text-lg font-bold text-white sm:text-xl">
                  {language === 'hi' ? panchang.tithi.current.nameDevanagari : panchang.tithi.current.name}
                </h2>
                <p className="text-xs text-indigo-200">
                  {language === 'hi' ? `${panchang.tithi.current.pakshaDevanagari} पक्ष` : `${panchang.tithi.current.paksha} Paksha`}
                </p>
              </div>
              <div className="mt-3 border-t border-white/10 pt-2 text-[11px] text-zinc-300">
                <span>{t('endsAt')}: </span>
                <span className="font-semibold text-white">
                  {formatTimeShort(panchang.tithi.endTime, location.timezone)}
                </span>
              </div>
            </div>

            {/* Limb 2: Nakshatra */}
            <div className="group flex flex-col justify-between rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md transition hover:bg-white/15">
              <div>
                <div className="flex items-center justify-between text-[11px] font-bold text-indigo-300 uppercase tracking-wider">
                  <span>{t('limbNakshatra')}</span>
                  <span>✨</span>
                </div>
                <h2 className="mt-1 font-serif text-lg font-bold text-white sm:text-xl">
                  {language === 'hi' ? panchang.nakshatra.current.nameDevanagari : panchang.nakshatra.current.name}
                </h2>
                <p className="text-xs text-indigo-200">
                  {language === 'hi' ? `चरण ${panchang.nakshatra.current.pada}` : `Pada ${panchang.nakshatra.current.pada}`}
                </p>
              </div>
              <div className="mt-3 border-t border-white/10 pt-2 text-[11px] text-zinc-300">
                <span>{t('rulingLord')}: </span>
                <span className="font-semibold text-white">
                  {language === 'hi'
                    ? (panchang.nakshatra.current.lord.includes('Surya') ? 'सूर्य देव'
                      : panchang.nakshatra.current.lord.includes('Chandra') ? 'चन्द्र देव'
                      : panchang.nakshatra.current.lord.includes('Mangala') ? 'मंगल देव'
                      : panchang.nakshatra.current.lord.includes('Budha') ? 'बुध देव'
                      : panchang.nakshatra.current.lord.includes('Guru') ? 'बृहस्पति देव'
                      : panchang.nakshatra.current.lord.includes('Shukra') ? 'शुक्र देव'
                      : panchang.nakshatra.current.lord.includes('Shani') ? 'शनि देव'
                      : panchang.nakshatra.current.lord.includes('Rahu') ? 'राहु देव'
                      : panchang.nakshatra.current.lord.includes('Ketu') ? 'केतु देव'
                      : panchang.nakshatra.current.lord)
                    : (panchang.nakshatra.current.lord.includes('Venus') ? 'Venus'
                      : panchang.nakshatra.current.lord.includes('Sun') ? 'Sun'
                      : panchang.nakshatra.current.lord.includes('Moon') ? 'Moon'
                      : panchang.nakshatra.current.lord.includes('Mars') ? 'Mars'
                      : panchang.nakshatra.current.lord.includes('Jupiter') ? 'Jupiter'
                      : panchang.nakshatra.current.lord.includes('Saturn') ? 'Saturn'
                      : panchang.nakshatra.current.lord.includes('Mercury') ? 'Mercury'
                      : panchang.nakshatra.current.lord)}
                </span>
              </div>
            </div>

            {/* Limb 3: Yoga */}
            <div className="group flex flex-col justify-between rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md transition hover:bg-white/15">
              <div>
                <div className="flex items-center justify-between text-[11px] font-bold text-emerald-300 uppercase tracking-wider">
                  <span>{t('limbYoga')}</span>
                  <span>🕉️</span>
                </div>
                <h2 className="mt-1 font-serif text-lg font-bold text-white sm:text-xl">
                  {language === 'hi' ? panchang.yoga.current.nameDevanagari : panchang.yoga.current.name}
                </h2>
                <p className="text-xs text-indigo-200">
                  {language === 'hi'
                    ? (panchang.yoga.current.nature === 'Auspicious' ? 'शुभ योग' : panchang.yoga.current.nature === 'Inauspicious' ? 'अशुभ योग' : 'मध्यम योग')
                    : `${panchang.yoga.current.nature} Yoga`}
                </p>
              </div>
              <div className="mt-3 border-t border-white/10 pt-2 text-[11px] text-zinc-300">
                <span>{t('quality')}: </span>
                <span className="font-semibold text-white">
                  {language === 'hi'
                    ? (panchang.yoga.current.nature === 'Auspicious' ? 'शुभ' : panchang.yoga.current.nature === 'Inauspicious' ? 'अशुभ' : 'मध्यम')
                    : panchang.yoga.current.nature}
                </span>
              </div>
            </div>

            {/* Limb 4: Karana */}
            <div className="group flex flex-col justify-between rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md transition hover:bg-white/15">
              <div>
                <div className="flex items-center justify-between text-[11px] font-bold text-purple-300 uppercase tracking-wider">
                  <span>{t('limbKarana')}</span>
                  <span>⚡</span>
                </div>
                <h2 className="mt-1 font-serif text-lg font-bold text-white sm:text-xl">
                  {language === 'hi' ? panchang.karana.current.nameDevanagari : panchang.karana.current.name}
                </h2>
                <p className="text-xs text-indigo-200">
                  {language === 'hi'
                    ? (panchang.karana.current.type === 'Chara' ? 'चर करण' : 'स्थिर करण')
                    : `${panchang.karana.current.type} Karana`}
                </p>
              </div>
              <div className="mt-3 border-t border-white/10 pt-2 text-[11px] text-zinc-300">
                <span>{t('type')}: </span>
                <span className="font-semibold text-white">
                  {language === 'hi'
                    ? (panchang.karana.current.type === 'Chara' ? 'चर' : 'स्थिर')
                    : panchang.karana.current.type}
                </span>
              </div>
            </div>

            {/* Limb 5: Vara */}
            <div className="group flex flex-col justify-between rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md transition hover:bg-white/15 col-span-2 sm:col-span-1">
              <div>
                <div className="flex items-center justify-between text-[11px] font-bold text-orange-300 uppercase tracking-wider">
                  <span>{t('limbVara')}</span>
                  <span>☀️</span>
                </div>
                <h2 className="mt-1 font-serif text-lg font-bold text-white sm:text-xl">
                  {language === 'hi' ? panchang.vara.nameDevanagari : panchang.vara.englishName}
                </h2>
                <p className="text-xs text-indigo-200">
                  {language === 'hi'
                    ? `वार: ${panchang.vara.nameDevanagari}`
                    : `Solar Day: ${panchang.vara.englishName}`}
                </p>
              </div>
              <div className="mt-3 border-t border-white/10 pt-2 text-[11px] text-zinc-300">
                <span>{t('graha')}: </span>
                <span className="font-semibold text-white">
                  {language === 'hi'
                    ? (panchang.vara.lordPlanet.includes('Surya') ? 'सूर्य'
                      : panchang.vara.lordPlanet.includes('Chandra') ? 'चन्द्र'
                      : panchang.vara.lordPlanet.includes('Mangala') ? 'मंगल'
                      : panchang.vara.lordPlanet.includes('Budha') ? 'बुध'
                      : panchang.vara.lordPlanet.includes('Guru') ? 'बृहस्पति'
                      : panchang.vara.lordPlanet.includes('Shukra') ? 'शुक्र'
                      : panchang.vara.lordPlanet.includes('Shani') ? 'शनि'
                      : panchang.vara.lordPlanet)
                    : (panchang.vara.lordPlanet.includes('Venus') ? 'Venus'
                      : panchang.vara.lordPlanet.includes('Sun') ? 'Sun'
                      : panchang.vara.lordPlanet.includes('Moon') ? 'Moon'
                      : panchang.vara.lordPlanet.includes('Mars') ? 'Mars'
                      : panchang.vara.lordPlanet.includes('Jupiter') ? 'Jupiter'
                      : panchang.vara.lordPlanet.includes('Saturn') ? 'Saturn'
                      : panchang.vara.lordPlanet.includes('Mercury') ? 'Mercury'
                      : panchang.vara.lordPlanet)}
                </span>
              </div>
            </div>
          </div>

          {/* Solar & Lunar Ephemeris Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs backdrop-blur-md">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2">
                <span className="text-lg">🌅</span>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-zinc-400">{t('sunrise')}</span>
                  <p className="font-mono font-bold text-amber-200">
                    {formatTimeShort(panchang.sunTimes.sunrise, location.timezone)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-lg">🌇</span>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-zinc-400">{t('sunset')}</span>
                  <p className="font-mono font-bold text-orange-200">
                    {formatTimeShort(panchang.sunTimes.sunset, location.timezone)}
                  </p>
                </div>
              </div>

              <div className="hidden items-center gap-2 md:flex">
                <span className="text-lg">⌛</span>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-zinc-400">{t('dayLength')}</span>
                  <p className="font-mono font-bold text-zinc-200">
                    {language === 'hi'
                      ? `${Math.floor(panchang.sunTimes.dayLengthMs / 3600000)}घं ${Math.floor((panchang.sunTimes.dayLengthMs % 3600000) / 60000)}मि`
                      : `${Math.floor(panchang.sunTimes.dayLengthMs / 3600000)}h ${Math.floor((panchang.sunTimes.dayLengthMs % 3600000) / 60000)}m`}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2">
                <span className="text-lg">🌙</span>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-zinc-400">{t('moonPhase')}</span>
                  <p className="font-bold text-zinc-200">
                    {language === 'hi'
                      ? (panchang.moonTimes.phaseName.includes('New') ? 'अमावस्या'
                        : panchang.moonTimes.phaseName.includes('Full') ? 'पूर्णिमा'
                        : panchang.moonTimes.phaseName.includes('Waxing') ? 'शुक्ल पक्ष'
                        : panchang.moonTimes.phaseName.includes('Waning') ? 'कृष्ण पक्ष'
                        : panchang.moonTimes.phaseName)
                      : panchang.moonTimes.phaseName}{' '}
                    ({(panchang.moonTimes.illuminationFraction * 100).toFixed(0)}%)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-lg">🌟</span>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-zinc-400">{t('abhijitMuhurta')}</span>
                  <p className="font-mono font-bold text-amber-300">
                    {panchang.muhurtas.abhijitMuhurta
                      ? `${formatTimeShort(panchang.muhurtas.abhijitMuhurta.startTime, location.timezone)} - ${formatTimeShort(panchang.muhurtas.abhijitMuhurta.endTime, location.timezone)}`
                      : (language === 'hi' ? 'आज नहीं' : 'Not today')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-lg">⏱️</span>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-red-300">{t('rahuKaal')}</span>
                  <p className="font-mono font-bold text-red-300">
                    {formatTimeShort(panchang.muhurtas.rahuKaal.startTime, location.timezone)} - {formatTimeShort(panchang.muhurtas.rahuKaal.endTime, location.timezone)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Share Card Modal */}
      <WhatsAppShareModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        panchang={panchang}
        location={location}
        calendarSystem={calendarSystem}
        language={language}
      />

      {/* Vrat Katha & Puja Vidhi Modal */}
      <VratKathaModal
        isOpen={isVratKathaOpen}
        onClose={() => setIsVratKathaOpen(false)}
        language={language}
      />
    </>
  );
}

function formatTimeShort(date: Date, timezone: string): string {
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
