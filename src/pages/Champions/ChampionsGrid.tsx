import { styled } from '@/stitches.config';
import { HeroType } from '@/types/types';
import ChampionAvatar from '@/components/ChampionAvatar/ChampionAvatar';
import Card from '@/components/Card/Card';

const ChampionsGrid = ({
  heroTypes,
  ignoredChampionIds,
  onChampionClick,
}: {
  heroTypes: HeroType[] | undefined;
  ignoredChampionIds: number[];
  onChampionClick: (champion: HeroType) => void;
}) => {
  const sortedChampions =
    heroTypes
      ?.slice()
      ?.sort((a, b) => a.name.localeCompare(b.name)) || [];

  return (
    <Root>
      {sortedChampions.map((champion) => (
        <ChampionAvatar
          key={champion.id}
          champion={champion}
          selected={ignoredChampionIds.includes(champion.id)}
          onClick={onChampionClick}
        />
      ))}
      {sortedChampions.length === 0 && <div>No champions found</div>}
    </Root>
  );
};

const Root = styled(Card, {
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row !important',
  width: 'fit-content',
  margin: '0 auto',
  gap: '$2',
  justifyContent: 'center',
});

export default ChampionsGrid;
