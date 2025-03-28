export const spacing = {
  // Base spacing unit (4px)
  base: 4,

  // Spacing scale
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
  '4xl': 96,

  // Layout spacing
  layout: {
    screen: 16,
    container: 16,
    section: 24,
    card: 16,
    list: 16,
    form: 16,
  },

  // Component spacing
  components: {
    button: {
      padding: 12,
      margin: 8,
    },
    input: {
      padding: 12,
      margin: 8,
    },
    card: {
      padding: 16,
      margin: 8,
    },
    listItem: {
      padding: 12,
      margin: 4,
    },
    icon: {
      size: 24,
      padding: 8,
    },
  },

  // Border radius
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },

  // Shadows
  shadows: {
    none: {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 3,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 6,
    },
  },
}; 