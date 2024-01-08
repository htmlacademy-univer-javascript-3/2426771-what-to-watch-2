import { LoadingStatus } from '../../types/loading/loading';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FilmCard } from '../../types/film';
import { RootState } from '..';

export interface FavoriteState {
  favorite: FilmCard[];
  loadingStatus: LoadingStatus;
}

const initialState: FavoriteState = {
  favorite: [],
  loadingStatus: LoadingStatus.Unknown
};

export const favoriteSlice = createSlice({
  name: 'Favorite',
  initialState,
  reducers: {
    favoriteRequested: (state) => {
      state.loadingStatus = LoadingStatus.Loading;
    },
    favoriteRequestFailed: (state) => {
      state.loadingStatus = LoadingStatus.Failed;
    },
    favoriteLoaded: (state, action: PayloadAction<FilmCard[]>) => {
      state.favorite = action.payload;
      state.loadingStatus = LoadingStatus.Loaded;
    }
  }
});

export const { favoriteRequested, favoriteRequestFailed, favoriteLoaded } = favoriteSlice.actions;

export const getFavorite = (state: RootState) => state.favorite.favorite;
export const getFavoriteLoadingStatus = (state: RootState) => state.favorite.loadingStatus;

export const favoriteReducer = favoriteSlice.reducer;

