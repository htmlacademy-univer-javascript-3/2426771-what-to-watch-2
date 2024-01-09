import { FC, useEffect } from 'react';
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { RoutePaths, getRoutePath } from '../../config/route';
import Header from '../../components/header/header';
import FilmTabsMenu from '../../components/film-tabs-menu/film-tabs-menu';
import { useHash } from '../../hooks/use-hash';
import FilmTabs from '../../components/film-tabs/film-tabs';
import { FilmTabs as FilmTabsType } from '../../types/film-tab/';
import { fetchFilm, fetchSimilar } from '../../store/api-actions';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getFilm, getFilmLoadingStatus } from '../../store/reducers/film/film';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { getSimilar } from '../../store/reducers/similar/similar';
import FilmList from '../../components/film-list/film-list';
import { LoadingStatus } from '../../types/loading/loading';
import { getAuthStatus } from '../../store/reducers/user/user';
import { AuthorizationStatus } from '../../types/authorization';
import { PlayButton } from '../../components/play-button/play-button';
import { MyListButton } from '../../components/my-list-button/my-list-button';

const FilmPage: FC = () => {
  const {id} = useParams();
  const film = useAppSelector(getFilm);
  const filmLoadingStatus = useAppSelector(getFilmLoadingStatus);
  const similar = useAppSelector(getSimilar);
  const authStatus = useAppSelector(getAuthStatus);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const hash = useHash<FilmTabsType>();

  if (filmLoadingStatus === LoadingStatus.Loaded && film === null) {
    navigate(RoutePaths.Page404);
  }

  useEffect(() => {
    if (!id) {
      return navigate(RoutePaths.Page404);
    }

    dispatch(fetchFilm(id));
    dispatch(fetchSimilar(id));
  }, [id, navigate]);

  if (!hash) {
    return <Navigate to={`#${FilmTabsType.Overview}`} />;
  }

  return (
    <div>
      <section
        className="film-card film-card--full"
        style={{ backgroundColor: film?.backgroundColor }}
      >
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film?.posterImage} alt={film?.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header />

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film?.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film?.genre}</span>
                <span className="film-card__year">{film?.released}</span>
              </p>

              <div className="film-card__buttons">
                <PlayButton id={id || ''} />
                {film && <MyListButton film={film} />}
                {authStatus === AuthorizationStatus.Auth && (
                  <Link
                    to={getRoutePath(RoutePaths.AddReview, { id: id || '' })}
                    className="btn film-card__button"
                  >
                    Add review
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img
                src={film?.posterImage}
                alt={`${film?.name ?? ''} poster`}
                width="218"
                height="327"
              />
            </div>

            <div className="film-card__desc">
              <FilmTabsMenu />
              {film && <FilmTabs tab={hash} film={film} />}
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmList filmCards={similar.slice(0, 4)} />
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
    </div>
  );
};

export default FilmPage;
