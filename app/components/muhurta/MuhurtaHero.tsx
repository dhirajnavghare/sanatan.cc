'use client';

import { GeoLocation } from '@/app/lib/panchang/types';
import { useLanguage } from '@/app/lib/i18n/LanguageContext';

interface MuhurtaHeroProps {
  location: GeoLocation;
  onOpenLocationModal: () => void;
}

export default function MuhurtaHero({ location, onOpenLocationModal }: MuhurtaHeroProps) {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#121333] via-[#1a1c50] to-[#0a0b22] p-6 text-white shadow-xl ring-1 ring-white/10 sm:p-8">
      {/* Decorative celestial background aura */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-indigo-500/15 blur-3xl" />

      <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
        {/* Left Headline */}
        <div className="space-y-2.5 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-serif text-2xl font-bold tracking-wide text-amber-400 sm:text-3xl">
              {isHi ? 'शुभ मुहूर्त शोधक' : 'Shubh Muhurta Finder'}
            </span>
            <button
              type="button"
              data-testid="location-modal-trigger"
              onClick={onOpenLocationModal}
              className="cursor-pointer inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-200 transition hover:bg-amber-400/20 backdrop-blur-sm"
              title={isHi ? 'अक्षांश/रेखांश बदलने हेतु क्लिक करें' : 'Click to edit precise coordinates or change location'}
            >
              <span>📍</span>
              <span className="max-w-[180px] truncate sm:max-w-[220px]">{location.name}</span>
              <span className="text-[10px] text-amber-400/80">
                ({location.latitude.toFixed(2)}°, {location.longitude.toFixed(2)}°)
              </span>
              <span className="text-amber-400/60">✏️</span>
            </button>
            <a
              href={`mailto:mail@sanatan.cc?subject=Shubh%20Muhurta%20Feedback&body=Location%3A%20${encodeURIComponent(location.name)}`}
              className="hidden items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-amber-200 transition hover:bg-white/20 hover:text-white backdrop-blur-sm sm:inline-flex"
              title={isHi ? 'प्रतिक्रिया mail@sanatan.cc पर भेजें' : 'Send feedback or calculation validation notes to mail@sanatan.cc'}
            >
              <span>✉️</span>
              <span>{isHi ? 'प्रतिक्रिया भेजें' : 'Send Feedback'}</span>
            </a>
          </div>

          <h1 className="font-serif text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
            {isHi ? 'शुभ मुहूर्त अन्वेषक' : 'Auspicious Muhurta Horizons'}
          </h1>

          <p className="text-xs leading-relaxed text-indigo-200 sm:text-sm">
            {isHi
              ? 'मुहूर्तचिन्तामणि एवं बृहत्संहिता जैसे प्रामाणिक ग्रन्थों पर आधारित ३० से १८० दिनों के भीतर श्रेष्ठ तिथियों तथा दिन के शुभ मुहूर्तों की यथार्थ गणना। आपके सटीक अक्षांश-रेखांश के अनुसार तिथि, नक्षत्र, योग, करण, भद्रा परिहार तथा ग्रह चौघड़िया का सूक्ष्म विश्लेषण।'
              : 'Algorithmic discovery of optimal dates and daytime time windows across 30 to 180 days based on authentic classical scriptures (Muhurta Chintamani & Brihat Samhita). Real-time evaluation of Tithi, Nakshatra, Yoga, Karana, Bhadra exclusion, and planetary Choghadiya localized to your exact coordinates.'}
          </p>
        </div>

        {/* Right Action / Visual Feature Badge */}
        <div className="flex flex-col gap-2 md:items-end">
          <div className="inline-flex items-center gap-2 rounded-2xl border border-amber-400/30 bg-amber-400/10 px-4 py-2.5 backdrop-blur-md">
            <span className="text-2xl">✨</span>
            <div>
              <div className="text-xs font-bold text-amber-200">
                {isHi ? 'शून्य सारिणी हार्डकोडिंग' : 'Zero Tabular Hardcoding'}
              </div>
              <div className="text-[10px] text-indigo-200">
                {isHi ? 'शुद्ध खगोलीय त्रिकोणमिति' : 'Pure Ephemeris Trigonometry'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Feature Pillars Row */}
      <div className="relative mt-6 grid grid-cols-2 gap-2.5 border-t border-white/10 pt-5 sm:grid-cols-4">
        <div className="rounded-2xl bg-white/5 p-3 backdrop-blur-sm border border-white/5">
          <span className="block text-[11px] font-medium uppercase tracking-wider text-amber-300">
            {isHi ? '📜 शास्त्रीय नियम' : '📜 Classical Rules'}
          </span>
          <span className="mt-1 block text-xs font-bold text-white">
            {isHi ? 'षोडश संस्कार विधि' : 'Shodash Samskara Rules'}
          </span>
          <span className="text-[10px] text-indigo-200">
            {isHi ? 'मुहूर्तचिन्तामणि ग्रन्थ' : 'Muhurta Chintamani text'}
          </span>
        </div>

        <div className="rounded-2xl bg-white/5 p-3 backdrop-blur-sm border border-white/5">
          <span className="block text-[11px] font-medium uppercase tracking-wider text-amber-300">
            {isHi ? '✨ सिद्धि योग' : '✨ Siddhi Yogas'}
          </span>
          <span className="mt-1 block text-xs font-bold text-white">
            {isHi ? 'सर्वार्थ एवं अमृत सिद्धि' : 'Sarvartha & Amrita'}
          </span>
          <span className="text-[10px] text-indigo-200">
            {isHi ? 'गुरु पुष्य एवं रवि पुष्य' : 'Guru Pushya & Ravi Pushya'}
          </span>
        </div>

        <div className="rounded-2xl bg-white/5 p-3 backdrop-blur-sm border border-white/5">
          <span className="block text-[11px] font-medium uppercase tracking-wider text-amber-300">
            {isHi ? '⛔ दोष परिहार' : '⛔ Dosha Filters'}
          </span>
          <span className="mt-1 block text-xs font-bold text-white">
            {isHi ? 'भद्रा एवं रिक्ता तिथि' : 'Bhadra & Rikta Tithis'}
          </span>
          <span className="text-[10px] text-indigo-200">
            {isHi ? 'मृत्यु / अग्नि पञ्चक' : 'Mrityu / Agni Panchakas'}
          </span>
        </div>

        <div className="rounded-2xl bg-white/5 p-3 backdrop-blur-sm border border-white/5">
          <span className="block text-[11px] font-medium uppercase tracking-wider text-amber-300">
            {isHi ? '⏱ दिनमान मुहूर्त' : '⏱ Daytime Windows'}
          </span>
          <span className="mt-1 block text-xs font-bold text-white">
            {isHi ? 'गतिक चौघड़िया लग्न' : 'Dynamic Choghadiyas'}
          </span>
          <span className="text-[10px] text-indigo-200">
            {isHi ? 'सूर्योदय-सूर्यास्त काल विभाजन' : 'Exact solar rise & set divisions'}
          </span>
        </div>
      </div>
    </div>
  );
}
