import Card from '@/components/Card/Card';
import Input from '@/components/Input/Input';
import { styled } from '@/stitches.config';
import React, { useCallback } from 'react';
import ChampionsGrid from './ChampionsGrid';
import { useDispatch, useSelector } from 'react-redux';
import { userChampionsSlice } from '@/store/slices/userChampions.slice';
import { HeroType } from '@/types/types';
import {
  getSelectedChampionIds,
  getSharedAccount,
} from '@/store/selectors';

const Champions = () => {
  const sharedAccount = useSelector(getSharedAccount);
  const selectedChampionIds = useSelector(getSelectedChampionIds);
  const [searchInput, setSearchInput] = React.useState('');
  const dispatch = useDispatch();

  const handleClick = useCallback(
    (champion: HeroType) => {
      if (selectedChampionIds.includes(champion.id)) {
        dispatch(
          userChampionsSlice.actions.unselectChampionIdAction(
            champion.id,
          ),
        );
      } else {
        dispatch(
          userChampionsSlice.actions.selectChampionIdAction(
            champion.id,
          ),
        );
      }
    },
    [dispatch, selectedChampionIds],
  );

  const filteredData = sharedAccount?.heroTypes.filter(({ name }) =>
    name?.toLowerCase().includes(searchInput?.toLowerCase()),
  );

  return (
    <>
      <StyledCard>
        <Input
          placeholder="Search..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </StyledCard>
      <ChampionsGrid
        heroTypes={filteredData}
        onChampionClick={handleClick}
        selectedChampionIds={selectedChampionIds}
      />
    </>
  );
};

const StyledCard = styled(Card, {
  width: 400,
  margin: '0 auto $4',
});

export default Champions;
