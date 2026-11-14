import { Suspense } from 'react';
import type { Metadata } from 'next';
import SettingsClientView from './SettingsClientView';

export const metadata: Metadata = {
  title: 'Settings & Preferences — Sanatan Dinacharya & Panchang | sanatan.cc',
  description:
    'Customize your sacred devotee profile, Gotra, Ishta Devata, Prime Meridian & City Location, regional Purnimanta/Amanta calendar, audio chimes, and offline autonomy preferences.',
  alternates: {
    canonical: '/settings',
  },
};

export default function SettingsPage() {
  return (
    <div className="flex-1 bg-zinc-50/50 px-4 py-8 dark:bg-black sm:px-6 lg:px-8">
      <Suspense
        fallback={
          <div className="mx-auto max-w-4xl py-16 text-center text-sm text-zinc-500 dark:text-zinc-400">
            Loading settings & preferences...
          </div>
        }
      >
        <SettingsClientView />
      </Suspense>
    </div>
  );
}
