import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  USER_CHAMPIONS,
  UserChampionsStateType,
} from '@/types/types';

const userChampionsInitialState: UserChampionsStateType = {
  data: [],
};

export const userChampionsSlice = createSlice({
  name: USER_CHAMPIONS,
  initialState: userChampionsInitialState,
  reducers: {
    addUserChampionIdAction: (
      state: UserChampionsStateType,
      { payload: championId }: PayloadAction<string>,
    ) => {
      if (state.data.some((id) => id === championId)) return;

      state.data.push(championId);
    },
    removeUserChampionIdAction: (
      state: UserChampionsStateType,
      { payload: championId }: PayloadAction<string>,
    ) => {
      state.data = state.data.filter((id) => id !== championId);
    },
  },
});

export default userChampionsSlice.reducer;
