import { StateType } from './rootReducer';

export const getUserChampionIds = (state: StateType) =>
  state.userChampions.data;
