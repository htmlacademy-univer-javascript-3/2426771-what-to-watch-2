import { configureStore } from '@reduxjs/toolkit';
import { filtersReducer } from './reducers/filters';
import { api } from '../config/api/api';
import { filmsReducer } from './reducers/films';
import { userReducer } from './reducers/user-reducer';
import { filmReducer } from './reducers/film';
import { commentsReducer } from './reducers/comments';
import { similarReducer } from './reducers/similar';
import { favoriteReducer } from './reducers/favorite';

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    films: filmsReducer,
    film: filmReducer,
    favorite: favoriteReducer,
    similar: similarReducer,
    user: userReducer,
    comments: commentsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api,
    },
  }),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
