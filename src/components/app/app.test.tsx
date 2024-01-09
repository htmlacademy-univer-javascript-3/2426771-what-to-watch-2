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
import FilmPage from '../../pages/film-page/film-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "MainPage" when user navigate to "/"', () => {
    const { withStoreComponent } = withStore(withRouter(<MainPage />, mockHistory), {...makeFakeStore(), films: {films: [], loadingStatus: LoadingStatus.Loaded}});
    mockHistory.push(RoutePaths.Main);

    render(withStoreComponent);

    expect(screen.getByText('WTW')).toBeInTheDocument();
  });

  it('should render "SignInPage" when user navigate to "/login"', () => {
    const { withStoreComponent } = withStore(withRouter(<SignInPage />, mockHistory), makeFakeStore());
    mockHistory.push(RoutePaths.SignIn);

    render(withStoreComponent);

    expect(screen.getAllByText('Sign in')[0]).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByText('Email address')).toBeInTheDocument();
  });

  it('should render "MyListPage" when user navigate to "/mylist"', () => {
    const store = makeFakeStore({user: {...userInitialState, authorizationStatus: AuthorizationStatus.Auth}});

    const { withStoreComponent } = withStore(withRouter(<MyListPage />, mockHistory), store);
    mockHistory.push(RoutePaths.MyList);

    render(withStoreComponent);

    expect(screen.getByText('My list')).toBeInTheDocument();
  });

  it('should render "FilmPage" when user navigate to "/film/:id"', () => {
    //TODO
    // mockHistory.push(RoutePaths.Film.replace(':id', 'c8682b0c-a8dd-4f2d-befd-36d59e4fcf7c'));
    // console.log(mockHistory.location);

    // const store = makeFakeStore();
    // const { withStoreComponent, mockAxiosAdapter } = withStore(withRouter(<FilmPage />, mockHistory), store);

    // render(withStoreComponent);

    // expect(screen.getByText('My list')).toBeInTheDocument();
    // screen.debug();
  });

  it('should render "NotFoundPage" when user navigate to "/404"', () => {
    const { withStoreComponent } = withStore(withRouter(<NotFoundPage />, mockHistory), makeFakeStore());
    mockHistory.push(RoutePaths.Page404);

    render(withStoreComponent);
    expect(screen.getAllByText('404 Not Found')[0]).toBeInTheDocument();
  });

  it('should render "NotFoundPage" when user navigate to "/*"', () => {
    const { withStoreComponent } = withStore(withRouter(<NotFoundPage />, mockHistory), makeFakeStore());
    mockHistory.push('any_path');

    render(withStoreComponent);
    expect(screen.getAllByText('404 Not Found')[0]).toBeInTheDocument();
  });
});
