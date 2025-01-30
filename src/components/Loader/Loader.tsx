import { keyframes, styled } from '@/stitches.config';

const Loader = ({ className }: { className?: string }) => {
  return <Root className={className} />;
};

const rotate = keyframes({
  to: {
    transform: 'translate(-50%, -50%) rotate(1turn)',
  },
});

const Root = styled('div', {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50px',
  padding: '8px',
  aspectRatio: 1,
  borderRadius: '50%',
  background: '$primary500',
  mask: 'conic-gradient(#0000 10%,#000), linear-gradient(#000 0 0) content-box',
  maskComposite: 'subtract',
  animation: `${rotate} 1s infinite linear`,
});

export default Loader;
