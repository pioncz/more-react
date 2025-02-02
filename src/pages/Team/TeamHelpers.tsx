import {
  HeroType,
  Reward,
  Skill,
  SkillAbilityName,
  Trial,
  TrialCondition,
} from '@/types/types';
import flatten from 'lodash/flatten';

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
  'Increase Defense',
  'Decrease Accuracy',
  'Increase Accuracy',
  'Poison Sensitivity',
  'Increase Resistance',
  'Decrease Resistance',
  'Block Active Skills',
  'Increase Critical Rate',
  'Increase Critical Damage',
];

const AbilityNameMap: Record<string, SkillAbilityName> = {
  'Decrease ATK': 'Decrease Attack',
  'Decrease SPD': 'Decrease Speed',
  'Increase ATK': 'Increase Attack',
  'Increase SPD': 'Increase Speed',
  'Increase C. DMG': 'Increase Critical Damage',
  'Increase C. RATE': 'Increase Critical Rate',
  'Increase ACC': 'Increase Accuracy',
  'Decrease ACC': 'Decrease Accuracy',
  'Increase DEF': 'Increase Defense',
  'Decrease DEF': 'Decrease Defense',
  'Increase RES': 'Increase Resistance',
  'Decrease RES': 'Decrease Resistance',
  'Perfect Veil': 'Veil',
  'True Fear': 'Fear',
  'Block debuffs': 'Block Debuffs',
  ///
  Sleep: 'Sleep',
  Stun: 'Sleep',
  'Continuous Heal': 'Sleep',
  Provoke: 'Sleep',
  Strengthen: 'Sleep',
  Enfeeble: 'Sleep',
  Freeze: 'Sleep',
  'Heal Reduction': 'Sleep',
  Taunt: 'Sleep',
  'Ally Protection': 'Sleep',
  'Decrease C. RATE': 'Sleep',
  'Decrease C. DMG': 'Sleep',
  'Decrease C.RATE': 'Sleep',
  Bomb: 'Sleep',
  'Revive On Death': 'Sleep',
  'Revive on Death': 'Sleep',
  Hex: 'Sleep',
  Petrification: 'Sleep',
};

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
): [string[], number[]] => {
  const rewards: string[] = [];
  const trialsCompleted: number[] = [];

  for (let i = 0; i < trials.length; i++) {
    const t = trials[i];
    const meetConditions = doesTeamMeetConditions(
      t.conditions,
      abilities,
    );
    if (meetConditions && t.rewards) {
      rewards.push(t.rewards);
      trialsCompleted.push(t.id);
    } else {
      return [rewards, trialsCompleted];
    }
  }

  return [rewards, trialsCompleted];
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
  team: ({ chimeraAbilities: Set<SkillAbilityName> } & HeroType)[],
  grouppedTrials: ({ rewards?: string } & Trial)[][],
): [number, string[], number[]] => {
  const teamAbilities = flatten(
    team.map((c) => Array.from(c.chimeraAbilities)),
  );

  let rewards: string[] = [];
  let completedTrialIds: number[] = [];
  grouppedTrials.forEach((grouppedTrial) => {
    const [groupRewards, trials] = getTrialsProgressRewards(
      grouppedTrial,
      teamAbilities,
    );

    rewards = [...rewards, ...groupRewards];
    completedTrialIds = [...completedTrialIds, ...trials];
  });

  const score = getScoreFromRewards(rewards);

  return [score, rewards, completedTrialIds];
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
  champion: HeroType,
  skills: Skill[],
) => {
  const championSkillIds: number[] = flatten(
    champion.forms.map((f) => f.skillTypeIds),
  );
  const championSkills = championSkillIds
    .map((skillId) => skills.find((s) => s.id === Number(skillId)))
    .filter((v) => v !== undefined);

  const regex = /\[([^\]]*)]/g;
  const chimeraAbilities = new Set<SkillAbilityName>([]);
  championSkills.forEach((cS) => {
    const matches = cS.description.matchAll(regex);

    for (const match of matches) {
      if (match?.[1]) {
        const rawAbility = match?.[1];
        const ability = AbilityNameMap[rawAbility] || rawAbility;

        if (ImportantAbilities.indexOf(ability) > -1) {
          chimeraAbilities.add(ability);
        }
      }
    }
  });
  const hasReviveSkill = championSkills.some((s) =>
    s.description.toLowerCase().includes('revive'),
  );
  if (hasReviveSkill) {
    chimeraAbilities.add('Revive');
  }
  const hasMaxHpSkill = championSkills.some((s) =>
    s.damageMultiplier?.includes('TRG_HP'),
  );
  if (hasMaxHpSkill) {
    chimeraAbilities.add('Max HP');
  }
  const hasAllyAttackSkill = championSkills.some((s) =>
    s.description.toLowerCase().includes('teams up'),
  );
  if (hasAllyAttackSkill) {
    chimeraAbilities.add('Ally Attack');
  }

  return chimeraAbilities;
};

export const findChimeraTeams = (
  champions: HeroType[],
  trials: Trial[],
  ignoredChampionIds: number[],
  skills: Skill[],
  rewards: Reward[],
  difficulty: string,
) => {
  const userChampions = champions.filter(
    (champion) => !ignoredChampionIds.includes(champion.id),
  );
  const championsWithAbilities = userChampions.map((c) => ({
    ...c,
    chimeraAbilities: getChampionsChimeraAbilities(c, skills),
  }));

  const skillfulCharacters = championsWithAbilities.filter(
    (champion) => champion.chimeraAbilities.size > 0,
  );

  const allTeams = permutator(skillfulCharacters.slice(0, 10), 5);
  const teamsWithScores: {
    id: string;
    team: HeroType[];
    rewards: string[];
    score: number;
    completedTrialIds: number[];
  }[] = [];
  const difficultyRewards = rewards.filter(
    (r) => r.difficulty === difficulty.replace(' ', ''),
  );
  const goruppedTrials = groupTrials(trials, difficultyRewards);

  allTeams.forEach((team) => {
    const [score, rewards, completedTrialIds] = calculateTrialRewards(
      team,
      goruppedTrials,
    );
    const id = team.map((hero) => hero.id).join('-');

    teamsWithScores.push({
      id,
      team,
      rewards,
      score,
      completedTrialIds,
    });
  });
  teamsWithScores.sort((a, b) => b.score - a.score);

  return teamsWithScores;
};
