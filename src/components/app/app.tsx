import {FC, useEffect} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { getRouteConfig } from '../../config/route';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { fetchFilms } from '../../store/api-actions';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getFilmsLoadingStatus } from '../../store/reducers/films';
import { isLoadingComplete } from '../../helpers/loading';

type AppProps = {
  title: string;
  year: string;
  videoLink: string;
}

const App: FC<AppProps> = ({title, year, videoLink}) => {
  const dispatch = useAppDispatch();

  const loadingStatus = useAppSelector(getFilmsLoadingStatus);

  useEffect(() => {
    dispatch(fetchFilms());
  }, []);

  if (!isLoadingComplete(loadingStatus)) {
    return 'Спиннер :)';
  }

  return (
    <BrowserRouter>
      <Routes>
        {Object.entries(getRouteConfig({title, year, videoLink})).map(([path, routeProps]) => (
          <Route
            key={path}
            path={path}
            {...routeProps}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
