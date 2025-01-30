import { styled } from '@/stitches.config';
import { Champion } from '@/types/types';
import ChampionAvatar from './ChampionAvatar';
import Card from '@/components/Card/Card';

const ChampionsGrid = ({
  champions,
  userChampionIds,
  onChampionClick,
}: {
  champions: Champion[];
  userChampionIds: string[];
  onChampionClick: (champion: Champion) => void;
}) => {
  const sortedChampions = champions.sort((a, b) =>
    a.champion.localeCompare(b.champion),
  );

  return (
    <Root>
      {sortedChampions.map((champion) => (
        <ChampionAvatar
          key={champion.id}
          champion={champion}
          selected={userChampionIds.includes(champion.id)}
          onClick={onChampionClick}
        />
      ))}
      {champions.length === 0 && <div>No champions found</div>}
    </Root>
  );
};

const Root = styled(Card, {
  display: 'flex',
  flexWrap: 'wrap',
  width: 'fit-content',
  margin: '0 auto',
  gap: '$2',
  justifyContent: 'center',
});

export default ChampionsGrid;
