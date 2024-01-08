import { FC, useState } from 'react';
import { useFilteredFilmCardsWithLimit } from '../../hooks/use-filtered-film-cards-with-limit';
import { GenresList } from '../genres-list/genres-list';
import FilmList from '../film-list/film-list';
import { FilmCard } from '../../types/film';

interface Props {
  filmCards: FilmCard[];
}

const LIMIT_STEP = 8;

export const GenreTabs: FC<Props> = ({ filmCards }) => {
  const [limit, setLimit] = useState(LIMIT_STEP);
  const {genres, fullLength, filteredFilmCardsWithLimit} = useFilteredFilmCardsWithLimit(filmCards, limit);

  const handleMoreClick = () => setLimit((l) => l + LIMIT_STEP);

  return (
    <>
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
    </>
  );
};
