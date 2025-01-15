import React from 'react';
import { styled } from "@/stitches.config";

const Box = ({ className, children, direction = 'row' }: { className?: string, children?: React.ReactNode, direction?: 'column' | 'row' }) => {
  return (
    <Root className={className} direction={direction}>{children}</Root>
  )
};

const Root = styled('div', {
  display: 'flex',

  variants: {
    direction: {
      column: {
        flexDirection: 'column',
      },
      row: {
        flexDirection: 'row',
      }
    }
  }
});

export default Box;