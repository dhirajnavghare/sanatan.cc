'use client';

import { useLanguage } from '@/app/lib/i18n/LanguageContext';

export default function PrivacyClientView() {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  return (
    <div className="flex-1 bg-zinc-50/50 px-4 py-12 dark:bg-black sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300">
            <span>🔒</span>
            <span>{isHi ? 'गोपनीयता नीति' : 'Privacy Policy'}</span>
          </div>
          <h1 className="font-serif text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
            {isHi ? 'गोपनीयता संकल्प: शून्य ट्रैकर' : 'Privacy by Design: Zero Trackers'}
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {isHi
              ? 'प्रभावी तिथि: ३१ अक्टूबर २०२६ • अद्यतन: अक्टूबर २०२६'
              : 'Effective Date: October 31, 2026 • Last updated: October 2026'}
          </p>
        </div>

        <div className="space-y-6 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
          <section className="space-y-2 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="font-serif text-base font-bold text-zinc-900 dark:text-zinc-100">
              {isHi ? '१. व्यक्तिगत डेटा का शून्य संकलन' : '1. No Personal Data Collection'}
            </h2>
            <p>
              {isHi
                ? 'sanatan.cc किसी भी प्रकार के व्यक्तिगत डेटा का संकलन, विक्रय या साझा नहीं करता है। यहाँ उपयोगकर्ता पंजीकरण की कोई बाध्यता नहीं है, न ही कोई विज्ञापन कोड अथवा ट्रैकिंग कुकीज हैं।'
                : 'sanatan.cc does not collect, sell, or rent personal data. There are no user account registration requirements, no advertising SDKs, and no tracking cookies.'}
            </p>
          </section>

          <section className="space-y-2 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="font-serif text-base font-bold text-zinc-900 dark:text-zinc-100">
              {isHi ? '२. भौगोलिक निर्देशांक एवं लोकल स्टोरेज' : '2. Geographical Coordinates & Local Storage'}
            </h2>
            <p>
              {isHi
                ? 'जब आप किसी नगर का चयन करते हैं अथवा अक्षांश और देशान्तर निर्देशांक प्रविष्ट करते हैं, तो वे वास्तविक समय की पञ्चाङ्ग गणना हेतु प्रयुक्त होते हैं। आपकी सुविधा के लिए यह केवल आपके उपकरण के लोकल स्टोरेज (localStorage) में सुरक्षित रहता है और कभी किसी सर्वर डेटाबेस में नहीं भेजा जाता।'
                : 'When you select a city or enter custom Latitude and Longitude coordinates, those coordinates are processed for real-time ephemeris calculations without logging or persistent storage. Any custom location preferences are saved exclusively in your browser’s local storage (localStorage) so your preferences persist between visits. Your personal coordinates are never stored in databases or shared with third parties.'}
            </p>
          </section>

          <section className="space-y-2 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="font-serif text-base font-bold text-zinc-900 dark:text-zinc-100">
              {isHi ? '३. एनालिटिक्स एवं कुकीज से पूर्ण मुक्ति' : '3. Analytics & Cookies'}
            </h2>
            <p>
              {isHi
                ? 'हम गूगल एनालिटिक्स, मेटा पिक्सेल अथवा किसी भी व्यावसायिक ट्रैकिंग उपकरण का उपयोग नहीं करते हैं। हमारा अटूट विश्वास है कि सनातन आध्यात्मिक ज्ञान एवं खगोलीय गणनाओं का अन्वेषण पूर्णतः निजी एवं सुरक्षित होना चाहिए।'
                : 'We do not use Google Analytics, Meta Pixel, or any commercial profiling scripts. We believe that access to ancient spiritual wisdom and astronomical calculation should be completely private.'}
            </p>
          </section>

          <section className="space-y-2 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="font-serif text-base font-bold text-zinc-900 dark:text-zinc-100">
              {isHi ? '४. प्रश्न एवं सम्पर्क' : '4. Inquiries'}
            </h2>
            <p>
              {isHi ? 'गोपनीयता सम्बन्धी किसी भी प्रश्न हेतु, कृपया हमसे ' : 'For any questions regarding privacy on sanatan.cc, please contact us at '}
              <a href="mailto:mail@sanatan.cc" className="font-bold text-amber-600 underline dark:text-amber-400">
                mail@sanatan.cc
              </a>
              {isHi ? ' पर सम्पर्क करें।' : '.'}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
