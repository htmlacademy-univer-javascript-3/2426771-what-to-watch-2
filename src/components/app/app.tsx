import {FC, useEffect} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { getRouteConfig } from '../../config/route';
import { Film, FilmCards } from '../../types/film';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { filmCardsLoaded } from '../../store/reducer';

type AppProps = {
  title: string;
  year: string;
  filmCards: FilmCards;
  videoLink: string;
  film: Film;
}

const App: FC<AppProps> = ({title, year, filmCards, videoLink, film}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(filmCardsLoaded(filmCards));
  }, []);

  return(
    <BrowserRouter>
      <Routes>
        {Object.entries(getRouteConfig({title, year, filmCards, videoLink, film})).map(([path, routeProps]) => (
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
