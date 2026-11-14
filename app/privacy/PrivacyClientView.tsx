'use client';

import Link from 'next/link';
import { useLanguage } from '@/app/lib/i18n/LanguageContext';

export default function PrivacyClientView() {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  return (
    <div className="flex-1 bg-zinc-50/50 px-4 py-12 dark:bg-black sm:px-6 lg:px-8 font-sans">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header Banner */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300">
              <span>🔒</span>
              <span>{isHi ? 'संयुक्त गोपनीयता नीति (Unified Privacy Policy)' : 'Unified Privacy Policy & Data Safety'}</span>
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-sky-500/25 bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-700 dark:text-sky-300">
              <span>🌐</span>
              <span>Web Application: sanatan.cc</span>
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
              <span>🤖</span>
              <span>Android App: cc.sanatan.app</span>
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-purple-500/25 bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-700 dark:text-purple-300">
              <span>🌱</span>
              <span>{isHi ? 'गैर-व्यापारी (Non-Trader Status)' : 'Non-Trader Status (EU DSA)'}</span>
            </span>
          </div>

          <h1 className="font-serif text-2xl font-extrabold tracking-tight text-zinc-950 sm:text-3xl dark:text-zinc-50">
            {isHi
              ? 'गोपनीयता संकल्प: १००% ऑफ़लाइन, शून्य ट्रैकर एवं स्थानीय गोपनीयता'
              : 'Privacy by Design: 100% Offline Autonomy & Zero Trackers'}
          </h1>

          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {isHi
              ? 'यह नीति "sanatan.cc" वेब पोर्टल एवं "सनातन पञ्चाङ्ग व मुहूर्त" एंड्रॉइड ऐप (cc.sanatan.app) दोनों पर संयुक्त रूप से लागू होती है • डेवलपर: धीरज नवघरे • अद्यतन: नवम्बर २०२६'
              : 'This policy governs both the "sanatan.cc" Web Application and the "Sanatan Panchang & Muhurta" Android Mobile App (cc.sanatan.app) • Developer: Dhiraj Navghare • Last Updated: November 2026'}
          </p>
        </div>

        {/* Executive Summary Card */}
        <div className="rounded-3xl border border-amber-500/30 bg-amber-500/5 p-5 dark:border-amber-400/20 dark:bg-amber-400/5 sm:p-6">
          <div className="flex items-center gap-2">
            <span className="text-xl">🛡️</span>
            <h2 className="font-serif text-sm font-bold text-zinc-900 dark:text-zinc-100 sm:text-base">
              {isHi ? 'मुख्य गोपनीयता सिद्धांत (वेबसाइट एवं मोबाइल ऍप)' : 'Executive Privacy Commitment (Web & Mobile)'}
            </h2>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
            {isHi
              ? 'सनातन पञ्चाङ्ग एवं दिनचर्या (वेबसाइट एवं एंड्रॉइड ऐप) एक पूर्णतः नि:शुल्क, विज्ञापन-मुक्त एवं धर्मनिष्ठ सेवा है। हम किसी भी उपयोगकर्ता का व्यक्तिगत डेटा, सम्पर्क सूची, फोन पहचानकर्ता या स्थान कभी भी किसी बाहरी सर्वर या तीसरे पक्ष को प्रेषित नहीं करते हैं। समस्त खगोलीय गणनाएं शत-प्रतिशत आपके ब्राउज़र अथवा फोन के भीतर ही स्थानीय रूप से सम्पन्न होती हैं।'
              : 'Sanatan Panchang & Muhurta (both website and Android app) is a completely free, ad-free sacred service. We do NOT collect, sell, rent, or transmit personal data, contacts, device identifiers, or location to any external servers or third parties. All astronomical calculations run 100% locally in your browser or phone hardware.'}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4 text-xs">
            <div className="rounded-xl bg-white/80 p-2.5 text-center font-bold text-zinc-800 shadow-xs dark:bg-zinc-800/80 dark:text-zinc-200">
              🚫 {isHi ? 'शून्य विज्ञापन' : 'Zero Ads'}
            </div>
            <div className="rounded-xl bg-white/80 p-2.5 text-center font-bold text-zinc-800 shadow-xs dark:bg-zinc-800/80 dark:text-zinc-200">
              🛡️ {isHi ? 'शून्य ट्रैकर' : 'Zero Trackers'}
            </div>
            <div className="rounded-xl bg-white/80 p-2.5 text-center font-bold text-zinc-800 shadow-xs dark:bg-zinc-800/80 dark:text-zinc-200">
              ✈️ {isHi ? '१००% ऑफ़लाइन' : '100% Offline'}
            </div>
            <div className="rounded-xl bg-white/80 p-2.5 text-center font-bold text-zinc-800 shadow-xs dark:bg-zinc-800/80 dark:text-zinc-200">
              🔒 {isHi ? 'स्थानीय गोपनीयता' : 'Local Storage'}
            </div>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-5 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
          {/* Section 1: Web Application Specific Disclosures */}
          <section className="space-y-3 rounded-3xl border border-sky-500/25 bg-white p-5 shadow-xs dark:border-sky-500/20 dark:bg-zinc-900 sm:p-6">
            <div className="flex items-center gap-2">
              <span className="text-base">🌐</span>
              <h2 className="font-serif text-sm font-bold text-zinc-900 dark:text-zinc-100 sm:text-base">
                {isHi
                  ? '१. वेब ऍप्लिकेशन नीति: sanatan.cc (Web Application Disclosures)'
                  : '1. Web Application Privacy Disclosures (sanatan.cc)'}
              </h2>
            </div>

            <p>
              {isHi
                ? 'हमारी वेबसाइट (https://sanatan.cc) का उपयोग करते समय आपकी गोपनीयता की सुरक्षा निम्नलिखित रूप से सुनिश्चित की जाती है:'
                : 'When browsing and using our web portal (https://sanatan.cc), your digital privacy is preserved through strict architectural boundaries:'}
            </p>

            <div className="space-y-2.5 pt-1">
              <div className="rounded-2xl border border-zinc-100 bg-zinc-50/70 p-3.5 dark:border-zinc-800 dark:bg-zinc-800/50">
                <div className="font-bold text-zinc-900 dark:text-zinc-100">
                  🍪 {isHi ? 'कुकीज से पूर्ण मुक्ति (Zero Tracking Cookies):' : 'Zero Tracking Cookies:'}
                </div>
                <p className="mt-1">
                  {isHi
                    ? 'sanatan.cc किसी भी प्रकार की व्यावसायिक कुकीज, ट्रैकिंग कुकीज अथवा तीसरे पक्ष की प्रोफाइलिंग कुकीज का उपयोग नहीं करता है।'
                    : 'sanatan.cc does NOT set any advertising, tracking, behavioral, or third-party marketing cookies.'}
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-100 bg-zinc-50/70 p-3.5 dark:border-zinc-800 dark:bg-zinc-800/50">
                <div className="font-bold text-zinc-900 dark:text-zinc-100">
                  💾 {isHi ? 'ब्राउज़र लोकल स्टोरेज (Client-Side localStorage):' : 'Client-Side Browser LocalStorage:'}
                </div>
                <p className="mt-1">
                  {isHi
                    ? 'आपकी व्यक्तिगत प्राथमिकताएं (जैसे गोत्र, इष्ट देवता, चयनित नगर, भाषा एवं दिनचर्या कार्य) केवल आपके ब्राउज़र के localStorage में सुरक्षित रहती हैं। यह डेटा कभी हमारे वेब सर्वर पर नहीं भेजा जाता और न ही किसी डेटाबेस में संचित होता है।'
                    : 'Devotee profile settings (Name, Gotra, Ishta Devata, Kuldevi), selected city/coordinates, language preference, and day planner tasks are stored exclusively in your browser’s localStorage. This information never leaves your browser and is never transmitted to any central database or web server.'}
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-100 bg-zinc-50/70 p-3.5 dark:border-zinc-800 dark:bg-zinc-800/50">
                <div className="font-bold text-zinc-900 dark:text-zinc-100">
                  📍 {isHi ? 'ब्राउज़र जीपीएस (HTML5 Geolocation API):' : 'Browser W3C Geolocation API:'}
                </div>
                <p className="mt-1">
                  {isHi
                    ? 'जब आप वेबसाइट पर "Use My GPS Location" चुनते हैं, तो निर्देशांक सीधे आपके ब्राउज़र में खगोलीय गणित हेतु प्रयुक्त होते हैं। सर्वर पर कोई स्थान लॉगिंग नहीं की जाती।'
                    : 'When you click "Use My GPS Location" on the website, navigator.geolocation is processed client-side solely for local astronomical math. Zero location logging occurs on our servers.'}
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-100 bg-zinc-50/70 p-3.5 dark:border-zinc-800 dark:bg-zinc-800/50">
                <div className="font-bold text-zinc-900 dark:text-zinc-100">
                  ☁️ {isHi ? 'स्टेटलेस सर्वर एवं शून्य पंजीकरण:' : 'Stateless Hosting & Zero User Accounts:'}
                </div>
                <p className="mt-1">
                  {isHi
                    ? 'वेबसाइट उपयोग हेतु किसी खाते या पासवर्ड के निर्माण की आवश्यकता नहीं है। सर्वर पूर्णतः स्टेटलेस रूप से कार्य करता है।'
                    : 'No registration, user accounts, or passwords required. Our Next.js web application is completely stateless.'}
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Android Runtime Permissions & Purpose Specification */}
          <section className="space-y-3 rounded-3xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
            <div className="flex items-center gap-2">
              <span className="text-base">📱</span>
              <h2 className="font-serif text-sm font-bold text-zinc-900 dark:text-zinc-100 sm:text-base">
                {isHi
                  ? '२. एंड्रॉइड अनुमतियाँ एवं उनका उपयोग (Android App Permissions — cc.sanatan.app)'
                  : '2. Android App Permissions & Specific Purpose Disclosures (cc.sanatan.app)'}
              </h2>
            </div>

            <p>
              {isHi
                ? 'गूगल प्ले स्टोर की डेवलपर नीतियों के अनुसार, हम स्पष्ट करते हैं कि हमारा एंड्रॉइड ऐप केवल उन अनुमतियों का अनुरोध करता है जो खगोलीय गणनाओं एवं समयबद्ध सूचनाओं हेतु अनिवार्य हैं:'
                : 'In strict compliance with Google Play Developer Policies, we disclose the specific Android permissions requested by our mobile app and their precise technical purposes:'}
            </p>

            <div className="space-y-3 pt-2">
              {/* Location Permission */}
              <div className="rounded-2xl border border-zinc-100 bg-zinc-50/70 p-4 dark:border-zinc-800 dark:bg-zinc-800/50">
                <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] font-bold text-amber-700 dark:text-amber-400">
                  <span>📍 android.permission.ACCESS_FINE_LOCATION</span>
                  <span>•</span>
                  <span>android.permission.ACCESS_COARSE_LOCATION</span>
                </div>
                <div className="mt-1.5 space-y-1">
                  <p>
                    <strong className="text-zinc-900 dark:text-zinc-100">
                      {isHi ? 'उद्देश्य:' : 'Exact Purpose:'}
                    </strong>{' '}
                    {isHi
                      ? 'वैदिक पञ्चाङ्ग में सूर्योदय, सूर्यास्त, चन्द्रोदय, अभिजित मुहूर्त एवं राहु काल का निर्धारण स्थानीय अक्षांश, देशान्तर एवं समुद्र तल से ऊँचाई पर निर्भर करता है। यह अनुमति केवल तभी प्रयुक्त होती है जब आप "जीपीएस स्थान का उपयोग करें" बटन दबाते हैं।'
                      : 'Vedic Panchang calculations for local Sunrise, Sunset, Moonrise, Abhijit Muhurta, and Rahu Kaal require accurate geographical coordinates. This permission is used exclusively when you tap "Use GPS Location".'}
                  </p>
                  <p>
                    <strong className="text-zinc-900 dark:text-zinc-100">
                      {isHi ? 'प्रसंस्करण एवं गोपनीयता:' : 'On-Device Processing:'}
                    </strong>{' '}
                    {isHi
                      ? 'यह गणना १००% आपके उपकरण (फोन) के भीतर ही सम्पन्न होती है। आपके निर्देशांक कभी किसी बाहरी सर्वर, डेटाबेस अथवा क्लाउड पर नहीं भेजे जाते।'
                      : 'Coordinates are processed 100% on your device hardware using NASA JPL ephemeris algorithms. They are NEVER logged, transmitted to any server, or stored in remote databases.'}
                  </p>
                  <p>
                    <strong className="text-zinc-900 dark:text-zinc-100">
                      {isHi ? 'बैकग्राउंड लोकेशन निषेध:' : 'Zero Background Location:'}
                    </strong>{' '}
                    {isHi
                      ? 'हमारा ऐप कभी भी बैकग्राउंड में स्थान का संकलन नहीं करता (isAndroidBackgroundLocationEnabled: false)।'
                      : 'The app NEVER tracks or collects background location (isAndroidBackgroundLocationEnabled: false). Permission is active only while the app is actively in use.'}
                  </p>
                  <p>
                    <strong className="text-zinc-900 dark:text-zinc-100">
                      {isHi ? 'वैकल्पिक सुविधा:' : 'Optional Alternative:'}
                    </strong>{' '}
                    {isHi
                      ? 'यदि आप जीपीएस अनुमति अस्वीकार करते हैं, तब भी आप उज्जैन, काशी, अयोध्या अथवा किसी भी नगर का चयन सूची से कर सकते हैं।'
                      : 'Location permission is completely optional. You can freely choose Ujjain (0° Prime Meridian), sacred tirthas, or manual coordinates without enabling GPS.'}
                  </p>
                </div>
              </div>

              {/* Notification Permission */}
              <div className="rounded-2xl border border-zinc-100 bg-zinc-50/70 p-4 dark:border-zinc-800 dark:bg-zinc-800/50">
                <div className="font-mono text-[11px] font-bold text-amber-700 dark:text-amber-400">
                  🔔 android.permission.POST_NOTIFICATIONS & SCHEDULE_EXACT_ALARM
                </div>
                <div className="mt-1.5 space-y-1">
                  <p>
                    <strong className="text-zinc-900 dark:text-zinc-100">
                      {isHi ? 'उद्देश्य:' : 'Exact Purpose:'}
                    </strong>{' '}
                    {isHi
                      ? 'अभिजित मुहूर्त प्रारम्भ, ब्रह्म मुहूर्त जागरण, राहु काल पूर्व-चेतावनी अथवा दिनचर्या (To-Do) कार्यों के समय स्थानीय अलार्म व सूचना प्रदर्शित करने हेतु।'
                      : 'To display local alerts on your phone when auspicious windows start (Abhijit, Brahma Muhurta, Amrit Choghadiya) or before inauspicious windows (Rahu Kaal pre-warning), and scheduled Day Planner To-Dos.'}
                  </p>
                  <p>
                    <strong className="text-zinc-900 dark:text-zinc-100">
                      {isHi ? 'हार्डवेयर क्लॉक ट्रिगर:' : 'Hardware Clock Trigger:'}
                    </strong>{' '}
                    {isHi
                      ? 'समस्त सूचनाएं आपके फोन के स्थानीय हार्डवेयर अलार्म क्लॉक (AlarmManager) द्वारा अनुसूचत होती हैं। इसमें किसी भी रिमोट पुश सर्वर या नेटवर्क का उपयोग नहीं होता।'
                      : 'All reminders are scheduled locally on the device hardware clock with zero remote push notification servers and zero tracking.'}
                  </p>
                </div>
              </div>

              {/* Vibration Permission */}
              <div className="rounded-2xl border border-zinc-100 bg-zinc-50/70 p-4 dark:border-zinc-800 dark:bg-zinc-800/50">
                <div className="font-mono text-[11px] font-bold text-amber-700 dark:text-amber-400">
                  📳 android.permission.VIBRATE
                </div>
                <div className="mt-1.5">
                  <p>
                    {isHi
                      ? 'मंत्र जप माला (१०८ मनके) एवं मन्दिर घंटी बजाते समय स्पर्शनीय कम्पन (Haptic Feedback) प्रदान करने हेतु।'
                      : 'Used to provide tactile haptic vibration feedback during 108 bead Japa mala counting and sacred temple bell chimes.'}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Google Play Data Safety Disclosures */}
          <section className="space-y-3 rounded-3xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
            <div className="flex items-center gap-2">
              <span className="text-base">📋</span>
              <h2 className="font-serif text-sm font-bold text-zinc-900 dark:text-zinc-100 sm:text-base">
                {isHi
                  ? '३. गूगल प्ले "डेटा सुरक्षा" घोषणा (Google Play Data Safety Disclosures)'
                  : '3. Google Play Data Safety Section Declaration'}
              </h2>
            </div>

            <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-700 text-xs">
              <table className="w-full text-left">
                <thead className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold">
                  <tr>
                    <th className="p-3">{isHi ? 'श्रेणी (Category)' : 'Data Category'}</th>
                    <th className="p-3">{isHi ? 'स्थिति (Status)' : 'Collection & Sharing'}</th>
                    <th className="p-3">{isHi ? 'विवरण (Details)' : 'Disclosure'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                  <tr>
                    <td className="p-3 font-semibold text-zinc-900 dark:text-zinc-100">
                      {isHi ? 'व्यक्तिगत पहचानकर्ता (Personal Info)' : 'Personal Identifiers (Name, Email, Phone)'}
                    </td>
                    <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">
                      {isHi ? 'शून्य संकलन' : 'NOT Collected'}
                    </td>
                    <td className="p-3">
                      {isHi
                        ? 'कोई पंजीकरण आवश्यक नहीं; नाम/गोत्र केवल उपकरण में रहता है।'
                        : 'No account needed. Profile preferences remain strictly on-device.'}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-zinc-900 dark:text-zinc-100">
                      {isHi ? 'स्थान डेटा (Location Data)' : 'Location Coordinates'}
                    </td>
                    <td className="p-3 text-amber-600 dark:text-amber-400 font-bold">
                      {isHi ? 'केवल ऑन-डिवाइस' : 'On-Device Ephemeral Only'}
                    </td>
                    <td className="p-3">
                      {isHi
                        ? 'सूर्योदय व पञ्चाङ्ग गणना हेतु; कभी सर्वर पर नहीं भेजा जाता।'
                        : 'Used solely for local astronomical math; never uploaded or shared.'}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-zinc-900 dark:text-zinc-100">
                      {isHi ? 'डिवाइस पहचानकर्ता (Device IDs / AAID)' : 'Device or Other IDs (AAID)'}
                    </td>
                    <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">
                      {isHi ? 'शून्य संकलन' : 'NOT Collected'}
                    </td>
                    <td className="p-3">
                      {isHi
                        ? 'विज्ञापन या ट्रैकिंग आईडी कभी नहीं पढ़ी जाती।'
                        : 'No advertising ID or hardware fingerprinting.'}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-zinc-900 dark:text-zinc-100">
                      {isHi ? 'वित्तीय / भुगतान डेटा (Financial Data)' : 'Financial & Purchase Info'}
                    </td>
                    <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">
                      {isHi ? 'शून्य संकलन' : 'NOT Collected'}
                    </td>
                    <td className="p-3">
                      {isHi
                        ? 'सेवा पूर्णतः नि:शुल्क है; कोई इन-ऐप खरीद नहीं है।'
                        : '100% free sacred seva. Zero in-app purchases.'}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-zinc-900 dark:text-zinc-100">
                      {isHi ? 'तीसरे पक्ष के साथ साझा (Data Sharing)' : 'Third-Party Sharing'}
                    </td>
                    <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">
                      {isHi ? 'शून्य साझा' : 'Zero Data Shared'}
                    </td>
                    <td className="p-3">
                      {isHi
                        ? 'किसी भी विज्ञापनदाता या डेटा ब्रोकर के साथ कोई साझा नहीं।'
                        : 'We do not sell, rent, or share any data with third parties.'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 4: Third-Party SDKs and Advertising */}
          <section className="space-y-2 rounded-3xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
            <h2 className="font-serif text-sm font-bold text-zinc-900 dark:text-zinc-100 sm:text-base">
              {isHi
                ? '४. विज्ञापन एवं ट्रैकिंग कोड से पूर्ण मुक्ति (No Advertising or Analytics SDKs)'
                : '4. Zero Commercial Advertising & Zero Telemetry SDKs'}
            </h2>
            <p>
              {isHi
                ? 'हमारा दृढ़ विश्वास है कि वैदिक ज्ञान एवं आध्यात्मिक दिनचर्या व्यावसायिक विज्ञापनों और ट्रैकिंग से पूरी तरह मुक्त होनी चाहिए। अतः:'
                : 'We firmly believe that spiritual practices and ancient ephemeris calculations must remain sacred and unmonetized by behavioral tracking. Therefore:'}
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <strong className="text-zinc-900 dark:text-zinc-100">
                  {isHi ? 'कोई विज्ञापन नेटवर्क नहीं:' : 'No Ad Networks:'}
                </strong>{' '}
                {isHi
                  ? 'वेबसाइट अथवा ऐप में गूगल ऐडमॉब (AdMob), यूनिटी अथवा कोई भी अन्य विज्ञापन कोड सम्मिलित नहीं है।'
                  : 'Neither website nor app contains advertising SDKs (no Google AdMob, Unity Ads, AppLovin, etc.).'}
              </li>
              <li>
                <strong className="text-zinc-900 dark:text-zinc-100">
                  {isHi ? 'कोई एनालिटिक्स कोड नहीं:' : 'No Analytics SDKs:'}
                </strong>{' '}
                {isHi
                  ? 'हम गूगल एनालिटिक्स (Firebase), मेटा पिक्सेल, अडजस्ट अथवा किसी भी प्रोफाइलिंग टूल का उपयोग नहीं करते हैं।'
                  : 'We do not integrate Google Analytics for Firebase, Facebook SDK, Adjust, AppsFlyer, or any tracking telemetry.'}
              </li>
            </ul>
          </section>

          {/* Section 5: Data Retention & User Deletion Rights */}
          <section className="space-y-2 rounded-3xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
            <h2 className="font-serif text-sm font-bold text-zinc-900 dark:text-zinc-100 sm:text-base">
              {isHi
                ? '५. डेटा प्रतिधारण एवं विलोपन का अधिकार (Data Retention & Deletion Rights)'
                : '5. Data Retention and Full Deletion Autonomy'}
            </h2>
            <p>
              {isHi
                ? 'चूँकि आपकी समस्त प्राथमिकताएं केवल आपके ब्राउज़र अथवा फोन के स्थानीय निजी स्टोरेज (AsyncStorage / localStorage) में रहती हैं, अतः अपने डेटा पर आपका पूर्ण नियन्त्रण है:'
                : 'Since all preferences (Gotra, Ishta Devata, City coordinates, day planner tasks) are stored exclusively in your local browser/device sandbox storage, you maintain 100% control over your data:'}
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <strong className="text-zinc-900 dark:text-zinc-100">
                  {isHi ? 'वेबसाइट स्टोरेज रीसेट:' : 'Web Browser Storage Clear:'}
                </strong>{' '}
                {isHi
                  ? 'वेबसाइट पर सेटिंग्स पेज से रीसेट करें अथवा ब्राउज़र कैश/लोकल स्टोरेज क्लियर करके डेटा मिटा सकते हैं।'
                  : 'On the website, clear preferences anytime via the Settings page reset button or by clearing your browser cache/storage.'}
              </li>
              <li>
                <strong className="text-zinc-900 dark:text-zinc-100">
                  {isHi ? 'एंड्रॉइड सिस्टम सेटिंग्स:' : 'Android App Storage Clear:'}
                </strong>{' '}
                {isHi
                  ? 'आप कभी भी Android Settings > Apps > Sanatan > Storage > "Clear Data" चुनकर समस्त स्थानीय डेटा क्षण भर में मिटा सकते हैं।'
                  : 'You can purge all locally saved preferences anytime via Android Settings > Apps > Sanatan > Storage > "Clear Data".'}
              </li>
              <li>
                <strong className="text-zinc-900 dark:text-zinc-100">
                  {isHi ? 'ऐप अनइंस्टॉल:' : 'App Uninstallation:'}
                </strong>{' '}
                {isHi
                  ? 'ऐप को अनइंस्टॉल करते ही आपके फोन में सुरक्षित समस्त डेटा स्वतः स्थायी रूप से नष्ट हो जाता है।'
                  : 'Uninstalling the application immediately and permanently removes all stored data from your device.'}
              </li>
            </ul>
          </section>

          {/* Section 6: Children's Privacy (COPPA & Families Policy) */}
          <section className="space-y-2 rounded-3xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
            <h2 className="font-serif text-sm font-bold text-zinc-900 dark:text-zinc-100 sm:text-base">
              {isHi
                ? '६. बाल गोपनीयता संरक्षण (Children\'s Privacy Compliance - COPPA)'
                : '6. Children\'s Privacy Protection (COPPA & Families Policy)'}
            </h2>
            <p>
              {isHi
                ? 'सनातन पञ्चाङ्ग (वेब एवं ऐप) सभी आयु वर्गों हेतु उपयुक्त है। हमारा प्लेटफॉर्म १३ वर्ष से कम आयु के बच्चों से कोई भी व्यक्तिगत रूप से पहचान योग्य जानकारी (PII) संकलित नहीं करता है। यह अमेरिकी बाल ऑनलाइन गोपनीयता संरक्षण अधिनियम (COPPA) एवं गूगल प्ले की फैमिली पॉलिसी का पूर्ण अनुपालन करता है।'
                : 'Sanatan Panchang & Muhurta (both website and app) is suitable for a general audience of all ages. We do not knowingly collect any personally identifiable information from children under 13 (or 16 in the European Economic Area). The platform strictly complies with the Children\'s Online Privacy Protection Act (COPPA) and Google Play Families Policies.'}
            </p>
          </section>

          {/* Section 7: Inquiries & Contact Details */}
          <section className="space-y-3 rounded-3xl border border-amber-500/25 bg-amber-500/5 p-5 dark:border-amber-400/20 dark:bg-amber-400/5 sm:p-6">
            <div className="flex items-center gap-2">
              <span className="text-base">📬</span>
              <h2 className="font-serif text-sm font-bold text-zinc-900 dark:text-zinc-100 sm:text-base">
                {isHi
                  ? '७. गोपनीयता सम्बन्धी प्रश्न एवं सम्पर्क (Contact & Legal Inquiries)'
                  : '7. Privacy Officer, Developer & Legal Inquiries'}
              </h2>
            </div>
            <p>
              {isHi
                ? 'यदि इस गोपनीयता नीति अथवा डेटा सुरक्षा के विषय में आपका कोई भी प्रश्न अथवा सुझाव है, तो आप डेवलपर से सीधे सम्पर्क कर सकते हैं:'
                : 'If you have any questions, clarifications, or feedback regarding this Privacy Policy or your data safety, please contact the developer directly:'}
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 pt-2">
              <a
                href="mailto:mail@sanatan.cc"
                className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-3.5 shadow-xs transition hover:border-amber-400 dark:border-zinc-700 dark:bg-zinc-800"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/15 text-lg text-amber-700 dark:text-amber-400">
                  ✉️
                </span>
                <div>
                  <div className="font-bold text-zinc-900 dark:text-zinc-100 text-xs">
                    {isHi ? 'ईमेल सम्पर्क' : 'Official Email'}
                  </div>
                  <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                    mail@sanatan.cc
                  </div>
                </div>
              </a>

              <a
                href="https://sanatan.cc/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-3.5 shadow-xs transition hover:border-amber-400 dark:border-zinc-700 dark:bg-zinc-800"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/15 text-lg text-amber-700 dark:text-amber-400">
                  🌐
                </span>
                <div>
                  <div className="font-bold text-zinc-900 dark:text-zinc-100 text-xs">
                    {isHi ? 'सनातन सम्पर्क पोर्टल' : 'Sanatan Portal Contact'}
                  </div>
                  <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                    https://sanatan.cc/contact
                  </div>
                </div>
              </a>

              <a
                href="https://dhirajnavghare.com/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-3.5 shadow-xs transition hover:border-amber-400 dark:border-zinc-700 dark:bg-zinc-800 sm:col-span-2"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/15 text-lg text-amber-700 dark:text-amber-400">
                  👤
                </span>
                <div>
                  <div className="font-bold text-zinc-900 dark:text-zinc-100 text-xs">
                    {isHi ? 'डेवलपर व्यक्तिगत सम्पर्क (Dhiraj Navghare)' : 'Developer Direct (Dhiraj Navghare)'}
                  </div>
                  <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                    https://dhirajnavghare.com/contact
                  </div>
                </div>
              </a>
            </div>

            <div className="pt-2 text-center text-[11px] text-zinc-400">
              <Link href="/" className="hover:text-amber-600 transition">
                ← {isHi ? 'मुख्य पृष्ठ पर लौटें' : 'Back to Sanatan Home'}
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
