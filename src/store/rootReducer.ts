import userChampionsReducer from './slices/userChampions.slice';
import { UserChampionsStateType } from '@/types/types';

export type StateType = {
  userChampions: UserChampionsStateType;
};

const rootReducers = {
  userChampions: userChampionsReducer,
};

export default rootReducers;
