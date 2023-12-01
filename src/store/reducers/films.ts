import { LoadingStatus } from './../../types/loading/loading';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FilmCard } from '../../types/film';
import { RootState } from '..';

export interface FilmsState {
  films: FilmCard[];
  loadingStatus: LoadingStatus;
}

const initialState: FilmsState = {
  films: [],
  loadingStatus: LoadingStatus.Unknown
};

export const filmsSlice = createSlice({
  name: 'Films',
  initialState,
  reducers: {
    filmsRequested: (state) => {
      state.loadingStatus = LoadingStatus.Loading;
    },
    filmsRequestFailed: (state) => {
      state.loadingStatus = LoadingStatus.Failed;
    },
    filmsLoaded: (state, action: PayloadAction<FilmCard[]>) => {
      state.films = action.payload;
      state.loadingStatus = LoadingStatus.Loaded;
    }
  }
});

export const { filmsRequested, filmsRequestFailed, filmsLoaded } = filmsSlice.actions;

export const getFilms = (state: RootState) => state.films.films;
export const getFilmsLoadingStatus = (state: RootState) => state.films.loadingStatus;

export const filmsReducer = filmsSlice.reducer;

