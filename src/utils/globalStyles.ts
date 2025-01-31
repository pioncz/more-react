import { globalCss } from '@stitches/react';
import background from '@/assets/bg.jpg';

const globalStyles = globalCss({
  ':root': {
    fontFamily:
      'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    lineHeight: '1.5',
    fontWeight: '400',
    color: '$white100',
    background: `linear-gradient(
          rgba(0, 0, 20, 0.8), 
          rgba(10, 0, 0, 0.9)
        ), url(${background}), #080808`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',

    fontSynthesis: 'none',
    textRendering: 'optimizeLegibility',
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
    userSelect: 'none',
  },
  'body, html': {
    height: '100%',
    margin: 0,
  },
  '#root': {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    textAlign: 'center',
  },
  '*': {
    boxSizing: 'border-box',
  },
});

export default globalStyles;
