import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FilmCard } from '../types/film';
import { RootState } from '.';

export interface FiltersState {
  genre: string;
  filmCardList: FilmCard[];
}

const initialState: FiltersState = {
  genre: '',
  filmCardList: []
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    genreChanged: (state, action: PayloadAction<string>) => {
      state.genre = action.payload;
    },
    filmCardsLoaded: (state, action: PayloadAction<FilmCard[]>) => {
      state.filmCardList = action.payload;
    }
  }
});

export const {genreChanged, filmCardsLoaded} = filtersSlice.actions;

export const getGenre = (state: RootState) => state.filters.genre;
export const getFilmCards = (state: RootState) => state.filters.filmCardList;

export const filtersReducer = filtersSlice.reducer;

