import { FC, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { getRouteConfig } from '../../config/route';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { checkLogin, fetchFavorite } from '../../store/api-actions';

type AppProps = {
  title: string;
  year: string;
  videoLink: string;
};

const App: FC<AppProps> = ({ title, year, videoLink }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkLogin());
    dispatch(fetchFavorite());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {Object.entries(getRouteConfig({ title, year, videoLink })).map(
          ([path, routeProps]) => (
            <Route key={path} path={path} {...routeProps} />
          )
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
