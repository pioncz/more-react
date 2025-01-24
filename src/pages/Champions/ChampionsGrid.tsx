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
  return (
    <Root>
      {champions.map((champion) => (
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
  width: 'fit-content',
  margin: '0 auto',
  gap: '$2',
  justifyContent: 'center',
});

export default ChampionsGrid;
