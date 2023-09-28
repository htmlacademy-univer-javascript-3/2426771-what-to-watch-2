import {FC} from 'react';
import { Navigate } from 'react-router-dom';

type LimitedRouteProps = {
    redirectCondition: boolean;
    redirectTo: string;
    children: React.ReactNode;
}

const LimitedRoute: FC<LimitedRouteProps> = ({redirectCondition, redirectTo, children}) => {
  if (redirectCondition) {
    return <Navigate to={redirectTo}/>;
  } else {
    return children;
  }
};

export default LimitedRoute;
