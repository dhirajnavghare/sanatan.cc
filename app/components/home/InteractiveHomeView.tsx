'use client';

import { useState, useEffect } from 'react';
import { GeoLocation } from '@/app/lib/panchang/types';
import { PRESET_CITIES } from '@/app/lib/panchang/constants';
import CosmicCommandBar from './CosmicCommandBar';
import HeroCosmicSnapshot from './HeroCosmicSnapshot';
import LiveChoghadiyaClock from './LiveChoghadiyaClock';
import QuickMuhurtaWizard from './QuickMuhurtaWizard';
import UpcomingFestivalsStrip from './UpcomingFestivalsStrip';
import InteractiveAppsGrid from './InteractiveAppsGrid';
import TemplesSpotlight from './TemplesSpotlight';
import DailyMantraJapa from './DailyMantraJapa';
import EphemerisTechPillars from './EphemerisTechPillars';

export default function InteractiveHomeView() {
  const [location, setLocation] = useState<GeoLocation>(PRESET_CITIES[0]);

  // Load custom location from localStorage if saved
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const saved = localStorage.getItem('panchang_custom_location');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (
            typeof parsed.latitude === 'number' &&
            typeof parsed.longitude === 'number' &&
            parsed.timezone
          ) {
            setLocation(parsed);
          }
        }
      } catch {}
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleLocationChange = (newLoc: GeoLocation) => {
    setLocation(newLoc);
    try {
      localStorage.setItem('panchang_custom_location', JSON.stringify(newLoc));
    } catch {}
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-8 font-sans sm:px-6 sm:py-12 lg:px-8">
      <div className="flex w-full max-w-5xl flex-col gap-10">
        {/* Universal Cosmic Search Command Bar */}
        <CosmicCommandBar />

        {/* Hero: Today's Live Cosmic Pancha-Anga Snapshot */}
        <HeroCosmicSnapshot
          location={location}
          onLocationChange={handleLocationChange}
        />

        {/* Live Choghadiya 16-Period Cosmic Clock */}
        <LiveChoghadiyaClock location={location} />

        {/* Instant Muhurta Discovery Wizard */}
        <QuickMuhurtaWizard location={location} />

        {/* Upcoming Sacred Festivals & Vrats Strip */}
        <UpcomingFestivalsStrip location={location} />

        {/* 5 Core Applications Hub */}
        <InteractiveAppsGrid />

        {/* Sacred Temples & Holy Circuits Spotlight */}
        <TemplesSpotlight />

        {/* Daily Sacred Mantra & Interactive 108 Japa Counter */}
        <DailyMantraJapa />

        {/* Ephemeris Precision & Technology Explainer */}
        <EphemerisTechPillars />
      </div>
    </div>
  );
}
