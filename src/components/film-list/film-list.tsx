import {FC, useState} from 'react';
import FilmCard from '../film-card/film-card';
import { FilmCard as FilmCardType } from '../../types/film/index';

interface FilmListProps {
  filmCards: FilmCardType[];
}

const FilmList: FC<FilmListProps> = ({filmCards}) => {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  return (
    <div className="catalog__films-list">
      {filmCards.map((filmCard) => (
        <FilmCard
          key={filmCard.id}
          filmCard={filmCard}
          active={activeCard === filmCard.id}
          setActiveCard={setActiveCard}
        />
      ))}
    </div>
  );
};

export default FilmList;
