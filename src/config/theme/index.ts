import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';

export const theme = {
  colors,
  typography,
  spacing,
};

// Type definitions
export type Theme = typeof theme;
export type ThemeColors = typeof colors;
export type ThemeTypography = typeof typography;
export type ThemeSpacing = typeof spacing;

// Theme hooks
export const useTheme = () => theme;

// Theme utilities
export const createTheme = (customTheme: Partial<Theme> = {}) => ({
  ...theme,
  ...customTheme,
}); 