import { APIRoute } from './../config/api/routes';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Film, FilmCard, Comment } from '../types/film';
import { filmsLoaded, filmsRequested } from './reducers/films/films';
import { ThunkApiConfig } from './types';
import { AuthorizationError, AuthorizationRequest, AuthorizationResponse } from '../types/authorization';
import { authFailed, signedIn, signedOut } from './reducers/user/user';
import { AxiosError } from 'axios';
import { lsApi } from '../config/ls-api/ls-api';
import { filmLoaded, filmNotLoaded, filmRequested } from './reducers/film/film';
import { commentsLoaded, commentsRequested } from './reducers/comments/comments';
import { similarLoaded, similarRequested } from './reducers/similar/similar';
import { favoriteLoaded, favoriteRequested } from './reducers/favorite/favorite';

export const fetchFilms = createAsyncThunk<void, undefined, ThunkApiConfig>('films/fetchFilms',
  async (_, {dispatch, extra: api}) => {
    dispatch(filmsRequested());
    const {data} = await api.get<FilmCard[]>(APIRoute.Films);
    dispatch(filmsLoaded(data));
  }
);

export const fetchFilm = createAsyncThunk<void, string, ThunkApiConfig>('film/fetchFilm',
  async (id: string, {dispatch, extra: api}) => {
    try {
      dispatch(filmRequested());
      const {data} = await api.get<Film>(`${APIRoute.Films}/${id}`);
      dispatch(filmLoaded(data));
    } catch (e) {
      dispatch(filmNotLoaded());
    }
  }
);

export const fetchPromoFilm = createAsyncThunk<void, undefined, ThunkApiConfig>('film/fetchFilm',
  async (_, {dispatch, extra: api}) => {
    try {
      dispatch(filmRequested());
      const {data} = await api.get<Film>(APIRoute.Promo);
      dispatch(filmLoaded(data));
    } catch (e) {
      dispatch(filmNotLoaded());
    }
  }
);

export const fetchSimilar = createAsyncThunk<void, string, ThunkApiConfig>('film/fetchSimilar',
  async (id: string, {dispatch, extra: api}) => {
    dispatch(similarRequested());
    const {data} = await api.get<FilmCard[]>(`${APIRoute.Films }/${id}/similar`);
    dispatch(similarLoaded(data));
  }
);

export const fetchComments = createAsyncThunk<void, string, ThunkApiConfig>('comments/fetchComments',
  async (id: string, {dispatch, extra: api}) => {
    dispatch(commentsRequested());
    const {data} = await api.get<Comment[]>(`${APIRoute.Comments }/${ id}`);
    dispatch(commentsLoaded(data));
  }
);

export const fetchFavorite = createAsyncThunk<void, undefined, ThunkApiConfig>('favorite/fetchFavorite',
  async (_, {dispatch, extra: api}) => {
    dispatch(favoriteRequested());
    const {data} = await api.get<FilmCard[]>(`${APIRoute.Favorite}`);
    dispatch(favoriteLoaded(data));
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
