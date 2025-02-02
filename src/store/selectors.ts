import { StateType } from './rootReducer';

export const getIgnoredChampionIds = (state: StateType) =>
  state.userChampions.ignoredChampionIds;

export const getSharedAccount = (state: StateType) =>
  state.userChampions.sharedAccount;
