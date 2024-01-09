import { FC, ReactElement } from 'react';
import LimitedRoute from '../limited-route/limited-route';
import { AuthorizationStatus } from '../../types/authorization';
import { RoutePaths } from '../../config/route';
import { getAuthStatus } from '../../store/reducers/user/user';
import { useAppSelector } from '../../hooks/use-app-selector';

type LoginOnlyRouteProps = {
  children: ReactElement;
};

const LoginOnlyRoute: FC<LoginOnlyRouteProps> = ({ children }) => {
  const loginState = useAppSelector(getAuthStatus);
  const isAuth = loginState === AuthorizationStatus.Auth;

  return (
    <LimitedRoute redirectCondition={!isAuth} redirectTo={RoutePaths.SignIn}>
      {children}
    </LimitedRoute>
  );
};

export default LoginOnlyRoute;
