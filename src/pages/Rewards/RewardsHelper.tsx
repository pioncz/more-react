import rewards from '@/store/rewards.json';

export const Difficulty = {
  Easy: 'Easy',
  Normal: 'Normal',
  Hard: 'Hard',
  Brutal: 'Brutal',
  Nightmare: 'Nightmare',
  UltraNightmare: 'Ultra Nightmare',
};

const TrialDifficulties = ['Easy', 'Normal', 'Hard'];

export const getRewardData = (difficulty: string, form: string) => {
  const formRewards = rewards.filter(
    (r) => r.difficulty === difficulty && r.form === form,
  );

  return TrialDifficulties.map((trialDifficulty) => {
    const rewards = formRewards.filter(
      (r) => r.trialStage === trialDifficulty,
    );
    const id = `easy${form}${trialDifficulty}`;
    return {
      id,
      difficulty: {
        id: `${id}Difficulty`,
        label: trialDifficulty,
      },
      trial1: {
        id: `${id}Trial1`,
        rewards: rewards.filter((r) => r.trialNumber === 1),
      },
      trial2: {
        id: `${id}Trial2`,
        rewards: rewards.filter((r) => r.trialNumber === 2),
      },
      trial3: {
        id: `${id}Trial3`,
        rewards: rewards.filter((r) => r.trialNumber === 3),
      },
    };
  });
};
