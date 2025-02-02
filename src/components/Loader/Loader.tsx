import { keyframes, styled } from '@/stitches.config';
import { forwardRef } from 'react';

const Loader = (
  {
    style,
    className,
    inline = false,
  }: {
    style?: React.CSSProperties;
    className?: string;
    inline?: boolean;
  },
  ref: React.ForwardedRef<HTMLDivElement>,
) => {
  return (
    <Root
      ref={ref}
      style={style}
      className={className}
      inline={inline}
    />
  );
};

const rotate = keyframes({
  to: {
    transform: 'translate(-50%, -50%) rotate(1turn)',
  },
});

const rotateInline = keyframes({
  to: {
    transform: 'rotate(1turn)',
  },
});

const Root = styled('div', {
  width: '50px',
  padding: '8px',
  aspectRatio: 1,
  borderRadius: '50%',
  background: '$primary500',
  mask: 'conic-gradient(#0000 10%,#000), linear-gradient(#000 0 0) content-box',
  maskComposite: 'subtract',

  variants: {
    inline: {
      true: {
        margin: '0 auto',
        animation: `${rotateInline} 1s infinite linear`,
      },
      false: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        animation: `${rotate} 1s infinite linear`,
      },
    },
  },
});

export default forwardRef(Loader);
