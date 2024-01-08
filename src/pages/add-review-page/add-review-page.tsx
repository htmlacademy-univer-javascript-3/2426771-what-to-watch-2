import {FC, useEffect} from 'react';
import Header from '../../components/header/header';
import { RoutePaths, getRoutePath } from '../../config/route';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CommentForm from '../../components/comment-form/comment-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getFilm, getFilmLoadingStatus } from '../../store/reducers/film';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { LoadingStatus } from '../../types/loading/loading';
import { fetchFilm } from '../../store/api-actions';

const AddReviewPage: FC = () => {
  const {id} = useParams();
  const film = useAppSelector(getFilm);
  const filmLoadingStatus = useAppSelector(getFilmLoadingStatus);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  if (filmLoadingStatus === LoadingStatus.Loaded && film === null) {
    navigate(RoutePaths.Page404);
  }

  useEffect(() => {
    if (!id) {
      return navigate(RoutePaths.Page404);
    }

    dispatch(fetchFilm(id));
  }, [id, navigate]);

  return (
    <section className="film-card film-card--full" style={{backgroundColor: film?.backgroundColor}}>
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
                  link: getRoutePath(RoutePaths.Film, {id: id ?? ''})
                }
              ],
              lastChild: 'Add review'
            }}
          />
        </Header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film?.backgroundImage} alt={`${film?.name ?? ''}poster`} width="218" height="327" />
        </div>
      </div>

      <div className="add-review" >
        <CommentForm backgroundColor={film?.backgroundColor} />
      </div>

    </section>
  );
};

export default AddReviewPage;
