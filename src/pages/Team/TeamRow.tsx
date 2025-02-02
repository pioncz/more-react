import Box from '@/components/Box/Box';
import ChampionAvatar from '@/components/ChampionAvatar/ChampionAvatar';
import { styled } from '@/stitches.config';
import { HeroType, Trial } from '@/types/types';

const TeamRow = ({
  result: { team, score, completedTrialIds },
  trials,
}: {
  result: {
    team: HeroType[];
    score: number;
    completedTrialIds: number[];
  };
  trials: Trial[];
}) => {
  const completedTrials = completedTrialIds
    .map((trialId) => trials.find((t) => t.id === trialId))
    .filter((t) => !!t);
  const trialGroups = completedTrials.reduce((acc, curr) => {
    if (!acc[curr.form]) {
      acc[curr.form] = [];
    }
    acc[curr.form].push(curr);
    return acc;
  }, {} as Record<string, Trial[]>);

  return (
    <Root>
      <Box gap={'$3'}>
        {team.map((hero) => (
          <ChampionAvatar key={hero.id} champion={hero} />
        ))}
      </Box>
      <div>
        Score: {score} Trials:{' '}
        {Object.entries(trialGroups).map(
          ([form, trials]) =>
            `${form}: ${trials
              .map((t) => `${t.trialNumber}-${t.trialStage}`)
              .join(', ')}; `,
        )}
      </div>
    </Root>
  );
};

const Root = styled('div', {
  textAlign: 'left',
  maxWidth: 448,
  marginBottom: '$3',
});

export default TeamRow;
