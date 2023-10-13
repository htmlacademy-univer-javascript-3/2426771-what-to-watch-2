import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { filmCards, films } from './mocks/films';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      title={'The Grand Budapest Hotel'}
      genre={'Drama'}
      year={'2014'}
      filmCards={filmCards}
      videoLink={'img/player-poster.jpg'}
      film={films[0]}
    />
  </React.StrictMode>
);
