import type { Metadata } from 'next';
import AboutClientView from './AboutClientView';

export const metadata: Metadata = {
  title: 'About sanatan.cc — Mission, Open Source & Vedic Ephemeris',
  description:
    'sanatan.cc is an open-source initiative dedicated to authentic preservation of Hindu Dharma spiritual texts and high-precision astronomical Vedic calculations.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return <AboutClientView />;
}
