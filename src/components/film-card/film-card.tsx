import {FC} from 'react';
import { Link } from 'react-router-dom';
import { RoutePaths, getRoutePath } from '../../config/route';
import { FilmCard as FilmCardType } from '../../types/film';

type FilmCardProps = {
  filmCard: FilmCardType;
  active: boolean;
  setActiveCard: React.Dispatch<React.SetStateAction<string | null>>;
}

const FilmCard: FC<FilmCardProps> = ({filmCard, setActiveCard, active}) => (
  <article
    className="small-film-card catalog__films-card"
    onMouseOver={() => setActiveCard(filmCard.id)}
    onMouseOut={() => setActiveCard(null)}
  >
    <div className="small-film-card__image">
      <img src={`img/${filmCard.previewImage}`} alt={filmCard.name} width="280" height="175"/>
    </div>
    <h3 className="small-film-card__title">
      <Link className="small-film-card__link" to={getRoutePath(RoutePaths.Film, {id: filmCard.id})} style={active ? {backgroundColor: 'red'} : {}}>{filmCard.name}</Link>
    </h3>
  </article>
);

export default FilmCard;
