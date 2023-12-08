import { APIRoute } from './../config/api/routes';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FilmCard } from '../types/film';
import { filmsLoaded } from './reducers/films';
import { ThunkApiConfig } from './types';
import { AuthorizationError, AuthorizationRequest, AuthorizationResponse } from '../types/authorization';
import { authFailed, signedIn, signedOut } from './reducers/user-reducer';
import { AxiosError } from 'axios';
import { lsApi } from '../config/ls-api/ls-api';

export const fetchFilms = createAsyncThunk<void, undefined, ThunkApiConfig>('films/fetchFilms',
  async (_, {dispatch, extra: api}) => {
    const {data} = await api.get<FilmCard[]>(APIRoute.Films);
    dispatch(filmsLoaded(data));
  }
);

export const login = createAsyncThunk<void, AuthorizationRequest, ThunkApiConfig>('user/login',
  async (reqData: AuthorizationRequest, {dispatch, extra: api}) => {
    try {
      const {data} = await api.post<AuthorizationResponse>(APIRoute.Login, reqData);
      lsApi.saveToken(data.token);
      dispatch(signedIn(data));
    } catch (error) {
      lsApi.saveToken(null);
      if (error instanceof AxiosError) {
        const err = error as AxiosError<AuthorizationError>;
        if (err.response?.data) {
          dispatch(authFailed(err.response?.data));
          return;
        }
      }
      dispatch(signedOut());
    }
  }
);

export const logout = createAsyncThunk<void, undefined, ThunkApiConfig>('user/logout',
  async (_, {dispatch, extra: api}) => {
    try {
      const token = lsApi.readToken();

      if (!token) {
        throw new Error('no token');
      }

      await api.delete<void>(APIRoute.Logout, {
        headers: {
          'X-Token': token
        }
      });
    } finally {
      lsApi.saveToken(null);
      dispatch(signedOut());
    }
  }
);

export const checkLogin = createAsyncThunk<void, undefined, ThunkApiConfig>('user/checkLogin',
  async (_, {dispatch, extra: api}) => {
    try {
      const token = lsApi.readToken();

      if (!token) {
        dispatch(signedOut());
        return;
      }

      const {data} = await api.get<AuthorizationResponse>(APIRoute.Login, {
        headers: {
          'X-Token': token
        }
      });

      lsApi.saveToken(data.token);
      dispatch(signedIn(data));
    } catch (error) {
      lsApi.saveToken(null);
      dispatch(signedOut());
    }
  }
);
