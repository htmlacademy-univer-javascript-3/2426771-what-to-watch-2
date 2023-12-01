import { APIRoute } from './../config/api/routes';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FilmCard } from '../types/film';
import { filmsLoaded } from './reducers/films';
import { ThunkApiConfig } from './types';

export const fetchFilms = createAsyncThunk<void, undefined, ThunkApiConfig>(
  'films/fetchFilms',
  async (_, {dispatch, extra: api}) => {
    const {data} = await api.get<FilmCard[]>(APIRoute.Films);
    dispatch(filmsLoaded(data));
  }
);
