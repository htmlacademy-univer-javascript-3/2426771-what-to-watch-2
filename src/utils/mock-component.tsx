import { HelmetProvider } from 'react-helmet-async';
import { RootState } from '../store';
import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { api } from '../config/api/api';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import HistoryRouter from '../components/history-route/history-route';
import { BrowserHistory } from 'history';

export function withRouter(component: JSX.Element, history: BrowserHistory) {
  return (
    <HistoryRouter basename={'/'} history={history}>
      <HelmetProvider>
        {component}
      </HelmetProvider>
    </HistoryRouter>
  );
}

type ComponentWithMockStore = {
  withStoreComponent: JSX.Element;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
}

export function withStore(
  component: JSX.Element,
  initialState: Partial<RootState> = {},
): ComponentWithMockStore {
  const mockAxiosAdapter = new MockAdapter(api);
  const middleware = [thunk.withExtraArgument(api)];
  const mockStoreCreator = configureMockStore<RootState, Action<string>, ThunkDispatch<RootState, AxiosInstance, Action<string>>>(middleware);
  const mockStore = mockStoreCreator(initialState);

  return ({
    withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockStore,
    mockAxiosAdapter,
  });
}
