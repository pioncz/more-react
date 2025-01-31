import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  SharedAccount,
  USER_CHAMPIONS,
  UserChampionsStateType,
} from '@/types/types';

const userChampionsInitialState: UserChampionsStateType = {
  selectedChampionIds: JSON.parse(
    localStorage.getItem('selectedChampionIds') || '[]',
  ),
  sharedAccount: JSON.parse(
    localStorage.getItem('sharedAccount') || 'null',
  ),
};

export const userChampionsSlice = createSlice({
  name: USER_CHAMPIONS,
  initialState: userChampionsInitialState,
  reducers: {
    selectChampionIdAction: (
      state: UserChampionsStateType,
      { payload: championId }: PayloadAction<number>,
    ) => {
      if (state.selectedChampionIds.some((id) => id === championId))
        return;

      const newData = [...state.selectedChampionIds, championId];
      localStorage.setItem(USER_CHAMPIONS, JSON.stringify(newData));
      state.selectedChampionIds = newData;
    },
    unselectChampionIdAction: (
      state: UserChampionsStateType,
      { payload: championId }: PayloadAction<number>,
    ) => {
      const newData = state.selectedChampionIds.filter(
        (id) => id !== championId,
      );
      state.selectedChampionIds = newData;
      localStorage.setItem(USER_CHAMPIONS, JSON.stringify(newData));
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
