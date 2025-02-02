import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  SharedAccount,
  USER_CHAMPIONS,
  UserChampionsStateType,
} from '@/types/types';

const userChampionsInitialState: UserChampionsStateType = {
  ignoredChampionIds: JSON.parse(
    localStorage.getItem('ignoredChampionIds') || '[]',
  ),
  sharedAccount: JSON.parse(
    localStorage.getItem('sharedAccount') || 'null',
  ),
};

export const userChampionsSlice = createSlice({
  name: USER_CHAMPIONS,
  initialState: userChampionsInitialState,
  reducers: {
    addIgnoredChampionIdAction: (
      state: UserChampionsStateType,
      { payload: championId }: PayloadAction<number>,
    ) => {
      if (state.ignoredChampionIds.some((id) => id === championId))
        return;

      const newData = [...state.ignoredChampionIds, championId];
      localStorage.setItem(
        'ignoredChampionIds',
        JSON.stringify(newData),
      );
      state.ignoredChampionIds = newData;
    },
    removeIgnoredChampionIdAction: (
      state: UserChampionsStateType,
      { payload: championId }: PayloadAction<number>,
    ) => {
      const newData = state.ignoredChampionIds.filter(
        (id) => id !== championId,
      );
      state.ignoredChampionIds = newData;
      localStorage.setItem(
        'ignoredChampionIds',
        JSON.stringify(newData),
      );
    },
    setSharedAccountAction: (
      state: UserChampionsStateType,
      { payload: sharedAccount }: PayloadAction<SharedAccount>,
    ) => {
      state.sharedAccount = sharedAccount;
    },
  },
});

export default userChampionsSlice.reducer;
