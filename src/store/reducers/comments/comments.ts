import { Comment } from '../../../types/film/index';
import { LoadingStatus } from '../../../types/loading/loading';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../..';

export interface CommentsState {
  comments: Comment[];
  loadingStatus: LoadingStatus;
}

export const initialState: CommentsState = {
  comments: [],
  loadingStatus: LoadingStatus.Unknown
};

export const commentsSlice = createSlice({
  name: 'Comments',
  initialState,
  reducers: {
    commentsRequested: (state) => {
      state.loadingStatus = LoadingStatus.Loading;
    },
    commentsRequestFailed: (state) => {
      state.loadingStatus = LoadingStatus.Failed;
    },
    commentsLoaded: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
      state.loadingStatus = LoadingStatus.Loaded;
    }
  }
});

export const { commentsRequested, commentsRequestFailed, commentsLoaded } = commentsSlice.actions;

export const getComments = (state: RootState) => state.comments.comments;
export const getCommentsLoadingStatus = (state: RootState) => state.comments.loadingStatus;

export const commentsReducer = commentsSlice.reducer;

