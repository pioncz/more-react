import React from 'react';
import { styled } from '@/stitches.config';

const Button = ({
  children,
  selected = false,
  onClick,
}: {
  children: React.ReactNode;
  selected: boolean;
  onClick?: () => void;
}) => {
  return (
    <Root selected={selected} onClick={onClick}>
      {children}
    </Root>
  );
};

const Root = styled('button', {
  backgroundColor: '$gray400',
  borderRadius: '$1',
  color: '$foreground',
  fontSize: '$1',
  padding: '$1 $3',
  border: 'none',
  transition: '$1',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: '$gray200',
  },

  variants: {
    selected: {
      true: {
        backgroundColor: '$gray100',
      },
    },
  },
});

export default Button;
