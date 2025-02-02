import React from 'react';
import { styled } from '@/stitches.config';

const Button = ({
  className,
  children,
  selected = false,
  onClick,
  small = false,
  primary = true,
  disabled = false,
}: {
  className?: string;
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  small?: boolean;
  primary?: boolean;
  disabled?: boolean;
}) => {
  const handleOnClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <Root
      selected={selected}
      onClick={handleOnClick}
      className={className}
      small={small}
      primary={primary}
      disabled={disabled}
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
    disabled: {
      true: {
        backgroundColor: '$gray700 !important',
        cursor: 'default',
      },
    },
  },
});

export default Button;
