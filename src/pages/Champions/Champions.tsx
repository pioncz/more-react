import Card from '@/components/Card/Card';
import Input from '@/components/Input/Input';
import { styled } from '@/stitches.config';
import React from 'react';
import ChampionsGrid from './ChampionsGrid';

const Champions = () => {
  const [searchInput, setSearchInput] = React.useState('');

  return (
    <StyledCard>
      <StyledInput
        placeholder="Search..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <ChampionsGrid />
    </StyledCard>
  );
};

const StyledCard = styled(Card, {
  width: 400,
  margin: '0 auto',
});

const StyledInput = styled(Input, {
  width: '100%',
});

export default Champions;
