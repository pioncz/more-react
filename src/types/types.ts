export const USER_CHAMPIONS = 'userChampions';
export type USER_CHAMPIONS = typeof USER_CHAMPIONS;

export type Champion = {
  id: string;
  name: string;
  image: string;
};

export type UserChampionsStateType = {
  data: string[];
};

export type Reward = {
  id: number;
  difficulty: string;
  form: string;
  trialNumber: number;
  trialStage: string;
  rewards: string;
};
