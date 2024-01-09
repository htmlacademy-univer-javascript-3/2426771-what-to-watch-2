import { makeFakeStore } from '../../utils/mocks';
import { renderHook } from '@testing-library/react';
import { useAppSelector } from './use-app-selector';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { RootState } from '../../store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { api } from '../../config/api/api';
import thunk from 'redux-thunk';
import { AuthorizationStatus } from '../../types/authorization';

describe('Hook: useAppSelector', () => {
  it('should return state', () => {
    const middleware = [thunk.withExtraArgument(api)];
    const mockStoreCreator = configureMockStore<RootState, Action<string>, ThunkDispatch<RootState, AxiosInstance, Action<string>>>(middleware);
    const mockStore = mockStoreCreator(makeFakeStore({ user: {...makeFakeStore().user, authorizationStatus: AuthorizationStatus.Auth}}));
    const wrapper = ({ children }: { children: JSX.Element }) => <Provider store={mockStore}>{children}</Provider>;

    const { result } = renderHook(() => useAppSelector((state: RootState) => state.user.authorizationStatus), { wrapper: wrapper });
    const state = result.current;

    expect(state).toBe(AuthorizationStatus.Auth);
  });
});
