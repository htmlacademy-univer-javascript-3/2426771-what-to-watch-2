import { Review } from '../types/review';

export const reviews: Review[] = [
  {
    id: '0',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    rating: Number((Math.random() * 10).toFixed(2)) ,
    username: 'Abcd Efgh',
    date: 'December 24, 2018'
  }, {
    id: '1',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    rating: Number((Math.random() * 10).toFixed(2)) ,
    username: 'Abfcd Effdsgh',
    date: 'December 24, 2018'
  }, {
    id: '2',
    text: 'Lorem ipsum dolor sit amet, eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    rating: Number((Math.random() * 10).toFixed(2)) ,
    username: 'Abfdscd Efvcgh',
    date: 'December 24, 2018'
  }, {
    id: '3',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    rating: Number((Math.random() * 10).toFixed(2)),
    username: 'Abcxbcd Efbcxcbgh',
    date: 'December 24, 2018'
  }, {
    id: '4',
    text: 'Incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    rating: Number((Math.random() * 10).toFixed(2)) ,
    username: 'Abbxcd Efbcxgh',
    date: 'December 24, 2018'
  }
];

export const fetchReviews = async (id: string) => await new Promise<Review[]>((resolve, reject) => {
  resolve(reviews);
  reject(id);
});

