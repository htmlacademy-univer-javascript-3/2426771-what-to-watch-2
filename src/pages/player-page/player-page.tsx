import { useParams } from 'react-router-dom';
import { Player } from '../../components/player/player';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import NotFoundPage from '../not-found-page/not-found-page';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { getFilm, getFilmLoadingStatus } from '../../store/reducers/film/film';
import { LoadingStatus } from '../../types/loading/loading';
import { fetchFilm } from '../../store/api-actions';
import Spinner from '../../components/spinner/spinner';

const PlayerPage = () => {
  const {id = ''} = useParams();
  const film = useSelector(getFilm);
  const filmLoadingStatus = useSelector(getFilmLoadingStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(fetchFilm(id));
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, id]);

  if (!id || !film) {
    return (<NotFoundPage/>);
  }

  if (filmLoadingStatus !== LoadingStatus.Loaded) {
    return <Spinner/>;
  }

  return <Player film={film}/>;
};

export default PlayerPage;
