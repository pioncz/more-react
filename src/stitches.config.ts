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
      primary: '#93B1A6',
      secondary: '#5C8374',
      tertiary: '#183D3D',
      quaternary: '#040D12',
      gray100: 'hsl(206,22%,99%)',
      gray200: 'hsl(206,12%,97%)',
      gray300: 'hsl(206,11%,92%)',
      gray400: 'hsl(206,10%,84%)',
      gray500: 'hsl(206,10%,76%)',
      gray600: 'hsl(206,10%,44%)',
    },
    transitions: {
      default: 'all 0.2s ease-in-out',
    }
  },
  media: {
    bp1: '(min-width: 480px)',
  },
});