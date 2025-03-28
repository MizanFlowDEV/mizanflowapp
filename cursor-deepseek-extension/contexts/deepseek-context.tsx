export function getCurrentProjectContext() {
    return {
      components: [
        'ShiftCard',
        'ShiftDetails',
        'AuthSystem',
        'BilingualSupport'
      ],
      theming: {
        primary: '#0A2342', // Navy
        secondary: '#CFB87C' // Gold
      },
      i18n: {
        supportedLangs: ['en', 'ar'],
        currentLang: 'en' // Default to English
      },
      supabase: {
        tables: ['shifts', 'users', 'analytics']
      }
    };
  }