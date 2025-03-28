import { useTheme as usePaperTheme } from 'react-native-paper';
import { theme } from '../config/theme';
import type { Theme } from '../config/theme';

export const useAppTheme = () => {
  const paperTheme = usePaperTheme();

  return {
    ...theme,
    paper: paperTheme,
    isDark: paperTheme.dark,
    mode: paperTheme.dark ? 'dark' : 'light',
  } as Theme & {
    paper: typeof paperTheme;
    isDark: boolean;
    mode: 'light' | 'dark';
  };
}; 