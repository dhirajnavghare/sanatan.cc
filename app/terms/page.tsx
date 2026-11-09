import type { Metadata } from 'next';
import TermsClientView from './TermsClientView';

export const metadata: Metadata = {
  title: 'Terms of Service — sanatan.cc',
  description:
    'Terms of service, open-source software license, and calculation disclaimers for sanatan.cc.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  return <TermsClientView />;
}
