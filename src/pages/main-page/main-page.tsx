import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RoutePaths } from '../../config/route';
import Header from '../../components/header/header';
import { GenresList } from '../../components/genres-list/genres-list';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getFilms, getFilmsLoadingStatus } from '../../store/reducers/films';
import FilmList from '../../components/film-list/film-list';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { isLoadingComplete } from '../../helpers/loading';
import { fetchFilms } from '../../store/api-actions';
import { useFilteredFilmCardsWithLimit } from '../../hooks/use-filtered-film-cards-with-limit';

type MainPageProps = {
  title: string;
  year: string;
}

const LIMIT_STEP = 8;

const MainPage: FC<MainPageProps> = ({title, year}) => {
  const dispatch = useAppDispatch();

  const filmCards = useAppSelector(getFilms);
  const loadingStatus = useAppSelector(getFilmsLoadingStatus);
  const [limit, setLimit] = useState(LIMIT_STEP);
  const {genre, genres, fullLength, filteredFilmCardsWithLimit} = useFilteredFilmCardsWithLimit(filmCards, limit);

  const handleMoreClick = () => setLimit((l) => l + LIMIT_STEP);

  useEffect(() => {
    dispatch(fetchFilms());
  }, []);

  if (!isLoadingComplete(loadingStatus)) {
    return <div>Спиннер</div>;
  }

  return (
    <div>
      <section className="film-card">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header />

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{title}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{year}</span>
              </p>

              <div className="film-card__buttons">
                <Link className="btn btn--play film-card__button" to={RoutePaths.Player}>
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList genres={genres}/>
          <FilmList filmCards={filteredFilmCardsWithLimit} />

          {limit < fullLength && (
            <div className="catalog__more">
              <button
                className="catalog__button"
                type="button"
                onClick={handleMoreClick}
              >
                Show more
              </button>
            </div>
          )}
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

