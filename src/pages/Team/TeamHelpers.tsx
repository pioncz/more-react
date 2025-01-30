import {
  Champion,
  Reward,
  Skill,
  SkillAbilityName,
  Trial,
  TrialCondition,
} from '@/types/types';
import { flattenArray } from '@/utils/helpers';

type TrialWithReward = { rewards: string } & Trial;

const TrialStages = ['Easy', 'Normal', 'Hard'];

const ImportantAbilities: SkillAbilityName[] = [
  'Veil',
  'Fear',
  'Leech',
  'Smite',
  'Revive',
  'Shield',
  'Poison',
  'Max HP',
  'Weaken',
  'Poison',
  'HP Burn',
  'Pain Link',
  'Unkillable',
  'Ally Attack',
  'Block Buffs',
  'Block Damage',
  'Block Debuffs',
  'Counterattack',
  'Increase Speed',
  'Reflect Damage',
  'Decrease Speed',
  'Increase Attack',
  'Decrease Attack',
  'Decrease Defense',
  'Increase Defence',
  'Decrease Accuracy',
  'Increase Accuracy',
  'Poison Sensitivity',
  'Increase Resistance',
  'Decrease Resistance',
  'Block Active Skills',
  'Increase Critical Rate',
  'Increase Critical Damage',
];

function permutator<T>(inputArr: T[], length: number): T[][] {
  const result: T[][] = [];

  const permute = (arr: T[], m: T[], l: number) => {
    if (l === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length - l + 1; i++) {
        const newArr = arr.slice(i + 1, arr.length);
        const nextM = arr[i];

        permute(newArr, m.concat(nextM), l - 1);
      }
    }
  };

  permute(inputArr, [], length);

  return result;
}

const doesTeamMeetConditions = (
  conditions: TrialCondition[],
  abilities: SkillAbilityName[],
) =>
  conditions.every((c) => {
    if (c.type === 'every') {
      return c.abilities.every((a) => abilities.includes(a));
    } else {
      return c.abilities.some((a) => abilities.includes(a));
    }
  });

const getTrialsProgressRewards = (
  trials: ({
    rewards?: string;
  } & Trial)[],
  abilities: SkillAbilityName[],
) => {
  const rewards: string[] = [];

  trials.forEach((t) => {
    const meetConditions = doesTeamMeetConditions(
      t.conditions,
      abilities,
    );
    if (meetConditions && t.rewards) {
      rewards.push(t.rewards);
    } else {
      return rewards;
    }
  });

  return rewards;
};

const getRewardType = (reward: string) => {
  if (reward.indexOf('R.') > -1) {
    return 0;
  } else if (reward.indexOf('E.') > -1) {
    return 1;
  } else if (reward.indexOf('L.') > -1) {
    return 2;
  } else if (reward.indexOf('M.') > -1) {
    return 3;
  }
  return 0;
};

const getRewardQuantity = (reward: string) => {
  const parts = reward.split(' x ');
  if (parts.length > 1 && !isNaN(Number(parts[1]))) {
    return Number(parts[1]);
  }
  return 0;
};

const getScoreFromRewards = (rewards: string[]) =>
  rewards.reduce((acc, curr) => {
    if (curr.indexOf('Ocular Mass') > -1) {
      const type = getRewardType(curr);
      const quantity = getRewardQuantity(curr);
      return acc + quantity * Math.pow(10, type);
    } else {
      return acc;
    }
  }, 0);

const calculateTrialRewards = (
  team: ({ chimeraAbilities: SkillAbilityName[] } & Champion)[],
  grouppedTrials: ({ rewards?: string } & Trial)[][],
): [number, string[]] => {
  const teamAbilities = flattenArray(
    team.map((c) => c.chimeraAbilities),
  );

  let rewards: string[] = [];
  grouppedTrials.forEach((grouppedTrial) => {
    const groupRewards = getTrialsProgressRewards(
      grouppedTrial,
      teamAbilities,
    );

    rewards = [...rewards, ...groupRewards];
  });

  const score = getScoreFromRewards(rewards);

  return [score, rewards];
};

const groupTrials = (trials: Trial[], rewards: Reward[]) => {
  const trialsWithRewards = trials.map((t) => ({
    ...t,
    rewards: rewards.find(
      (r) =>
        r.form === t.form &&
        r.trialStage === t.trialStage &&
        r.trialNumber === t.trialNumber,
    )?.rewards,
  }));
  const groupByForm = (form: string, trialNumber: number) =>
    trialsWithRewards
      .filter((t) => t.form === form && t.trialNumber === trialNumber)
      .sort(
        (t1, t2) =>
          TrialStages.indexOf(t1.trialStage) -
          TrialStages.indexOf(t2.trialStage),
      );

  return [
    groupByForm('Ram', 1),
    groupByForm('Ram', 2),
    groupByForm('Ram', 3),
    groupByForm('Lion', 1),
    groupByForm('Lion', 2),
    groupByForm('Lion', 3),
    groupByForm('Viper', 1),
    groupByForm('Viper', 2),
    groupByForm('Viper', 3),
  ];
};

const getChampionsChimeraAbilities = (
  champion: Champion,
  skills: Skill[],
) => {
  const championSkills = champion.skills
    .split(',')
    .map((skillId) => skills.find((s) => s.id === skillId))
    .filter((v) => v !== undefined);
  const chimeraAbilities: SkillAbilityName[] = flattenArray(
    championSkills.map((s) => s.abilities.map((a) => a.name)),
  ).filter((ability) => ImportantAbilities.includes(ability));
  // TODO: Ally attack
  const hasReviveSkill = championSkills.some((s) =>
    s.description.toLowerCase().includes('revive'),
  );
  if (hasReviveSkill) {
    chimeraAbilities.push('Revive');
  }
  const hasMaxHpSkill = championSkills.some((s) =>
    s.multiplier.some((m) => m.multiplier.includes('TRG_HP')),
  );
  if (hasMaxHpSkill) {
    chimeraAbilities.push('Max HP');
  }
  const hasAllyAttackSkill = championSkills.some((s) =>
    s.description.toLowerCase().includes('teams up'),
  );
  if (hasAllyAttackSkill) {
    chimeraAbilities.push('Ally Attack');
  }
  return chimeraAbilities;
};

export const findChimeraTeams = (
  champions: ({ chimeraAbilities: SkillAbilityName[] } & Champion)[],
  trials: Trial[],
  userChampionIds: string[],
  skills: Skill[],
  rewards: Reward[],
  difficulty: string,
  config: { isStoneSkin: boolean; isIntercept: boolean },
) => {
  const userChampionsWithAbilities = champions
    .filter((champion) => userChampionIds.includes(champion.id))
    .map((c) => ({
      ...c,
      chimeraAbilities: getChampionsChimeraAbilities(c, skills),
    }));
  const revivers = userChampionsWithAbilities
    .filter(
      ({ champion }) =>
        [
          'Lady Mikage',
          'Androc The Glorious',
          'Aphidus The Hivelord',
        ].indexOf(champion) > -1,
    )
    .map((u) => ({
      ...u,
      skills2: u.skills
        .split(',')
        .map((s) => skills.find((s2) => s2.id === s)),
    }));

  console.log('----');
  console.log(userChampionsWithAbilities);
  console.log(revivers);

  // teams up

  const skillfulCharacters = userChampionsWithAbilities.filter(
    (champion) => champion.chimeraAbilities.length > 0,
  );

  // const allTeams = permutator(skillfulCharacters.slice(0, 100), 5);
  // const teamsWithScores: {
  //   team: Champion[];
  //   rewards: Reward[];
  //   score: number;
  // }[] = [];

  // const difficultyRewards = rewards.filter(
  //   (r) => r.difficulty === difficulty.replace(' ', ''),
  // );

  // const goruppedTrials = groupTrials(trials, difficultyRewards);

  // allTeams.forEach((team) => {
  //   const [score, rewards] = calculateTrialRewards(
  //     team,
  //     goruppedTrials,
  //   );

  //   teamsWithScores.push({
  //     team,
  //     rewards,
  //     score,
  //   });
  // });
  // teamsWithScores.sort((a, b) => b.score - a.score);
  // console.log(teamsWithScores.slice(0, 100));

  // console.log(champions.find((c) => c.champion === 'Cleopterix'));
  // console.log(
  //   skills.filter((s) =>
  //     [
  //       62301,
  //       62302,
  //       62303,
  //       62304,
  //       '62301',
  //       '62302',
  //       '62303',
  //       '62304',
  //     ].includes(s.id),
  //   ),
  // );

  // ? Mark each champion with important ability
  // For each team permutation count the number of rewards it can get
  // For each permutation count score: rare mats + 10 * epic mats + 100 * legendary mats + 1000 * mythic mats
  return [];
};
