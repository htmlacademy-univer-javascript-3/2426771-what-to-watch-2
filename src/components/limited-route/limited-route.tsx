import {FC} from 'react';
import { Navigate } from 'react-router-dom';

type LimitedRouteProps = {
    redirectCondition: boolean;
    redirectTo: string;
    children: React.ReactNode;
}

const LimitedRoute: FC<LimitedRouteProps> = ({redirectCondition, redirectTo, children}) => redirectCondition ? <Navigate to={redirectTo}/> : (children);

export default LimitedRoute;
