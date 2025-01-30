import { styled } from '@/stitches.config';
import React from 'react';

const Input = (
  props: React.InputHTMLAttributes<HTMLInputElement>,
) => {
  return <Root {...props} />;
};

const Root = styled('input', {
  width: '100%',
  padding: '$2',
  fontSize: '$2',
  border: 'none',
  borderRadius: '$1',
  outline: 'none',
  transition: '$1',
  background: '$gray500',
  boxShadow: '$1',
  color: '$white100',
  '&:hover': {
    borderColor: 'blue',
  },
});

export default Input;
