import { MemoryHistory, createMemoryHistory } from 'history';
import { RoutePaths } from '../../config/route';
import { withRouter, withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';
import { render, screen } from '@testing-library/react';
import { LoadingStatus } from '../../types/loading/loading';
import SignInPage from '../../pages/sign-in-page/sign-in-page';
import MainPage from '../../pages/main-page/main-page';
import MyListPage from '../../pages/my-list-page/my-list-page';
import { AuthorizationStatus } from '../../types/authorization';
import { initialState as userInitialState } from '../../store/reducers/user/user';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "MainPage" when user navigate to "/"', () => {
    const { withStoreComponent } = withStore(
      withRouter(<MainPage />, mockHistory),
      {
        ...makeFakeStore(),
        films: { films: [], loadingStatus: LoadingStatus.Loaded },
      }
    );
    mockHistory.push(RoutePaths.Main);

    render(withStoreComponent);

    expect(screen.getByText('WTW')).toBeInTheDocument();
  });

  it('should render "SignInPage" when user navigate to "/login"', () => {
    const { withStoreComponent } = withStore(
      withRouter(<SignInPage />, mockHistory),
      makeFakeStore()
    );
    mockHistory.push(RoutePaths.SignIn);

    render(withStoreComponent);

    expect(screen.getAllByText('Sign in')[0]).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByText('Email address')).toBeInTheDocument();
  });

  it('should render "MyListPage" when user navigate to "/mylist"', () => {
    const store = makeFakeStore({
      user: {
        ...userInitialState,
        authorizationStatus: AuthorizationStatus.Auth,
      },
    });

    const { withStoreComponent } = withStore(
      withRouter(<MyListPage />, mockHistory),
      store
    );
    mockHistory.push(RoutePaths.MyList);

    render(withStoreComponent);

    expect(screen.getByText('My list')).toBeInTheDocument();
  });
});
