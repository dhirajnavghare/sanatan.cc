import { Suspense } from 'react';
import type { Metadata } from 'next';
import FestivalsView from '@/app/components/festivals/FestivalsView';

export const metadata: Metadata = {
  title: 'Hindu Festival Timeline & Calendar (सनातन उत्सव एवं व्रत) | sanatan.cc',
  description:
    'Complete timeline of Hindu festivals, Vrats, Ekadashi dates, and Jayantis calculated from first-principles astronomical ephemeris (Drik Panchang, Dharmasindhu, Nirnayasindhu) with exact puja muhurta timings, Vedic significance, and ritual guidelines.',
  alternates: {
    canonical: '/festivals',
  },
  openGraph: {
    title: 'Hindu Festival Timeline & Calendar | sanatan.cc',
    description:
      'Astronomically precise annual calendar of Hindu festivals, Vrats, and sacred observances with puja muhurtas, significance, and daily Panchang integration.',
    url: 'https://sanatan.cc/festivals',
    siteName: 'sanatan.cc',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hindu Festival Timeline & Calendar | sanatan.cc',
    description:
      'Explore Hindu festivals and fasting days calculated with Drik Panchang ephemeris precision for any city on Earth.',
  },
};

export default function FestivalsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemTimeline',
    name: 'Hindu Festival Timeline & Calendar — sanatan.cc',
    description:
      'Annual chronological timeline of Hindu festivals, fasts, Ekadashi observances, and sacred Vedic holidays calculated from astronomical ephemeris.',
    url: 'https://sanatan.cc/festivals',
    inLanguage: ['en', 'hi', 'sa'],
    publisher: {
      '@type': 'Organization',
      name: 'sanatan.cc',
      url: 'https://sanatan.cc',
      logo: 'https://sanatan.cc/icon.png',
    },
  };

  return (
    <div className="flex-1 bg-zinc-50/50 px-4 py-6 dark:bg-black sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-5xl">
        <Suspense
          fallback={
            <div className="mx-auto max-w-5xl py-16 text-center text-sm text-zinc-500 dark:text-zinc-400">
              Calculating Hindu festival timeline from astronomical ephemeris...
            </div>
          }
        >
          <FestivalsView />
        </Suspense>
      </div>
    </div>
  );
}
