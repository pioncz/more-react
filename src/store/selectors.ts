import { StateType } from './rootReducer';

export const getSelectedChampionIds = (state: StateType) =>
  state.userChampions.selectedChampionIds;

export const getSharedAccount = (state: StateType) =>
  state.userChampions.sharedAccount;
