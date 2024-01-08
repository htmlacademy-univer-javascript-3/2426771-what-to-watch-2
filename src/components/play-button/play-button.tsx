import { FC } from 'react';
import { RoutePaths } from '../../config/route';
import { Link } from 'react-router-dom';

interface Props {
  id: string;
}

export const PlayButton: FC<Props> = ({ id }) => (
  <Link
    className="btn btn--play film-card__button"
    type="button"
    to={RoutePaths.Player.replace(':id', id)}
  >
    <svg viewBox="0 0 19 19" width="19" height="19">
      <use xlinkHref="#play-s"></use>
    </svg>
    <span>Play</span>
  </Link>
);
