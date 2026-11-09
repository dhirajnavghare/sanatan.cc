import { Suspense } from 'react';
import type { Metadata } from 'next';
import DevatasView from '@/app/components/devatas/DevatasView';
import { DEITIES_DATABASE, TRADITIONS_CONFIG } from '@/app/lib/devatas/data';

export const metadata: Metadata = {
  title: 'Hindu Devi Devatas | सनातन देवी-देवता दर्शन, महामन्त्र एवं तत्त्व | sanatan.cc',
  description:
    'Explore the divine forms (Svarupa), Vedic philosophy (Tatva), sacred Sanskrit mantras with English translations, major historic temples, and traditional rituals of Hindu deities including Shiva, Vishnu, Durga, Ganesha, Krishna, Rama, Hanuman, Lakshmi, Saraswati, Surya, Kartikeya, and Kali.',
  alternates: {
    canonical: '/devatas',
  },
  openGraph: {
    title: 'Hindu Devi Devatas | सनातन देवी-देवता दर्शन एवं महामन्त्र | sanatan.cc',
    description:
      'Divine forms, authentic Sanskrit mantras, Vedic philosophy, and historic temples of sacred Hindu deities, integrated with the daily Vedic Panchang.',
    url: 'https://sanatan.cc/devatas',
    siteName: 'sanatan.cc',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hindu Devi Devatas | सनातन देवी-देवता दर्शन | sanatan.cc',
    description:
      'Sacred forms, Vedic tatva, mantras with English meanings, and temples of Hindu deities.',
  },
};

export default function DevatasPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Hindu Sanatan Devi Devatas — sanatan.cc',
    description:
      'Vedic repository of Hindu deities, divine forms, sacred Sanskrit mantras, traditional offerings, and historic pilgrimage temples.',
    url: 'https://sanatan.cc/devatas',
    inLanguage: ['en', 'hi', 'sa'],
    publisher: {
      '@type': 'Organization',
      name: 'sanatan.cc',
      url: 'https://sanatan.cc',
      logo: 'https://sanatan.cc/icon.png',
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: DEITIES_DATABASE.map((deity, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: deity.name,
        description: deity.subtitle,
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
              Loading sacred Hindu Devi Devatas repository...
            </div>
          }
        >
          <DevatasView
            initialDeities={DEITIES_DATABASE}
            traditions={TRADITIONS_CONFIG}
          />
        </Suspense>
      </div>
    </div>
  );
}
