import { makeFakeStore } from '../../utils/mocks';
import { renderHook } from '@testing-library/react';
import { useAppDispatch } from './use-app-dispatch';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { RootState } from '../../store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { api } from '../../config/api/api';
import thunk from 'redux-thunk';

describe('Hook: useAppDispatch', () => {
  it('should return function', () => {
    const middleware = [thunk.withExtraArgument(api)];
    const mockStoreCreator = configureMockStore<RootState, Action<string>, ThunkDispatch<RootState, AxiosInstance, Action<string>>>(middleware);
    const mockStore = mockStoreCreator(makeFakeStore());
    const wrapper = ({ children }: { children: JSX.Element }) => <Provider store={mockStore}>{children}</Provider>;

    const { result } = renderHook(() => useAppDispatch(), { wrapper: wrapper });
    const dispatch = result.current;

    expect(typeof dispatch).toBe('function');
  });
});
