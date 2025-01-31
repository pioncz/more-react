export const USER_CHAMPIONS = 'userChampions';
export type USER_CHAMPIONS = typeof USER_CHAMPIONS;

export type Champion = {
  id: string;
  champion: string;
  image: string;
  skills: string;
};

export type SharedAccount = {
  heroTypes: HeroType[];
};

export type UserChampionsStateType = {
  sharedAccount?: SharedAccount | null;
  selectedChampionIds: number[];
};

export type Reward = {
  id: number;
  difficulty: string;
  form: string;
  trialNumber: number;
  trialStage: string;
  rewards: string;
};

export type SkillType = 'Basic' | 'Active' | 'Passive';
export type SkillAbilityName =
  | 'Shield'
  | 'Increase Attack'
  | 'Increase Critical Damage'
  | 'Fear'
  | 'Decrease Defense'
  | 'Weaken'
  | 'Strengthen'
  | 'Increase Speed'
  | 'Poison Sensitivity'
  | 'Block Buffs'
  | 'Block Active Skills'
  | 'Leech'
  | 'Decrease Attack'
  | 'HP Burn'
  | 'Block Debuffs'
  | 'Stun'
  | 'Increase Defence'
  | 'Increase Resistance'
  | 'Continuous Heal'
  | 'Block Damage'
  | 'Decrease Speed'
  | 'Provoke'
  | 'Reflect Damage'
  | 'Counterattack'
  | 'Veil'
  | 'Sleep'
  | 'Revive on Death'
  | 'Increase Critical Rate'
  | 'Increase Accuracy'
  | 'Hex'
  | 'Decrease Resistance'
  | 'Decrease Accuracy'
  | 'Freeze'
  | 'Unkillable'
  | 'Heal Reduction'
  | 'Enfeeble'
  | 'Poison'
  | 'Petrification'
  | 'Block Passive Skills'
  | 'Ally Protect'
  | 'Decrease Critical Damage'
  | 'Block Revive'
  | 'Max HP'
  | 'Ally Attack'
  | 'Pain Link'
  | 'Revive'
  | 'Smite';

export type SkillAbility = {
  name: SkillAbilityName;
  duration: string;
  effect: string;
  effectid: string;
  multiplier: string;
  skilluse: string;
  strength: string;
  type: string;
};

export type SkillBook = {
  amount: string;
  type: string;
};

export type SkillMultiplier = {
  id: number;
  attacks: string;
  effectid: string;
  kindid: string;
  multiplier: string;
  specialrules: string;
  target: string;
};

export type Skill = {
  id: string;
  name: string;
  description: string;
  cooldown: string;
  type: SkillType;
  abilities: SkillAbility[];
  books: SkillBook[];
  multiplier: SkillMultiplier[];
};

export type TrialCondition = {
  id: number;
  type: 'every' | 'any';
  abilities: SkillAbilityName[];
};

export type Trial = {
  id: number;
  form: string;
  description: string;
  trialNumber: number;
  trialStage: string;
  conditions: TrialCondition[];
};

export const Difficulty = {
  Easy: 'Easy',
  Normal: 'Normal',
  Hard: 'Hard',
  Brutal: 'Brutal',
  Nightmare: 'Nightmare',
  UltraNightmare: 'Ultra Nightmare',
};

export type HeroType = {
  id: number;
  name: string;
  fraction: number;
  rarity: number;
  forms: { skillTypeIds: number[] }[];
};

export const Factions = [
  '',
  'Banner Lords',
  'High Elves',
  'Sacred Order',
  'Dwarves',
  'Ogryn Tribes',
  'LizardMen',
  'Skinwalkers',
  'Orcs',
  'Demonspawn',
  'Undead Hordes', // 10
  'Dark Elves',
  'Knights Revenant',
  'Barbarians',
  'Sylvan Watchers',
  'Shadowkin',
  'Dwarves',
];

export const ChampionRarity = [
  '',
  'Common',
  'Uncommon',
  'Rare',
  'Epic',
  'Legendary',
  'Mythical',
];
