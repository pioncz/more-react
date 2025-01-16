import React from 'react';
import { styled } from '@/stitches.config';

const Box = ({
  className,
  children,
  ...cssProps
}: {
  className?: string;
  children?: React.ReactNode;
} & React.CSSProperties) => {
  return (
    <Root
      className={className}
      css={{
        ...cssProps,
      }}
    >
      {children}
    </Root>
  );
};

const Root = styled('div', {
  display: 'flex',
});

export default Box;
