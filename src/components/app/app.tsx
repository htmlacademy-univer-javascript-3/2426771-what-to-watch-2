import {FC} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { getRouteConfig } from '../../config/route';

type AppProps = {
  title: string;
  genre: string;
  year: string;
}

const App: FC<AppProps> = ({title, genre, year}) => (
  <BrowserRouter>
    <Routes>
      {Object.entries(getRouteConfig({title, genre, year})).map(([path, routeProps]) => (
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
