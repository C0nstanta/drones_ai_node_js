// src/styles/typography.ts
export const typography = {
  // Variable font families
  fonts: {
    heading: 'var(--font-heading)',
    body: 'var(--font-body)',
    mono: 'var(--font-mono)',
  },
  
  // Font sizes with fluid scaling
  sizes: {
    xs: 'clamp(0.75rem, 1.5vw, 0.875rem)',
    sm: 'clamp(0.875rem, 1.75vw, 1rem)',
    base: 'clamp(1rem, 2vw, 1.125rem)',
    lg: 'clamp(1.125rem, 2.25vw, 1.25rem)',
    xl: 'clamp(1.25rem, 2.5vw, 1.5rem)',
    '2xl': 'clamp(1.5rem, 3vw, 1.875rem)',
    '3xl': 'clamp(1.875rem, 3.75vw, 2.25rem)',
    '4xl': 'clamp(2.25rem, 4.5vw, 3rem)',
    '5xl': 'clamp(3rem, 6vw, 3.75rem)',
    '6xl': 'clamp(3.75rem, 7.5vw, 4.5rem)',
    '7xl': 'clamp(4.5rem, 9vw, 6rem)',
  },
  
  // Font weights
  weights: {
    thin: 100,
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  
  // Line heights
  lineHeights: {
    tight: 1.1,
    snug: 1.2,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  
  // Letter spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
}

// Typography component styles
export const typographyStyles = {
  h1: `
    font-family: ${typography.fonts.heading};
    font-size: ${typography.sizes['6xl']};
    font-weight: ${typography.weights.bold};
    line-height: ${typography.lineHeights.tight};
    letter-spacing: ${typography.letterSpacing.tight};
  `,
  h2: `
    font-family: ${typography.fonts.heading};
    font-size: ${typography.sizes['5xl']};
    font-weight: ${typography.weights.semibold};
    line-height: ${typography.lineHeights.tight};
    letter-spacing: ${typography.letterSpacing.tight};
  `,
  h3: `
    font-family: ${typography.fonts.heading};
    font-size: ${typography.sizes['4xl']};
    font-weight: ${typography.weights.semibold};
    line-height: ${typography.lineHeights.snug};
  `,
  body: `
    font-family: ${typography.fonts.body};
    font-size: ${typography.sizes.base};
    font-weight: ${typography.weights.regular};
    line-height: ${typography.lineHeights.relaxed};
  `,
  mono: `
    font-family: ${typography.fonts.mono};
    font-size: ${typography.sizes.sm};
    font-weight: ${typography.weights.regular};
    letter-spacing: ${typography.letterSpacing.wide};
  `,
}
