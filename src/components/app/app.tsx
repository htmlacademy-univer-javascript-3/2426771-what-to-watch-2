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
      {Object.values(getRouteConfig({title, genre, year})).map(({ element, path }) => (
        <Route
          key={path}
          path={path}
          element={element}
        />
      ))}
    </Routes>
  </BrowserRouter>
);

export default App;
