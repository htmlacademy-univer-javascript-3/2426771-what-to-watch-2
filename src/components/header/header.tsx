import {FC, ReactNode} from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../config/route';

interface HeaderProps {
  children?: ReactNode;
}

const Header: FC<HeaderProps> = ({children}) => {
  const navigate = useNavigate();

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

      <ul className="user-block">
        <li className="user-block__item">
          <div className="user-block__avatar" onClick={() => navigate(RoutePaths.MyList)}>
            <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
          </div>
        </li>
        <li className="user-block__item">
          <a className="user-block__link">Sign out</a>
        </li>
      </ul>
    </header>
  );
};

export default Header;
