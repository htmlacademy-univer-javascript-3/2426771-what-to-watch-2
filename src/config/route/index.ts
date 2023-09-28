import MainPage from '../../pages/main-page/main-page';
import { RouteProps } from 'react-router-dom';
import SignInPage from '../../pages/sign-in-page/sign-in-page';
import MyListPage from '../../pages/my-list-page/my-list-page';
import FilmPage from '../../pages/film-page/film-page';
import AddReviewPage from '../../pages/add-review-page/add-review-page';
import PlayerPage from '../../pages/player-page/player-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import LoginOnlyRoute from '../../components/login-only-route/login-only-route';

export enum AppRoutes {
  Main = 'Main',
  SignIn = 'SignIn',
  MyList = 'MyList',
  Film = 'Film',
  AddReview = 'AddReview',
  Player = 'Player',
  Page404 = 'Page404'
}

export const RoutePaths: Record<AppRoutes, string> = {
  [AppRoutes.Main]: '/',
  [AppRoutes.SignIn]: '/login',
  [AppRoutes.MyList]: '/mylist',
  [AppRoutes.Film]: '/films/:id',
  [AppRoutes.AddReview]: '/films/:id/review',
  [AppRoutes.Player]: '/player/:id',
  [AppRoutes.Page404]: '*'
};

type RouteConfigProps = {
  title: string;
  genre: string;
  year: string;
}

export const getRouteConfig = (props: RouteConfigProps): Record<AppRoutes, RouteProps> => ({
  [AppRoutes.Main]: {
    path: RoutePaths[AppRoutes.Main],
    element: MainPage({
      title: props.title,
      genre: props.genre,
      year: props.year
    })
  },
  [AppRoutes.SignIn]: {
    path: RoutePaths[AppRoutes.SignIn],
    element: SignInPage({})
  },
  [AppRoutes.MyList]: {
    path: RoutePaths[AppRoutes.MyList],
    element: LoginOnlyRoute({
      children: MyListPage({})
    })
  },
  [AppRoutes.Film]: {
    path: RoutePaths[AppRoutes.Film],
    element: FilmPage({})
  },
  [AppRoutes.AddReview]: {
    path: RoutePaths[AppRoutes.AddReview],
    element: AddReviewPage({})
  },
  [AppRoutes.Player]: {
    path: RoutePaths[AppRoutes.Player],
    element: PlayerPage({})
  },
  [AppRoutes.Page404]: {
    path: RoutePaths[AppRoutes.Page404],
    element: NotFoundPage({})
  }
});

