import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WebMcpRegistry from './components/WebMcpRegistry';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sanatan.cc'),
  title: {
    default: 'sanatan.cc — Hindu Dharma spiritual texts, articles, and applications',
    template: '%s | sanatan.cc',
  },
  description:
    'An open-source repository dedicated to preserving and sharing Hindu Dharma spiritual texts, articles, content, and high-precision Vedic astronomical ephemeris (Panchang & Shubh Muhurta Finder).',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'sanatan.cc — Hindu Dharma Spiritual Texts & High-Precision Vedic Ephemeris',
    description:
      'Open-source Vedic calendar, high-precision astronomical Panchang, and classical Shubh Muhurta discovery engine.',
    url: 'https://sanatan.cc',
    siteName: 'sanatan.cc',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'sanatan.cc — Vedic Wisdom & Mathematical Ephemeris',
    description:
      'Open-source Hindu Dharma spiritual texts and calculation-based Vedic astronomical Panchang.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://sanatan.cc/#organization',
      name: 'sanatan.cc',
      url: 'https://sanatan.cc',
      logo: 'https://sanatan.cc/favicon.ico',
      description:
        'Open-source digital initiative dedicated to authentic preservation of Hindu Dharma spiritual texts, high-precision mathematical astrology, and Vedic astronomical ephemeris.',
      email: 'mail@sanatan.cc',
      sameAs: [
        'https://github.com/dhirajnavghare/sanatan.cc',
        'https://twitter.com/sanatan_cc',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'mail@sanatan.cc',
        contactType: 'technical support',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://sanatan.cc/#website',
      url: 'https://sanatan.cc',
      name: 'sanatan.cc',
      description:
        'Vedic knowledge, high-precision calculation-based Hindu Panchang, and classical Shubh Muhurta Finder applications.',
      publisher: {
        '@id': 'https://sanatan.cc/#organization',
      },
      inLanguage: ['en', 'hi', 'sa'],
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://sanatan.cc/panchang#app',
      name: 'High-Precision Vedic Panchang',
      applicationCategory: 'ReferenceApplication',
      operatingSystem: 'All',
      url: 'https://sanatan.cc/panchang',
      description:
        'Real-time astronomical Vedic Panchang computing Tithi, Nakshatra, Yoga, Karana, Vara, Shubh Muhurtas, and Choghadiyas locally for exact latitude, longitude, and elevation.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      publisher: {
        '@id': 'https://sanatan.cc/#organization',
      },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://sanatan.cc/muhurta#app',
      name: 'Shubh Muhurta Finder',
      applicationCategory: 'ReferenceApplication',
      operatingSystem: 'All',
      url: 'https://sanatan.cc/muhurta',
      description:
        'Algorithmic discovery of auspicious dates and daytime Choghadiya windows for Griha Pravesh, Vivaha, Vehicle Purchase, Business Start, and Property Registration based on classical scriptures.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      publisher: {
        '@id': 'https://sanatan.cc/#organization',
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-50">
        <WebMcpRegistry />
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
