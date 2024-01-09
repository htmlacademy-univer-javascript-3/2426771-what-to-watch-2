import {FC} from 'react';
import { getRatingLevel } from '../../helpers/get-rating-level';

interface Props {
  description: string;
  rating: number;
  scoresCount: number;
  director: string;
  starring: string[];
}

const FilmTabOverview: FC<Props> = ({rating, scoresCount, director, starring, description}) => (
  <>
    <div className="film-rating">
      <div className="film-rating__score">{rating}</div>
      <p className="film-rating__meta">
        <span className="film-rating__level">{getRatingLevel(rating)}</span>
        <span className="film-rating__count">{scoresCount}</span>
      </p>
    </div>

    <div className="film-card__text">
      <p>{description}</p>

      <p className="film-card__director"><strong>Director: {director}</strong></p>

      <p className="film-card__starring"><strong>Starring: {starring.join(', ')}</strong></p>
    </div>
  </>
);

export default FilmTabOverview;
