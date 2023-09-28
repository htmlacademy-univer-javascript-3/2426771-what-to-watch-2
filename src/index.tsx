import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app1/app1';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      title={'The Grand Budapest Hotel'}
      genre={'Drama'}
      year={'20141'}
    />
  </React.StrictMode>
);
