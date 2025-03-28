import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import en from '../translations/en';
import ar from '../translations/ar';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const i18n = new I18n({
  en,
  ar,
});

i18n.enableFallback = true;
i18n.defaultLocale = 'en';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Load saved language preference
    AsyncStorage.getItem('language').then((savedLanguage) => {
      if (savedLanguage === 'en' || savedLanguage === 'ar') {
        setLanguage(savedLanguage);
      } else {
        // Use device language or fallback to English
        const deviceLanguage = Localization.locale.split('-')[0];
        setLanguage(deviceLanguage === 'ar' ? 'ar' : 'en');
      }
    });
  }, []);

  useEffect(() => {
    i18n.locale = language;
  }, [language]);

  const toggleLanguage = async () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    setLanguage(newLanguage);
    await AsyncStorage.setItem('language', newLanguage);
  };

  const value = {
    language,
    toggleLanguage,
    t: (key: string) => i18n.t(key),
    isRTL: language === 'ar',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 