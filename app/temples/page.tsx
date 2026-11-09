import { Suspense } from 'react';
import type { Metadata } from 'next';
import TemplesView from '@/app/components/temples/TemplesView';
import { TEMPLES_DATABASE, CIRCUITS_CONFIG } from '@/app/lib/temples/data';

export const metadata: Metadata = {
  title: 'Hindu Sanatan Temples & Tirthas | सनातन तीर्थ एवं दिव्य मन्दिर | sanatan.cc',
  description:
    'Explore the sacred Hindu pilgrimage shrines: 12 Jyotirlingas (Kashi, Mahakaleshwar, Somnath, Kedarnath), 4 Char Dhams (Badrinath, Puri, Dwarka, Rameswaram), Shakti Peethas (Kamakhya, Vaishno Devi, Kalighat), and Pancha Bhoota Sthalams with authentic Puranic lore, darshan timings, sacred rivers, and real-time Vedic Panchang integration.',
  alternates: {
    canonical: '/temples',
  },
  openGraph: {
    title: 'Hindu Sanatan Temples & Tirthas | सनातन तीर्थ एवं मन्दिर | sanatan.cc',
    description:
      'Pilgrimage guide to sacred Hindu temples, 12 Jyotirlingas, 4 Char Dhams, Shakti Peethas, and Pancha Bhoota Sthalams, integrated with real-time astronomical Panchang.',
    url: 'https://sanatan.cc/temples',
    siteName: 'sanatan.cc',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hindu Sanatan Temples & Tirthas | सनातन तीर्थ दर्शन | sanatan.cc',
    description:
      'Explore sacred Hindu temples, 12 Jyotirlingas, 4 Char Dhams, and Shakti Peethas with authentic lore and darshan timings.',
  },
};

export default function TemplesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Hindu Sanatan Temples & Tirthas — sanatan.cc',
    description:
      'Comprehensive pilgrimage repository of sacred Hindu temples, Jyotirlingas, Char Dhams, and Shakti Peethas with verified coordinates and astronomical alignment.',
    url: 'https://sanatan.cc/temples',
    inLanguage: ['en', 'hi', 'sa'],
    publisher: {
      '@type': 'Organization',
      name: 'sanatan.cc',
      url: 'https://sanatan.cc',
      logo: 'https://sanatan.cc/icon.png',
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: TEMPLES_DATABASE.map((temple, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: temple.name,
        description: temple.significance,
      })),
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
              Loading sacred Hindu Tirthas &amp; Temples repository...
            </div>
          }
        >
          <TemplesView
            initialTemples={TEMPLES_DATABASE}
            circuits={CIRCUITS_CONFIG}
          />
        </Suspense>
      </div>
    </div>
  );
}
