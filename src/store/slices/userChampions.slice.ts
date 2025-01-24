import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  USER_CHAMPIONS,
  UserChampionsStateType,
} from '@/types/types';

localStorage.getItem('userChampions');
const userChampionsInitialState: UserChampionsStateType = {
  data: JSON.parse(localStorage.getItem(USER_CHAMPIONS) || '[]'),
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

      const newData = [...state.data, championId];
      localStorage.setItem(USER_CHAMPIONS, JSON.stringify(newData));
      state.data = newData;
    },
    removeUserChampionIdAction: (
      state: UserChampionsStateType,
      { payload: championId }: PayloadAction<string>,
    ) => {
      const newData = state.data.filter((id) => id !== championId);
      state.data = newData;
      localStorage.setItem(USER_CHAMPIONS, JSON.stringify(newData));
    },
  },
});

export default userChampionsSlice.reducer;
