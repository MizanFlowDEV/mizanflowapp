export const spacing = {
  // Base spacing unit (4px)
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  
  // Screen margins
  screen: {
    horizontal: 16,
    vertical: 16,
  },
  
  // Component spacing
  component: {
    padding: 16,
    margin: 16,
    gap: 8,
  },
  
  // Layout spacing
  layout: {
    header: 56,
    footer: 56,
    sidebar: 256,
    content: 24,
  },
  
  // Form spacing
  form: {
    field: 16,
    label: 8,
    error: 4,
  },
} as const;

// Type for spacing values
export type SpacingKey = keyof typeof spacing;
export type SpacingValue = typeof spacing[SpacingKey]; 