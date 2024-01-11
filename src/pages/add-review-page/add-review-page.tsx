import { FC, useEffect } from 'react';
import Header from '../../components/header/header';
import { RoutePaths, getRoutePath } from '../../config/route';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CommentForm from '../../components/comment-form/comment-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getFilm, getFilmLoadingStatus } from '../../store/reducers/film/film';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { LoadingStatus } from '../../types/loading/loading';
import { fetchFilm } from '../../store/api-actions';
import { getAuthStatus } from '../../store/reducers/user/user';
import { AuthorizationStatus } from '../../types/authorization';

const AddReviewPage: FC = () => {
  const { id } = useParams();
  const film = useAppSelector(getFilm);
  const filmLoadingStatus = useAppSelector(getFilmLoadingStatus);
  const authStatus = useAppSelector(getAuthStatus);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  if (filmLoadingStatus === LoadingStatus.Loaded && film === null) {
    navigate(RoutePaths.Page404);
  }

  useEffect(() => {
    if (authStatus === AuthorizationStatus.NoAuth) {
      return navigate(RoutePaths.SignIn);
    }
  }, [authStatus]);

  useEffect(() => {
    if (id) {
      dispatch(fetchFilm(id));
    }
  }, [id]);

  return (
    <section
      className="film-card film-card--full"
      style={{ backgroundColor: film?.backgroundColor }}
    >
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film?.backgroundImage} alt={film?.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header>
          <Breadcrumbs
            breadcrumbs={{
              links: [
                {
                  title: film?.name || '',
                  link: getRoutePath(RoutePaths.Film, { id: id ?? '' }),
                },
              ],
              lastChild: 'Add review',
            }}
          />
        </Header>

        <div className="film-card__poster film-card__poster--small">
          <img
            src={film?.backgroundImage}
            alt={`${film?.name ?? ''}poster`}
            width="218"
            height="327"
          />
        </div>
      </div>

      <div className="add-review">
        <CommentForm backgroundColor={film?.backgroundColor} />
      </div>
    </section>
  );
};

export default AddReviewPage;
