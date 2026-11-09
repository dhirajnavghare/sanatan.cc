import type { Metadata } from 'next';
import ContactClientView from './ContactClientView';

export const metadata: Metadata = {
  title: 'Contact & Community Feedback — sanatan.cc',
  description:
    'Contact the sanatan.cc project maintainers, submit mathematical verification notes, or contribute to open-source Vedic knowledge preservation.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return <ContactClientView />;
}
