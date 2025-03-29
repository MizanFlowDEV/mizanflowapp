export * from './colors';
export * from './spacing';
export * from './typography';

// Theme type
export interface Theme {
  colors: typeof import('./colors').colors;
  spacing: typeof import('./spacing').spacing;
  typography: typeof import('./typography').typography;
}

// Default theme
export const theme: Theme = {
  colors: require('./colors').colors,
  spacing: require('./spacing').spacing,
  typography: require('./typography').typography,
}; 