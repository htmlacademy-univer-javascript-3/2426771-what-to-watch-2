import {FC, ReactNode} from 'react';
import LimitedRoute from '../limited-route/limited-route';
import { AuthorizationStatus } from '../../types/authorization';
import { RoutePaths } from '../../config/route';

type LoginOnlyRouteProps = {
  children: ReactNode;
}

const LoginOnlyRoute: FC<LoginOnlyRouteProps> = ({children}) => {
  const loginState = AuthorizationStatus.NoAuth as AuthorizationStatus;
  const isAuth = loginState === AuthorizationStatus.Auth;

  return (
    <LimitedRoute
      redirectCondition={!isAuth}
      redirectTo={RoutePaths.SignIn}
    >
      {children}
    </LimitedRoute>
  );
};

export default LoginOnlyRoute;
