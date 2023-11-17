import { Film, FilmCards } from '../types/film/index';

export const filmCards: FilmCards = [
  {
    id: '1',
    name: 'Звездные войны: Эпизод 9',
    previewImage: 'bohemian-rhapsody.jpg',
    previewVideoLink: 'https://www.shutterstock.com/shutterstock/videos/1072000261/preview/stock-footage-empty-green-screen-display-laptop-for-watching-and-paste-background-e-business-blog-or-gaming-app.webm',
    genre: 'Fantastic',
  }, {
    id: '2',
    name: 'Мстители: Финал',
    previewImage: 'bohemian-rhapsody.jpg',
    previewVideoLink: 'https://www.shutterstock.com/shutterstock/videos/1072000261/preview/stock-footage-empty-green-screen-display-laptop-for-watching-and-paste-background-e-business-blog-or-gaming-app.webm',
    genre: 'Action',
  }, {
    id: '3',
    name: 'Оно',
    previewImage: 'bohemian-rhapsody.jpg',
    previewVideoLink: 'https://www.shutterstock.com/shutterstock/videos/1072000261/preview/stock-footage-empty-green-screen-display-laptop-for-watching-and-paste-background-e-business-blog-or-gaming-app.webm',
    genre: 'Horror',
  }, {
    id: '4',
    name: 'Гарри Поттер и Проклятое дитя',
    previewImage: 'bohemian-rhapsody.jpg',
    previewVideoLink: 'https://www.shutterstock.com/shutterstock/videos/1072000261/preview/stock-footage-empty-green-screen-display-laptop-for-watching-and-paste-background-e-business-blog-or-gaming-app.webm',
    genre: 'Fantasy',
  }, {
    id: '5',
    name: 'Зеленая книга',
    previewImage: 'bohemian-rhapsody.jpg',
    previewVideoLink: 'https://www.shutterstock.com/shutterstock/videos/1072000261/preview/stock-footage-empty-green-screen-display-laptop-for-watching-and-paste-background-e-business-blog-or-gaming-app.webm',
    genre: 'Biography',
  }, {
    id: '6',
    name: 'Темный рыцарь',
    previewImage: 'bohemian-rhapsody.jpg',
    previewVideoLink: 'https://www.shutterstock.com/shutterstock/videos/1072000261/preview/stock-footage-empty-green-screen-display-laptop-for-watching-and-paste-background-e-business-blog-or-gaming-app.webm',
    genre: 'Thriller',
  }, {
    id: '7',
    name: 'Богемская рапсодия',
    previewImage: 'bohemian-rhapsody.jpg',
    previewVideoLink: 'https://www.shutterstock.com/shutterstock/videos/1072000261/preview/stock-footage-empty-green-screen-display-laptop-for-watching-and-paste-background-e-business-blog-or-gaming-app.webm',
    genre: 'Drama',
  }, {
    id: '8',
    name: 'Джокер',
    previewImage: 'bohemian-rhapsody.jpg',
    previewVideoLink: 'https://www.shutterstock.com/shutterstock/videos/1072000261/preview/stock-footage-empty-green-screen-display-laptop-for-watching-and-paste-background-e-business-blog-or-gaming-app.webm',
    genre: 'Crime',
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
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ${i}`,
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
export const fetchFilm = (id: string) => films.find((f) => f.id === id) ?? null;
