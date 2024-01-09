import { FC, useEffect } from 'react';
import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks/use-app-selector';
import {
  getFilms,
  getFilmsLoadingStatus,
} from '../../store/reducers/films/films';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { isLoadingComplete } from '../../helpers/loading';
import { fetchFilms, fetchPromoFilm } from '../../store/api-actions';
import { GenreTabs } from '../../components/genre-tabs/genre-tabs';
import { PlayButton } from '../../components/play-button/play-button';
import { MyListButton } from '../../components/my-list-button/my-list-button';
import { getFilm } from '../../store/reducers/film/film';

const MainPage: FC = () => {
  const dispatch = useAppDispatch();

  const filmCards = useAppSelector(getFilms);
  const loadingStatus = useAppSelector(getFilmsLoadingStatus);
  const promoFilm = useAppSelector(getFilm);

  useEffect(() => {
    dispatch(fetchFilms());
    dispatch(fetchPromoFilm());
  }, []);

  if (!isLoadingComplete(loadingStatus)) {
    return <div>Спиннер</div>;
  }

  return (
    <div>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoFilm?.posterImage} alt={promoFilm?.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header />

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img
                src={promoFilm?.posterImage}
                alt={`${promoFilm?.name || ''} poster`}
                width="218"
                height="327"
              />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilm?.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilm?.genre}</span>
                <span className="film-card__year">{promoFilm?.released}</span>
              </p>

              <div className="film-card__buttons">
                <PlayButton id={'123'} />
                {promoFilm && <MyListButton film={promoFilm} />}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreTabs filmCards={filmCards} />
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
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

export default MainPage;
