import {FC, ReactNode} from 'react';
import { Navigate } from 'react-router-dom';

type LimitedRouteProps = {
    redirectCondition: boolean;
    redirectTo: string;
    children: ReactNode;
}

const LimitedRoute: FC<LimitedRouteProps> = ({redirectCondition, redirectTo, children}) => redirectCondition ? <Navigate to={redirectTo}/> : children;

export default LimitedRoute;
