// src/styles/colors.ts
export const colors = {
  // Base colors
  background: {
    primary: '#0a0a0a',
    secondary: '#0f0f0f',
    tertiary: '#1a1a1a',
    elevated: '#1f1f1f',
  },
  
  // Neon accent colors
  neon: {
    green: '#00ff88',
    greenDark: '#00cc6a',
    greenLight: '#33ffaa',
    greenGlow: 'rgba(0, 255, 136, 0.5)',
  },
  
  // Military greens
  military: {
    olive: '#4b5320',
    ranger: '#3b4a3a',
    camo: '#78866b',
    forest: '#228b22',
    tactical: '#3a4e3a',
  },
  
  // Tactical grays
  gray: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },
  
  // Warning/Alert colors
  warning: {
    orange: '#ff6b35',
    red: '#ff3333',
    yellow: '#ffcc00',
    amber: '#ffa500',
  },
  
  // Status colors
  status: {
    success: '#00ff88',
    error: '#ff3333',
    warning: '#ffcc00',
    info: '#00ccff',
  },
  
  // Tech colors
  tech: {
    cyan: '#00ffff',
    magenta: '#ff00ff',
    electric: '#7df9ff',
    matrix: '#00ff41',
    hologram: '#00d4ff',
  },
  
  // Glassmorphism
  glass: {
    white: 'rgba(255, 255, 255, 0.05)',
    whiteLight: 'rgba(255, 255, 255, 0.1)',
    dark: 'rgba(0, 0, 0, 0.3)',
    darkHeavy: 'rgba(0, 0, 0, 0.7)',
  },
}

// Gradient definitions
export const gradients = {
  neonGlow: `linear-gradient(135deg, ${colors.neon.green} 0%, ${colors.neon.greenDark} 100%)`,
  military: `linear-gradient(135deg, ${colors.military.tactical} 0%, ${colors.military.olive} 100%)`,
  dark: `linear-gradient(180deg, ${colors.background.primary} 0%, ${colors.background.secondary} 100%)`,
  tech: `linear-gradient(135deg, ${colors.tech.cyan} 0%, ${colors.tech.electric} 50%, ${colors.tech.magenta} 100%)`,
  warning: `linear-gradient(135deg, ${colors.warning.orange} 0%, ${colors.warning.red} 100%)`,
  glass: `linear-gradient(135deg, ${colors.glass.white} 0%, ${colors.glass.whiteLight} 100%)`,
}

// Shadow definitions
export const shadows = {
  neon: `0 0 20px ${colors.neon.greenGlow}, 0 0 40px ${colors.neon.greenGlow}`,
  neonIntense: `0 0 30px ${colors.neon.green}, 0 0 60px ${colors.neon.greenGlow}, 0 0 80px ${colors.neon.greenGlow}`,
  elevation: {
    low: '0 2px 8px rgba(0, 0, 0, 0.4)',
    medium: '0 4px 16px rgba(0, 0, 0, 0.5)',
    high: '0 8px 32px rgba(0, 0, 0, 0.6)',
    ultra: '0 16px 48px rgba(0, 0, 0, 0.7)',
  },
}
