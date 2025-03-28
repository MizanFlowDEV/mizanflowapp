import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

type ThemeType = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@mizanflow_theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>('light');

  // Load saved theme on mount
  useEffect(() => {
    loadSavedTheme();
  }, []);

  const loadSavedTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme) {
        setTheme(savedTheme as ThemeType);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const paperTheme = theme === 'dark' ? MD3DarkTheme : MD3LightTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <PaperProvider theme={paperTheme}>
        {children}
      </PaperProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 