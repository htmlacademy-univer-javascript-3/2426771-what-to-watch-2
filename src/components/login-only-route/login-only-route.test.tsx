import { MemoryHistory, createMemoryHistory } from 'history';
import { withRouter, withStore } from '../../utils/mock-component';
import { Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { RoutePaths } from '../../config/route';
import LoginOnlyRoute from './login-only-route';
import { makeFakeStore } from '../../utils/mocks';
import { AuthorizationStatus } from '../../types/authorization';

describe('Component: PrivateRoute', () => {
  let mockHistory: MemoryHistory;

  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });

  beforeEach(() => {
    mockHistory.push(RoutePaths.MyList);
  });

  it('should render component for public route, when user not authorized', () => {
    const expectedText = 'public route';
    const notExpectedText = 'private route';
    const { withStoreComponent } = withStore(withRouter(
      <Routes>
        <Route path={RoutePaths.SignIn} element={<span>{expectedText}</span>} />
        <Route path={RoutePaths.MyList} element={
          <LoginOnlyRoute>
            <span>{notExpectedText}</span>
          </LoginOnlyRoute>
        }
        />
      </Routes>,
      mockHistory
    ), {...makeFakeStore(), user: {...makeFakeStore().user, authorizationStatus: AuthorizationStatus.NoAuth}});

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user authorized', () => {
    const expectedText = 'private route';
    const notExpectedText = 'public route';
    const { withStoreComponent } = withStore(withRouter(
      <Routes>
        <Route path={RoutePaths.SignIn} element={<span>{notExpectedText}</span>} />
        <Route path={RoutePaths.MyList} element={
          <LoginOnlyRoute>
            <span>{expectedText}</span>
          </LoginOnlyRoute>
        }
        />
      </Routes>,
      mockHistory
    ), {...makeFakeStore(), user: {...makeFakeStore().user, authorizationStatus: AuthorizationStatus.Auth}});

    render(withStoreComponent);

    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
