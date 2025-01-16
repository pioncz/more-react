import { createStitches } from '@stitches/react';

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      gray100: '#6b6b77',
      gray200: '#5D5D67',
      gray300: '#52525B',
      gray400: '#3F3F46',
      gray500: '#27272a',
      foreground: '#fff',
    },
    transitions: {
      default: 'all 0.2s ease-in-out',
    },
    space: {
      1: '4px',
      2: '8px',
      3: '12px',
    },
    fontSizes: {
      1: '14px',
      2: '18px',
      3: '24px',
    },
    radii: {
      1: '4px',
    },
  },
  media: {
    bp1: '(min-width: 480px)',
  },
});
