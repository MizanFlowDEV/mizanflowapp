import { useLanguage } from '../contexts/LanguageContext';
import en from '../translations/en';
import ar from '../translations/ar';

type TranslationKey = string;
type TranslationValue = string | { [key: string]: TranslationValue };

const translations = {
  en,
  ar,
};

export function useTranslation() {
  const { language } = useLanguage();

  const t = (key: TranslationKey): string => {
    const keys = key.split('.');
    let value: TranslationValue = translations[language];

    for (const k of keys) {
      if (typeof value === 'object' && value !== null) {
        value = value[k];
      } else {
        return key;
      }
    }

    return typeof value === 'string' ? value : key;
  };

  return { t };
} 