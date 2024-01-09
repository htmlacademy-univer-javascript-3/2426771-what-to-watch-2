import { FC, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { getRouteConfig } from '../../config/route';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { checkLogin, fetchFavorite } from '../../store/api-actions';
import { getAuthStatus } from '../../store/reducers/user/user';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthStatus);

  useEffect(() => {
    dispatch(checkLogin());
  }, []);

  useEffect(() => {
    dispatch(fetchFavorite());
  }, [authStatus]);

  return (
    <BrowserRouter>
      <Routes>
        {Object.entries(getRouteConfig()).map(([path, routeProps]) => (
          <Route key={path} path={path} {...routeProps} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
