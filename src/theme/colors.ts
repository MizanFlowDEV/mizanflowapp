export const colors = {
  // Brand Colors
  primary: '#007AFF',
  secondary: '#5856D6',
  accent: '#FF2D55',
  
  // Neutral Colors
  background: {
    default: '#FFFFFF',
    paper: '#F2F2F7',
    dark: '#1C1C1E',
  },
  
  text: {
    primary: '#000000',
    secondary: '#8E8E93',
    disabled: '#C7C7CC',
    inverse: '#FFFFFF',
  },
  
  // Status Colors
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  info: '#5856D6',
  
  // Border Colors
  border: {
    light: '#E5E5EA',
    dark: '#38383A',
  },
  
  // Overlay Colors
  overlay: {
    light: 'rgba(0, 0, 0, 0.1)',
    medium: 'rgba(0, 0, 0, 0.5)',
    dark: 'rgba(0, 0, 0, 0.8)',
  },
  
  // Semantic Colors
  surface: {
    hover: 'rgba(0, 0, 0, 0.04)',
    active: 'rgba(0, 0, 0, 0.08)',
    selected: 'rgba(0, 0, 0, 0.12)',
  },
} as const;

// Type for color values
export type ColorKey = keyof typeof colors;
export type ColorValue = typeof colors[ColorKey]; 