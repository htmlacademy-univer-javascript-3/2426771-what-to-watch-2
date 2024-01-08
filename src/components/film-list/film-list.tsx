import { FC } from 'react';
import FilmCard from '../film-card/film-card';
import { FilmCard as FilmCardType } from '../../types/film/index';

interface FilmListProps {
  filmCards: FilmCardType[];
}

const FilmList: FC<FilmListProps> = ({filmCards}) => (
  <div className="catalog__films-list">
    {filmCards.map((filmCard) => (
      <FilmCard
        key={filmCard.id}
        filmCard={filmCard}
      />
    ))}
  </div>
);

export default FilmList;
