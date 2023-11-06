import {FC} from 'react';
import { Link } from 'react-router-dom';
import { RoutePaths, getRoutePath } from '../../config/route';
import { FilmCard as FilmCardType } from '../../types/film';
import { VideoPreview } from '../video-preview/video-preview';

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
    <VideoPreview
      className="small-film-card__image"
      isActive={active}
      previewImage={`img/${filmCard.previewImage}`}
      videoLink={filmCard.previewVideoLink}
      alt={filmCard.name}
      videoTimeout={1000}
    />
    <h3 className="small-film-card__title">
      <Link className="small-film-card__link" to={getRoutePath(RoutePaths.Film, {id: filmCard.id})}>{filmCard.name}</Link>
    </h3>
  </article>
);

export default FilmCard;
