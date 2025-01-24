import React from 'react';
import { styled } from '@/stitches.config';

const Button = ({
  className,
  children,
  selected = false,
  onClick,
  small = false,
  primary = true,
}: {
  className?: string;
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  small?: boolean;
  primary?: boolean;
}) => {
  return (
    <Root
      selected={selected}
      onClick={onClick}
      className={className}
      small={small}
      primary={primary}
    >
      {children}
    </Root>
  );
};

const Root = styled('button', {
  backgroundColor: '$gray400',
  borderRadius: '$1',
  color: '$foreground',
  fontSize: '$2',
  padding: '$2 $4',
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
    small: {
      true: {
        fontSize: '$1',
        padding: '$1 $3',
      },
    },
    primary: {
      true: {
        backgroundColor: '$primary400',
        color: '$foreground',
        '&:hover': {
          backgroundColor: '$primary500',
        },
      },
    },
  },
});

export default Button;
