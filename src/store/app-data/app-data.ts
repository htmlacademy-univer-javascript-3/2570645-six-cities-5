import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppData } from '../../types/state.ts';
import { NameSpace, SortOptions } from '../../const.ts';

const initialState: AppData = {
  city: 'Paris',
  sortOption: SortOptions.Popular,
  error: null,
};

export const appData = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setSortOption: (state, action: PayloadAction<SortOptions>) => {
      state.sortOption = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { changeCity, setSortOption, setError } = appData.actions;
