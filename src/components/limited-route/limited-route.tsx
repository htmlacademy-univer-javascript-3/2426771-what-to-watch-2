import {FC} from 'react';
import { Navigate } from 'react-router-dom';

type LimitedRouteProps = {
    redirectCondition: boolean;
    redirectTo: string;
    children: React.ReactNode;
}

// eslint-disable-next-line react/jsx-no-useless-fragment
const LimitedRoute: FC<LimitedRouteProps> = ({redirectCondition, redirectTo, children}) => redirectCondition ? <Navigate to={redirectTo}/> : <>{children}</>;

export default LimitedRoute;
