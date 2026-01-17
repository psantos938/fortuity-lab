// Theme Configuration - Change colors and styles in one place!

export const theme = {
  // Brand Colors - Customize these for your clinic
  colors: {
    primary: {
      50: '#ecfeff',
      100: '#cffafe',
      200: '#a5f3fc',
      300: '#67e8f9',
      400: '#22d3ee',  // Main primary color
      500: '#06b6d4',
      600: '#0891b2',  // Darker primary
      700: '#0e7490',
      800: '#155e75',
      900: '#164e63',
    },
    success: {
      light: '#10b981',
      main: '#059669',
      dark: '#047857',
    },
    warning: {
      light: '#f59e0b',
      main: '#d97706',
      dark: '#b45309',
    },
    error: {
      light: '#ef4444',
      main: '#dc2626',
      dark: '#b91c1c',
    },
    background: {
      dark: '#0f172a',
      darker: '#020617',
      card: '#1e293b',
      cardHover: '#334155',
    },
    text: {
      primary: '#ffffff',
      secondary: '#94a3b8',
      tertiary: '#64748b',
    }
  },

  // Typography
  fonts: {
    primary: "'Inter', sans-serif",
    heading: "'Inter', sans-serif",
    mono: "'Fira Code', monospace",
  },

  // Spacing
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },

  // Border Radius
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

// Quick Theme Presets
export const themePresets = {
  medical: {
    primary: '#0891b2', // Medical blue
    name: 'Medical Blue'
  },
  modern: {
    primary: '#8b5cf6', // Purple
    name: 'Modern Purple'
  },
  nature: {
    primary: '#059669', // Green
    name: 'Nature Green'
  },
  professional: {
    primary: '#1e40af', // Deep blue
    name: 'Professional Navy'
  },
};

export default theme;
