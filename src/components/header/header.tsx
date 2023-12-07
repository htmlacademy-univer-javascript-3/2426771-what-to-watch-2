import {FC, ReactNode} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../config/route';
import { AuthorizationStatus } from '../../types/authorization';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getAuthStatus } from '../../store/reducers/user-reducer';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { logout } from '../../store/api-actions';

interface HeaderProps {
  children?: ReactNode;
}

const Header: FC<HeaderProps> = ({children}) => {
  const authStatus = useAppSelector(getAuthStatus);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    dispatch(logout());
  };

  return (
    <header className="page-header film-card__head user-page__head">
      <div className="logo">
        <a className="logo__link" onClick={() => navigate(RoutePaths.Main)}>
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>

      {children}

      {authStatus === AuthorizationStatus.Auth
        ?
        <ul className="user-block">
          <li className="user-block__item">
            <div className="user-block__avatar" onClick={() => navigate(RoutePaths.MyList)}>
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </li>
          <li className="user-block__item">
            <a
              className="user-block__link"
              onClick={handleSignOut}
            >
              Sign out
            </a>
          </li>
        </ul>
        :
        <div className="user-block">
          <Link
            to={RoutePaths.SignIn}
            className="user-block__link"
          >
              Sign in
          </Link>
        </div>}
    </header>
  );
};

export default Header;
