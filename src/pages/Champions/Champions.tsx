import Card from '@/components/Card/Card';
import Input from '@/components/Input/Input';
import { styled } from '@/stitches.config';
import React, { useCallback } from 'react';
import ChampionsGrid from './ChampionsGrid';
import { useDispatch, useSelector } from 'react-redux';
import { userChampionsSlice } from '@/store/slices/userChampions.slice';
import { HeroType } from '@/types/types';
import {
  getIgnoredChampionIds,
  getSharedAccount,
} from '@/store/selectors';

const Champions = () => {
  const sharedAccount = useSelector(getSharedAccount);
  const ignoredChampionIds = useSelector(getIgnoredChampionIds);
  const [searchInput, setSearchInput] = React.useState('');
  const dispatch = useDispatch();

  const handleClick = useCallback(
    (champion: HeroType) => {
      if (ignoredChampionIds.includes(champion.id)) {
        dispatch(
          userChampionsSlice.actions.removeIgnoredChampionIdAction(
            champion.id,
          ),
        );
      } else {
        dispatch(
          userChampionsSlice.actions.addIgnoredChampionIdAction(
            champion.id,
          ),
        );
      }
    },
    [dispatch, ignoredChampionIds],
  );

  const filteredData = sharedAccount?.heroTypes.filter(({ name }) =>
    name?.toLowerCase().includes(searchInput?.toLowerCase()),
  );

  return (
    <>
      <StyledCard>
        <p>
          Select champions to ignore them. By default every champion
          is taken into account
        </p>
        <Input
          placeholder="Search..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </StyledCard>
      <ChampionsGrid
        heroTypes={filteredData}
        onChampionClick={handleClick}
        ignoredChampionIds={ignoredChampionIds}
      />
    </>
  );
};

const StyledCard = styled(Card, {
  width: 400,
  margin: '$4 auto',
});

export default Champions;
