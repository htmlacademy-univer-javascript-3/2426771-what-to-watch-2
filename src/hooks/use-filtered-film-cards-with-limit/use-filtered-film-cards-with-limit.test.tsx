import { makeFakeStore } from '../../utils/mocks';
import { renderHook } from '@testing-library/react';
import { useFilteredFilmCardsWithLimit } from './use-filtered-film-cards-with-limit';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { RootState } from '../../store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { api } from '../../config/api/api';
import thunk from 'redux-thunk';

const filmCards = [{
  id: 'id0',
  name: 'name',
  previewImage: 'img',
  previewVideoLink: 'l',
  genre: 'Genre0'
}, {
  id: 'id1',
  name: 'name',
  previewImage: 'img',
  previewVideoLink: 'l',
  genre: 'Genre0'
}, {
  id: 'id2',
  name: 'name',
  previewImage: 'img',
  previewVideoLink: 'l',
  genre: 'Genre1'
}, {
  id: 'id3',
  name: 'name',
  previewImage: 'img',
  previewVideoLink: 'l',
  genre: 'Genre2'
}, {
  id: 'id4',
  name: 'name',
  previewImage: 'img',
  previewVideoLink: 'l',
  genre: 'Genre3'
}];

describe('Hook: useFilteredFilmCardsWithLimit', () => {
  it('should filter cards', () => {
    const middleware = [thunk.withExtraArgument(api)];
    const mockStoreCreator = configureMockStore<RootState, Action<string>, ThunkDispatch<RootState, AxiosInstance, Action<string>>>(middleware);
    const mockStore = mockStoreCreator(makeFakeStore({ filters: {...makeFakeStore().filters, genre: 'Genre0'}}));
    const wrapper = ({ children }: { children: JSX.Element }) => <Provider store={mockStore}>{children}</Provider>;

    const { result } = renderHook(() => useFilteredFilmCardsWithLimit(filmCards, 3), { wrapper });
    const { filteredFilmCardsWithLimit } = result.current;

    expect(filteredFilmCardsWithLimit.length).toBe(2);
  });

  it('should limit cards', () => {
    const middleware = [thunk.withExtraArgument(api)];
    const mockStoreCreator = configureMockStore<RootState, Action<string>, ThunkDispatch<RootState, AxiosInstance, Action<string>>>(middleware);
    const mockStore = mockStoreCreator(makeFakeStore({ filters: {...makeFakeStore().filters, genre: 'Genre0'}}));
    const wrapper = ({ children }: { children: JSX.Element }) => <Provider store={mockStore}>{children}</Provider>;

    const { result } = renderHook(() => useFilteredFilmCardsWithLimit(filmCards, 1), { wrapper });
    const { filteredFilmCardsWithLimit } = result.current;

    expect(filteredFilmCardsWithLimit.length).toBe(1);
  });
});
