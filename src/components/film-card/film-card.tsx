import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { RoutePaths, getRoutePath } from '../../config/route';
import { FilmCard as FilmCardType } from '../../types/film';
import { VideoPreview } from '../video-preview/video-preview';

type FilmCardProps = {
  filmCard: FilmCardType;
}

const FilmCard: FC<FilmCardProps> = ({filmCard}) => {
  const [active, setActive] = useState<boolean | null>(false);

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseOver={() => setActive(true)}
      onMouseOut={() => setActive(null)}
    >
      <VideoPreview
        className="small-film-card__image"
        isActive={active ?? false}
        previewImage={filmCard.previewImage}
        videoLink={filmCard.previewVideoLink}
        alt={filmCard.name}
        videoTimeout={1000}
      />
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={getRoutePath(RoutePaths.Film, {id: filmCard.id})}>{filmCard.name}</Link>
      </h3>
    </article>
  );
};

export default FilmCard;

