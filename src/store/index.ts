import { configureStore } from '@reduxjs/toolkit';
import { filtersReducer } from './reducers/filters';
import { api } from '../config/api/api';
import { filmsReducer } from './reducers/films';
import { userReducer } from './reducers/user-reducer';

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    films: filmsReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api,
    },
  }),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
