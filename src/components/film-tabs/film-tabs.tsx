import {FC} from 'react';
import { FilmTabs as FilmTabsType } from '../../types/film-tab/index';
import { Film } from '../../types/film';
import FilmTabOverview from './film-tab-overview';
import FilmTabDetails from './film-tab-details';
import { FilmTabReviews } from './film-tab-reviews';

interface Props {
  tab: FilmTabsType;
  film: Film;
}

const FilmTabs: FC<Props> = ({tab, film}) => {
  switch (tab) {
    case FilmTabsType.Overview:
      return (
        <FilmTabOverview
          description={film.description}
          rating={film.rating}
          scoresCount={film.scoresCount}
          director={film.director}
          starring={film.starring}
        />);
    case FilmTabsType.Details:
      return(
        <FilmTabDetails
          director={film.director}
          starring={film.starring}
          runTime={film.runTime}
          genre={film.genre}
          released={film.released}
        />);
    case FilmTabsType.Reviews:
      return(
        <FilmTabReviews
          filmId={film.id}
        />);
  }
};

export default FilmTabs;
