'use client';

import { useState, useEffect, useMemo } from 'react';
import { GeoLocation, PanchangData } from '@/app/lib/panchang/types';
import { PRESET_CITIES } from '@/app/lib/panchang/constants';
import { calculatePanchang } from '@/app/lib/panchang';
import { useLanguage } from '@/app/lib/i18n/LanguageContext';
import {
  loadUserProfile,
  saveUserProfile,
  loadUserLocation,
  saveUserLocation,
  UserSacredProfile,
  DEFAULT_USER_PROFILE,
} from '@/app/lib/services/userProfile';
import { getTodayVratGuidance } from '@/app/lib/services/vratGuidelines';
import { calculateEkadashiParana } from '@/app/lib/services/vratParana';
import { getDayPlans, DayPlansMap } from '@/app/lib/services/dayplanner';
import { getDateKey } from '@/app/lib/services/sadhana';
import { triggerHaptic } from '@/app/lib/services/sacredAudio';

import CosmicCommandBar from './CosmicCommandBar';
import HeroCosmicSnapshot from './HeroCosmicSnapshot';
import SacredWeekStrip from './SacredWeekStrip';
import LiveCosmicCompass from './LiveCosmicCompass';
import VratHeroCard from './VratHeroCard';
import SacredAlignmentHub from './SacredAlignmentHub';
import DailyRashiCard from './DailyRashiCard';
import InauspiciousTriadCard from './InauspiciousTriadCard';
import DayPlannerSection from './DayPlannerSection';
import MonthlyCalendarGrid from './MonthlyCalendarGrid';
import LiveChoghadiyaClock from './LiveChoghadiyaClock';
import QuickMuhurtaWizard from './QuickMuhurtaWizard';
import UpcomingFestivalsStrip from './UpcomingFestivalsStrip';
import InteractiveAppsGrid from './InteractiveAppsGrid';
import TemplesSpotlight from './TemplesSpotlight';
import DailyMantraJapa from './DailyMantraJapa';
import EphemerisTechPillars from './EphemerisTechPillars';

export default function InteractiveHomeView() {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const [currentDate, setCurrentDate] = useState<Date>(() => new Date());
  const [viewMode, setViewMode] = useState<'daily' | 'planner' | 'monthly'>('daily');
  const [location, setLocation] = useState<GeoLocation>(PRESET_CITIES[0]);
  const [userProfile, setUserProfile] = useState<UserSacredProfile>(DEFAULT_USER_PROFILE);
  const [dayPlans, setDayPlans] = useState<DayPlansMap>({});

  const dateKey = useMemo(() => getDateKey(currentDate), [currentDate]);

  // Load custom location & user profile on mount
  useEffect(() => {
    loadUserLocation().then(setLocation);
    loadUserProfile().then(setUserProfile);
  }, []);

  useEffect(() => {
    getDayPlans(dateKey).then(setDayPlans);
  }, [dateKey]);

  const handleLocationChange = async (newLoc: GeoLocation) => {
    setLocation(newLoc);
    await saveUserLocation(newLoc);
  };

  const handleSaveRashi = async (rashiIdx: number) => {
    const updated = { ...userProfile, rashi: rashiIdx };
    setUserProfile(updated);
    await saveUserProfile(updated);
  };

  // Compute live panchang data for current date & location
  const panchang: PanchangData = useMemo(() => {
    return calculatePanchang(currentDate, location, 'Lahiri', currentDate);
  }, [currentDate, location]);

  const vratGuidance = useMemo(() => {
    return getTodayVratGuidance(panchang, currentDate, location.timezone);
  }, [panchang, currentDate, location.timezone]);

  const paranaInfo = useMemo(() => {
    return calculateEkadashiParana(panchang, location, currentDate);
  }, [panchang, location, currentDate]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-8 font-sans sm:px-6 sm:py-12 lg:px-8">
      <div className="flex w-full max-w-5xl flex-col gap-8">
        {/* Universal Cosmic Search Command Bar */}
        <CosmicCommandBar />

        {/* 1. Horizontal 7-Day Sacred Horizon Strip */}
        <SacredWeekStrip
          currentDate={currentDate}
          onSelectDate={(d) => setCurrentDate(d)}
          isHi={isHi}
        />

        {/* View Mode Switcher: Daily vs Planner vs Monthly Calendar Grid */}
        <div className="flex items-center justify-center gap-2 rounded-2xl border border-zinc-200/80 bg-white/80 p-1.5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900/80">
          <button
            type="button"
            data-testid="view-mode-daily-btn"
            onClick={() => {
              triggerHaptic('tap');
              setViewMode('daily');
            }}
            className={`flex-1 rounded-xl py-2 text-xs font-bold transition cursor-pointer text-center ${
              viewMode === 'daily'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
            }`}
          >
            {isHi ? '☀️ पञ्चाङ्ग' : '☀️ Panchang'}
          </button>

          <button
            type="button"
            data-testid="view-mode-planner-btn"
            onClick={() => {
              triggerHaptic('tap');
              setViewMode('planner');
            }}
            className={`flex-1 rounded-xl py-2 text-xs font-bold transition cursor-pointer text-center ${
              viewMode === 'planner'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
            }`}
          >
            {isHi ? '🗓️ दिन योजना' : '🗓️ Day Planner'}
          </button>

          <button
            type="button"
            data-testid="view-mode-monthly-btn"
            onClick={() => {
              triggerHaptic('tap');
              setViewMode('monthly');
            }}
            className={`flex-1 rounded-xl py-2 text-xs font-bold transition cursor-pointer text-center ${
              viewMode === 'monthly'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
            }`}
          >
            {isHi ? '📅 मासिक ग्रिड' : '📅 Monthly Grid'}
          </button>
        </div>

        {/* 2. PLANNER VIEW MODE */}
        {viewMode === 'planner' && (
          <div data-testid="planner-view-mode-container" className="space-y-6">
            <DayPlannerSection
              panchang={panchang}
              dateKey={dateKey}
              dayPlans={dayPlans}
              onPlansChange={setDayPlans}
              timezone={location.timezone}
              isHi={isHi}
            />
            <InauspiciousTriadCard
              panchang={panchang}
              timezone={location.timezone}
              isHi={isHi}
            />
            <div className="text-center">
              <button
                type="button"
                onClick={() => setViewMode('daily')}
                className="inline-flex items-center gap-1.5 rounded-2xl bg-amber-500 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-amber-600 cursor-pointer"
              >
                <span>{isHi ? '☀️ सम्पूर्ण दैनिक पञ्चाङ्ग देखें →' : '☀️ View Full Daily Panchang →'}</span>
              </button>
            </div>
          </div>
        )}

        {/* 3. MONTHLY CALENDAR GRID VIEW MODE */}
        {viewMode === 'monthly' && (
          <MonthlyCalendarGrid
            currentDate={currentDate}
            onSelectDate={(d) => {
              setCurrentDate(d);
              setViewMode('daily');
            }}
            location={location}
            isHi={isHi}
          />
        )}

        {/* 4. DAILY PANCHANG VIEW MODE (Default) */}
        {viewMode === 'daily' && (
          <>
            {/* Sacred Vrat Hero Card (Sankashti, Ekadashi, Pradosha, Purnima) */}
            <VratHeroCard
              vrat={vratGuidance}
              paranaInfo={paranaInfo}
              isHi={isHi}
            />

            {/* Live Cosmic Compass (Now & Next instant guidance) */}
            <LiveCosmicCompass
              panchang={panchang}
              timezone={location.timezone}
              isHi={isHi}
              dayPlans={dayPlans}
            />

            {/* Hero: Today's Live Cosmic Pancha-Anga Snapshot */}
            <HeroCosmicSnapshot
              location={location}
              onLocationChange={handleLocationChange}
            />

            {/* Sacred Alignment Hub (Daily Sadhana + Vedic Sankalpa) */}
            <SacredAlignmentHub
              panchang={panchang}
              locationName={location.name}
              userName={userProfile.name}
              gotra={userProfile.gotra}
              isHi={isHi}
            />

            {/* Daily Satvik Rashi Guidance (Vedic Gochara & Remedies) */}
            <DailyRashiCard
              moonRashiIndex={panchang.moonRashi?.current?.index ?? 0}
              savedRashiIndex={userProfile.rashi}
              onSaveRashi={handleSaveRashi}
              isHi={isHi}
            />

            {/* Hindu Day Planner Section */}
            <DayPlannerSection
              panchang={panchang}
              dateKey={dateKey}
              dayPlans={dayPlans}
              onPlansChange={setDayPlans}
              timezone={location.timezone}
              isHi={isHi}
            />

            {/* Inauspicious Triad (Rahu Kaal, Yamagandam, Gulika Kaal) */}
            <InauspiciousTriadCard
              panchang={panchang}
              timezone={location.timezone}
              isHi={isHi}
            />

            {/* Live Choghadiya 16-Period Cosmic Clock */}
            <LiveChoghadiyaClock location={location} />

            {/* Instant Muhurta Discovery Wizard */}
            <QuickMuhurtaWizard location={location} />

            {/* Upcoming Sacred Festivals & Vrats Strip */}
            <UpcomingFestivalsStrip location={location} />

            {/* Android Mobile App Coming Soon Showcase Banner */}
            <div
              data-testid="home-android-app-banner"
              className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-amber-950/30 p-6 shadow-sm backdrop-blur-md"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/20 text-base">
                      🤖
                    </span>
                    <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
                      GOOGLE PLAY STORE • COMING SOON
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-white sm:text-xl">
                    {isHi
                      ? 'सनातन एंड्रॉइड मोबाइल ऐप • शीघ्र उपलब्ध'
                      : 'Sanatan Android App • Coming Soon to Google Play'}
                  </h3>
                  <p className="max-w-2xl text-xs text-zinc-300 leading-relaxed">
                    {isHi
                      ? '१००% ऑफ़लाइन वैदिक पञ्चाङ्ग, २४-घंटे शास्त्रीय दिनचर्या, हार्डवेयर अलार्म मुहूर्त अलर्ट एवं जप माला। बिना इंटरनेट, बिना विज्ञापन और पूर्ण गोपनीयता के साथ।'
                      : 'Zero-approximation Vedic Panchang, 24-hour Dinacharya planner, hardware alarm muhurta reminders, and sacred Japa counter. 100% offline, zero ads, and complete data privacy.'}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 self-stretch md:self-auto">
                  <a
                    href="/privacy"
                    className="flex-1 md:flex-initial rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-center text-xs font-semibold text-white hover:bg-white/20 transition cursor-pointer"
                  >
                    {isHi ? 'गोपनीयता नीति (Privacy)' : 'Data Safety & Privacy'}
                  </a>
                  <a
                    href="/settings"
                    className="flex-1 md:flex-initial rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-2 text-center text-xs font-bold text-white shadow-sm hover:from-emerald-500 hover:to-emerald-400 transition cursor-pointer"
                  >
                    {isHi ? 'विवरण देखें' : 'View Details'}
                  </a>
                </div>
              </div>
            </div>

            {/* 5 Core Applications Hub */}
            <InteractiveAppsGrid />

            {/* Sacred Temples & Holy Circuits Spotlight */}
            <TemplesSpotlight />

            {/* Daily Sacred Mantra & Interactive 108 Japa Counter */}
            <DailyMantraJapa />

            {/* Ephemeris Precision & Technology Explainer */}
            <EphemerisTechPillars />
          </>
        )}
      </div>
    </div>
  );
}
