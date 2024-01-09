import { Action } from '@reduxjs/toolkit';
import { RootState } from '../store';

import { initialState as commentsInitialState } from '../store/reducers/comments/comments';
import { initialState as favoriteInitialState } from '../store/reducers/favorite/favorite';
import { initialState as filmInitialState } from '../store/reducers/film/film';
import { initialState as filmsInitialState } from '../store/reducers/films/films';
import { initialState as filtersInitialState } from '../store/reducers/filters/filters';
import { initialState as similarInitialState } from '../store/reducers/similar/similar';
import { initialState as userInitialState } from '../store/reducers/user/user';

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export const makeFakeStore = (initialState?: Partial<RootState>): RootState => ({
  filters: filtersInitialState,
  films: filmsInitialState,
  film: filmInitialState,
  favorite: favoriteInitialState,
  similar: similarInitialState,
  user: userInitialState,
  comments: commentsInitialState,
  ...initialState ?? {}
});
