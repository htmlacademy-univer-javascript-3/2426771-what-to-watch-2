import { FC, useEffect } from 'react';
import FilmList from '../../components/film-list/film-list';
import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getFavorite } from '../../store/reducers/favorite/favorite';
import { getAuthStatus } from '../../store/reducers/user/user';
import { AuthorizationStatus } from '../../types/authorization';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../config/route';

const MyListPage: FC = () => {
  const favorite = useAppSelector(getFavorite);
  const authStatus = useAppSelector(getAuthStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (authStatus === AuthorizationStatus.NoAuth) {
      navigate(RoutePaths.SignIn);
    }
  }, [authStatus]);

  return (
    <div className="user-page">
      <Header>
        <h1 className="page-title user-page__title">
          My list <span className="user-page__film-count">9</span>
        </h1>
      </Header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <FilmList filmCards={favorite} />
      </section>

      <footer className="page-footer">
        <div className="logo">
          <a href="main.html" className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
};

export default MyListPage;
