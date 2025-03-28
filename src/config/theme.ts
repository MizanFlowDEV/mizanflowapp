import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

const colors = {
  navy: '#001F3F',
  gold: '#FFD700',
  lightGold: '#FFE55C',
  darkGold: '#C4A600',
};

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.navy,
    secondary: colors.gold,
    background: '#FFFFFF',
    surface: '#F5F5F5',
    error: '#B00020',
    onPrimary: '#FFFFFF',
    onSecondary: '#000000',
    onBackground: '#000000',
    onSurface: '#000000',
    onError: '#FFFFFF',
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: colors.gold,
    secondary: colors.navy,
    background: '#121212',
    surface: '#1E1E1E',
    error: '#CF6679',
    onPrimary: '#000000',
    onSecondary: '#FFFFFF',
    onBackground: '#FFFFFF',
    onSurface: '#FFFFFF',
    onError: '#000000',
  },
}; 