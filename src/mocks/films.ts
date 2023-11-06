import { Film, FilmCards } from '../types/film/index';

export const filmCards: FilmCards = [
  {
    id: '1',
    name: 'Звездные войны: Эпизод 9',
    previewImage: 'bohemian-rhapsody.jpg',
    previewVideoLink: 'https://www.shutterstock.com/shutterstock/videos/1072000261/preview/stock-footage-empty-green-screen-display-laptop-for-watching-and-paste-background-e-business-blog-or-gaming-app.webm',
    genre: 'Фантастика',
  }, {
    id: '2',
    name: 'Мстители: Финал',
    previewImage: 'bohemian-rhapsody.jpg',
    previewVideoLink: 'https://www.shutterstock.com/shutterstock/videos/1072000261/preview/stock-footage-empty-green-screen-display-laptop-for-watching-and-paste-background-e-business-blog-or-gaming-app.webm',
    genre: 'Боевик',
  }, {
    id: '3',
    name: 'Оно',
    previewImage: 'bohemian-rhapsody.jpg',
    previewVideoLink: 'https://www.shutterstock.com/shutterstock/videos/1072000261/preview/stock-footage-empty-green-screen-display-laptop-for-watching-and-paste-background-e-business-blog-or-gaming-app.webm',
    genre: 'Ужастик',
  }, {
    id: '4',
    name: 'Гарри Поттер и Проклятое дитя',
    previewImage: 'bohemian-rhapsody.jpg',
    previewVideoLink: 'https://www.shutterstock.com/shutterstock/videos/1072000261/preview/stock-footage-empty-green-screen-display-laptop-for-watching-and-paste-background-e-business-blog-or-gaming-app.webm',
    genre: 'Фэнтези',
  }, {
    id: '5',
    name: 'Зеленая книга',
    previewImage: 'bohemian-rhapsody.jpg',
    previewVideoLink: 'https://www.shutterstock.com/shutterstock/videos/1072000261/preview/stock-footage-empty-green-screen-display-laptop-for-watching-and-paste-background-e-business-blog-or-gaming-app.webm',
    genre: 'Биография',
  }, {
    id: '6',
    name: 'Темный рыцарь',
    previewImage: 'bohemian-rhapsody.jpg',
    previewVideoLink: 'https://www.shutterstock.com/shutterstock/videos/1072000261/preview/stock-footage-empty-green-screen-display-laptop-for-watching-and-paste-background-e-business-blog-or-gaming-app.webm',
    genre: 'Триллер',
  }, {
    id: '7',
    name: 'Богемская рапсодия',
    previewImage: 'bohemian-rhapsody.jpg',
    previewVideoLink: 'https://www.shutterstock.com/shutterstock/videos/1072000261/preview/stock-footage-empty-green-screen-display-laptop-for-watching-and-paste-background-e-business-blog-or-gaming-app.webm',
    genre: 'Драма',
  }, {
    id: '8',
    name: 'Джокер',
    previewImage: 'bohemian-rhapsody.jpg',
    previewVideoLink: 'https://www.shutterstock.com/shutterstock/videos/1072000261/preview/stock-footage-empty-green-screen-display-laptop-for-watching-and-paste-background-e-business-blog-or-gaming-app.webm',
    genre: 'Криминал',
  }
];

const getFilms = () => {
  const films = [];

  for (let i = 0; i < 8; i++) {
    const film: Film = {
      id: filmCards[i].id,
      name: filmCards[i].name,
      posterImage: `https://via.placeholder.com/300x300/${i}`,
      backgroundImage: filmCards[i].previewImage,
      backgroundColor: `rgb(${i}, ${i}, ${i})`,
      videoLink: filmCards[i].previewVideoLink,
      description: `Description ${i}`,
      rating: Math.floor(Math.random() * 10) + 1,
      scoresCount: Math.ceil(Math.random() * 10),
      director: `Director ${i}`,
      starring: [`Actor ${i}`],
      runTime: Math.ceil(Math.random() * 20),
      genre: filmCards[i].genre,
      released: Math.floor(Math.random() * 20),
      isFavorite: Math.random() < 0.5,
    };

    films.push(film);
  }

  return films;
};

export const films: Film[] = getFilms();