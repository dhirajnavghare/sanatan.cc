'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Translations, TRANSLATIONS } from './translations';

export type CalendarSystem = 'purnimanta' | 'amanta';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  calendarSystem: CalendarSystem;
  setCalendarSystem: (sys: CalendarSystem) => void;
  t: (key: keyof Translations) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en'); // Clean default with 1-click toggle to Hindi!
  const [calendarSystem, setCalendarSystemState] = useState<CalendarSystem>('purnimanta');

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const savedLang = localStorage.getItem('sanatan_language') as Language;
        if (savedLang && (savedLang === 'en' || savedLang === 'hi')) {
          setLanguageState(savedLang);
        }
        const savedSys = localStorage.getItem('sanatan_calendar_system') as CalendarSystem;
        if (savedSys && (savedSys === 'purnimanta' || savedSys === 'amanta')) {
          setCalendarSystemState(savedSys);
        }
      } catch {}
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('sanatan_language', lang);
    } catch {}
  };

  const setCalendarSystem = (sys: CalendarSystem) => {
    setCalendarSystemState(sys);
    try {
      localStorage.setItem('sanatan_calendar_system', sys);
    } catch {}
  };

  const t = (key: keyof Translations): string => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS.en[key] || String(key);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        calendarSystem,
        setCalendarSystem,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Fallback if rendered outside of provider
    return {
      language: 'hi' as Language,
      setLanguage: () => {},
      calendarSystem: 'purnimanta' as CalendarSystem,
      setCalendarSystem: () => {},
      t: (key: keyof Translations) => TRANSLATIONS.hi[key] || TRANSLATIONS.en[key] || String(key),
    };
  }
  return context;
}
