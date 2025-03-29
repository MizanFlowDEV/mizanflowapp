export const typography = {
  // Font families
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
  
  // Font sizes
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  
  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
  
  // Font weights
  fontWeight: {
    regular: '400',
    medium: '500',
    bold: '700',
  },
  
  // Text styles
  text: {
    h1: {
      fontSize: 32,
      lineHeight: 1.2,
      fontWeight: '700',
    },
    h2: {
      fontSize: 24,
      lineHeight: 1.3,
      fontWeight: '700',
    },
    h3: {
      fontSize: 20,
      lineHeight: 1.4,
      fontWeight: '600',
    },
    body1: {
      fontSize: 16,
      lineHeight: 1.5,
      fontWeight: '400',
    },
    body2: {
      fontSize: 14,
      lineHeight: 1.5,
      fontWeight: '400',
    },
    caption: {
      fontSize: 12,
      lineHeight: 1.5,
      fontWeight: '400',
    },
  },
} as const;

// Type for typography values
export type TypographyKey = keyof typeof typography;
export type TypographyValue = typeof typography[TypographyKey]; 