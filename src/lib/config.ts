export const config = {
  animation: {
    duration: {
      instant: 0.1,
      fast: 0.2,
      normal: 0.3,
      slow: 0.5,
      slower: 0.8,
      slowest: 1.2,
    },
    ease: {
      outExpo: [0.19, 1, 0.22, 1],
      inOutExpo: [0.87, 0, 0.13, 1],
      elastic: [0.68, -0.55, 0.265, 1.55],
    },
  },
  performance: {
    targetFPS: 60,
    particleCount: 1000,
    enablePostProcessing: true,
    enableShadows: true,
  },
  design: {
    colors: {
      dark: {
        base: '#0a0a0a',
        surface: '#141414',
        elevated: '#1a1a1a',
      },
      accent: {
        primary: '#00ff88',
        secondary: '#00ccff',
        danger: '#ff0044',
        warning: '#ff8800',
      },
      military: {
        green: '#4a5d3a',
        gray: '#3a3a3a',
        steel: '#5a6670',
      },
    },
  },
};
