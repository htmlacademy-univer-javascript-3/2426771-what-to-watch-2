import {FC} from 'react';

type FilmCardProps = {
  title: string;
  img: string;
}

const FilmCard: FC<FilmCardProps> = ({title, img}) => (
  <article className="small-film-card catalog__films-card">
    <div className="small-film-card__image">
      <img src={`img/${img}`} alt={title} width="280" height="175" />
    </div>
    <h3 className="small-film-card__title">
      <a className="small-film-card__link" href="film-page.html">{title}</a>
    </h3>
  </article>
);

export default FilmCard;
