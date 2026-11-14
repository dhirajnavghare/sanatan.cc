import type { Metadata } from 'next';
import PrivacyClientView from './PrivacyClientView';

export const metadata: Metadata = {
  title: 'Privacy Policy — Sanatan Panchang & Muhurta (cc.sanatan.app) | sanatan.cc',
  description:
    'Comprehensive Privacy Policy for the Sanatan Panchang & Muhurta Android application (package: cc.sanatan.app) and the sanatan.cc web portal. Zero trackers, zero advertising, offline autonomy, and complete data privacy.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  return <PrivacyClientView />;
}
