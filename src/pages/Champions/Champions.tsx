import Card from '@/components/Card/Card';
import Input from '@/components/Input/Input';
import { styled } from '@/stitches.config';
import React, { useCallback } from 'react';
import ChampionsGrid from './ChampionsGrid';
import { useQuery } from '@tanstack/react-query';
import { fetchChampions } from '@/utils/api';
import Loader from '@/components/Loader/Loader';
import NetworkError from '@/components/NetworkError/NetworkError';
import { useDispatch, useSelector } from 'react-redux';
import { userChampionsSlice } from '@/store/slices/userChampions.slice';
import { Champion } from '@/types/types';
import { getUserChampionIds } from '@/store/selectors';

const Champions = () => {
  const [searchInput, setSearchInput] = React.useState('');
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['champions'],
    queryFn: fetchChampions,
  });
  const dispatch = useDispatch();
  const userChampionIds = useSelector(getUserChampionIds);

  const handleClick = useCallback(
    (champion: Champion) => {
      if (userChampionIds.includes(champion.id)) {
        dispatch(
          userChampionsSlice.actions.removeUserChampionIdAction(
            champion.id,
          ),
        );
      } else {
        dispatch(
          userChampionsSlice.actions.addUserChampionIdAction(
            champion.id,
          ),
        );
      }
    },
    [dispatch, userChampionIds],
  );

  if (isPending) {
    return <Loader />;
  }

  if (isError) {
    return <NetworkError error={error} />;
  }

  return (
    <>
      <StyledCard>
        <StyledInput
          placeholder="Search..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </StyledCard>
      <ChampionsGrid
        champions={data}
        onChampionClick={handleClick}
        userChampionIds={userChampionIds}
      />
    </>
  );
};

const StyledCard = styled(Card, {
  width: 400,
  margin: '0 auto $4',
});

const StyledInput = styled(Input, {
  width: '100%',
});

export default Champions;
