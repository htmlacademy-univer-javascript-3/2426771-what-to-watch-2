import { FC } from 'react';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getFavorite } from '../../store/reducers/favorite';
import { Film } from '../../types/film';
import { APIRoute } from '../../config/api/routes';
import { api } from '../../config/api/api';
import { filmLoaded } from '../../store/reducers/film';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { fetchFavorite } from '../../store/api-actions';
import { getAuthStatus } from '../../store/reducers/user-reducer';
import { AuthorizationStatus } from '../../types/authorization';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../config/route';

interface Props {
  film: Film;
}

export const MyListButton: FC<Props> = ({ film }) => {
  const favorite = useAppSelector(getFavorite);
  const authStatus = useAppSelector(getAuthStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const changeStatus = async (status: 1 | 0) => {
    const {data} = await api.post<Film>(`${APIRoute.Favorite}/${film.id}/${status}`);
    dispatch(filmLoaded(data));
    dispatch(fetchFavorite());
  };

  const handleOnClickMutton = () => {
    if (authStatus === AuthorizationStatus.Auth) {
      changeStatus(film.isFavorite ? 0 : 1);
    } else {
      navigate(RoutePaths.SignIn);
    }
  };

  return (
    <button
      className="btn btn--list film-card__button"
      type="button"
      onClick={handleOnClickMutton}
    >
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref={film.isFavorite ? '#in-list' : '#add'}></use>
      </svg>
      <span>My list</span>
      {favorite.length > 0 ? <span className="film-card__count">{favorite.length}</span> : null}
    </button>
  );
};
