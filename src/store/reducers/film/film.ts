import { Film } from '../../../types/film/index';
import { LoadingStatus } from '../../../types/loading/loading';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../..';

export interface FilmState {
  film: Film | null;
  loadingStatus: LoadingStatus;
}

export const initialState: FilmState = {
  film: null,
  loadingStatus: LoadingStatus.Unknown
};

export const filmSlice = createSlice({
  name: 'Film',
  initialState,
  reducers: {
    filmRequested: (state) => {
      state.loadingStatus = LoadingStatus.Loading;
    },
    filmRequestFailed: (state) => {
      state.loadingStatus = LoadingStatus.Failed;
    },
    filmLoaded: (state, action: PayloadAction<Film | null>) => {
      state.film = action.payload;
      state.loadingStatus = LoadingStatus.Loaded;
    },
    filmNotLoaded: (state) => {
      state.film = null;
      state.loadingStatus = LoadingStatus.Loaded;
    }
  }
});

export const { filmRequested, filmRequestFailed, filmLoaded, filmNotLoaded } = filmSlice.actions;

export const getFilm = (state: RootState) => state.film.film;
export const getFilmLoadingStatus = (state: RootState) => state.film.loadingStatus;

export const filmReducer = filmSlice.reducer;

