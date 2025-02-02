import { keyframes, styled } from '@/stitches.config';
import { ChampionRarity, Factions, HeroType } from '@/types/types';
import { BASE_URL } from '@/utils/api';
import { useState } from 'react';

const ChampionAvatar = ({
  champion,
  selected,
  onClick,
}: {
  champion: HeroType;
  selected: boolean;
  onClick: (champion: HeroType) => void;
}) => {
  const [isScaling, setIsScaling] = useState(false);
  const faction = Factions[champion?.fraction]?.replace(' ', '');
  const rarity = ChampionRarity[champion.rarity];
  const name = champion.name?.replaceAll(/[-\s']/g, '');

  const handleClick = () => {
    setIsScaling(true);
    onClick(champion);
  };

  return (
    <Root onClick={handleClick} selected={selected}>
      <Image
        // eslint-disable-next-line max-len
        src={`${BASE_URL}image?faction=${faction}&rarity=${rarity}&name=${name}`}
        alt={champion.name}
        scale={isScaling}
        onAnimationEnd={() => setIsScaling(false)}
      />
    </Root>
  );
};

const Root = styled('div', {
  width: 80,
  padding: '$1',
  border: '1px solid $gray200',
  borderRadius: '$0',
  opacity: 0.6,
  filter: 'grayscale(80%)',
  transition: '$transitions$1',

  '&:hover': {
    border: '1px solid $white100',
    opacity: 1,
    filter: 'grayscale(0%)',
  },

  variants: {
    selected: {
      true: {
        border: '1px solid $white100',
        opacity: 1,
        filter: 'grayscale(0%)',
        background: '$error500',
      },
    },
  },
});

const scaleUp = keyframes({
  '0%': { transform: 'scale(1)' },
  '50%': { transform: 'scale(1.05)' },
  '100%': { transform: 'scale(1)' },
});

const Image = styled('img', {
  display: 'block',
  width: '100%',

  variants: {
    scale: {
      true: {
        animation: `${scaleUp} 0.4s`,
        animationTimingFunction: 'cubic-bezier(0.0, 0.2, 0)',
      },
    },
  },
});

export default ChampionAvatar;
