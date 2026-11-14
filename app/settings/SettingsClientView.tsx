'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/app/lib/i18n/LanguageContext';
import { GeoLocation } from '@/app/lib/panchang/types';
import { PRESET_CITIES } from '@/app/lib/panchang/constants';
import {
  UserSacredProfile,
  DEFAULT_USER_PROFILE,
  POPULAR_GOTRAS,
  POPULAR_ISHTA_DEVATAS,
  loadUserProfile,
  saveUserProfile,
  loadUserLocation,
  saveUserLocation,
} from '@/app/lib/services/userProfile';
import { playTempleBell, playShankhNaad, triggerHaptic } from '@/app/lib/services/sacredAudio';

export default function SettingsClientView() {
  const { language, setLanguage, calendarSystem, setCalendarSystem } = useLanguage();
  const isHi = language === 'hi';

  const [profile, setProfile] = useState<UserSacredProfile>(DEFAULT_USER_PROFILE);
  const [location, setLocation] = useState<GeoLocation>(PRESET_CITIES[0]);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [soundFeedback, setSoundFeedback] = useState<string | null>(null);

  // Form edit state for modal
  const [editName, setEditName] = useState(profile.name);
  const [editGotra, setEditGotra] = useState(profile.gotra);
  const [editIshta, setEditIshta] = useState(profile.ishtaDevata);
  const [editKuldevi, setEditKuldevi] = useState(profile.kuldeviOrDevata);

  useEffect(() => {
    loadUserProfile().then((p) => {
      setProfile(p);
      setEditName(p.name);
      setEditGotra(p.gotra);
      setEditIshta(p.ishtaDevata);
      setEditKuldevi(p.kuldeviOrDevata);
    });
    loadUserLocation().then(setLocation);
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserSacredProfile = {
      ...profile,
      name: editName.trim() || 'भक्त',
      gotra: editGotra.trim() || 'Kashyapa (कश्यप)',
      ishtaDevata: editIshta.trim() || 'भगवान शिव / महादेव',
      kuldeviOrDevata: editKuldevi.trim(),
    };
    setProfile(updated);
    await saveUserProfile(updated);
    await triggerHaptic('success', profile.hapticsEnabled);
    setIsProfileModalOpen(false);
  };

  const handleSelectLocation = async (newLoc: GeoLocation) => {
    setLocation(newLoc);
    await saveUserLocation(newLoc);
    await triggerHaptic('tap', profile.hapticsEnabled);
    setIsCityModalOpen(false);
  };

  const handleGpsDetect = () => {
    if (!navigator.geolocation) {
      alert(isHi ? 'आपके ब्राउज़र में जीपीएस उपलब्ध नहीं है।' : 'Geolocation not supported by your browser.');
      return;
    }
    setIsLocating(true);
    triggerHaptic('tap', profile.hapticsEnabled);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        setIsLocating(false);
        const { latitude, longitude, altitude } = pos.coords;
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata';
        const detectedLoc: GeoLocation = {
          name: isHi ? 'वर्तमान जीपीएस स्थान' : 'Current GPS Location',
          latitude,
          longitude,
          altitude: altitude ?? 0,
          timezone: tz,
        };
        setLocation(detectedLoc);
        await saveUserLocation(detectedLoc);
        setIsCityModalOpen(false);
        await triggerHaptic('success', profile.hapticsEnabled);
      },
      (err) => {
        setIsLocating(false);
        alert(
          (isHi ? 'स्थान प्राप्त करने में त्रुटि: ' : 'GPS Location error: ') + err.message
        );
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleToggleAudio = async (val: boolean) => {
    const updated = { ...profile, audioEnabled: val };
    setProfile(updated);
    await saveUserProfile(updated);
    await triggerHaptic('tap', profile.hapticsEnabled);
  };

  const handleToggleHaptics = async (val: boolean) => {
    const updated = { ...profile, hapticsEnabled: val };
    setProfile(updated);
    await saveUserProfile(updated);
    if (val) triggerHaptic('tap', true);
  };

  const handleTestBell = async () => {
    await triggerHaptic('tap', profile.hapticsEnabled);
    await playTempleBell(1.0);
    setSoundFeedback(isHi ? '🔔 मन्दिर घंटी बजाई गई (उच्च ध्वनि)' : '🔔 Temple Bell Chimed (Full Volume)');
    setTimeout(() => setSoundFeedback(null), 3000);
  };

  const handleTestShankh = async () => {
    await triggerHaptic('tap', profile.hapticsEnabled);
    await playShankhNaad(1.0);
    setSoundFeedback(isHi ? '🐚 पवित्र शंख नाद बजाया गया (उच्च ध्वनि)' : '🐚 Sacred Shankh Naad Sounded (Full Volume)');
    setTimeout(() => setSoundFeedback(null), 3000);
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8 pb-16">
      {/* Page Title */}
      <div className="flex flex-col gap-1 border-b border-zinc-200/80 pb-5 dark:border-zinc-800">
        <div className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500/10 text-xl text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
            ⚙️
          </span>
          <h1 className="font-serif text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
            {isHi ? 'ऍप सेटिंग्स एवं प्राथमिकताएं' : 'App Settings & Preferences'}
          </h1>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 sm:text-sm">
          {isHi
            ? 'अपनी दैनिक साधना, प्रधान देशान्तर (Meridian), क्षेत्रीय पञ्चाङ्ग, ध्वनि व ऑफ़लाइन प्राथमिकताओं का प्रबन्धन करें।'
            : 'Configure your devotee profile, Prime Meridian, regional calendar, sacred audio, and offline autonomy.'}
        </p>
      </div>

      {/* 1. Devotee Sacred Profile Banner */}
      <div
        data-testid="settings-profile-banner"
        className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent p-5 sm:p-6 backdrop-blur-md dark:border-amber-400/20 dark:bg-zinc-900"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500 text-2xl text-white shadow-md shadow-amber-500/25 ring-2 ring-amber-400/40">
              🕉️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  {isHi ? 'दैनिक साधक परिचय' : 'Devotee Sacred Profile'}
                </span>
              </div>
              <h2 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100 sm:text-xl">
                {isHi ? 'श्री' : 'Sri'} {profile.name} {isHi ? 'जी' : ''}
              </h2>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                {profile.gotra ? `${isHi ? 'गोत्र:' : 'Gotra:'} ${profile.gotra}` : ''} • {profile.ishtaDevata}
                {profile.kuldeviOrDevata ? ` • ${isHi ? 'कुलदेवी:' : 'Family Deity:'} ${profile.kuldeviOrDevata}` : ''}
              </p>
            </div>
          </div>

          <button
            type="button"
            data-testid="settings-edit-profile-btn"
            onClick={() => {
              setEditName(profile.name);
              setEditGotra(profile.gotra);
              setEditIshta(profile.ishtaDevata);
              setEditKuldevi(profile.kuldeviOrDevata);
              setIsProfileModalOpen(true);
            }}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/15 px-3.5 py-2 text-xs font-bold text-amber-800 transition hover:bg-amber-500/25 dark:text-amber-300 cursor-pointer"
          >
            <span>✏️</span>
            <span>{isHi ? 'प्रोफ़ाइल बदलें' : 'Edit Profile'}</span>
          </button>
        </div>
      </div>

      {/* 2. General Preferences Card */}
      <div className="space-y-4 rounded-3xl border border-zinc-200/80 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
        <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-200">
          {isHi ? '⚙️ भाषा एवं पञ्चाङ्ग प्रणाली' : '⚙️ Language & Ephemeris System'}
        </h3>

        {/* Language Selection */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-zinc-100 pb-4 dark:border-zinc-800/80">
          <div>
            <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {isHi ? 'भाषा (Language)' : 'Display Language'}
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              {isHi ? 'सम्पूर्ण जालस्थल की प्रदर्शन भाषा' : 'Primary language across entire website'}
            </div>
          </div>
          <div className="flex items-center rounded-xl border border-zinc-200 bg-zinc-100 p-0.5 dark:border-zinc-700 dark:bg-zinc-800">
            <button
              type="button"
              data-testid="settings-lang-hi"
              onClick={() => setLanguage('hi')}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                language === 'hi'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white'
              }`}
            >
              हिन्दी
            </button>
            <button
              type="button"
              data-testid="settings-lang-en"
              onClick={() => setLanguage('en')}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                language === 'en'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white'
              }`}
            >
              English
            </button>
          </div>
        </div>

        {/* Regional Lunar Calendar System */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-zinc-100 pb-4 dark:border-zinc-800/80">
          <div>
            <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {isHi ? 'क्षेत्रीय मास गणना प्रणाली' : 'Regional Lunar Calendar System'}
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              {isHi
                ? 'पूर्णिमान्त (उत्तर भारत) अथवा अमान्त (महाराष्ट्र, गुजरात व दक्षिण भारत)'
                : 'Purnimanta (North India) or Amanta (Maharashtra, Gujarat, South India)'}
            </div>
          </div>
          <div className="flex items-center rounded-xl border border-zinc-200 bg-zinc-100 p-0.5 dark:border-zinc-700 dark:bg-zinc-800">
            <button
              type="button"
              data-testid="settings-cal-purnimanta"
              onClick={() => setCalendarSystem('purnimanta')}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                calendarSystem === 'purnimanta'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white'
              }`}
            >
              {isHi ? 'पूर्णिमान्त (उत्तर)' : 'Purnimanta'}
            </button>
            <button
              type="button"
              data-testid="settings-cal-amanta"
              onClick={() => setCalendarSystem('amanta')}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                calendarSystem === 'amanta'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white'
              }`}
            >
              {isHi ? 'अमान्त (दक्षिण/पश्चिम)' : 'Amanta'}
            </button>
          </div>
        </div>

        {/* 🧭 Prime Meridian & City Location Section */}
        <div
          data-testid="settings-meridian-section"
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1"
        >
          <div className="flex-1">
            <div className="flex items-center gap-1.5 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              <span className="text-amber-500 text-base">🧭</span>
              <span>{isHi ? 'प्रधान देशान्तर एवं नगर (Prime Meridian)' : 'Prime Meridian & City Location'}</span>
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              {isHi
                ? 'उज्जैन (अवन्तिका) प्राचीन भारतीय शून्य देशान्तर (0° Meridian) है। अपनी सटीक सूर्योदय गणना हेतु नगर चुनें।'
                : 'Ujjain (Avanti) is the traditional Zero Meridian of Hindu Astronomy. Choose your coordinates for exact sunrise.'}
            </div>
            <div className="mt-1.5 inline-flex items-center gap-2 rounded-lg bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              <span>📍 {location.name}</span>
              <span className="font-mono text-[11px] text-zinc-500">
                ({location.latitude.toFixed(2)}°, {location.longitude.toFixed(2)}°)
              </span>
            </div>
          </div>

          <button
            type="button"
            data-testid="settings-meridian-btn"
            onClick={() => setIsCityModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/15 px-4 py-2 text-xs font-bold text-amber-800 transition hover:bg-amber-500/25 dark:text-amber-300 cursor-pointer"
          >
            <span>🧭</span>
            <span>{isHi ? 'स्थान बदलें' : 'Change Meridian'}</span>
          </button>
        </div>
      </div>

      {/* 3. Audio & Temple Acoustics Preferences */}
      <div className="space-y-4 rounded-3xl border border-zinc-200/80 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
        <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-200">
          {isHi ? '🔔 ध्वनि एवं स्पर्श (Audio & Haptics)' : '🔔 Sacred Audio & Tactile Feedback'}
        </h3>

        {/* Audio Toggle */}
        <div className="flex items-center justify-between border-b border-zinc-100 pb-4 dark:border-zinc-800/80">
          <div>
            <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {isHi ? 'मन्दिर घंटी एवं शंख ध्वनि' : 'Mandir Bell & Shankh Sound'}
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              {isHi ? 'प्रामाणिक पीतल घंटी व शंख की तरंगें (100% Volume)' : 'Authentic acoustic temple chime effects'}
            </div>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              data-testid="settings-toggle-audio"
              checked={profile.audioEnabled}
              onChange={(e) => handleToggleAudio(e.target.checked)}
              className="peer sr-only"
            />
            <div className="peer h-6 w-11 rounded-full bg-zinc-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-zinc-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-amber-500 peer-checked:after:translate-x-full peer-checked:after:border-white dark:bg-zinc-700" />
          </label>
        </div>

        {/* Haptics Toggle */}
        <div className="flex items-center justify-between border-b border-zinc-100 pb-4 dark:border-zinc-800/80">
          <div>
            <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {isHi ? 'स्पर्श कम्पन (Tactile Vibration)' : 'Tactile Haptic Feedback'}
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              {isHi ? '१०८ मनके व बटन पर सूक्ष्म कम्पन' : 'Subtle vibration pulse on actions'}
            </div>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              data-testid="settings-toggle-haptics"
              checked={profile.hapticsEnabled}
              onChange={(e) => handleToggleHaptics(e.target.checked)}
              className="peer sr-only"
            />
            <div className="peer h-6 w-11 rounded-full bg-zinc-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-zinc-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-amber-500 peer-checked:after:translate-x-full peer-checked:after:border-white dark:bg-zinc-700" />
          </label>
        </div>

        {/* Live Test Sounds Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            type="button"
            data-testid="settings-test-bell-btn"
            onClick={handleTestBell}
            className="inline-flex items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2 text-xs font-bold text-amber-800 transition hover:bg-amber-100 dark:border-amber-700/60 dark:bg-amber-950/40 dark:text-amber-300 cursor-pointer"
          >
            <span>🔔</span>
            <span>{isHi ? 'घंटी ध्वनि बजाएं (Test Bell)' : 'Play Temple Bell (Test)'}</span>
          </button>
          <button
            type="button"
            data-testid="settings-test-shankh-btn"
            onClick={handleTestShankh}
            className="inline-flex items-center gap-2 rounded-xl border border-indigo-300 bg-indigo-50 px-4 py-2 text-xs font-bold text-indigo-800 transition hover:bg-indigo-100 dark:border-indigo-700/60 dark:bg-indigo-950/40 dark:text-indigo-300 cursor-pointer"
          >
            <span>🐚</span>
            <span>{isHi ? 'शंख नाद बजाएं (Test Shankh)' : 'Sound Shankh Naad (Test)'}</span>
          </button>

          {soundFeedback && (
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 animate-pulse">
              {soundFeedback}
            </span>
          )}
        </div>
      </div>

      {/* 4. 100% Offline Autonomy Guarantee Card */}
      <div
        data-testid="settings-offline-card"
        className="rounded-3xl border border-emerald-500/25 bg-emerald-500/5 p-5 dark:border-emerald-500/20 dark:bg-emerald-950/20 sm:p-6"
      >
        <div className="flex items-center gap-2.5">
          <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 dark:text-emerald-300">
            ⚡ 100% OFFLINE
          </span>
          <h3 className="font-serif text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {isHi ? 'पूर्णतः ऑफ़लाइन कार्य प्रणाली' : 'Full Offline Autonomy'}
          </h3>
        </div>

        <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
          {isHi
            ? 'यह सम्पूर्ण पञ्चाङ्ग एवं इसकी सभी गणनाएं बिना किसी केंद्रीय सर्वर या इंटरनेट के स्थानीय रूप से कार्य करती हैं। नासा एवं वैदिक सिद्धान्तों पर आधारित खगोलीय पञ्चाङ्ग सीधे आपके यन्त्र में गणितीय रूप से संगणित होता है।'
            : 'Zero internet required. All astronomical calculations, ephemeris, festivals, and alerts run locally on your device hardware with absolute privacy.'}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="flex items-center gap-2 rounded-xl bg-white/60 p-2.5 text-xs font-medium text-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-300">
            <span>✈️</span>
            <span>{isHi ? 'एयरप्लेन मोड' : 'Airplane Mode'}</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-white/60 p-2.5 text-xs font-medium text-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-300">
            <span>🛡️</span>
            <span>{isHi ? 'शून्य ट्रैकर' : 'Zero Trackers'}</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-white/60 p-2.5 text-xs font-medium text-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-300">
            <span>🌌</span>
            <span>{isHi ? 'सटीक नासा एफिमेरिस' : 'NASA Ephemeris'}</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-white/60 p-2.5 text-xs font-medium text-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-300">
            <span>📐</span>
            <span>{isHi ? 'प्रथम सिद्धान्त' : 'First Principles'}</span>
          </div>
        </div>
      </div>

      {/* 5. Android Mobile App Coming Soon Card */}
      <div
        data-testid="settings-android-card"
        className="space-y-3 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent p-5 dark:border-emerald-500/20 dark:bg-emerald-950/20 sm:p-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-500/20 text-lg">
              🤖
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-sm font-bold text-zinc-900 dark:text-zinc-100 sm:text-base">
                  {isHi ? 'सनातन एंड्रॉइड मोबाइल ऐप (शीघ्र उपलब्ध)' : 'Sanatan Android App (Coming Soon)'}
                </h3>
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:text-emerald-300">
                  Google Play
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
                Package: cc.sanatan.app • 100% Offline & Ad-Free
              </p>
            </div>
          </div>
          <a
            href="/privacy"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400"
          >
            <span>{isHi ? 'गोपनीयता नीति' : 'Privacy Policy'}</span>
            <span>→</span>
          </a>
        </div>

        <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
          {isHi
            ? 'शुद्ध वैदिक पञ्चाङ्ग, २४-घंटे शास्त्रीय दिनचर्या, हार्डवेयर अलार्म क्लॉक मुहूर्त अलर्ट एवं जप माला अब सीधे आपके एंड्रॉइड फोन पर उपलब्ध होंगे। गूगल प्ले स्टोर पर प्रकाशन हेतु प्रस्तुत।'
            : 'Get zero-approximation Vedic Panchang, 24-hour Dinacharya planner, hardware alarm muhurta reminders, and sacred Japa counter directly on your Android phone. Prepared for release on the Google Play Store.'}
        </p>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="rounded-xl bg-white/70 px-2.5 py-1 text-[11px] font-medium text-zinc-700 dark:bg-zinc-800/70 dark:text-zinc-300">
            ⚡ 100% Offline Autonomy
          </span>
          <span className="rounded-xl bg-white/70 px-2.5 py-1 text-[11px] font-medium text-zinc-700 dark:bg-zinc-800/70 dark:text-zinc-300">
            🚫 Zero Ads & Zero Trackers
          </span>
          <span className="rounded-xl bg-white/70 px-2.5 py-1 text-[11px] font-medium text-zinc-700 dark:bg-zinc-800/70 dark:text-zinc-300">
            📍 Offline Astronomical Math
          </span>
          <a
            href="/privacy"
            className="sm:hidden text-xs font-semibold text-emerald-700 underline dark:text-emerald-400 ml-auto"
          >
            {isHi ? 'गोपनीयता नीति →' : 'Privacy Policy →'}
          </a>
        </div>
      </div>

      {/* 6. About & Mission Card */}
      <div className="space-y-2 rounded-3xl border border-zinc-200/80 bg-white p-5 text-center shadow-xs dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
        <div className="text-xl">ॐ</div>
        <h3 className="font-serif text-base font-bold text-zinc-900 dark:text-zinc-100">
          {isHi ? 'सनातन दिनचर्या एवं पञ्चाङ्ग' : 'Sanatan Dinacharya & Panchang'}
        </h3>
        <p className="mx-auto max-w-xl text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
          {isHi
            ? 'शुद्ध गणितीय खगोलशास्त्र, नासा जेपीएल एफिमेरिस एवं महर्षि वराहमिहिर के सिद्धान्तों पर आधारित पूर्णतः नि:शुल्क एवं विज्ञापन-मुक्त सनातनी सेवा।'
            : 'Pure mathematical ephemeris with zero approximations, computed from NASA JPL & Jean Meeus first principles. Free and open-source.'}
        </p>
        <div className="pt-1 text-[11px] font-mono text-zinc-400">
          Version 1.0.0 • Open Source Dharma • CC0 1.0 Universal
        </div>
      </div>

      {/* 6. Feedback & Contact Card (Exact User Request) */}
      <div
        data-testid="settings-feedback-card"
        className="space-y-4 rounded-3xl border border-amber-500/25 bg-amber-500/5 p-5 dark:border-amber-400/20 dark:bg-amber-400/5 sm:p-6"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">💬</span>
          <h3 className="font-serif text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {isHi ? 'प्रतिक्रिया एवं सुझाव (Feedback & Contact)' : 'Feedback & Contact'}
          </h3>
        </div>

        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          {isHi
            ? 'सनातन दिनचर्या को और उत्तम बनाने हेतु आपके विचार, त्रुटि निवारण अथवा सुझाव सादर आमंत्रित हैं:'
            : 'We welcome your thoughts, suggestions, and feedback to improve this sacred seva:'}
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* Link 1: Sanatan Portal Feedback */}
          <a
            href="https://sanatan.cc/contact"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="feedback-link-sanatan"
            className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white p-3.5 shadow-xs transition hover:border-amber-400 hover:shadow-sm dark:border-zinc-700 dark:bg-zinc-800"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/15 text-lg text-amber-700 dark:text-amber-400">
                🌐
              </span>
              <div>
                <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  {isHi ? 'सनातन सम्पर्क एवं सुझाव' : 'Sanatan Portal Feedback'}
                </div>
                <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                  https://sanatan.cc/contact
                </div>
              </div>
            </div>
            <span className="text-zinc-400 text-sm">↗</span>
          </a>

          {/* Link 2: Developer Contact */}
          <a
            href="https://dhirajnavghare.com/contact"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="feedback-link-developer"
            className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white p-3.5 shadow-xs transition hover:border-amber-400 hover:shadow-sm dark:border-zinc-700 dark:bg-zinc-800"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/15 text-lg text-amber-700 dark:text-amber-400">
                👤
              </span>
              <div>
                <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  {isHi ? 'डेवलपर सम्पर्क (Dhiraj Navghare)' : 'Developer Contact (Dhiraj Navghare)'}
                </div>
                <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                  https://dhirajnavghare.com/contact
                </div>
              </div>
            </div>
            <span className="text-zinc-400 text-sm">↗</span>
          </a>
        </div>
      </div>

      {/* Modal 1: Edit Devotee Profile */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="text-xl">🕉️</span>
                <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  {isHi ? 'साधक परिचय सम्पादन' : 'Edit Devotee Profile'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsProfileModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  {isHi ? 'आपका नाम (Devotee Name):' : 'Your Name:'}
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="उदा. राहुल, प्रिया..."
                  className="mt-1 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 focus:border-amber-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  {isHi ? 'गोत्र (Gotra):' : 'Gotra:'}
                </label>
                <div className="mt-1 flex gap-2">
                  <input
                    type="text"
                    value={editGotra}
                    onChange={(e) => setEditGotra(e.target.value)}
                    placeholder="उदा. कश्यप, भारद्वाज..."
                    className="flex-1 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 focus:border-amber-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                  />
                  <select
                    onChange={(e) => {
                      if (e.target.value) setEditGotra(e.target.value);
                    }}
                    className="rounded-xl border border-zinc-200 bg-zinc-100 px-2 py-2 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 cursor-pointer"
                  >
                    <option value="">{isHi ? 'सूची से चुनें' : 'Select'}</option>
                    {POPULAR_GOTRAS.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  {isHi ? 'इष्ट देवता (Ishta Devata):' : 'Ishta Devata:'}
                </label>
                <div className="mt-1 flex gap-2">
                  <input
                    type="text"
                    value={editIshta}
                    onChange={(e) => setEditIshta(e.target.value)}
                    className="flex-1 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 focus:border-amber-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                  />
                  <select
                    onChange={(e) => {
                      if (e.target.value) setEditIshta(e.target.value);
                    }}
                    className="rounded-xl border border-zinc-200 bg-zinc-100 px-2 py-2 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 cursor-pointer"
                  >
                    <option value="">{isHi ? 'सूची से चुनें' : 'Select'}</option>
                    {POPULAR_ISHTA_DEVATAS.map((d) => (
                      <option key={d.id} value={isHi ? d.nameHi : d.name}>
                        {d.icon} {isHi ? d.nameHi : d.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  {isHi ? 'कुलदेवी / कुलदेवता (वैकल्पिक):' : 'Family Deity (Optional):'}
                </label>
                <input
                  type="text"
                  value={editKuldevi}
                  onChange={(e) => setEditKuldevi(e.target.value)}
                  placeholder="उदा. माँ शाकम्भरी, कुलदेवता..."
                  className="mt-1 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 focus:border-amber-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsProfileModalOpen(false)}
                  className="rounded-xl border border-zinc-200 px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  {isHi ? 'रद्द करें' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-amber-500 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-amber-600 cursor-pointer"
                >
                  {isHi ? 'सहेजें' : 'Save Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: 🧭 Prime Meridian & Location Selector Modal */}
      {isCityModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-xl max-h-[85vh] flex flex-col rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="text-xl">🧭</span>
                <div>
                  <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
                    {isHi ? 'प्रधान देशान्तर एवं नगर चयन' : 'Prime Meridian & City Selector'}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {isHi ? 'उज्जैन (0° शून्य देशान्तर) अथवा अपना नगर चुनें' : 'Ujjain (0° Prime Meridian) or select your city'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCityModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* GPS Auto-Detect Button */}
            <div className="mt-4">
              <button
                type="button"
                onClick={handleGpsDetect}
                disabled={isLocating}
                className="w-full flex items-center justify-center gap-2 rounded-2xl border border-amber-400/50 bg-amber-500/10 p-3 text-xs font-bold text-amber-800 hover:bg-amber-500/20 dark:text-amber-300 cursor-pointer disabled:opacity-50"
              >
                <span>{isLocating ? '⏳' : '🎯'}</span>
                <span>
                  {isLocating
                    ? isHi ? 'जीपीएस द्वारा स्थान खोजा जा रहा है...' : 'Detecting GPS coordinates...'
                    : isHi ? 'वर्तमान जीपीएस स्थान का उपयोग करें' : 'Detect My Exact GPS Coordinates'}
                </span>
              </button>
            </div>

            {/* List of Sacred Tirthas & Standard Cities */}
            <div className="mt-4 flex-1 overflow-y-auto space-y-2 pr-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                {isHi ? 'प्रमुख तीर्थ व शून्य देशान्तर (Ujjain 0° Prime Meridian)' : 'Sacred Tirthas & Standard Meridians'}
              </div>
              {PRESET_CITIES.map((c) => {
                const isSelected = location.name === c.name;
                return (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => handleSelectLocation(c)}
                    className={`w-full flex items-center justify-between rounded-xl p-3 text-left transition cursor-pointer ${
                      isSelected
                        ? 'border border-amber-500 bg-amber-50 dark:border-amber-400 dark:bg-amber-950/30'
                        : 'border border-zinc-100 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/60'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                        {c.name}
                      </div>
                      <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                        {c.latitude.toFixed(4)}° N, {c.longitude.toFixed(4)}° E • {c.timezone}
                      </div>
                    </div>
                    {isSelected && <span className="text-amber-600 font-bold text-sm">✓</span>}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 border-t border-zinc-100 pt-3 dark:border-zinc-800 flex justify-end">
              <button
                type="button"
                onClick={() => setIsCityModalOpen(false)}
                className="rounded-xl border border-zinc-200 px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 cursor-pointer"
              >
                {isHi ? 'बन्द करें' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
