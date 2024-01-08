import { FilmCard } from '../../types/film/index';
import { LoadingStatus } from '../../types/loading/loading';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

export interface SimilarState {
  similar: FilmCard[];
  loadingStatus: LoadingStatus;
}

const initialState: SimilarState = {
  similar: [],
  loadingStatus: LoadingStatus.Unknown
};

export const similarSlice = createSlice({
  name: 'Similar',
  initialState,
  reducers: {
    similarRequested: (state) => {
      state.loadingStatus = LoadingStatus.Loading;
    },
    similarRequestFailed: (state) => {
      state.loadingStatus = LoadingStatus.Failed;
    },
    similarLoaded: (state, action: PayloadAction<FilmCard[]>) => {
      state.similar = action.payload;
      state.loadingStatus = LoadingStatus.Loaded;
    }
  }
});

export const { similarRequested, similarRequestFailed, similarLoaded } = similarSlice.actions;

export const getSimilar = (state: RootState) => state.similar.similar;
export const getSimilarLoadingStatus = (state: RootState) => state.similar.loadingStatus;

export const similarReducer = similarSlice.reducer;

