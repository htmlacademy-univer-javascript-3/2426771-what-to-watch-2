import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { filmCards, films } from './mocks/films';
import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        title={'The Grand Budapest Hotel'}
        year={'2014'}
        filmCards={filmCards}
        videoLink={'img/player-poster.jpg'}
        film={films[0]}
      />
    </Provider>
  </React.StrictMode>
);
