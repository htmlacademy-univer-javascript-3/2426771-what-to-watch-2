import { api } from './../config/api/api';
import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { checkLogin, fetchComments, fetchFavorite, fetchFilm, fetchFilms, fetchPromoFilm, fetchSimilar, login, logout } from './api-actions';
import { APIRoute } from '../config/api/routes';
import { RootState } from '.';
import { commentsLoaded, commentsRequested } from './reducers/comments/comments';
import { favoriteLoaded, favoriteRequested } from './reducers/favorite/favorite';
import { filmLoaded, filmNotLoaded, filmRequested } from './reducers/film/film';
import { filmsLoaded, filmsRequested } from './reducers/films/films';
import { similarLoaded, similarRequested } from './reducers/similar/similar';
import { authFailed, signedIn, signedOut } from './reducers/user/user';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { extractActionsTypes, makeFakeStore } from '../utils/mocks';
import { Film } from '../types/film';
import { AuthorizationRequest } from '../types/authorization';

describe('Async actions', () => {
  const mockAxiosAdapter = new MockAdapter(api);
  const middleware = [thunk.withExtraArgument(api)];
  const mockStoreCreator = configureMockStore<RootState, Action<string>, ThunkDispatch<RootState, AxiosInstance, Action<string>>>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    localStorage.clear();
    store = mockStoreCreator(makeFakeStore());
  });

  describe('fetchFilms', () => {
    it('should dispatch "fetchFilms.pending", "filmsLoaded" and "fetchFilms.fulfilled" with thunk "fetchFilms', async () => {
      mockAxiosAdapter.onGet(APIRoute.Films).reply(200);

      await store.dispatch(fetchFilms());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFilms.pending.type,
        filmsRequested.type,
        filmsLoaded.type,
        fetchFilms.fulfilled.type,
      ]);
    });

    it('should dispatch "fetchFilms.pending" and "fetchFilms.rejected" with thunk "fetchFilms', async () => {
      mockAxiosAdapter.onGet(APIRoute.Films).reply(404);

      await store.dispatch(fetchFilms());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFilms.pending.type,
        filmsRequested.type,
        fetchFilms.rejected.type,
      ]);
    });
  });

  describe('fetchFilm', () => {
    it('should dispatch "fetchFilm.pending", "filmsLoaded" and "fetchFilm.fulfilled" with thunk "fetchFilm', async () => {
      const film: Film = {
        'id': 'c8682b0c-a8dd-4f2d-befd-36d59e4fcf7c',
        'name': 'Aviator',
        'posterImage': 'https://13.design.htmlacademy.pro/static/film/poster/Aviator.jpg',
        'backgroundImage': 'https://13.design.htmlacademy.pro/static/film/background/Aviator.jpg',
        'backgroundColor': '#D6CDAF',
        'videoLink': 'https://13.design.htmlacademy.pro/static/film/video/bubbles.mp4',
        'description': 'A biopic depicting the early years of legendary Director and aviator Howard Hughes\' career from the late 1920s to the mid 1940s.',
        'rating': 9.8,
        'scoresCount': 307174,
        'director': 'Martin Scorsese',
        'starring': [
          'Leonardo DiCaprio',
          'Cate Blanchett',
          'Kate Beckinsale'
        ],
        'runTime': 170,
        'genre': 'Drama',
        'released': 2014,
        'isFavorite': true
      };
      mockAxiosAdapter.onGet(`${APIRoute.Films}/id`).reply(200, film);

      await store.dispatch(fetchFilm('id'));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFilm.pending.type,
        filmRequested.type,
        filmLoaded.type,
        fetchFilm.fulfilled.type,
      ]);
    });

    it('should dispatch "fetchFilm.pending", "filmNotLoaded", "fetchFilm.fulfilled" with thunk "fetchFilm', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Films}/id`).reply(404);

      await store.dispatch(fetchFilm('id'));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFilm.pending.type,
        filmRequested.type,
        filmNotLoaded.type,
        fetchFilm.fulfilled.type,
      ]);
    });
  });

  describe('fetchPromoFilm', () => {
    it('should dispatch "fetchPromoFilm.pending", "filmsLoaded" and "fetchPromoFilm.fulfilled" with thunk "fetchPromoFilm', async () => {
      const film: Film = {
        'id': 'c8682b0c-a8dd-4f2d-befd-36d59e4fcf7c',
        'name': 'Aviator',
        'posterImage': 'https://13.design.htmlacademy.pro/static/film/poster/Aviator.jpg',
        'backgroundImage': 'https://13.design.htmlacademy.pro/static/film/background/Aviator.jpg',
        'backgroundColor': '#D6CDAF',
        'videoLink': 'https://13.design.htmlacademy.pro/static/film/video/bubbles.mp4',
        'description': 'A biopic depicting the early years of legendary Director and aviator Howard Hughes\' career from the late 1920s to the mid 1940s.',
        'rating': 9.8,
        'scoresCount': 307174,
        'director': 'Martin Scorsese',
        'starring': [
          'Leonardo DiCaprio',
          'Cate Blanchett',
          'Kate Beckinsale'
        ],
        'runTime': 170,
        'genre': 'Drama',
        'released': 2014,
        'isFavorite': true
      };
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(200, film);

      await store.dispatch(fetchPromoFilm());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFilm.pending.type,
        filmRequested.type,
        filmLoaded.type,
        fetchFilm.fulfilled.type,
      ]);
    });

    it('should dispatch "fetchPromoFilm.pending", "filmNotLoaded", "fetchPromoFilm.fulfilled" with thunk "fetchPromoFilm', async () => {
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(404);

      await store.dispatch(fetchPromoFilm());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFilm.pending.type,
        filmRequested.type,
        filmNotLoaded.type,
        fetchFilm.fulfilled.type,
      ]);
    });
  });

  describe('fetchSimilar', () => {
    it('should dispatch "fetchSimilar.pending", "similarLoaded" and "fetchSimilar.fulfilled" with thunk "fetchSimilar', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Films }/id/similar`).reply(200);

      await store.dispatch(fetchSimilar('id'));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchSimilar.pending.type,
        similarRequested.type,
        similarLoaded.type,
        fetchSimilar.fulfilled.type,
      ]);
    });

    it('should dispatch "fetchSimilar.pending" and "fetchSimilar.rejected" with thunk "fetchSimilar', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Films }/id/similar`).reply(404);

      await store.dispatch(fetchSimilar('id'));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchSimilar.pending.type,
        similarRequested.type,
        fetchSimilar.rejected.type,
      ]);
    });
  });

  describe('fetchComments', () => {
    it('should dispatch "fetchComments.pending", "commentsLoaded" and "fetchComments.fulfilled" with thunk "fetchComments', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/id`).reply(200);

      await store.dispatch(fetchComments('id'));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchComments.pending.type,
        commentsRequested.type,
        commentsLoaded.type,
        fetchComments.fulfilled.type,
      ]);
    });

    it('should dispatch "fetchComments.pending" and "fetchComments.rejected" with thunk "fetchComments', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/id`).reply(404);

      await store.dispatch(fetchComments('id'));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchComments.pending.type,
        commentsRequested.type,
        fetchComments.rejected.type,
      ]);
    });
  });

  describe('fetchFavorite', () => {
    it('should dispatch "fetchFavorite.pending", "filmsLoaded" and "fetchFavorite.fulfilled" with thunk "fetchFavorite', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200);

      await store.dispatch(fetchFavorite());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavorite.pending.type,
        favoriteRequested.type,
        favoriteLoaded.type,
        fetchFavorite.fulfilled.type,
      ]);
    });

    it('should dispatch "fetchFavorite.pending" and "fetchFavorite.rejected" with thunk "fetchFavorite', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(404);

      await store.dispatch(fetchFavorite());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavorite.pending.type,
        favoriteRequested.type,
        fetchFavorite.rejected.type,
      ]);
    });
  });

  describe('login', () => {
    it('should dispatch "fetchFavorite.pending", "signedIn" and "fetchFavorite.fulfilled" with thunk "login', async () => {

      const body: AuthorizationRequest = {
        email: 'email',
        password: 'password'
      };

      mockAxiosAdapter.onPost(APIRoute.Login, body).reply(200, {
        'name': 'Oliver.conner',
        'avatarUrl': 'https://url-to-image/image.jpg',
        'email': 'Oliver.conner@gmail.com',
        'token': 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20='
      });

      await store.dispatch(login(body));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        login.pending.type,
        signedIn.type,
        login.fulfilled.type,
      ]);
    });

    it('should dispatch "login.pending", "authFailed", "login.rejected" with thunk "login', async () => {
      const body: AuthorizationRequest = {
        email: 'email',
        password: 'password'
      };

      mockAxiosAdapter.onPost(APIRoute.Login, body).reply(400, {
        'errorType': 'VALIDATION_ERROR',
        'message': 'Validation error: /wtw/login',
        'details': [
          {
            'property': 'password',
            'value': 'p',
            'messages': [
              'password must be longer than or equal to 3 characters'
            ]
          }
        ]
      });

      await store.dispatch(login(body));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        login.pending.type,
        authFailed.type,
        login.fulfilled.type,
      ]);
    });
  });

  describe('logout', () => {
    it('should dispatch "logout.pending", "signedOut" and "logout.fulfilled" with thunk "logout', async () => {
      localStorage.setItem('wtw-token', 'token');
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
      await store.dispatch(logout());

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logout.pending.type,
        signedOut.type,
        logout.fulfilled.type,
      ]);
    });
  });

  describe('checkLogin', () => {
    it('should dispatch "checkLogin.pending", "signedIn" and "checkLogin.fulfilled" with thunk "checkLogin', async () => {
      localStorage.setItem('wtw-token', 'token');
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200, {
        'name': 'Oliver.conner',
        'avatarUrl': 'https://url-to-image/image.jpg',
        'email': 'Oliver.conner@gmail.com',
        'token': 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20='
      });

      await store.dispatch(checkLogin());

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkLogin.pending.type,
        signedIn.type,
        checkLogin.fulfilled.type,
      ]);
    });

    it('should dispatch "checkLogin.pending", "signedOut" and "checkLogin.fulfilled" with thunk "checkLogin', async () => {
      await store.dispatch(checkLogin());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkLogin.pending.type,
        signedOut.type,
        checkLogin.fulfilled.type,
      ]);
    });

    it('should dispatch "checkLogin.pending", "signedOut" and "checkLogin.fulfilled" with thunk "checkLogin', async () => {
      localStorage.setItem('userToken', 'token');
      mockAxiosAdapter.onGet(APIRoute.Login).reply(401, {
        'errorType': 'COMMON_ERROR',
        'message': 'Access deny.'
      });

      await store.dispatch(checkLogin());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkLogin.pending.type,
        signedOut.type,
        checkLogin.fulfilled.type,
      ]);
    });
  });
});
