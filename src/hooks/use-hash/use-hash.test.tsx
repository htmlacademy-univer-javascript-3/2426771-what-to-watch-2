import { makeFakeStore } from '../../utils/mocks';
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { RootState } from '../../store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { api } from '../../config/api/api';
import thunk from 'redux-thunk';
import { useHash } from './use-hash';
import { createMemoryHistory } from 'history';
import { withRouter } from '../../utils/mock-component';

describe('Hook: useHash', () => {

  it('should return hash', () => {
    const mockHistory = createMemoryHistory();
    mockHistory.push('/path#hash');

    const middleware = [thunk.withExtraArgument(api)];
    const mockStoreCreator = configureMockStore<RootState, Action<string>, ThunkDispatch<RootState, AxiosInstance, Action<string>>>(middleware);
    const mockStore = mockStoreCreator(makeFakeStore({ filters: {...makeFakeStore().filters, genre: 'Genre0'}}));
    const wrapper = ({ children }: { children: JSX.Element }) => <Provider store={mockStore}>{withRouter(children, mockHistory)}</Provider>;

    const { result } = renderHook(() => useHash(), { wrapper });
    const value = result.current;

    expect(value).toBe('hash');
  });

});
