import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import en from '../translations/en';
import ar from '../translations/ar';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => Promise<void>;
  t: (key: string, params?: object) => string;
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
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('language');
      if (savedLanguage) {
        await setLanguage(savedLanguage as Language);
      } else {
        // Use device locale as default, fallback to 'en'
        const deviceLocale = Localization.locale.split('-')[0];
        await setLanguage((deviceLocale === 'ar' ? 'ar' : 'en') as Language);
      }
    } catch (error) {
      console.error('Error loading language:', error);
    }
  };

  const setLanguage = async (lang: Language) => {
    try {
      await AsyncStorage.setItem('language', lang);
      setLanguageState(lang);
      i18n.locale = lang;
    } catch (error) {
      console.error('Error setting language:', error);
    }
  };

  const t = (key: string, params?: object) => {
    return i18n.t(key, params);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        isRTL: language === 'ar',
      }}
    >
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