import Card from '@/components/Card/Card';
import Input from '@/components/Input/Input';
import { styled } from '@/stitches.config';
import React from 'react';
import ChampionsGrid from './ChampionsGrid';
import { useQuery } from '@tanstack/react-query';
import { fetchChampions } from '@/utils/api';
import Loader from '@/components/Loader/Loader';
import NetworkError from '@/components/NetworkError/NetworkError';

const Champions = () => {
  const [searchInput, setSearchInput] = React.useState('');
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchChampions,
  });

  if (isPending) {
    return <Loader />;
  }

  if (isError) {
    return <NetworkError error={error} />;
  }
  console.log(data);
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
