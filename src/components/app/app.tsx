import {FC} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { getRouteConfig } from '../../config/route';
import { Film, FilmCards } from '../../types/film';

type AppProps = {
  title: string;
  genre: string;
  year: string;
  filmCards: FilmCards;
  videoLink: string;
  film: Film;
}

const App: FC<AppProps> = ({title, genre, year, filmCards, videoLink, film}) => (
  <BrowserRouter>
    <Routes>
      {Object.entries(getRouteConfig({title, genre, year, filmCards, videoLink, film})).map(([path, routeProps]) => (
        <Route
          key={path}
          path={path}
          {...routeProps}
        />
      ))}
    </Routes>
  </BrowserRouter>
);

export default App;
