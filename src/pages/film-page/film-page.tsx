import {FC, useEffect, useState} from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { RoutePaths, getRoutePath } from '../../config/route';
import Header from '../../components/header/header';
import FilmTabsMenu from '../../components/film-tabs-menu/film-tabs-menu';
import { fetchFilm, filmCards } from '../../mocks/films';
import { Film } from '../../types/film/index';
import { useHash } from '../../hooks/useHash';
import FilmTabs from '../../components/film-tabs/film-tabs';
import {FilmTabs as FilmTabsType} from '../../types/film-tab/';
import FilmList from '../../components/film-list/film-list';

const FilmPage: FC = () => {
  const {id} = useParams();
  const [film, setFilm] = useState<Film>();

  const navigate = useNavigate();
  const hash = useHash<FilmTabsType>();

  useEffect(() => {
    if (!id) {
      return navigate(RoutePaths.Page404);
    }

    const resFilm = fetchFilm(id);

    if (!resFilm) {
      return navigate(RoutePaths.Page404);
    }

    setFilm(resFilm);
  }, [id, navigate]);

  if (!hash) {
    return <Navigate to={`#${FilmTabsType.Overview}`}/>;
  }

  return (
    <div>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header />

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">The Grand Budapest Hotel</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">Drama</span>
                <span className="film-card__year">2014</span>
              </p>

              <div className="film-card__buttons">
                <Link className="btn btn--play film-card__button" type="button" to={RoutePaths.Film}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </Link>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
                <Link to={getRoutePath(RoutePaths.AddReview, {id: id || ''})} className="btn film-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <FilmTabsMenu/>
              {film && (
                <FilmTabs
                  tab={hash}
                  film={film}
                />
              )}
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmList filmCards={filmCards.slice(0, 4)} />
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
