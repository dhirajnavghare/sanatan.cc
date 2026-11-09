import type { Metadata } from 'next';
import PrivacyClientView from './PrivacyClientView';

export const metadata: Metadata = {
  title: 'Privacy Policy — sanatan.cc',
  description:
    'Privacy Policy for sanatan.cc — Zero trackers, zero advertising, and complete data privacy.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  return <PrivacyClientView />;
}
