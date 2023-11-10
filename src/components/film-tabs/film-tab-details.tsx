import React from 'react';
import {FC} from 'react';

interface Props {
  director: string;
  starring: [string];
  runTime: number;
  genre: string;
  released: number;
}

const FilmTabDetails: FC<Props> = ({director, starring, runTime, genre, released}) => (
  <div className="film-card__text film-card__row">
    <div className="film-card__text-col" >
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Director</strong>
        <span className="film-card__details-value">{director}</span>
      </p>
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Starring</strong>
        <span className="film-card__details-value">
          {starring.map((s, i) => (
            <React.Fragment key={Math.random()}>
              {s}, {i === starring.length - 1 && <br/>}
            </React.Fragment>
          ))}
        </span>
      </p>
    </div>

    <div className="film-card__text-col">
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Run Time</strong>
        <span className="film-card__details-value">{runTime}</span>
      </p>
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Genre</strong>
        <span className="film-card__details-value">{genre}</span>
      </p>
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Released</strong>
        <span className="film-card__details-value">{released}</span>
      </p>
    </div>
  </div>
);

export default FilmTabDetails;
