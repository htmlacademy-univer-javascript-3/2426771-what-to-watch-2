import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

export interface FiltersState {
  genre: string;
}

const initialState: FiltersState = {
  genre: '',
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    genreChanged: (state, action: PayloadAction<string>) => {
      state.genre = action.payload;
    }
  }
});

export const { genreChanged } = filtersSlice.actions;

export const getGenre = (state: RootState) => state.filters.genre;

export const filtersReducer = filtersSlice.reducer;

